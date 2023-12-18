import { HStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-center px-[8%]'>
      <nav>
        <Link href='/'>
          <HStack alignItems='center'>
            <Image
              src='/images/screencloud.png'
              width={150}
              height={50}
              alt=''
              priority
            />
            <Image
              src='/images/logo.svg'
              width={500}
              height={50}
              alt=''
              className='-ml-6 -mt-14'
              priority
            />
          </HStack>
        </Link>
      </nav>
    </header>
  );
}
