import Link from "next/link";

export default function NotFound() {
 return (
 <section className="min-h-[70vh] flex items-center justify-center zen-pattern">
 <div className="max-w-md mx-auto px-6 text-center">
 <p className="text-xs tracking-[0.3em] uppercase mb-4 text-moss font-sans">
 404
 </p>
 <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
 Page Not Found
 </h1>
 <p className="text-gray-500 font-sans leading-relaxed mb-8">
 The page you&apos;re looking for doesn&apos;t exist or has been moved.
 Let&apos;s get you back on your wellness journey.
 </p>
 <div className="w-12 h-px bg-sage/40 mx-auto mb-8" />
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-block bg-moss text-white px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:bg-forest transition-colors font-sans"
 >
 Go Home
 </Link>
 <Link
 href="/explore"
 className="inline-block border border-gray-300 text-gray-700 px-6 py-2.5 text-sm tracking-[0.1em] uppercase hover:border-sage hover:text-moss transition-colors font-sans"
 >
 Explore Directory
 </Link>
 </div>
 </div>
 </section>
 );
}
