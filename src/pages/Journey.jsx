import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SafeImage } from '../lib/images';
import {
  Compass,
  ArrowRight,
  Sprout,
  Droplets,
  Users,
  Flame,
  Shield,
  CheckCircle2,
  X
} from 'lucide-react';

const JOURNEY_SCENES = [
  {
    step: '01',
    stage: 'The Sacred Seed',
    headline: 'Nurtured in Living Bio-Reserve Soil',
    copy: [
      'In the nutrient-dense black soils of Western Ghats micro-climates, wild herbs develop natural botanical defense flavonoids.',
      'We select non-hybrid, heritage seeds preserved across generations by indigenous farming families.',
      'No synthetic nitrogen, no hormonal stimulants—only composted cow dung and neem cake manure.'
    ],
    problem: 'Depleted corporate monoculture soils',
    answer: 'Living bio-dynamic Western Ghats reserves',
    src: '/references/journey/journey-01-seed.webp',
    icon: Sprout
  },
  {
    step: '02',
    stage: 'The Monsoon Growth',
    headline: 'Drinking from Cloudburst Monsoons',
    copy: [
      'As the South-West monsoon sweeps through Kerala and Karnataka, our medicinal plants drink rain-fed waters rich in airborne nitrogen.',
      'Bhringraj leaves thicken; Amla fruits swell under dense forest canopies without artificial irrigation pipes.',
      'Sunlight and natural diurnal rhythms concentrate bio-active lipid fractions to their peak therapeutic density.'
    ],
    problem: 'Chemical pesticide runoff & chlorine water',
    answer: '100% Rain-fed Vedic monsoon polyculture',
    src: '/references/journey/journey-02-growth.webp',
    icon: Droplets
  },
  {
    step: '03',
    stage: 'The Dawn Harvest',
    headline: 'Reverent Hands at Morning First Light',
    copy: [
      'Wild herbs are gathered between 5:00 AM and 7:30 AM before harsh solar UV rays oxidize sensitive volatile terpene compounds.',
      'Our alliance directly supports 740+ partner family holdings, paying fair-trade premiums well above commodity market rates.',
      'Every basket is inspected, rinsed in spring water, and shade-dried to retain whole chlorophyll vitality.'
    ],
    stat: '740+ Partner Family Farmers',
    problem: 'Exploitative middlemen & stale storage',
    answer: 'Direct dawn-harvest fair-trade trade agreements',
    src: '/references/journey/journey-03-harvest.webp',
    icon: Users
  },
  {
    step: '04',
    stage: 'The Wood Pressing',
    headline: 'Zero Solvents. Zero Heat Violence.',
    copy: [
      'Traditional heavy industrial expellers reach temperatures exceeding 130°C, destroying essential fatty acid chains and vitamins.',
      'Satvam utilizes hand-carved Vaagai wood mortar pestles (Ghanis) that rotate at a meditative 14 revolutions per minute.',
      'Friction temperature never exceeds 38°C, preserving 100% alive, un-denatured herbal bio-lipids.'
    ],
    callout: 'No Heat · No Hexane · No Mineral Additives',
    problem: 'High-heat hexane solvent stripping',
    answer: 'Slow vaagai-wood cold pressing under 38°C',
    src: '/references/journey/journey-04-extract.webp',
    icon: Flame
  },
  {
    step: '05',
    stage: 'The Amber Flacon',
    headline: 'Preserved in Protective Amber Glass',
    copy: [
      'Active plant lipids degrade rapidly when exposed to ambient daylight and porous plastic polymers.',
      'Satvam oils are sealed in heavy pharmaceutical amber glass that absorbs 99% of damaging UV wavelengths.',
      'Poured unhurried, hand-numbered, and shipped directly to nourish your hair roots from India’s deepest botanical lineage.'
    ],
    problem: 'Clear single-use plastic leaching',
    answer: 'Heavy UV-protective pharmaceutical amber glass',
    src: '/references/journey/journey-05-bottle.webp',
    icon: Shield
  }
];

