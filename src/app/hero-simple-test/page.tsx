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

// 彈出式視窗組件
const ProjectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-all duration-300 border border-white/30"
          >
            ✕
          </button>
        </div>

        {/* 標題 */}
        <div className="px-4 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-white/80 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 圖片區域 */}
        <div className="px-4 pb-4">
          <div className="relative mb-4">
            <div className="relative h-64 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
              <Image
                src={project.galleryImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 進度條控制 */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              {/* 上一張按鈕 */}
              <button
                onClick={prevImage}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm border border-white/30"
              >
                ← 上一張
              </button>
              
              {/* 進度條 */}
              <div className="flex-1">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full transition-all duration-300"
          style={{ 
                      width: `${((currentImageIndex + 1) / project.galleryImages.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/70">
                  <span>1</span>
                  <span>{project.galleryImages.length}</span>
                </div>
              </div>
              
              {/* 下一張按鈕 */}
              <button
                onClick={nextImage}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm border border-white/30"
              >
                下一張 →
              </button>
            </div>
    </div>
    
          {/* 縮圖 */}
          <div className="flex gap-2 justify-center">
            {project.galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'border-white ring-2 ring-white/50'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
      <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
    </div>
      </div>
      
        {/* 詳細描述 */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold text-white mb-3">專案詳情</h3>
          <p className="text-white/80 leading-relaxed">{project.detailedDescription}</p>
      </div>
      </div>
    </div>
  );
};

// 3D 輪播組件
const Carousel3D: React.FC<{
  items: ProjectItem[];
  onItemClick: (item: ProjectItem) => void;
}> = ({ items, onItemClick }) => {
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // 計算 Z-index
  const getZindex = (array: ProjectItem[], index: number) => 
    array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

  // 計算項目位置
  const displayItems = (item: ProjectItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    const activeValue = (index - activeIndex) / items.length;
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(250px, 35vw, 400px)',
      '--height': 'clamp(350px, 50vw, 500px)',
      '--x': `calc(var(--active) * 400%)`,
      '--y': `0px`,
      '--rot': `calc(var(--active) * 60deg)`,
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
              src={item.image} 
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
                {String(index + 1).padStart(2, '0')}
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
      {/* 頂部中央 Logo */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20
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
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        {/* 中央船隻圖片 - 使用入口頁的船隻和波浪效果 */}
        <div className="boat-container" style={{
          position: 'relative',
          zIndex: 20, // 提高z-index確保在藍色覆蓋層之上
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'min(90vw, 600px)',
          height: 'min(70vh, 450px)',
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
            <Image src="/boat.png" alt="Dreamy Boat" width={400} height={300} className="boat-img" />
          </div>
        </div>

        {/* 星星裝飾 - 原有3顆 */}
        <div 
          className="star-parallax"
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '20px',
            height: '20px',
            background: '#FFD700',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
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
          width: '15px',
          height: '15px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 2.5s infinite',
          opacity: starOpacity,
          transition: 'opacity 0.1s ease-out'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '30%',
          width: '12px',
          height: '12px',
          background: '#FFD700',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'twinkle 1.8s infinite',
          opacity: starOpacity,
          transition: 'opacity 0.1s ease-out'
        }}></div>

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
          width: min(80vw, 400px); // 船隻寬度控制在波浪的80%內
          z-index: 2;
          animation: bob 2.6s ease-in-out infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.8); // 進一步放大 (1.44 * 1.25 = 1.8)
          transform-origin: center center;
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
        }
        
        @keyframes bob { 
          0%, 100% { transform: translate(-50%, -50%) scale(1.8) translateY(0) rotate(0.5deg); } 
          50% { transform: translate(-50%, -50%) scale(1.8) translateY(-3px) rotate(-0.5deg); } 
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
            width: min(80vw, 360px); // 船隻寬度控制在波浪的80%內
            transform: translate(-50%, -50%) scale(1.6);
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
            width: min(80vw, 280px); // 船隻寬度控制在波浪的80%內
            transform: translate(-50%, -50%) scale(1.0); // 手機橫向大幅縮小船隻
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
            width: min(80vw, 200px); // 船隻寬度控制在波浪的80%內
            transform: translate(-50%, -50%) scale(0.8); // 手機直向進一步縮小船隻
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
            width: min(80vw, 160px); // 船隻寬度控制在波浪的80%內
            transform: translate(-50%, -50%) scale(0.6); // 超小螢幕大幅縮小船隻
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
      `}</style>
    </div>
  );
};

