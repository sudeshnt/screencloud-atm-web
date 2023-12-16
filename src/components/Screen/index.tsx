import { VStack } from '@chakra-ui/react';
import AtmPinInput from './AtmPinInput';

export default function Screen() {
  return (
    <VStack
      justify='center'
      className='container  h-full w-[400px] bg-[#abb280] text-black'
    >
      <AtmPinInput />
    </VStack>
  );
}
