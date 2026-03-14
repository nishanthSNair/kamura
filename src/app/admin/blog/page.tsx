"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "date", label: "Date" },
  {
    key: "kamuraScore",
    label: "Score",
    render: (v: unknown) =>
      v ? String(v) : "—",
  },
];

export default function BlogListPage() {
  return (
    <ContentList
      type="blog"
      title="Blog Posts"
      columns={COLUMNS}
      idField="slug"
      createHref="/admin/blog/new"
      editHref={(id) => `/admin/blog/${id}`}
      viewHref={(id) => `/blog/${id}`}
    />
  );
}
