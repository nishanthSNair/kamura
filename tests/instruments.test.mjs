import test from 'node:test';
import assert from 'node:assert/strict';
// Imported leaf-first: Node's TypeScript loader needs explicit extensions, which
// the barrel (index.ts) deliberately omits for the bundler. tsc and the build
// verify the barrel itself.
import {phq9 as _phq9} from '../src/data/instruments/phq9.ts';
import {gad7 as _gad7} from '../src/data/instruments/gad7.ts';
import {bmi, packYears, idealWeight, bodyFat, fastingGlucose} from '../src/data/instruments/calculators.ts';
import {scoreInstrument, bandFor, maxScore} from '../src/lib/instruments.ts';

const INSTRUMENTS = [_phq9, _gad7, fastingGlucose, bmi, bodyFat, packYears, idealWeight];
const getInstrument = (slug) => INSTRUMENTS.find((i) => i.slug === slug);

const phq9 = getInstrument('depression-phq9');
const gad7 = getInstrument('anxiety-gad7');
const all0 = (ins, v = 0) =>
  Object.fromEntries(ins.body.questions.map((q) => [q.id, v]));

test('PHQ-9 totals and published cut-points', () => {
  assert.equal(maxScore(phq9), 27);
  assert.equal(scoreInstrument(phq9, all0(phq9)).score, 0);
  assert.equal(scoreInstrument(phq9, all0(phq9)).band.label, 'Minimal');
  assert.equal(scoreInstrument(phq9, all0(phq9, 3)).score, 27);
  assert.equal(scoreInstrument(phq9, all0(phq9, 3)).band.label, 'Severe');
  // boundary values of every published band
  for (const [score, label] of [[4, 'Minimal'], [5, 'Mild'], [9, 'Mild'], [10, 'Moderate'],
    [14, 'Moderate'], [15, 'Moderately severe'], [19, 'Moderately severe'], [20, 'Severe']])
    assert.equal(bandFor(phq9, score).label, label, `PHQ-9 ${score}`);
});

test('GAD-7 totals and published cut-points', () => {
  assert.equal(maxScore(gad7), 21);
  for (const [score, label] of [[0, 'Minimal'], [4, 'Minimal'], [5, 'Mild'], [9, 'Mild'],
    [10, 'Moderate'], [14, 'Moderate'], [15, 'Severe'], [21, 'Severe']])
    assert.equal(bandFor(gad7, score).label, label, `GAD-7 ${score}`);
});

test('PHQ-9 item 9 raises the crisis rule at the lowest possible endorsement', () => {
  const none = scoreInstrument(phq9, all0(phq9));
  assert.equal(none.safety, undefined);
  for (const v of [1, 2, 3]) {
    const answers = {...all0(phq9), q9: v};
    const r = scoreInstrument(phq9, answers);
    assert.ok(r.safety, `q9=${v} must trigger safety`);
    assert.ok(r.safety.resources.length > 0);
  }
});

test('crisis rule fires on a low total and on a partly finished questionnaire', () => {
  // Total of 1 — the lowest non-zero score — still surfaces help.
  const low = scoreInstrument(phq9, {...all0(phq9), q9: 1});
  assert.equal(low.score, 1);
  assert.equal(low.band.label, 'Minimal');
  assert.ok(low.safety, 'a Minimal band must not suppress the crisis rule');
  // Only item 9 answered: incomplete, but help still shows.
  const partial = scoreInstrument(phq9, {q9: 2});
  assert.equal(partial.complete, false);
  assert.ok(partial.safety, 'an unfinished questionnaire must not suppress the crisis rule');
});

test('incomplete questionnaires are marked incomplete', () => {
  const partial = {...all0(phq9)};
  delete partial.q5;
  assert.equal(scoreInstrument(phq9, partial).complete, false);
  assert.equal(scoreInstrument(phq9, all0(phq9)).complete, true);
});

