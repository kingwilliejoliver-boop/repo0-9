export default async function handler(
  req: { method?: string; headers?: Record<string, unknown> },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { clerkConfigured, requireUser } = await import("../lib/auth");
    const { databaseConfigured, getOrCreateAccount } = await import("../lib/db");
    const { FREE_IMAGE_LIMIT } = await import("../lib/billing");
    if (!clerkConfigured() || !databaseConfigured()) {
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
