'use client';

import { Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImagePreviewProps {
  processedImage: string;
}

export function ImagePreview({ processedImage }: ImagePreviewProps) {
  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'watermarked-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloading');
    }
  };

  const handleCopyToClipboard = async () => {
    if (processedImage) {
      try {
        const response = await fetch(processedImage);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        toast.success('Image copied to clipboard', {
          description: 'You can now paste the image anywhere',
          duration: 3000,
        });
      } catch (err) {
        toast.error('Failed to copy image', {
          description: 'Please try download instead',
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-dashed border-blue-100 hover:border-blue-200 transition-colors duration-200 shadow">
        {processedImage ? (
          <img
            src={processedImage}
            alt="Watermarked"
            className="w-full h-full object-contain bg-white/80 backdrop-blur-sm"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
            Preview will appear here
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-6 text-lg"
          onClick={handleDownload}
          disabled={!processedImage}
        >
          <Download className="mr-2 h-5 w-5" />
          Download Image
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 py-6 text-lg"
          onClick={handleCopyToClipboard}
          disabled={!processedImage}
        >
          <Copy className="mr-2 h-5 w-5" />
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
}
