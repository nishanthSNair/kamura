"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
 { key: "title", label: "Title" },
 { key: "source", label: "Source" },
 { key: "date", label: "Date" },
 { key: "category", label: "Category" },
];

export default function NewsListPage() {
 return (
 <ContentList
 type="news"
 title="News"
 columns={COLUMNS}
 idField="id"
 createHref="/admin/news/new"
 editHref={(id) => `/admin/news/${id}`}
 />
 );
}
