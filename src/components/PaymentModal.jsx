import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { useUIStore } from '../stores/ui';
import { useCartStore } from '../stores/cart';
import { useProfileStore } from '../stores/profile';
import { SafeImage } from '../lib/images';

export default function PaymentModal() {
  const isOpen = useUIStore((state) => state.isPaymentModalOpen);
  const closeModal = useUIStore((state) => state.closePaymentModal);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const [activeTab, setActiveTab] = useState('card');
  const [status, setStatus] = useState('idle'); // idle | processing | success

  const subtotal = getSubtotal();

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && status !== 'processing') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status, closeModal]);

  if (!isOpen) return null;

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setStatus('processing');

    // Exactly 2s spinner
    setTimeout(() => {
      // Record completed purchase order in history before clearing cart
      const currentCartItems = useCartStore.getState().items;
      const currentSubtotal = useCartStore.getState().getSubtotal();
      if (currentCartItems.length > 0) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) + ', ' + now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        const randomId = 'SV-' + Math.floor(10000 + Math.random() * 90000);
        const randomBatch = 'LOT-SV-2026-B' + (Math.floor(Math.random() * 9) + 1);
        const randomTrack = 'DEL-IND-' + Math.floor(10000000 + Math.random() * 90000000);

        useProfileStore.getState().addOrder({
          id: randomId,
          date: dateStr,
          status: 'Confirmed · Preparing Fresh Batch',
          batchCode: randomBatch,
          trackingNumber: randomTrack,
          total: currentSubtotal,
          items: currentCartItems.map((item) => ({
            slug: item.slug,
            name: item.name,
            bottleImage: item.bottleImage || item.image || `references/products/${item.slug}-bottle.webp`,
            price: item.price,
            quantity: item.quantity
          }))
        });
      }

      setStatus('success');
      clearCart();

      // Exactly 3s auto close
      setTimeout(() => {
        closeModal();
        setStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Demo Checkout & Payment"
    >
      {/* Backdrop Scrim */}
      <div
        className="absolute inset-0 bg-[#2D3E2F]/60 backdrop-blur-xs transition-opacity"
        onClick={() => status !== 'processing' && closeModal()}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FAF7F0] rounded-3xl border border-[#6B5B45]/20 shadow-2xl p-6 sm:p-8 z-10 animate-scaleUp overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#6B5B45]/15 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#6B5B45] uppercase">
              <Lock className="w-3.5 h-3.5 text-[#C9A961]" /> 256-Bit Encrypted Simulation
            </div>
            <h3 className="font-display font-medium text-2xl text-[#2D3E2F] mt-1">
              Satvam Atelier Checkout
            </h3>
          </div>
          {status !== 'processing' && (
            <button
              type="button"
              onClick={closeModal}
              className="p-1.5 text-[#6B5B45] hover:text-[#2D3E2F] rounded-full transition-colors focus:outline-none"
              aria-label="Close payment modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Success Screen */}
        {status === 'success' ? (
          <div className="py-10 text-center flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-soft">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h4 className="font-display font-medium text-2xl text-[#2D3E2F]">
              Payment simulated for demo
            </h4>
            <p className="text-sm text-[#6B5B45] mt-2 max-w-xs mx-auto">
              No real card was charged. Cart has been reset for competition judging.
            </p>
            <div className="mt-6 font-mono text-xs text-[#6B5B45]/70 bg-[#F5EFE3] px-4 py-2 rounded-full border border-[#6B5B45]/15">
              Simulated Reference #SATV-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSimulatePayment} className="space-y-6">
            {/* Amount Banner */}
            <div className="bg-[#F5EFE3] p-4 rounded-2xl border border-[#6B5B45]/15 flex items-center justify-between">
              <span className="text-xs text-[#6B5B45] uppercase font-mono tracking-wide">
                Total Payable Amount
              </span>
              <span className="font-display text-2xl font-semibold text-[#2D3E2F]">
                ₹{subtotal > 0 ? subtotal : 549}
              </span>
            </div>

            {/* 3 Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F5EFE3]/80 rounded-2xl border border-[#6B5B45]/15">
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all ${
                  activeTab === 'card'
                    ? 'bg-[#FAF7F0] shadow-xs text-[#2D3E2F] font-semibold border border-[#C9A961]/40'
                    : 'text-[#6B5B45] hover:text-[#2D3E2F]'
                }`}
              >
                <div className="w-5 h-5 mb-1 flex items-center justify-center">
                  <SafeImage
                    src="/references/payment/card.svg"
                    alt="Card"
                    className="w-full h-full object-contain"
                    fallbackText="💳"
                  />
                </div>
                <span className="text-xs">Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all ${
                  activeTab === 'upi'
                    ? 'bg-[#FAF7F0] shadow-xs text-[#2D3E2F] font-semibold border border-[#C9A961]/40'
                    : 'text-[#6B5B45] hover:text-[#2D3E2F]'
                }`}
              >
                <div className="w-5 h-5 mb-1 flex items-center justify-center">
                  <SafeImage
                    src="/references/payment/upi.svg"
                    alt="UPI"
                    className="w-full h-full object-contain"
                    fallbackText="📱"
                  />
                </div>
                <span className="text-xs">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all ${
                  activeTab === 'wallet'
                    ? 'bg-[#FAF7F0] shadow-xs text-[#2D3E2F] font-semibold border border-[#C9A961]/40'
                    : 'text-[#6B5B45] hover:text-[#2D3E2F]'
                }`}
              >
                <div className="w-5 h-5 mb-1 flex items-center justify-center">
                  <SafeImage
                    src="/references/payment/wallet.svg"
                    alt="Wallet"
                    className="w-full h-full object-contain"
                    fallbackText="👛"
                  />
                </div>
                <span className="text-xs">NetBanking</span>
              </button>
            </div>

            {/* Tab Inputs (Placeholder only, no validation) */}
            {activeTab === 'card' && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Vaidya Customer"
                    className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      defaultValue="789"
                      className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upi' && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                    Virtual Payment Address (VPA)
                  </label>
                  <input
                    type="text"
                    defaultValue="satvam.patron@okhdfcbank"
                    className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>
                <p className="text-[11px] text-[#6B5B45]/70">
                  ✦ Supports Google Pay, PhonePe, BHIM, and Paytm instant approvals.
                </p>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-3 animate-fadeIn">
                <div>
                  <label className="block text-xs font-medium text-[#6B5B45] mb-1">
                    Select Indian Bank
                  </label>
                  <select className="w-full bg-[#FFFFFF] border border-[#6B5B45]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]">
                    <option>HDFC Bank — NetBanking</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'processing'}
                className="btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2 shadow-soft hover:shadow-lifted disabled:opacity-75"
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Demo Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay Now · ₹{subtotal > 0 ? subtotal : 549}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
