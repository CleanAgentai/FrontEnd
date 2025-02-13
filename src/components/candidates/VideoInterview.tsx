import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { uploadVideo } from '@/lib/api/interviews';
import { Video, StopCircle, Loader2 } from 'lucide-react';

interface VideoInterviewProps {
  questionId: string;
  onComplete: () => void;
}

export default function VideoInterview({ questionId, onComplete }: VideoInterviewProps) {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        await handleUpload(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to start recording',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleUpload = async (blob: Blob) => {
    setUploading(true);
    try {
      await uploadVideo(questionId, blob);
      toast({ title: 'Success', description: 'Video uploaded successfully' });
      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload video',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Video Response</h3>
          {recording && (
            <div className="flex items-center text-red-500">
              <span className="animate-pulse mr-2">●</span>
              Recording
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {recording ? (
            <Button
              variant="destructive"
              size="lg"
              onClick={stopRecording}
              disabled={uploading}
            >
              <StopCircle className="h-6 w-6 mr-2" />
              Stop Recording
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              onClick={startRecording}
              disabled={uploading}
            >
              <Video className="h-6 w-6 mr-2" />
              Start Recording
            </Button>
          )}
        </div>

        {uploading && (
          <div className="flex justify-center items-center text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Uploading video...
          </div>
        )}
      </div>
    </Card>
  );
}