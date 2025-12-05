'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImageGallery from './ImageGallery';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  galleryImages: GalleryImage[];
  galleryDescription: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get Z-index for items - 確保激活的卡片始終在最上層
  const getZindex = (array: unknown[], index: number) => 
    array.map((_, i) => {
      if (i === index) {
        return array.length * 10;
      } else {
        return array.length - Math.abs(index - i);
      }
    });

  // Display items with proper positioning
  const displayItems = (item: CarouselItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    const activeValue = (index - activeIndex) / items.length;
    
    const spacing = 'clamp(360px, 54vw, 1320px)'; // 增加20%: 300*1.2=360, 45*1.2=54, 1100*1.2=1320
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(200px, 40vw, 500px)',
      '--height': 'clamp(280px, 50vw, 600px)',
      '--x': `calc(var(--active) * ${spacing})`,
      '--y': `0px`,
      '--rot': `calc(var(--active) * 60deg)`,
      '--opacity': 1,
    } as React.CSSProperties;
  };

  // 导航函数
  const goToNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setActive(index);
  };

  const handleCardClick = (item: CarouselItem) => {
    console.log('Card clicked:', item.title);
    setSelectedItem(item);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedItem(null);
  };

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActive((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        setActive((prev) => (prev + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div 
        ref={carouselRef}
        className="carousel"
        style={{
          position: 'relative',
          zIndex: 1,
          height: 'calc(100vh - 120px)',
          overflow: 'hidden',
          fontFamily: 'var(--font-zpix), monospace'
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={{
              ...displayItems(item, index, active),
              overflow: 'hidden',
              position: 'absolute',
              zIndex: `var(--zIndex)`,
              width: 'var(--width)',
              height: 'var(--height)',
              margin: 'calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5)',
              borderRadius: '20px',
              top: '50%',
              left: '50%',
              userSelect: 'none',
              transformOrigin: '0% 100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              pointerEvents: 'all',
              transform: 'translate(var(--x), var(--y)) rotate(var(--rot))',
              transition: 'transform .8s cubic-bezier(0, 0.02, 0, 1)',
              cursor: 'pointer'
            }}
            onClick={() => handleCardClick(item)}
          >
            <div 
              className="carousel-box"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transition: 'opacity .8s cubic-bezier(0, 0.02, 0, 1)',
                opacity: 1,
                fontFamily: 'var(--font-zpix), monospace'
              }}
            >
              {/* 图层顺序（从下到上）：图片 → 黑色渐层 → 标题 → 数字 */}
              
              {/* Image - 最底层 */}
              <img 
                src={item.image} 
                alt={item.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
              
              {/* Black gradient overlay - 第二层，在图片上方 */}
              <div style={{
                content: '',
                position: 'absolute',
                zIndex: 2,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .5))',
                pointerEvents: 'none'
              }} />
              
              {/* Title - 第三层，在渐层上方 */}
              <div 
                className="title"
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  color: '#fff',
                  bottom: '30px',
                  left: '30px',
                  transition: 'opacity .8s cubic-bezier(0, 0.02, 0, 1)',
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  textShadow: '0 4px 8px rgba(0, 0, 0, .3)',
                  fontFamily: 'var(--font-zpix), monospace',
                  fontWeight: 'bold',
                  pointerEvents: 'none'
                }}
              >
                {item.title}
              </div>
              
              {/* Number - 最上层 */}
              <div 
                className="num"
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  color: '#fff',
                  top: '20px',
                  left: '30px',
                  transition: 'opacity .8s cubic-bezier(0, 0.02, 0, 1)',
                  fontSize: 'clamp(32px, 12vw, 120px)',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  fontWeight: 'bold',
                  opacity: 0.7,
                  pointerEvents: 'none'
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部控制条 */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        padding: '16px 24px',
        borderRadius: '50px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        {/* 左箭头 */}
        <button
          onClick={goToPrev}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>

        {/* 点状指示器 */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: active === index ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: active === index 
                  ? '#003EC3' // 品牌藍
                  : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (active !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== index) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }
              }}
            />
          ))}
        </div>

        {/* 右箭头 */}
        <button
          onClick={goToNext}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '20px',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          →
        </button>
      </div>
      
      {/* Image Gallery */}
      {selectedItem && (
        <>
          {console.log('Rendering ImageGallery with:', { 
            isGalleryOpen, 
            selectedItemTitle: selectedItem.title,
            imagesLength: selectedItem.galleryImages.length 
          })}
          <ImageGallery
            isOpen={isGalleryOpen}
            onClose={handleCloseGallery}
            images={selectedItem.galleryImages}
            title={selectedItem.title}
            description={selectedItem.galleryDescription}
            tags={selectedItem.tags}
          />
        </>
      )}
    </div>
  );
};

export default Carousel3D;
