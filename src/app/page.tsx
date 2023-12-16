'use client';

import Machine from '@/components/Machine';
import SignInScreen from '@/components/Screens/SignInScreen';
import useATMStore from '@/store';

export default function SignInPage() {
  const { appendToPin, deleteFromPin, clearPin, validatePin } = useATMStore(
    (state) => state
  );

  return (
    <section className='page'>
      <Machine
        screen={<SignInScreen />}
        onPressKey={appendToPin}
        onPressEnter={validatePin}
        onPressClear={deleteFromPin}
        onPressCancel={clearPin}
      />
    </section>
  );
}
