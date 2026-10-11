/**
 * Builds content/data/body-bindings.json — the reverse index that lets a body
 * structure answer "what does Kamura have for this?".
 *
 * Why a build step rather than runtime matching: the mapping is editorial, not
 * mechanical, and the client should ship a lookup table rather than 479
 * regexes. The output is minified because it is served to browsers, so review
 * the console report this prints and tests/body-bindings.test.mjs rather than
 * the file's diff.
 *
 * Four categories come out of this, and only the first one binds:
 *   anatomical  — the outcome names a structure the model actually contains
 *   cellular    — the outcome is real but happens below organ scale, so no mesh
 *                 can show it (NAD+, autophagy, telomeres, senescence)
 *   informational — the outcome is about knowing, not about a body part
 *                 (baseline, safety profile, risk stratification)
 *   female-only — the outcome concerns anatomy the loaded male model lacks
 *
 * The other three are counted and kept so the interface can say plainly that
 * there is nothing to point at, instead of pointing at the wrong thing. Each
 * has a different fix: a cellular gap needs a new kind of diagram, a
 * female-only gap needs a second model.
 *
 * Run: node scripts/build-body-bindings.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const atlas = read('public/body-models/atlas.json');
const { treatments } = read('content/data/treatments.json');
const catalogue = read('src/data/therapy-explorer.json');

/* ── anchors ──────────────────────────────────────────────────────────────
   Named organ concepts, each verified to carry geometry in atlas.json.
   An anchor is only usable if it resolves; the assertion below is the guard
   against a future atlas rebuild silently dropping one. */
const A = {
  heart: 'FMA7088',
  aorta: 'FMA3734',
  brain: 'FMA50801',
  hippocampus: 'FMA62493',
  hypothalamus: 'FMA62008',
  pineal: 'FMA62033',
  pituitary: 'FMA13889',
  spinalCord: 'FMA7647',
  liver: 'FMA7197',
  pancreas: 'FMA7198',
  stomach: 'FMA7148',
  smallIntestine: 'FMA7200',
  largeIntestine: 'FMA7201',
  gallbladder: 'FMA7202',
  kidney: 'FMA7203',
  bladder: 'FMA15900',
  rightLung: 'FMA7309',
  leftLung: 'FMA7310',
  trachea: 'FMA7394',
  diaphragm: 'FMA13295',
  spleen: 'FMA7196',
  thymus: 'FMA9607',
  adrenal: 'FMA9604',
  testis: 'FMA7210',
  prostate: 'FMA9600',
  skin: 'FMA7163',
  hair: 'FMA54241',
  femur: 'FMA9611',
  tendon: 'FMA9721',
};

const conceptById = new Map(atlas.concepts.map((c) => [c.id, c]));
const partById = new Map(atlas.parts.map((p) => [p.id, p]));
const missing = Object.entries(A).filter(([, id]) => {
  const c = conceptById.get(id);
  return !c || !(c.elements || []).some((e) => partById.has(e));
});
if (missing.length) {
  console.error('Anchors with no geometry in atlas.json:', missing);
  process.exit(1);
}

/* ── rules ────────────────────────────────────────────────────────────────
   Every matching rule contributes, so "Cardiovascular & Metabolic Health"
   reaches both the heart and the pancreas. Order is irrelevant for these;
   the two classifiers at the end run only when nothing anatomical matched. */
