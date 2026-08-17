import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const config = {
  api: { bodyParser: { sizeLimit: "8mb" } },
  maxDuration: 60,
};

const ASPECT_RATIOS = new Set(["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "4:5", "5:4", "21:9"]);

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
  for (let i = 0; i < mockupCount; i += 1) {
    refs.push(`#${i + 1} customer design only — shirt color and print from this upload`);
  }
  for (let i = 0; i < lookRefCount; i += 1) {
    refs.push(`#${mockupCount + i + 1} locked template photo — edit this image, keep this exact mockup`);
  }
  return `${prompt.trim()}\n\n${refs.join("\n")}`;
}

const SYSTEM_PROMPT =
  "You edit a locked product template photo. Keep image #2 as the exact same mockup photograph. Change only the garment color and printed artwork to match image #1. Never invent a new mockup, camera, background, or scene.";

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
  const aspectRatio = ASPECT_RATIOS.has(req.body?.aspectRatio ?? "") ? req.body!.aspectRatio! : "1:1";
  const model = process.env.FAL_MODEL || "fal-ai/nano-banana-2/edit";
  const imageUrls = [...mockups, ...lookImages];

  try {
    const fal = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: withImageRefs(prompt, mockups.length, lookImages.length),
        system_prompt: SYSTEM_PROMPT,
        image_urls: imageUrls,
        num_images: 1,
        aspect_ratio: aspectRatio,
        output_format: "jpeg",
        resolution: "1K",
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
      res.status(502).json({ error: falMessage(data) });
      return;
    }

    const image = data.images?.[0]?.url;
    if (!image) {
      res.status(502).json({ error: "Fal did not return an image. Try another mockup." });
      return;
    }

    res.status(200).json({ image });
  } catch {
    res.status(500).json({ error: "Fal could not apply this look." });
  }
}
