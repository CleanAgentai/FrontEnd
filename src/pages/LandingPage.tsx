import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Timeline from '@/components/Timeline';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="relative">
        <Hero />
        <Timeline />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}