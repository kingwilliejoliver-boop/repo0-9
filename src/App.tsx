import { useState, useRef, useCallback, useEffect } from "react";
import { SignIn, UserButton, useAuth } from "@clerk/react";
import saintDistressedTee from "./assets/templates/saint-distressed-tee.jpg";
import raspberryHillsTee from "./assets/templates/raspberry-hills-tee.jpg";
import raspberryHillsMockup from "./assets/templates/raspberry-hills-mockup.png";
import shotfarmLogo from "./assets/shotfarm-logo.png";
import { LOOKS } from "./looks";
import LooksEditor from "./LooksEditor";
import { clerkAppearance, clerkLocalization, fetchAccount, localSession, type AccountSnap, type Session } from "./session";

// ── Icons ──────────────────────────────────────────────────────────────────

function IconGenerate() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconLibrary() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 0 .5-4.5" /><polyline points="3 3 3 7 7 7" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}
function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function IconChevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <polyline points="15 6 9 12 15 18" /> : <polyline points="9 6 15 12 9 18" />}
    </svg>
  );
}
function BrandLockup() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <img src={shotfarmLogo} alt="" width={32} height={32} className="w-8 h-8 rounded-[8px] flex-shrink-0" />
      <p className="text-[#111] font-700 text-lg leading-none tracking-wide">ShotFarm</p>
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

function imageSrc(img: string, size = 400) {
  if (img.startsWith("http") || img.startsWith("/") || img.startsWith("data:") || img.startsWith("blob:")) return img;
  return `https://images.unsplash.com/${img}?w=${size}&h=${size}&fit=crop&auto=format`;
}

