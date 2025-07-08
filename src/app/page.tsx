'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

// illustration_1.png ~ illustration_6.png 隨機分配給 8 格，且不連續重複
// 在 client 端產生隨機圖片，避免 hydration error
export default function Home() {
  // 動畫依序顯示 state
  const [showSimple, setShowSimple] = useState(false);
  const [showLiam, setShowLiam] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    setShowSimple(false);
    setShowLiam(false);
    setShowRight(false);
    // 依序顯示
    const t1 = setTimeout(() => setShowSimple(true), 100); // 簡單設計
    const t2 = setTimeout(() => setShowLiam(true), 700);   // LIAM DESIGN
    const t3 = setTimeout(() => setShowRight(true), 1300); // 右側內文
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    // setMarqueeImages(getRandomIllustrationImagesNoRepeat(8)); // This line was removed
  }, []);

  // 移除 runnerTop, useEffect, scroll/resize 事件
  const runnerRef = useRef<HTMLImageElement>(null);

  // 圖片預覽狀態
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 處理圖片上傳
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 處理圖片區域點擊
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden" style={{ background: '#fff' }}>
      {/* 背景層容器 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* 黃色背景層（hero 區塊下方） */}
        <div className="absolute inset-0" style={{ background: '#fff' }} />
        {/* 全頁格線背景 */}
        <svg className="global-grid-bg absolute inset-0" width="100%" height="100%">
          <defs>
            <pattern id="global-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect width="48" height="48" fill="none" />
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#000" strokeWidth="1" />
              <path d="M 0 48 L 48 48 48 0" fill="none" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-grid)" />
        </svg>
      </div>

      {/* 主要內容容器 */}
      <div className="relative z-10">
        {/* 形象牆（Hero Wall）區塊開始 */}
        <section className="hero-block-grid">
          <div className="hero-grid-container">
            {/* 左側大標與 LIAM DESIGN 上下排列 */}
            <div className="hero-left-block" style={{ zIndex: 2, position: 'relative' }}>
              <div
                className={`hero-title-block slide-in-left${showSimple ? ' show' : ''}`}
              >
                <span className="hero-title-bg hero-title-vertical">簡單設計</span>
              </div>
              <div
                className={`hero-liam-block slide-in-up${showLiam ? ' show' : ''}`}
              >
                <span className="hero-liam-bg">LIAM<br/>DESIGN</span>
              </div>
            </div>
            {/* 右側直排中文介紹 */}
            <div
              className={`hero-vertical-desc slide-in-right${showRight ? ' show' : ''}`}
              style={{ zIndex: 2, position: 'absolute', right: 'calc(10vw - 100px)', bottom: 0 }}
            >
              {["沒有一件事是簡單的，","但簡單設計陪你把它慢慢梳理清楚。","適合剛起步、預算不多，但對品牌化有感覺的你。","我們提供有溫度、有機、有故事感的視覺協助，","從概念到Logo，從故事到包裝，","一起慢慢長出屬於品牌的樣子。"].map((txt, i) => (
                <div
                  key={i}
                  style={
                    (i === 1 || i === 2 || i === 3)
                      ? { whiteSpace: 'nowrap' }
                      : undefined
                  }
                >
                  {txt}
                </div>
              ))}
            </div>
            {/* 中央黑框放 yilan_map.gif */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
              {/* 敘述框區塊 */}
              <div className="flex justify-center gap-4 mb-4" style={{ position: 'absolute', top: '-64px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                <div className="bg-yellow-300 text-black rounded-xl px-6 py-2 shadow font-bold text-lg">敘述一</div>
                <div className="bg-yellow-300 text-black rounded-xl px-6 py-2 shadow font-bold text-lg">敘述二</div>
                <div className="bg-yellow-300 text-black rounded-xl px-6 py-2 shadow font-bold text-lg">敘述三</div>
              </div>
              <div className="w-[756px] h-[756px] border-4 border-black bg-[#FAF6E9] flex items-center justify-center">
                <img src="/yilan_map.gif" alt="宜蘭地圖動畫" className="w-full h-full object-contain" />
              </div>
            </div>
            {/* runner.gif 直接顯示 */}
          </div>
        </section>
        {/* 形象牆（Hero Wall）區塊結束 */}

        {/* 跑馬燈 - 形象牆與主內容交界處 */}
        <div style={{ position: 'relative' }}>
          <img
            ref={runnerRef}
            src="/runner.gif"
            alt="陪跑員"
            style={{
              position: 'absolute',
              top: -250,
              left: 0,
              zIndex: 9999,
              width: 'auto',
              height: 'auto'
            }}
          />
          <div className="w-full bg-black py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
            <div className="animate-marquee whitespace-nowrap">
              {Array(4).fill(null).map((_, i) => (
                <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
              ))}
            </div>
          </div>
        </div>
        {/* 跑馬燈 - 黃底黑字 */}
        <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
          <div className="animate-marquee-reverse whitespace-nowrap">
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
            ))}
          </div>
        </div>

        {/* Logo fixed 置左下 */}
        <div className="fixed left-0 bottom-0 z-50 p-6" style={{ transform: 'scale(1.08)', transformOrigin: 'left bottom', zIndex: 10000 }}>
          <div className="logo-block long">
            <Image src="/logo.svg" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
          </div>
        </div>

        {/* 內容 container（不含 navbar/aside） */}
        <div className="relative w-full max-w-7xl px-16 mx-auto flex flex-col items-center">
          {/* 主內容區塊 */}
          <main className="relative z-10 flex flex-col items-center gap-12 pt-32 pb-16 px-4 min-h-[700px]">
            {/* 3️⃣ 服務流程區塊 */}
            <section className="w-full max-w-[1200px] bg-white rounded-2xl shadow-lg p-16 mb-12 border border-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* 左側內容 */}
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-6 relative">
                    <span className="relative z-10 text-black">服務流程（適合初創業的你）</span>
                    <span className="absolute inset-0 bg-yellow-300 -skew-x-3 transform -translate-y-1 translate-x-2" style={{ zIndex: 1 }}></span>
                  </h2>
                  <p className="mb-8 text-lg text-gray-700 text-center">你有點怕設計費？我們不怕你問。<br/>我們用共感語氣陪你走每一步。</p>
                  <ol className="mb-8 w-full flex flex-col gap-4 text-gray-900 font-medium">
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">1️⃣</span>
                      <span>傾聽與提問</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">2️⃣</span>
                      <span>品牌基礎建立</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">3️⃣</span>
                      <span>視覺提案與調整</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">4️⃣</span>
                      <span>完稿與印刷、應用教學</span>
                    </li>
                  </ol>
                  <div className="mb-8 w-full text-center">
                    <span className="font-semibold text-gray-900">我們可以協助的事情：</span>
                    <span className="text-gray-900 ml-2">Logo / 名片 / DM / 社群圖包 / 包裝 / 攝影剪輯</span>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="map-action-btn map-action-btn-center">了解服務流程</button>
                  </div>
                </div>

                {/* 右側照片空間 */}
                <div className="flex items-center justify-center">
                  <div 
                    className="w-full aspect-square border-2 border-black rounded-2xl overflow-hidden relative group cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleImageClick}
                  >
                    {/* 隱藏的文件輸入 */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {/* 預設圖片或上傳的圖片 */}
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="設計流程示意圖"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="w-full h-full relative">
                          {/* X 標記 */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3/4 h-0.5 bg-gray-300 transform rotate-45"></div>
                            <div className="w-3/4 h-0.5 bg-gray-300 transform -rotate-45"></div>
                          </div>
                          {/* 預設圖示 */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                            <svg 
                              className="w-12 h-12 text-gray-400 mb-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                              />
                            </svg>
                            <span className="text-sm text-gray-500 font-medium">設計流程示意圖</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover 效果 */}
                    <div 
                      className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-lg">
                        <span className="text-black text-sm font-medium">點擊預覽圖片</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 服務流程區塊結束後的跑馬燈 */}
            <div className="w-full bg-black py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>
            <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            {/* 4️⃣ 作品案例區塊 */}
            <section className="w-full max-w-[1200px] bg-white rounded-2xl shadow-lg p-16 mb-12 border border-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* 左側內容 */}
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-6 relative">
                    <span className="relative z-10 text-black">作品案例</span>
                    <span className="absolute inset-0 bg-yellow-300 -skew-x-3 transform -translate-y-1 translate-x-2" style={{ zIndex: 1 }}></span>
                  </h2>
                  <div className="flex gap-2 mb-8">
                    <span className="px-3 py-1 bg-yellow-200 rounded-full text-sm text-black">餐飲</span>
                    <span className="px-3 py-1 bg-yellow-200 rounded-full text-sm text-black">在地文創</span>
                    <span className="px-3 py-1 bg-yellow-200 rounded-full text-sm text-black">手作選物</span>
                  </div>
                  <ul className="w-full flex flex-col gap-4 mb-8">
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="font-semibold text-black">阿嬤麵店</div>
                      <div className="text-sm text-gray-900">原是市場一角的阿嬤麵店，現在有了識別與粉絲。</div>
                    </li>
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="font-semibold text-black">小鎮文創</div>
                      <div className="text-sm text-gray-900">在地故事變成品牌，吸引更多年輕人參與。</div>
                    </li>
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="font-semibold text-black">手作選物店</div>
                      <div className="text-sm text-gray-900">從無到有，品牌形象讓商品更有價值。</div>
                    </li>
                  </ul>
                  <div className="w-full flex justify-center">
                    <button className="map-action-btn map-action-btn-center">查看更多案例</button>
                  </div>
                </div>

                {/* 右側照片空間 */}
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-square border-2 border-black rounded-2xl overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="w-full h-full relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-500 font-medium">作品案例圖片</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 作品案例區塊結束後的跑馬燈 */}
            <div className="w-full bg-black py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>
            <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            {/* 5️⃣ 價格說明區塊 */}
            <section className="w-full max-w-[1200px] bg-white rounded-2xl shadow-lg p-16 mb-12 border border-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* 左側內容 */}
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-6 relative">
                    <span className="relative z-10 text-black">價格說明（預算友善）</span>
                    <span className="absolute inset-0 bg-yellow-300 -skew-x-3 transform -translate-y-1 translate-x-2" style={{ zIndex: 1 }}></span>
                  </h2>
                  <ul className="mb-8 w-full flex flex-col gap-4 text-black">
                    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span>品牌起步包</span>
                      <span className="font-bold">NT.12,000 起</span>
                    </li>
                    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span>整體品牌識別</span>
                      <span className="font-bold">NT.30,000 起</span>
                    </li>
                  </ul>
                  <div className="mb-8 text-center">
                    <div className="text-gray-900 mb-2">價格透明，包含哪些項目、不包含印刷、可客製加購。</div>
                    <div className="text-gray-900">不確定怎麼選沒關係，我們陪你一步一步選擇適合的。</div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="map-action-btn map-action-btn-center">索取報價單</button>
                  </div>
                </div>

                {/* 右側照片空間 */}
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-square border-2 border-black rounded-2xl overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="w-full h-full relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-500 font-medium">價格方案圖片</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 價格說明區塊結束後的跑馬燈 */}
            <div className="w-full bg-black py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-white text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>
            <div className="w-full bg-yellow-300 py-4 overflow-hidden" style={{ position: 'relative', zIndex: 10 }}>
              <div className="animate-marquee-reverse whitespace-nowrap">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-black text-2xl font-extrabold mx-8">Design that listens. Design that grows.</span>
                ))}
              </div>
            </div>

            {/* 6️⃣ 聯絡區塊 */}
            <section className="w-full max-w-[1200px] bg-white rounded-2xl shadow-lg p-16 mb-12 border border-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* 左側內容 */}
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-6 relative">
                    <span className="relative z-10 text-black">聯絡我們</span>
                    <span className="absolute inset-0 bg-yellow-300 -skew-x-3 transform -translate-y-1 translate-x-2" style={{ zIndex: 1 }}></span>
                  </h2>
                  <form className="w-full flex flex-col gap-4 mb-8">
                    <input className="border rounded-lg px-4 py-2 text-black" type="text" placeholder="您的姓名" />
                    <input className="border rounded-lg px-4 py-2 text-black" type="email" placeholder="Email 或聯絡方式" />
                    <select className="border rounded-lg px-4 py-2 text-black">
                      <option>想做的項目</option>
                      <option>Logo設計</option>
                      <option>品牌識別</option>
                      <option>包裝設計</option>
                      <option>社群圖包</option>
                      <option>攝影剪輯</option>
                    </select>
                    <select className="border rounded-lg px-4 py-2 text-black">
                      <option>預算範圍</option>
                      <option>10,000-20,000</option>
                      <option>20,000-40,000</option>
                      <option>40,000+</option>
                    </select>
                    <input className="border rounded-lg px-4 py-2 text-black" type="text" placeholder="預計完成時間（如：2個月內）" />
                    <textarea className="border rounded-lg px-4 py-2 text-black" placeholder="其他需求或想法"></textarea>
                  </form>
                  <div className="mb-8 text-center">
                    <div className="text-gray-900 mb-2">或直接聯絡：
                      <a href="https://line.me/" className="underline text-blue-600 ml-1">Line</a> / 
                      <a href="https://instagram.com/" className="underline text-blue-600 ml-1">IG DM</a>
                    </div>
                    <div className="text-gray-900">我們會在三天內回覆你，不怕你問。</div>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="map-action-btn map-action-btn-center">立即諮詢</button>
                  </div>
                </div>

                {/* 右側照片空間 */}
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-square border-2 border-black rounded-2xl overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="w-full h-full relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-500 font-medium">聯絡資訊圖片</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        {/* Footer 區塊 */}
        <footer className="relative z-10 bg-black">
          <div className="footer-content flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-8">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Liam Design Logo" width={40} height={40} style={{display:'inline-block'}} />
              <span className="font-bold text-lg">Liam Design 簡單設計</span>
            </div>
            <nav className="flex gap-6 text-base">
              <a href="#cases" className="hover:underline">作品</a>
              <a href="#pricing" className="hover:underline">報價</a>
              <a href="#contact" className="hover:underline">聯絡我們</a>
            </nav>
            <div className="flex gap-4">
              <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="IG"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg></a>
              <a href="https://behance.net/" target="_blank" rel="noopener" aria-label="Behance"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#fff" strokeWidth="2"/><text x="7" y="16" fill="#fff" fontSize="8">Be</text></svg></a>
              <a href="mailto:hello@liamdesign.com" aria-label="Email"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#fff" strokeWidth="2"/><path d="M3 7l9 7 9-7" stroke="#fff" strokeWidth="2"/></svg></a>
            </div>
          </div>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
          width: max-content;
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 18s linear infinite;
          width: max-content;
        }
        .nav-link {
          color: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          padding: 0.5rem 2.5rem;
          border-radius: 0.125rem;
          transition: all 0.15s;
          display: inline-block;
        }
        .nav-link:hover {
          background: #000;
          color: #fff;
          font-size: 1rem;
          font-weight: 800;
        }
        .nav-link-vertical {
          color: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          padding: 1.25rem 0.5rem;
          border-radius: 1rem;
          transition: all 0.15s;
          display: block;
          text-align: center;
          width: 60px;
          position: relative;
          overflow: hidden;
          min-width: 60px;
          max-width: 60px;
        }
        .nav-link-vertical::after {
          content: attr(data-label);
          position: absolute;
          left: 0;
          top: 0;
          width: 180px;
          min-width: 100%;
          height: 100%;
          color: #000;
          background: #ffe000;
          border-radius: 1rem;
          opacity: 0;
          pointer-events: none;
          font-size: 1.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.18s, width 0.18s;
        }
        .nav-link-vertical:hover::after {
          opacity: 1;
        }
        .nav-link-vertical:hover {
          color: #231815;
          min-width: 180px;
          max-width: 180px;
        }
        .map-action-btn {
          font-size: 2rem;
          padding: 1.2em 2.5em;
          border-radius: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 3px solid #000;
          outline: none;
          cursor: pointer;
          margin-bottom: 0.5em;
          background: #ffe600;
          color: #000;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .map-action-btn:hover {
          background: #000;
          color: #fff;
        }
        .speech-bubble {
          position: relative;
          display: inline-block;
          min-width: 180px;
          max-width: 340px;
          padding: 1.2em 2em;
          border-radius: 24px;
          font-size: 1.4rem;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 4px solid #000;
          margin-bottom: 1em;
          pointer-events: auto;
          letter-spacing: 0.12em;
          transition: transform 0.18s cubic-bezier(.4,1.3,.6,1), box-shadow 0.18s;
        }
        .speech-bubble:hover {
          transform: scale(1.08);
          z-index: 2;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .speech-bubble::after {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -28px;
          width: 0;
          height: 0;
          border: 18px solid transparent;
          border-top: 18px solid #000;
          border-bottom: 0;
          border-right: 0;
        }
        .speech-black {
          background: #000;
          color: #fff;
        }
        .speech-white {
          background: #fff;
          color: #000;
        }
        .speech-yellow {
          background: #ffe600;
          color: #000;
        }
        .about-block {
          background: #ffe600;
          border: 4px solid #000;
          border-radius: 32px;
          padding: 32px 40px 32px 40px;
          max-width: 800px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
        .about-title-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .about-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: #000;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .about-lang-btns {
          display: flex;
          gap: 8px;
        }
        .about-lang-btn {
          font-size: 1.3rem;
          font-weight: 700;
          border: 3px solid #000;
          background: #fff;
          color: #000;
          border-radius: 6px;
          padding: 2px 18px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .about-lang-btn.active, .about-lang-btn:hover {
          background: #000;
          color: #fff;
        }
        .about-content {
          font-size: 1.25rem;
          color: #111;
          font-weight: 500;
          line-height: 2.1;
          margin-top: 8px;
        }
        .logo-block {
          background: #ffe600;
          border: 4px solid #000;
          border-radius: 32px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
        .logo-block.long {
          width: 260px;
          height: 90px;
          padding: 0;
        }
        .logo-block.long img {
          width: 108px;
          height: 108px;
        }
        .footer-black {
          width: 100%;
          background: #000;
          color: #fff;
          padding: 32px 0 24px 0;
          margin-top: 64px;
        }
        .footer-content {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
        }
        .footer-copyright {
          font-size: 1.1rem;
          letter-spacing: 0.08em;
        }
        .footer-icons {
          display: flex;
          gap: 18px;
        }
        .footer-icon-placeholder {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #222;
          display: inline-block;
        }
        .project-step-card {
          width: 800px;
          min-height: 320px;
          background: #fff;
          border: 4px solid #222;
          border-radius: 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          padding: 36px 36px 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
        }
        .project-step-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .project-step-title {
          font-size: 2.6rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #111;
        }
        .project-step-arrow {
          font-size: 2.2rem;
          font-weight: 900;
          margin-top: 4px;
          color: #111;
        }
        .project-step-body {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 0;
        }
        .project-step-desc {
          flex: 1 1 50%;
          max-width: 50%;
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 0;
          color: #111;
          display: flex;
          align-items: flex-start;
        }
        .project-step-img {
          flex: 1 1 50%;
          max-width: 50%;
          width: 140px;
          height: 140px;
          background: #111;
          border-radius: 8px;
          margin-left: 32px;
          align-self: flex-start;
          position: static;
        }
        .project-column-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }
        .project-step-btn {
          background: none;
          border: none;
          font-size: 2.2rem;
          font-weight: 900;
          color: #111;
          cursor: pointer;
          margin-top: 4px;
          transition: color 0.15s;
        }
        .project-step-btn:hover {
          color: #ffe600;
        }
        .hero-block-grid {
          position: relative;
          width: 100vw;
          min-height: 600px;
          background: #fffbe6;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
          padding-top: 100px;
          padding-bottom: 150px;
        }
        .global-grid-bg {
          width: 100vw;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-grid-container {
          position: relative;
          width: 100vw;
          max-width: 1200px;
          min-height: 600px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: start;
          gap: 0;
          z-index: 1;
        }
        .hero-left-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          margin-top: 48px;
          gap: 64px;
        }
        .hero-title-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-title-bg {
          font-size: 3.2rem;
          font-weight: 900;
          color: #111;
          background: #ffe000;
          padding: 20px 24px;
          border-radius: 6px;
          line-height: 1.1;
          display: inline-block;
          letter-spacing: 0.25em;
        }
        .hero-liam-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-liam-bg {
          font-size: 3.2rem;
          font-weight: 900;
          color: #111;
          background: #ffe000;
          padding: 20px 24px;
          border-radius: 6px;
          line-height: 1.1;
          display: inline-block;
        }
        .hero-vertical-desc {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 8px;
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          margin-top: 24px;
          position: absolute;
          right: calc(10vw - 100px);
          top: 0;
        }
        .hero-vertical-desc > div {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          background: #ffe000;
          border-radius: 4px;
          padding: 12px 8px;
          display: inline-block;
          letter-spacing: 0.25em;
        }
        .hero-vertical-desc > div:nth-child(1) { margin-top: 0; margin-bottom: 0; }
        .hero-vertical-desc > div:nth-child(2) { margin-top: 24px; margin-bottom: 32px; }
        .hero-vertical-desc > div:nth-child(3) { margin-top: -12px; margin-bottom: 12px; }
        .hero-vertical-desc > div:nth-child(4) { margin-top: 18px; margin-bottom: 40px; }
        .hero-vertical-desc > div:nth-child(5) { margin-top: -8px; margin-bottom: 18px; }
        .hero-vertical-desc > div:nth-child(6) { margin-top: 20px; margin-bottom: 52px; }
        .hero-title-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .fade-in-map {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(.4,1.3,.6,1);
        }
        .fade-in-map.show {
          opacity: 1;
        }
        .slide-in-map {
          opacity: 0;
          transform: scale(1.8) translateX(-300px);
          transition: opacity 0.7s cubic-bezier(.4,1.3,.6,1), transform 0.9s cubic-bezier(.4,1.3,.6,1);
        }
        .slide-in-map.show {
          opacity: 1;
          transform: scale(1.8) translateX(0);
        }
        .slide-in-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-left.show {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-in-up {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-up.show {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-in-right {
          opacity: 0;
          transform: translateX(60px);
          transition: all 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-in-right.show {
          opacity: 1;
          transform: translateX(0);
        }
        .runner-animate {
          position: absolute;
          top: -60px;
          left: 0;
          width: 72px;
          height: 72px;
          z-index: 9999;
          animation: runner-move 12s linear infinite;
        }
        @keyframes runner-move {
          0% { left: 0; }
          100% { left: calc(100% - 72px); }
        }
        .runner-bar-relative {
          position: relative;
        }
        .vertical-bubble {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          letter-spacing: 0.2em;
          transition: transform 0.22s cubic-bezier(.4,1.3,.6,1), box-shadow 0.18s;
          cursor: pointer;
        }
        .vertical-bubble > div {
          line-height: 1.2;
        }
        .speech-bubble.vertical-bubble:hover {
          transform: scale(1.15) !important;
          z-index: 3;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18) !important;
        }
        .yilan-map-hover {
          transition: transform 0.32s cubic-bezier(.4,1.3,.6,1), box-shadow 0.22s;
        }
        .yilan-map-hover:hover {
          transform: scale(1.32);
          box-shadow: 0 12px 48px 0 rgba(0,0,0,0.25);
          z-index: 10;
        }
        .map-action-btn-center {
          display: block;
          margin: 0 auto;
          min-width: 260px;
          font-size: 2rem;
          padding: 1.2em 2.5em;
          border-radius: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 3px solid #000;
          outline: none;
          cursor: pointer;
          background: #ffe600;
          color: #000;
          transition: background 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .map-action-btn.map-action-btn-center:hover {
          background: #000 !important;
          color: #fff !important;
        }
        .test-hover-btn {
          font-size: 2rem;
          padding: 1.2em 2.5em;
          border-radius: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 3px solid #000;
          outline: none;
          cursor: pointer;
          margin-bottom: 0.5em;
          background: #ffe600;
          color: #000;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .test-hover-btn:hover {
          background: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
}