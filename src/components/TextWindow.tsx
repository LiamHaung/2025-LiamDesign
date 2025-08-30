'use client';
import React from 'react';

interface TextWindowProps {
  width?: string;
  height?: string;
  windowTitle?: string;
  content?: string;
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
}

const TextWindow: React.FC<TextWindowProps> = ({
  width = "400px",
  height = "300px",
  windowTitle = "記事本.txt",
  content = "這是一個純文字視窗的範例內容。\n\n你可以在這裡放置任何文字內容，包括：\n• 專案說明\n• 設計理念\n• 工作流程\n• 聯絡資訊\n\n這個視窗完全採用 Windows 98 的經典設計風格，\n讓人回憶起那個純真的年代。\n\n文字內容支援換行和基本格式，\n非常適合展示重要的資訊和說明。",
  className = "",
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  isMaximized = false
}) => {
  return (
    <div 
      className={`text-window ${className}`}
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
        padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)',
        fontSize: 'clamp(9px, 2.5vw, 11px)',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #808080',
        minHeight: 'clamp(20px, 5vw, 24px)'
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
          }}>📝</div>
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

      {/* 選單列和內容區域 - 只在非最小化時顯示 */}
      {!isMinimized && (
        <>
          <div style={{
            background: '#f0f0f0',
            border: '1px solid #d0d0d0',
            padding: '2px 4px',
            fontSize: '10px',
            display: 'flex',
            gap: '12px'
          }}>
            <span style={{ cursor: 'pointer', padding: '2px 6px' }}>檔案(F)</span>
            <span style={{ cursor: 'pointer', padding: '2px 6px' }}>編輯(E)</span>
            <span style={{ cursor: 'pointer', padding: '2px 6px' }}>格式(O)</span>
            <span style={{ cursor: 'pointer', padding: '2px 6px' }}>檢視(V)</span>
            <span style={{ cursor: 'pointer', padding: '2px 6px' }}>說明(H)</span>
          </div>

          {/* 主要文字內容區域 */}
          <div style={{
            flex: 1,
            background: 'white',
            border: '2px inset #c0c0c0',
            margin: '2px',
            padding: 'clamp(6px, 1.5vw, 8px)',
            fontSize: 'clamp(10px, 2.2vw, 11px)',
            lineHeight: '1.6',
            color: '#000',
            overflow: 'auto',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}>
            {content}
          </div>

          {/* 狀態列 */}
          <div style={{
            background: '#f0f0f0',
            border: '1px inset #c0c0c0',
            padding: '2px 8px',
            fontSize: '9px',
            color: '#666',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>第 1 行，第 1 欄</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span>Windows (CRLF)</span>
              <span>UTF-8</span>
              <span>100%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TextWindow; 