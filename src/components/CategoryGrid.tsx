import Link from "next/link";

interface CategoryItem {
 name: string;
 slug: string;
 icon: string;
 treatmentCount: number;
}

interface CategoryGridProps {
 categories: CategoryItem[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
 return (
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
 {categories.map((cat) => (
 <Link
 key={cat.name}
 href={`/treatments/category/${cat.slug}`}
 className="group bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-sage/40 hover:bg-sage/5 transition-all"
 >
 <span className="text-2xl block mb-2">{cat.icon}</span>
 <p className="text-[13px] font-sans font-medium text-gray-900 mb-0.5 leading-tight">
 {cat.name}
 </p>
 <p className="text-[11px] text-gray-500 font-sans">
 {cat.treatmentCount} treatments
 </p>
 </Link>
 ))}
 </div>
 );
}
