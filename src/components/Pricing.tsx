import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const planFeatures = [
  'AI-powered hiring, job posting, and onboarding automation',
  'AI-driven lead generation, follow-ups, and booking automation',
  'Automated scheduling, dispatch, and customer satisfaction tracking',
  'Up to 7 qualified candidates per month',
  'Real-time Analytics Dashboard',
  'Team Performance Tracking',
  'Priority Email & Chat Support',
  'Regular Feature Updates'
];

const comparisonPoints = [
  {
    traditional: 'Manual Hiring Process',
    withUs: 'AI-Powered Hiring',
    savings: '95% faster'
  },
  {
    traditional: 'Manual Lead Follow-up',
    withUs: 'AI-Driven Sales',
    savings: '40% more leads'
  },
  {
    traditional: 'Manual Scheduling',
    withUs: 'AI Scheduling',
    savings: '20 hours/week'
  },
  {
    traditional: 'Manual Operations',
    withUs: 'AI Operations',
    savings: '90% lower costs'
  }
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleTalkToSales = () => {
    window.location.href = 'mailto:support@cleanagent.ai?subject=Sales Inquiry - CleanAgent.AI';
  };
  
  return (
    <section id="pricing" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Simple Pricing • 7-Day Free Trial</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            One Simple Plan – Everything You Need
          </h2>
          <p className="text-xl text-gray-600">
            All features included. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="relative overflow-hidden rounded-2xl border-2 border-blue-600">
            <div className="relative p-8 sm:p-12 bg-white">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Complete AI Platform
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-blue-600">
                    $299
                  </span>
                  <span className="text-xl text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 text-xl">
                  Everything you need to automate your cleaning business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {planFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full h-14 text-lg font-semibold bg-blue-600 
                         text-white hover:bg-blue-700 transition-colors group"
                onClick={() => navigate('/signup')}
              >
                Try CleanAgent Free – 7 Days
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Credit card required • Cancel anytime
              </p>
            </div>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Without CleanAgent</h3>
              <ul className="space-y-3">
                {comparisonPoints.map((point) => (
                  <li key={point.traditional} className="text-gray-600">
                    {point.traditional}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">With CleanAgent</h3>
              <ul className="space-y-3">
                {comparisonPoints.map((point) => (
                  <li key={point.withUs} className="flex items-center justify-between text-gray-600">
                    <span>{point.withUs}</span>
                    <span className="font-medium text-blue-600">
                      {point.savings}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Questions about our pricing? Contact our team
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={handleTalkToSales}
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}