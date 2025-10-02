"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxMobileFixPage() {
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

  // 改進的手機版人物位置計算
  const [characterPosition, setCharacterPosition] = useState({
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(500px, 80vw)',
    height: 'min(600px, 50vh)'
  });

  // 改進的響應式計算 - 專注於手機版問題
  useEffect(() => {
    const updateCharacterPosition = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 計算彩色區塊的實際高度
      const colorBlockHeight = Math.min(height * 0.32, 192); // 32vh 或 192px
      
      if (width >= 1440) {
        // 大螢幕桌面版
        setCharacterPosition({
          top: '45vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 50vw)',
          height: 'min(900px, 60vh)'
        });
      } else if (width >= 1200) {
        // 中等桌面版
        setCharacterPosition({
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(700px, 55vw)',
          height: 'min(800px, 55vh)'
        });
      } else if (width >= 992) {
        // 小桌面版
        setCharacterPosition({
          top: '55vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 60vw)',
          height: 'min(700px, 50vh)'
        });
      } else if (width >= 768) {
        // 平板版
        setCharacterPosition({
          top: '60vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(500px, 70vw)',
          height: 'min(600px, 45vh)'
        });
      } else if (width >= 576) {
        // 大手機版 - 改進計算
        const maxHeight = Math.min(height * 0.4, 500); // 最大 40vh 或 500px
        setCharacterPosition({
          top: `${50 + (colorBlockHeight / height) * 50}vh`, // 動態計算位置
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 80vw)',
          height: `${maxHeight}px`
        });
      } else {
        // 小手機版 - 改進計算
        const maxHeight = Math.min(height * 0.35, 450); // 最大 35vh 或 450px
        setCharacterPosition({
          top: `${50 + (colorBlockHeight / height) * 50}vh`, // 動態計算位置
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(350px, 85vw)',
          height: `${maxHeight}px`
        });
      }
    };
    
    updateCharacterPosition();
    
    // 使用防抖動的 resize 監聽器
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateCharacterPosition, 100);
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
        
        .parallax-container {
          height: 300vh;
          position: relative;
        }
        
        .debug-info {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 15px;
          border-radius: 8px;
          font-size: 12px;
          font-family: monospace;
          z-index: 1000;
          max-width: 300px;
        }
        
        .device-info {
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
          max-width: 250px;
        }
        
        .mobile-fix-info {
          position: fixed;
          bottom: 20px;
          left: 20px;
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

      {/* 調試信息 */}
      <div className="debug-info">
        <div><strong>手機版修復測試</strong></div>
        <div>滾動進度: {Math.round(scrollYProgress.get() * 100)}%</div>
        <div>Hero X: {heroX.get()}</div>
        <div>顏色區塊 Y: {colorBlockY.get()}</div>
        <div>背景顏色: {backgroundColor.get()}</div>
        <div>當前圖片: {currentImage + 1}</div>
      </div>

      {/* 裝置信息 */}
      <div className="device-info">
        <div><strong>裝置信息</strong></div>
        <div>螢幕寬度: {typeof window !== 'undefined' ? window.innerWidth : 0}px</div>
        <div>螢幕高度: {typeof window !== 'undefined' ? window.innerHeight : 0}px</div>
        <div>人物位置: {characterPosition.top}</div>
        <div>人物尺寸: {characterPosition.width} x {characterPosition.height}</div>
        <div>彩色區塊高度: {typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.32, 192) : 0}px</div>
      </div>

      <div ref={containerRef} className="parallax-container">
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

        {/* 彩色區塊 - 增加高度以容納完整人物 */}
        <motion.div
          className="color-block"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            height: "min(45vh, 270px)", // 增加高度：從 32vh 到 45vh
            backgroundColor: backgroundColor,
            transform: `translateY(${colorBlockY})`,
            opacity: colorBlockOpacity,
            zIndex: 5,
          }}
        >
          {/* 人物角色 - 使用改進的定位方式 */}
          <motion.div
            className="character-position absolute z-20 flex items-center justify-center"
            style={{
              ...characterPosition,
              position: 'absolute',
            }}
          >
            <motion.img 
              key={currentImage}
              src={images[currentImage]} 
              alt={`Hero ${currentImage + 1}`} 
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

      {/* 手機版修復說明 */}
      <div className="mobile-fix-info">
        <div><strong>手機版修復說明</strong></div>
        <div>• 增加彩色區塊高度：32vh → 45vh</div>
        <div>• 動態計算人物位置</div>
        <div>• 使用像素單位替代 vh</div>
        <div>• 考慮彩色區塊實際高度</div>
        <div>• 確保人物完整顯示</div>
      </div>
    </>
  );
}
