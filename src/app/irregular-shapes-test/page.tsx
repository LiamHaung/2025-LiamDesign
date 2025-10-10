'use client';

import { useState, useEffect } from 'react';

export default function IrregularShapesTest() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    // 初始化
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ minHeight: '200vh', background: '#FFFFF3' }}>
      {/* Hero Section with Irregular Shapes */}
      <div style={{
        height: '100vh',
        background: '#FFFFF3',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: 1
        }} />

        {/* Irregular Shape 1 - Large Cloud-like - 響應式版本 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          // 桌面版：寬比例大於高比例
          width: isMobile ? '80%' : '60%',
          height: isMobile ? '35%' : '50%',
          background: '#00FF88',
          // 桌面版 clip-path
          clipPath: isMobile 
            ? 'polygon(0% 20%, 20% 5%, 40% 15%, 60% 8%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)'
            : 'polygon(0% 30%, 15% 10%, 35% 20%, 55% 5%, 75% 25%, 90% 15%, 100% 35%, 100% 100%, 0% 100%)',
          // 桌面版 border-radius
          borderRadius: isMobile 
            ? '50% 30% 40% 60% / 40% 50% 30% 70%'
            : '60% 40% 30% 70% / 60% 30% 70% 40%',
          transform: `translateY(${scrollY * 0.3}px)`,
          zIndex: 2
        }} />

        {/* Irregular Shape 2 - Smaller Organic - 響應式版本 */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '60%' : '50%',
          right: isMobile ? '-8%' : '-5%',
          // 桌面版
          width: isMobile ? '60%' : '45%',
          height: isMobile ? '30%' : '40%',
          background: '#00CC66',
          // 桌面版 clip-path
          clipPath: isMobile 
            ? 'polygon(15% 0%, 35% 10%, 55% 5%, 75% 15%, 95% 8%, 100% 100%, 0% 100%)'
            : 'polygon(20% 0%, 40% 15%, 60% 5%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)',
          // 桌面版 border-radius
          borderRadius: isMobile 
            ? '30% 50% 40% 60% / 20% 50% 30% 60%'
            : '40% 60% 50% 40% / 30% 60% 40% 50%',
          transform: `translateY(${scrollY * 0.2}px)`,
          zIndex: 2
        }} />

        {/* Central Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: '#333',
          maxWidth: '600px',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Irregular Shapes Test
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            lineHeight: 1.6,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Testing organic, cloud-like shapes with CSS clip-path and border-radius
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        minHeight: '100vh',
        background: '#003EC3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Irregular Shape 3 - Covering Effect - 響應式版本 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${Math.min(scrollY * 0.8, 1000)}px`,
          background: '#353535',
          // 桌面版 clip-path
          clipPath: isMobile 
            ? 'polygon(0% 15%, 15% 5%, 30% 10%, 50% 3%, 70% 12%, 85% 5%, 100% 8%, 100% 100%, 0% 100%)'
            : 'polygon(0% 20%, 20% 0%, 40% 15%, 60% 5%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)',
          // 桌面版 border-radius
          borderRadius: isMobile 
            ? '40% 20% 30% 50% / 30% 40% 20% 60%'
            : '50% 30% 40% 60% / 40% 50% 30% 70%',
          zIndex: 2,
          transition: 'height 0.1s ease-out'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: '#FFFFFF',
          maxWidth: '600px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Scroll Effect
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.6
          }}>
            The dark shape covers the blue background as you scroll
          </p>
        </div>
      </div>
    </div>
  );
}
