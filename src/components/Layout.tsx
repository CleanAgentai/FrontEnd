import { Analytics } from '@vercel/analytics/react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
} 