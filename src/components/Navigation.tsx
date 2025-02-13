import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navigate(path);
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span 
              className="text-2xl font-bold text-primary-600 cursor-pointer" 
              onClick={() => handleNavigation('/')}
            >
              TaskTalent.AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {location.pathname === '/' ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-primary-600"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-primary-600"
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-primary-600"
                  onClick={() => scrollToSection('testimonials')}
                >
                  Testimonials
                </Button>
              </>
            ) : null}
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-primary-600"
              onClick={() => handleNavigation('/about')}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-primary-600"
              onClick={() => handleNavigation('/blog')}
            >
              Blog
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-primary-600"
              onClick={() => handleNavigation('/careers')}
            >
              Careers
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-primary-600"
              onClick={() => handleNavigation('/faq')}
            >
              FAQ
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {location.pathname === '/' && (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600 hover:text-primary-600"
                    onClick={() => scrollToSection('features')}
                  >
                    Features
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600 hover:text-primary-600"
                    onClick={() => scrollToSection('pricing')}
                  >
                    Pricing
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600 hover:text-primary-600"
                    onClick={() => scrollToSection('testimonials')}
                  >
                    Testimonials
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-primary-600"
                onClick={() => handleNavigation('/about')}
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-primary-600"
                onClick={() => handleNavigation('/blog')}
              >
                Blog
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-primary-600"
                onClick={() => handleNavigation('/careers')}
              >
                Careers
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-primary-600"
                onClick={() => handleNavigation('/faq')}
              >
                FAQ
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}