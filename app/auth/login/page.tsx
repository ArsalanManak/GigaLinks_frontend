"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/auth";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Shield, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] px-4 relative">
      <Link href="/" className="absolute top-6 left-4 md:left-8 flex items-center gap-2 text-gray-400 hover:text-white bg-[#111827] hover:bg-[#1F2937] px-4 py-2.5 rounded-xl border border-gray-800 transition shadow-lg">
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold !text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">Sign in to manage GigaLinkPak</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827] rounded-2xl p-8 border border-gray-800 shadow-2xl space-y-6">
          
          <div className="bg-[#1F2937] border border-gray-700 rounded-xl p-4 text-sm !text-gray-300">
            <p className="font-semibold !text-white mb-2 text-base">Test Credentials:</p>
            <div className="flex justify-between items-center mb-1">
              <span className="!text-white">Email:</span>
              <span className="font-mono !text-emerald-400 select-all">Gigalink00@gmail.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="!text-white">Password:</span>
              <span className="font-mono !text-emerald-400 select-all">11223344</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium !text-white mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gigalinkpak.com"
              type="email"
              required
              className="w-full bg-[#1F2937] border border-gray-700 !text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium !text-white mb-2">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-[#1F2937] border border-gray-700 !text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition placeholder-gray-400 pr-12"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 !text-gray-300 hover:!text-white transition">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-500/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><LogIn size={20} /> Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
