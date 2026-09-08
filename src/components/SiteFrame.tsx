'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import StackShell from '@/components/stack/StackShell';
export default function SiteFrame({children}:{children:ReactNode}) {
 const pathname=usePathname();
 if(pathname==='/body')return <>{children}</>;
 return <SmoothScroll><Navigation/><main>{children}</main><Footer/><StackShell/></SmoothScroll>;
}
