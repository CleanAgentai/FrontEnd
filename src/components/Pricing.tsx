import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const planFeatures = [
  'Full Platform Access',
  'Up to 7 Qualified Candidates/Month',
  'AI-Powered Scheduling System',
  'Route Optimization',
  'Quality Management Tools',
  'Customer Portal & Mobile App',
  'Real-time Analytics Dashboard',
  'Team Performance Tracking',
  'Priority Email & Chat Support',
  'Regular Feature Updates'
];

const comparisonPoints = [
  {
    traditional: 'Manual Scheduling',
    withUs: 'AI-Powered Scheduling',
    savings: '15-20 hours/week'
  },
  {
    traditional: 'Paper Checklists',
    withUs: 'Digital Quality Management',
    savings: '10 hours/week'
  },
  {
    traditional: 'Manual Route Planning',
    withUs: 'Automated Route Optimization',
    savings: '20% fuel costs'
  },
  {
    traditional: 'Phone Bookings',
    withUs: 'Online Customer Portal',
    savings: '8-10 hours/week'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 text-sm sm:text-base">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium">7-Day Free Trial • Credit Card Required</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Transform Your Cleaning Business
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Get access to our complete platform with everything you need to streamline operations
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5" />
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Complete Platform
                </h3>
                <div className="flex items-baseline justify-center mb-2 sm:mb-4">
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    $299
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Billed monthly • Cancel anytime
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {planFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full">
                      <div className="bg-white p-0.5 rounded-full">
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                      </div>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-500 
                         text-white hover:opacity-90 transition-opacity"
              >
                Start 7-Day Free Trial
              </Button>
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
                Your subscription will begin after the trial period unless canceled
              </p>
            </div>
          </Card>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Traditional Methods</h3>
              <ul className="space-y-2 sm:space-y-3">
                {comparisonPoints.map((point) => (
                  <li key={point.traditional} className="text-sm sm:text-base text-gray-600">
                    {point.traditional}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-blue-600 mb-3 sm:mb-4">With CleanAgent</h3>
              <ul className="space-y-2 sm:space-y-3">
                {comparisonPoints.map((point) => (
                  <li key={point.withUs} className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                    <span>{point.withUs}</span>
                    <span className="font-medium text-blue-600">Save {point.savings}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Questions about our pricing? Contact our team
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-sm sm:text-base py-2 px-4 sm:py-2.5 sm:px-6"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}