export const MACHINE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export const PIN_LENGTH = 4;

export const ATM_VAULT = [
  { value: 5, notes: 4 },
  { value: 10, notes: 15 },
  { value: 20, notes: 7 },
];

export const MAX_OVERDRAW = 100;

export enum WithdrawErrorCodes {
  INVALID_WITHDRAW_AMOUNT,
  INSUFFICIENT_ACCOUNT_BALANCE,
  INSUFFICIENT_ATM_BALANCE,
  INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE,
  DEFAULT,
}

export const WithdrawErrorMessages: Record<WithdrawErrorCodes, string> = {
  [WithdrawErrorCodes.INVALID_WITHDRAW_AMOUNT]: 'Please input valid withdraw amount.',
  [WithdrawErrorCodes.INSUFFICIENT_ACCOUNT_BALANCE]:
    'Insufficient account balance and exceeded overdraft limit.',
  [WithdrawErrorCodes.INSUFFICIENT_ATM_BALANCE]: 'Insufficient funds in the ATM.',
  [WithdrawErrorCodes.INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE]:
    'Unavailable notes to dispense requested amount.',
  [WithdrawErrorCodes.DEFAULT]: 'Cannot dispense requested amount at this moment.',
};

export enum SkipRoundsForNotes {
  'FIVE' = 8,
  'TWENTY' = 1,
}
