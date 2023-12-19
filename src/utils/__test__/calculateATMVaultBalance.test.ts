import { ATM_VAULT } from '@/types';
import { calculateATMVaultBalance } from '..';

describe('calculateATMVaultBalance function', () => {
  it('calculates balance for an empty vault', () => {
    const emptyVault: ATM_VAULT = [];
    const result = calculateATMVaultBalance(emptyVault);
    expect(result).toBe(0);
  });

  it('calculates balance for a vault with one currency', () => {
    const vault: ATM_VAULT = [{ value: 20, notes: 3 }];
    const result = calculateATMVaultBalance(vault);
    expect(result).toBe(20 * 3);
  });

  it('calculates balance for a vault with multiple currencies', () => {
    const vault: ATM_VAULT = [
      { value: 5, notes: 10 },
      { value: 10, notes: 8 },
      { value: 20, notes: 4 },
    ];
    const result = calculateATMVaultBalance(vault);
    expect(result).toBe(5 * 10 + 10 * 8 + 20 * 4);
  });

  it('calculates balance for a vault with zero notes', () => {
    const vault: ATM_VAULT = [
      { value: 5, notes: 0 },
      { value: 10, notes: 0 },
      { value: 20, notes: 0 },
    ];
    const result = calculateATMVaultBalance(vault);
    expect(result).toBe(0);
  });
});
