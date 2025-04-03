import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeProvider';
import ClientThemeBackground from '../components/ClientThemeBackground';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Laundry Monster | Elaine Pope',
  description: 'Thoughts with Elaine.',
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ClientThemeBackground>
          <Navigation />
          {children}
          <Footer />
        </ClientThemeBackground>
        <Analytics />
      </ThemeProvider>
    </html>
  );
}