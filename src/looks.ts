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
  /** Look reference photos. Numbered #2, #3… after the user mockup. */
  refs: string[];
  aspect: (typeof LOOK_ASPECTS)[number];
};

/**
 * Edit these in Settings while running locally. Save writes this file.
 */
export const TEMPLATE_TRANSFER_PROMPT = `Edit image #2. Do not create a new mockup.

Image #2 is the locked template photo. The final image must look like the SAME photograph as #2: same camera, same framing, same distance, same angle, same background, same lighting, same shadows, same garment silhouette, same hang/flat-lay/studio presentation, same wrinkles, same fabric drape, same collar/sleeves/hem. Keep the entire garment in frame. Do not crop or zoom in. If the output size differs from #2, add matching background from #2 — never cut off sleeves, hem, collar, or hanger. If #2 is a black studio shot, keep that black studio. If #2 is a white flat lay, keep that white flat lay. Do not invent a different scene, set, or mockup style.

The only allowed change is the customer's product from image #1:
- Use #1 only for shirt color and the exact printed artwork (logo, text, graphic, colors, spelling).
- Place that artwork where it sits on the customer's shirt in #1. Do not move it to where #2's graphic sits.
- Do not copy #2's shirt color, graphic, logo, text, or brand.

The result should look as if someone took the physical shirt from #1 and photographed it in the exact setup of #2 — or as if #2's photo was kept and only the print and shirt color were swapped.

Not a new design. Not a new mockup. Not a reinterpretation.
`;

/* looks:start */
export const LOOKS: Look[] = [
  {
    id: 1,
    name: "Distressed Graphic Tee",
    garment: "Tee",
    shot: "Hanger",
    summary: "Vintage cream tee, raw hem, punk collage print.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 2,
    name: "Oversized Graphic Sweatshirt",
    garment: "Sweatshirt",
    shot: "Studio",
    summary: "Boxy heather gray sweatshirt with a faded chest graphic.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
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
    id: 4,
    name: "Raspberry Worldwide Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Washed charcoal tee with a weathered oval graphic.",
    prompt: "",
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
    name: "Losses to Wins Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Boxy white tee with three vertical collage panels.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 7,
    name: "Distressed Straight Jeans",
    garment: "Jeans",
    shot: "Flat lay",
    summary: "Vintage-wash straight jeans, heavy rips, raw hem.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 8,
    name: "Dark Luxury Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Placeholder. Black tee, hard light, luxury product shot.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 9,
    name: "Vintage Hoodie Hanger",
    garment: "Sweatshirt",
    shot: "Hanger",
    summary: "Placeholder. Washed hoodie on a hanger.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 10,
    name: "Clean Hoodie Flat",
    garment: "Sweatshirt",
    shot: "Flat lay",
    summary: "Placeholder. Neutral hoodie, top-down.",
    prompt: "",
    refs: [],
    aspect: "square",
  },
  {
    id: 11,
    name: "On-Body Hoodie",
    garment: "Sweatshirt",
    shot: "On body",
    summary: "Placeholder. Boxy hoodie, street editorial.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 12,
    name: "Dark Studio Hoodie",
    garment: "Sweatshirt",
    shot: "Studio",
    summary: "Placeholder. Black hoodie, studio sweep.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 13,
    name: "Black Tee Hanger",
    garment: "Tee",
    shot: "Hanger",
    summary: "Placeholder. Black graphic tee on a hanger.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 14,
    name: "Distressed On-Body Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Placeholder. Cropped distressed tee, on body.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 15,
    name: "Washed Hoodie Flat",
    garment: "Sweatshirt",
    shot: "Flat lay",
    summary: "Placeholder. Faded hoodie, flat lay.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 16,
    name: "Clean Tee Hanger",
    garment: "Tee",
    shot: "Hanger",
    summary: "Placeholder. Crisp white tee on a hanger.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 17,
    name: "Dark On-Body Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Placeholder. Black tee, night street light.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
  {
    id: 18,
    name: "Minimal Hoodie Hanger",
    garment: "Sweatshirt",
    shot: "Hanger",
    summary: "Placeholder. No-print hoodie, hanger.",
    prompt: "",
    refs: [],
    aspect: "portrait",
  },
];
/* looks:end */

export function getLook(id: number) {
  return LOOKS.find((look) => look.id === id) ?? null;
}

/** Append numbered image refs. #1… are mockups; following #s are this look's reference photos. */
export function withImageRefs(prompt: string, mockupCount: number, lookRefCount: number) {
  const refs: string[] = [];
  for (let i = 0; i < mockupCount; i += 1) {
    refs.push(`#${i + 1} user's mockup${mockupCount > 1 ? ` ${i + 1}` : ""}`);
  }
  for (let i = 0; i < lookRefCount; i += 1) {
    refs.push(`#${mockupCount + i + 1} look reference${lookRefCount > 1 ? ` ${i + 1}` : ""}`);
  }
  return `${prompt.trim()}\n\n${refs.join("\n")}`;
}
