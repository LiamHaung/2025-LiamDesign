'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TigerMachineV2Props {
  icons: [string, string, string]; // 三個圖標
  className?: string;
}

const TigerMachineV2: React.FC<TigerMachineV2Props> = ({
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

  // 所有可用的圖標
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
    
    // 依序啟動三個滾輪
    setTimeout(() => {
      setReelStates(prev => ({ ...prev, left: 'spinning' }));
    }, 500);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, middle: 'spinning' }));
    }, 1000);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, right: 'spinning' }));
    }, 1500);

    // 旋轉過程中隨機切換圖標
    let startTime = Date.now();
    const spinDuration = 5000; // 5秒旋轉時間
    
    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // 使用貝茲曲線計算間隔時間
      const bezierProgress = 1 - Math.pow(1 - progress, 3);
      const currentInterval = 195 + (2636 - 195) * bezierProgress;
      
      setCurrentIcons([
        getRandomIcon(),
        getRandomIcon(),
        getRandomIcon()
      ]);
      
      if (elapsed >= spinDuration) {
        clearInterval(spinInterval);
      }
    }, 195);

    // 5秒後停止旋轉
    setTimeout(() => {
      clearInterval(spinInterval);
      
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
    const initialDelay = setTimeout(() => {
      startSpin();
    }, 1000);

    return () => clearTimeout(initialDelay);
  }, []);

  // 單個滾輪元件 - 真正的滾輪效果
  const Reel: React.FC<{
    icon: string;
    state: 'idle' | 'spinning' | 'stopped';
    position: 'left' | 'middle' | 'right';
  }> = ({ icon, state, position }) => {
    // 根據位置設定不同的初始顯示比例
    const getInitialClipPath = () => {
      switch(position) {
        case 'left': return 'inset(60% 0 0 0)';   // 顯示下方40%
        case 'middle': return 'inset(40% 0 0 0)'; // 顯示下方60%
        case 'right': return 'inset(20% 0 0 0)';  // 顯示下方80%
        default: return 'inset(0 0 0 0)';
      }
    };

    // 根據位置設定不同的動畫效果
    const getAnimationY = () => {
      if (state === 'spinning') {
        // 滾動動畫：從上到下滾動
        return [0, -100, 0]; // 可以調整滾動距離
      }
      return 0;
    };

    return (
      <div className="reel-container">
        <div className="reel-mask">
          <motion.div
            className="reel-content"
            initial={{ 
              clipPath: getInitialClipPath(),
              y: 0
            }}
            animate={{
              clipPath: state === 'spinning' ? 'inset(0 0 0 0)' : getInitialClipPath(),
              y: getAnimationY()
            }}
            transition={{
              duration: state === 'spinning' ? 2.0 : 1.0,
              repeat: state === 'spinning' ? Infinity : 0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="icon">
              <Image
                src={icon}
                alt="Icon"
                width={800}
                height={800}
                className="icon-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className={`tiger-machine-v2 ${className}`}>
      <style jsx>{`
        .tiger-machine-v2 {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          padding: 20px;
          background: transparent;
        }

        .reel-container {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 3px solid #333;
          border-radius: 10px;
          background: #f8f9fa;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
        }

        .reel-mask {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 7px;
        }

        .reel-content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        /* 響應式設計 */
        @media (min-width: 1024px) {
          .reel-container {
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .reel-container {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .reel-container {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>

      <Reel icon={currentIcons[0]} state={reelStates.left} position="left" />
      <Reel icon={currentIcons[1]} state={reelStates.middle} position="middle" />
      <Reel icon={currentIcons[2]} state={reelStates.right} position="right" />
    </div>
  );
};

export default TigerMachineV2;
