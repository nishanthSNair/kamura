"use client";

import { useState, useEffect, useCallback } from "react";
import { type WellnessProfile, EMPTY_PROFILE } from "@/data/wellness-questionnaire";

const STORAGE_KEY = "kamura-wellness";

function loadProfile(): WellnessProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WellnessProfile;
    return parsed.completedAt ? parsed : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: WellnessProfile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage full or unavailable
  }
}

export function useWellnessProfile() {
  const [profile, setProfile] = useState<WellnessProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && profile) {
      saveProfile(profile);
    }
  }, [profile, hydrated]);

  const saveCompleted = useCallback((p: WellnessProfile) => {
    const completed = { ...p, completedAt: Date.now() };
    setProfile(completed);
    saveProfile(completed);
  }, []);

  const updateGoalCheck = useCallback((goalId: string, checked: boolean) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        goalChecks: { ...prev.goalChecks, [goalId]: checked },
      };
    });
  }, []);

  const reset = useCallback(() => {
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    profile,
    hydrated,
    completed: hydrated && profile !== null && profile.completedAt !== null,
    saveCompleted,
    updateGoalCheck,
    reset,
  };
}
