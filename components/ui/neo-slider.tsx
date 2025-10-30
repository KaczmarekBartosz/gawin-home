"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NeoSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  value: number | number[];
  onChange: (value: number | number[]) => void;
  label?: string;
  unit?: string;
  variant?: "primary" | "gold" | "green";
  disabled?: boolean;
}

const variantStyles = {
  primary: {
    thumb: "border-brand-charcoal",
    progress: "bg-gradient-to-r from-brand-charcoal to-brand-charcoal",
    thumb_hover: "shadow-neo-light",
    glow: "",
  },
  gold: {
    thumb: "border-brand-gold",
    progress: "bg-gradient-to-r from-brand-gold to-brand-copper",
    thumb_hover: "shadow-glow-gold",
    glow: "group-hover:shadow-glow-gold",
  },
  green: {
    thumb: "border-neo-green",
    progress: "bg-gradient-to-r from-neo-green to-neo-green",
    thumb_hover: "shadow-glow-green",
    glow: "group-hover:shadow-glow-green",
  },
};

export const NeoSlider = React.forwardRef<HTMLDivElement, NeoSliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      onChange,
      label,
      unit = "",
      variant = "primary",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isRange = Array.isArray(value);
    const minValue = isRange ? ((value as number[])[0] ?? min) : min;
    const maxValue = isRange
      ? ((value as number[])[1] ?? max)
      : (value as number);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState<string | null>(null);

    const calculatePercent = (val: number): number => {
      return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
    };

    const calculateValue = (percent: number): number => {
      let val = (percent / 100) * (max - min) + min;
      const remainder = (val - min) % step;
      if (remainder !== 0) {
        val = val - remainder + (remainder < step / 2 ? 0 : step);
      }
      return Math.max(min, Math.min(max, val));
    };

    const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(thumb);
    };

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
        );
        const newValue = calculateValue(percent);

        if (isRange) {
          const [currentMin, currentMax] = value as number[];
          const safeMin = currentMin ?? min;
          const safeMax = currentMax ?? max;
          if (isDragging === "min") {
            onChange([Math.min(newValue, safeMax), safeMax]);
          } else {
            onChange([safeMin, Math.max(newValue, safeMin)]);
          }
        } else {
          onChange(newValue);
        }
      },
      [isDragging, isRange, value, onChange, min, max],
    );

    const handleMouseUp = React.useCallback(() => {
      setIsDragging(null);
    }, []);

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleKeyDown =
      (thumb: "min" | "max") => (e: React.KeyboardEvent) => {
        if (disabled) return;

        const keyStep = step * (e.shiftKey ? 5 : 1);
        let newValue: number = isRange
          ? thumb === "min"
            ? ((value as number[])[0] ?? min)
            : ((value as number[])[1] ?? max)
          : (value as number);

        switch (e.key) {
          case "ArrowUp":
          case "ArrowRight":
            e.preventDefault();
            newValue = Math.min(max, newValue + keyStep);
            break;
          case "ArrowDown":
          case "ArrowLeft":
            e.preventDefault();
            newValue = Math.max(min, newValue - keyStep);
            break;
          case "Home":
            e.preventDefault();
            newValue = min;
            break;
          case "End":
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        if (isRange) {
          const [currentMin, currentMax] = value as number[];
          const safeMin = currentMin ?? min;
          const safeMax = currentMax ?? max;
          if (thumb === "min") {
            onChange([Math.min(newValue, safeMax), safeMax]);
          } else {
            onChange([safeMin, Math.max(newValue, safeMin)]);
          }
        } else {
          onChange(newValue);
        }
      };

    const minPercent = calculatePercent(minValue);
    const maxPercent = calculatePercent(maxValue);
    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "group w-full space-y-2",
          disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-brand-charcoal">
              {label}
            </label>
            <div className="text-sm font-medium text-brand-gold">
              {isRange ? (
                <>
                  {(minValue ?? min).toFixed(0)}
                  {unit && <span>{unit}</span>}
                  {" - "}
                  {(maxValue ?? max).toFixed(0)}
                  {unit && <span>{unit}</span>}
                </>
              ) : (
                <>
                  {(maxValue ?? value).toFixed(0)}
                  {unit && <span>{unit}</span>}
                </>
              )}
            </div>
          </div>
        )}

        <div className="relative h-6">
          {/* Track Background */}
          <div
            ref={trackRef}
            className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200"
            data-slot="neo-slider-track"
          >
            {/* Progress Bar */}
            <div
              className={cn(
                "absolute top-0 h-full rounded-full transition-all",
                styles.progress,
              )}
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
              data-slot="neo-slider-progress"
            />
          </div>

          {/* Min Thumb (or Single Thumb) */}
          <button
            onMouseDown={handleMouseDown(isRange ? "min" : "min")}
            onKeyDown={handleKeyDown(isRange ? "min" : "min")}
            role="slider"
            aria-label={label ? `${label} minimum` : "Slider"}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={minValue}
            aria-disabled={disabled}
            disabled={disabled}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "h-6 w-6 rounded-full border-2 bg-white",
              "transition-all duration-200",
              "cursor-grab focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
              "hover:scale-110",
              isDragging === "min"
                ? "shadow-neo-pressed cursor-grabbing"
                : styles.thumb_hover,
              styles.thumb,
              disabled && "cursor-not-allowed",
            )}
            style={{
              left: `${minPercent}%`,
            }}
            data-slot="neo-slider-thumb-min"
          />

          {/* Max Thumb (Range Only) */}
          {isRange && (
            <button
              onMouseDown={handleMouseDown("max")}
              onKeyDown={handleKeyDown("max")}
              role="slider"
              aria-label={label ? `${label} maximum` : "Slider"}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={maxValue}
              aria-disabled={disabled}
              disabled={disabled}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                "h-6 w-6 rounded-full border-2 bg-white",
                "transition-all duration-200",
                "cursor-grab focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
                "hover:scale-110",
                isDragging === "max"
                  ? "shadow-neo-pressed cursor-grabbing"
                  : styles.thumb_hover,
                styles.thumb,
                disabled && "cursor-not-allowed",
              )}
              style={{
                left: `${maxPercent}%`,
              }}
              data-slot="neo-slider-thumb-max"
            />
          )}
        </div>

        {/* Min/Max Labels (Optional) */}
        <div className="flex justify-between text-xs text-neutral-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  },
);

NeoSlider.displayName = "NeoSlider";
