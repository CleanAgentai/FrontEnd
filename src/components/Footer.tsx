import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ]
  }
];

const socialLinks = [
  { 
    icon: Facebook, 
    href: "https://facebook.com/cleanagent",
    label: "Follow us on Facebook"
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/cleanagent",
    label: "Follow us on Twitter"
  },
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/company/cleanagent",
    label: "Connect with us on LinkedIn"
  },
  { 
    icon: Instagram, 
    href: "https://instagram.com/cleanagent",
    label: "Follow us on Instagram"
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">CleanAgent</h2>
              <p className="text-gray-600 leading-relaxed">
                AI-powered platform that automates hiring, marketing, sales, and operations for cleaning businesses.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Get business tips & updates
              </h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Join our mailing list for exclusive content
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
              Privacy Policy
            </a>
            <span className="text-gray-300">•</span>
            <a href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
              Terms of Service
            </a>
            <span className="text-gray-300">•</span>
            <a href="/support" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
              Support
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CleanAgent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}