async function downloadImage(src: string, filename: string) {
  const save = (href: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (src.startsWith("data:") || src.startsWith("blob:")) {
    save(src);
    return;
  }

  const toObjectUrl = async (res: Response) => {
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) throw new Error("Could not download that image.");
    const objectUrl = URL.createObjectURL(blob);
    save(objectUrl);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  try {
    const direct = await fetch(src);
    if (direct.ok) {
      await toObjectUrl(direct);
      return;
    }
  } catch {
    /* CORS — fall through to proxy */
  }

  const proxied = await fetch(`/api/download?url=${encodeURIComponent(src)}`);
  if (!proxied.ok) throw new Error("Could not download that image.");
  await toObjectUrl(proxied);
}

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

async function toJpegDataUrl(src: string, max = 1280, aspectRatio?: string) {
  const blob = await loadImageBlob(src);
  const bitmap = await createImageBitmap(blob);
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

const LOOK_IMAGES: Record<number, string> = {
  3: saintDistressedTee,
  5: raspberryHillsTee,
};

const TEMPLATES = LOOKS.map((look) => ({
  ...look,
  refs: look.refs ?? [],
  img: look.refs?.[0] || LOOK_IMAGES[look.id] || saintDistressedTee,
}));

const LOOKS_PER_PAGE = 6;
const GARMENT_FILTERS = ["All", "Tee"] as const;
const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const FREE_IMAGE_LIMIT = 3;
const FREE_USED_KEY = "shotfarm-free-used";
const PAID_CREDITS_KEY = "shotfarm-paid-credits";
const PAGE_KEY = "shotfarm-page";

type Page = "home" | "generate" | "library" | "history" | "settings";

function readSavedPage(): Page {
  try {
    const saved = sessionStorage.getItem(PAGE_KEY);
    if (saved === "home" || saved === "generate" || saved === "library" || saved === "history" || saved === "settings") {
      return saved;
    }
  } catch {
    /* ignore quota / private mode */
  }
  return "home";
}

function readPaidCredits() {
  try {
    const n = Number(localStorage.getItem(PAID_CREDITS_KEY));
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

function writePaidCredits(next: number) {
  try {
    localStorage.setItem(PAID_CREDITS_KEY, String(next));
  } catch {
    /* ignore quota / private mode */
  }
}

function readFreeUsed() {
  try {
    const n = Number(localStorage.getItem(FREE_USED_KEY));
    return Number.isFinite(n) && n > 0 ? Math.min(FREE_IMAGE_LIMIT, Math.floor(n)) : 0;
  } catch {
    return 0;
  }
}

const PLANS = [
  { id: "starter" as const, name: "Pack", price: 9, images: 20, blurb: "No monthly plan", interval: "once" as const, recommended: false },
  { id: "pro" as const, name: "Pro", price: 49, images: 150, blurb: "For ongoing collections", interval: "month" as const, recommended: true },
];

const HISTORY = [
  { id: 3, img: saintDistressedTee, prompt: "Saint distressed tee" },
  { id: 5, img: raspberryHillsTee, prompt: "Raspberry Hills tee" },
];

// ── Atoms ───────────────────────────────────────────────────────────────────

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-3 lg:py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer text-left min-h-11 lg:min-h-0 ${
        active ? "bg-[#111] text-white font-medium" : "text-[#888] hover:text-[#111] hover:bg-[#f4f4f4]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
        active ? "bg-[#111] text-white" : "bg-[#f4f4f4] text-[#666] hover:bg-[#eaeaea] hover:text-[#111]"
      }`}
    >
      {label}
    </button>
  );
}

function LibraryCard({
  tpl,
  onPreview,
  onUse,
}: {
  tpl: typeof TEMPLATES[0];
  onPreview: () => void;
  onUse: () => void;
}) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f4f4]">
        <button type="button" onClick={onPreview} className="absolute inset-0 cursor-pointer">
          <img
            src={imageSrc(tpl.img, 700)}
            alt={tpl.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        <button
          type="button"
          onClick={onUse}
          className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-semibold text-[#111] tracking-wide hover:bg-white cursor-pointer shadow-sm"
        >
          Use look
        </button>
        {tpl.summary.startsWith("Placeholder") && (
          <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-white/90 text-[10px] font-semibold text-[#888] tracking-wide">
            Placeholder
          </span>
        )}
      </div>
      <div className="pt-2.5 px-0.5">
        <p className="text-[13px] font-medium text-[#111] leading-tight">{tpl.name}</p>
        <p className="text-[11px] text-[#888] mt-0.5">{tpl.shot} · {tpl.garment}</p>
      </div>
    </article>
  );
}

function TemplateCard({ tpl, selected, onClick }: { tpl: typeof TEMPLATES[0]; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left cursor-pointer group">
      <div
        className={`relative aspect-square rounded-lg overflow-hidden bg-[#f4f4f4] ${
          selected ? "ring-2 ring-[#111]" : "ring-1 ring-[#ebebeb] group-hover:ring-[#ccc]"
        }`}
      >
        <img src={imageSrc(tpl.img, 400)} alt={tpl.name} className="w-full h-full object-cover" />
      </div>
      <p className={`mt-1.5 text-[11px] leading-tight truncate ${selected ? "text-[#111] font-medium" : "text-[#888]"}`}>
        {tpl.name}
      </p>
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold text-[#aaa] tracking-wide">{children}</p>;
}

function MockupDropzone({ images, onAdd, onRemove }: { images: string[]; onAdd: (s: string) => void; onRemove: (i: number) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    files.slice(0, 4 - images.length).forEach((f) => onAdd(URL.createObjectURL(f)));
  }, [images.length, onAdd]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.slice(0, 4 - images.length).forEach((f) => onAdd(URL.createObjectURL(f)));
    e.target.value = "";
  }, [images.length, onAdd]);

  return (
    <div>
      <div className="mb-2">
        <Label>Your mockup</Label>
      </div>
      {images.length === 0 ? (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full rounded-xl border-2 border-dashed border-[#ddd] bg-white px-4 py-8 flex flex-col items-center justify-center gap-2 text-center hover:border-[#999] hover:text-[#666] transition-colors cursor-pointer"
        >
          <span className="text-[#bbb]"><IconUpload /></span>
          <span className="text-sm font-medium text-[#333]">Upload a photo of your garment</span>
          <span className="text-xs text-[#aaa]">Front, flat lay, or on a hanger.</span>
        </button>
      ) : (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <div key={i} className="relative w-[4.5rem] h-[4.5rem] rounded-lg overflow-hidden border border-[#e8e8e8]">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => onRemove(i)} className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white cursor-pointer">
                <IconClose />
              </button>
            </div>
          ))}
          {images.length < 4 && (
            <button
              type="button"
              onClick={() => ref.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="w-[4.5rem] h-[4.5rem] rounded-lg border-2 border-dashed border-[#ddd] flex flex-col items-center justify-center gap-0.5 text-[#bbb] hover:border-[#999] hover:text-[#666] transition-colors cursor-pointer"
            >
              <IconUpload />
              <span className="text-[9px] font-semibold tracking-wide">ADD</span>
            </button>
          )}
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
    </div>
  );
}

function GeneratingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border border-[#e8e8e8] animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-t-[#111] border-r-transparent border-b-transparent border-l-transparent border-2 animate-[spin_1.4s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border-b-[#555] border-t-transparent border-r-transparent border-l-transparent border-2 animate-[spin_2s_linear_infinite_reverse]" />
      </div>
      <div className="text-center">
        <p className="text-[#111] text-xl font-700 tracking-tight">Applying look</p>
        <p className="text-[#999] text-sm mt-1">Restyling your mockup to match this template…</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#ccc]" style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

function Paywall({
  selectedPlan,
  onSelectPlan,
  onClose,
  onSubscribe,
}: {
  selectedPlan: (typeof PLANS)[number]["id"];
  onSelectPlan: (id: (typeof PLANS)[number]["id"]) => void;
  onClose: () => void;
  onSubscribe: () => Promise<void> | void;
}) {
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[0];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setError(null);
    setBusy(true);
    try {
      await onSubscribe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not start.");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <button
        type="button"
        aria-label="Close paywall"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 cursor-pointer"
      />
      <div className="relative w-full sm:max-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-[#ebebeb]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[#111] text-2xl font-700 tracking-tight">Keep creating</p>
              <p className="text-[#888] text-sm mt-1.5 leading-relaxed">You've used your 3 free images. Get more to keep applying looks to your mockups.</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#888] hover:bg-[#f4f4f4] hover:text-[#111] cursor-pointer flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-2.5">
          {PLANS.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPlan(p.id)}
                className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all cursor-pointer ${
                  active ? "border-[#111] bg-[#fafafa]" : "border-[#ebebeb] hover:border-[#ccc]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#111]">{p.name}</span>
                      {p.recommended && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[#111] text-white">Best value</span>
                      )}
                    </div>
                    <p className="text-xs text-[#888] mt-0.5">
                      {p.interval === "once" ? `${p.images} images · ${p.blurb}` : `${p.images} images / month · ${p.blurb}`}
                    </p>
                  </div>
                  <p className="text-[#111] text-xl font-700 tracking-wide">
                    ${p.price}
                    {p.interval === "month" && <span className="text-xs font-medium text-[#aaa] tracking-normal">/mo</span>}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-6 pb-6 pt-1">
          <button
            type="button"
            onClick={handleContinue}
            disabled={busy}
            className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#111", fontSize: "15px", letterSpacing: "0.04em" }}
          >
            {busy ? "Redirecting…" : `Continue with ${plan.name}`}
          </button>
          <p className={`text-[11px] text-center mt-2.5 ${error ? "text-[#111]" : "text-[#bbb]"}`}>
            {error
              ? error
              : plan.interval === "once"
                ? "One-time. Credits don't expire."
                : "Cancel anytime. Unused images don't roll over."}
          </p>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSlider({ beforeSrc, afterSrc }: { beforeSrc: string; afterSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromX]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#ebebeb] bg-white select-none cursor-ew-resize touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromX(e.clientX);
      }}
    >
      <img src={afterSrc} alt="Look applied" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={beforeSrc} alt="Your mockup" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
      </div>
      <div className="absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#ebebeb] shadow-md flex items-center justify-center text-[#111]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 6 4 12 9 18" /><polyline points="15 6 20 12 15 18" />
          </svg>
        </div>
      </div>
      <span
        className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/55 text-white text-[10px] font-semibold tracking-wide pointer-events-none"
        style={{ opacity: Math.min(1, Math.max(0, pos / 50)) }}
      >
        Your mockup
      </span>
      <span
        className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/55 text-white text-[10px] font-semibold tracking-wide pointer-events-none"
        style={{ opacity: Math.min(1, Math.max(0, (100 - pos) / 50)) }}
      >
        Look applied
      </span>
    </div>
  );
}

const FAQS = [
  {
    q: "What is ShotFarm?",
    a: "ShotFarm turns your garment mockup into a finished look. Upload a piece, pick a locked template, and we apply that shot style for you.",
  },
  {
    q: "How does it work?",
    a: "Upload a photo of your garment. Choose Saint Distressed Tee or Raspberry Hills Tee. We restyle your design onto that template — color and print from you, fabric and shot from the look.",
  },
  {
    q: "Do I need a real photoshoot?",
    a: "No. A digital mockup, flat lay, or hanger shot is enough. ShotFarm is built for brands that need the look without booking a studio.",
  },
  {
    q: "How many free images do I get?",
    a: "Every account gets 3 free images. After that, buy a Pack for 20 images or Pro for 150 images a month.",
  },
  {
    q: "What do the paid plans include?",
    a: "Pack is $9 for 20 images, one time. Pro is $49 a month for 150 images. Credits stay on your signed-in account so you can use them on any device.",
  },
  {
    q: "Can I use the images in my store?",
    a: "Yes. Download the JPEG and use it on your site, socials, or lookbook. You keep the rights to your design.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#111] tracking-tight text-center mb-8">FAQ</h2>
        <div className="rounded-[26px] bg-[#f4f4f4] p-1 flex flex-col gap-0.5">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left rounded-3xl bg-white border border-[#ebebeb] px-6 py-6 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-1 text-[15px] font-medium text-[#111] leading-snug">{item.q}</span>
                  <span className="relative w-7 h-7 rounded-full bg-[#f4f4f4] flex-shrink-0" aria-hidden>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-[#111]" />
                    <span
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3 bg-[#111] transition-transform duration-200 ${
                        isOpen ? "rotate-90 scale-y-0" : ""
                      }`}
                    />
                  </span>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pt-4 text-sm text-[#555] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LandingPage({
  onStart,
  onLooks,
  signedIn,
  showSignIn,
  onSignIn,
}: {
  onStart: () => void;
  onLooks: () => void;
  signedIn: boolean;
  showSignIn: boolean;
  onSignIn: () => void;
}) {
  const startLabel = signedIn ? "Generate" : "Get started";

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-white">
      <div className="min-h-full flex flex-col">
      <header className="flex items-center justify-between gap-3 px-5 py-4 flex-shrink-0">
        <BrandLockup />
        {showSignIn ? (
          <button
            type="button"
            onClick={onSignIn}
            className="text-sm text-[#888] hover:text-[#111] cursor-pointer"
          >
            Sign in
          </button>
        ) : null}
      </header>

      <section className="flex flex-col items-center px-6 pt-12 pb-10 gap-10">
        <div className="text-center max-w-sm">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#111] tracking-tight leading-[1.15]">
            Your mockup,<br />shot like the look.
          </h1>
          <p className="mt-3 text-sm text-[#888] leading-relaxed">
            Upload a garment. Pick a template. We apply it for you.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#111] text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
            style={{ letterSpacing: "0.04em" }}
          >
            {startLabel}
          </button>
        </div>
        <div className="w-full max-w-[420px]">
          <BeforeAfterSlider beforeSrc={raspberryHillsMockup} afterSrc={raspberryHillsTee} />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#111] tracking-tight leading-[1.15]">How it works</h2>
          <p className="mt-3 text-sm text-[#888] leading-relaxed">
            Upload a garment. Pick a template.<br />We apply it for you.
          </p>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            { n: "01", title: "Upload your mockup", body: "A digital garment shot is enough.", img: null as string | null, imgLabel: "Mockup example" },
            { n: "02", title: "Pick a look", body: "Choose from our set templates.", img: null as string | null, imgLabel: "Look example" },
            { n: "03", title: "We apply it", body: "Your piece comes back in that look.", img: null as string | null, imgLabel: "Result example" },
          ].map((step) => (
            <div key={step.n} className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-[11px] font-medium text-[#bbb] tracking-[0.16em]">{step.n}</p>
                <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#111] tracking-tight">{step.title}</h2>
              </div>
              <p className="mt-0 mb-3 text-sm text-[#888] leading-snug">{step.body}</p>
              {step.img ? (
                <img
                  src={step.img}
                  alt={step.imgLabel}
                  className="w-full aspect-square object-cover rounded-xl bg-[#f4f4f4]"
                />
              ) : (
                <div
                  className="w-full aspect-square rounded-xl bg-[#f4f4f4] border border-dashed border-[#ddd] flex items-center justify-center"
                  aria-hidden
                >
                  <span className="text-[11px] text-[#bbb] tracking-[0.08em]">{step.imgLabel}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={onStart}
            className="px-5 py-2.5 rounded-lg bg-[#111] text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
            style={{ letterSpacing: "0.04em" }}
          >
            {startLabel}
          </button>
          {signedIn ? null : <p className="text-[12px] text-[#bbb] mt-3">3 free images to start</p>}
        </div>
      </section>

      <FaqSection />

      <footer className="mt-auto px-6 pt-16 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-[#bbb]">© 2026 ShotFarm</p>
        <nav className="flex items-center gap-5 text-[12px] text-[#888]">
          <button type="button" onClick={onLooks} className="hover:text-[#111] cursor-pointer">Looks</button>
          <button type="button" className="hover:text-[#111] cursor-pointer">Privacy</button>
          <button type="button" className="hover:text-[#111] cursor-pointer">Terms</button>
        </nav>
      </footer>
      </div>
    </div>
  );
}

function LookPreview({
  look,
  onClose,
  onUse,
}: {
  look: typeof TEMPLATES[0];
  onClose: () => void;
  onUse: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 cursor-pointer"
      />
      <div className="relative w-full sm:max-w-[480px] max-h-[92dvh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#ebebeb] flex-shrink-0">
          <div className="min-w-0">
            <p className="text-[#111] text-base font-semibold truncate">{look.name}</p>
            <p className="text-[#888] text-xs mt-0.5">{look.shot} · {look.garment}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#888] hover:bg-[#f4f4f4] hover:text-[#111] cursor-pointer flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 bg-[#f7f7f7] flex items-center justify-center p-4 overflow-auto">
          <img
            src={imageSrc(look.img, 900)}
            alt={look.name}
            className="max-w-full max-h-[min(70dvh,560px)] object-contain rounded-lg"
          />
        </div>
        <div className="px-5 py-4 border-t border-[#ebebeb] flex-shrink-0">
          <p className="text-sm text-[#666] leading-relaxed mb-4">{look.summary}</p>
          <button
            type="button"
            onClick={onUse}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "#111", letterSpacing: "0.04em" }}
          >
            Use this look
          </button>
        </div>
      </div>
    </div>
  );
}

function LibraryPage({
  templates,
  total,
  query,
  onQuery,
  garmentFilter,
  onGarmentFilter,
  onPreview,
  onUse,
  onStart,
}: {
  templates: typeof TEMPLATES;
  total: number;
  query: string;
  onQuery: (q: string) => void;
  garmentFilter: (typeof GARMENT_FILTERS)[number];
  onGarmentFilter: (garment: (typeof GARMENT_FILTERS)[number]) => void;
  onPreview: (id: number) => void;
  onUse: (id: number) => void;
  onStart: () => void;
}) {
  const [setIndex, setSetIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(templates.length / LOOKS_PER_PAGE));

  useEffect(() => {
    setSetIndex(0);
  }, [query, garmentFilter]);

  const safeIndex = Math.min(setIndex, pageCount - 1);
  const pages: (typeof TEMPLATES)[] = [];
  for (let i = 0; i < templates.length; i += LOOKS_PER_PAGE) {
    pages.push(templates.slice(i, i + LOOKS_PER_PAGE));
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <header className="flex-shrink-0 px-5 sm:px-8 pt-6 pb-5 border-b border-[#ebebeb]">
        <div className="flex items-start sm:items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-700 text-[#111] tracking-tight">Templates</h1>
            <p className="text-[#aaa] text-sm mt-0.5">The set we apply to your mockup.</p>
          </div>
          <button
            type="button"
            onClick={onStart}
            className="flex-shrink-0 px-3.5 py-2 rounded-lg border border-[#e8e8e8] text-[#111] text-sm font-medium hover:border-[#111] cursor-pointer transition-colors"
          >
            Apply a look
          </button>
        </div>
        <div className="relative mt-5">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb] pointer-events-none">
            <IconSearch />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search looks"
            className="w-full rounded-lg bg-[#fafafa] border border-[#e8e8e8] pl-9 pr-3 py-2.5 text-sm text-[#111] placeholder:text-[#ccc] focus:border-[#999] focus:bg-white focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mx-0.5 px-0.5">
            {GARMENT_FILTERS.map((garment) => (
              <Pill key={garment} label={garment} active={garmentFilter === garment} onClick={() => onGarmentFilter(garment)} />
            ))}
          </div>
          <span className="text-[11px] text-[#bbb] flex-shrink-0">{templates.length} of {total}</span>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {templates.length === 0 ? (
          <p className="text-sm text-[#aaa] py-16 text-center px-5">No looks match that. Try another garment or search.</p>
        ) : (
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${safeIndex * 100}%)` }}
              >
                {pages.map((pageLooks, i) => (
                  <div key={i} className="w-full min-w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10">
                    {pageLooks.map((tpl) => (
                      <LibraryCard
                        key={tpl.id}
                        tpl={tpl}
                        onPreview={() => onPreview(tpl.id)}
                        onUse={() => onUse(tpl.id)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  aria-label="Previous looks"
                  disabled={safeIndex === 0}
                  onClick={() => setSetIndex((n) => Math.max(0, n - 1))}
                  className="w-10 h-10 rounded-full border border-[#e8e8e8] flex items-center justify-center text-[#111] hover:border-[#111] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevron dir="left" />
                </button>
                <span className="text-[12px] text-[#888] tabular-nums">{safeIndex + 1} / {pageCount}</span>
                <button
                  type="button"
                  aria-label="Next looks"
                  disabled={safeIndex >= pageCount - 1}
                  onClick={() => setSetIndex((n) => Math.min(pageCount - 1, n + 1))}
                  className="w-10 h-10 rounded-full border border-[#e8e8e8] flex items-center justify-center text-[#111] hover:border-[#111] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <IconChevron dir="right" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 border-t border-[#ebebeb] bg-white/95 backdrop-blur-sm px-5 sm:px-8 py-3 flex items-center justify-between gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="text-[13px] text-[#888] leading-snug min-w-0">Upload a mockup to apply one of these looks.</p>
        <button
          type="button"
          onClick={onStart}
          className="flex-shrink-0 px-3.5 py-2 rounded-lg border border-[#111] text-[#111] text-sm font-medium hover:bg-[#111] hover:text-white cursor-pointer transition-colors"
        >
          Apply a look
        </button>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  if (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) return <AppWithClerk />;
  return <AppShell session={localSession} />;
}

function AppWithClerk() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [account, setAccount] = useState<AccountSnap | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);

  const refreshAccount = useCallback(async () => {
    if (!isSignedIn) {
      setAccount(null);
      return null;
    }
    const next = await fetchAccount(getToken);
    setAccount(next);
    return next;
  }, [getToken, isSignedIn]);

  useEffect(() => {
    void refreshAccount();
  }, [refreshAccount]);

  useEffect(() => {
    if (isSignedIn) setSignInOpen(false);
  }, [isSignedIn]);

  useEffect(() => {
    document.body.style.overflow = signInOpen && !isSignedIn ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSignedIn, signInOpen]);

  const session: Session = {
    configured: true,
    ready: isLoaded,
    signedIn: Boolean(isSignedIn),
    getToken,
    openSignIn: () => setSignInOpen(true),
    account,
    applyAccount: setAccount,
    refreshAccount,
  };

  return (
    <>
      <AppShell session={session} />
      {signInOpen && !isSignedIn && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 overflow-hidden">
          <div className="relative w-full max-w-[400px] max-h-[min(92dvh,40rem)] overflow-x-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Close sign in"
              onClick={() => setSignInOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#f4f4f4] text-[#888] hover:text-[#111] hover:bg-[#ebebeb] cursor-pointer"
            >
              ×
            </button>
            <SignIn appearance={clerkAppearance} localization={clerkLocalization} routing="hash" />
          </div>
        </div>
      )}
    </>
  );
}

function AppShell({ session }: { session: Session }) {
  const [page, setPage] = useState<Page>(readSavedPage);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [lookQuery, setLookQuery] = useState("");
  const [garmentFilter, setGarmentFilter] = useState<(typeof GARMENT_FILTERS)[number]>("All");
  const [mockups, setMockups] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localFreeUsed, setLocalFreeUsed] = useState(readFreeUsed);
  const [localPaidCredits, setLocalPaidCredits] = useState(readPaidCredits);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[number]["id"]>("starter");
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [lookSetIndex, setLookSetIndex] = useState(0);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const freeUsed = session.configured ? session.account?.freeUsed ?? 0 : localFreeUsed;
  const paidCredits = session.configured ? session.account?.paidCredits ?? 0 : localPaidCredits;
  const needsSignIn = session.configured && session.ready && !session.signedIn;

  const goTo = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    try {
      sessionStorage.setItem(PAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    if (next === "generate" && !needsSignIn && freeUsed >= FREE_IMAGE_LIMIT && paidCredits <= 0) setPaywallOpen(true);
    if (next === "home") setPaywallOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (previewId !== null) setPreviewId(null);
        else if (paywallOpen) setPaywallOpen(false);
        else setMenuOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    document.body.style.overflow = menuOpen || paywallOpen || previewId !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = "";
    };
  }, [menuOpen, paywallOpen, previewId]);

  useEffect(() => {
    setLookSetIndex(0);
  }, [garmentFilter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/confirm-checkout?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (cancelled || !data.ok) return;
        if (session.configured) {
          for (let i = 0; i < 8; i += 1) {
            const account = await session.refreshAccount();
            if (account && account.paidCredits > 0) break;
            await new Promise((resolve) => setTimeout(resolve, 700));
            if (cancelled) return;
          }
        } else if (data.plan === "pro") {
          setLocalPaidCredits((prev) => {
            const next = prev + 150;
            writePaidCredits(next);
            return next;
          });
        } else {
          setLocalPaidCredits((prev) => {
            const next = prev + 20;
            writePaidCredits(next);
            return next;
          });
        }
        setPaywallOpen(false);
        setPage("generate");
        try {
          sessionStorage.setItem(PAGE_KEY, "generate");
        } catch {
          /* ignore */
        }
      } catch {
        /* checkout confirm failed */
      } finally {
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session.configured, session.refreshAccount]);

  const generateTemplates = TEMPLATES.filter((t) => garmentFilter === "All" || t.garment === garmentFilter);
  const filteredTemplates = generateTemplates.filter((t) => {
    const q = lookQuery.trim().toLowerCase();
    return (
      q.length === 0 ||
      t.name.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.shot.toLowerCase().includes(q) ||
      t.garment.toLowerCase().includes(q)
    );
  });

  const lookPageCount = Math.max(1, Math.ceil(generateTemplates.length / LOOKS_PER_PAGE));
  const lookSafeIndex = Math.min(lookSetIndex, lookPageCount - 1);
  const lookPages: (typeof TEMPLATES)[] = [];
  for (let i = 0; i < generateTemplates.length; i += LOOKS_PER_PAGE) {
    lookPages.push(generateTemplates.slice(i, i + LOOKS_PER_PAGE));
  }

  const selectedLook = TEMPLATES.find((t) => t.id === selectedTemplate) ?? null;
  const previewLook = TEMPLATES.find((t) => t.id === previewId) ?? null;
  const freeLeft = Math.max(0, FREE_IMAGE_LIMIT - freeUsed);
  const imagesLeft = freeLeft + paidCredits;
  const outOfCredits = imagesLeft <= 0;
  const canGenerate = mockups.length > 0 && selectedTemplate !== null && !generating && !outOfCredits;

  const spendLocalCredit = (useFree: boolean) => {
    if (useFree) {
      setLocalFreeUsed((prev) => {
        const next = Math.min(FREE_IMAGE_LIMIT, prev + 1);
        try {
          localStorage.setItem(FREE_USED_KEY, String(next));
        } catch {
          /* ignore quota / private mode */
        }
        return next;
      });
    } else {
      setLocalPaidCredits((prev) => {
        const next = Math.max(0, prev - 1);
        writePaidCredits(next);
        return next;
      });
    }
  };

  const handleGenerate = async () => {
    if (needsSignIn) {
      session.openSignIn();
      return;
    }
    if (outOfCredits) {
      setPaywallOpen(true);
      return;
    }
    if (!canGenerate || !selectedLook) return;
    setGenerating(true);
    setResult(null);
    setGenerateError(null);
    const useFree = freeLeft > 0;
    try {
      const encodedMockups = await Promise.all(mockups.map((src) => toJpegDataUrl(src, 1280)));
      const lookSources = selectedLook.refs.length > 0 ? selectedLook.refs : [selectedLook.img];
      const lookImages = await Promise.all(lookSources.map((src) => toJpegDataUrl(src, 1280)));
      const token = session.configured ? await session.getToken() : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          lookId: selectedLook.id,
          mockups: encodedMockups,
          lookImages,
          aspectRatio,
        }),
      });
      const data = await res.json().catch(() => ({} as { image?: string; error?: string; code?: string; freeUsed?: number; paidCredits?: number }));
      if (res.status === 401) {
        session.openSignIn();
        throw new Error("Sign in to apply a look.");
      }
      if (res.status === 402 || data.code === "out_of_credits") {
        setPaywallOpen(true);
        if (typeof data.freeUsed === "number" && typeof data.paidCredits === "number") {
          session.applyAccount({ freeUsed: data.freeUsed, paidCredits: data.paidCredits });
        }
        throw new Error("No images left.");
      }
      if (!res.ok || typeof data.image !== "string") {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : res.status === 404
              ? "Generation only runs on the live Vercel site."
              : "Could not apply this look. Try again.",
        );
      }
      try {
        setResult(await toJpegDataUrl(data.image, 1600, aspectRatio));
      } catch {
        setResult(data.image);
      }
      if (typeof data.freeUsed === "number" && typeof data.paidCredits === "number") {
        session.applyAccount({ freeUsed: data.freeUsed, paidCredits: data.paidCredits });
      } else if (!session.configured) {
        spendLocalCredit(useFree);
      }
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Nano could not apply this look.");
    } finally {
      setGenerating(false);
    }
  };

  const startCheckout = async () => {
    if (needsSignIn) {
      session.openSignIn();
      return;
    }
    const token = session.configured ? await session.getToken() : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers,
      body: JSON.stringify({ plan: selectedPlan }),
    });
    const data = await res.json().catch(() => ({} as { url?: string; error?: string }));
    if (res.status === 401) {
      session.openSignIn();
      throw new Error("Sign in to buy images.");
    }
    if (!res.ok || !data.url) {
      throw new Error(typeof data.error === "string" ? data.error : "Checkout could not start.");
    }
    window.location.href = data.url;
  };

  return (
    <div className="flex flex-col lg:flex-row h-dvh overflow-hidden bg-white font-sans">
      {page === "home" ? (
        <LandingPage
          onStart={() => goTo("generate")}
          onLooks={() => goTo("library")}
          signedIn={session.signedIn}
          showSignIn={needsSignIn}
          onSignIn={() => session.openSignIn()}
        />
      ) : (
        <>
      {/* ── Mobile top bar ─────────────────────────────────────────────── */}
      <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#ebebeb] bg-white flex-shrink-0 z-30">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="w-11 h-11 -ml-1 flex items-center justify-center rounded-lg text-[#111] hover:bg-[#f4f4f4] cursor-pointer"
        >
          <IconMenu />
        </button>
        <BrandLockup />
      </header>

      {/* ── Mobile menu overlay ────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[min(280px,86vw)] flex flex-col border-r border-[#ebebeb] bg-white transition-transform duration-200 ease-out lg:relative lg:z-auto lg:w-[210px] lg:flex-shrink-0 lg:translate-x-0 lg:pointer-events-auto ${
          menuOpen ? "translate-x-0 shadow-2xl lg:shadow-none" : "-translate-x-full pointer-events-none"
        }`}
      >

        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-[#ebebeb] flex items-center justify-between gap-2">
          <BrandLockup />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#888] hover:bg-[#f4f4f4] hover:text-[#111] cursor-pointer flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5">
          <NavItem icon={<IconHome />} label="Home" active={false} onClick={() => goTo("home")} />
          <NavItem icon={<IconGenerate />} label="Generate" active={page === "generate"} onClick={() => goTo("generate")} />
          <NavItem icon={<IconLibrary />} label="Templates" active={page === "library"} onClick={() => goTo("library")} />
          <NavItem icon={<IconHistory />} label="History" active={page === "history"} onClick={() => goTo("history")} />
        </nav>

        <div className="p-3 border-t border-[#ebebeb] flex flex-col gap-0.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-3">
          <NavItem icon={<IconSettings />} label="Settings" active={page === "settings"} onClick={() => goTo("settings")} />
          {session.configured && (
            <div className="mt-2 px-1">
              {session.signedIn ? (
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <UserButton appearance={clerkAppearance} />
                  <span className="text-[11px] text-[#888] truncate">Your account</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => session.openSignIn()}
                  className="w-full py-2 rounded-lg border border-[#e8e8e8] text-[11px] font-semibold text-[#111] hover:border-[#ccc] cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          )}
          <div className="mt-3 px-3 py-3 rounded-xl bg-[#f7f7f7]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-[#888]">{needsSignIn ? "Images" : paidCredits > 0 ? "Images" : "Free images"}</span>
              <span className="text-[11px] font-semibold text-[#111]">{needsSignIn ? "—" : `${imagesLeft} left`}</span>
            </div>
            <div className="h-1 rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#111]" style={{ width: needsSignIn ? "0%" : `${Math.min(100, (imagesLeft / Math.max(imagesLeft, FREE_IMAGE_LIMIT)) * 100)}%` }} />
            </div>
            <p className="text-[10px] text-[#bbb] mt-1.5">
              {needsSignIn
                ? "Sign in to keep your images"
                : paidCredits > 0
                  ? `${paidCredits} paid · ${freeLeft} free`
                  : outOfCredits
                    ? "You've used your 3 free images"
                    : `${freeUsed} / ${FREE_IMAGE_LIMIT} used · that's all for free`}
            </p>
            {!needsSignIn && outOfCredits && (
              <button
                type="button"
                onClick={() => setPaywallOpen(true)}
                className="mt-2.5 w-full py-2 rounded-lg bg-[#111] text-white text-[11px] font-semibold tracking-wide cursor-pointer hover:opacity-90"
                style={{ letterSpacing: "0.04em" }}
              >
                Get more
              </button>
            )}
          </div>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-h-0 ${page === "library" || page === "settings" ? "overflow-hidden" : "md:flex-row overflow-y-auto md:overflow-hidden"}`}>

      {page === "library" ? (
        <LibraryPage
          templates={filteredTemplates}
          total={TEMPLATES.length}
          query={lookQuery}
          onQuery={setLookQuery}
          garmentFilter={garmentFilter}
          onGarmentFilter={setGarmentFilter}
          onPreview={setPreviewId}
          onUse={(id) => {
            setSelectedTemplate(id);
            goTo("generate");
          }}
          onStart={() => goTo("generate")}
        />
      ) : page === "settings" ? (
        import.meta.env.DEV ? (
          <LooksEditor thumbs={LOOK_IMAGES} />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-sm text-[#aaa] text-center">Edit templates in the local app.</p>
          </div>
        )
      ) : (
      <>
      {/* ── Control Panel ────────────────────────────────────────────────── */}
      <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[#ebebeb] md:overflow-y-auto md:h-full bg-[#fafafa]">

        <div className="flex-1 px-5 py-5 flex flex-col gap-6">

          <MockupDropzone
            images={mockups}
            onAdd={(src) => setMockups((p) => [...p, src])}
            onRemove={(i) => setMockups((p) => p.filter((_, j) => j !== i))}
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Choose a look</Label>
              {lookPageCount > 1 && (
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Previous looks"
                    disabled={lookSafeIndex === 0}
                    onClick={() => setLookSetIndex((n) => Math.max(0, n - 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#bbb] hover:text-[#111] cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <IconChevron dir="left" />
                  </button>
                  <span className="text-[10px] text-[#ccc] tabular-nums w-7 text-center">
                    {lookSafeIndex + 1}/{lookPageCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Next looks"
                    disabled={lookSafeIndex >= lookPageCount - 1}
                    onClick={() => setLookSetIndex((n) => Math.min(lookPageCount - 1, n + 1))}
                    className="w-6 h-6 flex items-center justify-center text-[#bbb] hover:text-[#111] cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <IconChevron dir="right" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-3 mb-3 overflow-x-auto">
              {GARMENT_FILTERS.map((garment) => (
                <button
                  key={garment}
                  type="button"
                  onClick={() => setGarmentFilter(garment)}
                  className={`text-[11px] flex-shrink-0 cursor-pointer ${
                    garmentFilter === garment ? "text-[#111]" : "text-[#bbb] hover:text-[#666]"
                  }`}
                >
                  {garment}
                </button>
              ))}
            </div>
            {generateTemplates.length === 0 ? (
              <p className="text-sm text-[#aaa] py-8 text-center">No looks for that garment.</p>
            ) : (
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${lookSafeIndex * 100}%)` }}
                >
                  {lookPages.map((pageLooks, i) => (
                    <div key={i} className="w-full min-w-full flex-shrink-0 grid grid-cols-2 gap-x-2.5 gap-y-3">
                      {pageLooks.map((tpl) => (
                        <TemplateCard
                          key={tpl.id}
                          tpl={tpl}
                          selected={selectedTemplate === tpl.id}
                          onClick={() => setPreviewId(tpl.id)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="mb-2">
              <Label>Output size</Label>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-0.5 px-0.5">
              {ASPECT_RATIOS.map((r) => (
                <button
                  key={r}
                  onClick={() => setAspectRatio(r)}
                  className={`flex-1 min-w-[3.25rem] py-2 lg:py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer border ${
                    aspectRatio === r
                      ? "bg-[#111] text-white border-[#111]"
                      : "bg-white text-[#888] border-[#e8e8e8] hover:border-[#ccc] hover:text-[#333]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate */}
        <div className="p-4 sm:p-5 border-t border-[#ebebeb] bg-white sticky bottom-0 md:static z-10">
          <button
            onClick={handleGenerate}
            disabled={generating || (!outOfCredits && !canGenerate)}
            className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: "#111", fontSize: "15px", letterSpacing: "0.04em" }}
          >
            <IconGenerate />
            {generating ? "Applying look…" : needsSignIn ? "Sign in to apply" : "Apply this look"}
          </button>
          {!generating && (
            <p className={`text-[11px] text-center mt-2 ${generateError ? "text-[#111]" : "text-[#bbb]"}`}>
              {generateError
                ? generateError
                : needsSignIn
                  ? "Your images stay on this account"
                  : outOfCredits
                    ? "Get more images to continue"
                    : mockups.length === 0
                      ? "Upload a mockup to continue"
                      : selectedTemplate
                        ? `${imagesLeft} ${imagesLeft === 1 ? "image" : "images"} left`
                        : "Pick a look to continue"}
            </p>
          )}
        </div>
      </div>

      {/* ── Output ──────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white max-md:min-h-[min(70vh,calc(100dvh-3.5rem))]">

        {result && !generating && (
          <div className="flex-shrink-0 flex items-center justify-end gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-[#ebebeb]">
            <button className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg border border-[#e8e8e8] text-[#555] text-sm hover:border-[#ccc] hover:text-[#111] transition-all cursor-pointer">
              <IconShare /> <span className="hidden sm:inline">Share</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!result || downloading) return;
                setDownloading(true);
                try {
                  const name = (selectedLook?.name || "piece").toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  await downloadImage(imageSrc(result, 1600), `shotfarm-${name}.jpg`);
                } catch {
                  setGenerateError("Could not download that image.");
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#111] text-white text-sm hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              <IconDownload /> <span className="hidden sm:inline">{downloading ? "Downloading…" : "Download"}</span>
            </button>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 min-h-0 overflow-hidden bg-[#fafafa]">
          <div className="h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {generating ? (
            <div className="w-full max-w-md h-full max-h-full rounded-2xl border border-[#ebebeb] bg-white flex items-center justify-center">
              <GeneratingState />
            </div>
          ) : result ? (
            <img
              src={imageSrc(result, 900)}
              alt="Restyled piece"
              className="rounded-2xl shadow-sm max-h-full max-w-full w-auto h-auto object-contain border border-[#ebebeb]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#e8e8e8] flex items-center justify-center text-[#ccc]">
                <IconSpark />
              </div>
              <div>
                <p className="text-[#bbb] text-lg font-600 tracking-tight">No piece yet</p>
                <p className="text-[#ccc] text-sm mt-1">Upload a mockup and pick a look</p>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* History strip */}
        <div className="flex-shrink-0 relative z-10 border-t border-[#ebebeb] px-4 sm:px-6 lg:px-8 py-4 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-[10px] font-semibold text-[#bbb] tracking-wide mb-3">Recent</p>
          <div className="flex gap-2">
            {HISTORY.map((h) => (
              <button
                key={h.id}
                onClick={() => setResult(h.img)}
                className="group relative w-14 h-14 rounded-xl overflow-hidden border border-[#ebebeb] hover:border-[#999] transition-all duration-150 cursor-pointer flex-shrink-0"
              >
                <img
                  src={imageSrc(h.img, 112)}
                  alt={h.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </button>
            ))}
            <button className="w-14 h-14 rounded-xl border border-dashed border-[#e8e8e8] flex items-center justify-center text-[#ccc] hover:border-[#ccc] hover:text-[#888] transition-all cursor-pointer text-[10px] font-semibold tracking-wide">
              ALL
            </button>
          </div>
        </div>
      </main>
      </>
      )}
      </div>
        </>
      )}
      {previewLook && (
        <LookPreview
          look={previewLook}
          onClose={() => setPreviewId(null)}
          onUse={() => {
            setSelectedTemplate(previewLook.id);
            setPreviewId(null);
            goTo("generate");
          }}
        />
      )}
      {paywallOpen && page !== "home" && (
        <Paywall
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          onClose={() => setPaywallOpen(false)}
          onSubscribe={startCheckout}
        />
      )}
    </div>
  );
}
