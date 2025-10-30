'use client';

import React, { useState, useRef } from 'react';

// 設計日記項目類型
interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  tags?: string[];
  mood?: string;
  projectName?: string;
  part1?: string;
  part2?: string;
  part3?: string;
  backgroundImage?: string;
}

// 設計日記元件 - 現代數位風格
const DesignDiary: React.FC<{
  entries: DiaryEntry[];
}> = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#FFFFF3',
      padding: '0',
      fontFamily: 'var(--font-zpix), monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 動態背景漸變 - 示意圖風格 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #FFFFF3 0%, rgba(255, 255, 243, 0.98) 30%, rgba(255, 255, 243, 0.95) 70%, #FFFFF3 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* 有機形狀裝飾 - 示意圖風格 */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '3%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 62, 195, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 62, 195, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />
      
      {/* CSS 動畫 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-15px); }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '4rem 2rem' }}>
        {/* 標題區域 - 現代簡潔 */}
        <div style={{ 
          marginBottom: '5rem',
          textAlign: 'left'
        }}>
          <div style={{
            display: 'inline-block',
            background: '#003EC3',
            color: '#FFFFF3',
            padding: '0.5rem 1.5rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-zpix), monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.1em'
          }}>
            DESIGN DIARY
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-zpix), monospace',
            letterSpacing: '0.02em',
            lineHeight: '1.2'
          }}>
            設計日記
          </h1>
          <p style={{ 
            color: '#666',
            fontSize: '1rem',
            fontFamily: 'var(--font-zpix), monospace',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            記錄每個專案的靈感與思考過程 · 透過設計日記看見創作的脈絡
          </p>
        </div>

        {/* 日記列表 - 橫向滾動容器 */}
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: '4rem',
          maxWidth: '900px',
          margin: '0 auto 4rem auto'
        }}>
          {/* 滾動容器 */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              gap: '2rem',
              padding: '2rem 1rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0, 62, 195, 0.3) transparent',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: '-ms-autohiding-scrollbar'
            }}
          >
            {entries.map((entry, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={entry.id}
                  className="diary-card"
                  onClick={() => setSelectedEntry(entry)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    border: '2px solid rgba(0, 62, 195, 0.15)',
                    borderRadius: '24px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-zpix), monospace',
                    scrollSnapAlign: 'start',
                    transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered 
                      ? '0 20px 40px rgba(0, 62, 195, 0.2), 0 0 0 2px rgba(0, 62, 195, 0.1), inset 0 0 60px rgba(0, 62, 195, 0.05)'
                      : '0 8px 24px rgba(0, 62, 195, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.2)',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* 背景圖片 */}
                  {entry.backgroundImage && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${entry.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      zIndex: 0
                    }} />
                  )}
                  
                  {/* 毛玻璃遮罩層 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255, 255, 243, 0.9)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    zIndex: 1,
                    transition: 'all 0.4s ease'
                  }} />
                  {/* 有機形狀裝飾 - 示意圖風格 */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-30%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(0, 62, 195, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease',
                    zIndex: 1
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-40%',
                    left: '-20%',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(0, 62, 195, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(35px)',
                    pointerEvents: 'none',
                    transition: 'all 0.4s ease',
                    zIndex: 1
                  }} />
                  
                  {/* 發光邊框效果 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(0, 62, 195, 0.3), rgba(0, 62, 195, 0.05))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    opacity: isHovered ? 0.6 : 0.3,
                    transition: 'opacity 0.4s ease',
                    zIndex: 1
                  }} />
                  
                  {/* 內容區域 */}
                  <div style={{ 
                    position: 'relative', 
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* 頂部：日期 */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        fontFamily: 'var(--font-zpix), monospace',
                        fontWeight: 'normal'
                      }}>
                        {entry.date}
                      </span>
                    </div>

                 {/* 標題 */}
                 <h3 style={{
                   fontSize: '1.75rem',
                   fontWeight: 'bold',
                   color: '#003EC3',
                   marginBottom: '1rem',
                   fontFamily: 'var(--font-zpix), monospace',
                   lineHeight: '1.4',
                   transition: 'color 0.3s ease'
                 }}>
                   {entry.title}
                 </h3>

                {/* 內容預覽 */}
                <p style={{
                  color: '#666',
                  fontSize: '0.9375rem',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                }}>
                  {entry.content}
                </p>

                 {/* 標籤 - 完整顯示 */}
                 {entry.tags && entry.tags.length > 0 && (
                   <div style={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     gap: '0.5rem',
                     marginBottom: '1.5rem',
                     paddingBottom: '1.5rem',
                     borderBottom: '1px solid rgba(0, 62, 195, 0.1)'
                   }}>
                     {entry.tags.map((tag, tagIndex) => (
                       <span
                         key={tagIndex}
                         style={{
                           padding: '0.375rem 0.875rem',
                           background: 'rgba(0, 62, 195, 0.1)',
                           color: '#003EC3',
                           borderRadius: '20px',
                           fontSize: '0.75rem',
                           fontFamily: 'var(--font-zpix), monospace',
                           fontWeight: 'bold',
                           transition: 'all 0.2s ease'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.background = '#003EC3';
                           e.currentTarget.style.color = '#FFFFF3';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
                           e.currentTarget.style.color = '#003EC3';
                         }}
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                 )}

                 {/* 閱讀更多按鈕 - 置中最下層 */}
                 <div style={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   marginTop: 'auto'
                 }}>
                   <button
                     style={{
                       background: '#003EC3',
                       color: '#FFFFF3',
                       fontSize: '0.875rem',
                       fontFamily: 'var(--font-zpix), monospace',
                       fontWeight: 'bold',
                       padding: '0.625rem 1.25rem',
                       borderRadius: '8px',
                       border: 'none',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '0.5rem',
                       boxShadow: '0 4px 12px rgba(0, 62, 195, 0.3)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#0052CC';
                       e.currentTarget.style.transform = 'translateX(4px)';
                       e.currentTarget.style.gap = '0.75rem';
                       e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 62, 195, 0.4)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#003EC3';
                       e.currentTarget.style.transform = 'translateX(0)';
                       e.currentTarget.style.gap = '0.5rem';
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 62, 195, 0.3)';
                     }}
                     onClick={(e) => {
                       e.stopPropagation();
                       setSelectedEntry(entry);
                     }}
                   >
                     閱讀更多 ⟶
                   </button>
                 </div>
                  </div>
                </div>
            );
          })}
          </div>

          {/* 響應式樣式 */}
          <style>{`
            /* 手機裝置：一次一張 */
            @media (max-width: 768px) {
              .diary-card {
                flex: 0 0 calc(100% - 2rem) !important;
                min-width: calc(100% - 2rem) !important;
                max-width: calc(100% - 2rem) !important;
                width: calc(100% - 2rem) !important;
              }
            }
            
            /* 平板裝置：一次2張 */
            @media (min-width: 769px) and (max-width: 1024px) {
              .diary-card {
                flex: 0 0 calc(50% - 1rem) !important;
                min-width: calc(50% - 1rem) !important;
                max-width: calc(50% - 1rem) !important;
                width: calc(50% - 1rem) !important;
              }
            }
            
            /* 桌面裝置：一次3張 */
            @media (min-width: 1025px) {
              .diary-card {
                flex: 0 0 calc(33.333% - 1.33rem) !important;
                min-width: calc(33.333% - 1.33rem) !important;
                max-width: calc(33.333% - 1.33rem) !important;
                width: calc(33.333% - 1.33rem) !important;
              }
            }
          `}</style>
        </div>

        {/* 詳細視窗 - 溫暖親民風格 */}
        {selectedEntry && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setSelectedEntry(null)}
          >
            {/* CSS 動畫 */}
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { 
                  opacity: 0;
                  transform: translateY(20px) scale(0.98);
                }
                to { 
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            <div
              style={{
                background: 'rgba(255, 255, 243, 0.6)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0, 62, 195, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
                maxWidth: '750px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: '3rem',
                position: 'relative',
                fontFamily: 'var(--font-zpix), monospace',
                animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 關閉按鈕 - 溫和設計 */}
              <button
                onClick={() => setSelectedEntry(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(0, 62, 195, 0.1)',
                  color: '#003EC3',
                  border: 'none',
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-zpix), monospace',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#003EC3';
                  e.currentTarget.style.color = '#FFFFF3';
                  e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 62, 195, 0.1)';
                  e.currentTarget.style.color = '#003EC3';
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}
              >
                ×
              </button>

              {/* 日記內容 */}
              <div>
                {/* 頂部區塊 - 更親切的排版 */}
                <div style={{
                  marginBottom: '2.5rem',
                  paddingBottom: '2rem',
                  borderBottom: '2px solid rgba(0, 62, 195, 0.15)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#888',
                        fontFamily: 'var(--font-zpix), monospace',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          background: '#003EC3',
                          borderRadius: '50%',
                          display: 'inline-block'
                        }} />
                        {selectedEntry.date}
                      </div>
                      
                      {/* 專案名稱 */}
                      {selectedEntry.projectName && (
                        <div style={{
                          fontSize: '1rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 62, 195, 0.1)',
                          borderRadius: '8px',
                          display: 'inline-block',
                          border: '1px solid rgba(0, 62, 195, 0.2)'
                        }}>
                          專案：{selectedEntry.projectName}
                        </div>
                      )}

                      <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                        fontWeight: 'bold',
                        color: '#003EC3',
                        fontFamily: 'var(--font-zpix), monospace',
                        lineHeight: '1.3',
                        marginBottom: '1rem'
                      }}>
                        {selectedEntry.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* 內容區塊 - 更舒適的閱讀體驗 */}
                <div style={{
                  marginBottom: '2.5rem',
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 62, 195, 0.1)'
                }}>
                  <p style={{
                    color: '#444',
                    lineHeight: '2.2',
                    whiteSpace: 'pre-line',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                  }}>
                    {selectedEntry.content}
                  </p>
                </div>

                {/* Part1, Part2, Part3 區塊 */}
                {(selectedEntry.part1 || selectedEntry.part2 || selectedEntry.part3) && (
                  <div style={{
                    marginBottom: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                  }}>
                    {selectedEntry.part1 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 1
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part1}
                        </p>
                      </div>
                    )}

                    {selectedEntry.part2 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 2
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part2}
                        </p>
                      </div>
                    )}

                    {selectedEntry.part3 && (
                      <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 62, 195, 0.15)'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#003EC3',
                          fontFamily: 'var(--font-zpix), monospace',
                          fontWeight: 'bold',
                          marginBottom: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Part 3
                        </div>
                        <p style={{
                          color: '#444',
                          lineHeight: '1.8',
                          whiteSpace: 'pre-line',
                          fontSize: '0.9375rem',
                          fontFamily: 'var(--font-noto-sans-tc), sans-serif'
                        }}>
                          {selectedEntry.part3}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 標籤區塊 - 圓角設計更有溫度 */}
                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(0, 62, 195, 0.1)'
                  }}>
                    {selectedEntry.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.625rem 1.5rem',
                          background: 'rgba(0, 62, 195, 0.08)',
                          color: '#003EC3',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontFamily: 'var(--font-zpix), monospace',
                          border: '1px solid rgba(0, 62, 195, 0.2)',
                          transition: 'all 0.2s ease',
                          display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#003EC3';
                          e.currentTarget.style.color = '#FFFFF3';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 62, 195, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 62, 195, 0.08)';
                          e.currentTarget.style.color = '#003EC3';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 測試頁面
