import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GigaLinkPak — Connecting Pakistan | Tower, Radio & Solar Solutions",
  description:
    "GigaLinkPak delivers reliable tower installation, FM radio, and solar internet solutions across Pakistan. 15+ years of experience, 120+ projects completed.",
  keywords: [
    "telecom tower installation Pakistan",
    "FM radio installation",
    "solar internet solutions",
    "GigaLinkPak",
    "tower maintenance Pakistan",
  ],
  openGraph: {
    title: "GigaLinkPak — Connecting Pakistan",
    description:
      "Reliable tower, radio and solar internet solutions across Pakistan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
