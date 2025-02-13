import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-primary-400/10 to-primary-600/20 backdrop-blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Revolutionizing Cleaning Staff
          <span className="block bg-gradient-to-r from-primary-200 via-white to-primary-200 bg-clip-text text-transparent">
            Recruitment with AI
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          We're on a mission to transform how cleaning businesses find and hire reliable staff, 
          making the process faster, smarter, and more efficient.
        </p>

        <Button 
          size="lg" 
          className="bg-white text-primary-600 hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
          onClick={() => navigate('/signup')}
        >
          Join Our Mission
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}