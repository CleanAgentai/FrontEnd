import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Link, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateShareableLink } from '@/lib/utils/sharing';

interface ShareJobDialogProps {
  jobId?: string;
  companyId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShareJobDialog({ 
  jobId, 
  companyId, 
  isOpen, 
  onOpenChange 
}: ShareJobDialogProps) {
  const [shareableLink, setShareableLink] = useState('');
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying the link manually.',
        variant: 'destructive',
      });
    }
  };

  const handleOpen = async () => {
    const link = await generateShareableLink(companyId, jobId);
    setShareableLink(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} onOpenAutoFocus={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Share {jobId ? 'Job Post' : 'Job Board'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareableLink}
              readOnly
              className="flex-1"
            />
            <Button 
              size="icon"
              variant="outline"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open(shareableLink, '_blank')}
            >
              <Link className="h-4 w-4" />
              Open Link
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out our open positions at ${shareableLink}`
                )}`;
                window.open(url, '_blank');
              }}
            >
              <Share2 className="h-4 w-4" />
              Share on Twitter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}