import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const positions = [
  {
    title: 'Senior Full Stack Engineer',
    type: 'Full-time',
    location: 'Remote (US)',
    department: 'Engineering',
    description: 'Join our core team building the future of AI-powered cleaning management software.'
  },
  {
    title: 'Product Manager',
    type: 'Full-time',
    location: 'San Francisco, CA',
    department: 'Product',
    description: 'Lead product strategy and development for our cleaning business management platform.'
  },
  {
    title: 'Customer Success Manager',
    type: 'Full-time',
    location: 'Remote (US)',
    department: 'Customer Success',
    description: "Help our cleaning business customers succeed with CleanAgent's platform."
  }
];

const perks = [
  'Competitive salary & equity',
  'Remote-first culture',
  'Health, dental & vision insurance',
  'Unlimited PTO',
  'Learning & development budget',
  'Home office stipend'
];

export default function Careers() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600">
            Help us revolutionize the cleaning industry with AI-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {positions.map((position, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <Briefcase className="h-4 w-4" />
                <span>{position.type}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4" />
                <span>{position.location}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {position.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {position.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {position.department}
                </span>
                <Button 
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold mb-6">
            Why Join CleanAgent?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 