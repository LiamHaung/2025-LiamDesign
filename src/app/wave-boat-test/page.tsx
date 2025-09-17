'use client';

import React from 'react';

export default function WaveBoatTestPage() {
  const circlesPerRow = 16; // 每排半圓數量（會自適應縮放）
  const rows = 3; // 海浪排數

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFF3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 12px',
      boxSizing: 'border-box'
    }}>
      {/* 頁面標題（方便辨識測試頁）*/}
      <h1 style={{
        fontFamily: 'var(--font-zpix), monospace',
        color: '#003EC3',
        fontSize: 'clamp(18px, 4vw, 28px)',
        margin: '0 0 16px 0'
      }}>Wave Boat Test（海浪半圓排版）</h1>

      {/* 船的定位區（之後可放入船圖，預留空間不顯示） */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        height: 'min(22vw, 200px)',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
        {/* 之後可在此放入 <img src="/your-boat.png" /> 或 next/image */}
      </div>

      {/* 海浪區域 */}
      <div className="waves" aria-label="waves" role="img">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="wave-row" style={{
            // 交錯位移，讓波浪有錯位層次
            transform: rIdx % 2 === 1 ? 'translateX(5%)' : 'translateX(0)'
          }}>
            {Array.from({ length: circlesPerRow }).map((__, i) => (
              <div key={i} className="semi" />
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .waves {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          gap: 10px; /* 行距 */
          align-items: center;
          justify-content: center;
        }
        .wave-row {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(${circlesPerRow}, 1fr);
          place-items: end center;
          gap: 0; /* 列內無縫接 */
        }
        .semi {
          /* 半圓形：以寬為基準的一半高度 */
          width: min(6.5vw, 70px);
          height: calc(min(6.5vw, 70px) / 2);
          background: #353535;
          opacity: 0.9;
          border-top-left-radius: 9999px;
          border-top-right-radius: 9999px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        /* 第二、第三排降低不透明度，做層次 */
        .wave-row:nth-child(2) .semi { opacity: 0.75; }
        .wave-row:nth-child(3) .semi { opacity: 0.6; }

        /* 手機優化：加大半圓，減少空隙 */
        @media (max-width: 768px) {
          .waves { gap: 8px; }
          .semi {
            width: min(9vw, 84px);
            height: calc(min(9vw, 84px) / 2);
          }
        }
      `}</style>
    </div>
  );
} 