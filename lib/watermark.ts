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
  if (!ctx) throw new Error('Failed to get canvas context');

  canvas.width = size.width;
  canvas.height = size.height;
  return [canvas, ctx];
}

// 设置水印样式
function setWatermarkStyle(ctx: CanvasRenderingContext2D, options: WatermarkOptions) {
  ctx.fillStyle = options.color;
  ctx.font = `${options.fontSize}px ${options.font}`;
  ctx.globalAlpha = options.opacity / 100;
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

// 添加单个水印
function drawSingleWatermark(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  rotation: number,
  metrics: { width: number; height: number }
) {
  ctx.save();
  ctx.translate(x + metrics.width / 2, y + metrics.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.fillText(text, -metrics.width / 2, metrics.height / 2);
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
  metrics: { width: number; height: number }
) {
  // const gridX = Math.max(1, Math.floor(area.width / (metrics.width * 1.5)));
  // const gridY = Math.max(1, Math.floor(area.height / (metrics.height * 1.5)));
  const gridX = options.watermarkGridX;
  const gridY = options.watermarkGridY;

  const spacingX = area.width / gridX;
  const spacingY = area.height / gridY;

  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      const x = area.x + (i + 0.5) * spacingX - metrics.width / 2;
      const y = area.y + (j + 0.5) * spacingY - metrics.height / 2;
      drawSingleWatermark(ctx, options.watermark, x, y, options.rotation, metrics);
    }
  }
}

// 绘制平铺水印
function drawTiledWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number }
) {
  const spacingX = canvasSize.width / options.watermarkGridX;
  const spacingY = canvasSize.height / options.watermarkGridY;

  for (let i = 0; i < options.watermarkGridX; i++) {
    for (let j = 0; j < options.watermarkGridY; j++) {
      const x = (i + 0.5) * spacingX - metrics.width / 2;
      const y = (j + 0.5) * spacingY + metrics.height / 2;
      drawSingleWatermark(ctx, options.watermark, x, y, options.rotation, metrics);
    }
  }
}

// 绘制位置水印
function drawPositionedWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number }
) {
  const padding = 5;
  const basePos = calculateBasePosition(options.position, canvasSize, metrics, padding);
  const offsetX = options.position.includes('Right')
    ? -metrics.width
    : options.position.toLowerCase().includes('center')
    ? -metrics.width / 2
    : 0;

  for (let i = 0; i < options.watermarkGridX; i++) {
    const x =
      basePos.x +
      offsetX +
      (i - Math.floor(options.watermarkGridY / 2)) * (metrics.width + padding);
    drawSingleWatermark(ctx, options.watermark, x, basePos.y, options.rotation, metrics);
  }
}

// 绘制水印主函数
function drawWatermarks(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize,
  metrics: { width: number; height: number }
) {
  // 根据position确定tileMode
  const tileMode = options.position === 'tile' ? 'full' : 'area';

  if (tileMode === 'full') {
    // 全图平铺
    drawTiledWatermarks(ctx, options, canvasSize, metrics);
  } else {
    // 区域平铺
    const area = calculateWatermarkArea(options.position, canvasSize);
    drawTiledWatermarksInArea(ctx, options, area, metrics);
  }
}

// 处理空白画布
export function createBlankCanvasWithWatermark(options: WatermarkOptions): string {
  const [canvas, ctx] = createCanvas({ width: 1920, height: 1080 });
  
  // 填充白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return drawWatermarkOnCanvas(ctx, options, { width: canvas.width, height: canvas.height });
}

// 在画布上绘制水印的通用函数
function drawWatermarkOnCanvas(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasSize: CanvasSize
): string {
  setWatermarkStyle(ctx, options);
  const metrics = getTextMetrics(ctx, options.watermark);

  drawWatermarks(ctx, options, canvasSize, metrics);

  return ctx.canvas.toDataURL();
}

// 处理带图片的画布
export async function processWatermark(
  options: WatermarkOptions & { imageUrl: string; onProcessed: (processedImage: string) => void }
) {
  if (!options.imageUrl) return;

  const img = new Image();
  img.src = options.imageUrl;
  
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const [canvas, ctx] = createCanvas({ width: img.width, height: img.height });
  ctx.drawImage(img, 0, 0);
  
  const result = drawWatermarkOnCanvas(ctx, options, { width: canvas.width, height: canvas.height });
  options.onProcessed(result);
}