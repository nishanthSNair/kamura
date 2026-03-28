"use client";

interface ConfirmDialogProps {
 title: string;
 message: string;
 onConfirm: () => void;
 onCancel: () => void;
 loading?: boolean;
}

export default function ConfirmDialog({
 title,
 message,
 onConfirm,
 onCancel,
 loading,
}: ConfirmDialogProps) {
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
 <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
 <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
 <p className="text-sm text-gray-500 mb-5">{message}</p>
 <div className="flex gap-3 justify-end">
 <button
 onClick={onCancel}
 className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
 >
 Cancel
 </button>
 <button
 onClick={onConfirm}
 disabled={loading}
 className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
 >
 {loading ? "Deleting..." : "Delete"}
 </button>
 </div>
 </div>
 </div>
 );
}
