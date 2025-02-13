import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createEvaluation } from '@/lib/api/evaluations';

interface EvaluationFormProps {
  applicationId: string;
  onComplete: () => void;
}

export default function EvaluationForm({ applicationId, onComplete }: EvaluationFormProps) {
  const [formData, setFormData] = useState({
    skillsRating: '',
    experienceRating: '',
    cultureFitRating: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEvaluation({
        applicationId,
        ...formData,
        skillsRating: parseInt(formData.skillsRating),
        experienceRating: parseInt(formData.experienceRating),
        cultureFitRating: parseInt(formData.cultureFitRating),
      });
      toast({ title: 'Success', description: 'Evaluation submitted successfully' });
      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit evaluation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const ratings = [1, 2, 3, 4, 5];

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills Rating</label>
            <Select
              value={formData.skillsRating}
              onValueChange={(value) => setFormData({ ...formData, skillsRating: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} - {rating === 5 ? 'Excellent' : rating === 1 ? 'Poor' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Rating</label>
            <Select
              value={formData.experienceRating}
              onValueChange={(value) => setFormData({ ...formData, experienceRating: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} - {rating === 5 ? 'Excellent' : rating === 1 ? 'Poor' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Culture Fit Rating</label>
            <Select
              value={formData.cultureFitRating}
              onValueChange={(value) => setFormData({ ...formData, cultureFitRating: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} - {rating === 5 ? 'Excellent' : rating === 1 ? 'Poor' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Add any additional notes or observations..."
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Evaluation'}
        </Button>
      </form>
    </Card>
  );
}