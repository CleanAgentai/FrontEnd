import { Card } from '@/components/ui/card';
import { Shield, Heart, Zap, Award } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'We prioritize data protection and ensure secure hiring processes.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: "Your success is our success. We're dedicated to your growth.",
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly improving our AI to deliver better results.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Committed to connecting you with top-tier cleaning professionals.',
  },
];

export default function Values() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <value.icon className="h-10 w-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-white/80">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}