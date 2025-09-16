'use client';
import React, { useState } from 'react';

interface ColorScrollWindowProps {
  width?: string;
  height?: string;
  windowTitle?: string;
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const ColorScrollWindow: React.FC<ColorScrollWindowProps> = ({
  width = '420px',
  height = '300px',
  windowTitle = 'Color Panel.exe',
  className = '',
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  isMaximized = false,
}) => {
  const [hue, setHue] = useState<number>(200);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = Math.sign(e.deltaY) * 5; // 每次滾動變化 5 度
    setHue((prev) => {
      const next = (prev + delta + 360) % 360;
      return next;
    });
  };

  const bg = `linear-gradient(135deg, hsl(${hue}, 90%, 55%), hsl(${(hue + 40) % 360}, 90%, 55%))`;

  return (
    <div
      className={`color-scroll-window ${className}`}
      style={{
        width,
        height,
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 標題列 */}
      <div
        style={{
          background: 'linear-gradient(90deg, #003EC3 0%, #002A8A 100%)',
          color: 'white',
          padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)',
          fontSize: 'clamp(9px, 2.5vw, 11px)',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #808080',
          minHeight: 'clamp(20px, 5vw, 24px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              background: 'white',
              border: '1px inset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >🎨</div>
          <span>{windowTitle}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            onClick={onMinimize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >_
          </button>
          <button
            onClick={onMaximize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >{isMaximized ? '🗗' : '□'}
          </button>
          <button
            onClick={onClose}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >×
          </button>
        </div>
      </div>

      {/* 內容區域 */}
      {!isMinimized && (
        <div
          onWheel={handleWheel}
          style={{
            flex: 1,
            margin: '2px',
            border: '2px inset #c0c0c0',
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textShadow: 'none',
            userSelect: 'none',
          }}
          title="滑動滾輪改變顏色"
        >
          <div style={{ textAlign: 'center', fontSize: '12px', lineHeight: 1.6 }}>
            <div>滑動滾輪改變顏色</div>
            <div>Hue: {Math.round(hue)}°</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorScrollWindow; 