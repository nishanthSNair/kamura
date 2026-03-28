"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
 { key: "name", label: "Name" },
 { key: "city", label: "City" },
 { key: "category", label: "Category" },
 {
 key: "featured",
 label: "Featured",
 render: (v: unknown) => (v ? "Yes" : "—"),
 },
];

export default function ListingsListPage() {
 return (
 <ContentList
 type="listings"
 title="Listings"
 columns={COLUMNS}
 idField="id"
 createHref="/admin/listings/new"
 editHref={(id) => `/admin/listings/${id}`}
 />
 );
}
