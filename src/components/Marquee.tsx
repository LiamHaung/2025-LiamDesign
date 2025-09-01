'use client';
import React, { useEffect, useRef } from 'react';

interface MarqueeProps {
  text?: string;
  speed?: number;
  width?: string;
  fontSize?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  text = "Design that listens. Design that grows.",
  speed = 30,
  width = "60px",
  fontSize = "16px"
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= speed / 60; // 60fps
      
      // 當文字完全移出視窗時，重置位置
      if (position < -marquee.scrollHeight / 2) {
        position = 0;
      }
      
      marquee.style.transform = `translateY(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed]);

  // 將文字分割成單個字符，每個字符垂直排列
  const renderVerticalText = (text: string) => {
    return text.split('').map((char, index) => (
      <div
        key={index}
        style={{
          color: '#ffffff',
          fontFamily: 'var(--font-press-start-2p), monospace',
          fontSize: fontSize,
          fontWeight: 'normal',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          letterSpacing: '2px',
          lineHeight: '1.2',
          textAlign: 'center',
          marginBottom: '8px',
          writingMode: 'horizontal-tb',
          textOrientation: 'mixed'
        }}
      >
        {char === ' ' ? '　' : char}
      </div>
    ));
  };

  return (
    <div style={{
      width: width,
      height: '400px',
      background: '#000000',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      border: '2px outset #c0c0c0',
      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3)'
    }}>
      {/* 頂部裝飾條 */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: 'linear-gradient(to right, #c0c0c0, #808080)',
        zIndex: 2
      }} />
      
      {/* 底部裝飾條 */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: 'linear-gradient(to right, #808080, #c0c0c0)',
        zIndex: 2
      }} />

      {/* 跑馬燈文字容器 */}
      <div 
        ref={marqueeRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          position: 'absolute',
          top: '0',
          willChange: 'transform'
        }}
      >
        {/* 重複文字以實現無縫循環 */}
        <div style={{
          marginBottom: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {renderVerticalText(text)}
        </div>
        <div style={{
          marginBottom: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {renderVerticalText(text)}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {renderVerticalText(text)}
        </div>
      </div>

      {/* 左側裝飾線 */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '2px',
        background: 'linear-gradient(to bottom, #c0c0c0, #808080)',
        zIndex: 1
      }} />
      
      {/* 右側裝飾線 */}
      <div style={{
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        width: '2px',
        background: 'linear-gradient(to bottom, #808080, #c0c0c0)',
        zIndex: 1
      }} />
    </div>
  );
};

export default Marquee; 