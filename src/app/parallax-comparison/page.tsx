"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxComparisonPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // 背景圖片滾動視差效果
  const heroX = useTransform(scrollYProgress, [0, 1], ['0vw', '-50vw']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0vh', '0vh']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // 彩色區塊滾動視差效果
  const colorBlockY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);
  const colorBlockOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 1, 1]);
  
  // 顏色變化
  const backgroundColor = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['#003EC3', '#3AAF3A', '#FF8603', '#353535']);

  // 圖片切換狀態
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/hero＿滾動視差-02.png', '/hero＿滾動視差-03.png'];
  
  // 背景圖片切換狀態
  const [currentBgImage, setCurrentBgImage] = useState('/hero.png');

  // 原始版本的人物位置（有問題的版本）
  const [originalCharacterTop, setOriginalCharacterTop] = useState('-35%');
  
  // 修復版本的人物位置
  const [fixedCharacterPosition, setFixedCharacterPosition] = useState({
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(500px, 80vw)',
    height: 'min(600px, 50vh)'
  });

  // 原始版本的響應式計算（有問題的版本）
  useEffect(() => {
    const updateOriginalCharacterTop = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setOriginalCharacterTop('-140%');
      } else if (width >= 768) {
        setOriginalCharacterTop('-130%');
      } else {
        setOriginalCharacterTop('-35%');
      }
    };
    
    updateOriginalCharacterTop();
    window.addEventListener('resize', updateOriginalCharacterTop);
    return () => window.removeEventListener('resize', updateOriginalCharacterTop);
  }, []);

  // 修復版本的響應式計算
  useEffect(() => {
    const updateFixedCharacterPosition = () => {
      const width = window.innerWidth;
      
      if (width >= 1440) {
        setFixedCharacterPosition({
          top: '45vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 50vw)',
          height: 'min(900px, 60vh)'
        });
      } else if (width >= 1200) {
        setFixedCharacterPosition({
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(700px, 55vw)',
          height: 'min(800px, 55vh)'
        });
      } else if (width >= 992) {
        setFixedCharacterPosition({
          top: '55vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 60vw)',
          height: 'min(700px, 50vh)'
        });
      } else if (width >= 768) {
        setFixedCharacterPosition({
          top: '60vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 70vw)',
          height: 'min(600px, 45vh)'
        });
      } else if (width >= 576) {
        setFixedCharacterPosition({
          top: '65vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 80vw)',
          height: 'min(500px, 40vh)'
        });
      } else {
        setFixedCharacterPosition({
          top: '70vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(350px, 85vw)',
          height: 'min(450px, 35vh)'
        });
      }
    };
    
    updateFixedCharacterPosition();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateFixedCharacterPosition, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // 圖片切換效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // 背景圖片切換效果
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (progress < 0.33) {
        setCurrentBgImage('/hero.png');
      } else if (progress < 0.66) {
        setCurrentBgImage('/hero-2.png');
      } else if (progress < 1) {
        setCurrentBgImage('/hero.png');
      } else {
        setCurrentBgImage('/hero-2.png');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'var(--font-zpix)', monospace;
        }
        
        .comparison-container {
          height: 300vh;
          position: relative;
        }
        
        .comparison-section {
          height: 150vh;
          position: relative;
        }
        
        .section-label {
          position: fixed;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 20px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          z-index: 1000;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .debug-panel {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 15px;
          border-radius: 8px;
          font-size: 12px;
          font-family: monospace;
          z-index: 1000;
          max-width: 300px;
        }
      `}</style>

      {/* 調試面板 */}
      <div className="debug-panel">
        <div><strong>對比測試面板</strong></div>
        <div>滾動進度: {Math.round(scrollYProgress.get() * 100)}%</div>
        <div>螢幕尺寸: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0'}</div>
        <div>---</div>
        <div><strong>原始版本</strong></div>
        <div>人物位置: {originalCharacterTop}</div>
        <div>---</div>
        <div><strong>修復版本</strong></div>
        <div>人物位置: {fixedCharacterPosition.top}</div>
        <div>人物尺寸: {fixedCharacterPosition.width} x {fixedCharacterPosition.height}</div>
      </div>

      <div ref={containerRef} className="comparison-container">
        {/* 原始版本（上半部分） */}
        <div className="comparison-section">
          <div className="section-label">原始版本（有問題）</div>
          
          {/* 背景圖片 */}
          <motion.div
            className="hero-bg"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundImage: `url(${currentBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: `translateX(${heroX}) translateY(${heroY})`,
              opacity: heroOpacity,
              zIndex: 1,
            }}
          />

          {/* 彩色區塊 */}
          <motion.div
            className="color-block"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "min(32vh, 192px)",
              backgroundColor: backgroundColor,
              transform: `translateY(${colorBlockY})`,
              opacity: colorBlockOpacity,
              zIndex: 5,
            }}
          >
            {/* 原始版本的人物角色 */}
            <motion.div
              className="character-position absolute z-20 flex items-center justify-center"
              style={{
                left: '50%',
                top: originalCharacterTop,
                transform: 'translate(-50%, -50%)',
                width: 'min(500px, 80vw)',
                height: 'min(600px, 50vh)',
              }}
            >
              <motion.img 
                key={`original-${currentImage}`}
                src={images[currentImage]} 
                alt={`Original Hero ${currentImage + 1}`} 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  borderRadius: "12px",
                  border: "3px solid #ff0000", // 紅色邊框標示原始版本
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeIn" 
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 修復版本（下半部分） */}
        <div className="comparison-section" style={{ marginTop: '150vh' }}>
          <div className="section-label">修復版本（改善後）</div>
          
          {/* 背景圖片 */}
          <motion.div
            className="hero-bg"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundImage: `url(${currentBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: `translateX(${heroX}) translateY(${heroY})`,
              opacity: heroOpacity,
              zIndex: 1,
            }}
          />

          {/* 彩色區塊 */}
          <motion.div
            className="color-block"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "min(32vh, 192px)",
              backgroundColor: backgroundColor,
              transform: `translateY(${colorBlockY})`,
              opacity: colorBlockOpacity,
              zIndex: 5,
            }}
          >
            {/* 修復版本的人物角色 */}
            <motion.div
              className="character-position absolute z-20 flex items-center justify-center"
              style={{
                ...fixedCharacterPosition,
                position: 'absolute',
              }}
            >
              <motion.img 
                key={`fixed-${currentImage}`}
                src={images[currentImage]} 
                alt={`Fixed Hero ${currentImage + 1}`} 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  borderRadius: "12px",
                  border: "3px solid #00ff00", // 綠色邊框標示修復版本
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeIn" 
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 文字內容 */}
        <motion.div
          className="text-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4 w-full max-w-4xl"
          style={{
            opacity: heroOpacity,
          }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8"
            style={{ 
              fontFamily: 'var(--font-zpix), monospace',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            #Own the Day #Go Live Today
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white"
            style={{ 
              fontFamily: 'var(--font-zpix), monospace',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            #不論用何種方式,一起慢慢前進吧!
          </motion.p>
        </motion.div>
      </div>

      {/* 測試說明 */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        maxWidth: '300px'
      }}>
        <div><strong>對比測試說明</strong></div>
        <div>• 上半部分：原始版本（紅色邊框）</div>
        <div>• 下半部分：修復版本（綠色邊框）</div>
        <div>• 滾動頁面觀察兩個版本的差異</div>
        <div>• 調整視窗大小測試響應式效果</div>
        <div>• 檢查調試面板中的數值變化</div>
      </div>
    </>
  );
}
