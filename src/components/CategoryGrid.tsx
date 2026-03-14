import Link from "next/link";

interface CategoryItem {
  name: string;
  icon: string;
  treatmentCount: number;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/treatments?category=${encodeURIComponent(cat.name)}`}
          className="group bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/[0.06] rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-sage/40 hover:bg-sage/5 transition-all"
        >
          <span className="text-2xl block mb-2">{cat.icon}</span>
          <p className="text-[13px] font-sans font-medium text-gray-900 dark:text-[#F5F0EB] mb-0.5 leading-tight">
            {cat.name}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-[#6B6560] font-sans">
            {cat.treatmentCount} treatments
          </p>
        </Link>
      ))}
    </div>
  );
}
