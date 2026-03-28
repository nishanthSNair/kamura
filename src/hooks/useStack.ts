"use client";

import { useState, useEffect, useCallback } from "react";

export type StackTiming = "morning" | "evening" | "as-needed";

export interface StackItem {
 slug: string;
 timing: StackTiming;
 addedAt: number;
}

const STORAGE_KEY = "kamura-stack";

function loadStack(): StackItem[] {
 if (typeof window === "undefined") return [];
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 return raw ? JSON.parse(raw) : [];
 } catch {
 return [];
 }
}

function saveStack(items: StackItem[]) {
 try {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
 } catch {
 // localStorage full or unavailable
 }
}

export function useStack() {
 const [items, setItems] = useState<StackItem[]>([]);
 const [hydrated, setHydrated] = useState(false);

 // Hydrate from localStorage on mount
 useEffect(() => {
 setItems(loadStack());
 setHydrated(true);
 }, []);

 // Persist on change (skip initial hydration)
 useEffect(() => {
 if (hydrated) saveStack(items);
 }, [items, hydrated]);

 const addItem = useCallback((slug: string, timing: StackTiming = "morning") => {
 setItems((prev) => {
 if (prev.some((i) => i.slug === slug)) return prev;
 return [...prev, { slug, timing, addedAt: Date.now() }];
 });
 }, []);

 const removeItem = useCallback((slug: string) => {
 setItems((prev) => prev.filter((i) => i.slug !== slug));
 }, []);

 const toggleItem = useCallback((slug: string, timing: StackTiming = "morning") => {
 setItems((prev) => {
 if (prev.some((i) => i.slug === slug)) {
 return prev.filter((i) => i.slug !== slug);
 }
 return [...prev, { slug, timing, addedAt: Date.now() }];
 });
 }, []);

 const updateTiming = useCallback((slug: string, timing: StackTiming) => {
 setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, timing } : i)));
 }, []);

 const clearStack = useCallback(() => setItems([]), []);

 const hasItem = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

 const importFromParams = useCallback((encoded: string) => {
 try {
 const slugs = encoded.split(",").filter(Boolean);
 setItems(slugs.map((slug) => ({ slug, timing: "morning" as StackTiming, addedAt: Date.now() })));
 } catch {
 // Invalid param
 }
 }, []);

 const exportToParams = useCallback(() => {
 return items.map((i) => i.slug).join(",");
 }, [items]);

 return {
 items,
 hydrated,
 addItem,
 removeItem,
 toggleItem,
 updateTiming,
 clearStack,
 hasItem,
 importFromParams,
 exportToParams,
 count: items.length,
 };
}
