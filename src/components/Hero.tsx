import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Zap, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Smart Scheduling',
    description: 'Automated booking & dispatch'
  },
  {
    icon: DollarSign,
    title: 'Increased Revenue',
    description: 'Optimize routes & efficiency'
  },
  {
    icon: Zap,
    title: 'Real-time Tracking',
    description: 'Monitor operations live'
  }
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Limited Time: Try Free for 7 Days</span>
              </div>
              
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block font-bold mb-2">Revolutionize Your</span>
                <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Cleaning Business
                </span>
              </h1>
              
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-8">
                Transform your cleaning operations with AI-powered management. Automate scheduling, optimize routes, and enhance customer satisfaction - all in one platform.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg"
                  className="button-primary group"
                  onClick={() => navigate('/signup')}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  className="gradient-primary text-white hover:opacity-90 transition-opacity"
                  onClick={() => navigate('/signup')}
                >
                  View Pricing
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.title} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}