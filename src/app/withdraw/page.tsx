'use client';

import Machine from '@/components/Machine';
import WithdrawScreen from '@/components/Screens/WithdrawScreen';

export default function WithdrawPage() {
  return (
    <section className='page'>
      <Machine inputType='withdrawAmount' screen={<WithdrawScreen />} />
    </section>
  );
}
