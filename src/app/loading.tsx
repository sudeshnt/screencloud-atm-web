'use client';

import Loader from '@/components/Core/Loader';
import Screen from '@/components/Layout/Screen';
import Machine from '@/components/Machine';

export default function LoadingPage() {
  return (
    <section className='page'>
      <Machine
        screen={
          <Screen>
            <Loader />
          </Screen>
        }
      />
    </section>
  );
}
