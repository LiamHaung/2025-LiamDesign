"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import PsychologyTestCard from "@/components/BrandPsychologyTest";
// import Carousel3D from '../../components/Carousel3D';

// Hero 組件選項 (保留供未來使用)
// const heroVariants = {
//   simple: {
//     name: "簡潔版 Hero",
//     component: "SimpleHero"
//   },
//   animated: {
//     name: "動畫版 Hero",
//     component: "AnimatedHero"
//   },
//   fullscreen: {
//     name: "全螢幕 Hero",
//     component: "FullscreenHero"
//   },
//   dreamy: {
//     name: "夢幻版 Hero",
//     component: "DreamyHero"
//   }
// };

// 背景圖片選項
const backgroundImages = [
  { name: "Hero 主圖", url: "/hero.png" },
  { name: "Hero 2", url: "/hero-2.png" },
  { name: "Hero 工作區域", url: "/hero_工作區域 1 複本 3.png" },
  { name: "Hero 滾動視差 02", url: "/hero＿滾動視差-02.png" },
  { name: "Hero 滾動視差 03", url: "/hero＿滾動視差-03.png" }
];

// 簡潔版 Hero 組件 (保留供未來使用)
// const SimpleHero = ({ backgroundImage, title, subtitle }: { backgroundImage: string; title: string; subtitle: string }) => (
//   <section className="relative w-full h-[60vh] min-h-[400px] flex items-end bg-black overflow-hidden">
//     {/* 背景圖片 */}
//     <div 
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     />
//     
//     {/* 深色遮罩 */}
//     <div className="absolute inset-0 bg-black/50" />
//     
//     {/* 左上標題 */}
//     <h1 className="absolute left-8 top-8 text-3xl md:text-5xl font-black text-white z-10">
//       {title}
//     </h1>
//     
//     {/* 右上副標題 */}
//     <div className="absolute right-8 top-8 text-base md:text-xl font-bold text-right text-white z-10">
//       {subtitle}
//     </div>
//     
//     {/* 底部中央動畫人物 */}
//     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-48 pointer-events-none select-none z-10">
//       <Image
//         src="/runner.gif"
//         alt="runner"
//         width={192}
//         height={192}
//         priority
//       />
//     </div>
//   </section>
// );

// 動畫版 Hero 組件 (保留供未來使用)
// const AnimatedHero = ({ backgroundImage }: { backgroundImage: string }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const images = ['/hero＿滾動視差-02.png', '/hero＿滾動視差-03.png'];
//   
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage(prev => (prev + 1) % images.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [images.length]);
//
//   return (
//     <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
//       {/* 背景圖片 */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       />
//       
//       {/* 深色遮罩 */}
//       <div className="absolute inset-0 bg-black/50" />
//       
//       {/* 動畫人物 */}
//       <div className="relative z-10 flex items-center justify-center">
//         <Image 
//           key={currentImage}
//           src={images[currentImage]} 
//           alt={`Hero ${currentImage + 1}`} 
//           width={384}
//           height={384}
//           className="w-64 md:w-96 h-auto transition-opacity duration-500"
//           style={{ 
//             opacity: 1,
//             animation: 'fadeIn 0.5s ease-in-out'
//           }}
//         />
//       </div>
//       
//       {/* 標題 */}
//       <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 text-center text-white">
//         <h1 className="text-3xl md:text-5xl font-black mb-2">
//           #不論用何種方式，一起慢慢前進吧！
//         </h1>
//       </div>
//     </section>
//   );
// };

// 全螢幕 Hero 組件 (保留供未來使用)
// const FullscreenHero = ({ backgroundImage, backgroundColor }: { backgroundImage: string; backgroundColor: string }) => {
//   return (
//     <div style={{
//       width: '100vw',
//       height: '100vh',
//       position: 'relative',
//       overflow: 'hidden',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       {/* 背景圖片 */}
//       <div style={{
//         position: 'absolute',
//         inset: '0',
//         background: `url('${backgroundImage}')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }} />
//       
//       {/* 深藍色遮罩層 */}
//       <div style={{
//         position: 'absolute',
//         inset: '0',
//         backgroundColor: backgroundColor,
//         opacity: 0.75
//       }} />
//
//       {/* SVG 網格背景 */}
//       <svg style={{
//         position: 'absolute',
//         inset: '0',
//         width: '100%',
//         height: '100%',
//         opacity: 0.3
//       }}>
//         <defs>
//           <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
//             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
//           </pattern>
//         </defs>
//         <rect width="100%" fill="url(#grid)" />
//       </svg>
//
//       {/* 主要標題文字 */}
//       <div style={{
//         position: 'relative',
//         zIndex: 10,
//         textAlign: 'center',
//         color: '#ffffff',
//         fontFamily: 'var(--font-zpix), monospace',
//         fontSize: 'clamp(4rem, 12vw, 8rem)',
//         fontWeight: 'bold',
//         textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
//         letterSpacing: '0.1em',
//         lineHeight: '0.9',
//         textTransform: 'uppercase'
//       }}>
//         Liam.Design
//       </div>
//     </div>
//   );
// };

// 打字機文字組件
// TypewriterText 組件已移除，改用淡入動畫
// const TypewriterText = ({ text, speed = 150, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isStarted, setIsStarted] = useState(false);

//   useEffect(() => {
//     // 延遲開始
//     const delayTimer = setTimeout(() => {
//       setIsStarted(true);
//     }, delay);

//     return () => clearTimeout(delayTimer);
//   }, [delay]);

//   useEffect(() => {
//     if (!isStarted) return;

//     if (currentIndex < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText(prev => prev + text[currentIndex]);
//         setCurrentIndex(prev => prev + 1);
//       }, speed);
//       return () => clearTimeout(timer);
//     }
//   }, [currentIndex, text, speed, isStarted]);

//   return (
//     <span>
//       {displayedText}
//       <span style={{ opacity: currentIndex < text.length ? 1 : 0 }}>|</span>
//     </span>
//   );
// };

// 載入頁面組件
const LoadingPage = ({ 
  loadingPhase, 
  countdown,
  onEnterMainContent,
  isDesktop
}: { 
  loadingPhase: 'loading' | 'ready' | 'main';
  countdown: number | null;
  onEnterMainContent: () => void;
  isDesktop: boolean;
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease-out',
      opacity: loadingPhase === 'main' ? 0 : 1,
      pointerEvents: loadingPhase === 'main' ? 'none' : 'auto'
    }}>
      {/* 放大500%的軌道系統和流星 - 複製3個，錯落分布 */}
      {[
        { top: '10%', left: '5%', opacity: 0.5, centerColor: '#003EC3' },
        { top: '20%', right: '5%', opacity: 0.5, centerColor: '#e9a52f' },
        { bottom: '15%', left: '15%', opacity: 0.5, centerColor: '#fffff3' }
      ].map((group, groupIndex) => (
        <div
          key={`orbit-group-${groupIndex}`}
          style={{
            position: 'absolute',
            ...group,
            width: '3000px', // 600px * 5 = 3000px
            height: '3000px',
            transform: 'translate(-50%, -50%)',
            opacity: group.opacity,
            zIndex: 1
          }}
        >
          {/* 外軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3000px', // 600px * 5
            height: '3000px',
            border: '10px solid rgba(0, 62, 195, 0.3)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 20s linear infinite'
          }} />
          
          {/* 外軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3000px',
            height: '3000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 20s linear infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '40px', // 8px * 5
              height: '40px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 50px rgba(0, 62, 195, 0.8)' // 10px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '30px', // 6px * 5
              height: '30px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 40px rgba(74, 144, 226, 0.6)' // 8px * 5
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              width: '35px', // 7px * 5
              height: '35px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 45px rgba(0, 62, 195, 0.7)' // 9px * 5
            }} />
          </div>
          
          {/* 中軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2000px', // 400px * 5
            height: '2000px',
            border: '10px solid rgba(0, 62, 195, 0.5)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 15s linear infinite reverse'
          }} />
          
          {/* 中軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2000px',
            height: '2000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 15s linear infinite reverse'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '30px', // 6px * 5
              height: '30px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 40px rgba(74, 144, 226, 0.8)' // 8px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '25px', // 5px * 5
              height: '25px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 30px rgba(0, 62, 195, 0.6)' // 6px * 5
            }} />
          </div>
          
          {/* 內軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1000px', // 200px * 5
            height: '1000px',
            border: '10px solid rgba(0, 62, 195, 0.7)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 10s linear infinite'
          }} />
          
          {/* 內軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1000px',
            height: '1000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 10s linear infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '20px', // 4px * 5
              height: '20px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 30px rgba(0, 62, 195, 0.9)' // 6px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '15px', // 3px * 5
              height: '15px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 20px rgba(74, 144, 226, 0.7)' // 4px * 5
            }} />
          </div>
          
          {/* 中心點 - 根據組別設置不同顏色 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px', // 20px * 5
            height: '100px',
            background: group.centerColor,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 100px ${group.centerColor}` // 20px * 5
          }} />
          
          {/* 流星效果 - 放大500% */}
          {[
            { angle: 60, startX: 10, delay: 0 },
            { angle: 60, startX: 50, delay: 3.0 },
            { angle: 60, startX: 80, delay: 6.0 }
          ].map((meteor, i) => (
            <div
              key={`meteor-${groupIndex}-${i}`}
              style={{
                position: 'absolute',
                left: `${meteor.startX}%`,
                top: '-250px', // -50px * 5
                width: '120px', // 24px * 5
                height: '120px',
                backgroundImage: 'url(/star-big.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                animation: `meteorFall ${3 + (i % 3) * 0.5}s linear infinite`,
                animationDelay: `${meteor.delay}s`,
                zIndex: 2,
                filter: 'drop-shadow(0 0 40px rgba(0, 62, 195, 0.8))', // 8px * 5
                transform: `rotate(${meteor.angle - 45}deg)`
              }}
            />
          ))}
        </div>
      ))}

      {/* 原始軌道系統 - 保留在中心 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* 外軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          border: '2px solid rgba(0, 62, 195, 0.3)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 20s linear infinite'
        }} />
        
        {/* 外軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 20s linear infinite'
        }}>
        
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '8px',
            height: '8px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(0, 62, 195, 0.8)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '6px',
            height: '6px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            width: '7px',
            height: '7px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 9px rgba(0, 62, 195, 0.7)'
          }} />
        </div>
        
        {/* 中軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          border: '2px solid rgba(0, 62, 195, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 15s linear infinite reverse'
        }} />
        
        {/* 中軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 15s linear infinite reverse'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '6px',
            height: '6px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.8)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '5px',
            height: '5px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 6px rgba(0, 62, 195, 0.6)'
          }} />
        </div>
        
        {/* 內軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          border: '2px solid rgba(0, 62, 195, 0.7)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 10s linear infinite'
        }} />
        
        {/* 內軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 10s linear infinite'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '4px',
            height: '4px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 6px rgba(0, 62, 195, 0.9)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '3px',
            height: '3px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 4px rgba(74, 144, 226, 0.7)'
          }} />
        </div>
        
        {/* 中心點 (Logo 周圍) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '20px',
          background: '#003EC3',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #003EC3'
        }} />
      </div>

      {/* 背景星星裝飾 */}
      {[...Array(9)].map((_, i) => {
        const positions = [
          { top: '10%', left: '15%' },
          { top: '20%', right: '20%' },
          { top: '30%', left: '8%' },
          { top: '40%', right: '12%' },
          { top: '50%', left: '25%' },
          { top: '60%', right: '18%' },
          { top: '70%', left: '10%' },
          { top: '25%', right: '40%' },
          { top: '55%', left: '45%' }
        ];
        const pos = positions[i] || { top: `${10 + i * 5}%`, left: `${10 + i * 5}%` };
        const size = 8 + (i % 3) * 4; // 8px, 12px, 16px 交替
        return (
          <div
            key={`loading-star-${i}`}
            style={{
              position: 'absolute',
              ...pos,
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: `twinkle ${2 + i * 0.2}s infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.6 + (i % 3) * 0.1,
              zIndex: 1
            }}
          />
        );
      })}

      {/* 流星效果 - 使用星星圖片 */}
      {[
        { angle: 60, startX: 10, delay: 0 },
        { angle: 60, startX: 50, delay: 3.0 },
        { angle: 60, startX: 80, delay: 6.0 }
      ].map((meteor, i) => {
        return (
        <div
          key={`loading-meteor-${i}`}
          style={{
              position: 'absolute',
              left: `${meteor.startX}%`,
              top: '-50px',
              width: '24px',
              height: '24px',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: `meteorFall ${3 + (i % 3) * 0.5}s linear infinite`,
              animationDelay: `${meteor.delay}s`,
              opacity: 0.9,
              zIndex: 2,
              filter: 'drop-shadow(0 0 8px rgba(0, 62, 195, 0.8))',
              transform: `rotate(${meteor.angle - 45}deg)`
            }}
          />
        );
      })}


      {/* 畫框和文字按鈕容器 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isDesktop ? 'auto' : 'clamp(320px, 50vw, 600px)'
      }}>
        {/* 圖釘 - 先放置，作為V形繩子的對齊點 */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
            width: '16px',
            height: '16px',
          background: 'radial-gradient(circle, #e9a52f 0%, #d8941f 70%, #c7830f 100%)',
          borderRadius: '50%',
          zIndex: 12,
          boxShadow: '0 2px 8px rgba(233, 165, 47, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
        }} />
        
        {/* 懸掛繩子 - V形，尖端對齊圖釘中心 */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: '40px',
          zIndex: 11,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {/* 左側繩子 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px', // 從圖釘中心點開始（圖釘高度16px，中心在8px）
            width: '2px',
            height: '32px',
            background: 'linear-gradient(to bottom, #8B4513, #654321)',
            transform: 'translateX(-50%) rotate(-15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }} />
          {/* 右側繩子 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px', // 從圖釘中心點開始
            width: '2px',
            height: '32px',
            background: 'linear-gradient(to bottom, #8B4513, #654321)',
            transform: 'translateX(-50%) rotate(15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }} />
        </div>

        {/* 畫框容器 - 已移除畫框邊框和背景 */}
      <div style={{
        position: 'relative',
          width: 'clamp(320px, 50vw, 600px)',
          height: 'clamp(240px, 37.5vw, 450px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'clamp(8px, 1.2vw, 16px)'
        }}>
          {/* 畫框內漸層區域 - 漸層背景一開始就顯示 */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #fffff3 0%, #f3e8c1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* 復古電影十字線和同心圓 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}>
              {/* 十字線 - 水平線 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '1px',
                background: 'rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-50%)'
              }} />
              {/* 十字線 - 垂直線 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '1px',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                transform: 'translateX(-50%)'
              }} />
              
              {/* 外層同心圓 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(200px, 40vw, 400px)',
                height: 'clamp(200px, 40vw, 400px)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '50%'
              }} />
              
              {/* 內層同心圓 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(120px, 24vw, 240px)',
                height: 'clamp(120px, 24vw, 240px)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '50%'
              }} />
            </div>

            {/* 復古電影效果覆蓋層 */}
            {countdown !== null && countdown > 0 && (
              <>
                {/* 顆粒感效果 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      rgba(0, 0, 0, 0.03) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 3px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      rgba(0, 0, 0, 0.03) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 3px
                    )
                  `,
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                
                {/* 閃爍效果 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  animation: 'filmFlicker 0.15s infinite',
                  pointerEvents: 'none',
                  zIndex: 3
                }} />
              </>
            )}

            {/* 倒計時數字 - 應用復古電影效果 */}
            {countdown !== null && countdown > 0 && (
              <div style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                fontWeight: '500',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                color: '#000000',
                animation: 'countdownPulse 1s ease-out',
                zIndex: 4,
                position: 'relative',
                letterSpacing: '0.1em',
                filter: 'grayscale(100%) contrast(120%) brightness(0.9)'
              }}>
                {countdown}
              </div>
            )}

            {/* Logo - 在畫框內右下角，倒計時2和1之間出現，之後持續存在 */}
            {(countdown === 1 || (countdown === null && loadingPhase === 'ready')) && (
              <div style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vw, 40px)',
                right: 'clamp(20px, 4vw, 40px)',
                zIndex: 5,
                animation: countdown === 1 ? 'logoFadeIn 0.8s ease-out both' : 'none',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                {/* 毛玻璃背景 */}
                <div style={{
                  position: 'absolute',
                  width: 'clamp(100px, 16vw, 160px)',
                  height: 'clamp(100px, 16vw, 160px)',
                  background: 'rgba(255, 255, 243, 0.4)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  zIndex: 0
                }} />
        <Image
          src="/cursor-07.png"
          alt="Liam Design Logo"
                  width={80}
                  height={80}
          style={{
                    width: 'clamp(60px, 10vw, 100px)',
                    height: 'clamp(60px, 10vw, 100px)',
            objectFit: 'contain',
                    filter: 'brightness(1.2)',
                    position: 'relative',
                    zIndex: 1
          }}
        />
      </div>
            )}

            {/* 倒計時結束後淡入的圖片和雲朵 */}
            {countdown === null && loadingPhase === 'ready' && (
              <>
                {/* 雲朵 - 在圖片後面 */}
                {[
                  { src: '/cloud-2.png', top: '10%', left: '5%', width: 'clamp(80px, 15vw, 150px)', delay: 0 },
                  { src: '/cloud-3.png', top: '15%', right: '8%', width: 'clamp(100px, 18vw, 180px)', delay: 0.5 },
                  { src: '/cloud-2.png', bottom: '20%', left: '10%', width: 'clamp(90px, 16vw, 160px)', delay: 1 },
                  { src: '/cloud-3.png', bottom: '15%', right: '5%', width: 'clamp(85px, 15vw, 150px)', delay: 1.5 },
                  { src: '/cloud-2.png', top: '50%', left: '2%', width: 'clamp(70px, 12vw, 130px)', delay: 2 }
                ].map((cloud, index) => (
                  <div
                    key={`cloud-${index}`}
                    style={{
                      position: 'absolute',
                      top: cloud.top,
                      bottom: cloud.bottom,
                      left: cloud.left,
                      right: cloud.right,
                      width: cloud.width,
                      height: 'auto',
                      zIndex: 3,
                      opacity: 0,
                      animation: `fadeIn 1s ease-out ${cloud.delay}s forwards, floatCloud 6s ease-in-out ${cloud.delay}s infinite`
                    }}
                  >
                    <Image
                      src={cloud.src}
                      alt="Cloud"
                      width={150}
                      height={100}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                ))}

                {/* 主要圖片 - service-3.png */}
      <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                  animation: 'fadeIn 1s ease-out'
                }}>
                  <Image
                    src="/service-3.png"
                    alt="Service"
                    width={600}
                    height={450}
                    style={{
                      width: '100%',
          height: '100%',
                      objectFit: 'contain',
                      filter: 'none',
                      animation: 'sway 3s ease-in-out infinite',
                      transformOrigin: 'center center'
                    }}
                  />
                </div>
              </>
            )}
          </div>
      </div>

        {/* 文字和按鈕容器 - 畫架下方，移動版上下布局 */}
        {countdown === null && loadingPhase === 'ready' && (
          <div style={{
            width: '100%',
            marginTop: isDesktop ? '0' : 'clamp(24px, 4vh, 40px)',
            display: isDesktop ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vh, 24px)'
          }}>
            {/* 文字內容 - 移動版100%寬度 */}
            <div style={{
              width: '100%',
              textAlign: 'center',
              animation: 'fadeInUp 1s ease-out 0s both'
            }}>
              <div style={{
                color: '#fffff3',
                fontSize: 'clamp(0.96rem, 2.4vw, 1.44rem)',
                fontWeight: '400',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                letterSpacing: '0.12em',
                lineHeight: '0.8',
                textShadow: '0 0 20px rgba(0, 62, 195, 0.5)',
                padding: '0 clamp(12px, 3vw, 20px)'
              }}>
                歡迎來 <span style={{ fontWeight: '700' }}>Liam Studio</span>
                <br /><br />
                這裡提供<span style={{ fontWeight: '700' }}>有溫度且實用的設計</span>
                <br /><br />
                一起來書寫<span style={{ fontWeight: '700' }}>好玩的品牌故事</span>吧！
              </div>
            </div>

            {/* L型按鈕 - 移動版100%寬度 */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              animation: 'fadeInUp 0.8s ease-out 0.5s both'
            }}>
              {/* L型按鈕（移動版）- 沿用桌面版L型 */}
              <div style={{
                position: 'relative',
                width: 'clamp(200px, 60vw, 280px)',
                height: 'clamp(50px, 12vw, 70px)'
              }}>
                {/* 主按鈕區域 - 右側 */}
        <button
          onClick={onEnterMainContent}
          style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 'calc(100% - 30px)',
                    height: '100%',
            background: '#003EC3',
            border: 'none',
            color: 'white',
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    zIndex: 2,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '0'
          }}
          onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      extensionBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(0) scale(1)';
                      extensionBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
          }}
        >
                  <span style={{ fontSize: '1.2em' }}>←</span>
                  <span>Enter</span>
        </button>
                {/* L型延伸部分 - 左側下方 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: 0,
                    width: '30px',
                    height: 'calc(100% - 30px)',
                    background: '#003EC3',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    zIndex: 1,
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                  onMouseEnter={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      mainBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(0) scale(1)';
                      mainBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 文字和按鈕容器 - 桌面版左右布局 */}
      {countdown === null && loadingPhase === 'ready' && isDesktop && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: 'clamp(320px, 50vw, 600px)',
          marginTop: 'clamp(40px, 8vh, 80px)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0
        }}>
          {/* 文字內容 - 左側70% */}
          <div style={{
            flex: '0 0 70%',
            width: '70%',
            textAlign: 'left',
            animation: 'slideInFromRight 1s ease-out 0s both'
        }}>
          <div style={{
            color: '#fffff3',
              fontSize: 'clamp(0.96rem, 2.4vw, 1.44rem)',
              fontWeight: '400',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              letterSpacing: '0.12em',
              lineHeight: '0.8',
              textShadow: '0 0 20px rgba(0, 62, 195, 0.5)'
            }}>
              歡迎來 <span style={{ fontWeight: '700' }}>Liam Studio</span>
              <br /><br />
              這裡提供<span style={{ fontWeight: '700' }}>有溫度且實用的設計</span>
              <br /><br />
              一起來書寫<span style={{ fontWeight: '700' }}>好玩的品牌故事</span>吧！
          </div>
          </div>

          {/* L型按鈕 - 右側30% */}
          <div style={{
            flex: '0 0 30%',
            width: '30%',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeInUp 0.8s ease-out 0.5s both'
          }}>
            {/* L型按鈕（桌面版）- 鏡像，像鍵盤Enter鍵 */}
            <div style={{
                position: 'relative',
                width: 'clamp(120px, 15vw, 180px)',
                height: 'clamp(60px, 8vw, 90px)'
              }}>
                {/* 主按鈕區域 - 右側 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 'calc(100% - 30px)',
                    height: '100%',
                    background: '#003EC3',
                    border: 'none',
                    color: 'white',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    zIndex: 2,
                    borderTopRightRadius: '8px', // 外圍右上角 - 圓角
                    borderBottomRightRadius: '8px', // 外圍右下角 - 圓角
                    borderTopLeftRadius: '8px', // 外圍左上角 - 圓角
                    borderBottomLeftRadius: '0' // 與延伸部分連接處 - 直角
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      extensionBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(0) scale(1)';
                      extensionBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2em' }}>←</span>
                  <span>Enter</span>
                </button>
                {/* L型延伸部分 - 左側下方 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: 0,
                    width: '30px',
                    height: 'calc(100% - 30px)',
                    background: '#003EC3',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    zIndex: 1,
                    borderTopLeftRadius: '8px', // 外圍左上角 - 圓角
                    borderBottomLeftRadius: '8px', // 外圍左下角 - 圓角
                    borderTopRightRadius: '0', // 與主按鈕連接處 - 直角
                    borderBottomRightRadius: '0' // 右下角 - 直角
                  }}
                  onMouseEnter={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      mainBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(0) scale(1)';
                      mainBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                  }}
                />
              </div>
          </div>
        </div>
      )}

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes meteorFall {
          0% { 
            opacity: 0;
            transform: translateX(-200px) translateY(-200px) rotate(15deg) scale(0.5);
            filter: blur(4px) drop-shadow(0 0 8px rgba(0, 62, 195, 0.8));
          }
          10% { 
            opacity: 0.8;
            filter: blur(2px) drop-shadow(0 0 12px rgba(0, 62, 195, 1));
          }
          50% { 
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(15deg) scale(1);
            filter: blur(0px) drop-shadow(0 0 16px rgba(0, 62, 195, 1));
          }
          90% { 
            opacity: 0.8;
            filter: blur(2px) drop-shadow(0 0 12px rgba(0, 62, 195, 0.8));
          }
          100% { 
            opacity: 0;
            transform: translateX(200px) translateY(calc(100vh + 200px)) rotate(15deg) scale(0.5);
            filter: blur(4px) drop-shadow(0 0 8px rgba(0, 62, 195, 0.5));
          }
        }
        
        @keyframes meteorStarBlur {
          0% { opacity: 0; transform: translateX(-200px) translateY(200px) rotate(45deg); filter: blur(3px); }
          20% { opacity: 0.3; transform: translateX(-100px) translateY(100px) rotate(45deg); filter: blur(2px); }
          50% { opacity: 1; transform: translateX(0px) translateY(0px) rotate(45deg); filter: blur(0px); }
          80% { opacity: 0.3; transform: translateX(100px) translateY(-100px) rotate(45deg); filter: blur(2px); }
          100% { opacity: 0; transform: translateX(200px) translateY(-200px) rotate(45deg); filter: blur(3px); }
        }
        
        @keyframes countdownPulse {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
        }
        
        @keyframes filmFlicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.15; }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-8px) rotate(-1deg);
          }
          75% {
            transform: translateX(8px) rotate(1deg);
          }
        }
        
        @keyframes floatCloud {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        
        @keyframes logoFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// 項目數據接口
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  galleryImages: string[];
  detailedDescription: string;
  year: number;
}

// 商品數據接口
interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
  tag: string;
}

// 設計日記項目類型
interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  tags?: string[];
  mood?: string;
  projectName?: string;
  part1?: string;
  part2?: string;
  part3?: string;
  backgroundImage?: string;
}

// 商品卡片組件
const ProductCard = ({ product, onProductClick }: { product: ProductItem; onProductClick: (product: ProductItem) => void }) => {
  return (
    <div style={{
      background: 'rgba(0, 62, 195, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 62, 195, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onClick={() => onProductClick(product)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 62, 195, 0.3)';
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 62, 195, 0.2)';
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    }}
    >
      {/* 商品圖片 */}
      <div style={{
        width: '100%',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.2), rgba(74, 144, 226, 0.2))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        {/* 發光效果 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent, rgba(0, 62, 195, 0.1), transparent)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* 商品名稱 */}
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: '400',
        color: '#fffff3',
        margin: '0 0 8px 0',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        letterSpacing: '0.05em'
      }}>
        {product.name}
      </h3>

      {/* 價格 */}
      <div style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#FF8C00', // 品牌橘色
        marginBottom: '12px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif'
      }}>
        {product.price}
      </div>

      {/* 標籤 */}
      <div style={{
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 243, 0.8)',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        fontWeight: '400',
        letterSpacing: '0.02em',
        background: 'rgba(0, 62, 195, 0.2)',
        padding: '4px 8px',
        borderRadius: '8px',
        display: 'inline-block',
        border: '1px solid rgba(0, 62, 195, 0.3)'
      }}>
        {product.tag}
      </div>

      {/* 背景裝飾 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(0, 62, 195, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }} />
    </div>
  );
};
// 商品詳情 Modal 組件
const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart, 
  onDirectContact 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: ProductItem | null;
  onAddToCart: (product: ProductItem) => void;
  onDirectContact: (product: ProductItem) => void;
}) => {
  if (!isOpen || !product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.1), rgba(74, 144, 226, 0.1))',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 62, 195, 0.3)',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ×
        </button>

        {/* 商品圖片 */}
        <div style={{
          width: '100%',
          height: '300px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '30px',
          background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.2), rgba(74, 144, 226, 0.2))'
        }}>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={300}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* 商品資訊 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '400',
            color: '#fffff3',
            margin: '0 0 10px 0',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            letterSpacing: '0.05em'
          }}>
            {product.name}
          </h2>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#FF8C00', // 品牌橘色
            marginBottom: '15px',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            {product.price}
          </div>

          <div style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 243, 0.8)',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            fontWeight: '400',
            letterSpacing: '0.02em',
            background: 'rgba(0, 62, 195, 0.2)',
            padding: '8px 12px',
            borderRadius: '12px',
            display: 'inline-block',
            border: '1px solid rgba(0, 62, 195, 0.3)',
            marginBottom: '20px'
          }}>
            {product.tag}
          </div>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 243, 0.9)',
            lineHeight: '1.6',
            margin: '0 0 20px 0'
          }}>
            這些小東西不多，如果喜歡，就來聊聊吧 :)
          </p>
        </div>

        {/* 按鈕區域 */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            style={{
              background: '#003EC3',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '900',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 62, 195, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flex: '1'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 62, 195, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 62, 195, 0.3)';
            }}
          >
            🛒 加入購物車
          </button>

          <button
            onClick={() => {
              onDirectContact(product);
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '10px 16px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '700',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flex: '1'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            }}
          >
            💬 直接聯繫購買
          </button>
        </div>
      </div>
    </div>
  );
};

