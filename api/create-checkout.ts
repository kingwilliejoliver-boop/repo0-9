import Stripe from "stripe";

export default async function handler(
  req: { method?: string; body?: { plan?: string }; headers: Record<string, unknown> },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method === "GET") {
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    res.status(500).json({ error: "Stripe is not configured" });
    return;
  }

  const plan = req.body?.plan === "pro" ? "pro" : "starter";
  const originHeader = req.headers.origin;
  const hostHeader = req.headers.host ?? req.headers["x-forwarded-host"];
  const origin =
    (typeof originHeader === "string" && originHeader) ||
    (typeof hostHeader === "string" && hostHeader ? `https://${hostHeader}` : "http://localhost:8443");

  let userId = "guest";
  let mustSignIn = false;
  try {
    const { clerkConfigured, requireUser } = await import("../lib/auth");
    if (clerkConfigured()) {
      mustSignIn = true;
      const user = await requireUser(req);
      if (user?.userId) {
        userId = user.userId;
        mustSignIn = false;
      }
    }
  } catch {
    /* Local checkout without Clerk still works. */
  }
  if (mustSignIn) {
    res.status(401).json({ error: "Sign in to buy images." });
    return;
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: plan === "pro" ? "subscription" : "payment",
      client_reference_id: userId,
      metadata: { plan, user_id: userId },
      subscription_data:
        plan === "pro" ? { metadata: { plan, user_id: userId } } : undefined,
      line_items:
        plan === "pro"
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: 4900,
                  recurring: { interval: "month" },
                  product_data: { name: "ShotFarm Pro", description: "150 images per month" },
                },
              },
            ]
          : [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: 900,
                  product_data: { name: "ShotFarm Pack", description: "20 images" },
                },
              },
            ],
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
    });

    if (!session.url) {
      res.status(500).json({ error: "Stripe did not return a checkout URL." });
      return;
    }

    res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    res.status(500).json({ error: message });
  }
}
