import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIntro from '../components/LogoIntro';
import Hero from '../components/Hero';
import BrandPromise from '../components/BrandPromise';
import JourneyTeaser from '../components/JourneyTeaser';
import ContactFooter from '../components/ContactFooter';

export default function Home() {
  const navigate = useNavigate();

  // Requirement: First visit redirect to /journey unless skipped
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSkippedSession = sessionStorage.getItem('satvam_skipped') === '1';
    const hasSkippedPerm = localStorage.getItem('satvam_skip_journey') === '1';
    const hasVisitedHome = sessionStorage.getItem('satvam_has_visited') === '1';

    if (!hasSkippedSession && !hasSkippedPerm && !hasVisitedHome) {
      sessionStorage.setItem('satvam_has_visited', '1');
      navigate('/journey', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-full">
      {/* First-visit Logo Shimmer Intro Overlay */}
      <LogoIntro />

      {/* Hero Section with Parallax Layers */}
      <Hero />

      {/* Brand Promise Strip (Leaf, Mortar, Bottle bio-active pledges) */}
      <BrandPromise />

      {/* The 5-Stage Seed-to-Bottle Journey Showcase Teaser */}
      <JourneyTeaser />

      {/* Customer Helpdesk & Interactive Concierge */}
      <ContactFooter />
    </div>
  );
}
