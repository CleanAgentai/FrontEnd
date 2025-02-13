import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'The Future of AI in Cleaning Staff Recruitment',
    excerpt: 'Discover how artificial intelligence is transforming the way cleaning businesses hire staff...',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    date: 'March 15, 2024',
    category: 'Industry Insights',
  },
  {
    title: 'Best Practices for Hiring Cleaning Staff',
    excerpt: 'Learn the key strategies for finding and retaining top cleaning professionals...',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    date: 'March 10, 2024',
    category: 'Hiring Tips',
  },
  {
    title: 'Reducing Turnover in Cleaning Services',
    excerpt: 'Effective strategies to improve employee retention and build a stable workforce...',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    date: 'March 5, 2024',
    category: 'Management',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights & News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice and industry updates for cleaning business owners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary-600 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="link" className="text-primary-600 p-0">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}