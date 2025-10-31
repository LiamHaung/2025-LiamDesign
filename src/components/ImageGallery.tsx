'use client';

import React, { useEffect, useRef } from 'react';
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
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  isOpen,
  onClose,
  images,
  title,
  description
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  // ESC 鍵關閉
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    console.log('Background clicked, target:', e.target);
    console.log('Gallery ref:', galleryRef.current);
    console.log('Event target === gallery ref:', e.target === galleryRef.current);
    
    // 更寬鬆的條件：點擊背景區域就關閉
    if (e.target === galleryRef.current || (e.target as HTMLElement).classList.contains('gallery-background')) {
      console.log('Closing gallery via background click');
      onClose();
    }
  };

  if (!isOpen || images.length === 0) {
    console.log('ImageGallery not rendering:', { isOpen, imagesLength: images.length });
    return null;
  }

  console.log('ImageGallery rendering with:', { isOpen, imagesLength: images.length, title });

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
          maxWidth: '1200px',
          maxHeight: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'default',
          position: 'relative',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            fontFamily: 'var(--font-zpix), monospace',
            color: '#333',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '5px',
            transition: 'background-color 0.2s',
            zIndex: 10000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          CLOSE
        </button>

        {/* 標題 */}
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-zpix), monospace',
            color: '#333',
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {title}
        </h2>

        {/* 作品敘述 */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              fontFamily: 'var(--font-zpix), monospace',
              color: '#666',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {description}
          </p>
        </div>

        {/* 圖片垂直排列 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
