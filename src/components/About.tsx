import { 
  Users, 
  Target, 
  Calendar, 
  BarChart3, 
  ArrowRight,
  Bot,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Users,
    title: 'AI-Powered Hiring',
    description: 'AI handles job postings, screening, and onboarding, reducing hiring time by 95%.',
    gradient: 'from-blue-600 to-blue-400',
    metrics: ['95% faster hiring', '24/7 recruitment', 'Automated screening']
  },
  {
    icon: Target,
    title: 'Automated Sales & Marketing',
    description: 'AI converts leads, follows up, and closes deals, improving conversion rates by 40%.',
    gradient: 'from-teal-500 to-teal-300',
    metrics: ['40% higher conversion', 'Instant follow-ups', '24/7 lead capture']
  },
  {
    icon: Calendar,
    title: 'Operations Optimization',
    description: 'AI manages scheduling, quality control, and customer feedback, saving 20+ hours per week.',
    gradient: 'from-indigo-600 to-indigo-400',
    metrics: ['20+ hours saved weekly', 'Real-time monitoring', 'Automated QC']
  },
  {
    icon: BarChart3,
    title: 'Proven Results',
    description: '90% lower costs, 30% higher customer retention, and 40% better lead conversion.',
    gradient: 'from-purple-600 to-purple-400',
    metrics: ['90% cost reduction', '30% better retention', '40% more leads']
  }
];

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-medium">
              AI-Powered Platform
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Only AI Platform Built for{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Cleaning Businesses
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h2>
          
          <p className="text-xl text-gray-600">
            Transform your operations with AI agents that handle hiring, sales, and operations—reducing costs by 90% while improving results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-8">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  {feature.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className={`h-5 w-5 text-gradient-${feature.gradient.split('-')[2]}`} />
                      <span className="text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className={`h-5 w-5 text-gradient-${feature.gradient.split('-')[2]}/40`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-full mb-8">
            <Bot className="h-7 w-7 text-blue-600" />
            <span className="text-blue-700 font-medium text-lg">
              Join hundreds of cleaning companies saving 20+ hours per week
            </span>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Experience the power of AI automation
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Transform your cleaning business with our all-in-one platform.
              Start your free trial today - only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="relative group bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-all duration-300 text-lg px-8 h-14 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                onClick={() => navigate('/signup')}
              >
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 h-14 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 