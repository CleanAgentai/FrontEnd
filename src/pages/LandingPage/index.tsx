import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Timeline from '@/components/Timeline';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function LandingPage() {
  return (
    <div className="pt-16">
      <Hero />
      <Timeline />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
    </div>
  );
}