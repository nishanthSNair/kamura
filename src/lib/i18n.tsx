"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

// Minimal translation layer — add strings here as needed.
// Missing keys fall back to English.
const STRINGS: Record<Lang, Dict> = {
  en: {
    "nav.discover": "Discover",
    "nav.providers": "Find Providers",
    "nav.wellness": "Wellness Check",
    "nav.search": "Search",
    "nav.listBusiness": "List Your Business",

    "home.hero.tagline1": "Connecting you to",
    "home.hero.tagline2": "functional medicine",
    "home.hero.description":
      "The wellness platform for the GCC. Discover treatments, find vetted providers, build personalised protocols, and optimise your health journey — all in one place.",
    "home.hero.cta.treatments": "Explore Treatments",
    "home.hero.cta.wellness": "Take Wellness Check",
    "home.hero.search": "Search treatments, peptides, clinics…",

    "home.stats.treatments": "Treatments",
    "home.stats.citations": "Citations",
    "home.stats.providers": "Providers",
    "home.stats.region": "UAE & GCC",

    "treatments.directory.title": "Every Treatment. Scored.",
    "treatments.directory.description":
      "207+ wellness treatments rated on evidence, safety, accessibility, and value. Filter by category, goal, or region.",

    "checker.hero.title": "Wellness Check",
    "checker.hero.description":
      "Answer a few questions. Get personalised treatment recommendations based on your goals and the evidence behind each option.",
    "checker.hero.cta": "Begin Check",
  },
  ar: {
    "nav.discover": "اكتشف",
    "nav.providers": "ابحث عن المختصين",
    "nav.wellness": "فحص الصحة",
    "nav.search": "بحث",
    "nav.listBusiness": "أضف عملك",

    "home.hero.tagline1": "نصلك بـ",
    "home.hero.tagline2": "الطب الوظيفي",
    "home.hero.description":
      "منصة الصحة والعافية لدول الخليج. اكتشف العلاجات، جد المختصين الموثوقين، صمّم بروتوكولاتك الشخصية، وارتقِ برحلتك الصحية — كل ذلك في مكان واحد.",
    "home.hero.cta.treatments": "استكشف العلاجات",
    "home.hero.cta.wellness": "ابدأ الفحص",
    "home.hero.search": "ابحث في العلاجات، الببتيدات، العيادات…",

    "home.stats.treatments": "علاج",
    "home.stats.citations": "مرجع علمي",
    "home.stats.providers": "مختص",
    "home.stats.region": "الإمارات والخليج",

    "treatments.directory.title": "كل علاج. مُقيَّم.",
    "treatments.directory.description":
      "أكثر من 207 علاجاً صحياً مقيَّمة حسب الأدلة العلمية والسلامة والتوفر والقيمة. فلترها حسب الفئة أو الهدف أو المنطقة.",

    "checker.hero.title": "فحص الصحة",
    "checker.hero.description":
      "أجب عن بضعة أسئلة، واحصل على توصيات علاجية شخصية قائمة على أهدافك والأدلة العلمية وراء كل خيار.",
    "checker.hero.cta": "ابدأ الفحص",
  },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kamura.lang") as Lang | null;
      if (stored === "en" || stored === "ar") {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    try {
      localStorage.setItem("kamura.lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (key: string) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback if used outside provider
    return {
      lang: "en" as Lang,
      setLang: () => {},
      dir: "ltr" as const,
      t: (key: string) => STRINGS.en[key] ?? key,
    };
  }
  return ctx;
}
