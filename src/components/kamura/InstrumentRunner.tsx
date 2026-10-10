'use client';
import {useMemo, useState} from 'react';
import Link from 'next/link';
import {getInstrument} from '@/data/instruments';
import {scoreInstrument, TONE_COLOR} from '@/lib/instruments';
import s from './Instruments.module.css';

/**
 * Takes a slug rather than the instrument object: calculator `compute` functions
 * cannot be serialised across the server/client boundary, so the client resolves
 * the instrument from the registry itself.
 */
export default function InstrumentRunner({slug}: {slug: string}) {
  const instrument = getInstrument(slug);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const result = useMemo(
    () => (instrument ? scoreInstrument(instrument, answers) : null),
    [instrument, answers]
  );
  if (!instrument || !result) return null;
  const set = (id: string, value: number) => setAnswers((a) => ({...a, [id]: value}));

  // The crisis panel is driven by the answer itself, so it appears the moment the
  // item is endorsed — never gated behind finishing or submitting.
  const safety = result.safety;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className={s.runner}>
      {safety && (
        <section className={s.safety} role="alert">
          <strong>{safety.title}</strong>
          <p>{safety.body}</p>
          <ul>
            {safety.resources.map((r) => (
              <li key={r.label}>
                <span>{r.label}</span>
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer">
                    {r.value} ↗
                  </a>
                ) : (
                  <b>{r.value}</b>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {instrument.body.kind === 'questionnaire' ? (
        <form className={s.form} onSubmit={(e) => {e.preventDefault(); setSubmitted(true);}}>
          <p className={s.stem}>{instrument.body.stem}</p>
          {(() => {
            const total = instrument.body.kind === 'questionnaire' ? instrument.body.questions.length : 0;
            const done = instrument.body.kind === 'questionnaire'
              ? instrument.body.questions.filter((q) => Number.isFinite(answers[q.id])).length : 0;
            return (
              <div className={s.progress}>
                <div className={s.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={total}
                  aria-valuenow={done} aria-label="Questions answered">
                  <span style={{width: `${(done / total) * 100}%`}} />
                </div>
                <small>{done} of {total} answered</small>
              </div>
            );
          })()}
          <ol className={s.questions}>
            {instrument.body.questions.map((q, i) => (
              <li key={q.id}>
                <fieldset>
                  <legend>
                    <span className={s.qnum}>{String(i + 1).padStart(2, '0')}</span>
                    {q.text}
                  </legend>
                  <div className={s.options}>
                    {(instrument.body as {options: {label: string; value: number}[]}).options.map((o) => (
                      <label key={o.label} className={answers[q.id] === o.value ? s.chosen : ''}>
                        <input
                          type="radio"
                          name={q.id}
                          value={o.value}
                          checked={answers[q.id] === o.value}
                          onChange={() => set(q.id, o.value)}
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          <div className={s.actions}>
            <button className={s.primary} type="submit" disabled={!result.complete}>
              See my result
            </button>
            {!result.complete && <span className={s.hint}>Answer every question to see your score.</span>}
            {Object.keys(answers).length > 0 && (
              <button type="button" className={s.ghost} onClick={reset}>
                Clear
              </button>
            )}
          </div>
        </form>
      ) : (
        <form className={s.form} onSubmit={(e) => e.preventDefault()}>
          <div className={s.fields}>
            {instrument.body.fields.map((f) =>
              f.kind === 'number' ? (
                <label key={f.id} className={s.field}>
                  <span>
                    {f.label}
                    {f.unit ? ` (${f.unit})` : ''}
                    {f.optional ? ' · optional' : ''}
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={f.min}
                    max={f.max}
                    step={f.step ?? 1}
                    value={Number.isFinite(answers[f.id]) ? answers[f.id] : ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAnswers((a) => {
                        const next = {...a};
                        if (v === '') delete next[f.id];
                        else next[f.id] = Number(v);
                        return next;
                      });
                    }}
                  />
                  {f.help && <small>{f.help}</small>}
                </label>
              ) : (
                <div key={f.id} className={s.field}>
                  <span>{f.label}</span>
                  <div className={s.options}>
                    {f.options.map((o) => (
                      <label key={o.label} className={answers[f.id] === o.value ? s.chosen : ''}>
                        <input
                          type="radio"
                          name={f.id}
                          checked={answers[f.id] === o.value}
                          onChange={() => set(f.id, o.value)}
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                  {f.help && <small>{f.help}</small>}
                </div>
              )
            )}
          </div>
          {!result.complete && <p className={s.hint}>Fill in the fields above to see your result.</p>}
        </form>
      )}

      {/* Questionnaires reveal on submit; calculators update live. */}
      {result.complete && (instrument.body.kind === 'calculator' || submitted) && (
        <section className={s.result} aria-live="polite">
          <div className={s.scoreRow}>
            <div className={s.score} style={{color: TONE_COLOR[result.band.tone]}}>
              {result.display}
              {result.detail && <small>{result.detail}</small>}
            </div>
            <div>
              <span className={s.bandLabel} style={{background: TONE_COLOR[result.band.tone]}}>
                {result.band.label}
              </span>
              <p className={s.meaning}>{result.band.meaning}</p>
            </div>
          </div>

          <div className={s.next}>
            <small>WHAT A REASONABLE NEXT STEP LOOKS LIKE</small>
            <p>{result.band.next}</p>
          </div>

          <p className={s.notDiagnosis}>
            This is a screening result, not a diagnosis. Only a qualified clinician can diagnose, and they
            will consider far more than this questionnaire.
          </p>

          <div className={s.resultActions}>
            <Link className={s.primary} href="/reports">
              Add this to my appointment document ↗
            </Link>
            <button type="button" className={s.ghost} onClick={reset}>
              Start again
            </button>
          </div>

          {instrument.relatedTreatments && instrument.relatedTreatments.length > 0 && (
            <div className={s.related}>
              <small>EVIDENCE-GRADED IN THE KAMURA LIBRARY</small>
              <div>
                {instrument.relatedTreatments.map((t) => (
                  <Link key={t.slug} href={`/treatments/${t.slug}`}>
                    {t.label} ↗
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
