/* eslint-disable tailwindcss/classnames-order  */
/* eslint-disable prettier/prettier */

import Loader from '@/components/Core/Loader';
import useATMStore from '@/store';
import { Alert, AlertIcon, Box, VStack } from '@chakra-ui/react';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  const pathName = usePathname();
  const { isLoading, error, warning, user } = useATMStore((state) => state);

  const authenticatingForProtectedPath = pathName !== '/' && !user.isAuthenticated;
  const shouldShowLoader = isLoading || authenticatingForProtectedPath;

  useLayoutEffect(() => {
    if (!user.isAuthenticated && pathName !== '/') {
      redirect('/');
    }
  }, [pathName, user.isAuthenticated]);

  return (
    <VStack className='h-full w-[400px] bg-digitalScreen p-4 font-screen text-black drop-shadow-xl'>
      {shouldShowLoader ? (
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
              <Alert position='relative' status='warning'>
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
