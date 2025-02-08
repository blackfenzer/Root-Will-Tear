import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import ToasterProvider from 'providers/ToasterProvider';
import Footer from '@/components/footer/page';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <ToasterProvider />
          <div className="flex-1">{children}</div>
          {/* <Footer /> */}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
