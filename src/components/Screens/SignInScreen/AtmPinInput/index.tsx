'use client';

import { PIN_LENGTH } from '@/configs';
import useATMStore from '@/store';
import { HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';

export default function AtmPinInput() {
  const pin = useATMStore((state) => state.pin);

  return (
    <VStack>
      <Text fontSize='3xl'>Welcome to SC-ATM</Text>
      <HStack pt={4} pb={6} pointerEvents='none'>
        <PinInput size='lg' value={pin}>
          {Array.from({ length: PIN_LENGTH }, (_, index) => (
            <PinInputField
              key={index}
              fontSize='2xl'
              className='border-black placeholder:text-black'
              readOnly
            />
          ))}
        </PinInput>
      </HStack>
      <Text>Please enter your pin number</Text>
    </VStack>
  );
}
