'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  preview: string;
  images: string[];
  year: string;
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 輪播自動播放
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // 每5秒切換

    return () => clearInterval(interval);
  }, []);

  // 輪播數據
  const carouselData = [
    {
      id: 1,
      image: '/illustration_1.png',
      title: '品牌視覺設計',
      description: '為新創公司打造完整的品牌識別系統，包含Logo設計、色彩規劃與應用規範。'
    },
    {
      id: 2,
      image: '/illustration_2.png',
      title: 'UI/UX設計',
      description: '設計直觀易用的行動應用程式介面，提升用戶體驗與操作流暢度。'
    },
    {
      id: 3,
      image: '/illustration_3.png',
      title: '包裝設計',
      description: '為有機食品品牌設計環保包裝，結合美觀與永續理念的視覺呈現。'
    }
  ];

  // 作品資料
  const projects = [
    {
      id: 1,
      title: '品牌視覺設計',
      category: 'Branding',
      description: '為新創公司打造完整的品牌識別系統，包含Logo設計、色彩規劃與應用規範。',
      preview: '/illustration_1.png',
      images: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png'],
      year: '2024'
    },
    {
      id: 2,
      title: 'UI/UX設計',
      category: 'Digital',
      description: '設計直觀易用的行動應用程式介面，提升用戶體驗與操作流暢度。',
      preview: '/illustration_2.png',
      images: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png'],
      year: '2024'
    },
    {
      id: 3,
      title: '包裝設計',
      category: 'Package',
      description: '為有機食品品牌設計環保包裝，結合美觀與永續理念的視覺呈現。',
      preview: '/illustration_3.png',
      images: ['/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
      year: '2023'
    },
    {
      id: 4,
      title: '插畫創作',
      category: 'Illustration',
      description: '為兒童繪本創作系列插畫，運用溫暖色調與可愛角色傳達正面價值。',
      preview: '/illustration_4.png',
      images: ['/illustration_4.png', '/illustration_5.png', '/illustration_6.png'],
      year: '2023'
    },
    {
      id: 5,
      title: '網站設計',
      category: 'Web',
      description: '設計響應式企業官網，整合品牌形象與功能需求，提供優質瀏覽體驗。',
      preview: '/illustration_5.png',
      images: ['/illustration_5.png', '/illustration_6.png', '/illustration_1.png'],
      year: '2024'
    },
    {
      id: 6,
      title: '平面設計',
      category: 'Print',
      description: '設計活動海報與宣傳品，運用創意排版與視覺元素吸引目標客群。',
      preview: '/illustration_6.png',
      images: ['/illustration_6.png', '/illustration_1.png', '/illustration_2.png'],
      year: '2023'
    }
  ];

  // 價位表資料
  const pricing = [
    {
      category: 'Brand Identity',
      categoryZh: '品牌識別',
      items: [
        { name: 'Logo Design', nameZh: 'Logo設計', price: '$500-800' },
        { name: 'Brand Guidelines', nameZh: '品牌規範', price: '$300-500' },
        { name: 'Business Card', nameZh: '名片設計', price: '$100-200' }
      ]
    },
    {
      category: 'Digital Design',
      categoryZh: '數位設計',
      items: [
        { name: 'Website Design', nameZh: '網站設計', price: '$800-1500' },
        { name: 'App UI/UX', nameZh: 'App介面設計', price: '$1000-2000' },
        { name: 'Social Media', nameZh: '社群媒體設計', price: '$200-400' }
      ]
    },
    {
      category: 'Print Design',
      categoryZh: '平面設計',
      items: [
        { name: 'Poster Design', nameZh: '海報設計', price: '$200-400' },
        { name: 'Brochure', nameZh: '摺頁設計', price: '$300-600' },
        { name: 'Package Design', nameZh: '包裝設計', price: '$400-800' }
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFF3' }}>
      {/* 固定Logo */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        width: isMobile ? '40px' : '60px',
        height: isMobile ? '40px' : '60px'
      }}>
        <Image
          src="/cursor-07.png"
          alt="Liam Design Logo"
          width={isMobile ? 40 : 60}
          height={isMobile ? 40 : 60}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* 漢堡選單 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: isMobile ? 'block' : 'none'
      }}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#003EC3',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* 手機版選單 */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px'
        }}>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '30px',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          {['Hero', 'Projects', 'About', 'Pricing', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* 桌面版導航 */}
      <nav style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: isMobile ? 'none' : 'flex',
        gap: '30px'
      }}>
        {['Hero', 'Projects', 'About', 'Pricing', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: '#003EC3',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '25px',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <section id="hero" style={{
        height: '100vh',
        background: '#FFFFF3',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* 背景圖片 */}
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

        {/* 不規則色塊1 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: isMobile ? '80%' : '60%',
          height: isMobile ? '35%' : '50%',
          background: '#003EC3',
          clipPath: isMobile 
            ? 'polygon(0% 20%, 20% 5%, 40% 15%, 60% 8%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)'
            : 'polygon(0% 30%, 15% 10%, 35% 20%, 55% 5%, 75% 25%, 90% 15%, 100% 35%, 100% 100%, 0% 100%)',
          borderRadius: isMobile 
            ? '50% 30% 40% 60% / 40% 50% 30% 70%'
            : '60% 40% 30% 70% / 60% 30% 70% 40%',
          transform: `translateY(${scrollY * 0.3}px)`,
          zIndex: 2
        }} />

        {/* 不規則色塊2 */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '60%' : '50%',
          right: isMobile ? '-8%' : '-5%',
          width: isMobile ? '60%' : '45%',
          height: isMobile ? '30%' : '40%',
          background: '#3AAF3A',
          clipPath: isMobile 
            ? 'polygon(15% 0%, 35% 10%, 55% 5%, 75% 15%, 95% 8%, 100% 100%, 0% 100%)'
            : 'polygon(20% 0%, 40% 15%, 60% 5%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)',
          borderRadius: isMobile 
            ? '30% 50% 40% 60% / 20% 50% 30% 60%'
            : '40% 60% 50% 40% / 30% 60% 40% 50%',
          transform: `translateY(${scrollY * 0.2}px)`,
          zIndex: 2
        }} />

        {/* 中央內容 */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: '#333',
          maxWidth: '800px',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontFamily: 'Zpix, monospace'
          }}>
            Liam Design Studio
          </h1>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.2rem, 3vw, 1.5rem)',
            lineHeight: 1.6,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontFamily: 'Zpix, monospace'
          }}>
            Creative Design Solutions
            <br />
            創意設計解決方案
          </p>
        </div>
      </section>

      {/* 作品集區塊 */}
      <section id="projects" style={{
        minHeight: '100vh',
        background: '#003EC3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* 簡化背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: '#3AAF3A',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.1}px)`,
          zIndex: 1,
          opacity: 0.1
        }} />

        {/* 不規則覆蓋色塊 - 從底部往上 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${Math.min(scrollY * 0.8, 1000)}px`,
          background: '#353535',
          clipPath: isMobile 
            ? 'polygon(0% 15%, 15% 5%, 30% 10%, 50% 3%, 70% 12%, 85% 5%, 100% 8%, 100% 100%, 0% 100%)'
            : 'polygon(0% 20%, 20% 0%, 40% 15%, 60% 5%, 80% 20%, 100% 10%, 100% 100%, 0% 100%)',
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
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem',
            fontFamily: 'Zpix, monospace'
          }}>
            My Works
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#FFFFFF',
            fontFamily: 'Zpix, monospace'
          }}>
            精選設計作品
          </p>
        </div>

        {/* 輪播組件 */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          width: '100%',
          marginBottom: '60px'
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            {/* 輪播內容 */}
            <div style={{
              position: 'relative',
              height: isMobile ? '300px' : '400px',
              overflow: 'hidden'
            }}>
              {carouselData.map((slide, index) => (
                <div
                  key={slide.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* 深色遮罩 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
                  }} />
                  
                  {/* 文字內容 */}
                  <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '30px',
                    right: '30px',
                    color: '#FFFFFF',
                    textAlign: 'left'
                  }}>
                    <h3 style={{
                      fontSize: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      fontFamily: 'Zpix, monospace',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                      {slide.title}
                    </h3>
                    <p style={{
                      fontSize: isMobile ? 'clamp(0.9rem, 2.5vw, 1.1rem)' : 'clamp(1rem, 2vw, 1.2rem)',
                      lineHeight: 1.6,
                      fontFamily: 'Zpix, monospace',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 輪播指示器 */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px'
            }}>
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentSlide ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* 輪播控制按鈕 */}
            <button
              onClick={() => setCurrentSlide((prev) => prev === 0 ? carouselData.length - 1 : prev - 1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              ‹
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselData.length)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* 簡化作品佈局 - 整齊網格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}>
          {projects.map((project, index) => {
            // 簡化滾動視差效果
            const textParallax = Math.max(0, scrollY - (index * 150 + 500));
            const textOpacity = Math.min(1, textParallax / 150);

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: `translateY(${scrollY * 0.05}px)`,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  opacity: textOpacity
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateY(${scrollY * 0.05}px)`;
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
              >
                {/* 背景圖片 */}
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${project.preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {/* 類別標籤 */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#FF8603',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    fontFamily: 'Zpix, monospace'
                  }}>
                    {project.category}
                  </div>

                  {/* 年份標籤 */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(0, 62, 195, 0.9)',
                    color: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily: 'Zpix, monospace'
                  }}>
                    {project.year}
                  </div>
                </div>

                {/* 內容區域 */}
                <div style={{ 
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#333',
                    fontFamily: 'Zpix, monospace'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: 1.4,
                    marginBottom: '15px'
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#999',
                      fontFamily: 'Zpix, monospace'
                    }}>
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 服務介紹區塊 */}
      <section id="services" style={{
        minHeight: '100vh',
        background: '#FFFFF3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* 簡化背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: '#003EC3',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.08}px)`,
          zIndex: 1,
          opacity: 0.1
        }} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '40px' : '60px',
          maxWidth: '1400px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          margin: '0 auto'
        }}>
          {/* 左側內文 */}
          <div style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(2rem, 3vw, 2.5rem)',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '20px',
              fontFamily: 'Zpix, monospace',
              transform: `translateY(${scrollY * 0.02}px)`,
              transition: 'all 0.3s ease'
            }}>
              我們的服務
            </h3>
            <p style={{
              fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#666',
              lineHeight: 1.8,
              marginBottom: '30px',
              fontFamily: 'Zpix, monospace',
              transform: `translateY(${scrollY * 0.03}px)`,
              transition: 'all 0.3s ease'
            }}>
              我們策劃並製作棋盤遊戲，透過遊戲擴大交流的可能性，為各個年齡層的人帶來樂趣。從概念發想到最終產品，我們提供完整的設計服務。
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transform: `translateY(${scrollY * 0.04}px)`,
              transition: 'all 0.3s ease'
            }}>
              <span style={{
                fontSize: isMobile ? 'clamp(1rem, 3vw, 1.1rem)' : 'clamp(1.1rem, 2.5vw, 1.2rem)',
                color: '#003EC3',
                fontFamily: 'Zpix, monospace',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}>
                更多的
              </span>
              <div style={{
                width: '20px',
                height: '20px',
                background: '#003EC3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                +
              </div>
            </div>
          </div>

          {/* 右側圖案和文字區域 */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '20px' : '30px',
            position: 'relative',
            height: isMobile ? '200px' : '400px',
            width: isMobile ? '100%' : 'auto'
          }}>
            {/* 虛線框垂直文字 */}
            <div style={{
              position: 'relative',
              transformOrigin: 'center',
              transform: isMobile ? `translateY(${scrollY * 0.02}px)` : `rotate(90deg) translateY(${scrollY * 0.02}px)`,
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                position: 'relative',
                padding: '20px',
                border: '2px dashed #003EC3',
                borderRadius: '20px',
                background: 'rgba(0, 62, 195, 0.05)'
              }}>
                <div style={{
                  fontSize: isMobile ? 'clamp(0.9rem, 2.5vw, 1rem)' : 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#003EC3',
                  fontWeight: 'bold',
                  fontFamily: 'Zpix, monospace',
                  marginBottom: '5px',
                  textAlign: 'center'
                }}>
                  Board Game
                </div>
                <div style={{
                  fontSize: isMobile ? 'clamp(1.2rem, 3.5vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                  color: '#003EC3',
                  fontWeight: 'bold',
                  fontFamily: 'Zpix, monospace',
                  textAlign: 'center'
                }}>
                  棋盤遊戲事業
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '10px',
                  width: '20px',
                  height: '20px',
                  background: '#003EC3',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  +
                </div>
              </div>
            </div>

            {/* 卡片元素和插圖 */}
            <div style={{
              position: 'relative',
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '150px' : '200px',
              transform: `translateY(${scrollY * 0.05}px)`,
              transition: 'all 0.3s ease'
            }}>
              {/* 藍色卡片 */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '60px',
                height: '60px',
                background: '#003EC3',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 'bold',
                transform: `translateY(${Math.sin(scrollY * 0.008 + 1) * 5}px)`,
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                ⭐
              </div>

              {/* 主要插圖 - 使用 hero-02.png */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '120px',
                height: '120px',
                backgroundImage: 'url(/hero-02.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                transform: `translate(-50%, -50%) translateY(${Math.sin(scrollY * 0.01) * 3}px)`
              }} />

              {/* 橙色卡片 */}
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '10%',
                width: '40px',
                height: '50px',
                background: '#FF8603',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold',
                transform: `translateY(${Math.sin(scrollY * 0.012 + 2) * 4}px)`,
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
              }}>
                ⭐
              </div>

              {/* 綠色卡片 */}
              <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '20%',
                width: '35px',
                height: '45px',
                background: '#3AAF3A',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 'bold',
                transform: `translateY(${Math.sin(scrollY * 0.009 + 3) * 3}px)`,
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
              }}>
                ⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 自我介紹區塊 */}
      <section id="about" style={{
        minHeight: '100vh',
        background: '#353535',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* 簡化背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: '#003EC3',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.05}px)`,
          zIndex: 1,
          opacity: 0.1
        }} />

        <div style={{
          maxWidth: '800px',
          textAlign: 'center',
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '40px',
            fontFamily: 'Zpix, monospace',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            About Me
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
            lineHeight: 1.8,
            fontFamily: 'Zpix, monospace',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            我是Liam，一位專注於品牌視覺設計的創意工作者。擁有5年以上的設計經驗，
            擅長將複雜的概念轉化為簡潔有力的視覺語言。從品牌識別到數位介面，
            我致力於為每個專案創造獨特且有意義的設計解決方案。
            相信好的設計不僅要美觀，更要能有效傳達訊息並觸動人心。
          </p>
        </div>
      </section>

      {/* 價位表區塊 */}
      <section id="pricing" style={{
        minHeight: '100vh',
        background: '#FFFFF3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* 簡化背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '120px',
          height: '120px',
          background: '#3AAF3A',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.08}px)`,
          zIndex: 1,
          opacity: 0.1
        }} />

        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
            fontFamily: 'Zpix, monospace'
          }}>
            Pricing
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#666',
            fontFamily: 'Zpix, monospace'
          }}>
            服務價目表
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}>
          {pricing.map((category, index) => {
            // 簡化滾動視差效果
            const textParallax = Math.max(0, scrollY - (index * 100 + 800));
            const textOpacity = Math.min(1, textParallax / 100);

            return (
              <div
                key={category.category}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  transform: `translateY(${scrollY * 0.03}px)`,
                  transition: 'all 0.3s ease',
                  opacity: textOpacity
                }}
              >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#003EC3',
                marginBottom: '10px',
                fontFamily: 'Zpix, monospace'
              }}>
                {category.category}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '30px',
                fontFamily: 'Zpix, monospace'
              }}>
                {category.categoryZh}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      background: '#F8F9FA',
                      borderRadius: '10px'
                    }}
                  >
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333',
                        fontFamily: 'Zpix, monospace'
                      }}>
                        {item.name}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: 'Zpix, monospace'
                      }}>
                        {item.nameZh}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#FF8603',
                      fontFamily: 'Zpix, monospace'
                    }}>
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* 聯絡我們區塊 */}
      <section id="contact" style={{
        minHeight: '100vh',
        background: '#003EC3',
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* 簡化背景裝飾 */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '100px',
          height: '100px',
          background: '#FF8603',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.06}px)`,
          zIndex: 1,
          opacity: 0.1
        }} />

        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '40px',
            fontFamily: 'Zpix, monospace',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Let&apos;s Work Together
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
            lineHeight: 1.8,
            marginBottom: '40px',
            fontFamily: 'Zpix, monospace',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            準備好開始你的專案了嗎？
            <br />
            讓我們一起創造令人驚豔的設計作品！
          </p>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <a
              href="mailto:liam@example.com"
              style={{
                background: '#FF8603',
                color: '#FFFFFF',
                padding: '15px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Zpix, monospace',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 134, 3, 0.3)',
                transform: `translateY(${scrollY * 0.02}px)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 134, 3, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(${scrollY * 0.02}px) scale(1)`;
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 134, 3, 0.3)';
              }}
            >
              Get In Touch
            </a>
            <a
              href="tel:+886912345678"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                padding: '15px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Zpix, monospace',
                border: '2px solid #FFFFFF',
                transition: 'all 0.3s ease',
                transform: `translateY(${scrollY * 0.02}px)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(${scrollY * 0.02}px) scale(1)`;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#353535',
        padding: '40px 20px',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <Image
              src="/cursor-07.png"
              alt="Liam Design Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain', marginRight: '15px' }}
            />
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Zpix, monospace'
            }}>
              Liam Design Studio
            </span>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#999',
            fontFamily: 'Zpix, monospace'
          }}>
            © 2024 Liam Design Studio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 作品彈出視窗 */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
              fontFamily: 'Zpix, monospace'
            }}>
              {selectedProject.title}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {selectedProject.images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    height: '150px',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px'
                  }}
                />
              ))}
            </div>
            
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#666',
              marginBottom: '15px'
            }}>
              {selectedProject.description}
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: '#F8F9FA',
              borderRadius: '10px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#999',
                fontFamily: 'Zpix, monospace'
              }}>
                Year: {selectedProject.year}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#003EC3',
                fontWeight: 'bold',
                fontFamily: 'Zpix, monospace'
              }}>
                {selectedProject.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
