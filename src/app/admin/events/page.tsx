"use client";

import ContentList from "@/components/admin/ContentList";

const COLUMNS = [
 { key: "title", label: "Title" },
 { key: "dates", label: "Dates" },
 { key: "location", label: "Location" },
 { key: "category", label: "Category" },
];

export default function EventsListPage() {
 return (
 <ContentList
 type="events"
 title="Events"
 columns={COLUMNS}
 idField="id"
 createHref="/admin/events/new"
 editHref={(id) => `/admin/events/${id}`}
 />
 );
}
