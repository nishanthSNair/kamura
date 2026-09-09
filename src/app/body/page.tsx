import type {Metadata} from 'next';
import TherapyExplorer from '@/components/body-explorer/TherapyExplorer';
export const metadata:Metadata={title:'Interactive Human Body — Peptides & Hormone Mechanisms',description:'Explore 3D anatomy, peptide and hormone mechanisms, outcome-specific research and guided learning with Kamura.',alternates:{canonical:'https://kamuralife.com/body'},openGraph:{title:'Explore the body with Kamura',description:'Interactive anatomy, therapy mechanisms and linked research.',url:'https://kamuralife.com/body'}};
export default function Body(){return <TherapyExplorer/>;}
