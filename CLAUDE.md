# AnaMaria Morrison Website — CLAUDE.md

## Reglas de Deploy OBLIGATORIAS (Digital Authority Blueprint v2.0)

### NUNCA hacer:
1. `git push origin main` directo
2. `vercel --prod` o `vercel deploy --prod` manual
3. Agregar env vars en Vercel manualmente sin verificar con `vercel env pull`

### SIEMPRE hacer:
1. `git checkout -b feat/X origin/main` → push a la branch → PR → review → merge
2. GitHub Actions auto-deploya al merge en main
3. Verificar env vars con `vercel env pull /tmp/v.env` y confirmar que ninguna tenga valor vacío
4. Pre-flight `curl` comparando rutas críticas old vs new antes de alias-swap
5. Si el alias queda manual-pinned: `vercel alias set <new-deployment-url> anamorrison.com`

### Stack:
- Next.js 15 + App Router
- Tailwind CSS
- Framer Motion
- Supabase (PR Auto-Pilot)
- Resend (email transaccional)
- Anthropic API (scoring PR)

### Colores de marca:
- Negro: #000000
- Marfil: #F7F3EC
- Azul eléctrico: #22AEEF
- Azul profundo: #10145F
- Dorado champagne: #C8A45D

### Gotchas técnicos críticos:
- Lambdas no hot-reload env vars → trigger nuevo deploy después de cambiar una var
- Browser puede cachear 404 → instruir Cmd+Shift+R (hard refresh)
- `vercel env add` via stdin puede dejar valor vacío → siempre verificar con pull
