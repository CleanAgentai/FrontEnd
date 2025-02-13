import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SignUpForm() {
  return (
    <div className="py-24 bg-white/5">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 bg-white/10 border-white/20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white text-center mb-8 font-cherry">
            Get Started Today
          </h2>
          <form className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Company name"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button className="w-full bg-white text-primary-DEFAULT hover:bg-white/90">
              Create Account
            </Button>
          </form>
          <p className="mt-4 text-sm text-white/60 text-center">
            By signing up, you agree to our{' '}
            <a href="#" className="underline hover:text-white">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}