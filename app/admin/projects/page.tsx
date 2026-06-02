"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import type { Project } from "../../../types";
import ConfirmModal from "../../../components/ui/ConfirmModal";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Modal States
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const confirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    setDeleting(id);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      setErrorMsg("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-emerald-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-[100vw] overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio items</p>
        </div>
        <Link href="/admin/projects/create" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center">
          <Plus size={20} />
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#111827] rounded-2xl border border-gray-800 p-12 text-center">
          <p className="text-gray-400 text-lg">No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Project</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">City</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Media</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.cloudinary_urls?.[0] ? (
                        <img src={project.cloudinary_urls[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                          <ExternalLink size={16} />
                        </div>
                      )}
                      <div className="text-white font-medium">{project.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{project.service_type}</td>
                  <td className="px-6 py-4 text-gray-400">{project.city}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {project.cloudinary_urls?.length > 0 && <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg">{project.cloudinary_urls.length} img</span>}
                      {project.youtube_url && <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-lg">Video</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/edit/${project.id}`} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-emerald-400 transition">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => confirmDelete(project.id!)} disabled={deleting === project.id} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition disabled:opacity-50">
                        {deleting === project.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Modals */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        onConfirm={executeDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <ConfirmModal
        isOpen={!!errorMsg}
        title="Error"
        message={errorMsg || ""}
        confirmText="Okay"
        isDanger={true}
        onConfirm={() => setErrorMsg(null)}
        onCancel={() => setErrorMsg(null)}
      />
    </div>
  );
}
