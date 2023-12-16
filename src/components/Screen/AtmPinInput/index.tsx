import { HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';

export default function AtmPinInput() {
  return (
    <VStack alignItems='center' className='font-screen'>
      <Text fontSize='3xl'>Welcome to SC-ATM</Text>
      <HStack justify='center' pt={4} pb={6}>
        <PinInput manageFocus={false} size='lg'>
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
