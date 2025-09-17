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

      {/* 船的定位區（放入船圖並加入動畫） */}
      <div className="boat-stage">
        <div className="boat-h">
          <div className="boat-v">
            <img src="/boat.png" alt="Boat" className="boat-img" />
          </div>
        </div>
      </div>

      {/* 海浪區域（長方形遮色片） */}
      <div className="waves" aria-label="waves" role="img">
        <div className="wave-mask">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <div key={rIdx} className={`wave-strip r-${rIdx}`}>
              {/* 兩段相同內容首尾相接，做無縫循環 */}
              <div className="wave-row">
                {Array.from({ length: circlesPerRow }).map((__, i) => (
                  <div key={i} className="semi" />
                ))}
              </div>
              <div className="wave-row">
                {Array.from({ length: circlesPerRow }).map((__, i) => (
                  <div key={i} className="semi" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .waves {
          /* 以 CSS 變數統一控制半圓大小 */
          --semi: min(6.5vw, 70px);
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .wave-mask {
          width: 100%;
          /* 高度依半圓數與尺寸估算（3排半圓各佔半高，並加上行距） */
          height: calc(var(--semi) * 3.0); /* 長方形遮罩容器高度 */
          position: relative;
          overflow: hidden;
          /* 改為長方形遮罩（移除倒三角 clip-path） */
          clip-path: none;
          -webkit-clip-path: none;
          background: transparent;
        }
        .wave-strip {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: calc(var(--semi) * 0.25); /* 行距 */
          width: 200%; /* 讓內部水平捲動更平順 */
          will-change: transform;
          animation: wave-left 6s linear infinite;
        }
        /* 第二、第三排使用不同速度與方向製造層次 */
        .wave-strip.r-1 { animation: wave-right 8s linear infinite; opacity: 1; }
        .wave-strip.r-2 { animation: wave-left 10s linear infinite; opacity: 1; }

        .wave-row {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        .semi {
          width: var(--semi);
          height: calc(var(--semi) / 2);
          background: #003EC3; /* 品牌藍 */
          border-top-left-radius: 9999px;
          border-top-right-radius: 9999px;
          transform-origin: center;
        }
        /* 交錯：偶數個反轉為向下半圓 */
        .semi:nth-child(even) {
          transform: scaleY(-1);
        }

        @keyframes wave-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--semi))); }
        }
        @keyframes wave-right {
          0% { transform: translateX(calc(-1 * var(--semi))); }
          100% { transform: translateX(0); }
        }

        /* 船的舞台與動畫 */
        .boat-stage {
          width: 100%;
          max-width: 1200px;
          height: min(22vw, 200px);
          margin: 0 0 0 0;
          position: relative;
          overflow: hidden; /* 船出入場隱藏 */
        }
        .boat-h {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          animation: sail-rtl 18s linear infinite;
          will-change: transform;
        }
        .boat-v {
          position: absolute;
          right: 0; /* 從最右側入場 */
          bottom: calc(var(--semi) * 0.2); /* 船體略貼近海面 */
          animation: bob 2.4s ease-in-out infinite;
        }
        .boat-img {
          width: min(34vw, 360px);
          height: auto;
          display: block;
          filter: none;
        }

        @keyframes sail-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(calc(var(--semi) * -0.12)); }
        }

        /* 手機優化：加大半圓，增加觀感，整體高度自適應；船速度稍微放慢 */
        @media (max-width: 768px) {
          .waves { --semi: min(9vw, 84px); }
          .wave-mask { height: calc(var(--semi) * 2.6); }
          .boat-img { width: min(48vw, 360px); }
          .boat-h { animation-duration: 22s; }
        }
      `}</style>
    </div>
  );
} 