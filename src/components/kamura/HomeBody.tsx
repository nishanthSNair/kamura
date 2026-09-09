'use client';
import {useEffect,useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {DEFAULT_VISIBLE,type Atlas,type SceneState} from '../body-explorer/anatomy';
import s from './Kamura.module.css';
const Scene=dynamic(()=>import('../body-explorer/scene'),{ssr:false});
const state:SceneState={visible:DEFAULT_VISIBLE,selected:[],isolate:false,explode:0,view:'three-quarter',rotate:false,reset:0};
export default function HomeBody(){
 const [atlas,setAtlas]=useState<Atlas|null>(null),[progress,setProgress]=useState(0),[error,setError]=useState('');
 useEffect(()=>{const legacy=new URLSearchParams(location.search).get('t');if(legacy){location.replace('/body?t='+encodeURIComponent(legacy));return;}const controller=new AbortController();fetch('/body-models/atlas.json',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Model unavailable');return r.json();}).then(setAtlas).catch(e=>{if(e.name!=='AbortError')setError('Open the body explorer to try again.');});return()=>controller.abort();},[]);
 return <div className={s.bodyStage}><span className={s.stageLabel}>Your body. Connected.</span>{atlas&&<Scene atlas={atlas} state={state} showcase onSelect={()=>{}} onProgress={setProgress} onError={setError}/>} {(progress<100||error)&&<p className={s.bodyStatus} role="status">{error||`Preparing anatomy · ${progress}%`}</p>}<Link href="/body" className={s.stageCaption}><div>Explore beneath the surface<span>Real anatomy. Interactive explanations.</span></div><ArrowUpRight size={24}/></Link></div>;
}
