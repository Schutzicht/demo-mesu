#!/usr/bin/env node
/**
 * Mesu BV brand imagery via Nano Banana Pro (Gemini 3 Pro Image).
 *
 * Usage:
 *   npm run generate:images
 *   npm run generate:images -- --force
 *   npm run generate:images -- --only=hero --force
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "img");

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set. Add to .env or ~/.zshrc.");
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.split("=")[1];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BRAND = [
  "Photorealistic editorial photography for Aannemersbedrijf Mesu, a Dutch construction company in Zeeland specialising in renovation, new builds, restoration and craftsmanship in wood.",
  "Visual language: documentary craft, warm aardse Northern-European tones, soft diffuse overcast daylight or low golden hour with long shadows on weathered brick.",
  "Material palette: warm red-brown Dutch baksteen masonry, weathered oak and pine joinery, lime mortar, raw concrete, sand, putty-coloured walls, deep ink-charcoal accents (#15181C), terracotta orange (#B94A1F) as occasional signal color.",
  "Composition: architectural, considered, restrained. Magazine-quality finish in the spirit of Dezeen, De Architect, and Wallpaper* on heritage construction features.",
  "Subjects: trades people in modest navy-blue or charcoal work clothes seen from behind or in profile, tools laid out with care, fragments of buildings and craftsmanship details rather than wide branded scenes.",
  "Strictly: no text, no letters, no numbers, no signage, no brand names, no logos, no watermarks, no high-vis safety vests with logos. Faces blurred or out of frame.",
  "Shot on medium-format camera, natural light, shallow depth of field where appropriate, sharp detail in the craft moment.",
].join(" ");

const IMAGES = [
  {
    name: "hero",
    prompt: [
      "Wide cinematic landscape, 16:9. Atmospheric exterior of a characteristic Zeeuwse heritage townhouse facade in Middelburg or Veere at the blue hour just before golden hour.",
      "Scaffolding leaning against a brick facade with restored white timber kozijnen (window frames), a single craftsman in a navy boiler suit visible in silhouette inspecting the joinery from a small ladder.",
      "Warm reddish Dutch baksteen masonry catches a low warm light from the left, deep shadows in the doorway, fresh lime mortar visible between bricks.",
      "Foreground slightly out of focus: a wooden workbench with a chisel and a folding ruler. Background softly blurred Dutch street with classic stepped gable.",
      "Mood: dignified craftsmanship, end of a workday, restoration in progress. Strictly no text, no signage, no logos visible anywhere.",
    ].join(" "),
  },
  {
    name: "service-nieuwbouw",
    prompt: [
      "Editorial 5:4 photograph of a modern brand-new detached Dutch family home under construction in a Zeeland coastal village, exterior at midday with overcast soft light.",
      "Clean masonry walls in warm red baksteen, oversized aluminium-framed windows still wrapped in protective tape, fresh black ceramic roof tiles half-installed.",
      "Two builders in profile (faces obscured) coordinate a delivery of building materials, neat pallets of bricks in foreground, hint of a small mobile crane.",
      "Composition is architectural, calm and orderly, no clutter on the site. No text, no logos, no signage on any vehicle or worker.",
    ].join(" "),
  },
  {
    name: "service-verbouw",
    prompt: [
      "Editorial 5:4 interior photograph of a partial renovation in a Dutch row house: a load-bearing wall has been opened up with a fresh steel lintel exposed and freshly plastered edges.",
      "Daylight floods in from a new opening connecting kitchen to living room. Plastic dust sheeting hangs softly to the right. Tools laid out on a clean wooden plank: a level, a folding ruler, a pencil.",
      "A craftsman in a charcoal work apron is bent over inspecting the wall edge, only his hands and forearms in focus.",
      "Material palette: putty-white walls, oak floorboards partly covered with cardboard, the warm orange of dried plaster patch. No text, no signage.",
    ].join(" "),
  },
  {
    name: "service-restauratie",
    prompt: [
      "Editorial 5:4 close-up of restoration craftsmanship: a craftsman's hands using a small trowel to repoint mortar between original 17th-century bricks on a monumental Dutch facade.",
      "The bricks have a beautiful variation in red, ochre and burnt orange, with traces of original lime mortar. Fresh pale lime mortar joins are visible in a clean horizontal band.",
      "Side light from the right, sharp focus on the tool and the bricks, hands slightly weathered.",
      "Background gently blurred showing a restored timber window with cream paint. Quiet, reverent, no text, no signage.",
    ].join(" "),
  },
  {
    name: "service-onderhoud",
    prompt: [
      "Editorial 5:4 photograph of a maintenance scene on the steep tiled roof of a Dutch terraced house: a roofer in a navy boiler suit and brown leather knee-pads sets a small ridge tile back into place.",
      "Camera angle low and slightly behind, golden-hour warm light, the figure mostly silhouetted with hands and tools sharply lit.",
      "Foreground a small canvas tool roll with hammer, chisel and a strip of lead. Below, a glimpse of a Dutch street with linden trees.",
      "Calm, professional, single quiet act of care. No text, no signage, no high-vis with logos.",
    ].join(" "),
  },
  {
    name: "service-timmerwerk",
    prompt: [
      "Editorial 5:4 interior photograph inside a traditional Dutch timber workshop (timmerwerkplaats). A large stationary spindle moulder and a workbench dominate the frame.",
      "Soft north light from a high window strikes a stack of freshly milled oak window kozijnen lying flat on sawhorses, fine wood shavings catching the light on the concrete floor.",
      "A craftsman is in mid-distance, in profile, planing a length of timber. Sharp focus on the wood grain and the iron of the plane.",
      "Wall behind shows neatly hung clamps and hand tools in shadow. Atmosphere: ordered, dusty, warm. No text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "service-interieur",
    prompt: [
      "Editorial 5:4 photograph of a freshly tiled bathroom in a Dutch home, mid-renovation but already beautiful: large-format matte off-white porcelain tiles on the floor and lower wall, a walk-in shower with frameless glass.",
      "A tegelzetter (tile-setter) in dark grey workwear is kneeling, spreading thin-set mortar with a notched trowel along the last row of wall tiles. Only hands and forearms in focus.",
      "Tools and tile spacers laid out neatly on a folded blue dust sheet. Brass tapware sits on a clean cloth waiting to be installed.",
      "Light: soft natural daylight from a frosted bathroom window. Tones: muted putty, warm beige, soft brass. No text, no signage.",
    ].join(" "),
  },
  {
    name: "project-1",
    prompt: [
      "Editorial 4:3 architectural exterior of a completed contemporary detached Dutch family home at the edge of Veere, photographed in the soft late afternoon light.",
      "Warm baksteen facade in a long horizontal Dutch bond, tall vertical oak window kozijnen, a low pitched anthracite tiled roof.",
      "Foreground a tidy gravel driveway and a hint of clipped beech hedge, no people. Late summer sky with high thin clouds.",
      "Mood: completed and lived-in but pristine. No text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "project-2",
    prompt: [
      "Editorial 4:3 close-up of a restored 17th-century gable facade in the Middelburg historic centre at golden hour.",
      "Authentic Dutch baksteen, restored ornamental sandstone elements, freshly painted cream-white timber kozijnen with classic blinds. A slim slice of cobblestoned street visible at bottom.",
      "The composition emphasises craft details: a single ornamental stone with subtle relief carving sits dead-centre, the rest of the facade frames it symmetrically.",
      "Quiet warm light, no people. No text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "project-3",
    prompt: [
      "Editorial 4:3 exterior of a completed renovation of a coastal Dutch dyke house in Domburg. A new rear extension in dark stained timber cladding meets the original red-brick house.",
      "Two dormers (dakkapellen) sit cleanly on the renewed dark grey roof. Slim aluminium-framed sliding doors open onto a small terraced garden.",
      "Soft overcast Dutch coastal light, faintly silver sea visible in the far distance, no people.",
      "Mood: contemporary but respectful of the original house. No text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "project-4",
    prompt: [
      "Editorial 4:3 interior of a finished bathroom renovation in a 1930s Dutch home. Walk-in shower at left with frameless glass, large-format off-white tiles, dark grout, a wall-hung oak vanity with a brass tap.",
      "Soft daylight from a high window with frosted glass. A folded thick white towel hung on a brass hook. Subtle plants in a terracotta pot in foreground.",
      "Material palette: warm putty, oak, brass, white tile, dark slate-grey grout. No people, no text, no signage.",
    ].join(" "),
  },
  {
    name: "project-5",
    prompt: [
      "Editorial 4:3 exterior of a brand-new Dutch commercial bedrijfspand in Arnemuiden at end of workday. Long horizontal volume in warm red baksteen and dark anthracite metal cladding.",
      "Large industrial aluminium-framed glazing on one half, smaller office windows on the other. Neat asphalt forecourt with a few painted parking lines, no vehicles, no people.",
      "Light: low warm golden hour, long soft shadows. No text, no logos, no signage on any wall.",
    ].join(" "),
  },
  {
    name: "project-6",
    prompt: [
      "Editorial 4:3 exterior of a restored historic Dutch boerderij farmhouse near Zoutelande, with its long thatched and red-pantiled roof and white-rendered walls, restored timber stable doors painted moss-green.",
      "Late afternoon light catches the cream-rendered wall. A weathered pear tree at left frames the composition. Gravel forecourt, no people, no vehicles.",
      "Material palette: cream lime render, moss-green door, red pantiles, warm stone plinth. No text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "workshop",
    prompt: [
      "Editorial 5:4 wider photograph of the same Dutch traditional timber workshop, showing the depth of the space: a long workbench down the centre with rows of clamps and hand tools.",
      "Soft north light from a high industrial window on the left wall. Stacks of milled oak boards on the right, a half-finished window kozijn assembled in the foreground.",
      "Concrete floor with fine wood shavings catching the light. Two craftsmen in profile in mid-distance, conversing over a drawing on the bench, faces partly obscured.",
      "Atmosphere: warm, generous, ordered. No text, no signage, no logos on any tool, jacket or wall.",
    ].join(" "),
  },
  {
    name: "hero-alt",
    prompt: [
      "Wide cinematic 21:9 photograph at golden hour: a tall sandblasted brick facade of a Zeeland-style townhouse in restoration, scaffolding partly dismantled, fresh putty paint on timber kozijnen.",
      "Camera positioned low, looking diagonally upward, so the facade fills the right half of the frame with a deep blue evening sky behind.",
      "A single quiet figure of a craftsman in a navy boiler suit walks away from camera carrying a folded ladder under one arm, silhouetted.",
      "Negative space upper-left for headline overlay. Strictly no text, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "hero-strong",
    prompt: [
      "Award-winning architectural photography, 16:9, dramatic cinematic shot of a half-restored 17th-century Dutch baksteen gable house in a narrow Zeeland street at the exact moment golden hour ends and blue hour begins.",
      "The entire warm red-brown brick facade is illuminated with a single warm raking light from the left, throwing the brickwork into sharp tactile relief with deep shadows in every joint.",
      "Two thirds up, freshly restored cream-painted timber kozijnen glow softly against the darker brick. A slim wrought-iron scaffold-ladder is visible at the right edge, hinting at recent restoration work, partly disassembled.",
      "Cobblestoned street wet from earlier rain reflects the warm light, leading the eye toward the facade. A single craftsman in a navy boiler suit, far in the distance, walks away carrying a folded ladder, silhouette catching one last ray of sun.",
      "Composition: low camera angle, facade fills the upper two-thirds of the frame, generous negative space in the upper-left and bottom for a headline overlay.",
      "Color palette: warm reddish baksteen, deep navy sky, cream kozijnen, hint of cobalt reflection on wet cobbles. High dynamic range, sharp detail, no people in close foreground.",
      "Strictly no text, no signage, no logos, no high-vis vests.",
    ].join(" "),
  },
  {
    name: "portret-pieter",
    prompt: [
      "Editorial 4:5 portrait of a Dutch master carpenter in his late 50s, weathered but kind face, short greying beard, charcoal work apron over a faded navy long-sleeve.",
      "Three-quarter view, facing slightly off-camera, soft natural north light from a high workshop window catches one side of his face.",
      "Background softly out of focus: the Mesu timber workshop, hints of clamps and tools on a wall.",
      "Medium-format film look, subtle grain, warm honest mood. No text, no logos visible on clothing.",
    ].join(" "),
  },
  {
    name: "portret-marit",
    prompt: [
      "Editorial 4:5 portrait of a Dutch woman in her early 40s, project manager in a Dutch construction company. Short dark blond hair, dark grey wool blazer over a putty turtleneck, neutral confident expression.",
      "Three-quarter view, facing camera, soft overcast daylight from a tall industrial window.",
      "Background softly out of focus showing a building site corridor with stacked oak boards.",
      "Magazine portrait feel, subtle grain, no logos, no jewellery in focus.",
    ].join(" "),
  },
  {
    name: "portret-jasper",
    prompt: [
      "Editorial 4:5 portrait of a Dutch metselaar in his early 30s, short dark hair, light stubble, dust on his shoulders and a small cement smudge on one cheek.",
      "Wearing a faded denim work shirt, a folding ruler tucked into a front pocket.",
      "Three-quarter view, looking slightly to the side, late-afternoon warm light from the right.",
      "Background softly out of focus: a half-restored brick facade with fresh light-grey mortar joints visible.",
      "Honest, calm, slightly tired-from-good-work expression. No logos.",
    ].join(" "),
  },
  {
    name: "portret-koen",
    prompt: [
      "Editorial 4:5 portrait of a young Dutch apprentice in his early 20s, fresh face, short blonde hair, faint freckles, holding a wooden planing iron in one hand close to chest.",
      "Wearing a dark green canvas apron over a cream long-sleeve.",
      "Three-quarter view facing camera, soft front light, warm wood-shaving sawdust floating in air behind him.",
      "Background softly blurred timber workshop. Hopeful and curious expression.",
      "No logos, no text.",
    ].join(" "),
  },
  {
    name: "werken-bij-hero",
    prompt: [
      "Editorial 16:9 wide photograph of a crew of four Dutch builders gathered around a workbench at the end of a workday in a sunlit timber workshop. They are reviewing a building drawing pinned down by a coffee thermos and a folding ruler.",
      "Warm late-afternoon side light, long soft shadows on the concrete floor. Faces partly obscured, atmosphere camaraderie.",
      "Material palette: cream wall, warm oak boards, dark workwear. No text on any garment, no signage, no logos.",
    ].join(" "),
  },
  {
    name: "verduurzaming-hero",
    prompt: [
      "Editorial 16:9 wide photograph of a craftsman applying a thick layer of fresh natural sheep-wool insulation between oak rafters in the attic of a traditional Dutch farmhouse, mid-renovation.",
      "A small section of roof tiles already replaced overhead shows new black ceramic pantiles. Soft daylight enters through one re-tiled opening.",
      "Texture-rich: cream-coloured insulation, dark oak beams, dust catching the light.",
      "No text, no signage, no logos. Honest, careful, modern but warm.",
    ].join(" "),
  },
  {
    name: "detail-mortar",
    prompt: [
      "Macro 1:1 editorial close-up of fresh lime mortar being struck flush in a brick joint by a small jointing iron. Bricks in shades of warm red, ochre and burnt orange, mortar pale putty colour, tool dark steel.",
      "Sharp tactile focus, subtle side light, hint of motion blur on the tool's tip.",
      "No text, no logos. Pure craft moment.",
    ].join(" "),
  },
  {
    name: "detail-wood",
    prompt: [
      "Macro 1:1 editorial close-up of a hand plane gliding along a fresh oak board, producing a single curled shaving that catches the light.",
      "Sharp focus on the iron of the plane and the curled shaving, oak grain in honey tones, fingers visible at the back of the plane.",
      "Soft north light, dust particles drifting. No text, no logos.",
    ].join(" "),
  },
];

const filtered = ONLY ? IMAGES.filter((i) => i.name === ONLY) : IMAGES;
if (ONLY && filtered.length === 0) {
  console.error(`No image named "${ONLY}". Available:`);
  IMAGES.forEach((i) => console.error(`  ${i.name}`));
  process.exit(1);
}

async function generateOne({ name, prompt }) {
  const outPath = path.join(OUTPUT_DIR, `${name}.jpg`);
  if (fs.existsSync(outPath) && !FORCE) {
    console.log(`skip (exists): ${name}.jpg`);
    return { name, status: "skip" };
  }
  console.log(`generating: ${name}`);
  const t0 = Date.now();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: `${BRAND}\n\n${prompt}`,
    });
    const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) {
      console.warn(`  no image data returned for ${name}`);
      return { name, status: "empty" };
    }
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync(outPath, buffer);
    const kb = (buffer.length / 1024).toFixed(0);
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`saved: ${name}.jpg  (${kb} KB, ${secs}s)`);
    return { name, status: "ok" };
  } catch (err) {
    console.error(`failed: ${name}  ${err.message}`);
    return { name, status: "error" };
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`\nGenerating ${filtered.length} image${filtered.length === 1 ? "" : "s"} into:`);
  console.log(`  ${path.relative(PROJECT_ROOT, OUTPUT_DIR)}/\n`);

  const results = [];
  for (const img of filtered) {
    results.push(await generateOne(img));
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status === "skip").length;
  const fail = results.filter((r) => r.status !== "ok" && r.status !== "skip").length;
  console.log(`\nDone: ${ok} generated, ${skip} skipped, ${fail} failed.\n`);
  if (fail > 0) process.exit(1);
}

main();
