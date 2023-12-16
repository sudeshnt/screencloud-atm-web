'use client';

import Machine from '@/components/Machine';
import SignInScreen from '@/components/Screens/SignInScreen';
import useATMStore from '@/store';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const { appendToPin, deleteFromPin, clearPin, validatePin, setLoading } = useATMStore(
    (state) => state
  );

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
        screen={<SignInScreen />}
        onPressKey={appendToPin}
        onPressEnter={handlePressEnter}
        onPressClear={deleteFromPin}
        onPressCancel={clearPin}
      />
    </section>
  );
}
