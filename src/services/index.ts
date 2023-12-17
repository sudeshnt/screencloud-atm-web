'use server';

import { PinValidateResponse } from '../types';

export async function validatePin(pin: string): Promise<PinValidateResponse> {
  try {
    const res = await fetch(`${process.env.API_HOST}/api/pin`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pin,
      }),
    });
    return await res.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
