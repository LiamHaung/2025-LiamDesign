'use client';
import React from 'react';
import SimpleSlotMachine from '../../components/SimpleSlotMachine';

export default function CustomSlotExamplePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1000px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          自定義圖案範例
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          展示如何替換成您自己的圖案
        </p>
      </div>

      {/* 範例 1: 火焰、扳手、大腦 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '40px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>範例 1: 火焰、扳手、大腦</h3>
        <SimpleSlotMachine
          symbols={['🔥', '🔧', '🧠']}
          targetSymbols={['🔥', '🔧', '🧠']}
          autoStart={true}
          interval={5000}
          spinDuration={3000}
        />
      </div>

      {/* 範例 2: 星星、月亮、太陽 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '40px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>範例 2: 星星、月亮、太陽</h3>
        <SimpleSlotMachine
          symbols={['⭐', '🌙', '☀️']}
          targetSymbols={['⭐', '🌙', '☀️']}
          autoStart={true}
          interval={4000}
          spinDuration={2500}
        />
      </div>

      {/* 範例 3: 數字 */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '40px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{ color: 'white', marginBottom: '20px' }}>範例 3: 數字 7</h3>
        <SimpleSlotMachine
          symbols={['7️⃣', '7️⃣', '7️⃣']}
          targetSymbols={['7️⃣', '7️⃣', '7️⃣']}
          autoStart={true}
          interval={6000}
          spinDuration={3500}
        />
      </div>

      {/* 使用說明 */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '30px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '800px',
        textAlign: 'left'
      }}>
        <h3 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          如何自定義圖案
        </h3>
        <div style={{ color: 'white', lineHeight: '1.6' }}>
          <p><strong>📝 程式碼範例：</strong></p>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '15px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '14px',
            margin: '10px 0'
          }}>
{`// 替換成您想要的圖案
const customSymbols = ['🔥', '⚙️', '🧠']; // 您的三個圖案
const targetSymbols = ['🔥', '⚙️', '🧠']; // 最終定格圖案

<SimpleSlotMachine
  symbols={customSymbols}
  targetSymbols={targetSymbols}
  autoStart={true}
  interval={4000} // 4秒重複一次
  spinDuration={2500} // 2.5秒旋轉時間
/>`}
          </pre>
          
          <p><strong>🎨 支援的圖案類型：</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Emoji 表情符號：🔥 ⚙️ 🧠 ⭐ 🌙 ☀️</li>
            <li>Unicode 符號：★ ◆ ▲ ● ■</li>
            <li>文字：A B C 或 1 2 3</li>
            <li>特殊符號：@ # $ % &</li>
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
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          🏠 返回首頁
        </a>
      </div>
    </div>
  );
}
