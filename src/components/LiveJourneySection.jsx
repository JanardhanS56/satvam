import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../lib/images';
import {
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sprout,
  Droplets,
  Users,
  Flame,
  Shield,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const JOURNEY_SCENES = [
  {
    step: '01',
    tab: 'Seed & Soil',
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
    tab: 'Monsoon Growth',
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
    tab: 'Dawn Harvest',
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
    tab: 'Wood Pressing',
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
    tab: 'Amber Flacon',
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

export default function LiveJourneySection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const STAGE_DURATION_MS = 5000;
  const TICK_INTERVAL_MS = 50;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((c) => (c + 1) % JOURNEY_SCENES.length);
          return 0;
        }
        return prev + (TICK_INTERVAL_MS / STAGE_DURATION_MS) * 100;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, currentIdx]);

  const selectStage = (idx) => {
    setCurrentIdx(idx);
    setProgress(0);
  };

  const nextStage = () => {
    setCurrentIdx((prev) => (prev + 1) % JOURNEY_SCENES.length);
    setProgress(0);
  };

  const prevStage = () => {
    setCurrentIdx((prev) => (prev - 1 + JOURNEY_SCENES.length) % JOURNEY_SCENES.length);
    setProgress(0);
  };

  const active = JOURNEY_SCENES[currentIdx];
  const IconComponent = active.icon;

  return (
    <section
      id="journey-section"
      className="w-full bg-[#FAF7F0] py-16 sm:py-24 px-6 border-t border-[#6B5B45]/15"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFE3] text-[#6B5B45] text-xs font-mono uppercase tracking-widest border border-[#6B5B45]/15 mb-3">
              <Compass className="w-3.5 h-3.5 text-[#C9A961]" /> Automated Lineage Chronicle
            </div>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#2D3E2F] leading-tight">
              The 5-Stage Seed-to-Bottle Journey
            </h2>
            <p className="text-sm sm:text-base text-[#6B5B45] mt-2 max-w-xl">
              Witness the untouched path of our sacred cold-pressed botanicals from Indian soil to your crown.
            </p>
          </div>

          {/* Autoplay status & Manual Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#6B5B45]/20 text-xs font-mono text-[#2D3E2F] hover:bg-[#F5EFE3] transition-colors shadow-xs"
              title={isPaused ? 'Resume auto-progression' : 'Pause auto-progression'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-700 fill-current" />
                  <span>Resume Auto-Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C9A961]" />
                  <span>Auto-Advancing</span>
                </>
              )}
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevStage}
                className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#6B5B45]/20 flex items-center justify-center text-[#2D3E2F] hover:bg-[#F5EFE3] transition-colors"
                aria-label="Previous stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextStage}
                className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#6B5B45]/20 flex items-center justify-center text-[#2D3E2F] hover:bg-[#F5EFE3] transition-colors"
                aria-label="Next stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Step Stage Selectors with Active Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-8">
          {JOURNEY_SCENES.map((scene, idx) => {
            const isCurrent = currentIdx === idx;
            return (
              <button
                key={scene.step}
                type="button"
                onClick={() => selectStage(idx)}
                className={`relative text-left p-3.5 rounded-2xl border transition-all overflow-hidden ${
                  isCurrent
                    ? 'bg-[#2D3E2F] text-[#FAF7F0] border-[#2D3E2F] shadow-soft scale-[1.02]'
                    : 'bg-[#FFFFFF] text-[#2D3E2F] border-[#6B5B45]/15 hover:border-[#C9A961]/50 hover:bg-[#F5EFE3]/50'
                }`}
              >
                {/* Progress bar inside active button */}
                {isCurrent && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-[#C9A961] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isCurrent ? 'text-[#C9A961]' : 'text-[#6B5B45]'
                    }`}
                  >
                    {scene.step}
                  </span>
                  <span className="text-[10px] font-mono opacity-60">
                    Stage {idx + 1}/5
                  </span>
                </div>
                <div className="font-display font-medium text-xs sm:text-sm truncate">
                  {scene.tab}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Stage Display Container */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/20 shadow-soft overflow-hidden p-6 sm:p-10 lg:p-12 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Stage Image with Subtle Ken Burns Zoom */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#6B5B45]/15 shadow-inner">
              <SafeImage
                key={active.src}
                src={active.src}
                alt={active.headline}
                className="w-full h-full object-cover filter saturate-[0.95] transition-all duration-700 ease-out animate-fadeIn"
                fallbackText={active.stage}
              />

              {/* Stage Watermark Pill */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#FAF7F0]/90 backdrop-blur-xs border border-[#6B5B45]/20 shadow-xs flex items-center gap-2">
                <IconComponent className="w-4 h-4 text-[#2D3E2F]" />
                <span className="font-mono text-xs font-bold text-[#2D3E2F] tracking-wide">
                  STAGE {active.step} · {active.stage.toUpperCase()}
                </span>
              </div>

              {active.stat && (
                <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#2D3E2F]/90 backdrop-blur-xs border border-[#C9A961]/40 text-[#FAF7F0] font-mono text-xs shadow-md">
                  ✦ {active.stat}
                </div>
              )}
            </div>

            {/* Right: Narrative, Contrast Chips, and Direct CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C9A961] uppercase tracking-widest font-semibold mb-2">
                  <span>Satvam Botanical Protocol</span>
                  <span>·</span>
                  <span>Zero Solvents</span>
                </div>
                <h3 className="font-display font-medium text-2xl sm:text-4xl text-[#2D3E2F] leading-tight">
                  {active.headline}
                </h3>
              </div>

              {/* 3 Copy Points */}
              <div className="space-y-2.5 text-xs sm:text-sm text-[#2D3E2F]/85 leading-relaxed">
                {active.copy.map((p, i) => (
                  <p key={i} className="flex items-start gap-2.5">
                    <span className="text-[#C9A961] mt-0.5 select-none font-bold">›</span>
                    <span>{p}</span>
                  </p>
                ))}
              </div>

              {/* Problem vs Our Answer Chip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#A8453D]/5 border border-[#A8453D]/20">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#A8453D] font-bold mb-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Industry Short-Cut
                  </div>
                  <p className="text-xs text-[#2D3E2F]/80">
                    {active.problem}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> The Satvam Way
                  </div>
                  <p className="text-xs text-[#2D3E2F]/80">
                    {active.answer}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/shop"
                  className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-soft hover:shadow-lifted"
                >
                  <span>Explore Harvest Formulas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="btn-ghost w-full sm:w-auto px-6 py-3 text-sm font-medium tracking-wide text-center"
                >
                  Inspect All 20 Botanicals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

