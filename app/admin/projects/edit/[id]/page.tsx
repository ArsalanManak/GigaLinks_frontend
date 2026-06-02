"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../lib/api";
import { ArrowLeft, Save, Plus, X, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
import ConfirmModal from "../../../../../components/ui/ConfirmModal";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "",
    service_type: "",
    city: "",
    description: "",
    youtube_url: "",
    featured: false,
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        const p = res.data;
        setForm({
          title: p.title || "",
          service_type: p.service_type || "",
          city: p.city || "",
          description: p.description || "",
          youtube_url: p.youtube_url || "",
          featured: p.featured || false,
        });
        setImageUrls(p.cloudinary_urls || []);
      } catch {
        setErrorMsg("Project not found");
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploadingMedia(true);
    try {
      const res = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setImageUrls([...imageUrls, res.data.url]);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploadingMedia(false);
      e.target.value = '';
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/projects/${id}`, {
        ...form,
        cloudinary_urls: imageUrls,
        youtube_url: form.youtube_url || null,
      });
      router.push("/admin/projects");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-emerald-400" size={32} /></div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Project</h1>
          <p className="text-gray-400 mt-1">Update project details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] rounded-2xl border border-gray-800 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Service Type *</label>
            <input value={form.service_type} onChange={(e) => setForm({...form, service_type: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
          <input value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={4} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Video URL (optional)</label>
          <input value={form.youtube_url} onChange={(e) => setForm({...form, youtube_url: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="https://www.youtube.com/watch?v=..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Images (Upload to Cloudinary)</label>
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingMedia} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
              <div className={`bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-3 rounded-xl flex items-center gap-2 transition ${uploadingMedia ? 'opacity-50' : 'hover:bg-emerald-500/20'}`}>
                {uploadingMedia ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
                <span className="font-medium">{uploadingMedia ? 'Uploading...' : 'Upload Image'}</span>
              </div>
            </div>
          </div>
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              {imageUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1F2937] rounded-xl px-4 py-2 border border-gray-700">
                  <img src={url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-sm text-gray-300 truncate flex-1">{url}</span>
                  <button type="button" onClick={() => removeImageUrl(i)} className="text-red-400 hover:text-red-300 transition">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} id="featured" className="w-5 h-5 rounded bg-[#1F2937] border-gray-700 accent-emerald-500" />
          <label htmlFor="featured" className="text-gray-300 text-sm">Mark as Featured Project</label>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-500/20">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>
          <Link href="/admin/projects" className="text-gray-400 hover:text-white transition">Cancel</Link>
        </div>
      </form>

      <ConfirmModal
        isOpen={!!errorMsg}
        title="Error"
        message={errorMsg || ""}
        confirmText="Okay"
        isDanger={true}
        onConfirm={() => {
          setErrorMsg(null);
          if (errorMsg === "Project not found") router.push("/admin/projects");
        }}
        onCancel={() => setErrorMsg(null)}
      />
    </div>
  );
}
