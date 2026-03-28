"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";

interface Column {
 key: string;
 label: string;
 render?: (value: unknown, item: Record<string, unknown>) => React.ReactNode;
}

interface ContentListProps {
 type: string;
 title: string;
 columns: Column[];
 idField: string;
 createHref: string;
 editHref: (id: string) => string;
 viewHref?: (id: string) => string;
}

export default function ContentList({
 type,
 title,
 columns,
 idField,
 createHref,
 editHref,
 viewHref,
}: ContentListProps) {
 const [items, setItems] = useState<Record<string, unknown>[]>([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState("");
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [deleting, setDeleting] = useState(false);
 const [toast, setToast] = useState<{
 message: string;
 type: "success" | "error";
 } | null>(null);

 const loadItems = useCallback(async () => {
 try {
 const res = await fetch(`/api/admin/content?type=${type}`);
 const data = await res.json();
 setItems(data.items || []);
 } catch {
 setToast({ message: "Failed to load items", type: "error" });
 } finally {
 setLoading(false);
 }
 }, [type]);

 useEffect(() => {
 loadItems();
 }, [loadItems]);

 const filtered = items.filter((item) => {
 if (!search) return true;
 const s = search.toLowerCase();
 return Object.values(item).some(
 (v) => typeof v === "string" && v.toLowerCase().includes(s)
 );
 });

 async function handleDelete() {
 if (!deleteId) return;
 setDeleting(true);
 try {
 const res = await fetch(
 `/api/admin/content?type=${type}&id=${deleteId}`,
 { method: "DELETE" }
 );
 if (res.ok) {
 setToast({ message: "Item deleted", type: "success" });
 loadItems();
 } else {
 setToast({ message: "Failed to delete", type: "error" });
 }
 } catch {
 setToast({ message: "Failed to delete", type: "error" });
 } finally {
 setDeleting(false);
 setDeleteId(null);
 }
 }

 return (
 <div className="p-8">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
 <p className="text-sm text-gray-500">
 {items.length} items
 </p>
 </div>
 <Link
 href={createHref}
 className="bg-moss text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest transition-colors"
 >
 + Create New
 </Link>
 </div>

 {/* Search */}
 <input
 type="text"
 placeholder="Search..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full max-w-sm px-4 py-2 border border-gray-200 rounded-lg text-sm mb-5 focus:outline-none focus:border-moss"
 />

 {/* Table */}
 {loading ? (
 <div className="text-sm text-gray-400 py-12 text-center">
 Loading...
 </div>
 ) : (
 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-gray-50 border-b border-gray-200">
 {columns.map((col) => (
 <th
 key={col.key}
 className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide"
 >
 {col.label}
 </th>
 ))}
 <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
 Actions
 </th>
 </tr>
 </thead>
 <tbody>
 {filtered.map((item) => {
 const id = item[idField] as string;
 return (
 <tr
 key={id}
 className="border-b border-gray-100 hover:bg-gray-50/50"
 >
 {columns.map((col) => (
 <td key={col.key} className="px-4 py-3 text-gray-700">
 {col.render
 ? col.render(item[col.key], item)
 : String(item[col.key] ?? "")}
 </td>
 ))}
 <td className="px-4 py-3 text-right">
 <div className="flex items-center justify-end gap-2">
 <Link
 href={editHref(id)}
 className="text-xs text-moss hover:text-forest"
 >
 Edit
 </Link>
 {viewHref && (
 <Link
 href={viewHref(id)}
 target="_blank"
 className="text-xs text-gray-400 hover:text-gray-600"
 >
 View
 </Link>
 )}
 <button
 onClick={() => setDeleteId(id)}
 className="text-xs text-red-400 hover:text-red-600"
 >
 Delete
 </button>
 </div>
 </td>
 </tr>
 );
 })}
 {filtered.length === 0 && (
 <tr>
 <td
 colSpan={columns.length + 1}
 className="px-4 py-12 text-center text-gray-400"
 >
 No items found
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 )}

 {deleteId && (
 <ConfirmDialog
 title="Delete Item"
 message="Are you sure? This will commit a deletion to GitHub and cannot be easily undone."
 onConfirm={handleDelete}
 onCancel={() => setDeleteId(null)}
 loading={deleting}
 />
 )}

 {toast && (
 <Toast
 message={toast.message}
 type={toast.type}
 onClose={() => setToast(null)}
 />
 )}
 </div>
 );
}