const RULES = [
  [/cardiovascular|heart|blood pressure|cholesterol|lipid|crp|homocysteine|blood flow|capillar|circulat|viscosity|vo2|aerobic|statin/,
    ['cardiac', 'arterial'], [A.heart, A.aorta]],
  [/metabolic|glycemi|blood sugar|glucose|insulin|diabetes|visceral fat|fat loss|fat oxidation|weight|appetite|craving|brown fat|metabolism|caloric expenditure|body composition|obesity|igf-1/,
    ['digestive', 'endocrine'], [A.pancreas, A.liver]],
  [/liver|hepat|bile|detox|glutathione|methylation|nrf2|heavy metal|toxin|toxic burden|mycotoxin|chelation|purging/,
    ['digestive'], [A.liver, A.gallbladder]],
  [/kidney|renal|urinary|incontinence/, ['urinary'], [A.kidney, A.bladder]],
  [/cogniti|memory|brain|neuro|nerve|focus|mental clarity|brain fog|ngf|alzheimer|epilep|tbi|headache|migraine|nervous system|autonomic|norepinephrine|alpha wave/,
    ['nervous'], [A.brain, A.hippocampus]],
  [/mood|depress|anxiet|ptsd|stress|cortisol|suicid|emotional|relax|wellbeing|well-being|psychobiotic|addiction|mental health|mental toughness|spiritual|bonding|motivation|adrenal/,
    ['nervous', 'endocrine'], [A.brain, A.adrenal]],
  [/sleep|insomnia|melatonin|hrv|heart rate variability/, ['nervous'], [A.brain, A.pineal]],
  [/muscle|muscular|sarcopenia|strength|power|endurance|doms|soreness|recovery|exercise|athletic|training|strain|core |postur|trigger point|physical function|caloric/,
    ['muscular'], []],
  [/bone|skelet|mineral density|fracture/, ['skeletal'], [A.femur]],
  [/joint|cartilage|osteoarthritis|knee|range of motion|flexibilit|mobilit|tendon|ligament|plantar fasciitis|back pain|neck pain|musculoskeletal|fall prevention|injury prevention/,
    ['connective', 'skeletal'], [A.tendon, A.femur]],
  [/skin|acne|wrinkle|collagen|hyperpigment|rosacea|scar|hair|crow|forehead line|fine line|sun spot|skin tone|contour|facial volume|elasticity|brighten|edema/,
    ['integumentary'], [A.skin, A.hair]],
  [/gut|digest|bowel|ibs|intestin|microbiome|bloat|abdominal pain|food trigger|trigger food|barrier repair|parasite|elimination diet/,
    ['digestive'], [A.smallIntestine, A.largeIntestine, A.stomach]],
  [/immune|nk cell|autoimmune|infection|inflammat|lymphatic|thymus|cancer|antioxidant|oxidative/,
    ['lymphatic'], [A.thymus, A.spleen]],
  [/respirator|lung|breath|oxygen/, ['respiratory'], [A.rightLung, A.leftLung, A.trachea]],
  /* Hormones are split rather than pooled. A single rule here put "Menopausal
     Symptom Relief" and "Endometrial Protection" on the prostate, which is the
     same class of error as mapping a hair treatment to the wrong follicle: it
     looks like precision and is simply wrong. Female-specific outcomes get no
     anchor at all, because the loaded model is male — see FEMALE_ONLY. */
  [/testosterone|\bsperm\b|erectile|prostate|\bpsa\b|male fertility/,
    ['reproductive', 'endocrine'], [A.testis, A.prostate]],
  [/growth hormone|\bigf-1\b|kisspeptin|pituitary|hormone optimization|hormonal balance|stable hormone|hormone precursor/,
    ['endocrine'], [A.pituitary]],
  [/libido|sexual|\bhsdd\b|pelvic pain|improved sensitivity/, ['reproductive', 'nervous'], [A.brain]],
  [/\bthyroid\b/, ['endocrine'], []],
  [/fertility|conception|egg health/, ['reproductive', 'endocrine'], [A.pituitary]],
  [/\beye\b|vision|retina/, ['sensory'], []],
  [/adhd|attention/, ['nervous'], [A.brain]],
  [/wound|tissue repair|tissue regenerat|tissue remodel|healing|remodeling|stem cell|rejuvenat|tissue heal/,
    ['connective'], []],
  [/pain/, ['nervous'], [A.spinalCord]],
];

