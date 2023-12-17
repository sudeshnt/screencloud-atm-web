import { validatePin } from '@/services';
import { ATMState, InputType } from '@/types';
import { create } from 'zustand';

const useATMStore = create<ATMState>((set, get) => ({
  pin: '',
  isAuthenticated: false,
  currentBalance: 0,
  withdrawAmount: 0,
  isLoading: false,
  error: '',
  warning: '',
  appendInput: (key: InputType, digit: string) => {
    set((state) => {
      const currentInput = state[key];
      return {
        [key]: `${currentInput}${digit}`,
        error: '',
      };
    });
  },
  deleteInput: (key: InputType) => {
    set((state) => {
      const currentInput = state[key];
      return {
        [key]: String(currentInput).slice(0, -1),
        error: '',
      };
    });
  },
  clearInput: (key: InputType) => {
    set({
      [key]: '',
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
      }, 600);
    }
  },
}));

export default useATMStore;
