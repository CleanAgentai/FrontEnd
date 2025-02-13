import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <Navigation />
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-6">
              Transforming Cleaning Recruitment with AI
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Helping cleaning businesses find and hire top talent efficiently with AI-powered solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Address</h3>
                  <p className="text-white/80">209 Turner Street, Clearwater, Florida 33756</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-white/80">contact@tasktalent.ai</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-white/80">813-750-5308</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}