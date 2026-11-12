import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { useProfileStore } from '../stores/profile';
import { useUIStore } from '../stores/ui';
import IngredientOrbit from './IngredientOrbit';
import { getHerbBadge } from '../lib/herbs';

const SHOP_BUBBLE_POSITIONS = [
  'top-3 left-3',
  'top-3 right-3',
  'top-1/2 -translate-y-1/2 left-1',
  'top-1/2 -translate-y-1/2 right-1',
  'bottom-3 left-1/2 -translate-x-1/2'
];

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const favorites = useProfileStore((state) => state.favorites);
  const toggleFavorite = useProfileStore((state) => state.toggleFavorite);
  const showToast = useUIStore((state) => state.showToast);

  const isFavorite = favorites.includes(product.slug);

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt ±8 degrees
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const handleKnowMore = (e) => {
    e.stopPropagation();
    navigate(`/products#${product.slug}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.slug);
    if (!isFavorite) {
      showToast(`Added ${product.name} to Favourites`, 'favorite');
    } else {
      showToast(`Removed ${product.name} from Favourites`, 'info');
    }
  };

  // Top 5 ingredients for eye-catching floating bubbles on card hover
  const previewIngredients = (product.ingredients || []).slice(0, 5);

  // Calculate percentage savings if product is discounted
  const savePercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : (typeof product.discount === 'number' ? product.discount : 0);

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        handleMouseMove(e);
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      className="satvam-card relative bg-[#FFFFFF] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lifted overflow-hidden border border-[#6B5B45]/15"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      {/* Top Left: Bestseller Badge */}
      {product.bestSeller && (
        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#E8B44A] text-[#2D3E2F] font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-xs">
          ★ Bestseller
        </span>
      )}

      {/* Top Right Cluster: Gender Badge + Yellow Theme Star Favourite Button */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {product.targetGender && product.targetGender !== 'all' && (
          <span className="px-2.5 py-0.5 bg-[#F5EFE3] text-[#6B5B45] font-mono text-[10px] uppercase tracking-wider rounded-full border border-[#6B5B45]/15">
            {product.targetGender === 'male' ? 'For Men' : 'For Women'}
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border shadow-xs hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B44A] ${
            isFavorite
              ? 'bg-[#FAF7F0] border-[#E8B44A] shadow-soft ring-1 ring-[#E8B44A]/50'
              : 'bg-[#FAF7F0]/90 backdrop-blur-xs border-[#6B5B45]/20 hover:border-[#E8B44A]'
          }`}
          aria-label={isFavorite ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
          title={isFavorite ? 'In your Favourites (click to remove)' : 'Add to Favourites'}
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'fill-[#E8B44A] stroke-[#E8B44A] filter drop-shadow-xs'
                : 'stroke-[#E8B44A] fill-transparent hover:fill-[#E8B44A]/30'
            }`}
          />
        </button>
      </div>

      {/* Shatter-Orbit Interactive Bottle Center with Floating Circles on Hover */}
      <div className="my-2 relative z-10 w-full min-h-[320px] flex items-center justify-center overflow-visible">
        <IngredientOrbit product={product} />

        {/* Floating Enlarged Circular Ingredient Bubbles (Z-40: in front of bottle) */}
        <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
          {previewIngredients.map((ing, i) => {
            const badge = getHerbBadge(ing.name);
            const posClass = SHOP_BUBBLE_POSITIONS[i % SHOP_BUBBLE_POSITIONS.length];
            const delays = ['delay-0', 'delay-75', 'delay-100', 'delay-150', 'delay-200'];

            return (
              <div
                key={i}
                className={`absolute ${posClass} transition-all duration-300 ease-out transform ${delays[i % delays.length]} ${
                  isHovered
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-50 translate-y-3 pointer-events-none'
                }`}
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 aspect-square rounded-full bg-[#FAF7F0]/95 backdrop-blur-md border-2 border-[#C9A961] shadow-lifted flex flex-col items-center justify-center p-1 text-center group-hover:scale-105 transition-transform">
                  <span className="text-xl sm:text-2xl select-none leading-none filter drop-shadow-xs">
                    {badge.emoji}
                  </span>
                  <span className="font-display font-bold text-[10px] sm:text-[11px] text-[#2D3E2F] leading-tight mt-1 max-w-[62px] truncate px-0.5">
                    {ing.name}
                  </span>
                  <span className="font-mono text-[8px] text-[#C9A961] font-semibold leading-none mt-0.5">
                    {ing.percentage ? `${ing.percentage}%` : badge.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-4 border-t border-[#6B5B45]/10 flex flex-col flex-grow justify-between relative z-10">
        <div>
          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-2 text-xs text-[#6B5B45]">
            <div className="flex items-center text-[#E8B44A]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'stroke-current fill-none'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-[#2D3E2F]">
              {product.rating || 4.9}
            </span>
            <span className="text-[#6B5B45]/70">
              ({(product.reviewCount || 420).toLocaleString()} reviews)
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-display font-medium text-2xl text-[#2D3E2F] group-hover:text-[#6B5B45] transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-eyebrow text-xs tracking-wider uppercase text-[#6B5B45] mt-1 line-clamp-1">
            {product.tagline || product.subtitle}
          </p>

          {/* Price strip */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-[#2D3E2F]">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-[#6B5B45]/60 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {savePercent > 0 && (
              <span className="text-xs font-mono font-semibold text-[#A8453D] bg-[#A8453D]/10 px-2 py-0.5 rounded-full">
                Save {savePercent}%
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3 pt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-primary w-full py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to cart
          </button>
          <button
            type="button"
            onClick={handleKnowMore}
            className="btn-ghost w-full py-2.5 px-3 text-xs font-medium flex items-center justify-center gap-1 hover:border-[#C9A961]"
          >
            Know more <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
