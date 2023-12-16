import Header from '@/components/Layout/Header';
import TopLeftImg from '@/components/Layout/TopLeftImage';
import type { Metadata } from 'next';
import { Orbitron, Roboto, Special_Elite } from 'next/font/google';
import { PropsWithChildren } from 'react';
import Providers from './providers';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const specialElite = Special_Elite({
  subsets: ['latin'],
  variable: '--font-special-elite',
  weight: ['400'],
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900', '600', '800'],
});

export const metadata: Metadata = {
  title: 'ScreenCloud ATM Web',
  description: 'Web based ATM to withdraw money',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body
        className={`bg-site bg-cover text-white ${roboto.variable} ${specialElite.variable} ${orbitron.variable}`}
      >
        <TopLeftImg />
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
