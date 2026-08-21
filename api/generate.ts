import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Keep in sync with lib/billing.ts. Do not import lib/* here — it crashes this Vercel function. */
const PAYWALL_ENABLED = false;

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

function asAngle(value: unknown) {
  return value === "front" || value === "side" || value === "back" || value === "brim" ? value : null;
}

function hatAngles(mockupCount: number, requested: unknown) {
  const listed = Array.isArray(requested) ? requested.map(asAngle).filter((a): a is string => Boolean(a)) : [];
  if (listed.length === mockupCount) return listed;
  if (mockupCount <= 1) return ["front"];
  if (mockupCount === 2) return ["front", "side"];
  return ["front", "side", "back"].slice(0, mockupCount);
}

function withImageRefs(prompt: string, mockupCount: number, lookRefCount: number, hat: boolean, angles: string[]) {
  const refs: string[] = [];
  for (let i = 0; i < lookRefCount; i += 1) {
    refs.push(
      hat
        ? `#${i + 1} locked hat template — edit this photograph. Keep this fabric, construction, and shot.`
        : `#${i + 1} locked template — edit this photograph. Keep this fabric, mockup style, and shot type.`,
    );
  }
  for (let i = 0; i < mockupCount; i += 1) {
    refs.push(
      hat
        ? `#${lookRefCount + i + 1} customer's hat ${angles[i] || "detail"} — color and marks on this side only. Do not copy the template logo box. Do not output this photo.`
        : `#${lookRefCount + i + 1} customer's garment mockup — keep this exact design (colors, prints, placement). Apply the template's mock style. Do not output this photo.`,
    );
  }
  return `${prompt.trim()}\n\n${refs.join("\n")}`;
}

const LOCKED_PREFIX = `The first attached image is the locked product template. Edit that photograph and return it.
The last attached image is the customer's garment mockup. Keep their exact design — colors, prints, spelling, scale, and placement.
Apply only the template's mock style: fabric, wash, distressing, lighting, camera, and background.
Do not copy the template's graphic. Do not output the last image. Do not put the last image on a new background.`;

const HAT_LOCKED_PREFIX = `The first attached image is the locked hat photograph. Edit that photo and return it.
The other attached images are the customer's hat from different angles. Use them for hat color and for which panel each logo sits on.
Erase the template's original branding. Do not restamp the customer's art into the template's logo box.
Do not output the customer's photos. Do not put those photos on a new background.`;

const SYSTEM_PROMPT =
  "Edit the first attached image (the locked template) and return that same photograph. The last image is the customer's garment mockup. Keep their exact design. Apply only the template's mock style (fabric, wash, shot, lighting, background). Do not stamp their art into the template logo. Never output the last image. Never put the last image on a new background.";

const HAT_SYSTEM_PROMPT =
  "Edit the first attached image (the locked hat template) and return that same photograph. The other images are the customer's hat from front, side, and/or back. Use them for color and for exact logo placement by panel. Strip the template logos. Do not force a front lockup. Leave blank any panel with no mark in the customer's photos. Never output the customer's photos.";

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
    body?: { lookId?: number; mockup?: string; mockups?: string[]; lookImage?: string; lookImages?: string[]; aspectRatio?: string; garment?: string; mockupAngles?: string[] };
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

  const key = falKey();
  if (!key) {
    res.status(500).json({ error: "Fal is not configured. Add FAL_KEY on Vercel for Production, then Redeploy." });
    return;
  }

  const prompt = readLookPrompt(Number(req.body?.lookId));
  const mockups = (Array.isArray(req.body?.mockups) ? req.body.mockups : [req.body?.mockup])
    .map(asImageDataUrl)
    .filter((src): src is string => Boolean(src));
  if (mockups.length === 0) {
    res.status(400).json({ error: "Upload a mockup and pick a look." });
    return;
  }
  if (!prompt) {
    res.status(400).json({ error: "This look has no prompt yet." });
    return;
  }

  const lookImages = (Array.isArray(req.body?.lookImages) ? req.body.lookImages : [req.body?.lookImage])
    .map(asImageDataUrl)
    .filter((src): src is string => Boolean(src));
  const hat = req.body?.garment === "Hat" || prompt.includes("locked hat photograph");
  const angles = hatAngles(mockups.length, req.body?.mockupAngles);
  const lockedPrefix = hat ? HAT_LOCKED_PREFIX : LOCKED_PREFIX;
  const systemPrompt = hat ? HAT_SYSTEM_PROMPT : SYSTEM_PROMPT;
  const model = process.env.FAL_MODEL || "fal-ai/nano-banana-2/edit";
  const imageUrls = lookImages.length > 0 ? [...lookImages, ...mockups] : mockups;

  let billed: { userId: string; usedFree: boolean; freeUsed: number; paidCredits: number } | null = null;
  if (PAYWALL_ENABLED) {
    try {
      const { clerkConfigured, requireUser } = await import("../lib/auth");
      if (clerkConfigured()) {
        const user = await requireUser(req);
        if (!user) {
          res.status(401).json({ error: "Sign in to generate." });
          return;
        }
        const { databaseConfigured, spendCredit } = await import("../lib/db");
        if (databaseConfigured()) {
          const spent = await spendCredit(user.userId);
          if (!spent.ok) {
            res.status(402).json({
              error: "No images left.",
              code: "out_of_credits",
              freeUsed: spent.account.freeUsed,
              paidCredits: spent.account.paidCredits,
            });
            return;
          }
          billed = {
            userId: user.userId,
            usedFree: spent.usedFree,
            freeUsed: spent.account.freeUsed,
            paidCredits: spent.account.paidCredits,
          };
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start this look.";
      res.status(500).json({ error: message || "Could not start this look." });
      return;
    }
  }

  try {
    const fal = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${lockedPrefix}\n\n${withImageRefs(prompt, mockups.length, lookImages.length, hat, angles)}`,
        system_prompt: systemPrompt,
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
      if (billed) {
        try {
          const { refundCredit } = await import("../lib/db");
          await refundCredit(billed.userId, billed.usedFree);
        } catch {
          /* keep the 502 */
        }
      }
      res.status(502).json({ error: falMessage(data) });
      return;
    }

    const image = data.images?.[0]?.url;
    if (!image) {
      if (billed) {
        try {
          const { refundCredit } = await import("../lib/db");
          await refundCredit(billed.userId, billed.usedFree);
        } catch {
          /* keep the 502 */
        }
      }
      res.status(502).json({ error: "Fal did not return an image. Try another mockup." });
      return;
    }

    res.status(200).json(
      billed
        ? { image, freeUsed: billed.freeUsed, paidCredits: billed.paidCredits }
        : { image },
    );
  } catch {
    if (billed) {
      try {
        const { refundCredit } = await import("../lib/db");
        await refundCredit(billed.userId, billed.usedFree);
      } catch {
        /* keep the 500 */
      }
    }
    res.status(500).json({ error: "Fal could not apply this look." });
  }
}
