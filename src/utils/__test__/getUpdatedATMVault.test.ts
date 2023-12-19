// Assume you have the deepCopy function defined

import { ATM_VAULT } from '@/types';
import { getUpdatedATMVault } from '..';

describe('getUpdatedATMVault function', () => {
  it('updates vault with notes dispensed correctly', () => {
    const initialVault: ATM_VAULT = [
      { value: 10, notes: 5 },
      { value: 20, notes: 3 },
      { value: 50, notes: 2 },
    ];
    const notesDispensed = { '10': 2, '20': 1, '50': 1 };

    const updatedVault = getUpdatedATMVault(initialVault, notesDispensed);

    expect(updatedVault).toEqual([
      { value: 10, notes: 3 },
      { value: 20, notes: 2 },
      { value: 50, notes: 1 },
    ]);
  });

  it('handles notes not present in the vault', () => {
    const initialVault: ATM_VAULT = [
      { value: 10, notes: 5 },
      { value: 20, notes: 3 },
    ];
    const notesDispensed = { '100': 2, '50': 1 };

    const updatedVault = getUpdatedATMVault(initialVault, notesDispensed);

    expect(updatedVault).toEqual(initialVault);
  });

  it('handles dispensing more notes than available in the vault', () => {
    const initialVault: ATM_VAULT = [
      { value: 10, notes: 5 },
      { value: 20, notes: 3 },
    ];
    const notesDispensed = { '10': 7, '20': 5 };

    const updatedVault = getUpdatedATMVault(initialVault, notesDispensed);

    // The vault should not have negative note counts
    expect(updatedVault).toEqual([
      { value: 10, notes: 0 },
      { value: 20, notes: 0 },
    ]);
  });

  it('handles an empty vault', () => {
    const initialVault: ATM_VAULT = [];
    const notesDispensed = { '10': 2, '20': 1 };

    const updatedVault = getUpdatedATMVault(initialVault, notesDispensed);

    expect(updatedVault).toEqual([]);
  });
});
