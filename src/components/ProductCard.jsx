import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import IngredientOrbit from './IngredientOrbit';
import { getHerbBadge } from '../lib/herbs';

const SHOP_BUBBLE_POSITIONS = [
  'top-14 left-3',
  'top-14 right-3',
  'top-1/2 -translate-y-8 left-2',
  'top-1/2 -translate-y-8 right-2',
  'bottom-4 left-1/2 -translate-x-1/2'
];

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

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

  // Top 5 ingredients for eye-catching floating bubbles on card hover
  const previewIngredients = (product.ingredients || []).slice(0, 5);

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
      {/* Bestseller Badge */}
      {product.bestSeller && (
        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#E8B44A] text-[#2D3E2F] font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-xs">
          ★ Bestseller
        </span>
      )}

      {/* Target Gender Tag */}
      {product.targetGender && product.targetGender !== 'all' && (
        <span className="absolute top-4 right-4 z-20 px-2.5 py-0.5 bg-[#F5EFE3] text-[#6B5B45] font-mono text-[10px] uppercase tracking-wider rounded-full border border-[#6B5B45]/15">
          {product.targetGender === 'male' ? 'For Men' : 'For Women'}
        </span>
      )}

      {/* Floating Enlarged Ingredient Bubbles (Pop out prominently on hover) */}
      <div className="absolute inset-0 pointer-events-none p-3 overflow-hidden z-25">
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
                  : 'opacity-0 scale-75 translate-y-3'
              }`}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF7F0]/95 backdrop-blur-md border-2 border-[#C9A961]/70 shadow-lifted text-[#2D3E2F]">
                <span className="text-xl sm:text-2xl select-none filter drop-shadow-xs leading-none">
                  {badge.emoji}
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-display font-semibold text-xs sm:text-sm leading-tight text-[#2D3E2F]">
                    {ing.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#6B5B45] font-medium leading-tight mt-0.5">
                    {ing.percentage ? `${ing.percentage}% · ` : ''}{ing.sanskritName || badge.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shatter-Orbit Interactive Bottle Center */}
      <div className="my-2 relative z-10">
        <IngredientOrbit product={product} />
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
            {product.discount && (
              <span className="text-xs font-mono font-semibold text-[#A8453D] bg-[#A8453D]/10 px-2 py-0.5 rounded-full">
                Save {product.discount.percent}%
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
