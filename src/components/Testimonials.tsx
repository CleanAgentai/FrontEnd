import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Owner, Pristine Cleaning Services",
    image: "/testimonials/sarah.jpg",
    quote: "CleanAgent transformed our business. The AI-powered scheduling and client management tools helped us grow our customer base by 200% in just 6 months. The automated marketing features keep our pipeline full, and the operations dashboard gives us complete visibility into our business.",
    highlight: "200% Growth in 6 Months"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO, SparkleRight Solutions",
    image: "/testimonials/michael.jpg",
    quote: "Since implementing CleanAgent, our team efficiency has increased dramatically. The automated scheduling and real-time tracking features have reduced our administrative work by 75%. We can now focus on delivering exceptional service to our clients.",
    highlight: "75% Less Admin Work"
  }
];

export default function Testimonials() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Customer Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See how businesses like yours are growing with CleanAgent
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="flex flex-col gap-8 rounded-2xl bg-white p-8 ring-1 ring-gray-200 hover:ring-blue-500 transition-all duration-300">
              <div className="flex items-center gap-x-4 text-sm">
                <img
                  className="h-16 w-16 rounded-full bg-gray-50 object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <h3 className="font-semibold tracking-tight text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 leading-7">{testimonial.quote}</p>
                <div className="mt-6">
                  <span className="text-sm font-medium text-gray-900">
                    {testimonial.highlight}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-lg text-gray-600 mb-10">
              Join hundreds of cleaning companies saving 20+ hours per week with CleanAgent.
              Start your free trial today - only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
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
            <p className="mt-6 text-sm text-gray-500">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}