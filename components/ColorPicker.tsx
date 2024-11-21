import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Palette } from 'lucide-react';

// Predefined watermark colors with preview and descriptions
const COLOR_PRESETS = [
  { value: '#A9A9A9', label: 'Light Gray', description: 'Soft gray for unobtrusive text' },
  { value: '#7D7D7D', label: 'Medium Gray', description: 'Neutral gray for balanced appearance' },
  { value: '#4B4B4B', label: 'Deep Gray', description: 'Dark gray for subtle visibility' },
  { value: '#1E90FF', label: 'Dodger Blue', description: 'Bright blue for clear visibility' },
  { value: '#FF6347', label: 'Tomato Red', description: 'Vibrant red for attention-grabbing' },
  { value: '#32CD32', label: 'Lime Green', description: 'Bright green for fresh look' },
  { value: '#9370DB', label: 'Medium Purple', description: 'Moderate purple for creative documents' },
  { value: '#FFD700', label: 'Gold', description: 'Elegant gold for premium feel' },
] as const;


interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHexValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    if (/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handlePresetSelect = (colorValue: string) => {

    onChange(colorValue);
    setHexValue(colorValue);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3" ref={containerRef}>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative group">
          <input
            type="color"
            value={value.slice(0, 7)}
            onChange={(e) => {
              onChange(e.target.value);
              setHexValue(e.target.value);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={colorInputRef}
          />
          <div className="flex h-12 w-full rounded-lg border border-input bg-background hover:bg-accent/5 transition-colors duration-200 cursor-pointer shadow-sm overflow-hidden">
            <div
              className="w-1/2 h-full border-r"
              style={{ backgroundColor: value }}
            />
            <div className="flex-1 flex items-center px-3 text-sm text-muted-foreground">
              Color Picker
            </div>
          </div>
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-15 group-focus-within:opacity-15 transition-opacity duration-300 -z-10" />
        </div>

        <div className="relative">
          <div className="relative flex items-center">
            <Input
              value={hexValue}
              onChange={handleHexChange}
              placeholder="#000000"
              className="h-12 pr-10 font-mono text-base"
              maxLength={9}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 h-full hover:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>

          {isOpen && (
            <div className="absolute w-full mt-1 bg-popover border rounded-md shadow-md z-50">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border-b">
                <Palette size={14} />
                <span>Watermark Colors</span>
              </div>
              <div className="py-1 max-h-64 overflow-y-auto">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-accent focus:bg-accent focus:outline-none transition-colors"
                    onClick={() => handlePresetSelect(preset.value)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-md border shrink-0"
                        style={{ backgroundColor: preset.value }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{preset.label}</div>
                        <div className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                          {preset.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}