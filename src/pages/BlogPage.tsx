import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Search, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'ai-revolutionizing-cleaning-industry',
    title: "How AI is Revolutionizing the Cleaning Industry in 2025",
    description: "Explore how artificial intelligence is transforming the cleaning industry through automated scheduling, smart hiring, and predictive maintenance. Learn how cleaning businesses are achieving 90% cost reduction and 40% higher customer satisfaction.",
    author: "Porter Stanley",
    date: "2025-02-19",
    category: "Technology",
    readTime: "5 min read",
    image: "/blog/ai-cleaning.jpg"
  },
  {
    id: 2,
    slug: 'scaling-cleaning-business-tips',
    title: "10 Proven Strategies for Scaling Your Cleaning Business in 2025",
    description: "Discover actionable strategies to grow your cleaning business efficiently while maintaining quality and customer satisfaction. Learn from successful cleaning companies that have achieved sustainable growth.",
    author: "Sarah Johnson",
    date: "2025-02-18",
    category: "Business Growth",
    readTime: "7 min read",
    image: "/blog/business-growth.jpg"
  },
  {
    id: 3,
    slug: 'hiring-best-practices',
    title: "Hiring Best Practices for Cleaning Companies",
    description: "Learn how to attract, screen, and retain top cleaning talent using AI-powered hiring tools and proven recruitment strategies.",
    author: "Michael Chen",
    date: "2025-02-17",
    category: "Hiring",
    readTime: "6 min read",
    image: "/blog/hiring.jpg"
  },
  {
    id: 4,
    slug: 'customer-satisfaction-tips',
    title: "Boosting Customer Satisfaction in Your Cleaning Business",
    description: "Implement these proven techniques to enhance customer satisfaction, increase retention rates, and generate more referrals.",
    author: "Lisa Rodriguez",
    date: "2025-02-16",
    category: "Customer Service",
    readTime: "4 min read",
    image: "/blog/customer-satisfaction.jpg"
  }
];

const categories = [...new Set(blogPosts.map(post => post.category))];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useDocumentMeta({
    title: 'Blog - CleanAgent.AI | Insights for Cleaning Business Success',
    description: 'Expert insights, tips, and strategies to help you grow your cleaning business with AI automation.',
    noindex: false
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and strategies to help you grow your cleaning business with AI automation
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-teal-500/90 group-hover:opacity-90 transition-opacity" />
                <Tag className="absolute top-4 right-4 h-5 w-5 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <span className="flex items-center text-blue-600 font-medium gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}