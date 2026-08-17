function allowedDownloadUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname;
    return (
      host === "fal.media" ||
      host.endsWith(".fal.media") ||
      host.endsWith(".fal.ai") ||
      host === "storage.googleapis.com"
    );
  } catch {
    return false;
  }
}

export default async function handler(
  req: { method?: string; query?: { url?: string } },
  res: {
    status: (n: number) => { json: (b: unknown) => void; end: (b?: unknown) => void };
    setHeader: (k: string, v: string) => void;
    end: (b?: unknown) => void;
  },
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const url = req.query?.url;
  if (!url || !allowedDownloadUrl(url)) {
    res.status(400).json({ error: "That image cannot be downloaded." });
    return;
  }

  try {
    const img = await fetch(url);
    if (!img.ok) {
      res.status(502).json({ error: "Could not fetch that image." });
      return;
    }
    const type = img.headers.get("content-type") || "image/jpeg";
    const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
    const buf = Buffer.from(await img.arrayBuffer());
    res.setHeader("Content-Type", type);
    res.setHeader("Content-Disposition", `attachment; filename="shotfarm.${ext}"`);
    res.setHeader("Cache-Control", "no-store");
    res.end(buf);
  } catch {
    res.status(502).json({ error: "Could not download that image." });
  }
}
