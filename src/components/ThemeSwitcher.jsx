import React from 'react';
import { Monitor, Sun, MoonStar } from 'lucide-react';
import { useThemeStore } from '../stores/theme';

export default function ThemeSwitcher() {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  const options = [
    { id: 'system', icon: Monitor, label: 'System theme' },
    { id: 'light', icon: Sun, label: 'Light theme' },
    { id: 'dark', icon: MoonStar, label: 'Dark theme' }
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme switcher"
      className="inline-flex items-center p-0.5 sm:p-1 rounded-full border border-[#6B5B45]/20 bg-[#F5EFE3]/75 backdrop-blur-xs shadow-2xs"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = mode === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setMode(opt.id)}
            className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A961] ${
              isActive
                ? 'bg-[#FFFFFF] text-[#2D3E2F] shadow-xs border border-[#6B5B45]/15'
                : 'text-[#6B5B45]/65 hover:text-[#2D3E2F] hover:bg-[#FAF7F0]/40'
            }`}
          >
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.8]" />
          </button>
        );
      })}
    </div>
  );
}
