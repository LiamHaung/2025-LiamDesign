'use client';
import React from 'react';
import ReelSlotMachine from '../../components/ReelSlotMachine';

export default function ReelSlotTestPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FCFAF7',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Logo 置頂並置中 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img
          src="/cursor-07.png"
          alt="滾輪老虎機動畫"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '60px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* 大標題 - 使用 Noto 字體 */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center',
        marginBottom: '60px',
        marginTop: '100px',
        padding: '0 20px'
      }}>
        <h1 className="noto-title">
          「昨天已經過去，明天尚未到來，今天仍是未知。」<br />
          所以用全新的心情來面對今天吧！
        </h1>
      </div>

      {/* 滾輪老虎機容器 - 響應式設計 */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ReelSlotMachine 
          icons={['/liam-flow-02.png', '/liam-flow-03.png', '/liam-flow-04.png']}
        />
      </div>

      <style jsx>{`
        .noto-title {
          font-family: var(--font-noto-sans-tc), "Noto Sans TC", "Noto Sans", sans-serif;
          font-weight: 800;
          line-height: 1.4;
          color: #2c3e50;
          margin: 0 0 20px 0;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        /* 超大螢幕 (1920px+) */
        @media (min-width: 1920px) {
          .noto-title {
            font-size: 32px;
          }
        }

        /* 大螢幕 (1440px - 1919px) */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .noto-title {
            font-size: 28px;
          }
        }

        /* 桌面版 (1200px - 1439px) */
        @media (min-width: 1200px) and (max-width: 1439px) {
          .noto-title {
            font-size: 24px;
          }
        }

        /* 小桌面版 (1024px - 1199px) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .noto-title {
            font-size: 22px;
          }
        }

        /* 平板橫向 (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .noto-title {
            font-size: 20px;
            white-space: normal;
          }
        }

        /* 平板直向 (481px - 767px) */
        @media (min-width: 481px) and (max-width: 767px) {
          .noto-title {
            font-size: 18px;
            white-space: normal;
          }
        }

        /* 大手機 (376px - 480px) */
        @media (min-width: 376px) and (max-width: 480px) {
          .noto-title {
            font-size: 16px;
            white-space: normal;
          }
        }

        /* 中手機 (321px - 375px) */
        @media (min-width: 321px) and (max-width: 375px) {
          .noto-title {
            font-size: 15px;
            white-space: normal;
          }
        }

        /* 小手機 (320px 以下) */
        @media (max-width: 320px) {
          .noto-title {
            font-size: 14px;
            white-space: normal;
          }
        }

        /* 動態響應式 - 使用 vw 單位作為備用 */
        @media (min-width: 320px) and (max-width: 768px) {
          .noto-title {
            font-size: max(14px, min(18px, 4.5vw));
          }
        }
      `}</style>
    </div>
  );
}
