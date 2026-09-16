// Copies the PDF and OCR engines into /public/report-tools so report reading runs
// entirely in the visitor's browser. Runs before dev and build; output is gitignored
// and regenerated on every deploy. Paths are discovered rather than hardcoded so a
// dependency update fails loudly here instead of silently breaking OCR in production.
import {mkdir, copyFile, readdir, access} from 'node:fs/promises';

const target = 'public/report-tools';

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

/** Collect every path matching `predicate` under `root` (small, known-shallow trees). */
async function findAll(root, predicate, depth = 3) {
  if (depth < 0 || !(await exists(root))) return [];
  let entries;
  try { entries = await readdir(root, {withFileTypes: true}); } catch { return []; }
  const found = [];
  for (const entry of entries) {
    const path = `${root}/${entry.name}`;
    if (entry.isFile() && predicate(entry.name)) found.push(path);
    else if (entry.isDirectory()) found.push(...await findAll(path, predicate, depth - 1));
  }
  return found;
}

async function copyRequired(from, to, label) {
  if (!from || !(await exists(from))) {
    throw new Error(
      `Report tools: could not find ${label}. Run "npm install" — if a dependency ` +
      `changed its layout, update scripts/prepare-report-tools.mjs.`
    );
  }
  await copyFile(from, to);
}

await mkdir(`${target}/core`, {recursive: true});
await mkdir(`${target}/lang`, {recursive: true});

await copyRequired(
  'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  `${target}/pdf.worker.min.mjs`,
  'the pdf.js worker (pdfjs-dist)'
);

await copyRequired(
  'node_modules/tesseract.js/dist/worker.min.js',
  `${target}/worker.min.js`,
  'the tesseract.js worker'
);

// OCR engine builds: several variants ship (simd / relaxedsimd / lstm); copy them all
// so tesseract.js can pick whichever the visitor's browser supports.
const coreDir = 'node_modules/tesseract.js-core';
if (!(await exists(coreDir))) throw new Error('Report tools: tesseract.js-core is not installed.');
let cores = 0;
for (const name of await readdir(coreDir)) {
  if (name.startsWith('tesseract-core') && (name.endsWith('.wasm') || name.endsWith('.js'))) {
    await copyFile(`${coreDir}/${name}`, `${target}/core/${name}`);
    cores++;
  }
}
if (!cores) throw new Error('Report tools: no tesseract-core engine files found in tesseract.js-core.');

// English training data lives in a model-version folder (e.g. 4.0.0/) that can change
// between releases, so locate it instead of assuming the path. Prefer the standard
// model over the larger "_best" variant to keep the download small.
const langRoot = 'node_modules/@tesseract.js-data/eng';
const langFiles = await findAll(langRoot, n => n === 'eng.traineddata.gz');
// "_best" builds are far larger for marginal gain on printed lab reports.
const langFile = langFiles.find(p => !p.includes('_best')) ?? langFiles[0];
await copyRequired(langFile, `${target}/lang/eng.traineddata.gz`, 'the English OCR training data');

console.log(`Report tools ready: pdf.js worker, tesseract worker, ${cores} OCR engine files, English language data.`);
