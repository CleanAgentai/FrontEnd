import { useState } from 'react';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';
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
  image: string;
  category: string;
  readTime: string;
  keywords: string[];
}

// Use the same blog posts data as in BlogPost.tsx
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'ai-revolutionizing-cleaning-industry',
    title: "How AI is Revolutionizing the Cleaning Industry in 2025",
    description: "Explore how artificial intelligence is transforming the cleaning industry through automated scheduling, smart hiring, and predictive maintenance. Learn how cleaning businesses are achieving 90% cost reduction and 40% higher customer satisfaction.",
    author: "Porter Stanley",
    date: "2025-02-19",
    image: "/blog/ai-cleaning.jpg",
    category: "Technology",
    readTime: "8 min read",
    keywords: ["AI in cleaning", "cleaning industry automation", "smart cleaning", "cleaning business technology", "AI hiring", "cleaning scheduling"]
  },
  {
    id: 2,
    slug: 'scaling-cleaning-business-tips',
    title: "10 Proven Strategies for Scaling Your Cleaning Business in 2025",
    description: "Discover actionable strategies to grow your cleaning business efficiently while maintaining quality and customer satisfaction. Learn from successful cleaning companies that have achieved sustainable growth.",
    author: "Sarah Johnson",
    date: "2025-02-18",
    image: "/blog/business-growth.jpg",
    category: "Business Growth",
    readTime: "12 min read",
    keywords: ["cleaning business growth", "scaling cleaning company", "cleaning business management", "cleaning business strategy", "cleaning business success"]
  },
  {
    id: 3,
    slug: 'future-of-cleaning-services-2025',
    title: "The Future of Cleaning Services in 2025",
    description: "Explore emerging trends and technologies that will shape the cleaning industry in the coming years.",
    author: "Michael Chen",
    date: "2025-02-17",
    image: "/blog/future-trends.jpg",
    category: "Industry Trends",
    readTime: "6 min read",
    keywords: ["cleaning industry trends", "future of cleaning", "cleaning technology", "cleaning innovation", "cleaning industry forecast"]
  },
  // Add more mock posts as needed
];

const categories = [
  "All",
  "Technology",
  "Business Growth",
  "Industry Trends",
  "Best Practices",
  "Case Studies"
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useDocumentMeta({
    title: 'CleanAgent Blog - Industry Insights & AI Advancements in Cleaning',
    description: 'Stay updated with expert insights on AI technology, business growth strategies, and industry trends for cleaning businesses. Learn how to scale your cleaning business with AI automation.',
    noindex: false
  });

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            CleanAgent{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Blog
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-full blur-sm" />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and strategies to help you grow your cleaning business with AI automation
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // Reset to first page when changing category
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <a href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-teal-500/90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tag className="w-12 h-12 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {currentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found matching your search criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 