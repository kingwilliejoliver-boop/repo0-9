export const GARMENTS = ["Tee", "Sweatshirt", "Jeans"] as const;
export const SHOTS = ["Hanger", "Studio", "Flat lay", "On body"] as const;
export const LOOK_ASPECTS = ["portrait", "square"] as const;

export type Look = {
  id: number;
  name: string;
  garment: (typeof GARMENTS)[number];
  shot: (typeof SHOTS)[number];
  summary: string;
  /** Your locked Fal prompt. Users never see this. */
  prompt: string;
  /** Look reference photos. Sent first to Fal as #1… The shopper upload is last. */
  refs: string[];
  aspect: (typeof LOOK_ASPECTS)[number];
};

/**
 * Edit these in Settings while running locally. Save writes this file.
 */
export const TEMPLATE_TRANSFER_PROMPT = `Edit the first image. That is the locked template photograph. Return that same photo.

The last image is the customer's design swatch. Use it only for:
- Garment color
- Printed artwork: logo, text, graphic, colors, spelling, and where that print sits on their shirt

Keep from the first image: fabric, wash, distressing, wrinkles, drape, mockup style, shot type, camera, background, lighting, shadows, silhouette, collar, sleeves, hem.

Do not output the last image. Do not put the last image on a new background. Do not copy the template's graphic. Place the customer's artwork where it sits on their shirt.
`;

/* looks:start */
export const LOOKS: Look[] = [
  {
    id: 3,
    name: "Saint Distressed Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Cropped off-white tee, frayed edges, faded icon print.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 5,
    name: "Raspberry Hills Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Oversized off-white tee, frayed collar, cracked vintage print.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "square",
  },
  {
    id: 6,
    name: "Archives Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Boxy cream tee, thick collar, archival collage print.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 7,
    name: "Pretty Toxic Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "White crew tee, sharp-to-blur print, concrete floor.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
];
/* looks:end */

export function getLook(id: number) {
  return LOOKS.find((look) => look.id === id) ?? null;
}

/** Append numbered image refs. #1… are this look's template photos; the last #s are shopper uploads. */
export function withImageRefs(prompt: string, mockupCount: number, lookRefCount: number) {
  const refs: string[] = [];
  for (let i = 0; i < lookRefCount; i += 1) {
    refs.push(`#${i + 1} locked template${lookRefCount > 1 ? ` ${i + 1}` : ""}`);
  }
  for (let i = 0; i < mockupCount; i += 1) {
    refs.push(`#${lookRefCount + i + 1} design swatch${mockupCount > 1 ? ` ${i + 1}` : ""}`);
  }
  return `${prompt.trim()}\n\n${refs.join("\n")}`;
}
