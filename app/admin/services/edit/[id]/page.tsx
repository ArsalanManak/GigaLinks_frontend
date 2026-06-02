"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../lib/api";
import { ArrowLeft, Save, Plus, X, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
import ConfirmModal from "../../../../../components/ui/ConfirmModal";

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "Radio",
    youtube_url: "",
  });
  const [subServices, setSubServices] = useState<string[]>([]);
  const [subServiceInput, setSubServiceInput] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/services/${params.id}`);
        const s = res.data;
        setForm({
          title: s.title,
          slug: s.slug || "",
          description: s.description || "",
          icon: s.icon || "Radio",
          youtube_url: s.youtube_url || "",
        });
        setSubServices(s.sub_services || []);
        if (s.image_url) setImageUrls([s.image_url]);
        else if (s.hero_image) setImageUrls([s.hero_image]);
      } catch {
        setErrorMsg("Service not found");
      } finally {
        setFetching(false);
      }
    })();
  }, [params.id]);

  const addSubService = () => {
    if (subServiceInput.trim()) {
      setSubServices([...subServices, subServiceInput.trim()]);
      setSubServiceInput("");
    }
  };

  const removeSubService = (index: number) => {
    setSubServices(subServices.filter((_, i) => i !== index));
  };

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
      setImageUrls([res.data.url]); // services usually have one main image
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploadingMedia(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/services/${params.id}`, {
        ...form,
        sub_services: subServices,
        image_url: imageUrls[0] || null,
        youtube_url: form.youtube_url || null,
      });
      router.push("/admin/services");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-emerald-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services" className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Service</h1>
          <p className="text-gray-400 mt-1">Update your service offering</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#111827] rounded-2xl border border-gray-800 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Service Title *</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="e.g. Internet Tower Installation" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name</label>
            <select value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition appearance-none">
              <option value="Radio">Radio (Tower)</option>
              <option value="Sun">Sun (Solar)</option>
              <option value="Wrench">Wrench (Maintenance)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">URL Slug *</label>
          <input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} required className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="e.g. internet-tower-installation" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={4} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500 resize-none" placeholder="Describe the service..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sub Services</label>
          <div className="flex gap-2 mb-3">
            <input value={subServiceInput} onChange={(e) => setSubServiceInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addSubService(); } }} className="flex-1 bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="e.g. Site Survey" />
            <button type="button" onClick={addSubService} className="bg-gray-800 hover:bg-gray-700 text-white px-4 rounded-xl transition flex items-center justify-center border border-gray-700">
              <Plus size={20} />
            </button>
          </div>
          {subServices.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subServices.map((sub, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg text-gray-300 text-sm">
                  {sub}
                  <button type="button" onClick={() => removeSubService(i)} className="text-red-400 hover:text-red-300 transition">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Video URL (optional)</label>
          <input value={form.youtube_url} onChange={(e) => setForm({...form, youtube_url: e.target.value})} className="w-full bg-[#1F2937] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500" placeholder="https://www.youtube.com/watch?v=..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Service Image</label>
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
            <div className="flex items-center gap-3 bg-[#1F2937] rounded-xl px-4 py-2 border border-gray-700 w-max">
              <img src={imageUrls[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-sm text-gray-300 truncate max-w-[200px]">{imageUrls[0]}</span>
              <button type="button" onClick={() => setImageUrls([])} className="text-red-400 hover:text-red-300 transition ml-2">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-500/20">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Update Service
          </button>
          <Link href="/admin/services" className="text-gray-400 hover:text-white transition">Cancel</Link>
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
          if (errorMsg === "Service not found") router.push("/admin/services");
        }}
        onCancel={() => setErrorMsg(null)}
      />
    </div>
  );
}
