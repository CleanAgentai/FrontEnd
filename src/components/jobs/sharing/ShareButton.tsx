import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import ShareJobDialog from './ShareJobDialog';

interface ShareButtonProps {
  jobId?: string;
  companyId: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export default function ShareButton({ jobId, companyId, variant = 'outline' }: ShareButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        variant={variant} 
        onClick={() => setIsDialogOpen(true)}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share {jobId ? 'Job' : 'Board'}
      </Button>

      <ShareJobDialog
        jobId={jobId}
        companyId={companyId}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}