-- ============================================================================
-- ROLLBACK · 20260801_p3_privacy_and_leads.down.sql
--
-- ⚠️  ADVERTENCIA ⚠️
-- Este rollback elimina PERMANENTEMENTE las cinco tablas creadas por la
-- migración P3 (leads, lead_events, consents, lead_magnets_downloads,
-- rate_limit_buckets) y todos los datos que contengan.
--
-- OBLIGATORIO antes de ejecutar:
--   1. Crear un backup manual reciente:
--      Supabase Dashboard → Database → Backups → Create manual backup
--      o `supabase db dump -f backup-YYYYMMDD-pre-p3-rollback.sql`.
--   2. Verificar que el backup existe y es legible.
--   3. Confirmar que ningún proceso en producción depende de estas tablas.
--
-- Este rollback SOLO toca objetos creados por la migración P3.
-- No modifica ninguna otra función, trigger, política, tabla o esquema.
-- ============================================================================

-- 1. Trigger exclusivo de esta migración
drop trigger if exists p3_leads_updated_at_trigger on public.leads;

-- 2. Función exclusiva de esta migración (nombre prefijado p3_leads_)
drop function if exists public.p3_leads_set_updated_at();

-- 3. Tablas creadas por esta migración (orden respeta las FKs)
drop table if exists public.rate_limit_buckets;
drop table if exists public.lead_magnets_downloads;
drop table if exists public.consents;
drop table if exists public.lead_events;
drop table if exists public.leads;

-- Nota: no se ejecuta ningún DROP sobre funciones, triggers, políticas,
-- tablas o esquemas que puedan pertenecer a otras partes del sistema.
