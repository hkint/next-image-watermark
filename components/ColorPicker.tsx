'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHexValue(value);
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHexValue(e.target.value);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          ref={colorInputRef}
        />
        <div
          className="h-12 w-full rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer shadow-sm"
          style={{ backgroundColor: value }}
          onClick={handleColorClick}
        />
      </div>
      <Input
        value={hexValue}
        onChange={handleHexChange}
        placeholder="#000000"
        className="h-12 font-mono text-lg border-gray-200 focus:border-blue-300 transition-colors duration-200"
        maxLength={7}
      />
    </div>
  );
}
