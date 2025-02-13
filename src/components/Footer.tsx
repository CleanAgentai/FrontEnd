import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">TaskTalent.AI</h3>
            <p className="text-primary-100">
              AI-powered talent platform for modern businesses
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-primary-100 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-primary-100 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-primary-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-primary-100 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Stay Updated</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-white text-primary-600 hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-primary-100 text-sm">
                Get the latest updates and news directly to your inbox.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-100 text-sm">
            © 2024 TaskTalent.AI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com/tasktalentai" target="_blank" rel="noopener noreferrer" className="text-primary-100 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/company/tasktalent-ai" target="_blank" rel="noopener noreferrer" className="text-primary-100 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://github.com/tasktalent" target="_blank" rel="noopener noreferrer" className="text-primary-100 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}