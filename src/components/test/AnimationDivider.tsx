'use client';
import React from 'react';
import AnimatedCheckerboard from './AnimatedCheckerboard';

interface AnimationDividerProps {
  leftColor: string;
  rightColor: string;
  leftDirection: 'left-to-right' | 'right-to-left';
  rightDirection: 'left-to-right' | 'right-to-left';
  className?: string;
}

export default function AnimationDivider({
  leftColor,
  rightColor,
  leftDirection,
  rightDirection,
  className = ''
}: AnimationDividerProps) {
  return (
    <div className={`w-full py-8 ${className}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          {/* Left Animation */}
          <div className="flex-1 flex justify-start">
            <AnimatedCheckerboard
              animationColor={leftColor}
              direction={leftDirection}
              animationSpeed={200}
              cellSize={20}
              rows={2}
              cols={8}
            />
          </div>
          
          {/* Right Animation */}
          <div className="flex-1 flex justify-end">
            <AnimatedCheckerboard
              animationColor={rightColor}
              direction={rightDirection}
              animationSpeed={200}
              cellSize={20}
              rows={2}
              cols={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
