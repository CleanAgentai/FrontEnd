import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms of Service and Privacy Policy' })
  })
});

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting, touchedFields }, watch } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      acceptTerms: false
    }
  });

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setFormError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      setFormError('Google sign-up failed. Please try again.');
      console.error('Google sign-up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      setIsLoading(true);
      setFormError(null);
      const { error } = await signInWithFacebook();
      if (error) throw error;
    } catch (error) {
      setFormError('Facebook sign-up failed. Please try again.');
      console.error('Facebook sign-up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      setFormError(null);
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) throw error;
      // On success, redirect to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      setFormError(error.message || 'Sign-up failed. Please check your information and try again.');
      console.error('Sign-up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join CleanAgent.AI to automate your cleaning business
          </p>
        </div>

        {formError && (
          <Alert variant="destructive" className="flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {/* Social Sign-up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="h-10 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>

            <Button
              type="button"
              onClick={handleFacebookSignUp}
              disabled={isLoading}
              className="h-10 bg-[#1877F2] hover:bg-[#1874EA] text-white"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Sign-up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label htmlFor="fullName" className="text-sm">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                {...register('fullName')}
                className={`h-10 ${errors.fullName || (touchedFields.fullName && !watch('fullName')) ? 'border-red-500 focus:ring-red-500' : ''}`}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`h-10 ${errors.email || (touchedFields.email && !watch('email')) ? 'border-red-500 focus:ring-red-500' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`h-10 pr-10 ${errors.password || (touchedFields.password && !watch('password')) ? 'border-red-500 focus:ring-red-500' : ''}`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="acceptTerms"
                {...register('acceptTerms')}
                className={errors.acceptTerms ? 'border-red-500' : ''}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{' '}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 text-blue-600 hover:text-blue-700 font-medium h-auto"
                    onClick={() => window.open('/terms', '_blank')}
                  >
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 text-blue-600 hover:text-blue-700 font-medium h-auto"
                    onClick={() => window.open('/privacy', '_blank')}
                  >
                    Privacy Policy
                  </Button>
                </label>
                {errors.acceptTerms && (
                  <p className="text-xs text-red-600">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity"
            >
              {isLoading || isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="text-blue-600 hover:text-blue-700 font-medium p-0 text-sm"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
} 