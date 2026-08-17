import type { IncomingMessage } from "node:http";
import Stripe from "stripe";
import { addPaidCredits } from "../lib/db";
import { PACK_IMAGES, PRO_IMAGES } from "../lib/billing";

export const config = {
  api: { bodyParser: false },
};

async function rawBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function userIdFrom(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export default async function handler(
  req: IncomingMessage & { method?: string; headers: IncomingMessage["headers"] },
  res: { status: (n: number) => { send: (b?: unknown) => void; json: (b: unknown) => void } },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    res.status(500).json({ error: "Stripe webhook is not configured" });
    return;
  }

  const stripe = new Stripe(secret);
  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string") {
    res.status(400).json({ error: "Missing Stripe signature" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await rawBody(req), signature, webhookSecret);
  } catch {
    res.status(400).json({ error: "Invalid Stripe signature" });
    return;
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paid = session.payment_status === "paid" || session.status === "complete";
      const userId = userIdFrom(session.metadata?.user_id) || userIdFrom(session.client_reference_id);
      if (paid && userId) {
        const plan = session.metadata?.plan === "pro" ? "pro" : "starter";
        await addPaidCredits({
          userId,
          amount: plan === "pro" ? PRO_IMAGES : PACK_IMAGES,
          stripeRef: session.id,
          kind: plan,
          email: session.customer_details?.email || session.customer_email,
          customerId: typeof session.customer === "string" ? session.customer : null,
        });
      }
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription_details?: { metadata?: { user_id?: string } };
        parent?: { subscription_details?: { metadata?: { user_id?: string } } };
      };
      if (invoice.billing_reason === "subscription_cycle") {
        const userId =
          userIdFrom(invoice.parent?.subscription_details?.metadata?.user_id) ||
          userIdFrom(invoice.subscription_details?.metadata?.user_id) ||
          userIdFrom(invoice.metadata?.user_id);
        if (userId) {
          await addPaidCredits({
            userId,
            amount: PRO_IMAGES,
            stripeRef: invoice.id,
            kind: "pro_renewal",
            email: invoice.customer_email,
            customerId: typeof invoice.customer === "string" ? invoice.customer : null,
          });
        }
      }
    }
  } catch {
    res.status(500).json({ error: "Could not apply credits" });
    return;
  }

  res.status(200).json({ received: true });
}
