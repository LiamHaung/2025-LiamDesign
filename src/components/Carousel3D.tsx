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

  // Get Z-index for items
  const getZindex = (array: unknown[], index: number) => 
    array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

  // Display items with proper positioning
  const displayItems = (item: CarouselItem, index: number, activeIndex: number) => {
    const zIndex = getZindex(items, activeIndex)[index];
    const activeValue = (index - activeIndex) / items.length;
    
    return {
      '--zIndex': zIndex,
      '--active': activeValue,
      '--items': items.length,
      '--width': 'clamp(200px, 40vw, 500px)',
      '--height': 'clamp(280px, 50vw, 600px)',
      '--x': `calc(var(--active) * 400%)`,
      '--y': `0px`,
      '--rot': `calc(var(--active) * 60deg)`,
      '--opacity': `calc(var(--zIndex) / var(--items) * 3 - 2)`,
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
        pointerEvents: 'none',
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
              opacity: 'var(--opacity)',
              fontFamily: 'var(--font-zpix), monospace'
            }}
          >
            {/* Background overlay */}
            <div style={{
              content: '',
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .5))'
            }} />
            
            {/* Image */}
            <img 
              src={item.image} 
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />
            
            {/* Title */}
            <div 
              className="title"
              style={{
                position: 'absolute',
                zIndex: 1,
                color: '#fff',
                bottom: '30px',
                left: '30px',
                transition: 'opacity .8s cubic-bezier(0, 0.02, 0, 1)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                textShadow: '0 4px 8px rgba(0, 0, 0, .3)',
                fontFamily: 'var(--font-zpix), monospace',
                fontWeight: 'bold'
              }}
            >
              {item.title}
            </div>
            
            {/* Number */}
            <div 
              className="num"
              style={{
                position: 'absolute',
                zIndex: 1,
                color: '#fff',
                top: '20px',
                left: '30px',
                transition: 'opacity .8s cubic-bezier(0, 0.02, 0, 1)',
                fontSize: 'clamp(32px, 12vw, 120px)',
                fontFamily: 'var(--font-zpix), monospace',
                fontWeight: 'bold',
                opacity: 0.7
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
