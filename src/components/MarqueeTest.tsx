'use client';
import React from 'react';

interface MarqueeTestProps {
  variant: 'classic' | 'modern' | 'creative';
  className?: string;
}

export default function MarqueeTest({ variant, className = '' }: MarqueeTestProps) {
  const getMarqueeContent = () => {
    switch (variant) {
      case 'classic':
        return {
          text: '進入工作室  Step In →',
          chinese: '進入工作室  Step In →'
        };
      case 'modern':
        return {
          text: '#DesignWithHeart  #BrandCompanion',
          chinese: '#有溫度的設計  #品牌配速員'
        };
      case 'creative':
        return {
          text: 'Give me your idea, take home the design',
          chinese: '將靈感交給我，把作品帶回家'
        };
      default:
        return {
          text: '進入工作室  Step In →',
          chinese: '進入工作室  Step In →'
        };
    }
  };

  const content = getMarqueeContent();

  return (
    <div className={`w-full ${className}`}>
      {/* 黑色跑馬燈 - 3倍距離 */}
      <div className="w-full bg-black py-4 overflow-hidden">
        <div className="whitespace-nowrap" style={{ animation: 'marquee-3x 20s linear infinite' }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>
              {content.text}
            </span>
          ))}
        </div>
      </div>

      {/* 藍色跑馬燈 */}
      <div className="w-full py-4 overflow-hidden" style={{ backgroundColor: '#003EC3' }}>
        <div className="animate-marquee-reverse whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-white text-2xl font-extrabold mx-8" style={{ fontFamily: 'var(--font-press-start-2p)' }}>
              {content.chinese}
            </span>
          ))}
        </div>
      </div>

      {/* 自訂動畫樣式 */}
      <style jsx>{`
        @keyframes marquee-3x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-150%);
          }
        }
      `}</style>
    </div>
  );
}
