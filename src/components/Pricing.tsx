import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tiers = [
  {
    name: 'Business Suite',
    price: 299,
    description: 'Your complete AI workforce, available 24/7 for 10% of traditional hiring costs',
    features: [
      '7 qualified candidates per month',
      'AI Marketing Agent (replaces Marketing Manager)',
      'AI Sales Agent (replaces Sales Representative)',
      'AI Operations Agent (replaces Operations Manager)',
      'AI Hiring Agent (replaces HR Manager)',
      '24/7 availability',
      'Custom workflow automation',
      'Performance analytics dashboard',
      'Unlimited team members',
      'Priority support'
    ],
    savings: {
      traditional: '12,000+',
      withUs: 299,
      percentage: 97.5
    },
    cta: 'Start 7-Day Free Trial',
    highlighted: true
  }
];

const fullTimeRoles = [
  {
    role: 'Marketing Manager',
    salary: '$60,000/year',
    replaced: 'AI Marketing Agent'
  },
  {
    role: 'Sales Representative',
    salary: '$50,000/year',
    replaced: 'AI Sales Agent'
  },
  {
    role: 'Operations Manager',
    salary: '$65,000/year',
    replaced: 'AI Operations Agent'
  },
  {
    role: 'HR Manager',
    salary: '$55,000/year',
    replaced: 'AI Hiring Agent'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Limited Time: 7-Day Free Trial</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Replace Your Entire Team with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Why hire multiple full-time employees when you can have an AI workforce working for you 24/7 at a fraction of the cost?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traditional Hiring Costs</h3>
              <ul className="space-y-3">
                {fullTimeRoles.map((role) => (
                  <li key={role.role} className="flex items-center justify-between text-gray-600">
                    <span>{role.role}</span>
                    <span className="font-medium">{role.salary}</span>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between font-semibold text-gray-900">
                    <span>Total Annual Cost</span>
                    <span>$230,000+</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-600 mb-4">TaskTalent.AI Solution</h3>
              <ul className="space-y-3">
                {fullTimeRoles.map((role) => (
                  <li key={role.replaced} className="flex items-center justify-between text-gray-600">
                    <span>{role.replaced}</span>
                    <span className="font-medium text-primary-600">Included</span>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between font-semibold text-primary-600">
                    <span>Total Annual Cost</span>
                    <span>$3,588</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {tiers.map((tier) => (
            <Card 
              key={tier.name}
              className="relative flex flex-col p-8 border-2 border-primary-600 shadow-xl"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  Save over ${tier.savings.traditional} per year
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-primary-600">
                    ${tier.price}
                  </span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                  Try free for 7 days
                </div>
                <p className="text-gray-600">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-600 shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                {tier.cta}
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Credit card required • $299/month after trial • Cancel anytime
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution for your enterprise?
          </p>
          <Button variant="outline" size="lg">
            Contact our team
          </Button>
        </div>
      </div>
    </section>
  );
}