'use client';

import Machine from '@/components/Machine';
import HomeScreen from '@/components/Screens/HomeScreen';
import useATMStore from '@/store';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const { withdraw, setLoading } = useATMStore((state) => state);

  const handlePressEnter = () => {
    const result = withdraw();
    if (result) {
      const query = new URLSearchParams(result).toString();
      router.push(`success?${query}`);
    }
    setLoading(false);
  };

  return (
    <section className='page'>
      <Machine
        inputType='withdrawAmount'
        screen={<HomeScreen />}
        onPressEnter={handlePressEnter}
      />
    </section>
  );
}
