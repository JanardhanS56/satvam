import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SafeImage } from '../lib/images';
import { isReducedMotion } from '../lib/gsap';

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isReducedMotion()) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSkipJourney = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('satvam_skip_journey', '1');
      sessionStorage.setItem('satvam_skipped', '1');
    }
    navigate('/shop');
  };

  // Parallax translation offsets
  const offset1 = isReducedMotion() ? 0 : scrollY * 0.12;
  const offset2 = isReducedMotion() ? 0 : scrollY * 0.24;
  const offset3 = isReducedMotion() ? 0 : scrollY * 0.38;

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden flex flex-col justify-between pt-12 pb-16 bg-[#FAF7F0]"
    >
      {/* Background Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Layer 1 (Furthest back - Landscape / Mist) */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-25 object-cover transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${offset1}px, 0)` }}
        >
          <SafeImage
            src="/references/hero/hero-1.webp"
            alt="Ayurvedic foothills layer 1"
            className="w-full h-full object-cover object-center filter saturate-[0.85] sepia-[0.1]"
            fallbackText="Atelier Landscape 1"
          />
        </div>

        {/* Layer 2 (Mid layer - Botanical canopy) */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-35 object-cover transition-transform duration-75 ease-out mix-blend-multiply"
          style={{ transform: `translate3d(0, ${offset2}px, 0)` }}
        >
          <SafeImage
            src="/references/hero/hero-2.webp"
            alt="Botanical grove layer 2"
            className="w-full h-full object-cover object-center filter saturate-[0.9]"
            fallbackText="Atelier Grove 2"
          />
        </div>

        {/* Layer 3 (Foreground botanical shadow) */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-20 object-cover transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${offset3}px, 0)` }}
        >
          <SafeImage
            src="/references/hero/hero-3.webp"
            alt="Botanical leaves layer 3"
            className="w-full h-full object-cover object-bottom"
            fallbackText="Botanicals 3"
          />
        </div>

        {/* Gradient Scrims to preserve 60% ivory palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0] via-[#FAF7F0]/70 to-[#FAF7F0]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#FAF7F0_85%)]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* Seal / Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#F5EFE3]/80 border border-[#6B5B45]/15 backdrop-blur-xs">
          <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-[#FAF7F0]">
            <SafeImage
              src="/references/logo/logo-mark.svg"
              alt="Seal"
              className="w-4 h-4 object-contain"
              fallbackText="S"
            />
          </div>
          <span className="text-eyebrow text-[#6B5B45] text-xs font-medium tracking-[0.2em]">
            Vedic Apothecary · Estd. 2018
          </span>
        </div>

        {/* Brand Name Headline */}
        <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl tracking-[-0.02em] text-[#2D3E2F] leading-[1.05]">
          SATVAM
        </h1>

        {/* Tagline */}
        <p className="mt-6 font-eyebrow text-sm sm:text-base md:text-lg tracking-[0.22em] text-[#6B5B45] uppercase font-medium max-w-2xl">
          From India's Roots to Your Roots.
        </p>

        {/* Supporting description */}
        <p className="mt-4 text-[#2D3E2F]/80 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
          Sacred cold-pressed hair elixirs crafted with single-origin Indian botanicals,
          wood-pressed slowly to preserve whole plant vitality.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            to="/journey"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base shadow-soft hover:shadow-lifted font-medium tracking-wide"
          >
            Enter the Atelier
          </Link>
          <button
            type="button"
            onClick={handleSkipJourney}
            className="btn-ghost w-full sm:w-auto px-8 py-3.5 text-base tracking-wide"
          >
            Skip the journey
          </button>
        </div>
      </div>

      {/* Decorative Bottom Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 text-[#6B5B45]/60 text-xs tracking-widest uppercase font-mono">
        <span className="inline-block animate-bounce mb-1">↓</span>
        <span>Scroll to Explore Lineage</span>
      </div>
    </section>
  );
}
