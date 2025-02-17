import { Clock, TrendingUp, LineChart, PiggyBank } from 'lucide-react';

const stats = [
  {
    value: '2 Days',
    label: 'Average Hiring Time',
    description: 'From job posting to hired',
    icon: Clock,
    gradient: 'from-blue-600 to-blue-400'
  },
  {
    value: '20h',
    label: 'Weekly Time Saved',
    description: 'On admin & operations',
    icon: TrendingUp,
    gradient: 'from-teal-500 to-teal-300'
  },
  {
    value: '40%',
    label: 'Higher Conversion',
    description: 'More leads become clients',
    icon: LineChart,
    gradient: 'from-indigo-600 to-indigo-400'
  },
  {
    value: '90%',
    label: 'Lower Costs',
    description: 'Reduced operational costs',
    icon: PiggyBank,
    gradient: 'from-purple-600 to-purple-400'
  }
];

export default function Stats() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
              
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-r ${stat.gradient} transform transition-transform group-hover:scale-110 duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Value */}
                <div className="relative mb-2">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-teal-500/0 rounded-2xl opacity-0 group-hover:from-blue-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 