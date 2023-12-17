'use client';

import Machine from '@/components/Machine';
import SignInScreen from '@/components/Screens/SignInScreen';
import useATMStore from '@/store';
import { InputType } from '@/types';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const { pin, appendInput, deleteInput, clearInput, validatePin, setLoading } =
    useATMStore((state) => state);

  const handlePressKey = (inputType: InputType, digit: string) => {
    if (pin.length < 4) {
      appendInput(inputType, digit);
    }
  };

  const handlePressEnter = async () => {
    const isAuthenticated = await validatePin();

    if (isAuthenticated) {
      setLoading(false);
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
        onPressClear={deleteInput}
        onPressCancel={clearInput}
      />
    </section>
  );
}
