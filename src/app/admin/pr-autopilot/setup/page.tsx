import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "PR Auto-Pilot Setup | Admin",
  robots: { index: false, follow: false },
};

export default async function PRSetupPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("pr_auth_token");
  if (!token) redirect("/admin/login");

  const payload = await verifyToken(token.value);
  if (!payload) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-black text-ivory p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/pr-autopilot"
          className="text-text-muted text-sm hover:text-gold transition-colors mb-8 inline-block"
        >
          ← Volver al dashboard
        </Link>

        <h1 className="text-3xl font-light text-ivory mb-2">PR Auto-Pilot Setup</h1>
        <p className="text-text-muted mb-12">Guía de configuración completa del sistema.</p>

        <div className="space-y-8">
          {/* Step 1: Supabase */}
          <div className="border border-gray-soft bg-gray-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">1</div>
              <h2 className="text-xl text-ivory font-medium">Crear tablas en Supabase</h2>
            </div>
            <p className="text-text-muted text-sm mb-4">
              El archivo SQL está en <code className="bg-gray-soft px-2 py-0.5 text-gold text-xs">src/scripts/supabase-schema.sql</code>. Ejecútalo en el SQL Editor de Supabase.
            </p>
            <ol className="space-y-2 text-sm text-ivory/70 list-decimal list-inside">
              <li>Ve a <strong className="text-ivory">supabase.com</strong> → tu proyecto → SQL Editor</li>
              <li>Pega el contenido de <code className="text-gold text-xs">supabase-schema.sql</code></li>
              <li>Ejecuta el script</li>
              <li>Verifica que se crearon: <code className="text-gold text-xs">pr_queries</code>, <code className="text-gold text-xs">pr_users</code>, <code className="text-gold text-xs">pr_stats</code></li>
            </ol>
          </div>

          {/* Step 2: Bootstrap user */}
          <div className="border border-gray-soft bg-gray-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">2</div>
              <h2 className="text-xl text-ivory font-medium">Crear usuario administrador</h2>
            </div>
            <p className="text-text-muted text-sm mb-4">
              El script <code className="bg-gray-soft px-2 py-0.5 text-gold text-xs">src/scripts/bootstrap-pr-users.ts</code> crea el primer usuario owner.
            </p>
            <div className="bg-black p-4 font-mono text-xs text-green-400 mb-4">
              <p>SUPABASE_URL=... SUPABASE_SERVICE_KEY=... \</p>
              <p>PR_ADMIN_EMAIL=ana@anamorrison.com \</p>
              <p>PR_ADMIN_PASSWORD=tu_password_seguro \</p>
              <p>npx tsx src/scripts/bootstrap-pr-users.ts</p>
            </div>
            <p className="text-text-muted text-xs">O configura las variables en Vercel y ejecuta desde allí.</p>
          </div>

          {/* Step 3: Env vars */}
          <div className="border border-gray-soft bg-gray-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">3</div>
              <h2 className="text-xl text-ivory font-medium">Variables de entorno en Vercel</h2>
            </div>
            <div className="space-y-2">
              {[
                ["SUPABASE_URL", "URL de tu proyecto Supabase"],
                ["SUPABASE_SERVICE_KEY", "Service role key (no anon key)"],
                ["RESEND_API_KEY", "API key de Resend para emails"],
                ["ANTHROPIC_API_KEY", "API key de Anthropic para scoring"],
                ["JWT_SECRET", "String aleatorio 64+ chars para tokens"],
                ["PR_WEBHOOK_SECRET", "Secret para validar Gmail Apps Script"],
                ["NEXT_PUBLIC_GA_ID", "Google Analytics ID (G-XXXXXXXXXX)"],
              ].map(([key, desc]) => (
                <div key={key} className="flex gap-4 items-start py-2 border-b border-gray-soft/50 last:border-0">
                  <code className="text-gold text-xs shrink-0 w-52">{key}</code>
                  <span className="text-text-muted text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Gmail Apps Script */}
          <div className="border border-gray-soft bg-gray-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">4</div>
              <h2 className="text-xl text-ivory font-medium">Configurar Gmail Apps Script</h2>
            </div>
            <p className="text-text-muted text-sm mb-4">
              El script está en <code className="bg-gray-soft px-2 py-0.5 text-gold text-xs">pr/gmail-forwarder.gs</code>.
              Monitorea emails de plataformas PR (HARO, Qwoted, Connectively) y los reenvía al webhook.
            </p>
            <ol className="space-y-2 text-sm text-ivory/70 list-decimal list-inside mb-4">
              <li>Ve a <strong className="text-ivory">script.google.com</strong> con la cuenta de Gmail de Ana</li>
              <li>Nuevo proyecto → pega el contenido de <code className="text-gold text-xs">gmail-forwarder.gs</code></li>
              <li>Actualiza el CONFIG al inicio del script con tu webhook URL y secret</li>
              <li>Ejecuta una vez manualmente para dar permisos de Gmail</li>
              <li>Configura trigger: <strong className="text-ivory">Time-driven → Every 5 minutes</strong></li>
            </ol>
            <div className="bg-black p-4 font-mono text-xs text-green-400">
              <p>{"// En el script, actualiza:"}</p>
              <p>{"const CONFIG = {"}</p>
              <p>{"  webhookUrl: 'https://anamorrison.com/api/pr-autopilot/webhook',"}</p>
              <p>{"  webhookSecret: 'TU_PR_WEBHOOK_SECRET',"}</p>
              <p>{"  ..."}</p>
              <p>{"}"}</p>
            </div>
          </div>

          {/* Step 5: Test */}
          <div className="border border-gray-soft bg-gray-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">5</div>
              <h2 className="text-xl text-ivory font-medium">Test del sistema completo</h2>
            </div>
            <p className="text-text-muted text-sm mb-4">Para verificar que todo funciona:</p>
            <div className="bg-black p-4 font-mono text-xs text-green-400 mb-4">
              <p>{"# Test del webhook"}</p>
              <p>{"curl -X POST https://anamorrison.com/api/pr-autopilot/webhook \\"}</p>
              <p>{"  -H 'Content-Type: application/json' \\"}</p>
              <p>{"  -H 'x-webhook-secret: TU_SECRET' \\"}</p>
              <p>{"  -d '{\""}<span>{"subject\": \"Test PR query\", \"body\": \"Looking for real estate experts to comment on short-term rental trends in Florida. Deadline: 48h.\", \"from\": \"test@haro.com\"}"}</span>{"'"}</p>
            </div>
            <p className="text-text-muted text-xs">
              Si todo está configurado, deberías ver la query aparece en el dashboard con un score de Anthropic.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/admin/pr-autopilot"
            className="bg-gold text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Ir al Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
