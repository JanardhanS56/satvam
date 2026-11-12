import React from 'react';
import LogoIntro from '../components/LogoIntro';
import Hero from '../components/Hero';
import BrandPromise from '../components/BrandPromise';
import LiveJourneySection from '../components/LiveJourneySection';
import ContactFooter from '../components/ContactFooter';

export default function Home() {
  return (
    <div className="w-full">
      {/* First-visit Logo Shimmer Intro Overlay (0:00 - 0:20 walkthrough beat) */}
      <LogoIntro />

      {/* Hero Section with Parallax and 'Enter the Atelier' CTA */}
      <Hero />

      {/* 5-Stage Seed-to-Bottle Journey Experience (Immediately below Hero) */}
      <LiveJourneySection />

      {/* Brand Promise Strip (Leaf, Mortar, Bottle bio-active credentials) */}
      <BrandPromise />

      {/* Customer Helpdesk & Interactive Concierge */}
      <ContactFooter />
    </div>
  );
}
