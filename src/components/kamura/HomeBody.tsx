'use client';
import {useEffect,useRef,useState,type MouseEvent} from 'react';
import {useRouter} from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {DEFAULT_VISIBLE,type Atlas,type SceneState} from '../body-explorer/anatomy';
import s from './Kamura.module.css';
const Scene=dynamic(()=>import('../body-explorer/scene'),{ssr:false});
const state:SceneState={visible:DEFAULT_VISIBLE,selected:[],isolate:false,explode:0,view:'front',rotate:true,reset:0};
export default function HomeBody(){
 const router=useRouter(),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [atlas,setAtlas]=useState<Atlas|null>(null),[progress,setProgress]=useState(0),[error,setError]=useState(''),[entering,setEntering]=useState(false);
 useEffect(()=>{const legacy=new URLSearchParams(location.search).get('t');if(legacy){location.replace('/body?t='+encodeURIComponent(legacy));return;}router.prefetch('/body');const controller=new AbortController();fetch('/body-models/atlas.json',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Model unavailable');return r.json();}).then(setAtlas).catch(e=>{if(e.name!=='AbortError')setError('Tap to open the body explorer.');});return()=>{controller.abort();if(timer.current)clearTimeout(timer.current);};},[router]);
 function enter(e:MouseEvent<HTMLAnchorElement>){
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
  if(progress<100||error||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  e.preventDefault();if(entering)return;setEntering(true);timer.current=setTimeout(()=>router.push('/body'),1600);
 }
 return <section className={`${s.immersiveHero} ${entering?s.entering:''}`} aria-label="Explore the human body"><Link href="/body" onClick={enter} className={s.bodyEntry} aria-label="Explore the human body — open interactive anatomy"><div className={s.heroCanvas}>{atlas&&<Scene atlas={atlas} state={{...state,rotate:!entering}} showcase onSelect={()=>{}} onProgress={setProgress} onError={setError}/>}</div><div className={s.heroWhisper}><span>KAMURA · PREVENTION & LONGEVITY</span><h1>A world within.</h1><p>Touch the body to explore.</p></div><span className={s.heroIndex} aria-hidden="true">THE HUMAN BODY<br/>01 / EXPLORE</span></Link>{(progress<100||error)&&<p className={s.heroLoading} role="status">{error||`Preparing your view · ${progress}%`}</p>}{entering&&<span className={s.heroLoading} role="status">Entering the body explorer…</span>}</section>;
}
