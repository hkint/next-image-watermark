interface WatermarkOptions {
  watermark: string;
  position: string;
  color: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  watermarkGridX: number;
  watermarkGridY: number;
  font: string;
  outputFormat: 'png' | 'jpeg';
  quality: number; // For JPEG quality 0-100
  watermarkType: 'text' | 'image';
  watermarkImage?: string; // Data URL of the logo
  watermarkImageOpacity?: number; // 0-100
  watermarkImageScale?: number; // 1-100 (percentage of main image dimension)
  // Callbacks
  onComplete: (result: { success: boolean; dataUrl?: string; errorKey?: string; errorMessage?: string }) => void;
}

// Custom Error for canvas operations
class CanvasError extends Error {
  constructor(message: string, public i18nKey?: string) {
    super(message);
    this.name = 'CanvasError';
  }
}

interface CanvasSize {
  width: number;
  height: number;
}

interface WatermarkArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 创建和初始化 canvas
function createCanvas(size: CanvasSize): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new CanvasError('Failed to get canvas context', 'canvasContextError');

  canvas.width = size.width;
  canvas.height = size.height;
  return [canvas, ctx];
}

// 设置文本水印样式
function setTextWatermarkStyle(ctx: CanvasRenderingContext2D, options: WatermarkOptions) {
  ctx.fillStyle = options.color;
  ctx.font = `${options.fontSize}px ${options.font}`;
  ctx.globalAlpha = options.opacity / 100;
}

// 设置图片水印样式
function setImageWatermarkStyle(ctx: CanvasRenderingContext2D, options: WatermarkOptions) {
  ctx.globalAlpha = (options.watermarkImageOpacity ?? 40) / 100;
}

// 获取文本度量
function getTextMetrics(ctx: CanvasRenderingContext2D, text: string) {
  const metrics = ctx.measureText(text);
  const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  return {
    width: metrics.width,
    height: fontHeight || parseInt(ctx.font, 10)
  };
}

// 获取图片度量（考虑缩放）
function getImageMetrics(
  logoImg: HTMLImageElement,
  canvasSize: CanvasSize,
  options: WatermarkOptions
): { width: number; height: number } {
  const scale = (options.watermarkImageScale ?? 10) / 100;
  // Scale based on the smaller dimension of the canvas to ensure logo fits
  const baseDimension = Math.min(canvasSize.width, canvasSize.height);
  const targetLogoHeight = baseDimension * scale;
  const aspectRatio = logoImg.width / logoImg.height;

  let scaledWidth = targetLogoHeight * aspectRatio;
  let scaledHeight = targetLogoHeight;

  if (scaledWidth > canvasSize.width * 0.8) { // Cap width to 80% of canvas
    scaledWidth = canvasSize.width * 0.8;
    scaledHeight = scaledWidth / aspectRatio;
  }
  if (scaledHeight > canvasSize.height * 0.8) { // Cap height to 80% of canvas
    scaledHeight = canvasSize.height * 0.8;
    scaledWidth = scaledHeight * aspectRatio;
  }

  return { width: scaledWidth, height: scaledHeight };
}


// 添加单个水印
function drawSingleWatermark(
  ctx: CanvasRenderingContext2D,
  element: string | HTMLImageElement,
  x: number,
  y: number,
  rotation: number,
  metrics: { width: number; height: number },
  options: WatermarkOptions // Added options for type checking
) {
  ctx.save();
  ctx.translate(x + metrics.width / 2, y + metrics.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);

  if (options.watermarkType === 'image' && element instanceof HTMLImageElement) {
    ctx.drawImage(element, -metrics.width / 2, -metrics.height / 2, metrics.width, metrics.height);
  } else if (options.watermarkType === 'text' && typeof element === 'string') {
    // Ensure text is centered properly after rotation
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(element, 0, 0);
  }
  ctx.restore();
}

// 计算基础位置
function calculateBasePosition(
  position: string,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number },
  padding: number
) {
  const basePositions = {
    center: { x: canvasSize.width / 2, y: canvasSize.height / 2 },
    topCenter: { x: canvasSize.width / 2, y: padding + metrics.height },
    bottomCenter: { x: canvasSize.width / 2, y: canvasSize.height - padding },
    topLeft: { x: padding, y: padding + metrics.height },
    topRight: { x: canvasSize.width - padding, y: padding + metrics.height },
    bottomLeft: { x: padding, y: canvasSize.height - padding },
    bottomRight: { x: canvasSize.width - padding, y: canvasSize.height - padding }
  };

  return basePositions[position as keyof typeof basePositions];
}

