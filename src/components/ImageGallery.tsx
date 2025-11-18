'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  title: string;
  description: string;
  tags?: string[]; // 添加标签支持
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  isOpen,
  onClose,
  images,
  title,
  description,
  tags = []
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ESC 鍵關閉
  useEffect(() => {
    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 防止背景滾動
      setCurrentIndex(0); // 重置到第一张
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === galleryRef.current || (e.target as HTMLElement).classList.contains('gallery-background')) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      ref={galleryRef}
      className="gallery-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={handleBackgroundClick}
    >
      {/* 主內容區域 */}
      <div
        style={{
          width: '90%',
          maxWidth: '1400px',
          maxHeight: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            fontSize: '18px',
            fontFamily: 'var(--font-zpix), monospace',
            color: '#333',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            zIndex: 10000,
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          CLOSE
        </button>

        {/* 標題 - 放大120%並加粗 */}
        <h2
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', // 放大120%
            fontFamily: 'var(--font-zpix), monospace',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold' // 加粗
          }}
        >
          {title}
        </h2>

        {/* 作品敘述 - 放大120%並加粗 */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.44rem, 3.6vw, 2.16rem)', // 放大120%
              fontFamily: 'var(--font-zpix), monospace',
              color: '#666',
              lineHeight: '1.8',
              maxWidth: '900px',
              margin: '0 auto',
              fontWeight: 'bold' // 加粗
            }}
          >
            {description}
          </p>
        </div>

        {/* 圖片輪播區域 - 4:3比例 */}
        <div
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f5f5f5',
            aspectRatio: '4 / 3', // 固定4:3比例
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 標籤 - 毛玻璃效果，放在圖片左上角 */}
          {tags && tags.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                zIndex: 10
              }}
            >
              {tags.map((tag, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-zpix), monospace',
                    color: '#333',
                    fontWeight: '500',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* 當前圖片 - 4:3比例，居中顯示 */}
          {currentImage && (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1200}
                height={900}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain' // 保持比例，居中显示
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          )}

          {/* 底部中央按鈕容器 */}
          {images.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                zIndex: 10
              }}
            >
              {/* 上一張按鈕 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToPrevious();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ‹
              </button>

              {/* 圖片計數器 */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-zpix), monospace'
                }}
              >
                {currentIndex + 1} / {images.length}
              </div>

              {/* 下一張按鈕 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToNext();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
