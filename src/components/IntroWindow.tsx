'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: {
    chinese: string;
    english: string;
  };
  showProgress?: boolean;
  progressDuration?: number;
  className?: string;
}

export default function IntroWindow({ 
  isOpen, 
  onClose, 
  title = "Liam Design Studio - Intro",
  content = {
    chinese: "設計不是等待靈感，而是立刻開始。\n點進來，讓我們今天就動手。",
    english: "Design isn't about waiting for inspiration.\nClick in — let's start today."
  },
  showProgress = true,
  progressDuration = 3000,
  className = ''
}: IntroWindowProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(showProgress);

  // 進度條動畫
  useEffect(() => {
    if (!isLoading || !isOpen) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, progressDuration / 50);

    return () => clearInterval(interval);
  }, [isLoading, isOpen, progressDuration]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={onClose}
          />
          
          {/* Windows 98 視窗 */}
          <motion.div
            className={`win98-window relative ${className}`}
            style={{
              width: '960px',
              maxWidth: '95vw',
              maxHeight: '90vh',
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
              overflow: 'hidden',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Windows 98 標題列 */}
            <div className="win98-titlebar" style={{
              background: 'linear-gradient(90deg, #003EC3 0%, #002A8A 100%)',
              color: 'white',
              padding: '4px 6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'clamp(14px, 4vw, 22px)',
              fontWeight: 'bold'
            }}>
              <div className="flex items-center space-x-2">
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  border: '1px inset #c0c0c0'
                }}></div>
                <span>{title}</span>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-red-500 hover:border-red-600 transition-colors duration-200"
                title="關閉視窗"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
            
            {/* Windows 98 內容區域 */}
            <div style={{
              background: '#2a2a2a',
              color: 'white',
              padding: 'clamp(16px, 4vw, 32px)',
              fontSize: 'clamp(14px, 3.5vw, 22px)',
              lineHeight: '1.4',
              border: '2px inset #c0c0c0',
              margin: '2px',
              overflow: 'auto',
              maxHeight: 'calc(90vh - 120px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* 文字內容區域 */}
              <div style={{ flex: '1' }}>
                {/* 中文介紹 */}
                <div style={{ 
                  marginBottom: 'clamp(16px, 4vw, 24px)',
                  textAlign: 'center',
                  fontSize: 'clamp(14px, 3.5vw, 22px)',
                  whiteSpace: 'pre-line'
                }}>
                  {content.chinese}
                </div>
                
                {/* 英文介紹 */}
                <div style={{
                  borderTop: '3px solid white',
                  paddingTop: 'clamp(12px, 3vw, 20px)',
                  textAlign: 'center',
                  fontSize: 'clamp(12px, 3vw, 20px)',
                  whiteSpace: 'pre-line'
                }}>
                  {content.english}
                </div>
              </div>

              {/* Loading 進度條區域 */}
              {isLoading && (
                <motion.div
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '2px inset #c0c0c0',
                    padding: 'clamp(8px, 2vw, 16px)',
                    marginTop: 'clamp(16px, 4vw, 24px)',
                    flexShrink: 0
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div style={{
                    fontSize: 'clamp(10px, 2.5vw, 14px)',
                    marginBottom: 'clamp(4px, 1vw, 8px)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-press-start-2p), monospace',
                    textShadow: '2px 2px 0px #000000',
                    textAlign: 'center'
                  }}>
                    Loading... {Math.floor(loadingProgress)}%
                  </div>
                  
                  {/* 分格式進度條 */}
                  <div style={{
                    width: '100%',
                    height: 'clamp(16px, 4vw, 24px)',
                    background: '#000000',
                    border: '2px inset #c0c0c0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #00ff00 0%, #ffff00 50%, #ff0000 100%)',
                        width: `${loadingProgress}%`,
                        transition: 'width 0.1s ease-out'
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                    />
                    
                    {/* 進度條文字 */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: '#000000',
                      fontSize: 'clamp(8px, 2vw, 12px)',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-press-start-2p), monospace',
                      textShadow: '1px 1px 0px #ffffff'
                    }}>
                      {Math.floor(loadingProgress)}%
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 完成後的按鈕區域 */}
              {!isLoading && (
                <motion.div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 'clamp(16px, 4vw, 24px)',
                    flexShrink: 0
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={onClose}
                    className="bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 hover:border-gray-500 active:bg-gray-500 active:border-gray-600 px-6 py-3 font-bold text-lg transition-all duration-150 shadow-md"
                    style={{ 
                      fontFamily: 'var(--font-zpix), monospace',
                      color: '#000000',
                      textShadow: '1px 1px 0px #ffffff',
                      fontSize: 'clamp(12px, 2.5vw, 16px)'
                    }}
                  >
                    🚀 開始探索
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
