"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "location", label: "Location" },
  {
    key: "quote",
    label: "Quote",
    render: (v: unknown) => {
      const s = String(v ?? "");
      return s.length > 60 ? s.slice(0, 60) + "..." : s;
    },
  },
];

export default function TestimonialsListPage() {
  return (
    <ContentList
      type="testimonials"
      title="Testimonials"
      columns={COLUMNS}
      idField="id"
      createHref="/admin/testimonials/new"
      editHref={(id) => `/admin/testimonials/${id}`}
    />
  );
}
