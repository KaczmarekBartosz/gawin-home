'use client';

import { cn } from 'lib/utils';
import * as React from 'react';

export interface CircularProgressProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'accent' | 'blue' | 'green';
  showValue?: boolean;
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: {
    container: 'w-16 h-16',
    stroke: 4,
    fontSize: 'text-xs',
  },
  md: {
    container: 'w-24 h-24',
    stroke: 6,
    fontSize: 'text-sm',
  },
  lg: {
    container: 'w-32 h-32',
    stroke: 8,
    fontSize: 'text-base',
  },
};

const variantMap = {
  accent: {
    stroke: 'rgb(var(--accent))',
    bg: 'rgb(var(--accent) / 0.1)',
  },
  blue: {
    stroke: 'rgb(var(--accent-blue))',
    bg: 'rgb(var(--accent-blue) / 0.1)',
  },
  green: {
    stroke: 'rgb(var(--accent-green))',
    bg: 'rgb(var(--accent-green) / 0.1)',
  },
};

export function CircularProgress({
  value,
  size = 'md',
  variant = 'accent',
  showValue = true,
  label,
  className,
}: CircularProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const { container, stroke: strokeWidth, fontSize } = sizeMap[size];
  const { stroke: strokeColor, bg: bgColor } = variantMap[variant];

  // SVG circle calculations
  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn('relative', container)}>
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Value text in center */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('font-semibold text-foreground', fontSize)}>
              {Math.round(normalizedValue)}%
            </span>
          </div>
        )}
      </div>

      {/* Label below */}
      {label && (
        <span className="text-xs font-medium text-muted-foreground text-center">
          {label}
        </span>
      )}
    </div>
  );
}
