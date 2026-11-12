import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Gift } from 'lucide-react';
import { useProfileStore } from '../stores/profile';

const POPUP_ITEMS = [
  {
    id: 'keshkanti-offer',
    badge: 'Limited Offer',
    icon: Gift,
    title: '20% off Keshkanti',
    description: 'Our signature cold-pressed oil with 22 herbs, on seasonal discount this week.',
    ctaText: 'View Formula',
    link: '/products#keshkanti'
  },
  {
    id: 'quiz-recommendation',
    badge: 'Ayurvedic Diagnosis',
    icon: Sparkles,
    title: 'Discover Your Herb Blend',
    description: 'Take our 6-question personalisation quiz for tailored root nutrition.',
    ctaText: 'Start Quiz',
    link: '/profile#quiz'
  },
  {
    id: 'shirodhara-spotlight',
    badge: 'Restorative Care',
    icon: Sparkles,
    title: 'Shirodhara Night Elixir',
    description: 'Calm the mind, induce restful sleep, and nourish the scalp naturally.',
    ctaText: 'Explore',
    link: '/products#shirodhara'
  }
];

export default function PopupScheduler() {
  const popupsDisabled = useProfileStore((state) => state.popupsDisabled);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    if (popupsDisabled) return;
    if (typeof window !== 'undefined' && localStorage.getItem('satvam_popups_disabled') === '1') {
      return;
    }
    if (shownCount >= 3) return;

    // First popup at 10s, subsequent every 45s
    const delay = shownCount === 0 ? 10000 : 45000;

    const timer = setTimeout(() => {
      const nextItem = POPUP_ITEMS[shownCount % POPUP_ITEMS.length];
      setCurrentPopup(nextItem);
      setShownCount((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [shownCount, popupsDisabled]);

  if (!currentPopup || popupsDisabled) return null;

  const Icon = currentPopup.icon || Sparkles;

  return (
    <aside
      aria-label="Promotion"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-2xl p-5 shadow-2xl transition-all duration-300 animate-slideUp"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A961]/15 text-[#6B5B45] flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#6B5B45]" />
          </div>
          <span className="text-eyebrow text-[#6B5B45] font-medium">
            {currentPopup.badge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setCurrentPopup(null)}
          className="text-[#6B5B45] hover:text-[#2D3E2F] p-1 rounded-full transition-colors focus:outline-none"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3">
        <h4 className="font-display font-medium text-lg text-[#2D3E2F] leading-snug">
          {currentPopup.title}
        </h4>
        <p className="text-xs text-[#6B5B45] mt-1 leading-relaxed">
          {currentPopup.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Link
          to={currentPopup.link}
          onClick={() => setCurrentPopup(null)}
          className="text-xs font-semibold text-[#2D3E2F] bg-[#C9A961] hover:bg-[#D4B872] px-4 py-2 rounded-full transition-all tracking-wide"
        >
          {currentPopup.ctaText} →
        </Link>
      </div>
    </aside>
  );
}
