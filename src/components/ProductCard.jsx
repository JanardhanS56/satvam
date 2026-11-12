import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import IngredientOrbit from './IngredientOrbit';

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

  // Top ingredients for edge drifting tags on card hover
  const driftIngredients = (product.ingredients || []).slice(0, 3);

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

      {/* Edge-Drift Ingredient Pills (fade-slide in on card hover) */}
      <div
        className={`absolute top-14 inset-x-4 pointer-events-none z-10 flex flex-wrap gap-1.5 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        {driftIngredients.map((ing, i) => (
          <span
            key={i}
            className="text-[10px] font-mono bg-[#FAF7F0]/90 text-[#6B5B45] px-2 py-0.5 rounded-full border border-[#6B5B45]/20 backdrop-blur-xs shadow-xs"
          >
            ✦ {ing.name}
          </span>
        ))}
      </div>

      {/* Shatter-Orbit Interactive Bottle Center */}
      <div className="my-2">
        <IngredientOrbit product={product} />
      </div>

      {/* Product Details Section */}
      <div className="pt-4 border-t border-[#6B5B45]/10 flex flex-col flex-grow justify-between">
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
