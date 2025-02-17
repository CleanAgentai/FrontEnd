import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: "How does CleanAgent save time and money?",
    answer: "Our AI automates repetitive tasks, reducing operational workload by 85% and cutting costs by 90%. This includes automated hiring, scheduling, customer communication, and quality control. Most businesses save 20+ hours per week."
  },
  {
    question: "Can I customize the AI for my business?",
    answer: "Yes, CleanAgent adapts to your workflows and integrates with your current software. The AI learns your business preferences, service areas, pricing structure, and team availability to provide personalized automation."
  },
  {
    question: "How does AI improve customer satisfaction?",
    answer: "AI automates follow-ups, handles scheduling, and ensures service quality tracking—leading to 30% better customer retention. The system provides instant responses, proactive communication, and consistent service delivery."
  },
  {
    question: "What's included in the free trial?",
    answer: "Your 7-day free trial includes full access to all features: AI hiring, sales automation, scheduling, and operations management. You'll get hands-on experience with the platform and see how it can transform your business."
  },
  {
    question: "How long does it take to get started?",
    answer: "You can start using CleanAgent immediately after signing up. Our AI quickly learns your business operations, and most companies see significant improvements within the first week. We also provide onboarding support to ensure smooth adoption."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption and security measures to protect your data. Our platform complies with industry standards and regulations, ensuring your business information remains confidential and secure."
  }
];

export default function FAQ() {
  const navigate = useNavigate();
  
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Learn how CleanAgent can transform your cleaning business
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <Accordion 
            type="single" 
            collapsible 
            className="divide-y divide-gray-100"
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="px-6 py-3 first:rounded-t-2xl last:rounded-b-2xl hover:bg-gray-50/50 transition-colors"
              >
                <AccordionTrigger className="flex py-4 text-left">
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to transform your cleaning business?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Start your 7-day free trial today. Only $299/month after trial period.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="button-primary group text-lg"
                onClick={() => navigate('/signup')}
              >
                Try Free - 7 Days
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors text-lg"
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