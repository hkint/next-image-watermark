'use client'

import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ColorPicker } from './ColorPicker'
import { WatermarkPosition } from '@/types/watermark'
import WatermarkText from './WatermarkText'
import { NumberInput } from './NumberInput'
import { Button } from '@/components/ui/button'
import { Link, Unlink } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Trans } from '@lingui/macro'

interface FontOption {
  value: string
  label: string
  description?: string
}

const DEFAULT_FONTS: FontOption[] = [
  // 英文字体
  { value: 'Arial', label: 'Arial', description: 'Sans-serif' },
  { value: 'Times New Roman', label: 'Times New Roman', description: 'Serif' },
  { value: 'Helvetica', label: 'Helvetica', description: 'Sans-serif' },
  { value: 'Georgia', label: 'Georgia', description: 'Serif' },
  { value: 'Verdana', label: 'Verdana', description: 'Sans-serif' },
  // 中文字体
  { value: 'Microsoft YaHei', label: '微软雅黑', description: 'Sans-serif' },
  { value: 'SimSun', label: '宋体', description: 'Serif' },
  { value: 'SimHei', label: '黑体', description: 'Sans-serif' },
  { value: 'KaiTi', label: '楷体', description: 'Serif' },
  { value: 'NSimSun', label: '新宋体', description: 'Serif' },
  // macOS 中文字体
  { value: 'PingFang SC', label: '苹方', description: 'Sans-serif' },
  { value: 'STHeiti', label: '华文黑体', description: 'Sans-serif' },
  { value: 'STKaiti', label: '华文楷体', description: 'Serif' },
  { value: 'STSong', label: '华文宋体', description: 'Serif' },
  { value: 'STFangsong', label: '华文仿宋', description: 'Serif' }
]

interface WatermarkControlsProps {
  watermark: string
  position: WatermarkPosition
  color: string
  fontSize: number[]
  opacity: number[]
  rotation: number[]
  watermarkGridX: number
  watermarkGridY: number
  font: string
  onWatermarkChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPositionChange: (value: WatermarkPosition) => void
  onColorChange: (color: string) => void
  onFontSizeChange: (value: number[]) => void
  onOpacityChange: (value: number[]) => void
  onRotationChange: (value: number[]) => void
  onWatermarkGridXChange: (value: number) => void
  onWatermarkGridYChange: (value: number) => void
  onFontChange: (value: string) => void
}

const POSITION_OPTIONS = [
  {
    value: 'tile',
    label: <Trans>Tile Pattern</Trans>,
    description: <Trans>Evenly distribute watermarks across the image</Trans>
  },
  {
    value: 'center',
    label: <Trans>Center</Trans>,
    description: <Trans>Place watermark in the middle of the image</Trans>
  },
  {
    value: 'topCenter',
    label: <Trans>Top Center</Trans>,
    description: <Trans>Align watermark to the top center</Trans>
  },
  {
    value: 'bottomCenter',
    label: <Trans>Bottom Center</Trans>,
    description: <Trans>Align watermark to the bottom center</Trans>
  },
  {
    value: 'topLeft',
    label: <Trans>Top Left</Trans>,
    description: <Trans>Place watermark in the top left corner</Trans>
  },
  {
    value: 'topRight',
    label: <Trans>Top Right</Trans>,
    description: <Trans>Place watermark in the top right corner</Trans>
  },
  {
    value: 'bottomLeft',
    label: <Trans>Bottom Left</Trans>,
    description: <Trans>Place watermark in the bottom left corner</Trans>
  },
  {
    value: 'bottomRight',
    label: <Trans>Bottom Right</Trans>,
    description: <Trans>Place watermark in the bottom right corner</Trans>
  }
]

const FontItem = ({ fontOption }: { fontOption: FontOption }) => (
  <SelectItem
    key={fontOption.value}
    value={fontOption.value}
    className="py-2.5 h-12"
  >
    <span
      style={{ fontFamily: fontOption.value }}
      className="text-base"
    >
      {fontOption.label}
    </span>
    {fontOption.description && (
      <span className="ml-2 text-xs text-muted-foreground">
        {fontOption.description}
      </span>
    )}
  </SelectItem>
)

