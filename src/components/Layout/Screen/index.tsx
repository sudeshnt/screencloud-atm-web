import { VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <VStack
      justify='center'
      className='font-screen container h-full w-[400px] bg-[#abb280] text-black'
    >
      {children}
    </VStack>
  );
}
