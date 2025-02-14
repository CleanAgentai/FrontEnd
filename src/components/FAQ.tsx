import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How does CleanAgent's scheduling system work?",
    answer: "Our AI-powered scheduling system automatically assigns cleaning staff based on their availability, skills, and location. It considers factors like travel time, service duration, and customer preferences to create optimal schedules that maximize efficiency and minimize costs."
  },
  {
    question: "Can I track my cleaning staff in real-time?",
    answer: "Yes, CleanAgent provides real-time GPS tracking of your cleaning staff through our mobile app. You can see their current location, track completed tasks, and get instant notifications about schedule changes or delays."
  },
  {
    question: "How does the quality management system ensure consistent cleaning standards?",
    answer: "Our digital quality management system includes customizable checklists, photo documentation, and customer feedback integration. Supervisors can perform digital inspections, and the system automatically tracks completion rates and identifies areas for improvement."
  },
  {
    question: "What kind of support do you provide during onboarding?",
    answer: "We provide comprehensive onboarding support including personalized training sessions, setup assistance, and dedicated support during your first month. Our team helps with staff training, data migration, and customizing the system to match your workflow."
  },
  {
    question: "Can customers book cleaning services online?",
    answer: "Yes, CleanAgent includes a customizable customer portal where clients can book services, view their cleaning history, communicate with your team, and manage their payments. The portal can be branded with your company's logo and colors."
  },
  {
    question: "How does route optimization save fuel costs?",
    answer: "Our AI-powered route optimization considers factors like traffic patterns, service duration, and staff location to create the most efficient routes. Customers typically see a 15-20% reduction in fuel costs and can service more clients in less time."
  },
  {
    question: "Is the mobile app available for all staff members?",
    answer: "Yes, all staff members get access to our mobile app, which includes features like schedule viewing, route navigation, digital checklists, time tracking, and communication tools. The app works on both iOS and Android devices."
  },
  {
    question: "Can I integrate CleanAgent with my existing software?",
    answer: "Yes, CleanAgent offers API access in our Business and Enterprise plans, allowing integration with accounting software, HR systems, and other business tools. We also provide pre-built integrations with popular platforms."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
            Everything you need to know about managing your cleaning business with CleanAgent
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <Accordion 
            type="single" 
            collapsible 
            className="divide-y divide-gray-200"
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="px-6 py-2 first:rounded-t-2xl last:rounded-b-2xl hover:bg-gray-50/50 transition-colors"
              >
                <AccordionTrigger className="flex py-4 sm:py-6 text-left">
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed pr-8">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Still have questions? We're here to help.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            Contact Support
          </div>
        </div>
      </div>
    </section>
  );
}