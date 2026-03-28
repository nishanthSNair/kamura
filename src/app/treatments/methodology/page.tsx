import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
 title: "Kamura Score Methodology — How We Score Treatments",
 description:
 "How the Kamura Score works — a transparent, 5-factor composite scoring system for wellness treatments. Research evidence (35%), community validation (25%), safety (20%), accessibility (10%), and value (10%). Zero bias.",
 keywords: [
 "Kamura Score",
 "treatment scoring methodology",
 "wellness treatment ratings",
 "evidence-based scoring",
 "treatment safety rating",
 "unbiased wellness ratings",
 "wellness treatment evidence",
 "treatment ranking system",
 ],
 alternates: {
 canonical: "https://kamuralife.com/treatments/methodology",
 },
 openGraph: {
 title: "Kamura Score Methodology | KAMURA",
 description:
 "Full transparency on how we score every wellness treatment. 5 weighted factors, zero bias.",
 url: "https://kamuralife.com/treatments/methodology",
 },
};

const factors = [
 {
 icon: "🔬",
 name: "Research Evidence",
 weight: 35,
 color: "#60A5FA",
 description: "Clinical trial quantity & quality, study design (RCT > observational), meta-analyses, consistency of results, and replication.",
 sources: "PubMed, Cochrane Library, clinical trial registries",
 rubric: [
 { range: "90-100", criteria: "Multiple meta-analyses, 20+ RCTs, FDA approved for indication" },
 { range: "70-89", criteria: "Several RCTs, consistent results, some meta-analyses" },
 { range: "50-69", criteria: "Mix of RCT and observational, generally positive" },
 { range: "30-49", criteria: "Primarily animal studies, few human trials" },
 { range: "0-29", criteria: "Case reports only or no published research" },
 ],
 },
 {
 icon: "👥",
 name: "Community Validation",
 weight: 25,
 color: "#A78BFA",
 description: "Real-world outcomes from 400+ community members, sentiment analysis, reported effectiveness rate, and satisfaction scores.",
 sources: "WhatsApp community data, user submissions, practitioner reports",
 rubric: [
 { range: "90-100", criteria: "100+ reports, >90% positive sentiment, consistent outcomes" },
 { range: "70-89", criteria: "50-100 reports, >80% positive" },
 { range: "50-69", criteria: "20-50 reports, >65% positive" },
 { range: "30-49", criteria: "5-20 reports, mixed results" },
 { range: "0-29", criteria: "<5 reports or predominantly negative" },
 ],
 },
 {
 icon: "🛡️",
 name: "Safety Profile",
 weight: 20,
 color: "#4ADE80",
 description: "Side effect frequency & severity, drug interactions, contraindications, long-term safety data, and FDA/regulatory status.",
 sources: "Clinical databases, community adverse event reports, FDA/EMA",
 rubric: [
 { range: "90-100", criteria: "Minimal side effects, no serious adverse events, long safety track record" },
 { range: "70-89", criteria: "Minor side effects, manageable, good safety data" },
 { range: "50-69", criteria: "Moderate side effects, some caution needed, monitoring required" },
 { range: "30-49", criteria: "Significant side effects, interactions, requires close monitoring" },
 { range: "0-29", criteria: "Serious adverse events reported, high risk profile" },
 ],
 },
 {
 icon: "🌐",
 name: "Accessibility",
 weight: 10,
 color: "#FB923C",
 description: "Available in UAE/globally, prescription requirements, ease of administration (oral > injectable), and provider network density.",
 sources: "Clinic directories, pharmacy databases, community reports",
 rubric: [
 { range: "90-100", criteria: "OTC, widely available, no prescription, easy to use" },
 { range: "70-89", criteria: "Available with minor barriers, some regions restricted" },
 { range: "50-69", criteria: "Prescription required, moderate availability" },
 { range: "30-49", criteria: "Limited availability, complex administration" },
 { range: "0-29", criteria: "Extremely restricted, not available in most markets" },
 ],
 },
 {
 icon: "💰",
 name: "Value for Money",
 weight: 10,
 color: "#FACC15",
 description: "Monthly cost relative to effectiveness, cost per meaningful outcome, insurance coverage, and cost trends.",
 sources: "Community price reports, clinic pricing, pharmacy pricing",
 rubric: [
 { range: "90-100", criteria: "<$50/month, high effectiveness ratio" },
 { range: "70-89", criteria: "$50-150/month, good effectiveness ratio" },
 { range: "50-69", criteria: "$150-500/month, moderate effectiveness ratio" },
 { range: "30-49", criteria: "$500-1000/month, questionable effectiveness ratio" },
 { range: "0-29", criteria: ">$1000/month or very poor effectiveness ratio" },
 ],
 },
];

