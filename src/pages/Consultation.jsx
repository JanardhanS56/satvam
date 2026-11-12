import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Droplets,
  HeartPulse,
  Leaf,
  CalendarCheck
} from 'lucide-react';
import { consultVaidyaAI } from '../lib/groq';
import productsData from '../data/products.json';
import { SafeImage } from '../lib/images';
import { useCartStore } from '../stores/cart';
import { getHerbBadge } from '../lib/herbs';

const HAIR_TYPES = [
  { label: 'Straight & Fine', value: 'Straight & Fine', desc: 'Prone to limp roots and sebum accumulation' },
  { label: 'Wavy & Balanced', value: 'Wavy & Balanced', desc: 'Needs gentle hydration without weight' },
  { label: 'Curly & Coarse', value: 'Curly & Coarse', desc: 'Requires dense lipid moisture and cuticle sealing' },
  { label: 'Dry & Brittle', value: 'Dry & Brittle', desc: 'Weakened keratin bonds, splits easily' },
  { label: 'Oily Scalp / Dry Ends', value: 'Oily Scalp / Dry Ends', desc: 'Mixed dosha with clogged roots and thirsty shafts' }
];

const HAIR_PROBLEMS = [
  { label: 'Hair Fall & Breakage', value: 'Hair Fall & Breakage', desc: 'Excess shedding in shower, brushing, or pillow' },
  { label: 'Dandruff & Flaky Scalp', value: 'Dandruff & Flaky Scalp', desc: 'Fungal overgrowth, persistent white or greasy flakes' },
  { label: 'Itchy & Heated Scalp', value: 'Itchy & Heated Scalp', desc: 'Pitta-driven redness, sweating, and burning sensations' },
  { label: 'Thinning Crown & Hairline', value: 'Thinning Crown & Hairline', desc: 'Widening parting or receding frontal follicles' },
  { label: 'Extreme Frizz & Dryness', value: 'Extreme Frizz & Dryness', desc: 'Rough texture, lack of gloss, unmanageable frizz' },
  { label: 'Premature Greying', value: 'Premature Greying', desc: 'Melanin loss in mid-lengths or roots' }
];

const DURATIONS = [
  { label: 'Under 1 Month', value: 'Under 1 Month', desc: 'Acute or seasonal trigger' },
  { label: '1 to 6 Months', value: '1 to 6 Months', desc: 'Developing pattern requiring root intervention' },
  { label: '6 to 12 Months', value: '6 to 12 Months', desc: 'Persistent condition affecting follicle cycles' },
  { label: 'Over 1 Year (Chronic)', value: 'Over 1 Year', desc: 'Deep-seated dosha imbalance needing steady cellular renewal' }
];

const ALLERGY_OPTIONS = [
  { label: 'No Known Allergies', value: 'None' },
  { label: 'Sensitive to Camphor or Mint', value: 'Avoid Camphor/Mint' },
  { label: 'Sensitive to Nut Oils (Almond/Argan)', value: 'Avoid Nut Oils' },
  { label: 'Sensitive to Strong Aromas', value: 'Prefer Mild Aromatics' },
  { label: 'Prefer Lightweight / Fast-Absorbing', value: 'Lightweight Only' }
];

