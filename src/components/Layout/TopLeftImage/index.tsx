import Image from 'next/image';

export default function TopLeftImg() {
  return (
    <div className='absolute left-0 top-0 w-[400px] opacity-80 mix-blend-color-dodge xl:w-[600px]'>
      <Image
        src='/images/top-left-img.png'
        alt='left-top-image'
        width={600}
        height={590}
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
}
