"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../lib/api";
import { ArrowLeft, Save, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    icon: "",
    hero_image: "",
    image_url: "",
    youtube_url: "",
  });
  const [subServices, setSubServices] = useState<string[]>([]);
  const [newSub, setNewSub] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/services/${id}`);
        const s = res.data;
        setForm({
          slug: s.slug || "",
          title: s.title || "",
          description: s.description || "",
          icon: s.icon || "",
          hero_image: s.hero_image || "",
          image_url: s.image_url || "",
          youtube_url: s.youtube_url || "",
        });
        setSubServices(s.sub_services || []);
      } catch {
        alert("Service not found");
        router.push("/admin/services");
      } finally {
        setFetching(false);
      }
    })();
  }, [id, router]);

  const addSubService = () => {
    if (newSub.trim()) {
      setSubServices([...subServices, newSub.trim()]);
      setNewSub("");
    }
  };

  const removeSubService = (index: number) => {
    setSubServices(subServices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/services/${id}`, {
        ...form,
        icon: form.icon || null,
        hero_image: form.hero_image || null,
        image_url: form.image_url || null,
        youtube_url: form.youtube_url || null,
        sub_services: subServices,
      });
      router.push("/admin/services");
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Failed to update service");
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
        <Link href="/admin/services" className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Service</h1>
          <p className="text-gray-400 mt-1">Update service details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] rounded-2xl border border-gray-800 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Service Title *</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
            <input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
          <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required rows={4} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500 resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (optional)</label>
            <input value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="e.g. tower or icon name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Hero Image URL (optional)</label>
            <input value={form.hero_image} onChange={(e) => setForm({...form, hero_image: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="https://res.cloudinary.com/..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Cloudinary Image URL (optional)</label>
          <input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="https://res.cloudinary.com/..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Video URL (optional)</label>
          <input value={form.youtube_url} onChange={(e) => setForm({...form, youtube_url: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="https://www.youtube.com/watch?v=..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sub Services</label>
          <div className="flex gap-2 mb-3">
            <input value={newSub} onChange={(e) => setNewSub(e.target.value)} className="flex-1 bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="e.g. Site Survey & Planning" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSubService(); } }} />
            <button type="button" onClick={addSubService} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 rounded-xl hover:bg-emerald-500/20 transition">
              <Plus size={20} />
            </button>
          </div>
          {subServices.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subServices.map((sub, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#1F2937] rounded-xl px-3 py-1.5 border border-gray-700 text-sm text-gray-300">
                  {sub}
                  <button type="button" onClick={() => removeSubService(i)} className="text-red-400 hover:text-red-300">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-500/20">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>
          <Link href="/admin/services" className="text-gray-400 hover:text-white transition">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
