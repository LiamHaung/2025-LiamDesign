'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface IconSlotMachineProps {
  icons: [string, string, string]; // 三個圖標
  className?: string;
}

const IconSlotMachine: React.FC<IconSlotMachineProps> = ({
  icons = ['/liam-flow-02.png', '/liam-flow-03.png', '/liam-flow-04.png'],
  className = ''
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIcons, setCurrentIcons] = useState<[string, string, string]>(icons);
  const [reelStates, setReelStates] = useState<{
    left: 'idle' | 'spinning' | 'stopped';
    middle: 'idle' | 'spinning' | 'stopped';
    right: 'idle' | 'spinning' | 'stopped';
  }>({
    left: 'idle',
    middle: 'idle',
    right: 'idle'
  });

  // 所有可用的圖標（包含 liam-flow.png）
  const allIcons = ['/liam-flow.png', '/liam-flow-02.png', '/liam-flow-03.png', '/liam-flow-04.png'];

  // 隨機選擇一個圖標
  const getRandomIcon = () => {
    return allIcons[Math.floor(Math.random() * allIcons.length)];
  };

  // 開始旋轉
  const startSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setReelStates({ left: 'idle', middle: 'idle', right: 'idle' });
    
    // 依序啟動三個滾輪 - 更慢的間隔時間，總共7秒時間軸
    setTimeout(() => {
      setReelStates(prev => ({ ...prev, left: 'spinning' }));
    }, 500);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, middle: 'spinning' }));
    }, 1000);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, right: 'spinning' }));
    }, 1500);

    // 旋轉過程中隨機切換圖標 - 使用貝茲曲線讓速度遞減，中間段再慢30%
    let startTime = Date.now();
    const spinDuration = 5000; // 5秒旋轉時間
    
    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // 使用貝茲曲線計算間隔時間：從慢(195ms)到極慢(2636ms)
      // 貝茲曲線: cubic-bezier(0.25, 0.1, 0.25, 1) 對應 ease-out
      const bezierProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const currentInterval = 195 + (2636 - 195) * bezierProgress; // 從195ms到2636ms（中間段再慢30%）
      
      setCurrentIcons([
        getRandomIcon(),
        getRandomIcon(),
        getRandomIcon()
      ]);
      
      // 如果旋轉時間結束，清除間隔
      if (elapsed >= spinDuration) {
        clearInterval(spinInterval);
      }
    }, 195); // 初始間隔195ms

    // 5秒後停止旋轉 - 總時間軸7秒，旋轉5秒
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // 依序停止滾輪，但最終同時定格 - 更慢的停止間隔
      setTimeout(() => {
        setReelStates(prev => ({ ...prev, left: 'stopped' }));
        setCurrentIcons(prev => [icons[0], prev[1], prev[2]]);
      }, 500);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, middle: 'stopped' }));
        setCurrentIcons(prev => [prev[0], icons[1], prev[2]]);
      }, 1000);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, right: 'stopped' }));
        setCurrentIcons(icons);
        setIsSpinning(false);
      }, 1500);
    }, 5000);
  };

  // 只播放一次，不循環
  useEffect(() => {
    // 立即開始第一次旋轉
    startSpin();
  }, []);

  // 單個滾輪元件 - 使用貝茲曲線的上下輪轉動畫
  const Reel: React.FC<{
    icon: string;
    state: 'idle' | 'spinning' | 'stopped';
  }> = ({ icon, state }) => {
    return (
      <div className="reel-container">
        <motion.div
          className="reel-content"
          animate={{
            y: state === 'spinning' ? [-30, 30, -30] : 0, // 上下幅度30px
          }}
          transition={{
            duration: state === 'spinning' ? 1.0 : 1.2,
            repeat: state === 'spinning' ? Infinity : 0,
            ease: [0.25, 0.1, 0.25, 1], // 貝茲曲線：從快到慢
          }}
        >
          <div className="icon">
            <Image
              src={icon}
              alt="Icon"
              width={800} // 增加圖片原始尺寸
              height={800} // 增加圖片原始尺寸
              className="icon-image"
            />
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`icon-slot-machine ${className}`}>
      <style jsx>{`
        .icon-slot-machine {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          padding: 20px;
          background: transparent;
          width: 100%;
          max-width: 100%;
        }

        .reel-container {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 0 0 auto;
        }

        .reel-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
          transition: all 0.3s ease;
        }

        .icon-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
        }

        /* 響應式設計 - 桌面版 - 比手機大8倍 */
        @media (min-width: 1024px) {
          .icon-slot-machine {
            gap: 120px; /* 手機版15px × 8 = 120px */
            padding: 120px; /* 手機版15px × 8 = 120px */
          }
          
          .reel-container {
            width: 800px; /* 手機版100px × 8 = 800px */
            height: 800px; /* 手機版100px × 8 = 800px */
          }
        }

        /* 響應式設計 - 大桌面版 - 比手機大10倍 */
        @media (min-width: 1440px) {
          .icon-slot-machine {
            gap: 150px; /* 手機版15px × 10 = 150px */
            padding: 150px; /* 手機版15px × 10 = 150px */
          }
          
          .reel-container {
            width: 1000px; /* 手機版100px × 10 = 1000px */
            height: 1000px; /* 手機版100px × 10 = 1000px */
          }
        }

        /* 響應式設計 - 平板版 */
        @media (max-width: 1023px) and (min-width: 769px) {
          .icon-slot-machine {
            gap: 30px;
            padding: 20px;
          }
          
          .reel-container {
            width: 150px;
            height: 150px;
          }
        }

        /* 響應式設計 - 手機版 (基準尺寸) */
        @media (max-width: 768px) {
          .icon-slot-machine {
            gap: 15px;
            padding: 15px;
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: center;
          }
          
          .reel-container {
            width: 100px;
            height: 100px;
            flex-shrink: 0;
          }
        }

        /* 響應式設計 - 小手機版 */
        @media (max-width: 480px) {
          .icon-slot-machine {
            gap: 10px;
            padding: 10px;
          }
          
          .reel-container {
            width: 80px;
            height: 80px;
          }
        }

        /* 響應式設計 - 超小螢幕 */
        @media (max-width: 360px) {
          .icon-slot-machine {
            gap: 8px;
            padding: 8px;
          }
          
          .reel-container {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>

      {/* 三個滾輪 */}
      <Reel 
        icon={currentIcons[0]} 
        state={reelStates.left} 
      />
      <Reel 
        icon={currentIcons[1]} 
        state={reelStates.middle} 
      />
      <Reel 
        icon={currentIcons[2]} 
        state={reelStates.right} 
      />
    </div>
  );
};

export default IconSlotMachine;
