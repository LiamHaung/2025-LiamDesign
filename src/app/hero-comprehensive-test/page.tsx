"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

// Hero 組件選項
const heroVariants = {
  simple: {
    name: "簡潔版 Hero",
    component: "SimpleHero"
  },
  parallax: {
    name: "視差滾動 Hero", 
    component: "ParallaxHero"
  },
  animated: {
    name: "動畫版 Hero",
    component: "AnimatedHero"
  },
  fullscreen: {
    name: "全螢幕 Hero",
    component: "FullscreenHero"
  }
};

// 背景圖片選項
const backgroundImages = [
  { name: "Hero 主圖", url: "/hero.png" },
  { name: "Hero 2", url: "/hero-2.png" },
  { name: "Hero 工作區域", url: "/hero_工作區域 1 複本 3.png" },
  { name: "Hero 滾動視差 02", url: "/hero＿滾動視差-02.png" },
  { name: "Hero 滾動視差 03", url: "/hero＿滾動視差-03.png" }
];

// 簡潔版 Hero 組件
interface SimpleHeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const SimpleHero = ({ backgroundImage, title, subtitle }: SimpleHeroProps) => (
  <section className="relative w-full h-[60vh] min-h-[400px] flex items-end bg-black overflow-hidden">
    {/* 背景圖片 */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    
    {/* 深色遮罩 */}
    <div className="absolute inset-0 bg-black/50" />
    
    {/* 左上標題 */}
    <h1 className="absolute left-8 top-8 text-3xl md:text-5xl font-black text-white z-10">
      {title}
    </h1>
    
    {/* 右上副標題 */}
    <div className="absolute right-8 top-8 text-base md:text-xl font-bold text-right text-white z-10">
      {subtitle}
    </div>
    
    {/* 底部中央動畫人物 */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-48 pointer-events-none select-none z-10">
      <Image
        src="/runner.gif"
        alt="runner"
        width={192}
        height={192}
        priority
      />
    </div>
  </section>
);

// 視差滾動 Hero 組件
interface ParallaxHeroProps {
  backgroundImage: string;
  scrollYProgress: MotionValue<number>;
}

const ParallaxHero = ({ backgroundImage, scrollYProgress }: ParallaxHeroProps) => {
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  
  return (
    <motion.section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        y: scrollYProgress ? heroY : 0, 
        opacity: scrollYProgress ? heroOpacity : 1 
      }}
    >
      {/* 背景圖片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* 中央標題 */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-black mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Liam Design
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Design that listens. Design that grows.
        </motion.p>
      </div>
    </motion.section>
  );
};

// 動畫版 Hero 組件
interface AnimatedHeroProps {
  backgroundImage: string;
}

const AnimatedHero = ({ backgroundImage }: AnimatedHeroProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/hero＿滾動視差-02.png', '/hero＿滾動視差-03.png'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 背景圖片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* 動畫人物 */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.img 
          key={currentImage}
          src={images[currentImage]} 
          alt={`Hero ${currentImage + 1}`} 
          className="w-64 md:w-96 h-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* 標題 */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 text-center text-white">
        <motion.h1 
          className="text-3xl md:text-5xl font-black mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          #不論用何種方式，一起慢慢前進吧！
        </motion.h1>
      </div>
    </section>
  );
};

// 全螢幕 Hero 組件
interface FullscreenHeroProps {
  backgroundImage: string;
  backgroundColor: string;
}

