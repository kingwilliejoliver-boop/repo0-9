import { neon } from "@neondatabase/serverless";
import { FREE_IMAGE_LIMIT } from "./billing";

export type Account = {
  userId: string;
  email: string | null;
  freeUsed: number;
  paidCredits: number;
};

type AccountRow = {
  user_id: string;
  email: string | null;
  free_used: number;
  paid_credits: number;
};

let schemaReady = false;

function sql() {
  const url = (process.env.DATABASE_URL || "").trim();
  if (!url) throw new Error("DATABASE_URL is not set. Add a Neon database on Vercel.");
  return neon(url);
}

function asAccount(row: AccountRow): Account {
  return {
    userId: row.user_id,
    email: row.email,
    freeUsed: Number(row.free_used) || 0,
    paidCredits: Number(row.paid_credits) || 0,
  };
}

export function databaseConfigured() {
  return Boolean((process.env.DATABASE_URL || "").trim());
}

export async function ensureSchema() {
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

export async function getOrCreateAccount(userId: string, email?: string | null): Promise<Account> {
  await ensureSchema();
  const db = sql();
  const existing = await db`SELECT user_id, email, free_used, paid_credits FROM accounts WHERE user_id = ${userId}` as AccountRow[];
  if (existing[0]) {
    if (email && existing[0].email !== email) {
      await db`UPDATE accounts SET email = ${email}, updated_at = NOW() WHERE user_id = ${userId}`;
      return { ...asAccount(existing[0]), email };
    }
    return asAccount(existing[0]);
  }
  const created = await db`
    INSERT INTO accounts (user_id, email)
    VALUES (${userId}, ${email ?? null})
    ON CONFLICT (user_id) DO UPDATE SET email = COALESCE(accounts.email, EXCLUDED.email)
    RETURNING user_id, email, free_used, paid_credits
  ` as AccountRow[];
  return asAccount(created[0]);
}

export async function addPaidCredits(opts: {
  userId: string;
  amount: number;
  stripeRef: string;
  kind: string;
  email?: string | null;
  customerId?: string | null;
}): Promise<Account> {
  const account = await getOrCreateAccount(opts.userId, opts.email);
  const db = sql();
  const inserted = await db`
    INSERT INTO credit_ledger (id, user_id, kind, amount, stripe_ref)
    VALUES (${crypto.randomUUID()}, ${opts.userId}, ${opts.kind}, ${opts.amount}, ${opts.stripeRef})
    ON CONFLICT (stripe_ref) DO NOTHING
    RETURNING id
  `;
  if (inserted.length === 0) return account;
  const updated = await db`
    UPDATE accounts
    SET
      paid_credits = paid_credits + ${opts.amount},
      stripe_customer_id = COALESCE(${opts.customerId ?? null}, stripe_customer_id),
      email = COALESCE(${opts.email ?? null}, email),
      updated_at = NOW()
    WHERE user_id = ${opts.userId}
    RETURNING user_id, email, free_used, paid_credits
  ` as AccountRow[];
  return asAccount(updated[0] ?? {
    user_id: opts.userId,
    email: opts.email ?? null,
    free_used: account.freeUsed,
    paid_credits: account.paidCredits + opts.amount,
  });
}

export async function spendCredit(userId: string) {
  await getOrCreateAccount(userId);
  const db = sql();
  const free = await db`
    UPDATE accounts
    SET free_used = free_used + 1, updated_at = NOW()
    WHERE user_id = ${userId} AND free_used < ${FREE_IMAGE_LIMIT}
    RETURNING user_id, email, free_used, paid_credits
  ` as AccountRow[];
  if (free[0]) return { ok: true as const, usedFree: true, account: asAccount(free[0]) };

  const paid = await db`
    UPDATE accounts
    SET paid_credits = paid_credits - 1, updated_at = NOW()
    WHERE user_id = ${userId} AND paid_credits > 0
    RETURNING user_id, email, free_used, paid_credits
  ` as AccountRow[];
  if (paid[0]) return { ok: true as const, usedFree: false, account: asAccount(paid[0]) };

  const current = await getOrCreateAccount(userId);
  return { ok: false as const, usedFree: false, account: current };
}

export async function refundCredit(userId: string, usedFree: boolean) {
  await ensureSchema();
  const db = sql();
  if (usedFree) {
    await db`UPDATE accounts SET free_used = GREATEST(0, free_used - 1), updated_at = NOW() WHERE user_id = ${userId}`;
    return;
  }
  await db`UPDATE accounts SET paid_credits = paid_credits + 1, updated_at = NOW() WHERE user_id = ${userId}`;
}
