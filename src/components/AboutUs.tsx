import { ArrowRight, Bot, Target, Zap, Sparkles, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const beliefs = [
  {
    title: "Less busywork, more growth",
    description: "Business owners shouldn't be bogged down by hiring, admin, and marketing tasks. AI can handle it.",
    icon: Zap,
    gradient: "from-blue-600 to-blue-400"
  },
  {
    title: "Automation should be simple",
    description: "Our tools integrate seamlessly into your business without complexity.",
    icon: Bot,
    gradient: "from-teal-500 to-teal-300"
  },
  {
    title: "Your success is our priority",
    description: "We're here to help cleaning businesses scale effortlessly.",
    icon: Target,
    gradient: "from-indigo-600 to-indigo-400"
  }
];

export default function AboutUs() {
  const navigate = useNavigate();
  
  useDocumentMeta({
    title: 'About Us - CleanAgent.AI | Our Story and Mission',
    description: 'Learn about CleanAgent.AI, founded by Porter Stanley, and our mission to revolutionize the cleaning industry with AI-powered automation.',
    noindex: false
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing the{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Cleaning Industry
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to transform cleaning businesses with AI-powered automation, making operations effortless and growth inevitable.
          </p>
        </div>

        {/* Founder's Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-teal-500/90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="w-32 h-32 text-white opacity-50" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                CleanAgent.AI was founded by Porter Stanley, a serial entrepreneur with a background in AI and software development. 
                After selling his first software company, he started a cleaning business as a fun side project. What started as a 
                simple venture quickly turned into an eye-opening experience—highlighting inefficiencies in hiring, operations, and 
                marketing within the cleaning industry.
              </p>
            </div>
          </div>
        </div>

        {/* Problem & Solution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h3>
            <p className="text-gray-600">
              Hiring was the biggest headache. At one point, Porter had to interview 44 candidates to hire just one cleaner. 
              The process was time-consuming, frustrating, and inefficient. He knew there had to be a better way.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h3>
            <p className="text-gray-600">
              Leveraging his expertise in AI and automation, Porter built tools to streamline the hiring process. What started 
              as an internal solution quickly evolved into a full-scale platform—CleanAgent.AI—designed to automate hiring, 
              optimize job postings, manage onboarding, and streamline marketing and sales for cleaning businesses.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe AI is the future of business automation. Our mission is simple: to revolutionize the cleaning industry 
            with AI-powered automation. We help business owners eliminate tedious administrative tasks and optimize operations, 
            so they can focus on what matters—growing their business.
          </p>
        </div>

        {/* What We Believe Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beliefs.map((belief) => (
              <div 
                key={belief.title}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${belief.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <belief.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{belief.title}</h3>
                <p className="text-gray-600">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              We're just getting started, and we'd love for you to be a part of this journey. Whether you're a cleaning 
              business owner looking to scale or an entrepreneur seeking AI-driven solutions, CleanAgent.AI is here to help.
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
                onClick={() => window.location.href = 'mailto:support@cleanagent.ai'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 