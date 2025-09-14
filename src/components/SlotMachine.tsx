'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlotMachineProps {
  symbols: string[]; // 可選的圖案列表
  targetSymbols: [string, string, string]; // 最終要停下的圖案 [左, 中, 右]
  onSpinComplete?: () => void; // 旋轉完成回調
  width?: string;
  height?: string;
  className?: string;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  symbols = ['🍎', '🍊', '🍇', '🍓', '🍑', '🍌', '🥝', '🍉'],
  targetSymbols = ['🍎', '🍊', '🍇'],
  onSpinComplete,
  width = '300px',
  height = '200px',
  className = ''
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSymbols, setCurrentSymbols] = useState<[string, string, string]>(['🍎', '🍊', '🍇']);
  const [reelStates, setReelStates] = useState<{
    left: 'idle' | 'spinning' | 'stopped';
    middle: 'idle' | 'spinning' | 'stopped';
    right: 'idle' | 'spinning' | 'stopped';
  }>({
    left: 'idle',
    middle: 'idle',
    right: 'idle'
  });

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

    // 3秒後停止旋轉
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
        onSpinComplete?.();
      }, 600);
    }, 3000);
  };

  // 重置老虎機
  const reset = () => {
    setIsSpinning(false);
    setCurrentSymbols(targetSymbols);
    setReelStates({ left: 'idle', middle: 'idle', right: 'idle' });
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
  };

  // 單個滾輪元件
  const Reel: React.FC<{
    symbol: string;
    state: 'idle' | 'spinning' | 'stopped';
    position: 'left' | 'middle' | 'right';
  }> = ({ symbol, state, position }) => {
    return (
      <div className="reel-container">
        <div className="reel-window">
          <motion.div
            className="reel-content"
            animate={{
              y: state === 'spinning' ? [-20, 20, -20] : 0,
              scale: state === 'spinning' ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: state === 'spinning' ? 0.2 : 0.3,
              repeat: state === 'spinning' ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className="symbol">
              {symbol}
            </div>
          </motion.div>
        </div>
        <div className="reel-frame"></div>
      </div>
    );
  };

  return (
    <div 
      className={`slot-machine ${className}`}
      style={{ width, height }}
    >
      <style jsx>{`
        .slot-machine {
          position: relative;
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border: 4px solid #444;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.5),
            inset 0 2px 10px rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          font-family: 'Arial', sans-serif;
        }

        .reel-container {
          position: relative;
          flex: 1;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reel-window {
          position: relative;
          width: 80px;
          height: 100px;
          background: linear-gradient(145deg, #333, #222);
          border: 3px solid #555;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 
            inset 0 2px 5px rgba(0, 0, 0, 0.5),
            0 2px 5px rgba(255, 255, 255, 0.1);
        }

        .reel-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .symbol {
          font-size: 48px;
          line-height: 1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        .reel-frame {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #666;
          border-radius: 15px;
          pointer-events: none;
        }

        .controls {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .spin-button, .reset-button {
          padding: 8px 16px;
          background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
          border: 2px solid #666;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
        }

        .spin-button:hover:not(:disabled) {
          background: linear-gradient(145deg, #5a5a5a, #3a3a3a);
          transform: translateY(-2px);
        }

        .spin-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reset-button:hover {
          background: linear-gradient(145deg, #5a5a5a, #3a3a3a);
          transform: translateY(-2px);
        }

        .big-win {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(45deg, #ff6b6b, #ffd93d);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 16px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
          animation: bigWinPulse 0.5s ease-in-out infinite alternate;
        }

        @keyframes bigWinPulse {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.1); }
        }

        .reel-container:nth-child(1) .reel-window {
          border-color: #ff6b6b;
        }

        .reel-container:nth-child(2) .reel-window {
          border-color: #4ecdc4;
        }

        .reel-container:nth-child(3) .reel-window {
          border-color: #45b7d1;
        }
      `}</style>

      {/* 大獎標誌 */}
      {!isSpinning && currentSymbols[0] === currentSymbols[1] && currentSymbols[1] === currentSymbols[2] && (
        <div className="big-win">BIG WIN!</div>
      )}

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

      {/* 控制按鈕 */}
      <div className="controls">
        <button 
          className="spin-button"
          onClick={startSpin}
          disabled={isSpinning}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
        <button 
          className="reset-button"
          onClick={reset}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