/**
 * Outcomes about female anatomy. The loaded BodyParts3D model is an adult male
 * and contains no uterus, ovary or breast, so these have nothing to point at.
 * Counted separately from `cellular` because the fix is different: a cellular
 * gap needs a new kind of diagram, this one needs a female model.
 */
const FEMALE_ONLY = /menopaus|vaginal|endometrial|\bestrogen\b|oestrogen|\bbreast\b|uter|ovar|cervic|menstrual|\bhrt\b for women/;

/** Below organ scale — real biology the mesh library cannot represent. */
const CELLULAR = /telomere|senescen|autophagy|mitophagy|nad\+|sirt1|mitochondri|biological age|lifespan|longevity|mortality|anti-aging|anti aging|aging|cellular repair|cellular energy|hallmark|caloric restriction mimetic|exercise mimetic|enzyme inhibition|slowed degeneration|age reversal|preventive aging|activated autophagy|stem cell regeneration|species-level|energy|fatigue|vitality|cold adaptation|thermogen/;

/** About knowing, not about a body part. */
const INFORMATIONAL = /baseline|safety|tolerab|satisfaction|guidance|monitoring|tracking|recommendation|lifestyle modification|risk prediction|risk stratification|identification|measurement|quantification|detection|insight|comprehensive microbiome map|efficacy beyond placebo|adherence|behavior change|peace of mind|no injection|holistic wellness|quality of life|personalized|pharmacogenomic|herb-drug|specific herb|herbal medicine|treatment decision|treatment guidance|human translation|chronic disease|functional independence|daily function|hydration|intervention|reported immune activation|specific healing|patient satisfaction|disease risk|early illness|early disease|early cancer/;

function classify(name) {
  const n = name.toLowerCase();
  /* Checked before the anatomical rules, not after. Otherwise "Menopausal
     Symptom Relief" matches the hormone rules first and lands on a male organ. */
  if (FEMALE_ONLY.test(n)) return { kind: 'female-only', systems: ['reproductive'], anchors: [] };
  const systems = new Set();
  const anchors = new Set();
  for (const [re, sys, anc] of RULES) {
    if (re.test(n)) {
      sys.forEach((s) => systems.add(s));
      anc.forEach((a) => anchors.add(a));
    }
  }
  if (systems.size) return { kind: 'anatomical', systems: [...systems], anchors: [...anchors] };
  if (CELLULAR.test(n)) return { kind: 'cellular', systems: [], anchors: [] };
  if (INFORMATIONAL.test(n)) return { kind: 'informational', systems: [], anchors: [] };
  return { kind: 'unmapped', systems: [], anchors: [] };
}

/* ── curated bindings ─────────────────────────────────────────────────────
   Twelve tools and guides, and the analytes of a routine panel. Too few and
   too consequential to keyword-match, so each carries a `basis` saying why the
   link exists — which is also the sentence the interface shows, so a reader is
   never left guessing why a screening tool lit up an organ.

   Where a value's organ is genuinely absent from the model, the entry says so
   with `absent` rather than pointing at the nearest available mesh. The thyroid
   is the big one: TSH, T3 and T4 are among the most-ordered tests in the UAE and
   BodyParts3D has no thyroid gland at all. */
