import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Layout from '@/components/Layout';
import * as Pages from '@/lib/routes';

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        }>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Pages.LandingPage />} />
            <Route path="/about" element={<Pages.AboutPage />} />
            <Route path="/features" element={<Pages.FeaturesPage />} />
            <Route path="/testimonials" element={<Pages.TestimonialsPage />} />
            <Route path="/faq" element={<Pages.FAQPage />} />
            <Route path="/blog" element={<Pages.BlogPage />} />
            <Route path="/careers" element={<Pages.CareersPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </>
  );
}