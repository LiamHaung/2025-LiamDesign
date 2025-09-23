'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProfileCardProps {
  className?: string;
  animated?: boolean;
}

export default function ProfileCard({ 
  className = '', 
  animated = true 
}: ProfileCardProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 標題的滾動視差效果
  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // ProfileCard 的滾動視差效果
  const cardY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  // const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const isDesktopSize = width >= 1024;
        console.log('螢幕寬度:', width, '是否為桌面版本:', isDesktopSize);
        setIsDesktop(isDesktopSize);
      }
    };

    checkScreenSize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkScreenSize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkScreenSize);
      }
    };
  }, []);
  const cardContent = (
    <div ref={containerRef} className="w-full">
      {/* 標題區域 - 滾動視差效果 */}
      <motion.div 
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'var(--font-zpix), monospace',
          maxWidth: '100%',
          padding: '0 20px',
          width: '100%',
          boxSizing: 'border-box',
          y: titleY,
          opacity: titleOpacity
        }}
      >
        <div style={{
          fontSize: 'clamp(16px, 3vw, 32px)',
          fontWeight: 'bold',
          color: '#FFFFF3',
          backgroundColor: '#003EC3',
          display: 'inline-block',
          padding: '8px 16px',
          borderRadius: '6px',
          letterSpacing: '1px',
          lineHeight: '1.4',
          wordBreak: 'break-word',
          whiteSpace: 'normal'
        }}>
          #About Liam
        </div>
      </motion.div>

      {/* ProfileCard 內容 - 滾動視差效果 */}
      <motion.div 
        className={`bg-white border-2 border-black rounded-lg overflow-hidden shadow-none ${className}`} 
        style={{ 
          boxShadow: 'none',
          y: cardY,
          opacity: cardOpacity
        }}
      >
      {/* 主要內容區域 - 固定寬度，高度自適應 */}
      <div className="flex h-96">
        {/* 左側：角色區域 */}
        <div className="w-2/5 flex flex-col justify-center relative border-r-2 border-black">
          {/* 角色圖片 */}
          <div className="flex-1 flex items-center justify-center p-6 h-64 overflow-hidden">
            <div className="w-full h-full relative">
              <img 
                src="/chactor.gif" 
                alt="Liam Character"
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: 'center 25%',
                  transform: 'scale(1.3)',
                  transformOrigin: 'center top'
                }}
              />
            </div>
          </div>
          
          {/* 藍色姓名條 */}
          <div 
            className="px-4 py-4 text-center h-20 flex items-center justify-center"
            style={{ backgroundColor: '#003EC3' }}
          >
            <span 
              className="text-white font-bold text-lg sm:text-xl"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              Liam Huang
            </span>
          </div>
        </div>

        {/* 右側：文字內容區域 */}
          <div className="flex-1 p-6 flex flex-col justify-center space-y-4 max-w-xs sm:max-w-sm md:max-w-md">
          {/* 職業標題 */}
          <div className="border-b border-black pb-2">
            <h2 
              className="text-lg sm:text-xl font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              平面設計師
            </h2>
          </div>

          {/* 技能標籤 */}
          <div className="border-b border-black pb-2">
            <p 
              className="text-base sm:text-lg font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              插畫、印刷、設計、品牌
            </p>
          </div>

          {/* 座右銘 */}
          <div className="border-b border-black pb-2">
            <p 
              className="text-base sm:text-lg font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              今天可以休息就不要留給明天
            </p>
          </div>

          {/* 自我介紹 */}
          <div className="pt-1">
            <p 
              className="text-base text-black leading-relaxed"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              我是 <span className="font-bold">Liam</span>，喜歡把想法
              <br />
              變成會呼吸的設計。放輕鬆、
              <br />
              慢慢逛，或許下一個專案就
              <br />
              從這裡開始。
            </p>
          </div>
        </div>
      </div>

        {/* 底部 Slogan 區域 */}
        <div className="bg-black text-center py-5 h-20 flex items-center justify-center">
        <span 
          className="text-white text-xs sm:text-sm font-bold"
          style={{ fontFamily: 'var(--font-zpix), monospace' }}
        >
          #Own the Day #Go Live Today
        </span>
      </div>
      </motion.div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          transition: { duration: 0.2 }
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div 
      className="relative shadow-none" 
      style={{ 
        boxShadow: 'none'
      }}
    >
      {cardContent}
    </div>
  );
}
