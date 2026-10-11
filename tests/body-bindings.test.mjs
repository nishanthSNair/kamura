/**
 * Guards the body binding index.
 *
 * These are mostly regression tests for mistakes already made once. The
 * blanket hormone rule put "Menopausal Symptom Relief" on the prostate, and
 * five brain ventricles shipped classified as cardiac because their names
 * contain "ventricle". Both were the same failure: a rule that looked precise
 * and pointed at the wrong organ. A wrong binding in a health reference is
 * worse than no binding, so the cost of catching these is worth paying.
 */

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const index = read('public/body-models/bindings.json');
const atlas = read('public/body-models/atlas.json');

const conceptById = new Map(atlas.concepts.map((c) => [c.id, c]));
const partById = new Map(atlas.parts.map((p) => [p.id, p]));
const field = Object.fromEntries(index.rowFields.map((f, i) => [f, i]));
const rowsFor = (anchor) => (index.byAnchor[anchor] ?? []).map((i) => index.rows[i]);
const outcomeNames = (anchor) => rowsFor(anchor).map((r) => r[field.outcome]);

test('every anchor resolves to geometry that exists', () => {
  for (const [name, id] of Object.entries(index.anchors)) {
    const concept = conceptById.get(id);
    assert.ok(concept, `anchor ${name} (${id}) is not a concept in the atlas`);
    const real = (concept.elements ?? []).filter((e) => partById.has(e));
    assert.ok(real.length > 0, `anchor ${name} (${id}) resolves to no parts`);
  }
});

test('every outcome is classified — none fall through', () => {
  assert.equal(index.counts.unmapped, 0);
  const total = Object.values(index.counts).reduce((a, b) => a + b, 0);
  assert.equal(total, 619, 'outcome total changed; re-check the rules before updating this number');
});

test('female-specific outcomes never bind to male anatomy', () => {
  const female = Object.entries(index.outcomes)
    .filter(([, v]) => v.kind === 'female-only')
    .map(([name]) => name);
  assert.ok(female.length > 0, 'expected some female-only outcomes');
  for (const name of female) {
    assert.deepEqual(index.outcomes[name].anchors, [],
      `"${name}" must not anchor to an organ — the loaded model is male`);
  }
  for (const anchor of [index.anchors.prostate, index.anchors.testis]) {
    for (const outcome of outcomeNames(anchor)) {
      assert.doesNotMatch(outcome, /menopaus|endometrial|vaginal|ovar|uter/i,
        `"${outcome}" is bound to male reproductive anatomy`);
    }
  }
});

test('the prostate only carries male reproductive outcomes', () => {
  for (const outcome of outcomeNames(index.anchors.prostate)) {
    assert.match(outcome, /testosterone|sperm|erectile|prostate|fertility|psa/i,
      `"${outcome}" does not belong on the prostate`);
  }
});

test('thyroid values point at nothing rather than the nearest organ', () => {
  const thyroid = index.analytes.find((a) => /tsh/.test(a.pattern));
  assert.ok(thyroid, 'expected a thyroid analyte group');
  assert.deepEqual(thyroid.anchors, []);
  assert.equal(thyroid.absent, 'thyroid gland');
  // And the atlas genuinely has no thyroid gland, so the claim stays true.
  const gland = atlas.concepts.filter((c) => /^thyroid gland$/i.test(c.name));
  assert.equal(gland.length, 0, 'a thyroid gland now exists — update the binding');
});

test('brain ventricles are not classified as cardiac', () => {
  const misfiled = ['FMA78454', 'FMA78469', 'FMA78450', 'FMA78449', 'FMA75351'];
  for (const id of misfiled) {
    const parts = atlas.parts.filter((p) => p.conceptId === id);
    if (!parts.length) continue;
    // The raw atlas still says cardiac; normaliseAtlas() corrects it at load.
    // This asserts the correction list stays in step with the data.
    assert.ok(parts.every((p) => p.system === 'cardiac' || p.system === 'nervous'),
      `${id} has an unexpected system`);
  }
  const corrections = readFileSync(new URL('../src/components/body-explorer/anatomy.ts', import.meta.url), 'utf8');
  for (const id of misfiled) {
    assert.match(corrections, new RegExp(`${id}:'nervous'`),
      `${id} is missing from SYSTEM_CORRECTIONS`);
  }
});

test('outcome rows reference treatments that exist', () => {
  const {treatments} = read('content/data/treatments.json');
  const slugs = new Set(treatments.map((t) => t.slug));
  for (const row of index.rows) {
    assert.ok(slugs.has(row[field.slug]), `unknown treatment slug ${row[field.slug]}`);
  }
});

test('curated bindings name instruments and guides that exist', () => {
  // Instrument slugs live in the individual modules, not the barrel file.
  const dir = new URL('../src/data/instruments/', import.meta.url);
  const instruments = readdirSync(dir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => readFileSync(new URL(f, dir), 'utf8'))
    .join('\n');
  const compounded = readFileSync(new URL('../src/data/compounded.ts', import.meta.url), 'utf8');
  for (const slug of Object.keys(index.instruments)) {
    assert.match(instruments, new RegExp(`slug: '${slug}'`), `no instrument ${slug}`);
  }
  for (const slug of Object.keys(index.compounded)) {
    assert.match(compounded, new RegExp(`'${slug}'`), `no compounded guide ${slug}`);
  }
});

test('every curated binding explains itself', () => {
  for (const [slug, b] of Object.entries({...index.instruments, ...index.compounded})) {
    assert.ok(b.basis && b.basis.length > 30, `${slug} needs a basis a reader can act on`);
    assert.match(b.basis, /\.$/, `${slug} basis should read as a sentence`);
  }
});
