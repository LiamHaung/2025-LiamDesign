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
const displayImages = [...images, ...images, ...images, ...images]; // 複製四份確保足夠的滾動長度

// 響應式滾輪格子的尺寸 - 基於螢幕寬度比例，確保三格一排
const getReelSize = (screenWidth: number) => {
  // 計算可用寬度：螢幕寬度 - 左右padding - 滾輪間距 - 容器padding
  const availableWidth = screenWidth - 40 - 20 - 20; // 40px左右padding + 20px容器padding + 20px滾輪間距
  const reelWidth = Math.max(60, availableWidth / 3); // 三等分，最小60px
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
  
  // 監聽視窗大小變化
  useEffect(() => {
    const updateSize = () => {
      const newSize = getReelSize(window.innerWidth);
      setReelSize(newSize);
    };
    
    // 初始化
    updateSize();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 計算最終停止位置，讓目標圖片居中
  const targetY = -finalImageIndex * reelSize.height;

  // 滾動完成回調
  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        onSpinComplete();
      }, 2500 + (reelIndex * 200)); // 每個滾輪錯開200ms停止
      return () => clearTimeout(timer);
    }
  }, [isSpinning, reelIndex, onSpinComplete]);

  return (
    <div style={{
      width: reelSize.width,
      height: reelSize.height,
      border: 'none', // 無邊框
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '8px',
      boxShadow: 'none', // 移除陰影
      backgroundColor: '#FFFFF3', // 溫暖米白色
      flex: '0 0 auto', // 防止縮放
      minWidth: '60px' // 最小寬度保障
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
              justifyContent: 'center',
              borderBottom: index < displayImages.length - 1 ? '1px solid #ddd' : 'none'
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

export default function TestPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalImageIndices, setFinalImageIndices] = useState([0, 0, 0]); // 三個滾輪的最終圖片索引
  const [spinKey, setSpinKey] = useState(0);
  const [completedReels, setCompletedReels] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1920); // 預設螢幕寬度

  // 監聽螢幕寬度變化
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  const spinAllReels = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinKey(prev => prev + 1);
    setCompletedReels(0);

    // 隨機決定每個滾輪的最終停止圖片
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

  // 計算當前滾輪大小用於顯示
  const currentReelSize = getReelSize(screenWidth);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFF3', // 更改為 #FFFFF3
      padding: '20px',
      fontFamily: 'var(--font-noto-sans-tc), "Noto Sans TC", "Noto Sans", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <h1 style={{
        fontSize: 'clamp(24px, 5vw, 48px)',
        fontWeight: '900',
        color: '#333333',
        margin: '0 0 20px 0',
        textShadow: 'none', // 移除文字陰影
        letterSpacing: '0.02em',
        textAlign: 'center'
      }}>
        🎰 三格老虎機測試 ✨
      </h1>

      <p style={{
        fontSize: 'clamp(14px, 2.5vw, 20px)',
        color: '#666666',
        textAlign: 'center',
        margin: '0 0 40px 0',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        點擊按鈕滾動三個老虎機滾輪，觀察它們如何依序停止
      </p>

      {/* 三個老虎機滾輪容器 - 確保三格一排 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap', // 強制不換行
        gap: '10px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#FFFFF3', // 溫暖米白色
        borderRadius: '16px',
        border: 'none', // 移除邊框
        boxShadow: 'none', // 移除陰影
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden' // 防止溢出
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

      <button
        onClick={spinAllReels}
        disabled={isSpinning}
        style={{
          padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
          fontSize: 'clamp(16px, 3vw, 20px)',
          fontWeight: 'bold',
          backgroundColor: isSpinning ? '#cccccc' : '#003EC3', // 更改為 #003EC3
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          boxShadow: 'none', // 移除陰影
          transition: 'all 0.3s ease',
          transform: isSpinning ? 'none' : 'translateY(0)',
          minWidth: 'clamp(120px, 25vw, 160px)'
        }}
        onMouseEnter={(e) => {
          if (!isSpinning) {
            e.target.style.backgroundColor = '#002A8A'; // 深藍色懸停效果
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSpinning) {
            e.target.style.backgroundColor = '#003EC3';
            e.target.style.transform = 'translateY(0)';
          }
        }}
        onMouseDown={(e) => {
          if (!isSpinning) {
            e.target.style.transform = 'translateY(0)';
          }
        }}
      >
        {isSpinning ? '滾動中...' : 'PLAY'} {/* 更改為 PLAY */}
      </button>

      {/* 顯示當前結果 */}
      <div style={{
        marginTop: '20px',
        padding: 'clamp(10px, 2vw, 15px) clamp(20px, 4vw, 30px)',
        backgroundColor: '#FFFFF3', // 溫暖米白色
        borderRadius: '12px',
        border: 'none', // 移除邊框
        textAlign: 'center',
        minWidth: 'clamp(200px, 50vw, 400px)'
      }}>
        <p style={{ 
          margin: '0 0 10px 0', 
          color: '#333', 
          fontSize: 'clamp(14px, 2.5vw, 16px)',
          fontWeight: 'bold'
        }}>
          當前顯示:
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {finalImageIndices.map((index, i) => (
            <span 
              key={i}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                color: '#666'
              }}
            >
              滾輪{i + 1}: {images[index]?.split('/').pop()}
            </span>
          ))}
        </div>
      </div>

      {/* 響應式說明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#FFFFF3', // 更改為 #FFFFF3
        borderRadius: '8px',
        border: 'none', // 移除邊框
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          color: '#1976d2',
          fontSize: 'clamp(12px, 2vw, 14px)',
          lineHeight: '1.4'
        }}>
          📱 響應式設計：滾輪大小 = (螢幕寬度 - 間距) ÷ 3<br/>
          當前螢幕: {screenWidth}px | 滾輪大小: {currentReelSize.width}×{currentReelSize.height}px<br/>
          強制三格一排，最小60px，完全扁平化設計
        </p>
      </div>
    </div>
  );
}
