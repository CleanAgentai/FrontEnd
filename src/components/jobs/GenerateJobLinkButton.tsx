import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Link, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GenerateJobLinkButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'The current page URL has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying the link manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Link className="h-4 w-4" />
        Share Job Board
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Job Board Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500">
              Share this link to your job board:
            </p>
            <div className="flex gap-2">
              <Input value={window.location.href} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}