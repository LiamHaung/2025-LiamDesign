'use client';
import React, { useState } from 'react';
import SlotMachine from '../../components/SlotMachine';

export default function SlotMachineTestPage() {
  const [spinCount, setSpinCount] = useState(0);
  const [winCount, setWinCount] = useState(0);

  // 不同的圖案組合
  const symbolSets = [
    ['��', '🍊', '🍇', '🍓', '🍑', '🍌', '🥝', '🍉'], // 水果
    ['⭐', '🌟', '💫', '✨', '⭐', '🌟', '💫', '✨'], // 星星
    ['🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '🎨', '🎭'], // 娛樂
    ['7️⃣', '7️⃣', '7️⃣', '7️⃣', '7️⃣', '7️⃣', '7️⃣', '7️⃣'], // 數字7
  ];

  const [currentSymbolSet, setCurrentSymbolSet] = useState(0);

  // 預設的目標圖案組合
  const targetCombinations = [
    ['🍎', '🍎', '🍎'], // 三個蘋果
    ['⭐', '⭐', '⭐'], // 三個星星
    ['7️⃣', '7️⃣', '7️⃣'], // 三個7
    ['🎯', '🎯', '🎯'], // 三個靶心
  ];

  const [currentTarget, setCurrentTarget] = useState(0);

  const handleSpinComplete = () => {
    setSpinCount(prev => prev + 1);
    
    // 檢查是否中獎
    const currentSymbols = symbolSets[currentSymbolSet];
    const targetSymbols = targetCombinations[currentTarget];
    const isWin = currentSymbols.includes(targetSymbols[0]) && 
                  currentSymbols.includes(targetSymbols[1]) && 
                  currentSymbols.includes(targetSymbols[2]);
    
    if (isWin) {
      setWinCount(prev => prev + 1);
    }
  };

  const changeSymbolSet = (index: number) => {
    setCurrentSymbolSet(index);
  };

  const changeTarget = (index: number) => {
    setCurrentTarget(index);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* 標題 */}
        <h1 style={{
          color: 'white',
          fontSize: '3rem',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          老虎機測試頁面
        </h1>

        <p style={{
          color: 'white',
          fontSize: '1.2rem',
          marginBottom: '40px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          體驗賓果機風格的數字燈邏輯 - 三個滾輪依序啟動，最後同時定格
        </p>

        {/* 統計資訊 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>旋轉次數</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd93d' }}>
              {spinCount}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>中獎次數</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
              {winCount}
            </div>
          </div>
        </div>

        {/* 老虎機 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          <SlotMachine
            symbols={symbolSets[currentSymbolSet]}
            targetSymbols={targetCombinations[currentTarget]}
            onSpinComplete={handleSpinComplete}
            width="500px"
            height="250px"
          />
        </div>

        {/* 控制面板 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* 圖案選擇 */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '20px' }}>選擇圖案類型</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {symbolSets.map((symbols, index) => (
                <button
                  key={index}
                  onClick={() => changeSymbolSet(index)}
                  style={{
                    padding: '12px 20px',
                    background: currentSymbolSet === index 
                      ? 'linear-gradient(45deg, #ff6b6b, #ffd93d)' 
                      : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <span>{symbols.slice(0, 4).join(' ')}</span>
                  {index === 0 && <span>水果</span>}
                  {index === 1 && <span>星星</span>}
                  {index === 2 && <span>娛樂</span>}
                  {index === 3 && <span>數字7</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 目標組合選擇 */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '20px' }}>選擇目標組合</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {targetCombinations.map((target, index) => (
                <button
                  key={index}
                  onClick={() => changeTarget(index)}
                  style={{
                    padding: '12px 20px',
                    background: currentTarget === index 
                      ? 'linear-gradient(45deg, #4ecdc4, #45b7d1)' 
                      : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <span>{target.join(' ')}</span>
                  <span>組合 {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 功能說明 */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '30px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'left',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h3 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            功能說明
          </h3>
          <div style={{ color: 'white', lineHeight: '1.6' }}>
            <p><strong>🎯 核心功能：</strong></p>
            <ul style={{ marginLeft: '20px' }}>
              <li>三個滾輪依序啟動（左 → 中 → 右）</li>
              <li>每個滾輪在旋轉時會上下輪流切換圖案</li>
              <li>最後同時定格在您指定的圖案組合</li>
              <li>支援自定義圖案類型和目標組合</li>
            </ul>
            
            <p style={{ marginTop: '20px' }}><strong>🎮 操作方式：</strong></p>
            <ul style={{ marginLeft: '20px' }}>
              <li>點擊 <strong>SPIN</strong> 按鈕開始旋轉</li>
              <li>點擊 <strong>RESET</strong> 按鈕重置老虎機</li>
              <li>選擇不同的圖案類型和目標組合</li>
            </ul>

            <p style={{ marginTop: '20px' }}><strong>✨ 動畫效果：</strong></p>
            <ul style={{ marginLeft: '20px' }}>
              <li>滾輪旋轉時有上下震動和縮放效果</li>
              <li>不同滾輪有不同的邊框顏色</li>
              <li>中獎時會顯示 "BIG WIN!" 標誌</li>
              <li>流暢的動畫過渡效果</li>
            </ul>
          </div>
        </div>

        {/* 返回按鈕 */}
        <div style={{ marginTop: '40px' }}>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
            }}
          >
            🏠 返回首頁
          </a>
        </div>
      </div>
    </div>
  );
}
