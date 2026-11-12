import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, qty = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.slug === product.slug || item.id === product.id
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += qty;
            return { items: updated };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id || product.slug,
                slug: product.slug,
                name: product.name,
                subtitle: product.subtitle || '',
                tagline: product.tagline || '',
                price: product.price,
                discount: product.discount || null,
                bottleImage: product.bottleImage || product.image,
                quantity: qty
              }
            ]
          };
        });
      },

      removeItem: (slugOrId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.slug !== slugOrId && item.id !== slugOrId
          )
        }));
      },

      updateQuantity: (slugOrId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(slugOrId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slugOrId || item.id === slugOrId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const effectivePrice = item.discount?.salePrice || item.price || 0;
          return sum + effectivePrice * (item.quantity || 1);
        }, 0);
      }
    }),
    {
      name: 'satvam_cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);
