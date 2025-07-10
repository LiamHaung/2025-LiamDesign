'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import ProfileSection from '../components/ProfileSection';
import ProjectGrid from '../components/ProjectGrid';

export default function Home() {
  // State declarations
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isEnterHovered, setIsEnterHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const runnerRef = useRef<HTMLImageElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  // Effects
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

  useEffect(() => {
    if (entered && casesRef.current) {
      setTimeout(() => {
        casesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1300); // 調整為地圖動畫結束的時間
    }
  }, [entered]);

  // 處理進入主頁面的轉場
  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setEntered(true);
    }, 1300); // 配合地圖動畫時間
  };

  // Main render
  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden" style={{ background: 'transparent' }}>
      {/* 背景層容器 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ 
          background: `url('/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
        {/* 入口頁（未進入主內容時顯示） */}
        {!entered && (
          <section className="hero-block-grid relative min-h-screen flex items-center justify-center">
            <div className="hero-grid-container">
              <div className={`hero-left-block ${isTransitioning ? 'transition-up' : ''}`} style={{ 
                zIndex: 2, 
                position: 'absolute',
                bottom: '110px',
                left: '80px',
                transform: `scale(${showLiam ? 1.2 : 0.5})`,
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: showLiam ? 1 : 0
              }}>
                <div 
                  className={`hero-liam-block${showLiam ? ' show' : ''}`}
                  style={{ marginBottom: '32px' }}
                >
                  <span className="hero-liam-bg">LIAM<br/>DESIGN</span>
                </div>
              </div>

              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                <div className="flex flex-col items-center">
                  <div className="relative w-[1134px] h-[1134px] max-w-full max-h-[80vh] flex items-center justify-center">
                    <div style={{
                      position:'relative', 
                      width:'100%', 
                      height:'100%',
                      transform: `scale(${showLiam ? 1 : 0.5})`,
                      opacity: showLiam ? 1 : 0,
                      transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: '0.3s'
                    }}>
                      <img
                        src={isMapHovered ? "/yilan_mapv3.png" : "/yilan_mapv2.png"}
                        alt="宜蘭地圖動畫"
                        className={`w-full h-full object-contain ${isTransitioning ? 'transition-map' : ''}`}
                        style={{ 
                          transform: 'scale(0.7)', 
                          display: 'block', 
                          margin: '0 auto',
                          transformOrigin: 'center center',
                          willChange: 'transform, opacity'
                        }}
                        onMouseEnter={() => setIsMapHovered(true)}
                        onMouseLeave={() => setIsMapHovered(false)}
                      />
                      {/* ENTER SVG 按鈕 */}
                      <div
                        style={{
                          position:'absolute', 
                          right:'110px', 
                          bottom:'110px', 
                          width:'220px', 
                          height:'160px', 
                          zIndex:20, 
                          cursor:'pointer', 
                          transform: `scale(${showRight ? 1.5 : 0.5})`,
                          opacity: showRight ? 1 : 0,
                          transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transitionDelay: '0.6s'
                        }}
                        className={isTransitioning ? 'transition-fade' : ''}
                        onMouseEnter={() => setIsEnterHovered(true)}
                        onMouseLeave={() => setIsEnterHovered(false)}
                        onClick={e => {
                          if (isTransitioning) return; // 防止重複點擊
                          const el = e.currentTarget;
                          el.style.transform = 'scale(1.3)';
                          setTimeout(() => {
                            handleEnter();
                          }, 180);
                        }}
                      >
                        <img
                          src={isEnterHovered ? "/enter2.svg" : "/enter1.svg"}
                          alt="ENTER"
                          style={{width:'100%', height:'100%', display:'block'}}
                        />
                      </div>
                    </div>
                    {/* 地圖標籤（移到圖片前面） */}
                    <div className={`absolute left-[20%] top-[15%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.6s', zIndex: 10, top: 'calc(15% + 20px)', left: 'calc(20% + 80px)' }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        品牌源自土地
                      </div>
                    </div>
                    <div className={`absolute right-[35%] top-[10%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '1.8s', zIndex: 10 }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        越在地越國際
                      </div>
                    </div>
                    <div className={`absolute left-[45%] top-[40%] group cursor-pointer transition-all duration-500 opacity-0 translate-y-[-20px] ${showRight ? 'opacity-100 translate-y-0' : ''} ${isTransitioning ? 'transition-up' : ''}`} style={{ transitionDelay: '2.0s', zIndex: 10 }}>
                      <div className="bg-black text-white px-3 py-2 rounded-xl text-lg font-bold [writing-mode:vertical-rl] [text-orientation:upright] [letter-spacing:0.3em] transition-transform duration-300 group-hover:-translate-y-1">
                        設計藉由溝通
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部跑馬燈 */}
            <div className={`absolute bottom-0 left-0 right-0 ${isTransitioning ? 'transition-down' : ''}`} style={{
              opacity: showRight ? 1 : 0,
              transform: `translateY(${showRight ? '0' : '20px'})`,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: '0.9s'
            }}>
              {/* 黑底白字跑馬燈 */}
              <div className="w-full bg-black py-4 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>

              {/* 黃底黑字跑馬燈 */}
              <div className="w-full bg-yellow-300 py-4 overflow-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap">
                  {Array(4).fill(null).map((_, i) => (
                    <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 主內容（已進入時顯示） */}
        {entered && (
          <>
            {/* 跑馬燈 - 形象牆與主內容交界處 */}
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
                    <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 跑馬燈 - 黃底黑字 */}
            <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            {/* Logo fixed 置左下 */}
            <div className="fixed left-0 bottom-0 z-50 p-6" style={{ transform: 'scale(1.08)', transformOrigin: 'left bottom', zIndex: 10000 }}>
              <div className="logo-block long">
                <Image src="/logo.svg" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
              </div>
            </div>

            {/* 內容 container（不含 navbar/aside） */}
            <div className="relative w-full h-[100vh] flex flex-row overflow-hidden">
              {/* 左側個人資訊區（固定） */}
              <div className="h-full w-1/3 min-w-[320px] max-w-[480px] flex-shrink-0 sticky top-0 left-0 z-20 bg-transparent border-r border-gray-200 p-0 m-0" style={{height:'100vh'}}>
                <ProfileSection />
              </div>
              {/* 右側作品集錯落網格區（可滾動） */}
              <section className="flex-1 w-2/3 h-full overflow-y-auto px-0 py-0 overflow-x-hidden">
                <div className="bg-white border-2 border-black rounded-[40px] h-full p-8 flex flex-col justify-start items-stretch overflow-x-hidden">
                  <ProjectGrid />
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
        .hero-left-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          margin-top: 48px;
          gap: 64px;
        }
        .hero-title-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-title-bg {
          font-size: 3.2rem;
          font-weight: 900;
          color: #111;
          background: #ffe000;
          padding: 20px 24px;
          border-radius: 6px;
          line-height: 1.1;
          display: inline-block;
          letter-spacing: 0.25em;
        }
        .hero-liam-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-liam-bg {
          font-size: 3.2rem;
          font-weight: 900;
          color: #111;
          background: #ffe000;
          padding: 20px 24px;
          border-radius: 6px;
          line-height: 1.1;
          display: inline-block;
        }
        .hero-vertical-desc {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 8px;
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-top: 24px;
          position: absolute;
          right: calc(10vw - 100px);
          top: 0;
        }
        .hero-vertical-desc > div {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          background: #ffe000;
          border-radius: 4px;
          padding: 12px 8px;
          display: inline-block;
          letter-spacing: 0.25em;
        }
        .hero-vertical-desc > div:nth-child(1) { margin-top: 0; margin-bottom: 0; }
        .hero-vertical-desc > div:nth-child(2) { margin-top: 24px; margin-bottom: 32px; }
        .hero-vertical-desc > div:nth-child(3) { margin-top: -12px; margin-bottom: 12px; }
        .hero-vertical-desc > div:nth-child(4) { margin-top: 18px; margin-bottom: 40px; }
        .hero-vertical-desc > div:nth-child(5) { margin-top: -8px; margin-bottom: 18px; }
        .hero-vertical-desc > div:nth-child(6) { margin-top: 20px; margin-bottom: 52px; }
        .hero-title-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .fade-in-map {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(.4,1.3,.6,1);
        }
        .fade-in-map.show {
          opacity: 1;
        }
        .slide-in-map {
          opacity: 0;
          transform: scale(1.8) translateX(-300px);
          transition: opacity 0.7s cubic-bezier(.4,1.3,.6,1), transform 0.9s cubic-bezier(.4,1.3,.6,1);
        }
        .slide-in-map.show {
          opacity: 1;
          transform: scale(1.8) translateX(0);
        }
        .slide-in-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-left.show {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-in-up {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-up.show {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-in-right {
          opacity: 0;
          transform: translateX(60px);
          transition: all 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-right.show {
          opacity: 1;
          transform: translateX(0);
        }
        .runner-animate {
          position: absolute;
          top: -60px;
          left: 0;
          width: 72px;
          height: 72px;
          z-index: 9999;
          animation: runner-move 12s linear infinite;
        }
        @keyframes runner-move {
          0% { left: 0; }
          100% { left: calc(100% - 72px); }
        }
        .runner-bar-relative {
          position: relative;
        }
        .vertical-bubble {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          letter-spacing: 0.2em;
          transition: transform 0.22s cubic-bezier(.4,1.3,.6,1), box-shadow 0.18s;
          cursor: pointer;
        }
        .vertical-bubble > div {
          line-height: 1.2;
        }
        .speech-bubble.vertical-bubble:hover {
          transform: scale(1.15) !important;
          z-index: 3;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18) !important;
        }
        .yilan-map-hover {
          transition: transform 0.32s cubic-bezier(.4,1.3,.6,1), box-shadow 0.22s;
        }
        .yilan-map-hover:hover {
          transform: scale(1.32);
          box-shadow: 0 12px 48px 0 rgba(0,0,0,0.25);
          z-index: 10;
        }
        .map-action-btn-center {
          display: block;
          margin: 0 auto;
          min-width: 260px;
          font-size: 2rem;
          padding: 1.2em 2.5em;
          border-radius: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 3px solid #000;
          outline: none;
          cursor: pointer;
          background: #ffe600;
          color: #000;
          transition: background 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .map-action-btn.map-action-btn-center:hover {
          background: #000 !important;
          color: #fff !important;
        }
        .test-hover-btn {
          font-size: 2rem;
          padding: 1.2em 2.5em;
          border-radius: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 3px solid #000;
          outline: none;
          cursor: pointer;
          margin-bottom: 0.5em;
          background: #ffe600;
          color: #000;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .test-hover-btn:hover {
          background: #000;
          color: #fff;
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
        .transition-overlay {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .transition-overlay.show {
          opacity: 1;
        }
        .transition-overlay-out {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .transition-overlay-out.show {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}