const INSTRUMENT_BINDINGS = {
  'depression-phq9': { systems: ['nervous', 'endocrine'], anchors: [A.brain, A.hippocampus, A.adrenal],
    basis: 'Screens mood symptoms. Highlights the regions and the stress axis most studied in depression — not a location of disease.' },
  'anxiety-gad7': { systems: ['nervous', 'endocrine'], anchors: [A.brain, A.adrenal],
    basis: 'Screens anxiety symptoms, which are studied alongside the hypothalamic–pituitary–adrenal stress response.' },
  'fasting-glucose': { systems: ['digestive', 'endocrine'], anchors: [A.pancreas, A.liver],
    basis: 'Fasting glucose reflects insulin secreted by the pancreas and glucose released by the liver.' },
  bmi: { systems: ['digestive'], anchors: [A.pancreas, A.liver, A.heart],
    basis: 'BMI is a whole-body ratio, not an organ measure. Shown here against the organs whose risk it is used as a proxy for.' },
  'body-fat-navy': { systems: ['digestive'], anchors: [A.pancreas, A.liver, A.heart],
    basis: 'A circumference estimate of total body fat. Linked to the organs that visceral fat affects, not to a site of measurement.' },
  'pack-years': { systems: ['respiratory', 'arterial'], anchors: [A.rightLung, A.leftLung, A.trachea, A.heart],
    basis: 'Cumulative smoking exposure. The airways and the arterial wall carry most of the measured risk.' },
  'ideal-body-weight': { systems: ['digestive'], anchors: [],
    basis: 'A height-based formula used for drug dosing. It describes no organ, so nothing is highlighted.' },
};

const COMPOUNDED_BINDINGS = {
  'bioidentical-hormone-creams': { systems: ['endocrine', 'reproductive', 'integumentary'], anchors: [A.skin, A.testis, A.prostate, A.pituitary],
    basis: 'Absorbed through the skin, then acting on hormone-responsive tissue. The route and the target are different places.' },
  'topical-nad': { systems: ['integumentary'], anchors: [A.skin],
    basis: 'Applied to the skin. The NAD+ pathway it claims to reach operates inside cells, below anything this model can show.' },
  'compounded-peptides': { systems: ['connective', 'muscular', 'digestive'], anchors: [A.stomach, A.tendon],
    basis: 'Peptide targets vary by molecule — open a specific therapy for its own mapped regions rather than reading this as one site.' },
  'compounded-glp1': { systems: ['digestive', 'endocrine', 'nervous'], anchors: [A.pancreas, A.stomach, A.smallIntestine, A.brain],
    basis: 'GLP-1 receptors are found in the pancreas, the gut wall and appetite-regulating regions of the brain.' },
  'compounded-dermatology': { systems: ['integumentary'], anchors: [A.skin, A.hair],
    basis: 'Applied to skin and scalp. Depth of penetration differs by base and by active.' },
};

/** Routine panel analytes. `absent` names an organ the model does not contain. */
const ANALYTE_BINDINGS = [
  { match: /\b(alt|sgpt|ast|sgot|ggt|alkaline phosphatase|alp|bilirubin|albumin)\b/i,
    anchors: [A.liver], label: 'Liver enzymes and proteins', basis: 'Released or produced by liver cells.' },
  { match: /\b(creatinine|urea|bun|egfr|uric acid)\b/i,
    anchors: [A.kidney], label: 'Kidney function', basis: 'Cleared by the kidneys, so the level reflects filtration.' },
  { match: /\b(glucose|hba1c|a1c|insulin|c-peptide)\b/i,
    anchors: [A.pancreas, A.liver], label: 'Glucose handling', basis: 'Set by pancreatic insulin and hepatic glucose output.' },
  { match: /\b(cholesterol|ldl|hdl|triglycerides?|non-hdl|apob|apo b|lipoprotein|lp\(a\))\b/i,
    anchors: [A.heart, A.aorta, A.liver], label: 'Lipids', basis: 'Assembled by the liver; measured because of what they do to the arterial wall.' },
  { match: /\b(tsh|thyroid|t3|t4|ft4|ft3|thyroxine|anti-tpo)\b/i,
    anchors: [], absent: 'thyroid gland', label: 'Thyroid function',
    basis: 'The thyroid is not present in this anatomy library, so there is nothing to highlight for these values.' },
  { match: /\b(testosterone|lh|fsh|shbg|estradiol|oestradiol|prolactin|dhea)\b/i,
    anchors: [A.testis, A.pituitary, A.adrenal], label: 'Sex and pituitary hormones', basis: 'Produced in the gonads and adrenal cortex under pituitary control.' },
  { match: /\b(cortisol|acth)\b/i,
    anchors: [A.adrenal, A.pituitary], label: 'Stress axis', basis: 'Adrenal cortisol released under pituitary ACTH signalling.' },
  { match: /\b(h(a)?emoglobin|h(a)?ematocrit|rbc|mcv|mch|ferritin|iron|transferrin|b12|folate)\b/i,
    anchors: [A.spleen, A.femur], label: 'Red cells and iron', basis: 'Red cells are made in marrow and removed by the spleen.' },
  { match: /\b(wbc|neutrophils?|lymphocytes?|monocytes?|eosinophils?|crp|esr|platelets?)\b/i,
    anchors: [A.thymus, A.spleen], label: 'White cells and inflammation', basis: 'Lymphocyte development and immune filtering happen in the thymus and spleen.' },
  { match: /\b(vitamin d|25-oh|calcium|pth|parathyroid|phosphate|phosphorus)\b/i,
    anchors: [A.femur, A.kidney], label: 'Bone minerals', basis: 'Calcium balance is held between bone, gut and kidney.' },
  { match: /\bpsa\b/i, anchors: [A.prostate], label: 'Prostate', basis: 'A protein made by prostate tissue.' },
  { match: /\b(amylase|lipase)\b/i, anchors: [A.pancreas], label: 'Pancreatic enzymes', basis: 'Digestive enzymes released by the pancreas.' },
  { match: /\b(sodium|potassium|chloride|bicarbonate)\b/i,
    anchors: [A.kidney, A.adrenal], label: 'Electrolytes', basis: 'Regulated by the kidney under adrenal aldosterone signalling.' },
];

