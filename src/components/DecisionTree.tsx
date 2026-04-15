import Link from "next/link";

export interface DecisionNode {
  id: string;
  label: string;
  sublabel?: string;
  href?: string;
  children?: DecisionNode[];
  accent?: "root" | "branch" | "leaf";
}

interface Props {
  root: DecisionNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Pure CSS/flex decision tree. No dependencies, no react-flow.
 * Renders top-down branching layout with connecting lines.
 */
export default function DecisionTree({
  root,
  title,
  subtitle,
  className = "",
}: Props) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h3 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight mb-3">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 font-sans max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center min-w-max md:min-w-0 py-6 px-4">
        <TreeNode node={root} depth={0} />
      </div>
    </div>
  );
}

function TreeNode({ node, depth }: { node: DecisionNode; depth: number }) {
  const hasChildren = node.children && node.children.length > 0;
  const accent = node.accent || (depth === 0 ? "root" : hasChildren ? "branch" : "leaf");

  const nodeStyles = {
    root: "bg-[#1a0f0c] text-white border-[#2a1612]",
    branch: "bg-[#EDE7DB] text-gray-900 border-gray-300/60",
    leaf: "bg-white text-gray-900 border-terracotta/30 hover:border-terracotta/70 hover:shadow-md",
  }[accent];

  const NodeContent = (
    <div
      className={`px-5 py-3 rounded-2xl border text-center min-w-[140px] max-w-[200px] transition-all ${nodeStyles} ${
        node.href ? "cursor-pointer" : ""
      }`}
    >
      <p
        className={`font-sans font-semibold leading-snug ${
          accent === "root" ? "text-sm tracking-[0.1em] uppercase" : "text-sm"
        }`}
      >
        {node.label}
      </p>
      {node.sublabel && (
        <p
          className={`text-[10px] font-sans mt-1 leading-tight ${
            accent === "root"
              ? "text-white/60 tracking-[0.1em] uppercase"
              : "text-gray-500"
          }`}
        >
          {node.sublabel}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {node.href ? (
        <Link href={node.href} className="inline-block">
          {NodeContent}
        </Link>
      ) : (
        NodeContent
      )}

      {hasChildren && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-px h-6 bg-terracotta/40" />

          {/* Children container with horizontal connector */}
          <div className="relative flex items-start gap-6 md:gap-10">
            {/* Horizontal line across children */}
            {node.children!.length > 1 && (
              <div className="absolute top-0 left-[8%] right-[8%] h-px bg-terracotta/40" />
            )}

            {node.children!.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Vertical stub down to each child */}
                <div className="w-px h-6 bg-terracotta/40" />
                <TreeNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
