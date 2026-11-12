import React, { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { SafeImage } from '../lib/images';

export default function ProductCatalogCard({ product, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

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

      {/* Top Concern Tag */}
      {product.concerns && product.concerns.length > 0 && (
        <span className="absolute top-4 right-4 z-20 px-2 py-0.5 bg-[#FAF7F0] text-[#6B5B45]/80 font-mono text-[9px] uppercase tracking-wider rounded-full border border-[#6B5B45]/10">
          {product.concerns[0]}
        </span>
      )}

      {/* Image Container with Crossfade on Hover */}
      <div className="relative w-full h-56 my-2 flex items-center justify-center overflow-hidden rounded-xl bg-[#F5EFE3]/40 p-3">
        {/* Default Bottle Image */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-400 ease-out ${
            isHovered && product.ingredientsImage ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <SafeImage
            src={product.image || `references/products/${product.slug}-bottle.webp`}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-xs"
            fallbackText={product.name}
          />
        </div>

        {/* Crossfade Ingredients Flat-Lay Image on Hover */}
        {product.ingredientsImage && (
          <div
            className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-400 ease-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <SafeImage
              src={product.ingredientsImage}
              alt={`${product.name} raw botanicals`}
              className="max-h-full max-w-full object-contain filter saturate-[0.95]"
              fallbackText={`${product.name} Herbs`}
            />
          </div>
        )}
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
          </div>
          <span className="text-xs font-medium text-[#C9A961] group-hover:text-[#2D3E2F] flex items-center gap-0.5 transition-colors">
            Formulation Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
