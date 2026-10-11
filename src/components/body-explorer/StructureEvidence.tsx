'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {ArrowRight, FlaskConical, ClipboardList, Pill, Microscope} from 'lucide-react';
import {loadBodyIndex, type BodyIndex, type StructureEvidence as Evidence} from '@/lib/body-index';
import {INSTRUMENTS} from '@/data/instruments';
import {COMPOUNDED_PRODUCTS} from '@/data/compounded';
import {SYSTEMS, type SystemId} from './anatomy';
import s from './StructureEvidence.module.css';

/**
 * Answers "what does Kamura actually have for this part of me?" for a selected
 * structure. Before this, selecting a body part showed its FMA identifier and
 * nothing else — the anatomy and the 619 graded outcomes sat in the same page
 * without touching.
 *
 * Two deliberate choices about honesty:
 *
 * Evidence is shown for the exact structure when something is bound to it, and
 * otherwise for the system it belongs to — labelled as such, so a reader is
 * never told that research on the digestive system was about their gallbladder.
 *
 * Grades are carried through from the treatment data unchanged and never
 * averaged into a single verdict for the organ. An A for one outcome and an F
 * for another are two findings, not a C.
 */

/**
 * Grade colours lifted for the explorer's dark panel — the treatment pages use
 * darker versions of the same hues against white. Each carries near-black text,
 * so these have to be bright enough to read against, not just visible.
 */
const GRADE_COLOR: Record<string, string> = {
  A: '#4FC9A6', B: '#8CC46E', C: '#DCB45A', D: '#E39C8C', F: '#D4786A',
};

const TITLE: Record<string, string> = {
  instrument: 'Screening tools that measure this',
  compounded: 'Compounded medicines that act here',
};

function toolHref(t: {kind: string; slug: string}) {
  return t.kind === 'instrument' ? `/tools/${t.slug}` : `/compounded/${t.slug}`;
}
function toolName(t: {kind: string; slug: string}) {
  if (t.kind === 'instrument') return INSTRUMENTS.find((i) => i.slug === t.slug)?.name ?? t.slug;
  return COMPOUNDED_PRODUCTS.find((c) => c.slug === t.slug)?.name ?? t.slug;
}

export default function StructureEvidence({
  conceptId, system, onTherapy,
}: {
  conceptId: string;
  system: SystemId;
  onTherapy: (id: string) => void;
}) {
  const [index, setIndex] = useState<BodyIndex | null>(null);
  const [failed, setFailed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    loadBodyIndex(abort.signal).then(setIndex).catch((e) => {
      if (e?.name !== 'AbortError') setFailed(true);
    });
    return () => abort.abort();
  }, []);

  useEffect(() => setShowAll(false), [conceptId]);

  if (failed) {
    return <p className={s.note}>Evidence links could not be loaded. The anatomy still works.</p>;
  }
  if (!index) return <p className={s.note}>Looking up what Kamura has for this structure…</p>;

  const exact: Evidence = index.forConcept(conceptId);
  const evidence: Evidence = exact.any ? exact : index.forSystem(system);
  const scope: 'structure' | 'system' = exact.any ? 'structure' : 'system';
  const systemName = SYSTEMS.find((x) => x.id === system)?.name ?? system;

  if (!evidence.any) {
    return (
      <p className={s.note}>
        Kamura has nothing graded for this structure yet. The library covers interventions people
        actually ask about, so quiet regions are expected.
      </p>
    );
  }

  const outcomes = showAll ? evidence.outcomes : evidence.outcomes.slice(0, 8);

  return (
    <div className={s.wrap}>
      <p className={s.scope}>
        {scope === 'structure'
          ? 'Linked to this exact structure.'
          : <>Nothing is bound to this structure on its own, so this is what Kamura has for the <strong>{systemName.toLowerCase()}</strong> it belongs to.</>}
      </p>

      {evidence.analytes.length > 0 && (
        <section className={s.block}>
          <div className={s.label}><FlaskConical size={14} />Lab values that reflect this</div>
          {evidence.analytes.map((a) => (
            <div key={a.label} className={s.basisRow}>
              <strong>{a.label}</strong>
              <small>{a.basis}</small>
            </div>
          ))}
          <Link className={s.quiet} href="/reports">Turn your own reports into one document <ArrowRight size={13} /></Link>
        </section>
      )}

      {evidence.tools.length > 0 && (
        <section className={s.block}>
          {['instrument', 'compounded'].map((kind) => {
            const rows = evidence.tools.filter((t) => t.kind === kind);
            if (!rows.length) return null;
            return (
              <div key={kind} className={s.sub}>
                <div className={s.label}>
                  {kind === 'instrument' ? <ClipboardList size={14} /> : <Pill size={14} />}
                  {TITLE[kind]}
                </div>
                {rows.map((t) => (
                  <Link key={t.slug} className={s.toolRow} href={toolHref(t)}>
                    <span>
                      <strong>{toolName(t)}</strong>
                      <small>{t.basis}</small>
                    </span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            );
          })}
        </section>
      )}

      {evidence.outcomes.length > 0 && (
        <section className={s.block}>
          <div className={s.label}>
            <Microscope size={14} />
            {evidence.outcomes.length} graded {evidence.outcomes.length === 1 ? 'outcome' : 'outcomes'}
          </div>
          <ul className={s.outcomes}>
            {outcomes.map((o) => (
              <li key={o.slug + o.outcome}>
                <Link href={`/treatments/${o.slug}`}>
                  <span className={s.grade} style={{background: GRADE_COLOR[o.grade] ?? '#8A7F72'}}>{o.grade}</span>
                  <span className={s.outcomeBody}>
                    <strong>{o.outcome}</strong>
                    <small>{o.treatment}</small>
                  </span>
                  <ArrowRight size={13} />
                </Link>
              </li>
            ))}
          </ul>
          {evidence.outcomes.length > outcomes.length && (
            <button className={s.more} onClick={() => setShowAll(true)}>
              Show all {evidence.outcomes.length}
            </button>
          )}
          <p className={s.caveat}>
            Each grade belongs to one outcome in one treatment. They are not averaged into a score
            for this part of the body.
          </p>
        </section>
      )}

      {evidence.therapies.length > 0 && (
        <section className={s.block}>
          <div className={s.label}>Mechanism maps that point here</div>
          <div className={s.chips}>
            {evidence.therapies.slice(0, 12).map((t) => (
              <button key={t.id} onClick={() => onTherapy(t.id)}>{t.name}</button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
