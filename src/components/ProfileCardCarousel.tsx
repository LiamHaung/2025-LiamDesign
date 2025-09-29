'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface ProfileCardCarouselProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  animated?: boolean;
}

// 定義不同面向的個人資料，保持原本的版型結構
const profileVariants = [
  {
    id: 1,
    name: "Liam Huang",
    title: "平面設計師",
    skills: "插畫、印刷、設計、品牌",
    motto: "今天可以休息就不要留給明天",
    description: "我是 Liam,喜歡把想法變成會呼吸的設計。放輕鬆、慢慢逛,或許下一個專案就從這裡開始。",
    image: "/profilecard.png"
  },
  {
    id: 2,
    name: "Liam Huang",
    title: "插畫創作者",
    skills: "手繪、數位、故事、在地",
    motto: "每一筆一劃都承載著記憶與情感",
    description: "用線條與色彩訴說故事，讓插畫成為連接人與人之間的橋樑。",
    image: "/hero＿滾動視差-03.png"
  },
  {
    id: 3,
    name: "Liam Huang",
    title: "品牌夥伴",
    skills: "策略、創意、陪伴、成長",
    motto: "每個品牌都有獨特的故事",
    description: "從概念到執行，全程參與品牌旅程，用創意讓每個故事都能發光發熱。",
    image: "/hero.png"
  },
  {
    id: 4,
    name: "Liam Huang",
    title: "在地創作者",
    skills: "文化、傳承、連結、溫度",
    motto: "越在地，越國際",
    description: "深耕宜蘭在地文化，用設計連結傳統與現代，創造有溫度的作品。",
    image: "/hero＿滾動視差-02.png"
  }
];

export default function ProfileCardCarousel({ 
  className = '', 
  autoPlay = true,
  autoPlayInterval = 5000,
  animated = true
}: ProfileCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  // 滾動視差效果（如果啟用動畫）
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // 自動播放
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === profileVariants.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === profileVariants.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? profileVariants.length - 1 : prevIndex - 1
    );
  };

  // const goToSlide = (index: number) => {
  //   setCurrentIndex(index);
  // };

  const currentProfile = profileVariants[currentIndex];

  // 保持原本 ProfileCard 的版型結構
  const cardContent = (
    <div className="relative bg-white rounded-2xl shadow-lg border-2 border-black overflow-hidden">
      {/* 頂部藍色橫幅 */}
      <div className="bg-[#003EC3] py-3 px-6 text-center">
        <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
          {currentProfile.name}
        </h1>
      </div>

      {/* 主要內容區域 */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側 - 人物頭像 */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#003EC3] bg-[#003EC3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* 右側 - 文字內容 */}
          <div className="flex-1 space-y-4">
            {/* 主標題 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  {currentProfile.title}
                </h2>
                <div className="w-full h-0.5 bg-black mb-2"></div>
              </motion.div>
            </AnimatePresence>

            {/* 技能 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`skills-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="text-lg text-black mb-2">{currentProfile.skills}</p>
                <div className="w-full h-0.5 bg-black mb-2"></div>
              </motion.div>
            </AnimatePresence>

            {/* 座右銘 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`motto-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="text-lg font-semibold text-black mb-2">{currentProfile.motto}</p>
                <div className="w-full h-0.5 bg-black mb-2"></div>
              </motion.div>
            </AnimatePresence>

            {/* 自我介紹 */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`description-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-sm md:text-base text-black leading-relaxed"
              >
                {currentProfile.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 底部黑色跑馬燈 */}
      <div className="bg-black py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-white text-lg font-bold mx-8" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              #標語標語標語
            </span>
          ))}
        </div>
      </div>

      {/* 導航箭頭 - 桌面版大圓形按鈕在卡片底部左右兩側 */}
      <button
        onClick={goToPrevious}
        className="absolute left-[-25px] bottom-4 bg-[#003EC3] hover:bg-[#002A8A] text-white w-12 h-12 rounded-full transition-all duration-200 shadow-lg hidden md:flex items-center justify-center"
        style={{ zIndex: 20 }}
      >
        <span className="text-xl font-bold">&lt;</span>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-[-25px] bottom-4 bg-[#003EC3] hover:bg-[#002A8A] text-white w-12 h-12 rounded-full transition-all duration-200 shadow-lg hidden md:flex items-center justify-center"
        style={{ zIndex: 20 }}
      >
        <span className="text-xl font-bold">&gt;</span>
      </button>

      {/* 手機版導航按鈕 - 較小按鈕在卡片下方置中 */}
      <div className="md:hidden flex justify-center space-x-3 mt-4">
        <button
          onClick={goToPrevious}
          className="bg-[#003EC3] hover:bg-[#002A8A] text-white p-2 rounded-full transition-all duration-200 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="bg-[#003EC3] hover:bg-[#002A8A] text-white p-2 rounded-full transition-all duration-200 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  if (animated) {
    return (
      <div ref={containerRef} className={`w-full max-w-4xl mx-auto px-8 md:px-12 ${className}`}>
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ 
            color: '#003EC3',
            fontFamily: 'var(--font-zpix), monospace'
          }}>
            關於 Liam
          </h2>
        </motion.div>

        <motion.div
          style={{
            y: cardY,
            opacity: cardOpacity,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {cardContent}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto px-8 md:px-12 ${className}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        {cardContent}
      </div>
    </div>
  );
}
