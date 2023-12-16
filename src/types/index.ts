export type ATMState = {
  pin: string;
  isAuthenticated: boolean;
  currentBalance: number;
  isLoading: boolean;
  error: string;
  warning: string;
  appendToPin: (digit: string) => void;
  deleteFromPin: () => void;
  clearPin: () => void;
  validatePin: () => Promise<void>;
};

export type PinValidateResponse = {
  currentBalance?: number;
  error?: string;
};
