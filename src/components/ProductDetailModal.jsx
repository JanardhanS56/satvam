import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Moon,
  Clock,
  Droplets,
  Hand,
  Sparkles,
  Scissors,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { SafeImage } from '../lib/images';

// Helper for Lucide icons in How to Use steps
const getStepIcon = (iconName) => {
  switch ((iconName || '').toLowerCase()) {
    case 'moon':
      return Moon;
    case 'hand':
      return Hand;
    case 'clock':
      return Clock;
    case 'droplets':
      return Droplets;
    case 'comb':
    case 'scissors':
      return Scissors;
    default:
      return Sparkles;
  }
};

export default function ProductDetailModal({ product, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, 1);
    openCart();
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'howToUse', label: 'How to Use' },
    { id: 'reviews', label: 'Reviews & Proof' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2D3E2F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF7F0] rounded-3xl border border-[#6B5B45]/20 shadow-2xl flex flex-col z-10 overflow-hidden animate-scaleUp">
        {/* Header Bar */}
        <div className="p-6 border-b border-[#6B5B45]/15 flex items-center justify-between bg-[#F5EFE3]/40">
          <div className="flex items-center gap-3">
            <span className="text-eyebrow text-[#C9A961] font-mono">
              Vedic Code: {product.slug}
            </span>
            {product.targetGender && product.targetGender !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#6B5B45] text-[10px] font-mono uppercase border border-[#6B5B45]/15">
                {product.targetGender === 'male' ? 'For Men' : 'For Women'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B5B45] hover:text-[#2D3E2F] rounded-full transition-colors focus:outline-none"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Title Bar & Tabs */}
        <div className="px-6 sm:px-8 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                id="product-modal-title"
                className="font-display font-medium text-3xl sm:text-4xl text-[#2D3E2F]"
              >
                {product.name}
              </h2>
              <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45] mt-1">
                {product.tagline || product.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-display text-2xl font-semibold text-[#2D3E2F]">
                  ₹{product.price}
                </div>
                <div className="text-xs text-[#6B5B45]/70 font-mono">
                  {product.size || '100ml'} Amber Flacon
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary py-2.5 px-5 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-[#6B5B45]/15 mt-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium tracking-wide relative whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                    : 'text-[#6B5B45] hover:text-[#2D3E2F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fadeIn">
              {/* Bottle & Herb Visual */}
              <div className="md:col-span-5 bg-[#F5EFE3] rounded-2xl p-6 flex flex-col items-center justify-center border border-[#6B5B45]/15">
                <div className="w-48 h-64 flex items-center justify-center">
                  <SafeImage
                    src={product.image || `references/products/${product.slug}-bottle.webp`}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    fallbackText={product.name}
                  />
                </div>
                <p className="mt-4 font-mono text-[11px] text-[#6B5B45] text-center">
                  Cold-Pressed in Vaagai Wood Ghani · 100% Active Lipids
                </p>
              </div>

              {/* Description & Chips */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="font-display font-medium text-lg text-[#2D3E2F] mb-2">
                    Ayurvedic Formulation Intent
                  </h4>
                  <p className="text-sm text-[#2D3E2F]/85 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Target Hair Types */}
                <div>
                  <h5 className="text-eyebrow text-[#6B5B45] mb-2">Ideal Hair Constitution</h5>
                  <div className="flex flex-wrap gap-2">
                    {(product.hairTypes || []).map((type, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#6B5B45]/20 text-xs text-[#2D3E2F] font-medium"
                      >
                        ✦ {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concerns Addressed */}
                <div>
                  <h5 className="text-eyebrow text-[#6B5B45] mb-2">Targeted Concerns</h5>
                  <div className="flex flex-wrap gap-2">
                    {(product.concerns || []).map((concern, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#C9A961]/15 text-[#2D3E2F] text-xs font-medium"
                      >
                        ✓ {concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#6B5B45]/15 flex items-center gap-3 text-xs text-[#6B5B45]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A961]" />
                  <span>FSSAI Compliant · Cruelty-Free · Dermatologist Tested in India</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h4 className="font-display font-medium text-xl text-[#2D3E2F] mb-1">
                  Sacred Botanical Ratios
                </h4>
                <p className="text-xs text-[#6B5B45]">
                  Every herb is documented in classical Ayurvedic pharmacopeia for synergistic root potency.
                </p>
              </div>

              {/* Ingredient Percentage Rows */}
              <div className="space-y-4">
                {(product.ingredients || []).map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#FFFFFF] rounded-xl border border-[#6B5B45]/15 shadow-xs"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <span className="font-display font-semibold text-base text-[#2D3E2F]">
                          {ing.name}
                        </span>
                        <span className="font-mono text-xs text-[#6B5B45] italic ml-2">
                          ({ing.sanskritName})
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#C9A961]">
                        {ing.percentage}%
                      </span>
                    </div>

                    {/* Percentage Progress Bar */}
                    <div className="w-full h-1.5 bg-[#F5EFE3] rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-[#C9A961] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(ing.percentage * 3, 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-[#6B5B45] leading-relaxed">
                      <span className="font-semibold text-[#2D3E2F]">Role: </span>
                      {ing.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Why This Herb Explainer */}
              {product.whyThisHerb && (
                <div className="p-6 rounded-2xl bg-[#F5EFE3] border border-[#6B5B45]/20">
                  <h5 className="font-display font-medium text-base text-[#2D3E2F] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A961]" /> The Formulator's Lineage Rationale
                  </h5>
                  <p className="text-sm text-[#2D3E2F]/85 leading-relaxed">
                    {product.whyThisHerb}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HOW TO USE */}
          {activeTab === 'howToUse' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h4 className="font-display font-medium text-xl text-[#2D3E2F] mb-1">
                  The Sacred 4-Step Scalp Ritual
                </h4>
                <p className="text-xs text-[#6B5B45]">
                  Follow this Vedic application cadence 2 to 3 times weekly for optimal dermal absorption.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(product.howToUse || []).map((stepItem, idx) => {
                  const StepIcon = getStepIcon(stepItem.icon);
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#6B5B45]/15 shadow-xs flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#C9A961]/15 text-[#6B5B45] flex items-center justify-center flex-shrink-0">
                        <StepIcon className="w-6 h-6 text-[#6B5B45]" />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[#C9A961] tracking-wider uppercase font-semibold">
                          Step 0{stepItem.step || idx + 1}
                        </span>
                        <h5 className="font-display font-medium text-lg text-[#2D3E2F] mt-0.5 mb-1.5">
                          {stepItem.title}
                        </h5>
                        <p className="text-xs text-[#6B5B45] leading-relaxed">
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#6B5B45]/15 text-xs text-[#6B5B45] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tip: For intense follicle re-energization, wrap scalp in a warm damp towel for 10 minutes following massage.</span>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS & PROOF */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Aggregate Header */}
              <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#6B5B45]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="font-display text-4xl font-bold text-[#2D3E2F]">
                    {product.rating || 4.9}
                  </div>
                  <div>
                    <div className="flex items-center text-[#E8B44A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#6B5B45] mt-0.5">
                      Based on {product.reviewCount || 420} verified customer evaluations
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#6B5B45] bg-[#F5EFE3] px-3 py-1.5 rounded-full border border-[#6B5B45]/15">
                  100% Genuine Patron Reviews
                </div>
              </div>

              {/* 3 Review Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(product.reviews || []).slice(0, 3).map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#FFFFFF] rounded-xl border border-[#6B5B45]/15 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center text-[#E8B44A] mb-2">
                        {[...Array(rev.stars || 5)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#2D3E2F] italic leading-relaxed">
                        "{rev.text}"
                      </p>
                    </div>
                    <p className="font-display font-medium text-xs text-[#6B5B45] mt-4">
                      — {rev.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Before / After Proof Pair */}
              <div>
                <h5 className="font-display font-medium text-lg text-[#2D3E2F] mb-1">
                  Documented Follicle Response
                </h5>
                <p className="text-xs text-[#6B5B45] mb-4">
                  Photographic clinical evaluation after 60 days of disciplined twice-weekly application.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#6B5B45]/15 text-center">
                    <div className="h-56 rounded-xl overflow-hidden bg-[#F5EFE3] flex items-center justify-center mb-3">
                      <SafeImage
                        src={product.beforeAfter?.before || `references/reviews/${product.slug}-before.webp`}
                        alt="Day 0 Baseline"
                        className="w-full h-full object-cover"
                        fallbackText="Day 0 Baseline"
                      />
                    </div>
                    <span className="font-mono text-xs uppercase font-bold text-[#A8453D] tracking-wider">
                      Day 0 — Baseline Thinning
                    </span>
                  </div>

                  {/* After */}
                  <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#6B5B45]/15 text-center">
                    <div className="h-56 rounded-xl overflow-hidden bg-[#F5EFE3] flex items-center justify-center mb-3">
                      <SafeImage
                        src={product.beforeAfter?.after || `references/reviews/${product.slug}-after.webp`}
                        alt="Day 60 Post-Ritual"
                        className="w-full h-full object-cover"
                        fallbackText="Day 60 Post-Ritual"
                      />
                    </div>
                    <span className="font-mono text-xs uppercase font-bold text-emerald-700 tracking-wider">
                      Day 60 — Restored Follicle Density
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
