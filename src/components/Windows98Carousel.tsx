'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  rotation: number;
}

interface Windows98CarouselProps {
  windows: WindowData[];
  className?: string;
}

export default function Windows98Carousel({ windows, className = '' }: Windows98CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextWindow = () => {
    setCurrentIndex((prev) => (prev + 1) % windows.length);
  };

  const prevWindow = () => {
    setCurrentIndex((prev) => (prev - 1 + windows.length) % windows.length);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 桌面版：四欄位並排 */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {windows.map((window, index) => (
          <motion.div
            key={window.id}
            className="relative"
            style={{ transform: `rotate(${window.rotation}deg)` }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* 視窗標題欄 */}
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '300px' }}>
              <span className="font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                {window.title}.exe
              </span>
            </div>
            
            {/* 視窗內容 */}
            <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '300px' }}>
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                  {window.subtitle}
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  {window.description}
                </p>
                {window.imageUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={window.imageUrl} 
                      alt={window.subtitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 手機版：重疊卡片 + 按鈕切換 */}
      <div className="lg:hidden">
        <div className="relative h-96 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute"
              style={{ transform: `rotate(${windows[currentIndex].rotation}deg)` }}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* 視窗標題欄 */}
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '280px' }}>
                <span className="font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                  {windows[currentIndex].title}.exe
                </span>
              </div>
              
              {/* 視窗內容 */}
              <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '280px' }}>
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                    {windows[currentIndex].subtitle}
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    {windows[currentIndex].description}
                  </p>
                  {windows[currentIndex].imageUrl && (
                    <div className="flex justify-center">
                      <img 
                        src={windows[currentIndex].imageUrl} 
                        alt={windows[currentIndex].subtitle}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 控制按鈕和頁數指示器 */}
        <div className="flex flex-col items-center space-y-4 mt-6">
          {/* 頁數指示器 */}
          <div className="flex space-x-2">
            {windows.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* 下一頁按鈕 */}
          <motion.button
            onClick={nextWindow}
            className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold px-6 py-2 rounded-lg"
            style={{ fontFamily: 'var(--font-zpix), monospace' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            下一頁 ({currentIndex + 1}/{windows.length})
          </motion.button>
        </div>
      </div>
    </div>
  );
}
