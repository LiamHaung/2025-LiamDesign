'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BrandCarouselCardProps {
  images?: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function BrandImageCarouselCard({
  images = [
    '/illustration_1.png',
    '/illustration_2.png', 
    '/illustration_3.png',
    '/illustration_4.png',
    '/illustration_5.png'
  ],
  autoPlay = true,
  autoPlayInterval = 4000,
  className = ''
}: BrandCarouselCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 情緒 emoji 陣列，對應每張圖片
  const emotionEmojis = ['😊', '😢', '😠', '😍', '😮'];

  // 自動播放
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {/* 品牌輪播卡片容器 */}
      <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
        {/* 圖片輪播區域 - 響應式視窗 */}
        <div 
          className="relative overflow-hidden"
          style={{
            border: '20px solid #1F2937',
            height: '60%',
            minHeight: '300px'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`Brand image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* 左上角標籤 */}
          <div 
            className="absolute top-4 left-4 z-10"
            style={{
              backgroundColor: '#4A4A4A',
              padding: '6px 12px',
              borderRadius: '8px',
              fontFamily: 'var(--font-zpix), monospace',
              fontSize: 'clamp(12px, 2vw, 14px)',
              fontWeight: 'bold',
              color: '#FFFFF3'
            }}
          >
            # Brand
          </div>

          {/* 右上角情緒 emoji 圖示 */}
          <div 
            className="absolute top-4 right-4 z-10"
            style={{
              backgroundColor: '#003EC3',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            {emotionEmojis[currentIndex]}
          </div>

          {/* 底部橫幅 */}
          <div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
            style={{
              backgroundColor: '#003EC3',
              padding: '8px 16px',
              borderRadius: '8px',
              fontFamily: 'var(--font-zpix), monospace',
              fontSize: 'clamp(12px, 2vw, 14px)',
              fontWeight: 'bold',
              color: '#FFFFF3',
              whiteSpace: 'nowrap'
            }}
          >
            #品牌 #視覺 #陪你一起長大
          </div>

          {/* 導航箭頭 - 左側 */}
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10
            }}
            className="bg-[#003EC3] hover:bg-[#002A8A] text-[#FFFFF3] p-2 rounded-full border-2 border-[#003EC3] hover:border-[#002A8A] transition-all duration-200 shadow-md"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 導航箭頭 - 右側 */}
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10
            }}
            className="bg-[#003EC3] hover:bg-[#002A8A] text-[#FFFFF3] p-2 rounded-full border-2 border-[#003EC3] hover:border-[#002A8A] transition-all duration-200 shadow-md"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 下方文字資訊面板 */}
        <div 
          className="p-6"
          style={{
            height: '40%',
            minHeight: '200px',
            backgroundColor: '#FFFFF3'
          }}
        >
          {/* 大標 */}
          <h2 
            className="font-bold mb-3"
            style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              fontFamily: 'Noto Sans, sans-serif',
              lineHeight: '1.3',
              color: '#003EC3'
            }}
          >
            Bring Your Brand to Life｜讓品牌活起來
          </h2>

          {/* 小標 */}
          <h3 
            className="mb-4"
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontFamily: 'Noto Sans, sans-serif',
              lineHeight: '1.4',
              color: '#003EC3'
            }}
          >
            幫品牌找到自己的符號
          </h3>

          {/* 內文 */}
          <div 
            className="leading-relaxed p-4 rounded-lg"
            style={{
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              fontFamily: 'Noto Sans, sans-serif',
              lineHeight: '1.6',
              backgroundColor: '#F0F0F0',
              color: '#003EC3'
            }}
          >
            <p className="mb-3">
              品牌不只是 Logo，它需要有個靈魂。我們陪你一起定義品牌的個性與人設，用設計力與插畫力，讓它變得鮮明、有溫度。
            </p>
            <p>
              從 IP 角色、菜單設計、社群貼文、名片、DM 到產品延伸，讓你的品牌被看見。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
