'use client';
import React from 'react';

interface VerticalWindowProps {
  username?: string;
  posts?: number;
  followers?: string;
  following?: number;
  bio?: string;
  email?: string;
  website?: string;
  profileImage?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

const VerticalWindow: React.FC<VerticalWindowProps> = ({
  children,
  width = "320px",
  height = "600px",
  className = ""
}) => {

  return (
    <div 
      className={`vertical-window ${className}`}
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
      {/* 標題欄 - Instagram.exe */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)',
          color: 'white',
          padding: '4px 8px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #404040',
          minHeight: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div 
            style={{
              width: '16px',
              height: '16px',
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a52, #fd79a8)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px'
            }}
          >
            📷
          </div>
                     <span style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}>Portfolio.exe</span>
        </div>
      </div>

             {/* 選單欄 */}
       <div style={{
         background: '#f0f0f0',
         borderBottom: '1px solid #808080',
         padding: '2px 8px',
         fontSize: '10px',
         display: 'flex',
         gap: '12px',
         fontFamily: 'var(--font-press-start-2p), monospace'
       }}>
         <span style={{ textDecoration: 'underline' }}>File</span>
         <span style={{ textDecoration: 'underline' }}>Edit</span>
         <span style={{ textDecoration: 'underline' }}>View</span>
         <span style={{ textDecoration: 'underline' }}>Options</span>
         <span style={{ textDecoration: 'underline' }}>Help</span>
       </div>

             {/* 個人資料區域 */}
       <div style={{
         background: '#f0f0f0',
         padding: '12px',
         borderBottom: '1px solid #808080'
       }}>
         {/* 大標題 - Liam graphic designer */}
         <div style={{
           textAlign: 'center',
           fontSize: '16px',
           fontWeight: 'bold',
           marginBottom: '8px',
           background: 'white',
           padding: '6px',
           border: '1px inset #c0c0c0',
           fontFamily: 'var(--font-press-start-2p), monospace',
           color: '#4d4d4d'
         }}>
           Liam graphic designer
         </div>

         {/* 小標題 - 服務項目 */}
         <div style={{
           textAlign: 'center',
           fontSize: '11px',
           marginBottom: '12px',
           fontFamily: '"Noto Sans TC", sans-serif',
           color: '#4d4d4d'
         }}>
           插畫 I 設計 I 印刷 I 品牌
         </div>

         {/* 頭像和 Follow 按鈕 */}
         <div style={{
           display: 'flex',
           alignItems: 'center',
           gap: '12px',
           marginBottom: '12px'
         }}>
                      {/* 頭像 */}
           <div style={{
             width: '80px',
             height: '80px',
             borderRadius: '50%',
             background: 'black',
             border: '2px inset #c0c0c0',
             overflow: 'hidden',
             flexShrink: 0
           }}>
           </div>

           {/* 問候語和 Follow 按鈕 */}
           <div style={{
             flex: 1,
             display: 'flex',
             flexDirection: 'column',
             gap: '8px'
           }}>
             {/* 問候語 */}
             <div style={{
               fontSize: '14px',
               fontWeight: 'bold',
               fontFamily: 'var(--font-press-start-2p), monospace',
               color: '#4d4d4d'
             }}>
               嗨，我是 Liam。
             </div>
             
             {/* Follow 按鈕 */}
             <button style={{
               background: 'white',
               color: 'black',
               border: '2px outset #c0c0c0',
               padding: '6px 12px',
               fontSize: '10px',
               cursor: 'pointer',
               fontWeight: 'bold',
               width: '100%',
               fontFamily: 'var(--font-press-start-2p), monospace'
             }}>
               Follow
             </button>
           </div>
         </div>

         {/* INTRO 區塊 */}
         <div style={{
           background: 'white',
           padding: '10px',
           border: '1px inset #c0c0c0'
         }}>
           <div style={{
             fontSize: '12px',
             fontWeight: 'bold',
             marginBottom: '6px',
             fontFamily: 'var(--font-press-start-2p), monospace',
             color: '#4d4d4d'
           }}>
             INTRO
           </div>
           <div style={{
             fontSize: '10px',
             lineHeight: '1.5',
             fontFamily: '"Noto Sans TC", sans-serif',
             color: '#4d4d4d'
           }}>
             這裡不只是作品集，而是一個桌面——承載著從宜蘭長出來的回憶、手稿與靈感。就像打開一台 2000 年代的電腦，每個檔案都藏著故事，每個設計都帶著家鄉的溫度。
           </div>
         </div>
       </div>

      

      {/* 內容區域 */}
      <div style={{
        flex: 1,
        background: 'white',
        border: '1px inset #c0c0c0',
        margin: '2px',
        overflow: 'auto',
        position: 'relative'
      }}>
        {children || (
          <div style={{
            padding: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            fontSize: '10px'
          }}>
                         {/* 作品網格 */}
             {Array.from({ length: 36 }, (_, index) => index + 1).map(num => (
               <div
                 key={num}
                 style={{
                   aspectRatio: '1',
                   background: `url('/illustration_${((num - 1) % 6) + 1}.png') center/cover`,
                   border: '1px solid #ddd',
                   borderRadius: '2px',
                   position: 'relative'
                 }}
               >
                 <div style={{
                   position: 'absolute',
                   bottom: '2px',
                   right: '2px',
                   background: 'rgba(0,0,0,0.7)',
                   color: 'white',
                   padding: '1px 3px',
                   fontSize: '8px',
                   borderRadius: '2px'
                 }}>
                   {num}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>

      

      {/* 狀態欄 */}
      <div style={{
        height: '16px',
        background: '#c0c0c0',
        borderTop: '1px solid #808080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6px',
        fontSize: '8px',
        color: '#404040'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '4px', height: '4px', background: '#404040' }}></div>
          <div style={{ width: '4px', height: '4px', background: '#404040' }}></div>
          <div style={{ width: '4px', height: '4px', background: '#404040' }}></div>
        </div>
                 <div style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}>Ready</div>
      </div>
    </div>
  );
};

export default VerticalWindow; 