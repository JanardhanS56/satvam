import React, { useState, useEffect } from 'react';
import { useProfileStore } from '../stores/profile';
import { useCartStore } from '../stores/cart';
import { useUIStore } from '../stores/ui';
import productsData from '../data/products.json';
import { SafeImage } from '../lib/images';
import PersonalisationQuiz from '../components/PersonalisationQuiz';
import {
  User,
  Heart,
  Bookmark,
  ShoppingBag,
  BellOff,
  Bell,
  Trash2,
  ExternalLink,
  Check,
  Edit2
} from 'lucide-react';

const HAIR_TYPE_OPTIONS = ['Straight', 'Wavy', 'Curly', 'Coily', 'Dry & Brittle', 'Oily & Congested', 'Fine & Thinning', 'Color-Treated'];
const AGE_BAND_OPTIONS = ['18-24', '25-34', '35-44', '45-54', '55+'];

export default function Profile() {
  const name = useProfileStore((state) => state.name);
  const setName = useProfileStore((state) => state.setName);
  const gender = useProfileStore((state) => state.gender);
  const setGender = useProfileStore((state) => state.setGender);
  const ageBand = useProfileStore((state) => state.ageBand);
  const setAgeBand = useProfileStore((state) => state.setAgeBand);
  const hairTypes = useProfileStore((state) => state.hairTypes);
  const toggleHairType = useProfileStore((state) => state.toggleHairType);
  const wishlist = useProfileStore((state) => state.wishlist);
  const toggleWishlist = useProfileStore((state) => state.toggleWishlist);
  const favorites = useProfileStore((state) => state.favorites);
  const toggleFavorite = useProfileStore((state) => state.toggleFavorite);
  const popupsDisabled = useProfileStore((state) => state.popupsDisabled);
  const setPopupsDisabled = useProfileStore((state) => state.setPopupsDisabled);

  const cartItems = useCartStore((state) => state.items);
  const removeItemFromCart = useCartStore((state) => state.removeItem);
  const addItemToCart = useCartStore((state) => state.addItem);
  const openPaymentModal = useUIStore((state) => state.openPaymentModal);

  const [activeTab, setActiveTab] = useState('quiz'); // quiz | wishlist | favorites | cart
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  // Auto-scroll to quiz if loaded with #quiz
  useEffect(() => {
    if (window.location.hash === '#quiz') {
      setActiveTab('quiz');
      const el = document.getElementById('quiz-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleBuyNow = (product) => {
    addItemToCart(product, 1);
    openPaymentModal('profile');
  };

  const getProductBySlug = (slug) => {
    return (productsData.products || []).find((p) => p.slug === slug);
  };

  const wishlistProducts = wishlist.map(getProductBySlug).filter(Boolean);
  const favoriteProducts = favorites.map(getProductBySlug).filter(Boolean);

  return (
    <div className="w-full bg-[#FAF7F0] pb-24 min-h-screen">
      {/* Header Container */}
      <section className="pt-16 pb-10 px-6 max-w-6xl mx-auto">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#6B5B45]/20 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#6B5B45]/15">
            {/* User Avatar & Name */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#F5EFE3] text-[#2D3E2F] border-2 border-[#C9A961] flex items-center justify-center font-display text-2xl font-bold flex-shrink-0 shadow-xs">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-[#FAF7F0] border border-[#C9A961] rounded-lg px-2.5 py-1 text-lg font-display text-[#2D3E2F] focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="p-1.5 bg-[#C9A961] text-[#2D3E2F] rounded-lg"
                        title="Save Name"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#2D3E2F]">
                        {name}
                      </h1>
                      <button
                        type="button"
                        onClick={() => {
                          setTempName(name);
                          setIsEditingName(true);
                        }}
                        className="text-[#6B5B45] hover:text-[#2D3E2F] p-1"
                        aria-label="Edit patron name"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                <p className="font-mono text-xs text-[#6B5B45] mt-1">
                  Patron Identifier · Personalized Apothecary Account
                </p>
              </div>
            </div>

            {/* Popup Toggle Switch */}
            <div className="flex items-center gap-3 bg-[#F5EFE3] px-4 py-2.5 rounded-2xl border border-[#6B5B45]/15 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setPopupsDisabled(!popupsDisabled)}
                className="flex items-center gap-2.5 text-xs text-[#2D3E2F] focus:outline-none"
              >
                {popupsDisabled ? (
                  <BellOff className="w-4 h-4 text-[#A8453D]" />
                ) : (
                  <Bell className="w-4 h-4 text-[#C9A961]" />
                )}
                <span className="font-medium">
                  {popupsDisabled ? 'Promotional Popups: Disabled' : 'Promotional Popups: Active'}
                </span>
                <span
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    popupsDisabled ? 'bg-[#A8453D]' : 'bg-[#C9A961]'
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      popupsDisabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Profile Details Form (Gender, Age, Hair Multi-Select) */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Gender Selection */}
            <div>
              <label className="font-mono text-[#6B5B45] uppercase tracking-wider block mb-2 font-medium">
                Physiological Focus
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-xl px-3 py-2 text-sm text-[#2D3E2F] focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
              >
                <option value="all">Universal / Gender-Neutral</option>
                <option value="male">Men's Follicle Lineage (DHT Focus)</option>
                <option value="female">Women's Density & Postpartum</option>
              </select>
            </div>

            {/* Age Band */}
            <div>
              <label className="font-mono text-[#6B5B45] uppercase tracking-wider block mb-2 font-medium">
                Age Band
              </label>
              <select
                value={ageBand}
                onChange={(e) => setAgeBand(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-xl px-3 py-2 text-sm text-[#2D3E2F] focus:outline-none focus:ring-1 focus:ring-[#C9A961]"
              >
                {AGE_BAND_OPTIONS.map((band) => (
                  <option key={band} value={band}>{band} Years</option>
                ))}
              </select>
            </div>

            {/* Multi-Select Hair Profile Tags */}
            <div className="md:col-span-3">
              <label className="font-mono text-[#6B5B45] uppercase tracking-wider block mb-2 font-medium">
                Hair Texture & Constitution (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {HAIR_TYPE_OPTIONS.map((type) => {
                  const isSelected = hairTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleHairType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#2D3E2F] text-[#FAF7F0] border-[#2D3E2F] font-semibold'
                          : 'bg-[#FAF7F0] text-[#6B5B45] border-[#6B5B45]/20 hover:border-[#6B5B45]/40'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Quiz | Wishlist | Favorites | Cart */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 sm:gap-8 border-b border-[#6B5B45]/15 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`py-3.5 text-sm sm:text-base font-medium tracking-wide relative whitespace-nowrap transition-colors ${
              activeTab === 'quiz'
                ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                : 'text-[#6B5B45] hover:text-[#2D3E2F]'
            }`}
          >
            ✦ Personalisation Quiz
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`py-3.5 text-sm sm:text-base font-medium tracking-wide relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                : 'text-[#6B5B45] hover:text-[#2D3E2F]'
            }`}
          >
            <Bookmark className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`py-3.5 text-sm sm:text-base font-medium tracking-wide relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                : 'text-[#6B5B45] hover:text-[#2D3E2F]'
            }`}
          >
            <Heart className="w-4 h-4" /> Favorites ({favorites.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cart')}
            className={`py-3.5 text-sm sm:text-base font-medium tracking-wide relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'cart'
                ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                : 'text-[#6B5B45] hover:text-[#2D3E2F]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Cart ({cartItems.length})
          </button>
        </div>

        {/* TAB 1: QUIZ */}
        {activeTab === 'quiz' && (
          <div id="quiz-section">
            <PersonalisationQuiz />
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4 animate-fadeIn">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/15 p-8">
                <Bookmark className="w-10 h-10 text-[#6B5B45]/30 mx-auto mb-3" />
                <h3 className="font-display text-lg text-[#2D3E2F]">No formulas bookmarked yet</h3>
                <p className="text-xs text-[#6B5B45] mt-1 max-w-sm mx-auto">
                  Browse our full 20-product catalog to bookmark formulas for seasonal rotation.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#6B5B45]/15 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-[#F5EFE3] rounded-lg p-1 flex items-center justify-center">
                        <SafeImage
                          src={p.image || `references/products/${p.slug}-bottle.webp`}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                          fallbackText={p.name}
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-base text-[#2D3E2F]">{p.name}</h4>
                        <p className="font-mono text-xs text-[#C9A961]">₹{p.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBuyNow(p)}
                        className="btn-primary py-2 px-3 text-xs font-semibold"
                      >
                        Buy Now
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(p.slug)}
                        className="text-[#6B5B45]/60 hover:text-[#A8453D] p-2"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="space-y-4 animate-fadeIn">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/15 p-8">
                <Heart className="w-10 h-10 text-[#6B5B45]/30 mx-auto mb-3" />
                <h3 className="font-display text-lg text-[#2D3E2F]">No favorite formulas saved</h3>
                <p className="text-xs text-[#6B5B45] mt-1 max-w-sm mx-auto">
                  Take the Ayurvedic consultation quiz to discover your favorite matches.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#6B5B45]/15 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-[#F5EFE3] rounded-lg p-1 flex items-center justify-center">
                        <SafeImage
                          src={p.image || `references/products/${p.slug}-bottle.webp`}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                          fallbackText={p.name}
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-base text-[#2D3E2F]">{p.name}</h4>
                        <p className="font-mono text-xs text-[#C9A961]">₹{p.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBuyNow(p)}
                        className="btn-primary py-2 px-3 text-xs font-semibold"
                      >
                        Buy Now
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(p.slug)}
                        className="text-[#6B5B45]/60 hover:text-[#A8453D] p-2"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CART */}
        {activeTab === 'cart' && (
          <div className="space-y-4 animate-fadeIn">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/15 p-8">
                <ShoppingBag className="w-10 h-10 text-[#6B5B45]/30 mx-auto mb-3" />
                <h3 className="font-display text-lg text-[#2D3E2F]">Your cart is currently empty</h3>
                <p className="text-xs text-[#6B5B45] mt-1 max-w-sm mx-auto">
                  Add products from the Atelier or taking the quiz.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.slug || item.id}
                    className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#6B5B45]/15 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-[#F5EFE3] rounded-lg p-1 flex items-center justify-center">
                        <SafeImage
                          src={item.bottleImage || `references/products/${item.slug}-bottle.webp`}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                          fallbackText={item.name}
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-base text-[#2D3E2F]">{item.name}</h4>
                        <p className="font-mono text-xs text-[#C9A961]">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openPaymentModal('profile-cart')}
                        className="btn-primary py-2 px-4 text-xs font-semibold"
                      >
                        Checkout
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItemFromCart(item.slug || item.id)}
                        className="text-[#6B5B45]/60 hover:text-[#A8453D] p-2"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
