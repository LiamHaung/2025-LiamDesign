'use client';

import React, { useState, useEffect } from 'react';

export default function WaveBoatTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBoat, setShowBoat] = useState(false);
  const [boatPosition, setBoatPosition] = useState({ x: 0, y: 0 });
  const [isMovingForward, setIsMovingForward] = useState(false);

  useEffect(() => {
    if (isLoading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 100);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      // 进度条完成后，显示船只从按钮位置上升
      setTimeout(() => {
        setShowBoat(true);
        setBoatPosition({ x: 0, y: -20 }); // 从按钮位置稍微往上
      }, 500);
    }
  }, [isLoading, progress]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showBoat && !isMovingForward) {
        setIsMovingForward(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [showBoat, isMovingForward]);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    setShowBoat(false);
    setIsMovingForward(false);
    setBoatPosition({ x: 0, y: 0 });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFF3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 12px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <h1 style={{
        fontFamily: 'var(--font-zpix), monospace',
        color: '#003EC3',
        fontSize: 'clamp(18px, 4vw, 28px)',
        margin: '0 0 40px 0'
      }}>Wave Boat Test（曲線海浪）</h1>

      {/* 进度条区域 */}
      <div style={{
        width: '300px',
        marginBottom: '40px',
        position: 'relative'
      }}>
        {!showBoat && (
          <>
            <div style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#E0E0E0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#003EC3',
                borderRadius: '10px',
                transition: 'width 0.1s ease-out'
              }} />
            </div>
            
            <button 
              onClick={startProgress}
              disabled={isLoading}
              style={{
                width: '120px',
                height: '40px',
                backgroundColor: isLoading ? '#CCCCCC' : '#003EC3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-zpix), monospace',
                fontSize: '14px',
                cursor: isLoading ? 'default' : 'pointer',
                display: 'block',
                margin: '0 auto'
              }}
            >
              {isLoading ? `${progress}%` : '开始载入'}
            </button>
          </>
        )}
      </div>

      {/* 船只区域 */}
      {showBoat && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div 
            className="boat-container"
            style={{
              position: 'relative',
              width: '120px',
              height: '80px',
              transform: `translateX(${boatPosition.x}px) translateY(${boatPosition.y}px)`,
              transition: showBoat ? 'transform 1s ease-out' : 'none',
              opacity: isMovingForward ? 0 : 1
            }}
          >
            <img 
              src="/boat.png" 
              alt="Boat" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            
            {/* 波浪效果 */}
            <div className="wave-effect" />
          </div>
          
          {showBoat && !isMovingForward && (
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#003EC3',
              fontFamily: 'var(--font-zpix), monospace',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              按 Enter 键前进
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .boat-container {
          animation: ${showBoat ? 'boatRise 1s ease-out' : 'none'};
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        .boat-container.moving {
          animation: moveForward 2s ease-out forwards;
        }
        
        .wave-effect {
          position: absolute;
          bottom: -20px;
          left: -50%;
          width: 200%;
          height: 40px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 Q25,35 50,40 Q75,45 100,40 Q125,35 150,40 Q175,45 200,40 Q225,35 250,40 Q275,45 300,40 Q325,35 350,40 Q375,45 400,40 L400,100 L0,100 Z' fill='%23FFFFF3'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 200px 100%;
          animation: wave-move 3s linear infinite;
        }
        
        @keyframes boatRise {
          0% { 
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes wave-move {
          0% { background-position-x: 0; }
          100% { background-position-x: 200px; }
        }
        
        ${isMovingForward ? `
        .boat-container {
          animation: moveForward 2s ease-out forwards !important;
          will-change: transform, opacity;
        }
        
        @keyframes moveForward {
          0% { 
            transform: translateX(0px) translateY(-20px);
            opacity: 1;
          }
          100% { 
            transform: translateX(-100px) translateY(-20px);
            opacity: 0;
          }
        }
        ` : ''}
        
        /* 确保在所有设备上都生效 */
        @media (min-width: 769px) {
          .boat-container {
            animation: ${showBoat ? 'boatRise 1s ease-out' : 'none'};
            will-change: transform, opacity;
          }
        }
      `}</style>
    </div>
  );
} 