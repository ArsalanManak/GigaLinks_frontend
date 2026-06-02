"use client";
import React, { useState } from "react";
import AdminSidebar from "../../components/admin/Sidebar";
import Protected from "../../components/admin/Protected";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Protected>
      <div className="admin-panel min-h-screen bg-[#0A0F1C] flex">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 w-full md:ml-64 p-4 md:p-8 overflow-hidden min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                G
              </div>
              <span>GigaLink<span className="text-emerald-400">Pak</span></span>
            </h1>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
               <Menu size={24} />
            </button>
          </div>
          {children}
        </main>
      </div>
    </Protected>
  );
}
