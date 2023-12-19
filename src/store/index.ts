import {
  ATM_VAULT,
  MAX_OVERDRAW,
  PIN_LENGTH,
  WithdrawErrorCodes,
  WithdrawErrorMessages,
} from '@/configs';
import { validatePin } from '@/services';
import { ATMState, InputType } from '@/types';
import { dispenseNotes, formatPound, getUpdatedATMVault } from '@/utils';
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
          warning: '',
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
        warning: '',
      };
    });
  },
  clearInput: (key: InputType) => {
    set({
      [key]: '',
      error: '',
      warning: '',
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
    const currentBalance = user.currentBalance;

    if (withdrawAmount > currentBalance + MAX_OVERDRAW) {
      set({
        error: 'Insufficient balance in the account and exceeded overdraft limit.',
      });
      return null;
    }

    set({
      isLoading: true,
    });

    const notesToDispense = dispenseNotes(atmVault, withdrawAmount);

    if (notesToDispense.errorCode || !notesToDispense.notes) {
      set({
        error:
          WithdrawErrorMessages[notesToDispense.errorCode ?? WithdrawErrorCodes.DEFAULT],
      });
      return null;
    }

    const updatedATMVault = getUpdatedATMVault(atmVault, notesToDispense.notes);
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
      notes: JSON.stringify(notesToDispense.notes),
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
