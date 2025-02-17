import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { name: 'How It Works', section: 'how-it-works' },
  { name: 'Features', section: 'features' },
  { name: 'Pricing', section: 'pricing' }
];

export default function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
      scrolled || isOpen ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xl sm:text-2xl font-bold text-blue-600 tracking-wider"
            >
              CLEANAGENT
            </button>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <Button 
                  key={item.section}
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 lg:px-4"
                  onClick={() => scrollToSection(item.section)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="ml-4 lg:ml-6">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity group"
                onClick={() => navigate('/signup')}
              >
                Try Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-600 hover:bg-blue-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div 
          className={`md:hidden mobile-nav ${
            isOpen ? 'mobile-nav-enter' : 'mobile-nav-exit'
          }`}
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => (
              <Button 
                key={item.section}
                variant="ghost" 
                className="mobile-nav-item"
                onClick={() => scrollToSection(item.section)}
              >
                {item.name}
              </Button>
            ))}
            <div className="px-4 py-3">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity group"
                onClick={() => navigate('/signup')}
              >
                Try Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}