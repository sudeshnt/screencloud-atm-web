// eslint-disable no-unused-vars

export type ATMState = {
  pin: string;
  isAuthenticated: boolean;
  currentBalance: number;
  withdrawAmount: number;
  isLoading: boolean;
  error: string;
  warning: string;
  atmVault: CurrencyStack[];
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