const tiers = [
 { name: "Gold Standard", range: "85-100", color: "#C4A882", meaning: "Strong evidence + high community validation + good safety" },
 { name: "Strong", range: "70-84", color: "#4ADE80", meaning: "Solid evidence and positive community outcomes" },
 { name: "Promising", range: "50-69", color: "#FACC15", meaning: "Emerging evidence or mixed results, worth monitoring" },
 { name: "Limited", range: "30-49", color: "#FB923C", meaning: "Weak evidence or significant concerns" },
 { name: "Insufficient", range: "0-29", color: "#F87171", meaning: "No meaningful evidence or actively harmful" },
];

const evidenceLevels = [
 { level: "Strong", color: "#4ADE80", criteria: "10+ RCTs, consistent results, meta-analysis available" },
 { level: "Moderate", color: "#60A5FA", criteria: "5-10 studies or mix of RCTs and observational, generally consistent" },
 { level: "Emerging", color: "#FACC15", criteria: "2-5 studies, primarily animal models or small human trials" },
 { level: "Limited", color: "#FB923C", criteria: "1-2 studies, case reports, or purely observational" },
 { level: "Anecdotal", color: "#F87171", criteria: "Community reports only, no formal research" },
];

export default function MethodologyPage() {
 const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Article",
 headline: "How the Kamura Score Works",
 description: "A transparent, 5-factor composite scoring system for wellness treatments. Research evidence, community validation, safety, accessibility, and value.",
 url: "https://kamuralife.com/treatments/methodology",
 author: { "@type": "Organization", name: "KAMURA", url: "https://kamuralife.com" },
 publisher: { "@type": "Organization", name: "KAMURA", url: "https://kamuralife.com" },
 },
 {
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://kamuralife.com" },
 { "@type": "ListItem", position: 2, name: "Treatments", item: "https://kamuralife.com/treatments" },
 { "@type": "ListItem", position: 3, name: "Methodology" },
 ],
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 <article className="pt-24 pb-20 zen-pattern">
 {/* Breadcrumb */}
 <nav className="max-w-3xl mx-auto px-6 mb-8">
 <div className="flex items-center gap-2 text-sm text-gray-400 font-sans">
 <Link href="/" className="hover:text-moss transition-colors">Home</Link>
 <span>/</span>
 <Link href="/treatments" className="hover:text-moss transition-colors">Treatments</Link>
 <span>/</span>
 <span className="text-gray-600">Methodology</span>
 </div>
 </nav>

 {/* Header */}
 <header className="max-w-3xl mx-auto px-6 text-center mb-12">
 <p className="text-xs tracking-[0.3em] uppercase mb-4 text-moss font-sans font-semibold">
 Full Transparency
 </p>
 <h1 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight mb-4">
 How the Kamura Score Works
 </h1>
 <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-xl mx-auto">
 A transparent, composite scoring system calculated from 5 weighted factors. No sponsorships. No pay-to-rank. Just data.
 </p>
 <div className="w-12 h-px bg-sage/40 mx-auto mt-8" />
 </header>

 {/* Formula */}
 <section className="max-w-3xl mx-auto px-6 mb-12">
 <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
 <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold font-sans mb-3">
 The Formula
 </p>
 <p className="font-mono text-sm md:text-base text-gray-700">
 Kamura Score = (Research &times; 0.35) + (Community &times; 0.25) + (Safety &times; 0.20) + (Access &times; 0.10) + (Value &times; 0.10)
 </p>
 </div>
 </section>

 {/* Five Factors */}
 <section className="max-w-3xl mx-auto px-6 mb-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-8">
 The Five Factors
 </h2>

 <div className="space-y-8">
 {factors.map((factor) => (
 <div
 key={factor.name}
 className="bg-white border border-gray-200 rounded-xl p-6"
 >
 <div className="flex items-start gap-4 mb-4">
 <span className="text-2xl">{factor.icon}</span>
 <div className="flex-1">
 <div className="flex items-center justify-between">
 <h3 className="font-serif text-lg text-gray-900">
 {factor.name}
 </h3>
 <span
 className="text-sm font-bold font-sans px-2.5 py-1 rounded-full"
 style={{ color: factor.color, backgroundColor: `${factor.color}20` }}
 >
 {factor.weight}% weight
 </span>
 </div>
 <p className="text-sm text-gray-500 font-sans leading-relaxed mt-1">
 {factor.description}
 </p>
 <p className="text-xs text-gray-400 font-sans mt-2">
 <strong>Data sources:</strong> {factor.sources}
 </p>
 </div>
 </div>

 <div className="space-y-1.5">
 {factor.rubric.map((r) => (
 <div key={r.range} className="flex items-start gap-3 text-sm font-sans">
 <span className="text-xs font-mono font-bold text-gray-400 w-12 shrink-0 pt-0.5">
 {r.range}
 </span>
 <span className="text-gray-600">{r.criteria}</span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Score Tiers */}
 <section className="max-w-3xl mx-auto px-6 mb-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-6">
 Score Tiers
 </h2>
 <div className="space-y-3">
 {tiers.map((tier) => (
 <div
 key={tier.name}
 className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-3"
 >
 <span
 className="w-3 h-3 rounded-full shrink-0"
 style={{ backgroundColor: tier.color }}
 />
 <span className="font-semibold text-sm font-sans w-32 shrink-0" style={{ color: tier.color }}>
 {tier.name}
 </span>
 <span className="text-xs font-mono text-gray-400 w-12 shrink-0">
 {tier.range}
 </span>
 <span className="text-sm text-gray-500 font-sans">
 {tier.meaning}
 </span>
 </div>
 ))}
 </div>
 </section>

 {/* Evidence Levels */}
 <section className="max-w-3xl mx-auto px-6 mb-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-4">
 Evidence Level Tags
 </h2>
 <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">
 Each treatment is scored globally (Kamura Score) but also graded per-outcome, because a treatment may be excellent for one use and limited for another.
 </p>
 <div className="space-y-3">
 {evidenceLevels.map((el) => (
 <div
 key={el.level}
 className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-3"
 >
 <span
 className="w-2 h-2 rounded-full shrink-0"
 style={{ backgroundColor: el.color }}
 />
 <span className="font-semibold text-sm font-sans w-24 shrink-0" style={{ color: el.color }}>
 {el.level}
 </span>
 <span className="text-sm text-gray-500 font-sans">
 {el.criteria}
 </span>
 </div>
 ))}
 </div>
 </section>

 {/* Per-Outcome Grading */}
 <section className="max-w-3xl mx-auto px-6 mb-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-4">
 Per-Outcome Grading (A-F)
 </h2>
 <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
 Each treatment&apos;s outcomes are individually graded from A to F. For example, BPC-157 scores A for gut healing but C for neuroprotection — because real science is nuanced.
 </p>
 <div className="grid grid-cols-5 gap-3">
 {[
 { grade: "A", meaning: "Strong evidence, consistent results", color: "#4ADE80" },
 { grade: "B", meaning: "Good evidence, mostly positive", color: "#60A5FA" },
 { grade: "C", meaning: "Emerging or mixed evidence", color: "#FACC15" },
 { grade: "D", meaning: "Weak evidence, limited data", color: "#FB923C" },
 { grade: "F", meaning: "No evidence or negative", color: "#F87171" },
 ].map((g) => (
 <div
 key={g.grade}
 className="text-center bg-white border border-gray-200 rounded-xl p-4"
 >
 <span className="text-2xl font-bold font-sans" style={{ color: g.color }}>
 {g.grade}
 </span>
 <p className="text-[11px] text-gray-400 font-sans mt-1">
 {g.meaning}
 </p>
 </div>
 ))}
 </div>
 </section>

 {/* Conflict of Interest */}
 <section className="max-w-3xl mx-auto px-6 mb-16">
 <h2 className="font-serif text-2xl text-gray-900 mb-4">
 Our Commitment
 </h2>
 <div className="space-y-4 text-sm text-gray-500 font-sans leading-relaxed">
 <p>
 <strong className="text-gray-700">No sponsored rankings.</strong> No treatment manufacturer or clinic can pay to improve their Kamura Score. Rankings are calculated purely from data.
 </p>
 <p>
 <strong className="text-gray-700">Full transparency.</strong> Every sub-score is visible. You can see exactly why a treatment scores the way it does. We show what works AND what doesn&apos;t.
 </p>
 <p>
 <strong className="text-gray-700">Community-driven updates.</strong> Scores are updated as new research is published and community data grows. If you&apos;ve used a treatment, your experience contributes to future scores.
 </p>
 <p>
 <strong className="text-gray-700">Corrections welcome.</strong> If you believe a score is inaccurate, contact us with evidence and we&apos;ll review. Our methodology is open to scrutiny.
 </p>
 </div>
 </section>

 {/* CTA */}
 <section className="max-w-3xl mx-auto px-6 text-center">
 <Link
 href="/treatments"
 className="inline-block bg-moss text-white px-8 py-3 text-sm tracking-[0.1em] uppercase hover:bg-forest transition-colors font-sans"
 >
 Explore the Treatment Index
 </Link>
 </section>
 </article>
 </>
 );
}
