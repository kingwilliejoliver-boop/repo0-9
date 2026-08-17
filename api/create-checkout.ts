import Stripe from "stripe";
import { clerkConfigured, requireUser } from "../lib/auth";
import { PACK_IMAGES, PRO_IMAGES } from "../lib/billing";

const PACK = { name: "ShotFarm Pack", amount: 900, images: PACK_IMAGES };
const PRO = { name: "ShotFarm Pro", amount: 4900, images: PRO_IMAGES };

export default async function handler(
  req: { method?: string; body?: { plan?: string }; headers: Record<string, unknown> },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    res.status(500).json({ error: "Stripe is not configured" });
    return;
  }
  if (!clerkConfigured()) {
    res.status(500).json({ error: "Sign in is not configured. Add Clerk keys on Vercel." });
    return;
  }

  const user = await requireUser(req);
  if (!user) {
    res.status(401).json({ error: "Sign in to buy images." });
    return;
  }

  const plan = req.body?.plan === "pro" ? "pro" : "starter";
  const originHeader = req.headers.origin;
  const hostHeader = req.headers.host;
  const origin =
    (typeof originHeader === "string" && originHeader) ||
    (typeof hostHeader === "string" && hostHeader ? `https://${hostHeader}` : "http://localhost:8443");
  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan === "pro" ? "subscription" : "payment",
      customer_email: user.email || undefined,
      client_reference_id: user.userId,
      metadata: { plan, user_id: user.userId },
      subscription_data:
        plan === "pro"
          ? { metadata: { plan, user_id: user.userId } }
          : undefined,
      line_items:
        plan === "pro"
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: PRO.amount,
                  recurring: { interval: "month" },
                  product_data: { name: PRO.name, description: `${PRO.images} images per month` },
                },
              },
            ]
          : [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: PACK.amount,
                  product_data: { name: PACK.name, description: `${PACK.images} images` },
                },
              },
            ],
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    res.status(500).json({ error: message });
  }
}
