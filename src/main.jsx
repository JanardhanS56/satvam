import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from './lib/gsap';
import { isReducedMotion } from './lib/gsap';

import './styles/globals.css';
import App from './App';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Shop from './pages/Shop';
import Products from './pages/Products';
import About from './pages/About';
import Trust from './pages/Trust';
import Profile from './pages/Profile';

function Root() {
  useEffect(() => {
    if (isReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="journey" element={<Journey />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="trust" element={<Trust />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
