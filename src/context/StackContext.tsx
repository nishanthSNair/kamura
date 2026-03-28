"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useStack, type StackTiming } from "@/hooks/useStack";

type StackContextType = ReturnType<typeof useStack>;

const StackContext = createContext<StackContextType | null>(null);

export function StackProvider({ children }: { children: ReactNode }) {
  const stack = useStack();
  return <StackContext.Provider value={stack}>{children}</StackContext.Provider>;
}

export function useStackContext(): StackContextType {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStackContext must be used within StackProvider");
  return ctx;
}

export type { StackTiming };