// 计算水印区域
function calculateWatermarkArea(
  position: string,
  canvasSize: CanvasSize,
  areaRatio: number = 0.15 // 区域占整体的比例
): WatermarkArea {
  const areaWidth = canvasSize.width * areaRatio;
  const areaHeight = canvasSize.height * areaRatio;
  const padding = Math.min(canvasSize.width, canvasSize.height) * 0.005; // 动态padding

  const areas: Record<string, WatermarkArea> = {
    center: {
      x: (canvasSize.width - areaWidth) / 2,
      y: (canvasSize.height - areaHeight) / 2,
      width: areaWidth,
      height: areaHeight
    },
    topCenter: {
      x: (canvasSize.width - areaWidth) / 2,
      y: padding,
      width: areaWidth,
      height: areaHeight
    },
    bottomCenter: {
      x: (canvasSize.width - areaWidth) / 2,
      y: canvasSize.height - areaHeight - padding,
      width: areaWidth,
      height: areaHeight
    },
    topLeft: {
      x: padding,
      y: padding,
      width: areaWidth,
      height: areaHeight
    },
    topRight: {
      x: canvasSize.width - areaWidth - padding,
      y: padding,
      width: areaWidth,
      height: areaHeight
    },
    bottomLeft: {
      x: padding,
      y: canvasSize.height - areaHeight - padding,
      width: areaWidth,
      height: areaHeight
    },
    bottomRight: {
      x: canvasSize.width - areaWidth - padding,
      y: canvasSize.height - areaHeight - padding,
      width: areaWidth,
      height: areaHeight
    }
  };

  return areas[position] || areas.center;
}

// 在指定区域内平铺水印
function drawTiledWatermarksInArea(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  area: WatermarkArea,
  metrics: { width: number; height: number },
  element: string | HTMLImageElement
) {
  const gridX = options.watermarkGridX;
  const gridY = options.watermarkGridY;

  const spacingX = area.width / gridX;
  const spacingY = area.height / gridY;

  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      const x = area.x + (i + 0.5) * spacingX - metrics.width / 2;
      const y = area.y + (j + 0.5) * spacingY - metrics.height / 2;
      drawSingleWatermark(ctx, element, x, y, options.rotation, metrics, options);
    }
  }
}

// 绘制平铺水印
function drawTiledWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number },
  element: string | HTMLImageElement
) {
  const spacingX = canvasSize.width / options.watermarkGridX;
  const spacingY = canvasSize.height / options.watermarkGridY;

  for (let i = 0; i < options.watermarkGridX; i++) {
    for (let j = 0; j < options.watermarkGridY; j++) {
      const x = (i + 0.5) * spacingX - metrics.width / 2;
      const y = (j + 0.5) * spacingY + metrics.height / 2; // Adjusted for proper text baseline
      drawSingleWatermark(ctx, element, x, y, options.rotation, metrics, options);
    }
  }
}

// 绘制位置水印 (This function might need more complex logic for image elements if gridX > 1)
// For simplicity, assuming gridX=1 for positioned image watermarks if tiled mode is not 'full'
function drawPositionedWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number },
  element: string | HTMLImageElement
) {
  const padding = 5;
  const basePos = calculateBasePosition(options.position, canvasSize, metrics, padding);

  let x = basePos.x;
  if (options.position.includes('Right')) {
    x -= metrics.width;
  } else if (options.position.toLowerCase().includes('center')) {
    x -= metrics.width / 2;
  }

  // For text, y is baseline. For image, y is top. Adjust for consistency.
  // The current drawSingleWatermark centers the element at (x + metrics.width/2, y + metrics.height/2)
  // So, basePos.y should be the top-left y for the bounding box of the watermark.
  // For text, metrics.height is approx font height. drawSingleWatermark uses fillText(text, 0,0) with textBaseline middle.
  // Let's adjust basePos.y to be the top of the text/image for positioning.
  // drawSingleWatermark will handle centering it based on metrics.

  // If it's a text watermark, adjust y for text baseline
  // let adjustedY = basePos.y;
  // if (options.watermarkType === 'text') {
  //    adjustedY -= metrics.height /2; // This might need refinement based on textBaseline
  // }

  drawSingleWatermark(ctx, element, x, basePos.y - metrics.height, options.rotation, metrics, options);
}


// 绘制水印主函数
function drawWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number },
  element: string | HTMLImageElement
) {
  const tileMode = options.position === 'tile' ? 'full' : 'area';

  if (tileMode === 'full') {
    drawTiledWatermarks(ctx, options, canvasSize, metrics, element);
  } else {
    const area = calculateWatermarkArea(options.position, canvasSize);
    // If it's an image and not full tile, usually one instance in the area is enough
    if (options.watermarkType === 'image') {
        const x = area.x + (area.width - metrics.width) / 2;
        const y = area.y + (area.height - metrics.height) / 2;
        drawSingleWatermark(ctx, element, x, y, options.rotation, metrics, options);
    } else { // For text, allow tiling within the specified area
        drawTiledWatermarksInArea(ctx, options, area, metrics, element);
    }
  }
}

