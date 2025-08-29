'use client';
import React, { useState, useEffect } from 'react';

interface CarouselWindowProps {
  width?: string;
  height?: string;
  windowTitle?: string;
  images?: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const CarouselWindow: React.FC<CarouselWindowProps> = ({
  width = "500px",
  height = "400px",
  windowTitle = "圖片檢視器.exe",
  images = ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png', '/illustration_6.png'],
  autoPlay = true,
  autoPlayInterval = 3000,
  className = "",
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  isMaximized = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // 自動播放邏輯
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPlaying, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className={`carousel-window ${className}`}
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
        overflow: 'hidden'
      }}
    >
      {/* Windows 98 標題列 */}
      <div style={{
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #808080'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'white',
            border: '1px inset #c0c0c0',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>🖼️</div>
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
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >_</button>
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
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >{isMaximized ? '🗗' : '□'}</button>
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
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >×</button>
        </div>
      </div>

      {/* 內容區域 - 只在非最小化時顯示 */}
      {!isMinimized && (
        <>
          {/* 工具列 */}
          <div style={{
            background: '#f0f0f0',
            border: '1px solid #d0d0d0',
            padding: '4px 8px',
            fontSize: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={goToPrevious}
                style={{
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  fontSize: '12px',
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                onMouseDown={(e) => (e.target as HTMLElement).style.border = '1px inset #c0c0c0'}
                onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
              >
                ◀
              </button>
              
              <button
                onClick={togglePlayPause}
                style={{
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  fontSize: '10px',
                  padding: '2px 8px',
                  cursor: 'pointer'
                }}
                onMouseDown={(e) => (e.target as HTMLElement).style.border = '1px inset #c0c0c0'}
                onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              
              <button
                onClick={goToNext}
                style={{
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  fontSize: '12px',
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                onMouseDown={(e) => (e.target as HTMLElement).style.border = '1px inset #c0c0c0'}
                onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
              >
                ▶
              </button>
            </div>
            
            <span style={{ fontSize: '9px', color: '#666' }}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* 主要圖片顯示區域 */}
          <div style={{
            flex: 1,
            background: '#000',
            border: '2px inset #c0c0c0',
            margin: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {images.length > 0 && (
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            )}
            
            {/* 左右箭頭覆蓋層 */}
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>
            
            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>
          </div>

          {/* 縮圖導航列 */}
          <div style={{
            background: '#f0f0f0',
            border: '1px inset #c0c0c0',
            padding: '4px',
            display: 'flex',
            gap: '2px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxHeight: '60px',
            overflow: 'auto'
          }}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '40px',
                  height: '30px',
                  border: currentIndex === index ? '2px solid #0078d4' : '1px solid #999',
                  background: `url(${image}) center/cover`,
                  cursor: 'pointer',
                  opacity: currentIndex === index ? 1 : 0.7
                }}
              />
            ))}
          </div>

          {/* 狀態列 */}
          <div style={{
            background: '#f0f0f0',
            border: '1px inset #c0c0c0',
            padding: '2px 8px',
            fontSize: '9px',
            color: '#666',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>正在顯示: {images[currentIndex]?.split('/').pop()}</span>
            <span>{isPlaying ? '自動播放中' : '已暫停'}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CarouselWindow; 