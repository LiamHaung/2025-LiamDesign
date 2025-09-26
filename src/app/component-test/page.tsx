'use client';
import React from 'react';
import CheckerboardPattern from '../../components/test/CheckerboardPattern';
import DigitalClock from '../../components/test/DigitalClock';
import AnimatedCheckerboard from '../../components/test/AnimatedCheckerboard';
import IntroCard from '../../components/IntroCard';
import Windows98Carousel from '../../components/Windows98Carousel';
import Windows98MultiWindow from '../../components/Windows98MultiWindow';
import RotationTest from '../../components/RotationTest';
import RetroWindowLayout from '../../components/RetroWindowLayout';
import SimpleRotationTest from '../../components/SimpleRotationTest';
import ProfileCard from '../../components/ProfileCard';
import ProfileCardCarousel from '../../components/ProfileCardCarousel';
import BorderTest from '../../components/BorderTest';
import AboutLiamTag from '../../components/AboutLiamTag';
import ImageCarouselCard from '../../components/ImageCarouselCard';
import BrandImageCarouselCard from '../../components/BrandImageCarouselCard';
import MarqueeTest from '../../components/MarqueeTest';

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

        {/* Intro Section - 模擬主畫面 intro 版位 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            Intro 版位測試區
          </h2>
          
          <div className="bg-gray-100 p-8 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">主畫面 Intro 版位模擬</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 左側：角色視窗 */}
              <div className="flex justify-center">
                <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg" style={{ width: '300px', height: '400px' }}>
                  {/* 視窗標題欄 */}
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between">
                    <span className="font-bold">Character.exe</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* 視窗內容 */}
                  <div className="p-4 h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">👨‍💻</div>
                      <div className="text-sm">3D 角色動畫</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右側：自我介紹內容 */}
              <div className="space-y-6">
                {/* 標題橫幅 */}
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                  <h4 className="text-xl font-bold">自我介紹 I About Liam</h4>
                </div>

                {/* 中文介紹 */}
                <div className="space-y-3">
                  <p className="text-lg leading-relaxed">
                    我是 <span className="font-bold text-blue-600">Liam</span>，喜歡把想法變成會呼吸的設計。
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    放輕鬆、慢慢逛，或許下一個專案就從這裡開始。
                  </p>
                </div>

                {/* 英文介紹 */}
                <div className="space-y-3">
                  <p className="text-lg leading-relaxed">
                    I&apos;m <span className="font-bold text-blue-600">Liam</span> - I love turning ideas into designs that breathe.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Take it easy, look around, and maybe we&apos;ll start something together.
                  </p>
                </div>

                {/* 裝飾性格子紋路 */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${
                          i < 8 
                            ? (i % 2 === 0 ? 'bg-orange-400' : 'bg-white')
                            : (i % 2 === 0 ? 'bg-black' : 'bg-white')
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 不同版本的 Intro 設計 */}
          <div className="space-y-8">
            <h3 className="text-lg font-semibold">不同版本的 Intro 設計</h3>
            
            {/* 版本 1：卡片式設計 */}
            <div>
              <h4 className="text-md font-medium mb-4">版本 1：卡片式設計</h4>
              <div className="flex justify-center">
                <IntroCard
                  title="歡迎來到我的作品集"
                  subtitle="UI/UX Designer & Developer"
                  description="我是 Liam，專注於創造美觀且實用的數位體驗。結合創意與技術，將想法轉化為會呼吸的設計。放輕鬆、慢慢逛，或許下一個專案就從這裡開始。"
                  imageUrl="/illustration_1.png"
                  buttonText="查看作品"
                  onButtonClick={() => alert('查看作品！')}
                  variant="detailed"
                  size="large"
                />
              </div>
            </div>

            {/* 版本 2：簡約式設計 */}
            <div>
              <h4 className="text-md font-medium mb-4">版本 2：簡約式設計</h4>
              <div className="flex justify-center">
                <IntroCard
                  title="Liam"
                  subtitle="Designer & Developer"
                  description="把想法變成會呼吸的設計。"
                  variant="minimal"
                  size="medium"
                />
              </div>
            </div>

            {/* 版本 3：創意式設計 */}
            <div>
              <h4 className="text-md font-medium mb-4">版本 3：創意式設計</h4>
              <div className="flex justify-center">
                <IntroCard
                  title="Hello, I'm Liam"
                  subtitle="Creative Designer"
                  description="Turning ideas into designs that breathe. Let's create something amazing together!"
                  imageUrl="/illustration_2.png"
                  buttonText="Let's Talk"
                  onButtonClick={() => alert('Let\'s Talk!')}
                  className="border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-100"
                  style={{
                    transform: 'rotate(-1deg)',
                    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* 版本 4：Windows 98 復古風格 */}
            <div>
              <h4 className="text-md font-medium mb-4">版本 4：Windows 98 復古風格</h4>
              <div className="flex justify-center">
                <IntroCard
                  title="Welcome to Liam's Portfolio"
                  subtitle="UI/UX Designer & Developer"
                  description="我是 Liam，喜歡把想法變成會呼吸的設計。結合創意與技術，將想法轉化為會呼吸的設計。放輕鬆、慢慢逛，或許下一個專案就從這裡開始。"
                  imageUrl="/illustration_3.png"
                  buttonText="Enter Portfolio"
                  onButtonClick={() => alert('Enter Portfolio!')}
                  variant="retro98"
                  size="large"
                  className="relative"
                  style={{
                    transform: 'rotate(-2deg)',
                    boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'var(--font-zpix), monospace'
                  }}
                />
              </div>
            </div>

             {/* 版本 5：Windows 98 視窗風格 */}
             <div>
               <h4 className="text-md font-medium mb-4">版本 5：Windows 98 視窗風格</h4>
               <div className="flex justify-center">
                 <div className="relative" style={{ transform: 'rotate(1deg)' }}>
                   {/* 視窗標題欄 */}
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '400px' }}>
                     <span className="font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>Liam.exe</span>
                     <div className="flex space-x-2">
                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                       <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                     </div>
                   </div>

                   {/* 視窗內容 */}
                   <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '400px' }}>
                     <IntroCard
                       title="About Liam"
                       subtitle="Designer & Developer"
                       description="把想法變成會呼吸的設計。專注於創造美觀且實用的數位體驗。"
                       variant="retro98"
                       size="medium"
                       animated={false}
                       className="shadow-none border-0 bg-transparent"
                       style={{
                         transform: 'none',
                         boxShadow: 'none',
                         fontFamily: 'var(--font-zpix), monospace'
                       }}
                     />
                   </div>
                 </div>
               </div>
             </div>

             {/* 版本 6：Windows 98 四技能輪播 */}
             <div>
               <h4 className="text-md font-medium mb-4">版本 6：Windows 98 四技能輪播</h4>
               <div className="flex justify-center">
                 <Windows98Carousel
                   windows={[
                     {
                       id: 'illustration',
                       title: 'Illustration',
                       subtitle: '插畫設計',
                       description: '將創意想法轉化為視覺藝術，用色彩和線條訴說故事。',
                       imageUrl: '/illustration_1.png',
                       rotation: 15
                     },
                     {
                       id: 'design',
                       title: 'Design',
                       subtitle: 'UI/UX 設計',
                       description: '創造直觀且美觀的使用者體驗，讓每個互動都充滿意義。',
                       imageUrl: '/illustration_2.png',
                       rotation: -25
                     },
                     {
                       id: 'print',
                       title: 'Print',
                       subtitle: '印刷設計',
                       description: '將數位設計完美呈現於實體媒介，注重細節與質感。',
                       imageUrl: '/illustration_3.png',
                       rotation: 25
                     },
                     {
                       id: 'brand',
                       title: 'Brand',
                       subtitle: '品牌設計',
                       description: '打造獨特的品牌識別，讓每個品牌都有屬於自己的聲音。',
                       imageUrl: '/illustration_4.png',
                       rotation: -15
                     }
                   ]}
                   className="max-w-6xl"
                 />
               </div>
             </div>

             {/* 版本 7：Windows 98 多視窗並排（基於版本5） */}
             <div>
               <h4 className="text-md font-medium mb-4">版本 7：Windows 98 多視窗並排（基於版本5）</h4>
               <div className="flex justify-center">
                 <Windows98MultiWindow
                   windows={[
                     {
                       id: 'illustration',
                       title: 'Illustration',
                       subtitle: '插畫設計',
                       description: '將創意想法轉化為視覺藝術，用色彩和線條訴說故事。',
                       imageUrl: '/illustration_1.png',
                       rotation: 20
                     },
                     {
                       id: 'design',
                       title: 'Design',
                       subtitle: 'UI/UX 設計',
                       description: '創造直觀且美觀的使用者體驗，讓每個互動都充滿意義。',
                       imageUrl: '/illustration_2.png',
                       rotation: -30
                     },
                     {
                       id: 'print',
                       title: 'Print',
                       subtitle: '印刷設計',
                       description: '將數位設計完美呈現於實體媒介，注重細節與質感。',
                       imageUrl: '/illustration_3.png',
                       rotation: 30
                     },
                     {
                       id: 'brand',
                       title: 'Brand',
                       subtitle: '品牌設計',
                       description: '打造獨特的品牌識別，讓每個品牌都有屬於自己的聲音。',
                       imageUrl: '/illustration_4.png',
                       rotation: -20
                     }
                   ]}
                   className="max-w-6xl"
                 />
               </div>
             </div>
          </div>
        </section>

        {/* 旋轉效果測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            旋轉效果測試區
          </h2>
          <RotationTest />
        </section>

        {/* 簡單旋轉測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            簡單旋轉測試區
          </h2>
          <SimpleRotationTest />
        </section>

        {/* 復古視窗布局測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            復古視窗布局測試區
          </h2>
          <RetroWindowLayout />
        </section>

        {/* 邊框測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            邊框測試區
          </h2>
          <BorderTest />
        </section>

        {/* ProfileCard 測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            ProfileCard 個人資料卡片測試區
          </h2>
          
          <div className="space-y-8">
            {/* 響應式測試 - 所有版本都只顯示一欄 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">響應式測試 (RWD)</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
                  <ProfileCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ProfileCardCarousel 輪播式個人資料卡片測試 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-zpix), monospace',
            color: '#003EC3'
          }}>
            ProfileCardCarousel 輪播式個人資料卡片測試區
          </h2>
          
          <div className="space-y-8">
            {/* 基本版本 - 自動播放 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">基本版本（自動播放，5秒間隔）</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <ProfileCardCarousel />
                </div>
              </div>
            </div>

            {/* 手動控制版本 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">手動控制版本（關閉自動播放）</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                  <ProfileCardCarousel 
                    autoPlay={false}
                  />
                </div>
              </div>
            </div>

            {/* 快速切換版本 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">快速切換版本（2秒間隔）</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  <ProfileCardCarousel 
                    autoPlay={true}
                    autoPlayInterval={2000}
                  />
                </div>
              </div>
            </div>

            {/* 慢速切換版本 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">慢速切換版本（8秒間隔）</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <ProfileCardCarousel 
                    autoPlay={true}
                    autoPlayInterval={8000}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">ProfileCardCarousel 元件參數：</h3>
            <ul className="ml-4 list-disc text-sm">
              <li>className: 自訂 CSS 類別 (選填)</li>
              <li>autoPlay: 自動播放 (預設: true)</li>
              <li>autoPlayInterval: 自動播放間隔毫秒 (預設: 5000)</li>
              <li><strong>特色：四種不同面向展示、平滑過渡動畫、手動/自動控制、進度條、指示器、響應式設計</strong></li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">四種面向展示：</h4>
              <ul className="ml-4 list-disc text-sm">
                <li><strong>設計師 Liam</strong> - 品牌設計與視覺傳達</li>
                <li><strong>插畫家 Liam</strong> - 手繪插畫與故事敘事</li>
                <li><strong>品牌夥伴 Liam</strong> - 品牌策略與創意指導</li>
                <li><strong>在地創作者 Liam</strong> - 在地文化與社區連結</li>
              </ul>
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
           <li>variant: 樣式變體 &apos;default&apos; | &apos;minimal&apos; | &apos;detailed&apos; | &apos;retro98&apos; (預設: &apos;default&apos;)</li>
           <li>size: 尺寸 &apos;small&apos; | &apos;medium&apos; | &apos;large&apos; (預設: &apos;medium&apos;)</li>
           <li>animated: 是否啟用動畫 (預設: true)</li>
           <li>className: 自訂 CSS 類別</li>
           <li>style: 自訂樣式</li>
           <li><strong>特色：支援 Framer Motion 動畫、響應式設計、多種樣式變體</strong></li>
           <li><strong>retro98 變體：Windows 98 復古風格，包含像素裝飾和復古配色</strong></li>
         </ul>
       </div>

       <div className="mt-6">
         <h3 className="font-semibold">Windows98Carousel 輪播元件：</h3>
         <ul className="ml-4 list-disc">
           <li>windows: 視窗資料陣列 (必填)</li>
           <li>className: 自訂 CSS 類別 (選填)</li>
           <li><strong>桌面版：四欄位並排顯示，每個視窗保持旋轉效果</strong></li>
           <li><strong>手機版：重疊卡片輪播，底部中央按鈕切換</strong></li>
           <li><strong>特色：響應式設計、Framer Motion 動畫、頁數指示器</strong></li>
           <li><strong>視窗資料結構：id, title, subtitle, description, imageUrl, rotation</strong></li>
         </ul>
       </div>

       <div className="mt-6">
         <h3 className="font-semibold">Windows98MultiWindow 多視窗元件：</h3>
         <ul className="ml-4 list-disc">
           <li>windows: 視窗資料陣列 (必填)</li>
           <li>className: 自訂 CSS 類別 (選填)</li>
           <li><strong>桌面版：多個視窗並排顯示，每個視窗保持旋轉效果</strong></li>
           <li><strong>手機版：垂直堆疊顯示，保持旋轉效果</strong></li>
           <li><strong>特色：基於版本5的單一視窗設計，確保旋轉效果正常</strong></li>
           <li><strong>視窗資料結構：id, title, subtitle, description, imageUrl, rotation</strong></li>
         </ul>
       </div>

       {/* AboutLiamTag 測試區域 */}
       <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">AboutLiamTag 標籤元件測試</h2>
         
         <div className="space-y-8">
           {/* 基本版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">基本版本（預設樣式）</h3>
             <AboutLiamTag />
           </div>

           {/* 無動畫版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">無動畫版本</h3>
             <AboutLiamTag animated={false} />
           </div>

           {/* 自訂顏色版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">自訂顏色版本</h3>
             <AboutLiamTag 
               backgroundColor="#FF8603" 
               textColor="#FFFFFF"
             />
           </div>

           {/* 小字級版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">小字級版本</h3>
             <AboutLiamTag 
               fontSize="clamp(12px, 2vw, 20px)"
             />
           </div>

           {/* 大字級版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">大字級版本</h3>
             <AboutLiamTag 
               fontSize="clamp(20px, 4vw, 40px)"
             />
           </div>

           {/* 不同背景測試 */}
           <div style={{ backgroundColor: '#003EC3', padding: '20px', borderRadius: '8px' }}>
             <h3 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>藍色背景測試</h3>
             <AboutLiamTag 
               backgroundColor="#FFFFF3" 
               textColor="#003EC3"
             />
           </div>

           <div style={{ backgroundColor: '#FF8603', padding: '20px', borderRadius: '8px' }}>
             <h3 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>橘色背景測試</h3>
             <AboutLiamTag 
               backgroundColor="#FFFFFF" 
               textColor="#FF8603"
             />
           </div>
         </div>

         <div className="mt-6">
           <h3 className="font-semibold">AboutLiamTag 元件參數：</h3>
           <ul className="ml-4 list-disc">
             <li>className: 自訂 CSS 類別 (選填)</li>
             <li>animated: 是否啟用動畫 (預設: true)</li>
             <li>backgroundColor: 背景顏色 (預設: &apos;#003EC3&apos;)</li>
             <li>textColor: 文字顏色 (預設: &apos;#FFFFF3&apos;)</li>
             <li>fontSize: 字級大小 (預設: &apos;clamp(16px, 3vw, 32px)&apos;)</li>
             <li><strong>特色：響應式設計、可自訂顏色、支援動畫開關</strong></li>
           </ul>
         </div>
       </div>

       {/* ImageCarouselCard 輪播卡片測試區域 */}
       <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">ImageCarouselCard 輪播卡片元件測試</h2>
         
         <div className="space-y-8">
           {/* 基本版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">基本版本（預設設定）</h3>
             <ImageCarouselCard />
           </div>

           {/* 自訂標語版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">自訂標語版本</h3>
             <ImageCarouselCard 
               slogan="#設計 #品牌 #視覺 #陪你一起長大"
             />
           </div>

           {/* 關閉自動播放版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">手動控制版本（關閉自動播放）</h3>
             <ImageCarouselCard 
               autoPlay={false}
               slogan="#Own the Day #Go Live Today"
             />
           </div>

           {/* 自訂圖片版本 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">自訂圖片版本</h3>
             <ImageCarouselCard 
               images={[
                 '/hero.png',
                 '/hero-2.png',
                 '/boat.png'
               ]}
               slogan="#Custom Images #輪播測試"
               autoPlayInterval={2000}
             />
           </div>

           {/* 響應式測試 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">響應式測試（不同尺寸）</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <ImageCarouselCard 
                 slogan="#小尺寸"
                 className="max-w-xs"
               />
               <ImageCarouselCard 
                 slogan="#中尺寸"
                 className="max-w-sm"
               />
               <ImageCarouselCard 
                 slogan="#大尺寸"
                 className="max-w-md"
               />
             </div>
           </div>

           {/* 新功能測試 - 標籤元件 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">標籤元件測試</h3>
             <ImageCarouselCard 
               slogan="#Own the Day #Go Live Today"
               showTag={true}
               tagText="#設計展示 #輪播功能 #互動體驗"
               autoPlayInterval={3000}
             />
           </div>

           {/* 新功能測試 - 內文描述 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">內文描述測試</h3>
             <ImageCarouselCard 
               slogan="#設計作品集"
               showDescription={true}
               description="這是一個展示設計作品的輪播卡片，包含多張精心製作的插畫作品。每張作品都經過精心設計，展現不同的風格和創意。通過輪播功能，可以讓觀看者欣賞到完整的作品集，體驗設計的多元性和創意性。"
               autoPlayInterval={4000}
             />
           </div>

           {/* 新功能測試 - 進度條 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">進度條測試</h3>
             <ImageCarouselCard 
               slogan="#進度展示"
               showProgressBar={true}
               autoPlayInterval={5000}
             />
           </div>

           {/* 新功能測試 - 完整功能 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">完整功能測試（標籤+內文+進度條）</h3>
             <ImageCarouselCard 
               slogan="#完整展示 #所有功能"
               showTag={true}
               tagText="#設計 #品牌 #視覺 #完整功能"
               showDescription={true}
               description="這是一個功能完整的輪播卡片展示，包含標籤元件、詳細內文描述和即時進度條。標籤可以快速傳達主題，內文提供詳細說明，進度條讓用戶了解當前播放狀態。所有功能都可以獨立開關，提供靈活的客製化選項。"
               showProgressBar={true}
               autoPlayInterval={6000}
               className="max-w-lg"
             />
           </div>
         </div>

         <div className="mt-6">
           <h3 className="font-semibold">ImageCarouselCard 元件參數：</h3>
           <ul className="ml-4 list-disc">
             <li>images: 圖片陣列 (預設: illustration_1-6.png)</li>
             <li>slogan: 標語文字 (預設: &apos;#Own the Day #Go Live Today&apos;)</li>
             <li>autoPlay: 自動播放 (預設: true)</li>
             <li>autoPlayInterval: 自動播放間隔毫秒 (預設: 3000)</li>
             <li>className: 自訂 CSS 類別 (選填)</li>
             <li><strong>新功能參數：</strong></li>
             <li>showTag: 顯示標籤元件 (預設: false)</li>
             <li>tagText: 標籤文字內容 (預設: &apos;#輪播展示 #圖片切換&apos;)</li>
             <li>showDescription: 顯示內文描述 (預設: false)</li>
             <li>description: 內文描述內容 (預設: 輪播卡片說明文字)</li>
             <li>showProgressBar: 顯示進度條 (預設: false)</li>
             <li><strong>特色：響應式設計、平滑過渡動畫、手動/自動控制、導航箭頭、指示器、標籤元件、內文描述、進度條</strong></li>
           </ul>
         </div>
       </div>

       {/* Brand 品牌服務區塊測試 */}
       <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">Brand 品牌服務區塊測試</h2>
         
         <div className="space-y-8">
           {/* 60% 40% 橫幅版位測試 */}
           <div>
             <h3 className="text-lg font-semibold mb-4">35% 65% 橫幅版位測試</h3>
             
             {/* 桌面版：35% 65% 布局 */}
             <div className="hidden md:flex gap-8 items-start">
               {/* 左側：文字內容 (35%) */}
               <div className="flex-1" style={{ flex: '0 0 35%' }}>
                 <div className="space-y-6">
                   {/* 大標 */}
                   <h2 style={{
                     fontSize: 'clamp(24px, 4vw, 48px)',
                     fontWeight: 900,
                     color: '#353535',
                     lineHeight: '1.2',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     Brand that Speaks｜會說話的品牌
                   </h2>

                   {/* 內文 - 齊頭段落 */}
                   <div style={{
                     fontSize: 'clamp(14px, 2vw, 18px)',
                     lineHeight: '1.8',
                     color: '#555',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     <p className="mb-4">
                       每個品牌都有獨特的故事等待被訴說。我們不只是設計 Logo，更是打造完整的品牌體驗。
                     </p>
                     <p className="mb-4">
                       從品牌策略到視覺識別，從網站設計到印刷品，我們幫助你建立與目標客群的情感連結。
                     </p>
                     <p>
                       讓你的品牌不只是被看見，更是被記住。
                     </p>
                   </div>
                 </div>
               </div>

               {/* 右側：圖片導覽 (65%) */}
               <div className="flex-1" style={{ flex: '0 0 65%' }}>
                 <BrandImageCarouselCard 
                   autoPlay={true}
                   autoPlayInterval={4000}
                   className="w-full h-full"
                 />
               </div>
             </div>

             {/* 手機版：垂直堆疊 */}
             <div className="md:hidden space-y-6">
               {/* 文字內容 */}
               <div className="space-y-4">
                 {/* 大標 - 加粗 */}
                 <h2 style={{
                   fontSize: 'clamp(20px, 5vw, 32px)',
                   fontWeight: 900,
                   color: '#353535',
                   lineHeight: '1.2',
                   fontFamily: 'Noto Sans, sans-serif'
                 }}>
                   Brand that Speaks｜會說話的品牌
                 </h2>

                 {/* 內文 - 手機版保持橫排 */}
                 <div style={{
                   fontSize: 'clamp(12px, 2.5vw, 16px)',
                   lineHeight: '1.6',
                   color: '#555',
                   fontFamily: 'Noto Sans, sans-serif'
                 }}>
                   <p className="mb-3">
                     每個品牌都有獨特的故事等待被訴說。我們不只是設計 Logo，更是打造完整的品牌體驗。
                   </p>
                   <p>
                     從品牌策略到視覺識別，我們幫助你建立與目標客群的情感連結。
                   </p>
                 </div>
               </div>

               {/* 圖片導覽 */}
               <div>
                 <BrandImageCarouselCard 
                   autoPlay={true}
                   autoPlayInterval={4000}
                   className="w-full"
                 />
               </div>
             </div>
           </div>

           {/* 不同比例測試 */}
           <div>
             <h3 className="text-lg font-semibold mb-4">不同比例測試</h3>
             
             {/* 50% 50% 測試 */}
             <div className="hidden md:flex gap-8 items-start mb-6">
               <div className="flex-1" style={{ flex: '0 0 50%' }}>
                 <div className="space-y-4">
                   <div style={{
                     fontSize: 'clamp(14px, 2vw, 18px)',
                     fontWeight: 'bold',
                     color: '#FFFFF3',
                     backgroundColor: '#FF8603',
                     display: 'inline-block',
                     padding: '6px 12px',
                     borderRadius: '6px',
                     fontFamily: 'var(--font-zpix), monospace'
                   }}>
                     #50% 50% 測試
                   </div>
                   <h3 style={{
                     fontSize: 'clamp(20px, 3vw, 32px)',
                     fontWeight: 700,
                     color: '#353535',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     平衡布局測試
                   </h3>
                   <p style={{
                     fontSize: 'clamp(12px, 2vw, 16px)',
                     lineHeight: '1.5',
                     color: '#666',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     這是一個 50% 50% 的平衡布局測試，左右兩側內容均等分配空間。
                   </p>
                 </div>
               </div>
               <div className="flex-1" style={{ flex: '0 0 50%' }}>
                 <ImageCarouselCard 
                   slogan="#50% 50% 測試"
                   showTag={true}
                   tagText="#平衡 #布局 #測試"
                   autoPlayInterval={2000}
                   className="w-full"
                 />
               </div>
             </div>

             {/* 70% 30% 測試 */}
             <div className="hidden md:flex gap-8 items-start">
               <div className="flex-1" style={{ flex: '0 0 70%' }}>
                 <div className="space-y-4">
                   <div style={{
                     fontSize: 'clamp(14px, 2vw, 18px)',
                     fontWeight: 'bold',
                     color: '#FFFFF3',
                     backgroundColor: '#28a745',
                     display: 'inline-block',
                     padding: '6px 12px',
                     borderRadius: '6px',
                     fontFamily: 'var(--font-zpix), monospace'
                   }}>
                     #70% 30% 測試
                   </div>
                   <h3 style={{
                     fontSize: 'clamp(20px, 3vw, 32px)',
                     fontWeight: 700,
                     color: '#353535',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     文字重點布局測試
                   </h3>
                   <p style={{
                     fontSize: 'clamp(12px, 2vw, 16px)',
                     lineHeight: '1.5',
                     color: '#666',
                     fontFamily: 'Noto Sans, sans-serif'
                   }}>
                     這是一個 70% 30% 的布局測試，左側文字內容佔主要空間，右側圖片作為輔助展示。適合文字內容較多的場景。
                   </p>
                 </div>
               </div>
               <div className="flex-1" style={{ flex: '0 0 30%' }}>
                 <ImageCarouselCard 
                   slogan="#70% 30% 測試"
                   showTag={true}
                   tagText="#文字 #重點 #布局"
                   autoPlayInterval={2500}
                   className="w-full"
                 />
               </div>
             </div>
           </div>
         </div>

         <div className="mt-6">
           <h3 className="font-semibold">Brand 品牌服務區塊特色：</h3>
           <ul className="ml-4 list-disc">
             <li><strong>響應式設計：</strong>桌面版 60% 40% 布局，手機版垂直堆疊</li>
             <li><strong>完整文字內容：</strong>標籤、大標、副標、內文、閱讀更多按鈕</li>
             <li><strong>圖片導覽：</strong>使用 BrandImageCarouselCard 展示品牌作品</li>
             <li><strong>靈活比例：</strong>支援 50% 50%、60% 40%、70% 30% 等不同比例</li>
             <li><strong>品牌色彩：</strong>使用品牌藍 #003EC3 和溫暖白 #FFFFF3</li>
             <li><strong>字體系統：</strong>Noto Sans 無襯線字體，確保可讀性</li>
           </ul>
         </div>

         {/* BrandImageCarouselCard 獨立測試 */}
         <div className="mt-8">
           <h3 className="text-lg font-semibold mb-4">BrandImageCarouselCard 獨立測試</h3>
           
           <div className="space-y-8">
             {/* 基本版本 */}
             <div>
               <h4 className="text-md font-medium mb-4">基本版本（預設設定）</h4>
               <div className="flex justify-center">
                 <BrandImageCarouselCard />
               </div>
             </div>

             {/* 自訂圖片版本 */}
             <div>
               <h4 className="text-md font-medium mb-4">自訂圖片版本</h4>
               <div className="flex justify-center">
                 <BrandImageCarouselCard 
                   images={[
                     '/hero.png',
                     '/hero-2.png',
                     '/boat.png',
                     '/illustration_1.png',
                     '/illustration_2.png'
                   ]}
                   autoPlayInterval={3000}
                 />
               </div>
             </div>

             {/* 關閉自動播放版本 */}
             <div>
               <h4 className="text-md font-medium mb-4">手動控制版本（關閉自動播放）</h4>
               <div className="flex justify-center">
                 <BrandImageCarouselCard 
                   autoPlay={false}
                 />
               </div>
             </div>

             {/* 響應式測試 */}
             <div>
               <h4 className="text-md font-medium mb-4">響應式測試（不同尺寸）</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <BrandImageCarouselCard 
                   className="max-w-xs"
                 />
                 <BrandImageCarouselCard 
                   className="max-w-sm"
                 />
                 <BrandImageCarouselCard 
                   className="max-w-md"
                 />
               </div>
             </div>
           </div>

           <div className="mt-6">
             <h4 className="font-semibold">BrandImageCarouselCard 元件特色：</h4>
             <ul className="ml-4 list-disc text-sm">
               <li><strong>深灰色外框：</strong>現代化卡片設計</li>
               <li><strong>響應式圖片區域：</strong>aspect-[4/3] 比例，直接顯示圖片</li>
               <li><strong>左上角標籤：</strong># Brand（深灰色背景，溫暖白文字）</li>
               <li><strong>右上角情緒 emoji：</strong>隨輪播切換（😊😢😠😍😮）</li>
               <li><strong>底部橫幅：</strong>#品牌 #視覺 #陪你一起長大（藍色背景，溫暖白文字）</li>
               <li><strong>下方文字面板：</strong>深灰色背景，包含大標、小標、內文</li>
               <li><strong>輪播功能：</strong>整張卡片輪播，4秒間隔</li>
               <li><strong>導航箭頭：</strong>左右切換按鈕</li>
             </ul>
           </div>
         </div>
       </div>

       {/* MarqueeTest 跑馬燈測試區域 */}
       <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">MarqueeTest 跑馬燈元件測試</h2>
         
         <div className="space-y-8">
           {/* 入口頁跑馬燈 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">🚪 入口頁跑馬燈 (Hero 區域)</h3>
             <MarqueeTest variant="classic" />
           </div>

           {/* Hero 版位頂部跑馬燈 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">🎨 Hero 版位頂部跑馬燈 (ParallaxSection 上方)</h3>
             <MarqueeTest variant="modern" />
           </div>

           {/* 老虎機下面跑馬燈 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">🎰 老虎機下面跑馬燈 (SlotMachine 下方)</h3>
             <MarqueeTest variant="creative" />
           </div>

           {/* 響應式測試 */}
           <div>
             <h3 className="text-lg font-semibold mb-2">響應式測試（不同寬度）</h3>
             <div className="space-y-4">
               <div className="max-w-md">
                 <h4 className="text-sm font-medium mb-2">小尺寸 (max-w-md)</h4>
                 <MarqueeTest variant="classic" />
               </div>
               <div className="max-w-2xl">
                 <h4 className="text-sm font-medium mb-2">中尺寸 (max-w-2xl)</h4>
                 <MarqueeTest variant="modern" />
               </div>
               <div className="max-w-4xl">
                 <h4 className="text-sm font-medium mb-2">大尺寸 (max-w-4xl)</h4>
                 <MarqueeTest variant="creative" />
               </div>
             </div>
           </div>
         </div>

         <div className="mt-6">
           <h3 className="font-semibold">MarqueeTest 元件參數：</h3>
           <ul className="ml-4 list-disc">
             <li>variant: 跑馬燈款式 (&apos;classic&apos; | &apos;modern&apos; | &apos;creative&apos;)</li>
             <li>className: 自訂 CSS 類別 (選填)</li>
             <li><strong>特色：每款都有藍黑兩條跑馬燈、不同文字內容、響應式設計、平滑動畫</strong></li>
           </ul>
         </div>
       </div>
          </div>
        </section>
      </div>
    </div>
  );
}
