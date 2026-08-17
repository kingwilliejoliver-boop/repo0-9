import { createClerkClient, verifyToken } from "@clerk/backend";

export type AuthedUser = {
  userId: string;
  email: string | null;
};

function header(req: { headers?: Record<string, unknown> }, name: string) {
  const raw = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  if (Array.isArray(raw)) return typeof raw[0] === "string" ? raw[0] : null;
  return typeof raw === "string" ? raw : null;
}

function bearerToken(req: { headers?: Record<string, unknown> }) {
  const value = header(req, "authorization");
  if (!value?.startsWith("Bearer ")) return null;
  return value.slice(7).trim() || null;
}

export function clerkConfigured() {
  return Boolean((process.env.CLERK_SECRET_KEY || "").trim());
}

export async function requireUser(req: { headers?: Record<string, unknown> }): Promise<AuthedUser | null> {
  const secretKey = (process.env.CLERK_SECRET_KEY || "").trim();
  const token = bearerToken(req);
  if (!secretKey || !token) return null;

  const origin = header(req, "origin");
  const authorizedParties = [
    origin,
    process.env.CLERK_AUTHORIZED_PARTY,
    "https://repo0-9.vercel.app",
  ].filter((value): value is string => Boolean(value));

  try {
    const payload = await verifyToken(token, { secretKey, authorizedParties }).catch(() =>
      verifyToken(token, { secretKey }),
    );
    const userId = payload?.sub;
    if (!userId) return null;

    const clerk = createClerkClient({ secretKey });
    const user = await clerk.users.getUser(userId);
    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || null;
    return { userId, email };
  } catch {
    return null;
  }
}
