"use client";

import AuthGate from "@/components/admin/AuthGate";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <AuthGate>
 <div className="flex min-h-screen bg-gray-50">
 <AdminSidebar />
 <main className="flex-1 overflow-auto">{children}</main>
 </div>
 </AuthGate>
 );
}
