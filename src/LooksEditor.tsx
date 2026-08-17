import { useRef, useState } from "react";
import { GARMENTS, LOOK_ASPECTS, LOOKS, SHOTS, type Look } from "./looks";

function readImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(file);
  });
}

export default function LooksEditor({ thumbs }: { thumbs: Record<number, string> }) {
  const [drafts, setDrafts] = useState<Look[]>(LOOKS.map((look) => ({ ...look, refs: look.refs ?? [] })));
  const [selectedId, setSelectedId] = useState(LOOKS[0]?.id ?? 1);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const selected = drafts.find((look) => look.id === selectedId) ?? drafts[0];

  const update = (patch: Partial<Look>) => {
    if (!selected) return;
    setStatus(null);
    setDrafts((prev) => prev.map((look) => (look.id === selected.id ? { ...look, ...patch } : look)));
  };

  const addRefs = async (files: FileList | null) => {
    if (!selected || !files?.length) return;
    const images = await Promise.all(Array.from(files).filter((file) => file.type.startsWith("image/")).map(readImage));
    if (images.length === 0) return;
    update({ refs: [...selected.refs, ...images] });
  };

  const removeRef = (index: number) => {
    if (!selected) return;
    update({ refs: selected.refs.filter((_, i) => i !== index) });
  };

  const deleteTemplate = () => {
    if (!selected) return;
    const next = drafts.filter((look) => look.id !== selected.id);
    setDrafts(next);
    setSelectedId(next[0]?.id ?? 0);
    setStatus("Template removed. Save to write the file.");
  };

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/__looks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ looks: drafts }),
      });
      const data = await res.json().catch(() => ({} as { error?: string; looks?: Look[] }));
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Could not save.");
      if (Array.isArray(data.looks)) setDrafts(data.looks);
      setStatus("Saved to src/looks.ts");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  };

  const thumbFor = (look: Look) => look.refs[0] || thumbs[look.id];

  return (
    <div className="flex-1 min-h-0 flex flex-col md:flex-row bg-white">
      <aside className="w-full md:w-[260px] flex-shrink-0 border-b md:border-b-0 md:border-r border-[#ebebeb] overflow-y-auto">
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-lg font-700 text-[#111] tracking-tight">Templates</h1>
          <p className="text-[12px] text-[#aaa] mt-0.5">Edit locally. Users never see prompts.</p>
        </div>
        <div className="px-2 pb-4 flex flex-col gap-0.5">
          {drafts.map((look) => (
            <button
              key={look.id}
              type="button"
              onClick={() => setSelectedId(look.id)}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left cursor-pointer ${
                look.id === selected?.id ? "bg-[#111] text-white" : "text-[#555] hover:bg-[#f4f4f4]"
              }`}
            >
              {thumbFor(look) ? (
                <img src={thumbFor(look)} alt="" className="w-9 h-9 rounded-md object-cover flex-shrink-0 bg-[#f4f4f4]" />
              ) : (
                <span className="w-9 h-9 rounded-md bg-[#f4f4f4] flex-shrink-0" />
              )}
              <span className="min-w-0">
                <span className="block text-[12px] font-medium truncate">{look.name}</span>
                <span className={`block text-[10px] ${look.id === selected?.id ? "text-white/60" : "text-[#bbb]"}`}>
                  {look.prompt.trim() ? "Prompt set" : "No prompt"}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-sm text-[#aaa]">No templates. Save to write the empty set.</p>
          </div>
        ) : (
          <div className="max-w-2xl px-5 sm:px-8 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#888]">Look {selected.id}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={deleteTemplate}
                  className="px-3.5 py-2 rounded-lg border border-[#e8e8e8] text-[#888] text-sm hover:border-[#111] hover:text-[#111] cursor-pointer"
                >
                  Delete template
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  className="px-3.5 py-2 rounded-lg bg-[#111] text-white text-sm font-medium hover:opacity-90 cursor-pointer disabled:opacity-40"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
            {status && <p className="text-[12px] text-[#888] -mt-2">{status}</p>}

            <label className="block">
              <span className="text-[11px] text-[#888]">Name</span>
              <input
                value={selected.name}
                onChange={(e) => update({ name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#111] focus:border-[#999] focus:outline-none"
              />
            </label>

            <div className="grid grid-cols-3 gap-3">
              <label className="block">
                <span className="text-[11px] text-[#888]">Garment</span>
                <select
                  value={selected.garment}
                  onChange={(e) => update({ garment: e.target.value as Look["garment"] })}
                  className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#111] focus:outline-none"
                >
                  {GARMENTS.map((garment) => (
                    <option key={garment} value={garment}>{garment}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] text-[#888]">Shot</span>
                <select
                  value={selected.shot}
                  onChange={(e) => update({ shot: e.target.value as Look["shot"] })}
                  className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#111] focus:outline-none"
                >
                  {SHOTS.map((shot) => (
                    <option key={shot} value={shot}>{shot}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] text-[#888]">Aspect</span>
                <select
                  value={selected.aspect}
                  onChange={(e) => update({ aspect: e.target.value as Look["aspect"] })}
                  className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#111] focus:outline-none"
                >
                  {LOOK_ASPECTS.map((aspect) => (
                    <option key={aspect} value={aspect}>{aspect}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] text-[#888]">Summary</span>
              <input
                value={selected.summary}
                onChange={(e) => update({ summary: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#111] focus:border-[#999] focus:outline-none"
              />
            </label>

            <div>
              <span className="text-[11px] text-[#888]">Prompt</span>
              <p className="text-[11px] text-[#bbb] mt-0.5 mb-2">
                #1 is the shopper’s design and shirt color only. Images you add here are the template you edit — fabric, mockup style, and shot.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="w-[5.5rem] h-[5.5rem] rounded-lg border border-dashed border-[#ddd] bg-[#fafafa] flex flex-col items-center justify-center text-center px-1">
                  <span className="text-[10px] font-medium text-[#111]">#1</span>
                  <span className="text-[9px] text-[#bbb] leading-tight mt-0.5">User mockup</span>
                </div>
                {selected.refs.map((src, i) => (
                  <div key={`${src.slice(0, 24)}-${i}`} className="relative w-[5.5rem] h-[5.5rem] rounded-lg overflow-hidden border border-[#e8e8e8] bg-[#f4f4f4]">
                    <img src={src} alt={`#${i + 2}`} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 px-1 py-px rounded bg-black/60 text-white text-[9px] font-medium">#{i + 2}</span>
                    <button
                      type="button"
                      onClick={() => removeRef(i)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 text-[#111] text-[10px] leading-none cursor-pointer"
                      aria-label={`Remove #${i + 2}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-[5.5rem] h-[5.5rem] rounded-lg border-2 border-dashed border-[#ddd] text-[#888] text-[11px] hover:border-[#111] hover:text-[#111] cursor-pointer"
                >
                  Add image
                </button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  void addRefs(e.target.files);
                  e.target.value = "";
                }}
              />
              <textarea
                value={selected.prompt}
                onChange={(e) => update({ prompt: e.target.value })}
                rows={12}
                placeholder={"Restyle #1 to match #2.\nKeep the graphic from #1."}
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2.5 text-sm text-[#111] leading-relaxed focus:border-[#999] focus:outline-none resize-y min-h-[220px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
