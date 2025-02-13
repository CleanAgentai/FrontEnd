import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateApplicationStatus } from '@/lib/api/applications';
import { useToast } from '@/hooks/use-toast';
import type { Application } from '@/lib/types/applications';

interface CandidateDetailsProps {
  candidate: Application;
  onStatusChange: () => void;
}

export default function CandidateDetails({ candidate, onStatusChange }: CandidateDetailsProps) {
  const { toast } = useToast();

  const handleStatusUpdate = async (status: string) => {
    try {
      await updateApplicationStatus(candidate.id, status);
      toast({ title: 'Success', description: 'Status updated successfully' });
      onStatusChange();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {candidate.firstName} {candidate.lastName}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{candidate.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{candidate.phone || 'Not provided'}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Cover Letter</p>
          <p className="text-gray-700 whitespace-pre-wrap">
            {candidate.coverLetter || 'No cover letter provided'}
          </p>
        </div>
      </Card>

      <Tabs defaultValue="evaluation">
        <TabsList className="w-full">
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="evaluation" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Status Update</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleStatusUpdate('reviewing')}
                disabled={candidate.status === 'reviewing'}
              >
                Mark as Reviewing
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleStatusUpdate('interviewing')}
                disabled={candidate.status === 'interviewing'}
              >
                Schedule Interview
              </Button>
              <Button 
                variant="default"
                onClick={() => handleStatusUpdate('accepted')}
                disabled={candidate.status === 'accepted'}
              >
                Accept
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleStatusUpdate('rejected')}
                disabled={candidate.status === 'rejected'}
              >
                Reject
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="interview" className="mt-4">
          <Card className="p-6">
            <p className="text-gray-500">Interview details will be shown here</p>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card className="p-6">
            <p className="text-gray-500">Candidate documents will be shown here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}