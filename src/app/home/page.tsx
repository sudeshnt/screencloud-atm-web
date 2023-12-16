'use client';

import Machine from '@/components/Machine';
import HomeScreen from '@/components/Screens/HomeScreen';

export default function HomePage() {
  return (
    <section className='page'>
      <Machine
        screen={<HomeScreen />}
        onPressKey={(key) => console.log(key)}
        onPressEnter={() => console.log('enter')}
        onPressClear={() => console.log('clear')}
        onPressCancel={() => console.log('cancel')}
      />
    </section>
  );
}
