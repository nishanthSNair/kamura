import type {Metadata} from 'next';
import SavedCollection from '@/components/kamura/SavedCollection';
export const metadata:Metadata={title:'Your saved collection | Kamura',robots:{index:false,follow:false}};
export default function Page(){return <SavedCollection/>;}