/* ── build the index ─────────────────────────────────────────────────────── */
const outcomes = {};      // outcome name -> classification
const bySystem = {};      // SystemId -> [{slug,treatment,outcome,grade,direction}]
const byAnchor = {};      // FMA id   -> same
const counts = { anatomical: 0, cellular: 0, informational: 0, 'female-only': 0, unmapped: 0 };
const unmappedNames = new Set();

for (const t of treatments) {
  for (const o of t.outcomes || []) {
    const c = outcomes[o.name] || (outcomes[o.name] = classify(o.name));
    counts[c.kind]++;
    if (c.kind === 'unmapped') unmappedNames.add(o.name);
    const row = {
      slug: t.slug, treatment: t.name, outcome: o.name,
      grade: o.grade, direction: o.direction, category: t.category,
    };
    for (const s of c.systems) (bySystem[s] = bySystem[s] || []).push(row);
    for (const a of c.anchors) (byAnchor[a] = byAnchor[a] || []).push(row);
  }
}

/* Therapies already carry explicit FMA regions — fold them in so a structure
   lists both the graded outcomes and the mechanism maps that point at it. */
const therapiesByAnchor = {};
const therapiesBySystem = {};
for (const t of catalogue) {
  for (const r of t.regions || []) {
    const row = { id: t.id, name: t.name, kind: t.kind, region: r.name };
    (therapiesByAnchor[r.id] = therapiesByAnchor[r.id] || []).push(row);
    for (const el of r.elements || []) {
      const p = partById.get(el);
      if (p) (therapiesBySystem[p.system] = therapiesBySystem[p.system] || []).push(row);
    }
  }
}
for (const k of Object.keys(therapiesBySystem)) {
  const seen = new Set();
  therapiesBySystem[k] = therapiesBySystem[k].filter((r) => !seen.has(r.id) && seen.add(r.id));
}

const dedupe = (map) => {
  for (const k of Object.keys(map)) {
    const seen = new Set();
    map[k] = map[k].filter((r) => {
      const key = r.slug + '|' + r.outcome;
      return !seen.has(key) && seen.add(key);
    }).sort((a, b) => a.grade.localeCompare(b.grade));
  }
};
dedupe(bySystem);
dedupe(byAnchor);

