import { useEffect, useRef } from 'react';
import { Users, Target, Calendar, ArrowRight, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'AI Hires for You',
    description: 'AI posts your job everywhere, interviews applicants in real time, and hires the best candidates in minutes—not weeks.',
    icon: Users,
    gradient: 'from-blue-600 to-blue-400',
    delay: 'delay-200'
  },
  {
    number: '02',
    title: 'AI Books More Jobs',
    description: 'AI texts, emails, and follows up automatically—turning leads into paying customers 24/7.',
    icon: Target,
    gradient: 'from-teal-500 to-teal-300',
    delay: 'delay-300'
  },
  {
    number: '03',
    title: 'AI Runs Your Business',
    description: "AI handles bookings, reminders, and client updates so you don't have to.",
    icon: Calendar,
    gradient: 'from-indigo-600 to-indigo-400',
    delay: 'delay-400'
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
            entry.target.classList.add('animate-fade-in-up');
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
      className="relative py-24 overflow-hidden bg-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6 animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-medium">
              Powered by AI
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up delay-100">
            How CleanAgent Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Transform your cleaning business with our AI automation platform in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step-card opacity-0 ${step.delay}`}
            >
              <div className="relative p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group h-full hover:-translate-y-1">
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${step.gradient} bg-opacity-20 transform group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`h-8 w-8 text-gradient-${step.gradient.split('-')[2]}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative Sparkles */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className={`h-5 w-5 text-gradient-${step.gradient.split('-')[2]}/40`} />
                </div>

                {/* Hover Effect Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in-up delay-500">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Start your 7-day free trial today. Only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="relative group bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-all duration-300 text-lg px-8 h-12 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                onClick={() => navigate('/signup')}
              >
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 h-12 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 