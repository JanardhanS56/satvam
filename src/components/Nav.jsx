import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { useUIStore } from '../stores/ui';
import { useProfileStore } from '../stores/profile';
import { SafeImage } from '../lib/images';
import ThemeSwitcher from './ThemeSwitcher';

export default function Nav() {
  const totalCount = useCartStore((state) => state.getTotalCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const avatar = useProfileStore((state) => state.avatar);
  const name = useProfileStore((state) => state.name);
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useUIStore((state) => state.setMobileNavOpen);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Products', path: '/products' },
    { label: 'AI Consultation', path: '/consultation' },
    { label: 'About', path: '/about' },
    { label: 'Trust', path: '/trust' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F0]/85 border-b border-[#6B5B45]/15 transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
          aria-label="Satvam Home"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#F5EFE3] border border-[#C9A961]/40 shadow-xs ring-1 ring-[#C9A961]/20 transition-transform duration-200 group-hover:scale-105 shrink-0">
            <SafeImage
              src="/references/logo/logo-mark.webp"
              alt="Satvam Mark"
              className="w-full h-full object-cover scale-[1.18] transition-transform duration-200 group-hover:scale-[1.24]"
              fallbackText="SV"
            />
          </div>
          <span className="font-display font-medium text-xl sm:text-2xl tracking-[0.08em] text-[#2D3E2F] group-hover:text-[#6B5B45] transition-colors">
            SATVAM
          </span>
        </Link>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[15px] font-medium tracking-wide transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] ${
                  isActive
                    ? 'text-[#2D3E2F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A961]'
                    : 'text-[#6B5B45] hover:text-[#2D3E2F]'
                }`
              }
            >
              <span className="inline-flex items-center">
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-[#C9A961]/20 text-[#6B5B45] text-[9px] font-mono uppercase tracking-wider rounded-full border border-[#C9A961]/40 leading-none">
                    {item.badge}
                  </span>
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Right Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-3.5 lg:gap-5">
          <ThemeSwitcher />

          <Link
            to="/profile"
            className="p-1 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] flex items-center justify-center"
            aria-label="User Profile"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-[#C9A961] shadow-2xs"
              />
            ) : (
              <span className="p-0.5 sm:p-1 flex items-center justify-center">
                <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleCart}
            className="relative p-1.5 sm:p-2 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
            aria-label={`Shopping Cart with ${totalCount} items`}
          >
            <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {totalCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-[#C9A961] text-[#2D3E2F] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-1.5 sm:p-2 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-b border-[#6B5B45]/15 px-6 py-6 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium py-2 transition-colors ${
                    isActive ? 'text-[#C9A961] font-semibold' : 'text-[#2D3E2F]'
                  }`
                }
              >
                <span className="inline-flex items-center">
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-[#C9A961]/20 text-[#6B5B45] text-[9px] font-mono uppercase tracking-wider rounded-full border border-[#C9A961]/40 leading-none">
                    {item.badge}
                  </span>
                )}
              </span>
              </NavLink>
            ))}
            <div className="pt-4 border-t border-[#6B5B45]/10 flex flex-col gap-3">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium text-[#6B5B45]">Theme</span>
                <ThemeSwitcher />
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileNavOpen(false)}
                className="text-base text-[#6B5B45] flex items-center gap-2 py-1"
              >
                <User className="w-4 h-4" /> Profile & Hair Quiz
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
