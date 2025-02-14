import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'Maximizing Efficiency with AI-Powered Cleaning Management',
    excerpt: 'Learn how artificial intelligence is transforming the cleaning industry with smart scheduling and route optimization.',
    date: 'Mar 15, 2024',
    author: 'Sarah Johnson',
    category: 'Technology'
  },
  {
    title: 'The Future of Clean: Digital Transformation in the Cleaning Industry',
    excerpt: 'Discover how digital tools and automation are revolutionizing cleaning business operations.',
    date: 'Mar 12, 2024',
    author: 'Michael Chen',
    category: 'Industry Trends'
  },
  {
    title: 'Building a Customer-Centric Cleaning Business',
    excerpt: 'Tips and strategies for improving customer satisfaction and retention in your cleaning business.',
    date: 'Mar 8, 2024',
    author: 'Lisa Rodriguez',
    category: 'Business Growth'
  }
];

export default function Blog() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600">
            Expert advice and industry updates for cleaning business owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <span className="px-3 py-1 bg-blue-50 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="group"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
} 