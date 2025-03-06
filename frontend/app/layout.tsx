import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import ToasterProvider from 'providers/ToasterProvider';
import { ThemeProvider } from 'next-themes';
import ProtectedRoute from '@/components/protected/protectedRoute';
import { UserProvider } from 'context/UserContext';

export const metadata = {
  title: 'Meniscus Dashboard',
  description: 'Smart',
  icons: {
    icon: [
      {
        url: '../image1.png', // /public path
        href: '../image1.png' // /public path
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <UserProvider>
          <ProtectedRoute>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col dark:[#1A1A1A]">
                <ToasterProvider />
                <div className="flex-1">{children}</div>
                {/* <Footer /> */}
              </div>
              <Analytics />
            </ThemeProvider>
          </ProtectedRoute>
        </UserProvider>
      </body>
    </html>
  );
}
