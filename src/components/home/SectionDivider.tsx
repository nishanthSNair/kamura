"use client";

import { motion } from "framer-motion";

/**
 * Hairline + terracotta dot stamp. Punctuates the scroll between sections
 * so the page reads as a sequence of chapters rather than a continuous slab.
 *
 * Renders its own background — pass `bg` to match the surrounding section.
 */
export default function SectionDivider({
  marker,
  bg = "#F5EFE6",
  py = "py-12 md:py-16",
}: {
  marker?: string;
  bg?: string;
  py?: string;
}) {
  return (
    <div className={`relative ${py}`} style={{ backgroundColor: bg }}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.45 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6 flex items-center gap-4 origin-center"
      >
        <span className="flex-1 h-px bg-[#173C3B]/12" />
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
        {marker && (
          <>
            <span className="text-[10px] tracking-[0.34em] uppercase text-[#173C3B]/45 font-sans font-semibold whitespace-nowrap">
              {marker}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
          </>
        )}
        <span className="flex-1 h-px bg-[#173C3B]/12" />
      </motion.div>
    </div>
  );
}
