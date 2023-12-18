'use client';

import Screen from '@/components/Layout/Screen';
import Machine from '@/components/Machine';
import { Text } from '@chakra-ui/react';

export default function ErrorPage() {
  return (
    <section className='page'>
      <Machine
        screen={
          <Screen>
            <Text>System Error.</Text>
          </Screen>
        }
      />
    </section>
  );
}
