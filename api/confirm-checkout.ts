import Stripe from "stripe";
import { PACK_IMAGES, PRO_IMAGES } from "../lib/billing";

export default async function handler(
  req: { method?: string; query?: { session_id?: string }; headers?: Record<string, unknown> },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
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
    if (!paid) {
      res.status(200).json({ ok: false });
      return;
    }

    const plan = session.metadata?.plan === "pro" ? "pro" : "starter";
    const images = plan === "pro" ? PRO_IMAGES : PACK_IMAGES;
    let paidCredits: number | null = null;

    try {
      const { requireUser } = await import("../lib/auth");
      const { databaseConfigured, addPaidCredits } = await import("../lib/db");
      const user = await requireUser(req);
      if (user && databaseConfigured()) {
        const account = await addPaidCredits({
          userId: user.userId,
          amount: images,
          stripeRef: session.id,
          kind: plan,
          email: user.email || session.customer_details?.email || session.customer_email,
          customerId: typeof session.customer === "string" ? session.customer : null,
        });
        paidCredits = account.paidCredits;
      }
    } catch {
      /* Guest checkout still returns ok so the browser can add local credits. */
    }

    res.status(200).json({ ok: true, plan, images, paidCredits });
  } catch {
    res.status(400).json({ ok: false });
  }
}
