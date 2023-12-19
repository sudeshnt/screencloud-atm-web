import { ATM_VAULT } from '@/types';
import { getATMVaultObject } from '..';

describe('getATMVaultObject function', () => {
  it('returns an empty object for an empty vault', () => {
    const emptyVault: ATM_VAULT = [];
    const result = getATMVaultObject(emptyVault);
    expect(result).toEqual({});
  });

  it('returns correct object for a vault with one currency', () => {
    const vault: ATM_VAULT = [{ value: 10, notes: 5 }];
    const result = getATMVaultObject(vault);
    expect(result).toEqual({ 10: 5 });
  });

  it('returns correct object for a vault with multiple currencies', () => {
    const vault: ATM_VAULT = [
      { value: 5, notes: 10 },
      { value: 10, notes: 8 },
      { value: 20, notes: 4 },
    ];
    const result = getATMVaultObject(vault);
    expect(result).toEqual({ 5: 10, 10: 8, 20: 4 });
  });

  it('returns correct object for a vault with zero notes', () => {
    const vault: ATM_VAULT = [
      { value: 5, notes: 0 },
      { value: 10, notes: 0 },
      { value: 20, notes: 0 },
    ];
    const result = getATMVaultObject(vault);
    expect(result).toEqual({ 5: 0, 10: 0, 20: 0 });
  });
});
