import { Calendar, User, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'Maximizing Efficiency with AI-Powered Cleaning Management',
    excerpt: 'Learn how artificial intelligence is transforming the cleaning industry with smart scheduling and route optimization.',
    date: 'Mar 15, 2024',
    author: 'Sarah Johnson',
    category: 'Technology',
    gradient: 'from-blue-600 to-blue-400'
  },
  {
    title: 'The Future of Clean: Digital Transformation in the Cleaning Industry',
    excerpt: 'Discover how digital tools and automation are revolutionizing cleaning business operations.',
    date: 'Mar 12, 2024',
    author: 'Michael Chen',
    category: 'Industry Trends',
    gradient: 'from-teal-500 to-teal-300'
  },
  {
    title: 'Building a Customer-Centric Cleaning Business',
    excerpt: 'Tips and strategies for improving customer satisfaction and retention in your cleaning business.',
    date: 'Mar 8, 2024',
    author: 'Lisa Rodriguez',
    category: 'Business Growth',
    gradient: 'from-indigo-600 to-indigo-400'
  }
];

export default function Blog() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-medium">
              Latest Insights
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Expert Advice for Your{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Cleaning Business
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with industry trends and actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="p-8">
                {/* Category Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${post.gradient} bg-opacity-10 mb-4`}>
                  <Sparkles className={`h-4 w-4 text-gradient-${post.gradient.split('-')[2]}`} />
                  <span className={`text-sm font-medium text-gradient-${post.gradient.split('-')[2]}`}>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-6">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className={`h-5 w-5 text-gradient-${post.gradient.split('-')[2]}/40`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline"
            className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 h-12 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
} 