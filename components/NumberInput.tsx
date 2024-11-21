import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({ value, onChange, min = 1, max = 100, step = 1 }: NumberInputProps) {
  const increment = () => {
    onChange(Math.min(value + step, max));
  };

  const decrement = () => {
    onChange(Math.max(value - step, min));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      onChange(Math.max(Math.min(newValue, max), min));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <Button 
        onClick={decrement} 
        size="icon" 
        variant="outline"
        className="h-8 w-8"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
        step={step}
      />
      <Button 
        onClick={increment} 
        size="icon" 
        variant="outline"
        className="h-8 w-8"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}