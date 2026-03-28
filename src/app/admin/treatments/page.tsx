"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
 { key: "name", label: "Name" },
 { key: "category", label: "Category" },
 {
 key: "kamuraScore",
 label: "Score",
 render: (v: unknown) => (v ? String(v) : "—"),
 },
 {
 key: "uaeAvailable",
 label: "UAE",
 render: (v: unknown) => (v ? "Yes" : "No"),
 },
];

export default function TreatmentsListPage() {
 return (
 <ContentList
 type="treatments"
 title="Treatments"
 columns={COLUMNS}
 idField="slug"
 createHref="/admin/treatments/new"
 editHref={(id) => `/admin/treatments/${id}`}
 viewHref={(id) => `/treatments/${id}`}
 />
 );
}
