"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// 載入頁面組件 - 完整複製自 hero-simple-test
const LoadingPage = ({ 
  loadingPhase, 
  countdown,
  onEnterMainContent,
  isDesktop
}: { 
  loadingPhase: 'loading' | 'ready' | 'main';
  countdown: number | null;
  onEnterMainContent: () => void;
  isDesktop: boolean;
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease-out',
      opacity: loadingPhase === 'main' ? 0 : 1,
      pointerEvents: loadingPhase === 'main' ? 'none' : 'auto'
    }}>
      {/* 放大500%的軌道系統和流星 - 複製3個，錯落分布 */}
      {[
        { top: '10%', left: '5%', opacity: 0.5, centerColor: '#003EC3' },
        { top: '20%', right: '5%', opacity: 0.5, centerColor: '#e9a52f' },
        { bottom: '15%', left: '15%', opacity: 0.5, centerColor: '#fffff3' }
      ].map((group, groupIndex) => (
        <div
          key={`orbit-group-${groupIndex}`}
          style={{
            position: 'absolute',
            ...group,
            width: '3000px', // 600px * 5 = 3000px
            height: '3000px',
            transform: 'translate(-50%, -50%)',
            opacity: group.opacity,
            zIndex: 1
          }}
        >
          {/* 外軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3000px', // 600px * 5
            height: '3000px',
            border: '10px solid rgba(0, 62, 195, 0.3)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 20s linear infinite'
          }} />
          
          {/* 外軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3000px',
            height: '3000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 20s linear infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '40px', // 8px * 5
              height: '40px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 50px rgba(0, 62, 195, 0.8)' // 10px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '30px', // 6px * 5
              height: '30px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 40px rgba(74, 144, 226, 0.6)' // 8px * 5
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              width: '35px', // 7px * 5
              height: '35px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 45px rgba(0, 62, 195, 0.7)' // 9px * 5
            }} />
          </div>
          
          {/* 中軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2000px', // 400px * 5
            height: '2000px',
            border: '10px solid rgba(0, 62, 195, 0.5)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 15s linear infinite reverse'
          }} />
          
          {/* 中軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2000px',
            height: '2000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 15s linear infinite reverse'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '30px', // 6px * 5
              height: '30px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 40px rgba(74, 144, 226, 0.8)' // 8px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '25px', // 5px * 5
              height: '25px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 30px rgba(0, 62, 195, 0.6)' // 6px * 5
            }} />
          </div>
          
          {/* 內軌道 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1000px', // 200px * 5
            height: '1000px',
            border: '10px solid rgba(0, 62, 195, 0.7)', // 2px * 5
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 10s linear infinite'
          }} />
          
          {/* 內軌道圓點 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1000px',
            height: '1000px',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit 10s linear infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '20px', // 4px * 5
              height: '20px',
              background: '#003EC3',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 30px rgba(0, 62, 195, 0.9)' // 6px * 5
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '0',
              width: '15px', // 3px * 5
              height: '15px',
              background: '#4A90E2',
              borderRadius: '50%',
              transform: 'translateY(-50%)',
              boxShadow: '0 0 20px rgba(74, 144, 226, 0.7)' // 4px * 5
            }} />
          </div>
          
          {/* 中心點 - 根據組別設置不同顏色 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px', // 20px * 5
            height: '100px',
            background: group.centerColor,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 100px ${group.centerColor}` // 20px * 5
          }} />
          
          {/* 流星效果 - 放大500% */}
          {[
            { angle: 60, startX: 10, delay: 0 },
            { angle: 60, startX: 50, delay: 3.0 },
            { angle: 60, startX: 80, delay: 6.0 }
          ].map((meteor, i) => (
            <div
              key={`meteor-${groupIndex}-${i}`}
              style={{
                position: 'absolute',
                left: `${meteor.startX}%`,
                top: '-250px', // -50px * 5
                width: '120px', // 24px * 5
                height: '120px',
                backgroundImage: 'url(/star-big.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                animation: `meteorFall ${3 + (i % 3) * 0.5}s linear infinite`,
                animationDelay: `${meteor.delay}s`,
                zIndex: 2,
                filter: 'drop-shadow(0 0 40px rgba(0, 62, 195, 0.8))', // 8px * 5
                transform: `rotate(${meteor.angle - 45}deg)`
              }}
            />
          ))}
        </div>
      ))}

      {/* 原始軌道系統 - 保留在中心 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 2
      }}>
        {/* 外軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          border: '2px solid rgba(0, 62, 195, 0.3)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 20s linear infinite'
        }} />
        
        {/* 外軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 20s linear infinite'
        }}>
        
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '8px',
            height: '8px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(0, 62, 195, 0.8)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '6px',
            height: '6px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            width: '7px',
            height: '7px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 9px rgba(0, 62, 195, 0.7)'
          }} />
        </div>
        
        {/* 中軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          border: '2px solid rgba(0, 62, 195, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 15s linear infinite reverse'
        }} />
        
        {/* 中軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 15s linear infinite reverse'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '6px',
            height: '6px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.8)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '5px',
            height: '5px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 6px rgba(0, 62, 195, 0.6)'
          }} />
        </div>
        
        {/* 內軌道 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          border: '2px solid rgba(0, 62, 195, 0.7)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 10s linear infinite'
        }} />
        
        {/* 內軌道圓點 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit 10s linear infinite'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '4px',
            height: '4px',
            background: '#003EC3',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 6px rgba(0, 62, 195, 0.9)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            width: '3px',
            height: '3px',
            background: '#4A90E2',
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 4px rgba(74, 144, 226, 0.7)'
          }} />
        </div>
        
        {/* 中心點 (Logo 周圍) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '20px',
          background: '#003EC3',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #003EC3'
        }} />
      </div>

      {/* 背景星星裝飾 */}
      {[...Array(9)].map((_, i) => {
        const positions = [
          { top: '10%', left: '15%' },
          { top: '20%', right: '20%' },
          { top: '30%', left: '8%' },
          { top: '40%', right: '12%' },
          { top: '50%', left: '25%' },
          { top: '60%', right: '18%' },
          { top: '70%', left: '10%' },
          { top: '25%', right: '40%' },
          { top: '55%', left: '45%' }
        ];
        const pos = positions[i] || { top: `${10 + i * 5}%`, left: `${10 + i * 5}%` };
        const size = 8 + (i % 3) * 4; // 8px, 12px, 16px 交替
        return (
          <div
            key={`loading-star-${i}`}
            style={{
              position: 'absolute',
              ...pos,
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: `twinkle ${2 + i * 0.2}s infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.6 + (i % 3) * 0.1,
              zIndex: 1
            }}
          />
        );
      })}

      {/* 流星效果 - 使用星星圖片 */}
      {[
        { angle: 60, startX: 10, delay: 0 },
        { angle: 60, startX: 50, delay: 3.0 },
        { angle: 60, startX: 80, delay: 6.0 }
      ].map((meteor, i) => {
        return (
        <div
          key={`loading-meteor-${i}`}
          style={{
              position: 'absolute',
              left: `${meteor.startX}%`,
              top: '-50px',
              width: '24px',
              height: '24px',
              backgroundImage: 'url(/star-big.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              animation: `meteorFall ${3 + (i % 3) * 0.5}s linear infinite`,
              animationDelay: `${meteor.delay}s`,
              opacity: 0.9,
              zIndex: 2,
              filter: 'drop-shadow(0 0 8px rgba(0, 62, 195, 0.8))',
              transform: `rotate(${meteor.angle - 45}deg)`
            }}
          />
        );
      })}


      {/* 畫框和文字按鈕容器 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: isDesktop ? 'auto' : 'clamp(320px, 50vw, 600px)'
      }}>
        {/* 圖釘 - 先放置，作為V形繩子的對齊點 */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '16px',
          background: 'radial-gradient(circle, #e9a52f 0%, #d8941f 70%, #c7830f 100%)',
          borderRadius: '50%',
          zIndex: 12,
          boxShadow: '0 2px 8px rgba(233, 165, 47, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
        }} />
        
        {/* 懸掛繩子 - V形，尖端對齊圖釘中心 */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: '40px',
          zIndex: 11,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {/* 左側繩子 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px', // 從圖釘中心點開始（圖釘高度16px，中心在8px）
            width: '2px',
            height: '32px',
            background: 'linear-gradient(to bottom, #8B4513, #654321)',
            transform: 'translateX(-50%) rotate(-15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }} />
          {/* 右側繩子 */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8px', // 從圖釘中心點開始
            width: '2px',
            height: '32px',
            background: 'linear-gradient(to bottom, #8B4513, #654321)',
            transform: 'translateX(-50%) rotate(15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }} />
        </div>

        {/* 畫框容器 - 已移除畫框邊框和背景 */}
        <div style={{
          position: 'relative',
          width: 'clamp(320px, 50vw, 600px)',
          height: 'clamp(240px, 37.5vw, 450px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'clamp(8px, 1.2vw, 16px)'
        }}>
          {/* 畫框內漸層區域 - 漸層背景一開始就顯示 */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #fffff3 0%, #f3e8c1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* 復古電影十字線和同心圓 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}>
              {/* 十字線 - 水平線 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '1px',
                background: 'rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-50%)'
              }} />
              {/* 十字線 - 垂直線 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '1px',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                transform: 'translateX(-50%)'
              }} />
              
              {/* 外層同心圓 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(200px, 40vw, 400px)',
                height: 'clamp(200px, 40vw, 400px)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '50%'
              }} />
              
              {/* 內層同心圓 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(120px, 24vw, 240px)',
                height: 'clamp(120px, 24vw, 240px)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '50%'
              }} />
            </div>

            {/* 復古電影效果覆蓋層 */}
            {countdown !== null && countdown > 0 && (
              <>
                {/* 顆粒感效果 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      rgba(0, 0, 0, 0.03) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 3px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      rgba(0, 0, 0, 0.03) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 3px
                    )
                  `,
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                
                {/* 閃爍效果 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  animation: 'filmFlicker 0.15s infinite',
                  pointerEvents: 'none',
                  zIndex: 3
                }} />
              </>
            )}

            {/* 倒計時數字 - 應用復古電影效果 */}
            {countdown !== null && countdown > 0 && (
              <div style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                fontWeight: '500',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                color: '#000000',
                animation: 'countdownPulse 1s ease-out',
                zIndex: 4,
                position: 'relative',
                letterSpacing: '0.1em',
                filter: 'grayscale(100%) contrast(120%) brightness(0.9)'
              }}>
                {countdown}
              </div>
            )}

            {/* Logo - 在畫框內右下角，倒計時2和1之間出現，之後持續存在 */}
            {(countdown === 1 || (countdown === null && loadingPhase === 'ready')) && (
              <div style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vw, 40px)',
                right: 'clamp(20px, 4vw, 40px)',
                zIndex: 5,
                animation: countdown === 1 ? 'logoFadeIn 0.8s ease-out both' : 'none',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                {/* 毛玻璃背景 */}
                <div style={{
                  position: 'absolute',
                  width: 'clamp(100px, 16vw, 160px)',
                  height: 'clamp(100px, 16vw, 160px)',
                  background: 'rgba(255, 255, 243, 0.4)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  zIndex: 0
                }} />
                <Image
                  src="/cursor-07.png"
                  alt="Liam Design Logo"
                  width={80}
                  height={80}
                  style={{
                    width: 'clamp(60px, 10vw, 100px)',
                    height: 'clamp(60px, 10vw, 100px)',
                    objectFit: 'contain',
                    filter: 'brightness(1.2)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>
            )}

            {/* 倒計時結束後淡入的圖片和雲朵 */}
            {countdown === null && loadingPhase === 'ready' && (
              <>
                {/* 雲朵 - 在圖片後面 */}
                {[
                  { src: '/cloud-2.png', top: '10%', left: '5%', width: 'clamp(80px, 15vw, 150px)', delay: 0 },
                  { src: '/cloud-3.png', top: '15%', right: '8%', width: 'clamp(100px, 18vw, 180px)', delay: 0.5 },
                  { src: '/cloud-2.png', bottom: '20%', left: '10%', width: 'clamp(90px, 16vw, 160px)', delay: 1 },
                  { src: '/cloud-3.png', bottom: '15%', right: '5%', width: 'clamp(85px, 15vw, 150px)', delay: 1.5 },
                  { src: '/cloud-2.png', top: '50%', left: '2%', width: 'clamp(70px, 12vw, 130px)', delay: 2 }
                ].map((cloud, index) => (
                  <div
                    key={`cloud-${index}`}
                    style={{
                      position: 'absolute',
                      top: cloud.top,
                      bottom: cloud.bottom,
                      left: cloud.left,
                      right: cloud.right,
                      width: cloud.width,
                      height: 'auto',
                      zIndex: 3,
                      opacity: 0,
                      animation: `fadeIn 1s ease-out ${cloud.delay}s forwards, floatCloud 6s ease-in-out ${cloud.delay}s infinite`
                    }}
                  >
                    <Image
                      src={cloud.src}
                      alt="Cloud"
                      width={150}
                      height={100}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                ))}

                {/* 主要圖片 - service-3.png */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                  animation: 'fadeIn 1s ease-out'
                }}>
                  <Image
                    src="/service-3.png"
                    alt="Service"
                    width={600}
                    height={450}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'none',
                      animation: 'sway 3s ease-in-out infinite',
                      transformOrigin: 'center center'
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 文字和按鈕容器 - 畫架下方，移動版上下布局 */}
        {countdown === null && loadingPhase === 'ready' && (
          <div style={{
            width: '100%',
            marginTop: isDesktop ? '0' : 'clamp(24px, 4vh, 40px)',
            display: isDesktop ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vh, 24px)'
          }}>
            {/* 文字內容 - 移動版100%寬度 */}
            <div style={{
              width: '100%',
              textAlign: 'center',
              animation: 'fadeInUp 1s ease-out 0s both'
            }}>
              <div style={{
                color: '#fffff3',
                fontSize: 'clamp(0.96rem, 2.4vw, 1.44rem)',
                fontWeight: '400',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                letterSpacing: '0.12em',
                lineHeight: '0.8',
                textShadow: '0 0 20px rgba(0, 62, 195, 0.5)',
                padding: '0 clamp(12px, 3vw, 20px)'
              }}>
                歡迎來 <span style={{ fontWeight: '700' }}>Liam Studio</span>
                <br /><br />
                這裡提供<span style={{ fontWeight: '700' }}>有溫度且實用的設計</span>
                <br /><br />
                一起來書寫<span style={{ fontWeight: '700' }}>好玩的品牌故事</span>吧！
              </div>
            </div>

            {/* L型按鈕 - 移動版100%寬度 */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              animation: 'fadeInUp 0.8s ease-out 0.5s both'
            }}>
              {/* L型按鈕（移動版）- 沿用桌面版L型 */}
              <div style={{
                position: 'relative',
                width: 'clamp(200px, 60vw, 280px)',
                height: 'clamp(50px, 12vw, 70px)'
              }}>
                {/* 主按鈕區域 - 右側 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 'calc(100% - 30px)',
                    height: '100%',
                    background: '#003EC3',
                    border: 'none',
                    color: 'white',
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    zIndex: 2,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      extensionBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(0) scale(1)';
                      extensionBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2em' }}>←</span>
                  <span>Enter</span>
                </button>
                {/* L型延伸部分 - 左側下方 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: 0,
                    width: '30px',
                    height: 'calc(100% - 30px)',
                    background: '#003EC3',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    zIndex: 1,
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                  onMouseEnter={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      mainBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(0) scale(1)';
                      mainBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 文字和按鈕容器 - 桌面版左右布局 */}
      {countdown === null && loadingPhase === 'ready' && isDesktop && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: 'clamp(320px, 50vw, 600px)',
          marginTop: 'clamp(40px, 8vh, 80px)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0
        }}>
          {/* 文字內容 - 左側70% */}
          <div style={{
            flex: '0 0 70%',
            width: '70%',
            textAlign: 'left',
            animation: 'slideInFromRight 1s ease-out 0s both'
          }}>
            <div style={{
              color: '#fffff3',
              fontSize: 'clamp(0.96rem, 2.4vw, 1.44rem)',
              fontWeight: '400',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              letterSpacing: '0.12em',
              lineHeight: '0.8',
              textShadow: '0 0 20px rgba(0, 62, 195, 0.5)'
            }}>
              歡迎來 <span style={{ fontWeight: '700' }}>Liam Studio</span>
              <br /><br />
              這裡提供<span style={{ fontWeight: '700' }}>有溫度且實用的設計</span>
              <br /><br />
              一起來書寫<span style={{ fontWeight: '700' }}>好玩的品牌故事</span>吧！
            </div>
          </div>

          {/* L型按鈕 - 右側30% */}
          <div style={{
            flex: '0 0 30%',
            width: '30%',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeInUp 0.8s ease-out 0.5s both'
          }}>
            {/* L型按鈕（桌面版）- 鏡像，像鍵盤Enter鍵 */}
            <div style={{
                position: 'relative',
                width: 'clamp(120px, 15vw, 180px)',
                height: 'clamp(60px, 8vw, 90px)'
              }}>
                {/* 主按鈕區域 - 右側 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 'calc(100% - 30px)',
                    height: '100%',
                    background: '#003EC3',
                    border: 'none',
                    color: 'white',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    zIndex: 2,
                    borderTopRightRadius: '8px', // 外圍右上角 - 圓角
                    borderBottomRightRadius: '8px', // 外圍右下角 - 圓角
                    borderTopLeftRadius: '8px', // 外圍左上角 - 圓角
                    borderBottomLeftRadius: '0' // 與延伸部分連接處 - 直角
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      extensionBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    const extensionBtn = e.currentTarget.parentElement?.querySelector('button:last-child') as HTMLElement;
                    if (extensionBtn) {
                      extensionBtn.style.transform = 'translateY(0) scale(1)';
                      extensionBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2em' }}>←</span>
                  <span>Enter</span>
                </button>
                {/* L型延伸部分 - 左側下方 */}
                <button
                  onClick={onEnterMainContent}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: 0,
                    width: '30px',
                    height: 'calc(100% - 30px)',
                    background: '#003EC3',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 62, 195, 0.3)',
                    zIndex: 1,
                    borderTopLeftRadius: '8px', // 外圍左上角 - 圓角
                    borderBottomLeftRadius: '8px', // 外圍左下角 - 圓角
                    borderTopRightRadius: '0', // 與主按鈕連接處 - 直角
                    borderBottomRightRadius: '0' // 右下角 - 直角
                  }}
                  onMouseEnter={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(-2px) scale(1.02)';
                      mainBtn.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                    }
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 62, 195, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const mainBtn = e.currentTarget.parentElement?.querySelector('button:first-child') as HTMLElement;
                    if (mainBtn) {
                      mainBtn.style.transform = 'translateY(0) scale(1)';
                      mainBtn.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                    }
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 62, 195, 0.3)';
                  }}
                />
              </div>
          </div>
        </div>
      )}

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes meteorFall {
          0% { 
            opacity: 0;
            transform: translateX(-200px) translateY(-200px) rotate(15deg) scale(0.5);
            filter: blur(4px) drop-shadow(0 0 8px rgba(0, 62, 195, 0.8));
          }
          10% { 
            opacity: 0.8;
            filter: blur(2px) drop-shadow(0 0 12px rgba(0, 62, 195, 1));
          }
          50% { 
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(15deg) scale(1);
            filter: blur(0px) drop-shadow(0 0 16px rgba(0, 62, 195, 1));
          }
          90% { 
            opacity: 0.8;
            filter: blur(2px) drop-shadow(0 0 12px rgba(0, 62, 195, 0.8));
          }
          100% { 
            opacity: 0;
            transform: translateX(200px) translateY(calc(100vh + 200px)) rotate(15deg) scale(0.5);
            filter: blur(4px) drop-shadow(0 0 8px rgba(0, 62, 195, 0.5));
          }
        }
        
        @keyframes meteorStarBlur {
          0% { opacity: 0; transform: translateX(-200px) translateY(200px) rotate(45deg); filter: blur(3px); }
          20% { opacity: 0.3; transform: translateX(-100px) translateY(100px) rotate(45deg); filter: blur(2px); }
          50% { opacity: 1; transform: translateX(0px) translateY(0px) rotate(45deg); filter: blur(0px); }
          80% { opacity: 0.3; transform: translateX(100px) translateY(-100px) rotate(45deg); filter: blur(2px); }
          100% { opacity: 0; transform: translateX(200px) translateY(-200px) rotate(45deg); filter: blur(3px); }
        }
        
        @keyframes countdownPulse {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
        }
        
        @keyframes filmFlicker {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.15; }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-8px) rotate(-1deg);
          }
          75% {
            transform: translateX(8px) rotate(1deg);
          }
        }
        
        @keyframes floatCloud {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        
        @keyframes logoRise {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes logoFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// 測試頁面主組件
export default function LoadingPageTest() {
  // 載入狀態管理
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'ready' | 'main'>('loading');
  const [countdown, setCountdown] = useState<number | null>(3);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // 檢測桌面/移動設備
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 倒計時動畫
  useEffect(() => {
    if (loadingPhase === 'loading' && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else if (countdown === 1) {
          // 直接進入 ready 狀態並清除倒計時
          setCountdown(null);
          setLoadingPhase('ready');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadingPhase, countdown]);

  // 進入主內容處理
  const handleEnterMainContent = () => {
    setLoadingPhase('main');
    setTimeout(() => {
      setShowMainContent(true);
    }, 800);
  };

  return (
    <>
      {/* 載入頁面 */}
      {!showMainContent && (
        <LoadingPage 
          loadingPhase={loadingPhase}
          countdown={countdown}
          onEnterMainContent={handleEnterMainContent}
          isDesktop={isDesktop}
        />
      )}

      {/* 主內容 - 測試用簡單內容 */}
      {showMainContent && (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: '900',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            color: '#353535',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            測試頁面
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: '400',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            color: '#555',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            這是入口頁測試頁面，你可以在這裡測試新的入口頁設計。
          </p>
        </div>
      )}
    </>
  );
}

