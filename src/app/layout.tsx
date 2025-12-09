import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GNB from '@/components/GNB';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phase1 웹앱',
  description: 'Phase1 웹앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main style={{ paddingBottom: '80px' }}>
          {children}
        </main>
        <GNB />
      </body>
    </html>
  );
}

