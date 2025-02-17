import { 
  Users, 
  Target, 
  Megaphone,
  Calendar,
  FileText,
  MessageSquare,
  Bot,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Hiring Agent',
    description: 'Automates job postings, interviews, and onboarding. Posts to multiple job boards, conducts AI video interviews, and handles paperwork.',
    icon: Users,
    gradient: 'from-blue-600 to-blue-400',
    benefits: [
      { text: 'Multi-platform job posting', icon: FileText },
      { text: 'AI video interviews', icon: MessageSquare },
      { text: 'Automated background checks', icon: Bot },
      { text: 'Digital onboarding', icon: Zap }
    ]
  },
  {
    title: 'Sales Agent',
    description: 'Captures, qualifies, and follows up with leads. Provides 24/7 response, books appointments, and nurtures prospects to close.',
    icon: Target,
    gradient: 'from-teal-500 to-teal-300',
    benefits: [
      { text: 'Instant lead response', icon: MessageSquare },
      { text: 'Smart lead qualification', icon: Bot },
      { text: 'Automated follow-ups', icon: Calendar },
      { text: 'Meeting scheduling', icon: FileText }
    ]
  },
  {
    title: 'Marketing Agent',
    description: 'Automates social media, SMS, and email marketing. Creates content, manages campaigns, and optimizes for engagement.',
    icon: Megaphone,
    gradient: 'from-indigo-600 to-indigo-400',
    benefits: [
      { text: 'Multi-channel campaigns', icon: Target },
      { text: 'AI content creation', icon: Bot },
      { text: 'Automated scheduling', icon: Calendar },
      { text: 'Performance analytics', icon: FileText }
    ]
  },
  {
    title: 'Operations Agent',
    description: 'Manages scheduling, dispatch, and quality control. Optimizes routes, tracks performance, and ensures customer satisfaction.',
    icon: Calendar,
    gradient: 'from-purple-600 to-purple-400',
    benefits: [
      { text: 'Smart scheduling', icon: Calendar },
      { text: 'Route optimization', icon: Target },
      { text: 'Quality monitoring', icon: Bot },
      { text: 'Customer feedback', icon: MessageSquare }
    ]
  }
];

export default function Features() {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-28 overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-medium">
              AI-Powered Management
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Cleaning{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Management Solution
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            AI-Powered Agents Handle Hiring, Marketing, Sales, and Operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-full w-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {feature.benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 group-hover:from-blue-50/50 group-hover:to-teal-50/50 transition-colors"
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-15 flex items-center justify-center`}>
                        <benefit.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Sparkles */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              AI handles hiring, marketing, sales, and operations
            </span>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of cleaning companies saving 20+ hours per week with CleanAgent.
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