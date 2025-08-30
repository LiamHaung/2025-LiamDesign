'use client';
import React from 'react';
import WindowFrame from '@/components/WindowFrame';
import VerticalWindow from '@/components/VerticalWindow';
import FlipBook from '@/components/FlipBook';
import ProfileSection from '@/components/ProfileSection';
import ProjectTimeline from '@/components/ProjectTimeline';
import LoginSignupCard from '@/components/LoginSignupCard';
import TextWindow from '@/components/TextWindow';
import CarouselWindow from '@/components/CarouselWindow';
import ContactForm from '@/components/ContactForm';

export default function TestPage() {
  // FlipBook 範例圖片數據
  const flipBookImages = [
    { src: '/menu-0615-demo-test-img/page-1.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-2.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-3.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-4.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-5.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-6.png', width: 1134, height: 1134 },
    { src: '/menu-0615-demo-test-img/page-12.png', width: 1134, height: 1134 }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '20px',
      fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
      position: 'relative'
    }}>
      {/* 測試用手機版按鈕 */}
      <div 
        className="lg:hidden fixed top-4 right-4"
        style={{ 
          zIndex: 9999,
          width: '44px',
          height: '44px',
          background: '#ff0000',
          border: '2px outset #c0c0c0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontFamily: 'var(--font-zpix), monospace',
          fontSize: '18px',
          color: 'white'
        }}
                 onClick={() => {
           console.log('手機版按鈕被點擊！');
           alert('手機版按鈕正常工作！現在請到主頁面測試漢堡選單');
         }}
       >
         📱
       </div>
      <h1 style={{ 
        color: 'black', 
        textAlign: 'center', 
        marginBottom: '40px',
        fontSize: '24px',
        textShadow: 'none'
      }}>
        組件測試展示頁面
      </h1>
      
      {/* 第一區：基本 WindowFrame 組件 */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{
          color: 'black',
          fontSize: '18px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          WindowFrame 基本組件
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* 第一個視窗 - 類似參考圖的 nostalgia.psd */}
          <WindowFrame
            title="nostalgia.psd"
            width="400px"
            height="300px"
          >
            <div style={{
              background: 'linear-gradient(135deg, #e6d5f7 0%, #f7e6d5 100%)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ccc',
              position: 'relative'
            }}>
              {/* 模擬像素風格的場景 */}
              <div style={{
                width: '100%',
                height: '60%',
                background: 'repeating-linear-gradient(90deg, #d0d0d0 0px, #d0d0d0 20px, #e0e0e0 20px, #e0e0e0 40px)',
                borderBottom: '2px solid #888',
                position: 'relative'
              }}>
                {/* 模擬欄杆 */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: `${i * 12.5}%`,
                      width: '2px',
                      height: '40px',
                      background: '#888',
                      transform: 'translateX(-50%)'
                    }}
                  />
                ))}
                
                {/* 模擬電線桿 */}
                <div style={{
                  position: 'absolute',
                  right: '10%',
                  bottom: '0',
                  width: '4px',
                  height: '80px',
                  background: '#666'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '-10px',
                    width: '24px',
                    height: '2px',
                    background: '#666'
                  }} />
                </div>
              </div>
              
              <div style={{
                color: '#666',
                fontSize: '10px',
                marginTop: '10px',
                textAlign: 'center'
              }}>
                像素風格懷舊場景
              </div>
            </div>
          </WindowFrame>

          {/* 第二個視窗 - 個人介紹 */}
          <WindowFrame
            title="關於我.txt"
            width="350px"
            height="250px"
          >
            <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '13px' }}>🎨 設計師介紹</h3>
              <p style={{ marginBottom: '8px' }}>
                我是 Liam，來自冬山集合作社的設計師。
              </p>
              <p style={{ marginBottom: '8px' }}>
                專精於品牌設計、插畫創作和印刷品製作。
              </p>
              <p style={{ marginBottom: '8px' }}>
                相信好的設計來自於深度的溝通與理解。
              </p>
              <div style={{ 
                marginTop: '15px', 
                padding: '8px', 
                background: '#e8e8e8',
                border: '1px inset #c0c0c0'
              }}>
                <strong>聯絡方式：</strong><br />
                📧 liam@example.com<br />
                📱 +886-912-345-678
              </div>
            </div>
          </WindowFrame>

          {/* 第三個視窗 - 服務項目 */}
          <WindowFrame
            title="我們的服務"
            width="300px"
            height="200px"
          >
            <div style={{ fontSize: '11px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '13px' }}>🛠️ 服務項目</h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: '0',
                margin: '0'
              }}>
                <li style={{ 
                  marginBottom: '8px',
                  padding: '4px 8px',
                  background: '#f8f8f8',
                  border: '1px solid #ddd'
                }}>
                  🎨 品牌設計
                </li>
                <li style={{ 
                  marginBottom: '8px',
                  padding: '4px 8px',
                  background: '#f8f8f8',
                  border: '1px solid #ddd'
                }}>
                  ✏️ 插畫創作
                </li>
                <li style={{ 
                  marginBottom: '8px',
                  padding: '4px 8px',
                  background: '#f8f8f8',
                  border: '1px solid #ddd'
                }}>
                  📄 印刷設計
                </li>
                <li style={{ 
                  padding: '4px 8px',
                  background: '#f8f8f8',
                  border: '1px solid #ddd'
                }}>
                  🌐 網頁設計
                </li>
              </ul>
            </div>
          </WindowFrame>



          {/* 第五個視窗 - 直條狀 Instagram 風格 */}
          <VerticalWindow
            username="liamdesigner"
            posts={42}
            followers="1,337"
            following={123}
            bio="Liam Design Studio"
            email="hello@liamdesign.tw"
            website="liamdesign.tw"
            profileImage="/chactor.gif"
            width="320px"
            height="500px"
          />

        </div>
      </section>

      {/* 第二區：FlipBook 翻頁組件 */}
      <section style={{ marginBottom: '60px' }}>
                 <h2 style={{
           color: 'black',
           fontSize: '18px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>
           FlipBook 翻頁組件
         </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <WindowFrame
            title="作品集翻頁預覽"
            width="600px"
            height="500px"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              background: '#f0f0f0',
              padding: '20px'
            }}>
              <div style={{ transform: 'scale(0.4)', transformOrigin: 'center' }}>
                <FlipBook images={flipBookImages} />
              </div>
            </div>
          </WindowFrame>
        </div>
      </section>

             {/* 第三區：ProfileSection 組件 */}
       <section style={{ marginBottom: '60px' }}>
         <h2 style={{
           color: 'black',
           fontSize: '18px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>
           ProfileSection 個人簡介組件
         </h2>
         <div style={{
           display: 'flex',
           justifyContent: 'center',
           maxWidth: '1200px',
           margin: '0 auto'
         }}>
           <ProfileSection />
         </div>
       </section>

       {/* 第四區：LoginSignupCard 組件 */}
       <section style={{ marginBottom: '60px' }}>
         <h2 style={{
           color: 'black',
           fontSize: '18px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>
           LoginSignupCard 登入註冊卡片
         </h2>
         <div style={{
           display: 'flex',
           justifyContent: 'center',
           maxWidth: '1200px',
           margin: '0 auto'
         }}>
           <LoginSignupCard 
             title="來自土地的設計夥伴"
             description="冬山集合作社，深耕宜蘭在地文化的設計工作室。我們相信好的品牌源於深度的溝通與理解，每一個設計都承載著故事與溫度。從品牌識別到印刷設計，我們用設計讓世界重新看見家鄉的美好。"
             windowTitle="冬山集合作社 - 工作室介紹.exe"
             leftImage="/hero.png"
             width="900px"
             height="500px"
           />
         </div>
       </section>

       {/* 第五區：新組件展示 - TextWindow 和 CarouselWindow */}
       <section style={{ marginBottom: '60px' }}>
         <h2 style={{
           color: 'black',
           fontSize: '18px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>
           復古視窗組件 - 純文字視窗 & 圖片輪播視窗
         </h2>
         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
           gap: '30px',
           maxWidth: '1200px',
           margin: '0 auto'
         }}>
           {/* 純文字視窗 */}
           <TextWindow 
             windowTitle="專案說明.txt"
             width="450px"
             height="350px"
             content={`冬山集合作社 - 專案說明文件

設計理念：
我們深信每個品牌都有其獨特的故事，而我們的任務就是透過設計將這些故事完美呈現。

服務項目：
• 品牌識別設計
• 視覺形象規劃  
• 印刷品設計製作
• 包裝設計開發
• 網站視覺設計

設計流程：
1. 深度溝通 - 了解客戶需求與品牌願景
2. 概念發想 - 創意發想與視覺概念確立
3. 設計執行 - 精緻設計與細節完善
4. 成果交付 - 完整檔案與使用說明

聯絡資訊：
Email: hello@dongshan.design
Tel: 03-9XX-XXXX
地址: 宜蘭縣冬山鄉XXX路XX號

Copyright © 2024 冬山集合作社 All rights reserved.`}
           />

           {/* 圖片輪播視窗 */}
           <CarouselWindow 
             windowTitle="作品集展示.exe"
             width="500px"
             height="400px"
             images={[
               '/illustration_1.png',
               '/illustration_2.png', 
               '/illustration_3.png',
               '/illustration_4.png',
               '/illustration_5.png',
               '/illustration_6.png'
             ]}
             autoPlay={true}
             autoPlayInterval={4000}
           />
         </div>
       </section>

      {/* Hero 背景圖片區域 */}
      <div style={{
        marginTop: '40px',
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
      }}>
        {/* Hero 背景 */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: `url('/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
        
        {/* 深藍色遮罩層 */}
        <div style={{
          position: 'absolute',
          inset: '0',
          backgroundColor: '#13496b',
          opacity: 0.75
        }} />

        {/* SVG 網格背景 */}
        <svg style={{
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          opacity: 0.3
        }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" fill="url(#grid)" />
        </svg>

        {/* 像素地圖 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%) scale(0.5)',
          zIndex: 1
        }}>
          <img
            src="/pixel_map.png"
            alt="Pixel Map"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '300px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* DS Logo */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          transform: 'scale(0.4)',
          zIndex: 2
        }}>
          <img
            src="/dslogo-v3.png"
            alt="DS Logo"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '200px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* 標語文字 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: 'white',
          fontSize: '12px',
          fontFamily: 'var(--font-press-start-2p), monospace',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          lineHeight: '1.6'
        }}>
          <div style={{ marginBottom: '8px' }}>品牌源自土地</div>
          <div style={{ marginBottom: '8px' }}>越在地越國際</div>
          <div>設計藉由溝通</div>
        </div>

        {/* ENTER 按鈕 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '30px',
          background: `url('/header-bts-05.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '8px',
          fontFamily: 'var(--font-press-start-2p), monospace',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}>
          ENTER
        </div>
      </div>

            {/* 第四區：聯絡表單組件 */}
      <section style={{ marginTop: '60px', marginBottom: '60px' }}>
        <h2 style={{
          color: 'black',
          fontSize: '18px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ContactForm 聯絡表單組件
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <ContactForm 
            windowTitle="聯絡表單 Demo.exe"
            width="500px"
            height="450px"
          />
        </div>
      </section>

      {/* 第五區：ProjectTimeline 組件 - 需要在最後，因為它會使用全螢幕水平滾動 */}
      <section style={{ marginTop: '60px' }}>
                 <h2 style={{
          color: 'black',
          fontSize: '18px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ProjectTimeline 水平滾動時間軸
        </h2>
       <ProjectTimeline />
      </section>
    </div>
  );
} 