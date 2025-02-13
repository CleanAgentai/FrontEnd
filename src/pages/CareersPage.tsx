import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Lightbulb, LineChart, Users } from 'lucide-react';

const positions = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and embrace new technologies.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work together to achieve extraordinary results.',
  },
  {
    icon: Code,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do.',
  },
  {
    icon: LineChart,
    title: 'Growth',
    description: 'We provide opportunities for personal development.',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us transform the future of cleaning staff recruitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <value.icon className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((position) => (
              <Card key={position.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Button>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}