'use client';
import {useSyncExternalStore} from 'react';
export type SavedItem={id:string;kind:'Therapy'|'Care'|'Studio'|'Learning plan';title:string;href:string;notes?:string;checked?:string[]};
const KEY='kamura.saved.v1',EVENT='kamura:saved';
function snapshot(){try{return localStorage.getItem(KEY)||'[]';}catch{return '[]';}}
function subscribe(fn:()=>void){window.addEventListener('storage',fn);window.addEventListener(EVENT,fn);return()=>{window.removeEventListener('storage',fn);window.removeEventListener(EVENT,fn);};}
export function safeHref(href:string){return (href.startsWith('/')&&!href.startsWith('//')&&!href.includes('\\'))||/^https:\/\//.test(href);}
export function readItems(raw:string):SavedItem[]{try{const data=JSON.parse(raw);return Array.isArray(data)?data.filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.href==='string'&&safeHref(x.href)&&['Therapy','Care','Studio','Learning plan'].includes(x.kind)).map(x=>({...x,notes:typeof x.notes==='string'?x.notes:undefined,checked:Array.isArray(x.checked)?x.checked.filter((v:unknown)=>typeof v==='string'):[]})):[];}catch{return [];}}
export function useSaved(){return readItems(useSyncExternalStore(subscribe,snapshot,()=>'[]'));}
export function updateSaved(change:(items:SavedItem[])=>SavedItem[]){try{localStorage.setItem(KEY,JSON.stringify(change(readItems(snapshot()))));window.dispatchEvent(new Event(EVENT));return true;}catch{return false;}}
