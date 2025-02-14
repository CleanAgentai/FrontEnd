import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

interface Stat {
  value: string;
  label: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Owner, Pristine Cleaning Services",
    image: "/testimonials/sarah.jpg",
    quote: "CleanAgent transformed our business. The AI scheduling saved us 20 hours a week, and the route optimization cut our fuel costs by 25%. Our staff love the mobile app!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO, GreenClean Pro",
    image: "/testimonials/michael.jpg",
    quote: "Since implementing CleanAgent, we've grown from 5 to 25 cleaners without increasing office staff. The customer portal and automated scheduling are game-changers.",
    rating: 5,
  },
  {
    name: "Lisa Rodriguez",
    role: "Operations Manager, Sparkle Solutions",
    image: "/testimonials/lisa.jpg",
    quote: "The quality management system has improved our service consistency dramatically. Our customer satisfaction scores are up 40% since we started using CleanAgent.",
    rating: 5,
  },
];

const stats: Stat[] = [
  { value: "500+", label: "Cleaning Companies" },
  { value: "10,000+", label: "Active Cleaners" },
  { value: "1M+", label: "Jobs Completed" },
  { value: "98%", label: "Customer Satisfaction" },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    <section className="content-section bg-white">
      <div className="section-container">
        <div className="section-header">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Trusted by Leading Cleaning Companies
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            See how CleanAgent is helping cleaning businesses grow and succeed
          </p>
        </div>

        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative px-4">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="p-6 sm:p-8">
                        <div className="absolute top-6 right-6">
                          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 rounded-full">
                            <div className="bg-white p-1.5 rounded-full">
                              <Quote className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5">
                            <div className="h-full w-full rounded-full bg-blue-50 flex items-center justify-center">
                              <span className="text-xl font-semibold text-blue-600">
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

                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-2 border-blue-600"
              >
                <ChevronLeft className="h-5 w-5 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-2 border-blue-600"
              >
                <ChevronRight className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 sm:p-8">
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 rounded-full">
                      <div className="bg-white p-1.5 rounded-full">
                        <Quote className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5">
                      <div className="h-full w-full rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-xl font-semibold text-blue-600">
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

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 sm:mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-0.5">
            <Card className="overflow-hidden rounded-[15px]">
              <div className="relative px-6 py-8 sm:p-10 md:p-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-500/10" />
                
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-12">
                  {stats.map((stat) => (
                    <div 
                      key={stat.label} 
                      className="relative text-center group"
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-teal-500/0 group-hover:from-blue-600/5 group-hover:to-teal-500/5 transition-colors duration-300 rounded-xl" />
                      
                      <div className="relative">
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-3">
                          {stat.value}
                        </div>
                        <div className="text-base sm:text-lg font-medium text-gray-700">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-600/5 to-teal-500/5 rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-teal-500/5 to-blue-600/5 rounded-tl-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}