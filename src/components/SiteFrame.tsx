'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import StackShell from '@/components/stack/StackShell';
export default function SiteFrame({children}:{children:ReactNode}) {
 const pathname=usePathname();
 // Shared navigation remains present across discovery, anatomy and the member area.
 if(pathname==='/body')return <><Navigation/><main id="main-content">{children}</main></>;
 if(pathname.startsWith('/my'))return <><Navigation/><main id="main-content" className="kamura-member">{children}</main></>;
 return <SmoothScroll><Navigation/><main id="main-content">{children}</main><Footer/><StackShell/></SmoothScroll>;
}
