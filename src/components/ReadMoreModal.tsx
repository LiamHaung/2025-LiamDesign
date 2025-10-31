'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface ReadMoreModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  images: ImageItem[];
  initialIndex?: number;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function ReadMoreModal({
  open,
  onClose,
  title,
  images,
  initialIndex = 0,
  meta,
  children,
  className = ''
}: ReadMoreModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  // 鎖定背景滾動
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Windows 98 視窗 */}
          <motion.div
            className={`win98-window relative ${className}`}
            style={{
              width: '90vw',
              maxWidth: '1200px',
              maxHeight: '90vh',
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
              overflow: 'hidden',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Windows 98 標題列 */}
            <div className="win98-titlebar" style={{
              background: 'linear-gradient(90deg, #003EC3 0%, #002A8A 100%)',
              color: 'white',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontWeight: 'bold',
              borderBottom: '1px solid #808080'
            }}>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white bg-opacity-20 rounded-sm flex items-center justify-center">
                  <span className="text-xs">📄</span>
                </div>
                <span>{title}</span>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-red-500 hover:border-red-600 transition-colors duration-200"
                title="關閉視窗"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
            
            {/* Windows 98 內容區域 */}
            <div style={{
              background: '#FFFFF3',
              color: '#353535',
              padding: '20px',
              fontSize: '14px',
              lineHeight: '1.4',
              border: '2px inset #c0c0c0',
              margin: '2px',
              overflow: 'auto',
              maxHeight: 'calc(90vh - 60px)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* 左側：圖片區域 */}
                <div className="flex-1">
                  <div className="relative">
                    {/* 主圖片 */}
                    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden border-2 border-gray-400">
                      <Image
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                    </div>

                    {/* 圖片導航按鈕 - Windows 98 風格 */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
                          style={{
                            background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                            border: '2px solid #808080',
                            borderTopColor: '#ffffff',
                            borderLeftColor: '#ffffff',
                            borderRightColor: '#404040',
                            borderBottomColor: '#404040',
                            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                            color: '#000000',
                            textShadow: '1px 1px 0px #ffffff'
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                          }}
                          title="上一張"
                        >
                          <span className="text-sm font-bold">‹</span>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
                          style={{
                            background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                            border: '2px solid #808080',
                            borderTopColor: '#ffffff',
                            borderLeftColor: '#ffffff',
                            borderRightColor: '#404040',
                            borderBottomColor: '#404040',
                            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                            color: '#000000',
                            textShadow: '1px 1px 0px #ffffff'
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                          }}
                          title="下一張"
                        >
                          <span className="text-sm font-bold">›</span>
                        </button>
                      </>
                    )}

                    {/* 圖片指示器 - Windows 98 風格 */}
                    {images.length > 1 && (
                      <div className="flex justify-center space-x-2 mt-4">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className="w-4 h-4 transition-all duration-200"
                            style={{
                              background: index === currentImageIndex
                                ? 'linear-gradient(135deg, #000080 0%, #0000ff 100%)'
                                : 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                              border: '1px solid #808080',
                              borderTopColor: '#ffffff',
                              borderLeftColor: '#ffffff',
                              borderRightColor: '#404040',
                              borderBottomColor: '#404040',
                              boxShadow: index === currentImageIndex
                                ? 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
                                : 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
                            }}
                            onMouseDown={(e) => {
                              if (index !== currentImageIndex) {
                                e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                              }
                            }}
                            onMouseUp={(e) => {
                              if (index !== currentImageIndex) {
                                e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (index !== currentImageIndex) {
                                e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                              }
                            }}
                            title={`圖片 ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 右側：文字內容 */}
                <div className="flex-1 space-y-4">
                  {/* 標題 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#003EC3' }}>
                      {title}
                    </h2>
                    <div className="w-full h-1 mb-3" style={{ backgroundColor: '#003EC3' }}></div>
                  </div>

                  {/* Meta 資訊 */}
                  {meta && (
                    <div className="bg-gray-100 p-3 rounded border border-gray-300">
                      <h3 className="font-semibold mb-2" style={{ color: '#353535' }}>專案資訊</h3>
                      {meta}
                    </div>
                  )}

                  {/* 內容介紹 */}
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: '#353535' }}>專案介紹</h3>
                    <div className="text-sm leading-relaxed" style={{ color: '#353535' }}>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

