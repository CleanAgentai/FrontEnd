import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: "What happens after the 7-day free trial?",
    answer: "You will be automatically billed $299/month unless you cancel before the trial ends. There are no contracts, and you can cancel anytime. All features are included in the trial, so you can fully evaluate the platform."
  },
  {
    question: "How does CleanAgent help my cleaning business grow?",
    answer: "Our AI automates hiring, sales, and operations, saving you 20+ hours per week and reducing costs by 90%. The platform handles job postings, candidate screening, lead follow-ups, scheduling, and quality control—allowing you to focus on growing your business."
  },
  {
    question: "How easy is it to set up?",
    answer: "CleanAgent is plug-and-play—no complex setup required. You can start using AI automation within minutes of signing up. Our onboarding team helps you configure the platform to your business needs, and the AI quickly learns your preferences."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, CleanAgent is a month-to-month service with no long-term contracts. You can cancel anytime through your account settings or by contacting our support team. We'll process your cancellation immediately with no questions asked."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Most cleaning businesses see significant improvements within the first week: 40% higher lead conversion rates, 95% faster hiring process, and 20+ hours saved per week. Our AI handles repetitive tasks 24/7, leading to improved customer satisfaction and business growth."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption and security measures. Your business data is protected with the same level of security used by major banks. We're fully compliant with industry standards and never share your information with third parties."
  }
];

export default function FAQ() {
  const navigate = useNavigate();
  
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-500/10 px-4 py-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1 rounded-full">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Got Questions?
          </h2>
          <p className="text-xl text-gray-600">
            Learn how CleanAgent can transform your cleaning business
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <Accordion 
            type="single" 
            collapsible 
            className="divide-y divide-gray-100"
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group"
              >
                <AccordionTrigger className="flex py-6 px-6 text-left hover:no-underline">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-lg p-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
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