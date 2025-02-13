import { 
  Megaphone, 
  Users, 
  BarChart3, 
  Building2, 
  Mail, 
  PhoneCall, 
  Target, 
  Calendar,
  PieChart,
  FileText,
  UserCheck,
  Briefcase,
  Clock,
  Bot,
  Zap,
  Shield
} from 'lucide-react';

const agents = [
  {
    title: 'AI Marketing Agent',
    description: 'Replaces your Marketing Manager with 24/7 campaign optimization',
    icon: Megaphone,
    features: [
      { text: 'Social media content creation and scheduling', icon: Calendar },
      { text: 'Email marketing campaign automation', icon: Mail },
      { text: 'Analytics and performance tracking', icon: BarChart3 },
      { text: 'SEO optimization and monitoring', icon: Target }
    ]
  },
  {
    title: 'AI Sales Agent',
    description: 'Your tireless Sales Representative that never sleeps',
    icon: Users,
    features: [
      { text: 'Automated lead qualification and scoring', icon: UserCheck },
      { text: 'Intelligent follow-up sequences', icon: PhoneCall },
      { text: 'Sales pipeline management', icon: PieChart },
      { text: 'Proposal and quote generation', icon: FileText }
    ]
  },
  {
    title: 'AI Operations Agent',
    description: 'Streamlines operations like a seasoned Operations Manager',
    icon: Building2,
    features: [
      { text: 'Workflow automation and optimization', icon: Zap },
      { text: 'Resource allocation and scheduling', icon: Clock },
      { text: 'Process monitoring and reporting', icon: Bot },
      { text: 'Compliance and risk management', icon: Shield }
    ]
  },
  {
    title: 'AI Hiring Agent',
    description: 'Your HR Manager powered by advanced AI',
    icon: Briefcase,
    features: [
      { text: 'Smart candidate screening and matching', icon: UserCheck },
      { text: 'Automated interview scheduling', icon: Calendar },
      { text: 'Skills assessment and evaluation', icon: Target },
      { text: 'Onboarding process automation', icon: Users }
    ]
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Complete AI Workforce
          </h2>
          <p className="text-xl text-gray-600">
            Each AI agent is designed to replace a full-time role, working 24/7 with superhuman efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {agents.map((agent) => (
            <div key={agent.title} className="relative">
              <div className="absolute -inset-px bg-gradient-to-r from-primary-600 to-primary-400 rounded-xl opacity-20" />
              <div className="relative bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-200 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <agent.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {agent.title}
                    </h3>
                    <p className="text-gray-600">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {agent.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-1">
                        <feature.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-gray-600">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-50 rounded-full">
            <Bot className="h-6 w-6 text-primary-600" />
            <span className="text-primary-600 font-medium">
              All agents work together seamlessly, 24/7/365
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}