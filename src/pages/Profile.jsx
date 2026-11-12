import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  Camera,
  History,
  PackageCheck,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
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
  const avatar = useProfileStore((state) => state.avatar);
  const setAvatar = useProfileStore((state) => state.setAvatar);
  const removeAvatar = useProfileStore((state) => state.removeAvatar);
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
  const orders = useProfileStore((state) => state.orders) || [];
  const popupsDisabled = useProfileStore((state) => state.popupsDisabled);
  const setPopupsDisabled = useProfileStore((state) => state.setPopupsDisabled);

  const addItemToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const openPaymentModal = useUIStore((state) => state.openPaymentModal);
  const showToast = useUIStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState('quiz'); // quiz | wishlist | favorites | history
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const fileInputRef = useRef(null);

  // Auto-scroll to quiz or open specific tab if loaded with hash
  useEffect(() => {
    const hash = (window.location.hash || '').replace('#', '').trim().toLowerCase();
    if (hash === 'quiz') {
      setActiveTab('quiz');
      const el = document.getElementById('quiz-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === 'cart') {
      openCart();
    } else if (['wishlist', 'favorites', 'history'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [openCart]);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      if (showToast) showToast('Please select a valid image file', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        setAvatar(compressed);
        if (showToast) showToast('Profile photo updated', 'info');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleBuyNow = (product) => {
    addItemToCart(product, 1);
    openPaymentModal('profile');
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      const prod = getProductBySlug(item.slug) || {
        slug: item.slug,
        name: item.name,
        price: item.price,
        bottleImage: item.bottleImage
      };
      addItemToCart(prod, item.quantity || 1);
    });
    if (showToast) {
      showToast(`Re-added ${order.items.length} ${order.items.length === 1 ? 'item' : 'items'} to Cart`, 'cart');
    }
    openCart();
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
            {/* User Avatar with Custom Photo Upload */}
            <div className="flex items-center gap-5">
              <div className="relative group flex-shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#F5EFE3] text-[#2D3E2F] border-2 border-[#C9A961] flex items-center justify-center font-display text-2xl sm:text-3xl font-bold flex-shrink-0 shadow-xs relative overflow-hidden cursor-pointer transition-transform duration-200 group-hover:scale-102"
                  title="Click to upload profile photo"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="select-none">{name.charAt(0).toUpperCase()}</span>
                  )}

                  {/* Hover Upload Overlay */}
                  <div className="absolute inset-0 bg-[#2D3E2F]/65 backdrop-blur-2xs flex flex-col items-center justify-center text-[#FAF7F0] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-[#C9A961]" />
                    <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5 font-semibold">Change</span>
                  </div>
                </div>

                {/* Corner Camera Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2D3E2F] text-[#FAF7F0] border border-[#C9A961] flex items-center justify-center hover:bg-[#C9A961] hover:text-[#2D3E2F] transition-all shadow-xs"
                  title="Upload profile photo"
                  aria-label="Upload custom profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
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
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="font-mono text-xs text-[#6B5B45]">
                    Patron Identifier · Personalized Apothecary Account
                  </p>
                  {avatar && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="text-[11px] font-mono text-[#A8453D] hover:underline"
                    >
                      (Remove Photo)
                    </button>
                  )}
                </div>
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
            onClick={() => setActiveTab('history')}
            className={`py-3.5 text-sm sm:text-base font-medium tracking-wide relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                : 'text-[#6B5B45] hover:text-[#2D3E2F]'
            }`}
          >
            <History className="w-4 h-4" /> History ({orders.length})
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

        {/* TAB 4: HISTORY (PAST PURCHASES) */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fadeIn">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/15 p-8">
                <History className="w-10 h-10 text-[#6B5B45]/30 mx-auto mb-3" />
                <h3 className="font-display text-lg text-[#2D3E2F]">No purchase history recorded</h3>
                <p className="text-xs text-[#6B5B45] mt-1 max-w-sm mx-auto">
                  Completed orders and seasonal refills from the Satvam Atelier will be archived here.
                </p>
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center gap-2 mt-5 py-2.5 px-5 text-xs font-semibold"
                >
                  Explore The Apothecary <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/15 p-6 sm:p-7 shadow-xs space-y-5 transition-all hover:border-[#6B5B45]/30"
                  >
                    {/* Order Top Bar: ID, Date, Status, Total */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#6B5B45]/10">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-bold text-[#2D3E2F] tracking-wide">
                            Order #{order.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-[#E8B44A]/15 text-[#6B5B45] border border-[#C9A961]/30'
                            }`}
                          >
                            <PackageCheck className="w-3 h-3 text-[#2D3E2F]" />
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#6B5B45] mt-1">
                          <span>Placed: {order.date}</span>
                          {order.batchCode && (
                            <>
                              <span className="text-[#6B5B45]/30">·</span>
                              <span className="text-[#6B5B45]/90">Batch: {order.batchCode}</span>
                            </>
                          )}
                          {order.trackingNumber && (
                            <>
                              <span className="text-[#6B5B45]/30">·</span>
                              <span className="text-[#6B5B45]/70">Track: {order.trackingNumber}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-[#6B5B45]">
                          Order Total
                        </span>
                        <span className="font-display font-bold text-xl text-[#2D3E2F]">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    {/* Purchased Items List */}
                    <div className="divide-y divide-[#6B5B45]/10">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-14 h-16 bg-[#F5EFE3] rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-[#6B5B45]/10">
                              <SafeImage
                                src={item.bottleImage || `references/products/${item.slug}-bottle.webp`}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                                fallbackText={item.name}
                              />
                            </div>
                            <div>
                              <Link
                                to={`/products#${item.slug}`}
                                className="font-display font-medium text-base text-[#2D3E2F] hover:text-[#C9A961] transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="font-mono text-xs text-[#6B5B45]">
                                Qty: {item.quantity} · ₹{item.price} each
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-mono text-sm font-semibold text-[#2D3E2F]">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer: Reorder & Batch Quality Certificate */}
                    <div className="pt-4 border-t border-[#6B5B45]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5B45]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C9A961]" />
                        <span>FSSAI Clean-Room Batch Certified · Cold-Pressed</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F5EFE3] hover:bg-[#C9A961] text-[#2D3E2F] text-xs font-semibold rounded-full border border-[#6B5B45]/20 transition-all hover:shadow-xs focus:outline-none"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#2D3E2F]" />
                        Reorder All Items
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
