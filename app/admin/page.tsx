"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { FolderKanban, Wrench, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          api.get("/projects"),
          api.get("/services"),
        ]);
        setProjectCount(pRes.data.length);
        setServiceCount(sRes.data.length);
      } catch {}
    })();
  }, []);

  const stats = [
    { label: "Total Projects", value: projectCount, icon: FolderKanban, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
    { label: "Total Services", value: serviceCount, icon: Wrench, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { label: "Active", value: "Live", icon: Activity, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
    { label: "Status", value: "Online", icon: TrendingUp, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                <stat.icon size={22} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
