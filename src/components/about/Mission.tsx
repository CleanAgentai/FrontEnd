import { Card } from '@/components/ui/card';
import { Target, Users, Clock } from 'lucide-react';

const missions = [
  {
    icon: Target,
    title: 'Our Vision',
    description: 'To create a world where finding quality cleaning staff is as easy as pressing a button.',
  },
  {
    icon: Users,
    title: 'Our Mission',
    description: 'Empowering cleaning businesses with AI-driven hiring solutions that save time and reduce costs.',
  },
  {
    icon: Clock,
    title: 'Our Impact',
    description: 'Helping businesses reduce hiring time by 80% while finding better-qualified candidates.',
  },
];

export default function Mission() {
  return (
    <div className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <Card key={mission.title} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <mission.icon className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
              <p className="text-white/80">{mission.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}