const WatermarkControls = ({
  watermark,
  position,
  color,
  fontSize,
  opacity,
  rotation,
  watermarkGridX,
  watermarkGridY,
  font,
  onWatermarkChange,
  onPositionChange,
  onColorChange,
  onFontSizeChange,
  onOpacityChange,
  onRotationChange,
  onWatermarkGridXChange,
  onWatermarkGridYChange,
  onFontChange
}: WatermarkControlsProps) => {
  const [availableFonts, setAvailableFonts] =
    useState<FontOption[]>(DEFAULT_FONTS)
  const [isLoadingFonts, setIsLoadingFonts] = useState(false)
  const [isApiSupported, setIsApiSupported] = useState(false)
  const [gridSync, setGridSync] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    setIsApiSupported('queryLocalFonts' in window)
  }, [])

  const loadSystemFonts = async () => {
    try {
      setIsLoadingFonts(true)
      console.log('Loading system fonts...')
      const fonts = await (window as any).queryLocalFonts()
      console.log('Found', fonts.length, 'fonts')

      const uniqueFonts = new Set<string>()
      // 先添加默认字体
      DEFAULT_FONTS.forEach((font) => uniqueFonts.add(font.value))

      const systemFonts: FontOption[] = [
        ...DEFAULT_FONTS,
        ...fonts
          .filter((font: any) => {
            if (!uniqueFonts.has(font.family)) {
              uniqueFonts.add(font.family)
              return true
            }
            return false
          })
          .map((font: any) => ({
            value: font.family,
            label: font.family
          }))
      ].sort((a: FontOption, b: FontOption) => a.label.localeCompare(b.label))

      console.log('Processed unique fonts:', systemFonts.length)
      setAvailableFonts(systemFonts)
      setFontsLoaded(true)
    } catch (error) {
      console.error('Failed to load system fonts:', error)
      // 确保在加载失败时仍然显示默认字体
      setAvailableFonts(DEFAULT_FONTS)
    } finally {
      setIsLoadingFonts(false)
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto rounded-lg border bg-card shadow-sm">
      <CardHeader className="space-y-1.5 p-6 flex flex-col items-center text-center">
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
          <Trans>Watermark Settings</Trans>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <Trans>
            Customize your watermark appearance and protect your images
          </Trans>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Watermark Text */}
          <div className="space-y-3">
            <Label
              htmlFor="watermark"
              className="text-sm font-medium leading-none"
            >
              <Trans>Watermark Text</Trans>
            </Label>
            <WatermarkText
              watermark={watermark}
              onWatermarkChange={onWatermarkChange}
            />
          </div>

          {/* Font Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Font</Trans>
            </Label>
            <Select value={font} onValueChange={onFontChange}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingFonts ? (
                  <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
                    <Trans>Loading system fonts...</Trans>
                  </div>
                ) : !isApiSupported ? (
                  <>
                    <div className="py-2 px-2 text-sm text-muted-foreground">
                      <Trans>System fonts not supported in this browser</Trans>
                    </div>
                    {availableFonts.map((fontOption) => (
                      <FontItem key={fontOption.value} fontOption={fontOption} />
                    ))}
                  </>
                ) : fontsLoaded ? (
                  availableFonts.map((fontOption) => (
                    <FontItem key={fontOption.value} fontOption={fontOption} />
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-center py-2">
                      <Button
                        variant="outline"
                        onClick={loadSystemFonts}
                        className="w-full"
                      >
                        <Trans>Load system fonts</Trans>
                      </Button>
                    </div>
                    {availableFonts.map((fontOption) => (
                      <FontItem key={fontOption.value} fontOption={fontOption} />
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Position Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Watermark Position</Trans>
            </Label>
            <Select value={position} onValueChange={onPositionChange}>
              <SelectTrigger className="w-full h-12">
                <SelectValue>
                  {position ? (
                    POSITION_OPTIONS.find((option) => option.value === position)
                      ?.label
                  ) : (
                    <Trans>Choose a watermark position</Trans>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {POSITION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="py-2.5 h-12"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Watermark Grid (Horizontal × Vertical)</Trans>
            </Label>
            <div className="flex items-center space-x-4 h-12">
              <div className="flex items-center">
                <NumberInput
                  value={watermarkGridX}
                  onChange={(value) => {
                    onWatermarkGridXChange(value)
                    if (gridSync) {
                      onWatermarkGridYChange(value)
                    }
                  }}
                  min={1}
                  max={20}
                />
              </div>
              <span className="flex items-center justify-center text-muted-foreground">
                ×
              </span>
              <div className="flex items-center">
                <NumberInput
                  value={watermarkGridY}
                  onChange={(value) => {
                    onWatermarkGridYChange(value)
                    if (gridSync) {
                      onWatermarkGridXChange(value)
                    }
                  }}
                  min={1}
                  max={20}
                />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setGridSync(!gridSync)}
                      className={`h-9 w-9 ${
                        gridSync ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {gridSync ? (
                        <Link className="h-4 w-4" />
                      ) : (
                        <Unlink className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {gridSync ? (
                        <Trans>Sync adjustment</Trans>
                      ) : (
                        <Trans>Independent adjustment</Trans>
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Watermark Color</Trans>
            </Label>
            <ColorPicker
              value={color}
              onChange={onColorChange}
              aria-label="Watermark color picker"
            />
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Font Size</Trans>
              <span className="ml-1 text-muted-foreground">{fontSize}px</span>
            </Label>
            <Slider
              value={fontSize}
              onValueChange={onFontSizeChange}
              min={20}
              max={200}
              step={1}
              className="py-4 h-12"
              aria-label="Font size adjustment"
            />
          </div>

          {/* Opacity */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Opacity</Trans>
              <span className="ml-1 text-muted-foreground">{opacity}%</span>
            </Label>
            <Slider
              value={opacity}
              onValueChange={onOpacityChange}
              min={1}
              max={100}
              step={1}
              className="py-4 h-12"
              aria-label="Opacity adjustment"
            />
          </div>

          {/* Rotation */}
          <div className="space-y-3">
            <Label className="text-sm font-medium leading-none">
              <Trans>Rotation</Trans>
              <span className="ml-1 text-muted-foreground">{rotation}°</span>
            </Label>
            <Slider
              value={rotation}
              onValueChange={onRotationChange}
              min={0}
              max={360}
              step={1}
              className="py-4 h-12"
              aria-label="Rotation adjustment"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { WatermarkControls }
