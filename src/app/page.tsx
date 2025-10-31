'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import LoginSignupCard from '../components/LoginSignupCard';
import TextWindow from '../components/TextWindow';
import CarouselWindow from '../components/CarouselWindow';
import SlotMachine from '../components/SlotMachine';
import { motion } from 'framer-motion';
import TestCardCarousel from '../components/TestCardCarousel';
import ReadMoreModal from '../components/ReadMoreModal';
// import CardCarousel from '../components/CardCarousel';
// import CharacterWindow from '../components/CharacterWindow';
// import AnimatedCheckerboard from '../components/test/AnimatedCheckerboard';
import ParallaxSection from '../components/ParallaxSection';
import ProfileIntroWindow from '../components/ProfileIntroWindow';
import AboutLiamTag from '../components/AboutLiamTag';
import ImageCarouselCard from '../components/ImageCarouselCard';
import BrandImageCarouselCard from '../components/BrandImageCarouselCard';
import ContactModal from '../components/ContactModal';
import MapNavigation from '../components/MapNavigation';
import ModernButton from '../components/ModernButton';
import { useInView } from 'framer-motion';

export default function Home() {
  // 品牌案例數據 - 暫時註解掉未使用的變數
  // const brandCases = [
  //   {
  //     title: "品牌識別設計",
  //     subtitle: "從 Logo 到色彩系統，建立完整的視覺識別體系。",
  //     imageSrc: "/illustration_1.png",
  //     tags: ["Brand", "Identity"]
  //   },
  //   {
  //     title: "品牌應用設計",
  //     subtitle: "將品牌元素延伸到各種應用場景，保持一致性。",
  //     imageSrc: "/illustration_2.png",
  //     tags: ["Brand", "Application"]
  //   },
  //   {
  //     title: "品牌故事包裝",
  //     subtitle: "透過視覺設計傳達品牌核心價值與故事。",
  //     imageSrc: "/illustration_3.png",
  //     tags: ["Brand", "Story"]
  //   },
  //   {
  //     title: "品牌體驗設計",
  //     subtitle: "從接觸點到使用者旅程，打造完整品牌體驗。",
  //     imageSrc: "/illustration_4.png",
  //     tags: ["Brand", "Experience"]
  //   },
  //   {
  //     title: "品牌策略規劃",
  //     subtitle: "深度分析市場定位，制定品牌發展策略。",
  //     imageSrc: "/illustration_5.png",
  //     tags: ["Brand", "Strategy"]
  //   }
  // ];
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'contact' | 'pricing' | null>(null);
  const [profileIntroOpen, setProfileIntroOpen] = useState(false);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [illustrationModalOpen, setIllustrationModalOpen] = useState(false);
  const [testCardModalOpen, setTestCardModalOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(58);
  const [boatExiting, setBoatExiting] = useState(false);
  
  // 打字機效果狀態
  const [typewriterText, setTypewriterText] = useState('');
  
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
  
  // 手機版選單視窗狀態
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

  // 打字機效果
  useEffect(() => {
    if (showRight && !showIntroModal) {
      const fullText = "#Own the Day #Go Live Today";
      let currentIndex = 0;
      
      const typewriterInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypewriterText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
        }
      }, 100); // 每100ms打一個字
      
      return () => clearInterval(typewriterInterval);
    }
  }, [showRight, showIntroModal]);

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

  // Modal 處理函數
  const openModal = (type: 'contact' | 'pricing') => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
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
  };

  // 回到主頁 (已移除，等整體網頁做好再串連)

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
                  fontSize: 'clamp(14px, 3.5vw, 22px)'
                }}>
                <p>
                  設計不是等待靈感，而是立刻開始。<br/>
                  點進來，讓我們今天就動手。
                </p>
              </div>
              
                {/* 英文介紹 */}
              <div style={{
                borderTop: '3px solid white',
                  paddingTop: 'clamp(12px, 3vw, 20px)',
                  textAlign: 'center',
                  fontSize: 'clamp(12px, 3vw, 20px)'
              }}>
                <p>
                  Design isn&rsquo;t about waiting for inspiration.<br/>
                  Click in — let&rsquo;s start today.
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
            {/* 打字機效果標題 - 移到船的上方 */}
            <div className="typewriter-container mb-8" style={{
              opacity: showRight && !showIntroModal ? 1 : 0,
              transform: `translateY(${showRight ? '0' : '20px'})`,
              transition: 'all 1.0s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 1,
              transitionDelay: showRight && !showIntroModal ? '0.8s' : '0s',
              position: 'relative',
              marginBottom: 'clamp(20px, 4vw, 40px)',
              paddingTop: 'clamp(10px, 2vw, 20px)',
              paddingBottom: 'clamp(10px, 2vw, 20px)'
            }}>
              <h3 
                className="text-2xl md:text-3xl font-bold text-center"
                style={{ 
                  fontFamily: 'var(--font-zpix), monospace',
                  color: '#003EC3',
                  minHeight: '2.5rem'
                }}
              >
                {typewriterText}
                <span className="animate-pulse">|</span>
              </h3>
            </div>
            
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
                <img src="/boat1031.png" alt="Boat" className="boat-img" />
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
              <ModernButton
                onClick={() => {
                  // 延遲執行進入功能
                  setTimeout(() => {
                    handleEnter();
                  }, 200);
                }}
                variant="primary"
                size="lg"
                style={{
                  padding: 'clamp(12px, 3vw, 20px) clamp(24px, 6vw, 40px)',
                  fontSize: 'clamp(14px, 3.5vw, 20px)',
                }}
              >
                ENTER
              </ModernButton>
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
                <div className="animate-marquee-reverse whitespace-nowrap">
                  {Array(12).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>進入工作室  Step In →</span>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: "#003EC3" }} className="w-full py-4 overflow-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap">
                  {Array(12).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>進入工作室  Step In →</span>
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
            </div>

            {/* Parallax 效果區塊 - 在跑馬燈下方，使用條件顯示 */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <ParallaxSection show={true} />
            </div>

            {/* 蝴蝶頁 Slogan - 在 ParallaxSection 和老虎機之間 */}
            <div 
              style={{ 
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFF3',
                position: 'relative',
                zIndex: 5
              }}
            >
              <div 
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-zpix), monospace',
                  fontSize: 'clamp(16px, 4vw, 32px)',
                  fontWeight: 'bold',
                  color: '#353535',
                  lineHeight: '1.6',
                  maxWidth: '90%',
                  padding: '0 20px'
                }}
              >
                <div>Open today like a gift.</div>
                <div style={{ marginTop: 'clamp(8px, 2vw, 16px)' }}>打開今天，就像拆一份禮物。</div>
              </div>
            </div>

            {/* 手機版固定小圖示 */}
            <div className="fixed top-4 right-4 z-50 lg:hidden" style={{ zIndex: 10000 }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#003EC3',
                  border: '2px solid #003EC3',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-zpix), monospace',
                  fontSize: '16px',
                  color: '#FFFFF3',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3aaf3a';
                  e.currentTarget.style.borderColor = '#3aaf3a';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#003EC3';
                  e.currentTarget.style.borderColor = '#003EC3';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
              >
                ☰
              </div>
            </div>

            {/* 手機版選單視窗 */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ zIndex: 10001 }}>
                <div className="win98-window relative" style={{
                  width: '320px',
                  maxWidth: '90vw',
                  background: '#000000',
                  border: '2px outset #333333',
                  fontFamily: 'var(--font-zpix), monospace',
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
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    <span>選單 Menu</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        background: '#333333',
                        border: '1px outset #666666',
                        color: 'white',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '10px',
                        fontFamily: 'var(--font-zpix), monospace'
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        (e.target as HTMLElement).style.border = '1px inset #666666';
                      }}
                      onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #666666'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #666666'}
                    >
                      ×
                    </button>
                  </div>

                  {/* 選單內容 */}
                  <div style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {/* 返回 Return */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到頂部
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>🏠</span>
                        <span>返回 Return</span>
                      </div>

                      {/* 關於 Liam */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到 ProfileCard 區塊
                          const profileSection = document.querySelector('.profile-section');
                          if (profileSection) {
                            profileSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>👤</span>
                        <span>關於 Liam</span>
                      </div>

                      {/* 全部作品 All Works */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到作品集區塊
                          const portfolioSection = document.querySelector('#portfolio');
                          if (portfolioSection) {
                            portfolioSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>🎯</span>
                        <span>全部作品 All Works</span>
                      </div>

                      {/* 設計服務 Design Services */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到設計區塊
                          const designSection = document.querySelector('#design');
                          if (designSection) {
                            designSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>🎨</span>
                        <span>設計服務 Design Services</span>
                      </div>

                      {/* 插畫服務 Illustration Services */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到插畫區塊
                          const illustrationSection = document.querySelector('#illustration');
                          if (illustrationSection) {
                            illustrationSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>🖼️</span>
                        <span>插畫服務 Illustration Services</span>
                      </div>


                      {/* 聯繫 Liam */}
                      <div
                        onClick={() => {
                          setMobileMenuOpen(false);
                          // 滾動到聯絡區塊
                          const contactSection = document.querySelector('#contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          background: '#000000',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#003EC3';
                          (e.currentTarget as HTMLElement).style.color = '#FFFFF3';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = '#000000';
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                      >
                        <span>📧</span>
                        <span>聯繫 Liam</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="fixed right-0 bottom-0 z-50 p-6" style={{ 
              transform: 'scale(1.5)', 
              transformOrigin: 'right bottom', 
              zIndex: 10000 
            }}>
              <div className="logo-block long">
                <Image src="/cursor-07.png" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
              </div>
            </div>

            {/* 老虎機區塊上方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>嘗試老虎機 Try a slot machine</span>
                ))}
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

                    
                  </div>
                </div>
              </section>
            </div>

            {/* 地圖導覽區跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>進入地圖導覽區 →</span>
                ))}
              </div>
            </div>

            {/* MapNavigation 地圖導覽元件 */}
            <div className="w-full max-w-screen-2xl mx-auto px-4 py-12">
              <MapNavigation />
            </div>

            {/* ProfileCard 上方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>#About Liam #設計師 #品牌夥伴 #創意夥伴</span>
                ))}
              </div>
            </div>

            {/* About Liam 區塊 - 響應式設計 */}
            <div id="intro" className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-12 md:py-16 profile-section">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.35 }}
                className="w-full"
              >
                {/* 手機版：圓圈頭貼 + 按鈕 */}
                <div className="md:hidden flex flex-col items-center justify-center space-y-6">
                  {/* 圓圈頭貼 */}
                  <div className="relative">
                    <div 
                      className="w-48 h-48 rounded-full overflow-hidden"
                      style={{ 
                        border: '4px solid #000000',
                        backgroundColor: '#003EC3',
                        clipPath: 'circle(50% at 50% 50%)'
                      }}
                    >
                      <Image
                        src="/profilecard.png"
                        alt="Liam 個人頭像"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                    </div>
                  </div>

                  {/* 現代化按鈕 */}
                  <ModernButton
                    onClick={() => setProfileIntroOpen(true)}
                    variant="primary"
                    size="lg"
                  >
                    👤 開啟個人介紹
                  </ModernButton>
                </div>

                {/* 桌面版：內嵌式 ProfileIntroWindow */}
                <div className="hidden md:flex md:justify-center md:items-center">
                  <ProfileIntroWindow 
                    isOpen={true}
                    onClose={() => {}}
                    embedded={true}
                  />
                </div>
              </motion.div>
            </div>

            {/* 分隔線 */}
            <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-6">
              <div className="border-t-2 border-gray-600"></div>
            </div>

            {/* 瀑布流作品牆 - 完整功能版本 */}
            <div id="portfolio">
              <WaterfallPortfolioSection />
            </div>

            {/* 四個滾動分段 */}
            {/* Design 上方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>設計傾聽你的聲音｜Design that Listens</span>
                ))}
              </div>
            </div>

            {/* Section 1: Design */}
            <section id="design" className="scroll-section design-section" style={{ 
              backgroundColor: '#003EC3',
              padding: '4rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-content lg:basis-1/2">
                  {/* AboutLiamTag - Design 區塊 */}
                  <div className="mb-6">
                    <AboutLiamTag 
                      backgroundColor="#FFFFF3"
                      textColor="#003EC3"
                    />
                  </div>
                  
                  <motion.h1
                    className="text-3xl md:text-5xl font-black text-[#FFFFF3] mb-4"
                    style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", "Noto Sans", sans-serif' }}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    Design that Listens｜傾聽的設計
                  </motion.h1>
                  
                  <motion.h2
                    className="text-xl md:text-2xl font-medium text-[#FFFFF3] mb-6"
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    We turn your ideas into visuals that breathe.｜把想法變成會呼吸的設計
                  </motion.h2>
                  
                  <motion.p
                    className="text-base md:text-lg text-[#FFFFF3] mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    我們相信設計不是炫技，而是解決問題的工具。<br/>
                    從品牌識別、菜單、活動文宣到社群圖像，專注於讓設計能貼近生活，幫助品牌長出下一步。
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    <button
                      onClick={() => setDesignModalOpen(true)}
                      style={{
                        backgroundColor: '#FFFFF3',
                        color: '#003EC3',
                        border: '2px solid #003EC3',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-zpix), monospace',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3aaf3a';
                        e.currentTarget.style.color = '#FFFFF3';
                        e.currentTarget.style.borderColor = '#3aaf3a';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFF3';
                        e.currentTarget.style.color = '#003EC3';
                        e.currentTarget.style.borderColor = '#003EC3';
                      }}
                    >
                      閱讀更多
                    </button>
                  </motion.div>
                </div>
                <div className="image-content lg:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="w-full flex justify-center"
                  >
                    <BrandImageCarouselCard 
                      images={[
                        '/illustration_1.png',
                        '/illustration_2.png',
                        '/illustration_3.png',
                        '/illustration_4.png',
                        '/illustration_5.png'
                      ]}
                      autoPlay={true}
                      autoPlayInterval={4000}
                      className="w-full h-full"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Design 下方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>設計傾聽你的聲音｜Design that Listens</span>
                ))}
              </div>
            </div>

            {/* Illustration 上方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>插畫拉近人的距離｜Illustration brings brands closer</span>
                ))}
              </div>
            </div>

            {/* Section 2: Illustration */}
            <section id="illustration" className="scroll-section illustration-section" style={{ 
              backgroundColor: '#003EC3',
              padding: '4rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch h-full">
                  {/* 左側 50% - ImageCarouselCard */}
                  <div className="md:basis-[50%] md:flex-1 flex flex-col gap-4">
                    <div className="w-full h-full">
                      <ImageCarouselCard 
                        images={[
                          '/illustration_1.png',
                          '/illustration_2.png',
                          '/illustration_3.png',
                          '/illustration_4.png',
                          '/illustration_5.png',
                          '/illustration_6.png'
                        ]}
                        slogan="#插畫 #親手製作 #在地感 #溫度設計"
                        showTag={false}
                        showDescription={false}
                        showProgressBar={true}
                        autoPlayInterval={4000}
                        className="w-full h-full max-w-none"
                      />
                    </div>
                  </div>

                  {/* 右側 50% - 文字內容 */}
                  <div className="md:basis-[50%] md:max-w-[50%]">
                    <div className="sticky top-8 p-6 rounded-xl border border-transparent bg-[#003EC3]" style={{ zIndex: 10 }}>
                      {/* 標籤 */}
                      <div className="mb-6">
                        <AboutLiamTag 
                          text="#插畫 #親手製作 #在地感 #溫度設計"
                          backgroundColor="#FFFFF3"
                          textColor="#003EC3"
                        />
                      </div>

                      {/* 大標題 */}
                      <h2 className="text-3xl md:text-5xl font-black text-[#FFFFF3] mb-3" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", "Noto Sans", sans-serif' }}>
                        Illustration with Heart｜有溫度的插畫
                      </h2>

                      {/* 副標題 */}
                      <h3 className="text-xl md:text-2xl font-medium text-[#FFFFF3] mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                        Handmade lines, heartfelt stories.｜親手畫下，心裡的故事
                      </h3>

                      {/* 內文 */}
                      <p className="leading-relaxed mb-5 text-base md:text-lg" style={{ color: '#FFFFF3' }}>
                        每一筆一劃，能承載記憶、能創造連結。<br/>
                        我喜歡把宜蘭的風、地方的小故事、品牌的日常，<br/>
                        透過線條與色彩，讓人感到親近。<br/>
                        是一種邀請，邀請民眾靠近，聽見品牌的故事，感受到這裡的生活氣息。
                      </p>

                      <button
                        onClick={() => setIllustrationModalOpen(true)}
                        style={{
                          backgroundColor: '#FFFFF3',
                          color: '#003EC3',
                          border: '2px solid #003EC3',
                          borderRadius: '8px',
                          padding: '12px 24px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-zpix), monospace',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3aaf3a';
                          e.currentTarget.style.color = '#FFFFF3';
                          e.currentTarget.style.borderColor = '#3aaf3a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFF3';
                          e.currentTarget.style.color = '#003EC3';
                          e.currentTarget.style.borderColor = '#003EC3';
                        }}
                      >
                        閱讀更多
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Illustration 下方跑馬燈 */}
            <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(12).fill(null).map((_, i) => (
                  <span key={i} className="text-[#FFFFF3] text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>插畫拉近人的距離｜Illustration brings brands closer</span>
                ))}
              </div>
            </div>

            {/* Section 3: Contact */}
            <section className="scroll-section contact-section" style={{ 
              backgroundColor: '#353535',
              padding: '4rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Version B showcase from card-test */}
              <div className="max-w-screen-2xl w-full mx-auto mb-12 px-6 md:px-10">
                <TestCardCarousel 
                  cards={[
                    {
                      id: 1,
                      title: "深色覆蓋・品牌主視覺",
                      subtitle: "以深色罩層保持文字可讀性，背景仍保留影像質感，適合大圖敘事。",
                      imageSrc: "/illustration_4.png",
                      tag: "#Brand",
                      onReadMore: () => setTestCardModalOpen(true)
                    },
                    {
                      id: 2,
                      title: "插畫場景・水平版卡片",
                      subtitle: "水平排版讓資訊更緊湊，適合長文引導與外部連結。",
                      imageSrc: "/illustration_5.png",
                      tag: "#Illustration",
                      onReadMore: () => setTestCardModalOpen(true)
                    },
                    {
                      id: 3,
                      title: "設計系統・組件展示",
                      subtitle: "展示設計系統的組件化思維，確保視覺一致性和開發效率。",
                      imageSrc: "/illustration_6.png",
                      tag: "#Design",
                      onReadMore: () => setTestCardModalOpen(true)
                    },
                    {
                      id: 4,
                      title: "品牌應用・多元場景",
                      subtitle: "將品牌元素應用到各種場景，展現品牌的靈活性和適應性。",
                      imageSrc: "/illustration_1.png",
                      tag: "#Brand",
                      onReadMore: () => setTestCardModalOpen(true)
                    },
                    {
                      id: 5,
                      title: "創意探索・實驗性設計",
                      subtitle: "不斷嘗試新的設計語言和表現手法，探索視覺設計的無限可能。",
                      imageSrc: "/illustration_2.png",
                      tag: "#Creative",
                      onReadMore: () => setTestCardModalOpen(true)
                    },
                    {
                      id: 6,
                      title: "使用者體驗・介面設計",
                      subtitle: "以使用者為中心的設計思維，創造直觀且美觀的數位體驗。",
                      imageSrc: "/illustration_3.png",
                      tag: "#UX",
                      onReadMore: () => setTestCardModalOpen(true)
                    }
                  ]}
                />
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
                  {/* Windows 98 風格按鈕組 */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 150 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    {/* 立即聯繫按鈕 */}
                    <div id="contact" className="flex-1">
                      <ModernButton 
                        onClick={() => openModal('contact')}
                        variant="primary"
                        size="lg"
                        fullWidth
                      >
                        📧 立即聯繫
                      </ModernButton>
                    </div>

                    {/* 價目表按鈕 */}
                    <div className="flex-1">
                      <ModernButton 
                        onClick={() => openModal('pricing')}
                        variant="secondary"
                        size="lg"
                        fullWidth
                      >
                        💰 價目表
                      </ModernButton>
                    </div>
                  </motion.div>
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
                    <h2 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-noto-sans-tc), sans-serif', fontWeight: 800 }}>
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
          /* 桌面版樣式 */
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
          
          /* 手機版背景星星往上移動20px */
          .hero-block-grid {
            background-position-y: -20px !important;
          }
          
          .hero-block-grid::before,
          .hero-block-grid::after {
            transform: translateY(-20px) !important;
          }
          
          /* 如果有星星裝飾元素 */
          .hero-block-grid [class*="star"],
          .hero-grid-container [class*="star"],
          .hero-block-grid [style*="star-big"],
          .hero-grid-container [style*="star-big"] {
            transform: translateY(-20px) !important;
          }
          
          /* 手機版隱藏船下方的星星 */
          .boat-container::after {
            content: '';
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 150%;
            height: 80px;
            background: #FFFFF3;
            z-index: 100;
            pointer-events: none;
          }
          
          /* 確保船圖片本身不會顯示下方的星星部分 - 使用 clip-path 裁剪 */
          .boat-img {
            overflow: hidden;
            object-fit: contain;
            object-position: center top;
            clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 85%);
          }
          
          /* 隱藏船容器下方區域的星星元素 */
          .boat-container ~ [class*="star"],
          .boat-container + [class*="star"] {
            display: none !important;
          }
          
          /* 手機版調整裝飾圖片大小 */
          /* 雲朵圖片縮小至80% */
          [style*="cloud-big.png"],
          [style*="cloud-big"] {
            transform: scale(0.8) !important;
          }
          
          /* 星星圖片縮小至50% */
          [style*="star-big.png"],
          [style*="star-big"] {
            transform: scale(0.5) !important;
          }
          
          /* 太陽圖片放大至135% */
          [style*="sun-big.png"],
          [style*="sun-big"] {
            transform: scale(1.35) !important;
          }
          
          /* 使用背景圖片的元素 - 更精確的選擇器 */
          div[style*="cloud-big.png"],
          div[style*="cloud-big"] {
            transform: scale(0.8) !important;
          }
          
          div[style*="star-big.png"],
          div[style*="star-big"] {
            transform: scale(0.5) !important;
          }
          
          div[style*="sun-big.png"],
          div[style*="sun-big"] {
            transform: scale(1.35) !important;
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={modalOpen}
        onClose={closeModal}
        type={modalType}
      />

      {/* Profile Intro Window - 僅手機版 */}
      <div className="md:hidden">
        <ProfileIntroWindow 
          isOpen={profileIntroOpen}
          onClose={() => setProfileIntroOpen(false)}
        />
      </div>

      {/* ReadMoreModal 組件 */}
      {/* Design 設計服務區塊 Modal */}
      <ReadMoreModal
        open={designModalOpen}
        onClose={() => setDesignModalOpen(false)}
        title="Design Services｜設計服務"
        images={[
          { src: "/illustration_1.png", alt: "品牌識別設計案例" },
          { src: "/illustration_2.png", alt: "印刷品設計案例" },
          { src: "/illustration_3.png", alt: "數位介面設計案例" },
          { src: "/illustration_4.png", alt: "活動文宣設計案例" },
          { src: "/illustration_5.png", alt: "社群圖像設計案例" }
        ]}
        initialIndex={0}
        meta={
          <ul className="space-y-1">
            <li>Service: 平面設計服務</li>
            <li>Scope: 品牌識別、印刷品、數位介面、活動文宣</li>
            <li>Location: 宜蘭、台北、線上服務</li>
            <li>Year: 2024</li>
            <li>Category: Design, Branding, Print</li>
          </ul>
        }
      >
        我們相信設計不是炫技，而是解決問題的工具。從品牌識別、菜單、活動文宣到社群圖像，專注於讓設計能貼近生活，幫助品牌長出下一步。

        我們的設計服務涵蓋完整的視覺識別體系建立，從 Logo 設計到色彩系統，從字體選擇到應用規範，確保品牌在各種媒介上都能保持一致的視覺形象。在印刷品設計方面，我們注重材質選擇與印刷工藝的結合，讓每一份實體作品都能傳達品牌的質感與溫度。

        數位介面設計則著重於使用者體驗的優化，從網站架構到互動流程，都經過精心規劃，確保使用者能夠直觀、流暢地完成目標任務。活動文宣與社群圖像則結合當下趨勢與品牌調性，創造具有話題性與傳播力的視覺內容。
      </ReadMoreModal>

      {/* Illustration 插畫服務區塊 Modal */}
      <ReadMoreModal
        open={illustrationModalOpen}
        onClose={() => setIllustrationModalOpen(false)}
        title="Illustration Services｜插畫服務"
        images={[
          { src: "/illustration_1.png", alt: "手繪插畫作品" },
          { src: "/illustration_2.png", alt: "數位插畫作品" },
          { src: "/illustration_3.png", alt: "在地文化插畫" },
          { src: "/illustration_4.png", alt: "品牌插畫應用" },
          { src: "/illustration_5.png", alt: "故事插畫創作" }
        ]}
        initialIndex={0}
        meta={
          <ul className="space-y-1">
            <li>Service: 插畫創作服務</li>
            <li>Scope: 手繪插畫、數位插畫、品牌插畫、故事創作</li>
            <li>Location: 宜蘭在地、全台服務</li>
            <li>Year: 2024</li>
            <li>Category: Illustration, Handmade, Local Culture</li>
          </ul>
        }
      >
        每一筆一劃，能承載記憶、能創造連結。我喜歡把宜蘭的風、地方的小故事、品牌的日常，透過線條與色彩，讓人感到親近。

        手繪插畫是我最愛的創作方式，每一筆都帶著手的溫度與心的情感。從鉛筆草稿到水彩上色，從墨線勾勒到色彩渲染，每個步驟都充滿了創作的樂趣與挑戰。數位插畫則提供了更多可能性，從 Procreate 到 Photoshop，從向量圖到點陣圖，讓創意能夠更自由地揮灑。

        在地文化的插畫創作是我特別專精的領域，透過深入了解宜蘭的歷史、地理、人文特色，將這些元素轉化為具有故事性的視覺作品。無論是傳統建築、在地美食、自然景觀，都能在我的筆下重新詮釋，讓更多人認識並愛上這片土地。

        品牌插畫則需要更精準的定位與策略思考，從品牌調性分析到目標客群研究，確保插畫風格能夠與品牌形象完美融合，同時具有獨特的識別度與記憶點。
      </ReadMoreModal>

      {/* TestCardAlt 卡片展示區塊 Modal */}
      <ReadMoreModal
        open={testCardModalOpen}
        onClose={() => setTestCardModalOpen(false)}
        title="Portfolio Showcase｜作品展示"
        images={[
          { src: "/illustration_1.png", alt: "品牌主視覺設計" },
          { src: "/illustration_2.png", alt: "插畫場景創作" },
          { src: "/illustration_3.png", alt: "角色插畫風格" },
          { src: "/illustration_4.png", alt: "品牌應用小物" },
          { src: "/illustration_5.png", alt: "創意設計探索" }
        ]}
        initialIndex={0}
        meta={
          <ul className="space-y-1">
            <li>Client: 多元客戶案例</li>
            <li>Scope: 品牌設計、插畫創作、視覺識別</li>
            <li>Location: 宜蘭、台北、線上合作</li>
            <li>Year: 2023-2024</li>
            <li>Category: Portfolio, Case Studies, Creative Works</li>
          </ul>
        }
      >
        這裡展示了我們在不同領域的創作成果，從品牌主視覺設計到插畫場景創作，每一件作品都承載著獨特的故事與創意。

        深色覆蓋的設計風格讓文字在複雜背景中依然保持清晰可讀，同時保留了背景影像的質感與層次。這種設計手法特別適合需要突出文字內容的場景，如海報設計、網站橫幅、社群圖像等。

        插畫場景的創作則注重故事性的營造，透過精心構圖與色彩搭配，創造出具有沉浸感的視覺體驗。水平版卡片的設計讓資訊呈現更加緊湊，適合需要展示多個元素的場合。

        角色插畫風格的探索展現了我們在插畫創作上的多樣性，從可愛卡通風格到寫實描繪，從簡約線條到豐富色彩，每一種風格都有其獨特的魅力與應用場景。

        品牌應用小物的設計則體現了我們對細節的關注，從名片到包裝，從貼紙到周邊商品，每個接觸點都是品牌體驗的重要環節。
      </ReadMoreModal>
    </div>
  );
}

// 作品數據類型
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  tags: string[];
  details: {
    client: string;
    duration: string;
    tools: string[];
    description: string;
    challenges: string[];
    results: string[];
  };
}

// 測試作品數據 - 20個作品
const portfolioItems: PortfolioItem[] = [
  // 設計類 - 8個作品
  {
    id: 1,
    title: "電商網站設計",
    category: "Web Design",
    image: "/illustration_1.png",
    description: "為時尚品牌設計的電商平台，注重使用者體驗與轉換率優化。這個專案需要平衡時尚品牌的視覺美感與電商平台的實用性，創造出既美觀又高效的購物體驗。我們從使用者研究開始，深入了解目標客群的購物習慣與偏好，發現他們重視視覺呈現與購物流程的便利性。在設計過程中，我們特別注重產品的展示方式，使用高品質的產品攝影與 360 度展示功能，讓顧客能夠清楚看到每個細節。購物車與結帳流程經過精心優化，減少不必要的步驟，提高轉換率。同時，我們也注重響應式設計，確保在各種裝置上都能提供良好的使用體驗。整個網站採用現代化的設計語言，結合時尚品牌的調性，創造出獨特的視覺風格。",
    year: "2024",
    tags: ["網頁設計", "電商", "UX/UI"],
    details: {
      client: "時尚品牌電商",
      duration: "4 個月",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為時尚品牌設計的電商平台，從使用者研究開始，深入了解目標客群的購物習慣與偏好，設計出既美觀又實用的購物體驗。",
      challenges: ["優化購物流程與轉換率", "確保跨裝置的一致性體驗", "平衡視覺設計與功能實用性"],
      results: ["轉換率提升 60%", "平均停留時間增加 45%", "客戶滿意度達 98%"]
    }
  },
  {
    id: 2,
    title: "App 介面設計",
    category: "Mobile Design",
    image: "/illustration_2.png",
    description: "為健身 App 設計的介面，注重使用者體驗與動機激發。這個專案需要創造出既美觀又實用的健身應用程式，幫助使用者建立良好的運動習慣。我們從使用者研究開始，深入了解不同健身族群的需求與痛點，發現他們最需要的是簡單易用的介面與即時的激勵反饋。在設計過程中，我們特別注重色彩心理學的應用，選擇了充滿活力的橙色與綠色作為主色調，營造出積極正面的運動氛圍。介面佈局經過精心規劃，確保重要功能能夠快速被找到，同時保持視覺的簡潔性。我們還加入了個人化的元素，讓使用者能夠自訂介面風格與運動目標。整個設計過程歷時三個月，最終的 App 不僅獲得了使用者的高度評價，也幫助提升了使用者的運動頻率與持續性。",
    year: "2024",
    tags: ["App設計", "健身", "UX/UI"],
    details: {
      client: "健身科技公司",
      duration: "3 個月",
      tools: ["Figma", "Principle", "Sketch"],
      description: "為健身 App 設計的完整介面系統，從使用者旅程分析到互動設計，創造出能夠激發使用者持續運動動機的介面體驗。",
      challenges: ["如何激發使用者的運動動機", "簡化複雜的健身數據呈現", "確保介面的直觀性與易用性"],
      results: ["使用者留存率提升 70%", "App Store 評分達 4.8 星", "獲得 UX 設計獎項"]
    }
  },
  {
    id: 3,
    title: "餐廳菜單設計",
    category: "Print Design",
    image: "/illustration_3.png",
    description: "為高級餐廳設計的精美菜單，結合食材攝影與優雅排版。這家米其林星級餐廳希望透過菜單設計來提升用餐體驗，讓每一道菜都能在視覺上吸引顧客。我們特別注重食材的視覺呈現，使用高品質的攝影技術捕捉每道菜的色澤與質感。在排版設計上，我們選擇了優雅的字體搭配，確保文字的可讀性同時保持視覺美感。菜單的結構經過精心規劃，從開胃菜到甜點，每一頁都有其獨特的視覺節奏。我們還特別注重紙質選擇與印刷工藝，選用了高質感的紙張，並採用特殊的印刷技術，讓每一頁都成為藝術品。最終的菜單不僅提升了餐廳的整體形象，也讓顧客的用餐體驗更加豐富。",
    year: "2024",
    tags: ["印刷設計", "菜單", "排版"],
    details: {
      client: "米其林餐廳",
      duration: "2 個月",
      tools: ["InDesign", "Photoshop", "Illustrator"],
      description: "為米其林星級餐廳設計的菜單，注重食材的視覺呈現與用餐體驗的營造。我們特別注重紙質選擇與印刷工藝，讓每一頁都成為藝術品。",
      challenges: ["如何在有限空間內呈現豐富的菜色資訊", "平衡視覺美感與實用性", "確保印刷品質與成本控制"],
      results: ["菜單點擊率提升 40%", "客戶用餐體驗評分提升", "獲得印刷設計獎項"]
    }
  },
  {
    id: 4,
    title: "包裝設計",
    category: "Package Design",
    image: "/illustration_4.png",
    description: "為有機食品品牌設計的包裝，強調環保與自然元素。這個專案需要平衡環保理念與商業需求，創造出既美觀又實用的包裝解決方案。我們選擇了可回收的紙質材料作為主要包裝材質，並在設計上融入自然元素，如葉子、果實等圖案，呼應有機食品的天然特性。色彩選擇上使用了大地色系，營造出自然、健康的視覺感受。包裝結構經過精心設計，不僅要保護產品，還要便於運輸與儲存。我們還特別注重包裝的開封體驗，讓消費者能夠輕鬆打開包裝，同時保持包裝的完整性。整個設計過程充分考慮了環保因素，從材料選擇到印刷工藝，都選擇了對環境影響最小的方案。最終的包裝設計不僅獲得了客戶的認可，也獲得了環保設計獎項的肯定。",
    year: "2024",
    tags: ["包裝設計", "有機食品", "環保"],
    details: {
      client: "有機食品品牌",
      duration: "2 個月",
      tools: ["Illustrator", "Photoshop", "Cinema 4D"],
      description: "為有機食品品牌設計的包裝系統，從品牌理念出發，強調環保、自然與健康的價值，設計出既美觀又實用的包裝解決方案。",
      challenges: ["如何在包裝上傳達環保理念", "確保包裝的實用性與美觀性", "控制包裝成本與環保材料的使用"],
      results: ["品牌認知度提升 90%", "包裝獲獎肯定", "客戶銷售額增長 35%"]
    }
  },
  {
    id: 5,
    title: "企業官網設計",
    category: "Web Design",
    image: "/illustration_5.png",
    description: "為科技公司設計的企業官網，強調專業形象與技術實力展示。這個專案需要平衡企業的專業性與親和力，創造出既權威又易於接近的視覺形象。我們從品牌調性分析開始，深入了解公司的核心價值與目標客群，設計出符合科技感與創新精神的視覺識別。網站結構經過精心規劃，從首頁到產品頁面，每一頁都有其獨特的視覺節奏。我們還特別注重響應式設計，確保在各種裝置上都能提供良好的使用體驗。整個設計過程歷時四個月，最終的網站不僅提升了公司的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["網頁設計", "企業官網", "響應式"],
    details: {
      client: "科技公司",
      duration: "4 個月",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為科技公司設計的企業官網，從品牌調性分析開始，深入了解公司的核心價值與目標客群，設計出符合科技感與創新精神的視覺識別。",
      challenges: ["平衡專業性與親和力", "確保跨裝置的一致性體驗", "創造具有記憶點的視覺元素"],
      results: ["網站流量提升 80%", "客戶諮詢增加 120%", "獲得網頁設計獎項"]
    }
  },
  {
    id: 6,
    title: "金融 App 設計",
    category: "Mobile Design",
    image: "/illustration_6.png",
    description: "為金融科技公司設計的理財 App，注重安全性與使用者體驗的平衡。這個專案需要創造出既安全又易用的金融應用程式，幫助使用者管理個人財務。我們從使用者研究開始，深入了解不同理財族群的需求與痛點，發現他們最需要的是簡單易用的介面與即時的財務資訊。在設計過程中，我們特別注重色彩心理學的應用，選擇了穩重的藍色與綠色作為主色調，營造出專業可信的金融氛圍。介面佈局經過精心規劃，確保重要功能能夠快速被找到，同時保持視覺的簡潔性。我們還加入了個人化的元素，讓使用者能夠自訂介面風格與理財目標。整個設計過程歷時四個月，最終的 App 不僅獲得了使用者的高度評價，也幫助提升了使用者的理財效率。",
    year: "2024",
    tags: ["App設計", "金融", "UX/UI"],
    details: {
      client: "金融科技公司",
      duration: "4 個月",
      tools: ["Figma", "Principle", "Sketch"],
      description: "為金融科技公司設計的理財 App，從使用者旅程分析到互動設計，創造出能夠激發使用者持續理財動機的介面體驗。",
      challenges: ["如何激發使用者的理財動機", "簡化複雜的財務數據呈現", "確保介面的直觀性與易用性"],
      results: ["使用者留存率提升 85%", "App Store 評分達 4.9 星", "獲得金融科技設計獎項"]
    }
  },
  {
    id: 7,
    title: "雜誌版面設計",
    category: "Print Design",
    image: "/illustration_1.png",
    description: "為時尚雜誌設計的版面，強調視覺層次與閱讀體驗。這個專案需要平衡時尚感與可讀性，創造出既美觀又實用的版面設計。我們從內容分析開始，深入了解雜誌的定位與目標讀者，設計出符合時尚調性的視覺風格。版面結構經過精心規劃，從封面到內頁，每一頁都有其獨特的視覺節奏。我們還特別注重字體選擇與排版，確保文字的可讀性同時保持視覺美感。整個設計過程歷時兩個月，最終的版面設計不僅提升了雜誌的整體形象，也獲得了讀者的高度認可。",
    year: "2024",
    tags: ["印刷設計", "雜誌", "排版"],
    details: {
      client: "時尚雜誌",
      duration: "2 個月",
      tools: ["InDesign", "Photoshop", "Illustrator"],
      description: "為時尚雜誌設計的版面，注重視覺層次與閱讀體驗的營造。我們特別注重字體選擇與排版，讓每一頁都成為藝術品。",
      challenges: ["平衡時尚感與可讀性", "創造具有記憶點的視覺元素", "確保印刷品質與成本控制"],
      results: ["雜誌銷量提升 50%", "讀者滿意度提升", "獲得印刷設計獎項"]
    }
  },
  {
    id: 8,
    title: "產品包裝設計",
    category: "Package Design",
    image: "/illustration_2.png",
    description: "為美妝品牌設計的產品包裝，強調時尚感與環保理念。這個專案需要平衡美觀性與實用性，創造出既吸引人又環保的包裝解決方案。我們從品牌理念開始，深入了解公司的核心價值與目標客群，設計出符合美妝調性的視覺識別。包裝結構經過精心設計，不僅要保護產品，還要便於運輸與儲存。我們還特別注重包裝的開封體驗，讓消費者能夠輕鬆打開包裝，同時保持包裝的完整性。整個設計過程充分考慮了環保因素，從材料選擇到印刷工藝，都選擇了對環境影響最小的方案。最終的包裝設計不僅獲得了客戶的認可，也獲得了環保設計獎項的肯定。",
    year: "2024",
    tags: ["包裝設計", "美妝", "環保"],
    details: {
      client: "美妝品牌",
      duration: "3 個月",
      tools: ["Illustrator", "Photoshop", "Cinema 4D"],
      description: "為美妝品牌設計的包裝系統，從品牌理念出發，強調時尚、環保與健康的價值，設計出既美觀又實用的包裝解決方案。",
      challenges: ["如何在包裝上傳達時尚理念", "確保包裝的實用性與美觀性", "控制包裝成本與環保材料的使用"],
      results: ["品牌認知度提升 95%", "包裝獲獎肯定", "客戶銷售額增長 40%"]
    }
  },
  // 品牌類 - 6個作品
  {
    id: 9,
    title: "品牌識別設計",
    category: "Branding",
    image: "/illustration_3.png",
    description: "為新創公司打造完整的品牌識別系統，包含 Logo 設計、色彩系統與應用規範。這是一個充滿挑戰性的專案，需要深入了解客戶的品牌理念與目標客群，從零開始建立一套完整的視覺識別系統。我們從品牌定位開始，透過多次的溝通與討論，確立了品牌的核心理念與價值主張。接著進行 Logo 設計，創造出既具有識別性又符合品牌調性的標誌。同時建立了完整的色彩系統，包含主色調、輔助色調以及各種應用情境下的色彩搭配規範。最後制定了詳細的應用規範，確保品牌在各種媒介上都能保持一致的視覺形象。整個專案歷時三個月，最終獲得了客戶的高度認可，品牌認知度提升了 150%。",
    year: "2024",
    tags: ["品牌設計", "Logo", "視覺識別"],
    details: {
      client: "TechStart 新創公司",
      duration: "3 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "這是一個為新創科技公司設計的完整品牌識別系統。我們從品牌定位開始，深入了解公司的核心價值與目標客群，設計出符合科技感與創新精神的視覺識別。",
      challenges: ["如何在科技感與親和力之間取得平衡", "確保品牌在不同媒介上的一致性", "創造具有記憶點的視覺元素"],
      results: ["品牌認知度提升 150%", "獲得業界設計獎項", "客戶滿意度達 95%"]
    }
  },
  {
    id: 10,
    title: "餐廳品牌設計",
    category: "Branding",
    image: "/illustration_4.png",
    description: "為高級餐廳設計的完整品牌系統，包含 Logo、菜單、名片與空間視覺。這個專案需要平衡優雅與親和力，創造出既高檔又溫暖的品牌形象。我們從品牌定位開始，深入了解餐廳的核心理念與目標客群，設計出符合高級餐飲調性的視覺識別。品牌系統經過精心規劃，從 Logo 到應用素材，每一個元素都有其獨特的視覺語言。我們還特別注重色彩搭配與字體選擇，確保品牌在各種媒介上都能保持一致的視覺形象。整個設計過程歷時四個月，最終的品牌系統不僅提升了餐廳的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["品牌設計", "餐廳", "視覺識別"],
    details: {
      client: "高級餐廳",
      duration: "4 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "為高級餐廳設計的完整品牌系統，從品牌定位開始，深入了解餐廳的核心理念與目標客群，設計出符合高級餐飲調性的視覺識別。",
      challenges: ["平衡優雅與親和力", "確保品牌在不同媒介上的一致性", "創造具有記憶點的視覺元素"],
      results: ["品牌認知度提升 120%", "獲得餐飲設計獎項", "客戶滿意度達 98%"]
    }
  },
  {
    id: 11,
    title: "時尚品牌設計",
    category: "Branding",
    image: "/illustration_5.png",
    description: "為時尚品牌設計的完整視覺識別，包含 Logo、包裝、網站與社群媒體素材。這個專案需要平衡時尚感與商業性，創造出既吸引人又實用的品牌形象。我們從品牌調性分析開始，深入了解品牌的核心理念與目標客群，設計出符合時尚調性的視覺識別。品牌系統經過精心規劃，從 Logo 到應用素材，每一個元素都有其獨特的視覺語言。我們還特別注重色彩搭配與字體選擇，確保品牌在各種媒介上都能保持一致的視覺形象。整個設計過程歷時五個月，最終的品牌系統不僅提升了品牌的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["品牌設計", "時尚", "視覺識別"],
    details: {
      client: "時尚品牌",
      duration: "5 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "為時尚品牌設計的完整視覺識別，從品牌調性分析開始，深入了解品牌的核心理念與目標客群，設計出符合時尚調性的視覺識別。",
      challenges: ["平衡時尚感與商業性", "確保品牌在不同媒介上的一致性", "創造具有話題性的視覺元素"],
      results: ["品牌認知度提升 180%", "獲得時尚設計獎項", "客戶滿意度達 99%"]
    }
  },
  {
    id: 12,
    title: "科技品牌設計",
    category: "Branding",
    image: "/illustration_6.png",
    description: "為科技公司設計的現代化品牌識別，強調創新與專業形象。這個專案需要平衡科技感與人性化，創造出既先進又親切的品牌形象。我們從品牌定位開始，深入了解公司的核心價值與目標客群，設計出符合科技調性的視覺識別。品牌系統經過精心規劃，從 Logo 到應用素材，每一個元素都有其獨特的視覺語言。我們還特別注重色彩搭配與字體選擇，確保品牌在各種媒介上都能保持一致的視覺形象。整個設計過程歷時四個月，最終的品牌系統不僅提升了公司的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["品牌設計", "科技", "視覺識別"],
    details: {
      client: "科技公司",
      duration: "4 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "為科技公司設計的現代化品牌識別，從品牌定位開始，深入了解公司的核心價值與目標客群，設計出符合科技調性的視覺識別。",
      challenges: ["平衡科技感與人性化", "確保品牌在不同媒介上的一致性", "創造具有記憶點的視覺元素"],
      results: ["品牌認知度提升 160%", "獲得科技設計獎項", "客戶滿意度達 97%"]
    }
  },
  {
    id: 13,
    title: "教育品牌設計",
    category: "Branding",
    image: "/illustration_1.png",
    description: "為教育機構設計的親和品牌識別，強調學習與成長的價值。這個專案需要平衡專業性與親和力，創造出既權威又溫暖的品牌形象。我們從品牌理念開始，深入了解機構的核心價值與目標客群，設計出符合教育調性的視覺識別。品牌系統經過精心規劃，從 Logo 到應用素材，每一個元素都有其獨特的視覺語言。我們還特別注重色彩搭配與字體選擇，確保品牌在各種媒介上都能保持一致的視覺形象。整個設計過程歷時三個月，最終的品牌系統不僅提升了機構的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["品牌設計", "教育", "視覺識別"],
    details: {
      client: "教育機構",
      duration: "3 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "為教育機構設計的親和品牌識別，從品牌理念開始，深入了解機構的核心價值與目標客群，設計出符合教育調性的視覺識別。",
      challenges: ["平衡專業性與親和力", "確保品牌在不同媒介上的一致性", "創造具有記憶點的視覺元素"],
      results: ["品牌認知度提升 140%", "獲得教育設計獎項", "客戶滿意度達 96%"]
    }
  },
  {
    id: 14,
    title: "健康品牌設計",
    category: "Branding",
    image: "/illustration_2.png",
    description: "為健康品牌設計的清新品牌識別，強調自然與健康的價值。這個專案需要平衡自然感與現代性，創造出既清新又專業的品牌形象。我們從品牌理念開始，深入了解品牌的核心理念與目標客群，設計出符合健康調性的視覺識別。品牌系統經過精心規劃，從 Logo 到應用素材，每一個元素都有其獨特的視覺語言。我們還特別注重色彩搭配與字體選擇，確保品牌在各種媒介上都能保持一致的視覺形象。整個設計過程歷時四個月，最終的品牌系統不僅提升了品牌的整體形象，也獲得了客戶的高度認可。",
    year: "2024",
    tags: ["品牌設計", "健康", "視覺識別"],
    details: {
      client: "健康品牌",
      duration: "4 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "為健康品牌設計的清新品牌識別，從品牌理念開始，深入了解品牌的核心理念與目標客群，設計出符合健康調性的視覺識別。",
      challenges: ["平衡自然感與現代性", "確保品牌在不同媒介上的一致性", "創造具有記憶點的視覺元素"],
      results: ["品牌認知度提升 170%", "獲得健康設計獎項", "客戶滿意度達 98%"]
    }
  },
  // 插畫類 - 6個作品
  {
    id: 15,
    title: "活動文宣設計",
    category: "Event Design",
    image: "/illustration_3.png",
    description: "為音樂節設計的系列文宣，包含海報、傳單與數位素材。這個年度音樂節是城市最重要的文化盛事之一，需要創造出具有強烈視覺衝擊力的設計來吸引年輕族群參與。我們從主視覺設計開始，選擇了充滿活力的色彩搭配與現代化的字體設計，營造出音樂節的熱鬧氛圍。海報設計特別注重在眾多音樂活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。傳單設計則更加注重資訊的清晰傳達，確保活動資訊能夠快速被理解。數位素材包括社群媒體的各種尺寸版本，以及網站橫幅等，確保在不同平台上都能保持一致的視覺風格。整個設計過程歷時一個月，最終的系列文宣不僅提升了活動的知名度，也獲得了設計社群的高度評價。",
    year: "2024",
    tags: ["活動設計", "海報", "文宣"],
    details: {
      client: "音樂節主辦方",
      duration: "1 個月",
      tools: ["Photoshop", "Illustrator", "After Effects"],
      description: "為年度音樂節設計的系列文宣，從主視覺到各種應用素材，創造出具有強烈視覺衝擊力的設計風格，吸引年輕族群參與。",
      challenges: ["在眾多音樂活動中脫穎而出", "創造具有話題性的視覺元素", "確保各種尺寸的應用效果"],
      results: ["活動參與人數增加 80%", "社群媒體分享率提升 120%", "獲得設計社群好評"]
    }
  },
  {
    id: 16,
    title: "插畫海報設計",
    category: "Event Design",
    image: "/illustration_4.png",
    description: "為藝術展覽設計的插畫海報，強調創意與藝術性。這個專案需要平衡藝術感與商業性，創造出既美觀又實用的海報設計。我們從展覽主題開始，深入了解藝術家的創作理念與目標觀眾，設計出符合藝術調性的視覺風格。海報設計特別注重在眾多展覽中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重字體選擇與排版，確保展覽資訊能夠清晰傳達。整個設計過程歷時三週，最終的海報設計不僅提升了展覽的知名度，也獲得了藝術社群的高度評價。",
    year: "2024",
    tags: ["插畫設計", "海報", "藝術"],
    details: {
      client: "藝術展覽",
      duration: "3 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為藝術展覽設計的插畫海報，從展覽主題開始，深入了解藝術家的創作理念與目標觀眾，設計出符合藝術調性的視覺風格。",
      challenges: ["平衡藝術感與商業性", "創造具有話題性的視覺元素", "確保展覽資訊的清晰傳達"],
      results: ["展覽參觀人數增加 60%", "社群媒體分享率提升 90%", "獲得藝術設計獎項"]
    }
  },
  {
    id: 17,
    title: "節慶插畫設計",
    category: "Event Design",
    image: "/illustration_5.png",
    description: "為節慶活動設計的系列插畫，包含主視覺、海報與周邊商品。這個專案需要平衡節慶氛圍與品牌調性，創造出既熱鬧又協調的視覺風格。我們從節慶主題開始，深入了解活動的核心理念與目標參與者，設計出符合節慶調性的插畫風格。插畫設計特別注重在眾多節慶活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重插畫的應用性，確保能夠在各種媒介上都能保持一致的視覺效果。整個設計過程歷時一個月，最終的插畫系列不僅提升了活動的知名度，也獲得了參與者的高度評價。",
    year: "2024",
    tags: ["插畫設計", "節慶", "活動"],
    details: {
      client: "節慶活動主辦方",
      duration: "1 個月",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為節慶活動設計的系列插畫，從節慶主題開始，深入了解活動的核心理念與目標參與者，設計出符合節慶調性的插畫風格。",
      challenges: ["平衡節慶氛圍與品牌調性", "創造具有話題性的視覺元素", "確保插畫的應用性"],
      results: ["活動參與人數增加 70%", "社群媒體分享率提升 100%", "獲得節慶設計獎項"]
    }
  },
  {
    id: 18,
    title: "文化插畫設計",
    category: "Event Design",
    image: "/illustration_6.png",
    description: "為文化活動設計的插畫系列，強調傳統與現代的融合。這個專案需要平衡文化傳承與創新表達，創造出既具有文化底蘊又符合現代審美的視覺風格。我們從文化主題開始，深入了解活動的核心理念與目標觀眾，設計出符合文化調性的插畫風格。插畫設計特別注重在眾多文化活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重插畫的文化內涵，確保能夠傳達出深刻的文化意義。整個設計過程歷時六週，最終的插畫系列不僅提升了活動的知名度，也獲得了文化社群的高度評價。",
    year: "2024",
    tags: ["插畫設計", "文化", "傳統"],
    details: {
      client: "文化活動主辦方",
      duration: "6 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為文化活動設計的插畫系列，從文化主題開始，深入了解活動的核心理念與目標觀眾，設計出符合文化調性的插畫風格。",
      challenges: ["平衡文化傳承與創新表達", "創造具有文化內涵的視覺元素", "確保插畫的現代審美"],
      results: ["活動參與人數增加 85%", "社群媒體分享率提升 110%", "獲得文化設計獎項"]
    }
  },
  {
    id: 19,
    title: "商業插畫設計",
    category: "Event Design",
    image: "/illustration_1.png",
    description: "為商業活動設計的插畫系列，強調商業性與藝術性的平衡。這個專案需要平衡商業需求與創意表達，創造出既實用又美觀的視覺風格。我們從商業主題開始，深入了解活動的核心理念與目標客戶，設計出符合商業調性的插畫風格。插畫設計特別注重在眾多商業活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重插畫的商業價值，確保能夠有效傳達商業訊息。整個設計過程歷時五週，最終的插畫系列不僅提升了活動的知名度，也獲得了商業客戶的高度評價。",
    year: "2024",
    tags: ["插畫設計", "商業", "活動"],
    details: {
      client: "商業活動主辦方",
      duration: "5 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為商業活動設計的插畫系列，從商業主題開始，深入了解活動的核心理念與目標客戶，設計出符合商業調性的插畫風格。",
      challenges: ["平衡商業需求與創意表達", "創造具有商業價值的視覺元素", "確保插畫的實用性"],
      results: ["活動參與人數增加 75%", "社群媒體分享率提升 95%", "獲得商業設計獎項"]
    }
  },
  {
    id: 20,
    title: "創意插畫設計",
    category: "Event Design",
    image: "/illustration_2.png",
    description: "為創意活動設計的插畫系列，強調創意與想像力的展現。這個專案需要平衡創意表達與實用性，創造出既富有想像力又符合活動需求的視覺風格。我們從創意主題開始，深入了解活動的核心理念與目標參與者，設計出符合創意調性的插畫風格。插畫設計特別注重在眾多創意活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重插畫的創意性，確保能夠激發參與者的想像力。整個設計過程歷時四週，最終的插畫系列不僅提升了活動的知名度，也獲得了創意社群的高度評價。",
    year: "2024",
    tags: ["插畫設計", "創意", "想像力"],
    details: {
      client: "創意活動主辦方",
      duration: "4 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為創意活動設計的插畫系列，從創意主題開始，深入了解活動的核心理念與目標參與者，設計出符合創意調性的插畫風格。",
      challenges: ["平衡創意表達與實用性", "創造具有想像力的視覺元素", "確保插畫的創意性"],
      results: ["活動參與人數增加 90%", "社群媒體分享率提升 130%", "獲得創意設計獎項"]
    }
  },
  {
    id: 21,
    title: "教育插畫設計",
    category: "Event Design",
    image: "/illustration_3.png",
    description: "為教育活動設計的插畫系列，強調學習與成長的視覺呈現。這個專案需要平衡教育性與趣味性，創造出既寓教於樂又符合學習需求的視覺風格。我們從教育主題開始，深入了解活動的核心理念與目標學習者，設計出符合教育調性的插畫風格。插畫設計特別注重在眾多教育活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。我們還特別注重插畫的教育價值，確保能夠有效傳達學習內容。整個設計過程歷時五週，最終的插畫系列不僅提升了活動的知名度，也獲得了教育社群的高度評價。",
    year: "2024",
    tags: ["插畫設計", "教育", "學習"],
    details: {
      client: "教育活動主辦方",
      duration: "5 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為教育活動設計的插畫系列，從教育主題開始，深入了解活動的核心理念與目標學習者，設計出符合教育調性的插畫風格。",
      challenges: ["平衡教育性與趣味性", "創造具有教育價值的視覺元素", "確保插畫的學習效果"],
      results: ["活動參與人數增加 95%", "社群媒體分享率提升 140%", "獲得教育設計獎項"]
    }
  }
];

// 作品卡片組件 - Windows 98 風格 + 視差滾動
const PortfolioCard = ({ 
  item, 
  onClick, 
  index, 
  isFirstRow = false 
}: { 
  item: PortfolioItem; 
  onClick: () => void;
  index: number;
  isFirstRow?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className="bg-gray-200 border-2 border-gray-400 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080'
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ 
        opacity: 0,
        y: -30
      }}
      animate={isInView ? { 
        opacity: 1,
        y: 0
      } : { 
        opacity: 0,
        y: -30
      }}
      transition={{ 
        duration: 0.8,
        delay: isFirstRow ? index * 0.08 : 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* 視窗標題列 */}
      <div 
        className="text-white px-2 py-2 flex items-center justify-between text-xs font-bold"
        style={{ 
          background: Math.random() > 0.5 
            ? 'linear-gradient(90deg, #003EC3 0%, #0056CC 100%)' 
            : '#353535',
          borderBottom: Math.random() > 0.5 ? '1px solid #003EC3' : '1px solid #404040'
        }}
      >
        <span className="flex items-center">
          <span className="w-3 h-3 mr-1">📁</span>
          {item.title}
        </span>
        <div className="flex space-x-1">
          {/* 移除關閉按鈕 */}
        </div>
      </div>
      
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div 
          className="absolute top-2 right-2 text-white px-2 py-1 text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, #808080 0%, #c0c0c0 100%)',
            border: '1px solid #808080',
            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
          }}
        >
          {item.year}
        </div>
      </div>
      
      <div className="p-3 bg-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm text-black">{item.title}</h3>
          <span 
            className="text-xs px-2 py-1 font-bold"
            style={{
              background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
              border: '1px solid #808080',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
              color: '#000000'
            }}
          >
            {item.category}
          </span>
        </div>
        <p className="text-black text-xs mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 font-bold"
              style={{
                background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                border: '1px solid #808080',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                color: '#000000'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// 為每個作品準備多張圖片
const getPortfolioImages = (item: PortfolioItem) => {
  const baseImages = [
    { src: item.image, alt: item.title }
  ];
  
  // 為所有作品添加額外的圖片（輪播功能）
  const additionalImages = {
    1: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
    2: ['/illustration_1.png', '/illustration_3.png', '/illustration_4.png', '/illustration_6.png'],
    3: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_5.png'],
    4: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_6.png'],
    5: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_6.png'],
    6: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_5.png'],
    7: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
    8: ['/illustration_1.png', '/illustration_3.png', '/illustration_4.png', '/illustration_6.png'],
    9: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_5.png'],
    10: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_6.png'],
    11: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_6.png'],
    12: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_5.png'],
    13: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
    14: ['/illustration_1.png', '/illustration_3.png', '/illustration_4.png', '/illustration_6.png'],
    15: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_5.png'],
    16: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_6.png'],
    17: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_6.png'],
    18: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_5.png'],
    19: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
    20: ['/illustration_1.png', '/illustration_3.png', '/illustration_4.png', '/illustration_6.png'],
    21: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_5.png'],
    22: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_6.png']
  };
  
  const extraImages = additionalImages[item.id as keyof typeof additionalImages] || [];
  
  return [
    ...baseImages,
    ...extraImages.map((src, index) => ({
      src,
      alt: `${item.title} - 相關作品 ${index + 1}`
    }))
  ];
};

// 手機版分類卡片組件 - 視差滾動效果
const MobileCategoryCard = ({ 
  category, 
  items, 
  onItemClick,
  index
}: { 
  category: string; 
  items: PortfolioItem[]; 
  onItemClick: (item: PortfolioItem) => void;
  index: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  
  if (items.length === 0) return null;
  
  const currentItem = items[currentIndex];
  
  return (
    <div ref={ref} className="relative w-full mb-8">
      {/* 卡片主體 */}
      <motion.div 
        className="relative bg-gray-200 rounded-lg overflow-hidden"
        style={{
          border: '2px solid #808080',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#404040',
          borderBottomColor: '#404040'
        }}
        whileHover={{ scale: 1.02 }}
        initial={{ 
          opacity: 0,
          y: -100
        }}
        animate={isInView ? { 
          opacity: 1,
          y: 0
        } : { 
          opacity: 0,
          y: -100
        }}
        transition={{ 
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* 視窗標題列 */}
        <div 
          className="text-white px-3 py-2 flex items-center justify-between text-sm font-bold"
          style={{ 
            background: Math.random() > 0.5 
              ? 'linear-gradient(90deg, #003EC3 0%, #0056CC 100%)' 
              : '#353535',
            borderBottom: Math.random() > 0.5 ? '1px solid #003EC3' : '1px solid #404040'
          }}
        >
          <span className="flex items-center">
            <span className="w-4 h-4 mr-2">📁</span>
            {category} 作品集
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">
              {currentIndex + 1} / {items.length}
            </span>
            <div className="flex space-x-1">
              <button 
                onClick={prevItem}
                className="w-5 h-5 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center text-xs"
              >
                ‹
              </button>
              <button 
                onClick={nextItem}
                className="w-5 h-5 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center text-xs"
              >
                ›
              </button>
            </div>
          </div>
        </div>
        
        {/* 作品內容 */}
        <div 
          className="p-4 cursor-pointer"
          onClick={() => onItemClick(currentItem)}
        >
          <div className="relative aspect-[4/3] mb-4 rounded overflow-hidden">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-black">{currentItem.title}</h3>
              <span 
                className="text-xs px-2 py-1 font-bold"
                style={{
                  background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                  border: '1px solid #808080',
                  boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                  color: '#000000'
                }}
              >
                {currentItem.category}
              </span>
            </div>
            
            <p className="text-xs text-black leading-relaxed line-clamp-4">
              {currentItem.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {currentItem.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                    border: '1px solid #808080',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#000000'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 瀑布流作品牆組件
const WaterfallPortfolioSection = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 每頁顯示的作品數量（響應式）
  // const itemsPerPage = {
  //   mobile: 21,   // 手機版顯示全部21個作品
  //   tablet: 12,   // 平板版每頁12個
  //   desktop: 8    // 桌面版初始8個，載入更多後：8→12→16→21
  // };

  // 檢測是否為手機版
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 定義簡化的分類
  const categories = ['all', '設計類', '品牌類', '插畫類'];
  
  // 分類映射
  const categoryMapping: { [key: string]: string[] } = {
    '設計類': ['Web Design', 'Mobile Design', 'Print Design', 'Package Design'],
    '品牌類': ['Branding'],
    '插畫類': ['Event Design']
  };
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => categoryMapping[filter]?.includes(item.category));

  // 獲取當前頁面的作品
  const getCurrentPageItems = () => {
    if (isMobile) {
      // 手機版顯示全部作品
      return filteredItems;
    } else {
      // 桌面版分批載入：8→12→16→21
      const loadSteps = [8, 12, 16, 21];
      const currentStep = Math.min(currentPage - 1, loadSteps.length - 1);
      const itemsToShow = loadSteps[currentStep];
      return filteredItems.slice(0, itemsToShow);
    }
  };

  // 計算總頁數
  const totalPages = isMobile ? 1 : 4; // 桌面版有4個載入階段

  // 載入更多作品
  const loadMoreItems = () => {
    if (currentPage < totalPages && !isLoading) {
      setIsLoading(true);
      // 模擬載入延遲
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  // 重置分頁當篩選改變
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // 手機版分類數據
  const mobileCategories = [
    { name: '插畫設計', items: portfolioItems.filter(item => item.category === 'Event Design') },
    { name: '品牌設計', items: portfolioItems.filter(item => item.category === 'Branding') },
    { name: '數位設計', items: portfolioItems.filter(item => ['Web Design', 'Mobile Design', 'Print Design', 'Package Design'].includes(item.category)) }
  ];

  return (
    <>
      <section className="w-full py-16" style={{ backgroundColor: '#FFFFF3' }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              一起完成的設計 | Works We Made Together
            </h2>
            {/* 標籤元件 */}
            <div className="flex justify-center">
              <AboutLiamTag 
                text="#LittleByLittle  #KeepGoing" 
                backgroundColor="#003EC3" 
                textColor="#FFFFF3"
              />
            </div>
          </div>

          {/* 篩選按鈕 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <ModernButton
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? 'primary' : 'outline'}
                size="md"
              >
                {category === 'all' ? '📁' : '📂'} {category}
              </ModernButton>
            ))}
          </div>

          {/* 桌面版：網格佈局 */}
          {!isMobile && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentPageItems().map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  onClick={() => handleCardClick(item)}
                  index={index}
                  isFirstRow={index < 4}
                />
              ))}
            </div>
          )}

          {/* 手機版：分類卡片佈局 */}
          {isMobile && (
            <div className="space-y-6">
              {mobileCategories.map((category, index) => (
                <MobileCategoryCard
                  key={category.name}
                  category={category.name}
                  items={category.items}
                  onItemClick={handleCardClick}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* 載入更多按鈕 - 僅桌面版 */}
          {!isMobile && currentPage < totalPages && (
            <div className="text-center mt-12">
              <ModernButton
                onClick={loadMoreItems}
                disabled={isLoading}
                loading={isLoading}
                variant="secondary"
                size="lg"
              >
                {isLoading ? '載入中...' : '🔗 載入更多作品'}
              </ModernButton>
            </div>
          )}
        </div>
      </section>

      {/* ReadMoreModal 組件 */}
      {selectedItem && (
        <ReadMoreModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title={`${selectedItem.title}｜${selectedItem.category}`}
          images={getPortfolioImages(selectedItem)}
          initialIndex={0}
          meta={
            <ul className="space-y-1">
              <li>Client: {selectedItem.details.client}</li>
              <li>Duration: {selectedItem.details.duration}</li>
              <li>Tools: {selectedItem.details.tools.join(', ')}</li>
              <li>Year: {selectedItem.year}</li>
              <li>Category: {selectedItem.tags.join(', ')}</li>
            </ul>
          }
        >
          {selectedItem.details.description}
          
          <div className="mt-6">
            <h4 className="font-bold text-lg mb-3">挑戰與解決方案</h4>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {selectedItem.details.challenges.map((challenge, index) => (
                <li key={index} className="text-sm">{challenge}</li>
              ))}
            </ul>
            
            <h4 className="font-bold text-lg mb-3">專案成果</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedItem.details.results.map((result, index) => (
                <li key={index} className="text-sm">{result}</li>
              ))}
            </ul>
          </div>
        </ReadMoreModal>
      )}
    </>
  );
};
