import type {Metadata} from 'next';
import DiagnosticsWorkspace from '@/components/kamura/DiagnosticsWorkspace';
export const metadata:Metadata={title:'Connected health reports · Prototype',robots:{index:false,follow:false}};
export default function Page(){return <DiagnosticsWorkspace/>;}
