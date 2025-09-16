'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// 定義圖片路徑
const images = [
  '/liam-test-07.png',
  '/liam-test-08.png', 
  '/liam-test-09.png'
];

// 為了實現滾動效果，我們將圖片複製多份
const displayImages = [...images, ...images, ...images, ...images];

// 響應式滾輪格子的尺寸
const getReelSize = (screenWidth: number) => {
  const availableWidth = screenWidth - 40 - 20 - 20;
  const reelWidth = Math.max(60, availableWidth / 3);
  return { 
    width: Math.round(reelWidth), 
    height: Math.round(reelWidth) 
  };
};

// 單個滾輪組件
const SlotReel = ({ 
  reelIndex, 
  isSpinning, 
  finalImageIndex, 
  spinKey, 
  onSpinComplete 
}: {
  reelIndex: number;
  isSpinning: boolean;
  finalImageIndex: number;
  spinKey: number;
  onSpinComplete: () => void;
}) => {
  const [reelSize, setReelSize] = useState({ width: 100, height: 100 });
  
  useEffect(() => {
    const updateSize = () => {
      const newSize = getReelSize(window.innerWidth);
      setReelSize(newSize);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const targetY = -finalImageIndex * reelSize.height;

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        onSpinComplete();
      }, 2500 + (reelIndex * 200));
      return () => clearTimeout(timer);
    }
  }, [isSpinning, reelIndex, onSpinComplete]);

  return (
    <div style={{
      width: reelSize.width,
      height: reelSize.height,
      border: 'none',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '8px',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      flex: '0 0 auto',
      minWidth: '60px'
    }}>
      <motion.div
        key={spinKey}
        initial={{ y: 0 }}
        animate={isSpinning ? { y: -reelSize.height * images.length * 2 } : { y: targetY }}
        transition={
          isSpinning
            ? {
                y: {
                  duration: 0.15,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }
            : {
                y: {
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }
        }
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: displayImages.length * reelSize.height,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {displayImages.map((src, index) => (
          <div 
            key={index} 
            style={{ 
              width: '100%', 
              height: reelSize.height, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Image 
              src={src} 
              alt={`Slot Icon ${index}`} 
              width={reelSize.width - 6} 
              height={reelSize.height - 6} 
              style={{ 
                objectFit: 'contain',
                borderRadius: '4px'
              }} 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 主要老虎機組件
interface SlotMachineProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SlotMachine({ className, style }: SlotMachineProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalImageIndices, setFinalImageIndices] = useState([0, 0, 0]);
  const [spinKey, setSpinKey] = useState(0);
  const [, setCompletedReels] = useState(0);

  const spinAllReels = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinKey(prev => prev + 1);
    setCompletedReels(0);

    const newIndices = [
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length)
    ];
    setFinalImageIndices(newIndices);
  };

  const handleReelComplete = () => {
    setCompletedReels(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setIsSpinning(false);
      }
      return newCount;
    });
  };

  return (
    <div className={className} style={style}>
      {/* 精神標語 */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontFamily: 'var(--font-zpix), monospace',
        maxWidth: '100%',
        padding: '0 10px'
      }}>
        <div style={{
          fontSize: 'clamp(20px, 4vw, 48px)',
          fontWeight: 'bold',
          color: '#003EC3',
          marginBottom: '12px',
          lineHeight: '1.3',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word'
        }}>
          ＃昨天已經過去，明天尚未到來，今天仍是未知！
        </div>
        <div style={{
          fontSize: 'clamp(16px, 3vw, 24px)',
          fontWeight: 'bold',
          color: '#666',
          letterSpacing: '1px',
          lineHeight: '1.4'
        }}>
          ＃Own the Day ＃Go Live Today
        </div>
      </div>

      {/* 老虎機滾輪容器 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'nowrap'
      }}>
        {[0, 1, 2].map((reelIndex) => (
          <SlotReel
            key={reelIndex}
            reelIndex={reelIndex}
            isSpinning={isSpinning}
            finalImageIndex={finalImageIndices[reelIndex]}
            spinKey={spinKey}
            onSpinComplete={handleReelComplete}
          />
        ))}
      </div>

      {/* 按鈕 */}
      <div className="slot-button-container">
        <button
          onClick={spinAllReels}
          disabled={isSpinning}
          className="slot-play-button"
        >
          {isSpinning ? 'SPINNING...' : 'PLAY'}
        </button>
      </div>
      
      <style jsx>{`
        .slot-button-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 20px;
        }
        
        .slot-play-button {
          background-color: #003EC3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: ${isSpinning ? 'not-allowed' : 'pointer'};
          opacity: ${isSpinning ? 0.6 : 1};
          font-family: var(--font-zpix), monospace;
          transform: scale(1);
          transform-origin: center;
          transition: all 0.2s ease;
        }
        
        .slot-play-button:hover:not(:disabled) {
          background-color: #0056b3;
          transform: scale(1.05);
        }
        
        /* 桌面版樣式 */
        @media (min-width: 769px) {
          .slot-button-container {
            margin-top: 40px;
          }
          
          .slot-play-button {
            padding: 18px 36px;
            border-radius: 12px;
            font-size: 24px;
            transform: scale(1.5);
          }
          
          .slot-play-button:hover:not(:disabled) {
            transform: scale(1.55);
          }
        }
      `}</style>
    </div>
  );
} 