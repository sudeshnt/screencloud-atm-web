import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='px-[8%]'>
      <nav>
        <Link href='/'>
          <Image src='/images/logo.png' width={320} height={77} alt='' priority />
        </Link>
      </nav>
    </header>
  );
}
