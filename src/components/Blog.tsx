import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
}

// Use the same blog posts data as in BlogPage for consistency
const latestPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'ai-revolutionizing-cleaning-industry',
    title: "How AI is Revolutionizing the Cleaning Industry in 2025",
    description: "Explore how artificial intelligence is transforming the cleaning industry through automated scheduling, smart hiring, and predictive maintenance. Learn how cleaning businesses are achieving 90% cost reduction and 40% higher customer satisfaction.",
    author: "Porter Stanley",
    date: "2025-02-19",
    category: "Technology"
  },
  {
    id: 2,
    slug: 'scaling-cleaning-business-tips',
    title: "10 Proven Strategies for Scaling Your Cleaning Business in 2025",
    description: "Discover actionable strategies to grow your cleaning business efficiently while maintaining quality and customer satisfaction. Learn from successful cleaning companies that have achieved sustainable growth.",
    author: "Sarah Johnson",
    date: "2025-02-18",
    category: "Business Growth"
  }
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and strategies to help you grow your cleaning business with AI automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <article className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium gap-1.5 group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="relative group bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-all duration-300 text-lg px-10 h-14 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            onClick={() => navigate('/blog')}
          >
            <span className="relative z-10 flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
} 