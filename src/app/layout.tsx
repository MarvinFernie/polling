import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@/components/UserProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Social Poll',
  description: 'Create and answer polls in a social format',
  themeColor: '#101318',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark:bg-background bg-background-light dark:text-white text-gray-900 antialiased">
        <ThemeProvider>
          <div className="min-h-screen">
            {/* Header section with theme toggle */}
            <header className="dark:bg-surface bg-surface-light border-b dark:border-border border-border-light py-3 px-4">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Social Poll</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
              <UserProvider>
                {children}
              </UserProvider>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
