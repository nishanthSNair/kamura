import type {Metadata} from 'next';
import ReportUploadWorkspace from '@/components/kamura/ReportUploadWorkspace';
export const metadata:Metadata={title:'Combine your health reports',robots:{index:false,follow:false}};
export default function Page(){return <ReportUploadWorkspace/>;}
