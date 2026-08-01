# Migraciones Supabase

Versionadas manualmente. La aplicación **no** ejecuta migraciones automáticamente al deploy. La propietaria del proyecto (Ana Morrison) aplica cada migración a mano tras revisión.

## Estructura

```
supabase/
├── README.md                                             ← este archivo
├── APPLIED.md                                            ← registro de qué migración fue aplicada, cuándo, por quién (opcional)
└── migrations/
    ├── 20260801_p3_privacy_and_leads.sql                 ← forward
    └── 20260801_p3_privacy_and_leads.down.sql            ← rollback
```

## Cómo aplicar una migración manualmente

### 1. Backup obligatorio

Antes de cualquier cambio en producción:

- Supabase Dashboard → **Database** → **Backups** → **Create manual backup**
- Alternativa CLI: `supabase db dump -f backup-YYYYMMDD-pre-<migration-name>.sql`
- Verificar que el archivo se descargó y es legible antes de continuar.

### 2. Revisión del SQL

- Abrir el archivo `.sql` a aplicar.
- Confirmar que solo contiene `CREATE` (o `ALTER/DROP` explícitamente autorizados).
- La migración `20260801_p3_privacy_and_leads.sql` solo contiene `CREATE` — cero riesgo para tablas existentes.

### 3. Aplicación

**Opción A · Supabase SQL Editor (recomendado)**

1. Dashboard → **SQL Editor** → **New query**
2. Pegar el contenido completo del archivo `.sql`
3. Click **Run**
4. Verificar que la salida diga `Success. No rows returned.`

**Opción B · CLI**

```bash
supabase db push
```

Requiere `supabase link` previo con las credenciales del proyecto.

### 4. Verificación post-aplicación (obligatoria)

Ejecutar estas consultas en el SQL Editor. Todas deben retornar los resultados esperados:

```sql
-- 4.1 · Existencia de tablas nuevas (debe retornar 5 filas)
select table_name from information_schema.tables
where table_schema='public'
  and table_name in (
    'leads', 'lead_events', 'consents',
    'lead_magnets_downloads', 'rate_limit_buckets'
  )
order by table_name;

-- 4.2 · Función y trigger exclusivos existen
select proname from pg_proc where proname='p3_leads_set_updated_at';
-- ↳ debe retornar 1 fila

select tgname from pg_trigger where tgname='p3_leads_updated_at_trigger';
-- ↳ debe retornar 1 fila

-- 4.3 · RLS habilitado en las 5 tablas
select tablename, rowsecurity
from pg_tables
where schemaname='public'
  and tablename in (
    'leads', 'lead_events', 'consents',
    'lead_magnets_downloads', 'rate_limit_buckets'
  )
order by tablename;
-- ↳ todas deben mostrar rowsecurity=true

-- 4.4 · NO existen policies para anon o authenticated
select tablename, policyname, roles
from pg_policies
where schemaname='public'
  and tablename in (
    'leads', 'lead_events', 'consents',
    'lead_magnets_downloads', 'rate_limit_buckets'
  );
-- ↳ debe retornar 0 filas

-- 4.5 · Tablas vacías al inicio
select 'leads' as t, count(*) from public.leads
union all select 'lead_events', count(*) from public.lead_events
union all select 'consents', count(*) from public.consents
union all select 'lead_magnets_downloads', count(*) from public.lead_magnets_downloads
union all select 'rate_limit_buckets', count(*) from public.rate_limit_buckets;
-- ↳ todas count=0

-- 4.6 · Prueba de RLS: intentar SELECT como anon (debe fallar o retornar 0 filas)
--     Cambiar rol solo dentro de una transacción para no afectar la sesión:
begin;
  set local role anon;
  select count(*) from public.leads;
  -- ↳ debe fallar con "permission denied for table leads"
  --   O retornar 0 según la versión de Supabase.
rollback;

-- 4.7 · Prueba de INSERT desde backend (service_role):
--     Ejecutar como service_role desde el SQL Editor (el editor usa
--     service_role por defecto). Crear un lead de prueba explícito.
insert into public.leads (source, name, email, consent_communications, consent_version)
values ('sql_editor_test', 'MIGRATION TEST', 'migration-test@anamorrison.com', true, 'v1.0')
returning id, created_at;
-- ↳ debe retornar 1 fila con el id generado

-- Verificar que el trigger de updated_at funciona:
update public.leads set notes='update test' where email='migration-test@anamorrison.com';
select email, created_at, updated_at from public.leads
where email='migration-test@anamorrison.com';
-- ↳ updated_at debe ser posterior a created_at

-- Limpiar el registro de prueba:
delete from public.leads where email='migration-test@anamorrison.com';
```

### 5. Registrar aplicación

Añadir una línea en `supabase/APPLIED.md`:

```
20260801_p3_privacy_and_leads.sql · YYYY-MM-DD HH:MM UTC · aplicada por <persona> · verificaciones OK
```

## Checklist previo antes de aplicar `20260801_p3_privacy_and_leads`

- [ ] Backup manual reciente confirmado
- [ ] SQL revisado línea por línea
- [ ] Ninguna tabla existente será modificada (esta migración solo hace `CREATE IF NOT EXISTS`)
- [ ] Ambiente correcto seleccionado (production vs staging)
- [ ] Aviso a la propietaria antes de aplicar
- [ ] Verificaciones 4.1 a 4.7 ejecutadas y con resultado esperado
- [ ] Registro en `APPLIED.md` completado

## Rollback

**Archivo:** `20260801_p3_privacy_and_leads.down.sql`

**⚠️ ADVERTENCIA:** elimina las 5 tablas creadas por la migración y todos sus datos.

### Antes de ejecutar rollback

1. Backup manual nuevo obligatorio
2. Confirmar que ningún proceso en producción depende de estas tablas
3. Confirmar que el código de la aplicación no las requiere (o está manejando su ausencia con fallback)

### Ejecución

Igual que la migración forward: SQL Editor o CLI, pegando el contenido de `20260801_p3_privacy_and_leads.down.sql`.

### Verificación post-rollback

```sql
select count(*) from information_schema.tables
where table_schema='public'
  and table_name in (
    'leads', 'lead_events', 'consents',
    'lead_magnets_downloads', 'rate_limit_buckets'
  );
-- ↳ debe retornar 0
```

## Estrategia de despliegue por fases

El código de la aplicación (`src/lib/leads/save.ts`) está diseñado para
funcionar aunque la migración no se haya aplicado todavía:

- Detecta ausencia de tablas mediante try/catch en el primer INSERT
- Si Supabase no tiene las tablas → guarda el lead como fallback por email
  a `CONTACT_NOTIFICATION_EMAIL` con la nota `PENDIENTE MIGRACIÓN SUPABASE`
- El usuario ve confirmación visual normal → cero pérdida de leads durante
  la ventana entre merge y aplicación de migración

Este comportamiento se retira en un PR posterior cuando la migración esté
confirmada en producción.

## Registro de migraciones aplicadas

Ver `supabase/APPLIED.md` cuando se cree.
