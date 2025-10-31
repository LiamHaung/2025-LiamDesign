"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
const TypewriterText = ({ text, speed = 150, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // 延遲開始
    const delayTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <span>
      {displayedText}
      <span style={{ opacity: currentIndex < text.length ? 1 : 0 }}>|</span>
    </span>
  );
};

// 載入頁面組件
const LoadingPage = ({ 
  loadingPhase, 
  progressStep, 
  onEnterMainContent 
}: { 
  loadingPhase: 'loading' | 'ready' | 'main';
  progressStep: number;
  onEnterMainContent: () => void;
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
      {/* 軌道系統 */}
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

      {/* 流星效果 */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`loading-meteor-${i}`}
          className="absolute z-5"
          style={{
            left: `${15 + i * 20}%`,
            top: `${10 + i * 15}%`,
            width: '16px',
            height: '16px',
            color: '#003EC3',
            fontSize: '16px',
            animation: `meteorStarBlur ${4 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.8}s`,
            opacity: 0.8
          }}
        >
          ✦
        </div>
      ))}

      {/* Logo */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginBottom: loadingPhase === 'ready' ? '50px' : '60px',
        transition: 'margin-bottom 0.8s ease-out'
      }}>
        <Image
          src="/cursor-07.png"
          alt="Liam Design Logo"
          width={120}
          height={120}
          style={{
            width: loadingPhase === 'ready' ? '144px' : '120px',
            height: loadingPhase === 'ready' ? '144px' : '120px',
            objectFit: 'contain',
            filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(0, 62, 195, 0.5))',
            transition: 'all 0.8s ease-out'
          }}
        />
      </div>

      {/* 進度條 */}
      <div style={{
        width: '300px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 10,
        opacity: loadingPhase === 'ready' ? 0 : 1,
        transition: 'opacity 0.8s ease-out'
      }}>
        <div style={{
          width: `${progressStep}%`,
          height: '100%',
          background: '#003EC3',
          borderRadius: '2px',
          transition: 'width 0.3s ease',
          boxShadow: '0 0 10px rgba(0, 62, 195, 0.5)'
        }} />
      </div>

      {/* Explore Portfolio 按鈕 */}
      {loadingPhase === 'ready' && (
        <button
          onClick={onEnterMainContent}
          style={{
            background: '#003EC3',
            border: 'none',
            borderRadius: '50px',
            padding: '16px 32px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
            position: 'relative',
            zIndex: 10,
            animation: 'fadeInUp 0.8s ease-out',
            transform: 'translateY(0)',
            opacity: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
          }}
        >
          Explore Portfolio
        </button>
      )}

      {/* Slogan */}
      {loadingPhase === 'ready' && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '20px',
          textAlign: 'center',
          animation: 'fadeInUp 1s ease-out 0.5s both'
        }}>
          <div style={{
            color: '#fffff3',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: '600',
            fontFamily: 'var(--font-noto-sans-tc), sans-serif',
            letterSpacing: '0.1em',
            textShadow: '0 0 20px rgba(0, 62, 195, 0.5)',
            marginBottom: '8px'
          }}>
            Own the Day.
          </div>
          <div style={{
            color: 'rgba(255, 255, 243, 0.8)',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            fontWeight: '500',
            fontFamily: 'var(--font-noto-sans-tc), sans-serif',
            letterSpacing: '0.05em',
            textShadow: '0 0 15px rgba(0, 62, 195, 0.4)'
          }}>
            掌握今天
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
        
        @keyframes meteorStarBlur {
          0% { opacity: 0; transform: translateX(-200px) translateY(200px) rotate(45deg); filter: blur(3px); }
          20% { opacity: 0.3; transform: translateX(-100px) translateY(100px) rotate(45deg); filter: blur(2px); }
          50% { opacity: 1; transform: translateX(0px) translateY(0px) rotate(45deg); filter: blur(0px); }
          80% { opacity: 0.3; transform: translateX(100px) translateY(-100px) rotate(45deg); filter: blur(2px); }
          100% { opacity: 0; transform: translateX(200px) translateY(-200px) rotate(45deg); filter: blur(3px); }
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
        fontWeight: '600',
        color: '#fffff3',
        margin: '0 0 8px 0',
        fontFamily: 'var(--font-zpix), monospace',
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
        fontFamily: 'var(--font-zpix), monospace'
      }}>
        {product.price}
      </div>

      {/* 標籤 */}
      <div style={{
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 243, 0.8)',
        fontFamily: 'var(--font-zpix), monospace',
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
      zIndex: 10000,
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
            fontWeight: 'bold',
            color: '#fffff3',
            margin: '0 0 10px 0',
            fontFamily: 'var(--font-zpix), monospace',
            letterSpacing: '0.05em'
          }}>
            {product.name}
          </h2>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#FF8C00', // 品牌橘色
            marginBottom: '15px',
            fontFamily: 'var(--font-zpix), monospace'
          }}>
            {product.price}
          </div>

          <div style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 243, 0.8)',
            fontFamily: 'var(--font-zpix), monospace',
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
              fontWeight: '600',
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
              fontWeight: '600',
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
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 62, 195, 0.3)',
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

        {/* 頭貼 */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto 30px auto',
          background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.2), rgba(74, 144, 226, 0.2))',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 62, 195, 0.3)'
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
          fontWeight: 'bold',
          color: '#fffff3',
          margin: '0 0 20px 0',
          fontFamily: 'var(--font-zpix), monospace',
          letterSpacing: '0.05em'
        }}>
          Liam
        </h2>

        {/* 介紹 */}
        <div style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 243, 0.9)',
          lineHeight: '1.6',
          margin: '0 0 30px 0',
          fontFamily: 'var(--font-zpix), monospace',
          letterSpacing: '0.02em'
        }}>
          <p style={{ margin: '0 0 15px 0' }}>
            你好！我是 Liam，一名熱愛設計的創作者。
          </p>
          <p style={{ margin: '0 0 15px 0' }}>
            專注於品牌設計、視覺識別與數位體驗設計，
            相信好的設計能夠傳達情感，創造價值。
          </p>
          <p style={{ margin: '0' }}>
            歡迎來到我的作品集，希望你能在這裡找到靈感！
          </p>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          style={{
            background: '#003EC3',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
            fontFamily: 'var(--font-zpix), monospace'
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
      padding: '20px'
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
                  fontWeight: '600',
                  color: '#fffff3',
                  marginBottom: '5px',
                  fontFamily: 'var(--font-zpix), monospace'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#FF8C00', // 品牌橘色
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-zpix), monospace'
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
              fontWeight: 'bold',
              color: '#fffff3',
              fontFamily: 'var(--font-zpix), monospace'
            }}>
              總計
            </span>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#FF8C00', // 品牌橘色
              fontFamily: 'var(--font-zpix), monospace'
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // 當切換圖片時重置狀態
  useEffect(() => {
    setImageLoaded(false);
    setImageDimensions({ width: 0, height: 0 });
  }, [currentImageIndex]);

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

  // 處理圖片載入完成
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  // 計算動態高度
  const calculateImageHeight = () => {
    if (!imageLoaded || imageDimensions.width === 0) {
      return '60vh'; // 預設高度
    }
    
    const aspectRatio = imageDimensions.height / imageDimensions.width;
    const maxWidth = Math.min(window.innerWidth * 0.8, 1200); // 最大寬度
    const calculatedHeight = maxWidth * aspectRatio;
    const maxHeight = window.innerHeight * 0.85; // 最大高度限制
    
    return `${Math.min(calculatedHeight, maxHeight)}px`;
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-4xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
        style={{ 
          maxHeight: '95vh',
          height: imageLoaded ? 'auto' : '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <div className="flex justify-end p-4 absolute top-0 right-0 z-10">
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300 border border-white/30"
          >
            ✕
          </button>
        </div>

        {/* 上方：照片輪播區域 - 動態高度 */}
        <div 
          className="relative bg-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center"
          style={{ 
            height: calculateImageHeight(),
            minHeight: '40vh',
            maxHeight: '70vh'
          }}
        >
          <img
            src={project.galleryImages[currentImageIndex] || project.image}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onLoad={handleImageLoad}
          />
        </div>

        {/* 下方：所有文字資訊和控制元件 */}
        <div className="bg-black/20 backdrop-blur-sm p-4 space-y-3">
          {/* 專案標題和描述 */}
          <div>
            <h2 className="text-lg font-bold text-white mb-1">{project.title}</h2>
            <p className="text-white/80 text-sm mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 輪播控制 */}
          <div className="space-y-2">
            {/* 進度條控制 */}
            <div className="flex items-center gap-3">
              {/* 上一張按鈕 */}
              <button
                onClick={prevImage}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-2 py-1 rounded text-xs border border-white/30 transition-all duration-300"
              >
                ← 上一張
              </button>
              
              {/* 進度條 */}
              <div className="flex-1">
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-300 h-1.5 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((currentImageIndex + 1) / project.galleryImages.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/70">
                  <span>{currentImageIndex + 1}</span>
                  <span>{project.galleryImages.length}</span>
                </div>
              </div>
              
              {/* 下一張按鈕 */}
              <button
                onClick={nextImage}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-2 py-1 rounded text-xs border border-white/30 transition-all duration-300"
              >
                下一張 →
              </button>
            </div>
            
            {/* 縮圖 */}
            <div className="flex gap-1 justify-center">
              {project.galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-8 h-8 rounded overflow-hidden border transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'border-white ring-1 ring-white/50'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <img
                    src={image || project.image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 專案詳情 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">專案詳情</h3>
            <p className="text-white/80 text-xs leading-relaxed">{project.detailedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 設計日記元件 - 現代數位風格
const DesignDiary: React.FC<{
  entries: DiaryEntry[];
}> = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'transparent',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
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
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10, padding: '4rem 2rem' }}>
        {/* 標題區域 - 與 PROJECTS 區塊相同樣式 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          zIndex: 11
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.05em'
          }}>
            DESIGN DIARY
          </h1>
        </div>

        {/* 日記列表 - 橫向滾動容器 */}
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: '4rem',
          maxWidth: '900px',
          margin: '0 auto 4rem auto'
        }}>
          {/* 滾動容器 */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              gap: '2rem',
              padding: '2rem 1rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0, 62, 195, 0.3) transparent',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: '-ms-autohiding-scrollbar'
            }}
          >
            {entries.map((entry, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={entry.id}
                  className="diary-card"
                  onClick={() => setSelectedEntry(entry)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    border: '10px solid #353535',
                    borderRadius: '24px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-zpix), monospace',
                    scrollSnapAlign: 'start',
                    transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered 
                      ? '0 8px 20px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(0, 0, 0, 0.2)'
                      : '0 2px 12px rgba(0, 0, 0, 0.6)',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 5,
                    backgroundColor: '#FCFBE4'
                  }}
                >
                  {/* 背景圖片 */}
                  {entry.backgroundImage && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      bottom: '10px',
                      backgroundImage: `url(${entry.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '14px',
                      zIndex: 0
                    }} />
                  )}
                  
                  {/* 毛玻璃遮罩層 */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    right: '10px',
                    bottom: '10px',
                    background: '#FCFBE4',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '14px',
                    zIndex: 1,
                    transition: 'all 0.4s ease'
                  }} />
                  {/* 有機形狀裝飾 - 示意圖風格 */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-30%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(0, 62, 195, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease',
                    zIndex: 1
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-40%',
                    left: '-20%',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(0, 62, 195, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(35px)',
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease',
                    zIndex: 1
                  }} />
                  
                  {/* 發光邊框效果 */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    right: '10px',
                    bottom: '10px',
                    borderRadius: '14px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.3), rgba(0, 62, 195, 0.05))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    opacity: isHovered ? 0.6 : 0.3,
                    transition: 'opacity 0.4s ease',
                    zIndex: 1
                  }} />
                  
                  {/* 內容區域 */}
                  <div style={{ 
                    position: 'relative', 
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* 頂部：日期 */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        fontFamily: 'var(--font-zpix), monospace',
                        fontWeight: 'normal'
                      }}>
                        {entry.date}
                      </span>
                    </div>

                 {/* 標題 */}
                 <h3 style={{
                   fontSize: '1.75rem',
                   fontWeight: 'bold',
                   color: '#353535',
                   marginBottom: '1rem',
                   fontFamily: 'var(--font-zpix), monospace',
                   lineHeight: '1.4',
                   transition: 'color 0.3s ease'
                 }}>
                   {entry.title}
                 </h3>

                {/* 內容預覽 */}
                <p style={{
                  color: '#666',
                  fontSize: '0.9375rem',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                }}>
                  {entry.content}
                </p>

                 {/* 標籤 - 完整顯示 */}
                 {entry.tags && entry.tags.length > 0 && (
                   <div style={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     gap: '0.5rem',
                     marginBottom: '1.5rem',
                     paddingBottom: '1.5rem',
                     borderBottom: '1px solid rgba(0, 62, 195, 0.1)'
                   }}>
                     {entry.tags.map((tag, tagIndex) => (
                       <span
                         key={tagIndex}
                         style={{
                           padding: '0.375rem 0.875rem',
                           background: 'rgba(0, 62, 195, 0.1)',
                           color: '#003EC3',
                           borderRadius: '20px',
                           fontSize: '0.75rem',
                           fontFamily: 'var(--font-zpix), monospace',
                           fontWeight: 'bold',
                           transition: 'all 0.2s ease'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.background = '#003EC3';
                           e.currentTarget.style.color = '#FFFFF3';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
                           e.currentTarget.style.color = '#003EC3';
                         }}
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                 )}

                 {/* 閱讀更多按鈕 - 置中最下層 */}
                 <div style={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   marginTop: 'auto'
                 }}>
                   <button
                     style={{
                       background: '#003EC3',
                       color: '#FFFFF3',
                       fontSize: '1.3125rem',
                       fontFamily: 'var(--font-zpix), monospace',
                       fontWeight: 'bold',
                       padding: '0.9375rem 1.875rem',
                       borderRadius: '8px',
                       border: 'none',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '0.75rem',
                       boxShadow: '0 4px 12px rgba(0, 62, 195, 0.3)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#0052CC';
                       e.currentTarget.style.transform = 'translateX(4px)';
                       e.currentTarget.style.gap = '1.125rem';
                       e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 62, 195, 0.4)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#003EC3';
                       e.currentTarget.style.transform = 'translateX(0)';
                       e.currentTarget.style.gap = '0.75rem';
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 62, 195, 0.3)';
                     }}
                     onClick={(e) => {
                       e.stopPropagation();
                       setSelectedEntry(entry);
                     }}
                   >
                     閱讀更多 ⟶
                   </button>
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
              }
            }
            
            /* 平板裝置：一次2張 */
            @media (min-width: 769px) and (max-width: 1024px) {
              .diary-card {
                flex: 0 0 calc(50% - 1rem) !important;
                min-width: calc(50% - 1rem) !important;
                max-width: calc(50% - 1rem) !important;
                width: calc(50% - 1rem) !important;
              }
            }
            
            /* 桌面裝置：一次3張 */
            @media (min-width: 1025px) {
              .diary-card {
                flex: 0 0 calc(33.333% - 1.33rem) !important;
                min-width: calc(33.333% - 1.33rem) !important;
                max-width: calc(33.333% - 1.33rem) !important;
                width: calc(33.333% - 1.33rem) !important;
              }
            }
          `}</style>
        </div>
        {/* 詳細視窗 - 溫暖親民風格 */}
        {selectedEntry && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setSelectedEntry(null)}
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
                border: '10px solid #353535',
                borderRadius: '24px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
                maxWidth: '750px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '3rem',
                position: 'relative',
                fontFamily: 'var(--font-zpix), monospace',
                animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 關閉按鈕 - 溫和設計 */}
              <button
                onClick={() => setSelectedEntry(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(0, 62, 195, 0.1)',
                  color: '#003EC3',
                  border: 'none',
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-zpix), monospace',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#003EC3';
                  e.currentTarget.style.color = '#FFFFF3';
                  e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
                  e.currentTarget.style.color = '#003EC3';
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}
              >
                ×
              </button>

              {/* 日記內容 */}
              <div>
                {/* 頂部區塊 - 更親切的排版 */}
                <div style={{
                  marginBottom: '2.5rem',
                  paddingBottom: '2rem',
                  borderBottom: '2px solid rgba(0, 62, 195, 0.15)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#888',
                        fontFamily: 'var(--font-zpix), monospace',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          background: '#003EC3',
                          borderRadius: '50%',
                          display: 'inline-block'
                        }} />
                        {selectedEntry.date}
                      </div>
                      
                      {/* 專案名稱 */}
                      {selectedEntry.projectName && (
                        <div style={{
                          fontSize: '1rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 62, 195, 0.1)',
                          borderRadius: '8px',
                          display: 'inline-block',
                          border: '1px solid rgba(0, 62, 195, 0.2)'
                        }}>
                          專案：{selectedEntry.projectName}
                        </div>
                      )}

                      <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                        fontWeight: 'bold',
                        color: '#353535',
                        fontFamily: 'var(--font-zpix), monospace',
                        lineHeight: '1.3',
                        marginBottom: '1rem'
                      }}>
                        {selectedEntry.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* 內容區塊 - 更舒適的閱讀體驗 */}
                <div style={{
                  marginBottom: '2.5rem',
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 62, 195, 0.1)'
                }}>
                  <p style={{
                    color: '#444',
                    lineHeight: '2.2',
                    whiteSpace: 'pre-line',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                  }}>
                    {selectedEntry.content}
                  </p>
                </div>

                {/* Part1, Part2, Part3 區塊 */}
                {(selectedEntry.part1 || selectedEntry.part2 || selectedEntry.part3) && (
                  <div style={{
                    marginBottom: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                  }}>
                    {selectedEntry.part1 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 1
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part1}
                        </p>
                      </div>
                    )}

                    {selectedEntry.part2 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 2
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part2}
                        </p>
                      </div>
                    )}

                    {selectedEntry.part3 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 3
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part3}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 標籤區塊 - 圓角設計更有溫度 */}
                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(0, 62, 195, 0.1)'
                  }}>
                    {selectedEntry.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.625rem 1.5rem',
                          background: 'rgba(0, 62, 195, 0.08)',
                          color: '#003EC3',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-zpix), monospace',
                          border: '1px solid rgba(0, 62, 195, 0.2)',
                          transition: 'all 0.2s ease',
                          display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#003EC3';
                          e.currentTarget.style.color = '#FFFFF3';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 62, 195, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 62, 195, 0.08)';
                          e.currentTarget.style.color = '#003EC3';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const speedWheel = reverse ? -0.02 : 0.02; // 反向時速度反轉
  const speedDrag = reverse ? 0.1 : -0.1; // 反向時拖動方向反轉

  // 計算 Z-index
  const getZindex = (array: ProjectItem[], index: number) => 
    array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

  // 計算項目位置
  const displayItems = (item: ProjectItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    let activeValue = (index - activeIndex) / items.length;
    
    // 反向時反轉 activeValue
    if (reverse) {
      activeValue = -activeValue;
    }
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(250px, 35vw, 400px)',
      '--height': 'clamp(350px, 50vw, 500px)',
      '--x': `calc(var(--active) * 400%)`,
      '--y': `0px`,
      '--rot': reverse 
        ? `calc(var(--active) * -60deg)` // 反向時角度也反轉
        : `calc(var(--active) * 60deg)`,
      '--opacity': `calc(var(--zIndex) / var(--items) * 3 - 2)`,
    } as React.CSSProperties;
  };
  
  useEffect(() => {
    const animate = () => {
      const newProgress = Math.max(0, Math.min(progress, 100));
      const newActive = Math.floor(newProgress / 100 * (items.length - 1));
      setActive(newActive);
    };
    animate();
  }, [progress, items.length]);

  // 檢測螢幕尺寸
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 添加事件監聽器
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      // 只在輪播區域內且按住特定鍵時才阻止滾動
      const target = e.target as HTMLElement;
      const isInCarousel = carousel.contains(target);
      
      if (isInCarousel && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const wheelProgress = e.deltaY * speedWheel;
        setProgress(prev => prev + wheelProgress);
      }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const mouseProgress = (clientX - startX) * speedDrag;
      setProgress(prev => prev + mouseProgress);
      setStartX(clientX);
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      setIsDown(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setStartX(clientX);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDown, startX, speedWheel, speedDrag]);

  return (
    <div 
      ref={carouselRef}
      className="relative h-full overflow-hidden font-mono cursor-grab"
      style={{ cursor: isDown ? 'grabbing' : 'grab' }}
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
              opacity: 'var(--opacity)',
            }}
          >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />
            
            {/* 圖片 */}
            <Image 
              src={item.image || "/illustration_1.png"} 
              alt={item.title}
              fill
              className="object-cover"
            />
      
      {/* 標題 */}
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <p className="text-sm opacity-90">{item.description}</p>
      </div>
            
            {/* 編號 */}
            <div className="absolute top-6 left-6 z-20 text-white">
              <span className="text-6xl font-bold opacity-70">
                {String(index + startNumber + 1).padStart(2, '0')}
              </span>
      </div>

            {/* 點擊提示 */}
            <div className="absolute top-6 right-6 z-20 text-white">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                點擊查看
      </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
