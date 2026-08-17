import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { clerkConfigured, requireUser } from "../lib/auth";
import { databaseConfigured, refundCredit, spendCredit } from "../lib/db";

export const config = {
  api: { bodyParser: { sizeLimit: "8mb" } },
  maxDuration: 60,
};

function falKey() {
  return (process.env.FAL_KEY || process.env.FAL_API_KEY || "").trim();
}

function promptDir() {
  try {
    return join(dirname(fileURLToPath(import.meta.url)), "prompts");
  } catch {
    return join(process.cwd(), "api/prompts");
  }
}

function readLookPrompt(id: number) {
  if (!Number.isFinite(id) || id <= 0) return "";
  const file = join(promptDir(), `${id}.txt`);
  if (!existsSync(file)) return "";
  return readFileSync(file, "utf8").trim();
}

function withImageRefs(prompt: string, mockupCount: number, lookRefCount: number) {
  const refs: string[] = [];
  for (let i = 0; i < lookRefCount; i += 1) {
    refs.push(`#${i + 1} locked template — edit this photograph. Keep this fabric, mockup style, and shot type.`);
  }
  for (let i = 0; i < mockupCount; i += 1) {
    refs.push(`#${lookRefCount + i + 1} design swatch only — shirt color and printed artwork. Do not output this photo.`);
  }
  return `${prompt.trim()}\n\n${refs.join("\n")}`;
}

const LOCKED_PREFIX = `The first attached image is the locked product template. Edit that photograph and return it.
The last attached image is the customer's design swatch. Use it only for garment color and printed artwork.
Do not output the last image. Do not put the last image on a new background.`;

const SYSTEM_PROMPT =
  "Edit the first attached image (the locked template) and return that same photograph. Use the last attached image only as a design swatch for garment color and printed artwork. Never output the last image. Never put the last image on a new background. Keep the template's fabric, mockup style, shot type, camera, and background.";

function asImageDataUrl(value: unknown) {
  if (typeof value !== "string") return null;
  if (!value.startsWith("data:image/") || !value.includes(";base64,")) return null;
  return value;
}

function falMessage(data: unknown) {
  if (!data || typeof data !== "object") return "Fal could not apply this look.";
  const body = data as { detail?: unknown; error?: unknown; message?: unknown };
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail) && body.detail[0] && typeof body.detail[0] === "object") {
    const first = body.detail[0] as { msg?: unknown };
    if (typeof first.msg === "string") return first.msg;
  }
  if (typeof body.error === "string") return body.error;
  if (typeof body.message === "string") return body.message;
  return "Fal could not apply this look.";
}

export default async function handler(
  req: {
    method?: string;
    headers?: Record<string, unknown>;
    body?: { lookId?: number; mockup?: string; mockups?: string[]; lookImage?: string; lookImages?: string[]; aspectRatio?: string };
  },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method === "GET") {
    res.status(200).json({ ok: true, fal: Boolean(falKey()) });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!clerkConfigured() || !databaseConfigured()) {
    res.status(500).json({ error: "Accounts are not configured. Add Clerk and DATABASE_URL on Vercel." });
    return;
  }

  const user = await requireUser(req);
  if (!user) {
    res.status(401).json({ error: "Sign in to apply a look." });
    return;
  }

  const reserved = await spendCredit(user.userId);
  if (!reserved.ok) {
    res.status(402).json({ error: "No images left.", code: "out_of_credits" });
    return;
  }

  const key = falKey();
  if (!key) {
    await refundCredit(user.userId, reserved.usedFree);
    res.status(500).json({ error: "Fal is not configured. Add FAL_KEY on Vercel for Production, then Redeploy." });
    return;
  }

  const prompt = readLookPrompt(Number(req.body?.lookId));
  const mockups = (Array.isArray(req.body?.mockups) ? req.body.mockups : [req.body?.mockup])
    .map(asImageDataUrl)
    .filter((src): src is string => Boolean(src));
  if (mockups.length === 0) {
    await refundCredit(user.userId, reserved.usedFree);
    res.status(400).json({ error: "Upload a mockup and pick a look." });
    return;
  }
  if (!prompt) {
    await refundCredit(user.userId, reserved.usedFree);
    res.status(400).json({ error: "This look has no prompt yet." });
    return;
  }

  const lookImages = (Array.isArray(req.body?.lookImages) ? req.body.lookImages : [req.body?.lookImage])
    .map(asImageDataUrl)
    .filter((src): src is string => Boolean(src));
  const model = process.env.FAL_MODEL || "fal-ai/nano-banana-2/edit";
  const imageUrls = lookImages.length > 0 ? [...lookImages, ...mockups] : mockups;

  try {
    const fal = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${LOCKED_PREFIX}\n\n${withImageRefs(prompt, mockups.length, lookImages.length)}`,
        system_prompt: SYSTEM_PROMPT,
        image_urls: imageUrls,
        num_images: 1,
        aspect_ratio: "auto",
        output_format: "jpeg",
        resolution: "1K",
        thinking_level: "high",
        limit_generations: true,
      }),
    });

    const data = (await fal.json()) as {
      images?: Array<{ url?: string }>;
      detail?: unknown;
      error?: unknown;
      message?: unknown;
    };

    if (!fal.ok) {
      await refundCredit(user.userId, reserved.usedFree);
      res.status(502).json({ error: falMessage(data) });
      return;
    }

    const image = data.images?.[0]?.url;
    if (!image) {
      await refundCredit(user.userId, reserved.usedFree);
      res.status(502).json({ error: "Fal did not return an image. Try another mockup." });
      return;
    }

    res.status(200).json({
      image,
      freeUsed: reserved.account.freeUsed,
      paidCredits: reserved.account.paidCredits,
    });
  } catch {
    await refundCredit(user.userId, reserved.usedFree);
    res.status(500).json({ error: "Fal could not apply this look." });
  }
}
