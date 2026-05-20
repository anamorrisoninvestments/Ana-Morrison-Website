import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SECRET = new TextEncoder().encode(process.env.PR_AUTH_SECRET || "dev-secret-change-in-prod-min-64-chars");
const COOKIE = "pr_auth_token";
const EXPIRY = "8h";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: { userId: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRY)
    .setIssuedAt()
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export { COOKIE };
