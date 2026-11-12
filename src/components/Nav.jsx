import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { useUIStore } from '../stores/ui';
import { SafeImage } from '../lib/images';

export default function Nav() {
  const totalCount = useCartStore((state) => state.getTotalCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useUIStore((state) => state.setMobileNavOpen);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Trust', path: '/trust' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F0]/85 border-b border-[#6B5B45]/15 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
          aria-label="Satvam Home"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#F5EFE3] border border-[#6B5B45]/20 shadow-xs">
            <SafeImage
              src="/references/logo/logo-mark.webp"
              alt="Satvam Mark"
              className="w-8 h-8 object-contain"
              fallbackText="SV"
            />
          </div>
          <span className="font-display font-medium text-2xl tracking-[0.08em] text-[#2D3E2F] group-hover:text-[#6B5B45] transition-colors">
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
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Cluster */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            to="/profile"
            className="p-2 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
            aria-label="User Profile"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={toggleCart}
            className="relative p-2 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
            aria-label={`Shopping Cart with ${totalCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A961] text-[#2D3E2F] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-2 text-[#2D3E2F] hover:text-[#6B5B45] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-[#6B5B45]/10 flex flex-col gap-3">
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
