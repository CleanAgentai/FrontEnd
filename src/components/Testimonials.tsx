import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Owner, Pristine Cleaning Services",
    image: "/testimonials/sarah.jpg",
    quote: "CleanAgent automated our hiring process, cutting our hiring time from 2 weeks to just 2 days. The AI handles everything from job posting to onboarding.",
    rating: 5,
    highlight: "95% faster hiring"
  },
  {
    name: "Michael Chen",
    role: "CEO, GreenClean Pro",
    image: "/testimonials/michael.jpg",
    quote: "We saved over 20 hours per week on scheduling alone. Our clients love the AI-powered communication, and our team is much more efficient now.",
    rating: 5,
    highlight: "20+ hours saved weekly"
  },
  {
    name: "Lisa Rodriguez",
    role: "Operations Manager, Sparkle Solutions",
    image: "/testimonials/lisa.jpg",
    quote: "Our lead conversion rates increased by 40% after implementing AI-driven follow-ups. The automated scheduling and quality control are game-changers.",
    rating: 5,
    highlight: "40% more conversions"
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Customer Success Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Leading Cleaning Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how CleanAgent is helping cleaning businesses grow and succeed
          </p>
        </div>

        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative px-4">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-2 border-blue-600 hover:bg-blue-50"
              >
                <ChevronLeft className="h-5 w-5 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-2 border-blue-600 hover:bg-blue-50"
              >
                <ChevronRight className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join hundreds of cleaning companies saving 20+ hours per week with CleanAgent.
              Start your free trial today - only $299/month after trial period.
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
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-full flex-shrink-0">
      <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="p-8">
          {/* Quote Icon */}
          <div className="absolute top-8 right-8">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 rounded-full">
              <div className="bg-white p-2 rounded-full">
                <Quote className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5">
              <div className="h-full w-full rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-2xl font-semibold text-blue-600">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-gray-600">
                {testimonial.role}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-400 fill-current"
              />
            ))}
          </div>

          {/* Highlight */}
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full text-blue-600 font-medium">
              {testimonial.highlight}
            </span>
          </div>

          {/* Quote */}
          <p className="text-gray-700 text-lg leading-relaxed">
            "{testimonial.quote}"
          </p>

          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-teal-500/0 opacity-0 group-hover:from-blue-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
        </div>
      </Card>
    </div>
  );
}