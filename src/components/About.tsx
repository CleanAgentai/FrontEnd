import { Users, Target, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Users,
    title: 'AI-Powered Hiring',
    description: 'AI handles job postings, screening, and onboarding, reducing hiring time by 95%.'
  },
  {
    icon: Target,
    title: 'Automated Sales & Marketing',
    description: 'AI converts leads, follows up, and closes deals, improving conversion rates by 40%.'
  },
  {
    icon: Calendar,
    title: 'Operations Optimization',
    description: 'AI manages scheduling, quality control, and customer feedback, saving 20+ hours per week.'
  },
  {
    icon: BarChart3,
    title: 'Proven Results',
    description: '90% lower costs, 30% higher customer retention, and 40% better lead conversion.'
  }
];

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
            <span className="font-medium">AI-Powered Efficiency</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Only AI Platform Built for Cleaning Businesses
          </h2>
          <p className="text-xl text-gray-600">
            Transform your operations with AI agents that handle hiring, sales, and operations—reducing costs by 90% while improving results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-xl transform transition-transform group-hover:scale-105" />
              <div className="relative p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-teal-500/10 rounded-full mb-8">
            <span className="text-gray-900 font-medium">
              Join hundreds of cleaning companies saving 20+ hours per week
            </span>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Experience the power of AI automation
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Transform your cleaning business with our all-in-one platform.
              Start your free trial today - only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="button-primary group text-lg px-8"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors text-lg px-8"
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