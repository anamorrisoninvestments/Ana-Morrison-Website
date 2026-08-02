# Email transaccional (Resend)

Este módulo gestiona el envío de:
- Notificación interna a Ana cada vez que llega un lead
- (Futuro PR) Confirmación al usuario y secuencias de nurture

## Comportamiento seguro

- Si faltan `RESEND_API_KEY` o `RESEND_FROM_EMAIL` → el envío se **omite**.
  El lead se guarda en Supabase con `email_confirmation_status='skipped'`.
  **Ningún lead se pierde por falta de email.**
- Si Resend falla en tiempo real → `email_confirmation_status='failed'` con el error registrado en `leads` y un evento en `lead_events`. El lead se conserva.
- Los emails llevan HTML escapado. Nunca se inserta contenido de usuario sin escape.

## Verificación del dominio `anamorrison.com` en Resend

**IMPORTANTE:** este documento no cambia DNS. Los pasos los ejecuta la propietaria del dominio.

### Paso 1 — Añadir dominio en Resend
1. Login en `resend.com`
2. Sidebar → **Domains** → **Add Domain**
3. Escribir: `anamorrison.com`
4. Región: elegir la más cercana (por defecto `us-east-1`)
5. Click **Add**

### Paso 2 — Registros DNS que Resend te mostrará
Resend genera 3–4 registros específicos. Ejemplo típico (los valores exactos los da Resend, no los inventes):

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| MX | `send.anamorrison.com` | `feedback-smtp.us-east-1.amazonses.com` (prio 10) | Auto |
| TXT | `send.anamorrison.com` | `v=spf1 include:amazonses.com ~all` | Auto |
| TXT | `resend._domainkey.anamorrison.com` | valor DKIM largo generado por Resend | Auto |
| TXT | `_dmarc.anamorrison.com` (opcional recomendado) | `v=DMARC1; p=none;` | Auto |

### Paso 3 — Añadir los registros en tu panel DNS
Según proveedor:
- **Vercel Domains:** Dashboard → Domain → DNS Records → Add
- **Cloudflare:** DNS → Records → Add record. **Deshabilita el proxy** (nube naranja → gris) para MX y TXT
- **Google Domains / GoDaddy:** panel DNS → Custom records → Add

Copiar valores exactos de Resend. No modificar registros DNS existentes (Google Workspace MX, verificaciones previas, etc.). Solo **añadir** los nuevos.

### Paso 4 — Verificar
1. Volver a Resend → Domains → click en `anamorrison.com`
2. Click **Verify DNS Records**
3. Propagación: 5 min – 48h (típicamente <1h)
4. Cuando esté listo: `Status: Verified` ✅

### Paso 5 — Configurar en Vercel
Una vez verificado en Resend, en Vercel → Project Settings → Environment Variables:
```
RESEND_API_KEY = <token de resend>
RESEND_FROM_EMAIL = Ana Morrison <noreply@anamorrison.com>
CONTACT_NOTIFICATION_EMAIL = anamorrisoninvestments@gmail.com
```
Aplicar a `Production` + `Preview`. Redeploy para que las nuevas vars tengan efecto.

### Qué NO hacer
- ❌ No borrar registros DNS existentes
- ❌ No configurar `RESEND_FROM_EMAIL` antes de verificar el dominio (los emails rebotan)
- ❌ No pegar valores DKIM en chat, Git ni PR
