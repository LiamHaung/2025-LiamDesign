'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CarouselCardProps {
  images?: string[];
  slogan?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  showProgressBar?: boolean;
  showDescription?: boolean;
  description?: string;
  showTag?: boolean;
  tagText?: string;
}

export default function ImageCarouselCard({
  images = [
    '/illustration_1.png',
    '/illustration_2.png', 
    '/illustration_3.png',
    '/illustration_4.png',
    '/illustration_5.png',
    '/illustration_6.png'
  ],
  slogan = '#Own the Day #Go Live Today',
  autoPlay = true,
  autoPlayInterval = 3000,
  className = '',
  showProgressBar = false,
  showDescription = false,
  description = '這是一個輪播卡片展示區域，可以展示多張圖片並自動切換。',
  showTag = false,
  tagText = '#輪播展示 #圖片切換'
}: CarouselCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

  // 進度條動畫 - 根據圖片數量分段
  useEffect(() => {
    if (!showProgressBar) return;
    
    // 計算當前圖片對應的進度百分比
    const progressPerImage = 100 / images.length;
    const currentProgress = (currentIndex + 1) * progressPerImage;
    setProgress(currentProgress);
  }, [showProgressBar, currentIndex, images.length]);

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

  // const goToSlide = (index: number) => {
  //   setCurrentIndex(index);
  // };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* 輪播卡片容器 */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-black">
        {/* 圖片輪播區域 */}
        <div className="relative h-64 md:h-80 overflow-hidden">
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
                alt={`Carousel image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

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

        {/* 黑色標語區塊 */}
        <div className="bg-black py-4 px-6">
          <div className="text-center">
            <h3 
              className="text-white font-bold text-lg md:text-xl"
              style={{ 
                fontFamily: 'var(--font-zpix), monospace',
                letterSpacing: '1px'
              }}
            >
              {slogan}
            </h3>
          </div>
        </div>

        {/* 標籤元件 */}
        {showTag && (
          <div className="px-6 py-3 bg-gray-100">
            <div 
              className="text-center text-sm font-bold"
              style={{ 
                fontFamily: 'var(--font-zpix), monospace',
                color: '#003EC3'
              }}
            >
              {tagText}
            </div>
          </div>
        )}

        {/* 內文描述 */}
        {showDescription && (
          <div className="px-6 py-4 bg-white">
            <p className="text-gray-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* 進度條 */}
        {showProgressBar && (
          <div className="px-6 py-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 font-medium">
                第 {currentIndex + 1} 張 / 共 {images.length} 張
              </span>
              <span className="text-xs text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-[#003EC3] h-2 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
