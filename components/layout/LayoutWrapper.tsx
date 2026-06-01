"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isAuth = pathname.startsWith("/auth");
  const hideLayout = isAdmin || isAuth;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className={hideLayout ? "" : "flex-1 pt-24"}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
