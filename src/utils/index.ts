import { ATM_VAULT } from '@/types';

export const formatPound = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
}).format;

export function calculateATMVaultBalance(atmVault: ATM_VAULT): number {
  return atmVault.reduce((total, currency) => total + currency.value * currency.notes, 0);
}

export function dispenseNotes(atmVault: ATM_VAULT, amount: number) {
  const sortedATM = atmVault.slice().sort((a, b) => b.value - a.value); // Sort in descending order

  const result: Record<string, number> = {};

  for (const note of sortedATM) {
    const notesToWithdraw = Math.min(Math.floor(amount / note.value), note.notes);

    if (notesToWithdraw > 0) {
      result[note.value] = notesToWithdraw;
      // result.push({ value: note.value, notes: notesToWithdraw });
      amount -= notesToWithdraw * note.value;
    }

    if (amount === 0) {
      return result; // Successful withdrawal
    }
  }

  return null;
}

export function getUpdatedATMVault(
  atmVault: ATM_VAULT,
  notesDispensed: Record<string, number>
): ATM_VAULT {
  const copyOfAtmVault = atmVault;
  for (const note in notesDispensed) {
    const index = atmVault.findIndex((n) => n.value.toString() === note);
    if (index !== -1) {
      copyOfAtmVault[index].notes -= notesDispensed[note];
    }
  }
  return copyOfAtmVault;
}
