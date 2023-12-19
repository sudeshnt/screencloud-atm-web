import { ATM_VAULT } from '@/types';
import { dispenseNotes } from '..';
import { WithdrawErrorCodes } from '../../configs';

describe('dispenseNotes', () => {
  // Helper function to create an ATM vault with a given structure
  const createATMVault = (data: { value: number; notes: number }[]): ATM_VAULT => data;

  it('should dispense valid notes for a valid withdrawal amount', () => {
    const atmVault = createATMVault([
      { value: 20, notes: 5 },
      { value: 10, notes: 10 },
    ]);
    const result = dispenseNotes(atmVault, 150);
    expect(result.errorCode).toBeUndefined();
    expect(result.notes).toEqual({ '20': 4, '10': 7 });
  });

  it('should handle dispensing with only 5s when necessary', () => {
    const atmVault = createATMVault([{ value: 5, notes: 5 }]);
    const result = dispenseNotes(atmVault, 25);

    expect(result.errorCode).toBeUndefined();
    expect(result.notes).toEqual({ '5': 5 });
  });

  it('should handle dispensing with a mix of notes', () => {
    const atmVault = createATMVault([
      { value: 20, notes: 2 },
      { value: 10, notes: 5 },
    ]);
    const result = dispenseNotes(atmVault, 70);

    expect(result.errorCode).toBeUndefined();
    expect(result.notes).toEqual({ '20': 2, '10': 3 });
  });

  it('should handle dispensing with a mix of notes and 5s when necessary', () => {
    const atmVault = createATMVault([
      { value: 20, notes: 2 },
      { value: 10, notes: 5 },
      { value: 5, notes: 5 },
    ]);
    const result = dispenseNotes(atmVault, 75);

    expect(result.errorCode).toBeUndefined();
    expect(result.notes).toEqual({ '20': 2, '10': 3, '5': 1 });
  });

  it('should handle dispensing with insufficient 5s', () => {
    const atmVault = createATMVault([{ value: 10, notes: 5 }]);
    const result = dispenseNotes(atmVault, 15);
    expect(result.errorCode).toBe(
      WithdrawErrorCodes.INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE
    );
    expect(result.notes).toBeUndefined();
  });

  it('should handle dispensing with an invalid withdrawal amount', () => {
    const atmVault = createATMVault([
      { value: 20, notes: 5 },
      { value: 10, notes: 10 },
    ]);
    const result = dispenseNotes(atmVault, -50);

    expect(result.errorCode).toBe(WithdrawErrorCodes.INVALID_WITHDRAW_AMOUNT);
    expect(result.notes).toBeUndefined();
  });

  it('should handle dispensing with insufficient ATM balance', () => {
    const atmVault = createATMVault([{ value: 20, notes: 5 }]);
    const result = dispenseNotes(atmVault, 150);

    expect(result.errorCode).toBe(WithdrawErrorCodes.INSUFFICIENT_ATM_BALANCE);
    expect(result.notes).toBeUndefined();
  });

  it('should handle dispensing with an empty ATM vault', () => {
    const atmVault: ATM_VAULT = [];
    const result = dispenseNotes(atmVault, 50);

    expect(result.errorCode).toBe(WithdrawErrorCodes.INSUFFICIENT_ATM_BALANCE);
    expect(result.notes).toBeUndefined();
  });
});
