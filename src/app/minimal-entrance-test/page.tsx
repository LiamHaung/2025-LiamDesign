"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MinimalEntranceTest() {
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
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* 奇幻透明風格座標元件 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 62, 195, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: '#fffff3',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{scrollY > 0 ? `${(24.75 + scrollY * 0.0001).toFixed(2)}°N` : '24.75°N'}, {scrollY > 0 ? `${(121.76 + scrollY * 0.0001).toFixed(2)}°E` : '121.76°E'}</span>
        </div>
      </div>

      {/* 台北時間顯示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 62, 195, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: '#fffff3',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>
            {isClient && currentTime ? currentTime.toLocaleString('zh-TW', {
              timeZone: 'Asia/Taipei',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }) : '--:--:--'}
          </span>
        </div>
      </div>
      {/* 像素奇幻透明風格載入畫面 */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900" style={{ zIndex: 9999 }}>
          {/* 像素奇幻彈窗 */}
          <div className="relative backdrop-blur-sm w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg mx-auto px-4" style={{ 
            backgroundColor: 'rgba(0, 62, 195, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 62, 195, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            {/* 標題列 */}
            <div className="flex items-center justify-between px-4 py-3 absolute top-0 left-0 right-0" style={{ 
              backgroundColor: '#003EC3',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px 6px 0 0'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}></div>
                <span className="pixel-text text-white text-sm font-bold">Loading...</span>
              </div>
            </div>
            
            {/* 內容區域 */}
            <div className="px-6 py-8 pt-16">
              <div className="text-white text-center mb-8">
                <div className="text-xl font-bold mb-3" style={{ color: '#fffff3' }}>Liam Design Studio</div>
                <div className="text-sm opacity-80">伺服器搭建中...</div>
              </div>
              
              {/* 像素長條進度條 */}
              <div className="relative">
                <div className="w-full h-6 border-2 rounded-sm" style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                  <div 
                    className="h-full rounded-sm transition-all duration-100 ease-out"
                    style={{
                      width: `${progressStep}%`,
                      backgroundColor: '#003EC3',
                      boxShadow: '0 0 10px rgba(0, 62, 195, 0.5)'
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="pixel-text text-white text-xs font-bold" style={{ textShadow: '0 0 4px rgba(0, 0, 0, 0.8)' }}>
                    {progressStep}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading下方全寬色bar */}
          <div className="absolute bottom-0 left-0 w-full h-2" style={{ backgroundColor: '#003EC3' }}>
            <div 
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${progressStep}%`,
                backgroundColor: '#003EC3',
                opacity: 1
              }}
            />
          </div>
        </div>
      )}

      {/* 主要內容 */}
      {isAnimating && (
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="min-h-screen flex items-center justify-center relative">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 overflow-hidden z-0">
              {/* 漸變圓圈 */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(0, 62, 195, 0.1)' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', backgroundColor: 'rgba(0, 62, 195, 0.08)' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', backgroundColor: 'rgba(0, 62, 195, 0.05)' }}></div>
              
              {/* 小星星 */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: '#003EC3',
                    fontSize: `${8 + Math.random() * 8}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    transform: 'rotate(45deg)'
                  }}
                >
                  ✦
                </div>
              ))}
              
              {/* 流星 - 星星形狀帶blur效果 */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={`meteor-${i}`}
                  className="absolute z-50"
                  style={{
                    left: `${5 + i * 20}%`,
                    bottom: `${5 + i * 15}%`,
                    width: '20px',
                    height: '20px',
                    color: 'white',
                    fontSize: '20px',
                    animation: `meteorStarBlur ${3 + Math.random() * 2}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                >
                  ✦
                </div>
              ))}
            </div>

            {/* 內容區域 */}
            <div className="text-center z-10 max-w-5xl mx-auto px-8">
              {/* 多軌道星球動畫系統 */}
              <div className="relative mb-8">
                {/* 軌道6 - 最外層 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-40 md:w-96 md:h-48 lg:w-[500px] lg:h-[250px]">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.2)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-orbit-6" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full animate-orbit-6-reverse" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>
                </div>
                
                {/* 軌道5 */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-72 h-36 md:w-84 md:h-42 lg:w-96 lg:h-48">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.25)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-orbit-5" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full animate-orbit-5-reverse" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>
                </div>
                
                {/* 軌道4 */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-64 h-32 md:w-72 md:h-36 lg:w-80 lg:h-40">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.3)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full animate-orbit-4" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-1 w-2 h-2 rounded-full animate-orbit-4-reverse" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>
                </div>
                
                {/* 軌道3 */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-56 h-28 md:w-60 md:h-30 lg:w-64 lg:h-32">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.35)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full animate-orbit-3" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-1 w-2 h-2 rounded-full animate-orbit-3-reverse" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>
                </div>
                
                {/* 軌道2 */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 h-24 md:w-48 md:h-24 lg:w-48 lg:h-24">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.4)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full animate-orbit-2" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-1 w-2.5 h-2.5 rounded-full animate-orbit-2-reverse" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>
                </div>
                
                {/* 軌道1 - 最內層 */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-20 md:w-40 md:h-20 lg:w-40 lg:h-20">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: 'rgba(0, 62, 195, 0.5)' }}></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full animate-orbit-1" style={{ backgroundColor: '#003EC3' }}></div>
                    <div className="absolute top-0 right-1 w-2.5 h-2.5 rounded-full animate-orbit-1-reverse" style={{ backgroundColor: '#003EC3' }}></div>
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
                  />
                </div>
              </div>

              {/* 主標題 */}
              <h1 className="text-6xl md:text-8xl font-bold mb-8" style={{ color: '#fffff3' }}>
                <span style={{ color: '#003EC3' }}>
                  Welcome
                </span>
              </h1>

              {/* 副標題 */}
              <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto" style={{ color: '#fffff3', fontWeight: '800' }}>
                設計不是等待靈感，而是立刻開始。<br />
                點進來，讓我們今天就動手。
              </p>

              {/* 按鈕 */}
              <div className="flex justify-center mb-16">
                <button 
                  onClick={() => {
                    // 淡出轉場效果
                    document.body.style.transition = 'opacity 0.8s ease-out';
                    document.body.style.opacity = '0';
                    
                    // 等待淡出完成後跳轉
                    setTimeout(() => {
                      window.location.href = '/hero-simple-test';
                    }, 800);
                  }}
                  className="group px-6 md:px-10 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden animate-pulse-breathing cursor-pointer" 
                  style={{ backgroundColor: '#003EC3', paddingTop: '14px', paddingBottom: '14px' }}
                >
                  <span className="relative z-10">Explore Portfolio</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#003EC3' }}></div>
                </button>
              </div>

              {/* 標籤 */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105" style={{ color: '#fffff3' }}>
                  #OwnTheDay
                </div>
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105" style={{ color: '#fffff3' }}>
                  #GoLiveToday
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      
      {/* CSS 動畫 */}
      <style jsx>{`
        /* 像素字體效果 */
        .pixel-text {
          font-family: 'Courier New', monospace;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-rendering: optimizeSpeed;
          font-smooth: never;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
        }
        
        /* 進度條動畫 */
        @keyframes progressFill {
          0% {
            background-color: #C0C0C0;
            color: #808080;
          }
          100% {
            background-color: #FFFFFF;
            color: #000000;
          }
        }
        
        .progress-step {
          animation: progressFill 0.5s ease-in-out forwards;
        }
        
        @keyframes meteorStarBlur {
          0% {
            opacity: 0;
            transform: translateX(-200px) translateY(200px) rotate(45deg);
            filter: blur(3px);
          }
          20% {
            opacity: 0.3;
            transform: translateX(-100px) translateY(100px) rotate(45deg);
            filter: blur(2px);
          }
          50% {
            opacity: 1;
            transform: translateX(0px) translateY(0px) rotate(45deg);
            filter: blur(0px);
          }
          80% {
            opacity: 0.3;
            transform: translateX(100px) translateY(-100px) rotate(45deg);
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            transform: translateX(200px) translateY(-200px) rotate(45deg);
            filter: blur(3px);
          }
        }
        
        @keyframes pulse-breathing {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-pulse-breathing {
          animation: pulse-breathing 2s ease-in-out infinite;
        }
        
        /* 多軌道星球動畫系統 */
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes orbit-1-reverse {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(80px) rotate(360deg); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(0deg) translateX(96px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(96px) rotate(-360deg); }
        }
        
        @keyframes orbit-2-reverse {
          0% { transform: rotate(0deg) translateX(96px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(96px) rotate(360deg); }
        }
        
        @keyframes orbit-3 {
          0% { transform: rotate(0deg) translateX(112px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(112px) rotate(-360deg); }
        }
        
        @keyframes orbit-3-reverse {
          0% { transform: rotate(0deg) translateX(112px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(112px) rotate(360deg); }
        }
        
        @keyframes orbit-4 {
          0% { transform: rotate(0deg) translateX(128px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(128px) rotate(-360deg); }
        }
        
        @keyframes orbit-4-reverse {
          0% { transform: rotate(0deg) translateX(128px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(128px) rotate(360deg); }
        }
        
        @keyframes orbit-5 {
          0% { transform: rotate(0deg) translateX(144px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(144px) rotate(-360deg); }
        }
        
        @keyframes orbit-5-reverse {
          0% { transform: rotate(0deg) translateX(144px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(144px) rotate(360deg); }
        }
        
        @keyframes orbit-6 {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        
        @keyframes orbit-6-reverse {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
        }
        
        /* 軌道動畫類別 */
        .animate-orbit-1 { animation: orbit-1 8s linear infinite; }
        .animate-orbit-1-reverse { animation: orbit-1-reverse 10s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 10s linear infinite; }
        .animate-orbit-2-reverse { animation: orbit-2-reverse 12s linear infinite; }
        .animate-orbit-3 { animation: orbit-3 12s linear infinite; }
        .animate-orbit-3-reverse { animation: orbit-3-reverse 14s linear infinite; }
        .animate-orbit-4 { animation: orbit-4 14s linear infinite; }
        .animate-orbit-4-reverse { animation: orbit-4-reverse 16s linear infinite; }
        .animate-orbit-5 { animation: orbit-5 16s linear infinite; }
        .animate-orbit-5-reverse { animation: orbit-5-reverse 18s linear infinite; }
        .animate-orbit-6 { animation: orbit-6 18s linear infinite; }
        .animate-orbit-6-reverse { animation: orbit-6-reverse 20s linear infinite; }
        
        /* RWD 響應式調整 */
        @media (max-width: 768px) {
          .animate-pulse-breathing {
            animation-duration: 2.5s;
          }
          
          /* 平板版 - 加快動畫速度 */
          .animate-orbit-1 { animation-duration: 6s; }
          .animate-orbit-2 { animation-duration: 7s; }
          .animate-orbit-3 { animation-duration: 8s; }
          .animate-orbit-4 { animation-duration: 9s; }
          .animate-orbit-5 { animation-duration: 10s; }
          .animate-orbit-6 { animation-duration: 11s; }
        }
        
        @media (max-width: 480px) {
          .animate-pulse-breathing {
            animation-duration: 3s;
          }
          
          /* 手機版 - 更快動畫速度 */
          .animate-orbit-1 { animation-duration: 4s; }
          .animate-orbit-2 { animation-duration: 5s; }
          .animate-orbit-3 { animation-duration: 6s; }
          .animate-orbit-4 { animation-duration: 7s; }
          .animate-orbit-5 { animation-duration: 8s; }
          .animate-orbit-6 { animation-duration: 9s; }
        }
      `}</style>
    </div>
  );
}
