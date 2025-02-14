import { useEffect, useRef } from 'react';
import { Calendar, BarChart, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling automatically assigns the right cleaners to the right jobs, optimizing your workforce efficiency.',
    icon: Calendar
  },
  {
    number: '02',
    title: 'Route Optimization',
    description: 'Intelligent routing reduces travel time and fuel costs while maximizing the number of jobs completed per day.',
    icon: BarChart
  },
  {
    number: '03',
    title: 'Real-Time Monitoring',
    description: 'Track job progress, receive instant updates, and ensure quality standards are met across all cleaning operations.',
    icon: Zap
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
            Transform your cleaning business with our powerful AI-driven platform in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="step-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
            >
              <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500">
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
      </div>
    </section>
  );
} 