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
      };
    });
  },
  deleteFromPin: () => {
    set((state) => {
      const pin = state.pin;
      return {
        pin: pin.length ? state.pin.slice(0, -1) : pin,
      };
    });
  },
  clearPin: () => {
    set({
      pin: '',
    });
  },
  validatePin: async () => {
    try {
      const { pin } = get();

      if (pin.length === 4) {
        set({ isLoading: true });

        const response = await validatePin(pin);

        if (response.currentBalance) {
          set({
            currentBalance: response.currentBalance,
            isAuthenticated: true,
            error: '',
          });
        } else {
          set({
            isAuthenticated: false,
            error: response.error,
          });
        }
      }
      set({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useATMStore;
