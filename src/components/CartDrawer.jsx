import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { useUIStore } from '../stores/ui';
import { SafeImage } from '../lib/images';

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const openPaymentModal = useUIStore((state) => state.openPaymentModal);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const subtotal = getSubtotal();

  const handleProceedToPayment = () => {
    closeCart();
    openPaymentModal('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2D3E2F]/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#6B5B45]/20 shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-[#6B5B45]/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C9A961]" />
              <h2 className="font-display font-medium text-xl text-[#2D3E2F]">
                Your Atelier Selection
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-[#6B5B45] hover:text-[#2D3E2F] rounded-full transition-colors focus:outline-none"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-[#6B5B45]">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5EFE3] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#6B5B45]/40" />
                </div>
                <h3 className="font-display text-lg text-[#2D3E2F] mb-1">
                  Your basket is empty
                </h3>
                <p className="text-xs text-[#6B5B45] max-w-xs mx-auto mb-6">
                  Select a sacred cold-pressed formulation to begin your root restoration routine.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="btn-primary py-2.5 px-6 text-xs font-semibold"
                >
                  Explore Formulas
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.slug || item.id}
                  className="flex gap-4 p-4 rounded-xl bg-[#FFFFFF] border border-[#6B5B45]/15 shadow-xs items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 bg-[#F5EFE3] rounded-lg p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <SafeImage
                      src={item.bottleImage || `references/products/${item.slug}-bottle.webp`}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                      fallbackText={item.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-medium text-base text-[#2D3E2F] truncate">
                      {item.name}
                    </h4>
                    <p className="font-eyebrow text-[10px] uppercase text-[#6B5B45] truncate">
                      {item.subtitle || item.tagline}
                    </p>
                    <div className="mt-1 font-display font-semibold text-sm text-[#2D3E2F]">
                      ₹{item.price}
                    </div>

                    {/* Quantity controls */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center border border-[#6B5B45]/20 rounded-full bg-[#FAF7F0] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug || item.id, item.quantity - 1)}
                          className="text-[#6B5B45] hover:text-[#2D3E2F] p-0.5 focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs px-2 text-[#2D3E2F] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug || item.id, item.quantity + 1)}
                          className="text-[#6B5B45] hover:text-[#2D3E2F] p-0.5 focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.slug || item.id)}
                        className="text-[#6B5B45]/60 hover:text-[#A8453D] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#6B5B45]/15 bg-[#F5EFE3]/60">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-[#6B5B45] uppercase tracking-wider font-mono">
                  Order Subtotal
                </span>
                <span className="font-display text-2xl font-semibold text-[#2D3E2F]">
                  ₹{subtotal}
                </span>
              </div>
              <p className="text-[11px] text-[#6B5B45]/70 mb-5">
                ✦ Complimentary botanical shipping & glass apothecary bottle packaging included.
              </p>
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-soft hover:shadow-lifted"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
