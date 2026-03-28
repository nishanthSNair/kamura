interface MechanismSectionProps {
 mechanism?: string;
 name: string;
}

export default function MechanismSection({ mechanism, name }: MechanismSectionProps) {
 if (!mechanism) return null;

 return (
 <section id="mechanism" className="scroll-mt-24">
 <div className="border-l-4 border-sage pl-6 md:pl-8">
 <div className="flex items-center gap-2.5 mb-3">
 <svg
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="text-sage"
 >
 <circle cx="12" cy="12" r="10" />
 <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
 <line x1="12" y1="17" x2="12.01" y2="17" />
 </svg>
 <h2 className="font-serif text-xl text-gray-900">
 How {name} Works
 </h2>
 </div>
 <p className="text-[15px] text-gray-600 font-sans leading-relaxed">
 {mechanism}
 </p>
 </div>
 </section>
 );
}
