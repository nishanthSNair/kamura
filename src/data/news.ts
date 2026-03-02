export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  relatedEventId: string;
  relatedEventTitle: string;
  category: string;
}

export const news: NewsItem[] = [
  {
    id: "wbs-2025-khaleej-times",
    title: "World Biohack Summit 2025 Returns for Record Third Edition in Dubai",
    source: "Khaleej Times",
    date: "Nov 23, 2025",
    summary:
      "The third edition brought together biohackers, scientists and entrepreneurs from 30+ countries at JW Marriott Marina. Themes included genomics, AI-driven health optimisation, and ancient wellness wisdom meeting modern science.",
    url: "https://www.khaleejtimes.com/entertainment/local-events/dubai-worldbiohacksummit-2025-returns-for-its-third-edition",
    relatedEventId: "world-biohack-summit-2025",
    relatedEventTitle: "World Biohack Summit 2025",
    category: "Biohacking",
  },
  {
    id: "kayan-best-festival",
    title: "Kayan Wellness Festival Awarded Best Festival in the Middle East 2025",
    source: "Breaking Travel News",
    date: "Jan 2026",
    summary:
      "Over 11,500 visitors gathered on Fahid Island for the inaugural edition featuring Sadhguru, Gary Brecka, Mo Gawdat, and Marisa Peer. The 2026 edition expanded to 15,000+ visitors with 60+ sessions.",
    url: "https://www.breakingtravelnews.com/news/article/kayan-wellness-festival-returns-to-abu-dhabi-in-february-2026/",
    relatedEventId: "kayan-wellness-festival-2026",
    relatedEventTitle: "Kayan Wellness Festival 2026",
    category: "Wellness Festival",
  },
  {
    id: "future-health-launch",
    title: "Abu Dhabi Launches Future Health — Transforming Global Healthcare Week Into Year-Round Platform",
    source: "Gulf News",
    date: "Nov 2, 2025",
    summary:
      "The Department of Health Abu Dhabi launched Future Health as a continuous global ecosystem. The initiative has convened 500+ speakers from nearly 100 countries and launched the world's first Declaration on Longevity and Precision Medicine.",
    url: "https://gulfnews.com/uae/health/abu-dhabi-launches-future-health-to-transform-global-care-1.500330722",
    relatedEventId: "future-health-summit-2026",
    relatedEventTitle: "Future Health Summit 2026",
    category: "Global Summit",
  },
  {
    id: "future-health-mit-solve",
    title: "Future Health and MIT Solve Launch $300K Challenge for Anticipatory Health Systems",
    source: "Zawya",
    date: "Feb 2026",
    summary:
      "Future Health partnered with MIT Solve to launch a global challenge seeking innovations in population health sensing. Three winning teams will share $300,000 and pitch live at the April summit.",
    url: "https://www.zawya.com/en/press-release/companies-news/future-health-and-mit-solve-join-forces-to-accelerate-predictive-health-innovation-through-sensing-wzxgru6f",
    relatedEventId: "future-health-summit-2026",
    relatedEventTitle: "Future Health Summit 2026",
    category: "Global Summit",
  },
  {
    id: "whx-rebrand",
    title: "WHX Dubai 2026: Arab Health Rebrands as World Health Expo",
    source: "World Health Expo",
    date: "Feb 2026",
    summary:
      "After 50 years as Arab Health, the event evolved into World Health Expo with a new venue at Dubai Exhibition Centre. The 2026 edition hosted 4,800+ exhibitors and 270,000+ professionals from 180+ countries.",
    url: "https://www.worldhealthexpo.com/events/healthcare/dubai/en/whats-on/features/arab-health-is-now-whx.html",
    relatedEventId: "whx-dubai-2026",
    relatedEventTitle: "WHX Dubai 2026",
    category: "Health & MedTech",
  },
  {
    id: "dfc-2025-records",
    title: "Dubai Fitness Challenge 2025 Smashes Records with 3M+ Participants",
    source: "Dubai Media Office",
    date: "Dec 12, 2025",
    summary:
      "The ninth edition saw record-breaking numbers with 40,327 cyclists, 307,000+ runners, and over 3 million total participants. The landmark tenth edition is confirmed for 2026.",
    url: "https://mediaoffice.ae/en/news/2025/december/12-12/dubai-fitness-challenge",
    relatedEventId: "dubai-fitness-challenge-2026",
    relatedEventTitle: "Dubai Fitness Challenge 2026",
    category: "Fitness",
  },
  {
    id: "peak-longevity-debut",
    title: "Peak Longevity Fest Debuts in Dubai with Focus on Four Pillars of Health",
    source: "Peak Longevity Fest",
    date: "Jan 2026",
    summary:
      "A new two-day event brought together biohacking seekers and wellness enthusiasts for workshops on skincare-hormones, stem cell science, brain rewiring for longevity, and blood cleansing protocols.",
    url: "https://peaklongevityfest.com",
    relatedEventId: "peak-longevity-fest-2026",
    relatedEventTitle: "Peak Longevity Fest 2026",
    category: "Longevity",
  },
];
