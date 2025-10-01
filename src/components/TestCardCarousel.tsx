"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestCardAlt from './TestCardAlt';
import ModernButton from './ModernButton';

export type TestCardData = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  tag: string;
  onReadMore: () => void;
};

export type TestCardCarouselProps = {
  cards: TestCardData[];
  className?: string;
};

export default function TestCardCarousel({ cards, className = "" }: TestCardCarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 檢測是否為手機版
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 每頁顯示的卡片數量（響應式）
  const getItemsPerPage = () => {
    if (isMobile) {
      return 2; // 手機版顯示2個卡片
    } else {
      return 4; // 桌面版顯示4個卡片
    }
  };

  // 獲取當前頁面要顯示的卡片
  const getCurrentPageCards = () => {
    const itemsPerPage = getItemsPerPage();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cards.slice(startIndex, endIndex);
  };

  // 計算總頁數
  const getTotalPages = () => {
    const itemsPerPage = getItemsPerPage();
    return Math.ceil(cards.length / itemsPerPage);
  };

  // 切換到指定頁面
  const goToPage = (page: number) => {
    const totalPages = getTotalPages();
    if (page >= 1 && page <= totalPages && !isLoading) {
      setIsLoading(true);
      // 模擬載入延遲
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
      }, 300);
    }
  };


  const currentCards = getCurrentPageCards();
  const totalPages = getTotalPages();
  const hasMorePages = currentPage < totalPages;

  return (
    <div className={`w-full ${className}`}>
      {/* 卡片展示區域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {currentCards.map((card, index) => (
            <motion.div
              key={`${card.id}-${currentPage}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <TestCardAlt
                title={card.title}
                subtitle={card.subtitle}
                imageSrc={card.imageSrc}
                tag={card.tag}
                onReadMore={card.onReadMore}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 頁面控制區域 - 所有裝置都顯示 */}
      {totalPages > 1 && (
        <div className="mt-8">
          {/* 頁面指示器 */}
          <div className="flex justify-center items-center mb-4">
            <span 
              className="text-sm font-bold text-gray-600"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              第 {currentPage} 頁 / 共 {totalPages} 頁
            </span>
          </div>

          {/* 頁面數字按鈕 */}
          <div className="flex justify-center items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                disabled={isLoading}
                className={`w-12 h-12 rounded-full text-sm font-bold transition-all duration-200 ${
                  currentPage === pageNum
                    ? 'bg-[#003EC3] text-[#FFFFF3] scale-110'
                    : 'bg-gray-200 text-gray-600 hover:bg-[#ff8c00] hover:text-white hover:scale-105'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ fontFamily: 'var(--font-zpix), monospace' }}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
