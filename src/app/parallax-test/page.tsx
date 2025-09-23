"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxTestPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // 背景圖片滾動視差效果
  const heroX = useTransform(scrollYProgress, [0, 1], ['50vw', '-50vw']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0vh', '0vh']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // 彩色區塊滾動視差效果 - 從藍色變橘色變綠色，貼著底部
  const colorBlockY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);
  const colorBlockOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1, 1, 1]);
  
  // 人物位置 - 跟隨彩色區塊移動，確保站在色塊上，調整位置避免被截掉
  const characterY = useTransform(scrollYProgress, [0, 1], ['35vh', '35vh']); // 桌面版用 35vh
  
  // 顏色變化：藍色 -> 綠色 -> 橘色 -> 深灰色
  const backgroundColor = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['#003EC3', '#3AAF3A', '#FF8603', '#353535']);

  // 響應式人物位置計算 - 手機版保持完美設定
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
  
  useEffect(() => {
    const updateCharacterTop = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // 電腦版：往上移動
        setCharacterTop('-140%');
      } else if (width >= 768) {
        // 平板版：往上移動
        setCharacterTop('-130%');
      } else {
        // 手機版：保持完美設定，不動
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
    }, 1200); // 每1.2秒切換

    return () => clearInterval(interval);
  }, []);

  // 背景圖片切換效果 - 根據滾動進度
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // 根據滾動進度切換背景圖片
      if (progress < 0.33) {
        // 0-33%：藍色階段 - 使用 hero.png
        setCurrentBgImage('/hero.png');
      } else if (progress < 0.66) {
        // 33-66%：綠色階段 - 使用 hero-2.png
        setCurrentBgImage('/hero-2.png');
      } else if (progress < 1) {
        // 66-100%：橘色階段 - 使用 hero.png
        setCurrentBgImage('/hero.png');
      } else {
        // 100%：深灰色階段 - 使用 hero-2.png
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
      }, 100); // 每個字符間隔100ms

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          .color-block {
            height: calc(min(32vh, 192px) + 120px) !important; /* 平板版和電腦版：彩色區塊調高120px */
          }
        }
        
      `}</style>
      <div ref={containerRef} style={{ background: "#FFFFF3", minHeight: "500vh", margin: 0, padding: 0 }}>
      {/* 背景圖片，RWD 響應式設計，滾動視差效果，根據顏色變化切換 */}
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
      
      {/* 標題區域 - RWD 響應式設計 */}
      <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 z-10 text-center px-4 w-full max-w-4xl">
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
          ＃昨天已經過去，明天尚未到來，今天仍是未知！
        </motion.h1>
        
        {/* 小標 - 打字機效果 */}
        <motion.div 
          className="font-medium
            text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
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
      
      {/* 滾動進度指示器 - 已隱藏 */}
      {false && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <div>滾動進度: {Math.round(scrollYProgress.get() * 100)}%</div>
          <div>Hero X: {heroX.get()}</div>
          <div>顏色區塊 Y: {colorBlockY.get()}</div>
          <div>人物 Y: {characterY.get()}</div>
          <div>背景顏色: {backgroundColor.get()}</div>
        </div>
      )}

      {/* hero＿滾動視差_工作區域 1 複本 3.png - 前景大圖，全螢幕背景 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/hero＿滾動視差_工作區域 1 複本 3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 10,
        }}
      />


      {/* 彩色區塊 - RWD 響應式設計，貼著網頁底部，進一步增高 */}
      <motion.div
        className="color-block"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "min(32vh, 192px)", // 28vh * 1.15 ≈ 32vh, 168px * 1.15 ≈ 192px
          backgroundColor: backgroundColor,
          transform: `translateY(${colorBlockY})`,
          opacity: colorBlockOpacity,
          zIndex: 5,
        }}
      >
        {/* hero＿滾動視差-02.png - 小圖，手機版完美設定，電腦平板額外設定 */}
        <motion.div
          className="character-position absolute z-20 flex items-center justify-center 
            /* 手機版 - 完美設定，不動 */
            w-[min(500px,80vw)] h-[min(600px,50vh)] max-w-[80vw] max-h-[50vh]
            /* 平板版 - 適中尺寸 */
            md:w-[min(600px,70vw)] md:h-[min(700px,55vh)] md:max-w-[70vw] md:max-h-[55vh]
            /* 電腦版 - 較大尺寸 */
            lg:w-[min(800px,60vw)] lg:h-[min(900px,65vh)] lg:max-w-[60vw] lg:max-h-[65vh]"
          style={{
            left: '50%', // 水平置中於整個視窗
            top: characterTop, // 響應式位置計算
            transform: 'translate(-50%, -50%)', // 完美置中
          }}
        >
          <motion.img 
            key={currentImage}
            src={images[currentImage]} 
            alt={`Hero ${currentImage + 1} Small Image`} 
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
    </>
  );
}