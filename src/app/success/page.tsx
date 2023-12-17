'use client';

import Machine from '@/components/Machine';
import SuccessScreen from '@/components/Screens/SuccessScreen';

export default function SuccessPage() {
  return (
    <section className='page'>
      <Machine screen={<SuccessScreen />} />
    </section>
  );
}
