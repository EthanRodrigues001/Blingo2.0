"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumericInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export default function NumericInput({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  label,
}: NumericInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const incrementValue = () => {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange?.(newValue);
  };

  const decrementValue = () => {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor="numeric-input" className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={cn(
            "flex items-center rounded-md border",
            "border-input bg-background",
            isFocused && "ring-2 ring-ring"
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 py-1"
            onClick={decrementValue}
            aria-label="Decrement"
          >
            -
          </Button>
          <Input
            id="numeric-input"
            type="number"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            min={min}
            max={max}
            step={step}
            className={cn(
              "w-full text-center border-none bg-transparent focus:outline-none",
              "[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none",
              "[&::-webkit-inner-spin-button]:appearance-none"
            )}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 py-1"
            onClick={incrementValue}
            aria-label="Increment"
          >
            +
          </Button>
        </div>

        <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
}