// 自我介紹 Modal 組件
const IntroModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'rgba(255, 255, 243, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        textAlign: 'center'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#000000',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
          }}
        >
          ×
        </button>

        {/* 頭貼 */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto 30px auto',
          background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.3), rgba(150, 150, 150, 0.2))',
          border: '3px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <Image
            src="/designer.png"
            alt="Designer"
            width={120}
            height={120}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* 名稱 */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '400',
          color: '#000000',
          margin: '0 0 20px 0',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          letterSpacing: '0.05em'
        }}>
          Hi 我是 Liam
        </h2>

        {/* 小標題 */}
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#000000',
          margin: '0 0 20px 0',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          letterSpacing: '0.02em'
        }}>
          設計陪跑，讓品牌長成自己的樣子
        </h3>

        {/* 介紹 */}
        <div style={{
          fontSize: '1rem',
          color: '#000000',
          lineHeight: '1.8',
          margin: '0 0 30px 0',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          fontWeight: '500',
          letterSpacing: '0.02em',
          textAlign: 'left'
        }}>
          <p style={{ margin: '0' }}>
            以在地感、故事性與生活觀察為核心，擅長把品牌轉化成視覺。從識別到活動主視覺，以陪跑的方式協助品牌找到步調，做出既有溫度又能成長的設計。
          </p>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          style={{
            background: '#000000',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
            e.currentTarget.style.background = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.background = '#000000';
          }}
        >
          關閉
        </button>
      </div>
    </div>
  );
};

// 購物清單側欄組件
const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: ProductItem[];
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}) => {
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + price;
  }, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: isOpen ? 0 : '-400px',
      width: '400px',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.1), rgba(74, 144, 226, 0.1))',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '-10px 0 30px rgba(0, 62, 195, 0.3)',
      zIndex: 1500,
      transition: 'right 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '20px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '20px'
    }}>
      {/* 標題和關閉按鈕 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#fffff3',
          margin: 0,
          fontFamily: 'var(--font-zpix), monospace',
          letterSpacing: '0.05em'
        }}>
          🧺 購物清單
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ×
        </button>
      </div>

      {/* 商品列表 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 243, 0.6)',
            fontSize: '1rem',
            padding: '40px 20px'
          }}>
            購物清單是空的
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              marginBottom: '15px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginRight: '15px',
                background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.2), rgba(74, 144, 226, 0.2))'
              }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  color: '#fffff3',
                  marginBottom: '5px',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#FF8C00', // 品牌橘色
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif'
                }}>
                  {item.price}
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                style={{
                  background: 'rgba(255, 0, 0, 0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  width: '30px',
                  height: '30px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)';
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* 總金額和按鈕 */}
      {cartItems.length > 0 && (
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '400',
              color: '#fffff3',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              總計
            </span>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#FF8C00', // 品牌橘色
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              NT$ {totalAmount.toFixed(0)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column'
          }}>
            <button
              onClick={onCheckout}
              style={{
                background: '#003EC3',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
              }}
            >
              前往結帳
            </button>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              }}
            >
              繼續逛逛
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// 彈出式視窗組件
const ProjectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 檢測移動裝置
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev < project.galleryImages.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : project.galleryImages.length - 1
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        padding: isMobile ? '0' : '16px'
      }}
      onClick={onClose}
    >
      <div
        className="w-full flex flex-col"
        style={{ 
          maxHeight: isMobile ? '70vh' : '80vh', // 手機版70%，桌面版80%
          overflow: 'auto',
          maxWidth: isMobile ? '100%' : '900px', // 桌面版縮小，與圖片寬度差不多
          width: isMobile ? '100%' : 'fit-content', // 桌面版自適應內容寬度
          borderRadius: isMobile ? '0' : '20px',
          boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.3)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative' // 為關閉按鈕提供定位參考
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕容器 - 粘性定位於彈出視窗右上角上沿，滾動時保持可見 */}
        <div style={{
          position: 'sticky', // 使用 sticky，滾動時保持在頂部可見
          top: isMobile ? '12px' : '20px',
          alignSelf: 'flex-end', // 對齊到右側
          marginLeft: 'auto', // 推到右側
          marginBottom: 'auto', // 推到頂部
          zIndex: 10001, // 確保在最上層
          width: 'fit-content',
          height: 'fit-content'
        }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: 'relative',
              right: isMobile ? '12px' : '20px',
            background: isMobile ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.85)', // 淺色背景
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: isMobile ? '2px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '50%',
            width: isMobile ? '48px' : '44px',
            height: isMobile ? '48px' : '44px',
            cursor: 'pointer',
            fontSize: isMobile ? '22px' : '20px',
            color: isMobile ? '#333' : '#555', // 深色文字
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            fontWeight: 'normal',
            boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.4)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
          >
            ✕
          </button>
        </div>
        {/* 上半部：圖片展示區 - 移除背景色塊 */}
        <div style={{ 
          background: 'transparent', // 移除背景色塊
          padding: isMobile ? '20px 12px 16px' : '20px 20px 16px' // 桌面版適中 padding
        }}>
          {/* 標題區 - 優化設計感排版，對齊 Project Details 標題位置 */}
          <div style={{ 
            marginBottom: isMobile ? '24px' : '16px', 
            paddingTop: isMobile ? '16px' : '0', // 手機版減少 padding-top，移除多餘空白
            paddingBottom: isMobile ? '20px' : '0',
            position: 'relative',
            maxWidth: '800px', // 與 Project Details 容器寬度一致
            margin: isMobile ? '0 auto' : '0', // 手機版置中，桌面版左對齊
            paddingLeft: isMobile ? '0' : '24px', // 桌面版對齊 Project Details 的 paddingLeft
            paddingRight: isMobile ? '0' : '24px'
          }}>
            {/* 標題 - 左對齊，對齊 Project Details */}
            <h2 
              style={{
                fontSize: isMobile ? 'clamp(1.5rem, 5.5vw, 2rem)' : 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: '400',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                color: '#1a1a1a',
                marginBottom: isMobile ? '16px' : '10px',
                letterSpacing: '-0.03em',
                lineHeight: '1.2',
                textAlign: 'left',
                paddingLeft: '0', // 移除額外 padding，直接對齊
                position: 'relative',
                paddingBottom: isMobile ? '12px' : '10px'
              }}
            >
              {project.title}
              {/* 標題下方裝飾線 - 灰色實心線 */}
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: isMobile ? '60px' : '50px',
                height: '2px',
                background: '#ddd', // 灰色實心線
                borderRadius: '1px'
              }}></span>
            </h2>
            {/* 描述 - 左對齊，對齊 Project Details */}
            <p 
              style={{
                fontSize: isMobile ? 'clamp(0.95rem, 3.8vw, 1.15rem)' : 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: '#555',
                fontWeight: '400',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                lineHeight: isMobile ? '1.75' : '1.6',
                textAlign: 'left',
                paddingLeft: '0', // 移除額外 padding，直接對齊
                paddingRight: '0',
                paddingBottom: isMobile ? '20px' : '16px', // 增加下方間距
                letterSpacing: '0.01em',
                marginTop: isMobile ? '8px' : '4px'
              }}
            >
              {project.description}
            </p>
        </div>

          {/* 標籤 - 手機版在圖片外，桌面版在圖片內 */}
          {isMobile && (
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '16px',
                justifyContent: 'center'
              }}
            >
            {project.tags.map((tag, index) => (
              <span
                key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '11px',
                    color: '#555',
                    fontWeight: '400',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
              >
                {tag}
              </span>
            ))}
          </div>
          )}

          {/* 照片輪播區域 - 1575:1500 比例，移除背景色塊 */}
          <div 
            style={{
              position: 'relative',
              background: 'transparent', // 移除背景色塊
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: isMobile ? '12px' : '16px',
              aspectRatio: '1575 / 1500',
              maxHeight: isMobile ? 'none' : '65vh',
              margin: '0 auto'
            }}
          >
            {/* 標籤 - 桌面版在圖片內左上角 */}
            {!isMobile && (
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  zIndex: 10
                }}
              >
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: '#444',
                      fontWeight: '400',
                      fontFamily: 'var(--font-google-sans-flex), sans-serif',
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {tag}
                  </span>
                ))}
        </div>
            )}

            {/* 圖片 */}
            <img
                src={project.galleryImages[currentImageIndex] || project.image}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />

            {/* 底部導航按鈕 - 響應式設計 */}
            {project.galleryImages.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '12px' : '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '10px' : '16px',
                  zIndex: 10
                }}
              >
              {/* 上一張按鈕 */}
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '50%',
                    width: isMobile ? '40px' : '52px',
                    height: isMobile ? '40px' : '52px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '18px' : '22px',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    fontWeight: 'normal',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'scale(1.08)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
                    }
                  }}
                >
                  ‹
              </button>
              
                {/* 圖片計數器 - 手機版縮小 */}
                  <div 
          style={{ 
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: 'white',
                    padding: isMobile ? '6px 12px' : '10px 20px',
                    borderRadius: '20px',
                    fontSize: isMobile ? '11px' : '13px',
                    fontWeight: '400',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {currentImageIndex + 1} / {project.galleryImages.length}
              </div>
              
              {/* 下一張按鈕 */}
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '50%',
                    width: isMobile ? '40px' : '52px',
                    height: isMobile ? '40px' : '52px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '18px' : '22px',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    fontWeight: 'normal',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'scale(1.08)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
                    }
                  }}
                >
                  ›
              </button>
              </div>
            )}
            </div>
    </div>
    
        {/* 下半部：專案詳情 - 桌面版和手機版都顯示，但樣式不同 */}
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            padding: isMobile ? '30px 20px 40px' : '20px 24px 24px', // 桌面版減少 padding
            borderTop: '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 專案詳情標題 */}
            <div 
              style={{
                display: 'inline-block',
                fontSize: isMobile ? '11px' : '11px',
                fontWeight: '600',
                color: '#999',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: isMobile ? '16px' : '12px',
                paddingBottom: '8px',
                borderBottom: '2px solid #ddd'
              }}
            >
              Project Details
            </div>
            
            {/* 詳細描述 */}
            <p 
              style={{
                fontSize: isMobile ? 'clamp(0.9rem, 3.5vw, 1.05rem)' : 'clamp(0.9rem, 1.6vw, 1.05rem)',
                color: '#444',
                lineHeight: isMobile ? '1.8' : '1.7',
                fontWeight: '400',
                letterSpacing: '0.01em'
              }}
            >
              {project.detailedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 設計日記元件 - 現代數位風格
const DesignDiary: React.FC<{
  entries: DiaryEntry[];
  selectedEntry: DiaryEntry | null;
  onSelectEntry: (entry: DiaryEntry | null) => void;
}> = ({ entries, selectedEntry, onSelectEntry }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardOpacities, setCardOpacities] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 檢測裝置類型
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 控制背景滾動：彈出視窗開啟時鎖定背景，關閉時恢復
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (selectedEntry) {
      // 彈出視窗開啟時，鎖定背景滾動
      document.body.style.overflow = 'hidden';
    } else {
      // 彈出視窗關閉時，恢復背景滾動
      document.body.style.overflow = '';
    }

    // 清理函數：確保組件卸載時恢復滾動
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEntry]);

  // 計算卡片透明度：根據與視窗中心的距離（所有卡片都顯示，只是透明度不同）
  const calculateOpacities = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    const opacities = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) {
        // 如果 ref 還沒準備好，給一個默認值（所有卡片都顯示）
        // 確保所有卡片至少有一定透明度
        return Math.max(0.4 - (index * 0.05), 0.2); // 從0.4遞減，最低0.2
      }
      
      const cardRect = cardRef.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      const cardWidth = cardRect.width || 300; // 如果寬度為0，使用默認值
      
      // 計算距離（以卡片寬度為單位）
      const distanceInCards = cardWidth > 0 ? distance / cardWidth : 999;
      
      // 透明度規則：所有卡片都顯示，根據距離漸變
      // 確保所有卡片都有最低透明度0.3，讓它們都可見
      if (distanceInCards < 0.5) {
        return 1; // 當前卡片：100%
      } else if (distanceInCards < 1.5) {
        return 0.6; // 左右第一個：60%
      } else if (distanceInCards < 2.5) {
        return 0.4; // 左右第二個：40%（提高從20%到40%）
      } else if (distanceInCards < 3.5) {
        return 0.3; // 左右第三個：30%
      } else {
        // 更遠的卡片也顯示，但透明度較低，但最低保持0.3
        // 所有遠距離的卡片都保持0.3的透明度，確保它們都可見
        return 0.3; // 最低透明度0.3，確保所有卡片都可見
      }
    });
    
    setCardOpacities(opacities);
  };

  // 監聽滾動事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 使用 requestAnimationFrame 確保在下一幀計算，此時 DOM 已更新
      requestAnimationFrame(() => {
        calculateOpacities();
      });
    };

    const handleWheel = (e: WheelEvent) => {
      // 只在輪播區域內才觸發
      const target = e.target as HTMLElement;
      const isInCarousel = container.contains(target);
      
      if (isInCarousel) {
        // 水平滾動時，轉換為水平滾動
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 0.5; // 調整滾動速度
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // 初始計算 - 延遲執行確保所有卡片都已渲染
    const initTimer = setTimeout(() => {
      calculateOpacities();
    }, 100);
    
    // 使用 requestAnimationFrame 再次確保計算
    requestAnimationFrame(() => {
      calculateOpacities();
    });
    
    // 監聽視窗大小變化
    const handleResize = () => {
      requestAnimationFrame(() => {
        calculateOpacities();
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [entries.length]);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'transparent',
      padding: '0',
      position: 'relative',
      overflow: 'visible'
    }}>
      
      {/* CSS 動畫 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-15px); }
        }
        
        @keyframes floatCloud {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateY(-15px) translateX(10px) scale(1.05); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-10px) translateX(-8px) scale(0.95); 
            opacity: 0.7; 
          }
          75% { 
            transform: translateY(10px) translateX(5px) scale(1.02); 
            opacity: 0.75; 
          }
        }
        
        @keyframes rotateSun {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        /* 隱藏滾動條 */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10, padding: isMobile ? '2rem 1rem 4rem 1rem' : '4rem 2rem 6rem 2rem', overflow: 'visible' }}>
        {/* 標題區域 - 與 PROJECTS 區塊相同樣式 */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '2rem' : '60px',
          zIndex: 11
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            DESIGN DIARY
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8F4FD',
            margin: '0',
            fontWeight: '400',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            letterSpacing: '0.1em'
          }}>
            Stories Behind Every Design
          </p>
        </div>

        {/* 日記列表 - 橫向滾動容器 */}
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: isMobile ? '2rem' : '4rem',
          maxWidth: '100%',
          margin: isMobile ? '0 auto 2rem auto' : '0 auto 4rem auto',
          overflow: 'visible'
        }}>
          {/* 滾動容器 */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'visible',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              gap: '2rem',
              padding: '2rem 2rem 4rem 2rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              marginBottom: '2rem'
            }}
            className="hide-scrollbar"
          >
            {entries.map((entry, index) => {
              const isHovered = hoveredIndex === index;
              // 如果還沒有計算透明度，給一個初始值（所有卡片都顯示）
              // 確保所有卡片至少有一定透明度，讓它們都可見
              const opacity = cardOpacities[index] !== undefined 
                ? cardOpacities[index] 
                : Math.max(0.5 - (index * 0.05), 0.3); // 從0.5遞減，最低0.3
              
              return (
                <div
                  key={entry.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="diary-card"
                  onClick={() => onSelectEntry(entry)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'visible',
                    fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                    scrollSnapAlign: 'start',
                    transform: isHovered ? 'translateY(-6px) scaleY(1.02)' : 'translateY(0) scaleY(1)',
                    width: isHovered ? '140%' : '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: isHovered ? 10 : 5,
                    backgroundColor: 'transparent',
                    opacity: opacity
                  }}
                >
                  {/* CSS 對話窗容器 - 帶陰影和書籤 */}
                    <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: '#FCFBE4',
                    borderRadius: '24px',
                    paddingTop: isMobile ? '1.5rem' : '2rem',
                    paddingLeft: isMobile ? '1.5rem' : '2rem',
                    paddingRight: isMobile ? '1.5rem' : '2rem',
                    paddingBottom: isMobile ? '2rem' : '2.5rem',
                    boxShadow: isHovered 
                      ? '0 8px 20px rgba(0, 0, 0, 0.8)'
                      : '0 2px 12px rgba(0, 0, 0, 0.6)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    overflow: 'visible'
                  }}>
                    {/* 書籤 - 左下角，更自然的形狀 */}
                  <div style={{
                    position: 'absolute',
                      bottom: '-12px',
                      left: '20px',
                      width: '24px',
                      height: '24px',
                    background: '#FCFBE4',
                      transform: 'rotate(45deg)',
                      zIndex: 3,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                      borderRadius: '2px'
                  }} />
                  
                  {/* 內容區域 */}
                  <div style={{ 
                    position: 'relative', 
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      justifyContent: 'flex-start',
                      paddingTop: '1rem'
                    }}>
                      {/* 大標題 - 兩行 */}
                 <h3 style={{
                   fontSize: '1.75rem',
                   fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-handwriting), var(--font-noto-sans-tc), sans-serif',
                   lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                 }}>
                   {entry.title}
                 </h3>

                      {/* 內文 - 顯示3-4行 */}
                <p style={{
                        color: '#000000',
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                        fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                        flex: '1',
                  overflow: 'hidden',
                        textAlign: 'left',
                        fontWeight: '400',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                }}>
                  {entry.content}
                </p>

                      {/* 標籤 - 底部，可換行 */}
                 {entry.tags && entry.tags.length > 0 && (
                   <div style={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     gap: '0.5rem',
                          marginTop: 'auto',
                          paddingTop: '1rem'
                   }}>
                     {entry.tags.map((tag, tagIndex) => (
                       <span
                         key={tagIndex}
                         style={{
                           padding: '0.375rem 0.875rem',
                           background: '#003EC3',
                           color: '#FFFFFF',
                           borderRadius: '20px',
                           fontSize: '0.75rem',
                                fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                           fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                           border: 'none'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.background = '#0052CC';
                           e.currentTarget.style.transform = 'translateY(-1px)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.background = '#003EC3';
                           e.currentTarget.style.transform = 'translateY(0)';
                         }}
                       >
                         {tag}
                       </span>
            ))}
          </div>
                 )}
                 </div>
                  </div>
                </div>
            );
          })}
        </div>
      
          {/* 響應式樣式 */}
          <style>{`
            /* 手機裝置：一次一張 */
            @media (max-width: 768px) {
              .diary-card {
                flex: 0 0 calc(100% - 2rem) !important;
                min-width: calc(100% - 2rem) !important;
                max-width: calc(100% - 2rem) !important;
                width: calc(100% - 2rem) !important;
                height: 350px !important;
                min-height: 350px !important;
                max-height: 350px !important;
              }
            }
            
            /* 平板裝置：固定寬度 */
            @media (min-width: 769px) and (max-width: 1024px) {
              .diary-card {
                flex: 0 0 380px !important;
                min-width: 380px !important;
                max-width: 380px !important;
                width: 380px !important;
                height: 380px !important;
                min-height: 380px !important;
                max-height: 380px !important;
              }
            }
            
            /* 桌面裝置：固定寬度420px，高度380px */
            @media (min-width: 1025px) {
              .diary-card {
                flex: 0 0 420px !important;
                min-width: 420px !important;
                max-width: 420px !important;
                width: 420px !important;
                height: 380px !important;
                min-height: 380px !important;
                max-height: 380px !important;
                transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease !important;
              }
            }
            
            /* 平板裝置：hover 效果 */
            @media (min-width: 769px) and (max-width: 1024px) {
              .diary-card:hover {
                width: 480px !important;
                min-width: 480px !important;
                max-width: 480px !important;
                z-index: 10 !important;
              }
            }
          `}</style>
      </div>
        {/* 詳細視窗 - 溫暖親民風格 */}
        {selectedEntry && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.6)',
              ...(isMobile ? {} : {
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)'
              }),
              zIndex: 999999,
              isolation: 'isolate',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '1.5rem',
              animation: 'fadeIn 0.3s ease',
              overflow: 'auto'
            }}
            onClick={() => onSelectEntry(null)}
          >
            {/* CSS 動畫 */}
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { 
                  opacity: 0;
                  transform: translateY(20px) scale(0.98);
                }
                to { 
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            <div
              style={{
                background: '#FCFBE4',
                border: '2px solid #FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                width: isMobile ? '95vw' : '800px',
                minWidth: isMobile ? '95vw' : '800px',
                maxWidth: isMobile ? '95vw' : '800px',
                height: 'auto',
                maxHeight: isMobile ? '90vh' : '85vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: '3rem',
                paddingLeft: isMobile ? '1.5rem' : '3rem',
                paddingRight: isMobile ? '1.5rem' : '3rem',
                paddingBottom: '2rem',
                position: 'relative',
                fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 999999,
                margin: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 頂部打孔 - 7個圓形孔 */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '0',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                zIndex: 10,
                width: '100%',
                justifyContent: 'space-between',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem'
              }}>
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(0, 0, 0, 0.2)',
                      boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                  />
            ))}
          </div>

              {/* 右上角插畫 - 根據卡片索引輪換 */}
              {(() => {
                const entryIndex = entries.findIndex(e => e.id === selectedEntry?.id);
                const illustrationType = entryIndex >= 0 ? entryIndex % 3 : 0; // 0: 雲朵, 1: 太陽, 2: 星星
                
                let imageUrl = '/cloud-big.png';
                let animation = 'floatCloud 8s ease-in-out infinite';
                
                if (illustrationType === 1) {
                  imageUrl = '/sun-big.png';
                  animation = 'none'; // 太陽不需要浮動動畫
                } else if (illustrationType === 2) {
                  imageUrl = '/star-big.png';
                  animation = 'twinkle 3s ease-in-out infinite'; // 星星閃爍動畫
                }
                
                return (
                  <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '60px' : '80px',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    zIndex: 5,
                    pointerEvents: 'none',
                    opacity: 0.8,
                    animation: animation
                  }}></div>
                );
              })()}

              {/* 關閉按鈕容器 - 粘性定位於彈出視窗右上角上沿，滾動時保持可見 */}
              <div style={{
                position: 'sticky', // 使用 sticky，滾動時保持在頂部可見
                top: isMobile ? '12px' : '20px',
                alignSelf: 'flex-end', // 對齊到右側
                marginLeft: 'auto', // 推到右側
                marginBottom: 'auto', // 推到頂部
                zIndex: 999999, // 確保在最上層
                width: 'fit-content',
                height: 'fit-content'
              }}>
                <button
                  onClick={() => onSelectEntry(null)}
                  style={{
                    position: 'relative',
                    right: isMobile ? '12px' : '20px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: isMobile ? '44px' : '2rem',
                  height: isMobile ? '44px' : '2rem',
                  fontSize: isMobile ? '20px' : '1.25rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold',
                  zIndex: 999999, // 確保在最上層
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>
        </div>
      
              {/* 日記內容 - 簡化版 */}
                <div style={{
                marginTop: '1rem'
              }}>
                {/* 大標題 - 兩行 */}
                      <h2 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                        fontWeight: 'bold',
                  color: '#000000',
                  fontFamily: 'var(--font-handwriting), var(--font-noto-sans-tc), sans-serif',
                  lineHeight: '1.4',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                      }}>
                        {selectedEntry.title}
                      </h2>

                {/* 內文 - 多行 */}
                  <p style={{
                  color: '#000000',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-line',
                    fontSize: isMobile ? '1.2rem' : '1.5rem',
                  fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                  textAlign: 'left',
                    fontWeight: '400'
                  }}>
                    {selectedEntry.content}
                  </p>
      </div>
                        </div>
                      </div>
                    )}
      </div>
    </div>
  );
};

