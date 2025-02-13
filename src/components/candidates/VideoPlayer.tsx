import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
}

export default function VideoPlayer({ src, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(console.error);
    }
  }, [autoPlay, src]);

  return (
    <Card className="overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        controls
        className="w-full"
        style={{ maxHeight: '400px' }}
      >
        Your browser does not support the video tag.
      </video>
    </Card>
  );
}