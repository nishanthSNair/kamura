import newsData from "../../content/data/news.json";

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

export const news: NewsItem[] = newsData.news as NewsItem[];
