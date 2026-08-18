export const GARMENTS = ["Tee", "Hoodie", "Hat", "Sweatshirt", "Jeans"] as const;
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

export const HAT_TRANSFER_PROMPT = `Edit the first image. That is the locked hat photograph. Return that same photo.

The other images are the customer's real hat, shot from different angles. They are the source of truth for:
- Crown and brim colors
- Every logo, embroidery, patch, and text: spelling, colors, scale
- Which panel each mark sits on: front, left/right side, back, brim

Strip the template's original branding completely. Do not keep, restyle, or restamp those logos. Do not put the customer's art in the template's logo box just because a logo was there.

Place marks only where they appear on the customer's hat, at the same relative size and position on that panel. If a panel has no mark in their photos, leave it blank (hat color only). Do not invent a front lockup because the template has one.

If they included a side photo, use it for side marks. If they included a back photo, use it for rear marks and the closure. If an angle is missing, do not guess extra logos on the hidden side.

Keep from the first image: fabric, wash, distressing, wrinkles, brim shape, construction, mockup style, shot type, camera, background, lighting, shadows.

Do not output the customer's photos. Do not put those photos on a new background.
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
  {
    id: 8,
    name: "Palywood Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Distressed grey tee, collage print, feathered white studio.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 9,
    name: "Shim Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Oversized faded black tee, frayed collar, grainy collage print.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 10,
    name: "Alice Galerie Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Distressed black tee, torn hem, triptych print.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 11,
    name: "Trinity Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Oversized washed red tee, pinhole distress, stone floor.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 12,
    name: "Washed Zip Hoodie",
    garment: "Hoodie",
    shot: "Studio",
    summary: "Oversized faded indigo zip hoodie, holes, bleach spots.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 13,
    name: "Prizeman Cap",
    garment: "Hat",
    shot: "Flat lay",
    summary: "White and blue dad hat on a red car hood.",
    prompt: HAT_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 14,
    name: "DHS Cap",
    garment: "Hat",
    shot: "Studio",
    summary: "Distressed yellow and orange cap, frayed brim, concrete.",
    prompt: HAT_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 15,
    name: "Tino's Cap",
    garment: "Hat",
    shot: "Flat lay",
    summary: "Red cap on a blue car trunk, daylight.",
    prompt: HAT_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 16,
    name: "Stinky Dog Cap",
    garment: "Hat",
    shot: "Studio",
    summary: "Royal blue unstructured cap on wood, white front embroidery.",
    prompt: HAT_TRANSFER_PROMPT,
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
