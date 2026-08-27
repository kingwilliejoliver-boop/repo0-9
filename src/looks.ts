export const GARMENTS = ["Tee", "Hoodie", "Long sleeve", "Hat", "Sweatshirt", "Jeans"] as const;
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
export const TEMPLATE_TRANSFER_PROMPT = `Edit the first attached image (the locked template photograph) and return that same photograph.

CRITICAL — two images, two roles:
- IMAGE 1 (template): mockup style and garment structure ONLY. Not a design reference.
- IMAGE LAST (customer mockup): the ONLY source for all color, artwork, and placement.

FROM THE TEMPLATE (image 1) — take ONLY:
- Shot type, camera angle, framing, background, lighting, and shadows
- Fabric texture, wash, distressing, wrinkles, and drape
- Garment silhouette and construction as an empty photographic canvas

FROM THE CUSTOMER MOCKUP (last image) — take EVERYTHING about the design:
- Garment body color and any color blocking
- Every graphic, print, logo, embroidery, tag, and text: exact artwork, colors, spelling, scale, and position
- Chest, back, sleeve, and hem graphics only where they appear on the customer mockup

NEVER take from the template:
- Template artwork, logos, graphics, text, or brand marks
- Template garment color or ink/print colors
- Template print placement, logo boxes, or graphic layout — do not snap the customer's design into where the template had art
- Any sample branding on the template garment

Rebuild the customer's exact mockup design in this template's photographic style. The output should look like the customer's piece was shot in this template's setup — their design, this photo's fabric and lighting.

Do not output the customer mockup unchanged. Do not paste it onto a new background.
`;

export const HAT_TRANSFER_PROMPT = `Edit the first attached image (the locked hat photograph) and return that same photograph.

CRITICAL — template vs customer photos:
- IMAGE 1 (template): hat mockup style and structure ONLY. Not a logo reference.
- OTHER IMAGES (customer hat): the ONLY source for crown/brim color and every mark's artwork and placement.

FROM THE TEMPLATE (image 1) — take ONLY:
- Shot type, camera angle, framing, background, lighting, and shadows
- Fabric texture, wash, distressing, brim shape, and construction
- Photographic presentation as an empty hat canvas

FROM THE CUSTOMER'S HAT PHOTOS — take EVERYTHING about the design:
- Crown and brim colors
- Every logo, embroidery, patch, and text: exact artwork, colors, spelling, scale
- Which panel each mark sits on: front, side, back, brim — only where shown in their photos

NEVER take from the template:
- Template logos, patches, embroidery, or text
- Template hat color or thread colors
- Template logo placement or panel layout — do not put the customer's art where the template had a logo
- Any sample branding on the template hat

Erase all template branding. Place customer marks only on panels where they appear in the customer's photos, at the same relative size and position. Blank panels stay blank.

Do not output the customer's photos unchanged. Do not paste them onto a new background.
`;

/* looks:start */
export const LOOKS: Look[] = [
  {
    id: 3,
    name: "Saint Distressed Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Cropped off-white tee, frayed edges, black studio.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 5,
    name: "Raspberry Hills Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Oversized off-white tee, frayed collar, torn hem.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "square",
  },
  {
    id: 8,
    name: "Palywood Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Distressed grey tee, holes, white studio.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 9,
    name: "Shim Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Oversized faded black tee, frayed collar, wash.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 10,
    name: "Alice Galerie Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Distressed black tee, torn hem, holes.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 19,
    name: "Vintage Cream Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Boxy off-white tee, vintage wash, stains and pinholes, white studio.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 6,
    name: "Archives Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Boxy cream tee, thick collar, concrete floor.",
    prompt: TEMPLATE_TRANSFER_PROMPT,
    refs: [],
    aspect: "portrait",
  },
  {
    id: 7,
    name: "Pretty Toxic Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "White crew tee on a grey floor.",
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
    id: 18,
    name: "Complete Control Distressed Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Faded gray distressed tee with torn sleeves and hem on a white studio background.",
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
  {
    id: 17,
    name: "Complete Control Long Sleeve",
    garment: "Long sleeve",
    shot: "Studio",
    summary: "Faded black long sleeve with front graphic on a white studio background.",
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
