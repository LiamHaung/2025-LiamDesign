"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MinimalCosmicTest() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 進度條動畫
    const progressInterval = setInterval(() => {
      setProgressStep(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const timer1 = setTimeout(() => setIsLoaded(true), 3000);
    const timer2 = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => setShowContent(true), 1000);
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(progressInterval);
    };
  }, []);

  // 滾動監聽
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 客戶端檢測和時間更新
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative" style={{
      background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1A3A 50%, #2D1B69 100%)'
    }}>
      {/* 簡潔的深空背景 */}
      <div className="fixed inset-0 z-0">
        {/* 主星雲 - 更柔和 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, rgba(0, 191, 255, 0.15) 0%, transparent 70%)',
               animationDelay: '0s'
             }}></div>
        
        {/* 次星雲 */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
               animationDelay: '3s'
             }}></div>

        {/* 簡潔的星星 - 只保留重要位置的 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: Math.random() > 0.8 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 簡潔的座標顯示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '6px',
        padding: '6px 10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          fontWeight: '400'
        }}>
          <span>{scrollY > 0 ? `${(24.75 + scrollY * 0.0001).toFixed(2)}°N` : '24.75°N'}, {scrollY > 0 ? `${(121.76 + scrollY * 0.0001).toFixed(2)}°E` : '121.76°E'}</span>
        </div>
      </div>

      {/* 簡潔的時間顯示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '6px',
        padding: '6px 10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          fontWeight: '400'
        }}>
          <span>
            {isClient && currentTime ? currentTime.toLocaleString('zh-TW', {
              timeZone: 'Asia/Taipei',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }) : '--:--:--'}
          </span>
        </div>
      </div>

      {/* 簡潔的載入畫面 */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1A3A 50%, #2D1B69 100%)'
        }}>
          {/* 簡潔的載入彈窗 */}
          <div className="relative backdrop-blur-sm w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg mx-auto px-4" style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            {/* 標題列 */}
            <div className="flex items-center justify-between px-4 py-3 absolute top-0 left-0 right-0" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px 6px 0 0'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
                <span className="text-white text-sm font-medium">Loading...</span>
              </div>
            </div>
            
            {/* 內容區域 */}
            <div className="px-6 py-8 pt-16">
              <div className="text-center mb-8">
                <div className="text-xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Liam Design Studio</div>
                <div className="text-sm opacity-60" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>系統啟動中...</div>
              </div>
              
              {/* 簡潔的進度條 */}
              <div className="relative">
                <div className="w-full h-4 border rounded-sm" style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}>
                  <div 
                    className="h-full rounded-sm transition-all duration-100 ease-out"
                    style={{
                      width: `${progressStep}%`,
                      background: 'linear-gradient(90deg, rgba(0, 191, 255, 0.8) 0%, rgba(138, 43, 226, 0.8) 100%)'
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {progressStep}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 載入下方簡潔色bar */}
          <div className="absolute bottom-0 left-0 w-full h-1" style={{ 
            background: 'rgba(255, 255, 255, 0.1)'
          }}>
            <div 
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${progressStep}%`,
                background: 'linear-gradient(90deg, rgba(0, 191, 255, 0.8) 0%, rgba(138, 43, 226, 0.8) 100%)'
              }}
            />
          </div>
        </div>
      )}

      {/* 主要內容 */}
      {isAnimating && (
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="min-h-screen flex items-center justify-center relative">
            {/* 簡潔的中央元素 */}
            <div className="relative mb-8">
              {/* 單一軌道 - 更簡潔 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-40 md:w-96 md:h-48 lg:w-[400px] lg:h-[200px]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 border rounded-full opacity-30" style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-orbit-simple" style={{ 
                    background: 'rgba(0, 191, 255, 0.8)'
                  }}></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full animate-orbit-simple-reverse" style={{ 
                    background: 'rgba(138, 43, 226, 0.8)'
                  }}></div>
                </div>
              </div>

              {/* 中央核心 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full opacity-40" style={{ 
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                  }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ 
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="mb-12">
              <div className="w-32 h-32 mx-auto flex items-center justify-center relative group">
                <Image
                  src="/cursor-07.png"
                  alt="Liam Logo"
                  width={160}
                  height={160}
                  className="relative z-10"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
                  }}
                />
              </div>
            </div>

            {/* 主標題 - 更簡潔 */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8" style={{ 
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}>
              Welcome
            </h1>

            {/* 副標題 - 更簡潔 */}
            <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto" style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              lineHeight: '1.6'
            }}>
              設計不是等待靈感，而是立刻開始。<br />
              點進來，讓我們今天就動手。
            </p>

            {/* 按鈕 - 更簡潔 */}
            <div className="flex justify-center mb-16">
              <button className="group px-8 md:px-12 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden" style={{ 
                background: 'linear-gradient(45deg, rgba(0, 191, 255, 0.8) 0%, rgba(138, 43, 226, 0.8) 100%)',
                paddingTop: '16px', 
                paddingBottom: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <span className="relative z-10">Explore Portfolio</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ 
                  background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.9) 0%, rgba(0, 191, 255, 0.9) 100%)'
                }}></div>
              </button>
            </div>

            {/* 標籤 - 更簡潔 */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105" style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                #OwnTheDay
              </div>
              <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105" style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                #GoLiveToday
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS 動畫 - 更簡潔 */}
      <style jsx>{`
        /* 簡潔的閃爍動畫 */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        
        /* 簡潔的軌道動畫 */
        @keyframes orbit-simple {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        @keyframes orbit-simple-reverse {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(200px) rotate(360deg); }
        }
        
        .animate-orbit-simple { animation: orbit-simple 20s linear infinite; }
        .animate-orbit-simple-reverse { animation: orbit-simple-reverse 25s linear infinite; }
        
        /* RWD 響應式調整 */
        @media (max-width: 768px) {
          .animate-orbit-simple { animation-duration: 15s; }
          .animate-orbit-simple-reverse { animation-duration: 18s; }
        }
        
        @media (max-width: 480px) {
          .animate-orbit-simple { animation-duration: 12s; }
          .animate-orbit-simple-reverse { animation-duration: 15s; }
        }
      `}</style>
    </div>
  );
}

