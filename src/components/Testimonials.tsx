import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Operations Manager',
    company: 'CleanCo Services',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    content: 'TaskTalent.AI has revolutionized our hiring process. We\'ve reduced our time-to-hire by 75% while finding better candidates.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'HR Director',
    company: 'Elite Cleaning Solutions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    content: 'The AI screening has been a game-changer. We\'re saving thousands in recruitment costs and getting higher quality candidates.',
  },
  {
    name: 'Emily Chen',
    role: 'CEO',
    company: 'Sparkle & Shine Inc',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    content: 'Outstanding platform! The video interviews and AI assessments help us make better hiring decisions consistently.',
  },
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of cleaning businesses that have transformed their hiring process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}