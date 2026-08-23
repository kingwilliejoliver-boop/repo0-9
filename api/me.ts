import { createClerkClient, verifyToken } from "@clerk/backend";
import { neon } from "@neondatabase/serverless";

/** Keep in sync with lib/billing.ts */
const FREE_IMAGE_LIMIT = 0;

type AccountRow = {
  user_id: string;
  email: string | null;
  free_used: number;
  paid_credits: number;
};

let schemaReady = false;

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

function databaseUrl() {
  for (const value of [
    process.env.POSTGRES_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL_NON_POOLING,
  ]) {
    const trimmed = (value || "").trim();
    if (trimmed) return trimmed;
  }
  return "";
}

function sql() {
  const url = databaseUrl();
  if (!url) throw new Error("Database is not configured. Connect Neon on Vercel.");
  return neon(url);
}

async function requireUser(req: { headers?: Record<string, unknown> }) {
  const secretKey = (process.env.CLERK_SECRET_KEY || "").trim();
  const token = bearerToken(req);
  if (!secretKey || !token) return null;

  const origin = header(req, "origin");
  const authorizedParties = [
    origin,
    process.env.CLERK_AUTHORIZED_PARTY,
    "https://shotfarm.io",
    "https://www.shotfarm.io",
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

async function ensureSchema() {
  if (schemaReady) return;
  const db = sql();
  await db`CREATE TABLE IF NOT EXISTS accounts (
    user_id TEXT PRIMARY KEY,
    email TEXT,
    stripe_customer_id TEXT,
    free_used INTEGER NOT NULL DEFAULT 0,
    paid_credits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await db`CREATE TABLE IF NOT EXISTS credit_ledger (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    amount INTEGER NOT NULL,
    stripe_ref TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  schemaReady = true;
}

async function getOrCreateAccount(userId: string, email?: string | null) {
  await ensureSchema();
  const db = sql();
  const existing = await db`SELECT user_id, email, free_used, paid_credits FROM accounts WHERE user_id = ${userId}` as AccountRow[];
  if (existing[0]) {
    if (email && existing[0].email !== email) {
      await db`UPDATE accounts SET email = ${email}, updated_at = NOW() WHERE user_id = ${userId}`;
      return {
        email,
        freeUsed: Number(existing[0].free_used) || 0,
        paidCredits: Number(existing[0].paid_credits) || 0,
      };
    }
    return {
      email: existing[0].email,
      freeUsed: Number(existing[0].free_used) || 0,
      paidCredits: Number(existing[0].paid_credits) || 0,
    };
  }
  const created = await db`
    INSERT INTO accounts (user_id, email)
    VALUES (${userId}, ${email ?? null})
    ON CONFLICT (user_id) DO UPDATE SET email = COALESCE(accounts.email, EXCLUDED.email)
    RETURNING user_id, email, free_used, paid_credits
  ` as AccountRow[];
  const row = created[0];
  return {
    email: row.email,
    freeUsed: Number(row.free_used) || 0,
    paidCredits: Number(row.paid_credits) || 0,
  };
}

export default async function handler(
  req: { method?: string; headers?: Record<string, unknown> },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    if (!(process.env.CLERK_SECRET_KEY || "").trim() || !databaseUrl()) {
      res.status(500).json({ error: "Accounts are not configured. Add Clerk and DATABASE_URL on Vercel." });
      return;
    }

    const user = await requireUser(req);
    if (!user) {
      res.status(401).json({ error: "Sign in to continue." });
      return;
    }

    const account = await getOrCreateAccount(user.userId, user.email);
    res.status(200).json({
      email: account.email,
      freeUsed: account.freeUsed,
      paidCredits: account.paidCredits,
      freeLeft: Math.max(0, FREE_IMAGE_LIMIT - account.freeUsed),
      imagesLeft: Math.max(0, FREE_IMAGE_LIMIT - account.freeUsed) + account.paidCredits,
    });
  } catch (err) {
    console.error("[api/me]", err);
    const message = err instanceof Error ? err.message : "Accounts are not available.";
    res.status(500).json({ error: message || "Accounts are not available." });
  }
}
