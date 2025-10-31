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
const getReelSize = (screenWidth: number, containerWidth?: number) => {
  const isMobile = screenWidth <= 768;
  // 使用容器寬度而不是螢幕寬度
  const effectiveWidth = containerWidth || screenWidth;
  const sidePadding = isMobile ? 24 : 40;       // 左右外邊距預留
  const containerPadding = isMobile ? 12 : 20;  // 容器內邊距預留
  const gapsTotal = isMobile ? 8 * 2 : 10 * 2;  // 三個滾輪兩個間距
  const availableWidth = effectiveWidth - sidePadding - containerPadding - gapsTotal;
  const reelWidth = Math.max(60, Math.floor(availableWidth / 3));
  return {
    width: reelWidth,
    height: reelWidth
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
      // 獲取父容器的寬度
      const parentElement = document.querySelector('.slot-machine-container');
      const containerWidth = parentElement ? parentElement.clientWidth : window.innerWidth;
      const newSize = getReelSize(window.innerWidth, containerWidth);
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
      border: '6px solid #003EC3',
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
              width={reelSize.width - 16} 
              height={reelSize.height - 16} 
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
  
  // 彈出式視窗狀態
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  // 手動控制狀態（固定為手動模式）
  const [reelSpinning, setReelSpinning] = useState([false, false, false]);
  const [stopRequested, setStopRequested] = useState(false);

  // 鎖定背景滾動
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

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

                                // 如果是最後一個滾輪，檢查結果並顯示彈窗
        if (reelIndex === 2) {
          setTimeout(() => {
            setIsSpinning(false);
            setStopRequested(false);
            
            // 檢查三個滾輪是否相同
            const randomIndex = Math.floor(Math.random() * images.length);
            setFinalImageIndices(prev => {
              const finalIndices = [...prev];
              finalIndices[2] = randomIndex;
              
              // 不論結果如何，都顯示相同的訊息
              const message = '別被影響 去做你想做的事吧！\nwhatever happens keep going';
              
              // 1秒後顯示彈窗
              setTimeout(() => {
                setPopupMessage(message);
                setShowPopup(true);
                
                // 1秒後自動關閉彈窗
                setTimeout(() => {
                  setShowPopup(false);
                }, 1000);
              }, 1000);
              
              return finalIndices;
            });
          }, 100);
        }
      }, index * 800); // 每個滾輪間隔 800ms
    });
  };

  const handleReelComplete = () => {
    // 在手動模式下，不使用自動完成邏輯
  };

    return (
    <div className={className} style={{
      ...style,
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden' // 防止內容溢出
    }}>
      {/* 彈出式視窗 */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="win98-window relative" style={{
            width: '400px',
            maxWidth: '95vw',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
            overflow: 'hidden'
          }}>
            {/* Windows 98 標題列 */}
            <div className="win98-titlebar" style={{
              background: 'linear-gradient(90deg, #003EC3 0%, #002A8A 100%)',
              color: 'white',
              padding: '4px 6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontWeight: 'bold'
            }}>
              <div className="flex items-center space-x-2">
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  border: '1px inset #c0c0c0'
                }}></div>
                <span>Slot Result</span>
              </div>
            </div>
            
            {/* Windows 98 內容區域 */}
            <div style={{
              background: '#2a2a2a',
              color: 'white',
              padding: 'clamp(20px, 4vw, 32px)',
              fontSize: 'clamp(18px, 4vw, 28px)',
              lineHeight: '1.4',
              border: '2px inset #c0c0c0',
              margin: '2px',
              textAlign: 'center',
              fontWeight: '800',
              whiteSpace: 'pre-line'
            }}>
              {popupMessage}
            </div>
          </div>
        </div>
      )}

      {/* 精神標語 */}
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
          fontWeight: 800,
          color: '#000',
          marginBottom: '12px',
          lineHeight: '1.4',
          whiteSpace: 'nowrap', // 強制不換行，保持橫排
          overflow: 'hidden', // 隱藏溢出內容
          textOverflow: 'ellipsis', // 如果文字太長顯示省略號
          width: '100%',
          fontFamily: 'Noto Sans, sans-serif'
        }}>
          ＃昨天已經過去，明天尚未到來，今天仍是未知！
        </div>
        <div style={{
          fontSize: 'clamp(14px, 3vw, 24px)', // 調整最小字體從16px到14px
          fontWeight: 'bold',
          color: '#FFFFF3',
          backgroundColor: '#003EC3',
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '6px',
          letterSpacing: '1px',
          lineHeight: '1.4',
          whiteSpace: 'nowrap', // 強制不換行，保持橫排
          overflow: 'hidden', // 隱藏溢出內容
          textOverflow: 'ellipsis' // 如果文字太長顯示省略號
        }}>
          三個都一樣的話 會有幸運的一天？
        </div>
      </div>



      {/* 老虎機滾輪容器 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {/* 滾輪區域 */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          width: '100%',
          maxWidth: '100%',
          padding: '0 12px'
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
            backgroundColor: (!isSpinning || stopRequested) ? '#6c757d' : '#000'
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
          max-width: 100%;
          margin-top: 30px;
          gap: 10px;
          padding: 0 20px;
          box-sizing: border-box;
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
          opacity: 1;
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