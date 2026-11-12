import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PopupScheduler from './components/PopupScheduler';
import CartDrawer from './components/CartDrawer';
import PaymentModal from './components/PaymentModal';

export default function App() {
  const { pathname } = useLocation();

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
    </div>
  );
}
