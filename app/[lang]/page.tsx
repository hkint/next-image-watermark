'use client'

import { useState, useEffect, useRef } from 'react'
import { ImageUploader } from '@/components/ImageUploader'
import { WatermarkControls } from '@/components/WatermarkControls'
import { ImagePreview } from '@/components/ImagePreview'
import { PageHeader } from '@/components/PageHeader'
import { PageFooter } from '@/components/PageFooter'
import { HeroContent } from '@/components/HeroContent'
import { AccordionInfo } from '@/components/AccordionInfo'
import { WatermarkPosition } from '@/types/watermark'
import {
  processWatermark,
  createBlankCanvasWithWatermark
} from '@/lib/watermark'

import { withLinguiPage } from '@/components/i18n/Lingui'

export default withLinguiPage(function Home() {
  const [image, setImage] = useState<string>('')
  const [processedImage, setProcessedImage] = useState<string>('')
  const [watermark, setWatermark] = useState<string>('👋 Hello Watermark')
  const [position, setPosition] = useState<WatermarkPosition>('tile')
  const [color, setColor] = useState<string>('#334155')
  const [fontSize, setFontSize] = useState<number[]>([32])
  const [opacity, setOpacity] = useState<number[]>([40])
  const [rotation, setRotation] = useState<number[]>([330])
  const [watermarkGridX, setWatermarkGridX] = useState<number>(6)
  const [watermarkGridY, setWatermarkGridY] = useState<number>(6)
  const [font, setFont] = useState<string>('Arial')
  const [outputFormat, setOutputFormat] = useState<'png' | 'jpeg'>('png')
  const [jpegQuality, setJpegQuality] = useState<number[]>([92]) // Slider expects an array
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text')
  const [watermarkImage, setWatermarkImage] = useState<string>('')
  const [watermarkImageOpacity, setWatermarkImageOpacity] = useState<number[]>([40])
  const [watermarkImageScale, setWatermarkImageScale] = useState<number[]>([10])


  const watermarkControlsRef = useRef<HTMLDivElement>(null)

  const handleImageUploaded = () => {
    setTimeout(() => {
      watermarkControlsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  useEffect(() => {
    const watermarkOptions = {
      watermark,
      position,
      color,
      fontSize: fontSize[0],
      opacity: opacity[0],
      rotation: rotation[0],
      watermarkGridX,
      watermarkGridY,
      font,
      outputFormat,
      quality: jpegQuality[0],
      watermarkType,
      watermarkImage,
      watermarkImageOpacity: watermarkImageOpacity[0],
      watermarkImageScale: watermarkImageScale[0],
      onComplete: (result) => {
        if (result.success && result.dataUrl) {
          setProcessedImage(result.dataUrl);
        } else {
          let errorToDisplay: string;
          if (result.errorKey) {
            switch (result.errorKey) {
              case 'canvasContextError':
                errorToDisplay = t(i18n)._('canvasContextError');
                break;
              case 'mainImageLoadError':
                errorToDisplay = t(i18n)._('mainImageLoadError');
                break;
              case 'logoImageLoadError':
                errorToDisplay = t(i18n)._('logoImageLoadError');
                break;
              case 'canvasDrawingError':
                errorToDisplay = t(i18n)._('canvasDrawingError');
                break;
              case 'imageExportError':
                errorToDisplay = t(i18n)._('imageExportError');
                break;
              default:
                errorToDisplay = result.errorMessage || result.errorKey || t(i18n)._('defaultImageProcessingError');
            }
          } else {
            errorToDisplay = result.errorMessage || t(i18n)._('defaultImageProcessingError');
          }
          toast.error(errorToDisplay);

          if (result.dataUrl) { // E.g. logo failed but main image processed
            setProcessedImage(result.dataUrl);
          }
          // Consider if setProcessedImage('') is needed on total failure
        }
      }
    }

    if (!image) {
      // createBlankCanvasWithWatermark now also uses onComplete
      createBlankCanvasWithWatermark(watermarkOptions)
      // setProcessedImage is called within onComplete if successful
    } else {
      processWatermark({
        ...watermarkOptions,
        imageUrl: image,
        // onComplete is already part of watermarkOptions
      })
    }
  }, [
    image,
    watermark,
    position,
    color,
    fontSize,
    opacity,
    rotation,
    watermarkGridX,
    watermarkGridY,
    font,
    outputFormat,
    jpegQuality,
    watermarkType,
    watermarkImage,
    watermarkImageOpacity,
    watermarkImageScale,
    i18n, // i18n is used in onComplete
    t // t is used in onComplete
  ])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 to-white">
      <PageHeader />
  
      <main className="flex-grow px-8 py-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <ImageUploader onImageChange={setImage} onImageUploaded={handleImageUploaded} />
          <HeroContent />
  
          <div ref={watermarkControlsRef} className="space-y-6 p-8">
            <WatermarkControls
              watermark={watermark}
              position={position}
              color={color}
              fontSize={fontSize}
              opacity={opacity}
              rotation={rotation}
              watermarkGridX={watermarkGridX}
              watermarkGridY={watermarkGridY}
              font={font}
              onWatermarkChange={(e) => setWatermark(e.target.value)}
              onPositionChange={setPosition}
              onColorChange={setColor}
              onFontSizeChange={setFontSize}
              onOpacityChange={setOpacity}
              onRotationChange={setRotation}
              onWatermarkGridXChange={setWatermarkGridX}
              onWatermarkGridYChange={setWatermarkGridY}
              onFontChange={setFont}
              // Image watermark props
              watermarkType={watermarkType}
              setWatermarkType={setWatermarkType}
              watermarkImage={watermarkImage}
              setWatermarkImage={setWatermarkImage}
              watermarkImageOpacity={watermarkImageOpacity}
              setWatermarkImageOpacity={setWatermarkImageOpacity}
              watermarkImageScale={watermarkImageScale}
              setWatermarkImageScale={setWatermarkImageScale}
            />
            <ImagePreview
              processedImage={processedImage}
              outputFormat={outputFormat}
              setOutputFormat={setOutputFormat}
              jpegQuality={jpegQuality}
              setJpegQuality={setJpegQuality}
            />
          </div>
  
          <AccordionInfo />
        </div>
      </main>
  
      <PageFooter />
    </div>
  )  
})