export default function Journey() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);

  // Mark skipped so next visit goes straight to home/shop
  const handleSkip = () => {
    sessionStorage.setItem('satvam_skipped', '1');
    localStorage.setItem('satvam_skip_journey', '1');
    navigate('/shop');
  };

  const handleEnterAtelier = () => {
    sessionStorage.setItem('satvam_skipped', '1');
    localStorage.setItem('satvam_skip_journey', '1');
    navigate('/shop');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#FAF7F0] text-[#2D3E2F] relative selection:bg-[#C9A961] selection:text-[#2D3E2F]">
      {/* Top Persistent Bar */}
      <div className="fixed top-0 inset-x-0 z-40 px-6 py-5 flex items-center justify-between backdrop-blur-md bg-[#FAF7F0]/80 border-b border-[#6B5B45]/15">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-[#C9A961]" />
          <span className="font-display font-medium text-lg tracking-wider text-[#2D3E2F]">
            The 5-Stage Seed-to-Bottle Journey
          </span>
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="btn-ghost py-1.5 px-4 text-xs font-mono tracking-widest uppercase flex items-center gap-1.5 hover:border-[#C9A961]"
        >
          <span>Skip [ESC]</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Step Dots on Desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {JOURNEY_SCENES.map((s, idx) => (
          <a
            key={idx}
            href={`#scene-${s.step}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentScene === idx
                ? 'bg-[#C9A961] scale-150 shadow-xs'
                : 'bg-[#6B5B45]/30 hover:bg-[#6B5B45]/70'
            }`}
            title={`Stage ${s.step}: ${s.stage}`}
          />
        ))}
      </div>

      {/* 5 Full-Viewport Scroll Scenes */}
      <div className="pt-20">
        {JOURNEY_SCENES.map((scene, idx) => {
          const Icon = scene.icon;
          const isFinal = idx === JOURNEY_SCENES.length - 1;

          return (
            <section
              id={`scene-${scene.step}`}
              key={scene.step}
              onMouseEnter={() => setCurrentScene(idx)}
              className="relative min-h-screen w-full flex flex-col justify-center py-20 px-6 lg:px-16 border-b border-[#6B5B45]/15 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Visual Image Card with Warm Parallax Frame */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="relative rounded-3xl p-3 sm:p-4 bg-[#F5EFE3] border border-[#6B5B45]/20 shadow-lifted">
                    <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#FAF7F0] relative">
                      <SafeImage
                        src={scene.src}
                        alt={scene.stage}
                        className="w-full h-full object-cover filter saturate-[0.95]"
                        fallbackText={`Stage ${scene.step}: ${scene.stage}`}
                      />
                      {/* Gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E2F]/40 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Badge on Visual */}
                      <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#FAF7F0]/90 backdrop-blur-xs border border-[#6B5B45]/20 text-xs font-mono text-[#2D3E2F]">
                        ✦ Stage {scene.step} / 05 · {scene.stage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Copy & Problem-Answer Chips */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 text-[#6B5B45] flex items-center justify-center font-mono font-bold text-sm">
                      {scene.step}
                    </div>
                    <span className="text-eyebrow text-[#C9A961] font-bold">
                      {scene.stage}
                    </span>
                  </div>

                  <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#2D3E2F] leading-tight">
                    {scene.headline}
                  </h2>

                  {/* 3 Lines of Narrative Copy */}
                  <div className="space-y-3 text-sm sm:text-base text-[#2D3E2F]/85 leading-relaxed">
                    {scene.copy.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Highlight Stat / Callout if present */}
                  {scene.stat && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5EFE3] border border-[#C9A961]/40 text-xs font-semibold text-[#2D3E2F]">
                      <Icon className="w-4 h-4 text-[#C9A961]" />
                      <span>{scene.stat}</span>
                    </div>
                  )}

                  {scene.callout && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5EFE3] border border-[#C9A961]/40 text-xs font-semibold text-[#2D3E2F]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{scene.callout}</span>
                    </div>
                  )}

                  {/* Problem -> Our Answer Chip Pair (Crucial Requirement) */}
                  <div className="pt-4 border-t border-[#6B5B45]/15">
                    <span className="font-mono text-[10px] uppercase text-[#6B5B45] tracking-wider block mb-2">
                      Industry Contrast & Satvam Discipline
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* Problem Chip */}
                      <div className="px-3.5 py-2 rounded-xl bg-[#A8453D]/10 border border-[#A8453D]/30 text-xs text-[#A8453D] flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase bg-[#A8453D] text-white px-1.5 py-0.5 rounded">
                          Problem
                        </span>
                        <span>{scene.problem}</span>
                      </div>

                      <span className="hidden sm:inline text-[#C9A961] font-bold text-sm">→</span>

                      {/* Answer Chip */}
                      <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase bg-emerald-700 text-white px-1.5 py-0.5 rounded">
                          Our Answer
                        </span>
                        <span>{scene.answer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Scene CTA to enter /shop */}
                  {isFinal && (
                    <div className="pt-6 animate-fadeIn">
                      <button
                        type="button"
                        onClick={handleEnterAtelier}
                        className="btn-primary py-4 px-10 text-base font-semibold flex items-center gap-3 shadow-lifted"
                      >
                        <span>Enter the Atelier Catalog</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
