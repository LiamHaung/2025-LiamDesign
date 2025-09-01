'use client';
import React from 'react';

interface HeroSectionProps {
  title?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title = "Liam.Design",
  backgroundImage = "/hero.png",
  backgroundColor = "#13496b"
}) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* 背景圖片 */}
      <div style={{
        position: 'absolute',
        inset: '0',
        background: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
      
      {/* 深藍色遮罩層 */}
      <div style={{
        position: 'absolute',
        inset: '0',
        backgroundColor: backgroundColor,
        opacity: 0.75
      }} />

      {/* SVG 網格背景 */}
      <svg style={{
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        opacity: 0.3
      }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" fill="url(#grid)" />
      </svg>

      {/* 主要標題文字 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'var(--font-amifer), var(--font-press-start-2p), monospace',
        fontSize: 'clamp(4rem, 12vw, 8rem)',
        fontWeight: 'bold',
        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
        letterSpacing: '0.1em',
        lineHeight: '0.9',
        textTransform: 'uppercase'
      }}>
        {title}
      </div>

      {/* 裝飾元素 - 雲朵 */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        zIndex: 5,
        opacity: 0.6
      }}>
        <div style={{
          width: '80px',
          height: '40px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '40px',
          position: 'relative',
          marginBottom: '20px'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '10px',
            width: '30px',
            height: '30px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '15px',
            width: '25px',
            height: '25px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '50%'
          }} />
        </div>
      </div>

      {/* 裝飾元素 - 右側雲朵 */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        zIndex: 5,
        opacity: 0.4
      }}>
        <div style={{
          width: '60px',
          height: '30px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '30px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '8px',
            width: '20px',
            height: '20px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '10px',
            width: '18px',
            height: '18px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%'
          }} />
        </div>
      </div>

      {/* 裝飾元素 - 太陽 */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '20%',
        zIndex: 5,
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 100%)',
        borderRadius: '50%',
        boxShadow: '0 0 20px rgba(255,235,59,0.5)',
        opacity: 0.8
      }} />

      {/* 底部裝飾線 */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: 'linear-gradient(to right, #c0c0c0, #808080, #c0c0c0)',
        zIndex: 10
      }} />
    </div>
  );
};

export default HeroSection;
