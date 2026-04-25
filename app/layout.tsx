import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Professional ESL Tutoring | Master English',
  description: 'Expert English language tutoring for professionals and students worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${dmSans.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
