'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {Menu,Search,X,ArrowUpRight} from 'lucide-react';
import SearchModal from './SearchModal';
import {useI18n} from '@/lib/i18n';
import LanguageToggle from './LanguageToggle';
import s from './kamura/Kamura.module.css';
// Named by what they contain, not by verb. "Learn" previously hid nine
// separate products — including the 207-treatment evidence library and the
// screening tools — behind one vague word.
const links=[
 {href:'/body',label:'The body'},
 {href:'/treatments',label:'Evidence',paths:['/supplements','/compounded','/peptides','/protocols','/learn','/blog']},
 {href:'/tools',label:'Tools',paths:['/wellness-checker','/quiz']},
 {href:'/reports',label:'Reports',paths:['/my/reports']},
 {href:'/explore',label:'Find care',paths:['/provider/']},
 {href:'/classes',label:'Classes',paths:['/events']},
];
export default function Navigation(){
 const {lang}=useI18n();const label=(text:string)=>lang==='ar'?({'The body':'الجسم','Evidence':'الأدلة','Tools':'الأدوات','Reports':'التقارير','Find care':'ابحث عن الرعاية','Classes':'الحصص'}[text]??text):text;
 const pathname=usePathname();const [open,setOpen]=useState(false),[search,setSearch]=useState(false);const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setSearch(true);}if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[]);
 const active=(item:typeof links[number])=>pathname===item.href||pathname.startsWith(item.href+'/')||item.paths?.some(p=>pathname.startsWith(p));
 // The body page runs in the dark register, so the bar above it has to come
 // with it — a white strip over a dark viewer reads as a rendering fault.
 const dark=pathname==='/body';
 return <><a className={s.skip} href="#main-content">Skip to content</a><header className={s.nav} data-dark={dark||undefined}>
 <Link href="/" className={s.wordmark} onClick={()=>setOpen(false)}><Image src="/logo-symbol.svg" alt="" width={52} height={44} className={s.realLogo}/>KAMURA<span className={s.brandNote}>ROOTED IN WELLNESS</span></Link>
 <nav className={s.desktopNav} aria-label="Main navigation">{links.map(item=><Link key={item.href} href={item.href} aria-current={active(item)?'page':undefined}>{label(item.label)}</Link>)}</nav>
 <div className={s.navActions}><div className={s.language}><LanguageToggle solid/></div><button aria-label="Search Kamura" onClick={()=>setSearch(true)}><Search size={19}/></button><Link className={s.account} href="/my">{lang==='ar'?'كامورا الخاص بي':'My Kamura'} <ArrowUpRight size={15}/></Link><button ref={toggle} className={s.menuButton} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="kamura-mobile-nav" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div>
 {open&&<nav id="kamura-mobile-nav" className={s.mobileNav} aria-label="Mobile navigation">{links.map(item=><Link key={item.href} href={item.href} aria-current={active(item)?'page':undefined} onClick={()=>setOpen(false)}>{label(item.label)}<ArrowUpRight size={18}/></Link>)}<Link href="/my" onClick={()=>setOpen(false)}>{lang==='ar'?'كامورا الخاص بي':'My Kamura'} <ArrowUpRight size={18}/></Link><LanguageToggle solid/></nav>}
 </header><SearchModal isOpen={search} onClose={()=>setSearch(false)}/></>;
}
