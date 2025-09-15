'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ReelSlotMachineProps {
  icons: [string, string, string]; // 三個圖標
  className?: string;
}

const ReelSlotMachine: React.FC<ReelSlotMachineProps> = ({
  icons = ['/liam-flow-02.png', '/liam-flow-03.png', '/liam-flow-04.png'],
  className = ''
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
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

    // 5秒後停止旋轉
    setTimeout(() => {
      // 依序停止滾輪
      setTimeout(() => {
        setReelStates(prev => ({ ...prev, left: 'stopped' }));
      }, 500);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, middle: 'stopped' }));
      }, 1000);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, right: 'stopped' }));
        setIsSpinning(false);
      }, 1500);
    }, 5000);
  };

  // 只播放一次，不循環 - 添加初始延遲讓動畫從靜止開始
  useEffect(() => {
    // 延遲1秒後開始動畫
    const initialDelay = setTimeout(() => {
      startSpin();
    }, 1000);

    return () => clearTimeout(initialDelay);
  }, []);

  // 單個滾輪元件 - 真正的滾輪邏輯
  const Reel: React.FC<{
    icon: string;
    state: 'idle' | 'spinning' | 'stopped';
    position: 'left' | 'middle' | 'right';
  }> = ({ icon, state, position }) => {
    // 根據位置設定初始顯示比例
    const getInitialY = () => {
      switch(position) {
        case 'left': return '60%';   // 露出下方40%
        case 'middle': return '40%'; // 露出下方60%
        case 'right': return '20%';  // 露出下方80%
        default: return '0%';
      }
    };

    // 滾輪動畫：從初始位置滾動到正常位置，然後上下移動
    const getAnimateY = () => {
      if (state === 'idle') {
        return getInitialY(); // 保持初始位置
      } else if (state === 'spinning') {
        return [getInitialY(), '0%', '-20%', '20%', '-10%', '10%', '0%']; // 滾動 + 上下移動
      } else {
        return '0%'; // 停止在正常位置
      }
    };

    return (
      <div className="reel-container">
        <div className="reel-mask">
          <motion.div
            className="reel-content"
            initial={{ y: getInitialY() }}
            animate={{ y: getAnimateY() }}
            transition={{
              duration: state === 'spinning' ? 0.8 : 1.2,
              repeat: state === 'spinning' ? Infinity : 0,
              ease: state === 'spinning' ? [0.25, 0.1, 0.25, 1] : [0.4, 0, 0.2, 1],
            }}
          >
            <div className="reel-icon">
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
    <div className={`reel-slot-machine ${className}`}>
      <style jsx>{`
        .reel-slot-machine {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          padding: 20px;
          background: transparent;
        }

        .reel-container {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reel-mask {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .reel-content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reel-icon {
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

        /* 響應式設計 - 桌面版 */
        @media (min-width: 1024px) {
          .reel-container {
            width: 800px;
            height: 800px;
            gap: 120px;
            padding: 120px;
          }
        }

        /* 響應式設計 - 大桌面版 */
        @media (min-width: 1440px) {
          .reel-container {
            width: 1000px;
            height: 1000px;
            gap: 150px;
            padding: 150px;
          }
        }

        /* 響應式設計 - 平板版 */
        @media (max-width: 1023px) and (min-width: 769px) {
          .reel-container {
            width: 150px;
            height: 150px;
            gap: 30px;
            padding: 20px;
          }
        }

        /* 響應式設計 - 手機版 */
        @media (max-width: 768px) {
          .reel-container {
            width: 100px;
            height: 100px;
            gap: 15px;
            padding: 15px;
          }
        }

        /* 響應式設計 - 小手機版 */
        @media (max-width: 480px) {
          .reel-container {
            width: 80px;
            height: 80px;
            gap: 10px;
            padding: 10px;
          }
        }

        /* 響應式設計 - 超小手機版 */
        @media (max-width: 360px) {
          .reel-container {
            width: 70px;
            height: 70px;
            gap: 8px;
            padding: 8px;
          }
        }
      `}</style>

      <Reel icon={icons[0]} state={reelStates.left} position="left" />
      <Reel icon={icons[1]} state={reelStates.middle} position="middle" />
      <Reel icon={icons[2]} state={reelStates.right} position="right" />
    </div>
  );
};

export default ReelSlotMachine;
