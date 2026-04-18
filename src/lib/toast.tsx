"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Toast {
  id: number;
  message: string;
  tone: "default" | "success" | "error";
}

interface ToastContextValue {
  showToast: (message: string, tone?: Toast["tone"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, tone: Toast["tone"] = "default") => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { showToast: () => {} };
  }
  return ctx;
}

function ToastViewport({ toasts }: { toasts: Toast[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-in px-5 py-3 rounded-full shadow-xl text-sm font-sans font-medium max-w-md ${
            t.tone === "success"
              ? "bg-emerald-600 text-white"
              : t.tone === "error"
              ? "bg-red-600 text-white"
              : "bg-[#1a0f0c] text-white"
          }`}
        >
          {t.message}
        </div>
      ))}
      <style>{`
        @keyframes toast-rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .toast-in { animation: toast-rise 200ms cubic-bezier(0.2, 0.8, 0.2, 1); }
      `}</style>
    </div>
  );
}
