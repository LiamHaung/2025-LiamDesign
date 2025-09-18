'use client';
import React, { useState, useEffect } from 'react';

interface DigitalClockProps {
  className?: string;
  style?: React.CSSProperties;
  showSeconds?: boolean;
  format24?: boolean;
}

export default function DigitalClock({ 
  className = '', 
  style = {},
  showSeconds = true,
  format24 = true
}: DigitalClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (!format24) {
      hours = hours % 12 || 12;
    }

    const timeString = showSeconds 
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return timeString;
  };

  return (
    <div 
      className={`font-mono ${className}`}
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '2px',
        display: 'inline-block',
        ...style
      }}
    >
      {formatTime(time)}
    </div>
  );
}
