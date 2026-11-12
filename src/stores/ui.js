import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  isPaymentModalOpen: false,
  paymentSource: null,
  isMobileNavOpen: false,
  activePopup: null,
  sessionPopupsCount: 0,
  toast: null,
  _toastTimeout: null,

  openPaymentModal: (source = null) => set({ isPaymentModalOpen: true, paymentSource: source }),
  closePaymentModal: () => set({ isPaymentModalOpen: false, paymentSource: null }),

  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

  setActivePopup: (popup) =>
    set((state) => ({
      activePopup: popup,
      sessionPopupsCount: popup ? state.sessionPopupsCount + 1 : state.sessionPopupsCount
    })),
  dismissPopup: () => set({ activePopup: null }),

  showToast: (message, type = 'favorite') => {
    if (get()._toastTimeout) {
      clearTimeout(get()._toastTimeout);
    }
    set({ toast: { id: Date.now(), message, type } });
    const timeout = setTimeout(() => {
      set({ toast: null });
    }, 2800);
    set({ _toastTimeout: timeout });
  },
  dismissToast: () => {
    if (get()._toastTimeout) {
      clearTimeout(get()._toastTimeout);
    }
    set({ toast: null });
  }
}));
