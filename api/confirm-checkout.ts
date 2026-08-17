import Stripe from "stripe";

export default async function handler(req: { method?: string; query?: { session_id?: string } }, res: { status: (n: number) => { json: (b: unknown) => void } }) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const sessionId = req.query?.session_id;
  if (!secret || !sessionId) {
    res.status(400).json({ ok: false });
    return;
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" || session.status === "complete";
    const plan = session.metadata?.plan === "pro" ? "pro" : "starter";
    res.status(200).json({ ok: paid, plan });
  } catch {
    res.status(400).json({ ok: false });
  }
}
