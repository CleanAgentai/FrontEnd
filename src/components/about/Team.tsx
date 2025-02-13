import { Card } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of AI',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
];

export default function Team() {
  return (
    <div className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
              <p className="text-white/80 text-center mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-white/60 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}