export default function Consultation() {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [hairType, setHairType] = useState('Curly & Coarse');
  const [hairProblem, setHairProblem] = useState('Hair Fall & Breakage');
  const [duration, setDuration] = useState('1 to 6 Months');
  const [allergy, setAllergy] = useState('None');
  const [userScenario, setUserScenario] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const query = {
      hairType,
      hairProblem,
      duration,
      allergies: allergy,
      userScenario: userScenario.trim() || `Experiencing ${hairProblem} on ${hairType} hair for ${duration}.`
    };

    const result = await consultVaidyaAI(query);
    setPrescription(result);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setPrescription(null);
    setJustAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find the exact product from our local catalog
  const matchedProduct = prescription
    ? (productsData.products || []).find((p) => p.slug === prescription.productSlug) ||
      productsData.products[0]
    : null;

  const handleAddToCart = () => {
    if (!matchedProduct) return;
    addItem(matchedProduct, 1);
    openCart();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#2D3E2F] py-12 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B44A]/15 border border-[#C9A961]/40 text-[#6B5B45] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" /> Vedic Intelligence · Groq Powered
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2D3E2F]">
            Your Tailored Ayurvedic Prescription
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6B5B45] leading-relaxed">
            Answer 4 diagnostic questions to consult our Ayurvedic Vaidya intelligence. Receive a single, clinically matched whole-plant formulation suited to your exact scalp dosha.
          </p>
        </div>

        {!prescription ? (
          /* Diagnostic Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/20 p-6 sm:p-10 lg:p-12 shadow-soft space-y-10"
          >
            {/* Step 1: Hair Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#2D3E2F] text-[#FAF7F0] text-xs font-mono font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                    What is your natural hair and scalp type?
                  </h3>
                  <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                    Establishes your baseline lipid balance and cuticle density
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {HAIR_TYPES.map((t) => {
                  const isSelected = hairType === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setHairType(t.value)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#F5EFE3] border-[#C9A961] text-[#2D3E2F] ring-1 ring-[#C9A961] shadow-xs'
                          : 'bg-[#FAF7F0]/60 border-[#6B5B45]/15 text-[#6B5B45] hover:text-[#2D3E2F] hover:border-[#6B5B45]/30'
                      }`}
                    >
                      <p className="font-display font-semibold text-sm text-[#2D3E2F]">{t.label}</p>
                      <p className="text-xs text-[#6B5B45] mt-1 leading-snug">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Primary Problem */}
            <div className="space-y-4 pt-6 border-t border-[#6B5B45]/15">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#2D3E2F] text-[#FAF7F0] text-xs font-mono font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                    What is your most urgent hair or scalp problem?
                  </h3>
                  <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                    Identifies which botanical bio-actives must reach your hair papilla
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {HAIR_PROBLEMS.map((p) => {
                  const isSelected = hairProblem === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setHairProblem(p.value)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#F5EFE3] border-[#C9A961] text-[#2D3E2F] ring-1 ring-[#C9A961] shadow-xs'
                          : 'bg-[#FAF7F0]/60 border-[#6B5B45]/15 text-[#6B5B45] hover:text-[#2D3E2F] hover:border-[#6B5B45]/30'
                      }`}
                    >
                      <p className="font-display font-semibold text-sm text-[#2D3E2F]">{p.label}</p>
                      <p className="text-xs text-[#6B5B45] mt-1 leading-snug">{p.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Duration */}
            <div className="space-y-4 pt-6 border-t border-[#6B5B45]/15">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#2D3E2F] text-[#FAF7F0] text-xs font-mono font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                    How long have you been experiencing this?
                  </h3>
                  <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                    Determines oil viscosity, maceration strength, and application rhythm
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DURATIONS.map((d) => {
                  const isSelected = duration === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDuration(d.value)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#F5EFE3] border-[#C9A961] text-[#2D3E2F] ring-1 ring-[#C9A961] shadow-xs'
                          : 'bg-[#FAF7F0]/60 border-[#6B5B45]/15 text-[#6B5B45] hover:text-[#2D3E2F] hover:border-[#6B5B45]/30'
                      }`}
                    >
                      <p className="font-display font-semibold text-sm text-[#2D3E2F]">{d.label}</p>
                      <p className="text-xs text-[#6B5B45] mt-1 leading-snug">{d.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Allergies & Sensitivities */}
            <div className="space-y-4 pt-6 border-t border-[#6B5B45]/15">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#2D3E2F] text-[#FAF7F0] text-xs font-mono font-bold flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                    Any botanical allergies, sensitivities, or oil preferences?
                  </h3>
                  <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                    Ensures hypoallergenic tolerance and optimal scalp comfort
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALLERGY_OPTIONS.map((a) => {
                  const isSelected = allergy === a.value;
                  return (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setAllergy(a.value)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#F5EFE3] border-[#C9A961] text-[#2D3E2F] ring-1 ring-[#C9A961] shadow-xs'
                          : 'bg-[#FAF7F0]/60 border-[#6B5B45]/15 text-[#6B5B45] hover:text-[#2D3E2F] hover:border-[#6B5B45]/30'
                      }`}
                    >
                      <p className="font-display font-medium text-xs sm:text-sm text-[#2D3E2F]">{a.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Describe Your Scenario (Free Text) */}
            <div className="space-y-3 pt-6 border-t border-[#6B5B45]/15">
              <label htmlFor="userScenario" className="block">
                <span className="font-display font-medium text-lg text-[#2D3E2F]">
                  5. Describe your scenario in your own words (Optional)
                </span>
                <span className="block font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45] mt-0.5">
                  Mention work stress, water quality, weather shifts, gym routine, or recent hormonal changes
                </span>
              </label>
              <textarea
                id="userScenario"
                rows={3}
                value={userScenario}
                onChange={(e) => setUserScenario(e.target.value)}
                placeholder="e.g. Scalp gets very itchy after workouts; noticing thinning near temples over the last 3 months..."
                className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-2xl p-4 text-sm text-[#2D3E2F] placeholder-[#6B5B45]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A961] transition-all"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-[#6B5B45]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#6B5B45]">
                <ShieldCheck className="w-4 h-4 text-[#C9A961]" />
                <span>Private & evaluated via Satvam's clinical botanical formulary</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary py-4 px-9 text-sm font-semibold flex items-center justify-center gap-2.5 shadow-lifted w-full sm:w-auto disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#2D3E2F]" />
                    <span>Analyzing Dosha & Formulating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Tailored Prescription</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Tailored Prescription Output */
          <div className="space-y-10 animate-fadeIn">
            {/* Prescription Top Banner */}
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#C9A961]/40 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ayurvedic Diagnosis Completed
                </div>
                <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#2D3E2F]">
                  {prescription.prescriptionTitle || 'Your Tailored Ayurvedic Prescription'}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-semibold text-xs text-[#6B5B45]">Identified Scalp Dosha:</span>
                  <span className="px-3 py-0.5 rounded-full bg-[#F5EFE3] text-[#2D3E2F] font-mono text-xs font-semibold border border-[#C9A961]/50">
                    ✦ {prescription.dosha}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetake}
                className="btn-ghost py-2.5 px-5 text-xs font-medium flex items-center gap-2 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Consult Another Scenario
              </button>
            </div>

            {/* The Single Best Recommended Product Hero Card */}
            {matchedProduct && (
              <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#C9A961] p-6 sm:p-10 shadow-lifted relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A961] text-[#2D3E2F] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-xs">
                  ★ Single Best Match
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Bottle Visual */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#FAF7F0] rounded-2xl p-6 border border-[#6B5B45]/10">
                    <div className="w-56 h-64 flex items-center justify-center">
                      <SafeImage
                        src={matchedProduct.image || `references/products/${matchedProduct.slug}-bottle.webp`}
                        alt={matchedProduct.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                        fallbackText={matchedProduct.name}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-[#6B5B45] tracking-widest uppercase mt-3">
                      100ml · Amber Glass Flacon · Cold-Pressed
                    </span>
                  </div>

                  {/* Product Details & Actions */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#C9A961] font-semibold">
                          Prescribed Elixir
                        </span>
                        <span className="text-xs text-[#6B5B45]">· ★ {matchedProduct.rating || 4.9} ({matchedProduct.reviewCount || 900}+ reviews)</span>
                      </div>

                      <h3 className="font-display font-medium text-3xl sm:text-4xl text-[#2D3E2F]">
                        {matchedProduct.name}
                      </h3>
                      <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45] mt-1">
                        {matchedProduct.subtitle || matchedProduct.tagline}
                      </p>
                      <p className="text-sm text-[#2D3E2F] mt-3 leading-relaxed">
                        {matchedProduct.description}
                      </p>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-4 border-t border-[#6B5B45]/15 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-[#6B5B45] block">Prescribed Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl font-semibold text-[#2D3E2F]">
                            ₹{matchedProduct.price}
                          </span>
                          {matchedProduct.originalPrice && (
                            <span className="text-sm text-[#6B5B45]/50 line-through">
                              ₹{matchedProduct.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/products#${matchedProduct.slug}`}
                          className="btn-ghost py-3.5 px-5 text-xs font-medium"
                        >
                          View Formula Details
                        </Link>

                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className="btn-primary py-3.5 px-7 text-xs font-semibold flex items-center gap-2 shadow-soft hover:shadow-lifted"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{justAdded ? 'Prescription Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why This Suits You (AI Vaidya Rationale) */}
                <div className="mt-8 pt-8 border-t border-[#6B5B45]/15 space-y-3">
                  <div className="flex items-center gap-2 text-[#2D3E2F]">
                    <HeartPulse className="w-5 h-5 text-[#C9A961]" />
                    <h4 className="font-display font-medium text-xl">
                      Why This Elixir Suits Your Scenario
                    </h4>
                  </div>
                  <div className="bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#C9A961]/30 text-sm text-[#2D3E2F] leading-relaxed">
                    {prescription.rationale}
                  </div>
                </div>

                {/* How to Use It (Custom Application Protocol) */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#2D3E2F]">
                    <Droplets className="w-5 h-5 text-[#C9A961]" />
                    <h4 className="font-display font-medium text-xl">
                      Your Tailored Application Protocol
                    </h4>
                  </div>
                  <div className="bg-[#F5EFE3] p-5 sm:p-6 rounded-2xl border border-[#6B5B45]/15 text-sm text-[#2D3E2F] leading-relaxed">
                    {prescription.howToUse}
                  </div>
                </div>

                {/* Key Botanicals inside this bottle */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#2D3E2F]">
                    <Leaf className="w-5 h-5 text-[#C9A961]" />
                    <h4 className="font-display font-medium text-xl">
                      Active Botanicals in Your Formulation
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {(matchedProduct.ingredients || []).map((ing, i) => {
                      const badge = getHerbBadge(ing.name);
                      return (
                        <div
                          key={i}
                          className="bg-[#FAF7F0] p-3 rounded-xl border border-[#6B5B45]/15 text-center flex flex-col items-center justify-center"
                        >
                          <span className="text-xl select-none mb-1">{badge.emoji}</span>
                          <span className="font-display font-semibold text-xs text-[#2D3E2F] truncate w-full">
                            {ing.name}
                          </span>
                          <span className="font-mono text-[9px] text-[#6B5B45] mt-0.5 truncate w-full">
                            {ing.role || ing.sanskrit || 'Active Extract'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expected Clinical Milestones */}
                {prescription.expectedMilestones && prescription.expectedMilestones.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-[#6B5B45]/15 space-y-4">
                    <div className="flex items-center gap-2 text-[#2D3E2F]">
                      <CalendarCheck className="w-5 h-5 text-[#C9A961]" />
                      <h4 className="font-display font-medium text-xl">
                        Expected Clinical Progression
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {prescription.expectedMilestones.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#6B5B45]/15 flex flex-col justify-between"
                        >
                          <span className="font-mono text-xs font-bold text-[#C9A961] uppercase tracking-wider mb-1">
                            {typeof m.day === 'number' ? `Day ${m.day}` : m.day}
                          </span>
                          <p className="text-xs text-[#2D3E2F] leading-relaxed">
                            {m.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
