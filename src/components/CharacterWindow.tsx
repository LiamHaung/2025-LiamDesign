'use client';
import React from 'react';

interface CharacterWindowProps {
  className?: string;
  style?: React.CSSProperties;
}

const CharacterWindow: React.FC<CharacterWindowProps> = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`win98-window relative ${className}`}
      style={{
        width: '100%',
        maxWidth: '100%',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Windows 98 標題列 */}
      <div 
        className="win98-titlebar"
        style={{
          background: 'linear-gradient(90deg, #003EC3 0%, #002A8A 100%)',
          color: 'white',
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'clamp(12px, 2.5vw, 16px)',
          fontWeight: 'bold'
        }}
      >
        <div className="flex items-center space-x-2">
          <div style={{
            width: '12px',
            height: '12px',
            background: 'white',
            border: '1px inset #c0c0c0'
          }}></div>
          <span>Character.exe</span>
        </div>
      </div>
      
      {/* Windows 98 內容區域 */}
      <div style={{
        background: '#2a2a2a',
        color: 'white',
        padding: 'clamp(8px, 2vw, 16px)',
        fontSize: 'clamp(10px, 2vw, 14px)',
        lineHeight: '1.4',
        border: '2px inset #c0c0c0',
        margin: '2px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'clamp(100px, 15vw, 160px)',
        aspectRatio: '4/3'
      }}>
        {/* Character GIF 圖片 */}
        <img 
          src="/chactor.gif" 
          alt="Character" 
          className="w-auto h-auto max-w-full max-h-full object-contain" 
          style={{ 
            maxHeight: "100%",
            maxWidth: "100%",
            transform: "scale(1.1)"
          }} 
        />
      </div>
    </div>
  );
};

export default CharacterWindow;