export default function DesignDiaryTestPage() {
  // 範例設計日記數據
  const diaryEntries: DiaryEntry[] = [
    {
      id: 1,
      date: '2024.01.15',
      title: '最初的想法',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-01.jpg',
      content: `今天開始思考這個品牌的新視覺方向。客戶想要的是什麼？是溫馨、親近的感覺，還是現代、專業的形象？

走在路上看到咖啡廳的招牌，突然想到...也許可以結合兩者？溫馨但不失專業，親近但保持質感。

腦中開始浮現一些色彩組合：溫暖的咖啡色調、柔和的米白色、點綴一些深綠色...這讓我想起了秋天的午後，坐在窗邊看著街景的感覺。`,
      tags: ['靈感', '色彩', '品牌定位'],
      part1: '與客戶初次會議，了解品牌核心價值與目標受眾。發現客戶希望傳達「溫馨但不失專業」的品牌形象。',
      part2: '開始收集競品分析，觀察市場上類似品牌的視覺呈現方式。注意到大多數品牌都偏向極簡或過於複雜的設計。',
      part3: '第一次靈感迸發：在咖啡廳看到招牌時，突然想到「溫馨但專業」的視覺方向。開始構思色彩系統和設計語言。'
    },
    {
      id: 2,
      date: '2024.01.18',
      title: 'Logo 設計的掙扎',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-02.jpg',
      content: `已經畫了快50個草圖，但總覺得哪裡不對。客戶給的 feedback 是「太複雜了」、「不夠有記憶點」、「感覺跟其他品牌很像」。

重新回到最初的目標：簡單、有溫度、好記。

今天在公園散步時，看到一片葉子落在水面上，葉脈的線條突然給了我靈感。也許...簡化的線條，流動的形態，可以傳達「自然」、「生長」的概念？`,
      tags: ['Logo', '設計過程', '靈感'],
      part1: '開始 Logo 草圖階段，嘗試了各種不同的設計方向：幾何圖形、有機線條、文字標誌等。',
      part2: '客戶回饋指出問題：太複雜、缺乏記憶點、與其他品牌過於相似。需要重新思考設計策略。',
      part3: '在公園散步時獲得靈感：葉子落水的瞬間，葉脈線條呈現的自然流動感。決定採用簡化線條結合流動形態的設計方向。'
    },
    {
      id: 3,
      date: '2024.01.22',
      title: '色彩的選擇',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-03.jpg',
      content: `花了整個下午調色。藍色？太冷。紅色？太強烈。綠色？感覺不夠溫暖。

最後決定採用大地色系：主要色是深咖啡色（#4A2C2A），輔助色是溫暖的米白色（#F5F1E8），點綴色是深綠色（#2D5016）。

這個組合讓我想起在森林小徑散步的感覺，沉穩但不沉重，自然但不隨意。`,
      tags: ['色彩', '品牌識別']
    },
    {
      id: 4,
      date: '2024.01.25',
      title: '字體的選擇很重要',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-04.jpg',
      content: `選擇字體總是讓人頭痛。襯線字體？無襯線字體？

考慮到品牌想要傳達的「專業但親近」，我選擇了無襯線字體作為主字體，但在標題和強調處使用帶有手寫感的字體。

這就像是在正式場合穿一件剪裁合身的西裝，但領子上別了一枚有故事的別針——既專業又有人味。`,
      tags: ['字體', '品牌識別']
    },
    {
      id: 5,
      date: '2024.02.01',
      title: '第一次提案',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/project-cover-05.jpg',
      content: `今天向客戶提案了。有點緊張，但更多的是興奮。

看到他們眼中的認同，我知道方向對了。雖然還有一些細節需要調整，但整體概念得到了肯定。

在回家的路上，我一直在想：設計不只是做出「好看的東西」，而是要做出「對的東西」——能解決問題、能打動人心的東西。`,
      tags: ['提案', '反思']
    },
    {
      id: 6,
      date: '2024.02.05',
      title: '細節的堅持',
      projectName: '品牌視覺識別設計',
      backgroundImage: '/illustration_1.png',
      content: `客戶問：「這個小細節有人會注意嗎？」

我回答：「也許不會直接注意到，但會感受到。」

就像好的咖啡，你不會注意到每一粒咖啡豆，但會感受到整體的層次和風味。設計也是這樣，每個細節累積起來，創造出整體的質感和體驗。

今天調整了 spacing、字距、陰影...這些看似微小的事情，但正是它們決定了設計的品質。`,
      tags: ['細節', '質感', '設計哲學']
    }
  ];

  return (
    <div>
      <DesignDiary entries={diaryEntries} />
    </div>
  );
}

