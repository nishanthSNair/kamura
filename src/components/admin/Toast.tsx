"use client";

import { useEffect } from "react";

interface ToastProps {
 message: string;
 type: "success" | "error";
 onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
 useEffect(() => {
 const timer = setTimeout(onClose, 4000);
 return () => clearTimeout(timer);
 }, [onClose]);

 return (
 <div
 className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white animate-in slide-in-from-bottom-4 ${
 type === "success" ? "bg-moss" : "bg-red-500"
 }`}
 >
 {message}
 </div>
 );
}
