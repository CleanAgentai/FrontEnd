import { useEffect, useRef } from 'react';
import { Users, Target, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'AI-Powered Hiring & Onboarding',
    description: 'Automatically posts jobs to Indeed, Facebook, Craigslist, and LinkedIn. AI screens applicants with chat and video interviews. Automated background checks, contracts, and onboarding.',
    icon: Users
  },
  {
    number: '02',
    title: 'AI-Driven Lead Conversion & Sales',
    description: 'AI follows up with leads, books appointments, and nurtures customers. 24/7 automated responses improve conversion rates by 40%.',
    icon: Target
  },
  {
    number: '03',
    title: 'AI-Powered Scheduling & Operations',
    description: 'Automated dispatch and scheduling. AI-driven quality control and customer satisfaction tracking. Reduces operational workload by 85%.',
    icon: Calendar
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-teal-500/90 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transform your cleaning business with our AI automation platform in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
            >
              <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 backdrop-blur-sm">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-white/80 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-lg text-white/90 mb-8">
              Start your 7-day free trial today. Only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-white text-blue-600 hover:bg-white/90 transition-colors group text-lg px-8"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 transition-colors text-lg px-8"
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/80">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 