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
import Marquee from '@/components/Marquee';

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
      {/* 滿版Hero區域 */}
      <section data-hero-section style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-press-start-2p), "Adobe Garamond Pro", serif, monospace',
        overflow: 'hidden'
      }}>
        {/* 背景格線紋理 */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />
        
        {/* 主要內容 */}
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            color: '#ffffff',
            margin: '0 0 2rem 0',
            textShadow: '0 0 30px rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-press-start-2p), monospace',
            letterSpacing: '0.1em'
          }}>
            Liam.Design
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#cccccc',
            margin: '0 0 3rem 0',
            fontFamily: '"Adobe Garamond Pro", serif',
            fontStyle: 'italic'
          }}>
            Testing Components & Windows
          </p>
          
          {/* 裝飾性元素 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#00d2ff',
              borderRadius: '50%',
              animation: 'glow 2s ease-in-out infinite alternate'
            }} />
            <div style={{
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: '2px solid #ff6b6b',
              transform: 'rotate(45deg)',
              animation: 'float 3s ease-in-out infinite'
            }} />
            <div style={{
              width: '25px',
              height: '25px',
              background: '#4ecdc4',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              animation: 'glow 2.5s ease-in-out infinite alternate'
            }} />
          </div>
        </div>
      </section>

      {/* 跑馬燈測試區域 */}
      <section style={{
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        margin: '20px 0',
        borderRadius: '10px'
      }}>
        <h2 style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '20px',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          跑馬燈測試
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* 基本跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              基本跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={30}
              width="80px"
              fontSize="16px"
            />
          </div>

          {/* 快速跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              快速跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={60}
              width="80px"
              fontSize="16px"
            />
          </div>

          {/* 寬跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              寬跑馬燈效果
            </h3>
            <Marquee 
              text="Design that listens. Design that grows."
              speed={30}
              width="120px"
              fontSize="20px"
            />
          </div>

          {/* 自定義文案跑馬燈 */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              自定義文案跑馬燈
            </h3>
            <Marquee 
              text="🎨 冬山集合作社 - 深耕宜蘭在地文化的設計工作室 🎨"
              speed={40}
              width="100px"
              fontSize="16px"
            />
          </div>
        </div>
      </section>

      {/* 視窗形狀測試區域 */}
      <section style={{
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        margin: '20px 0',
        borderRadius: '10px'
      }}>
        <h2 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '20px',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          視窗形狀測試
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* 加粗框線視窗 1 */}
          <div style={{
            background: 'white',
            border: '6px solid #000',
            borderRadius: '0',
            padding: '20px',
            boxShadow: '8px 8px 0px #333',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000',
              margin: '0 0 15px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Windows 98 Style
            </h1>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333',
              margin: '0',
              textAlign: 'justify'
            }}>
              這是一個模擬Windows 98風格的視窗，具有加粗的黑色邊框和經典的像素字體。內容包含純文字展示，適合用於標題和說明文字。
            </p>
          </div>

          {/* 加粗框線視窗 2 */}
          <div style={{
            background: '#f8f8f8',
            border: '8px solid #ff6b6b',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '12px 12px 0px #ff4757',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ff6b6b',
              margin: '0 0 20px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              Retro Design
            </h1>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#2c2c2c',
              margin: '0',
              textAlign: 'center'
            }}>
              復古設計風格視窗，使用紅色加粗邊框和圓角設計。這種風格適合用於強調重要內容或創建視覺焦點。
            </p>
          </div>

          {/* 加粗框線視窗 3 */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '10px solid #4a5568',
            borderRadius: '0',
            padding: '30px',
            boxShadow: '15px 15px 0px #2d3748',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#fff',
              margin: '0 0 25px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Modern Retro
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: '2',
              color: '#f7fafc',
              margin: '0',
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              現代復古風格視窗，結合漸層背景和深色邊框。適合用於展示創意內容或作為主要視覺元素。
            </p>
          </div>

          {/* 加粗框線視窗 4 */}
          <div style={{
            background: '#fff',
            border: '12px solid #2d3748',
            borderRadius: '20px',
            padding: '35px',
            boxShadow: '20px 20px 0px #1a202c',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            transform: 'rotate(-2deg)'
          }}>
            <h1 style={{
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#2d3748',
              margin: '0 0 20px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Creative Box
            </h1>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#4a5568',
              margin: '0',
              textAlign: 'justify'
            }}>
              創意視窗設計，具有輕微的旋轉效果和加粗邊框。這種設計可以增加頁面的動感和視覺趣味性。
            </p>
          </div>

          {/* 加粗框線視窗 5 */}
          <div style={{
            background: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
            border: '6px solid #d63031',
            borderRadius: '0',
            padding: '20px',
            boxShadow: '10px 10px 0px #a29bfe',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            borderStyle: 'double'
          }}>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#d63031',
              margin: '0 0 15px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Double Border
            </h1>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#2d3436',
              margin: '0',
              textAlign: 'center'
            }}>
              雙重邊框設計視窗，使用漸層背景和對比色邊框。這種風格適合用於特殊內容或重要通知。
            </p>
          </div>

          {/* 加粗框線視窗 6 */}
          <div style={{
            background: '#000',
            border: '8px solid #00d2ff',
            borderRadius: '25px',
            padding: '25px',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.5)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#00d2ff',
              margin: '0 0 20px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)'
            }}>
              Neon Style
            </h1>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#fff',
              margin: '0',
              textAlign: 'center',
              textShadow: '0 0 5px rgba(0, 210, 255, 0.6)'
            }}>
              霓虹風格視窗，具有發光效果和深色背景。適合用於科技感或未來感的設計主題。
            </p>
          </div>
        </div>
      </section>

      <h1 style={{ 
        color: 'black', 
        textAlign: 'center', 
        marginBottom: '40px',
        fontSize: '24px',
        textShadow: 'none'
      }}>
        組件測試展示頁面
      </h1>

      {/* CSS動畫 */}
      <style jsx>{`
        @keyframes glow {
          0% { filter: brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
          100% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(255,255,255,0.5)); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}

      {/* 額外視窗樣式測試 */}
      <section style={{
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        margin: '20px 0',
        borderRadius: '10px'
      }}>
        <h2 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '20px',
          fontFamily: 'var(--font-zpix), monospace'
        }}>
          特殊視窗樣式
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* 圓形視窗 */}
          <div style={{
            background: 'white',
            border: '5px solid #ff6b6b',
            borderRadius: '50%',
            padding: '30px',
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            width: '250px',
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ff6b6b',
              margin: '0 0 10px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Circle Window
            </h1>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.4',
              color: '#333',
              margin: '0',
              textAlign: 'center'
            }}>
              圓形視窗設計，適合展示簡潔的內容或作為裝飾性元素。
            </p>
          </div>

          {/* 六角形視窗 */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '4px solid #4a5568',
            padding: '25px',
            boxShadow: '0 0 25px rgba(102, 126, 234, 0.4)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            width: '250px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              margin: '0 0 10px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Hexagon
            </h1>
            <p style={{
              fontSize: '11px',
              lineHeight: '1.3',
              color: '#f7fafc',
              margin: '0',
              textAlign: 'center'
            }}>
              六角形視窗，具有獨特的幾何美感。
            </p>
          </div>

          {/* 三角形視窗 */}
          <div style={{
            background: '#2d3748',
            border: '3px solid #00d2ff',
            padding: '20px',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.5)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: 'white',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            width: '200px',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '0 auto',
            paddingTop: '30px'
          }}>
            <h1 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#00d2ff',
              margin: '0 0 8px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Triangle
            </h1>
            <p style={{
              fontSize: '10px',
              lineHeight: '1.2',
              color: '#fff',
              margin: '0',
              textAlign: 'center'
            }}>
              三角形視窗設計。
            </p>
          </div>

          {/* 鑽石形視窗 */}
          <div style={{
            background: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
            border: '4px solid #d63031',
            padding: '25px',
            boxShadow: '0 0 20px rgba(214, 48, 49, 0.3)',
            fontFamily: 'var(--font-zpix), monospace',
            position: 'relative',
            color: '#2d3436',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            width: '200px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#d63031',
              margin: '0 0 10px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Diamond
            </h1>
            <p style={{
              fontSize: '11px',
              lineHeight: '1.3',
              color: '#2d3436',
              margin: '0',
              textAlign: 'center'
            }}>
              鑽石形視窗，具有對稱美感。
            </p>
          </div>
        </div>
      </section>