// 3D 輪播組件
const Carousel3D: React.FC<{
  items: ProjectItem[];
  onItemClick: (item: ProjectItem) => void;
  reverse?: boolean; // 是否反向（從右到左）
  startNumber?: number; // 起始編號（默認為0，即從01開始）
}> = ({ items, onItemClick, reverse = false, startNumber = 0 }) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 計算 Z-index - 確保激活的card始終在最上層
  const getZindex = (array: ProjectItem[], activeIndex: number) => 
    array.map((_, i) => {
      if (i === activeIndex) {
        return array.length * 10;
      } else {
        return array.length - Math.abs(i - activeIndex);
      }
    });

  // 計算項目位置
  const displayItems = (item: ProjectItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    let activeValue = (index - activeIndex) / items.length;
    
    // 反向時反轉 activeValue
    if (reverse) {
      activeValue = -activeValue;
    }
    
    const spacing = 'clamp(300px, 45vw, 1144px)';
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(250px, 35vw, 400px)',
      '--height': 'clamp(350px, 50vw, 500px)',
      '--x': `calc(var(--active) * ${spacing})`,
      '--y': `0px`,
      '--rot': reverse 
        ? `calc(var(--active) * -60deg)`
        : `calc(var(--active) * 60deg)`,
      '--opacity': 1,
    } as React.CSSProperties;
  };

  // 檢測螢幕尺寸
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 导航函数
  const goToNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setActive(index);
  };

  // 键盘控制
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (reverse) {
          setActive((prev) => (prev + 1) % items.length);
        } else {
          setActive((prev) => (prev - 1 + items.length) % items.length);
        }
      } else if (e.key === 'ArrowRight') {
        if (reverse) {
          setActive((prev) => (prev - 1 + items.length) % items.length);
        } else {
          setActive((prev) => (prev + 1) % items.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reverse, items.length]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div 
        ref={carouselRef}
        className="relative h-full overflow-hidden font-mono"
        style={{ height: 'calc(100% - 80px)' }}
      >
      {items.map((item, index) => (
        <div
          key={item.id}
          className="absolute top-1/2 left-1/2 overflow-hidden rounded-2xl transition-transform duration-700 ease-out"
          style={{ 
            ...displayItems(item, index, active),
            zIndex: `var(--zIndex)`,
            width: 'var(--width)',
            height: 'var(--height)',
            margin: 'calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5)',
            transformOrigin: '0% 100%',
            transform: 'translate(var(--x), var(--y)) rotate(var(--rot))',
            pointerEvents: 'all',
            boxShadow: isMobile 
              ? '0 8px 25px rgba(0, 0, 0, 0.15)' // 手機版本：較柔和的陰影
              : '0 20px 60px rgba(0, 0, 0, 0.3)' // 桌面版本：保持原有陰影
          }}
          onClick={() => onItemClick(item)}
        >
          <div 
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: 1,
            }}
          >
            {/* 图层顺序（从下到上）：图片 → 黑色渐层 → 标题/内文 → 数字 → 年份 */}
            
            {/* 圖片 - 最底层 (z-1) */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <Image 
                src={item.image || "/illustration_1.png"} 
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* 漸層陰影遮罩 - 第二层，在图片上方 (z-2) */}
            <div 
              className="absolute inset-0"
              style={{
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)',
                pointerEvents: 'none'
              }}
            />
            {/* 底部額外漸層 - 第二层 (z-2) */}
            <div 
              className="absolute bottom-0 left-0 right-0"
              style={{
                zIndex: 2,
                height: '40%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
                pointerEvents: 'none'
              }}
            />
            {/* 頂部漸層 - 第二层 (z-2) */}
            <div 
              className="absolute top-0 left-0 right-0"
              style={{
                zIndex: 2,
                height: '25%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
                pointerEvents: 'none'
              }}
            />
      
            {/* 標題和內文 - 第三层，在渐层上方 (z-3) */}
            <div className="absolute bottom-6 left-6 text-white" style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', zIndex: 3, pointerEvents: 'none' }}>
              <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '400' }}>{item.title}</h3>
              {!isMobile && (
                <p className="text-sm opacity-90" style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '400' }}>{item.description}</p>
              )}
            </div>
            
            {/* 編號 - 第四层 (z-4) */}
            <div className="absolute top-6 left-6 text-white" style={{ zIndex: 4, pointerEvents: 'none' }}>
              <span className="text-6xl font-bold opacity-70" style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '400' }}>
                {String(index + startNumber + 1).padStart(2, '0')}
              </span>
            </div>

            {/* 年份標籤 - 最上层 (z-5) */}
            <div className="absolute top-6 right-6" style={{ zIndex: 5, pointerEvents: 'none' }}>
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: '400',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  color: '#333',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {item.year}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      
      {/* 底部控制条 */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '12px' : '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        padding: isMobile ? '12px 20px' : '16px 24px',
        borderRadius: '50px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        {/* 左箭头 */}
        <button
          onClick={reverse ? goToNext : goToPrev}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: isMobile ? '18px' : '20px',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>

        {/* 点状指示器 */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '6px' : '8px',
          alignItems: 'center'
        }}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: active === index ? (isMobile ? '24px' : '32px') : (isMobile ? '6px' : '8px'),
                height: isMobile ? '6px' : '8px',
                borderRadius: '4px',
                border: 'none',
                background: active === index 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (active !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }
              }}
            />
          ))}
        </div>

        {/* 右箭头 */}
        <button
          onClick={reverse ? goToPrev : goToNext}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: isMobile ? '18px' : '20px',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};
