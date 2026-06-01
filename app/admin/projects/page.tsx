"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../../lib/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-full bg-[#1DB954] px-4 py-2 text-white">New Project</Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <h3 className="font-medium">{p.title}</h3>
            <div className="text-sm text-gray-500">{p.city} — {p.service_type}</div>
          </div>
        ))}
        {projects.length === 0 && <div className="col-span-full text-gray-600">No projects yet</div>}
      </div>
    </div>
  );
}
