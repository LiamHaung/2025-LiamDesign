"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroTestPage() {
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
  const colorBlockOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.6, 1], [0, 1, 1, 1, 1]);
  
  // 顏色變化：藍色 -> 綠色 -> 橘色 -> 深灰色
  const backgroundColor = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['#003EC3', '#3AAF3A', '#FF8603', '#353535']);

  // 響應式人物位置計算
  const [characterTop, setCharacterTop] = useState('-35%');
  
  // 圖片切換狀態
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/hero＿滾動視差-02.png', '/hero＿滾動視差-03.png'];
  
  // 背景圖片切換狀態
  const [currentBgImage, setCurrentBgImage] = useState('/hero.png');
  
  // 打字機效果狀態
  const [displayText, setDisplayText] = useState('');
  const fullText = '#Own the Day #Go Live Today';
  const [currentIndex, setCurrentIndex] = useState(0);

  // 響應式計算
  useEffect(() => {
    const updateCharacterTop = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCharacterTop('-140%');
      } else if (width >= 768) {
        setCharacterTop('-130%');
      } else {
        setCharacterTop('-35%');
      }
    };
    
    updateCharacterTop();
    window.addEventListener('resize', updateCharacterTop);
    return () => window.removeEventListener('resize', updateCharacterTop);
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

  // 打字機效果
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

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
          height: 300vh;
          position: relative;
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
        <div><strong>Hero 測試面板</strong></div>
        <div>滾動進度: {Math.round(scrollYProgress.get() * 100)}%</div>
        <div>螢幕尺寸: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0'}</div>
        <div>人物位置: {characterTop}</div>
        <div>背景圖片: {currentBgImage}</div>
        <div>彩色條透明度: {Math.round(colorBlockOpacity.get() * 100)}%</div>
        <div>彩色條位置: {colorBlockY.get()}</div>
      </div>

      <div ref={containerRef} className="hero-test-container">
        {/* 背景圖片 */}
        <motion.div
          className="fixed top-0 left-0 w-full h-[calc(100vh-min(24vh,144px))] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBgImage})`,
            transform: `translate(${heroX}, ${heroY})`,
            opacity: heroOpacity,
            zIndex: 1,
          }}
          key={currentBgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* 標題區域 */}
        <div className="fixed top-[15%] md:top-[5%] left-1/2 transform -translate-x-1/2 z-10 text-center px-4 w-full max-w-4xl">
          {/* 大標 */}
          <motion.h1 
            className="font-bold mb-4
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              leading-tight"
            style={{ color: '#353535' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ＃不論用何種方式，一起慢慢前進吧！
          </motion.h1>
          
          {/* 小標 - 打字機效果 */}
          <motion.div 
            className="font-medium
              text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
              leading-relaxed"
            style={{ color: '#003EC3' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="inline-block">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>
        </div>

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
          {/* 人物角色 */}
          <motion.div
            className="character-position absolute z-20 flex items-center justify-center 
              w-[min(500px,80vw)] h-[min(600px,50vh)] max-w-[80vw] max-h-[50vh]
              md:w-[min(600px,70vw)] md:h-[min(700px,55vh)] md:max-w-[70vw] md:max-h-[55vh]
              lg:w-[min(800px,60vw)] lg:h-[min(900px,65vh)] lg:max-w-[60vw] lg:max-h-[65vh]"
            style={{
              left: '50%',
              top: characterTop,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.img 
              key={currentImage}
              src={images[currentImage]} 
              alt={`Hero ${currentImage + 1}`} 
              className="w-full h-full object-contain rounded-xl"
              style={{
                borderRadius: "12px",
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
        <div><strong>Hero 測試說明</strong></div>
        <div>• 滾動頁面測試視差效果</div>
        <div>• 觀察彩色條的出現和消失</div>
        <div>• 檢查人物位置響應式效果</div>
        <div>• 測試背景圖片切換</div>
        <div>• 查看調試面板的數值變化</div>
      </div>
    </>
  );
}

