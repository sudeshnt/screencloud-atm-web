'use client';

import useATMStore from '@/store';
import { HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';

export default function AtmPinInput() {
  const pin = useATMStore((state) => state.pin);

  return (
    <VStack>
      <Text fontSize='3xl'>Welcome to SC-ATM</Text>
      <HStack pt={4} pb={6} pointerEvents='none'>
        <PinInput size='lg' value={pin} errorBorderColor='red'>
          <PinInputField className='placeholder:text-white' readOnly />
          <PinInputField className='placeholder:text-white' readOnly />
          <PinInputField className='placeholder:text-white' readOnly />
          <PinInputField className='placeholder:text-white' readOnly />
        </PinInput>
      </HStack>
      <Text>Please enter your pin number</Text>
    </VStack>
  );
}
