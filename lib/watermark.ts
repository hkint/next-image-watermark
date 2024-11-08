interface ProcessWatermarkOptions {
  imageUrl: string;
  watermark: string;
  position: string;
  color: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  watermarkGrid: number;
  font: string;
  onProcessed: (processedImage: string) => void;
}

export async function processWatermark({
  imageUrl,
  watermark,
  position,
  color,
  fontSize,
  opacity,
  rotation,
  watermarkGrid,
  font,
  onProcessed
}: ProcessWatermarkOptions) {
  if (!imageUrl) return;

  const img = new Image();
  img.src = imageUrl;
  
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${font}`;
  ctx.globalAlpha = opacity / 100;

  const addWatermark = (x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(watermark, 0, 0);
    ctx.restore();
  };

  const metrics = ctx.measureText(watermark);
  const textHeight = fontSize;
  const padding = 20;

  if (position === 'tile') {
    const gridSize = watermarkGrid;
    const spacingX = canvas.width / gridSize;
    const spacingY = canvas.height / gridSize;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i + 0.5) * spacingX - metrics.width / 2;
        const y = (j + 0.5) * spacingY + textHeight / 2;
        addWatermark(x, y, rotation);
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
      bottomRight: { x: canvas.width - padding, y: canvas.height - padding }
    };

    const basePos = basePositions[position as keyof typeof basePositions];
    const offsetX = position.includes('Right') ? -metrics.width : position.includes('Center') ? -metrics.width / 2 : 0;

    for (let i = 0; i < watermarkGrid; i++) {
      const x = basePos.x + offsetX + (i - Math.floor(watermarkGrid / 2)) * (metrics.width + padding);
      addWatermark(x, basePos.y, rotation);
    }
  }

  onProcessed(canvas.toDataURL());
}