import type { Metadata } from 'next';
import TherapyExplorer from '@/components/body-explorer/TherapyExplorer';
export const metadata: Metadata = {
 title: 'Explore the Body — Peptides, Hormones & Longevity',
 description: 'Explore peptides and hormone therapies through interactive anatomy, signaling pathways, and linked research.',
 alternates: { canonical: '/body' },
};
export default function BodyPage() { return <TherapyExplorer />; }
