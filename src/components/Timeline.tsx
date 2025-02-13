import { Card } from '@/components/ui/card';
import { Target, Users, Clock } from 'lucide-react';

const steps = [
  {
    title: 'Create Profile',
    description: 'Set up your company profile and requirements',
    icon: Target,
  },
  {
    title: 'AI Screening',
    description: 'Automated candidate screening and evaluation',
    icon: Clock,
  },
  {
    title: 'Smart Matching',
    description: 'AI-powered candidate matching and ranking',
    icon: Users,
  },
];

export default function Timeline() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Start hiring better candidates in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="rounded-full bg-white/20 w-16 h-16 flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {step.description}
                </p>
                <div className="absolute top-8 right-8 text-white/20 text-4xl font-bold">
                  {index + 1}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}