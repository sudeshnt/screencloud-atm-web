import { validatePin } from '@/services';
import { ATMState } from '@/types';
import { create } from 'zustand';

const useATMStore = create<ATMState>((set, get) => ({
  pin: '',
  isAuthenticated: false,
  currentBalance: 0,
  isLoading: false,
  error: '',
  warning: '',
  appendToPin: (digit: string) => {
    set((state) => {
      const pin = state.pin;
      return {
        pin: pin.length < 4 ? `${state.pin}${digit}` : pin,
        error: '',
      };
    });
  },
  deleteFromPin: () => {
    set((state) => {
      const pin = state.pin;
      return {
        pin: pin.length ? state.pin.slice(0, -1) : pin,
        error: '',
      };
    });
  },
  clearPin: () => {
    set({
      pin: '',
      error: '',
    });
  },
  validatePin: async () => {
    let isAuthenticated = false;
    try {
      const { pin } = get();

      if (pin.length === 4) {
        set({ isLoading: true });

        const response = await validatePin(pin);
        isAuthenticated = !response.error && response.currentBalance != null;

        set({
          pin: isAuthenticated ? '' : pin,
          isAuthenticated,
          currentBalance: response.currentBalance,
          error: response.error,
        });
      }

      return isAuthenticated;
    } catch (err) {
      set({ isLoading: false });
      return isAuthenticated;
    }
  },
  setLoading: (isLoading: boolean) => {
    if (isLoading) {
      set({
        isLoading,
      });
    } else {
      setTimeout(() => {
        set({
          isLoading,
        });
      }, 200);
    }
  },
}));

export default useATMStore;
