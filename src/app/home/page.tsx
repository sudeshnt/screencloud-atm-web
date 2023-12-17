'use client';

import Machine from '@/components/Machine';
import HomeScreen from '@/components/Screens/HomeScreen';

export default function HomePage() {
  return (
    <section className='page'>
      <Machine screen={<HomeScreen />} />
    </section>
  );
}
