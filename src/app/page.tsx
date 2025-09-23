'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import LoginSignupCard from '../components/LoginSignupCard';
import TextWindow from '../components/TextWindow';
import CarouselWindow from '../components/CarouselWindow';
import SlotMachine from '../components/SlotMachine';
import { motion } from 'framer-motion';
import IllustrationSplitCarousel from '../components/IllustrationSplitCarousel';
import TestCardAlt from '../components/TestCardAlt';
import CardCarousel from '../components/CardCarousel';
import CharacterWindow from '../components/CharacterWindow';
import AnimatedCheckerboard from '../components/test/AnimatedCheckerboard';
import ParallaxSection from '../components/ParallaxSection';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  // 品牌案例數據
  const brandCases = [
    {
      title: "品牌識別設計",
      subtitle: "從 Logo 到色彩系統，建立完整的視覺識別體系。",
      imageSrc: "/illustration_1.png",
      tags: ["Brand", "Identity"]
    },
    {
      title: "品牌應用設計",
      subtitle: "將品牌元素延伸到各種應用場景，保持一致性。",
      imageSrc: "/illustration_2.png",
      tags: ["Brand", "Application"]
    },
    {
      title: "品牌故事包裝",
      subtitle: "透過視覺設計傳達品牌核心價值與故事。",
      imageSrc: "/illustration_3.png",
      tags: ["Brand", "Story"]
    },
    {
      title: "品牌體驗設計",
      subtitle: "從接觸點到使用者旅程，打造完整品牌體驗。",
      imageSrc: "/illustration_4.png",
      tags: ["Brand", "Experience"]
    },
    {
      title: "品牌策略規劃",
      subtitle: "深度分析市場定位，制定品牌發展策略。",
      imageSrc: "/illustration_5.png",
      tags: ["Brand", "Strategy"]
    }
  ];
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(58);
  const [boatExiting, setBoatExiting] = useState(false);
  
  // 拖拽功能狀態 - 支援多個視窗
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState({
    loginCard: { x: 50, y: 50 },
    textWindow: { x: 320, y: 80 },
    carouselWindow: { x: 80, y: 220 },
    illustrationWindow: { x: 100, y: 100 }
  });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // 視窗狀態管理
  const [windowStates, setWindowStates] = useState({
    loginCard: { minimized: false, maximized: false, closed: true },
    textWindow: { minimized: false, maximized: false, closed: true },
    carouselWindow: { minimized: false, maximized: false, closed: true },
    illustrationWindow: { minimized: false, maximized: false, closed: true }
  });

  // 視窗層級管理
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  
  // 滾動分段狀態管理 (已移除)
  
  // 手機版漢堡選單狀態
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // 滾動監聽 - 分段變色效果 (已移除)

  useEffect(() => {
    if (entered && casesRef.current) {
      setTimeout(() => {
        casesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1300);
    }
  }, [entered]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setBoatExiting(true);
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
      carouselWindow: { minimized: false, maximized: false, closed: false },
      illustrationWindow: { minimized: false, maximized: false, closed: false },
      contactForm: { minimized: false, maximized: false, closed: true }
    }));
    setActiveWindow('loginCard'); // 預設第一個視窗為活動視窗
    // setShowVerticalWindow(false); // 隱藏 VerticalWindow (手機版)
    setMobileMenuOpen(false); // 關閉手機選單
  };

  // 回到主頁
  const goToHome = () => {
    setWindowStates(prev => ({
      ...prev,
      loginCard: { minimized: false, maximized: false, closed: true },
      textWindow: { minimized: false, maximized: false, closed: true },
      carouselWindow: { minimized: false, maximized: false, closed: true },
    illustrationWindow: { minimized: false, maximized: false, closed: true },
      contactForm: { minimized: false, maximized: false, closed: true }
    }));
    // setShowVerticalWindow(true); // 顯示 VerticalWindow
    setMobileMenuOpen(false); // 關閉手機選單
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
    
    switch(windowId) {
      case 'loginCard':
        return baseZIndex.loginCard + (windowStates.loginCard.maximized ? 100 : 0);
      case 'textWindow':
        return baseZIndex.textWindow + (windowStates.textWindow.maximized ? 100 : 0);
      case 'carouselWindow':
        return baseZIndex.carouselWindow + (windowStates.carouselWindow.maximized ? 100 : 0);
      default:
        return 20;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        // setShowVerticalWindow(false); // 隱藏 VerticalWindow (手機版)
      } else {
        // setShowVerticalWindow(true); // 顯示 VerticalWindow
      }
    };
    handleResize(); // 設定初始值
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 額外的結構化數據
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Liam Design Studio Portfolio",
    "description": "展示品牌設計、插畫設計、數位設計等創意作品集",
    "creator": {
      "@type": "Organization",
      "name": "Liam Design Studio"
    },
    "url": "https://2025-liam-design.vercel.app",
    "image": [
      "https://2025-liam-design.vercel.app/illustration_1.png",
      "https://2025-liam-design.vercel.app/illustration_2.png",
      "https://2025-liam-design.vercel.app/illustration_3.png",
      "https://2025-liam-design.vercel.app/illustration_4.png"
    ],
    "keywords": "品牌設計作品集, 插畫作品, 視覺設計, 創意設計",
    "dateCreated": "2024",
    "inLanguage": "zh-TW"
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首頁",
        "item": "https://2025-liam-design.vercel.app"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "作品集",
        "item": "https://2025-liam-design.vercel.app#portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "聯絡我們",
        "item": "https://2025-liam-design.vercel.app#contact"
      }
    ]
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden" style={{ background: '#FFFFF3' }}>
      {/* 結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                <span>Liam Design Studio - Intro</span>
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
                  fontSize: 'clamp(12px, 3vw, 18px)'
                }}>
                <p>
                  「Liam Design Studio，專注於品牌設計與視覺傳達。<br/>
                  我們相信，好的設計源於深入的理解與溝通，<br/>
                  每一個專案都承載著獨特的故事與價值。<br/>
                  在這裡，我們不只是設計師，更是創意夥伴，<br/>
                  一起打造令人印象深刻的品牌體驗。」
                </p>
              </div>
              
                {/* 英文介紹 */}
              <div style={{
                borderTop: '3px solid white',
                  paddingTop: 'clamp(12px, 3vw, 20px)',
                  textAlign: 'center',
                  fontSize: 'clamp(10px, 2.5vw, 16px)'
              }}>
                <p>
                  &ldquo;Hello, I&rsquo;m Liam.ldquo;Welcome to Liam Design Studio.ldquo;Welcome to Liam Design Studio.<br/>
                  We specialize in brand identity, visual design,<br/>
                  and creative solutions that tell compelling stories.<br/>
                  Our approach combines strategic thinking with<br/>
                  artistic vision to create designs that resonate<br/>
                  with audiences and drive meaningful connections<br/>
                  between brands and their communities.between brands and their communities.and every design carries the warmth ofrdquo;rdquo;<br/>
                  
                </p>
              </div>
            </div>

              {/* Loading 進度條區域 */}
              <div style={{
                width: '100%',
                background: 'transparent',
                border: '2px inset #c0c0c0',
                padding: 'clamp(8px, 2vw, 16px)',
                marginTop: 'clamp(16px, 4vw, 24px)',
                flexShrink: 0
              }}>
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
                            ? '#003EC3'
                            : isPartiallyActive 
                              ? `linear-gradient(90deg, #003EC3 ${(segmentProgress % 1) * 100}%, transparent ${(segmentProgress % 1) * 100}%)`
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
                  textAlign: 'center',
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


      <div className="relative z-10">
        {!entered && (
          <>
            <section className="hero-block-grid relative min-h-screen">
            <div className="hero-logo-container fixed top-0 left-0 w-full z-50 bg-[#FFFFF3] py-4" style={{
              opacity: showRight ? 1 : 0,
              transform: `translateY(${showRight ? '0' : '-40px'})`,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 50,
              transitionDelay: '1.8s'
            }}>
              <img
                src="/cursor-07.png"
                alt="Liam Design Studio Logo"
                className="hero-logo"
                style={{
                  width: 'clamp(84px, 17.5vw, 210px)', // 縮小70%: 120*0.7=84, 25*0.7=17.5, 300*0.7=210
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'none'
                }}
              />
            </div>
            <div className="hero-grid-container pt-24 flex flex-col items-center justify-center min-h-screen">
            {/* 船隻區域 - 替代原地圖 */}
            <div className="boat-container mb-8" style={{
              opacity: showRight && !showIntroModal ? (boatExiting ? 0 : 1) : 0,
              transform: showRight && !showIntroModal
                ? (boatExiting ? 'translateX(-100px)' : 'translateY(0)')
                : 'translateY(20px)',
              transition: 'transform 0.8s ease, opacity 0.8s ease',
              transitionDelay: showRight && !showIntroModal ? '0.6s' : '0s',
              zIndex: 10,
              position: 'relative',
              transformOrigin: 'center center',
              width: 'clamp(300px, 65vw, 800px)',
              height: 'clamp(200px, 40vw, 500px)'
            }}>
              <div className="boat-with-waves">
                <img src="/boat.png" alt="Boat" className="boat-img" />
              </div>
            </div>
            
            {/* ENTER 按鈕 */}
            <div className="enter-button-container" style={{
              opacity: showRight && !showIntroModal ? 1 : 0,
              transform: `translateY(${showRight ? '0' : '20px'}) scale(${showRight && !showIntroModal ? '1' : '0.8'})`,
              transition: 'all 1.0s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 999,
              transitionDelay: showRight && !showIntroModal ? '0.8s' : '0s'
            }}>
              <button
                onClick={(e) => {
                  // 點擊效果
                  const button = e.currentTarget;
                  button.style.transform = 'scale(0.95)';
                  button.style.transition = 'transform 0.1s ease';
                  
                  setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    button.style.transition = 'transform 0.2s ease';
                  }, 100);
                  
                  // 延遲執行進入功能
                  setTimeout(() => {
                    handleEnter();
                  }, 200);
                }}
                className="enter-btn"
                style={{
                  padding: 'clamp(12px, 3vw, 20px) clamp(24px, 6vw, 40px)',
                  fontSize: 'clamp(14px, 3.5vw, 20px)',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#003EC3',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-press-start-2p)',
                  /* 扁平化風格，無文字陰影 */
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002A8A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003EC3'}
              >
                ENTER
              </button>
            </div>



              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} className="hero-main-container">
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-full max-w-full max-h-[80vh] flex items-center justify-center hero-content-container" style={{
                    width: 'clamp(300px, 90vw, 1134px)',
                    height: 'clamp(300px, 90vw, 1134px)'
                  }}>
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
                        src="/yilan_mapv2-10.png"
                        alt="像素地圖"
                        className={`w-full h-full object-contain ${isTransitioning ? 'transition-map' : ''}`}
                        style={{ 
                          transform: 'scale(0.66)', 
                          display: 'none', 
                          margin: '0 auto',
                          transformOrigin: 'center center',
                          willChange: 'transform, opacity',
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                      {/* DS Logo 前景 */}
                                            <img
                        src="/cursor-07.png"
                        alt="DS Logo"
                        className="absolute w-full object-contain ds-logo-bounce"
                        style={{
                          transform: 'scale(0.672)',
                          zIndex: 2,
                          transformOrigin: 'center top',
                          top: showRight && !showIntroModal ? '-10%' : '-20%',
                          left: '0',
                          height: '40%',
                          opacity: 0,
                          transition: 'top 0.5s ease-out, opacity 0.5s ease-out',
                          transitionDelay: showRight ? '0.4s' : '0s'
                        }}
                      />
                      
                    </div>
                    <div className={`slogan-1 absolute left-[20%] top-[15%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.6s', zIndex: 10, top: 'calc(15% + 20px)', left: 'calc(20% + 80px)' }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        品牌源自土地
                      </div>
                    </div>
                    <div className={`slogan-2 absolute right-[35%] top-[10%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.8s', zIndex: 10 }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        越在地越國際
                      </div>
                    </div>
                    <div className={`slogan-3 absolute left-[45%] top-[40%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight && !showIntroModal ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '2.0s', zIndex: 10 }}>
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
              transform: `translateY(${showRight ? '0' : '40px'})`,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 40,
              transitionDelay: '1.3s'
            }}>
              <div className="w-full bg-black py-4 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: "#003EC3" }} className="w-full py-4 overflow-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          </>
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

            <div style={{ backgroundColor: "#003EC3", position: "relative", zIndex: 10 }} className="w-full py-4 overflow-hidden">
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            {/* Parallax 效果區塊 - 在跑馬燈下方，使用條件顯示 */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <ParallaxSection show={true} />
            </div>

            {/* 手機版漢堡選單 - 在跑馬燈和主內容之間 */}
            <div className="block lg:hidden w-full py-3 flex justify-center relative" style={{ 
              zIndex: 50, 
              background: '#2a2a2a',
              minHeight: '60px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-zpix), monospace',
                  fontSize: '18px',
                  position: 'relative',
                  zIndex: 51
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  (e.target as HTMLElement).style.border = '2px inset #c0c0c0';
                }}
                onMouseUp={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
              >
                ☰
              </button>
              {mobileMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  minWidth: '200px',
                  zIndex: 52
                }}>
                  <div onClick={goToHome} style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #808080',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-zpix), monospace',
                    fontSize: '12px'
                  }}>
                    <span>🏠</span>
                    <span>回主頁</span>
                  </div>
                                     <div onClick={openIllustrationFolder} style={{
                     padding: '12px 16px',
                     cursor: 'pointer',
                     borderBottom: '1px solid #808080',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     fontFamily: 'var(--font-zpix), monospace',
                     fontSize: '12px'
                   }}>
                     <span>🎨</span>
                     <span>插畫</span>
                   </div>
                  <div style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #808080',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-zpix), monospace',
                    fontSize: '12px'
                  }}>
                    <span>🎨</span>
                    <span>設計</span>
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #808080',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-zpix), monospace',
                    fontSize: '12px'
                  }}>
                    <span>🏷️</span>
                    <span>品牌</span>
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-zpix), monospace',
                    fontSize: '12px'
                  }}>
                    <span>📧</span>
                    <span>聯絡我們</span>
                  </div>
                </div>
              )}
            </div>

            <div className="fixed right-0 bottom-0 z-50 p-6" style={{ 
              transform: 'scale(1.5)', 
              transformOrigin: 'right bottom', 
              zIndex: 10000 
            }}>
              <div className="logo-block long">
                <Image src="/cursor-07.png" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
              </div>
            </div>

            <div className="relative w-full h-auto lg:h-[100vh] flex flex-col lg:flex-row overflow-auto lg:overflow-hidden">
              {/* 左側 VerticalWindow 已移除 */}
              {/* 中右區域內容寬度改為全寬 */}
              <section 
                className="flex-1 lg:w-2/3 w-full h-auto lg:h-full relative overflow-auto lg:overflow-hidden desktop-area desktop-section" 
                style={{
                  background: '#FFFFF3',
                  backgroundImage: 'none',
                  padding: '0',
                  minHeight: '40vh'
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* 桌面模式 - 可拖拽視窗 */}
                <div className="hidden lg:block">
                  {/* 桌面圖示 - 僅桌面顯示 */}
                  <div className="hidden lg:block absolute top-4 left-4 flex flex-col gap-4" style={{ zIndex: 15, display: 'none' }}>
                    {/* 插畫資料夾 */}
                    <div 
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={openIllustrationFolder}
                      style={{ width: '60px' }}
                    >
                      <div className="flex flex-col items-center justify-center p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
                        <div style={{ fontSize: '54px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px',
                  textAlign: 'center', 
                          color: '#ffffff', 
                          fontFamily: 'var(--font-zpix), monospace',
                          /* 扁平化風格，無文字陰影 */
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
                        <div style={{ fontSize: '54px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px',
                  textAlign: 'center', 
                          color: '#ffffff', 
                          fontFamily: 'var(--font-zpix), monospace',
                          /* 扁平化風格，無文字陰影 */
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
                        <div style={{ fontSize: '54px', marginBottom: '4px' }}>📁</div>
                        <span style={{ 
                          fontSize: '10px',
                  textAlign: 'center', 
                          color: '#ffffff', 
                          fontFamily: 'var(--font-zpix), monospace',
                          /* 扁平化風格，無文字陰影 */
                          lineHeight: '1.2'
                        }}>
                          品牌
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* DS Logo 背景裝飾 */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }}>
                    <img
                      src="/cursor-07.png"
                      alt="DS Logo Background"
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "500px",
                        maxHeight: "500px",
                        opacity: 0.6,
                        objectFit: "contain"
                      }}
                    />
                  </div>                  {/* LoginSignupCard 視窗 */}
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
                      description="Liam Design Studio，專注於品牌設計與視覺傳達的創意工作室。我們相信好的設計源於深入的理解與溝通，每一個專案都承載著獨特的故事與價值。從品牌識別到數位設計，我們用創意打造令人印象深刻的品牌體驗。"
                      windowTitle="Liam Design Studio - Intro.exe"
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
                        content={`Liam Design Studio - Design Studio

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



                  {/* Windows 98 Style 插畫視窗 */}
                  {!windowStates.illustrationWindow.closed && (
                    <div 
                      className="draggable-window"
                      style={{ 
                        position: 'absolute', 
                        left: windowStates.illustrationWindow.maximized ? '0' : `${windowPositions.illustrationWindow.x}px`,
                        top: windowStates.illustrationWindow.maximized ? '0' : `${windowPositions.illustrationWindow.y}px`,
                        width: windowStates.illustrationWindow.maximized ? '100%' : 'auto',
                        height: windowStates.illustrationWindow.maximized ? '100%' : 'auto',
                        cursor: isDragging === 'illustrationWindow' ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        zIndex: getWindowZIndex('illustrationWindow')
                      }}
                      onMouseDown={(e) => !windowStates.illustrationWindow.maximized && handleMouseDown(e, 'illustrationWindow')}
                    >
                      <div style={{
                        background: '#000',
                        border: '6px solid #fff',
                        borderRadius: '0',
                        padding: '0',
                        boxShadow: '8px 8px 0px #666',
                        fontFamily: 'var(--font-zpix), monospace',
                        position: 'relative',
                        overflow: 'hidden',
                        width: windowStates.illustrationWindow.maximized ? '100%' : '400px',
                        height: windowStates.illustrationWindow.maximized ? '100%' : '300px'
                      }}>
                        <div style={{
                          background: 'linear-gradient(to bottom, #333 0%, #000 100%)',
                          borderBottom: '2px solid #fff',
                          padding: '4px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#fff'
                        }}>
                          <span>插畫作品展示</span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <div 
                              onClick={() => handleMinimize('illustrationWindow')}
                              style={{
                                width: '16px',
                                height: '14px',
                                background: '#333',
                                border: '1px solid #666',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff'
                              }}>_</div>
                            <div 
                              onClick={() => handleMaximize('illustrationWindow')}
                              style={{
                                width: '16px',
                                height: '14px',
                                background: '#333',
                                border: '1px solid #666',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff'
                              }}>□</div>
                            <div 
                              onClick={() => handleClose('illustrationWindow')}
                              style={{
                                width: '16px',
                                height: '14px',
                                background: '#333',
                                border: '1px solid #666',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff'
                              }}>×</div>
                          </div>
                        </div>
                        <div style={{
                          background: '#222',
                          borderBottom: '1px solid #666',
                          padding: '4px 8px',
                          display: 'flex',
                          gap: '8px',
                          fontSize: '11px'
                        }}>
                          <span style={{ color: '#fff', fontWeight: 'bold' }}>作品</span>
                          <span style={{ color: '#fff' }}>風格</span>
                          <span style={{ color: '#fff' }}>技法</span>
                          <span style={{ color: '#fff' }}>聯絡</span>
                        </div>
                        <div style={{ padding: '20px' }}>
                          <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#fff',
                            margin: '0 0 15px 0',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                          }}>
                            插畫作品展示
                          </h1>
                          <p style={{
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: '#ccc',
                            margin: '0',
                            textAlign: 'justify'
                          }}>
                            探索創意與想像的無限可能，每一幅插畫都是故事的開始。從傳統手繪到數位創作，展現多元的藝術風格與表現手法。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 桌面老虎機小工具 */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 15
                    }}
                  >
                    <SlotMachine />

                    {/* 跑馬燈（桌面版） */}
                    <div className="w-full py-4 overflow-hidden mt-4" style={{ backgroundColor: '#003EC3', borderRadius: '8px' }}>
                      <div className="animate-marquee whitespace-nowrap">
                        {Array(6).fill(null).map((_, i) => (
                          <span key={i} className="text-white text-xl font-extrabold mx-8">
                            <span style={{ fontFamily: 'var(--font-press-start-2p)' }}>Start your brand journey here.</span>
                            <span style={{ fontFamily: 'var(--font-zpix), monospace' }}>｜從這裡開始你的品牌旅程</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-black py-4 overflow-hidden mt-2" style={{ borderRadius: '8px' }}>
                      <div className="animate-marquee-reverse whitespace-nowrap">
                        {Array(6).fill(null).map((_, i) => (
                          <span key={i} className="text-white text-xl font-extrabold mx-8">
                            <span style={{ fontFamily: 'var(--font-press-start-2p)' }}>Start your brand journey here.</span>
                            <span style={{ fontFamily: 'var(--font-zpix), monospace' }}>｜從這裡開始你的品牌旅程</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 響應式模式 - 一欄式布局 */}
                <div className="lg:hidden h-auto overflow-y-auto" style={{ paddingBottom: '40px' }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'clamp(15px, 4vw, 20px)',
                    padding: '0',
                    width: '100%'
                  }}>
                    {/* 條件渲染手機版視窗 */}
                    {!windowStates.loginCard.closed && (
                      <LoginSignupCard 
                      title="來自土地的設計夥伴"
                      description="Liam Design Studio，專注於品牌設計與視覺傳達的創意工作室。我們相信好的設計源於深入的理解與溝通，每一個專案都承載著獨特的故事與價值。從品牌識別到數位設計，我們用創意打造令人印象深刻的品牌體驗。"
                      windowTitle="Liam Design Studio - Intro.exe"
                      leftImage="/hero.png"
                      width="100%"
                      height="clamp(280px, 50vw, 350px)"
                    />
                    )}
                    
                    {!windowStates.textWindow.closed && (
                      <TextWindow 
                      windowTitle="專案說明.txt"
                      width="100%"
                      height="clamp(250px, 45vw, 300px)"
                      content={`Liam Design Studio - Design Studio

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
                    )}
                    
                    {!windowStates.carouselWindow.closed && (
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
                    )}

                    {/* Windows 98 Style 插畫視窗 - 手機版 */}
                    {!windowStates.illustrationWindow.closed && (
                      <div style={{
                        background: '#000',
                        border: '6px solid #fff',
                        borderRadius: '0',
                        padding: '0',
                        boxShadow: '8px 8px 0px #666',
                        fontFamily: 'var(--font-zpix), monospace',
                        width: '100%',
                        height: 'clamp(250px, 45vw, 300px)'
                      }}>
                        <div style={{
                          background: 'linear-gradient(to bottom, #333 0%, #000 100%)',
                          borderBottom: '2px solid #fff',
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#fff'
                        }}>
                          插畫作品展示
                        </div>
                        <div style={{
                          background: '#222',
                          borderBottom: '1px solid #666',
                          padding: '4px 8px',
                          fontSize: '11px',
                          color: '#fff'
                        }}>
                          作品 | 風格 | 技法 | 聯絡
                        </div>
                        <div style={{ padding: '20px' }}>
                          <h1 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#fff',
                            margin: '0 0 15px 0',
                            textAlign: 'center'
                          }}>
                            插畫作品展示
                          </h1>
                          <p style={{
                            fontSize: '12px',
                            lineHeight: '1.6',
                            color: '#ccc',
                            margin: '0',
                            textAlign: 'center'
                          }}>
                            探索創意與想像的無限可能，每一幅插畫都是故事的開始。從傳統手繪到數位創作，展現多元的藝術風格與表現手法。
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 手機版老虎機小工具 */}
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '20px 0'
                    }}>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '20px 0'
                    }}>
                      <SlotMachine />
                    </div>
                    
                    {/* 跑馬燈（手機版） */}
                    <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
                      <div className="animate-marquee whitespace-nowrap">
                        {Array(6).fill(null).map((_, i) => (
                          <span key={i} className="text-white text-xl font-extrabold mx-8">
                            <span style={{ fontFamily: 'var(--font-press-start-2p)' }}>Start your brand journey here.</span>
                            <span style={{ fontFamily: 'var(--font-zpix), monospace' }}>｜從這裡開始你的品牌旅程</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-black py-4 overflow-hidden">
                      <div className="animate-marquee-reverse whitespace-nowrap">
                        {Array(6).fill(null).map((_, i) => (
                          <span key={i} className="text-white text-xl font-extrabold mx-8">
                            <span style={{ fontFamily: 'var(--font-press-start-2p)' }}>Start your brand journey here.</span>
                            <span style={{ fontFamily: 'var(--font-zpix), monospace' }}>｜從這裡開始你的品牌旅程</span>
                          </span>
                        ))}
                      </div>
                    </div>                  </div>
                </div>
              </section>
            </div>

            {/* ProfileCard Intro 區塊 - 取代原本的自我介紹區塊 */}
            <div className="w-full max-w-screen-2xl mx-auto px-1 md:px-8 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.35 }}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl">
                  <ProfileCard />
                </div>
              </motion.div>
            </div>            {/* 四個滾動分段 */}
            {/* Section 1: Design */}
            <section className="scroll-section design-section" style={{ 
              minHeight: '100vh', 
              backgroundColor: '#FFFFF3',
              padding: '4rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-content">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold text-black mb-6"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    #Design
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-black mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    我們相信設計不僅是視覺的美學，更是解決問題的工具。從品牌識別到數位介面，每一個設計決策都源於深度的用戶研究與市場洞察。我們創造的不只是美麗的設計，而是能夠與使用者產生共鳴、推動業務成長的設計解決方案。
                  </motion.p>
                  <motion.button
                    className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    閱讀更多
                  </motion.button>
                </div>
                <div className="image-content">
                  <motion.img 
                    src="/illustration_1.png" 
                    alt="Design Portfolio" 
                    className="w-full h-auto rounded-lg"
                    style={{ height: 'auto', objectFit: 'contain' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Illustration */}
            <section className="scroll-section illustration-section" style={{ 
              minHeight: '100vh', 
              backgroundColor: '#FFFFF3',
              padding: '4rem 2rem',
              position: 'relative',
            }}>
              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10">
                <div className="mb-12">
                  <IllustrationSplitCarousel />
                </div>
              </div>
            </section>

            {/* Section 3: Brand */}
            <section className="scroll-section brand-section" style={{ 
              minHeight: '100vh', 
              backgroundColor: '#FFFFF3',
              backgroundImage: 'url(/bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: '4rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* 背景圖片透明度遮罩 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.45)', // 55% 透明度
                zIndex: 1
              }}></div>
              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" style={{ position: 'relative', zIndex: 2 }}>
                <div className="text-content">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold text-black mb-6"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    #Brand
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-black mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    品牌建立是一個深度的策略過程。我們從品牌核心價值出發，透過視覺識別、品牌故事與使用者體驗的整合設計，打造具有獨特個性與市場競爭力的品牌形象。我們相信每個品牌都有其獨特的DNA，我們的任務就是將這份獨特性轉化為令人印象深刻的品牌體驗。
                  </motion.p>
                  <motion.button 
                    className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    閱讀更多
                  </motion.button>
                </div>
                <div className="image-content">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="w-full"
                  >
                    <CardCarousel 
                      cards={brandCases} 
                      autoPlayInterval={4000} 
                      className="h-96 md:h-80 lg:h-96"
                    />
                  </motion.div>
                </div>              </div>
            </section>

            {/* Section 4: Contact */}
            <section className="scroll-section contact-section" style={{ 
              minHeight: '100vh', 
              backgroundColor: '#353535',
              padding: '4rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Version B showcase from card-test */}
                            <div className="max-w-screen-2xl w-full mx-auto mb-12 px-6 md:px-10 space-y-6">
                <TestCardAlt title="深色覆蓋・品牌主視覺" subtitle="以深色罩層保持文字可讀性，背景仍保留影像質感，適合大圖敘事。" imageSrc="/illustration_4.png" tag="#Brand" />
                <TestCardAlt title="插畫場景・水平版卡片" subtitle="水平排版讓資訊更緊湊，適合長文引導與外部連結。" imageSrc="/illustration_5.png" tag="#Illustration" />
              </div>
               <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="image-content lg:order-1">
                  <motion.img 
                    src="/illustration_4.png" 
                    alt="Contact Portfolio" 
                    className="w-full h-auto rounded-lg"
                    style={{ height: 'auto', objectFit: 'contain' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  />
                </div>
                <div className="text-content lg:order-2">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-6"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    #Contact
                  </motion.h1>
                  <motion.p className="text-lg md:text-xl text-white mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    準備好開始你的下一個專案了嗎？無論是品牌重塑、產品設計或是創意諮詢，我們都期待與你合作。讓我們一起創造出真正有影響力的設計作品。立即聯繫我們，開始你的設計之旅。
                  </motion.p>
                  <motion.button 
                    className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    立即聯繫
                  </motion.button>
                </div>
              </div>

            {/* Footer */}
            <footer className="bg-[#353535] text-white py-16">
              <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Logo */}
                  <div className="flex justify-center md:justify-start">
                    <img 
                      src="/cursor-08.png" 
                      alt="Liam Design Studio" 
                      className="h-16 w-auto"
                    />
                  </div>
                  
                  {/* Contact Info */}
                  <div className="text-center md:text-left space-y-4">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                      聯絡我們
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <span className="text-sm">📧</span>
                        <span className="text-sm">hello@liamdesign.com</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <span className="text-sm">📱</span>
                        <span className="text-sm">@liamdesign</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <span className="text-sm">💬</span>
                        <span className="text-sm">@liamdesign</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tagline */}
                  <div className="text-center md:text-right">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                      Own the Day.<br />
                      掌握今天。
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Design your moment before it passes.<br />
                      在它溜走之前，設計屬於你的時刻。
                    </p>
                  </div>
                </div>
                
                {/* Copyright */}
                <div className="border-t border-gray-600 mt-12 pt-8 text-center">
                  <p className="text-sm text-gray-400">
                    © 2025 Liam Design Studio. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>            </section>
          </>
        )}
      </div>

      <style jsx>{`
        /* 手機版滾動調整 */
        
          .hero-logo-container {
             display: flex;
             justify-content: center;
             align-items: center;
             width: 100%;
             position: fixed;
             top: 0;
             left: 0;
             z-index: 50;
             background-color: #FFFFF3;
             padding: 1rem 0;
           }
           
           .hero-logo {
             /* 扁平化風格 */
           }
           

          .map-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          
          .map-image {
            transition: all 0.3s ease;
          }
          
          .enter-button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          
          .enter-btn {
            transition: all 0.3s ease;
          }
          
          .enter-btn:hover {
            transform: scale(1.05);
          }
@media (max-width: 1023px) {
          .map-image {
            width: 70vw !important;
          }
          
          .enter-btn {
            padding: clamp(10px, 2.5vw, 16px) clamp(20px, 5vw, 32px) !important;
            fontSize: clamp(12px, 3vw, 18px) !important;
          }

           
           .hero-logo {
             width: clamp(100px, 30vw, 200px) !important;
           }
           
           .hero-logo {
             width: clamp(100px, 30vw, 200px) !important;
           }
          * {
            box-sizing: border-box;
          }
          
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          
          /* 入口modal響應式調整 */
          .win98-window {
            max-height: 85vh !important;
            margin: 20px 10px !important;
          }
          
                     /* 首頁響應式調整 */
           .hero-grid-container {

        /* 隱藏所有標語 */
        .slogan-1, .slogan-2, .slogan-3 {
          display: none !important;
        }             width: 100vw !important;
             height: 100vh !important;
             padding: 0 !important;
             margin: 0 !important;
           }
           
           .hero-main-container {
             top: 50% !important;
           }
           
           
           .hero-logo {
             
           }
           
           .hero-logo:hover {
             
           }
           
           
           .hero-logo {
             
           }
           
           .hero-logo:hover {
             
           }
           
           .hero-content-container {
             width: 100vw;
             height: clamp(70vh, 85vh, 90vh);
             max-width: 100vw;
             max-height: 90vh;
           }
           
           /* 地圖和DS Logo響應式縮放 */
           .hero-content-container img[alt="像素地圖"] {
             transform: scale(1.0) !important;
             max-width: 95vw !important;
             max-height: 75vh !important;
           }
           
           .hero-content-container img[alt="DS Logo"] {
             transform: scale(1.0) !important;
             max-width: 75vw !important;
             position: absolute !important;
             top: 10% !important;
             left: 50% !important;
             transform: translateX(-50%) scale(1.0) !important;
           }
           
           }
          
                     /* Enter按鈕響應式 */
           .enter-button {
             bottom: 25% !important;
             transform: translateX(-50%);
             width: clamp(100px, 28vw, 150px);
             height: clamp(40px, 12vw, 60px);
           }
          .desktop-area {
            overflow-y: auto !important;
            max-height: none !important;
            padding-bottom: 40px !important;
          }
          
          .desktop-section {
            padding: 0 !important;
            width: 100vw !important;
            margin: 0 !important;
          }
          
          .mobile-window {
            position: static !important;
            left: auto !important;
            top: auto !important;
            margin-bottom: 20px !important;
            cursor: default !important;
            width: 100% !important;
            max-width: none !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .mobile-window > *, .mobile-window > * > * {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .mobile-window .retro-card, .mobile-window .text-window, 
          .mobile-window .carousel-window, .mobile-window .contact-form {
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
          
          /* 強制手機版組件撐滿寬度 */
          .lg\\:hidden .retro-card,
          .lg\\:hidden .text-window,
          .lg\\:hidden .carousel-window,
          .lg\\:hidden .contact-form {
            width: 100vw !important;
            max-width: 100vw !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
        }

        /* 桌面版設置 */
        @media (min-width: 1024px) {
          /* 強制隱藏漢堡選單 */
          .block.lg\\:hidden {
            display: none !important;
          }
          
          .desktop-section {
            padding: clamp(10px, 3vw, 20px) !important;
          }
          
          .mobile-window {
            width: auto !important;
          }
          
          .mobile-window .retro-card {
            width: 600px !important;
            max-width: 600px !important;
          }
          
          .mobile-window .text-window {
            width: 400px !important;
            max-width: 400px !important;
          }
          
          .mobile-window .carousel-window {
            width: 450px !important;
            max-width: 450px !important;
          }
          
          .mobile-window .contact-form {
            width: 500px !important;
            max-width: 500px !important;
          }
        }
        .hero-grid-container {

        /* 隱藏所有標語 */
        .slogan-1, .slogan-2, .slogan-3 {
          display: none !important;
        }          position: relative;
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

        /* 船隻元件樣式 */
        .boat-container {
          position: relative;
        }
        
        .boat-with-waves {
          position: absolute;
          width: min(100vw, 600px);
          z-index: 2;
          animation: bob 2.6s ease-in-out infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.2);
          transform-origin: center center;
        }
        
        .boat-with-waves::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: -50%;
          width: 200%;
          height: 60px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q25,25 50,40 Q75,55 100,40 Q125,25 150,40 Q175,55 200,40 Q225,25 250,40 Q275,55 300,40 Q325,25 350,40 Q375,55 400,40 L400,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 150px 100%;
          animation: wave-move 8s linear infinite;
          z-index: 3;
        }

        .boat-img { 
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 2;
        }
        
        @keyframes bob { 
          0%, 100% { transform: translate(-50%, -50%) scale(1.2) translateY(0) rotate(0.5deg); } 
          50% { transform: translate(-50%, -50%) scale(1.2) translateY(-3px) rotate(-0.5deg); } 
        }
        @keyframes wave-move {
          0% { background-position-x: 0; }
          100% { background-position-x: 150px; }
        }

        @media (max-width: 768px) {
          .boat-with-waves { 
            width: min(60vw, 250px);
            animation: bob 2.6s ease-in-out infinite;
          }
          .boat-with-waves::after {
            bottom: -15px;
            height: 50px;
            background-size: 120px 100%;
          }
        }

        /* Illustration read-more button (customizable via CSS variables) */
        .illustration-section .illu-readmore-btn {
          background-color: #FFFFFF;
          color: #003EC3;
          border: 2px solid #003EC3;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 1.125rem; /* ~ text-lg */
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .illustration-section .illu-readmore-btn:hover {
          background-color: #3aaf3a;
          color: #FFFFF3;
          border-color: #3aaf3a;
          transform: translateY(-2px);
        }

                    .illustration-section {
                --illu-btn-bg: #FFFFFF;
                --illu-btn-fg: #003EC3;
                --illu-btn-border: #003EC3;
                --illu-btn-hover-bg: #3aaf3a;
                --illu-btn-hover-fg: #FFFFF3;
                --illu-btn-hover-border: #3aaf3a;
              }
            `}</style>

    </div>
  );
}
