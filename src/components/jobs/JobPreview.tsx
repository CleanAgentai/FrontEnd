import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import type { JobFormData } from '@/lib/types/jobs';

interface JobPreviewProps {
  data: JobFormData;
}

export default function JobPreview({ data }: JobPreviewProps) {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.title || 'Job Title'}</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {data.employmentType && (
          <Badge variant="secondary" className="text-primary-600">
            <Clock className="w-4 h-4 mr-1" />
            {data.employmentType}
          </Badge>
        )}
        
        {data.location && (
          <Badge variant="secondary" className="text-primary-600">
            <MapPin className="w-4 h-4 mr-1" />
            {data.location}
          </Badge>
        )}
        
        {data.salary && (
          <Badge variant="secondary" className="text-primary-600">
            <DollarSign className="w-4 h-4 mr-1" />
            {data.salary}
          </Badge>
        )}
      </div>

      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-gray-600 whitespace-pre-wrap">{data.description || 'No description provided'}</p>
      </div>
    </Card>
  );
}