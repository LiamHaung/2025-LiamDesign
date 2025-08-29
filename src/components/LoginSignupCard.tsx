'use client';
import React from 'react';

interface LoginSignupCardProps {
  width?: string;
  height?: string;
  leftImage?: string;
  title?: string;
  description?: string;
  windowTitle?: string;
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const LoginSignupCard: React.FC<LoginSignupCardProps> = ({
  width = "800px",
  height = "500px",
  leftImage = "/hero.png",
  title = "Support your favorite designers",
  description = "這裡是文字介紹區域。你可以在這裡放置任何你想要展示的內容，比如公司介紹、產品說明、服務描述等等。這個區域支援多行文字，並且會自動適應內容長度。",
  windowTitle = "作品介紹.exe",
  className = "",
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  isMaximized = false
}) => {
  return (
    <div 
      className={`retro-card ${className}`}
      style={{
        width,
        height,
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Windows 98 標題列 */}
      <div style={{
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #808080'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'white',
            border: '1px inset #c0c0c0',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>📄</div>
          <span>{windowTitle}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button 
            onClick={onMinimize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >_</button>
          <button 
            onClick={onMaximize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >{isMaximized ? '🗗' : '□'}</button>
          <button 
            onClick={onClose}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >×</button>
        </div>
      </div>

      {/* 主要內容區域 */}
      {!isMinimized && (
        <div style={{
          flex: 1,
          display: 'flex',
          background: '#f0f0f0',
          border: '2px inset #c0c0c0',
          margin: '2px',
          overflow: 'hidden'
        }}>
        
        {/* 左側圖片區域 */}
        <div style={{
          flex: '1',
          background: `linear-gradient(135deg, rgba(139, 201, 220, 0.8), rgba(139, 201, 220, 0.6)), url('${leftImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '40px 30px',
          position: 'relative',
          border: '1px inset #c0c0c0'
        }}>
          {/* Logo 區域 */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'white',
              border: '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#8bc9dc'
            }}>
              🎨
            </div>
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              冬山集合作社
            </span>
          </div>

          {/* 主標題 */}
          <h1 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '1.3',
            margin: '0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            maxWidth: '280px'
          }}>
            {title}
          </h1>
        </div>

        {/* 右側文字介紹區域 */}
        <div style={{
          flex: '1',
          background: '#f8f8f8',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 25px',
          border: '1px inset #c0c0c0',
          position: 'relative'
        }}>
          {/* 狀態列模擬 */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#e0e0e0',
            border: '1px inset #c0c0c0',
            borderRadius: '2px',
            padding: '4px 8px',
            fontSize: '8px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ fontSize: '10px' }}>💡</span>
            <span>設計靈感來源</span>
          </div>

          <div style={{
            marginTop: '20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* 主要文字內容 */}
            <div style={{
              background: 'white',
              border: '2px inset #c0c0c0',
              padding: '15px',
              fontSize: '11px',
              lineHeight: '1.6',
              color: '#333',
              height: 'calc(100% - 80px)',
              overflow: 'auto',
              scrollbarWidth: 'thin'
            }}>
              <h3 style={{ 
                marginBottom: '15px', 
                fontSize: '13px', 
                fontWeight: 'bold',
                color: '#000'
              }}>
                📝 專案介紹
              </h3>
              <p style={{ marginBottom: '12px' }}>
                {description}
              </p>
              <div style={{
                marginTop: '15px',
                padding: '10px',
                background: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '2px'
              }}>
                <strong style={{ fontSize: '10px' }}>重點特色：</strong>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '15px',
                  fontSize: '10px',
                  lineHeight: '1.5'
                }}>
                  <li>在地文化結合現代設計</li>
                  <li>深度溝通與理解客戶需求</li>
                  <li>完整的品牌視覺規劃</li>
                  <li>專業的印刷與製作品質</li>
                </ul>
              </div>
            </div>

            {/* 底部按鈕區域 */}
            <div style={{
              display: 'flex',
              gap: '8px',
              height: '32px'
            }}>
              <button style={{
                flex: 1,
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
              onMouseDown={(e) => (e.target as HTMLElement).style.border = '2px inset #c0c0c0'}
              onMouseUp={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
              >
                查看作品
              </button>
              <button style={{
                flex: 1,
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
              onMouseDown={(e) => (e.target as HTMLElement).style.border = '2px inset #c0c0c0'}
              onMouseUp={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
              >
                聯絡我們
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default LoginSignupCard; 