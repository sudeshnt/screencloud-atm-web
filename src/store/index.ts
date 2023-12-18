import { ATM_VAULT, MAX_OVERDRAW, PIN_LENGTH } from '@/configs';
import { validatePin } from '@/services';
import { ATMState, InputType } from '@/types';
import {
  calculateATMVaultBalance,
  dispenseNotes,
  formatPound,
  getUpdatedATMVault,
} from '@/utils';
import isEmpty from 'lodash/isEmpty';
import { create } from 'zustand';

const useATMStore = create<ATMState>((set, get) => ({
  atmVault: ATM_VAULT,
  pin: '',
  user: {
    isAuthenticated: false,
    name: '',
    currentBalance: 0,
    overdrawnAmount: 0,
  },
  withdrawAmount: 0,
  isLoading: false,
  error: '',
  warning: '',
  appendInput: (key: InputType, digit: string) => {
    const isInputValid = !isNaN(parseInt(digit));

    if (isInputValid) {
      set((state) => {
        const currentInput = state[key];
        const updatedInput = `${currentInput}${digit}`;

        return {
          [key]:
            key === 'withdrawAmount' && !isNaN(parseInt(updatedInput))
              ? parseInt(updatedInput)
              : updatedInput,
          error: '',
        };
      });
    }
  },
  deleteInput: (key: InputType) => {
    set((state) => {
      const currentInput = String(state[key]);
      const updatedInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '';

      return {
        [key]:
          key === 'withdrawAmount' && !isNaN(parseInt(updatedInput))
            ? parseInt(updatedInput)
            : updatedInput,
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
      const pin = get().pin;

      if (pin.length === PIN_LENGTH) {
        set({ isLoading: true });

        const response = await validatePin(pin);
        isAuthenticated = !response.error && response.currentBalance != null;

        set({
          user: {
            isAuthenticated,
            name: 'Michael',
            currentBalance: response.currentBalance ?? 0,
            overdrawnAmount: 0,
          },
          pin: isAuthenticated ? '' : pin,
          error: response.error,
        });
      }

      return isAuthenticated;
    } catch (err) {
      set({ isLoading: false });
      return isAuthenticated;
    }
  },
  withdraw: () => {
    const { atmVault, withdrawAmount, user } = get();
    const atmVaultBalance = calculateATMVaultBalance(atmVault);
    const currentBalance = user.currentBalance;

    set({
      isLoading: true,
    });

    if (withdrawAmount > currentBalance + MAX_OVERDRAW) {
      set({
        error: 'Insufficient balance in the account and exceeded overdraft limit.',
      });
      return null;
    }

    if (withdrawAmount > atmVaultBalance) {
      set({
        error: 'Insufficient funds in the ATM.',
      });
      return null;
    }

    const notesToDispense = dispenseNotes(atmVault, withdrawAmount);

    if (isEmpty(notesToDispense)) {
      set({
        error: 'Insufficient funds or available notes to dispense.',
      });
      return null;
    }

    const updatedATMVault = getUpdatedATMVault(atmVault, notesToDispense);
    const updatedCurrentBalance = currentBalance - withdrawAmount;
    const overdrawnAmount = Math.max(0, withdrawAmount - currentBalance);

    set({
      atmVault: updatedATMVault,
      user: {
        ...user,
        currentBalance: updatedCurrentBalance,
        overdrawnAmount,
      },
      withdrawAmount: 0,
    });

    return {
      withdrawAmount: formatPound(withdrawAmount),
      notes: JSON.stringify(notesToDispense),
      overdrawnAmount,
    };
  },
  resetAtm: () => {
    set({
      atmVault: ATM_VAULT,
      user: {
        isAuthenticated: false,
        name: '',
        currentBalance: 0,
        overdrawnAmount: 0,
      },
      withdrawAmount: 0,
      error: '',
      warning: '',
    });
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
      }, 1000);
    }
  },
}));

export default useATMStore;
