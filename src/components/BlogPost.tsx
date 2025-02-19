import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// Blog posts data with real content
const blogPosts = [
  {
    id: 1,
    slug: 'ai-revolutionizing-cleaning-industry',
    title: "How AI is Revolutionizing the Cleaning Industry in 2025",
    description: "Explore how artificial intelligence is transforming the cleaning industry through automated scheduling, smart hiring, and predictive maintenance. Learn how cleaning businesses are achieving 90% cost reduction and 40% higher customer satisfaction.",
    content: `
      <p>The cleaning industry is undergoing a dramatic transformation, driven by artificial intelligence and automation. As we move through 2025, the impact of AI on cleaning businesses has become more pronounced than ever, with companies reporting unprecedented efficiency gains and cost reductions.</p>

      <h2>The Current State of AI in Cleaning</h2>
      <p>Recent studies show that cleaning businesses implementing AI solutions are experiencing:</p>
      <ul>
        <li>90% reduction in administrative costs</li>
        <li>40% increase in customer satisfaction</li>
        <li>75% faster hiring processes</li>
        <li>30% improvement in employee retention</li>
      </ul>

      <h2>Key Areas of AI Implementation</h2>
      
      <h3>1. Automated Hiring and Recruitment</h3>
      <p>One of the most significant challenges in the cleaning industry has been finding and retaining qualified staff. AI is revolutionizing this process through:</p>
      <ul>
        <li>Intelligent job posting optimization across multiple platforms</li>
        <li>Automated candidate screening and qualification</li>
        <li>AI-powered video interviews and assessments</li>
        <li>Predictive analytics for candidate success probability</li>
      </ul>

      <h3>2. Smart Scheduling and Route Optimization</h3>
      <p>AI algorithms are now capable of creating optimal cleaning schedules by considering multiple factors:</p>
      <ul>
        <li>Historical cleaning time data</li>
        <li>Traffic patterns and travel time</li>
        <li>Client preferences and priority levels</li>
        <li>Staff availability and skill sets</li>
      </ul>

      <h3>3. Quality Control and Monitoring</h3>
      <p>Advanced AI systems are enhancing quality control through:</p>
      <ul>
        <li>Real-time monitoring of cleaning standards</li>
        <li>Automated quality inspection reports</li>
        <li>Predictive maintenance alerts</li>
        <li>Customer feedback analysis and trending</li>
      </ul>

      <h2>Real-World Success Stories</h2>
      <p>Leading cleaning companies implementing AI solutions are seeing remarkable results:</p>
      
      <h3>Case Study: CleanPro Services</h3>
      <p>After implementing AI-powered scheduling and hiring:</p>
      <ul>
        <li>Reduced hiring time from 2 weeks to 2 days</li>
        <li>Increased customer satisfaction by 40%</li>
        <li>Achieved 95% employee retention rate</li>
        <li>Reduced operational costs by 90%</li>
      </ul>

      <h2>The Future of AI in Cleaning</h2>
      <p>Looking ahead, we can expect to see even more advanced AI applications:</p>
      <ul>
        <li>IoT integration for real-time cleaning verification</li>
        <li>Autonomous cleaning robots working alongside human staff</li>
        <li>Predictive maintenance and supply chain optimization</li>
        <li>Advanced customer experience personalization</li>
      </ul>

      <h2>Getting Started with AI</h2>
      <p>For cleaning businesses looking to implement AI solutions, consider these steps:</p>
      <ol>
        <li>Assess your current operational challenges</li>
        <li>Identify key areas where AI can make the biggest impact</li>
        <li>Start with one area (e.g., hiring or scheduling)</li>
        <li>Measure results and gradually expand AI implementation</li>
      </ol>

      <h2>Conclusion</h2>
      <p>The integration of AI in the cleaning industry is no longer a future prospect—it's happening now. Businesses that embrace these technologies are seeing significant improvements in efficiency, cost reduction, and customer satisfaction. As we continue through 2025, the gap between AI-enabled cleaning businesses and traditional operations will only widen.</p>
    `,
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
    content: `
      <p>Scaling a cleaning business requires a strategic approach that balances growth with quality service delivery. Based on data from successful cleaning companies and industry experts, here are ten proven strategies that can help you scale your cleaning business effectively in 2025.</p>

      <h2>1. Leverage AI-Powered Automation</h2>
      <p>Modern cleaning businesses are achieving remarkable efficiency through automation:</p>
      <ul>
        <li>Implement AI scheduling systems for optimal resource allocation</li>
        <li>Use automated customer communication platforms</li>
        <li>Deploy smart hiring systems for faster team expansion</li>
        <li>Utilize inventory management automation</li>
      </ul>

      <h2>2. Build a Strong Brand Identity</h2>
      <p>A distinctive brand helps attract both customers and employees:</p>
      <ul>
        <li>Develop a compelling brand story and values</li>
        <li>Create consistent visual branding across all touchpoints</li>
        <li>Implement a professional uniform and vehicle branding program</li>
        <li>Build a strong online presence and reputation</li>
      </ul>

      <h2>3. Implement Quality Control Systems</h2>
      <p>Maintaining service quality during growth is crucial:</p>
      <ul>
        <li>Establish clear cleaning standards and protocols</li>
        <li>Use digital checklists and inspection tools</li>
        <li>Implement regular training programs</li>
        <li>Set up customer feedback systems</li>
      </ul>

      <h2>4. Focus on Customer Retention</h2>
      <p>Keeping existing customers is more cost-effective than acquiring new ones:</p>
      <ul>
        <li>Develop a customer loyalty program</li>
        <li>Implement regular check-ins and satisfaction surveys</li>
        <li>Offer value-added services to existing clients</li>
        <li>Create a referral reward system</li>
      </ul>

      <h2>5. Optimize Your Pricing Strategy</h2>
      <p>Smart pricing is essential for profitable growth:</p>
      <ul>
        <li>Conduct regular market analysis</li>
        <li>Implement value-based pricing</li>
        <li>Create tiered service packages</li>
        <li>Regular review and adjustment of pricing</li>
      </ul>

      <h2>6. Invest in Employee Development</h2>
      <p>Your team is crucial for successful scaling:</p>
      <ul>
        <li>Create comprehensive training programs</li>
        <li>Implement career advancement opportunities</li>
        <li>Offer competitive benefits packages</li>
        <li>Build a positive company culture</li>
      </ul>

      <h2>7. Streamline Operations</h2>
      <p>Efficient operations enable faster scaling:</p>
      <ul>
        <li>Standardize cleaning processes</li>
        <li>Optimize supply chain management</li>
        <li>Implement route optimization</li>
        <li>Use digital documentation systems</li>
      </ul>

      <h2>8. Expand Service Offerings</h2>
      <p>Diversification can drive growth:</p>
      <ul>
        <li>Add specialized cleaning services</li>
        <li>Offer eco-friendly options</li>
        <li>Include maintenance services</li>
        <li>Develop commercial cleaning packages</li>
      </ul>

      <h2>9. Leverage Digital Marketing</h2>
      <p>Modern marketing is essential for growth:</p>
      <ul>
        <li>Optimize your website for local SEO</li>
        <li>Use social media marketing</li>
        <li>Implement email marketing campaigns</li>
        <li>Utilize paid advertising strategically</li>
      </ul>

      <h2>10. Monitor and Analyze Performance</h2>
      <p>Data-driven decisions support sustainable growth:</p>
      <ul>
        <li>Track key performance indicators (KPIs)</li>
        <li>Analyze customer feedback and trends</li>
        <li>Monitor employee performance metrics</li>
        <li>Regular financial analysis and forecasting</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Scaling a cleaning business successfully requires a balanced approach that combines technology, people, and processes. By implementing these strategies systematically, you can achieve sustainable growth while maintaining service quality and customer satisfaction.</p>
    `,
    author: "Sarah Johnson",
    date: "2025-02-18",
    image: "/blog/business-growth.jpg",
    category: "Business Growth",
    readTime: "12 min read",
    keywords: ["cleaning business growth", "scaling cleaning company", "cleaning business management", "cleaning business strategy", "cleaning business success"]
  }
];

export default function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);
  
  // Find related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  useDocumentMeta({
    title: post ? `${post.title} - CleanAgent Blog` : 'Blog Post Not Found',
    description: post?.description || 'Article not found',
    noindex: !post // Don't index if post doesn't exist
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-gradient-to-b from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-gradient-to-t from-blue-50 via-teal-50/30 to-transparent rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <header className="mb-12">
          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-teal-500/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Tag className="w-24 h-24 text-white opacity-50" />
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600">
            {post.description}
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <a href={`/blog/${relatedPost.slug}`} className="block p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      {new Date(relatedPost.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center text-blue-600 font-medium gap-1 group-hover:gap-2 transition-all">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 