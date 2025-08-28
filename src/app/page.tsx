'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import ProfileSection from '../components/ProfileSection';
import ProjectGrid from '../components/ProjectGrid';

export default function Home() {
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isEnterHovered, setIsEnterHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);

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

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden" style={{ background: 'transparent' }}>
      {/* Windows 98 風格介紹視窗 */}
      {showIntroModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="win98-window relative" style={{
            width: '960px',
            maxWidth: '90vw',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace'
          }}>
            {/* Windows 98 標題列 */}
            <div className="win98-titlebar" style={{
              background: 'linear-gradient(90deg, #0080ff 0%, #004080 100%)',
              color: 'white',
              padding: '4px 6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '22px',
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
              <div className="flex space-x-1">
                <button style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  fontSize: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black'
                }}>_</button>
                <button style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  fontSize: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black'
                }}>□</button>
                <button 
                  onClick={() => setShowIntroModal(false)}
                  style={{
                    width: '16px',
                    height: '14px',
                    background: '#c0c0c0',
                    border: '1px outset #c0c0c0',
                    fontSize: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => (e.target as HTMLElement).style.border = '1px inset #c0c0c0'}
                  onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
                >×</button>
              </div>
            </div>
            
            {/* Windows 98 內容區域 */}
            <div style={{
              background: '#000080',
              color: 'white',
              padding: '32px',
              fontSize: '22px',
              lineHeight: '1.4',
              border: '2px inset #c0c0c0',
              margin: '2px'
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
                borderTop: '1px solid #4080ff',
                paddingTop: '24px',
                fontSize: '20px'
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
                        src="/DS-logo.png"
                        alt="DS Logo"
                        className="absolute w-full object-contain ds-logo-bounce"
                        style={{ 
                          transform: 'scale(0.8)', 
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
                          transition: 'all 0.5s ease-out, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transitionDelay: showRight ? '0.6s' : '0s'
                        }}
                        className={isTransitioning ? 'transition-fade' : ''}
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

            <div className="relative w-full h-[100vh] flex flex-row overflow-hidden">
              <div className="h-full w-1/3 min-w-[320px] max-w-[480px] flex-shrink-0 sticky top-0 left-0 z-20 bg-transparent border-r border-gray-200 p-0 m-0" style={{height:'100vh'}}>
                <ProfileSection />
              </div>
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
            transform: translateY(0px) scale(0.8);
          }
          50% {
            transform: translateY(-20px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
} 