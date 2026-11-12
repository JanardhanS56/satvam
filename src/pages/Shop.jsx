import React, { useMemo } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { Sparkles, Shield, Leaf, HeartHandshake } from 'lucide-react';

export default function Shop() {
  // Exactly the 5 hero: true products
  const heroProducts = useMemo(() => {
    const list = productsData.products || [];
    return list.filter((p) => p.hero === true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F0] pb-24">
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFE3] border border-[#6B5B45]/15 text-[#6B5B45] text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" /> Curated Harvest
        </div>
        <h1 className="font-display font-medium text-4xl sm:text-6xl text-[#2D3E2F] tracking-tight">
          The Herbal Atelier
        </h1>
        <p className="font-eyebrow text-base sm:text-lg tracking-[0.2em] uppercase text-[#6B5B45] mt-3">
          Five oils. Twenty herbs. One lineage.
        </p>
        <p className="text-sm sm:text-base text-[#2D3E2F]/75 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          Each formula is slow cold-pressed in limited small batches.
          Hover any bottle to inspect its physical poise; click the bottle to shatter the veil and orbit its raw ingredients.
        </p>
      </section>

      {/* 5-Hero Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {heroProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Craft Note Bottom Banner */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="bg-[#F5EFE3] rounded-3xl p-8 sm:p-10 border border-[#6B5B45]/15 text-center">
          <h3 className="font-display text-2xl text-[#2D3E2F] mb-3">
            Looking for Our Complete 20-Formula Apothecary?
          </h3>
          <p className="text-sm text-[#6B5B45] max-w-xl mx-auto mb-6 leading-relaxed">
            From targeted men's hormonal root care (Tiladi & Keshini) to cooling pitta cleansers,
            explore every specific concern in our full catalog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#2D3E2F] font-mono">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#C9A961]" /> FSSAI Certified</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-[#C9A961]" /> 100% Vegan & Cold-Pressed</span>
            <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-[#C9A961]" /> 740+ Direct Farmers</span>
          </div>
        </div>
      </section>
    </div>
  );
}