// 处理空白画布
export function createBlankCanvasWithWatermark(options: WatermarkOptions) {
  try {
    const [canvas, ctx] = createCanvas({ width: 1920, height: 1080 });
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (options.watermarkType === 'text' && options.watermark) {
      setTextWatermarkStyle(ctx, options);
      const metrics = getTextMetrics(ctx, options.watermark);
      drawWatermarks(ctx, options, { width: canvas.width, height: canvas.height }, metrics, options.watermark);
    }
    // Image watermarks are not drawn on blank canvas due to async nature

    let dataUrl: string;
    if (options.outputFormat === 'jpeg') {
      dataUrl = canvas.toDataURL('image/jpeg', options.quality / 100);
    } else {
      dataUrl = canvas.toDataURL('image/png');
    }
    options.onComplete({ success: true, dataUrl });

  } catch (error) {
    console.error('Error creating blank canvas with watermark:', error);
    if (error instanceof CanvasError) {
      options.onComplete({ success: false, errorKey: error.i18nKey || 'canvasDrawingError', errorMessage: error.message });
    } else if (error instanceof Error) {
      options.onComplete({ success: false, errorKey: 'canvasDrawingError', errorMessage: error.message });
    } else {
      options.onComplete({ success: false, errorKey: 'canvasDrawingError', errorMessage: 'Unknown error in createBlankCanvasWithWatermark' });
    }
  }
}


// Main processing function
export async function processWatermark(
  options: WatermarkOptions & { imageUrl: string }
) {
  if (!options.imageUrl) {
    options.onComplete({ success: false, errorKey: 'mainImageLoadError', errorMessage: 'Image URL is missing.' });
    return;
  }

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let canvasSize: CanvasSize;

  try {
    const mainImage = new Image();
    mainImage.src = options.imageUrl;
    mainImage.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      mainImage.onload = resolve;
      mainImage.onerror = (e) => reject(new Error(`Failed to load main image: ${e.toString()}`));
    });

    [canvas, ctx] = createCanvas({ width: mainImage.width, height: mainImage.height });
    ctx.drawImage(mainImage, 0, 0);
    canvasSize = { width: canvas.width, height: canvas.height };

  } catch (error) {
    console.error("Error loading or drawing main image:", error);
    const errorKey = error instanceof CanvasError ? error.i18nKey : 'mainImageLoadError';
    const errorMessage = error instanceof Error ? error.message : 'Unknown error loading main image';
    options.onComplete({ success: false, errorKey, errorMessage });
    return;
  }

  try {
    if (options.watermarkType === 'image' && options.watermarkImage) {
      const logoImg = new Image();
      logoImg.src = options.watermarkImage;
      logoImg.crossOrigin = 'anonymous';

      await new Promise<void>(async (resolveLogo, rejectLogo) => {
        logoImg.onload = () => {
          try {
            const originalAlpha = ctx.globalAlpha;
            setImageWatermarkStyle(ctx, options);
            const imageMetrics = getImageMetrics(logoImg, canvasSize, options);
            drawWatermarks(ctx, options, canvasSize, imageMetrics, logoImg);
            ctx.globalAlpha = originalAlpha;
            resolveLogo();
          } catch (drawError) {
            rejectLogo(drawError);
          }
        };
        logoImg.onerror = (e) => rejectLogo(new Error(`Failed to load logo image: ${e.toString()}`));
      });
    } else if (options.watermarkType === 'text' && options.watermark) {
      setTextWatermarkStyle(ctx, options);
      const textMetrics = getTextMetrics(ctx, options.watermark);
      drawWatermarks(ctx, options, canvasSize, textMetrics, options.watermark);
    }
    // If no specific watermark type or data, the image is already on canvas.

    // Final export
    const resultUrl = canvas.toDataURL(
      options.outputFormat === 'jpeg' ? 'image/jpeg' : 'image/png',
      options.quality / 100
    );
    if (!resultUrl || resultUrl === 'data:,') { // Basic check for empty data URL
        throw new CanvasError('Failed to export image from canvas', 'imageExportError');
    }
    options.onComplete({ success: true, dataUrl: resultUrl });

  } catch (error) {
    console.error('Error applying watermark or exporting:', error);
    let errorKey = 'canvasDrawingError';
    if (error instanceof CanvasError && error.i18nKey) {
        errorKey = error.i18nKey;
    } else if (error instanceof Error && error.message.includes("logo")) { // crude check
        errorKey = 'logoImageLoadError';
    }

    // Attempt to return the canvas state before this error, if possible (e.g., main image drawn)
    // This is tricky because the error might have left the canvas in a bad state.
    // For logo errors, it's safer to try to export the canvas with just the main image.
    try {
        const fallbackUrl = canvas.toDataURL( // Try to get whatever is on canvas
            options.outputFormat === 'jpeg' ? 'image/jpeg' : 'image/png',
            options.quality / 100
        );
        options.onComplete({
            success: false, // Still report as error overall
            dataUrl: (fallbackUrl && fallbackUrl !== 'data:,') ? fallbackUrl : undefined, // Provide if valid
            errorKey,
            errorMessage: error instanceof Error ? error.message : 'Unknown processing error'
        });
    } catch (finalError) { // If even fallback export fails
        options.onComplete({
            success: false,
            errorKey,
            errorMessage: error instanceof Error ? error.message : 'Unknown processing error after fallback attempt'
        });
    }
  }
}