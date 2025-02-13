import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Zap, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToDemo = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Limited Time: Try Free for 7 Days</span>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Replace Your Entire Team</span>
                <span className="block text-primary-600">With AI Agents</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get a complete AI workforce that works 24/7 for less than 10% of traditional hiring costs. Marketing, Sales, Operations, and HR - all handled by intelligent AI agents.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button 
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white group"
                  onClick={scrollToDemo}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={scrollToDemo}
                >
                  View Pricing
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto lg:mx-0">
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Availability</h3>
                    <p className="text-sm text-gray-500">Never sleeps, never takes breaks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">90% Cost Savings</h3>
                    <p className="text-sm text-gray-500">Fraction of traditional costs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex-shrink-0">
                    <Zap className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Scaling</h3>
                    <p className="text-sm text-gray-500">Scale up or down instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}