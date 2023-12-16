import Header from '@/components/Layout/Header';
import TopLeftImg from '@/components/Layout/TopLeftImage';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'ScreenCloud ATM Web',
  description: 'Web based ATM to withdraw money',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={`bg-site bg-cover text-white ${roboto.className}`}>
        <TopLeftImg />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
