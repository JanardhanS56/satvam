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

const HERB_METADATA = {
  Bhringraj: { emoji: '🌱', bg: 'bg-[#2D3E2F]', border: 'border-[#C9A961]', text: 'text-[#C9A961]' },
  Amla: { emoji: '🍈', bg: 'bg-[#3D5239]', border: 'border-[#E8B44A]', text: 'text-[#E8B44A]' },
  Hibiscus: { emoji: '🌺', bg: 'bg-[#7A2A28]', border: 'border-[#E5989B]', text: 'text-[#FAF7F0]' },
  Brahmi: { emoji: '🍃', bg: 'bg-[#2C4A3E]', border: 'border-[#A3B899]', text: 'text-[#FAF7F0]' },
  Saffron: { emoji: '🏵️', bg: 'bg-[#8F5E15]', border: 'border-[#E8B44A]', text: 'text-[#FAF7F0]' },
  Sesame: { emoji: '✨', bg: 'bg-[#6B5B45]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Neem: { emoji: '🌿', bg: 'bg-[#203D2A]', border: 'border-[#A3B899]', text: 'text-[#FAF7F0]' },
  Sandalwood: { emoji: '🪵', bg: 'bg-[#704F38]', border: 'border-[#E8B44A]', text: 'text-[#FAF7F0]' },
  Rose: { emoji: '🌹', bg: 'bg-[#852C3A]', border: 'border-[#E5989B]', text: 'text-[#FAF7F0]' },
  Vetiver: { emoji: '🌾', bg: 'bg-[#615B3E]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Ashwagandha: { emoji: '🌾', bg: 'bg-[#5A4D3B]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Fenugreek: { emoji: '🌱', bg: 'bg-[#405438]', border: 'border-[#A3B899]', text: 'text-[#FAF7F0]' },
  Coconut: { emoji: '🥥', bg: 'bg-[#4A3B32]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Licorice: { emoji: '🌿', bg: 'bg-[#3E4A35]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Indigo: { emoji: '💠', bg: 'bg-[#233D4D]', border: 'border-[#76A8C2]', text: 'text-[#FAF7F0]' },
  Jatamansi: { emoji: '🌱', bg: 'bg-[#3E382F]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Almond: { emoji: '🌰', bg: 'bg-[#5C4533]', border: 'border-[#C9A961]', text: 'text-[#FAF7F0]' },
  Rosemary: { emoji: '🌿', bg: 'bg-[#294B37]', border: 'border-[#A3B899]', text: 'text-[#FAF7F0]' },
  Lavender: { emoji: '🪻', bg: 'bg-[#4C3B5E]', border: 'border-[#B8A4D0]', text: 'text-[#FAF7F0]' }
};

function getHerbMeta(herbName = '') {
  for (const key of Object.keys(HERB_METADATA)) {
    if (herbName.toLowerCase().includes(key.toLowerCase())) {
      return HERB_METADATA[key];
    }
  }
  return { emoji: '🌿', bg: 'bg-[#2D3E2F]', border: 'border-[#C9A961]', text: 'text-[#C9A961]' };
}

export default function IngredientOrbit({ product }) {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const shardsRef = useRef([]);
  const orbitNodesRef = useRef([]);
  const timelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(-1);

  // Take top 6 ingredients
  const ingredients = (product.ingredients || []).slice(0, 6);
  while (ingredients.length < 6) {
    ingredients.push({
      name: 'Vedic Herb',
      sanskritName: 'Vanaspati',
      percentage: 5,
      role: 'Follicle nourishment'
    });
  }

  const triggerOrbit = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsPlaying(true);
    setActiveHighlightIndex(0);

    if (isReducedMotion()) {
      // Accessible static display for 5 seconds
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setActiveHighlightIndex(-1);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const radiusX = 165; // Horizontal width of 3D ellipse
    const radiusY = 90;  // Depth foreshortening (tilted 3D plane)
    const angleState = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlaying(false);
        setActiveHighlightIndex(-1);
      }
    });
    timelineRef.current = tl;

    // 1. Initial surge on bottle (200ms)
    tl.to(bottleRef.current, {
      scale: 1.06,
      filter: 'brightness(1.15)',
      duration: 0.22,
      ease: 'power2.out'
    });

    // 2. Glass Shards Explode Outward
    shardsRef.current.forEach((shard, i) => {
      if (!shard) return;
      const conf = SHARD_CONFIGS[i];
      const rad = (conf.angle * Math.PI) / 180;
      const targetX = Math.cos(rad) * conf.dist;
      const targetY = Math.sin(rad) * conf.dist;

      tl.fromTo(
        shard,
        { x: 0, y: 0, scale: 0.2, opacity: 0.95, rotation: 0 },
        {
          x: targetX,
          y: targetY,
          scale: 1.1,
          opacity: 0,
          rotation: conf.angle * 2.5,
          duration: 0.75,
          ease: 'power3.out'
        },
        0.12
      );
    });

    // 3. Bottle dims to background level
    tl.to(
      bottleRef.current,
      {
        opacity: 0.38,
        scale: 0.94,
        duration: 0.45,
        ease: 'power2.inOut'
      },
      0.3
    );

    // Initial appearance of nodes at base ellipse positions
    orbitNodesRef.current.forEach((node, i) => {
      if (!node) return;
      const baseAngle = i * 60;
      const rad = (baseAngle * Math.PI) / 180;
      const startX = Math.cos(rad) * radiusX;
      const startY = Math.sin(rad) * radiusY;

      tl.fromTo(
        node,
        { x: 0, y: 0, scale: 0, opacity: 0 },
        {
          x: startX,
          y: startY,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'back.out(1.5)'
        },
        0.3 + i * 0.05
      );
    });

    // 4. Continuous 3D Elliptical Orbit & Depth Layering over 3.8s
    tl.to(
      angleState,
      {
        value: 180, // rotate half-turn (180 degrees) smoothly
        duration: 3.8,
        ease: 'power1.inOut',
        onUpdate: () => {
          orbitNodesRef.current.forEach((node, i) => {
            if (!node) return;
            const currentDeg = (angleState.value + i * 60) % 360;
            const rad = (currentDeg * Math.PI) / 180;
            const x = Math.cos(rad) * radiusX;
            const y = Math.sin(rad) * radiusY;
            const sinVal = Math.sin(rad); // -1 (top/behind) to +1 (bottom/front)

            // Dynamic depth simulation:
            // Foreground nodes (sinVal > 0): larger, opaque, z-index 35
            // Background nodes (sinVal < 0): smaller, semi-transparent, behind bottle
            const scale = 0.88 + (sinVal + 1) * 0.14; // 0.88 to 1.16
            const opacity = 0.72 + (sinVal + 1) * 0.14; // 0.72 to 1.0
            const zIndex = sinVal > 0 ? 35 : 10;

            node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            node.style.opacity = opacity;
            node.style.zIndex = zIndex;
          });
        }
      },
      0.8
    );

    // 5. Continuous Cycling Label Highlight Pulse across 5s
    for (let cycle = 0; cycle < 6; cycle++) {
      tl.call(
        () => {
          setActiveHighlightIndex(cycle % 6);
        },
        null,
        0.8 + cycle * 0.6
      );
    }

    // 6. Implode and return into the bottle
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
      4.4
    );

    // 7. Bottle returns to full radiance
    tl.to(
      bottleRef.current,
      {
        opacity: 1,
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.6,
        ease: 'power2.out'
      },
      4.6
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
      className="relative w-full h-84 flex items-center justify-center cursor-pointer select-none overflow-visible"
      onClick={triggerOrbit}
      title="Click bottle to trigger 3D shatter-orbit ingredient reveal"
    >
      {/* 16 Shatter Explosion Shards */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-25">
        {SHARD_CONFIGS.map((conf, i) => (
          <div
            key={i}
            ref={(el) => (shardsRef.current[i] = el)}
            className="absolute bg-gradient-to-br from-[#FAF7F0]/90 to-[#C9A961]/70 backdrop-blur-xs border border-white/50 shadow-xs"
            style={{
              width: `${conf.size}px`,
              height: `${conf.size}px`,
              clipPath: conf.clip,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* 6 Orbiting 3D Botanical Nodes */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {ingredients.map((ing, i) => {
          const meta = getHerbMeta(ing.name);
          const isHighlighted = activeHighlightIndex === i;

          return (
            <div
              key={i}
              ref={(el) => (orbitNodesRef.current[i] = el)}
              className="absolute flex flex-col items-center pointer-events-auto transition-shadow duration-300"
              style={{ opacity: 0 }}
            >
              {/* Circular Botanical Herb Badge with 3D counter-elevation */}
              <div
                className={`w-12 h-12 rounded-full ${meta.bg} border-2 ${meta.border} shadow-lifted flex items-center justify-center p-1 overflow-hidden transition-all duration-300 ${
                  isHighlighted ? 'scale-115 ring-2 ring-[#E8B44A] shadow-[0_0_14px_rgba(232,180,74,0.7)]' : ''
                }`}
              >
                <span className="text-lg select-none filter drop-shadow-xs">{meta.emoji}</span>
              </div>

              {/* Herb Label Pill with Continuous Cycling Highlight */}
              <div
                className={`ingredient-label mt-1.5 px-3 py-1 rounded-full backdrop-blur-md text-center whitespace-nowrap shadow-md transition-all duration-300 border ${
                  isHighlighted
                    ? 'bg-[#2D3E2F] border-[#E8B44A] ring-1 ring-[#E8B44A]/80 translate-y-0.5 scale-105'
                    : 'bg-[#2D3E2F]/90 border-[#C9A961]/35'
                }`}
              >
                <p className={`font-display text-[11px] font-semibold tracking-wide ${meta.text}`}>
                  {ing.name} · {ing.percentage || 15}%
                </p>
                <p className="font-mono text-[9px] text-[#FAF7F0]/80 leading-none mt-0.5 italic">
                  {ing.sanskritName || ing.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Bottle (z-index 20) */}
      <div
        ref={bottleRef}
        className="relative z-20 w-48 h-64 flex items-center justify-center transition-all duration-300"
      >
        <SafeImage
          src={product.image || `references/products/${product.slug}-bottle.webp`}
          alt={product.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-md"
          fallbackText={product.name}
        />
      </div>

      {/* Ambient Pulsing Callout Badge if Idle */}
      {!isPlaying && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-widest uppercase font-mono text-[#6B5B45] bg-[#FAF7F0]/95 px-3 py-1 rounded-full border border-[#C9A961]/40 backdrop-blur-xs shadow-xs pointer-events-none hover:bg-white transition-colors">
          ✦ Click bottle to inspect botanicals ✦
        </span>
      )}
    </div>
  );
}
