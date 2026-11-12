import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PopupScheduler from './components/PopupScheduler';
import CartDrawer from './components/CartDrawer';
import PaymentModal from './components/PaymentModal';
import { useUIStore } from './stores/ui';
import { useThemeStore } from './stores/theme';

export default function App() {
  const { pathname } = useLocation();
  const toast = useUIStore((state) => state.toast);
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#2D3E2F] selection:bg-[#C9A961] selection:text-[#2D3E2F]">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <PaymentModal />
      <PopupScheduler />

      {/* Global Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 animate-slideUp pointer-events-auto"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#2D3E2F]/95 text-[#FAF7F0] border border-[#C9A961] shadow-lifted backdrop-blur-md text-xs sm:text-sm font-medium">
            <span className="w-6 h-6 rounded-full bg-[#E8B44A]/25 border border-[#E8B44A] flex items-center justify-center text-[#E8B44A] font-bold text-xs select-none">
              ★
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
