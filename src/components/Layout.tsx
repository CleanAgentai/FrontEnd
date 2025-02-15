import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
} 