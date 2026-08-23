import { useState, useRef, useCallback, useEffect } from "react";
import { SignIn, UserButton, useAuth } from "@clerk/react";
import saintDistressedTee from "./assets/templates/saint-distressed-tee.jpg";
import raspberryHillsTee from "./assets/raspberry-hills-white.jpg";
import raspberryHillsTemplate from "./assets/templates/raspberry-hills-tee.jpg";
import landingMockup from "./assets/landing-mockup.jpg";
import completeControlLongSleeve from "./assets/gTtqOYCJbVo5MUj9JPBzm_kNXFQ69K.jpg";
import completeControlDistressedTee from "./assets/LXtAAMhNx7GBk_8PmuMw2_bReF0ypb.jpg";
import archivesTee from "./assets/templates/archives-tee.jpg";
import prettyToxicTee from "./assets/templates/pretty-toxic-tee.jpg";
import palywoodTee from "./assets/templates/palywood-tee.jpg";
import shimTee from "./assets/templates/shim-tee.jpg";
import aliceGalerieTee from "./assets/templates/alice-galerie-tee.jpg";
import trinityTee from "./assets/templates/trinity-tee.jpg";
import washedZipHoodie from "./assets/templates/washed-zip-hoodie.jpg";
import prizemanCap from "./assets/templates/prizeman-cap.jpg";
import dhsCap from "./assets/templates/dhs-cap.jpg";
import tinosCap from "./assets/templates/tinos-cap.jpg";
import stinkyDogCap from "./assets/templates/stinky-dog-cap.jpg";
import shotfarmLogo from "./assets/shotfarm-logo.png";
import { LOOKS } from "./looks";
import { FREE_IMAGE_LIMIT, PAYWALL_ENABLED } from "../lib/billing";
import LooksEditor from "./LooksEditor";
import StarsGalaxy from "./StarsGalaxy";
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
      <p className="type-headline text-lg">ShotFarm</p>
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
  5: raspberryHillsTemplate,
  6: archivesTee,
  7: prettyToxicTee,
  8: palywoodTee,
  9: shimTee,
  10: aliceGalerieTee,
  11: trinityTee,
  12: washedZipHoodie,
  13: prizemanCap,
  14: dhsCap,
  15: tinosCap,
  16: stinkyDogCap,
  17: completeControlLongSleeve,
  18: completeControlDistressedTee,
};

const TEMPLATES = LOOKS.map((look) => ({
  ...look,
  refs: look.refs ?? [],
  img: look.refs?.[0] || LOOK_IMAGES[look.id] || saintDistressedTee,
}));

const LOOKS_PER_PAGE = 6;
const GARMENT_FILTERS = ["All", "Tee", "Hoodie", "Long sleeve", "Hat"] as const;
const COMING_SOON = import.meta.env.VITE_COMING_SOON !== "false";
const COMING_SOON_ACCESS_CODE = "Lovehurtme23$";
const COMING_SOON_ACCESS_KEY = "shotfarm-coming-soon-access";
const ASPECT_RATIOS = [
  { id: "1:1", label: "Feed", hint: "Square", w: 16, h: 16, radius: "rounded-[4px]" },
  { id: "3:4", label: "Post", hint: "Portrait", w: 13, h: 17, radius: "rounded-[4px]" },
  { id: "9:16", label: "Story", hint: "Full screen", w: 10, h: 18, radius: "rounded-[5px]" },
  { id: "4:3", label: "Photo", hint: "Classic", w: 18, h: 14, radius: "rounded-[4px]" },
  { id: "16:9", label: "Wide", hint: "Landscape", w: 20, h: 11, radius: "rounded-[3px]" },
] as const;
const FREE_USED_KEY = "shotfarm-free-used";
const PAID_CREDITS_KEY = "shotfarm-paid-credits";
const PENDING_CHECKOUT_KEY = "shotfarm-pending-checkout";
const CREDITED_SESSIONS_KEY = "shotfarm-credited-sessions";
const PAGE_KEY = "shotfarm-page";
const AFTER_AUTH_KEY = "shotfarm-after-auth";

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

function readPendingCheckout() {
  try {
    return localStorage.getItem(PENDING_CHECKOUT_KEY);
  } catch {
    return null;
  }
}

function writePendingCheckout(sessionId: string) {
  try {
    localStorage.setItem(PENDING_CHECKOUT_KEY, sessionId);
  } catch {
    /* ignore quota / private mode */
  }
}

function clearPendingCheckout() {
  try {
    localStorage.removeItem(PENDING_CHECKOUT_KEY);
  } catch {
    /* ignore */
  }
}

function checkoutAlreadyCredited(sessionId: string) {
  try {
    const seen = JSON.parse(localStorage.getItem(CREDITED_SESSIONS_KEY) || "[]") as unknown;
    return Array.isArray(seen) && seen.includes(sessionId);
  } catch {
    return false;
  }
}

