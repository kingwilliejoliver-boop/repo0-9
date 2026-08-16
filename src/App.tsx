import { useState, useRef, useCallback, useEffect } from "react";
import distressedGraphicTee from "./assets/templates/distressed-graphic-tee.jpg";
import oversizedGraphicSweatshirt from "./assets/templates/oversized-graphic-sweatshirt.jpg";
import saintDistressedTee from "./assets/templates/saint-distressed-tee.jpg";
import raspberryWorldwideTee from "./assets/templates/raspberry-worldwide-tee.jpg";
import raspberryHillsTee from "./assets/templates/raspberry-hills-tee.jpg";
import lossesToWinsTee from "./assets/templates/losses-to-wins-tee.jpg";
import blankDigitalMockup from "./assets/templates/blank-digital-mockup.png";

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

// ── Data ────────────────────────────────────────────────────────────────────

function imageSrc(img: string, size = 400) {
  if (img.startsWith("http") || img.startsWith("/") || img.startsWith("data:") || img.startsWith("blob:")) return img;
  return `https://images.unsplash.com/${img}?w=${size}&h=${size}&fit=crop&auto=format`;
}

const TEMPLATES = [
  { id: 1, name: "Distressed Graphic Tee", garment: "Tee", shot: "Hanger", summary: "Vintage cream tee, raw hem, punk collage print.", prompt: "Vintage distressed cream graphic t-shirt on a hanger, raw cut hem, punk collage print, live fast die loud, high-contrast black and white photo, grunge fashion editorial, industrial brick backdrop", img: distressedGraphicTee, aspect: "portrait" },
  { id: 2, name: "Oversized Graphic Sweatshirt", garment: "Sweatshirt", shot: "Studio", summary: "Boxy heather gray sweatshirt with a faded chest graphic.", prompt: "Oversized boxy heather gray sweatshirt on a mannequin, raw-cut hem, dropped shoulders, faded UNDERSTAND graffiti chest print, streetwear editorial, retail lighting, dark denim", img: oversizedGraphicSweatshirt, aspect: "portrait" },
  { id: 3, name: "Saint Distressed Tee", garment: "Tee", shot: "Studio", summary: "Cropped off-white tee, frayed edges, faded icon print.", prompt: "Oversized cropped off-white t-shirt on black background, raw frayed neckline, moth-eaten holes, faded SAINT MXXXXXX arched serif print, distressed religious icon graphic, luxury vintage streetwear product shot", img: saintDistressedTee, aspect: "portrait" },
  { id: 4, name: "Raspberry Worldwide Tee", garment: "Tee", shot: "Flat lay", summary: "Washed charcoal tee with a weathered oval graphic.", prompt: "Faded charcoal oversized t-shirt flat lay on white, raw frayed hem and neckline, distressed holes, weathered orange-red RASPBERRY WORLDWIDE oval print, wired earbuds graphic overlay, Los Angeles streetwear product shot", img: raspberryWorldwideTee, aspect: "portrait" },
  { id: 5, name: "Raspberry Hills Tee", garment: "Tee", shot: "Flat lay", summary: "Oversized off-white tee, frayed collar, cracked vintage print.", prompt: "Oversized boxy off-white t-shirt flat lay on white, frayed ribbed collar, pinholes and raw uneven hem, cracked vintage Raspberry Hills collegiate print, blue RASPBERRY! bar, black star column, distressed streetwear product shot", img: raspberryHillsTee, aspect: "square" },
  { id: 6, name: "Losses to Wins Tee", garment: "Tee", shot: "On body", summary: "Boxy white tee with three vertical collage panels.", prompt: "On-body streetwear photo, boxy white graphic t-shirt, slightly cropped raw hem, three vertical skate-deck panels in pink black and seafoam, LOSSES 2 WINS branding, dice chains crosses collage print, camo trousers, urban editorial lighting", img: lossesToWinsTee, aspect: "portrait" },
];

