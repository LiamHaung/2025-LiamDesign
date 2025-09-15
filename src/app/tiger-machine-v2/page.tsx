'use client';
import React from 'react';
import TigerMachineV2 from '../../components/TigerMachineV2';

export default function TigerMachineV2Page() {
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
          alt="老虎機 V2 測試"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '60px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* 標題 */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        textAlign: 'center',
        marginBottom: '60px',
        marginTop: '100px',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-noto-sans-tc), "Noto Sans TC", "Noto Sans", sans-serif',
          fontSize: 'clamp(20px, 3vw, 36px)',
          fontWeight: '800',
          lineHeight: '1.4',
          color: '#2c3e50',
          margin: '0 0 20px 0',
          letterSpacing: '0.02em'
        }}>
          老虎機 V2 - 滾輪式設計測試
        </h1>
        <p style={{
          fontFamily: 'var(--font-noto-sans-tc), "Noto Sans TC", "Noto Sans", sans-serif',
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: '400',
          color: '#666',
          margin: '0'
        }}>
          測試真正的滾輪效果：圖片部分顯示 + 滾動動畫
        </p>
      </div>

      {/* 老虎機 V2 容器 */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <TigerMachineV2 
          icons={['/liam-flow-02.png', '/liam-flow-03.png', '/liam-flow-04.png']}
        />
      </div>

      {/* 控制面板 */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-noto-sans-tc), "Noto Sans TC", "Noto Sans", sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          color: '#2c3e50',
          margin: '0 0 15px 0'
        }}>
          設計討論區
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '5px',
            border: '1px solid #e9ecef'
          }}>
            <strong>左滾輪</strong><br />
            顯示 40%<br />
            <small>下方露出</small>
          </div>
          <div style={{
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '5px',
            border: '1px solid #e9ecef'
          }}>
            <strong>中滾輪</strong><br />
            顯示 60%<br />
            <small>下方露出</small>
          </div>
          <div style={{
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '5px',
            border: '1px solid #e9ecef'
          }}>
            <strong>右滾輪</strong><br />
            顯示 80%<br />
            <small>下方露出</small>
          </div>
        </div>
      </div>
    </div>
  );
}
