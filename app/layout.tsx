import QueryClientProvider from '@/app/providers/QueryClientProvider';
import Navbar from '@/components/shared/Navbar';
import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from './auth/provider';
import './globals.css';
import './theme-config.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="violet">
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
