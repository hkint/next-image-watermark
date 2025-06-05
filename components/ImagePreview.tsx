'use client'

import { Download, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Trans, t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface ImagePreviewProps {
  processedImage: string
  outputFormat: 'png' | 'jpeg'
  setOutputFormat: (format: 'png' | 'jpeg') => void
  jpegQuality: number[]
  setJpegQuality: (quality: number[]) => void
}

export function ImagePreview({
  processedImage,
  outputFormat,
  setOutputFormat,
  jpegQuality,
  setJpegQuality
}: ImagePreviewProps) {
  const { i18n } = useLingui()

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      const extension = outputFormat === 'jpeg' ? 'jpeg' : 'png'
      link.download = `watermarked-image.${extension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success(t(i18n)`Image downloading`)
    }
  }

  const handleCopyToClipboard = async () => {
    if (processedImage) {
      try {
        const response = await fetch(processedImage)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ])
        toast.success('Image copied to clipboard', {
          description: 'You can now paste the image anywhere',
          duration: 3000
        })
      } catch (err) {
        toast.error('Failed to copy image', {
          description: 'Please try download instead',
          duration: 3000
        })
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-dashed border-blue-100 hover:border-blue-200 transition-colors duration-200 shadow">
        {processedImage ? (
          <img
            src={processedImage}
            alt={t(i18n)`Watermarked preview`}
            className="w-full h-full object-contain bg-white/80 backdrop-blur-sm"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
            <Trans>Preview will appear here</Trans>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* Output Controls */}
        <div className="space-y-4 p-4 border rounded-lg bg-white shadow">
          <div>
            <Label htmlFor="outputFormat" className="text-sm font-medium">
              <Trans>Output Format</Trans>
            </Label>
            <Select
              value={outputFormat}
              onValueChange={(value: 'png' | 'jpeg') => setOutputFormat(value)}
            >
              <SelectTrigger id="outputFormat" className="w-full mt-1">
                <SelectValue placeholder={t(i18n)`Select format`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">
                  <Trans>PNG</Trans>
                </SelectItem>
                <SelectItem value="jpeg">
                  <Trans>JPEG</Trans>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {outputFormat === 'jpeg' && (
            <div>
              <Label htmlFor="jpegQuality" className="text-sm font-medium">
                <Trans>JPEG Quality</Trans>: {jpegQuality[0]}
              </Label>
              <Slider
                id="jpegQuality"
                value={jpegQuality}
                onValueChange={setJpegQuality}
                min={1}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-6 text-lg"
            onClick={handleDownload}
            disabled={!processedImage}
          >
            <Download className="mr-2 h-5 w-5" />
            <Trans>Download Image</Trans>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 py-6 text-lg"
            onClick={handleCopyToClipboard}
            disabled={!processedImage}
          >
            <Copy className="mr-2 h-5 w-5" />
            <Trans>Copy to Clipboard</Trans>
          </Button>
        </div>
      </div>
    </div>
  )
}
