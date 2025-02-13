import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the AI screening process work?',
    answer: 'Our AI analyzes applications and video interviews using advanced algorithms to evaluate candidates based on your specific requirements. It considers factors like experience, skills, and cultural fit.',
  },
  {
    question: 'What is the cost structure?',
    answer: 'We charge $30 per qualified candidate. You only pay when you receive candidates that meet your criteria and pass our screening process. There are no monthly fees or hidden costs.',
  },
  {
    question: 'How long does it take to get started?',
    answer: 'You can start posting jobs immediately after signing up. The setup process takes less than 10 minutes, and our team is available to help you optimize your hiring process.',
  },
  {
    question: 'Can I customize the screening criteria?',
    answer: 'Yes, you can set specific requirements for each job posting. Our AI adapts to your preferences and learns from your hiring decisions to improve future matches.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We provide 24/7 customer support via chat and email. Our team can help with platform navigation, optimization of job postings, and any technical issues.',
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about TaskTalent.AI
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-gray-900 hover:text-primary-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}