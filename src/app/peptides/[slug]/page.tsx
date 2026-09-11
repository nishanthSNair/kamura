import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import catalogue from '@/data/therapy-explorer.json';
import {peptideContexts} from '@/lib/peptide-learning';
import PeptideLearning from '@/components/peptides/PeptideLearning';
export function generateStaticParams(){return catalogue.map(t=>({slug:t.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=catalogue.find(t=>t.id===slug);if(!t)return {};return {title:`${t.name}: how it works, studied uses & evidence | Kamura`,description:peptideContexts[slug].intro,alternates:{canonical:`https://kamuralife.com/peptides/${slug}`}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!peptideContexts[slug])notFound();const therapy=catalogue.find(t=>t.id===slug)!;const schema={'@context':'https://schema.org','@type':'MedicalWebPage',name:`${therapy.name}: mechanism and studied uses`,description:peptideContexts[slug].intro,url:`https://kamuralife.com/peptides/${slug}`,dateModified:peptideContexts[slug].reviewed,about:{'@type':'Thing',name:therapy.name},publisher:{'@type':'Organization',name:'Kamura',url:'https://kamuralife.com'},citation:peptideContexts[slug].sources.map(s=>s.url)};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><PeptideLearning key={slug} id={slug}/></>;}