test('BMI matches the published formula and WHO bands', () => {
  const ins = getInstrument('bmi');
  const r = scoreInstrument(ins, {height: 180, weight: 81});
  assert.equal(r.display, '25.0');
  assert.equal(r.band.label, 'Overweight');
  assert.equal(scoreInstrument(ins, {height: 170, weight: 65}).band.label, 'Healthy range');
  assert.equal(scoreInstrument(ins, {height: 170, weight: 50}).band.label, 'Underweight');
  assert.equal(scoreInstrument(ins, {height: 170, weight: 95}).band.label, 'Obese range');
});

test('pack-years uses 20 cigarettes to the pack', () => {
  const ins = getInstrument('pack-years');
  assert.equal(scoreInstrument(ins, {perDay: 20, years: 10}).display, '10.0');
  assert.equal(scoreInstrument(ins, {perDay: 10, years: 10}).display, '5.0');
  assert.equal(scoreInstrument(ins, {perDay: 40, years: 10}).band.label, '20 or more pack-years');
});

test('Devine reference weight matches the published constants', () => {
  const ins = getInstrument('ideal-body-weight');
  // exactly 5 ft → base weight, no increment
  assert.equal(scoreInstrument(ins, {height: 152.4, sex: 1}).display, '50.0');
  assert.equal(scoreInstrument(ins, {height: 152.4, sex: 0}).display, '45.5');
  // 6 ft = 12 inches over → +27.6 kg
  assert.equal(scoreInstrument(ins, {height: 182.88, sex: 1}).display, '77.6');
});

test('fasting glucose uses ADA diagnostic thresholds', () => {
  const ins = getInstrument('fasting-glucose');
  assert.equal(scoreInstrument(ins, {glucose: 5.0}).band.label, 'Normal range');
  assert.equal(scoreInstrument(ins, {glucose: 5.6}).band.label, 'Prediabetes range');
  assert.equal(scoreInstrument(ins, {glucose: 6.9}).band.label, 'Prediabetes range');
  assert.equal(scoreInstrument(ins, {glucose: 7.0}).band.label, 'Diabetes range');
});

test('US Navy body fat returns a plausible value and needs its inputs', () => {
  const ins = getInstrument('body-fat-navy');
  const r = scoreInstrument(ins, {sex: 1, height: 180, neck: 38, waist: 85, hip: 0});
  assert.ok(r.complete);
  assert.ok(Number(r.display) > 5 && Number(r.display) < 40, `implausible: ${r.display}`);
  // hip is optional (male equation), the rest are not
  assert.equal(scoreInstrument(ins, {sex: 1, height: 180, neck: 38, hip: 0}).complete, false);
});

test('every published instrument carries a licence, a source and honest caveats', () => {
  assert.ok(INSTRUMENTS.length >= 7);
  for (const i of INSTRUMENTS) {
    assert.ok(i.licenceNote.length > 20, `${i.slug} licence note`);
    assert.ok(i.source.citation.length > 20, `${i.slug} citation`);
    assert.ok(i.source.url.startsWith('https://'), `${i.slug} source url`);
    assert.ok(i.notes.length > 0, `${i.slug} must state its limits`);
    assert.ok(i.bands.length > 0, `${i.slug} bands`);
    assert.match(i.reviewed, /^\d{4}-\d{2}-\d{2}$/, `${i.slug} review date`);
  }
});

test('licensed instruments we do not hold rights to are absent', () => {
  const text = INSTRUMENTS.map((i) => `${i.slug} ${i.name}`).join(' ').toLowerCase();
  for (const banned of ['stop-bang', 'stopbang', 'frax', 'epworth'])
    assert.ok(!text.includes(banned), `${banned} must not be published without a licence`);
});

test('bands cover every reachable questionnaire score with no gaps', () => {
  for (const ins of INSTRUMENTS.filter((i) => i.body.kind === 'questionnaire')) {
    for (let s = 0; s <= maxScore(ins); s++) {
      const hits = ins.bands.filter((b) => s >= b.min && s <= b.max);
      assert.equal(hits.length, 1, `${ins.slug} score ${s} matched ${hits.length} bands`);
    }
  }
});
