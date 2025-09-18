'use client';
import React, { useState, useEffect } from 'react';

interface AnimatedCheckerboardProps {
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  cols?: number;
  cellSize?: number;
  animationColor?: string;
  animationSpeed?: number; // milliseconds per cell
  direction?: 'left-to-right' | 'right-to-left';
  autoStart?: boolean;
  loop?: boolean;
}

export default function AnimatedCheckerboard({ 
  className = '', 
  style = {},
  rows = 2,
  cols = 8,
  cellSize = 20,
  animationColor = '#003EC3',
  animationSpeed = 200,
  direction = 'left-to-right',
  autoStart = true,
  loop = true
}: AnimatedCheckerboardProps) {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const getBlackCells = () => {
    const blackCells: string[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isBlack = (row + col) % 2 === 0;
        if (isBlack) {
          blackCells.push(`${row}-${col}`);
        }
      }
    }
    return blackCells;
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveCells(new Set());
    
    const blackCells = getBlackCells();
    const orderedCells = direction === 'left-to-right' 
      ? blackCells 
      : blackCells.reverse();

    orderedCells.forEach((cellKey, index) => {
      setTimeout(() => {
        setActiveCells(prev => new Set([...prev, cellKey]));
      }, index * animationSpeed);
    });

    // Reset after animation completes
    setTimeout(() => {
      if (loop) {
        setTimeout(() => {
          setActiveCells(new Set());
          setIsAnimating(false);
          if (autoStart) {
            startAnimation();
          }
        }, 1000); // Wait 1 second before restarting
      } else {
        setIsAnimating(false);
      }
    }, orderedCells.length * animationSpeed + 1000);
  };

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart, direction, animationSpeed, loop]);

  const cells = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isBlack = (row + col) % 2 === 0;
      const cellKey = `${row}-${col}`;
      const isActive = activeCells.has(cellKey);
      
      cells.push(
        <div
          key={cellKey}
          className={`absolute border border-gray-300 transition-colors duration-200`}
          style={{
            left: col * cellSize,
            top: row * cellSize,
            width: cellSize,
            height: cellSize,
            backgroundColor: isBlack 
              ? (isActive ? animationColor : '#000000')
              : '#FFFFFF',
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
