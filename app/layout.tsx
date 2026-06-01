import type { Metadata } from "next";
import { Inter, Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-noto-nastaliq",
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
    <html lang="en" className={`${inter.variable} ${amiri.variable} ${notoNastaliq.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
