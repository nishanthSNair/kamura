"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "city", label: "City" },
  { key: "seoTitle", label: "SEO Title" },
];

export default function AreasListPage() {
  return (
    <ContentList
      type="areas"
      title="Areas"
      columns={COLUMNS}
      idField="slug"
      createHref="/admin/areas/new"
      editHref={(id) => `/admin/areas/${id}`}
    />
  );
}
