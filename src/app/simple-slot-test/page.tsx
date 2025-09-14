'use client';
import React, { useState } from 'react';
import SimpleSlotMachine from '../../components/SimpleSlotMachine';

export default function SimpleSlotTestPage() {
  // 您可以替換成自己的圖案
  const customSymbols: [string, string, string] = ['🔥', '⚙️', '🧠'];
  const targetSymbols: [string, string, string] = ['🔥', '⚙️', '🧠'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        {/* 標題 */}
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          簡化版老虎機
        </h1>

        <p style={{
          color: '#7f8c8d',
          fontSize: '1.1rem',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          三個圖案自動輪替，依序啟動後同時定格
        </p>
      </div>

      {/* 老虎機 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '40px'
      }}>
        <SimpleSlotMachine
          symbols={customSymbols}
          targetSymbols={targetSymbols}
          autoStart={true}
          interval={4000} // 4秒重複一次
          spinDuration={2500} // 2.5秒旋轉時間
        />
      </div>

      {/* 說明 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.6)',
        padding: '30px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        maxWidth: '600px',
        textAlign: 'left'
      }}>
        <h3 style={{ 
          color: '#2c3e50', 
          marginBottom: '20px', 
          textAlign: 'center' 
        }}>
          使用說明
        </h3>
        <div style={{ color: '#34495e', lineHeight: '1.6' }}>
          <p><strong>🎯 功能特點：</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>自動循環播放，無需手動操作</li>
            <li>三個圖案依序啟動（左 → 中 → 右）</li>
            <li>旋轉時有上下震動和旋轉效果</li>
            <li>最後同時定格在指定圖案</li>
            <li>完全透明背景，可自定義圖案</li>
          </ul>
          
          <p style={{ marginTop: '20px' }}><strong>🔧 自定義方法：</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>修改 <code>customSymbols</code> 陣列來更換圖案</li>
            <li>修改 <code>targetSymbols</code> 來設定最終定格圖案</li>
            <li>調整 <code>interval</code> 來改變重複間隔</li>
            <li>調整 <code>spinDuration</code> 來改變旋轉時間</li>
          </ul>
        </div>
      </div>

      {/* 返回按鈕 */}
      <div style={{ marginTop: '40px' }}>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          🏠 返回首頁
        </a>
      </div>
    </div>
  );
}
