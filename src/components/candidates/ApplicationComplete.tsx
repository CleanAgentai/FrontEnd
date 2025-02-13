import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for applying. We'll review your application and get back to you soon.
        </p>
        <div className="space-y-4">
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => navigate('/jobs')}
          >
            View More Jobs
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}