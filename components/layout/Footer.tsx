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
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-card)] flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-card)] flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-card)] flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
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
              <li><Link href="/get-quote" className="hover:text-[var(--green)] transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--green)] shrink-0 mt-0.5" />
                <span>Office No. 5, Tech Plaza, Faisalabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--green)] shrink-0" />
                <span>+92 300 0000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--green)] shrink-0" />
                <span>info@gigalinks.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} GigaLinkPak PVT LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
