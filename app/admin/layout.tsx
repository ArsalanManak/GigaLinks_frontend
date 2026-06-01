"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Protected from "../../components/admin/Protected";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl flex">
          <Sidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </Protected>
  );
}
