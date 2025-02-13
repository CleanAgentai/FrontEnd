import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <form className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              />
              <Textarea
                placeholder="Your Message"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                rows={5}
              />
              <Button className="w-full bg-white text-primary-600 hover:bg-white/90">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Address</h3>
                  <p className="text-white/80">123 Innovation Drive, Tech City, TC 12345</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-white/80">contact@tasktalent.ai</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-white mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-white/80">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}