const FullscreenHero = ({ backgroundImage, backgroundColor }: FullscreenHeroProps) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* 背景圖片 */}
      <div style={{
        position: 'absolute',
        inset: '0',
        background: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
      
      {/* 深藍色遮罩層 */}
      <div style={{
        position: 'absolute',
        inset: '0',
        backgroundColor: backgroundColor,
        opacity: 0.75
      }} />

      {/* SVG 網格背景 */}
      <svg style={{
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        opacity: 0.3
      }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" fill="url(#grid)" />
      </svg>

      {/* 主要標題文字 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'var(--font-zpix), monospace',
        fontSize: 'clamp(4rem, 12vw, 8rem)',
        fontWeight: 'bold',
        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
        letterSpacing: '0.1em',
        lineHeight: '0.9',
        textTransform: 'uppercase'
      }}>
        Liam.Design
      </div>
    </div>
  );
};

export default function HeroComprehensiveTest() {
  const [selectedVariant, setSelectedVariant] = useState('simple');
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [showDebugPanel, setShowDebugPanel] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 響應式檢測
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const renderHeroComponent = () => {
    const props = {
      backgroundImage: backgroundImages[selectedBackground].url,
      title: "Liam Design",
      subtitle: "Design that listens.\nDesign that grows",
      backgroundColor: "#13496b",
      scrollYProgress
    };

    switch (selectedVariant) {
      case 'simple':
        return <SimpleHero {...props} />;
      case 'parallax':
        return <ParallaxHero {...props} />;
      case 'animated':
        return <AnimatedHero {...props} />;
      case 'fullscreen':
        return <FullscreenHero {...props} />;
      default:
        return <SimpleHero {...props} />;
    }
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
        
        .debug-panel {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 20px;
          border-radius: 12px;
          font-size: 12px;
          font-family: monospace;
          z-index: 1000;
          max-width: 350px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .control-panel {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 20px;
          border-radius: 12px;
          font-size: 12px;
          font-family: monospace;
          z-index: 1000;
          max-width: 300px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .control-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 11px;
          margin: 2px;
          transition: all 0.2s;
        }
        
        .control-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .control-button.active {
          background: rgba(0, 123, 255, 0.3);
          border-color: rgba(0, 123, 255, 0.5);
        }
        
        .select-dropdown {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 11px;
          margin: 2px;
          width: 100%;
        }
        
        .select-dropdown option {
          background: #333;
          color: white;
        }
      `}</style>

      {/* 控制面板 */}
      <div className="control-panel">
        <div><strong>🎨 Hero 測試控制台</strong></div>
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>Hero 樣式:</strong>
            <div style={{ marginTop: '5px' }}>
              {Object.entries(heroVariants).map(([key, variant]) => (
                <button
                  key={key}
                  className={`control-button ${selectedVariant === key ? 'active' : ''}`}
                  onClick={() => setSelectedVariant(key)}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>背景圖片:</strong>
            <select 
              className="select-dropdown"
              value={selectedBackground}
              onChange={(e) => setSelectedBackground(Number(e.target.value))}
            >
              {backgroundImages.map((img, index) => (
                <option key={index} value={index}>{img.name}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <button 
              className="control-button"
              onClick={() => setShowDebugPanel(!showDebugPanel)}
            >
              {showDebugPanel ? '隱藏' : '顯示'} 調試面板
            </button>
            <button 
              className="control-button"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? '退出' : '進入'} 全螢幕
            </button>
          </div>
        </div>
      </div>

      {/* 調試面板 */}
      {showDebugPanel && (
        <div className="debug-panel">
          <div><strong>🔧 調試資訊</strong></div>
          <div style={{ marginTop: '10px' }}>
            <div>當前樣式: {heroVariants[selectedVariant as keyof typeof heroVariants]?.name}</div>
            <div>背景圖片: {backgroundImages[selectedBackground].name}</div>
            <div>螢幕尺寸: {screenSize.width}x{screenSize.height}</div>
            <div>滾動進度: {Math.round(scrollYProgress.get() * 100)}%</div>
            <div>視窗狀態: {isFullscreen ? '全螢幕' : '視窗模式'}</div>
          </div>
        </div>
      )}

      {/* 測試說明 */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        maxWidth: '500px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div><strong>📋 Hero 測試說明</strong></div>
        <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.8 }}>
          • 使用左側控制台切換不同 Hero 樣式<br/>
          • 滾動頁面測試視差效果（視差版）<br/>
          • 觀察動畫效果（動畫版）<br/>
          • 測試響應式設計效果<br/>
          • 查看調試面板的即時數值
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="hero-test-container"
        style={{ height: isFullscreen ? '100vh' : 'auto' }}
      >
        {renderHeroComponent()}
        
        {/* 額外內容用於測試滾動效果 */}
        {selectedVariant === 'parallax' && (
          <div style={{ height: '200vh', background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)' }}>
            <div style={{ padding: '100px 20px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>滾動測試區域</h2>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                繼續滾動以測試視差效果...
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