const SHOT_FILTERS = ["All", "Flat lay", "Hanger", "On body", "Studio"] as const;
const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const FREE_IMAGE_LIMIT = 3;
const FREE_USED_KEY = "shotfarm-free-used";

function seedTestAccountUsedUp() {
  try {
    localStorage.setItem(FREE_USED_KEY, String(FREE_IMAGE_LIMIT));
  } catch {
    /* ignore quota / private mode */
  }
  return FREE_IMAGE_LIMIT;
}

const PLANS = [
  { id: "starter" as const, name: "Starter", price: 19, images: 40, blurb: "Enough for a small drop", recommended: false },
  { id: "pro" as const, name: "Pro", price: 49, images: 150, blurb: "For ongoing collections", recommended: true },
];

const HISTORY = [
  { id: 1, img: distressedGraphicTee, prompt: "Distressed graphic tee" },
  { id: 2, img: oversizedGraphicSweatshirt, prompt: "Oversized graphic sweatshirt" },
  { id: 3, img: saintDistressedTee, prompt: "Saint distressed tee" },
];

// ── Atoms ───────────────────────────────────────────────────────────────────

type Page = "home" | "generate" | "library" | "history" | "settings";

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

function TemplateCard({ tpl, selected, onClick }: { tpl: typeof TEMPLATES[0]; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        selected ? "ring-2 ring-[#111] ring-offset-2 ring-offset-white" : "hover:opacity-90"
      }`}
    >
      <img
        src={imageSrc(tpl.img, 400)}
        alt={tpl.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5 text-left">
        <p className="text-white text-[11px] font-medium leading-tight">{tpl.name}</p>
        <p className="text-white/70 text-[10px] mt-0.5">{tpl.shot} · {tpl.garment}</p>
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#111] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" /></svg>
        </div>
      )}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold text-[#aaa] uppercase tracking-widest mb-2.5">{children}</p>;
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
      <Label>Your mockup</Label>
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
          <span className="text-xs text-[#aaa]">Front, flat lay, or on a hanger. Drag and drop works too.</span>
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
        <p  className="text-[#111] text-xl font-700 tracking-wide uppercase">Applying look</p>
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
  subscribed,
}: {
  selectedPlan: (typeof PLANS)[number]["id"];
  onSelectPlan: (id: (typeof PLANS)[number]["id"]) => void;
  onClose: () => void;
  onSubscribe: () => void;
  subscribed: boolean;
}) {
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];

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
              <p  className="text-[#111] text-2xl font-700 tracking-wide uppercase">Keep creating</p>
              <p className="text-[#888] text-sm mt-1.5 leading-relaxed">You've used your 3 free images. Subscribe to keep applying looks to your mockups.</p>
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
                    <p className="text-xs text-[#888] mt-0.5">{p.images} images / month · {p.blurb}</p>
                  </div>
                  <p  className="text-[#111] text-xl font-700 tracking-wide">${p.price}<span className="text-xs font-medium text-[#aaa] tracking-normal">/mo</span></p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-6 pb-6 pt-1">
          <button
            type="button"
            onClick={onSubscribe}
            className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
            style={{ backgroundColor: "#111", fontSize: "15px", letterSpacing: "0.04em" }}
          >
            CONTINUE WITH {plan.name.toUpperCase()}
          </button>
          <p className={`text-[11px] text-center mt-2.5 ${subscribed ? "text-[#111]" : "text-[#bbb]"}`}>
            {subscribed ? "Checkout isn't connected yet — this is the subscribe step." : "Cancel anytime. Unused images don't roll over."}
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
      <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/55 text-white text-[10px] font-semibold tracking-wide uppercase">Mockup</span>
      <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/55 text-white text-[10px] font-semibold tracking-wide uppercase">Look applied</span>
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-white">
      <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#ebebeb] flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center text-white flex-shrink-0">
            <IconSpark />
          </div>
          <div className="min-w-0">
            <p className="text-[#111] font-700 text-lg leading-none tracking-wide">ShotFarm</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onStart}
          className="px-4 py-2 rounded-lg bg-[#111] text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
          style={{ letterSpacing: "0.04em" }}
        >
          Start creating
        </button>
      </header>

      <section className="flex flex-col items-center px-6 pt-12 pb-10 gap-10">
        <div className="text-center max-w-sm">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#111] tracking-tight leading-[1.15]">
            Your mockup,<br />shot like the look.
          </h1>
          <p className="mt-3 text-sm text-[#888] leading-relaxed">
            Upload a garment. Pick a template. We apply it for you.
          </p>
        </div>
        <div className="w-full max-w-[420px]">
          <BeforeAfterSlider beforeSrc={blankDigitalMockup} afterSrc={raspberryHillsTee} />
          <p className="text-[#aaa] text-sm text-center mt-4">Drag to compare your mockup with the applied look.</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            { n: "01", title: "Upload your mockup", body: "A digital garment shot is enough." },
            { n: "02", title: "Pick a look", body: "Choose from our set templates." },
            { n: "03", title: "We apply it", body: "Your piece comes back in that look." },
          ].map((step) => (
            <div key={step.n} className="text-center sm:text-left">
              <p className="text-[11px] font-medium text-[#bbb] tracking-[0.16em]">{step.n}</p>
              <h2 className="mt-2 text-[15px] font-semibold text-[#111] tracking-tight">{step.title}</h2>
              <p className="mt-1.5 text-sm text-[#888] leading-relaxed">{step.body}</p>
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
            Start creating
          </button>
          <p className="text-[12px] text-[#bbb] mt-3">3 free images to start</p>
        </div>
      </section>
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

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const [lookQuery, setLookQuery] = useState("");
  const [shotFilter, setShotFilter] = useState<(typeof SHOT_FILTERS)[number]>("All");
  const [mockups, setMockups] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [strength, setStrength] = useState(70);
  const [menuOpen, setMenuOpen] = useState(false);
  const [freeUsed, setFreeUsed] = useState(seedTestAccountUsedUp);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[number]["id"]>("pro");
  const [subscribed, setSubscribed] = useState(false);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const goTo = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    if (next === "generate" && freeUsed >= FREE_IMAGE_LIMIT) setPaywallOpen(true);
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

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesShot = shotFilter === "All" || t.shot === shotFilter;
    const q = lookQuery.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      t.name.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.shot.toLowerCase().includes(q) ||
      t.garment.toLowerCase().includes(q);
    return matchesShot && matchesQuery;
  });

  const selectedLook = TEMPLATES.find((t) => t.id === selectedTemplate) ?? null;
  const previewLook = TEMPLATES.find((t) => t.id === previewId) ?? null;
  const freeLeft = Math.max(0, FREE_IMAGE_LIMIT - freeUsed);
  const outOfCredits = freeLeft <= 0;
  const canGenerate = mockups.length > 0 && selectedTemplate !== null && !generating && !outOfCredits;

  const handleGenerate = () => {
    if (outOfCredits) {
      setPaywallOpen(true);
      return;
    }
    if (!canGenerate || !selectedLook) return;
    setGenerating(true);
    setResult(null);
    setTimeout(() => {
      setResult(selectedLook.img);
      setFreeUsed((prev) => {
        const next = Math.min(FREE_IMAGE_LIMIT, prev + 1);
        try {
          localStorage.setItem(FREE_USED_KEY, String(next));
        } catch {
          /* ignore quota / private mode */
        }
        return next;
      });
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-dvh overflow-hidden bg-white font-sans">
      {page === "home" ? (
        <LandingPage onStart={() => goTo("generate")} />
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
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center text-white flex-shrink-0">
            <IconSpark />
          </div>
          <div className="min-w-0">
            <p  className="text-[#111] font-700 text-lg leading-none tracking-wide">ShotFarm</p>
          </div>
        </div>
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
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center text-white flex-shrink-0">
              <IconSpark />
            </div>
            <div>
              <p  className="text-[#111] font-700 text-lg leading-none tracking-wide">ShotFarm</p>
            </div>
          </div>
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
          <NavItem icon={<IconHome />} label="Home" active={page === "home"} onClick={() => goTo("home")} />
          <NavItem icon={<IconGenerate />} label="Generate" active={page === "generate"} onClick={() => goTo("generate")} />
          <NavItem icon={<IconLibrary />} label="Templates" active={page === "library"} onClick={() => goTo("library")} />
          <NavItem icon={<IconHistory />} label="History" active={page === "history"} onClick={() => goTo("history")} />
        </nav>

        <div className="p-3 border-t border-[#ebebeb] flex flex-col gap-0.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-3">
          <NavItem icon={<IconSettings />} label="Settings" active={page === "settings"} onClick={() => goTo("settings")} />
          {/* Credits */}
          <div className="mt-3 px-3 py-3 rounded-xl bg-[#f7f7f7]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-[#888]">Free images</span>
              <span className="text-[11px] font-semibold text-[#111]">{freeLeft} left</span>
            </div>
            <div className="h-1 rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#111]" style={{ width: `${(freeLeft / FREE_IMAGE_LIMIT) * 100}%` }} />
            </div>
            <p className="text-[10px] text-[#bbb] mt-1.5">
              {outOfCredits ? "You've used your 3 free images" : `${freeUsed} / ${FREE_IMAGE_LIMIT} used · that's all for free`}
            </p>
            {outOfCredits && (
              <button
                type="button"
                onClick={() => setPaywallOpen(true)}
                className="mt-2.5 w-full py-2 rounded-lg bg-[#111] text-white text-[11px] font-semibold tracking-wide cursor-pointer hover:opacity-90"
                style={{ letterSpacing: "0.04em" }}
              >
                SUBSCRIBE
              </button>
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-y-auto md:overflow-hidden">

      {/* ── Control Panel ────────────────────────────────────────────────── */}
      <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-[#ebebeb] md:overflow-y-auto md:h-full bg-[#fafafa]">

        {/* Header */}
        <div className="px-5 pt-6 pb-4 border-b border-[#ebebeb] bg-white">
          <h1  className="text-2xl font-700 text-[#111] tracking-wide uppercase">Create a piece</h1>
          <p className="text-[#aaa] text-sm mt-0.5">Upload your mockup, pick a look.<br />We apply the template for you.</p>
        </div>

        <div className="flex-1 px-5 py-5 flex flex-col gap-6">

          <MockupDropzone
            images={mockups}
            onAdd={(src) => setMockups((p) => [...p, src])}
            onRemove={(i) => setMockups((p) => p.filter((_, j) => j !== i))}
          />

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <Label>Choose a look</Label>
              <span className="text-[10px] text-[#bbb] -mt-2.5">{filteredTemplates.length} of {TEMPLATES.length}</span>
            </div>
            <div className="relative mb-2.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb] pointer-events-none">
                <IconSearch />
              </span>
              <input
                type="search"
                value={lookQuery}
                onChange={(e) => setLookQuery(e.target.value)}
                placeholder="Search looks"
                className="w-full rounded-lg bg-white border border-[#e8e8e8] pl-9 pr-3 py-2 text-sm text-[#111] placeholder:text-[#ccc] focus:border-[#999] focus:outline-none"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-0.5 px-0.5 mb-3">
              {SHOT_FILTERS.map((shot) => (
                <Pill key={shot} label={shot} active={shotFilter === shot} onClick={() => setShotFilter(shot)} />
              ))}
            </div>
            {filteredTemplates.length === 0 ? (
              <p className="text-sm text-[#aaa] py-8 text-center">No looks match that. Try another shot type or search.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filteredTemplates.map((tpl) => (
                  <TemplateCard
                    key={tpl.id}
                    tpl={tpl}
                    selected={selectedTemplate === tpl.id}
                    onClick={() => setPreviewId(tpl.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {selectedLook && (
            <div className="rounded-xl p-3.5 bg-white border border-[#ebebeb]">
              <p className="text-[10px] font-semibold text-[#aaa] uppercase tracking-widest mb-1.5">Selected look</p>
              <p className="text-[#111] text-sm font-medium">{selectedLook.name}</p>
              <p className="text-[#888] text-[11px] mt-0.5">{selectedLook.shot} · {selectedLook.garment}</p>
              <p className="text-[#666] text-xs leading-relaxed mt-1">{selectedLook.summary}</p>
            </div>
          )}

          {mockups.length > 0 && (
            <div>
              <div className="flex justify-between mb-2.5">
                <Label>How close to this look</Label>
                <span className="text-xs font-semibold text-[#111]">{strength}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #111 ${strength}%, #e8e8e8 ${strength}%)` }}
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-[#ccc]">Keep my mockup</span>
                <span className="text-[10px] text-[#ccc]">Match the look</span>
              </div>
            </div>
          )}

          <div>
            <Label>Output size</Label>
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
            {generating ? "APPLYING LOOK…" : "APPLY THIS LOOK"}
          </button>
          {!generating && (
            <p className="text-[11px] text-[#bbb] text-center mt-2">
              {outOfCredits
                ? "You've used your 3 free images"
                : mockups.length === 0
                  ? "Upload a mockup to continue"
                  : selectedTemplate
                    ? `${freeLeft} free ${freeLeft === 1 ? "image" : "images"} left`
                    : "Pick a look to continue"}
            </p>
          )}
        </div>
      </div>

      {/* ── Output ──────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-[70vh] md:min-h-0 md:overflow-hidden bg-white">

        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-[#ebebeb]">
          <div className="min-w-0">
            <h2  className="text-xl font-700 text-[#111] uppercase tracking-wide">Your piece</h2>
            <p className="text-[#bbb] text-xs mt-0.5 truncate">
              {generating
                ? "Applying look…"
                : result
                  ? `${selectedLook?.name ?? "Look"} · ${aspectRatio}`
                  : mockups.length === 0
                    ? "Upload a mockup to get started"
                    : "Ready when you are"}
            </p>
          </div>
          {result && !generating && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg border border-[#e8e8e8] text-[#555] text-sm hover:border-[#ccc] hover:text-[#111] transition-all cursor-pointer">
                <IconShare /> <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#111] text-white text-sm hover:opacity-90 transition-all cursor-pointer">
                <IconDownload /> <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#fafafa] min-h-[280px]">
          {generating ? (
            <div className="w-full max-w-md h-full max-h-[520px] rounded-2xl border border-[#ebebeb] bg-white flex items-center justify-center">
              <GeneratingState />
            </div>
          ) : result ? (
            <div className="relative group max-h-full">
              <img
                src={imageSrc(result, 900)}
                alt="Restyled piece"
                className="rounded-2xl shadow-sm max-h-[min(520px,calc(100dvh-220px))] md:max-h-[calc(100vh-200px)] object-contain border border-[#ebebeb]"
                style={{ maxWidth: "100%" }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#e8e8e8] flex items-center justify-center text-[#ccc]">
                <IconSpark />
              </div>
              <div>
                <p  className="text-[#bbb] text-lg font-600 uppercase tracking-wide">No piece yet</p>
                <p className="text-[#ccc] text-sm mt-1">Upload a mockup and pick a look</p>
              </div>
            </div>
          )}
        </div>

        {/* History strip */}
        <div className="border-t border-[#ebebeb] px-4 sm:px-6 lg:px-8 py-4 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-[10px] font-semibold text-[#bbb] uppercase tracking-widest mb-3">Recent</p>
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
          }}
        />
      )}
      {paywallOpen && page !== "home" && (
        <Paywall
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          onClose={() => setPaywallOpen(false)}
          onSubscribe={() => setSubscribed(true)}
          subscribed={subscribed}
        />
      )}
    </div>
  );
}
