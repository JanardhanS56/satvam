import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SafeImage } from '../lib/images';

export default function Footer() {
  const navigate = useNavigate();

  const handleReplayJourney = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('satvam_skipped');
      localStorage.removeItem('satvam_skip_journey');
    }
    navigate('/journey');
  };

  return (
    <footer className="w-full bg-[#2D3E2F] text-[#FAF7F0] pt-16 pb-12 mt-auto border-t border-[#6B5B45]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {/* Brand Block */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F0]/10 flex items-center justify-center border border-[#FAF7F0]/20">
              <SafeImage
                src="/references/logo/logo-mark.webp"
                alt="Satvam"
                className="w-7 h-7 object-contain brightness-0 invert"
                fallbackText="SV"
              />
            </div>
            <span className="font-display font-medium text-2xl tracking-[0.1em] text-[#FAF7F0]">
              SATVAM
            </span>
          </div>
          <p className="font-display text-sm tracking-wide text-[#FAF7F0]/80 italic">
            From India's Roots to Your Roots.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#FAF7F0]/60 mt-1 uppercase tracking-widest font-mono">
            <span>🇮🇳</span>
            <span>Crafted & Bottled in India</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h2 className="text-eyebrow text-[#C9A961] mb-2 font-display text-xs">Navigation</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-[#FAF7F0]/80">
            <Link to="/shop" className="hover:text-[#C9A961] transition-colors py-1">Shop Atelier</Link>
            <Link to="/products" className="hover:text-[#C9A961] transition-colors py-1">Full Catalog</Link>
            <Link to="/about" className="hover:text-[#C9A961] transition-colors py-1">Our Heritage</Link>
            <Link to="/trust" className="hover:text-[#C9A961] transition-colors py-1">Certifications & FAQ</Link>
            <Link to="/profile" className="hover:text-[#C9A961] transition-colors py-1">Profile & Quiz</Link>
          </div>
        </div>

        {/* Help & Support */}
        <div className="flex flex-col gap-3">
          <h2 className="text-eyebrow text-[#C9A961] mb-2 font-display text-xs">Customer Atelier</h2>
          <p className="text-sm text-[#FAF7F0]/80 leading-relaxed">
            Need consultation on herbal blends or order questions?
          </p>
          <p className="text-sm text-[#FAF7F0]/90 font-medium">
            atelier@satvam-herbal.in
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleReplayJourney}
              className="text-xs text-[#C9A961] hover:underline underline-offset-4 tracking-wider uppercase font-medium focus:outline-none"
            >
              ✦ Replay the journey
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-[#FAF7F0]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F0]/50 gap-4">
        <p>© 2026 Satvam · Fictional brand created for a college competition.</p>
        <p className="font-mono text-[11px] text-[#FAF7F0]/40">Pure Frontend · Cold-Pressed Herbal Formulations</p>
      </div>
    </footer>
  );
}
