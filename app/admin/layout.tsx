"use client";
import React from "react";
import AdminSidebar from "../../components/admin/Sidebar";
import Protected from "../../components/admin/Protected";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <div className="min-h-screen bg-[#0A0F1C] flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </Protected>
  );
}