function markCheckoutCredited(sessionId: string) {
  try {
    const seen = JSON.parse(localStorage.getItem(CREDITED_SESSIONS_KEY) || "[]") as unknown;
    const list = Array.isArray(seen) ? seen.filter((id): id is string => typeof id === "string") : [];
    if (!list.includes(sessionId)) list.push(sessionId);
    localStorage.setItem(CREDITED_SESSIONS_KEY, JSON.stringify(list.slice(-40)));
  } catch {
    /* ignore quota / private mode */
  }
}

function readAfterAuth() {
  try {
    return sessionStorage.getItem(AFTER_AUTH_KEY);
  } catch {
    return null;
  }
}

function writeAfterAuth(next: "generate" | "checkout") {
  try {
    sessionStorage.setItem(AFTER_AUTH_KEY, next);
  } catch {
    /* ignore */
  }
}

function clearAfterAuth() {
  try {
    sessionStorage.removeItem(AFTER_AUTH_KEY);
  } catch {
    /* ignore */
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
  { id: 5, img: raspberryHillsTemplate, prompt: "Raspberry Hills tee" },
  { id: 6, img: archivesTee, prompt: "Archives tee" },
  { id: 7, img: prettyToxicTee, prompt: "Pretty Toxic tee" },
  { id: 8, img: palywoodTee, prompt: "Palywood tee" },
  { id: 9, img: shimTee, prompt: "Shim tee" },
  { id: 10, img: aliceGalerieTee, prompt: "Alice Galerie tee" },
  { id: 11, img: trinityTee, prompt: "Trinity tee" },
  { id: 12, img: washedZipHoodie, prompt: "Washed zip hoodie" },
  { id: 13, img: prizemanCap, prompt: "Prizeman cap" },
  { id: 14, img: dhsCap, prompt: "DHS cap" },
  { id: 15, img: tinosCap, prompt: "Tino's cap" },
  { id: 16, img: stinkyDogCap, prompt: "Stinky Dog cap" },
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
  locked = false,
}: {
  tpl: typeof TEMPLATES[0];
  onPreview: () => void;
  onUse: () => void;
  locked?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f4f4]">
        <button type="button" onClick={onPreview} className="absolute inset-0 cursor-pointer">
          <img
            src={imageSrc(tpl.img, locked ? 280 : 700)}
            alt={tpl.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              locked ? "blur-[6px] scale-105 opacity-80" : ""
            }`}
          />
        </button>
        {locked ? (
          <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] font-semibold text-white/90 tracking-wide pointer-events-none">
            Buy to preview
          </span>
        ) : null}
        <button
          type="button"
          onClick={onUse}
          className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-semibold text-[#111] tracking-wide hover:bg-white cursor-pointer shadow-sm"
        >
          {locked ? "Unlock" : "Use look"}
        </button>
        {tpl.summary.startsWith("Placeholder") && (
          <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-white/90 text-[10px] font-semibold text-[#888] tracking-wide">
            Placeholder
          </span>
        )}
      </div>
      <div className="pt-2.5 px-0.5">
        <p className="type-headline text-[13px]">{tpl.name}</p>
        <p className="type-subtext text-[11px] mt-0.5">{tpl.shot} · {tpl.garment}</p>
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
          <span className="text-xs text-[#aaa]">A mockup with your design on it. Not a logo file.</span>
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

const HAT_SLOTS = [
  { key: "front" as const, label: "Front", hint: "Required" },
  { key: "side" as const, label: "Side", hint: "Side logo" },
  { key: "back" as const, label: "Back", hint: "Rear / closure" },
];

type HatShots = { front?: string; side?: string; back?: string };

function HatMockupDropzone({
  shots,
  onSet,
  onClear,
}: {
  shots: HatShots;
  onSet: (key: keyof HatShots, src: string) => void;
  onClear: (key: keyof HatShots) => void;
}) {
  const refs = {
    front: useRef<HTMLInputElement>(null),
    side: useRef<HTMLInputElement>(null),
    back: useRef<HTMLInputElement>(null),
  };

  return (
    <div>
      <div className="mb-2">
        <Label>Your hat</Label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {HAT_SLOTS.map((slot) => {
          const src = shots[slot.key];
          return (
            <div key={slot.key}>
              <button
                type="button"
                onClick={() => refs[slot.key].current?.click()}
                className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-[#ddd] bg-white flex flex-col items-center justify-center gap-1 hover:border-[#999] transition-colors cursor-pointer"
              >
                {src ? (
                  <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-[#bbb]"><IconUpload /></span>
                    <span className="text-[10px] font-semibold text-[#333]">{slot.label}</span>
                    <span className="text-[9px] text-[#aaa]">{slot.hint}</span>
                  </>
                )}
              </button>
              {src && (
                <button
                  type="button"
                  onClick={() => onClear(slot.key)}
                  className="mt-1 w-full text-[10px] text-[#888] hover:text-[#111] cursor-pointer"
                >
                  Remove
                </button>
              )}
              <input
                ref={refs[slot.key]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onSet(slot.key, URL.createObjectURL(file));
                  e.target.value = "";
                }}
              />
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-[#aaa] mt-2">Front is required. Side and back tell the model where each logo sits.</p>
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
        <p className="type-headline text-xl">Applying look</p>
        <p className="type-subtext text-[15px] sm:text-base mt-2">Restyling your mockup to match this template…</p>
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
  dismissible = true,
  inset = false,
}: {
  selectedPlan: (typeof PLANS)[number]["id"];
  onSelectPlan: (id: (typeof PLANS)[number]["id"]) => void;
  onClose: () => void;
  onSubscribe: () => Promise<void> | void;
  dismissible?: boolean;
  inset?: boolean;
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

  const sheet = (
    <div className="relative w-full sm:max-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="px-6 pt-6 pb-5 border-b border-[#ebebeb]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="type-headline text-2xl">Get images</p>
            <p className="type-subtext text-[15px] sm:text-base mt-2">Buy a Pack or Pro to apply looks to your mockups.</p>
          </div>
          {dismissible ? (
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
          ) : null}
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
                    <span className="type-headline text-sm">{p.name}</span>
                    {p.recommended && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[#111] text-white">Best value</span>
                    )}
                  </div>
                  <p className="type-subtext text-[13px] mt-0.5">
                    {p.interval === "once" ? `${p.images} images · ${p.blurb}` : `${p.images} images / month · ${p.blurb}`}
                  </p>
                </div>
                <p className="type-headline text-xl">
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
  );

  if (inset) {
    return (
      <>
        <div className="absolute inset-x-0 top-0 bottom-0 z-[60] bg-black/25 pointer-events-none sm:hidden" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 z-[70] pointer-events-none sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6">
          <div className="hidden sm:block absolute inset-0 bg-black/40 pointer-events-none" aria-hidden />
          {sheet}
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-auto">
      {dismissible ? (
        <button
          type="button"
          aria-label="Close paywall"
          onClick={onClose}
          className="absolute inset-0 bg-black/50 cursor-pointer"
        />
      ) : (
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      )}
      {sheet}
    </div>
  );
}

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  afterLabel,
}: {
  beforeSrc: string;
  afterSrc: string;
  afterLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(25);
  const dragging = useRef(false);

  const updateFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    setPos(25);
  }, [afterSrc]);

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
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ transform: "translateY(7%) scale(1.28)" }}
        draggable={false}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt="Your mockup"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: "center 100%" }}
          draggable={false}
        />
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
        {afterLabel}
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
    q: "How much does it cost?",
    a: "Pack is $9 for 20 images, one time. Pro is $49 a month for 150 images. Credits stay on your signed-in account so you can use them on any device.",
  },
  {
    q: "What do Pack and Pro include?",
    a: "Each image is one apply — upload your mockup, pick a look, download the result. Pack is a one-time purchase. Pro renews monthly with 150 fresh images.",
  },
  {
    q: "Can I use the images in my store?",
    a: "Yes. Download the JPEG and use it on your site, socials, or lookbook. You keep the rights to your design.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 pt-20 pb-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="type-headline text-[32px] sm:text-[40px] text-center mb-8" style={{ color: "#ffffff" }}>FAQ</h2>
        <div className="flex flex-col gap-2.5">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq-glass rounded-3xl overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-6 py-6 cursor-pointer [-webkit-tap-highlight-color:transparent]"
                >
                  <div className="flex items-center gap-3">
                    <span className="type-headline flex-1 text-[16px] sm:text-[18px]" style={{ color: "#ffffff" }}>{item.q}</span>
                    <span className="relative w-7 h-7 rounded-full bg-white/15 flex-shrink-0" aria-hidden>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-white" />
                      <span
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3 bg-white origin-center transition-transform duration-200 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </div>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`type-subtext px-6 pb-6 text-[15px] sm:text-base transition-opacity duration-200 motion-reduce:transition-none ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComingSoonPage({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === COMING_SOON_ACCESS_CODE) {
      try {
        localStorage.setItem(COMING_SOON_ACCESS_KEY, "true");
      } catch {
        /* Continue for this session if storage is unavailable. */
      }
      onUnlock();
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not join the waitlist.");
      setSubmitted(true);
      setEmail("");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not join the waitlist.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="coming-soon relative min-h-dvh overflow-hidden bg-black text-white">
      <StarsGalaxy className="absolute inset-0 h-full w-full" edgeFade="bottom" stars={850} speed={1.5} />
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-6">
        <img
          src={shotfarmLogo}
          alt="ShotFarm"
          width={44}
          height={44}
          className="absolute top-7 left-1/2 h-11 w-11 -translate-x-1/2 rounded-[11px]"
        />
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
          <label className="sr-only" htmlFor="waitlist-email">Email address</label>
          <input
            id="waitlist-email"
            type="text"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-h-12 min-w-0 flex-1 border border-white/15 bg-white/[0.08] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/45"
          />
          <button
            type="submit"
            disabled={submitting}
            className="min-h-12 border border-white/15 bg-white text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-wait disabled:opacity-60 sm:px-5"
          >
            {submitting ? "Joining..." : submitted ? "Joined" : "Notify me"}
          </button>
          <span className="sr-only" aria-live="polite">{error || (submitted ? "Email added to the waitlist." : "")}</span>
        </form>
      </div>
    </main>
  );
}

function UploadMockupDemo() {
  return (
    <div
      className="w-full aspect-square rounded-xl mb-3 bg-[#fafafa] border border-[#ebebeb] overflow-hidden text-left p-3 flex flex-col"
      aria-hidden
    >
      <p className="text-[10px] font-semibold text-[#aaa] tracking-wide mb-2">Your mockup</p>
      <div className="flex-1 min-h-0">
        <div className="w-full h-full rounded-lg overflow-hidden border border-[#e8e8e8] bg-white flex items-center justify-center p-2">
          <img src={landingMockup} alt="" className="max-w-[90%] max-h-[90%] object-contain" />
        </div>
      </div>
    </div>
  );
}

function PickLookDemo() {
  const looks = [3, 5, 8, 11]
    .map((id) => TEMPLATES.find((t) => t.id === id))
    .filter((t): t is (typeof TEMPLATES)[number] => Boolean(t));
  const [picked, setPicked] = useState(0);
  const [preview, setPreview] = useState(true);
  const pickedLook = looks[picked];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });
    (async () => {
      while (!cancelled) {
        setPreview(false);
        setPicked(3);
        await wait(500);
        if (cancelled) return;
        setPicked(0);
        await wait(550);
        if (cancelled) return;
        setPreview(true);
        await wait(2600);
        if (cancelled) return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="w-full aspect-square rounded-xl mb-3 bg-[#fafafa] border border-[#ebebeb] overflow-hidden text-left relative"
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full origin-center scale-[0.8]">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[8px] font-semibold text-[#aaa] tracking-wide">Choose a look</p>
            <div className="flex items-center gap-0.5 text-[#ccc] scale-[0.6] origin-right">
              <IconChevron dir="left" />
              <span className="text-[7px] tabular-nums w-5 text-center">1/3</span>
              <IconChevron dir="right" />
            </div>
          </div>
          <div className="flex gap-1.5 mb-2">
            {["All", "Tee", "Hoodie", "Long sleeve", "Hat"].map((garment) => (
              <span key={garment} className={`text-[8px] ${garment === "All" ? "text-[#111]" : "text-[#bbb]"}`}>
                {garment}
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-1.5">
              {looks.map((tpl, i) => (
                <div key={tpl.id}>
                  <div
                    className={`relative aspect-square rounded-md overflow-hidden bg-[#f4f4f4] transition-shadow duration-200 ${
                      picked === i ? "ring-2 ring-[#111]" : "ring-1 ring-[#ebebeb]"
                    }`}
                  >
                    <img src={tpl.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className={`mt-0.5 text-[7px] leading-tight truncate ${picked === i ? "text-[#111] font-medium" : "text-[#888]"}`}>
                    {tpl.name}
                  </p>
                </div>
              ))}
            </div>
            {!preview && (
              <div
                className="absolute z-10 pointer-events-none transition-all duration-500 ease-out"
                style={{
                  left: picked % 2 === 0 ? "28%" : "76%",
                  top: picked < 2 ? "22%" : "68%",
                  transform: "translate(-50%, -20%)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" className="drop-shadow-md">
                  <path
                    fill="#111"
                    stroke="#fff"
                    strokeWidth="1.2"
                    d="M5.5 3.2v17.6c0 .5.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85A.5.5 0 0 0 5.5 3.2Z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {preview && pickedLook && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 border-b border-[#ebebeb] flex-shrink-0">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-[#111] truncate">{pickedLook.name}</p>
                <p className="text-[7px] text-[#888]">{pickedLook.shot} · {pickedLook.garment}</p>
              </div>
              <span className="w-4 h-4 flex items-center justify-center text-[#888] flex-shrink-0">
                <IconClose />
              </span>
            </div>
            <div className="flex-1 min-h-0 bg-[#f7f7f7] flex items-center justify-center p-2">
              <img src={pickedLook.img} alt="" className="max-h-full max-w-full object-contain rounded" />
            </div>
            <div className="px-2.5 py-2 border-t border-[#ebebeb] flex-shrink-0">
              <p className="text-[7px] text-[#888] leading-snug line-clamp-2">{pickedLook.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
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
    <div className="w-full min-w-0 flex-1 min-h-0 overflow-y-auto overscroll-contain">
      <div className="min-h-full flex flex-col">
      <div className="hero-mesh-wrap">
      <StarsGalaxy className="hero-smoke" edgeFade="bottom" />
      <header className="relative z-10 flex items-center justify-between gap-3 px-5 py-4 flex-shrink-0">
        <BrandLockup />
        {showSignIn ? (
          <button
            type="button"
            onClick={onSignIn}
            className="text-sm text-white/80 hover:text-white cursor-pointer"
          >
            Sign in
          </button>
        ) : null}
      </header>

      <section className="relative z-10 flex flex-col items-center px-6 pt-12 pb-24 gap-10">
        <div className="text-center max-w-sm">
          <h1 className="type-headline text-[36px] sm:text-[48px] text-white" style={{ color: "#ffffff" }}>
            From mockup<br />to real product image
          </h1>
          <p className="type-subtext mt-4 text-[16px] sm:text-[18px] text-white" style={{ color: "#ffffff" }}>
            Skip the photoshoot.<br />Start selling your product now
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-3 inline-flex items-center justify-center min-h-[52px] px-10 rounded-full border border-white/15 text-white text-[15px] font-light tracking-[0.02em] cursor-pointer hover:border-white/30 hover:bg-white/5 transition-colors"
            style={{ backgroundColor: "rgb(0, 2, 11)" }}
          >
            {startLabel}
          </button>
        </div>
        <div className="w-full max-w-[420px]">
          <BeforeAfterSlider
            beforeSrc={landingMockup}
            afterSrc={raspberryHillsTee}
            afterLabel="Raspberry Hills"
          />
        </div>
      </section>
      </div>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="type-headline text-[36px] sm:text-[48px]">How it works</h2>
          <p className="type-subtext mt-4 text-[16px] sm:text-[18px]">
            Upload a garment. Pick a template.<br />We apply it for you.
          </p>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            { n: "01", title: "Upload your mockup", body: "A digital garment shot is enough.", img: landingMockup as string | null, imgLabel: "Mockup example", fit: "contain", frame: "square" },
            { n: "02", title: "Pick a look", body: "Choose from our set templates.", img: trinityTee as string | null, imgLabel: "Trinity Tee", fit: "cover", frame: "square" },
            { n: "03", title: "We apply it", body: "Your piece comes back in that look.", img: raspberryHillsTee as string | null, imgLabel: "Result example", fit: "contain", frame: "portrait" },
          ].map((step) => (
            <div key={step.n} className="text-center">
              {step.n === "01" ? (
                <UploadMockupDemo />
              ) : step.n === "02" ? (
                <PickLookDemo />
              ) : step.img ? (
                <div
                  className={`w-full rounded-xl mb-3 overflow-hidden ${
                    step.frame === "portrait" ? "aspect-[3/4] bg-[#f4f4f4] border border-[#ebebeb]" : "aspect-square"
                  }`}
                >
                  <img
                    src={step.img}
                    alt={step.imgLabel}
                    className={`w-full h-full ${step.fit === "cover" ? "object-cover" : "object-contain p-4 bg-[#f4f4f4]"}`}
                  />
                </div>
              ) : (
                <div
                  className="w-full aspect-square rounded-xl mb-3 bg-[#f4f4f4] border border-dashed border-[#ddd] flex items-center justify-center"
                  aria-hidden
                >
                  <span className="text-[11px] text-[#bbb] tracking-[0.08em]">{step.imgLabel}</span>
                </div>
              )}
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-[11px] font-medium text-[#bbb] tracking-[0.16em]">{step.n}</p>
                <h2 className="type-headline text-[18px] sm:text-[20px]">{step.title}</h2>
              </div>
              <p className="type-subtext mt-1 text-[14px] sm:text-[15px]">{step.body}</p>
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
          {signedIn ? null : <p className="text-[12px] text-[#bbb] mt-3">Sign in, then buy a Pack to start</p>}
        </div>
      </section>

      <div className="footer-stars-wrap">
        <StarsGalaxy className="hero-smoke" edgeFade="top" />
        <div className="relative z-10">
          <FaqSection />
          <footer className="px-6 pt-10 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/45">© 2026 ShotFarm</p>
            <nav className="flex items-center gap-5 text-[12px] text-white/55">
              <button type="button" onClick={onLooks} className="hover:text-white cursor-pointer">Looks</button>
              <button type="button" className="hover:text-white cursor-pointer">Privacy</button>
              <button type="button" className="hover:text-white cursor-pointer">Terms</button>
            </nav>
          </footer>
        </div>
      </div>
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
            <p className="type-headline text-base truncate">{look.name}</p>
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
          <p className="type-subtext text-[15px] sm:text-base mb-4">{look.summary}</p>
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
  onGarmentFilter,
  garmentFilter,
  onPreview,
  onUse,
  onStart,
  locked = false,
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
  locked?: boolean;
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
            <h1 className="type-headline text-2xl sm:text-[28px]">Templates</h1>
            <p className="type-subtext text-[15px] sm:text-base mt-2">
              {locked ? "Browse the set. Buy a Pack to preview and apply." : "The set we apply to your mockup."}
            </p>
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

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
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
                        locked={locked}
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
        <p className="type-subtext text-[15px] min-w-0">Upload a mockup to apply one of these looks.</p>
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
  const [comingSoonUnlocked, setComingSoonUnlocked] = useState(() => {
    try {
      return localStorage.getItem(COMING_SOON_ACCESS_KEY) === "true";
    } catch {
      return false;
    }
  });
  if (COMING_SOON && !comingSoonUnlocked) return <ComingSoonPage onUnlock={() => setComingSoonUnlocked(true)} />;
  if (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) return <AppWithClerk />;
  return <AppShell session={localSession} />;
}

function AppWithClerk() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [account, setAccount] = useState<AccountSnap | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);

  const refreshAccount = useCallback(async () => {
    if (!PAYWALL_ENABLED || !isSignedIn) {
      if (!isSignedIn) setAccount(null);
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
  const [hatShots, setHatShots] = useState<HatShots>({});
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

  const freeUsed = session.signedIn && session.account ? session.account.freeUsed : localFreeUsed;
  const paidCredits =
    session.signedIn && session.account
      ? Math.max(session.account.paidCredits, localPaidCredits)
      : localPaidCredits;
  const canSignIn = session.configured && session.ready && !session.signedIn;
  const needsSignIn = PAYWALL_ENABLED && canSignIn;
  const freeLeft = Math.max(0, FREE_IMAGE_LIMIT - freeUsed);
  const imagesLeft = freeLeft + paidCredits;
  const outOfCredits = PAYWALL_ENABLED && imagesLeft <= 0;
  const paywallLocked = outOfCredits && !needsSignIn;
  const generateLocked = paywallLocked && (page === "generate" || page === "history");
  const mobileMenuAbovePaywall = generateLocked;

  const goTo = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    try {
      sessionStorage.setItem(PAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    if (next === "home") setPaywallOpen(false);
  };

  const openGenerate = (lookId?: number) => {
    if (lookId != null) setSelectedTemplate(lookId);
    setPaywallOpen(false);
    setPreviewId(null);
    if (needsSignIn) {
      writeAfterAuth("generate");
      session.openSignIn();
    }
    goTo("generate");
  };

  useEffect(() => {
    if (!session.signedIn) return;
    const next = readAfterAuth();
    clearAfterAuth();
    if (next === "checkout") {
      goTo("generate");
      if (PAYWALL_ENABLED) setPaywallOpen(true);
    } else if (next === "generate") {
      goTo("generate");
    }
  }, [session.signedIn]);

  const openPaywall = () => setPaywallOpen(true);

  const handleLibraryPreview = (id: number) => {
    if (paywallLocked) {
      openPaywall();
      return;
    }
    setPreviewId(id);
  };

  const handleLibraryUse = (id: number) => {
    openGenerate(id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (previewId !== null) setPreviewId(null);
        else if (paywallOpen && !generateLocked) setPaywallOpen(false);
        else setMenuOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    document.body.style.overflow = menuOpen || (paywallOpen && !generateLocked) || previewId !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = "";
    };
  }, [menuOpen, paywallOpen, previewId, generateLocked]);

  useEffect(() => {
    setLookSetIndex(0);
  }, [garmentFilter]);

  useEffect(() => {
    if (session.configured && !session.ready) return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("session_id");
    if (fromUrl) writePendingCheckout(fromUrl);
    const sessionId = fromUrl || readPendingCheckout();
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        const token = session.signedIn ? await session.getToken() : null;
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`/api/confirm-checkout?session_id=${encodeURIComponent(sessionId)}`, { headers });
        const data = (await res.json()) as { ok?: boolean; plan?: string; images?: number; paidCredits?: number };
        if (cancelled || !data.ok) return;
        const images = typeof data.images === "number" ? data.images : data.plan === "pro" ? 150 : 20;
        if (session.signedIn) {
          for (let i = 0; i < 8; i += 1) {
            const account = await session.refreshAccount();
            if (account && account.paidCredits > 0) break;
            await new Promise((resolve) => setTimeout(resolve, 700));
            if (cancelled) return;
          }
        }
        if (!checkoutAlreadyCredited(sessionId)) {
          markCheckoutCredited(sessionId);
          setLocalPaidCredits((prev) => {
            const next = prev + images;
            writePaidCredits(next);
            return next;
          });
        }
        clearPendingCheckout();
        setPaywallOpen(false);
        setPage("generate");
        try {
          sessionStorage.setItem(PAGE_KEY, "generate");
        } catch {
          /* ignore */
        }
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      } catch {
        /* Keep session_id so a refresh can still apply the credits. */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session.configured, session.ready, session.signedIn, session.getToken, session.refreshAccount]);

  const generateTemplates = TEMPLATES.filter(
    (t) => t.garment !== "Hat" && (garmentFilter === "All" || t.garment === garmentFilter),
  );
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
  const hatLook = selectedLook?.garment === "Hat";
  const showHatUpload = hatLook || (!selectedLook && garmentFilter === "Hat");
  const hasMockup = hatLook ? Boolean(hatShots.front) : mockups.length > 0;
  const canGenerate = hasMockup && selectedTemplate !== null && !generating && !outOfCredits;

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
      writeAfterAuth("generate");
      session.openSignIn();
      return;
    }
    if (PAYWALL_ENABLED && outOfCredits) {
      setPaywallOpen(true);
      return;
    }
    if (!canGenerate || !selectedLook) return;
    setGenerating(true);
    setResult(null);
    setGenerateError(null);
    const useFree = freeLeft > 0;
    try {
      const hatAngles = (["front", "side", "back"] as const).filter((key) => hatShots[key]);
      const mockupSources = hatLook ? hatAngles.map((key) => hatShots[key] as string) : mockups;
      const encodedMockups = await Promise.all(mockupSources.map((src) => toJpegDataUrl(src, 1280)));
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
          garment: selectedLook.garment,
          mockups: encodedMockups,
          mockupAngles: hatLook ? hatAngles : undefined,
          lookImages,
          aspectRatio,
        }),
      });
      const data = await res.json().catch(() => ({} as { image?: string; error?: string; code?: string; freeUsed?: number; paidCredits?: number }));
      if (res.status === 401 && PAYWALL_ENABLED) {
        writeAfterAuth("generate");
        session.openSignIn();
        throw new Error("Sign in to generate.");
      }
      if (PAYWALL_ENABLED && (res.status === 402 || data.code === "out_of_credits")) {
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
      if (PAYWALL_ENABLED && session.signedIn && typeof data.freeUsed === "number" && typeof data.paidCredits === "number") {
        session.applyAccount({ freeUsed: data.freeUsed, paidCredits: data.paidCredits });
      } else if (PAYWALL_ENABLED) {
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
      writeAfterAuth("checkout");
      session.openSignIn();
      return;
    }
    const token = session.configured && session.signedIn ? await session.getToken() : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers,
      body: JSON.stringify({ plan: selectedPlan }),
    });
    const data = await res.json().catch(() => ({} as { url?: string; error?: string }));
    if (res.status === 401) {
      throw new Error("Checkout could not start.");
    }
    if (!res.ok || !data.url) {
      throw new Error(typeof data.error === "string" ? data.error : "Checkout could not start.");
    }
    window.location.href = data.url;
  };

  return (
    <div className={`flex flex-col h-dvh overflow-hidden font-sans ${page === "home" ? "bg-black" : "lg:flex-row bg-white"}`}>
      {page === "home" ? (
        <LandingPage
          onStart={() => openGenerate()}
          onLooks={() => goTo("library")}
          signedIn={session.signedIn}
          showSignIn={canSignIn}
          onSignIn={() => session.openSignIn()}
        />
      ) : (
        <>
      {/* ── Mobile top bar ─────────────────────────────────────────────── */}
      <header className={`lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#ebebeb] bg-white flex-shrink-0 ${mobileMenuAbovePaywall ? "relative z-[85]" : "z-30"}`}>
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
        className={`fixed inset-0 lg:hidden transition-opacity duration-200 ${
          mobileMenuAbovePaywall ? "z-[80]" : "z-40"
        } bg-black/40 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 w-[min(280px,86vw)] flex flex-col border-r border-[#ebebeb] bg-white transition-transform duration-200 ease-out lg:relative lg:z-auto lg:w-[210px] lg:flex-shrink-0 lg:translate-x-0 lg:pointer-events-auto ${
          mobileMenuAbovePaywall ? "z-[90]" : "z-50"
        } ${
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
          <NavItem icon={<IconGenerate />} label="Generate" active={page === "generate"} onClick={() => openGenerate()} />
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
          {PAYWALL_ENABLED && (
          <div className="mt-3 px-3 py-3 rounded-xl bg-[#f7f7f7]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-[#888]">Images</span>
              <span className="text-[11px] font-semibold text-[#111]">{`${imagesLeft} left`}</span>
            </div>
            <div className="h-1 rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#111]" style={{ width: imagesLeft > 0 ? "100%" : "0%" }} />
            </div>
            <p className="text-[10px] text-[#bbb] mt-1.5">
              {paidCredits > 0
                ? `${paidCredits} remaining on your account`
                : "Buy a Pack or Pro to generate"}
            </p>
            {outOfCredits && (
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
          )}
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-h-0 relative overflow-hidden ${page === "library" || page === "settings" ? "" : "md:flex-row"}`}>

      {page === "library" ? (
        <LibraryPage
          templates={filteredTemplates}
          total={TEMPLATES.length}
          query={lookQuery}
          onQuery={setLookQuery}
          garmentFilter={garmentFilter}
          onGarmentFilter={setGarmentFilter}
          locked={paywallLocked}
          onPreview={handleLibraryPreview}
          onUse={handleLibraryUse}
          onStart={() => openGenerate()}
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
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col md:flex-row">
      <div
        className={`flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y md:overflow-hidden md:flex md:flex-row md:flex-1 ${
          generateLocked ? "max-md:pb-[min(22rem,52dvh)]" : ""
        }`}
      >
      <div className={`flex flex-col min-h-0 w-full md:flex-row md:flex-1 ${generateLocked ? "pointer-events-none select-none opacity-50 blur-[1px]" : ""}`}>
      {/* ── Control Panel ────────────────────────────────────────────────── */}
      <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col min-h-0 md:h-full border-b md:border-b-0 md:border-r border-[#ebebeb] bg-[#fafafa]">

        <div className="px-5 py-5 flex flex-col gap-6 md:flex-1 md:min-h-0 md:overflow-y-auto md:overscroll-contain">

          {showHatUpload ? (
            <HatMockupDropzone
              shots={hatShots}
              onSet={(key, src) => setHatShots((prev) => ({ ...prev, [key]: src }))}
              onClear={(key) => setHatShots((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              })}
            />
          ) : (
          <MockupDropzone
            images={mockups}
            onAdd={(src) => setMockups((p) => [...p, src])}
            onRemove={(i) => setMockups((p) => p.filter((_, j) => j !== i))}
          />
          )}

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
            <div className="flex flex-wrap gap-3 mb-3">
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
            <div className="flex gap-1.5">
              {ASPECT_RATIOS.map((r) => {
                const on = aspectRatio === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setAspectRatio(r.id)}
                    className={`flex-1 min-w-0 py-2 px-1 rounded-xl text-center transition-all duration-150 cursor-pointer border ${
                      on
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-white text-[#888] border-[#e8e8e8] hover:border-[#ccc] hover:text-[#333]"
                    }`}
                  >
                    <span className="flex items-end justify-center h-[22px] mb-1.5">
                      <span
                        className={`block ${r.radius} border-2 ${on ? "border-white bg-white/15" : "border-current"}`}
                        style={{ width: r.w, height: r.h }}
                        aria-hidden
                      />
                    </span>
                    <span className="block text-[11px] font-semibold leading-none">{r.label}</span>
                    <span className={`block text-[9px] mt-0.5 leading-none ${on ? "text-white/55" : "text-[#bbb]"}`}>{r.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate */}
        <div className={`p-4 sm:p-5 border-t border-[#ebebeb] bg-white sticky bottom-0 md:static flex-shrink-0 z-10 ${generateLocked ? "max-md:hidden" : ""}`}>
          <button
            onClick={handleGenerate}
            disabled={generating || (!needsSignIn && !outOfCredits && !canGenerate)}
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
                  ? "Sign in to generate and keep your images on your account"
                : outOfCredits
                    ? "Buy a Pack or Pro to continue"
                    : !hasMockup
                    ? hatLook || showHatUpload
                      ? "Upload the front of your hat"
                      : "Upload a mockup to continue"
                    : selectedTemplate
                      ? hatLook && (!hatShots.side || !hatShots.back)
                        ? "Add side and back for exact logo placement"
                        : PAYWALL_ENABLED
                          ? `${imagesLeft} ${imagesLeft === 1 ? "image" : "images"} left`
                          : "Ready to apply"
                      : "Pick a look to continue"}
            </p>
          )}
        </div>
      </div>

      {(generating || result) && (
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
          ) : (
            <img
              src={imageSrc(result, 900)}
              alt="Restyled piece"
              className="rounded-2xl shadow-sm max-h-full max-w-full w-auto h-auto object-contain border border-[#ebebeb]"
            />
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
      )}
      </div>
      </div>
      {generateLocked && (
        <Paywall
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          onClose={() => {}}
          onSubscribe={startCheckout}
          dismissible={false}
          inset
        />
      )}
      </div>
      )}
      </div>
        </>
      )}
      {previewLook && (
        <LookPreview
          look={previewLook}
          onClose={() => setPreviewId(null)}
          onUse={() => {
            openGenerate(previewLook.id);
          }}
        />
      )}
      {PAYWALL_ENABLED && paywallOpen && page === "library" && (
        <Paywall
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          onClose={() => setPaywallOpen(false)}
          onSubscribe={startCheckout}
          dismissible
        />
      )}
    </div>
  );
}
