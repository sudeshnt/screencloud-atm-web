'use client';

import Machine from '@/components/Machine';
import WithdrawScreen from '@/components/Screens/WithdrawScreen';
import useATMStore from '@/store';
import { useRouter } from 'next/navigation';

export default function WithdrawPage() {
  const router = useRouter();

  const withdraw = useATMStore((state) => state.withdraw);

  const handlePressEnter = () => {
    const result = withdraw();
    if (result) {
      const query = new URLSearchParams(result).toString();
      router.push(`success?${query}`);
    }
  };

  return (
    <section className='page'>
      <Machine
        inputType='withdrawAmount'
        screen={<WithdrawScreen />}
        onPressEnter={handlePressEnter}
      />
    </section>
  );
}
