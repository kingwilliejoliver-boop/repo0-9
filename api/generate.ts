import { buildLockedPrompt, getLook } from "../src/looks";

export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
  maxDuration: 60,
};

const ASPECT_RATIOS = new Set(["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "4:5", "5:4", "21:9"]);

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
  req: { method?: string; body?: { lookId?: number; mockup?: string; lookImage?: string; aspectRatio?: string } },
  res: { status: (n: number) => { json: (b: unknown) => void } },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.FAL_KEY;
  if (!key) {
    res.status(500).json({ error: "Fal is not configured. Add FAL_KEY in Vercel." });
    return;
  }

  const look = getLook(Number(req.body?.lookId));
  const mockup = asImageDataUrl(req.body?.mockup);
  if (!look || !mockup) {
    res.status(400).json({ error: "Upload a mockup and pick a look." });
    return;
  }

  const lookImage = asImageDataUrl(req.body?.lookImage);
  const aspectRatio = ASPECT_RATIOS.has(req.body?.aspectRatio ?? "") ? req.body!.aspectRatio! : "1:1";
  const model = process.env.FAL_MODEL || "fal-ai/nano-banana-2/edit";
  const imageUrls = lookImage ? [mockup, lookImage] : [mockup];

  try {
    const fal = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: buildLockedPrompt(look),
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
