import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mainLinks = [
  { name: 'About', section: 'about' },
  { name: 'Features', section: 'features' },
  { name: 'Pricing', section: 'pricing' },
  { name: 'Blog', section: 'blog' }
];

const resourceLinks = [
  { name: 'FAQ', section: 'faq' },
  { name: 'Careers', section: 'careers' },
  { name: 'Support', section: 'support' },
  { name: 'Documentation', section: 'docs' }
];

const legalLinks = [
  { name: 'Privacy Policy', section: 'privacy' },
  { name: 'Terms of Service', section: 'terms' },
  { name: 'Cookie Policy', section: 'cookies' }
];

const socialLinks = [
  { 
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/cleanagentai'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/cleanagent'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/cleanagentai'
  }
];

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-bold text-blue-600 tracking-wider mb-6 inline-block"
              >
                CLEANAGENT
              </button>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
                AI-powered cleaning management platform that helps businesses streamline operations and boost efficiency. Transform your cleaning business with smart scheduling, route optimization, and quality management.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subscribe to our newsletter
                </h3>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 text-base"
                  />
                  <Button 
                    className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={social.name}
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gradient-to-r from-blue-600/10 to-teal-500/10 transition-colors">
                      <social.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Main Links */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wider mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                {mainLinks.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-lg text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource Links */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wider mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                {resourceLinks.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-lg text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wider mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-lg text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">
                © 2024 CleanAgent. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="mailto:support@cleanagent.ai"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>support@cleanagent.ai</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}