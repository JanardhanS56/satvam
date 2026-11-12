import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCatalogCard from '../components/ProductCatalogCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { Sparkles, SlidersHorizontal, Search } from 'lucide-react';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Formulas' },
  { id: 'men', label: 'For Men' },
  { id: 'women', label: 'For Women' },
  { id: 'hairfall', label: 'Hair Fall' },
  { id: 'dandruff', label: 'Dandruff' },
  { id: 'growth', label: 'Growth' },
  { id: 'dryness', label: 'Dryness' }
];

export default function Products() {
  const location = useLocation();
  const allProducts = useMemo(() => productsData.products || [], []);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Deep-link handling via hash: /products#slug (react-router location + window event)
  useEffect(() => {
    const handleHash = () => {
      const hash = (location.hash || window.location.hash || '').replace('#', '').trim().toLowerCase();
      if (!hash) {
        setSelectedProduct(null);
        return;
      }
      const found = allProducts.find(
        (p) => p.slug.toLowerCase() === hash || p.slug.toLowerCase().includes(hash)
      );
      if (found) {
        setSelectedProduct(found);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [location.hash, allProducts]);

  const handleSelectProduct = (product) => {
    window.location.hash = product.slug;
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Client-side filtering logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Text search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = (product.subtitle || '').toLowerCase().includes(q);
        const matchesConcern = (product.concerns || []).some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesSub && !matchesConcern) return false;
      }

      // 2. Filter category match
      if (activeFilter === 'all') return true;
      if (activeFilter === 'men') return product.targetGender === 'male';
      if (activeFilter === 'women') return product.targetGender === 'female';

      const concerns = (product.concerns || []).map((c) => c.toLowerCase());
      if (activeFilter === 'hairfall') {
        return concerns.some((c) => c.includes('fall') || c.includes('thinning'));
      }
      if (activeFilter === 'dandruff') {
        return concerns.some((c) => c.includes('dandruff') || c.includes('flak') || c.includes('scalp'));
      }
      if (activeFilter === 'growth') {
        return concerns.some((c) => c.includes('growth') || c.includes('density') || c.includes('follicle'));
      }
      if (activeFilter === 'dryness') {
        return concerns.some((c) => c.includes('dry') || c.includes('frizz') || c.includes('moisture'));
      }

      return true;
    });
  }, [allProducts, activeFilter, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F0] pb-24">
      {/* Page Header */}
      <section className="pt-16 pb-10 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFE3] border border-[#6B5B45]/15 text-[#6B5B45] text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" /> Full Pharmacopeia
        </div>
        <h1 className="font-display font-medium text-4xl sm:text-6xl text-[#2D3E2F] tracking-tight">
          The Twenty Formulations
        </h1>
        <p className="font-eyebrow text-sm sm:text-base tracking-[0.2em] uppercase text-[#6B5B45] mt-3">
          Single-origin botanicals tailored to individual scalp doshas.
        </p>
        <p className="text-xs sm:text-sm text-[#2D3E2F]/75 max-w-xl mx-auto mt-3 font-normal leading-relaxed">
          Hover any card to reveal its raw botanical flat-lay; click for Sanskrit ratios, before/after proof, and ritual instructions.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <div className="bg-[#F5EFE3]/70 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#6B5B45]/15 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-[#6B5B45] uppercase flex items-center gap-1 mr-1 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A961]" /> Filter:
            </span>
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveFilter(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === opt.id
                    ? 'bg-[#C9A961] text-[#2D3E2F] font-semibold shadow-xs'
                    : 'bg-[#FAF7F0] text-[#6B5B45] hover:text-[#2D3E2F] border border-[#6B5B45]/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6B5B45] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search herb or concern..."
              className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#2D3E2F] placeholder-[#6B5B45]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
            />
          </div>
        </div>
      </section>

      {/* 20 Products Responsive Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F5EFE3]/40 rounded-3xl border border-[#6B5B45]/15 p-8">
            <p className="font-display text-xl text-[#2D3E2F] mb-2">No matching formulations found</p>
            <p className="text-xs text-[#6B5B45] max-w-sm mx-auto mb-6">
              Try adjusting your search criteria or resetting filters to view all 20 herbal recipes.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="btn-primary py-2.5 px-6 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCatalogCard
                key={product.slug}
                product={product}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal (Controlled via Hash or Selection) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
