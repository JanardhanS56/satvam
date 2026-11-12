import React, { useRef, useState, useEffect } from 'react';
import { gsap, isReducedMotion } from '../lib/gsap';
import { SafeImage } from '../lib/images';

// 16 shards with varied polygon clip-paths for authentic glass shattering
const SHARD_CONFIGS = [
  { clip: 'polygon(50% 0%, 0% 100%, 100% 100%)', angle: 25, dist: 130, size: 28 },
  { clip: 'polygon(0% 0%, 100% 30%, 50% 100%)', angle: 65, dist: 155, size: 24 },
  { clip: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', angle: 110, dist: 140, size: 32 },
  { clip: 'polygon(0% 50%, 50% 0%, 100% 100%)', angle: 150, dist: 160, size: 22 },
  { clip: 'polygon(0% 0%, 100% 0%, 50% 100%)', angle: 195, dist: 135, size: 26 },
  { clip: 'polygon(30% 0%, 100% 50%, 0% 100%)', angle: 235, dist: 150, size: 30 },
  { clip: 'polygon(50% 0%, 100% 100%, 0% 60%)', angle: 280, dist: 145, size: 25 },
  { clip: 'polygon(0% 20%, 80% 0%, 100% 80%, 20% 100%)', angle: 325, dist: 155, size: 28 },
  { clip: 'polygon(0% 0%, 100% 40%, 40% 100%)', angle: 45, dist: 110, size: 18 },
  { clip: 'polygon(50% 0%, 100% 100%, 0% 100%)', angle: 85, dist: 120, size: 20 },
  { clip: 'polygon(10% 0%, 90% 20%, 50% 100%)', angle: 135, dist: 115, size: 22 },
  { clip: 'polygon(0% 0%, 100% 100%, 0% 80%)', angle: 175, dist: 125, size: 19 },
  { clip: 'polygon(40% 0%, 100% 60%, 0% 100%)', angle: 215, dist: 110, size: 24 },
  { clip: 'polygon(0% 40%, 100% 0%, 70% 100%)', angle: 260, dist: 120, size: 20 },
  { clip: 'polygon(20% 0%, 100% 30%, 40% 100%)', angle: 305, dist: 115, size: 22 },
  { clip: 'polygon(0% 0%, 80% 0%, 100% 100%)', angle: 350, dist: 125, size: 25 }
];

export default function IngredientOrbit({ product }) {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const shardsRef = useRef([]);
  const orbitNodesRef = useRef([]);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Take top 6 ingredients
  const ingredients = (product.ingredients || []).slice(0, 6);
  while (ingredients.length < 6) {
    ingredients.push({
      name: 'Vedic Herb',
      sanskritName: 'Vanaspati',
      percentage: 5,
      role: 'Follicle health'
    });
  }

  const triggerOrbit = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsPlaying(true);

    if (isReducedMotion()) {
      // Static overlay for 5 seconds on reduced motion
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlaying(false);
      }
    });
    timelineRef.current = tl;

    // 1. Bottle scale + brightness surge (200ms)
    tl.to(bottleRef.current, {
      scale: 1.05,
      filter: 'brightness(1.12)',
      duration: 0.2,
      ease: 'power2.out'
    });

    // 2. Shards explode outward
    shardsRef.current.forEach((shard, i) => {
      if (!shard) return;
      const conf = SHARD_CONFIGS[i];
      const rad = (conf.angle * Math.PI) / 180;
      const targetX = Math.cos(rad) * conf.dist;
      const targetY = Math.sin(rad) * conf.dist;

      tl.fromTo(
        shard,
        { x: 0, y: 0, scale: 0.2, opacity: 0.9, rotation: 0 },
        {
          x: targetX,
          y: targetY,
          scale: 1,
          opacity: 0,
          rotation: conf.angle * 2,
          duration: 0.7,
          ease: 'power3.out'
        },
        0.15
      );
    });

    // 3. Bottle dims to allow ingredients to shine
    tl.to(
      bottleRef.current,
      {
        opacity: 0.35,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.inOut'
      },
      0.3
    );

    // 4. 6 Ingredients orbit on tilted ellipse
    orbitNodesRef.current.forEach((node, i) => {
      if (!node) return;
      const baseAngle = i * 60; // 0, 60, 120, 180, 240, 300
      const rad = (baseAngle * Math.PI) / 180;
      const radiusX = 145; // ellipse width
      const radiusY = 95;  // ellipse height (tilted perspective)

      const startX = Math.cos(rad) * radiusX;
      const startY = Math.sin(rad) * radiusY;

      // Reveal sprite
      tl.fromTo(
        node,
        { x: 0, y: 0, scale: 0, opacity: 0 },
        {
          x: startX,
          y: startY,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.4)'
        },
        0.3 + i * 0.06
      );

      // Staggered label highlight pulse
      const labelEl = node.querySelector('.ingredient-label');
      if (labelEl) {
        tl.fromTo(
          labelEl,
          { opacity: 0.3, y: 4, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1.05,
            duration: 0.5,
            repeat: 1,
            yoyo: true,
            ease: 'power1.inOut'
          },
          0.8 + i * 0.3
        );
      }
    });

    // 5. Orbit rotation motion for 3 seconds
    tl.to(
      orbitNodesRef.current,
      {
        rotation: '+=25',
        duration: 2.8,
        ease: 'none'
      },
      0.9
    );

    // 6. Implode and reconvene back to bottle center
    tl.to(
      orbitNodesRef.current,
      {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      },
      4.2
    );

    // Bottle returns to normal
    tl.to(
      bottleRef.current,
      {
        opacity: 1,
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.6,
        ease: 'power2.out'
      },
      4.4
    );
  };

  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 flex items-center justify-center cursor-pointer select-none overflow-visible"
      onClick={triggerOrbit}
      title="Click bottle to trigger shatter-orbit ingredient reveal"
    >
      {/* 12-16 Explosion Shards (glass polygons) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        {SHARD_CONFIGS.map((conf, i) => (
          <div
            key={i}
            ref={(el) => (shardsRef.current[i] = el)}
            className="absolute bg-gradient-to-br from-[#FAF7F0]/90 to-[#C9A961]/60 backdrop-blur-xs border border-white/40 shadow-xs"
            style={{
              width: `${conf.size}px`,
              height: `${conf.size}px`,
              clipPath: conf.clip,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* 6 Orbiting Ingredient Sprites */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
        {ingredients.map((ing, i) => (
          <div
            key={i}
            ref={(el) => (orbitNodesRef.current[i] = el)}
            className="absolute flex flex-col items-center pointer-events-auto"
            style={{ opacity: 0 }}
          >
            {/* Circular Ingredient Node */}
            <div className="w-12 h-12 rounded-full bg-[#FAF7F0] border-2 border-[#C9A961] shadow-lifted flex items-center justify-center p-1 overflow-hidden transition-transform hover:scale-110">
              <span className="text-base select-none">🌿</span>
            </div>

            {/* Ingredient Label Pill */}
            <div className="ingredient-label mt-1 px-2.5 py-0.5 rounded-full bg-[#2D3E2F]/90 backdrop-blur-xs text-[#FAF7F0] border border-[#C9A961]/40 text-center whitespace-nowrap shadow-xs">
              <p className="font-display text-[11px] font-medium leading-none text-[#C9A961]">
                {ing.name} · {ing.percentage || 15}%
              </p>
              <p className="font-mono text-[9px] text-[#FAF7F0]/70 leading-none mt-0.5 italic">
                {ing.sanskritName || ing.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Center Bottle */}
      <div
        ref={bottleRef}
        className="relative z-10 w-48 h-64 flex items-center justify-center transition-all duration-300"
      >
        <SafeImage
          src={product.image || `references/products/${product.slug}-bottle.webp`}
          alt={product.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-md"
          fallbackText={product.name}
        />
      </div>

      {/* Hint Badge overlay if idle */}
      {!isPlaying && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-widest uppercase font-mono text-[#6B5B45]/70 bg-[#FAF7F0]/80 px-2.5 py-0.5 rounded-full border border-[#6B5B45]/15 backdrop-blur-xs pointer-events-none">
          Click bottle to shatter-orbit
        </span>
      )}
    </div>
  );
}
