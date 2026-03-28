import type { KeyStudy } from "@/data/treatments";

interface StudyCitationProps {
 study: KeyStudy;
 index: number;
}

export default function StudyCitation({ study, index }: StudyCitationProps) {
 return (
 <div className="border-l-2 border-sage/40 pl-5 py-3">
 <div className="flex items-start gap-3">
 <span className="text-xs font-mono font-bold text-gray-400 mt-0.5 shrink-0 w-5">
 [{index}]
 </span>
 <div className="min-w-0">
 <p className="text-[15px] font-semibold text-gray-900 font-sans leading-snug mb-1">
 {study.title}
 </p>
 <p className="text-xs text-gray-500 font-sans mb-2">
 {study.authors}
 <span className="text-gray-300 mx-1.5">&bull;</span>
 <em>{study.journal}</em>
 <span className="text-gray-300 mx-1.5">&bull;</span>
 {study.year}
 {study.pmid && (
 <>
 <span className="text-gray-300 mx-1.5">&bull;</span>
 <span className="font-mono text-[11px]">PMID: {study.pmid}</span>
 </>
 )}
 </p>
 <p className="text-sm text-gray-600 font-sans leading-relaxed">
 <span className="text-moss font-semibold text-xs uppercase tracking-wider">Key Finding: </span>
 {study.finding}
 </p>
 {study.pmid && (
 <a
 href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 text-xs text-moss hover:text-forest transition-colors font-sans mt-2"
 >
 View on PubMed
 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
 <polyline points="15 3 21 3 21 9" />
 <line x1="10" y1="14" x2="21" y2="3" />
 </svg>
 </a>
 )}
 </div>
 </div>
 </div>
 );
}
