'use client';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Search, X, ArrowRight, ArrowLeft, ArrowUpRight, RotateCcw, RotateCw, Pause, Play, Focus, Layers, BookOpen, ChevronDown, Network, CircleHelp, Atom, MapPin, FlaskConical } from 'lucide-react';
import catalogue from '@/data/therapy-explorer.json';
import { DEFAULT_VISIBLE, SYSTEMS, type Atlas, type Concept, type SceneState, type SystemId } from './anatomy';
import styles from './TherapyExplorer.module.css';
import LearningTools, { Evidence } from './LearningTools';
const AnatomyScene=dynamic(()=>import('./scene'),{ssr:false});
const initial:SceneState={explode:0,visible:DEFAULT_VISIBLE,selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0};
const categories=['All',...Array.from(new Set(catalogue.map(t=>t.category)))];
const combinations=[
 {name:'Wolverine',ids:['bpc-157','tb-500']}, {name:'Glow',ids:['bpc-157','ghk-cu','tb-500']},
 {name:'Healing & Recovery',ids:['bpc-157','ghk-cu','thymosin-alpha-1','tb-500']},
 {name:'Athlete Recovery',ids:['bpc-157','ghk-cu','cjc-ipamorelin']},
 {name:'Body Composition',ids:['cjc-ipamorelin','aod-9604']},
 {name:'Recovery + GH',ids:['cjc-ipamorelin','bpc-157']},
 {name:'Mitochondrial',ids:['nad','mots-c']}, {name:'Longevity Sleep',ids:['epithalon','dsip']},
 {name:'Hormonal Reset',ids:['kisspeptin-10','thymosin-alpha-1']},
 {name:'Cognitive Dual',ids:['semax','selank']}, {name:'Immune + Cognitive',ids:['thymosin-alpha-1','selank']},
 {name:'Gut (oral)',ids:['bpc-157','kpv','ll-37']},
];
const GOALS=[
 {id:'recover',label:'Recover faster'},{id:'fat',label:'Lose fat'},{id:'mind',label:'Think sharper'},
 {id:'sleep',label:'Sleep better'},{id:'hormones',label:'Hormones & libido'},{id:'skin',label:'Skin & hair'},
 {id:'gut',label:'Gut health'},{id:'immunity',label:'Immunity'},{id:'longevity',label:'Live longer'},
];
export default function TherapyExplorer(){
 const [atlas,setAtlas]=useState<Atlas|null>(null),[scene,setScene]=useState<SceneState>(initial);
 const [progress,setProgress]=useState(0),[error,setError]=useState('');
 const [selectedId,setSelectedId]=useState('bpc-157'),[focusedRegion,setFocusedRegion]=useState<number|null>(null),[playing,setPlaying]=useState(false);
 const [query,setQuery]=useState(''),[category,setCategory]=useState('All'),[library,setLibrary]=useState<'therapies'|'combinations'>('therapies');
 const [mobileLibrary,setMobileLibrary]=useState(false),[panelOpen,setPanelOpen]=useState(true),[layers,setLayers]=useState(false),[credits,setCredits]=useState(false),[anatomyQuery,setAnatomyQuery]=useState('');
 const [inspected,setInspected]=useState<Concept|null>(null),[selectedCombination,setSelectedCombination]=useState<string|null>(null);
 const [goal,setGoal]=useState<string|null>(null),[goalOverview,setGoalOverview]=useState(false);
 const [learning,setLearning]=useState<'mechanism'|'guide'|'compare'|null>(null);
 const therapy=catalogue.find(t=>t.id===selectedId)!;
 const goalRanked=useMemo(()=>goal?catalogue.filter(t=>t.goals.includes(goal)).sort((a,b)=>a.name.localeCompare(b.name)):[],[goal]);
 const filtered=(goal?goalRanked:catalogue).filter(t=>(category==='All'||t.category===category)&&`${t.name} ${t.title} ${t.category}`.toLowerCase().includes(query.toLowerCase()));
 const activeCombination=combinations.find(c=>c.name===selectedCombination);
 const allMappedIds=useMemo(()=>Array.from(new Set((activeCombination?catalogue.filter(t=>activeCombination.ids.includes(t.id)):[therapy]).flatMap(t=>t.regions.flatMap(r=>r.elements)))),[therapy,activeCombination]);
 const anatomyResults=useMemo(()=>atlas&&anatomyQuery.trim()?atlas.concepts.filter(c=>c.name.toLowerCase().includes(anatomyQuery.toLowerCase())).slice(0,25):[],[atlas,anatomyQuery]);
 useEffect(()=>{const abort=new AbortController();fetch('/body-models/atlas.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw Error('The anatomy library could not be loaded.');return r.json();}).then(setAtlas).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
 useEffect(()=>{if(!playing)return;const media=matchMedia('(prefers-reduced-motion: reduce)');if(media.matches){setPlaying(false);return;}const timer=setInterval(()=>setFocusedRegion(i=>((i??-1)+1)%therapy.regions.length),4500);return()=>clearInterval(timer);},[playing,therapy]);
 // Goal overview maps anatomical context without implying evidence strength.
 const goalScene=useMemo(()=>{if(!goalOverview||!goal)return null;const ids:string[]=[],colors:Record<string,[number,number,number]>={};goalRanked.forEach(t=>{const c:[number,number,number]=[24,142,151];t.regions.forEach(r=>r.elements.forEach(el=>{if(!(el in colors)){colors[el]=c;ids.push(el);}}));});return{ids,colors};},[goalOverview,goal,goalRanked]);
 useEffect(()=>{if(!atlas)return;if(goalScene){setScene(s=>({...s,selected:goalScene.ids,selectionColors:goalScene.colors,isolate:false,explode:0,rotate:false,reset:s.reset+1}));setInspected(null);return;}const focused=focusedRegion!=null?therapy.regions[focusedRegion]:null;const ids=focused?focused.elements:allMappedIds;setScene(s=>({...s,selected:ids??[],selectionColors:undefined,isolate:!!focused,explode:0,rotate:false,reset:s.reset+1}));setInspected(null);},[atlas,therapy,focusedRegion,allMappedIds,goalScene]);

 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMobileLibrary(false);setLayers(false);setCredits(false);setPlaying(false);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 const choose=(id:string,keepCombination=false)=>{setSelectedId(id);setFocusedRegion(null);setGoalOverview(false);setPlaying(false);setInspected(null);setPanelOpen(true);setMobileLibrary(false);if(!keepCombination)setSelectedCombination(null);history.replaceState(null,'',`${location.pathname}?t=${id}`);};

 const selectGoal=(g:string|null)=>{setGoal(g);setSelectedCombination(null);setFocusedRegion(null);setPlaying(false);setInspected(null);if(g){setGoalOverview(true);setPanelOpen(true);}else setGoalOverview(false);};
 // Shareable deep links: /?t=<therapy-id> opens that therapy directly.
 useEffect(()=>{const id=new URLSearchParams(location.search).get('t');if(id&&id!==selectedId&&catalogue.some(t=>t.id===id))choose(id);// eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 const focusRegion=(i:number)=>{setFocusedRegion(v=>v===i?null:i);setPanelOpen(true);setInspected(null);};
 const inspect=(id:string)=>{const p=atlas?.parts.find(p=>p.id===id);if(!p)return;setPlaying(false);setInspected({id:p.conceptId,name:p.name,elements:[p.id]});setScene(s=>({...s,selected:[p.id],isolate:false,rotate:false}));setPanelOpen(true);};
 const reset=()=>{setGoalOverview(false);setPlaying(false);setFocusedRegion(null);setInspected(null);setScene(s=>({...initial,selected:allMappedIds,reset:s.reset+1}));};
 return <div className={styles.explorer} data-lenis-prevent>
  <div className={styles.sceneWrap}>{atlas&&<AnatomyScene atlas={atlas} state={{...scene,inspectorOpen:panelOpen}} onSelect={inspect} onProgress={setProgress} onError={setError}/>}</div>
  <header className={styles.header}>
   <Link href="/" className={styles.brand}>KAMURA<span>PREVENTION · LONGEVITY</span></Link>
   <nav className={styles.siteNav} aria-label="Kamura">
    <Link href="/treatments">Treatments</Link><Link href="/supplements">Supplements</Link><Link href="/events">Events</Link><Link href="/blog">Blog</Link>
   </nav>
   <div className={styles.headerActions}><button onClick={()=>setLearning('guide')}>Guide me</button><button onClick={()=>setMobileLibrary(v=>!v)} className={styles.libraryToggle}><Search size={17}/>Therapies</button><button onClick={()=>setCredits(true)} aria-label="Sources and model information"><CircleHelp size={20}/></button></div>
  </header>
  <aside className={`${styles.library} ${mobileLibrary?styles.libraryOpen:''}`} aria-label="Therapy library">
   <div className={styles.libraryHeading}><span>Explore therapies</span><button className={styles.mobileClose} onClick={()=>setMobileLibrary(false)} aria-label="Close therapy library"><X size={20}/></button><span className={styles.count}>{catalogue.length}</span></div>
   <div className={styles.libraryTabs}><button aria-pressed={library==='therapies'} onClick={()=>setLibrary('therapies')}>Therapies</button><button aria-pressed={library==='combinations'} onClick={()=>setLibrary('combinations')}>Combinations</button></div>
   {library==='therapies'?<><details className={styles.goalFilter}><summary>{goal?GOALS.find(g=>g.id===goal)?.label:'Explore by goal'}</summary><div className={styles.goalRow}>{GOALS.map(g=><button key={g.id} className={styles.goalChip} aria-pressed={goal===g.id} onClick={()=>selectGoal(goal===g.id?null:g.id)}>{g.label}</button>)}</div></details><label className={styles.search}><Search size={16}/><input aria-label="Search therapies" placeholder="Peptide, hormone, pathway…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear therapy search"><X size={15}/></button>}</label><label className={styles.category}><span className={styles.srOnly}>Category</span><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={14}/></label><div className={styles.therapyList}>{filtered.map(t=><button className={styles.therapyRow} key={t.id} aria-pressed={t.id===selectedId&&!activeCombination} onClick={()=>choose(t.id)}><span className={styles.therapyDot}/><span><strong>{t.name}</strong><small>{t.kind}</small></span><ArrowRight size={14}/></button>)}{filtered.length===0&&<p className={styles.empty}>No therapies match this search.</p>}</div></>:<div className={styles.therapyList}><p className={styles.listIntro}>Explore constituent pathways together.</p>{combinations.map(c=><button key={c.name} className={styles.comboRow} aria-pressed={activeCombination?.name===c.name} onClick={()=>{setSelectedCombination(c.name);choose(c.ids[0],true);}}><strong>{c.name}</strong><span>{c.ids.map(id=>catalogue.find(t=>t.id===id)?.name).join(' · ')}</span><small>{c.ids.length} therapies <ArrowRight size={13}/></small></button>)}</div>}
   <div className={styles.libraryFoot}><BookOpen size={15}/><span>Research linked for every therapy</span></div>
  </aside>
  {!panelOpen&&<button className={styles.reopen} onClick={()=>setPanelOpen(true)}><BookOpen size={17}/>Open {therapy.name}</button>}
  {panelOpen&&<aside className={`${styles.detail} detail-sheet`} aria-label={`${therapy.name} details`}>
   <div className={styles.detailHeading}><div><span className={styles.eyebrow}>{goalOverview?'GOAL':inspected?'ANATOMY':therapy.category}</span><h1>{goalOverview?GOALS.find(g=>g.id===goal)?.label:inspected?inspected.name:therapy.name}</h1></div><button onClick={()=>{setPanelOpen(false);setPlaying(false);}} aria-label="Close therapy details"><X size={20}/></button></div>
   <div className={styles.detailScroll}>
    {goalOverview?<>
    <p className={styles.lead}>Explore the therapies associated with this topic, listed alphabetically. Highlights show anatomical context. Open a therapy to examine the outcome, study population and supporting research.</p>
    <section className={styles.regionList}>
     {goalRanked.map((t,i)=><button key={t.id} onClick={()=>choose(t.id)}><span>{String(i+1).padStart(2,'0')}</span><strong>{t.name}</strong><small>{t.researchContext}</small><ArrowRight size={14}/></button>)}
    </section>
    <p className={styles.retrieved}>A shared body region does not imply equal benefits or a proven combination effect.</p>
    </>:inspected?<><p className={styles.lead}>Selected structure</p><p className={styles.text}>{inspected.id}</p><button className={styles.primary} onClick={()=>setScene(s=>({...s,isolate:!s.isolate,reset:s.reset+1}))}><Focus size={16}/>{scene.isolate?'Show body context':'Focus on structure'}</button><button className={styles.outline} onClick={reset}>Return to {therapy.name}</button></>:<>
    {goal&&<div className={styles.goalHead}><strong>{GOALS.find(g=>g.id===goal)?.label}</strong><button onClick={()=>selectGoal(goal)}>&larr; All for this topic</button></div>}
    <div className={styles.badgeRow}>
     <span className={styles.researchBadge}>{therapy.researchContext}</span>

     {therapy.uaeAvailable&&<span className={styles.uaeChip}>UAE · {therapy.costEstimate??'available'}</span>}
    </div>
    <div className={styles.learningActions}><button onClick={()=>setLearning('mechanism')}><Play size={16}/>Explore the mechanism</button><button onClick={()=>setLearning('compare')}>Compare therapies <ArrowRight size={15}/></button></div><Evidence therapy={therapy}/>
    {activeCombination&&<section className={styles.comboSelection}><span className={styles.eyebrow}>{activeCombination.name}</span><div>{activeCombination.ids.map(id=><button key={id} aria-pressed={selectedId===id} onClick={()=>choose(id,true)}>{catalogue.find(t=>t.id===id)?.name}</button>)}</div><p>Shared anatomical context. Combined efficacy is a separate research question.</p></section>}

    {/* 1 · What it is */}
    <p className={styles.lead}>{therapy.what}</p>
    {therapy.molecule&&<div className={styles.moleculeCard}>
     {therapy.molecule.image&&<img src={therapy.molecule.image} alt={`Molecular structure of ${therapy.name}`} loading="lazy"/>}
     <div>
      <div className={styles.sectionLabel}><Atom size={14}/>The molecule</div>
      {therapy.molecule.formula&&<p className={styles.molFormula}>{therapy.molecule.formula}</p>}
      {therapy.molecule.weight&&<p className={styles.molFact}>{Math.round(Number(therapy.molecule.weight))} g/mol</p>}
      <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${therapy.molecule.cid}`} target="_blank" rel="noreferrer">PubChem CID {therapy.molecule.cid} <ArrowUpRight size={11}/></a>
     </div>
    </div>}

    {/* 2 · Where it acts */}
    <section className={styles.regionList}>
     <div className={styles.sectionLabel}><MapPin size={14}/>Explore related anatomy</div>
     {therapy.regions.map((r,i)=><button key={r.id} aria-pressed={focusedRegion===i} onClick={()=>focusRegion(i)}><span>0{i+1}</span><strong>{r.name}</strong><Focus size={15}/></button>)}
     <div className={styles.playback}>
      {focusedRegion!=null?<button onClick={()=>{setFocusedRegion(null);setPlaying(false);}}><RotateCcw size={15}/> Show whole body</button>
      :<button onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Pause tour':'Tour the anatomy'}</button>}
      {focusedRegion!=null&&<><button aria-label="Previous structure" onClick={()=>setFocusedRegion(i=>((i??0)+therapy.regions.length-1)%therapy.regions.length)}><ArrowLeft size={16}/></button><button aria-label="Next structure" onClick={()=>setFocusedRegion(i=>((i??0)+1)%therapy.regions.length)}><ArrowRight size={16}/></button></>}
     </div>
    </section>

    {/* 3 · How it's thought to work */}
    <section className={styles.pathway}>
     <div className={styles.sectionLabel}><Network size={14}/>How it&rsquo;s thought to work</div>
     <p className={styles.text}>{therapy.mechanism}</p>
     {therapy.pathway.map((node,i)=><div key={node} className={styles.pathNode}><span>{i+1}</span><p>{node}</p>{i<therapy.pathway.length-1&&<ArrowRight size={15}/>}</div>)}
    </section>
    <details className={styles.scope}><summary>About this visual</summary><p>{therapy.scope}</p></details>

    {/* 4 · Evidence & research */}
    <section className={styles.researchList}>
     <div className={styles.sectionLabel}><FlaskConical size={14}/>The research</div>
     {therapy.references.map(r=><article key={r.pmid}><div className={styles.articleMeta}><span>{r.year}</span><span>{r.types.includes('Randomized Controlled Trial')?'Randomized trial':r.types.includes('Systematic Review')?'Systematic review':r.types.includes('Review')?'Review':'Research article'}</span></div><a href={r.url} target="_blank" rel="noreferrer"><h3>{r.title}</h3><ArrowUpRight size={16}/></a><p>{r.journal}</p><span className={styles.pmid}>PMID {r.pmid}</span>{r.doi&&<a className={styles.doi} href={`https://doi.org/${r.doi}`} target="_blank" rel="noreferrer">Publisher <ArrowUpRight size={12}/></a>}</article>)}
     {therapy.treatmentSlug&&<Link className={styles.researchLink} href={`/treatments/${therapy.treatmentSlug}`}><ArrowUpRight size={17}/><span>Full treatment profile</span><ArrowRight size={16}/></Link>}
     <a className={styles.moreResearch} href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(therapy.name.replace(' / ',' OR '))}`} target="_blank" rel="noreferrer">Find more research <ArrowUpRight size={15}/></a>
     <p className={styles.retrieved}>References retrieved {therapy.retrieved}</p>
    </section>
    </>}
   </div>
   {!inspected&&!goalOverview&&<div className={styles.detailFoot}><span>{therapy.kind}</span><span>{therapy.regions.length} mapped regions</span></div>}
  </aside>}
  <div className={styles.bottomDock}><button onClick={()=>setLayers(v=>!v)} aria-expanded={layers}><Layers size={18}/><span>Layers</span></button><div><label htmlFor="body-separate">Separate anatomy <output>{Math.round(scene.explode*100)}%</output></label><input id="body-separate" type="range" min="0" max="100" value={scene.explode*100} onChange={e=>{setPlaying(false);setScene(s=>({...s,isolate:false,explode:Number(e.target.value)/100,rotate:false}));}}/></div><button aria-label={scene.rotate?'Pause body rotation':'Rotate body'} disabled={scene.isolate||scene.explode>=.4} onClick={()=>setScene(s=>({...s,rotate:!s.rotate}))}>{scene.rotate?<Pause size={18}/>:<RotateCw size={18}/>}</button><button onClick={reset} aria-label="Reset body view"><RotateCcw size={18}/></button></div>
  {layers&&<section className={styles.layersPanel} aria-label="Anatomy controls"><div className={styles.libraryHeading}>Anatomy layers<button onClick={()=>setLayers(false)} aria-label="Close anatomy controls"><X size={18}/></button></div><label className={styles.search}><Search size={15}/><input placeholder="Find any structure…" aria-label="Search anatomy" value={anatomyQuery} onChange={e=>setAnatomyQuery(e.target.value)}/></label>{anatomyQuery?<div className={styles.anatomyMatches}>{anatomyResults.map(c=><button key={c.id} onClick={()=>{setInspected(c);setScene(s=>({...s,selected:c.elements,isolate:true,reset:s.reset+1}));setLayers(false);setPanelOpen(true);setPlaying(false);}}>{c.name}<Focus size={14}/></button>)}{!anatomyResults.length&&<p>No structures found.</p>}</div>:<>{SYSTEMS.map(s=><label className={styles.system} key={s.id}><span style={{background:s.color}}/>{s.name}<input type="checkbox" checked={scene.visible.includes(s.id)} onChange={()=>{setPlaying(false);setScene(v=>({...v,isolate:false,selected:[],visible:v.visible.includes(s.id)?v.visible.filter(id=>id!==s.id):[...v.visible,s.id as SystemId]}));}}/></label>)}<button className={styles.outline} onClick={()=>setScene(s=>({...s,visible:DEFAULT_VISIBLE,isolate:false,selected:[]}))}>Restore all systems</button></>}</section>}
  <div className={styles.sceneCaption}>{goalOverview?GOALS.find(g=>g.id===goal)?.label:scene.isolate?(inspected?.name??(focusedRegion!=null?therapy.regions[focusedRegion]?.name:therapy.name)):activeCombination?.name??therapy.name}<span>{goalOverview?'ANATOMICAL CONTEXT · SELECT A THERAPY':scene.isolate?'ANATOMICAL FOCUS':'DRAG TO ROTATE · SCROLL TO ZOOM'}</span></div>
  {learning&&<LearningTools therapy={therapy} initialTab={learning} onClose={()=>setLearning(null)} onChoose={id=>{setGoal(null);setQuery('');setCategory('All');setLibrary('therapies');choose(id);}}/>}
  {progress<100&&!error&&<div className={styles.loading} role="status"><strong>Preparing the body</strong><span>{progress}% · Loading anatomical structures</span><progress max={100} value={progress}/></div>}
  {error&&<div className={styles.loading} role="alert"><strong>Unable to load anatomy</strong><p>{error}</p><button className={styles.primary} onClick={()=>location.reload()}>Reload</button></div>}
  {credits&&<div className={styles.credits}><div><button className={styles.closeCredit} aria-label="Close sources" onClick={()=>setCredits(false)}><X size={22}/></button><span className={styles.eyebrow}>SOURCES & MODEL</span><h2>Built on open science.</h2><p>Adult male reference anatomy: BodyParts3D, © DBCLS, CC BY 4.0. The source contains 2,234 meshes; cellular structures and visceral-fat compartments are not included.</p><p>Molecular structures and properties: PubChem, National Library of Medicine. Rendering adapted from Human Atlas by ashemag under the MIT License. Kamura adds therapy mapping, research records, and the visual learning experience.</p><p>Several catalogued compounds are experimental research chemicals with no approved human use. Nothing here is medical advice.</p><a href="/body-models/ATTRIBUTION.md" target="_blank" rel="noreferrer">Anatomy attribution <ArrowUpRight size={14}/></a><a href="/body-models/VIEWER-LICENSE.txt" target="_blank" rel="noreferrer">Viewer license <ArrowUpRight size={14}/></a><a href="https://europepmc.org/" target="_blank" rel="noreferrer">Europe PMC research database <ArrowUpRight size={14}/></a></div></div>}
 </div>;
}
