function validEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default async function handler(
  req: { method?: string; body?: { email?: unknown } },
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (!validEmail(email)) {
    res.status(400).json({ error: "Enter a valid email address." });
    return;
  }

  const webhookUrl = (process.env.WAITLIST_WEBHOOK_URL || "").trim();
  if (!webhookUrl) {
    res.status(503).json({ error: "The waitlist is not configured yet." });
    return;
  }

  try {
    const webhook = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "shotfarm-coming-soon" }),
    });
    if (!webhook.ok) {
      res.status(502).json({ error: "Could not save your email. Try again." });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "Could not save your email. Try again." });
  }
}