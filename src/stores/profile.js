import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateDefaultName = () => 'Guest-' + Math.random().toString(36).slice(2, 7);

export const DEFAULT_ORDERS = [
  {
    id: 'SV-84291',
    date: '10 Nov 2026, 04:15 PM',
    status: 'Delivered',
    batchCode: 'LOT-SV-2026-B4',
    trackingNumber: 'DEL-IND-90823412',
    deliveryDate: '12 Nov 2026',
    total: 1048,
    items: [
      {
        slug: 'keshkanti',
        name: 'Keshkanti',
        bottleImage: 'references/products/keshkanti-bottle.webp',
        price: 549,
        quantity: 1
      },
      {
        slug: 'amla-pitta',
        name: 'Amla-Pitta',
        bottleImage: 'references/products/amla-pitta-bottle.webp',
        price: 499,
        quantity: 1
      }
    ]
  }
];

export const useProfileStore = create(
  persist(
    (set, get) => ({
      name: generateDefaultName(),
      gender: 'all',
      ageBand: '25-34',
      hairTypes: [],
      concerns: [],
      wishlist: [],
      favorites: [],
      orders: DEFAULT_ORDERS,
      avatar: null,
      quizResults: null,
      popupsDisabled: false,

      setName: (name) => set({ name: name || generateDefaultName() }),
      setAvatar: (avatar) => set({ avatar }),
      removeAvatar: () => set({ avatar: null }),
      setGender: (gender) => set({ gender }),
      setAgeBand: (ageBand) => set({ ageBand }),
      setHairTypes: (hairTypes) => set({ hairTypes }),
      setConcerns: (concerns) => set({ concerns }),

      toggleHairType: (type) => {
        const current = get().hairTypes;
        const updated = current.includes(type)
          ? current.filter((t) => t !== type)
          : [...current, type];
        set({ hairTypes: updated });
      },

      toggleConcern: (concern) => {
        const current = get().concerns;
        const updated = current.includes(concern)
          ? current.filter((c) => c !== concern)
          : [...current, concern];
        set({ concerns: updated });
      },

      toggleWishlist: (slug) => {
        const current = get().wishlist;
        const updated = current.includes(slug)
          ? current.filter((s) => s !== slug)
          : [...current, slug];
        set({ wishlist: updated });
      },

      toggleFavorite: (slug) => {
        const current = get().favorites;
        const updated = current.includes(slug)
          ? current.filter((s) => s !== slug)
          : [...current, slug];
        set({ favorites: updated });
      },

      addOrder: (order) => {
        const current = get().orders || [];
        set({ orders: [order, ...current] });
      },

      clearOrders: () => set({ orders: [] }),

      setQuizResults: (results) => set({ quizResults: results }),

      setPopupsDisabled: (disabled) => {
        if (typeof window !== 'undefined') {
          if (disabled) {
            localStorage.setItem('satvam_popups_disabled', '1');
          } else {
            localStorage.removeItem('satvam_popups_disabled');
          }
        }
        set({ popupsDisabled: disabled });
      }
    }),
    {
      name: 'satvam_profile',
      onRehydrateStorage: () => (state) => {
        if (typeof window !== 'undefined' && state) {
          const disabled = localStorage.getItem('satvam_popups_disabled') === '1';
          if (disabled) {
            state.popupsDisabled = true;
          }
          if (!state.orders || state.orders.length === 0) {
            state.orders = DEFAULT_ORDERS;
          }
        }
      }
    }
  )
);
