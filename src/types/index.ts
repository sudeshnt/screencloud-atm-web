// eslint-disable no-unused-vars

export type ATMState = {
  pin: string;
  isAuthenticated: boolean;
  currentBalance: number;
  withdrawAmount: number;
  isLoading: boolean;
  error: string;
  warning: string;
  appendInput: (key: InputType, digit: string) => void;
  deleteInput: (key: InputType) => void;
  clearInput: (key: InputType) => void;
  validatePin: () => Promise<boolean>;
  setLoading: (isLoading: boolean) => void;
};

export type InputType = keyof Pick<ATMState, 'pin' | 'withdrawAmount'>;

export type PinValidateResponse = {
  currentBalance?: number;
  error?: string;
};
