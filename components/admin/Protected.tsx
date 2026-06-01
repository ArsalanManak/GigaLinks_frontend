"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me } from "../../lib/auth";

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

  if (loading) return <div className="p-8">Checking authentication...</div>;
  return <>{children}</>;
}
