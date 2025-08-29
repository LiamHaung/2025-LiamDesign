'use client';
import React, { useState } from 'react';

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  children,
  width = 'auto',
  height = 'auto',
  minimizable = true,
  maximizable = true,
  closable = true,
  onClose,
  onMinimize,
  onMaximize,
  className = ''
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <div 
      className={`window-frame ${className}`}
      style={{
        width: isMaximized ? '100%' : width,
        height: isMaximized ? '100%' : height,
        minWidth: '200px',
        minHeight: '100px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 標題欄 */}
      <div 
        className="window-titlebar"
        style={{
          background: 'linear-gradient(90deg, #0078d4 0%, #005a9e 100%)',
          color: 'white',
          padding: '4px 6px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #404040',
          cursor: 'move',
          userSelect: 'none'
        }}
      >
        {/* 標題文字 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div 
            style={{
              width: '16px',
              height: '16px',
              background: 'url("/window.svg") center/contain no-repeat',
              filter: 'brightness(0) invert(1)'
            }}
          />
          <span>{title}</span>
        </div>

        {/* 控制按鈕 */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {minimizable && (
            <button
              onClick={onMinimize}
              style={{
                width: '18px',
                height: '17px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'black'
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px inset #c0c0c0';
              }}
              onMouseUp={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px outset #c0c0c0';
              }}
            >
              _
            </button>
          )}
          
          {maximizable && (
            <button
              onClick={handleMaximize}
              style={{
                width: '18px',
                height: '17px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'black'
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px inset #c0c0c0';
              }}
              onMouseUp={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px outset #c0c0c0';
              }}
            >
              {isMaximized ? '❐' : '□'}
            </button>
          )}
          
          {closable && (
            <button
              onClick={onClose}
              style={{
                width: '18px',
                height: '17px',
                background: '#c0c0c0',
                border: '1px outset #c0c0c0',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'black'
              }}
              onMouseDown={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px inset #c0c0c0';
              }}
              onMouseUp={(e) => {
                const target = e.target as HTMLElement;
                target.style.border = '1px outset #c0c0c0';
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 內容區域 */}
      <div 
        className="window-content"
        style={{
          flex: 1,
          padding: '8px',
          background: '#f0f0f0',
          border: '1px inset #c0c0c0',
          margin: '2px',
          overflow: 'auto',
          fontSize: '11px',
          lineHeight: '1.4'
        }}
      >
        {children}
      </div>

      {/* 狀態欄 (可選) */}
      <div 
        className="window-statusbar"
        style={{
          height: '20px',
          background: '#c0c0c0',
          borderTop: '1px solid #808080',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px',
          fontSize: '10px',
          color: '#404040'
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '6px', height: '6px', background: '#404040' }}></div>
          <div style={{ width: '6px', height: '6px', background: '#404040' }}></div>
          <div style={{ width: '6px', height: '6px', background: '#404040' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WindowFrame; 