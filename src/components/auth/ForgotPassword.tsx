import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: resetError } = await resetPassword(email);
      if (resetError) throw resetError;
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset instructions. Please try again.');
      console.error('Password reset failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full p-8 space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-gray-600">
              We've sent password reset instructions to {email}
            </p>
          </div>
          <div className="text-center">
            <Button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 hover:text-blue-700"
              variant="link"
            >
              Didn't receive the email? Try again
            </Button>
          </div>
          <p className="text-center text-gray-600">
            Remember your password?{' '}
            <Button
              type="button"
              variant="link"
              className="text-blue-600 hover:text-blue-700 font-medium p-0"
              onClick={() => navigate('/login')}
            >
              Back to login
            </Button>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Reset your password
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Remember your password?{' '}
          <Button
            type="button"
            variant="link"
            className="text-blue-600 hover:text-blue-700 font-medium p-0"
            onClick={() => navigate('/login')}
          >
            Back to login
          </Button>
        </p>
      </Card>
    </div>
  );
} 