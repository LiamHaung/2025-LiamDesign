'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  height?: string;
}

const HorizontalScroll: React.FC<Props> = ({ children, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<string>('auto');
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const colors = ['#fae14b', '#59abc3', '#3d3735'];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapperWidth = wrapperRef.current.scrollWidth;
    setWrapperWidth(wrapperWidth);

    if (!height) {
      const screenWidth = windowWidth;
      const ratio = wrapperWidth / screenWidth;
      setContainerHeight(`${ratio * 100}vh`);
    } else {
      setContainerHeight(height);
    }
  }, [height, windowWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      
      // 計算滾動進度 (0-100)
      const scrollRange = containerHeight - windowHeight;
      const scrolled = scrollTop - containerTop;
      const progress = Math.max(0, Math.min(100, (scrolled / scrollRange) * 100));
      
      setScrollProgress(progress);

      // 計算當前區塊
      const sectionCount = 3; // 總共有三個顏色區塊
      const sectionProgress = Math.floor((progress / 100) * sectionCount);
      setCurrentSection(Math.min(sectionCount - 1, Math.max(0, sectionProgress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* 顏色指示器 */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-4 h-4 rounded-full transition-all duration-300 border-2"
            style={{
              backgroundColor: color,
              transform: `scale(${currentSection === index ? 1.5 : 1})`,
              borderColor: currentSection === index ? '#000' : 'transparent',
            }}
          />
        ))}
      </div>

      <div 
        ref={containerRef}
        style={{ 
          height: containerHeight,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            position: scrollProgress > 0 && scrollProgress < 100 ? 'fixed' : scrollProgress >= 100 ? 'absolute' : 'static',
            top: scrollProgress > 0 && scrollProgress < 100 ? 0 : 'auto',
            bottom: scrollProgress >= 100 ? 0 : 'auto',
            left: 0,
            width: '100%',
            height: '100vh',
            transform: windowWidth ? `translateX(${-scrollProgress * ((wrapperWidth - windowWidth) / wrapperWidth)}%)` : 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll; 