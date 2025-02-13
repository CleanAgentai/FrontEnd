import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Link, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareJobBoardProps {
  companySlug: string;
  companyName: string;
}

export default function ShareJobBoard({ companySlug, companyName }: ShareJobBoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const shareableLink = `${window.location.origin}/companies/${companySlug}/jobs`;
  const embedCode = `<iframe src="${shareableLink}" width="100%" height="600" frameborder="0"></iframe>`;

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: message,
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying manually',
        variant: 'destructive',
      });
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out job opportunities at ${companyName}: ${shareableLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" className="gap-2">
        <Share2 className="h-4 w-4" />
        Share Job Board
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Job Board</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Shareable Link</label>
              <div className="flex items-center space-x-2">
                <Input value={shareableLink} readOnly />
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(shareableLink, 'Link copied to clipboard')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Embed Code</label>
              <div className="flex items-center space-x-2">
                <Input value={embedCode} readOnly />
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(embedCode, 'Embed code copied to clipboard')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => window.open(shareableLink, '_blank')}
              >
                <Link className="h-4 w-4" />
                Open Job Board
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={shareOnTwitter}
              >
                <Twitter className="h-4 w-4" />
                Share on Twitter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}