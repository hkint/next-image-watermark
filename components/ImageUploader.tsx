'use client'

import { Upload, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useState } from 'react'
import { t, Trans } from '@lingui/macro'

import { useLingui } from '@lingui/react'
import Link from 'next/link'

interface ImageUploaderProps {
  onImageChange: (image: string) => void
  onImageUploaded?: () => void
}

export function ImageUploader({
  onImageChange,
  onImageUploaded
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(<Trans>Please upload an image file</Trans>)
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(<Trans>Image size should be less than 10MB</Trans>)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onImageChange(result)
        onImageUploaded?.()
        toast.success(<Trans>Image uploaded successfully</Trans>)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlUpload = async () => {
    if (!imageUrl) {
      toast.error(<Trans>Please enter an image URL</Trans>)
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }

      const blob = await response.blob()
      if (!blob.type.startsWith('image/')) {
        throw new Error('Invalid image format')
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onImageChange(result)
        onImageUploaded?.()
        setImageUrl('')
        toast.success(<Trans>Image loaded successfully</Trans>)
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      toast.error(<Trans>Failed to load image from URL</Trans>)
    } finally {
      setIsLoading(false)
    }
  }

  // Upload with proxy API to avoid CORS
  // const handleUrlUpload = async () => {
  //   if (!imageUrl) {
  //     toast.error('Please enter an image URL');
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const encodedUrl = encodeURIComponent(imageUrl);
  //     const response = await fetch(`/api/proxy?url=${encodedUrl}`);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch image');
  //     }

  //     const blob = await response.blob();
  //     if (!blob.type.startsWith('image/')) {
  //       throw new Error('Invalid image format');
  //     }

  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const result = event.target?.result as string;
  //       onImageChange(result);
  //       onImageUploaded?.();
  //       setImageUrl('');
  //       toast.success('Image loaded successfully');
  //     };
  //     reader.readAsDataURL(blob);
  //   } catch (error) {
  //     toast.error('Failed to load image from URL');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    const imageItem = Array.from(items).find((item) =>
      item.type.startsWith('image/')
    )

    if (imageItem) {
      const file = imageItem.getAsFile()
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          onImageChange(result)
          onImageUploaded?.()
          toast.success(<Trans>Image pasted successfully</Trans>)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const { i18n } = useLingui()

  return (
    <div className="max-w-5xl px-6 mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            <Trans>Upload Your Image</Trans>
          </h2>
          <p className="text-gray-600">
            <Trans>Drag & drop, upload, or enter URL to get started</Trans>
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              <Trans>Upload Image</Trans>
            </TabsTrigger>
            <TabsTrigger value="url">
              <ImageIcon className="mr-2 h-4 w-4" />
              <Trans>Image URL</Trans>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div
              className="relative aspect-auto bg-white rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors duration-200 flex items-center justify-center group cursor-pointer"
              onPaste={handlePaste}
            >
              <div className="text-center p-6">
                <ImageIcon className="mx-auto h-16 w-16 text-blue-200 group-hover:text-blue-300 transition-colors duration-200" />
                <p className="mt-4 text-lg font-medium text-gray-700">
                  <Trans>Drag and drop your image here</Trans>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  <Trans>Supports JPG, PNG, WebP ...</Trans>
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload image"
              />
            </div>

            <Button
              size="lg"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() =>
                (
                  document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement
                )?.click()
              }
            >
              <Upload className="mr-2 h-5 w-5" />
              <Trans>Click to Choose File</Trans>
            </Button>
          </TabsContent>

          <TabsContent value="url">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder={t(i18n)`Enter image URL...`}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleUrlUpload}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Trans>Loading...</Trans>
                  ) : (
                    <>
                      <Trans>Load Image</Trans>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-gray-500">
                <Trans>
                  For security reasons, the image request comes directly from
                  your browser, which may cause{' '}
                  <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    CORS
                  </Link>{' '}
                  issues. To avoid this, please download the image and access it
                  locally.
                </Trans>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