// 夢幻版 Hero 組件
const DreamyHero = ({ scrollY: propScrollY, hideScrollIndicator = false }: { scrollY: number; hideScrollIndicator?: boolean }) => {
  // 使用傳入的 scrollY prop，不需要內部狀態
  const scrollY = propScrollY || 0;
  
  // 檢測是否為手機裝置
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false); // 小手機檢測（iPhone SE 等）
  
  // 動畫狀態控制
  const [glassOpacity, setGlassOpacity] = useState(0); // 毛玻璃區塊透明度
  const [title1Opacity, setTitle1Opacity] = useState(0); // "Own the Day." 透明度
  const [title2Opacity, setTitle2Opacity] = useState(0); // "一起書寫你我的品牌故事" 透明度
  const [ctaOpacity, setCtaOpacity] = useState(0); // CTA 按鈕透明度
  
  // 封面元素淡入動畫狀態（主次層次）
  const [boatFadeOpacity, setBoatFadeOpacity] = useState(0); // 船隻淡入（最重要，最先）
  const [cloudFadeOpacity, setCloudFadeOpacity] = useState(0); // 雲朵淡入（次要）
  const [sunFadeOpacity, setSunFadeOpacity] = useState(0); // 太陽淡入（背景裝飾）
  const [starFadeOpacity, setStarFadeOpacity] = useState(0); // 星星淡入（背景裝飾）
  
  // 動畫時序控制
  useEffect(() => {
    // 封面元素淡入順序（主次層次）
    // 1. 船隻淡入 (0-300ms) - 最重要，最先出現
    const boatTimer = setTimeout(() => {
      setBoatFadeOpacity(1);
    }, 0);
    
    // 2. 雲朵淡入 (300-600ms) - 次要元素
    const cloudTimer = setTimeout(() => {
      setCloudFadeOpacity(1);
    }, 300);
    
    // 3. 太陽和星星淡入 (600-900ms) - 背景裝飾，最後出現
    const sunTimer = setTimeout(() => {
      setSunFadeOpacity(1);
    }, 600);
    
    const starTimer = setTimeout(() => {
      setStarFadeOpacity(1);
    }, 700);
    
    // 文字內容淡入（在封面元素之後）
    // 4. 毛玻璃區塊淡入 (900-1400ms)
    const timer1 = setTimeout(() => {
      setGlassOpacity(1);
    }, 900);
    
    // 5. "Own the Day." 淡入 (1400-1900ms)
    const timer2 = setTimeout(() => {
      setTitle1Opacity(1);
    }, 1400);
    
    // 6. "一起書寫你我的品牌故事" 淡入 (1900-2400ms)
    const timer3 = setTimeout(() => {
      setTitle2Opacity(1);
    }, 1900);
    
    // 7. CTA 按鈕淡入 (2400-2900ms)
    const timer4 = setTimeout(() => {
      setCtaOpacity(1);
    }, 2400);
    
    return () => {
      clearTimeout(boatTimer);
      clearTimeout(cloudTimer);
      clearTimeout(sunTimer);
      clearTimeout(starTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      // 小手機檢測：寬度 < 375px 或高度 < 667px（iPhone SE 等）
      setIsSmallMobile(width < 375 || height < 667);
      // iPad 檢測：寬度在 768-1400px 之間，且高度在 1000-1400px 之間
      setIsTablet(width >= 768 && width <= 1400 && height >= 1000 && height <= 1400);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);


  // 計算視差效果
  const boatY = typeof window !== 'undefined' ? scrollY * 0.5 : 0; // 船隻移動較慢
  const waveY = typeof window !== 'undefined' ? scrollY * 0.8 : 0; // 波浪移動較快
  const starY = typeof window !== 'undefined' ? scrollY * 0.3 : 0; // 星星移動最慢
  
  // 計算船隻縮放效果
  const boatScale = typeof window !== 'undefined' ? Math.max(0.5, 1.0 - scrollY * 0.0005) : 1.0; // 從1.0縮小到0.5
  
  // 計算船隻透明度效果 - 滾動5px就完全消失
  const boatOpacity = typeof window !== 'undefined' ? (scrollY > 5 ? 0 : 1) : 1; // 滾動超過5px就完全消失
  
  // 計算星星透明度效果 - 與船隻同步消失
  const starOpacity = typeof window !== 'undefined' ? (scrollY > 5 ? 0 : 1) : 1; // 星星也同步完全消失
  
  // 計算藍色色塊覆蓋效果 - 從底部往上覆蓋
  const coverHeight = typeof window !== 'undefined' 
    ? Math.min(scrollY * 0.8, window.innerHeight)
    : 0; // 藍色色塊高度

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)' // 漸層背景：上層 #f7ebc3，中間 #fffff3，下層 #fffff3
    }}>
      {/* 藍色覆蓋層 - 從底部往上覆蓋 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${coverHeight}px`,
        background: '#003EC3',
        zIndex: 1,
        transition: 'height 0.1s ease-out'
      }}></div>

      {/* 右上角導覽列 */}
      <div className="nav-responsive" style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '15px'
      }}>
        {/* 導覽連結 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px',
          color: '#333',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          {/* 選單項目已移除 */}
        </div>
      </div>

      {/* 中間下方 Scroll 指示器 - 彈出視窗打開時隱藏 */}
      <div className="scroll-responsive" style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px', // 放大 150%: 10px * 1.5 = 15px
        color: '#666',
        fontSize: '18px', // 放大 150%: 12px * 1.5 = 18px
        fontFamily: 'var(--font-zpix), monospace',
        letterSpacing: '3px', // 放大 150%: 2px * 1.5 = 3px
        opacity: hideScrollIndicator ? 0 : 1, // 彈出視窗打開時隱藏
        pointerEvents: hideScrollIndicator ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}>
        <div>SCROLL</div>
        <div style={{
          width: '3px', // 放大 150%: 2px * 1.5 = 3px
          height: '45px', // 放大 150%: 30px * 1.5 = 45px
          background: '#666',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '12px', // 放大 150%: 8px * 1.5 = 12px
            background: '#4A90E2',
            animation: 'scrollIndicator 2s infinite'
          }}></div>
        </div>
      </div>

      {/* 中央區域 - Flex 容器：畫面左右上下置中，包含船隻+海浪和標題 */}
      {/* 🔴 紅線：最外層 Flex 容器 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${boatY}px)`, // 合併兩個 transform，確保置中
        width: '100%',
        maxWidth: isSmallMobile ? '95vw' : isMobile ? '90vw' : isTablet ? '85vw' : '80vw', // 響應式最大寬度
        zIndex: 100, // 大幅提高 z-index，確保在所有背景裝飾元素（z-index: 1）之上
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0', // 移除間距，讓綠線區和藍線區緊緊連在一起
        opacity: boatOpacity * boatFadeOpacity, // 結合滾動透明度和淡入動畫
        transition: 'opacity 0.5s ease-in, transform 0.1s ease-out',
        boxSizing: 'border-box',
        minHeight: '200px', // 確保容器有足夠高度可見
        // 確保建立新的堆疊上下文
        isolation: 'isolate' // 建立新的堆疊上下文，確保 z-index 生效
      }}>
        {/* 太陽裝飾 - 位於紅線容器左上緣 */}
        <div style={{
          position: 'absolute',
          top: '0', // 貼齊容器頂部
          left: '0', // 貼齊容器左側
          width: isMobile ? 'clamp(100px, 20vw, 150px)' : '180px',
          height: isMobile ? 'clamp(100px, 20vw, 150px)' : '180px',
          backgroundImage: 'url(/sun-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: starOpacity * sunFadeOpacity, // 結合滾動透明度和淡入動畫
          zIndex: 1, // 在容器內，但低於文字
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease-in, transform 0.1s ease-out',
          transform: 'translate(-30%, -30%)' // 稍微往外偏移，讓太陽一部分在容器外，形成貼齊左上緣的效果
        }}></div>

        {/* 1. 標題區域 - 響應式大小，現在在上方 */}
        {/* 🟢 綠線：標題容器 */}
        <div style={{
          display: 'flex',
          flexDirection: (isMobile || isSmallMobile) ? 'column' : 'row', // 桌面版橫向，手機版縱向
          alignItems: 'center',
          justifyContent: 'center', // 垂直置中
          width: 'fit-content', // 改為 fit-content，取消左右空白
          minHeight: isSmallMobile ? 'clamp(100px, 15vh, 150px)' : isMobile ? 'clamp(120px, 18vh, 180px)' : isTablet ? 'clamp(110px, 16vh, 170px)' : 'clamp(120px, 18vh, 180px)', // 響應式最小高度，確保有足夠空間上下置中
          paddingTop: isSmallMobile ? 'clamp(30px, 4vh, 40px)' : isMobile ? 'clamp(40px, 5vh, 50px)' : isTablet ? 'clamp(35px, 4.5vh, 40px)' : 'clamp(40px, 5vh, 50px)', // 響應式 paddingTop，確保文字不被海浪遮住
          paddingBottom: isSmallMobile ? 'clamp(30px, 4vh, 40px)' : isMobile ? 'clamp(40px, 5vh, 50px)' : isTablet ? 'clamp(35px, 4.5vh, 40px)' : 'clamp(40px, 5vh, 50px)', // 響應式 paddingBottom，確保上下對稱
          gap: (isMobile || isSmallMobile) ? (isSmallMobile ? 'clamp(6px, 1.5vh, 12px)' : 'clamp(8px, 2vh, 16px)') : '32px', // 桌面版左右間距，手機版上下間距
          pointerEvents: 'none',
          flexShrink: 0,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 200
        }}>
          {/* 毛玻璃背景層 - 緊貼文字區域 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            padding: isSmallMobile ? 'clamp(4px, 0.6vh, 6px) clamp(40px, 6vw, 50px)' : isMobile ? 'clamp(5px, 0.8vh, 8px) clamp(50px, 8vw, 60px)' : isTablet ? 'clamp(6px, 1vh, 10px) clamp(60px, 10vw, 70px)' : 'clamp(6px, 1.2vh, 11px) clamp(70px, 12vw, 80px)', // 上下 padding 減少 60%，左右 padding 保持不變
            background: 'rgba(255, 255, 243, 0.4)', // 降低透明度：從 0.7 改為 0.4
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '24px',
            zIndex: -1,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            opacity: glassOpacity, // 毛玻璃區塊淡入動畫
            transition: 'opacity 0.5s ease-in'
          }}></div>
          
          {/* 左側文字區域 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: (isMobile || isSmallMobile) ? 'center' : 'flex-start', // 手機版置中，桌面版靠左
            gap: isSmallMobile ? 'clamp(6px, 1.5vh, 12px)' : isMobile ? 'clamp(8px, 2vh, 16px)' : isTablet ? 'clamp(10px, 2.2vh, 18px)' : 'clamp(12px, 2.5vh, 20px)',
            position: 'relative',
            zIndex: 200
        }}>
            {/* 主標題 - 響應式字體大小（等比例放大 1.2 倍） */}
          <h1 style={{
              fontSize: isSmallMobile ? 'clamp(1.44rem, 4.8vw, 2.16rem)' : isMobile ? 'clamp(1.68rem, 5.4vw, 2.64rem)' : isTablet ? 'clamp(1.8rem, 3.6vh, 2.64rem)' : 'clamp(2.16rem, 4.8vh, 3.36rem)',
            fontWeight: '900',
              color: '#353535',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              textAlign: (isMobile || isSmallMobile) ? 'center' : 'left', // 手機版置中，桌面版靠左
            margin: 0,
            letterSpacing: '0.1em',
              lineHeight: '1.2',
              width: 'fit-content',
              position: 'relative',
              zIndex: 200,
              padding: isSmallMobile ? '4px 24px' : isMobile ? '5px 32px' : isTablet ? '6px 40px' : '8px 48px',
              opacity: title1Opacity,
              transition: 'opacity 0.5s ease-in'
          }}>
              Own the Day.
          </h1>
          
            {/* 副標題 - 響應式字體大小（等比例放大 1.2 倍） */}
            <h2 style={{
              fontSize: isSmallMobile ? 'clamp(0.9rem, 3vw, 1.2rem)' : isMobile ? 'clamp(1.02rem, 3.6vw, 1.44rem)' : isTablet ? 'clamp(1.08rem, 2.4vh, 1.56rem)' : 'clamp(1.2rem, 3vh, 1.8rem)',
              fontWeight: '400',
              color: '#353535',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              textAlign: (isMobile || isSmallMobile) ? 'center' : 'left', // 手機版置中，桌面版靠左
              margin: 0,
              letterSpacing: '0.03em',
              lineHeight: '1.4',
              width: 'fit-content',
              position: 'relative',
              zIndex: 200,
              padding: isSmallMobile ? '4px 24px' : isMobile ? '5px 32px' : isTablet ? '6px 40px' : '8px 48px',
              opacity: title2Opacity,
              transition: 'opacity 0.5s ease-in'
            }}>
              一起書寫你我的品牌故事
            </h2>
        </div>

          {/* 分隔線（僅桌面版顯示） */}
          {!(isMobile || isSmallMobile) && (
            <div style={{
              width: '1px',
              height: '100%',
              background: 'rgba(53, 53, 53, 0.2)',
              position: 'relative',
              zIndex: 200,
              alignSelf: 'stretch' // 使分隔線延伸到容器的全高
            }}></div>
          )}

          {/* 右側 CTA 按鈕組（桌面版）/ 下方按鈕組（手機版） */}
          <div style={{
            display: 'flex',
            flexDirection: 'column', // 按鈕始終縱向排列
            gap: '12px',
            marginTop: (isMobile || isSmallMobile) ? (isSmallMobile ? '16px' : '20px') : '0', // 手機版有上邊距，桌面版無
            paddingRight: (isMobile || isSmallMobile) ? '0' : '24px', // 桌面版右側增加 padding
            opacity: ctaOpacity,
            transition: 'opacity 0.5s ease-in',
            position: 'relative',
            zIndex: 200,
            pointerEvents: 'auto' // 確保按鈕可點擊
          }}>
            {/* 按鈕 1: Explore Portfolio */}
            <button
              onClick={() => {
                const projectSection = document.getElementById('projects-section');
                if (projectSection) {
                  projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                padding: isSmallMobile ? '10px 20px' : isMobile ? '12px 24px' : '14px 28px',
                fontSize: isSmallMobile ? 'clamp(0.85rem, 2.5vw, 1rem)' : isMobile ? 'clamp(0.9rem, 2.8vw, 1.05rem)' : 'clamp(1rem, 2vw, 1.1rem)',
                color: '#353535',
                background: 'transparent',
                border: '2px solid #353535',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                width: isMobile || isSmallMobile ? '100%' : 'auto',
                minWidth: isMobile || isSmallMobile ? 'auto' : '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#353535';
                e.currentTarget.style.color = '#FFFFF3';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(53, 53, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#353535';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '500' }}>Explore Portfolio</span>
              <span style={{ fontFamily: 'var(--font-noto-sans-tc), sans-serif', fontWeight: '500' }}>｜看作品</span>
            </button>

            {/* 按鈕 2: Our Services */}
            <button
              onClick={() => {
                const servicesSection = document.getElementById('services-section');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                padding: isSmallMobile ? '10px 20px' : isMobile ? '12px 24px' : '14px 28px',
                fontSize: isSmallMobile ? 'clamp(0.85rem, 2.5vw, 1rem)' : isMobile ? 'clamp(0.9rem, 2.8vw, 1.05rem)' : 'clamp(1rem, 2vw, 1.1rem)',
                color: '#353535',
                background: 'transparent',
                border: '2px solid #353535',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                width: isMobile || isSmallMobile ? '100%' : 'auto',
                minWidth: isMobile || isSmallMobile ? 'auto' : '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#353535';
                e.currentTarget.style.color = '#FFFFF3';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(53, 53, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#353535';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '500' }}>Our Services</span>
              <span style={{ fontFamily: 'var(--font-noto-sans-tc), sans-serif', fontWeight: '500' }}>｜了解服務流程</span>
            </button>

            {/* 按鈕 3: BRAND QUIZ */}
            <button
              onClick={() => {
                const brandQuizSection = document.getElementById('brand-quiz-section');
                if (brandQuizSection) {
                  brandQuizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                padding: isSmallMobile ? '10px 20px' : isMobile ? '12px 24px' : '14px 28px',
                fontSize: isSmallMobile ? 'clamp(0.85rem, 2.5vw, 1rem)' : isMobile ? 'clamp(0.9rem, 2.8vw, 1.05rem)' : 'clamp(1rem, 2vw, 1.1rem)',
                color: '#353535',
                background: 'transparent',
                border: '2px solid #353535',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                width: isMobile || isSmallMobile ? '100%' : 'auto',
                minWidth: isMobile || isSmallMobile ? 'auto' : '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#353535';
                e.currentTarget.style.color = '#FFFFF3';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(53, 53, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#353535';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontFamily: 'var(--font-google-sans-flex), sans-serif', fontWeight: '500' }}>BRAND QUIZ</span>
              <span style={{ fontFamily: 'var(--font-noto-sans-tc), sans-serif', fontWeight: '500' }}> ｜品牌測驗</span>
            </button>
          </div>
          </div>

        {/* 2. 船隻圖片 + 海浪 - 響應式大小，等比例縮放，現在在下方 */}
        {/* 🔵 藍線：船隻容器 */}
        <div className="boat-container" style={{
          position: 'relative',
          display: 'flex',
          alignItems: (isMobile || isSmallMobile) ? 'flex-start' : 'center', // 手機版本置頂，桌面版本置中
          justifyContent: 'center', // 水平置中
          width: isSmallMobile ? 'min(102vw, 456px)' : isMobile ? 'min(108vw, 540px)' : isTablet ? 'min(48vw, 600px)' : 'min(46.8vw, 624px)', // 響應式寬度，放大120%（85vw*1.2=102vw, 380px*1.2=456px 等）
          // 使用固定高度，確保 flex 置中正確計算
          height: isSmallMobile ? 'min(60vh, 360px)' : isMobile ? 'min(66vh, 420px)' : isTablet ? 'min(60vh, 480px)' : 'min(66vh, 528px)', // 響應式高度，放大120%（50vh*1.2=60vh, 300px*1.2=360px 等）
          // 不設置 paddingTop，讓 flex 置中正常工作
          paddingTop: 0,
          paddingBottom: isSmallMobile ? 'clamp(80px, 10vh, 100px)' : isMobile ? 'clamp(90px, 11vh, 110px)' : isTablet ? 'clamp(85px, 10vh, 100px)' : 'clamp(90px, 11vh, 110px)', // 響應式為海浪留出空間
          flexShrink: 0,
          // 移除 transform，因為已經在最外層容器處理了
          pointerEvents: 'auto',
          overflow: 'visible', // 允許海浪顯示，但船隻本身要在容器內
          boxSizing: 'border-box',
          // 確保內容在容器內
          maxWidth: '100%'
        }}>
          <div 
            className="boat-with-waves"
            style={{
              '--wave-y': `${waveY}px`,
                '--wave-opacity': boatOpacity, // 波浪透明度與船隻同步
                width: '100%',
                maxWidth: '100%', // 確保不超出藍線容器
                aspectRatio: '3541 / 2203', // 原始比例，確保等比例縮放
                height: 'auto',
                maxHeight: '100%', // 確保不超出容器高度
                position: 'relative', // 強制使用 relative，確保在藍線框內
                top: 'auto', // 確保不在左上角
                left: 'auto', // 確保不在左上角
                right: 'auto',
                bottom: 'auto',
                transform: `scale(${boatScale})`,
                transformOrigin: 'center center',
                marginLeft: 'auto',
                marginRight: 'auto',
                // 手機版本：置頂，移除 marginTop 和負 marginBottom
                marginTop: (isMobile || isSmallMobile) ? 0 : 'auto',
                marginBottom: (isMobile || isSmallMobile) ? 0 : (isTablet ? 'clamp(-42px, -5.2vh, -52px)' : 'clamp(-45px, -5.5vh, -55px)'),
                boxSizing: 'border-box'
            } as React.CSSProperties}
          >
            <Image 
              src="/boat1031.png" 
              alt="Dreamy Boat" 
              width={3541} 
              height={2203} 
              className="boat-img"
              priority
              style={{
                width: '100%',
                height: '100%', // 填滿父容器
                objectFit: 'contain', // 保持比例，完整顯示在容器內
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>


          {/* 星球裝飾 - Hero區域2顆 */}
        <div 
          className="star-parallax"
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
              width: '16px',
              height: '16px',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            animation: 'twinkle 2s infinite',
            opacity: starOpacity * starFadeOpacity, // 結合滾動透明度和淡入動畫
            '--star-y': `${starY}px`,
              zIndex: 1, // 降低 z-index，確保在船隻和文字（z-index: 20）下方
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          } as React.CSSProperties}
        ></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
            width: '16px',
            height: '16px',
            backgroundImage: 'url(/star-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          animation: 'twinkle 2.5s infinite',
          opacity: starOpacity * starFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: 1, // 降低 z-index，確保在船隻和文字（z-index: 20）下方
          transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
        }}></div>


        {/* 雲朵裝飾 - Hero區域（重新分配尺寸：320% 2朵，200% 3朵，100% 4朵，50% 6朵） */}
          {/* 320% 尺寸雲朵 - 2朵（cloud-1 放在下方，cloud-2 和 cloud-3 放在上方） */}
          {/* 雲朵 1 - 320% - 左上（更靠近中心） */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: isMobile ? '112px' : '192px', // 60px * 3.2 = 192px
            height: isMobile ? '112px' : '192px',
            backgroundImage: 'url(/cloud-2.png)', // 上方使用 cloud-2
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 10s ease-in-out 1s infinite',
            opacity: starOpacity * 0.9 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 2 - 320% - 右下（更靠近中心） */}
          <div style={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: isMobile ? '112px' : '192px',
            height: isMobile ? '112px' : '192px',
            backgroundImage: 'url(/cloud-1.png)', // 下方使用 cloud-1
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 12s ease-in-out 4s infinite',
            opacity: starOpacity * 0.85 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>

          {/* 200% 尺寸雲朵 - 3朵（cloud-1 放在下方，cloud-2 和 cloud-3 放在上方） */}
          {/* 雲朵 3 - 200% - 右上（更靠近中心） */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '30%',
            width: isMobile ? '70px' : '120px', // 60px * 2 = 120px
            height: isMobile ? '70px' : '120px',
            backgroundImage: 'url(/cloud-3.png)', // 上方使用 cloud-3
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 9s ease-in-out 2s infinite',
            opacity: starOpacity * 0.8 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 4 - 200% - 中上（更靠近中心，添加镜像） */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '70px' : '120px',
            height: isMobile ? '70px' : '120px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-2.png)', // 上方使用 cloud-2
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 11s ease-in-out 3s infinite',
              opacity: starOpacity * 0.75 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
              transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
            }}></div>
          </div>
          {/* 雲朵 5 - 200% - 左下（更靠近中心，添加镜像） */}
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '30%',
            width: isMobile ? '70px' : '120px',
            height: isMobile ? '70px' : '120px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-1.png)', // 下方使用 cloud-1
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 13s ease-in-out 5s infinite',
              opacity: starOpacity * 0.7 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
          transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
        }}></div>
          </div>

          {/* 100% 尺寸雲朵 - 4朵 */}
          {/* 雲朵 6 - 100% - 左上角（更靠近中心） */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: isMobile ? '35px' : '60px', // 60px * 1 = 60px
            height: isMobile ? '35px' : '60px',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 8s ease-in-out 0.5s infinite',
            opacity: starOpacity * 0.7 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 7 - 100% - 右上角（更靠近中心，添加镜像） */}
          <div style={{
            position: 'absolute',
            top: '35%',
            right: '30%',
            width: isMobile ? '35px' : '60px',
            height: isMobile ? '35px' : '60px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 9.5s ease-in-out 2.5s infinite',
              opacity: starOpacity * 0.65 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
              transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
            }}></div>
          </div>
          {/* 雲朵 8 - 100% - 中下偏左（更靠近中心） */}
          <div style={{
            position: 'absolute',
            bottom: '35%',
            left: '35%',
            width: isMobile ? '35px' : '60px',
            height: isMobile ? '35px' : '60px',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 10.5s ease-in-out 4.5s infinite',
            opacity: starOpacity * 0.6 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 9 - 100% - 中下偏右（更靠近中心，添加镜像） */}
        <div style={{
          position: 'absolute',
          bottom: '40%',
            right: '35%',
            width: isMobile ? '35px' : '60px',
            height: isMobile ? '35px' : '60px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'scaleX(-1)', // 添加镜像效果
            animation: 'floatCloud 11.5s ease-in-out 6s infinite',
            opacity: starOpacity * 0.65,
          transition: 'opacity 0.1s ease-out'
        }}></div>
        </div>

          {/* 50% 尺寸雲朵 - 6朵 */}
          {/* 雲朵 10 - 50% - 左上小（更靠近中心） */}
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '35%',
            width: isMobile ? '18px' : '30px', // 60px * 0.5 = 30px
            height: isMobile ? '18px' : '30px',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 7s ease-in-out 1.5s infinite',
            opacity: starOpacity * 0.6 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 11 - 50% - 右上小（更靠近中心，添加镜像） */}
          <div style={{
            position: 'absolute',
            top: '40%',
            right: '35%',
            width: isMobile ? '18px' : '30px',
            height: isMobile ? '18px' : '30px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 8.5s ease-in-out 3.5s infinite',
              opacity: starOpacity * 0.55 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
              transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
            }}></div>
          </div>
          {/* 雲朵 12 - 50% - 中上偏左（更靠近中心） */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '40%',
            width: isMobile ? '18px' : '30px',
            height: isMobile ? '18px' : '30px',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 9s ease-in-out 5.5s infinite',
            opacity: starOpacity * 0.5 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 13 - 50% - 中上偏右（更靠近中心，添加镜像） */}
          <div style={{
            position: 'absolute',
            top: '28%',
            right: '40%',
            width: isMobile ? '18px' : '30px',
            height: isMobile ? '18px' : '30px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 10s ease-in-out 7s infinite',
              opacity: starOpacity * 0.55 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
              transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
            }}></div>
          </div>
          {/* 雲朵 14 - 50% - 左下小（更靠近中心） */}
          <div style={{
            position: 'absolute',
            bottom: '40%',
            left: '40%',
            width: isMobile ? '18px' : '30px',
            height: isMobile ? '18px' : '30px',
            backgroundImage: 'url(/cloud-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'floatCloud 11s ease-in-out 2s infinite',
            opacity: starOpacity * 0.5 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
            zIndex: (isMobile || isSmallMobile) ? 10 : 1, // 手機版本：雲朵在船和波浪之上
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
          }}></div>
          {/* 雲朵 15 - 50% - 右下小（更靠近中心，添加镜像） */}
          <div style={{
            position: 'absolute',
            bottom: '45%',
            right: '40%',
            width: isMobile ? '18px' : '30px',
            height: isMobile ? '18px' : '30px',
            zIndex: (isMobile || isSmallMobile) ? 10 : 1,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)', // 添加镜像效果
              animation: 'floatCloud 12s ease-in-out 6.5s infinite',
              opacity: starOpacity * 0.55 * cloudFadeOpacity, // 結合滾動透明度和淡入動畫
              transition: 'opacity 0.5s ease-in, transform 0.1s ease-out'
            }}></div>
          </div>

        {[...Array(3)].map((_, i) => {
          // 使用固定的動畫參數避免 SSR 水合錯誤
          const animationDurations = [4.2, 3.8, 4.5];
          const animationDelays = [0.5, 2.1, 3.7];
          const arcAnimations = ['meteorInnerArc', 'meteorMiddleArc', 'meteorOuterArc'];
          
          return (
            <div
              key={`meteor-${i}`}
              className="absolute z-50"
              style={{
                left: '50%',
                top: '50%',
                width: '20px',
                height: '20px',
                color: '#003EC3',
                fontSize: '20px',
                animation: `${arcAnimations[i]} ${animationDurations[i]}s linear infinite`,
                animationDelay: `${animationDelays[i]}s`,
                opacity: starOpacity,
                transition: 'opacity 0.1s ease-out',
                transform: 'translate(-50%, -50%)'
              }}
            >
              ✦
            </div>
          );
        })}

        {/* 新增9顆星星 */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '10px',
          height: '10px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.2s infinite',
          opacity: starOpacity,
          transition: 'opacity 0.1s ease-out'
        }}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '14px',
          height: '14px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.5s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '40%',
          left: '15%',
          width: '8px',
          height: '8px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 3s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '35%',
          right: '10%',
          width: '12px',
          height: '12px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.8s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          bottom: '40%',
          right: '20%',
          width: '16px',
          height: '16px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.2s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '11px',
          height: '11px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.3s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '45%',
          left: '5%',
          width: '9px',
          height: '9px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.7s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          bottom: '45%',
          left: '25%',
          width: '13px',
          height: '13px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.6s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: '7px',
          height: '7px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.9s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>

        {/* 新增10顆星星 */}
        <div className="star-fade" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '6px',
          height: '6px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.1s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '18%',
          right: '8%',
          width: '9px',
          height: '9px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.6s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '55%',
          left: '8%',
          width: '11px',
          height: '11px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.4s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '65%',
          right: '12%',
          width: '8px',
          height: '8px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.4s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div className="star-fade" style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          width: '13px',
          height: '13px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.7s infinite',
          '--star-opacity': starOpacity
        } as React.CSSProperties}></div>
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '35%',
          width: '7px',
          height: '7px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.8s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '38%',
          right: '35%',
          width: '10px',
          height: '10px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.0s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '58%',
          left: '65%',
          width: '5px',
          height: '5px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.3s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '68%',
          right: '65%',
          width: '12px',
          height: '12px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.5s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '75%',
          left: '45%',
          width: '9px',
          height: '9px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.7s infinite'
        }}></div>

        {/* 動態標語文字 - 根據滾動位置切換 */}
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          color: 'white',
          fontSize: '16px',
          fontFamily: 'var(--font-zpix), monospace',
          lineHeight: '1.4',
          textAlign: 'left',
          zIndex: 20
        }}>
          {(() => {
            // 根據滾動位置決定顯示哪段標語
            let currentSlogan = 0;
            if (typeof window !== 'undefined') {
              // 所有區塊都使用同一個標語
              currentSlogan = 0;
            }

            const slogans: Array<{jp: string; en: string; cn: string}> = [];

            // 如果沒有標語，不顯示任何內容
            if (slogans.length === 0) {
              return null;
            }

            const current = slogans[currentSlogan];
            
            return (
              <>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                  {current.jp}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '3px' }}>
                  {current.en}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {current.cn}
                </div>
              </>
            );
          })()}
        </div>
      </div>
      {/* CSS 動畫樣式 */}
      <style jsx>{`
        /* 入口頁的船隻和波浪效果 */
        .boat-container {
          position: relative;
        }
        
        .boat-with-waves {
          /* 使用 relative 以配合 flex 布局，寬度由父容器和 inline style 控制 */
          position: relative !important; /* 強制使用 relative，覆蓋任何絕對定位 */
          z-index: 2;
          animation: bob 2.6s ease-in-out infinite;
          transform-origin: center center;
          /* 確保不在左上角 */
          top: auto !important;
          left: auto !important;
          right: auto !important;
          bottom: auto !important;
        }
        
        .boat-with-waves::after {
          content: '';
          position: absolute;
          bottom: -15px; /* 波浪往下擴展，覆蓋船隻下緣 */
          left: -60%;
          width: 220%;
          height: 60px; /* 恢復原始高度 */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q50,25 100,40 Q150,55 200,40 Q250,25 300,40 Q350,55 400,40 Q450,25 500,40 Q550,55 600,40 Q650,25 700,40 Q750,55 800,40 Q850,25 900,40 Q950,55 1000,40 Q1050,25 1100,40 Q1150,55 1200,40 L1200,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          animation: wave-move 8s linear infinite;
          z-index: 3;
          transform: translateY(var(--wave-y, 0px));
          transition: transform 0.1s ease-out, opacity 0.1s ease-out;
          opacity: var(--wave-opacity, 1); /* 與船隻透明度同步，滾動時消失 */
        }

        .boat-img { 
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 2;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }
        
        @keyframes bob { 
          0%, 100% { transform: scale(1.32) translateY(0) rotate(0.5deg); } 
          50% { transform: scale(1.32) translateY(-3px) rotate(-0.5deg); } 
        }
        @keyframes wave-move {
          0% { background-position-x: 0; }
          100% { background-position-x: 150px; }
        }
        
        @keyframes wave-move-mobile {
          0% { background-position-x: 0; }
          100% { background-position-x: 50px; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
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
        
        /* 弧形流星動畫 - 多層軌道系統 */
        @keyframes meteorInnerArc {
          0% { 
            opacity: 0; 
            transform: translateX(-120px) translateY(80px) rotate(0deg);
            filter: blur(3px);
          }
          20% { 
            opacity: 0.4; 
            transform: translateX(-60px) translateY(40px) rotate(36deg);
            filter: blur(2px);
          }
          50% { 
            opacity: 1; 
            transform: translateX(0px) translateY(0px) rotate(90deg);
            filter: blur(0px);
          }
          80% { 
            opacity: 0.4; 
            transform: translateX(60px) translateY(-40px) rotate(144deg);
            filter: blur(2px);
          }
          100% { 
            opacity: 0; 
            transform: translateX(120px) translateY(-80px) rotate(180deg);
            filter: blur(3px);
          }
        }
        
        @keyframes meteorMiddleArc {
          0% { 
            opacity: 0; 
            transform: translateX(-180px) translateY(120px) rotate(0deg);
            filter: blur(3px);
          }
          20% { 
            opacity: 0.3; 
            transform: translateX(-90px) translateY(60px) rotate(36deg);
            filter: blur(2px);
          }
          50% { 
            opacity: 1; 
            transform: translateX(0px) translateY(0px) rotate(90deg);
            filter: blur(0px);
          }
          80% { 
            opacity: 0.3; 
            transform: translateX(90px) translateY(-60px) rotate(144deg);
            filter: blur(2px);
          }
          100% { 
            opacity: 0; 
            transform: translateX(180px) translateY(-120px) rotate(180deg);
            filter: blur(3px);
          }
        }
        
        @keyframes meteorOuterArc {
          0% { 
            opacity: 0; 
            transform: translateX(-250px) translateY(160px) rotate(0deg);
            filter: blur(3px);
          }
          20% { 
            opacity: 0.2; 
            transform: translateX(-125px) translateY(80px) rotate(36deg);
            filter: blur(2px);
          }
          50% { 
            opacity: 1; 
            transform: translateX(0px) translateY(0px) rotate(90deg);
            filter: blur(0px);
          }
          80% { 
            opacity: 0.2; 
            transform: translateX(125px) translateY(-80px) rotate(144deg);
            filter: blur(2px);
          }
          100% { 
            opacity: 0; 
            transform: translateX(250px) translateY(-160px) rotate(180deg);
            filter: blur(3px);
          }
        }
        
        .star-parallax {
          transform: translateY(var(--star-y, 0px));
          transition: transform 0.1s ease-out;
        }
        
        /* 所有星星的透明度效果 */
        .star-fade {
          opacity: var(--star-opacity, 1);
          transition: opacity 0.1s ease-out;
        }
        
        @keyframes scrollIndicator {
          0% { transform: translateY(-45px); } // 放大 150%: -30px * 1.5 = -45px
          100% { transform: translateY(45px); } // 放大 150%: 30px * 1.5 = 45px
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        /* 老虎機響應式寬度控制 */
        .slot-machine-container {
          width: 80vw !important; // 紅線框佔螢幕80%寬度
          max-width: 80vw !important;
          margin: 0 auto !important;
        }
        
        /* 手機裝置：紅線框佔90%寬度 */
        @media (max-width: 767px) {
          .slot-machine-container {
            width: 90vw !important;
            max-width: 90vw !important;
          }
        }
        
        /* 老虎機在紅線框內佔100%寬度 */
        .slot-machine-container > * {
          width: 100% !important;
          max-width: 100% !important;
        }
        
        /* RWD 響應式設計 */
        
        /* Logo 響應式 */
        .logo-responsive {
          transition: all 0.3s ease;
        }
        
        /* 導覽列響應式 */
        .nav-responsive {
          transition: all 0.3s ease;
        }
        
        /* Scroll指示器響應式 */
        .scroll-responsive {
          transition: all 0.3s ease;
        }
        
        /* 平板尺寸 (1200px以下) */
        @media (max-width: 1200px) {
          .logo-responsive {
            width: 140px !important;
            height: 140px !important;
          }
          
          .nav-responsive {
            top: 20px;
            right: 20px;
            gap: 12px;
          }
          
          .scroll-responsive {
            bottom: 40px;
            font-size: 16.5px; // 放大 150%: 11px * 1.5 = 16.5px
          }
          
          .boat-with-waves { 
            width: 100%; // 由父容器控制寬度
            transform: scale(1.1) !important; // 只保留 scale，移除 translate
          }
          .boat-with-waves::after {
            height: 50px; /* 恢復原始高度 */
            bottom: -12px; /* 波浪往下擴展，覆蓋船隻下緣 */
            left: -65%;
            width: 230%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q50,25 100,40 Q150,55 200,40 Q250,25 300,40 Q350,55 400,40 Q450,25 500,40 Q550,55 600,40 Q650,25 700,40 Q750,55 800,40 Q850,25 900,40 Q950,55 1000,40 Q1050,25 1100,40 Q1150,55 1200,40 L1200,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        
        /* 手機橫向 (768px以下) */
        @media (max-width: 768px) {
          .logo-responsive {
            width: 120px !important;
            height: 120px !important;
          }
          
          .nav-responsive {
            top: 15px;
            right: 15px;
            gap: 10px;
          }
          
          .nav-responsive a {
            font-size: 12px;
          }
          
          .scroll-responsive {
            bottom: 30px;
            font-size: 15px; // 放大 150%: 10px * 1.5 = 15px
          }
          
          .boat-with-waves { 
            width: 100%; // 由父容器控制寬度
            transform: scale(1.188) !important; // 只保留 scale，移除 translate
          }
          .boat-with-waves::after {
            height: 40px; /* 恢復原始高度 */
            bottom: -10px; /* 波浪往下擴展，覆蓋船隻下緣 */
            left: -90%; /* 再增加20%寬度 (從-80%調整) */
            width: 280%; /* 再增加20%寬度 (從260%調整) */
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q50,25 100,40 Q150,55 200,40 Q250,25 300,40 Q350,55 400,40 Q450,25 500,40 Q550,55 600,40 Q650,25 700,40 Q750,55 800,40 Q850,25 900,40 Q950,55 1000,40 Q1050,25 1100,40 Q1150,55 1200,40 L1200,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            animation: wave-move-mobile 8s linear infinite; /* 手機裝置使用50px移動距離 */
          }
        }
        
        /* 手機直向 (480px以下) */
        @media (max-width: 480px) {
          .logo-responsive {
            width: 100px !important;
            height: 100px !important;
          }
          
          .nav-responsive {
            top: 10px;
            right: 10px;
            gap: 8px;
          }
          
          .nav-responsive a {
            font-size: 11px;
          }
          
          .scroll-responsive {
            bottom: 20px;
            font-size: 13.5px; // 放大 150%: 9px * 1.5 = 13.5px
          }
          
          .boat-with-waves { 
            width: 100%; // 由父容器控制寬度
            transform: scale(0.924) !important; // 只保留 scale，移除 translate
          }
          .boat-with-waves::after {
            height: 35px; /* 恢復原始高度 */
            bottom: -8px; /* 波浪往下擴展，覆蓋船隻下緣 */
            left: -95%; /* 再增加20%寬度 (從-85%調整) */
            width: 290%; /* 再增加20%寬度 (從270%調整) */
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q50,25 100,40 Q150,55 200,40 Q250,25 300,40 Q350,55 400,40 Q450,25 500,40 Q550,55 600,40 Q650,25 700,40 Q750,55 800,40 Q850,25 900,40 Q950,55 1000,40 Q1050,25 1100,40 Q1150,55 1200,40 L1200,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            animation: wave-move-mobile 8s linear infinite; /* 手機裝置使用50px移動距離 */
          }
        }
        
        /* 超小螢幕 (360px以下) */
        @media (max-width: 360px) {
          .logo-responsive {
            width: 80px !important;
            height: 80px !important;
          }
          
          .nav-responsive {
            top: 8px;
            right: 8px;
            gap: 6px;
          }
          
          .nav-responsive a {
            font-size: 10px;
          }
          
          .scroll-responsive {
            bottom: 15px;
            font-size: 12px; // 放大 150%: 8px * 1.5 = 12px
          }
          
          .boat-with-waves { 
            width: 100%; // 由父容器控制寬度
            transform: scale(0.792) !important; // 只保留 scale，移除 translate
          }
          .boat-with-waves::after {
            height: 30px; /* 恢復原始高度 */
            bottom: -6px; /* 波浪往下擴展，覆蓋船隻下緣 */
            left: -100%; /* 再增加20%寬度 (從-90%調整) */
            width: 300%; /* 再增加20%寬度 (從280%調整) */
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q50,25 100,40 Q150,55 200,40 Q250,25 300,40 Q350,55 400,40 Q450,25 500,40 Q550,55 600,40 Q650,25 700,40 Q750,55 800,40 Q850,25 900,40 Q950,55 1000,40 Q1050,25 1100,40 Q1150,55 1200,40 L1200,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            animation: wave-move-mobile 8s linear infinite; /* 手機裝置使用50px移動距離 */
          }
        }

        /* 星星閃爍動畫 */
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes floatCloud {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateY(-15px) translateX(10px) scale(1.05); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-10px) translateX(-8px) scale(0.95); 
            opacity: 0.7; 
          }
          75% { 
            transform: translateY(10px) translateX(5px) scale(1.02); 
            opacity: 0.75; 
          }
        }
        
        @keyframes rotateSun {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
      `}</style>
    </div>
  );
};

