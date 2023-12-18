'use client';

import Screen from '@/components/Layout/Screen';
import Machine from '@/components/Machine';
import { Text } from '@chakra-ui/react';

export default function NotFoundPage() {
  return (
    <section className='page'>
      <Machine
        screen={
          <Screen>
            <Text>Not Found.</Text>
          </Screen>
        }
      />
    </section>
  );
}
