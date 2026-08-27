const lookCache = new Map<string, string>();

async function loadImageBlob(src: string) {
  if (src.startsWith("data:") || src.startsWith("blob:")) {
    return fetch(src).then((res) => res.blob());
  }

  try {
    const direct = await fetch(src);
    if (direct.ok) {
      const blob = await direct.blob();
      if (blob.size > 0) return blob;
    }
  } catch {
    /* CORS — fall through to proxy */
  }

  const proxied = await fetch(`/api/download?url=${encodeURIComponent(src)}`);
  if (!proxied.ok) throw new Error("Could not read this image.");
  return proxied.blob();
}

function parseAspectRatio(ratio: string) {
  const [w, h] = ratio.split(":").map(Number);
  if (!w || !h) return null;
  return { w, h };
}

function canvasSizeForAspect(ratio: string, max: number) {
  const parsed = parseAspectRatio(ratio);
  if (!parsed) return { width: max, height: max };
  if (parsed.w >= parsed.h) {
    return { width: max, height: Math.max(1, Math.round(max * (parsed.h / parsed.w))) };
  }
  return { width: Math.max(1, Math.round(max * (parsed.w / parsed.h))), height: max };
}

function edgeFillColor(bitmap: ImageBitmap) {
  const tw = Math.min(64, bitmap.width);
  const th = Math.min(64, bitmap.height);
  const sample = document.createElement("canvas");
  sample.width = tw;
  sample.height = th;
  const ctx = sample.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "#ffffff";
  ctx.drawImage(bitmap, 0, 0, tw, th);
  const { data } = ctx.getImageData(0, 0, tw, th);
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const add = (i: number) => {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n += 1;
  };
  for (let x = 0; x < tw; x += 1) {
    add(x * 4);
    add(((th - 1) * tw + x) * 4);
  }
  for (let y = 0; y < th; y += 1) {
    add(y * tw * 4);
    add((y * tw + tw - 1) * 4);
  }
  return `rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`;
}

async function bitmapFromBlob(blob: Blob) {
  try {
    return await createImageBitmap(blob, { imageOrientation: "from-image" });
  } catch {
    return createImageBitmap(blob);
  }
}

export async function toJpegDataUrl(src: string, max = 1280, aspectRatio?: string) {
  const blob = await loadImageBlob(src);
  const bitmap = await bitmapFromBlob(blob);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read this image.");

  if (aspectRatio && parseAspectRatio(aspectRatio)) {
    const { width, height } = canvasSizeForAspect(aspectRatio, max);
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = edgeFillColor(bitmap);
    ctx.fillRect(0, 0, width, height);
    const scale = Math.min(width / bitmap.width, height / bitmap.height);
    const dw = bitmap.width * scale;
    const dh = bitmap.height * scale;
    ctx.drawImage(bitmap, (width - dw) / 2, (height - dh) / 2, dw, dh);
  } else {
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }

  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.88);
}

export async function fileToJpegDataUrl(file: File, max = 1280) {
  const blobUrl = URL.createObjectURL(file);
  try {
    return await toJpegDataUrl(blobUrl, max);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

export async function encodeLookSources(sources: string[], max = 1280) {
  return Promise.all(
    sources.map(async (src) => {
      const cached = lookCache.get(src);
      if (cached) return cached;
      const encoded = await toJpegDataUrl(src, max);
      lookCache.set(src, encoded);
      return encoded;
    }),
  );
}

export function preloadLookSources(sources: string[], max = 1280) {
  void encodeLookSources(sources, max).catch(() => {
    /* Best-effort warm cache before the user clicks generate. */
  });
}
