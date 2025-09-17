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
  
  // 手動控制狀態（固定為手動模式）
  const [reelSpinning, setReelSpinning] = useState([false, false, false]);
  const [stopRequested, setStopRequested] = useState(false);

  const spinAllReels = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinKey(prev => prev + 1);
    setCompletedReels(0);

    // 固定為手動模式：啟動所有滾輪但不設定結束條件
    setReelSpinning([true, true, true]);
    // 不預設最終結果，由用戶手動停止時決定
  };

  const stopAllReels = () => {
    if (!isSpinning || stopRequested) return;
    
    setStopRequested(true);
    
    // 分次停止滾輪，間隔 0.8 秒
    [0, 1, 2].forEach((reelIndex, index) => {
      setTimeout(() => {
        // 生成該滾輪的隨機結果
        const randomIndex = Math.floor(Math.random() * images.length);
        setFinalImageIndices(prev => {
          const newIndices = [...prev];
          newIndices[reelIndex] = randomIndex;
          return newIndices;
        });

        // 標記該滾輪為已停止
        setReelSpinning(prev => {
          const newSpinning = [...prev];
          newSpinning[reelIndex] = false;
          return newSpinning;
        });

        // 如果是最後一個滾輪，結束整個遊戲
        if (reelIndex === 2) {
          setTimeout(() => {
            setIsSpinning(false);
            setStopRequested(false);
          }, 100);
        }
      }, index * 800); // 每個滾輪間隔 800ms
    });
  };

  const handleReelComplete = () => {
    // 在手動模式下，不使用自動完成邏輯
  };

  return (
    <div className={className} style={style}>
      {/* 精神標語 */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontFamily: 'var(--font-zpix), monospace',
        maxWidth: '100%',
        padding: '0 20px', // 增加左右padding
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontSize: 'clamp(16px, 4vw, 48px)', // 調整最小字體從20px到16px
          fontWeight: 'bold',
          color: '#003EC3',
          marginBottom: '12px',
          lineHeight: '1.4', // 調整行高以適應換行
          wordBreak: 'break-all', // 改為允許任意位置斷行
          overflowWrap: 'break-word',
          whiteSpace: 'normal', // 確保可以換行
          width: '100%'
        }}>
          ＃昨天已經過去，明天尚未到來，今天仍是未知！
        </div>
        <div style={{
          fontSize: 'clamp(14px, 3vw, 24px)', // 調整最小字體從16px到14px
          fontWeight: 'bold',
          color: '#666',
          letterSpacing: '1px',
          lineHeight: '1.4',
          wordBreak: 'break-word', // 英文也允許斷行
          whiteSpace: 'normal'
        }}>
          ＃Own the Day ＃Go Live Today
        </div>
      </div>



      {/* 老虎機滾輪容器 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {/* 滾輪區域 */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap'
        }}>
          {[0, 1, 2].map((reelIndex) => (
            <SlotReel
              key={reelIndex}
              reelIndex={reelIndex}
              isSpinning={reelSpinning[reelIndex]}
              finalImageIndex={finalImageIndices[reelIndex]}
              spinKey={spinKey}
              onSpinComplete={handleReelComplete}
            />
          ))}
        </div>


      </div>

      {/* 按鈕 */}
      <div className="slot-button-container">
        <button
          onClick={spinAllReels}
          disabled={isSpinning}
          className="slot-play-button"
        >
          {isSpinning ? 'RUNNING...' : 'START'}
        </button>
        
        {/* STOP按鈕 */}
        <button
          onClick={stopAllReels}
          disabled={!isSpinning || stopRequested}
          className="slot-play-button"
          style={{
            backgroundColor: (!isSpinning || stopRequested) ? '#6c757d' : '#3AAF3A'
          }}
        >
          {stopRequested ? 'STOPPING...' : 'STOP'}
        </button>
      </div>
      
      <style jsx>{`
        .slot-button-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 30px;
          gap: 10px;
          padding: 0 20px;
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
            gap: 20px;
          }
          
          .slot-play-button {
            padding: 18px 36px;
            border-radius: 12px;
            font-size: 24px;
            transform: none; /* 移除縮放，避免視覺重疊 */
          }
          
          .slot-play-button:hover:not(:disabled) {
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
} 