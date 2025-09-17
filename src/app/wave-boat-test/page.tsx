'use client';

import React from 'react';

export default function WaveBoatTestPage() {
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
      <h1 style={{
        fontFamily: 'var(--font-zpix), monospace',
        color: '#003EC3',
        fontSize: 'clamp(18px, 4vw, 28px)',
        margin: '0 0 16px 0'
      }}>Wave Boat Test（曲線海浪）</h1>

      {/* 船：右→左 航行 + 上下浮動 */}
      <div className="boat-stage">
        <div className="boat">
          <img src="/boat.png" alt="Boat" className="boat-img" />
        </div>
      </div>

      {/* 曲線海浪（長方形遮罩 + 無限平移） */}
      <div className="waves">
        <div className="curve-mask">
          <div className="curve-strip speed-1">
            <svg className="curve-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
              <path d="M0,60 Q50,0 100,60 T200,60 T300,60 T400,60 T500,60 T600,60 T700,60 T800,60" fill="none" stroke="#003EC3" strokeWidth="10" strokeLinecap="round" />
            </svg>
            <svg className="curve-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
              <path d="M0,60 Q50,0 100,60 T200,60 T300,60 T400,60 T500,60 T600,60 T700,60 T800,60" fill="none" stroke="#003EC3" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <div className="curve-strip speed-2">
            <svg className="curve-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
              <path d="M0,60 Q50,20 100,60 T200,60 T300,60 T400,60 T500,60 T600,60 T700,60 T800,60" fill="none" stroke="#003EC3" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <svg className="curve-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
              <path d="M0,60 Q50,20 100,60 T200,60 T300,60 T400,60 T500,60 T600,60 T700,60 T800,60" fill="none" stroke="#003EC3" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .waves { --h: min(22vw, 200px); --blue: #003EC3; position: relative; width: 100%; max-width: 1200px; }
        .curve-mask { position: relative; height: var(--h); overflow: hidden; }
        .curve-strip { position: absolute; left: 0; top: 0; width: 200%; height: 100%; display: flex; }
        .curve-strip.speed-1 { animation: move-left 10s linear infinite; }
        .curve-strip.speed-2 { top: calc(var(--h) * 0.35); animation: move-left 14s linear infinite; opacity: 0.9; }
        .curve-svg { width: 100%; height: 100%; }

        @keyframes move-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .boat-stage { position: relative; width: 100%; max-width: 1200px; height: min(22vw, 200px); overflow: hidden; z-index: 2; }
        .boat { position: absolute; bottom: calc(var(--h) * 0.20); transform: translateX(110%); animation: sail 18s linear infinite, bob 2.6s ease-in-out infinite; }
        .boat-img { width: min(34vw, 360px); height: auto; display: block; }

        @keyframes sail { 0% { transform: translateX(110%); } 100% { transform: translateX(-140%); } }
        @keyframes bob { 0%,100% { transform: translateX(var(--tx, 0)) translateY(0); } 50% { transform: translateX(var(--tx, 0)) translateY(-10px); } }

        @media (max-width: 768px) {
          .boat-img { width: min(48vw, 360px); }
          .curve-strip.speed-1 { animation-duration: 12s; }
          .curve-strip.speed-2 { animation-duration: 16s; }
          .boat { animation-duration: 22s, 2.6s; }
        }
      `}</style>
    </div>
  );
} 