'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import VerticalWindow from '../components/VerticalWindow';
import LoginSignupCard from '../components/LoginSignupCard';
import TextWindow from '../components/TextWindow';
import CarouselWindow from '../components/CarouselWindow';

export default function Home() {
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isEnterHovered, setIsEnterHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // 拖拽功能狀態 - 支援多個視窗
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState({
    loginCard: { x: 50, y: 50 },
    textWindow: { x: 320, y: 80 },
    carouselWindow: { x: 80, y: 220 }
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // 視窗狀態管理
  const [windowStates, setWindowStates] = useState({
    loginCard: { minimized: false, maximized: false, closed: true },
    textWindow: { minimized: false, maximized: false, closed: true },
    carouselWindow: { minimized: false, maximized: false, closed: true }
  });

  // 視窗層級管理
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const runnerRef = useRef<HTMLImageElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowLiam(false);
    setShowRight(false);
    const t1 = setTimeout(() => setShowLiam(true), 100);
    const t2 = setTimeout(() => setShowLiam(true), 700);
    const t3 = setTimeout(() => setShowRight(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Loading 進度條動畫
  useEffect(() => {
    if (showIntroModal) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // 進度完成後等待1秒再關閉視窗
            setTimeout(() => {
              setShowIntroModal(false);
            }, 1000);
            return 100;
          }
          return prev + Math.random() * 3 + 1; // 隨機增加 1-4%
        });
      }, 150); // 每150ms更新一次

      return () => clearInterval(interval);
    }
  }, [showIntroModal]);

  useEffect(() => {
    if (entered && casesRef.current) {
      setTimeout(() => {
        casesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1300);
    }
  }, [entered]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setEntered(true);
    }, 1300);
  };

  // 拖拽處理函數 - 支援多個視窗
  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    const rect = (e.target as HTMLElement).closest('.draggable-window')?.getBoundingClientRect();
    if (rect) {
      setIsDragging(windowId);
      setActiveWindow(windowId); // 設置為活動視窗
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const container = (e.target as HTMLElement).closest('section');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const newX = e.clientX - containerRect.left - dragOffset.x;
        const newY = e.clientY - containerRect.top - dragOffset.y;
        
        // 根據不同視窗設定不同的邊界限制
        let maxX, maxY;
        switch (isDragging) {
          case 'loginCard':
            maxX = containerRect.width - 600;
            maxY = containerRect.height - 350;
            break;
          case 'textWindow':
            maxX = containerRect.width - 400;
            maxY = containerRect.height - 300;
            break;
          case 'carouselWindow':
            maxX = containerRect.width - 450;
            maxY = containerRect.height - 320;
            break;
          default:
            maxX = containerRect.width - 400;
            maxY = containerRect.height - 300;
        }
        
        setWindowPositions(prev => ({
          ...prev,
          [isDragging]: {
            x: Math.max(0, Math.min(maxX, newX)),
            y: Math.max(0, Math.min(maxY, newY))
          }
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // 視窗控制函數
  const handleMinimize = (windowId: string) => {
    setActiveWindow(windowId); // 設置為活動視窗
    setWindowStates(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId as keyof typeof prev], minimized: !prev[windowId as keyof typeof prev].minimized }
    }));
  };

  const handleMaximize = (windowId: string) => {
    setActiveWindow(windowId); // 設置為活動視窗
    setWindowStates(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId as keyof typeof prev], maximized: !prev[windowId as keyof typeof prev].maximized }
    }));
  };

  const handleClose = (windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId as keyof typeof prev], closed: true }
    }));
  };

  // 開啟插畫資料夾
  const openIllustrationFolder = () => {
    setWindowStates(prev => ({
      ...prev,
      loginCard: { minimized: false, maximized: false, closed: false },
      textWindow: { minimized: false, maximized: false, closed: false },
      carouselWindow: { minimized: false, maximized: false, closed: false }
    }));
    setActiveWindow('loginCard'); // 預設第一個視窗為活動視窗
  };

  // 計算視窗的 z-index
  const getWindowZIndex = (windowId: string) => {
    // 桌面圖示層級: 15
    // 一般視窗層級: 20-25
    // 活動視窗層級: 30
    // 拖拽中視窗層級: 40
    
    if (isDragging === windowId) return 40;
    if (activeWindow === windowId) return 30;
    
    // 為不同視窗設置不同的基礎層級
    const baseZIndex = {
      loginCard: 25,
      textWindow: 22,
      carouselWindow: 20
    };
    
    return baseZIndex[windowId as keyof typeof baseZIndex] || 20;
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden" style={{ background: 'transparent' }}>
      {/* Windows 98 風格介紹視窗 */}
      {showIntroModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="win98-window relative" style={{
            width: '960px',
            maxWidth: '95vw',
            maxHeight: '90vh',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
            overflow: 'hidden'
          }}>
            {/* Windows 98 標題列 */}
            <div className="win98-titlebar" style={{
              background: 'linear-gradient(90deg, #808080 0%, #404040 100%)',
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
                <span>冬山集合作社 - 工作室介紹</span>
              </div>

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
              maxHeight: 'calc(90vh - 120px)'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <p>
                  「冬山集合作社，來自土地的設計夥伴。<br/>
                  我們相信，好的品牌源於在地故事，設計<br/>
                  能讓人再次看見家鄉的力量。<br/>
                  在這裡，我們不只是設計師，更是一起築<br/>
                  合，一起陪跑的夥伴。」
                </p>
              </div>
              
              <div style={{
                borderTop: '3px solid white',
                paddingTop: 'clamp(16px, 3vw, 24px)',
                fontSize: 'clamp(12px, 3vw, 20px)'
              }}>
                <p>
                  &ldquo;Hello, I&rsquo;m Liam.<br/>
                  This is not just a portfolio — it&rsquo;s a desktop<br/>
                  of memories, sketches, and ideas rooted in<br/>
                  Yilan.<br/>
                  Think of it as opening my computer from the<br/>
                  early 2000s, where every file hides a story,<br/>
                  and every design carries the warmth of<br/>
                  hometown.&rdquo;
                </p>
              </div>

              {/* Loading 進度條區域 */}
              <div style={{
                position: 'absolute',
                bottom: 'clamp(10px, 2vw, 20px)',
                right: 'clamp(10px, 2vw, 20px)',
                width: 'clamp(280px, 60vw, 400px)',
                background: 'transparent',
                border: '2px inset #c0c0c0',
                padding: 'clamp(8px, 2vw, 16px)'
              }}>
                <div style={{
                  fontSize: 'clamp(10px, 2.5vw, 14px)',
                  marginBottom: 'clamp(4px, 1vw, 8px)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-press-start-2p), monospace',
                  textShadow: '2px 2px 0px #000000'
                }}>
                  Loading... {Math.floor(loadingProgress)}%
                </div>
                
                {/* 分格式進度條 */}
                <div style={{
                  width: '100%',
                  height: 'clamp(20px, 4vw, 32px)',
                  border: '2px inset #c0c0c0',
                  position: 'relative',
                  background: 'transparent',
                  display: 'flex'
                }}>
                  {/* 生成10格進度條 */}
                  {Array.from({ length: 10 }, (_, index) => {
                    const segmentProgress = (loadingProgress / 10);
                    const isActive = index < Math.floor(segmentProgress);
                    const isPartiallyActive = index === Math.floor(segmentProgress) && segmentProgress % 1 > 0;
                    
                    return (
                      <div
                        key={index}
                        style={{
                          flex: '1',
                          height: '100%',
                          background: isActive 
                            ? '#008000'
                            : isPartiallyActive 
                              ? `linear-gradient(90deg, #008000 ${(segmentProgress % 1) * 100}%, transparent ${(segmentProgress % 1) * 100}%)`
                              : 'transparent',
                          border: '1px solid #808080',
                          borderRight: index === 9 ? '1px solid #808080' : 'none',
                          position: 'relative',
                          transition: 'background 0.3s ease-out'
                        }}
                      >
                      </div>
                    );
                  })}
                </div>
                
                {/* 狀態文字 */}
                <div style={{
                  fontSize: '10px',
                  marginTop: '4px',
                  color: '#666',
                  fontFamily: 'monospace'
                }}>
                  {loadingProgress < 100 ? '正在載入工作室資料...' : '載入完成！'}
                </div>
              </div>
            </div>
          </div>


        </div>
      )}

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ 
          background: `url('/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
        {/* 深藍色遮罩層 */}
        <div className="absolute inset-0" style={{
          backgroundColor: '#13496b',
          opacity: 0.75
        }} />
        <svg className="global-grid-bg absolute inset-0" width="100%" height="100%">
          <defs>
            <pattern id="global-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect width="48" height="48" fill="none" />
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#000" strokeWidth="1" />
              <path d="M 0 48 L 48 48 48 0" fill="none" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {!entered && (
          <section className="hero-block-grid relative min-h-screen flex items-center justify-center">
            <div className="hero-grid-container">


              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                <div className="flex flex-col items-center">
                  <div className="relative w-[1134px] h-[1134px] max-w-full max-h-[80vh] flex items-center justify-center">
                    <div style={{
                      position:'relative', 
                      width:'100%', 
                      height:'100%',
                      transform: `scale(${showLiam ? 1 : 0.5})`,
                      opacity: showLiam && !showIntroModal ? 1 : 0,
                      transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.3s'
                    }}>
                      {/* Pixel 地圖 */}
                      <img
                        src="/pixel_map.png"
                        alt="像素地圖"
                        className={`w-full h-full object-contain ${isTransitioning ? 'transition-map' : ''}`}
                        style={{ 
                          transform: 'scale(0.66)', 
                          display: 'block', 
                          margin: '0 auto',
                          transformOrigin: 'center center',
                          willChange: 'transform, opacity',
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                      {/* DS Logo 前景 */}
                                            <img
                        src="/dslogo-v3.png"
                        alt="DS Logo"
                        className="absolute w-full object-contain ds-logo-bounce"
                        style={{
                          transform: 'scale(0.672)',
                          zIndex: 2,
                          transformOrigin: 'center top',
                          top: showRight && !showIntroModal ? '-10%' : '-20%',
                          left: '0',
                          height: '40%',
                          opacity: showRight && !showIntroModal ? 1 : 0.5,
                          transition: 'top 0.5s ease-out, opacity 0.5s ease-out',
                          transitionDelay: showRight ? '0.4s' : '0s'
                        }}
                      />
                      <div
                        style={{
                          position:'fixed', 
                          left:'50%', 
                          bottom: showRight ? '120px' : '60px',
                          width:'126px', 
                          height:'50px', 
                          zIndex:20, 
                          cursor:'pointer', 
                          transform: `translateX(-50%) scale(${showRight ? 1.5 : 0.5})`,
                          opacity: showRight ? 1 : 0.5,
                          transition: 'bottom 0.5s ease-out, opacity 0.5s ease-out, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transitionDelay: showRight ? '0.6s' : '0s'
                        }}
                        className={`${isTransitioning ? 'transition-fade' : ''} ${showRight ? 'enter-btn-bounce' : ''}`}
                        onMouseEnter={() => setIsEnterHovered(true)}
                        onMouseLeave={() => setIsEnterHovered(false)}
                        onClick={e => {
                          if (isTransitioning) return;
                          const el = e.currentTarget;
                          el.style.transform = 'translateX(-50%) scale(1.3)';
                          setTimeout(() => {
                            handleEnter();
                          }, 180);
                        }}
                      >
                        <img
                          src={isEnterHovered ? "/header-bts-06.png" : "/header-bts-05.png"}
                          alt="ENTER"
                          style={{
                            width:'100%', 
                            height:'100%', 
                            display:'block',
                            objectFit: 'contain',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '8px',
                          fontFamily: 'var(--font-press-start-2p)',
                          fontWeight: 'bold',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          pointerEvents: 'none',
                          zIndex: 1
                        }}>
                          ENTER
                        </div>
                      </div>
                    </div>
                    <div className={`absolute left-[20%] top-[15%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.6s', zIndex: 10, top: 'calc(15% + 20px)', left: 'calc(20% + 80px)' }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        品牌源自土地
                      </div>
                    </div>
                    <div className={`absolute right-[35%] top-[10%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.8s', zIndex: 10 }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        越在地越國際
                      </div>
                    </div>
                    <div className={`absolute left-[45%] top-[40%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '2.0s', zIndex: 10 }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        設計藉由溝通
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 ${isTransitioning ? 'transition-down' : ''}`} style={{
              opacity: showRight ? 1 : 0,
              transform: `translateY(${showRight ? '0' : '20px'})`,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.9s'
            }}>
              <div className="w-full bg-black py-4 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>

              <div className="w-full bg-yellow-300 py-4 overflow-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-black text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {entered && (
          <>
            <div style={{ position: 'relative' }}>
              <img
                ref={runnerRef}
                src="/runner.gif"
                alt="陪跑員"
                style={{
                  position: 'absolute',
                  top: -250,
                  left: 80,
                  zIndex: 9999,
                  width: 'auto',
                  height: 'auto',
                  transform: 'scale(0.72)'
                }}
              />
              <div className="w-full bg-black py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
                <div className="animate-marquee whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-black text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            <div className="fixed left-0 bottom-0 z-50 p-6" style={{ transform: 'scale(1.08)', transformOrigin: 'left bottom', zIndex: 10000 }}>
              <div className="logo-block long">
                <Image src="/logo.svg" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
              </div>
            </div>

            <div className="relative w-full h-[100vh] flex flex-col lg:flex-row overflow-hidden">
              <div className="h-auto lg:h-full lg:w-1/3 w-full min-w-[320px] lg:max-w-[480px] flex-shrink-0 lg:sticky top-0 left-0 z-20 bg-transparent lg:border-r border-gray-200 p-0 m-0" style={{height: 'auto', minHeight: '60vh'}}>
                <VerticalWindow 
                  width="100%" 
                  height="auto"
                />
              </div>
              <section 
                className="flex-1 lg:w-2/3 w-full h-auto lg:h-full relative overflow-hidden desktop-area" 
                style={{
                  background: '#2a2a2a',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  padding: 'clamp(10px, 3vw, 20px)',
                  minHeight: '40vh'
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* 桌面模式 - 可拖拽視窗 */}
                <div className="hidden lg:block">
                  {/* 桌面圖示 - 僅桌面顯示 */}
                  <div className="hidden lg:block absolute top-4 left-4 flex flex-col gap-4" style={{ zIndex: 15 }}>
                    {/* 插畫資料夾 */}
                    <div 
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={openIllustrationFolder}
                      style={{ width: '60px' }}
                    >
                      <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
                        <div style={{ fontSize: '32px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px', 
                          color: '#ffffff', 
                          textAlign: 'center',
                          fontFamily: 'var(--font-zpix), monospace',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          lineHeight: '1.2'
                        }}>
                          插畫
                        </span>
                      </div>
                    </div>

                    {/* 設計資料夾 */}
                    <div 
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: '60px' }}
                    >
                      <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
                        <div style={{ fontSize: '32px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px', 
                          color: '#ffffff', 
                          textAlign: 'center',
                          fontFamily: 'var(--font-zpix), monospace',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          lineHeight: '1.2'
                        }}>
                          設計
                        </span>
                      </div>
                    </div>

                    {/* 品牌資料夾 */}
                    <div 
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: '60px' }}
                    >
                      <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
                        <div style={{ fontSize: '32px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px', 
                          color: '#ffffff', 
                          textAlign: 'center',
                          fontFamily: 'var(--font-zpix), monospace',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          lineHeight: '1.2'
                        }}>
                          品牌
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* LoginSignupCard 視窗 */}
                  {!windowStates.loginCard.closed && (
                    <div 
                      className="draggable-window"
                      style={{ 
                        position: windowStates.loginCard.maximized ? 'absolute' : 'absolute',
                        cursor: isDragging === 'loginCard' ? 'grabbing' : 'grab',
                        left: windowStates.loginCard.maximized ? '0' : `${windowPositions.loginCard.x}px`,
                        top: windowStates.loginCard.maximized ? '0' : `${windowPositions.loginCard.y}px`,
                        width: windowStates.loginCard.maximized ? '100%' : 'auto',
                        height: windowStates.loginCard.maximized ? '100%' : 'auto',
                        userSelect: 'none',
                        zIndex: getWindowZIndex('loginCard')
                      }}
                      onMouseDown={(e) => !windowStates.loginCard.maximized && handleMouseDown(e, 'loginCard')}
                    >
                    <LoginSignupCard 
                      title="來自土地的設計夥伴"
                      description="冬山集合作社，深耕宜蘭在地文化的設計工作室。我們相信好的品牌源於深度的溝通與理解，每一個設計都承載著故事與溫度。從品牌識別到印刷設計，我們用設計讓世界重新看見家鄉的美好。"
                      windowTitle="冬山集合作社 - 工作室介紹.exe"
                      leftImage="/hero.png"
                      width={windowStates.loginCard.maximized ? "100%" : "600px"}
                      height={windowStates.loginCard.maximized ? "100%" : "350px"}
                      onMinimize={() => handleMinimize('loginCard')}
                      onMaximize={() => handleMaximize('loginCard')}
                      onClose={() => handleClose('loginCard')}
                      isMinimized={windowStates.loginCard.minimized}
                      isMaximized={windowStates.loginCard.maximized}
                    />
                  </div>
                  )}

                  {/* TextWindow 視窗 */}
                  {!windowStates.textWindow.closed && (
                    <div 
                      className="draggable-window"
                      style={{ 
                        position: 'absolute', 
                        left: windowStates.textWindow.maximized ? '0' : `${windowPositions.textWindow.x}px`,
                        top: windowStates.textWindow.maximized ? '0' : `${windowPositions.textWindow.y}px`,
                        width: windowStates.textWindow.maximized ? '100%' : 'auto',
                        height: windowStates.textWindow.maximized ? '100%' : 'auto',
                        cursor: isDragging === 'textWindow' ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        zIndex: getWindowZIndex('textWindow')
                      }}
                      onMouseDown={(e) => !windowStates.textWindow.maximized && handleMouseDown(e, 'textWindow')}
                    >
                      <TextWindow 
                        windowTitle="專案說明.txt"
                        width={windowStates.textWindow.maximized ? "100%" : "400px"}
                        height={windowStates.textWindow.maximized ? "100%" : "300px"}
                        onMinimize={() => handleMinimize('textWindow')}
                        onMaximize={() => handleMaximize('textWindow')}
                        onClose={() => handleClose('textWindow')}
                        isMinimized={windowStates.textWindow.minimized}
                        isMaximized={windowStates.textWindow.maximized}
                        content={`冬山集合作社 - 設計工作室

我們的理念：
每個品牌都有獨特的故事，我們用設計讓這些故事發光發熱。

核心服務：
• 品牌識別設計
• 視覺形象規劃  
• 印刷品設計
• 包裝設計
• 網站設計

設計流程：
1. 深度溝通了解需求
2. 創意發想概念確立
3. 精緻設計細節完善
4. 完整交付使用指導

聯絡我們：
Email: hello@dongshan.design
Tel: 03-9XX-XXXX

在地設計，國際視野
讓設計成為溝通的橋樑`}
                      />
                    </div>
                  )}

                  {/* CarouselWindow 視窗 */}
                  {!windowStates.carouselWindow.closed && (
                    <div 
                      className="draggable-window"
                      style={{ 
                        position: 'absolute', 
                        left: windowStates.carouselWindow.maximized ? '0' : `${windowPositions.carouselWindow.x}px`,
                        top: windowStates.carouselWindow.maximized ? '0' : `${windowPositions.carouselWindow.y}px`,
                        width: windowStates.carouselWindow.maximized ? '100%' : 'auto',
                        height: windowStates.carouselWindow.maximized ? '100%' : 'auto',
                        cursor: isDragging === 'carouselWindow' ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        zIndex: getWindowZIndex('carouselWindow')
                      }}
                      onMouseDown={(e) => !windowStates.carouselWindow.maximized && handleMouseDown(e, 'carouselWindow')}
                    >
                      <CarouselWindow 
                        windowTitle="作品集展示.exe"
                        width={windowStates.carouselWindow.maximized ? "100%" : "450px"}
                        height={windowStates.carouselWindow.maximized ? "100%" : "320px"}
                        onMinimize={() => handleMinimize('carouselWindow')}
                        onMaximize={() => handleMaximize('carouselWindow')}
                        onClose={() => handleClose('carouselWindow')}
                        isMinimized={windowStates.carouselWindow.minimized}
                        isMaximized={windowStates.carouselWindow.maximized}
                        images={[
                          '/illustration_1.png',
                          '/illustration_2.png', 
                          '/illustration_3.png',
                          '/illustration_4.png',
                          '/illustration_5.png',
                          '/illustration_6.png'
                        ]}
                        autoPlay={true}
                        autoPlayInterval={5000}
                      />
                    </div>
                  )}
                </div>

                {/* 響應式模式 - 一欄式布局 */}
                <div className="lg:hidden h-auto overflow-y-auto">
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'clamp(15px, 4vw, 20px)',
                    padding: 'clamp(10px, 3vw, 15px)'
                  }}>
                    <LoginSignupCard 
                      title="來自土地的設計夥伴"
                      description="冬山集合作社，深耕宜蘭在地文化的設計工作室。我們相信好的品牌源於深度的溝通與理解，每一個設計都承載著故事與溫度。從品牌識別到印刷設計，我們用設計讓世界重新看見家鄉的美好。"
                      windowTitle="冬山集合作社 - 工作室介紹.exe"
                      leftImage="/hero.png"
                      width="100%"
                      height="clamp(280px, 50vw, 350px)"
                    />
                    
                    <TextWindow 
                      windowTitle="專案說明.txt"
                      width="100%"
                      height="clamp(250px, 45vw, 300px)"
                      content={`冬山集合作社 - 設計工作室

我們的理念：
每個品牌都有獨特的故事，我們用設計讓這些故事發光發熱。

核心服務：
• 品牌識別設計
• 視覺形象規劃  
• 印刷品設計
• 包裝設計
• 網站設計

設計流程：
1. 深度溝通了解需求
2. 創意發想概念確立
3. 精緻設計細節完善
4. 完整交付使用指導

聯絡我們：
Email: hello@dongshan.design
Tel: 03-9XX-XXXX

在地設計，國際視野
讓設計成為溝通的橋樑`}
                    />
                    
                    <CarouselWindow 
                      windowTitle="作品集展示.exe"
                      width="100%"
                      height="clamp(280px, 50vw, 350px)"
                      images={[
                        '/illustration_1.png',
                        '/illustration_2.png', 
                        '/illustration_3.png',
                        '/illustration_4.png',
                        '/illustration_5.png',
                        '/illustration_6.png'
                      ]}
                      autoPlay={true}
                      autoPlayInterval={5000}
                    />
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .hero-grid-container {
          position: relative;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 48px;
          z-index: 1;
        }

        .transition-up {
          transform: translateY(-100%);
          opacity: 0;
        }
        .transition-down {
          transform: translateY(100%);
          opacity: 0;
        }
        .transition-map {
          opacity: 0;
          transform: scale(1.5);
        }
        .transition-fade {
          opacity: 0;
          transform: scale(1.3);
        }
        .ds-logo-bounce {
          animation: bounce-logo 2s ease-in-out infinite;
        }
        @keyframes bounce-logo {
          0%, 100% {
            transform: translateY(0px) scale(0.672);
          }
          50% {
            transform: translateY(-20px) scale(0.672);
          }
        }
        .enter-btn-bounce {
          animation: bounce-enter 2s ease-in-out infinite;
        }
        @keyframes bounce-enter {
          0%, 100% {
            transform: translateX(-50%) translateY(0px) scale(1.5);
          }
          50% {
            transform: translateX(-50%) translateY(-20px) scale(1.5);
          }
        }

      `}</style>
    </div>
  );
} 