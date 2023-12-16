'use client';

import Machine from '@/components/Machine';
import WithdrawScreen from '@/components/Screens/WithdrawScreen';

export default function WithdrawPage() {
  return (
    <section className='page'>
      <Machine
        screen={<WithdrawScreen />}
        onPressKey={(key) => console.log(key)}
        onPressEnter={() => console.log('enter')}
        onPressClear={() => console.log('clear')}
        onPressCancel={() => console.log('cancel')}
      />
    </section>
  );
}
