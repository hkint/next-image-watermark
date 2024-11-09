'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorPicker } from './ColorPicker';
import { WatermarkPosition } from '@/types/watermark';
import WatermarkText from './WatermarkText';
// import { Info } from 'lucide-react';

interface WatermarkControlsProps {
  watermark: string;
  position: WatermarkPosition;
  color: string;
  fontSize: number[];
  opacity: number[];
  rotation: number[];
  watermarkGrid: number[];
  font: string;
  onWatermarkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPositionChange: (value: WatermarkPosition) => void;
  onColorChange: (color: string) => void;
  onFontSizeChange: (value: number[]) => void;
  onOpacityChange: (value: number[]) => void;
  onRotationChange: (value: number[]) => void;
  onWatermarkGridChange: (value: number[]) => void;
  onFontChange: (value: string) => void;
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter', description: 'Modern sans-serif font' },
  { value: 'Arial', label: 'Arial', description: 'Classic sans-serif font' },
  { value: 'Georgia', label: 'Georgia', description: 'Elegant serif font' },
  {
    value: 'Times New Roman',
    label: 'Times New Roman',
    description: 'Traditional serif font',
  },
  { value: 'Verdana', label: 'Verdana', description: 'Highly readable font' },
  {
    value: 'Helvetica',
    label: 'Helvetica',
    description: 'Professional design font',
  },
  {
    value: 'Courier New',
    label: 'Courier New',
    description: 'Monospace coding font',
  },
  {
    value: 'Trebuchet MS',
    label: 'Trebuchet MS',
    description: 'Web-friendly font',
  },
];

const POSITION_OPTIONS = [
  {
    value: 'tile',
    label: 'Tile Pattern',
    description: 'Evenly distribute watermarks across the image',
  },
  {
    value: 'center',
    label: 'Center',
    description: 'Place watermark in the middle of the image',
  },
  {
    value: 'topCenter',
    label: 'Top Center',
    description: 'Align watermark to the top center',
  },
  {
    value: 'bottomCenter',
    label: 'Bottom Center',
    description: 'Align watermark to the bottom center',
  },
  {
    value: 'topLeft',
    label: 'Top Left',
    description: 'Place watermark in the top left corner',
  },
  {
    value: 'topRight',
    label: 'Top Right',
    description: 'Place watermark in the top right corner',
  },
  {
    value: 'bottomLeft',
    label: 'Bottom Left',
    description: 'Place watermark in the bottom left corner',
  },
  {
    value: 'bottomRight',
    label: 'Bottom Right',
    description: 'Place watermark in the bottom right corner',
  },
];


export function WatermarkControls({
  watermark,
  position,
  color,
  fontSize,
  opacity,
  rotation,
  watermarkGrid,
  font,
  onWatermarkChange,
  onPositionChange,
  onColorChange,
  onFontSizeChange,
  onOpacityChange,
  onRotationChange,
  onWatermarkGridChange,
  onFontChange,
}: WatermarkControlsProps) {
  return (
    <Card className="max-w-5xl mx-auto rounded-2xl shadow">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-bold text-gray-900">
          Watermark Settings
        </CardTitle>
        <CardDescription className="text-gray-600 text-lg">
          Customize your watermark appearance and protect your images
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Watermark Text */}
          <WatermarkText
            watermark={watermark}
            onWatermarkChange={onWatermarkChange}
          />

          {/* Color Picker */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Watermark Color
            </Label>
            <ColorPicker
              value={color}
              onChange={onColorChange}
              aria-label="Watermark color picker"
            />
          </div>

          {/* Font Selection */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Font Family</Label>
            <Select value={font} onValueChange={onFontChange}>
              <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors duration-200">
                <SelectValue>
                  {font
                    ? FONT_OPTIONS.find((option) => option.value === font)
                      ?.label
                    : 'Choose a font style'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    style={{ fontFamily: option.value }}
                    className="text-base py-3"
                  >
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Position Selection */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Position</Label>
            <Select value={position} onValueChange={onPositionChange}>
              <SelectTrigger className="h-12 border-gray-200 hover:border-gray-300 transition-colors duration-200">
                <SelectValue>
                  {position
                    ? POSITION_OPTIONS.find(
                      (option) => option.value === position
                    )?.label
                    : 'Choose a watermark position'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {POSITION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-base py-3"
                  >
                    <div className="px-0">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid Size / Number of Watermarks */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Grid Size: {watermarkGrid} × {watermarkGrid}
            </Label>
            <Slider
              value={watermarkGrid}
              onValueChange={onWatermarkGridChange}
              min={1}
              max={12}
              step={1}
              className="py-4"
              aria-label={
                position === 'tile'
                  ? 'Grid size adjustment'
                  : 'Number of watermarks adjustment'
              }
            />
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Font Size: {fontSize}px
            </Label>
            <Slider
              value={fontSize}
              onValueChange={onFontSizeChange}
              min={20}
              max={120}
              step={1}
              className="py-4"
              aria-label="Font size adjustment"
            />
          </div>

          {/* Opacity */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Opacity: {opacity}%
            </Label>
            <Slider
              value={opacity}
              onValueChange={onOpacityChange}
              min={1}
              max={100}
              step={1}
              className="py-4"
              aria-label="Opacity adjustment"
            />
          </div>

          {/* Rotation */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">
              Rotation: {rotation}°
            </Label>
            <Slider
              value={rotation}
              onValueChange={onRotationChange}
              min={0}
              max={360}
              step={1}
              className="py-4"
              aria-label="Rotation adjustment"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
