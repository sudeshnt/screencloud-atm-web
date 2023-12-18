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
    <VStack className='h-full w-[400px] bg-digitalScreen p-4 font-screen text-black drop-shadow-xl'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box position='relative'>
            {error && (
              <Alert position='relative' status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )}
            {warning && (
              <Alert position='absolute' status='warning'>
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