/* Invert the curated maps so a structure can list the tools and guides that
   reach it, the same way it lists graded outcomes. */
const toolsByAnchor = {};
const toolsBySystem = {};
const addCurated = (kind, slug, b) => {
  const row = { kind, slug, basis: b.basis };
  for (const a of b.anchors) (toolsByAnchor[a] = toolsByAnchor[a] || []).push(row);
  for (const s of b.systems) (toolsBySystem[s] = toolsBySystem[s] || []).push(row);
};
for (const [slug, b] of Object.entries(INSTRUMENT_BINDINGS)) addCurated('instrument', slug, b);
for (const [slug, b] of Object.entries(COMPOUNDED_BINDINGS)) addCurated('compounded', slug, b);

const analytesByAnchor = {};
for (const a of ANALYTE_BINDINGS) {
  for (const id of a.anchors) {
    (analytesByAnchor[id] = analytesByAnchor[id] || []).push({ label: a.label, basis: a.basis });
  }
}

/* Normalise before writing. bySystem and byAnchor repeat the same outcome rows
   many times over — brain alone carries 117 — and the unnormalised file came to
   465 KB. Rows are stored once and referenced by index, which is the difference
   between a lookup table the client can hold and a payload worth deferring. */
const rows = [];
const rowIndex = new Map();
const intern = (r) => {
  const key = r.slug + '|' + r.outcome;
  let i = rowIndex.get(key);
  if (i === undefined) {
    i = rows.length;
    rows.push([r.slug, r.treatment, r.outcome, r.grade, r.direction, r.category]);
    rowIndex.set(key, i);
  }
  return i;
};
const toIdx = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v.map(intern)]));
const bySystemIdx = toIdx(bySystem);
const byAnchorIdx = toIdx(byAnchor);

const out = {
  generated: new Date().toISOString().slice(0, 10),
  note: 'Generated by scripts/build-body-bindings.mjs — do not edit by hand.',
  anchors: A,
  counts,
  outcomes,
  rowFields: ['slug', 'treatment', 'outcome', 'grade', 'direction', 'category'],
  rows,
  bySystem: bySystemIdx,
  byAnchor: byAnchorIdx,
  therapiesBySystem,
  therapiesByAnchor,
  instruments: INSTRUMENT_BINDINGS,
  compounded: COMPOUNDED_BINDINGS,
  analytes: ANALYTE_BINDINGS.map((a) => ({
    pattern: a.match.source, flags: a.match.flags,
    anchors: a.anchors, absent: a.absent ?? null, label: a.label, basis: a.basis,
  })),
  toolsByAnchor,
  toolsBySystem,
  analytesByAnchor,
};
/* Two outputs, because they have different costs.

   The reverse index is 135 KB and only matters once someone selects a structure,
   so it is served as a static file next to atlas.json and fetched on the body
   page — never bundled into JS. The curated maps are small and are needed to
   render server components (a tool page saying "see this on the body"), so they
   are emitted as a typed module. */
writeFileSync(join(root, 'public/body-models/bindings.json'), JSON.stringify(out));

