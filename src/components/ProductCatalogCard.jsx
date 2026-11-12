import React, { useState } from 'react';
import { Star, ArrowUpRight, Sparkles } from 'lucide-react';
import { SafeImage } from '../lib/images';
import { getHerbBadge } from '../lib/herbs';
import { useProfileStore } from '../stores/profile';
import { useUIStore } from '../stores/ui';

// Coordinate layouts for floating ingredient bubbles
const BUBBLE_POSITIONS = [
  'top-3 left-3',
  'top-3 right-3',
  'bottom-12 left-3',
  'bottom-12 right-3',
  'bottom-2 left-1/2 -translate-x-1/2'
];

export default function ProductCatalogCard({ product, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const favorites = useProfileStore((state) => state.favorites);
  const toggleFavorite = useProfileStore((state) => state.toggleFavorite);
  const showToast = useUIStore((state) => state.showToast);

  const isFavorite = favorites.includes(product.slug);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.slug);
    if (!isFavorite) {
      showToast(`Added ${product.name} to Favourites`, 'favorite');
    } else {
      showToast(`Removed ${product.name} from Favourites`, 'info');
    }
  };

  // Extract top 5 key ingredients for the floating preview bubbles
  const previewIngredients = (product.ingredients || []).slice(0, 5);

  const savePercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : (typeof product.discount === 'number' ? product.discount : 0);

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group satvam-card relative bg-[#FFFFFF] rounded-2xl p-5 flex flex-col justify-between cursor-pointer border border-[#6B5B45]/15 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted overflow-hidden"
    >
      {/* Target Gender Tag */}
      {product.targetGender && product.targetGender !== 'all' && (
        <span className="absolute top-4 left-4 z-20 px-2.5 py-0.5 bg-[#F5EFE3] text-[#6B5B45] font-mono text-[10px] uppercase tracking-wider rounded-full border border-[#6B5B45]/15">
          {product.targetGender === 'male' ? 'For Men' : 'For Women'}
        </span>
      )}

      {/* Top Right: Concern Tag + Star Favourite Button */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {product.concerns && product.concerns.length > 0 && (
          <span className="px-2 py-0.5 bg-[#FAF7F0] text-[#6B5B45]/80 font-mono text-[9px] uppercase tracking-wider rounded-full border border-[#6B5B45]/10">
            {product.concerns[0]}
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border shadow-xs hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B44A] ${
            isFavorite
              ? 'bg-[#FAF7F0] border-[#E8B44A] shadow-soft ring-1 ring-[#E8B44A]/50'
              : 'bg-[#FAF7F0]/90 backdrop-blur-xs border-[#6B5B45]/20 hover:border-[#E8B44A]'
          }`}
          aria-label={isFavorite ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
          title={isFavorite ? 'In your Favourites' : 'Add to Favourites'}
        >
          <Star
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite
                ? 'fill-[#E8B44A] stroke-[#E8B44A] filter drop-shadow-xs'
                : 'stroke-[#E8B44A] fill-transparent hover:fill-[#E8B44A]/30'
            }`}
          />
        </button>
      </div>

      {/* Main Image Container — Always displays product bottle with floating ingredient bubbles on hover */}
      <div className="relative w-full h-64 my-2 flex items-center justify-center overflow-hidden rounded-xl bg-[#F5EFE3]/40 p-4">
        {/* Main Product Bottle (Always visible, does not disappear) */}
        <div className="relative w-full h-full flex items-center justify-center p-2 transition-transform duration-300 ease-out group-hover:scale-105">
          <SafeImage
            src={product.image || `references/products/${product.slug}-bottle.webp`}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-300"
            fallbackText={product.name}
          />
        </div>

        {/* Floating Ingredient Bubbles (Pop out on hover) */}
        <div className="absolute inset-0 pointer-events-none p-2 overflow-hidden">
          {previewIngredients.map((ing, i) => {
            const badge = getHerbBadge(ing.name);
            const posClass = BUBBLE_POSITIONS[i % BUBBLE_POSITIONS.length];
            const delays = ['delay-0', 'delay-75', 'delay-100', 'delay-150', 'delay-200'];

            return (
              <div
                key={i}
                className={`absolute z-30 ${posClass} transition-all duration-300 ease-out transform ${delays[i % delays.length]} ${
                  isHovered
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 translate-y-2'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F0]/95 backdrop-blur-md border border-[#C9A961]/60 shadow-md text-[#2D3E2F]">
                  <span className="text-sm select-none">{badge.emoji}</span>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-semibold text-[11px] leading-tight text-[#2D3E2F]">
                      {ing.name}
                    </span>
                    <span className="font-mono text-[8px] text-[#6B5B45] leading-tight">
                      {ing.percentage ? `${ing.percentage}% · ` : ''}{ing.sanskritName || badge.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Click Hint Overlay */}
        <div
          className={`absolute bottom-1 inset-x-0 mx-auto text-center pointer-events-none transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#6B5B45] bg-[#FAF7F0]/90 px-2 py-0.5 rounded-full border border-[#6B5B45]/15 backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 text-[#C9A961]" /> Click to Enlarge & Break Down
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 border-t border-[#6B5B45]/10 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-[#6B5B45]">
            <div className="flex items-center text-[#E8B44A]">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="font-semibold text-[#2D3E2F]">{product.rating || 4.9}</span>
            <span className="text-[#6B5B45]/60">({product.reviewCount || 380})</span>
          </div>

          {/* Name with Gold Underline on Hover */}
          <div className="relative inline-block">
            <h3 className="font-display font-medium text-lg sm:text-xl text-[#2D3E2F] group-hover:-translate-y-0.5 transition-transform duration-200">
              {product.name}
            </h3>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A961] transition-all duration-300 group-hover:w-full" />
          </div>

          <p className="font-eyebrow text-[11px] tracking-wider uppercase text-[#6B5B45] mt-1 line-clamp-1">
            {product.tagline || product.subtitle}
          </p>
        </div>

        {/* Bottom Price & Link */}
        <div className="mt-4 pt-2 border-t border-[#6B5B45]/10 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-semibold text-[#2D3E2F]">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#6B5B45]/50 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {savePercent > 0 && (
              <span className="text-[10px] font-mono font-semibold text-[#A8453D] bg-[#A8453D]/10 px-1.5 py-0.5 rounded-full">
                Save {savePercent}%
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-[#C9A961] group-hover:text-[#2D3E2F] flex items-center gap-0.5 transition-colors">
            Full Formula <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
