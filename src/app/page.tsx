'use client';

import Machine from '@/components/Machine';
import SignInScreen from '@/components/Screens/SignInScreen';
import { PIN_LENGTH } from '@/configs';
import useATMStore from '@/store';
import { InputType } from '@/types';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const { pin, appendInput, validatePin, setLoading } = useATMStore((state) => state);

  const handlePressKey = (inputType: InputType, digit: string) => {
    if (pin.length < PIN_LENGTH) {
      appendInput(inputType, digit);
    }
  };

  const handlePressEnter = async () => {
    const isAuthenticated = await validatePin();

    setLoading(false);

    if (isAuthenticated) {
      router.push('home');
    }
  };

  return (
    <section className='page'>
      <Machine
        inputType='pin'
        screen={<SignInScreen />}
        onPressKey={handlePressKey}
        onPressEnter={handlePressEnter}
      />
    </section>
  );
}