export default function HeroSimpleTest() {
  const [scrollY, setScrollY] = useState(0);
  const [blueSectionHeight, setBlueSectionHeight] = useState(1200); // 預設高度
  const [darkSectionHeight, setDarkSectionHeight] = useState(1000); // 深色區塊高度
  const [supportSectionHeight, setSupportSectionHeight] = useState(1000); // 支持我們區塊高度
  const [diarySectionHeight, setDiarySectionHeight] = useState(1000); // 設計日記區塊高度
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(1);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // 載入狀態管理
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'ready' | 'main'>('loading');
  const [countdown, setCountdown] = useState<number | null>(3);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // 購物清單狀態管理
  const [cartItems, setCartItems] = useState<ProductItem[]>([]);
  
  // FAQ 展開狀態管理
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  // 自我介紹狀態管理
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  
  // 設計日記狀態管理
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);
  
  // 滾動狀態管理（手機版按鈕隱藏/顯示）
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const blueSectionRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const diarySectionRef = useRef<HTMLDivElement>(null);
  const firstCarouselRef = useRef<HTMLDivElement>(null);
  const secondCarouselRef = useRef<HTMLDivElement>(null);

  // 鎖定背景滾動（當彈出視窗打開時）
  useEffect(() => {
    if (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactModalOpen, isModalOpen, isPriceModalOpen, isProductModalOpen, isCartSidebarOpen, selectedDiaryEntry]);

  // 輪播組件數據
  const allCarouselItems: ProjectItem[] = [
    {
      id: 1,
      title: "車衣設計",
      description: "熱情、團結，騎車的樂趣集結於一身，帶給車友一致的視覺成為車隊的耀眼新星",
      image: "/project-cover-01.jpg",
      tags: ["品牌設計", "Logo設計", "視覺識別"],
       galleryImages: [
         "/project-01-01.jpg",
         "/project-01-02.png"
       ],
      detailedDescription: "這次的車衣設計，希望把「騎車的爽感」整理成一套能被穿上的語言。色彩的跳動、線條的速度感、圖形的排列，就像把路線的節奏收進衣服裡。整體視覺強調熱情與團結——不只是亮眼，而是讓車隊走在一起時能自然形成一股氣勢。在齊聚的瞬間，大家會因為一套一致的視覺而更靠近，成為真正意義上的「同隊」。",
      year: 2024
    },
    {
      id: 2,
      title: "台式牛排的新味覺菜單",
      description: "把記憶裡的味道重新說一遍，台式牛排的魅力一直都很直接：鐵板、香氣、吱吱作響的醬汁。",
      image: "/project-cover-02.jpg",
      tags: ["網頁設計", "響應式設計", "UI/UX"],
       galleryImages: [
        "/project-02-01.png",
        "/project-02-02.jpg",
        "/project-02-03.jpg"
       ],
      detailedDescription: "我們希望讓客人看到的不只是品項，而是一種熟悉的場景——蒸氣、香味、份量、日常。加入更多具體又誘人的品項，也強調肉質、風味、搭配的組合，讓菜單本身就像一個「先吃一口的前奏」。整份視覺在保留傳統台味的前提下，也讓細節更俐落、更當代：讓老店的靈魂留著，但呈現方式更能說服現代的視覺習慣。",
      year: 2025
    },
    {
      id: 3,
      title: "地方創生Ft.三星鄉公所",
      description: "讓人感受到土地的，是那種輕輕的、自然的在地感——像空氣裡會飄的味道，不用強調，但你感覺得到。",
      image: "/project-cover-03.jpg",
      tags: ["Logo Design", "Branding", "Identity"],
      galleryImages: [
        "/project-03-01.jpg",
        "/project-03-02.jpg",
        "/project-03-03.jpg",
        "/project-03-04.jpg"
      ],
      detailedDescription: "三星的步調、米香、生活方式，都帶著一種不急不徐的氣味。所以整體的設計不是要做得很喧嘩，也不是要直接把地標貼滿。而是透過色調、留白、符號的抽象化，讓視覺長得像三星——輕、在地、有生活味。地方創生的魅力就在這裡：不是將鄉土風情標籤化，而是讓它在畫面裡自然流動，像是原本就存在於這裡，而不是被刻意放上去。",
      year: 2025
    },
    {
      id: 4,
      title: "國家人權博物館提案",
      description: "不義遺址的存在本身，就是一個提醒。不是要喚起恐懼，而是提供一個更清楚的入口——讓人理解曾經發生過什麼，為什麼值得記住。",
      image: "/project-cover-04.jpg",
      tags: ["不義遺址", "歷史場館", "文化導覽", "摺頁設計", "博物館視覺"],
      galleryImages: [
        "/project-04-01.png"
      ],
      detailedDescription: "內文這次的提案以一份摺頁 DM 為核心，以最小篇幅整理出遺址的脈絡、位置與可被閱讀的線索。視覺語調刻意保持節制：安靜、沉穩、沒有過度情緒化的裝飾，讓重點留給歷史本身的重量。設計的功能不是放大悲劇，而是讓人願意踏進場域、慢慢理解故事、並透過更清楚的資訊，建立對這段歷史的連結。",
      year: 2025
    },
    {
      id: 5,
      title: "日日用心｜ 品牌logo設計",
      description: "晨恩企業的品牌更新，希望呈現的不是複雜的形象，而是「 日日用心請您放心 」的可靠感。所以在 logo 的調性上，選擇回到最基本的穩定與清晰。",
      image: "/project-cover-05.jpg",
      tags: ["品牌識別", "Logo設計", "企業形象", "穩定信任感", "視覺設計"],
      galleryImages: [
        "/project-05-02.jpg",
        "/project-05-01.jpg"
      ],
      detailedDescription: "設計的方向以「日常可信賴」為核心，從字型、比例到線條強度，都做得更一致、更耐看。\n\n沒有多餘的複雜元素，也沒有搶戲的符號，目的是讓品牌在第一眼就能傳遞出踏實、整潔、能放心依靠的印象。\n\n日日用心的精神不在於華麗的視覺，而是在每次被看見時，都能給人同一種安定感。",
      year: 2025
    },
    {
      id: 6,
      title: "用插畫捕捉世界盃的節奏",
      description: "2022 世足的插畫創作，希望把比賽裡那些「太快來不及記住」的瞬間，以畫面的方式留下。",
      image: "/project-cover-06.png",
      tags: ["插畫設計", "世足2022", "體育視覺", "動態插畫", "比賽瞬間"],
      galleryImages: [
        "/project-06-01.png",
        "/project-06-02.png",
        "/project-06-03.png",
        "/project-06-04.png"
      ],
      detailedDescription: "這次的視覺核心是「動作的爆炸點」。\n\n球員的身體線條、衝刺的方向、球鞋與草皮的摩擦感，都用誇張、略帶漫畫式的筆觸強化張力。\n\n色調以高飽和度呈現比賽的熱度，\n\n中央的金盃則成為所有視線的匯聚點，象徵世界盃的共同目標。\n\n整體插畫並不追求精準寫實，\n\n而是想讓觀者感受足球那種「快到不太能思考，只能跟著熱血」的節奏。",
      year: 2022
    },
    {
      id: 7,
      title: "生醫技術手冊",
      description: "「將複雜的醫療資訊，理成好懂的樣子」",
      image: "/project-covor-07.png",
      tags: ["生醫手冊", "資訊設計", "流程導覽", "醫療溝通", "專業視覺"],
      galleryImages: [
        "/project-07-01.jpg"
      ],
      detailedDescription: "細胞移植相關資訊通常既龐大又專業。\n\n這本手冊的任務不是替醫師講課，而是把資訊整理得更清楚，\n\n讓需要了解流程的人，能安心地一步一步讀下去。\n\n整份手冊的設計重點在「專業感與易讀性」。\n\n從版面、配色到資訊分層，都以醫療領域的穩定與信賴為主軸。\n\n沒有過度繁複的圖像，也沒有讓人負擔的專業術語堆積——\n\n目的是讓使用者能快速掌握：\n\n流程怎麼走、服務包含什麼、每一步的意義是什麼。\n\n我們透過乾淨的文字架構、圖示與強調色，\n\n讓複雜的醫療技術，變成一份「可以慢慢讀，也能快速找到答案」的理解工具。\n\n這本手冊不是醫療書籍，\n\n而是一份「在重要決定之前，能讓人覺得安心」的資訊陪伴。",
      year: 2024
    },
    {
      id: 8,
      title: "餐廳限定活動文宣",
      description: "整個文宣的視覺語氣以「溫暖、飽滿、節慶感」呈現",
      image: "/project-covor-08.png",
      tags: ["期間限定", "餐廳文宣", "台灣豬", "品牌插畫", "菜單設計"],
      galleryImages: [
        "/project-08-01.png"
      ],
      detailedDescription: "在地食材 × 誠實風味\n\n整個文宣的視覺語氣以「溫暖、飽滿、節慶感」呈現，\n\n呼應限定檔期帶來的少量珍貴與搶眼亮點。\n\n插畫角色也延續品牌語氣，讓內容更親近、看起來更「好吃」。",
      year: 2025
    },
    {
      id: 9,
      title: "毛起來嘉年華 Ft.竹北寵物節提案",
      description: "竹北動物日的主視覺，希望讓活動一眼就能感受到：這是一場為毛孩量身打造的慶典。沒有比賽壓力、沒有複雜的規則，只有音樂、野餐、互動與歡笑，一個真正屬於寵物的城市派對。",
      image: "/project-covor-09.png",
      tags: ["寵物活動", "主視覺設計", "插畫活動海報", "城市節慶", "竹北動物日"],
      galleryImages: [
        "/project-09-01.png"
      ],
      detailedDescription: "視覺以溫暖的手繪筆觸呈現城市中的小慶典：\n\n狗狗和貓咪一起演奏、野餐桌上的蛋糕、樹蔭下的旗幟與陽光，\n\n每個角色都像是在活動前偷偷練習，準備迎接城市裡最熱鬧的一天。\n\n整體風格以「友善、溫柔、可參與」為主，\n\n讓活動看起來不只是公部門宣傳，\n\n而是居民與毛孩都能真的融入其中的節日。\n\n主視覺想傳達的很簡單——\n\n有毛孩的地方，就有快樂聚集的理由。",
      year: 2025
    }
  ];

  // 第一組輪播（id 1-9）
  const firstCarouselItems = allCarouselItems.filter(item => item.id >= 1 && item.id <= 9);
  
  // 第二組輪播（id 8-10）
  const secondCarouselItems = allCarouselItems.filter(item => item.id >= 8 && item.id <= 10);

  // 商品數據
  const productItems: ProductItem[] = [
    {
      id: 1,
      name: "設計靈感筆記本",
      price: "NT$ 380",
      image: "/illustration_1.png",
      tag: "#支持小設計"
    },
    {
      id: 2,
      name: "創意貼紙包",
      price: "NT$ 150",
      image: "/illustration_2.png",
      tag: "#KeepGoing"
    },
    {
      id: 3,
      name: "設計師馬克杯",
      price: "NT$ 450",
      image: "/illustration_3.png",
      tag: "#LocalCreativity"
    },
    {
      id: 4,
      name: "靈感明信片組",
      price: "NT$ 200",
      image: "/illustration_4.png",
      tag: "#不大但用心"
    },
    {
      id: 5,
      name: "設計師帆布袋",
      price: "NT$ 320",
      image: "/illustration_5.png",
      tag: "#DesignWithWarmth"
    },
    {
      id: 6,
      name: "創意書籤組",
      price: "NT$ 180",
      image: "/illustration_6.png",
      tag: "#小小設計部"
    }
  ];

  // 設計日記數據
  const diaryEntries: DiaryEntry[] = [
    {
      id: 1,
      date: '2024.01.15',
      title: '好看可以學，有趣比較難',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-01.jpg',
      content: `好看的設計，往往不是靠把東西塞滿或技巧堆高。比較像是一種默契：比例、顏色和品牌自然地走在一起，像爵士裡剛剛好的節奏——你感覺得出來，它們本來就該待在同一個畫面裡。

真正迷人的作品，也不是盯著看會發現「這裡多一個東西」的那種細節，而是連那些不起眼的角落，都被一起思考在整體脈絡裡。完整感不是靠加法，而是靠所有元素都在該在的位置，彼此呼應。

而在所有設計的特質裡，「有趣」也許是最難捕捉的。

好看讓人接受，有趣讓人留下。

當整體的重心被放對了，態度就會自然浮出來，畫面也才真正站得住。

讓人記得的設計，大多都有這種難以量化的有趣。`,
      tags: ['靈感', '色彩', '設計過程'],
      part1: '與客戶初次會議，了解品牌核心價值與目標受眾。發現客戶希望傳達「溫馨但不失專業」的品牌形象。',
      part2: '開始收集競品分析，觀察市場上類似品牌的視覺呈現方式。注意到大多數品牌都偏向極簡或過於複雜的設計。',
      part3: '第一次靈感迸發：在咖啡廳看到招牌時，突然想到「溫馨但專業」的視覺方向。開始構思色彩系統和設計語言。'
    },
    {
      id: 2,
      date: '2024.01.22',
      title: '在地感的流動｜三星鄉公所案隨筆',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-03.jpg',
      content: `做三星鄉公所的案子時，最明顯的感受是：這個地方有自己的節奏、自己的米香、自己的生活步調。那種在地的氛圍不是大聲的，而是輕輕的、自然的，不會矯揉造作。

地方創生相關的設計，不是把「地方元素」貼一貼，也不是把代表性圖騰塞滿畫面。比較像是讓在地感自然流進視覺裡——讓色調、空氣感、留白的方式，都能跟日常相處得來。

在做這個案子的過程裡，最常出現的問題是：「這樣呈現，是否真的長得像這個地方？」如果答案是肯定的，那視覺就會開始貼近土地本身，而不是貼近潮流。`,
      tags: ['設計過程', '靈感激盪']
    },
    {
      id: 3,
      date: '2024.01.18',
      title: '日更',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-02.jpg',
      content: `... ...`,
      tags: ['逛展', '隨筆']
    },
    {
      id: 4,
      date: '2024.01.25',
      title: '日更',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-04.jpg',
      content: `... ...`,
      tags: ['字體', '品牌識別']
    },
    {
      id: 5,
      date: '2024.02.01',
      title: '日更',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-05.jpg',
      content: `... ...`,
      tags: ['提案', '反思']
    },
    {
      id: 6,
      date: '2024.02.05',
      title: '日更',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/illustration_1.png',
      content: `... ...`,
      tags: ['細節', '質感', '設計哲學']
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 手機版：檢測滾動狀態
      if (window.innerWidth < 768) {
        setIsScrolling(true);
        
        // 清除之前的 timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // 設置新的 timeout：滾動停止後 500ms 才認為停止
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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

  // 購物清單 localStorage 功能
  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  // 檢測桌面/移動設備
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 倒計時動畫
  useEffect(() => {
    if (loadingPhase === 'loading' && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else if (countdown === 1) {
          // 直接進入 ready 狀態並清除倒計時
          setCountdown(null);
          setLoadingPhase('ready');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadingPhase, countdown]);

  // 進入主內容
  const handleEnterMainContent = () => {
    setLoadingPhase('main');
    setTimeout(() => {
      setShowMainContent(true);
    }, 500); // 給過渡動畫時間
  };

  // 購物清單處理函數
  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleProductClick = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = () => {
    // 跳轉到 Google Form 或 Typeform
    const formUrl = 'https://forms.gle/your-form-id'; // 替換為實際表單 URL
    window.open(formUrl, '_blank');
  };

  // 區塊數據
  const sections = [
    { id: 'hero', name: 'Hero', nameZh: '首頁' },
    { id: 'portfolio', name: 'Portfolio', nameZh: '作品' },
    { id: 'diary', name: 'Diary', nameZh: '日記' },
    { id: 'services', name: 'Services', nameZh: '服務' },
    { id: 'contact', name: 'Contact', nameZh: '聯繫' }
  ];

  // 滾動偵測 - 判斷當前區塊（使用實際元素位置）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateCurrentSection = () => {
    const windowHeight = window.innerHeight;
      
      // 使用 getBoundingClientRect 獲取每個區塊相對於視窗的位置
      const sections = [
        { ref: null, top: 0 }, // Hero
        { ref: blueSectionRef, top: 0 },
        { ref: diarySectionRef, top: 0 },
        { ref: darkSectionRef, top: 0 },
        { ref: contactSectionRef, top: 0 }
      ];
      
      // 獲取每個區塊的實際位置（相對於視窗頂部）
      const sectionPositions = sections.map((section, index) => {
        if (index === 0) return 0; // Hero 在頂部
        if (section.ref?.current) {
          const rect = section.ref.current.getBoundingClientRect();
          return rect.top + window.scrollY;
        }
        return Infinity; // 如果元素不存在，設為 Infinity
      });
      
      // 當前滾動位置
      const scrollPosition = window.scrollY;
      const viewportCenter = scrollPosition + windowHeight / 2;
    
    let newSection = 0;
      
      // 從後往前判斷，找到第一個視窗中心超過的區塊
      for (let i = sectionPositions.length - 1; i >= 0; i--) {
        if (viewportCenter >= sectionPositions[i] - windowHeight * 0.2) {
          newSection = i;
          break;
        }
    }
    
    setCurrentSection(newSection);
    };
    
    // 初始更新
    updateCurrentSection();
    
    // 使用 requestAnimationFrame 優化滾動偵測
    let rafId: number | null = null;
    const handleScroll = () => {
      // 手機版：檢測滾動狀態
      if (window.innerWidth < 768) {
        setIsScrolling(true);
        
        // 清除之前的 timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // 設置新的 timeout：滾動停止後 500ms 才認為停止
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
      
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateCurrentSection();
          rafId = null;
        });
      }
    };
    
    // 監聽滾動事件
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCurrentSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCurrentSection);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [blueSectionHeight, darkSectionHeight, diarySectionHeight]);

  // 彈出視窗處理函數
  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // 測量藍色區域內容高度
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const measureHeight = () => {
      if (blueSectionRef.current) {
        const height = blueSectionRef.current.scrollHeight;
        setBlueSectionHeight(prevHeight => {
          // 只有當高度真正改變時才更新
          if (Math.abs(prevHeight - height) > 10) {
            return height;
          }
          return prevHeight;
        });
      }
    };

    // 初始測量
    measureHeight();

    // 監聽視窗大小變化
    window.addEventListener('resize', measureHeight);

    // 使用 ResizeObserver 監聽內容變化
    let resizeObserver: ResizeObserver | null = null;
    if (blueSectionRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureHeight);
      resizeObserver.observe(blueSectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // 測量深色區域內容高度
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const measureDarkHeight = () => {
      if (darkSectionRef.current) {
        const height = darkSectionRef.current.scrollHeight;
        setDarkSectionHeight(prevHeight => {
          // 只有當高度真正改變時才更新
          if (Math.abs(prevHeight - height) > 10) {
            return height;
          }
          return prevHeight;
        });
      }
    };

    // 初始測量
    measureDarkHeight();

    // 監聽視窗大小變化
    window.addEventListener('resize', measureDarkHeight);

    // 使用 ResizeObserver 監聽內容變化
    let resizeObserver: ResizeObserver | null = null;
    if (darkSectionRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureDarkHeight);
      resizeObserver.observe(darkSectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureDarkHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // 測量設計日記區域內容高度
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const measureDiaryHeight = () => {
      if (diarySectionRef.current) {
        const height = diarySectionRef.current.scrollHeight;
        setDiarySectionHeight(prevHeight => {
          // 只有當高度真正改變時才更新
          if (Math.abs(prevHeight - height) > 10) {
            return height;
          }
          return prevHeight;
        });
      }
    };

    // 初始測量
    measureDiaryHeight();

    // 監聽視窗大小變化
    window.addEventListener('resize', measureDiaryHeight);

    // 使用 ResizeObserver 監聽內容變化
    let resizeObserver: ResizeObserver | null = null;
    if (diarySectionRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureDiaryHeight);
      resizeObserver.observe(diarySectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureDiaryHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // 測量支持我們區域內容高度
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const measureSupportHeight = () => {
      if (supportSectionRef.current) {
        const height = supportSectionRef.current.scrollHeight;
        setSupportSectionHeight(prevHeight => {
          // 只有當高度真正改變時才更新
          if (Math.abs(prevHeight - height) > 10) {
            return height;
          }
          return prevHeight;
        });
      }
    };

    // 初始測量
    measureSupportHeight();

    // 監聽視窗大小變化
    window.addEventListener('resize', measureSupportHeight);

    // 使用 ResizeObserver 監聽內容變化
    let resizeObserver: ResizeObserver | null = null;
    if (supportSectionRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureSupportHeight);
      resizeObserver.observe(supportSectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureSupportHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // 計算導覽元素淡入效果 - 進入 project 區塊後淡入
  const navOpacity = typeof window !== 'undefined' 
    ? Math.min(1, Math.max(0, (scrollY - window.innerHeight + 200) / 300)) // 進入 project 區塊後 200px 開始淡入，300px 完成
    : 0;

  // 計算設計日記深色色塊覆蓋效果 - 從藍色區域底部開始向上覆蓋（已取消覆蓋）
  // const diaryCoverHeight = typeof window !== 'undefined' 
  //   ? Math.max(0, Math.min(
  //       (scrollY - (window.innerHeight + blueSectionHeight)) * 1.2, 
  //       window.innerHeight
  //     ))
  //   : 0; // 設計日記深色色塊高度

  // 計算 #353535 色塊覆蓋效果 - 基於藍色區域底部觸發
  const darkCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - blueSectionHeight) * 1.2, 
        window.innerHeight
      ))
    : 0; // 深色色塊高度

  // 計算設計日記到 OUR SERVICES 的深色覆蓋效果 - 從 OUR SERVICES 底部向上覆蓋設計日記
  // 觸發點：當滾動超過設計日記區域時開始覆蓋
  const diaryToServicesCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - (window.innerHeight + blueSectionHeight)) * 1.2, 
        window.innerHeight
      ))
    : 0; // 設計日記到 OUR SERVICES 的深色覆蓋高度

  // 計算專案服務區塊底部的品牌藍色覆蓋效果 - 在 OUR SERVICES 區塊內部從底部向上覆蓋
  const serviceBlueCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - (window.innerHeight + blueSectionHeight + darkSectionHeight * 0.7)) * 1.2, 
        window.innerHeight * 0.5
      ))
    : 0; // 專案服務區塊底部的品牌藍色覆蓋高度

  // 計算 OUR SERVICES -> CONTACT 白色覆蓋高度
  // 以 CONTACT 區塊進入視窗為觸發：當 CONTACT top 低於視窗底部時開始往上覆蓋
  const servicesToContactCoverHeight = typeof window !== 'undefined' && contactSectionRef.current
    ? Math.max(0, Math.min(window.innerHeight - contactSectionRef.current.getBoundingClientRect().top, window.innerHeight))
    : 0;

  // 計算支持我們區塊底部的深灰色覆蓋效果（已隱藏，保留以備將來使用）
  const supportToContactCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - (blueSectionHeight + darkSectionHeight + supportSectionHeight)) * 1.2, 
        window.innerHeight
      ))
    : 0; // 支持我們區塊底部的深灰色覆蓋高度

  // 調試信息（開發時使用）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🔵 第一個藍色區域高度:', blueSectionHeight, 'px');
      console.log('🌑 深色區域高度:', darkSectionHeight, 'px');
      console.log('💙 支持我們區域高度:', supportSectionHeight, 'px');
      console.log('📱 螢幕高度:', window.innerHeight, 'px');
      console.log('🎯 深色覆蓋觸發點:', blueSectionHeight, 'px');
      console.log('🎯 專案服務藍色覆蓋觸發點:', blueSectionHeight + darkSectionHeight, 'px');
      console.log('🎯 支持我們到聯繫我們覆蓋觸發點:', blueSectionHeight + darkSectionHeight + supportSectionHeight, 'px');
      console.log('📊 當前滾動位置:', scrollY, 'px');
      console.log('🌑 深色覆蓋高度:', darkCoverHeight, 'px');
      console.log('🔵 專案服務藍色覆蓋高度:', serviceBlueCoverHeight, 'px');
      console.log('🌑 支持我們到聯繫我們覆蓋高度:', supportToContactCoverHeight, 'px');
    }
  }, [blueSectionHeight, darkSectionHeight, supportSectionHeight, scrollY, darkCoverHeight, serviceBlueCoverHeight, supportToContactCoverHeight]);

  // 直接渲染夢幻版Hero，移除所有測試相關功能
  const renderHeroComponent = () => {
    const props = {
      backgroundImage: backgroundImages[0].url, // 使用第一個背景圖片
      title: "Liam Design",
      subtitle: "Design that listens.\nDesign that grows",
      backgroundColor: "#13496b",
      scrollY: scrollY,
      blueSectionHeight: blueSectionHeight,
      darkSectionHeight: darkSectionHeight,
      hideScrollIndicator: isModalOpen || !!selectedDiaryEntry // 彈出視窗打開時隱藏 scroll 指示器
    };

    return <DreamyHero {...props} />;
  };
  return (
    <>
      {/* 載入頁面 */}
      {!showMainContent && (
        <LoadingPage 
          loadingPhase={loadingPhase}
          countdown={countdown}
          onEnterMainContent={handleEnterMainContent}
          isDesktop={isDesktop}
        />
      )}

      {/* 主內容 */}
      {showMainContent && (
        <>
          <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'var(--font-zpix)', monospace;
          background-color: #353535; /* 與 footer 背景色一致，隱藏白底 */
        }
        
        html {
          background-color: #353535; /* 確保 html 也是深色背景 */
        }
        
        .hero-test-container {
          min-height: 100vh;
          position: relative;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: 60%;
          }
        }
        
        .progress-fill {
          animation: progressFill 2s ease-in-out;
        }

        /* 充電式進度動畫 */
        @keyframes charging {
          0% { 
            background: linear-gradient(90deg, #003EC3 0%, #003EC3 0%, transparent 0%);
          }
          100% { 
            background: linear-gradient(90deg, #003EC3 0%, #003EC3 100%, transparent 100%);
          }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        /* 服務進度條內容區塊特效動畫 */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(5deg) translateY(50px);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(5deg) translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(74, 144, 226, 0.2);
          }
          50% {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(74, 144, 226, 0.4);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(74, 144, 226, 0.3);
          }
          50% {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(74, 144, 226, 0.6);
          }
        }

        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .stepper-item {
          transition: all 0.3s ease;
        }

        .stepper-item.active {
          animation: pulse 2s infinite;
        }

        /* Logo 跑馬燈動畫 */
        @keyframes logoMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-marquee {
          will-change: transform;
        }

        .logo-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 手機版漢堡選單 */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
          opacity: isScrolling ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: isScrolling ? 'none' : 'auto'
        }}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px'
            }}
          >
            <div style={{
              width: '20px',
              height: '2px',
              background: 'white',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></div>
            <div style={{
              width: '20px',
              height: '2px',
              background: 'white',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1
            }}></div>
            <div style={{
              width: '20px',
              height: '2px',
              background: 'white',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></div>
          </button>
          
          {/* 漢堡選單內容 */}
          {isMobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '0',
              background: 'rgba(0, 0, 0, 0.9)',
              borderRadius: '12px',
              padding: '20px',
              minWidth: '200px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const windowHeight = window.innerHeight;
                    let targetScroll = 0;
                    
                    switch (index) {
                      case 0: targetScroll = 0; break;
                      case 1: targetScroll = windowHeight; break;
                      case 2: targetScroll = windowHeight + blueSectionHeight; break;
                      case 3: targetScroll = windowHeight + blueSectionHeight + darkSectionHeight; break;
                    }
                    
                    window.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth'
                    });
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontFamily: 'var(--font-noto-sans-tc), sans-serif',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    backgroundColor: index === currentSection ? 'rgba(0, 62, 195, 0.3)' : 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {section.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stepper 導覽組件 - 只在桌面版顯示，Project 區塊後淡入 */}
      {!isMobile && (
      <div style={{
        position: 'fixed',
        right: isMobile ? '15px' : '30px',
        top: isMobile ? '50%' : '50%',
        transform: isMobile ? 'translateY(-50%)' : 'translateY(-50%)',
        zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '8px' : '15px',
        background: isMobile ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
        padding: isMobile ? '10px 8px' : '20px 15px',
        borderRadius: isMobile ? '15px' : '25px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        border: isMobile ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,62,195,0.2)',
        opacity: navOpacity,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: navOpacity > 0 ? 'auto' : 'none'
      }}>
        {sections.map((section, index) => {
          const isActive = index === currentSection;
          const isCompleted = index < currentSection;
          
          return (
            <div
              key={section.id}
              className={`stepper-item ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: isMobile ? '8px' : '12px',
                borderRadius: '50%',
                background: isActive 
                  ? '#003EC3' 
                  : isCompleted 
                    ? '#3AAF3A' 
                    : isMobile 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'rgba(0,62,195,0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                minWidth: isMobile ? '40px' : '50px',
                minHeight: isMobile ? '40px' : '50px',
                justifyContent: 'center'
              }}
              onClick={() => {
                setHoveredNavIndex(null);
                // 平滑滾動到對應區塊
                const windowHeight = window.innerHeight;
                let targetScroll = 0;
                
                switch (index) {
                  case 0: // Hero
                    targetScroll = 0;
                    break;
                  case 1: // Portfolio (第一個作品 - 第一組輪播元件)
                    if (firstCarouselRef.current) {
                      firstCarouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      return;
                    } else if (blueSectionRef.current) {
                      targetScroll = blueSectionRef.current.offsetTop;
                    } else {
                    targetScroll = windowHeight;
                    }
                    break;
                  case 2: // Diary (日記)
                    if (diarySectionRef.current) {
                      diarySectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      return;
                    } else {
                    targetScroll = windowHeight + blueSectionHeight;
                    }
                    break;
                  case 3: // Services (服務)
                    if (darkSectionRef.current) {
                      // 使用 scrollIntoView 確保正確滾動到服務區塊
                      darkSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      return; // 直接返回，不需要後續的 window.scrollTo
                    } else {
                      targetScroll = windowHeight + blueSectionHeight + diarySectionHeight;
                    }
                    break;
                  case 4: // Contact
                    if (contactSectionRef.current) {
                      targetScroll = contactSectionRef.current.offsetTop;
                    } else {
                      targetScroll = windowHeight + blueSectionHeight + diarySectionHeight + darkSectionHeight;
                    }
                    break;
                }
                
                window.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth'
                });
              }}
              onMouseEnter={(e) => {
                setHoveredNavIndex(index);
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = isActive ? '#003EC3' : '#FF8603';
                }
              }}
              onMouseLeave={(e) => {
                setHoveredNavIndex(null);
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = isActive 
                    ? '#003EC3' 
                    : isCompleted 
                      ? '#3AAF3A' 
                      : 'rgba(0,62,195,0.1)';
                }
              }}
            >
              {/* 充電式進度條 */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  borderRadius: '50%',
                  background: 'linear-gradient(90deg, #003EC3 0%, #003EC3 0%, transparent 0%)',
                  animation: 'charging 3s ease-in-out infinite',
                  zIndex: -1
                }} />
              )}
              
              {/* 圓點指示器 */}
              <div style={{
                width: isMobile ? '8px' : '12px',
                height: isMobile ? '8px' : '12px',
                borderRadius: '50%',
                background: isActive 
                  ? '#FFFFFF' 
                  : isCompleted 
                    ? '#FFFFFF' 
                    : isMobile 
                      ? '#FFFFFF' 
                      : '#003EC3',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
              }} />
              
              {/* 文字標籤 */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  right: '60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: isActive ? '#003EC3' : 'rgba(0,0,0,0.8)',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-zpix), monospace',
                  whiteSpace: 'nowrap',
                  opacity: (isActive || hoveredNavIndex === index) ? 1 : 0,
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none'
                }}>
                  {section.nameZh}
                </div>
              )}
            </div>
          );
        })}
        
        {/* 連接線 */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '48px' : '65px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: isMobile ? 'calc(100% - 96px)' : 'calc(100% - 130px)',
          background: 'linear-gradient(to bottom, #003EC3, #3AAF3A, #FF8603, #003EC3)',
          borderRadius: '1px',
          zIndex: -1,
          opacity: 0.6
        }} />
      </div>
      )}

      {/* 左上角自我介紹按鈕 - Project 區塊後淡入 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease, opacity 0.5s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        opacity: isMobile && isScrolling ? 0 : navOpacity,
        pointerEvents: (isMobile && isScrolling) || navOpacity === 0 ? 'none' : 'auto'
      }}
      onClick={() => setIsIntroModalOpen(true)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.2)';
        e.currentTarget.style.transform = 'scale(1.05)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '0';
      }}
      >
        <Image
          src="/designer.png"
          alt="自我介紹"
          width={40}
          height={40}
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
        
        {/* 懸停標籤 */}
        <div style={{
          position: 'absolute',
          bottom: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: '500',
          fontFamily: 'var(--font-zpix), monospace',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1001
        }}
        className="tooltip"
        >
          Liam pretty good
        </div>
      </div>

      {/* 左下角經緯度與時間顯示 - 桌面版顯示，Project 區塊後淡入 */}
      <div style={{
        position: 'fixed',
        top: isMobile ? 'auto' : 'auto',
        bottom: isMobile ? 'auto' : '20px',
        left: '20px',
        zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '12px 16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease, opacity 0.5s ease-in-out',
        display: isMobile ? 'none' : 'flex', // 手機版隱藏
        flexDirection: 'column',
        gap: '8px',
        opacity: navOpacity,
        pointerEvents: navOpacity > 0 ? 'auto' : 'none'
      }}>
        {/* 經緯度 */}
        <div style={{
          color: '#FFFFFF',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{scrollY > 0 ? `${(24.75 + scrollY * 0.0001).toFixed(2)}°N` : '24.75°N'}, {scrollY > 0 ? `${(121.76 + scrollY * 0.0001).toFixed(2)}°E` : '121.76°E'}</span>
        </div>
        
        {/* 時間顯示 */}
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

      {/* 購物清單圖示 - 桌面版右上角，手機版左下角，Project 區塊後淡入 */}
      <div style={{
        position: 'fixed',
        top: isMobile ? 'auto' : '20px',
        bottom: isMobile ? '20px' : 'auto',
        right: isMobile ? 'auto' : '20px',
        left: isMobile ? '20px' : 'auto',
        zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease, opacity 0.5s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        opacity: navOpacity,
        pointerEvents: navOpacity > 0 ? 'auto' : 'none',
        display: 'none' // 隱藏購物車按鈕（手機和桌面）
      }}
      onClick={() => setIsCartSidebarOpen(true)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.2)';
        e.currentTarget.style.transform = 'scale(1.05)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '0';
      }}
      >
        <div style={{
          fontSize: '1.5rem',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🧺
        </div>
        {cartItems.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#ff4757',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255, 71, 87, 0.4)'
          }}>
            {cartItems.length}
          </div>
        )}
        
        {/* 懸停標籤 */}
        <div style={{
          position: 'absolute',
          bottom: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: '500',
          fontFamily: 'var(--font-zpix), monospace',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1001
        }}
        className="tooltip"
        >
          購物車
        </div>
      </div>

      {/* 右下角釘選 Logo */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: (isContactModalOpen || isModalOpen || isPriceModalOpen || isProductModalOpen || isCartSidebarOpen || selectedDiaryEntry) ? 1 : 9998,
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: isMobile ? '12px' : '16px', // 手機版縮小圓角
        padding: isMobile ? '10px' : '16px', // 手機版縮小 padding (16 * 0.6 ≈ 10)
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease, opacity 0.3s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        opacity: isMobile && isScrolling ? 0 : 1,
        pointerEvents: isMobile && isScrolling ? 'none' : 'auto'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.2)';
        e.currentTarget.style.transform = 'scale(1.05)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
        if (tooltip) tooltip.style.opacity = '0';
      }}
      >
        <Image 
          src="/cursor-07.png" 
          alt="Liam Design Logo" 
          width={80}
          height={80}
          style={{
            width: isMobile ? '48px' : '80px', // 手機版縮小至60% (80 * 0.6 = 48)
            height: isMobile ? '48px' : '80px',
            objectFit: 'contain',
            filter: 'brightness(1.1)'
          }}
        />
        
        {/* 懸停標籤 */}
        <div style={{
          position: 'absolute',
          top: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: '500',
          fontFamily: 'var(--font-zpix), monospace',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1001
        }}
        className="tooltip"
        >
          So good
        </div>
      </div>

      {/* 商品詳情 Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onDirectContact={(product) => {
          // 直接聯繫功能 - 可以跳轉到 LINE 或 Email
          const contactUrl = `mailto:liam@example.com?subject=商品詢問：${product.name}&body=您好，我想了解關於 ${product.name} 的詳細資訊。`;
          window.open(contactUrl);
        }}
      />

      {/* 自我介紹 Modal */}
      <IntroModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
      />

      {/* 購物清單側欄 */}
      <CartSidebar
        isOpen={isCartSidebarOpen}
        onClose={() => setIsCartSidebarOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <div className="hero-test-container">
        {renderHeroComponent()}
      </div>

      {/* 品牌心理測驗 Card */}
      <div 
        id="brand-quiz-section"
        className="w-full py-12 md:py-16" 
        style={{ 
        background: '#003EC3',
        minHeight: '400px',
        position: 'relative',
        zIndex: 10
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          {/* 標題區域 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            zIndex: 1,
            position: 'relative',
            overflow: 'visible'
          }}>
            {/* 雲朵裝飾 */}
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: 'clamp(80px, 12vw, 160px)',
              height: 'clamp(80px, 12vw, 160px)',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'floatCloud 10s ease-in-out infinite',
              animationDelay: '2s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.6
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '8%',
              width: 'clamp(60px, 10vw, 120px)',
              height: 'clamp(60px, 10vw, 120px)',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'floatCloud 12s ease-in-out infinite',
              animationDelay: '0s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.5
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '10%',
              left: '15%',
              width: 'clamp(70px, 11vw, 140px)',
              height: 'clamp(70px, 11vw, 140px)',
              backgroundImage: 'url(/cloud-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'floatCloud 14s ease-in-out infinite',
              animationDelay: '4s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.55
            }}></div>
            
            {/* 星星裝飾 */}
            <div style={{
              position: 'absolute',
              top: '8%',
              right: '15%',
              width: 'clamp(20px, 3vw, 32px)',
              height: 'clamp(20px, 3vw, 32px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 2s infinite',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.7
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: '12%',
              left: '12%',
              width: 'clamp(18px, 2.5vw, 28px)',
              height: 'clamp(18px, 2.5vw, 28px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 2.5s infinite',
              animationDelay: '0.5s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.6
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(16px, 2.2vw, 24px)',
              height: 'clamp(16px, 2.2vw, 24px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 3s infinite',
              animationDelay: '1s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.65
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '20%',
              right: '20%',
              width: 'clamp(18px, 2.8vw, 30px)',
              height: 'clamp(18px, 2.8vw, 30px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 2.2s infinite',
              animationDelay: '1.5s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.7
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '25%',
              left: '20%',
              width: 'clamp(16px, 2.4vw, 26px)',
              height: 'clamp(16px, 2.4vw, 26px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 2.8s infinite',
              animationDelay: '0.8s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.6
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(20px, 3vw, 32px)',
              height: 'clamp(20px, 3vw, 32px)',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: 'twinkle 2.4s infinite',
              animationDelay: '1.2s',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: 0.65
            }}></div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              position: 'relative',
              zIndex: 10
            }}>
              BRAND QUIZ
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#E8F4FD',
              margin: '0',
              fontWeight: '400',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              letterSpacing: '0.1em',
              position: 'relative',
              zIndex: 10
            }}>
              Find the Role Your Brand Was Born to Play
            </p>
          </div>
          <div style={{
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <PsychologyTestCard isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* 純藍色背景區域 - 基於內容動態調整高度 */}
      <div 
        id="projects-section"
        ref={blueSectionRef}
        style={{
          backgroundColor: '#003EC3', // 使用 backgroundColor 而不是 background
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '80px 20px',
          position: 'relative',
          minHeight: '100vh' // 最小高度為一個視窗高度
        }}>
        {/* 簡潔的標題區域 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          zIndex: 1, // 降低z-index，確保彈出視窗在其上方
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            PROJECTS
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8F4FD',
            margin: '0',
            fontWeight: '400',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            letterSpacing: '0.1em'
          }}>
            Explore My Latest Works
          </p>
        </div>

        {/* 3D 輪播組件 */}
        <div 
          id="projects"
          ref={firstCarouselRef}
          style={{
          width: '100%',
          height: '80vh',
            position: 'relative',
          zIndex: 10
        }}>
          <Carousel3D items={firstCarouselItems} onItemClick={handleProjectClick} />
        </div>

        {/* 分隔線 */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? 'clamp(10px, 2vw, 20px)' : '40px',
          marginBottom: isMobile ? 'clamp(10px, 2vw, 20px)' : '40px',
          padding: isMobile ? '0 20px' : '0 40px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '600px',
            height: isMobile ? '2px' : '3px',
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',
            position: 'relative'
          }}>
            {/* 可選：在中間添加裝飾元素 */}
        <div style={{
          position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
        }}></div>
          </div>
        </div>

        {/* 第二個 3D 輪播組件 - 從右到左 */}
        <div 
          ref={secondCarouselRef}
          style={{
          width: '100%',
          height: '80vh',
          position: 'relative',
            zIndex: 10,
            display: 'none' // 隱藏第二組輪播
        }}>
          <Carousel3D items={secondCarouselItems} onItemClick={handleProjectClick} reverse={true} startNumber={7} />
        </div>

        {/* 雲朵裝飾 - PROJECTS區域1朵 */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: isMobile ? '100px' : '150px',
          height: isMobile ? '100px' : '150px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 9s ease-in-out infinite',
          animationDelay: '1s',
          zIndex: 12,
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>

        {/* 小星星陣列 */}
        {[
          { top: '15%', left: '25%', size: '8px', delay: '0s' },
          { top: '25%', left: '80%', size: '6px', delay: '1s' },
          { top: '35%', left: '5%', size: '10px', delay: '2s' },
          { top: '45%', left: '90%', size: '7px', delay: '3s' },
          { top: '55%', left: '15%', size: '9px', delay: '4s' },
          { top: '65%', left: '85%', size: '8px', delay: '5s' },
          { top: '75%', left: '8%', size: '6px', delay: '6s' },
          { top: '85%', left: '75%', size: '10px', delay: '7s' },
          { top: '10%', left: '60%', size: '7px', delay: '8s' },
          { top: '30%', left: '40%', size: '9px', delay: '9s' },
          { top: '50%', left: '70%', size: '8px', delay: '10s' },
          { top: '70%', left: '30%', size: '6px', delay: '11s' },
          { top: '40%', left: '50%', size: '10px', delay: '12s' },
          { top: '60%', left: '20%', size: '7px', delay: '13s' },
          { top: '80%', left: '60%', size: '9px', delay: '14s' },
          { top: '20%', left: '35%', size: '8px', delay: '15s' },
          { top: '40%', left: '95%', size: '6px', delay: '16s' },
          { top: '60%', left: '45%', size: '10px', delay: '17s' },
          { top: '80%', left: '25%', size: '7px', delay: '18s' },
          { top: '90%', left: '85%', size: '9px', delay: '19s' }
        ].map((star, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: '#FFFFFF',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              animation: `twinkle ${3 + (index % 3)}s ease-in-out infinite alternate`,
              animationDelay: star.delay,
              zIndex: 12,
              opacity: 0.8
            }}
          />
        ))}

        
        {/* 作品集區塊銜接處標語 - 左下角 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: 'white',
          fontSize: '16px',
          fontFamily: 'var(--font-zpix), monospace',
          lineHeight: '1.4',
          textAlign: 'left',
          zIndex: 25,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
        </div>

        {/* #fdd000 色塊覆蓋層 - 從底部往上覆蓋藍色區域（置底以免遮擋下一區塊） */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${darkCoverHeight}px`,
          backgroundColor: '#fdd000',
          zIndex: 0,
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 設計日記區域 - 深色背景並向上覆蓋藍色區域 */}
      <div 
        ref={diarySectionRef}
        style={{
        position: 'relative',
          backgroundColor: '#fdd000',
          paddingTop: isMobile ? '2rem' : '4rem',
          paddingBottom: isMobile ? '2rem' : '4rem',
        minHeight: '100vh',
        zIndex: 1,
          overflow: 'visible'
      }}>
        {/* 雲朵裝飾 - DESIGN DIARY區域 */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: isMobile ? '100px' : '160px',
          height: isMobile ? '100px' : '160px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 10s ease-in-out infinite',
          animationDelay: '2s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.6
        }}></div>
        
        {/* 第二朵雲朵 - 左上角 */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: isMobile ? '80px' : '120px',
          height: isMobile ? '80px' : '120px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 12s ease-in-out infinite',
          animationDelay: '0s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.5
        }}></div>
        
        {/* 第三朵雲朵 - 中下方 */}
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: isMobile ? '90px' : '140px',
          height: isMobile ? '90px' : '140px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 14s ease-in-out infinite',
          animationDelay: '4s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.55
        }}></div>
        
        {/* 星星裝飾 - DESIGN DIARY區域 */}
        {/* 星星 1 - 右上角 */}
        <div style={{
          position: 'absolute',
          top: '8%',
          right: '15%',
          width: isMobile ? '24px' : '32px',
          height: isMobile ? '24px' : '32px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 2s infinite',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>
        
        {/* 星星 2 - 左上角 */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '12%',
          width: isMobile ? '20px' : '28px',
          height: isMobile ? '20px' : '28px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 2.5s infinite',
          animationDelay: '0.5s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.6
        }}></div>
        
        {/* 星星 3 - 中上方 */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '18px' : '24px',
          height: isMobile ? '18px' : '24px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 3s infinite',
          animationDelay: '1s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.65
        }}></div>
        
        {/* 星星 4 - 右下角 */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: isMobile ? '22px' : '30px',
          height: isMobile ? '22px' : '30px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 2.2s infinite',
          animationDelay: '1.5s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>
        
        {/* 星星 5 - 左下角 */}
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: isMobile ? '20px' : '26px',
          height: isMobile ? '20px' : '26px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 2.8s infinite',
          animationDelay: '0.8s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.6
        }}></div>
        
        {/* 星星 6 - 中下方 */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '24px' : '32px',
          height: isMobile ? '24px' : '32px',
          backgroundImage: 'url(/star-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'twinkle 2.3s infinite',
          animationDelay: '2s',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.65
        }}></div>
        {/* 深色色塊覆蓋層（取消覆蓋效果） */}
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          width: '100%',
          height: 0,
          backgroundColor: '#fdd000',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>
        
        {/* OUR SERVICES 品牌藍向上覆蓋層（放在設計日記內，僅覆蓋背景不遮內容） */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${diaryToServicesCoverHeight}px`,
          backgroundColor: '#003EC3',
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'height 0.1s ease-out'
        }}></div>

        {/* 設計日記組件 */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <DesignDiary entries={diaryEntries} selectedEntry={selectedDiaryEntry} onSelectEntry={setSelectedDiaryEntry} />
        </div>
      </div>

      {/* 日記彈出視窗 - 使用 Portal 渲染到 body 最外層，確保在最上層 */}
      {selectedDiaryEntry && isClient && typeof window !== 'undefined' && typeof document !== 'undefined' && document.body ? createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              zIndex: 999999,
              isolation: 'isolate',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedDiaryEntry(null)}
          >
            <div
              style={{
                background: '#FCFBE4',
                border: '2px solid #FFFFFF',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                width: '800px',
                maxWidth: '95vw',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '3rem',
                position: 'relative',
                fontFamily: 'var(--font-noto-sans-tc), sans-serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDiaryEntry(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 'bold',
                color: '#000000',
                fontFamily: 'var(--font-handwriting), var(--font-noto-sans-tc), sans-serif',
                marginBottom: '1.5rem'
              }}>
                {selectedDiaryEntry.title}
              </h2>
              <p style={{
                color: '#000000',
                lineHeight: '1.8',
                whiteSpace: 'pre-line',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-noto-sans-tc), sans-serif'
              }}>
                {selectedDiaryEntry.content}
              </p>
            </div>
          </div>,
          document.body
        ) : null}

      {/* 深色區域 - 包含星星和內容 */}
      <div 
        id="services-section"
        ref={darkSectionRef}
        style={{
          minHeight: '100vh',
          backgroundColor: '#003EC3',
          position: 'relative',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          overflow: 'hidden'
        }}>
        {/* 雲朵裝飾 - OUR SERVICES區域2朵 */}
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '8%',
          width: isMobile ? '100px' : '170px',
          height: isMobile ? '100px' : '170px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 11s ease-in-out infinite',
          animationDelay: '0.5s',
          zIndex: 8,
          pointerEvents: 'none',
          opacity: 0.65
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '12%',
          width: isMobile ? '90px' : '140px',
          height: isMobile ? '90px' : '140px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 12s ease-in-out infinite',
          animationDelay: '3.5s',
          zIndex: 8,
          pointerEvents: 'none',
          opacity: 0.6
        }}></div>
        {/* 水藍色覆蓋層 - 從 OUR SERVICES 底部往上覆蓋（僅蓋背景） */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${servicesToContactCoverHeight}px`,
          backgroundColor: '#0099FF',
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'height 0.1s ease-out'
        }}></div>
        {/* 品牌藍色塊覆蓋層（移出，改由設計日記區域內處理） */}
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          width: '100%',
          height: 0,
          backgroundColor: '#003EC3',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        {/* OUR SERVICES 版位星空效果 */}
        {[
          { top: '8%', left: '15%', size: '8px', delay: '0s' },
          { top: '18%', left: '85%', size: '6px', delay: '1s' },
          { top: '28%', left: '5%', size: '10px', delay: '2s' },
          { top: '38%', left: '95%', size: '7px', delay: '3s' },
          { top: '48%', left: '25%', size: '9px', delay: '4s' },
          { top: '58%', left: '75%', size: '8px', delay: '5s' },
          { top: '68%', left: '2%', size: '6px', delay: '6s' },
          { top: '78%', left: '88%', size: '10px', delay: '7s' },
          { top: '12%', left: '65%', size: '7px', delay: '8s' },
          { top: '32%', left: '45%', size: '9px', delay: '9s' },
          { top: '52%', left: '55%', size: '8px', delay: '10s' },
          { top: '72%', left: '35%', size: '6px', delay: '11s' },
          { top: '42%', left: '68%', size: '10px', delay: '12s' },
          { top: '62%', left: '12%', size: '7px', delay: '13s' },
          { top: '82%', left: '58%', size: '9px', delay: '14s' },
          { top: '22%', left: '32%', size: '8px', delay: '15s' },
          { top: '42%', left: '92%', size: '6px', delay: '16s' },
          { top: '62%', left: '42%', size: '10px', delay: '17s' },
          { top: '82%', left: '22%', size: '7px', delay: '18s' },
          { top: '92%', left: '78%', size: '9px', delay: '19s' },
          { top: '15%', left: '55%', size: '8px', delay: '20s' },
          { top: '35%', left: '18%', size: '6px', delay: '21s' },
          { top: '55%', left: '82%', size: '10px', delay: '22s' },
          { top: '75%', left: '38%', size: '7px', delay: '23s' },
          { top: '88%', left: '62%', size: '9px', delay: '24s' }
        ].map((star, index) => (
          <div
            key={`services-star-${index}`}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: '#FFFFFF',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              animation: `twinkle ${3 + (index % 3)}s ease-in-out infinite alternate`,
              animationDelay: star.delay,
              zIndex: 12,
              opacity: 0.8
            }}
          />
        ))}

        {/* OUR SERVICES 星星圖片裝飾 */}
        {[
          { top: '10%', left: '10%' },
          { top: '15%', right: '15%' },
          { top: '25%', left: '8%' },
          { top: '30%', right: '12%' },
          { top: '45%', left: '20%' },
          { top: '50%', right: '25%' },
          { top: '65%', left: '15%' },
          { top: '70%', right: '20%' },
          { top: '80%', left: '10%' },
          { top: '85%', right: '15%' }
        ]
        .filter((_, index) => !isMobile || index < 6) // 手機版只顯示前6顆
        .map((star, index) => (
          <div
            key={`services-star-img-${index}`}
            style={{
              position: 'absolute',
              ...star,
              width: '24px',
              height: '24px',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: `twinkle ${2 + (index % 3) * 0.3}s ease-in-out infinite`,
              animationDelay: `${index * 0.4}s`,
              zIndex: 11,
              opacity: 0.7 + (index % 3) * 0.1,
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* 深色區域標題 */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? 'clamp(20px, 5vw, 40px)' : 'clamp(40px, 6vw, 80px)',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            OUR SERVICES
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8E8E8',
            margin: '0',
            fontWeight: '400',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            letterSpacing: '0.1em'
          }}>
            Discover My Creative Journey
          </p>
        </div>

        {/* 插畫（置於服務流程正下方，100% 不透明） */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? 'clamp(20px, 5vw, 40px)' : 'clamp(40px, 6vw, 80px)',
          marginBottom: isMobile ? '8px' : '12px',
          position: 'relative',
          zIndex: 9,
          minHeight: '300px', // 確保有足夠空間顯示插畫
          padding: isMobile ? '0 10px' : '0' // 手機版留一點邊距
        }}>
          {/* 深色背景層 - 增強立體感 */}
          {[
            { step: 1, src: '/service-1.png', alt: 'Step 1 Illustration' },
            { step: 2, src: '/service-2.png', alt: 'Step 2 Illustration' },
            { step: 3, src: '/service-3.png', alt: 'Step 3 Illustration' },
            { step: 4, src: '/service-4.png', alt: 'Step 4 Illustration' },
            { step: 5, src: '/service-5.png', alt: 'Step 5 Illustration' }
          ].map((item) => (
            <div
              key={`svc-bg-${item.step}`}
              style={{
                position: 'absolute',
                width: isMobile ? 'calc(100vw - 20px)' : 'min(792px, 63vw)',
                maxWidth: isMobile ? 'none' : 'min(792px, 63vw)',
                height: 'auto',
                minHeight: isMobile ? '250px' : '400px',
                borderRadius: '20px',
                background: selectedStep === item.step 
                  ? 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)'
                  : 'transparent',
                opacity: selectedStep === item.step ? 1 : 0,
                transform: selectedStep === item.step 
                  ? 'translate(-50%, -50%) translateY(8px) scale(0.98)' 
                  : 'translate(-50%, -50%) translateY(8px) scale(0.98)',
                transition: 'opacity 600ms ease-in-out 0.3s, transform 600ms ease-in-out 0.3s',
                pointerEvents: 'none',
                top: '50%',
                left: '50%',
                zIndex: 0,
                boxShadow: selectedStep === item.step 
                  ? '0 12px 40px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.3)' 
                  : 'none'
              }}
            />
          ))}
          
          {/* 圖片層 */}
          {[
            { step: 1, src: '/service-1.png', alt: 'Step 1 Illustration' },
            { step: 2, src: '/service-2.png', alt: 'Step 2 Illustration' },
            { step: 3, src: '/service-3.png', alt: 'Step 3 Illustration' },
            { step: 4, src: '/service-4.png', alt: 'Step 4 Illustration' },
            { step: 5, src: '/service-5.png', alt: 'Step 5 Illustration' }
          ].map((item) => (
            <img
              key={`svc-illu-inline-${item.step}`}
              src={item.src}
              alt={item.alt}
              style={{
                position: 'absolute',
                width: isMobile ? 'calc(100vw - 20px)' : 'min(792px, 63vw)',
                maxWidth: isMobile ? 'none' : 'min(792px, 63vw)',
                height: 'auto',
                borderRadius: '20px',
                background: 'transparent',
                opacity: selectedStep === item.step ? 1 : 0,
                transform: selectedStep === item.step 
                  ? 'translate(-50%, -50%) translateX(0)' 
                  : 'translate(-50%, -50%) translateX(-30px)',
                transition: 'opacity 600ms ease-in-out 0.3s, transform 600ms ease-in-out 0.3s',
                pointerEvents: 'none',
                top: '50%',
                left: '50%',
                zIndex: 1,
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
              }}
            />
          ))}
        </div>

        {/* 進度條區域 */}
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          marginTop: isMobile ? 'clamp(20px, 3vw, 30px)' : 'clamp(30px, 4vw, 50px)',
          position: 'relative',
          zIndex: 10
        }}>
          {/* 短敘述 - 隨step更換 */}
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? 'clamp(15px, 3vw, 25px)' : 'clamp(20px, 3vw, 30px)',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#353535', // 深灰色實色背景（與 footer 一致），像夜晚的深色
              color: '#fdd000', // 黃色文字
              padding: isMobile ? 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)' : 'clamp(10px, 1.5vw, 16px) clamp(20px, 3vw, 32px)',
              borderRadius: '8px',
              fontSize: isMobile ? 'clamp(0.9rem, 2.5vw, 1.1rem)' : 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: '500',
              fontFamily: 'var(--font-noto-sans-tc), sans-serif',
              transition: 'opacity 0.3s ease-in-out',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', // 只保留基本陰影
              textShadow: '0 0 10px rgba(253, 208, 0, 0.8), 0 0 20px rgba(253, 208, 0, 0.6), 0 0 30px rgba(253, 208, 0, 0.4)' // 文字光暈效果
            }}>
              {(() => {
                const stepDescriptions: { [key: number]: string } = {
                  1: '從理解開始，用對話找到靈感。',
                  2: '把想法具象化，讓設計開始呼吸。',
                  3: '根據回饋，一起修整航向。',
                  4: '讓作品準備好啟程。',
                  5: '讓理想走進真實，成為被看見的樣子。'
                };
                return stepDescriptions[selectedStep ?? 1] || stepDescriptions[1];
              })()}
            </div>
          </div>

          {/* 進度條標題 */}
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            color: '#FFFFFF',
            margin: '0 0 30px 0',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            服務流程
          </h2>

          {/* 進度條容器 */}
          <div id="services-progress" style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 243, 0.25)',
            border: '1px solid rgba(255, 255, 243, 0.6)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '40px'
          }}>
            {/* 進度條填充 */}
            <div className="progress-fill" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${Math.max(0, Math.min(100, ((selectedStep ?? 1) - 1) / 4 * 100))}%`,
              background: '#FFFFF3',
              borderRadius: '10px',
              transition: 'width 0.5s ease-in-out',
              boxShadow: '0 0 16px rgba(255, 255, 243, 0.65)'
            }} />
          </div>

          {/* 進度條步驟標籤 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px'
          }}>
            {[
              { step: 1, label: '討論發想', status: 'active', subtitle: '從理解開始，讓想法慢慢長出形狀。', content: '從對話開始，了解你的故事與期待。\n我們一起找出品牌最真實的樣子，\n慢慢描出第一條線。' },
              { step: 2, label: '設計插畫', status: 'active', subtitle: '用線條和色彩，讓故事開始呼吸。', content: '把概念轉化成畫面，\n讓品牌的語氣與溫度被看見。\n每一筆，都是為了更靠近你的想像。' },
              { step: 3, label: '草圖提案', status: 'active', subtitle: '把想法化為可見的方向。', content: '提出多個草圖方向，\n討論可行性與風格走向，\n收斂到最合適的方案。' },
              { step: 4, label: '調整定稿', status: 'active', subtitle: '來回修正直到到位。', content: '依照回饋調整細節、版式與色彩，\n確認檔案版權與輸出規格。' },
              { step: 5, label: '交付上線', status: 'active', subtitle: '完整交付、準備上線。', content: '提供可用檔案與指引，\n支援印刷與線上應用，\n確保順利上線。' }
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1
              }}>
                {/* 步驟圓圈 */}
                <div 
                  onClick={() => setSelectedStep(item.step)}
            style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: selectedStep === item.step ? '#fdd000' : 'rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    border: selectedStep === item.step ? '3px solid #fdd000' : '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: selectedStep === item.step ? '0 0 25px rgba(253, 208, 0, 0.8)' : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: selectedStep === item.step ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStep !== item.step) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(74, 144, 226, 0.8)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStep !== item.step) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = item.status === 'completed' ? '0 0 15px rgba(74, 144, 226, 0.5)' :
                                                      item.status === 'in-progress' ? '0 0 15px rgba(123, 179, 240, 0.5)' : 'none';
                    }
                  }}
                >
                  {item.status === 'completed' ? (
                    <span style={{ color: selectedStep === item.step ? '#000000' : 'white', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                  ) : (
                    <span style={{ color: selectedStep === item.step ? '#000000' : 'rgba(255, 255, 255, 0.6)', fontSize: '16px', fontWeight: 'bold' }}>
                      {item.step}
                    </span>
                  )}
                </div>
                
                {/* 步驟標籤 */}
                <span style={{
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  color: selectedStep === item.step ? '#FFFFFF' : 
                         item.status === 'completed' || item.status === 'in-progress' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  fontWeight: selectedStep === item.step || item.status === 'in-progress' ? 'bold' : 'normal',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step 內文窗已移除（避免視覺干擾） */}

          {/* 內嵌內容區域：已移除 */}
        </div>

        {/* 彈出式視窗 */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />

        {/* 價目表彈出視窗 */}
        {isPriceModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
          width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}>
              {/* 關閉按鈕 */}
              <button
                onClick={() => setIsPriceModalOpen(false)}
            style={{
              position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                ×
              </button>

              {/* 標題 */}
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center'
              }}>
                價目表
              </h2>

              {/* 價目表內容 */}
        <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* 似顏繪製作 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>似顏繪製作</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>2000</span>
        </div>

                {/* 菜單設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>菜單設計 印製另計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>2000/頁</span>
                </div>

                {/* 酷卡設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>酷卡設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>3000</span>
                </div>

                {/* 情侶服設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>情侶服設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>3000-6000</span>
                </div>

                {/* DM設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>DM設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>4000</span>
                </div>

                {/* 吉祥物設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>吉祥物設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>6000-10000</span>
                </div>

                {/* 海報設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>海報設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>8000</span>
                </div>

                {/* 名片設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>名片設計含印製費</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>10000</span>
                </div>

                {/* Logo設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>Logo設計</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>12000</span>
                </div>

                {/* 商標設計CIS */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>商標設計CIS</span>
                  <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>45000</span>
                </div>

                {/* 社群代管 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>社群代管</span>
                  <span style={{ color: '#FF8603', fontSize: '1.2rem', fontWeight: 'bold' }}>加賴私訊報價</span>
                </div>

                {/* 團體服設計 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>團體服設計含製作</span>
                  <span style={{ color: '#FF8603', fontSize: '1.2rem', fontWeight: 'bold' }}>加賴私訊報價</span>
                </div>

                {/* 印刷諮詢 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>印刷諮詢</span>
                  <span style={{ color: '#3AAF3A', fontSize: '1.2rem', fontWeight: 'bold' }}>免費諮詢</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 聯絡方式彈出視窗 */}
        {isContactModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}>
              {/* 關閉按鈕 */}
              <button
                onClick={() => setIsContactModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                ×
              </button>

              {/* 標題 */}
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center',
                fontFamily: 'var(--font-zpix), monospace'
              }}>
                聯絡方式
              </h2>

              {/* 聯絡方式內容 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Email */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.open('mailto:liam@example.com')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Email 圖標 */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(74, 144, 226, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    border: '1px solid rgba(74, 144, 226, 0.3)'
                  }}>
                    <span style={{ color: '#4A90E2', fontSize: '1.2rem', fontWeight: 'bold' }}>E</span>
                  </div>
                  
                  {/* Email 資訊 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                      Email
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      liam@example.com
                    </div>
                  </div>
                  
                  {/* 箭頭 */}
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem' }}>
                    →
                  </div>
                </div>

                {/* LINE */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.open('#')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* LINE 圖標 */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                      💬
                    </div>
                  </div>
                  
                  {/* LINE 資訊 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                      LINE
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      @liamdesign
                    </div>
                  </div>
                  
                  {/* 箭頭 */}
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem' }}>
                    →
                  </div>
                </div>

                {/* Instagram */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.open('#')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Instagram 圖標 */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                      📷
                    </div>
                  </div>
                  
                  {/* Instagram 資訊 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                      Instagram
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      @3r.liam_
                    </div>
                  </div>
                  
                  {/* 箭頭 */}
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem' }}>
                    →
                  </div>
                </div>
              </div>

              {/* 底部說明 */}
              <div style={{
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  margin: 0,
                  fontFamily: 'var(--font-zpix), monospace'
                }}>
                  點擊任一聯絡方式即可與 Liam 取得聯繫!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 深色區域星星效果 - 固定位置避免 hydration mismatch */}
        {[
          { left: '15%', top: '20%', size: '2px', duration: '3s' },
          { left: '85%', top: '15%', size: '1.5px', duration: '4s' },
          { left: '25%', top: '60%', size: '2.5px', duration: '2.5s' },
          { left: '75%', top: '45%', size: '1.8px', duration: '3.5s' },
          { left: '45%', top: '80%', size: '2.2px', duration: '2.8s' },
          { left: '90%', top: '70%', size: '1.6px', duration: '4.2s' },
          { left: '10%', top: '40%', size: '2.1px', duration: '3.2s' },
          { left: '60%', top: '25%', size: '1.9px', duration: '2.7s' },
          { left: '35%', top: '85%', size: '2.3px', duration: '3.8s' },
          { left: '80%', top: '90%', size: '1.7px', duration: '4.1s' }
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: star.size,
              height: star.size,
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              left: star.left,
              top: star.top,
              animation: `twinkle ${star.duration} ease-in-out infinite alternate`,
              zIndex: 1,
              opacity: 0.6
            }}
          />
        ))}


        {/* 深色區塊銜接處標語 - 左下角 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: 'white',
          fontSize: '16px',
          fontFamily: 'var(--font-zpix), monospace',
          lineHeight: '1.4',
          textAlign: 'left',
          zIndex: 25,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
        </div>

        {/* 專案服務區塊底部的品牌藍色覆蓋層 - 從底部向上覆蓋 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${serviceBlueCoverHeight}px`,
          backgroundColor: '#003EC3',
          zIndex: 0, // 將覆蓋層放在該區塊內容最底層
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 支持我們區塊 */}
      <div 
        ref={supportSectionRef}
        style={{
          minHeight: '100vh',
          backgroundColor: '#003EC3',
          position: 'relative',
          padding: '80px 20px',
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* 支持我們區塊標題 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          zIndex: 15
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.05em'
          }}>
            支持我們
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8F4FD',
            margin: '0',
            fontWeight: '300',
            letterSpacing: '0.1em'
          }}>
            小小的設計，陪你一整天。
          </p>
          <p style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: 'rgba(232, 244, 253, 0.8)',
            margin: '20px 0 0 0',
            fontWeight: '300',
            letterSpacing: '0.05em',
            lineHeight: '1.6'
          }}>
            這些商品來自我們的日常靈感，<br />
            希望它們能在你生活裡，靜靜陪著你。
          </p>
        </div>

        {/* 商品卡片網格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          width: '100%',
          zIndex: 15
        }}>
          {productItems.map((product) => (
            <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
          ))}
        </div>

        {/* 支持我們區塊星空效果 */}
        {[
          { top: '10%', left: '12%', size: '8px', delay: '0s' },
          { top: '20%', left: '88%', size: '6px', delay: '1s' },
          { top: '30%', left: '8%', size: '10px', delay: '2s' },
          { top: '40%', left: '92%', size: '7px', delay: '3s' },
          { top: '50%', left: '20%', size: '9px', delay: '4s' },
          { top: '60%', left: '80%', size: '8px', delay: '5s' },
          { top: '70%', left: '5%', size: '6px', delay: '6s' },
          { top: '80%', left: '95%', size: '10px', delay: '7s' },
          { top: '15%', left: '60%', size: '7px', delay: '8s' },
          { top: '35%', left: '40%', size: '9px', delay: '9s' },
          { top: '55%', left: '50%', size: '8px', delay: '10s' },
          { top: '75%', left: '30%', size: '6px', delay: '11s' },
          { top: '45%', left: '70%', size: '10px', delay: '12s' },
          { top: '65%', left: '15%', size: '7px', delay: '13s' },
          { top: '85%', left: '55%', size: '9px', delay: '14s' },
          { top: '25%', left: '35%', size: '8px', delay: '15s' },
          { top: '45%', left: '90%', size: '6px', delay: '16s' },
          { top: '65%', left: '45%', size: '10px', delay: '17s' },
          { top: '85%', left: '25%', size: '7px', delay: '18s' },
          { top: '95%', left: '75%', size: '9px', delay: '19s' },
          { top: '18%', left: '50%', size: '8px', delay: '20s' },
          { top: '38%', left: '22%', size: '6px', delay: '21s' },
          { top: '58%', left: '78%', size: '10px', delay: '22s' },
          { top: '78%', left: '42%', size: '7px', delay: '23s' },
          { top: '88%', left: '62%', size: '9px', delay: '24s' }
        ].map((star, index) => (
          <div
            key={`support-star-${index}`}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              animation: `twinkle 3s infinite ${star.delay}`,
              zIndex: 5
            }}
          />
        ))}
        
        {/* 支持我們區塊底部的深灰色覆蓋層 - 從底部向上覆蓋 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${supportToContactCoverHeight}px`,
          backgroundColor: '#353535',
          zIndex: 0, // 覆蓋層置底
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 第二個藍色區域 - CONTACT */}
      <div 
        id="contact-section"
        ref={contactSectionRef} 
        style={{
          minHeight: '100vh',
          backgroundColor: '#0099FF',
          position: 'relative',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          overflow: 'hidden'
        }}>
        {/* 雲朵裝飾 - CONTACT區域2朵 */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '12%',
          width: isMobile ? '100px' : '160px',
          height: isMobile ? '100px' : '160px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 13s ease-in-out infinite',
          animationDelay: '1.5s',
          zIndex: 8,
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: isMobile ? '110px' : '150px',
          height: isMobile ? '110px' : '150px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 14s ease-in-out infinite',
          animationDelay: '4s',
          zIndex: 8,
          pointerEvents: 'none',
          opacity: 0.65
        }}></div>
        {/* 溫暖白覆蓋改由 OUR SERVICES 區塊處理，此處關閉覆蓋 */}
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          width: '100%',
          height: 0,
          backgroundColor: '#FFFFF3',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        {/* 第二個藍色區域標題 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
          zIndex: 100
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFF3',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            CONTACT
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#FFFFFF',
            margin: '0',
            fontWeight: '400',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            letterSpacing: '0.1em'
          }}>
            Let&apos;s Create Something Amazing Together
          </p>
        </div>

        {/* CONTACT 版位星球效果 - 2顆星球（總共5顆，非4的倍數） */}
        {[
          { top: '15%', left: '15%', size: '54px', delay: '0s' }, // 缩小60%：90px * 0.6 = 54px
          { top: '75%', right: '15%', size: '45px', delay: '2s' } // 缩小60%：75px * 0.6 = 45px
        ].map((planet, index) => {
          const style: React.CSSProperties = {
              position: 'absolute',
            top: planet.top,
            width: planet.size,
            height: planet.size,
            backgroundImage: 'url(/star-big.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: `twinkle ${3 + (index % 2)}s ease-in-out infinite alternate`,
            animationDelay: planet.delay,
              zIndex: 12,
            opacity: 0.9
          };
          
          if (planet.left) {
            style.left = planet.left;
          }
          if (planet.right) {
            style.right = planet.right;
          }
          
          return (
            <div
              key={`contact-planet-${index}`}
              style={style}
          />
          );
        })}

        {/* 第二個藍色區域內容 */}
        <div style={{
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%',
          position: 'relative',
          zIndex: 100,
          padding: isMobile ? '0 20px' : '0 40px'
        }}>
          <p style={{
            color: '#FFFFFF',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '60px'
          }}>
            準備好開始你的下一個項目了嗎？讓我們一起創造令人驚艷的設計作品。
          </p>

          {/* 特別適合的品牌 + FAQ 並排容器 */}
          <div 
            id="contact"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '30px' : '24px',
              marginBottom: '60px',
              maxWidth: '1200px',
              margin: '0 auto 60px auto',
              width: '100%',
              padding: isMobile ? '0 1rem' : '0 2rem'
            }}>
            {/* 特別適合的品牌對話窗 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: isMobile ? '30px 20px' : '40px 50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              flex: isMobile ? '0 0 100%' : '0 0 50%',
              width: isMobile ? '100%' : '50%'
            }}>
              <h3 style={{
                fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: '700',
                color: '#FFFFF3',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                特別適合的品牌
              </h3>
              <div style={{
                textAlign: 'left'
              }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {[
                    '正在準備開店、但不知道視覺如何統整',
                    '小型店家、手作品牌、在地創業者',
                    '第二代接班，想提升品牌形象',
                    '想要溫度、在地感、故事化設計的品牌',
                    '尋求「陪跑式合作」而非一次性設計的人'
                  ].map((item, index) => (
                    <li key={index} style={{
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      color: '#FFFFF3',
                      marginBottom: index < 4 ? '20px' : '0',
                      paddingLeft: '36px',
                      position: 'relative',
                      lineHeight: '1.8',
                      fontWeight: '500'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: isMobile ? '4px' : '6px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        backdropFilter: 'blur(5px)'
                      }}>
                        <span style={{
                          color: '#FFFFF3',
                          fontSize: '12px',
                          fontWeight: '700',
                          lineHeight: '1'
                        }}>✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ 區塊 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: isMobile ? '30px 20px' : '40px 50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              flex: isMobile ? '0 0 100%' : '0 0 50%',
              width: isMobile ? '100%' : '50%'
            }}>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: '700',
              color: '#FFFFF3',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              常見問題
            </h3>
            <div style={{
              textAlign: 'left'
            }}>
              {[
                {
                  q: '我沒有明確想法，可以跟你合作嗎？',
                  a: '可以！我會引導你找到品牌個性與目標方向。'
                },
                {
                  q: '費用怎麼估？',
                  a: '會依照內容量、風格、素材多寡確認後報價，價格彈性且起步友善。'
                },
                {
                  q: '需要多久？',
                  a: '一般專案 2–4 週，依複雜度會調整。'
                }
              ].map((faq, index) => {
                const isOpen = openFAQIndex === index;
                return (
                  <div key={index} style={{
                    marginBottom: index < 2 ? '20px' : '0',
                    borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    paddingBottom: index < 2 ? '20px' : '0'
                  }}>
                    <div
                      onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <p style={{
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        color: '#FFFFF3',
                        fontWeight: '600',
                        margin: 0,
                        flex: 1
                      }}>
                        Q{index + 1}. {faq.q}
                      </p>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFF3',
                        fontSize: '20px',
                        fontWeight: '300',
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        marginLeft: '16px',
                        flexShrink: 0
                      }}>
                        +
                      </div>
                    </div>
                    <div style={{
                      maxHeight: isOpen ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease',
                      opacity: isOpen ? 1 : 0
                    }}>
                      <p style={{
                        fontSize: isMobile ? '0.95rem' : '1rem',
                        color: 'rgba(255, 255, 243, 0.9)',
                        lineHeight: '1.7',
                        marginTop: '12px',
                        marginLeft: '0',
                        paddingLeft: '0'
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </div>

          {/* Social Proof - Logo 跑馬燈 */}
          <div style={{
            marginBottom: '60px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '20px 0',
            display: 'none' // 隱藏此欄位
          }}>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.2rem, 3.5vw, 1.6rem)' : 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: '600',
              color: '#FFFFF3',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              你已經合作過的人
            </h3>
            <div style={{
              width: '100%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '30px' : '50px',
                animation: 'logoMarquee 30s linear infinite',
                width: 'fit-content'
              }} className="logo-marquee">
                {/* 第一組 Logo */}
                {[...Array(6)].map((_, i) => (
                  <div key={`logo-${i}`} style={{
                    width: isMobile ? '120px' : '180px',
                    height: isMobile ? '120px' : '180px',
                    backgroundImage: 'url(/logo.svg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.8,
                    flexShrink: 0
                  }}></div>
                ))}
                {/* 第二組 Logo（重複，形成無縫循環） */}
                {[...Array(6)].map((_, i) => (
                  <div key={`logo-duplicate-${i}`} style={{
                    width: isMobile ? '120px' : '180px',
                    height: isMobile ? '120px' : '180px',
                    backgroundImage: 'url(/logo.svg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.8,
                    flexShrink: 0
                  }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA 按鈕 */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
          <button style={{
            backgroundColor: '#003EC3',
            color: '#FFFFF3',
            border: '2px solid #003EC3',
            padding: '15px 40px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '900',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '200px',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0052CC';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#003EC3';
            e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setIsContactModalOpen(true)}>
            Get In Touch
          </button>

            <button style={{
              backgroundColor: '#fdd000',
              color: '#000000',
              border: '2px solid #fdd000',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffd700';
              e.currentTarget.style.border = '2px solid #ffd700';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fdd000';
              e.currentTarget.style.border = '2px solid #fdd000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setIsPriceModalOpen(true)}>
              價目表
          </button>
          </div>
        </div>

        {/* 第二個藍色區塊銜接處標語 - 左下角 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#003EC3',
          fontSize: '16px',
          fontFamily: 'var(--font-zpix), monospace',
          lineHeight: '1.4',
          textAlign: 'left',
          zIndex: 25,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#353535',
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Logo */}
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              src="/cursor-08.png"
              alt="Logo"
              width={120}
              height={120}
              style={{
                opacity: 0.8
              }}
            />
          </div>

          {/* 版權信息 */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
            margin: '0 0 15px 0',
            fontFamily: 'var(--font-zpix), monospace'
          }}>
            © 2025 Liam Design Studio. All rights reserved.
          </p>

          {/* 聯絡資訊 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="mailto:liam@example.com"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              📧 liam@example.com
            </a>
            <a 
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              💬 LINE @liamdesign
            </a>
            <a 
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              📷 Instagram @3r.liam_
            </a>
          </div>

          {/* 分隔線 */}
          <div style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '20px 0'
          }} />

          {/* 頁面導覽 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              首頁
            </a>
            <a 
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                const windowHeight = window.innerHeight;
                window.scrollTo({ top: windowHeight, behavior: 'smooth' });
              }}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              作品
            </a>
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const windowHeight = window.innerHeight;
                const blueSectionHeight = blueSectionRef.current?.offsetHeight || 0;
                window.scrollTo({ top: windowHeight + blueSectionHeight, behavior: 'smooth' });
              }}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              專案
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const windowHeight = window.innerHeight;
                const blueSectionHeight = blueSectionRef.current?.offsetHeight || 0;
                const darkSectionHeight = darkSectionRef.current?.offsetHeight || 0;
                const supportSectionHeight = supportSectionRef.current?.offsetHeight || 0;
                window.scrollTo({ top: windowHeight + blueSectionHeight + darkSectionHeight + supportSectionHeight, behavior: 'smooth' });
              }}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '400',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A90E2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              聯繫
            </a>
          </div>

          {/* 最後的版權聲明 */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.8rem',
            margin: '0',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            fontWeight: '400'
          }}>
            #Own the Day #Go Live Today
          </p>
        </div>
      </footer>
        </>
      )}
    </>
  );
}