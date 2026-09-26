'use client';
import {useEffect,useRef,useState,type MouseEvent} from 'react';
import {useRouter} from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {DEFAULT_VISIBLE,type Atlas,type SceneState} from '../body-explorer/anatomy';
import s from './Kamura.module.css';
const Scene=dynamic(()=>import('../body-explorer/scene'),{ssr:false});
const state:SceneState={visible:DEFAULT_VISIBLE,selected:[],isolate:false,explode:0,view:'front',rotate:true,reset:0};
export default function HomeBody(){
 const router=useRouter(),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [atlas,setAtlas]=useState<Atlas|null>(null),[progress,setProgress]=useState(0),[error,setError]=useState(''),[entering,setEntering]=useState(false),[requested,setRequested]=useState(false);
 useEffect(()=>{const legacy=new URLSearchParams(location.search).get('t');if(legacy)location.replace('/body?t='+encodeURIComponent(legacy));return()=>{if(timer.current)clearTimeout(timer.current);};},[]);
 useEffect(()=>{if(!requested)return;const controller=new AbortController();fetch('/body-models/atlas.json',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(setAtlas).catch(e=>{if(e.name!=='AbortError')setError('Open the body explorer to continue.');});return()=>controller.abort();},[requested]);
 function enter(e:MouseEvent<HTMLAnchorElement>){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0||matchMedia('(prefers-reduced-motion: reduce)').matches)return;e.preventDefault();if(entering)return;setEntering(true);timer.current=setTimeout(()=>router.push('/body'),650);}
 return <section className={`${s.immersiveHero} ${entering?s.entering:''}`} aria-label="Explore the human body"><Link prefetch={false} href="/body" onClick={enter} className={s.bodyEntry} aria-label="Explore the human body — open interactive anatomy"><div className={s.heroCanvas}>{progress<100&&<Image src="/images/body-home-poster.png" alt="Human anatomical model showing muscles and skeleton" fill priority sizes="(max-width:650px) 100vw, 55vw" style={{objectFit:'contain',mixBlendMode:'multiply'}}/>}{atlas&&<Scene atlas={atlas} state={{...state,rotate:!entering}} showcase onSelect={()=>{}} onProgress={setProgress} onError={setError}/>}</div><span className={s.heroIndex}>TOUCH THE BODY<br/>EXPLORE IN 3D ↗</span></Link><div className={s.heroWhisper}><span>KAMURA · PREVENTION & LONGEVITY</span><h1>Understand your health.<br/>Prepare your next step.</h1><p>Bring your reports together, explore how treatments work and prepare better questions for your next appointment.</p><small>Visual learning. Useful tools. Care and wellness across the UAE.</small></div><nav className={s.heroDestinations} aria-label="Start with Kamura"><Link href="/reports" className={s.heroPrimary}>Bring your reports together ↗</Link><Link href="/learn">Explore treatment evidence ↗</Link></nav><button className={s.animateBody} disabled={requested} onClick={()=>setRequested(true)}>{requested?(progress===100?'Body animation playing':error||`Loading anatomy · ${progress}%`):'Animate body'}</button>{entering&&<span className={s.heroLoading} role="status">Entering the body explorer…</span>}</section>;
}
