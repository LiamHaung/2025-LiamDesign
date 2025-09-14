'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SimpleSlotMachineProps {
  symbols: [string, string, string]; // 三個圖案
  targetSymbols: [string, string, string]; // 最終要停下的圖案
  autoStart?: boolean; // 是否自動開始
  interval?: number; // 自動重複間隔（毫秒）
  spinDuration?: number; // 單次旋轉持續時間（毫秒）
  className?: string;
}

const SimpleSlotMachine: React.FC<SimpleSlotMachineProps> = ({
  symbols = ['🔥', '⚙️', '🧠'],
  targetSymbols = ['🔥', '⚙️', '🧠'],
  autoStart = true,
  interval = 5000, // 5秒重複一次
  spinDuration = 3000, // 3秒旋轉時間
  className = ''
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSymbols, setCurrentSymbols] = useState<[string, string, string]>(symbols);
  const [reelStates, setReelStates] = useState<{
    left: 'idle' | 'spinning' | 'stopped';
    middle: 'idle' | 'spinning' | 'stopped';
    right: 'idle' | 'spinning' | 'stopped';
  }>({
    left: 'idle',
    middle: 'idle',
    right: 'idle'
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 隨機選擇一個圖案
  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  // 開始旋轉
  const startSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setReelStates({ left: 'idle', middle: 'idle', right: 'idle' });
    
    // 依序啟動三個滾輪
    setTimeout(() => {
      setReelStates(prev => ({ ...prev, left: 'spinning' }));
    }, 200);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, middle: 'spinning' }));
    }, 600);

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, right: 'spinning' }));
    }, 1000);

    // 旋轉過程中隨機切換圖案
    const spinInterval = setInterval(() => {
      setCurrentSymbols([
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
      ]);
    }, 100);

    // 停止旋轉
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // 依序停止滾輪，但最終同時定格
      setTimeout(() => {
        setReelStates(prev => ({ ...prev, left: 'stopped' }));
        setCurrentSymbols(prev => [targetSymbols[0], prev[1], prev[2]]);
      }, 200);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, middle: 'stopped' }));
        setCurrentSymbols(prev => [prev[0], targetSymbols[1], prev[2]]);
      }, 400);

      setTimeout(() => {
        setReelStates(prev => ({ ...prev, right: 'stopped' }));
        setCurrentSymbols(targetSymbols);
        setIsSpinning(false);
      }, 600);
    }, spinDuration);
  };

  // 自動重複旋轉
  useEffect(() => {
    if (autoStart) {
      // 立即開始第一次旋轉
      startSpin();
      
      // 設置定時器重複旋轉
      intervalRef.current = setInterval(() => {
        startSpin();
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (spinTimeoutRef.current) {
          clearTimeout(spinTimeoutRef.current);
        }
      };
    }
  }, [autoStart, interval, spinDuration]);

  // 單個滾輪元件
  const Reel: React.FC<{
    symbol: string;
    state: 'idle' | 'spinning' | 'stopped';
    position: 'left' | 'middle' | 'right';
  }> = ({ symbol, state, position }) => {
    return (
      <div className="reel-container">
        <motion.div
          className="reel-content"
          animate={{
            y: state === 'spinning' ? [-15, 15, -15] : 0,
            scale: state === 'spinning' ? [1, 1.1, 1] : 1,
            rotate: state === 'spinning' ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: state === 'spinning' ? 0.3 : 0.5,
            repeat: state === 'spinning' ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <div className="symbol">
            {symbol}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`simple-slot-machine ${className}`}>
      <style jsx>{`
        .simple-slot-machine {
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
          background: transparent;
        }

        .reel-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .symbol {
          font-size: 80px;
          line-height: 1;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
          transition: all 0.3s ease;
        }

        /* 響應式設計 */
        @media (max-width: 768px) {
          .simple-slot-machine {
            gap: 20px;
            padding: 10px;
          }
          
          .reel-container {
            width: 80px;
            height: 80px;
          }
          
          .symbol {
            font-size: 50px;
          }
        }

        @media (max-width: 480px) {
          .simple-slot-machine {
            gap: 15px;
          }
          
          .reel-container {
            width: 60px;
            height: 60px;
          }
          
          .symbol {
            font-size: 40px;
          }
        }
      `}</style>

      {/* 三個滾輪 */}
      <Reel 
        symbol={currentSymbols[0]} 
        state={reelStates.left} 
        position="left" 
      />
      <Reel 
        symbol={currentSymbols[1]} 
        state={reelStates.middle} 
        position="middle" 
      />
      <Reel 
        symbol={currentSymbols[2]} 
        state={reelStates.right} 
        position="right" 
      />
    </div>
  );
};

export default SimpleSlotMachine;
