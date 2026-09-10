 'use client';
import {useState} from 'react';
import {Bookmark,Check} from 'lucide-react';
import {type SavedItem,useSaved,updateSaved} from './saved';
import s from './Saved.module.css';
export default function SaveButton({item}:{item:SavedItem}){const items=useSaved(),saved=items.some(x=>x.id===item.id);const [error,setError]=useState('');return <span className={s.saveWrap}><button type="button" className={s.save} aria-pressed={saved} aria-label={`${saved?'Remove':'Save'} ${item.title} ${saved?'from':'to'} My Kamura`} onClick={()=>{const ok=updateSaved(all=>all.some(x=>x.id===item.id)?all.filter(x=>x.id!==item.id):[{...item,checked:[]},...all]);setError(ok?'':'Your browser could not save this item.');}}>{saved?<Check size={15}/>:<Bookmark size={15}/>} {saved?'Saved to My Kamura':'Save to My Kamura'}</button>{error&&<small role="alert">{error}</small>}</span>;}
