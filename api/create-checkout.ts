import Stripe from "stripe";

const PACK = { name: "ShotFarm Pack", amount: 900, images: 20 };
const PRO = { name: "ShotFarm Pro", amount: 4900, images: 150 };

export default async function handler(req: { method?: string; body?: { plan?: string }; headers: { origin?: string; host?: string } }, res: { status: (n: number) => { json: (b: unknown) => void } }) {
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
  const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : "http://localhost:8443");
  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan === "pro" ? "subscription" : "payment",
      metadata: { plan },
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
