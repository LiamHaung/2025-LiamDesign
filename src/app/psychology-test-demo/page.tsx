"use client";
import React, { useState, useEffect } from "react";
import PsychologyTestCard from "@/components/BrandPsychologyTest";

export default function PsychologyTestDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [starPositions, setStarPositions] = useState<Array<{top: number, left: number, duration: number, delay: number}>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 標記為客戶端已掛載
    setIsClient(true);
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始檢查
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // 只在客戶端生成隨機星星位置，避免 hydration 錯誤
    const stars = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2
    }));
    setStarPositions(stars);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: isMobile ? 'clamp(20px, 4vw, 40px)' : 'clamp(40px, 6vw, 80px)',
      fontFamily: 'var(--font-google-sans-flex), sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景裝飾 - 只在客戶端渲染以避免 hydration 錯誤 */}
      {isClient && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          zIndex: 0
        }}>
          {starPositions.map((star, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: '2px',
                height: '2px',
                background: '#fffff3',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(255, 255, 243, 0.8)',
                animation: `twinkle ${star.duration}s infinite`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
      )}

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* 標題區域 */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? 'clamp(30px, 6vw, 50px)' : 'clamp(50px, 8vw, 80px)'
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            color: '#fffff3',
            marginBottom: 'clamp(16px, 3vw, 24px)',
            textShadow: '0 2px 20px rgba(255, 255, 243, 0.3)',
            lineHeight: '1.2'
          }}>
            品牌心理測驗
            <br />
            <span style={{
              fontSize: '0.6em',
              fontWeight: '600',
              color: '#e9a52f',
              display: 'block',
              marginTop: '0.5em'
            }}>
              Brand Psychology Test Demo
            </span>
          </h1>
          <p style={{
            fontSize: isMobile ? 'clamp(0.9rem, 2.5vw, 1.1rem)' : 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#e0e0e0',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            透過 6 個小問題，找出你的品牌適合哪種設計路線
          </p>
        </div>
        
        {/* 測驗卡片區域 */}
        <div style={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto'
        }}>
          <PsychologyTestCard isMobile={isMobile} />
        </div>

        {/* 說明區域 */}
        <div style={{
          marginTop: isMobile ? 'clamp(40px, 8vw, 60px)' : 'clamp(60px, 10vw, 100px)',
          background: 'rgba(255, 255, 243, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(32px, 5vw, 48px)',
          border: '1px solid rgba(255, 255, 243, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.2rem, 3vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '700',
            color: '#fffff3',
            marginBottom: 'clamp(16px, 3vw, 24px)'
          }}>
            關於這個測驗
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(0.85rem, 2vw, 1rem)' : 'clamp(1rem, 1.8vw, 1.2rem)',
            color: '#e0e0e0',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            這個測驗會根據你的回答，分析你的品牌特質，並推薦最適合的設計方向。
            測驗結果會包含：品牌角色定位、設計重點建議，以及推薦的設計服務。
          </p>
        </div>
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

