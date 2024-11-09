'use client';

import { useState, useEffect, useRef } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { WatermarkControls } from '@/components/WatermarkControls';
import { ImagePreview } from '@/components/ImagePreview';
import { PageHeader } from '@/components/PageHeader';
import { PageFooter } from '@/components/PageFooter';
import { HeroContent } from '@/components/HeroContent';
import { FooterContent } from '@/components/FooterContent';
import { WatermarkPosition } from '@/types/watermark';
import { processWatermark } from '@/lib/watermark';

export default function Home() {
  const [image, setImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [watermark, setWatermark] = useState<string>('👋 Hello');
  const [position, setPosition] = useState<WatermarkPosition>('tile');
  const [color, setColor] = useState<string>('#334155');
  const [fontSize, setFontSize] = useState<number[]>([32]);
  const [opacity, setOpacity] = useState<number[]>([45]);
  const [rotation, setRotation] = useState<number[]>([360]);
  const [watermarkGrid, setWatermarkGrid] = useState<number[]>([6]);
  const [font, setFont] = useState<string>('Inter');

  const watermarkControlsRef = useRef<HTMLDivElement>(null);

  const handleImageUploaded = () => {
    setTimeout(() => {
      watermarkControlsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!image) {
      canvas.width = 1920;
      canvas.height = 1080;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize[0]}px ${font}`;
      ctx.globalAlpha = opacity[0] / 100;

      const addWatermark = (x: number, y: number, rotation: number) => {
        ctx.save();
        // ctx.translate(x, y);
        // ctx.rotate((rotation * Math.PI) / 180);
        // ctx.fillText(watermark, 0, 0);

        // 获取文本的宽度和高度
        const textWidth = ctx.measureText(watermark).width;
        const textHeight = parseInt(ctx.font, 10); // TODO 假设字体的高度等于字体大小，后续优化

        // 将原点移动到文字中心
        ctx.translate(x + textWidth / 2, y + textHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        
        // 绘制文字，位置为 (-textWidth/2, -textHeight/2) 以中心为基准
        ctx.fillText(watermark, -textWidth / 2, textHeight / 2);

        ctx.restore();
      };

      const metrics = ctx.measureText(watermark);
      const textHeight = fontSize[0];
      const gridSize = watermarkGrid[0];
      const padding = 20;

      if (position === 'tile') {
        const spacingX = canvas.width / gridSize;
        const spacingY = canvas.height / gridSize;

        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const x = (i + 0.5) * spacingX - metrics.width / 2;
            const y = (j + 0.5) * spacingY + textHeight / 2;
            addWatermark(x, y, rotation[0]);
          }
        }
      } else {
        const basePositions = {
          center: { x: canvas.width / 2, y: canvas.height / 2 },
          topCenter: { x: canvas.width / 2, y: padding + textHeight },
          bottomCenter: { x: canvas.width / 2, y: canvas.height - padding },
          topLeft: { x: padding, y: padding + textHeight },
          topRight: { x: canvas.width - padding, y: padding + textHeight },
          bottomLeft: { x: padding, y: canvas.height - padding },
          bottomRight: {
            x: canvas.width - padding,
            y: canvas.height - padding,
          },
        };

        const basePos = basePositions[position];
        const offsetX = position.includes('Right')
          ? -metrics.width
          : position.toLowerCase().includes('center')
          ? -metrics.width / 2
          : 0;

        for (let i = 0; i < gridSize; i++) {
          const x =
            basePos.x +
            offsetX +
            (i - Math.floor(gridSize / 2)) * (metrics.width + padding);
          addWatermark(x, basePos.y, rotation[0]);
        }
      }

      setProcessedImage(canvas.toDataURL());
    } else {
      processWatermark({
        imageUrl: image,
        watermark,
        position,
        color,
        fontSize: fontSize[0],
        opacity: opacity[0],
        rotation: rotation[0],
        watermarkGrid: watermarkGrid[0],
        font,
        onProcessed: setProcessedImage,
      });
    }
  }, [
    image,
    watermark,
    position,
    color,
    fontSize,
    opacity,
    rotation,
    watermarkGrid,
    font,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/50 to-white">
      <PageHeader />

      <main className="flex-grow px-6 py-4 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <ImageUploader
            image={image}
            onImageChange={setImage}
            onClear={() => {
              setImage('');
            }}
            onImageUploaded={handleImageUploaded}
          />
          <HeroContent />

          <div ref={watermarkControlsRef} className="space-y-4 p-6">
            <WatermarkControls
              watermark={watermark}
              position={position}
              color={color}
              fontSize={fontSize}
              opacity={opacity}
              rotation={rotation}
              watermarkGrid={watermarkGrid}
              font={font}
              onWatermarkChange={(e) => setWatermark(e.target.value)}
              onPositionChange={setPosition}
              onColorChange={setColor}
              onFontSizeChange={setFontSize}
              onOpacityChange={setOpacity}
              onRotationChange={setRotation}
              onWatermarkGridChange={setWatermarkGrid}
              onFontChange={setFont}
            />
            <ImagePreview processedImage={processedImage} />
          </div>

          <FooterContent />
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
