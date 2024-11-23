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
      font
    }

    if (!image) {
      const result = createBlankCanvasWithWatermark(watermarkOptions)
      setProcessedImage(result)
    } else {
      processWatermark({
        ...watermarkOptions,
        imageUrl: image,
        onProcessed: setProcessedImage
      })
    }
  }, [image, watermark, position, color, fontSize, opacity, rotation, watermarkGridX, watermarkGridY, font])

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
            />
            <ImagePreview processedImage={processedImage} />
          </div>
  
          <AccordionInfo />
        </div>
      </main>
  
      <PageFooter />
    </div>
  )  
})
