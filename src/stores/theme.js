import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getSystemTheme = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const applyThemeToDocument = (resolvedTheme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'system', // 'system' | 'light' | 'dark'
      resolvedTheme: getSystemTheme(),

      setMode: (mode) => {
        const resolvedTheme = mode === 'system' ? getSystemTheme() : mode;
        set({ mode, resolvedTheme });
        applyThemeToDocument(resolvedTheme);
      },

      initTheme: () => {
        const { mode } = get();
        const resolvedTheme = mode === 'system' ? getSystemTheme() : mode;
        set({ resolvedTheme });
        applyThemeToDocument(resolvedTheme);

        if (typeof window !== 'undefined' && window.matchMedia) {
          const media = window.matchMedia('(prefers-color-scheme: dark)');
          const listener = (e) => {
            if (get().mode === 'system') {
              const newResolved = e.matches ? 'dark' : 'light';
              set({ resolvedTheme: newResolved });
              applyThemeToDocument(newResolved);
            }
          };

          if (media.addEventListener) {
            media.addEventListener('change', listener);
          } else if (media.addListener) {
            media.addListener(listener);
          }
        }
      }
    }),
    {
      name: 'satvam_theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolvedTheme = state.mode === 'system' ? getSystemTheme() : state.mode;
          state.resolvedTheme = resolvedTheme;
          applyThemeToDocument(resolvedTheme);
        }
      }
    }
  )
);