export default function HeroSimpleTest() {
  const [scrollY, setScrollY] = useState(0);
  const [blueSectionHeight, setBlueSectionHeight] = useState(1200); // 預設高度
  const [darkSectionHeight, setDarkSectionHeight] = useState(1000); // 深色區塊高度
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(1);
  const blueSectionRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);

  // 輪播組件數據
  const carouselItems: ProjectItem[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "設計現代化的電商平台，提供流暢的購物體驗和直觀的用戶界面。",
      image: "/illustration_1.png",
      tags: ["React", "TypeScript", "E-commerce"],
      galleryImages: [
        "/illustration_1.png",
        "/illustration_2.png",
        "/illustration_3.png",
        "/illustration_4.png",
        "/illustration_5.png"
      ],
      detailedDescription: "這是一個完整的電商平台設計專案，專注於創造直觀的用戶體驗。我們從用戶研究開始，設計了完整的購物流程，包括商品瀏覽、購物車管理、結帳流程等。整個設計系統採用現代化的視覺語言，確保在不同設備上都能提供優秀的用戶體驗。"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "創建直觀的移動應用界面，專注於用戶體驗和視覺設計。",
      image: "/illustration_2.png",
      tags: ["Figma", "Prototyping", "Mobile"],
      galleryImages: [
        "/illustration_2.png",
        "/illustration_3.png",
        "/illustration_4.png",
        "/illustration_5.png",
        "/illustration_6.png"
      ],
      detailedDescription: "移動應用設計專案，涵蓋從概念到最終產品的完整設計流程。我們注重觸控體驗和視覺層次，確保應用在各種設備上都能提供優秀的用戶體驗。設計過程中我們進行了多輪用戶測試，不斷優化交互細節。"
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "建立完整的品牌識別系統，包含標誌設計和視覺規範。",
      image: "/illustration_3.png",
      tags: ["Logo Design", "Branding", "Identity"],
      galleryImages: [
        "/illustration_3.png",
        "/illustration_4.png",
        "/illustration_5.png",
        "/illustration_6.png",
        "/illustration_1.png"
      ],
      detailedDescription: "品牌識別設計專案，從標誌設計到完整的視覺識別系統。我們幫助品牌建立獨特的視覺語言，傳達品牌價值和個性，創造一致的品牌體驗。整個識別系統包含標誌、色彩、字體、應用規範等完整元素。"
    },
    {
      id: 4,
      title: "Web Design",
      description: "創建現代化、響應式的網站設計，專注於用戶體驗和視覺美學。",
      image: "/illustration_4.png",
      tags: ["Web Design", "Responsive", "UX"],
      galleryImages: [
        "/illustration_4.png",
        "/illustration_5.png",
        "/illustration_6.png",
        "/illustration_1.png",
        "/illustration_2.png"
      ],
      detailedDescription: "響應式網站設計專案，確保在桌面、平板和手機上都能提供優秀的瀏覽體驗。我們注重載入速度、用戶導航和視覺層次，創造現代化的網站設計。整個設計過程採用敏捷開發方法，快速迭代和優化。"
    },
    {
      id: 5,
      title: "UI/UX Design",
      description: "設計直觀的用戶界面，提升產品可用性和用戶滿意度。",
      image: "/illustration_5.png",
      tags: ["UI/UX", "Design System", "Prototyping"],
      galleryImages: [
        "/illustration_5.png",
        "/illustration_6.png",
        "/illustration_1.png",
        "/illustration_2.png",
        "/illustration_3.png"
      ],
      detailedDescription: "UI/UX 設計專案，專注於用戶研究和體驗優化。我們通過用戶測試和迭代設計，創造直觀易用的界面，提升產品的使用效率和用戶滿意度。設計系統確保了整個產品的一致性和可維護性。"
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

  useEffect(() => {
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

  // 區塊數據
  const sections = [
    { id: 'hero', name: 'Hero', nameZh: '首頁' },
    { id: 'portfolio', name: 'Portfolio', nameZh: '作品' },
    { id: 'projects', name: 'Projects', nameZh: '專案' },
    { id: 'contact', name: 'Contact', nameZh: '聯繫' }
  ];

  // 滾動偵測 - 判斷當前區塊
  useEffect(() => {
    const windowHeight = window.innerHeight;
    
    let newSection = 0;
    if (scrollY < windowHeight * 0.5) {
      newSection = 0; // Hero
    } else if (scrollY < windowHeight + blueSectionHeight * 0.5) {
      newSection = 1; // Portfolio
    } else if (scrollY < windowHeight + blueSectionHeight + darkSectionHeight * 0.5) {
      newSection = 2; // Projects
    } else {
      newSection = 3; // Contact
    }
    
    setCurrentSection(newSection);
  }, [scrollY, blueSectionHeight, darkSectionHeight]);

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
    const measureHeight = () => {
      if (blueSectionRef.current) {
        const height = blueSectionRef.current.scrollHeight;
        setBlueSectionHeight(height);
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
    const measureDarkHeight = () => {
      if (darkSectionRef.current) {
        const height = darkSectionRef.current.scrollHeight;
        setDarkSectionHeight(height);
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

  // 計算 #353535 色塊覆蓋效果 - 基於藍色區域底部觸發
  const darkCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - blueSectionHeight) * 1.2, 
        window.innerHeight
      ))
    : 0; // 深色色塊高度

  // 計算第二個藍色區塊覆蓋效果 - 基於深色區域底部觸發
  const secondBlueCoverHeight = typeof window !== 'undefined' 
    ? Math.max(0, Math.min(
        (scrollY - (blueSectionHeight + darkSectionHeight)) * 1.2, 
        window.innerHeight
      ))
    : 0; // 第二個藍色區塊覆蓋高度

  // 調試信息（開發時使用）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🔵 第一個藍色區域高度:', blueSectionHeight, 'px');
      console.log('🌑 深色區域高度:', darkSectionHeight, 'px');
      console.log('📱 螢幕高度:', window.innerHeight, 'px');
      console.log('🎯 深色覆蓋觸發點:', blueSectionHeight, 'px');
      console.log('🎯 第二個藍色覆蓋觸發點:', blueSectionHeight + darkSectionHeight, 'px');
      console.log('📊 當前滾動位置:', scrollY, 'px');
      console.log('🌑 深色覆蓋高度:', darkCoverHeight, 'px');
      console.log('🔵 第二個藍色覆蓋高度:', secondBlueCoverHeight, 'px');
    }
  }, [blueSectionHeight, darkSectionHeight, scrollY, darkCoverHeight, secondBlueCoverHeight]);

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

      {/* Stepper 導覽組件 - 只在桌面版顯示 */}
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
        border: isMobile ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,62,195,0.2)'
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
                  case 3: // Contact
                    targetScroll = windowHeight + blueSectionHeight + darkSectionHeight;
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

      {/* 左上角經緯度標記 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}>
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
      </div>

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

        {/* 裝飾性元素 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '30px',
          height: '30px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 12,
          opacity: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '18px',
          height: '18px',
          background: '#FFFFFF',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 12,
          opacity: 1
        }}>        </div>

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

        {/* #353535 色塊覆蓋層 - 從底部往上覆蓋藍色區域 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${darkCoverHeight}px`,
          backgroundColor: '#353535', // 使用 backgroundColor 而不是 background
          zIndex: 2, // 在藍色背景之上
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 深色區域 - 包含星星和內容 */}
      <div 
        ref={darkSectionRef}
        style={{
          minHeight: '100vh',
          backgroundColor: '#353535',
          position: 'relative',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
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
          zIndex: 15
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

        {/* 進度條區域 */}
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          marginTop: '60px',
          zIndex: 15
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
          <div style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
              width: selectedStep === 1 ? '33%' : selectedStep === 2 ? '66%' : selectedStep === 3 ? '100%' : '66%',
              background: 'linear-gradient(90deg, #4A90E2, #7BB3F0, #A8D0F0)',
              borderRadius: '10px',
              transition: 'width 0.5s ease-in-out',
              boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)'
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
              { step: 1, label: '討論發想', status: 'completed', subtitle: '從理解開始，讓想法慢慢長出形狀。', content: '從對話開始，了解你的故事與期待。\n我們一起找出品牌最真實的樣子，\n慢慢描出第一條線。' },
              { step: 2, label: '設計插畫', status: 'completed', subtitle: '用線條和色彩，讓故事開始呼吸。', content: '把概念轉化成畫面，\n讓品牌的語氣與溫度被看見。\n每一筆，都是為了更靠近你的想像。' },
              { step: 3, label: '落地執行', status: 'in-progress', subtitle: '讓設計真正走進生活。', content: '從印刷到社群、從線上到現場，\n我們陪你完成最後一步，\n讓每一份設計都被感受到。' }
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
                    backgroundColor: selectedStep === item.step ? '#4A90E2' : 
                                    item.status === 'completed' ? '#4A90E2' : 
                                    item.status === 'in-progress' ? '#7BB3F0' : 'rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    border: selectedStep === item.step ? '3px solid #4A90E2' : 
                           item.status === 'completed' ? '3px solid #4A90E2' : 
                           item.status === 'in-progress' ? '3px solid #7BB3F0' : '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: selectedStep === item.step ? '0 0 25px rgba(74, 144, 226, 0.8)' :
                              item.status === 'completed' ? '0 0 15px rgba(74, 144, 226, 0.5)' :
                              item.status === 'in-progress' ? '0 0 15px rgba(123, 179, 240, 0.5)' : 'none',
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
                  ) : item.status === 'in-progress' ? (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      animation: 'pulse 2s infinite'
                    }} />
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

          {/* 內嵌內容區域 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            transform: 'perspective(1000px) rotateX(5deg)',
            animation: 'slideInUp 0.6s ease-out',
            minHeight: '300px',
            marginTop: '40px',
            transition: 'all 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
          }}>

            {/* 內容顯示 */}
            {(() => {
              const stepDataArray = [
                { step: 1, label: '討論發想', subtitle: '從理解開始，讓想法慢慢長出形狀。', content: '從對話開始，了解你的故事與期待。\n我們一起找出品牌最真實的樣子，\n慢慢描出第一條線。' },
                { step: 2, label: '設計插畫', subtitle: '用線條和色彩，讓故事開始呼吸。', content: '把概念轉化成畫面，\n讓品牌的語氣與溫度被看見。\n每一筆，都是為了更靠近你的想像。' },
                { step: 3, label: '落地執行', subtitle: '讓設計真正走進生活。', content: '從印刷到社群、從線上到現場，\n我們陪你完成最後一步，\n讓每一份設計都被感受到。' }
              ];
              const stepData = stepDataArray.find(item => item.step === selectedStep) || stepDataArray[0]; // 預設顯示第一個

                  return (
                    <div style={{ position: 'relative', zIndex: 10 }}>
                      {/* 標題 */}
                      <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        margin: '0 0 20px 0',
                        textAlign: 'center',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                        fontFamily: 'var(--font-zpix), monospace',
                        animation: 'slideInDown 0.8s ease-out'
                      }}>
                        {stepData.label}
                      </h2>

                      {/* 副標題 */}
                      <h3 style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                        fontWeight: '300',
                        color: '#E8E8E8',
                        margin: '0 0 30px 0',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        lineHeight: '1.4',
                        animation: 'fadeInUp 1s ease-out 0.2s both'
                      }}>
                        {stepData.subtitle}
                      </h3>

                      {/* 內容 */}
                      <div style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        color: '#FFFFFF',
                        lineHeight: '1.8',
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                        fontFamily: 'var(--font-zpix), monospace',
                        animation: 'fadeInUp 1s ease-out 0.4s both',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}>
                        {stepData.content}
                      </div>
                    </div>
                  );
            })()}
          </div>
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
            zIndex: 2000,
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
            zIndex: 2000,
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

        {/* 第二個藍色區塊覆蓋層 - 在深色區塊底部上緣 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${secondBlueCoverHeight}px`,
          backgroundColor: '#003EC3',
          zIndex: 20, // 提高 z-index 到 20
          transition: 'height 0.1s ease-out'
        }}></div>
      </div>

      {/* 第二個藍色區域 */}
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#003EC3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* 第二個藍色區域標題 */}
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
            CONTACT
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#E8F4FD',
            margin: '0',
            fontWeight: '300',
            letterSpacing: '0.1em'
          }}>
            Let&apos;s Create Something Amazing Together
          </p>
        </div>

        {/* CONTACT 版位星空效果 */}
        {[
          { top: '12%', left: '18%', size: '9px', delay: '0s' },
          { top: '22%', left: '78%', size: '7px', delay: '1s' },
          { top: '32%', left: '8%', size: '11px', delay: '2s' },
          { top: '42%', left: '88%', size: '8px', delay: '3s' },
          { top: '52%', left: '22%', size: '10px', delay: '4s' },
          { top: '62%', left: '82%', size: '9px', delay: '5s' },
          { top: '72%', left: '3%', size: '7px', delay: '6s' },
          { top: '82%', left: '72%', size: '11px', delay: '7s' },
          { top: '8%', left: '58%', size: '8px', delay: '8s' },
          { top: '28%', left: '42%', size: '10px', delay: '9s' },
          { top: '48%', left: '68%', size: '9px', delay: '10s' },
          { top: '68%', left: '32%', size: '7px', delay: '11s' },
          { top: '38%', left: '52%', size: '11px', delay: '12s' },
          { top: '58%', left: '12%', size: '8px', delay: '13s' },
          { top: '78%', left: '62%', size: '10px', delay: '14s' },
          { top: '18%', left: '28%', size: '9px', delay: '15s' },
          { top: '38%', left: '92%', size: '7px', delay: '16s' },
          { top: '58%', left: '38%', size: '11px', delay: '17s' },
          { top: '78%', left: '18%', size: '8px', delay: '18s' },
          { top: '88%', left: '82%', size: '10px', delay: '19s' }
        ].map((star, index) => (
          <div
            key={`contact-star-${index}`}
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

        {/* 第二個藍色區域內容 */}
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          zIndex: 15
        }}>
          <p style={{
            color: '#E8F4FD',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '15px 40px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setIsContactModalOpen(true)}>
            Get In Touch
          </button>

            <button style={{
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              color: '#FFFFFF',
              border: '2px solid #4A90E2',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
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
          color: 'white',
          fontSize: '16px',
          fontFamily: 'var(--font-zpix), monospace',
          lineHeight: '1.4',
          textAlign: 'left',
          zIndex: 25,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
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
                window.scrollTo({ top: windowHeight + blueSectionHeight + darkSectionHeight, behavior: 'smooth' });
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
  );
}
