import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Zap, Sparkles, Check } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Instant Hiring',
    description: 'AI posts jobs, screens candidates, and hires top cleaners—fast'
  },
  {
    icon: DollarSign,
    title: 'More Bookings, Less Chasing',
    description: 'AI follows up, books jobs, and fills your schedule 24/7'
  },
  {
    icon: Zap,
    title: 'Zero Admin Work',
    description: 'AI handles scheduling, reminders, and client updates on autopilot'
  }
];

const highlights = [
  'No credit card required',
  '7-day free trial',
  'Cancel anytime'
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Announcement Banner */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Try Free - Only $299/month After Trial
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-gray-900 mb-8 animate-fade-in">
            <span className="block font-bold mb-4">
              Automate Your Cleaning Business
            </span>
            <span className="relative">
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                & Scale Faster
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 animate-fade-in-up delay-200">
            AI-powered hiring, sales, and operations—so you can cut costs, book more jobs, and save 20+ hours a week.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Button 
              size="lg"
              className="relative group bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-all duration-300 text-lg px-8 h-14 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              onClick={() => navigate('/signup')}
            >
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 h-14 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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

          {/* Trial Features */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 animate-fade-in-up delay-400">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center text-gray-500">
                <Check className="h-4 w-4 text-blue-600 mr-2" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-500">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="mb-4 bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-3 rounded-lg w-14 h-14 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}