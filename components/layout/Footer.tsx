import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-dark)] border-t border-[var(--glass-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-md bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] font-bold text-lg">
                G
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                GigaLink<span className="text-[var(--green)]">Pak</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Delivering reliable tower installation, FM radio, and solar internet solutions across Pakistan with world-class infrastructure and support.
            </p>
            {/* social icons removed from here — moved to footer center */}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/services" className="hover:text-[var(--green)] transition-colors">Internet Tower Installation</Link></li>
              <li><Link href="/services" className="hover:text-[var(--green)] transition-colors">FM Radio Installation</Link></li>
              <li><Link href="/services" className="hover:text-[var(--green)] transition-colors">Solar Internet Solutions</Link></li>
              <li><Link href="/services" className="hover:text-[var(--green)] transition-colors">Tower Maintenance & Paint</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/" className="hover:text-[var(--green)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--green)] transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--green)] transition-colors">Our Projects</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--green)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--green)] shrink-0 mt-0.5" />
                <span>Faisalabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--green)] shrink-0" />
                <span>Call: <a href="tel:+923005568086" className="hover:text-[var(--green)]">+92 300 5568086</a></span>
              </li>
              <li className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png" alt="WhatsApp" className="w-5 h-5" />
                <span>WhatsApp: <a href="https://wa.me/923469595593" target="_blank" rel="noreferrer" className="hover:text-[var(--green)]">+92 346 9595593</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--green)] shrink-0" />
                <span><a href="mailto:gigalink00@gmail.com" className="hover:text-[var(--green)]">gigalink00@gmail.com</a></span>
              </li>
              {/* social icons removed from here — moved to bottom center */}
            </ul>
          </div>
        </div>

        {/* centered social icons row (responsive grid) */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
            <a href="https://www.facebook.com/profile.php?id=61587694760831&sk=reels_tab" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/3840px-Facebook_f_logo_%282021%29.svg.png" alt="Facebook" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              </span>
              <span className="text-[var(--text-secondary)] text-[0.62rem] uppercase tracking-[0.18em] hidden sm:inline">Facebook</span>
            </a>
            <a href="https://www.instagram.com/hamidali426/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/3840px-Instagram_logo_2016.svg.png" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              </span>
              <span className="text-[var(--text-secondary)] text-[0.62rem] uppercase tracking-[0.18em] hidden sm:inline">Instagram</span>
            </a>
            <a href="https://www.youtube.com/@hdrawar67" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/3840px-YouTube_full-color_icon_%282017%29.svg.png" alt="YouTube" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              </span>
              <span className="text-[var(--text-secondary)] text-[0.62rem] uppercase tracking-[0.18em] hidden sm:inline">YouTube</span>
            </a>
            <a href="https://www.tiktok.com/@hamidali118900" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStHwMu0iib5nr3K--gkKVgH5gS-uSphzNaNQ&s" alt="TikTok" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              </span>
              <span className="text-[var(--text-secondary)] text-[0.62rem] uppercase tracking-[0.18em] hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} GigaLinkPak PVT LTD. All rights reserved.</p>
          <Link href="/auth/login" className="hover:text-[var(--green)] transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
