'use client';
import React from 'react';

interface CheckerboardPatternProps {
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  cols?: number;
  cellSize?: number;
}

export default function CheckerboardPattern({ 
  className = '', 
  style = {},
  rows = 2,
  cols = 8,
  cellSize = 20
}: CheckerboardPatternProps) {
  const cells = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isBlack = (row + col) % 2 === 0;
      cells.push(
        <div
          key={`${row}-${col}`}
          className={`absolute border border-gray-300`}
          style={{
            left: col * cellSize,
            top: row * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: isBlack ? '#000000' : '#FFFFFF',
          }}
        />
      );
    }
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{
        width: cols * cellSize,
        height: rows * cellSize,
        ...style
      }}
    >
      {cells}
    </div>
  );
}