const ts = `// Generated by scripts/build-body-bindings.mjs — do not edit by hand.
// The large reverse index lives at /body-models/bindings.json and is fetched at
// runtime. Only the curated, hand-reviewed maps are bundled here.

export type SystemId =
  | 'skeletal' | 'muscular' | 'arterial' | 'venous' | 'nervous' | 'digestive'
  | 'respiratory' | 'urinary' | 'reproductive' | 'lymphatic' | 'endocrine'
  | 'integumentary' | 'connective' | 'sensory' | 'cardiac';

export interface CuratedBinding {
  /** FMA concept ids, each verified to carry geometry in atlas.json. */
  anchors: string[];
  systems: SystemId[];
  /** Why this link exists. Shown to the reader, so it must stay plain. */
  basis: string;
}

/** Named organ concepts used as binding targets. */
export const ANCHORS = ${JSON.stringify(A, null, 2)} as const;

/** Display name for each anchor, taken from the atlas rather than retyped. */
export const ANCHOR_NAMES: Record<string, string> = ${JSON.stringify(
  Object.fromEntries(Object.values(A).map((id) => [id, conceptById.get(id)?.name ?? id])), null, 2)};

export const INSTRUMENT_BINDINGS: Record<string, CuratedBinding> = ${JSON.stringify(INSTRUMENT_BINDINGS, null, 2)};

export const COMPOUNDED_BINDINGS: Record<string, CuratedBinding> = ${JSON.stringify(COMPOUNDED_BINDINGS, null, 2)};

export interface AnalyteBinding {
  pattern: string;
  flags: string;
  anchors: string[];
  /** Set when the organ behind these values is not in the model at all. */
  absent: string | null;
  label: string;
  basis: string;
}

export const ANALYTE_BINDINGS: AnalyteBinding[] = ${JSON.stringify(out.analytes, null, 2)};

/**
 * Resolve a lab analyte name to the organs it reflects.
 * Returns null when nothing matches, and an entry with \`absent\` set when the
 * organ exists in medicine but not in this anatomy library.
 */
export function analyteBinding(name: string): AnalyteBinding | null {
  for (const a of ANALYTE_BINDINGS) {
    if (new RegExp(a.pattern, a.flags).test(name)) return a;
  }
  return null;
}

/** How the 619 graded outcomes divide. Quoted in the interface, so keep derived. */
export const OUTCOME_COUNTS = ${JSON.stringify(counts, null, 2)} as const;
`;
writeFileSync(join(root, 'src/data/body-bindings.ts'), ts);

/* ── report ─────────────────────────────────────────────────────────────── */
const total = Object.values(counts).reduce((a, b) => a + b, 0);
const pct = (n) => ((n / total) * 100).toFixed(1) + '%';
console.log(`\n${total} graded outcomes classified`);
console.log(`  anatomical     ${String(counts.anatomical).padStart(3)}  ${pct(counts.anatomical)}  → bound to the body`);
console.log(`  cellular       ${String(counts.cellular).padStart(3)}  ${pct(counts.cellular)}  → below organ scale, no mesh can show it`);
console.log(`  informational  ${String(counts.informational).padStart(3)}  ${pct(counts.informational)}  → about knowing, not a structure`);
console.log(`  female-only    ${String(counts['female-only']).padStart(3)}  ${pct(counts['female-only'])}  → no female anatomy in the loaded model`);
console.log(`  unmapped       ${String(counts.unmapped).padStart(3)}  ${pct(counts.unmapped)}`);
if (unmappedNames.size) {
  console.log('\nunmapped outcome names:');
  [...unmappedNames].sort().forEach((n) => console.log('   ', n));
}
console.log('\noutcomes reaching each system:');
Object.entries(bySystem).sort((a, b) => b[1].length - a[1].length)
  .forEach(([s, rows]) => console.log('   ', s.padEnd(14), String(rows.length).padStart(4)));
console.log('\nper anchor organ — outcomes / tools / analyte groups:');
const allAnchors = new Set([...Object.keys(byAnchor), ...Object.keys(toolsByAnchor), ...Object.keys(analytesByAnchor)]);
[...allAnchors]
  .sort((x, y) => (byAnchor[y]?.length || 0) - (byAnchor[x]?.length || 0))
  .forEach((id) => console.log('   ', (conceptById.get(id)?.name || id).padEnd(20),
    String(byAnchor[id]?.length || 0).padStart(4),
    String(toolsByAnchor[id]?.length || 0).padStart(4),
    String(analytesByAnchor[id]?.length || 0).padStart(4)));
const absent = ANALYTE_BINDINGS.filter((a) => a.absent);
if (absent.length) {
  console.log('\nanalyte groups with no organ in the model:');
  absent.forEach((a) => console.log('   ', a.label, '→', a.absent));
}
