'use client';

import useATMStore from '@/store';
import { HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';

export default function AtmPinInput() {
  const pin = useATMStore((state) => state.pin);

  return (
    <VStack alignItems='center'>
      <Text fontSize='3xl'>Welcome to SC-ATM</Text>
      <HStack justify='center' pt={4} pb={6}>
        <PinInput manageFocus={false} size='lg' value={pin}>
          <PinInputField readOnly />
          <PinInputField readOnly />
          <PinInputField readOnly />
          <PinInputField readOnly />
        </PinInput>
      </HStack>
      <Text>Please enter your pin number</Text>
    </VStack>
  );
}
