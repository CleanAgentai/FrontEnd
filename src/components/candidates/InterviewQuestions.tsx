import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { submitInterviewAnswers } from '@/lib/api/interviews';
import type { Question } from '@/lib/types/interviews';

interface InterviewQuestionsProps {
  questions: Question[];
  applicationId: string;
  onComplete: () => void;
}

export default function InterviewQuestions({ 
  questions, 
  applicationId, 
  onComplete 
}: InterviewQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitInterviewAnswers(applicationId, answers);
      toast({ title: 'Success', description: 'Interview answers submitted successfully' });
      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit answers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question) => (
        <Card key={question.id} className="p-4">
          <label className="block font-medium mb-2">{question.text}</label>
          <Textarea
            value={answers[question.id] || ''}
            onChange={(e) => setAnswers({
              ...answers,
              [question.id]: e.target.value
            })}
            rows={4}
            required
          />
        </Card>
      ))}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Answers'}
      </Button>
    </form>
  );
}