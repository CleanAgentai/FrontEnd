import { 
  Calendar, 
  MapPin, 
  BarChart3, 
  Users, 
  MessageSquare, 
  ClipboardCheck, 
  Target, 
  Clock,
  Truck,
  FileText,
  UserCheck,
  CreditCard,
  Bell,
  Bot,
  Zap,
  Shield
} from 'lucide-react';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling and dispatch system',
    icon: Calendar,
    features: [
      { text: 'Automated booking management', icon: Clock },
      { text: 'Intelligent staff assignment', icon: Users },
      { text: 'Real-time availability updates', icon: Bell },
      { text: 'Conflict resolution automation', icon: Zap }
    ]
  },
  {
    title: 'Route Optimization',
    description: 'Efficient route planning and tracking',
    icon: MapPin,
    features: [
      { text: 'Smart route calculation', icon: Truck },
      { text: 'Real-time GPS tracking', icon: Target },
      { text: 'Fuel cost optimization', icon: CreditCard },
      { text: 'Service area management', icon: Shield }
    ]
  },
  {
    title: 'Quality Management',
    description: 'Comprehensive quality control system',
    icon: ClipboardCheck,
    features: [
      { text: 'Digital inspection checklists', icon: FileText },
      { text: 'Photo documentation', icon: MessageSquare },
      { text: 'Customer feedback integration', icon: UserCheck },
      { text: 'Performance analytics', icon: BarChart3 }
    ]
  },
  {
    title: 'Customer Portal',
    description: 'Self-service customer management',
    icon: Users,
    features: [
      { text: 'Online booking system', icon: Calendar },
      { text: 'Service history tracking', icon: FileText },
      { text: 'Instant communication', icon: MessageSquare },
      { text: 'Automated billing', icon: CreditCard }
    ]
  }
];

export default function Features() {
  return (
    <section className="content-section bg-gray-50">
      <div className="section-container">
        <div className="section-header">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Complete Cleaning Management Solution
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Everything you need to manage and grow your cleaning business, powered by AI
          </p>
        </div>

        <div className="card-grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="content-card gradient-border hover:shadow-xl transition-all duration-300 h-full"
            >
              <div className="relative card-content flex flex-col h-full">
                <div className="card-header mb-8">
                  <div className="card-icon bg-blue-50">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="card-title text-2xl mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-6 flex-grow">
                  {feature.features.map((item) => (
                    <li key={item.text} className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-blue-50 rounded-full">
            <Bot className="h-7 w-7 text-blue-600" />
            <span className="text-blue-700 font-medium text-lg">
              Powered by advanced AI for maximum efficiency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}