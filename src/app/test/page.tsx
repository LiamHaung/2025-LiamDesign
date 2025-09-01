'use client';
import React from 'react';
import WindowFrame from '@/components/WindowFrame';
import VerticalWindow from '@/components/VerticalWindow';
import FlipBook from '@/components/FlipBook';
import ProfileSection from '@/components/ProfileSection';
import ProjectTimeline from '@/components/ProjectTimeline';
import LoginSignupCard from '@/components/LoginSignupCard';
import TextWindow from '@/components/TextWindow';
import CarouselWindow from '@/components/CarouselWindow';
import ContactForm from '@/components/ContactForm';
import Marquee from '@/components/Marquee';

export default function TestPage() {
  // FlipBook 範例圖片數據
  const flipBookImages = [
    { src: '/menu-0615-demo-test-img/page-1.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-2.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-3.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-4.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-5.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-6.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-12.png', width: 1134, height: 1134 }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '20px',
      fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
      position: 'relative'
    }}>
      {/* 滿版Hero區域 */}
      <section data-hero-section style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-press-start-2p), "Adobe Garamond Pro", serif, monospace',
        overflow: 'hidden'
      }}>
        {/* 背景格線紋理 */}
        <div style={{
          position: 'absolute',
          inset: '0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />
        
        {/* 主要文字 */}
        <div style={{
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            fontFamily: '"Adobe Garamond Pro", "Times New Roman", serif',
            fontWeight: 'normal',
            margin: '0',
            textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
            letterSpacing: '0.1em',
            lineHeight: '0.9',
            background: 'linear-gradient(45deg, #ffffff, #cccccc, #ffffff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'glow 3s ease-in-out infinite alternate'
          }}>
            Liam.Design
          </h1>
          
          {/* 副標題 */}
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 2rem)',
            margin: '2rem 0 0 0',
            color: '#cccccc',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.2em',
            opacity: 0.8
          }}>
            PORTFOLIO
          </p>
        </div>

        {/* 裝飾性元素 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(255,255,255,0.1)',
          transform: 'rotate(45deg)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '60px',
          height: '60px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse'
        }} />

        {/* 進入按鈕 */}
        <button 
          onClick={() => {
            const hero = document.querySelector('[data-hero-section]');
            if (hero) {
              hero.style.display = 'none';
            }
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            padding: '12px 24px',
            fontSize: '14px',
            fontFamily: 'var(--font-press-start-2p), "Adobe Garamond Pro", serif, monospace',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
        >
          ENTER
        </button>
      </section>

      {/* 測試用手機版按鈕 */}
      <div 
        className="lg:hidden fixed top-4 right-4"
        style={{ 
          zIndex: 9999,
          width: '44px',
          height: '44px',
          background: '#ff0000',
          border: '2px outset #c0c0c0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontFamily: 'var(--font-zpix), monospace',
          fontSize: '18px',
          color: 'white'
        }}
        onClick={() => {
          console.log('手機版按鈕被點擊！');
          alert('手機版按鈕正常工作！現在請到主頁面測試漢堡選單');
        }}
      >
        📱
      </div>

      {/* 新增：Marquee 直式跑馬燈組件展示區域 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          color: 'black',
          fontSize: '18px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          🎬 Marquee 直式跑馬燈組件
        </h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {/* 基本跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              基本跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={30}
              width="80px"
              fontSize="16px"
            />
          </div>

          {/* 快速跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              快速跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={60}
              width="80px"
              fontSize="16px"
            />
          </div>

          {/* 寬跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              寬跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={30}
              width="120px"
              fontSize="20px"
            />
          </div>

          {/* 自定義文案跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              自定義文案跑馬燈
            </h3>
            <Marquee 
              text="🎨 冬山集合作社 - 深耕宜蘭在地文化的設計工作室 🎨"
              speed={40}
              width="100px"
              fontSize="16px"
            />
          </div>
        </div>
      </section>

      <h1 style={{ 
        color: 'black', 
        textAlign: 'center', 
        marginBottom: '40px',
        fontSize: '24px',
        textShadow: 'none'
      }}>
        組件測試展示頁面
      </h1>

      {/* CSS動畫 */}
      <style jsx>{`
        @keyframes glow {
          0% { filter: brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
          100% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255,255,255,0.5)); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}
