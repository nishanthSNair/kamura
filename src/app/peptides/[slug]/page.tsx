import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import catalogue from '@/data/therapy-explorer.json';
import {peptideContexts} from '@/lib/peptide-learning';
import PeptideLearning from '@/components/peptides/PeptideLearning';
export function generateStaticParams(){return catalogue.map(t=>({slug:t.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=catalogue.find(t=>t.id===slug);if(!t)return {};return {title:`${t.name}: how it works, studied uses & evidence | Kamura`,description:peptideContexts[slug].intro,alternates:{canonical:`https://kamuralife.com/peptides/${slug}`}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!peptideContexts[slug])notFound();return <PeptideLearning key={slug} id={slug}/>;}
