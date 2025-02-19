import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  
  useDocumentMeta({
    title: 'Privacy Policy - CleanAgent.AI',
    description: 'Read our privacy policy to understand how CleanAgent.AI collects, uses, and protects your personal information.',
    noindex: false
  });
  
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
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <div className="text-gray-600">
            <p>Effective Date: February 18, 2025</p>
            <p>Last Updated: February 19, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Welcome to CleanAgent.AI, a service provided by CLEANAGENT, LLC ("Company," "we," "us," or "our"). 
            We respect your privacy and are committed to protecting it through this Privacy Policy.
          </p>

          <p className="text-gray-600 mb-8">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website (https://www.cleanagent.ai) (the "Website") and use our services (collectively, 
            the "Services"). Please read this policy carefully to understand our views and practices regarding 
            your personal data and how we will treat it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect several types of information from and about users of our Website and Services, including:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">A. Information You Provide to Us</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Account Information:</strong> When you sign up for our Services, we collect personal details such as your name, email address, phone number, company name, and payment details.</li>
            <li><strong>Communications:</strong> If you contact us, we may collect information such as your name, email address, and any other details you provide.</li>
            <li><strong>Content You Submit:</strong> If you provide feedback, testimonials, or other content, we may collect this information.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">B. Information Collected Automatically</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Usage Data:</strong> We may collect information about your interactions with our Website, such as IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of visits.</li>
            <li><strong>Cookies & Tracking Technologies:</strong> We use cookies, beacons, and similar technologies to enhance user experience and analyze Website traffic.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">C. Information from Third Parties</h3>
          <p className="text-gray-600">
            We may receive data from third-party service providers, business partners, and publicly available sources.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To provide, maintain, and improve our Services.</li>
            <li>To personalize your experience and deliver relevant content.</li>
            <li>To process payments and manage subscriptions.</li>
            <li>To communicate with you, including responding to inquiries and sending updates.</li>
            <li>To detect, prevent, and address security issues, fraud, and abuse.</li>
            <li>To comply with legal obligations and enforce our terms.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Sharing and Disclosure of Information</h2>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information. However, we may share information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who help us operate our business.</li>
            <li><strong>For Legal Compliance:</strong> We may disclose information to comply with legal obligations.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, sale, or acquisition.</li>
            <li><strong>With Your Consent:</strong> When we have your explicit consent.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Data Security</h2>
          <p className="text-gray-600">
            We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration. 
            However, no data transmission or storage can be guaranteed 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Your Rights & Choices</h2>
          <p className="text-gray-600 mb-4">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Access & Correction:</strong> Request access and correct inaccuracies.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information.</li>
            <li><strong>Opt-Out:</strong> Opt out of marketing emails.</li>
            <li><strong>Cookies:</strong> Manage cookie preferences through browser settings.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Retention of Information</h2>
          <p className="text-gray-600">
            We retain personal data only as long as necessary for the purposes outlined in this Privacy Policy 
            unless a longer retention period is required by law.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Third-Party Links & Services</h2>
          <p className="text-gray-600">
            Our Website may contain links to third-party sites. We are not responsible for their privacy practices. 
            Please review their privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. Children's Privacy</h2>
          <p className="text-gray-600">
            Our Services are not intended for individuals under 18. We do not knowingly collect personal data from children.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. International Data Transfers</h2>
          <p className="text-gray-600">
            Your information may be transferred to and processed in the United States. By using our Services, 
            you consent to this transfer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Changes to This Privacy Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Changes will be posted here with an updated effective date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">11. Contact Us</h2>
          <div className="text-gray-600">
            <p className="mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p>CLEANAGENT, LLC</p>
            <p>209 Turner Street, Clearwater, Florida 33756</p>
            <p>Email: support@cleanagent.ai</p>
            <p>Phone: 813-750-5308</p>
          </div>
        </div>
      </div>
    </div>
  );
} 