// 夢幻版 Hero 組件
const DreamyHero = ({ scrollY: propScrollY }: { scrollY: number }) => {
  // 使用傳入的 scrollY prop，不需要內部狀態
  const scrollY = propScrollY || 0;
  
  // 檢測是否為手機裝置
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 計算 Logo 淡入效果 - 在 hero 版面淡入
  const logoOpacity = typeof window !== 'undefined' 
    ? Math.min(1, Math.max(0, scrollY / 300)) // 在滚动前 300px 逐渐淡入
    : 0;

  // 計算視差效果
  const boatY = typeof window !== 'undefined' ? scrollY * 0.5 : 0; // 船隻移動較慢
  const waveY = typeof window !== 'undefined' ? scrollY * 0.8 : 0; // 波浪移動較快
  const starY = typeof window !== 'undefined' ? scrollY * 0.3 : 0; // 星星移動最慢
  
  // 計算船隻縮放效果
  const boatScale = typeof window !== 'undefined' ? Math.max(0.5, 1.0 - scrollY * 0.0005) : 1.0; // 從1.0縮小到0.5
  
  // 計算船隻透明度效果 - 輕微滾動就完全消失
  const boatOpacity = typeof window !== 'undefined' ? (scrollY > 50 ? 0 : 1) : 1; // 滾動超過50px就完全消失
  
  // 計算星星透明度效果 - 與船隻同步消失
  const starOpacity = typeof window !== 'undefined' ? (scrollY > 50 ? 0 : 1) : 1; // 星星也同步完全消失
  
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
      background: '#FFFFF3' // 固定溫暖白背景
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
      {/* 頂部中央 Logo - Hero 版面淡入 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        opacity: logoOpacity,
        transition: 'opacity 0.5s ease-in-out'
      }}>
        <Image 
          src="/cursor-07.png" 
          alt="Liam Design Logo" 
          width={160}
          height={160}
          className="logo-responsive"
          style={{
            width: '160px', // 桌面版大小
            height: '160px',
            objectFit: 'contain'
          }}
        />
      </div>



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

      {/* 中間下方 Scroll 指示器 */}
      <div className="scroll-responsive" style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        color: '#666',
        fontSize: '12px',
        fontFamily: 'var(--font-zpix), monospace',
        letterSpacing: '2px'
      }}>
        <div>SCROLL</div>
        <div style={{
          width: '2px',
          height: '30px',
          background: '#666',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '8px',
            background: '#4A90E2',
            animation: 'scrollIndicator 2s infinite'
          }}></div>
        </div>
      </div>

      {/* 中央區域 - 移除藍色背景 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '60vh',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        {/* 船隻上方標題 - 打字機效果 (桌面版显示，手机版隐藏) */}
        {!isMobile && (
          <div style={{
            position: 'relative',
            zIndex: 30,
            marginBottom: isMobile ? '30px' : '50px',
            opacity: boatOpacity,
            transition: 'opacity 0.1s ease-out'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.65rem, 5.28vw, 2.64rem)', // 放大110%
              fontWeight: 'bold',
              color: '#003EC3',
              fontFamily: 'var(--font-zpix), monospace',
              textAlign: 'center',
              margin: 0,
              letterSpacing: '0.1em',
              minHeight: '1.2em'
            }}>
              <TypewriterText text="Own the Day." speed={150} />
            </h1>
          </div>
        )}

        {/* 中央船隻圖片 - 使用入口頁的船隻和波浪效果 */}
        <div className="boat-container" style={{
          position: 'relative',
          zIndex: 20, // 提高z-index確保在藍色覆蓋層之上
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? 'min(99vw, 462px)' : 'min(77vw, 550px)', // 手机版放大20%：82.5vw * 1.2 = 99vw, 385px * 1.2 = 462px
          height: isMobile ? 'min(66vh, 396px)' : 'min(60.5vh, 440px)', // 手机版放大20%：55vh * 1.2 = 66vh, 330px * 1.2 = 396px
          transform: `translateY(${boatY}px)`,
          opacity: boatOpacity, // 應用透明度效果
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}>
          <div 
            className="boat-with-waves"
            style={{
              '--wave-y': `${waveY}px`,
              transform: `scale(${boatScale})`
            } as React.CSSProperties}
          >
            <Image 
              src="/boat1031.png" 
              alt="Dreamy Boat" 
              width={3541} 
              height={2203} 
              className="boat-img"
              priority
            />
          </div>
        </div>

        {/* 船隻下方標題區域 - 手機版顯示Own the Day和掌握今天 */}
        <div style={{
          position: 'relative',
          zIndex: 30,
          marginTop: isMobile ? '30px' : '50px',
          opacity: boatOpacity,
          transition: 'opacity 0.1s ease-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? '15px' : '0'
        }}>
          {/* 手機版：Own the Day 顯示在掌握今天上方 */}
          {isMobile && (
            <h1 style={{
              fontSize: 'clamp(1.65rem, 5.28vw, 2.64rem)',
              fontWeight: 'bold',
              color: '#003EC3',
              fontFamily: 'var(--font-noto-sans-tc), sans-serif',
              textAlign: 'center',
              margin: 0,
              letterSpacing: '0.1em',
              minHeight: '1.2em'
            }}>
              <TypewriterText text="Own the Day." speed={150} />
            </h1>
          )}
          <h2 style={{
            fontSize: 'clamp(1.188rem, 3.96vw, 1.98rem)', // 放大110%
            fontWeight: 'bold',
            color: '#003EC3',
            fontFamily: 'var(--font-noto-sans-tc), sans-serif',
            textAlign: 'center',
            margin: 0,
            letterSpacing: '0.05em',
            minHeight: '1.2em'
          }}>
            <TypewriterText text="掌握今天，開始設計" speed={200} delay={2000} />
          </h2>
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
              opacity: starOpacity, // 應用透明度效果
              '--star-y': `${starY}px`,
              zIndex: 15, // 確保在藍色覆蓋層之上
              transition: 'opacity 0.1s ease-out'
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
            opacity: starOpacity,
            transition: 'opacity 0.1s ease-out'
          }}></div>

        {/* 太陽裝飾 - Hero區域1顆 */}
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '8%',
          width: '220px',
          height: '220px',
          backgroundImage: 'url(/sun-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: starOpacity,
          zIndex: 11,
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease-out'
        }}></div>

        {/* 雲朵裝飾 - Hero區域3朵 */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '60px',
          height: '60px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 8s ease-in-out infinite',
          opacity: starOpacity,
          zIndex: 12,
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease-out'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '60px',
          height: '60px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 9s ease-in-out infinite',
          animationDelay: '2s',
          opacity: starOpacity,
          zIndex: 12,
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease-out'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '25%',
          width: '60px',
          height: '60px',
          backgroundImage: 'url(/cloud-big.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: 'floatCloud 10s ease-in-out infinite',
          animationDelay: '4s',
          opacity: starOpacity,
          zIndex: 12,
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease-out'
        }}></div>
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
          position: absolute;
          width: min(77vw, 385px); // 桌面版保持原尺寸
          z-index: 2;
          animation: bob 2.6s ease-in-out infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.32); // 桌面版保持原尺寸
          transform-origin: center center;
        }
        
        /* 手機版：圖片放大20% */
        @media (max-width: 768px) {
          .boat-with-waves {
            width: min(92.4vw, 462px); // 手機版放大20%：77vw * 1.2 = 92.4vw, 385px * 1.2 = 462px
            transform: translate(-50%, -50%) scale(1.584); // 手機版放大20%：1.32 * 1.2 = 1.584
          }
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
          transition: transform 0.1s ease-out;
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
          0%, 100% { transform: translate(-50%, -50%) scale(1.32) translateY(0) rotate(0.5deg); } 
          50% { transform: translate(-50%, -50%) scale(1.32) translateY(-3px) rotate(-0.5deg); } 
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
          0% { transform: translateY(-30px); }
          100% { transform: translateY(30px); }
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
            font-size: 11px;
          }
          
          .boat-with-waves { 
            width: min(71.5vw, 330px); // 放大110%：65vw * 1.1 = 71.5vw, 300px * 1.1 = 330px
            transform: translate(-50%, -50%) scale(1.1); // 放大110%：1.0 * 1.1 = 1.1
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
            font-size: 10px;
          }
          
          .boat-with-waves { 
            width: min(92.4vw, 330px); // 手機版放大20%：77vw * 1.2 = 92.4vw, 275px * 1.2 = 330px
            transform: translate(-50%, -50%) scale(1.188); // 手機版放大20%：0.99 * 1.2 = 1.188
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
            font-size: 9px;
          }
          
          .boat-with-waves { 
            width: min(92.4vw, 237.6px); // 手機版放大20%：77vw * 1.2 = 92.4vw, 198px * 1.2 = 237.6px
            transform: translate(-50%, -50%) scale(0.924); // 手機版放大20%：0.77 * 1.2 = 0.924
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
            font-size: 8px;
          }
          
          .boat-with-waves { 
            width: min(92.4vw, 184.8px); // 手機版放大20%：77vw * 1.2 = 92.4vw, 154px * 1.2 = 184.8px
            transform: translate(-50%, -50%) scale(0.792); // 手機版放大20%：0.66 * 1.2 = 0.792
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
  const [progressStep, setProgressStep] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);
  
  // 購物清單狀態管理
  const [cartItems, setCartItems] = useState<ProductItem[]>([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  // 自我介紹狀態管理
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  
  const blueSectionRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  // 輪播組件數據
  const carouselItems: ProjectItem[] = [
    {
      id: 1,
      title: "品牌設計專案",
      description: "完整的品牌識別設計，包含 Logo、色彩系統、應用範例等全方位品牌體驗。",
      image: "/project-cover-01.jpg",
      tags: ["品牌設計", "Logo設計", "視覺識別"],
       galleryImages: [
         "/project-cover-01.jpg",
         "/project-01-01.jpg",
         "/project-01-02.png"
       ],
      detailedDescription: "這是一個完整的品牌設計專案，從品牌定位開始，設計了完整的視覺識別系統。包含 Logo 設計、品牌色彩系統、字體選擇、應用範例等。整個設計過程注重品牌的一致性和可擴展性，確保在不同媒介上都能完美呈現品牌形象。"
    },
    {
      id: 2,
      title: "網頁設計專案",
      description: "現代化的響應式網頁設計，專注於用戶體驗和視覺美學的完美結合。",
      image: "/project-cover-02.jpg",
      tags: ["網頁設計", "響應式設計", "UI/UX"],
      galleryImages: [
        "/project-cover-02.jpg",
        "/project-02-01.png",
        "/project-02-02.jpg"
      ],
      detailedDescription: "響應式網頁設計專案，涵蓋從用戶研究到最終實現的完整流程。我們注重用戶體驗設計，確保網站在不同設備上都能提供優秀的瀏覽體驗。設計過程中我們進行了多輪測試和優化，最終創造出既美觀又實用的網頁設計。"
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "建立完整的品牌識別系統，包含標誌設計和視覺規範。",
      image: "/project-cover-03.jpg",
      tags: ["Logo Design", "Branding", "Identity"],
      galleryImages: [
        "/project-cover-03.jpg",
        "/project-03-01.jpg",
        "/project-03-02.jpg",
        "/project-03-03.jpg",
        "/project-03-04.jpg"
      ],
      detailedDescription: "品牌識別設計專案，從標誌設計到完整的視覺識別系統。我們幫助品牌建立獨特的視覺語言，傳達品牌價值和個性，創造一致的品牌體驗。整個識別系統包含標誌、色彩、字體、應用規範等完整元素。"
    },
    {
      id: 4,
      title: "Web Design",
      description: "創建現代化、響應式的網站設計，專注於用戶體驗和視覺美學。",
      image: "/project-cover-04.jpg",
      tags: ["Web Design", "Responsive", "UX"],
      galleryImages: [
        "/project-cover-04.jpg",
        "/project-04-01.png",
        "/illustration_4.png",
        "/illustration_5.png",
        "/illustration_6.png"
      ],
      detailedDescription: "響應式網站設計專案，確保在桌面、平板和手機上都能提供優秀的瀏覽體驗。我們注重載入速度、用戶導航和視覺層次，創造現代化的網站設計。整個設計過程採用敏捷開發方法，快速迭代和優化。"
    },
    {
      id: 5,
      title: "創意設計專案",
      description: "一個充滿創意的設計專案，展示了獨特的視覺風格和創新的設計理念。",
      image: "/project-cover-05.jpg",
      tags: ["創意設計", "視覺創新", "品牌體驗"],
      galleryImages: [
        "/project-cover-05.jpg",
        "/project-05-01.jpg",
        "/project-05-02.jpg"
      ],
      detailedDescription: "創意設計專案，融合了多種設計元素和創新思維。我們通過獨特的視覺語言和創新的設計方法，創造出令人印象深刻的品牌體驗。這個專案展示了我們在創意設計方面的專業能力和創新精神。"
    },
    {
      id: 6,
      title: "Creative Direction",
      description: "提供創意指導和視覺策略，幫助品牌在市場中脫穎而出。",
      image: "/illustration_6.png",
      tags: ["Creative", "Strategy", "Direction"],
      galleryImages: [
        "/illustration_6.png",
        "/illustration_1.png",
        "/illustration_2.png",
        "/illustration_3.png",
        "/illustration_4.png"
      ],
      detailedDescription: "創意指導專案，提供全方位的視覺策略和創意解決方案。我們幫助品牌建立獨特的視覺語言，創造令人印象深刻的品牌體驗，在競爭激烈的市場中脫穎而出。整個創意過程結合了策略思考和藝術表達。"
    }
  ];

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
      title: '最初的想法',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-01.jpg',
      content: `今天開始思考這個品牌的新視覺方向。客戶想要的是什麼？是溫馨、親近的感覺，還是現代、專業的形象？

走在路上看到咖啡廳的招牌，突然想到...也許可以結合兩者？溫馨但不失專業，親近但保持質感。

腦中開始浮現一些色彩組合：溫暖的咖啡色調、柔和的米白色、點綴一些深綠色...這讓我想起了秋天的午後，坐在窗邊看著街景的感覺。`,
      tags: ['靈感', '色彩', '品牌定位'],
      part1: '與客戶初次會議，了解品牌核心價值與目標受眾。發現客戶希望傳達「溫馨但不失專業」的品牌形象。',
      part2: '開始收集競品分析，觀察市場上類似品牌的視覺呈現方式。注意到大多數品牌都偏向極簡或過於複雜的設計。',
      part3: '第一次靈感迸發：在咖啡廳看到招牌時，突然想到「溫馨但專業」的視覺方向。開始構思色彩系統和設計語言。'
    },
    {
      id: 2,
      date: '2024.01.18',
      title: 'Logo 設計的掙扎',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-02.jpg',
      content: `已經畫了快50個草圖，但總覺得哪裡不對。客戶給的 feedback 是「太複雜了」、「不夠有記憶點」、「感覺跟其他品牌很像」。

重新回到最初的目標：簡單、有溫度、好記。

今天在公園散步時，看到一片葉子落在水面上，葉脈的線條突然給了我靈感。也許...簡化的線條，流動的形態，可以傳達「自然」、「生長」的概念？`,
      tags: ['Logo', '設計過程', '靈感'],
      part1: '開始 Logo 草圖階段，嘗試了各種不同的設計方向：幾何圖形、有機線條、文字標誌等。',
      part2: '客戶回饋指出問題：太複雜、缺乏記憶點、與其他品牌過於相似。需要重新思考設計策略。',
      part3: '在公園散步時獲得靈感：葉子落水的瞬間，葉脈線條呈現的自然流動感。決定採用簡化線條結合流動形態的設計方向。'
    },
    {
      id: 3,
      date: '2024.01.22',
      title: '色彩的選擇',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-03.jpg',
      content: `花了整個下午調色。藍色？太冷。紅色？太強烈。綠色？感覺不夠溫暖。

最後決定採用大地色系：主要色是深咖啡色（#4A2C2A），輔助色是溫暖的米白色（#F5F1E8），點綴色是深綠色（#2D5016）。

這個組合讓我想起在森林小徑散步的感覺，沉穩但不沉重，自然但不隨意。`,
      tags: ['色彩', '品牌識別']
    },
    {
      id: 4,
      date: '2024.01.25',
      title: '字體的選擇很重要',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-04.jpg',
      content: `選擇字體總是讓人頭痛。襯線字體？無襯線字體？

考慮到品牌想要傳達的「專業但親近」，我選擇了無襯線字體作為主字體，但在標題和強調處使用帶有手寫感的字體。

這就像是在正式場合穿一件剪裁合身的西裝，但領子上別了一枚有故事的別針——既專業又有人味。`,
      tags: ['字體', '品牌識別']
    },
    {
      id: 5,
      date: '2024.02.01',
      title: '第一次提案',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-05.jpg',
      content: `今天向客戶提案了。有點緊張，但更多的是興奮。

看到他們眼中的認同，我知道方向對了。雖然還有一些細節需要調整，但整體概念得到了肯定。

在回家的路上，我一直在想：設計不只是做出「好看的東西」，而是要做出「對的東西」——能解決問題、能打動人心的東西。`,
      tags: ['提案', '反思']
    },
    {
      id: 6,
      date: '2024.02.05',
      title: '細節的堅持',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/illustration_1.png',
      content: `客戶問：「這個小細節有人會注意嗎？」
我回答：「也許不會直接注意到，但會感受到。」
就像好的咖啡，你不會注意到每一粒咖啡豆，但會感受到整體的層次和風味。設計也是這樣，每個細節累積起來，創造出整體的質感和體驗。
今天調整了 spacing、字距、陰影...這些看似微小的事情，但正是它們決定了設計的品質。`,
      tags: ['細節', '質感', '設計哲學']
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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

  // 載入動畫邏輯
  useEffect(() => {
    // 進度條動畫
    const progressInterval = setInterval(() => {
      setProgressStep(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoadingPhase('ready'); // 載入完成，顯示按鈕
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

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
    { id: 'projects', name: 'Projects', nameZh: '專案' },
    { id: 'support', name: 'Support', nameZh: '支持' },
    { id: 'contact', name: 'Contact', nameZh: '聯繫' }
  ];

  // 滾動偵測 - 判斷當前區塊
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const windowHeight = window.innerHeight;
    
    let newSection = 0;
    if (scrollY < windowHeight * 0.5) {
      newSection = 0; // Hero
    } else if (scrollY < windowHeight + blueSectionHeight * 0.5) {
      newSection = 1; // Portfolio
    } else if (scrollY < windowHeight + blueSectionHeight + darkSectionHeight * 0.5) {
      newSection = 2; // Projects
    } else if (scrollY < windowHeight + blueSectionHeight + darkSectionHeight + supportSectionHeight * 0.5) {
      newSection = 3; // Support
    } else {
      newSection = 4; // Contact
    }
    
    setCurrentSection(newSection);
  }, [scrollY, blueSectionHeight, darkSectionHeight, supportSectionHeight]);

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
      darkSectionHeight: darkSectionHeight
    };

    return <DreamyHero {...props} />;
  };
  return (
    <>
      {/* 載入頁面 */}
      {!showMainContent && (
        <LoadingPage 
          loadingPhase={loadingPhase}
          progressStep={progressStep}
          onEnterMainContent={handleEnterMainContent}
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
      `}</style>

      {/* 手機版漢堡選單 */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001
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
                    fontFamily: 'var(--font-zpix), monospace',
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
        zIndex: 1000,
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
                // 平滑滾動到對應區塊
                const windowHeight = window.innerHeight;
                let targetScroll = 0;
                
                switch (index) {
                  case 0: // Hero
                    targetScroll = 0;
                    break;
                  case 1: // Portfolio
                    targetScroll = windowHeight;
                    break;
                  case 2: // Projects
                    targetScroll = windowHeight + blueSectionHeight;
                    break;
                  case 3: // Support
                    targetScroll = windowHeight + blueSectionHeight + darkSectionHeight;
                    break;
                  case 4: // Contact
                    targetScroll = windowHeight + blueSectionHeight + darkSectionHeight + supportSectionHeight;
                    break;
                }
                
                window.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth'
                });
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = isActive ? '#003EC3' : '#FF8603';
                }
              }}
              onMouseLeave={(e) => {
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
                  opacity: isActive ? 1 : 0,
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
        zIndex: 1000,
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease, opacity 0.5s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        opacity: navOpacity,
        pointerEvents: navOpacity > 0 ? 'auto' : 'none'
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
        zIndex: 1000,
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
        zIndex: 1000,
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
        zIndex: 1000,
        background: 'rgba(0, 62, 195, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
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
            width: '80px',
            height: '80px',
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
      {/* 純藍色背景區域 - 基於內容動態調整高度 */}
      <div 
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
          zIndex: 15 // 提高z-index確保在深色覆蓋層之上
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.05em'
          }}>
            PROJECTS
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8F4FD',
            margin: '0',
            fontWeight: '300',
            letterSpacing: '0.1em'
          }}>
            Explore My Latest Works
          </p>
        </div>

        {/* 3D 輪播組件 */}
        <div style={{
          width: '100%',
          height: '80vh',
            position: 'relative',
          zIndex: 10
        }}>
          <Carousel3D items={carouselItems} onItemClick={handleProjectClick} />
          
          {/* 操作提示 */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontFamily: 'var(--font-zpix), monospace',
            zIndex: 20,
            display: isMobile ? 'none' : 'block'
          }}>
            按住 Ctrl/Cmd + 滾輪切換作品 • 點擊卡片查看詳情
            </div>
        </div>

        {/* 第二個 3D 輪播組件 - 從右到左 */}
        <div style={{
          width: '100%',
          height: '80vh',
          position: 'relative',
          zIndex: 10,
          marginTop: '40px'
        }}>
          <Carousel3D items={carouselItems} onItemClick={handleProjectClick} reverse={true} startNumber={6} />
          
          {/* 操作提示 */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontFamily: 'var(--font-zpix), monospace',
            zIndex: 20,
            display: isMobile ? 'none' : 'block'
          }}>
            按住 Ctrl/Cmd + 滾輪切換作品 • 點擊卡片查看詳情
          </div>
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

        {/* #353535 色塊覆蓋層 - 從底部往上覆蓋藍色區域（置底以免遮擋下一區塊） */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${darkCoverHeight}px`,
          backgroundColor: '#353535',
          zIndex: 0,
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 設計日記區域 - 深色背景並向上覆蓋藍色區域 */}
      <div style={{
        position: 'relative',
        backgroundColor: '#353535',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {/* 雲朵裝飾 - DESIGN DIARY區域1朵 */}
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
        {/* 深色色塊覆蓋層（取消覆蓋效果） */}
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          width: '100%',
          height: 0,
          backgroundColor: '#353535',
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
          <DesignDiary entries={diaryEntries} />
        </div>
      </div>

      {/* 深色區域 - 包含星星和內容 */}
      <div 
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

        {/* 深色區域標題 */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '-60px' : '2px',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.05em'
          }}>
            OUR SERVICES
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8E8E8',
            margin: '0',
            fontWeight: '300',
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
          marginTop: isMobile ? '56px' : '24px',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 9,
          minHeight: '300px', // 確保有足夠空間顯示插畫
          padding: isMobile ? '0 10px' : '0' // 手機版留一點邊距
        }}>
          {[
            { step: 1, src: '/service-1.png', alt: 'Step 1 Illustration' },
            { step: 2, src: '/illustration_2.png', alt: 'Step 2 Illustration' },
            { step: 3, src: '/illustration_3.png', alt: 'Step 3 Illustration' },
            { step: 4, src: '/illustration_4.png', alt: 'Step 4 Illustration' },
            { step: 5, src: '/illustration_5.png', alt: 'Step 5 Illustration' }
          ].map((item) => (
            <img
              key={`svc-illu-inline-${item.step}`}
              src={item.src}
              alt={item.alt}
              style={{
                position: 'absolute',
                width: isMobile ? 'calc(100vw - 20px)' : 'min(528px, 42vw)',
                maxWidth: isMobile ? 'none' : 'min(528px, 42vw)',
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
                left: '50%'
              }}
            />
          ))}
        </div>

        {/* 進度條區域 */}
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          marginTop: '60px',
          position: 'relative',
          zIndex: 10
        }}>
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
                    backgroundColor: selectedStep === item.step ? '#003EC3' : 'rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    border: selectedStep === item.step ? '3px solid #003EC3' : '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: selectedStep === item.step ? '0 0 25px rgba(0, 62, 195, 0.8)' : 'none',
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
                    <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>✓</span>
                  ) : (
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '16px', fontWeight: 'bold' }}>
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
            zIndex: 10000,
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
            zIndex: 10000,
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
      <div ref={contactSectionRef} style={{
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
            letterSpacing: '0.05em'
          }}>
            CONTACT
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#FFFFFF',
            margin: '0',
            fontWeight: '300',
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
          maxWidth: '600px',
          position: 'relative',
          zIndex: 100
        }}>
          <p style={{
            color: '#FFFFFF',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '40px'
          }}>
            準備好開始你的下一個項目了嗎？讓我們一起創造令人驚艷的設計作品。
          </p>
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
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
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
              backgroundColor: 'rgba(0, 62, 195, 0.1)',
              color: '#003EC3',
              border: '2px solid #003EC3',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#003EC3';
              e.currentTarget.style.color = '#FFFFF3';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 62, 195, 0.1)';
              e.currentTarget.style.color = '#003EC3';
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
                fontFamily: 'var(--font-zpix), monospace',
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
            fontFamily: 'var(--font-zpix), monospace'
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