import React, { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '../lib/gsap';
import { SafeImage } from '../lib/images';

export default function LogoIntro({ onComplete }) {
  const containerRef = useRef(null);
  const markRef = useRef(null);
  const textRef = useRef(null);
  const shimmerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if intro has already been seen in this browser
    const seen = localStorage.getItem('satvam_seen_intro');
    if (seen === '1') {
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);

    if (isReducedMotion()) {
      localStorage.setItem('satvam_seen_intro', '1');
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          localStorage.setItem('satvam_seen_intro', '1');
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              setIsVisible(false);
              if (onComplete) onComplete();
            }
          });
        }
      });

      // 1. Mark & text fade + scale in over 800ms
      tl.fromTo(
        markRef.current,
        { opacity: 0, scale: 0.82, filter: 'blur(4px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      // 2. Gold shimmer sweep across mark
      .fromTo(
        shimmerRef.current,
        { x: '-120%', opacity: 0 },
        { x: '180%', opacity: 1, duration: 1.1, ease: 'power2.inOut' },
        '-=0.3'
      )
      // 3. Settle pause
      .to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    localStorage.setItem('satvam_seen_intro', '1');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#FAF7F0] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleSkip}
      role="dialog"
      aria-modal="true"
      aria-label="Satvam Introduction"
    >
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-8 right-8 text-xs font-mono tracking-widest uppercase text-[#6B5B45] hover:text-[#2D3E2F] py-2 px-4 rounded-full border border-[#6B5B45]/20 hover:border-[#6B5B45]/40 transition-colors"
      >
        Skip [ESC]
      </button>

      <div className="relative flex flex-col items-center">
        {/* Logo Mark with Shimmer Wrapper */}
        <div ref={markRef} className="relative w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-full flex items-center justify-center p-3 bg-[#F5EFE3] shadow-soft border border-[#6B5B45]/15">
          <SafeImage
            src="/references/logo/logo-mark.svg"
            alt="Satvam Seal"
            className="w-full h-full object-contain"
            fallbackText="SV"
          />
          {/* Shimmer sweep element */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 pointer-events-none transform -skew-x-20 bg-gradient-to-r from-transparent via-[#C9A961]/45 to-transparent"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Brand Name & Line */}
        <div ref={textRef} className="text-center mt-6">
          <h1 className="font-display font-medium text-3xl sm:text-4xl tracking-[0.14em] text-[#2D3E2F]">
            SATVAM
          </h1>
          <p className="text-eyebrow text-[#6B5B45] mt-2 tracking-[0.22em] text-xs">
            From India's Roots to Your Roots
          </p>
        </div>
      </div>
    </div>
  );
}
