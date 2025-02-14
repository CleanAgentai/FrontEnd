import { Bot, Shield, Zap } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About CleanAgent
          </h2>
          <p className="text-xl text-gray-600">
            Revolutionizing the cleaning industry with AI-powered management solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI-Powered Innovation
            </h3>
            <p className="text-gray-600">
              Our advanced AI algorithms optimize scheduling, routing, and resource allocation for maximum efficiency.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Industry Expertise
            </h3>
            <p className="text-gray-600">
              Built specifically for cleaning businesses, with deep understanding of industry challenges and needs.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Proven Results
            </h3>
            <p className="text-gray-600">
              Helping cleaning businesses increase efficiency, reduce costs, and improve customer satisfaction.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full">
            <span className="font-medium">
              Trusted by 500+ cleaning companies worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 