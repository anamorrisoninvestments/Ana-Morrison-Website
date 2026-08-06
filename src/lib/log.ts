import "server-only";

const REDACT_KEYS = [
  "email",
  "whatsapp",
  "phone",
  "name",
  "ip",
  "password",
  "token",
  "authorization",
  "cookie",
  "service_role",
  "resend",
  "salt",
];

function redact(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return value.length > 200 ? value.slice(0, 200) + "…" : value;
  if (Array.isArray(value)) return value.map(redact);
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const lk = k.toLowerCase();
      if (REDACT_KEYS.some((r) => lk.includes(r))) {
        out[k] = "[redacted]";
      } else {
        out[k] = redact(v);
      }
    }
    return out;
  }
  return value;
}

export const log = {
  info(msg: string, meta?: Record<string, unknown>) {
    if (meta) console.info(`[info] ${msg}`, redact(meta));
    else console.info(`[info] ${msg}`);
  },
  warn(msg: string, meta?: Record<string, unknown>) {
    if (meta) console.warn(`[warn] ${msg}`, redact(meta));
    else console.warn(`[warn] ${msg}`);
  },
  error(msg: string, meta?: Record<string, unknown>) {
    if (meta) console.error(`[error] ${msg}`, redact(meta));
    else console.error(`[error] ${msg}`);
  },
};
