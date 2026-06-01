"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me } from "../../lib/auth";
import { Loader2 } from "lucide-react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await me();
        if (mounted) setLoading(false);
      } catch (err) {
        router.replace("/auth/login");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-400" size={32} />
      </div>
    );
  }
  return <>{children}</>;
}
