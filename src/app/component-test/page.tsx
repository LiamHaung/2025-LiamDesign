'use client';
import React from 'react';
import CheckerboardPattern from '../../components/test/CheckerboardPattern';
import DigitalClock from '../../components/test/DigitalClock';
import AnimatedCheckerboard from '../../components/test/AnimatedCheckerboard';
import IntroCard from '../../components/IntroCard';

export default function ComponentTestPage() {
  return (
    <div style={{ 
      background: '#FFFFF3', 
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ 
          fontFamily: 'var(--font-zpix), monospace',
          color: '#003EC3'
        }}>
          元件測試頁面
        </h1>

        {/* Static Checkerboard Pattern Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            靜態格子紋路元件
          </h2>
          
          <div className="space-y-8">
            {/* Default 2x8 pattern */}
            <div>
              <h3 className="text-lg font-semibold mb-4">預設樣式 (2排 x 8列)</h3>
              <CheckerboardPattern />
            </div>

            {/* Custom size pattern */}
            <div>
              <h3 className="text-lg font-semibold mb-4">自訂大小 (2排 x 8列, 30px 格子)</h3>
              <CheckerboardPattern cellSize={30} />
            </div>
          </div>
        </section>

        {/* Animated Checkerboard Pattern Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            動畫格子紋路元件 (黑色格子動畫)
          </h2>
          
          <div className="space-y-8">
            {/* Brand Blue Animation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">品牌藍色動畫 (左至右)</h3>
              <div className="flex items-start gap-8">
                <AnimatedCheckerboard 
                  animationColor="#003EC3"
                  direction="left-to-right"
                  animationSpeed={200}
                />
                <div className="text-sm text-gray-600">
                  <p>• 顏色: 品牌藍 #003EC3</p>
                  <p>• 方向: 左至右</p>
                  <p>• 速度: 0.2秒/格</p>
                  <p>• 黑色格子變色，白色格子保持不變</p>
                  <p>• 無限循環播放</p>
                </div>
              </div>
            </div>

            {/* Green Animation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">綠色動畫 (右至左)</h3>
              <div className="flex items-start gap-8">
                <AnimatedCheckerboard 
                  animationColor="#3aaf3a"
                  direction="right-to-left"
                  animationSpeed={200}
                />
                <div className="text-sm text-gray-600">
                  <p>• 顏色: 綠色 #3aaf3a</p>
                  <p>• 方向: 右至左</p>
                  <p>• 速度: 0.2秒/格</p>
                  <p>• 黑色格子變色，白色格子保持不變</p>
                  <p>• 無限循環播放</p>
                </div>
              </div>
            </div>

            {/* Orange Animation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">橘色動畫 (左至右)</h3>
              <div className="flex items-start gap-8">
                <AnimatedCheckerboard 
                  animationColor="#FF6B35"
                  direction="left-to-right"
                  animationSpeed={200}
                />
                <div className="text-sm text-gray-600">
                  <p>• 顏色: 橘色 #FF6B35</p>
                  <p>• 方向: 左至右</p>
                  <p>• 速度: 0.2秒/格</p>
                  <p>• 黑色格子變色，白色格子保持不變</p>
                  <p>• 無限循環播放</p>
                </div>
              </div>
            </div>

            {/* Different Speed Test */}
            <div>
              <h3 className="text-lg font-semibold mb-4">不同速度測試</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-2">慢速 (0.5秒/格)</h4>
                  <AnimatedCheckerboard 
                    animationColor="#003EC3"
                    animationSpeed={500}
                    autoStart={false}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">中速 (0.2秒/格)</h4>
                  <AnimatedCheckerboard 
                    animationColor="#3aaf3a"
                    animationSpeed={200}
                    autoStart={false}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">快速 (0.1秒/格)</h4>
                  <AnimatedCheckerboard 
                    animationColor="#FF6B35"
                    animationSpeed={100}
                    autoStart={false}
                  />
                </div>
              </div>
            </div>

            {/* Custom Size Animation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">自訂大小動畫</h3>
              <div className="flex items-start gap-8">
                <AnimatedCheckerboard 
                  animationColor="#003EC3"
                  cellSize={30}
                  animationSpeed={200}
                />
                <div className="text-sm text-gray-600">
                  <p>• 格子大小: 30px</p>
                  <p>• 顏色: 品牌藍 #003EC3</p>
                  <p>• 方向: 左至右</p>
                  <p>• 黑色格子變色，白色格子保持不變</p>
                  <p>• 無限循環播放</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Clock Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            電子時鐘元件
          </h2>
          
          <div className="space-y-8">
            {/* Default clock with seconds */}
            <div>
              <h3 className="text-lg font-semibold mb-4">預設時鐘 (含秒數)</h3>
              <DigitalClock />
            </div>

            {/* Clock without seconds */}
            <div>
              <h3 className="text-lg font-semibold mb-4">不含秒數</h3>
              <DigitalClock showSeconds={false} />
            </div>

            {/* 12-hour format */}
            <div>
              <h3 className="text-lg font-semibold mb-4">12小時制</h3>
              <DigitalClock format24={false} />
            </div>

            {/* Custom styled clock */}
            <div>
              <h3 className="text-lg font-semibold mb-4">自訂樣式</h3>
              <DigitalClock 
                style={{
                  backgroundColor: '#003EC3',
                  color: '#FFFFFF',
                  fontSize: '32px',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              />
            </div>

            {/* Multiple clocks */}
            <div>
              <h3 className="text-lg font-semibold mb-4">多個時鐘</h3>
              <div className="flex gap-4 flex-wrap">
                <DigitalClock />
                <DigitalClock showSeconds={false} />
                <DigitalClock format24={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Intro Card Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            Intro Card 元件
          </h2>
          
          <div className="space-y-8">
            {/* Default Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">預設樣式</h3>
              <div className="flex justify-center">
                <IntroCard
                  title="歡迎來到我的作品集"
                  subtitle="UI/UX 設計師"
                  description="專注於創造美觀且實用的數位體驗，結合創意與技術實現用戶需求。"
                  imageUrl="/illustration_1.png"
                  buttonText="查看作品"
                  onButtonClick={() => alert('點擊了查看作品按鈕！')}
                />
              </div>
            </div>

            {/* Minimal Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">簡約樣式</h3>
              <div className="flex justify-center">
                <IntroCard
                  title="簡潔設計"
                  subtitle="Minimal Style"
                  description="乾淨簡潔的設計風格，專注於內容本身。"
                  variant="minimal"
                  size="small"
                />
              </div>
            </div>

            {/* Detailed Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">詳細樣式</h3>
              <div className="flex justify-center">
                <IntroCard
                  title="專業服務"
                  subtitle="Full-Stack Developer"
                  description="提供完整的網站開發服務，從前端設計到後端架構，為您的業務創造數位價值。我們專注於用戶體驗和技術創新，確保每個項目都能達到最高標準。"
                  imageUrl="/illustration_2.png"
                  buttonText="立即諮詢"
                  onButtonClick={() => alert('點擊了立即諮詢按鈕！')}
                  variant="detailed"
                  size="large"
                />
              </div>
            </div>

            {/* Different Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">不同尺寸</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <IntroCard
                  title="小尺寸"
                  subtitle="Small"
                  description="適合側邊欄或小空間使用。"
                  variant="minimal"
                  size="small"
                />
                <IntroCard
                  title="中尺寸"
                  subtitle="Medium"
                  description="標準尺寸，適合大部分使用場景。"
                  size="medium"
                />
                <IntroCard
                  title="大尺寸"
                  subtitle="Large"
                  description="大尺寸卡片，適合主要內容展示。"
                  variant="detailed"
                  size="large"
                />
              </div>
            </div>

            {/* Without Animation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">無動畫版本</h3>
              <div className="flex justify-center">
                <IntroCard
                  title="靜態卡片"
                  subtitle="No Animation"
                  description="這個卡片沒有動畫效果，適合需要快速載入的場景。"
                  animated={false}
                  variant="minimal"
                />
              </div>
            </div>

            {/* Custom Styled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">自訂樣式</h3>
              <div className="flex justify-center">
                <IntroCard
                  title="自訂樣式卡片"
                  subtitle="Custom Style"
                  description="可以透過 className 和 style 屬性完全自訂外觀。"
                  imageUrl="/illustration_3.png"
                  buttonText="自訂按鈕"
                  onButtonClick={() => alert('自訂按鈕被點擊！')}
                  className="border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50"
                  style={{
                    transform: 'rotate(-2deg)',
                    boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Component Info */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            元件說明
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold">CheckerboardPattern 靜態格子紋路元件：</h3>
              <ul className="ml-4 list-disc">
                <li>rows: 行數 (預設: 2)</li>
                <li>cols: 列數 (預設: 8)</li>
                <li>cellSize: 格子大小 (預設: 20px)</li>
                <li>className: 自訂 CSS 類別</li>
                <li>style: 自訂樣式</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">AnimatedCheckerboard 動畫格子紋路元件：</h3>
              <ul className="ml-4 list-disc">
                <li>animationColor: 動畫顏色 (預設: #003EC3)</li>
                <li>animationSpeed: 動畫速度毫秒 (預設: 200ms)</li>
                <li>direction: 動畫方向 &apos;left-to-right&apos; | &apos;right-to-left&apos;</li>
                <li>autoStart: 自動開始 (預設: true)</li>
                <li>loop: 循環播放 (預設: true)</li>
                <li><strong>注意：黑色格子會變色，白色格子保持不變</strong></li>
                <li><strong>動畫會無限循環播放，無需手動控制</strong></li>
                <li>其他參數同靜態元件</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">DigitalClock 電子時鐘元件：</h3>
              <ul className="ml-4 list-disc">
                <li>showSeconds: 是否顯示秒數 (預設: true)</li>
                <li>format24: 是否使用24小時制 (預設: true)</li>
                <li>className: 自訂 CSS 類別</li>
                <li>style: 自訂樣式</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">IntroCard 介紹卡片元件：</h3>
              <ul className="ml-4 list-disc">
                <li>title: 主標題 (必填)</li>
                <li>subtitle: 副標題 (必填)</li>
                <li>description: 描述文字 (必填)</li>
                <li>imageUrl: 圖片網址 (選填)</li>
                <li>buttonText: 按鈕文字 (選填)</li>
                <li>onButtonClick: 按鈕點擊事件 (選填)</li>
                <li>variant: 樣式變體 'default' | 'minimal' | 'detailed' (預設: 'default')</li>
                <li>size: 尺寸 'small' | 'medium' | 'large' (預設: 'medium')</li>
                <li>animated: 是否啟用動畫 (預設: true)</li>
                <li>className: 自訂 CSS 類別</li>
                <li>style: 自訂樣式</li>
                <li><strong>特色：支援 Framer Motion 動畫、響應式設計、多種樣式變體</strong></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
