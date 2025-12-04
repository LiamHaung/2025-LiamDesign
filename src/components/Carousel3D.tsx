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
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Get Z-index for items - 確保激活的卡片始終在最上層
  const getZindex = (array: unknown[], index: number) => 
    array.map((_, i) => {
      if (i === index) {
        // 激活的卡片使用最高的 z-index，確保在最上層
        return array.length * 10;
      } else {
        // 其他卡片根據距離遞減，但確保不會超過激活的卡片
        return array.length - Math.abs(index - i);
      }
    });

  // Display items with proper positioning
  const displayItems = (item: CarouselItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    const activeValue = (index - activeIndex) / items.length;
    
    // 响应式间距：手机端较小，平板中等，桌面端较大
    // 使用 clamp() 实现流畅的响应式间距
    const spacing = 'clamp(300px, 45vw, 500px)'; // 300px (mobile) -> 45vw (tablet) -> 500px (desktop)
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(200px, 40vw, 500px)',
      '--height': 'clamp(280px, 50vw, 600px)',
      '--x': `calc(var(--active) * ${spacing})`,
      '--y': `0px`,
      '--rot': `calc(var(--active) * 60deg)`,
      '--opacity': 1, // 固定100%透明度
    } as React.CSSProperties;
  };

  // Animate function
  const animate = () => {
    const newProgress = Math.max(0, Math.min(progress, 100));
    const newActive = Math.floor(newProgress / 100 * (items.length - 1));
    setActive(newActive);
  };

  useEffect(() => {
    animate();
  }, [progress, animate]);

  // Event handlers
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const wheelProgress = e.deltaY * speedWheel;
    setProgress(prev => prev + wheelProgress);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const mouseProgress = (clientX - startX) * speedDrag;
    setProgress(prev => prev + mouseProgress);
    setStartX(clientX);
  };

  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    setIsDown(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  // Removed unused handleItemClick function

  const handleCardClick = (item: CarouselItem) => {
    console.log('Card clicked:', item.title);
    setSelectedItem(item);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedItem(null);
  };

  // Add event listeners
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDown, startX]);

  return (
    <div 
      ref={carouselRef}
      className="carousel"
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'var(--font-zpix), monospace',
        cursor: isDown ? 'grabbing' : 'grab'
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
                fontFamily: 'var(--font-zpix), monospace',
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
      
      {/* Custom cursor */}
      <div 
        className="cursor"
        style={{
          position: 'fixed',
          zIndex: 10,
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, .2)',
          margin: '-20px 0 0 -20px',
          transition: 'transform .85s cubic-bezier(0, 0.02, 0, 1)',
          display: 'none',
          pointerEvents: 'none'
        }}
      />
      <div 
        className="cursor2"
        style={{
          position: 'fixed',
          zIndex: 10,
          top: 0,
          left: 0,
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, .2)',
          margin: '-1px 0 0 -1px',
          transition: 'transform .7s cubic-bezier(0, 0.02, 0, 1)',
          display: 'none',
          pointerEvents: 'none'
        }}
      />
      
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
