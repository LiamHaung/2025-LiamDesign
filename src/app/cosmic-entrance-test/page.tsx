"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CosmicEntranceTest() {
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
      background: 'radial-gradient(ellipse at center, #0B0B2B 0%, #1A1A3A 30%, #2D1B69 60%, #0A0A1A 100%)'
    }}>
      {/* 深空星雲背景層 */}
      <div className="fixed inset-0 z-0">
        {/* 主星雲 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, rgba(75, 0, 130, 0.2) 50%, transparent 100%)',
               animationDelay: '0s'
             }}></div>
        
        {/* 次星雲 */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(0, 100, 200, 0.2) 50%, transparent 100%)',
               animationDelay: '2s'
             }}></div>
        
        {/* 第三星雲 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, rgba(139, 0, 139, 0.2) 50%, transparent 100%)',
               animationDelay: '4s'
             }}></div>

        {/* 宇宙塵埃粒子 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* 星座連線系統 */}
      <div className="fixed inset-0 z-5">
        {/* 大熊座 */}
        <svg className="absolute top-1/4 left-1/4 w-64 h-64 opacity-30" style={{ transform: 'translate(-50%, -50%)' }}>
          <line x1="50" y1="50" x2="100" y2="80" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="100" y1="80" x2="150" y2="60" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="150" y1="60" x2="200" y2="90" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="200" y1="90" x2="180" y2="140" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        </svg>

        {/* 獵戶座 */}
        <svg className="absolute bottom-1/3 right-1/3 w-48 h-48 opacity-25" style={{ transform: 'translate(50%, 50%)' }}>
          <line x1="50" y1="50" x2="80" y2="80" stroke="rgba(0, 191, 255, 0.3)" strokeWidth="1" />
          <line x1="80" y1="80" x2="120" y2="60" stroke="rgba(0, 191, 255, 0.3)" strokeWidth="1" />
          <line x1="120" y1="60" x2="100" y2="100" stroke="rgba(0, 191, 255, 0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* 星空系統 */}
      <div className="fixed inset-0 z-10">
        {/* 恆星 */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: Math.random() > 0.7 ? '#FFD700' : '#FFFFFF',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: Math.random() > 0.8 ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none'
            }}
          />
        ))}

        {/* 脈衝星 */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`pulsar-${i}`}
            className="absolute animate-pulse-glow"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
              width: '4px',
              height: '4px',
              background: '#00FFFF',
              borderRadius: '50%',
              animationDelay: `${i * 0.5}s`,
              boxShadow: '0 0 20px #00FFFF, 0 0 40px #00FFFF'
            }}
          />
        ))}

        {/* 流星 */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute animate-meteor"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: '#FFFFFF',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 宇宙座標顯示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 12px',
        border: '1px solid rgba(0, 191, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: '#00FFFF',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          textShadow: '0 0 10px #00FFFF'
        }}>
          <span>🌌 {scrollY > 0 ? `${(24.75 + scrollY * 0.0001).toFixed(2)}°N` : '24.75°N'}, {scrollY > 0 ? `${(121.76 + scrollY * 0.0001).toFixed(2)}°E` : '121.76°E'}</span>
        </div>
      </div>

      {/* 宇宙時間顯示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 12px',
        border: '1px solid rgba(138, 43, 226, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          color: '#8A2BE2',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          textShadow: '0 0 10px #8A2BE2'
        }}>
          <span>
            ⏰ {isClient && currentTime ? currentTime.toLocaleString('zh-TW', {
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

      {/* 載入畫面 */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, background: 'radial-gradient(ellipse at center, #0B0B2B 0%, #1A1A3A 30%, #2D1B69 60%, #0A0A1A 100%)' }}>
          {/* 宇宙載入彈窗 */}
          <div className="relative backdrop-blur-sm w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg mx-auto px-4" style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(0, 191, 255, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            {/* 標題列 */}
            <div className="flex items-center justify-between px-4 py-3 absolute top-0 left-0 right-0" style={{ 
              backgroundColor: 'rgba(0, 191, 255, 0.2)',
              borderBottom: '1px solid rgba(0, 191, 255, 0.3)',
              borderRadius: '6px 6px 0 0'
            }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm animate-pulse" style={{ backgroundColor: '#00FFFF' }}></div>
                <span className="cosmic-text text-cyan-400 text-sm font-bold">🌌 Loading...</span>
              </div>
            </div>
            
            {/* 內容區域 */}
            <div className="px-6 py-8 pt-16">
              <div className="text-center mb-8">
                <div className="text-xl font-bold mb-3 cosmic-text" style={{ 
                  color: '#00FFFF',
                  textShadow: '0 0 20px #00FFFF'
                }}>Liam Design Studio</div>
                <div className="text-sm opacity-80 cosmic-text" style={{ color: '#8A2BE2' }}>🌠 宇宙伺服器啟動中...</div>
              </div>
              
              {/* 宇宙進度條 */}
              <div className="relative">
                <div className="w-full h-6 border-2 rounded-sm" style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderColor: 'rgba(0, 191, 255, 0.3)'
                }}>
                  <div 
                    className="h-full rounded-sm transition-all duration-100 ease-out"
                    style={{
                      width: `${progressStep}%`,
                      background: 'linear-gradient(90deg, #00FFFF 0%, #8A2BE2 100%)',
                      boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)'
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="cosmic-text text-cyan-400 text-xs font-bold" style={{ 
                    textShadow: '0 0 10px #00FFFF'
                  }}>
                    {progressStep}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 載入下方全寬色bar */}
          <div className="absolute bottom-0 left-0 w-full h-2" style={{ 
            background: 'linear-gradient(90deg, #00FFFF 0%, #8A2BE2 100%)'
          }}>
            <div 
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${progressStep}%`,
                background: 'linear-gradient(90deg, #00FFFF 0%, #8A2BE2 100%)',
                opacity: 1,
                boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)'
              }}
            />
          </div>
        </div>
      )}

      {/* 主要內容 */}
      {isAnimating && (
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="min-h-screen flex items-center justify-center relative">
            {/* 中央星系系統 */}
            <div className="relative mb-8">
              {/* 外層軌道 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-48 md:w-[500px] md:h-[250px] lg:w-[600px] lg:h-[300px]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 border-2 rounded-full animate-spin-slow" style={{ 
                    borderColor: 'rgba(0, 191, 255, 0.2)',
                    borderImage: 'linear-gradient(45deg, #00FFFF, #8A2BE2) 1'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full animate-orbit-outer" style={{ 
                    background: 'radial-gradient(circle, #00FFFF 0%, #0080FF 100%)',
                    boxShadow: '0 0 20px #00FFFF'
                  }}></div>
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full animate-orbit-outer-reverse" style={{ 
                    background: 'radial-gradient(circle, #8A2BE2 0%, #4B0082 100%)',
                    boxShadow: '0 0 15px #8A2BE2'
                  }}></div>
                </div>
              </div>
              
              {/* 中層軌道 */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-80 h-40 md:w-96 md:h-48 lg:w-[400px] lg:h-[200px]">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 border-2 rounded-full animate-spin-medium" style={{ 
                    borderColor: 'rgba(138, 43, 226, 0.3)'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full animate-orbit-middle" style={{ 
                    background: 'radial-gradient(circle, #FF1493 0%, #8B008B 100%)',
                    boxShadow: '0 0 25px #FF1493'
                  }}></div>
                  <div className="absolute top-0 right-2 w-3 h-3 rounded-full animate-orbit-middle-reverse" style={{ 
                    background: 'radial-gradient(circle, #00FF7F 0%, #00CED1 100%)',
                    boxShadow: '0 0 20px #00FF7F'
                  }}></div>
                </div>
              </div>
              
              {/* 內層軌道 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-32 md:w-72 md:h-36 lg:w-80 lg:h-40">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 border-2 rounded-full animate-spin-fast" style={{ 
                    borderColor: 'rgba(255, 20, 147, 0.4)'
                  }}></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full animate-orbit-inner" style={{ 
                    background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
                    boxShadow: '0 0 30px #FFD700'
                  }}></div>
                  <div className="absolute top-0 right-3 w-4 h-4 rounded-full animate-orbit-inner-reverse" style={{ 
                    background: 'radial-gradient(circle, #FF6347 0%, #DC143C 100%)',
                    boxShadow: '0 0 25px #FF6347'
                  }}></div>
                </div>
              </div>

              {/* 中央黑洞/恆星 */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ 
                    background: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
                    boxShadow: '0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                  }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full animate-pulse-glow" style={{ 
                    background: 'radial-gradient(circle, #FFFFFF 0%, #E0E0E0 100%)',
                    boxShadow: '0 0 40px #FFFFFF'
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
                  className="relative z-10 animate-glow"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(0, 191, 255, 0.5))'
                  }}
                />
              </div>
            </div>

            {/* 主標題 */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 cosmic-text" style={{ 
              background: 'linear-gradient(45deg, #00FFFF 0%, #8A2BE2 50%, #FF1493 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 191, 255, 0.5)'
            }}>
              <span className="animate-glow-text">Welcome</span>
            </h1>

            {/* 副標題 */}
            <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto cosmic-text" style={{ 
              color: '#FFFFFF',
              fontWeight: '800',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}>
              🌌 在無垠的創意宇宙中，<br />
              每一顆靈感都是閃耀的星辰。<br />
              讓我們一起探索設計的無限可能。
            </p>

            {/* 按鈕 */}
            <div className="flex justify-center mb-16">
              <button className="group px-6 md:px-10 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden cosmic-button" style={{ 
                background: 'linear-gradient(45deg, #00FFFF 0%, #8A2BE2 100%)',
                paddingTop: '14px', 
                paddingBottom: '14px',
                boxShadow: '0 0 30px rgba(0, 191, 255, 0.5)'
              }}>
                <span className="relative z-10 cosmic-text">🚀 Explore Universe</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ 
                  background: 'linear-gradient(45deg, #8A2BE2 0%, #FF1493 100%)',
                  boxShadow: '0 0 40px rgba(138, 43, 226, 0.7)'
                }}></div>
              </button>
            </div>

            {/* 標籤 */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cosmic-text" style={{ 
                color: '#00FFFF',
                textShadow: '0 0 10px #00FFFF',
                border: '1px solid rgba(0, 191, 255, 0.3)'
              }}>
                #CosmicDesign
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cosmic-text" style={{ 
                color: '#8A2BE2',
                textShadow: '0 0 10px #8A2BE2',
                border: '1px solid rgba(138, 43, 226, 0.3)'
              }}>
                #InfiniteCreativity
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cosmic-text" style={{ 
                color: '#FF1493',
                textShadow: '0 0 10px #FF1493',
                border: '1px solid rgba(255, 20, 147, 0.3)'
              }}>
                #StellarVision
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS 動畫 */}
      <style jsx>{`
        /* 宇宙字體效果 */
        .cosmic-text {
          font-family: 'Courier New', monospace;
          text-rendering: optimizeSpeed;
          font-smooth: never;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
        }
        
        /* 漂浮動畫 */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        /* 閃爍動畫 */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        /* 脈衝發光動畫 */
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
            box-shadow: 0 0 20px currentColor;
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 40px currentColor, 0 0 80px currentColor;
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* 流星動畫 */
        @keyframes meteor {
          0% {
            opacity: 0;
            transform: translateX(-100px) translateY(100px);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(100px) translateY(-100px);
          }
        }
        
        .animate-meteor {
          animation: meteor 2s linear infinite;
        }
        
        /* 軌道動畫 */
        @keyframes orbit-outer {
          0% { transform: rotate(0deg) translateX(240px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(240px) rotate(-360deg); }
        }
        
        @keyframes orbit-outer-reverse {
          0% { transform: rotate(0deg) translateX(240px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(240px) rotate(360deg); }
        }
        
        @keyframes orbit-middle {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        @keyframes orbit-middle-reverse {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(200px) rotate(360deg); }
        }
        
        @keyframes orbit-inner {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        
        @keyframes orbit-inner-reverse {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
        }
        
        /* 旋轉動畫 */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-medium {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-spin-medium { animation: spin-medium 20s linear infinite; }
        .animate-spin-fast { animation: spin-fast 10s linear infinite; }
        
        /* 軌道動畫類別 */
        .animate-orbit-outer { animation: orbit-outer 30s linear infinite; }
        .animate-orbit-outer-reverse { animation: orbit-outer-reverse 35s linear infinite; }
        .animate-orbit-middle { animation: orbit-middle 20s linear infinite; }
        .animate-orbit-middle-reverse { animation: orbit-middle-reverse 25s linear infinite; }
        .animate-orbit-inner { animation: orbit-inner 15s linear infinite; }
        .animate-orbit-inner-reverse { animation: orbit-inner-reverse 18s linear infinite; }
        
        /* 發光效果 */
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(0, 191, 255, 0.8));
          }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        @keyframes glow-text {
          0%, 100% {
            text-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(0, 191, 255, 0.8), 0 0 80px rgba(138, 43, 226, 0.5);
          }
        }
        
        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }
        
        /* 宇宙按鈕效果 */
        .cosmic-button {
          position: relative;
          overflow: hidden;
        }
        
        .cosmic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .cosmic-button:hover::before {
          left: 100%;
        }
        
        /* RWD 響應式調整 */
        @media (max-width: 768px) {
          .animate-spin-slow { animation-duration: 20s; }
          .animate-spin-medium { animation-duration: 15s; }
          .animate-spin-fast { animation-duration: 8s; }
          
          .animate-orbit-outer { animation-duration: 20s; }
          .animate-orbit-middle { animation-duration: 15s; }
          .animate-orbit-inner { animation-duration: 10s; }
        }
        
        @media (max-width: 480px) {
          .animate-spin-slow { animation-duration: 15s; }
          .animate-spin-medium { animation-duration: 12s; }
          .animate-spin-fast { animation-duration: 6s; }
          
          .animate-orbit-outer { animation-duration: 15s; }
          .animate-orbit-middle { animation-duration: 12s; }
          .animate-orbit-inner { animation-duration: 8s; }
        }
      `}</style>
    </div>
  );
}

