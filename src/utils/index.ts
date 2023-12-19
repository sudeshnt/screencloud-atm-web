import { SkipRoundsForNotes, WithdrawErrorCodes } from '@/configs';
import { ATM_VAULT, dispenseReturnType } from '@/types';
import deepCOpy from 'lodash/cloneDeep';
import count from 'lodash/countBy';

export const formatPound = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
}).format;

export function calculateATMVaultBalance(atmVault: ATM_VAULT): number {
  return atmVault.reduce((total, currency) => total + currency.value * currency.notes, 0);
}

export function dispenseNotes(atmVault: ATM_VAULT, amount: number): dispenseReturnType {
  if (amount <= 0)
    return {
      errorCode: WithdrawErrorCodes.INVALID_WITHDRAW_AMOUNT,
    };

  const atmVaultBalance = calculateATMVaultBalance(atmVault);
  if (amount > atmVaultBalance)
    return {
      errorCode: WithdrawErrorCodes.INSUFFICIENT_ATM_BALANCE,
    };

  const changeRequiredAfterTens = amount % 10;
  if (![0, 5].includes(changeRequiredAfterTens))
    return {
      errorCode: WithdrawErrorCodes.INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE,
    };

  let remaining = amount;
  const dispensedCash: number[] = [];
  const skipRoundsForNotes = {
    '5': 0,
    '20': 0,
  };

  const atmVaultObject = getATMVaultObject(atmVault);

  if (changeRequiredAfterTens === 5) {
    if (atmVaultObject['5'] > 0) {
      atmVaultObject['5'] -= 1;
      dispensedCash.push(5);
      remaining -= 5;
      skipRoundsForNotes['5'] = SkipRoundsForNotes.FIVE;
    } else {
      return {
        errorCode: WithdrawErrorCodes.INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE,
      };
    }
  }

  while (remaining > 0) {
    if (skipRoundsForNotes['20'] === 0) {
      if (remaining >= 20 && atmVaultObject['20'] > 0) {
        atmVaultObject['20'] -= 1;
        dispensedCash.push(20);
        remaining -= 20;
        skipRoundsForNotes['20'] = SkipRoundsForNotes.TWENTY;
      }
    } else {
      skipRoundsForNotes['20']--;
    }

    if (remaining === 0) break;

    if (remaining >= 10 && atmVaultObject['10'] > 0) {
      atmVaultObject['10'] -= 1;
      dispensedCash.push(10);
      remaining -= 10;
    }

    if (remaining === 0) break;

    if (skipRoundsForNotes['5'] === 0) {
      if (remaining > 0 && atmVaultObject['5'] >= 2) {
        atmVaultObject['5'] -= 2;
        dispensedCash.push(5, 5);
        remaining -= 10;
        skipRoundsForNotes['5'] = SkipRoundsForNotes.FIVE;
      }
    } else {
      skipRoundsForNotes['5']--;
    }

    if (remaining <= 0) break;

    const isEmptyVault =
      !atmVaultObject['5'] && !atmVaultObject['10'] && !atmVaultObject['20'];

    if (isEmptyVault) break;
  }

  return {
    notes: remaining <= 0 ? count(dispensedCash) : null,
    errorCode:
      remaining <= 0
        ? undefined
        : WithdrawErrorCodes.INSUFFICIENT_CURRENCY_NOTES_TO_DISPENSE,
  };
}

export function getUpdatedATMVault(
  atmVault: ATM_VAULT,
  notesDispensed: Record<string, number>
): ATM_VAULT {
  const copyOfAtmVault = deepCOpy(atmVault);
  for (const note in notesDispensed) {
    const index = atmVault.findIndex((n) => n.value.toString() === note);
    if (index !== -1) {
      copyOfAtmVault[index].notes -= notesDispensed[note];
    }
  }
  return copyOfAtmVault;
}

export function getATMVaultObject(atmVault: ATM_VAULT) {
  return atmVault.reduce(
    (acc, cashStack) => {
      acc[cashStack.value] = cashStack.notes;
      return acc;
    },
    {} as Record<string, number>
  );
}
