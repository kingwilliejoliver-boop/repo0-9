export type Look = {
  id: number;
  name: string;
  garment: "Tee" | "Sweatshirt" | "Jeans";
  shot: "Hanger" | "Studio" | "Flat lay" | "On body";
  summary: string;
  /** Locked Nano prompt. Users never see this. */
  prompt: string;
  aspect: "portrait" | "square";
};

/**
 * Edit `prompt` on each look to control Nano.
 * `buildLockedPrompt` is the wrapper sent with the mockup + look photos.
 */
export const LOOKS: Look[] = [
  {
    id: 1,
    name: "Distressed Graphic Tee",
    garment: "Tee",
    shot: "Hanger",
    summary: "Vintage cream tee, raw hem, punk collage print.",
    prompt:
      "Vintage distressed cream graphic t-shirt on a hanger, raw cut hem, punk collage print, live fast die loud, high-contrast black and white photo, grunge fashion editorial, industrial brick backdrop",
    aspect: "portrait",
  },
  {
    id: 2,
    name: "Oversized Graphic Sweatshirt",
    garment: "Sweatshirt",
    shot: "Studio",
    summary: "Boxy heather gray sweatshirt with a faded chest graphic.",
    prompt:
      "Oversized boxy heather gray sweatshirt on a mannequin, raw-cut hem, dropped shoulders, faded UNDERSTAND graffiti chest print, streetwear editorial, retail lighting, dark denim",
    aspect: "portrait",
  },
  {
    id: 3,
    name: "Saint Distressed Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Cropped off-white tee, frayed edges, faded icon print.",
    prompt:
      "Oversized cropped off-white t-shirt on black background, raw frayed neckline, moth-eaten holes, faded SAINT MXXXXXX arched serif print, distressed religious icon graphic, luxury vintage streetwear product shot",
    aspect: "portrait",
  },
  {
    id: 4,
    name: "Raspberry Worldwide Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Washed charcoal tee with a weathered oval graphic.",
    prompt:
      "Faded charcoal oversized t-shirt flat lay on white, raw frayed hem and neckline, distressed holes, weathered orange-red RASPBERRY WORLDWIDE oval print, wired earbuds graphic overlay, Los Angeles streetwear product shot",
    aspect: "portrait",
  },
  {
    id: 5,
    name: "Raspberry Hills Tee",
    garment: "Tee",
    shot: "Flat lay",
    summary: "Oversized off-white tee, frayed collar, cracked vintage print.",
    prompt:
      "Oversized boxy off-white t-shirt flat lay on white, frayed ribbed collar, pinholes and raw uneven hem, cracked vintage Raspberry Hills collegiate print, blue RASPBERRY! bar, black star column, distressed streetwear product shot",
    aspect: "square",
  },
  {
    id: 6,
    name: "Losses to Wins Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Boxy white tee with three vertical collage panels.",
    prompt:
      "On-body streetwear photo, boxy white graphic t-shirt, slightly cropped raw hem, three vertical skate-deck panels in pink black and seafoam, LOSSES 2 WINS branding, dice chains crosses collage print, camo trousers, urban editorial lighting",
    aspect: "portrait",
  },
  {
    id: 7,
    name: "Distressed Straight Jeans",
    garment: "Jeans",
    shot: "Flat lay",
    summary: "Vintage-wash straight jeans, heavy rips, raw hem.",
    prompt:
      "Straight-leg vintage wash blue denim jeans flat lay on gray concrete, heavy thigh and knee rips with frayed white threads, faded honeycombing, raw frayed hem, bright blue repair stitch at the knee, streetwear product shot",
    aspect: "portrait",
  },
  {
    id: 8,
    name: "Dark Luxury Tee",
    garment: "Tee",
    shot: "Studio",
    summary: "Placeholder. Black tee, hard light, luxury product shot.",
    prompt: "Black graphic t-shirt, hard studio light, luxury product shot on a dark sweep, sharp shadows, high-end streetwear catalog",
    aspect: "portrait",
  },
  {
    id: 9,
    name: "Vintage Hoodie Hanger",
    garment: "Sweatshirt",
    shot: "Hanger",
    summary: "Placeholder. Washed hoodie on a hanger.",
    prompt: "Washed vintage hoodie on a hanger, faded fleece, worn rib cuffs, editorial hanger shot, industrial backdrop",
    aspect: "portrait",
  },
  {
    id: 10,
    name: "Clean Hoodie Flat",
    garment: "Sweatshirt",
    shot: "Flat lay",
    summary: "Placeholder. Neutral hoodie, top-down.",
    prompt: "Neutral hoodie flat lay, top-down on a clean white surface, even retail lighting, centered, e-commerce product photo",
    aspect: "square",
  },
  {
    id: 11,
    name: "On-Body Hoodie",
    garment: "Sweatshirt",
    shot: "On body",
    summary: "Placeholder. Boxy hoodie, street editorial.",
    prompt: "On-body street editorial, boxy hoodie, cropped at the hips, urban daylight, fashion lookbook crop",
    aspect: "portrait",
  },
  {
    id: 12,
    name: "Dark Studio Hoodie",
    garment: "Sweatshirt",
    shot: "Studio",
    summary: "Placeholder. Black hoodie, studio sweep.",
    prompt: "Black hoodie on a dark studio sweep, low-key lighting, luxury streetwear product shot",
    aspect: "portrait",
  },
  {
    id: 13,
    name: "Black Tee Hanger",
    garment: "Tee",
    shot: "Hanger",
    summary: "Placeholder. Black graphic tee on a hanger.",
    prompt: "Black graphic t-shirt on a hanger, clean hanger hardware, simple wall, streetwear product photo",
    aspect: "portrait",
  },
  {
    id: 14,
    name: "Distressed On-Body Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Placeholder. Cropped distressed tee, on body.",
    prompt: "On-body cropped distressed t-shirt, raw hem, urban editorial lighting, streetwear lookbook",
    aspect: "portrait",
  },
  {
    id: 15,
    name: "Washed Hoodie Flat",
    garment: "Sweatshirt",
    shot: "Flat lay",
    summary: "Placeholder. Faded hoodie, flat lay.",
    prompt: "Faded washed hoodie flat lay on a light surface, soft wrinkles, vintage fleece texture, product photo",
    aspect: "portrait",
  },
  {
    id: 16,
    name: "Clean Tee Hanger",
    garment: "Tee",
    shot: "Hanger",
    summary: "Placeholder. Crisp white tee on a hanger.",
    prompt: "Crisp white t-shirt on a hanger, clean studio wall, bright even light, simple product photo",
    aspect: "portrait",
  },
  {
    id: 17,
    name: "Dark On-Body Tee",
    garment: "Tee",
    shot: "On body",
    summary: "Placeholder. Black tee, night street light.",
    prompt: "On-body black t-shirt, night street light, moody editorial, city backdrop, fashion lookbook",
    aspect: "portrait",
  },
  {
    id: 18,
    name: "Minimal Hoodie Hanger",
    garment: "Sweatshirt",
    shot: "Hanger",
    summary: "Placeholder. No-print hoodie, hanger.",
    prompt: "Plain no-print hoodie on a hanger, minimal backdrop, quiet product photo, natural fabric texture",
    aspect: "portrait",
  },
];

export function getLook(id: number) {
  return LOOKS.find((look) => look.id === id) ?? null;
}

export function buildLockedPrompt(look: Look) {
  return [
    "Restyle the garment in the first image to match this locked look.",
    "First image: the user's mockup. Keep the exact graphic, logo, print, colors, and garment identity from this mockup. Do not replace the artwork or invent a new brand.",
    "Second image: the target look. Match its photography — shot type, camera angle, crop, lighting, background, fabric wash, distressing, and editorial mood.",
    `Look: ${look.name}`,
    `Garment: ${look.garment}`,
    `Shot: ${look.shot}`,
    "Locked look direction:",
    look.prompt,
    "Output one photorealistic product photograph. No captions, no side-by-side comparison, no extra garments.",
  ].join("\n");
}
