// eslint-disable no-unused-vars
import { WithdrawErrorCodes } from '@/configs';

export type ATMState = {
  atmVault: CurrencyStack[];
  pin: string;
  user: User;
  withdrawAmount: number;
  error: string;
  warning: string;
  isLoading: boolean;
  appendInput: (key: InputType, digit: string) => void;
  deleteInput: (key: InputType) => void;
  clearInput: (key: InputType) => void;
  validatePin: () => Promise<boolean>;
  withdraw: () => WithdrawObject | null;
  resetAtm: () => void;
  setLoading: (isLoading: boolean) => void;
};

export type InputType = keyof Pick<ATMState, 'pin' | 'withdrawAmount'>;

export type PinValidateResponse = {
  currentBalance?: number;
  error?: string;
};

export type User = {
  isAuthenticated: boolean;
  name: string;
  currentBalance: number;
  overdrawnAmount: number;
};

export type CurrencyStack = {
  value: number;
  notes: number;
};

export type ATM_VAULT = CurrencyStack[];

export type WithdrawObject = {
  withdrawAmount: string;
  notes: string;
};

export type Note = {
  value: number;
  notes: number;
};

export type dispenseReturnType = {
  notes?: Record<string, number> | null;
  errorCode?: WithdrawErrorCodes;
};
