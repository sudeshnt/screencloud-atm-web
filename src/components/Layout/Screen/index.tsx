/* eslint-disable tailwindcss/classnames-order  */
/* eslint-disable prettier/prettier */

import Loader from '@/components/Core/Loader';
import useATMStore from '@/store';
import { Alert, AlertIcon, Box, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  const isLoading = useATMStore((state) => state.isLoading);
  const error = useATMStore((state) => state.error);
  const warning = useATMStore((state) => state.warning);

  return (
    <VStack className='font-screen bg-digitalScreen h-full w-[400px] p-6 text-black drop-shadow-xl'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box position='relative'>
            {error && (
              <Alert status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )}
            {warning && (
              <Alert status='warning'>
                <AlertIcon />
                {warning}
              </Alert>
            )}
          </Box>
          <VStack h='full' justify='center' alignItems='center' textAlign='center'>
            {children}
          </VStack>
        </>
      )}
    </VStack>
  );
}
