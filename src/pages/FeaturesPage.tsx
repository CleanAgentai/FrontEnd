import { Card } from '@/components/ui/card';
import { Bot, Clock, LineChart, Shield, Users, Zap } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Screening',
    description: 'Our advanced AI analyzes applications and video interviews to identify top candidates.',
    icon: Bot,
  },
  {
    title: 'Time Savings',
    description: 'Reduce hiring time by up to 80% with automated candidate screening and evaluation.',
    icon: Clock,
  },
  {
    title: 'Smart Analytics',
    description: 'Get detailed insights into your hiring process with real-time analytics.',
    icon: LineChart,
  },
  {
    title: 'Background Verification',
    description: 'Automated background checks and reference verification.',
    icon: Shield,
  },
  {
    title: 'Candidate Management',
    description: 'Centralized platform to manage all your candidates and hiring processes.',
    icon: Users,
  },
  {
    title: 'Quick Integration',
    description: 'Easy setup and integration with your existing hiring workflow.',
    icon: Zap,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Hiring
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to streamline your cleaning staff recruitment process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}