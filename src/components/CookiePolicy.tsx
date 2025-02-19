import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function CookiePolicy() {
  const navigate = useNavigate();
  
  useDocumentMeta({
    title: 'Cookie Policy - CleanAgent.AI',
    description: 'Learn about how CleanAgent.AI uses cookies and similar tracking technologies to improve your browsing experience.',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <div className="text-gray-600">
            <p>Effective Date: February 18, 2025</p>
            <p>Last Updated: February 19, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            This Cookie Policy explains how CLEANAGENT, LLC ("Company," "we," "us," or "our") uses cookies 
            and similar tracking technologies when you visit our website (https://www.cleanagent.ai) (the "Website"). 
            This policy should be read in conjunction with our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. What Are Cookies?</h2>
          <p className="text-gray-600">
            Cookies are small text files that are placed on your device when you visit a website. They help us 
            improve your browsing experience, track site usage, and personalize content. Cookies can be "session cookies" 
            (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set 
            period or until you delete them).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. How We Use Cookies</h2>
          <p className="text-gray-600 mb-4">We use cookies and similar technologies for the following purposes:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the functioning of our Website, such as enabling navigation and access to secure areas.</li>
            <li><strong>Performance & Analytics Cookies:</strong> Help us analyze Website traffic, track visitor interactions, and improve functionality.</li>
            <li><strong>Functional Cookies:</strong> Enhance user experience by remembering preferences, such as language or login details.</li>
            <li><strong>Advertising & Marketing Cookies:</strong> Used to deliver relevant ads and measure the effectiveness of marketing campaigns.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Third-Party Cookies</h2>
          <p className="text-gray-600">
            We may allow third-party service providers, such as Google Analytics, to use cookies to collect data 
            about how users interact with our Website. These third parties may use cookies for their own purposes 
            in accordance with their privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Managing Your Cookie Preferences</h2>
          <p className="text-gray-600 mb-4">You can manage your cookie preferences in the following ways:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings.</li>
            <li><strong>Opt-Out Tools:</strong> Some third-party services provide opt-out mechanisms for their cookies.</li>
            <li><strong>Cookie Consent Banner:</strong> When you visit our Website, you may be given the option to accept or decline non-essential cookies.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Please note that disabling certain cookies may impact your experience on our Website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Changes to This Cookie Policy</h2>
          <p className="text-gray-600">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
            updated effective date. Your continued use of our Website after any changes constitutes acceptance of 
            the revised policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Contact Us</h2>
          <div className="text-gray-600">
            <p className="mb-4">If you have any questions about this Cookie Policy, please contact us at:</p>
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