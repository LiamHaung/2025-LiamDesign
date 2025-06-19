'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import React from 'react';
import FlipBook from "@/components/FlipBook";

// About Me 多語言內容
const ABOUT_CONTENT = {
  zh: {
    label: "中",
    text: "Liam工作室致力於打造具有創意與視覺焦點的品牌設計。我們專注於視覺識別（Logo、名片、社群素材）與整體品牌形象規劃，從概念發想到落地應用，協助客戶呈現最具辨識度的設計亮點，讓每一個品牌都能被精準聚焦、亮眼出眾。"
  },
  en: {
    label: "英",
    text: "Liam Design Studio specializes in creating visually impactful and concept-driven brand identities. From logo design and business cards to social media visuals, we help businesses stand out with unique and memorable design solutions. With a focus on clarity, creativity, and consistency, our work highlights the essence of every brand, ensuring your story is told through thoughtful and distinctive visuals."
  },
  jp: {
    label: "日",
    text: "Liamデザインスタジオは、視覚的なインパクトと創造性を重視したブランドデザインを提供します。ロゴ、名刺、SNSビジュアルなど、ブランドの個性と魅力を引き出すデザインで、印象に残るブランド構築をサポートします。あなたの「光る一点」を、世界に届けます。"
  }
};

// illustration_1.png ~ illustration_6.png 隨機分配給 8 格，且不連續重複
const ILLUSTRATION_IMAGES = [
  '/illustration_1.png',
  '/illustration_2.png',
  '/illustration_3.png',
  '/illustration_4.png',
  '/illustration_5.png',
  '/illustration_6.png',
];
function getRandomIllustrationImagesNoRepeat(count: number) {
  const arr = [];
  let lastIdx = -1;
  for (let i = 0; i < count; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * ILLUSTRATION_IMAGES.length);
    } while (idx === lastIdx && ILLUSTRATION_IMAGES.length > 1);
    arr.push(ILLUSTRATION_IMAGES[idx]);
    lastIdx = idx;
  }
  return arr;
}

// 在 client 端產生隨機圖片，避免 hydration error
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en' | 'jp'>('zh');
  const [showMenuInfo1, setShowMenuInfo1] = useState(false);
  const [showMenuInfo2, setShowMenuInfo2] = useState(false);
  const [showMenuInfo3, setShowMenuInfo3] = useState(false);
  const [marqueeImages, setMarqueeImages] = useState<string[]>([]);

  useEffect(() => {
    setMarqueeImages(getRandomIllustrationImagesNoRepeat(8));
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#ffe000] font-sans overflow-x-hidden">
      {/* 背景格線 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="w-full h-full" style={{ minHeight: '100vh', position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="transparent" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" strokeWidth="1" />
              <path d="M 0 60 L 60 60 60 0" fill="none" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 左側垂直導覽列（fixed） */}
      <nav className="fixed top-1/2 left-0 z-50 flex flex-col items-center justify-center gap-6 bg-white border border-black rounded-r-2xl py-8 px-6" style={{ transform: 'translateY(-50%)' }}>
        <a className="nav-link-vertical" href="#about" data-label="About">A</a>
        <a className="nav-link-vertical" href="#illustration" data-label="Illustration">I</a>
        <a className="nav-link-vertical" href="#branding" data-label="Branding">B</a>
        <a className="nav-link-vertical" href="#design" data-label="Design">D</a>
      </nav>

      {/* Logo fixed 置左下 */}
      <div className="fixed left-0 bottom-0 z-50 p-6" style={{ transform: 'scale(1.8)', transformOrigin: 'left bottom' }}>
        <div className="logo-block long">
          <Image src="/logo.svg" alt="Liam Design Logo" width={108} height={108} style={{ display: 'block' }} />
        </div>
      </div>

      {/* 內容 container（不含 navbar/aside） */}
      <div className="relative w-full max-w-7xl px-16 mx-auto flex flex-col items-center">
        {/* 主內容區塊 */}
        <main className="relative z-10 flex flex-col items-center gap-12 pt-32 pb-16 px-4 min-h-[700px]">
          {/* 視窗群（6個，錯落排列） */}
          <div className="relative w-full min-h-[600px] z-10 pb-16" style={{ height: 520, margin: '0 auto', maxWidth: 1400, paddingBottom: 100 }}>
            {/* hero_map.svg 永遠顯示在 hero 區塊下方，z-10（背景格線 z-0，hero_map.svg z-10） */}
            {/* 這裡原本有五個+按鈕，已全部移除 */}
            <div className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center pointer-events-none" style={{transform: 'translate(-50%, -50%)'}}>
              <img src="/yilan_map.gif" alt="宜蘭地圖" style={{ width: '80vw', maxWidth: 1200, objectFit: 'contain', transform: 'scale(1.2)', transformOrigin: 'center' }} />
            </div>
            {/* 地圖上方對話窗 */}
            <div className="absolute z-30 w-full" style={{left: 0, top: '8%', pointerEvents: 'none'}}>
              <div style={{position: 'absolute', left: '28%', top: '200px'}}>
                <div className="speech-bubble speech-black">設計經由溝通</div>
              </div>
              <div style={{position: 'absolute', left: '60%', top: '18%'}}>
                <div className="speech-bubble speech-white">品牌源自生活</div>
              </div>
              <div style={{position: 'absolute', left: '18%', top: '38%'}}>
                <div className="speech-bubble speech-yellow">精神來自土地</div>
              </div>
            </div>
            {/* 地圖右側大按鈕 */}
            <div className="absolute z-20 flex flex-col gap-6" style={{right: 'calc(10vw - 100px)', bottom: 0, transform: 'scale(0.8)', transformOrigin: 'right bottom'}}>
              <button className="map-action-btn">了解案例</button>
              <button className="map-action-btn">查詢報價</button>
            </div>
          </div>

          {/* 跑馬燈一 */}
          <div className="w-full max-w-7xl overflow-hidden mt-16 pt-12">
            <div className="flex gap-4 animate-marquee">
              {marqueeImages.map((src, i) => (
                <div key={i} className="aspect-[16/9] w-64 border border-black bg-white flex flex-col items-center justify-start overflow-hidden rounded-xl" style={{borderRadius: 18}}>
                  <div className="bg-black w-full h-7" />
                  <div className="flex-1 w-full flex items-center justify-center bg-gray-300">
                    <img src={src} alt={`illustration`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: 18 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 跑馬燈二 */}
          <div className="w-full max-w-7xl overflow-hidden">
            <div className="flex gap-4 animate-marquee-reverse">
              {marqueeImages.map((src, i) => (
                <div key={i} className="aspect-[16/9] w-64 border border-black bg-white flex flex-col items-center justify-start overflow-hidden rounded-xl" style={{borderRadius: 18}}>
                  <div className="bg-black w-full h-7" />
                  <div className="flex-1 w-full flex items-center justify-center bg-gray-300">
                    <img src={src} alt={`illustration`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: 18 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Me 區塊 */}
          <section className="w-full flex justify-center items-start mt-16">
            <div className="flex flex-row gap-24 max-w-7xl w-full items-end">
              {/* 頭貼 */}
              <div className="flex-shrink-0 flex flex-col items-center justify-end">
                <div className="border border-black bg-white overflow-hidden rounded-xl" style={{ width: 420, height: 480, display: 'flex', flexDirection: 'column' }}>
                  <div className="bg-black h-10 flex items-center px-3 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-white mr-2" />
                    <div className="w-3 h-3 rounded-full bg-white mr-2" />
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <img src="/chactor.gif" alt="Chactor" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transform: 'scale(1.5)', display: 'block', margin: 'auto' }} />
                </div>
              </div>
              {/* 文字區塊 */}
              <div className="flex-1 flex flex-col justify-end h-[480px]">
                <div className="about-block">
                  <div className="about-title-row">
                    <span className="about-title">About Liam</span>
                    <span className="about-lang-btns">
                      {Object.entries(ABOUT_CONTENT).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setLang(key as 'zh' | 'en' | 'jp')}
                          className={`about-lang-btn ${lang === key ? 'active' : ''}`}
                        >
                          {val.label}
                        </button>
                      ))}
                    </span>
                  </div>
                  <div className="about-content">
                    {ABOUT_CONTENT[lang].text}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 在 About Me section 之後添加侏羅紀菜單部分 */}
          <section id="jurassic-menu" className="w-full flex flex-col items-center justify-center mt-24 mb-24 relative" style={{ minHeight: 1200 }}>
            {/* 左上 + 按鈕 */}
            <button className="absolute left-1/2 top-[18%] z-30 w-14 h-14 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-200 transition" style={{transform: 'translate(-160px, 0)'}} onClick={() => setShowMenuInfo1(true)} aria-label="菜單icon-1">
              <span style={{fontSize: 32, fontWeight: 900, color: '#231815'}}>+</span>
            </button>
            {showMenuInfo1 && (
              <div className="absolute left-1/2 top-[22%] z-40 bg-white border-2 border-black rounded-xl shadow-xl p-6" style={{width: 340, minHeight: 120, transform: 'translate(-160px, 0)'}}>
                <button onClick={() => setShowMenuInfo1(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center" aria-label="關閉">
                  <span style={{fontSize: 20, fontWeight: 900}}>-</span>
                </button>
                <div className="text-lg font-bold text-black">菜單資訊 1</div>
                <div className="mt-2 text-base text-black">這裡可以填寫菜單說明內容。</div>
              </div>
            )}
            {/* 右上 + 按鈕 */}
            <button className="absolute left-1/2 top-[18%] z-30 w-14 h-14 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-200 transition" style={{transform: 'translate(160px, 0)'}} onClick={() => setShowMenuInfo2(true)} aria-label="菜單icon-2">
              <span style={{fontSize: 32, fontWeight: 900, color: '#231815'}}>+</span>
            </button>
            {showMenuInfo2 && (
              <div className="absolute left-1/2 top-[22%] z-40 bg-white border-2 border-black rounded-xl shadow-xl p-6" style={{width: 340, minHeight: 120, transform: 'translate(160px, 0)'}}>
                <button onClick={() => setShowMenuInfo2(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center" aria-label="關閉">
                  <span style={{fontSize: 20, fontWeight: 900}}>-</span>
                </button>
                <div className="text-lg font-bold text-black">菜單資訊 2</div>
                <div className="mt-2 text-base text-black">這裡可以填寫菜單說明內容。</div>
              </div>
            )}
            {/* 下方 + 按鈕 */}
            <button className="absolute left-1/2 bottom-[18%] z-30 w-14 h-14 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-200 transition" style={{transform: 'translateX(-50%)'}} onClick={() => setShowMenuInfo3(true)} aria-label="菜單icon-3">
              <span style={{fontSize: 32, fontWeight: 900, color: '#231815'}}>+</span>
            </button>
            {showMenuInfo3 && (
              <div className="absolute left-1/2 bottom-[22%] z-40 bg-white border-2 border-black rounded-xl shadow-xl p-6" style={{width: 340, minHeight: 120, transform: 'translateX(-50%)'}}>
                <button onClick={() => setShowMenuInfo3(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center" aria-label="關閉">
                  <span style={{fontSize: 20, fontWeight: 900}}>-</span>
                </button>
                <div className="text-lg font-bold text-black">菜單資訊 3</div>
                <div className="mt-2 text-base text-black">這裡可以填寫菜單說明內容。</div>
              </div>
            )}
            <div id="jurassic-menu-bounds" className="relative w-full flex flex-row items-start justify-center gap-8" style={{ minHeight: 600 }}>
              {/* 中間電子書 */}
              <div className="flex flex-col items-center" style={{ margin: '0 auto' }}>
                <div className="bg-[#ffe000] px-6 py-3 mb-6 inline-block text-5xl font-extrabold text-black" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  2025 Jurassic MENU
                </div>
                <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', width: '1134px', height: '1134px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <FlipBook images={[
                    { src: "/menu-0615-demo-test-img/page-1.png", width: 1134, height: 567 },
                    { src: "/menu-0615-demo-test-img/page-2.png", width: 1134, height: 1134 },
                    { src: "/menu-0615-demo-test-img/page-3.png", width: 1134, height: 1134 },
                    { src: "/menu-0615-demo-test-img/page-4.png", width: 1134, height: 1134 },
                    { src: "/menu-0615-demo-test-img/page-5.png", width: 1134, height: 1134 },
                    { src: "/menu-0615-demo-test-img/page-6.png", width: 1134, height: 567 },
                    { src: "/menu-0615-demo-test-img/page-12.png", width: 1134, height: 567 },
                  ]} />
                </div>
              </div>
            </div>
          </section>

          {/* 跑馬燈一 - 黑底白字 */}
          <div className="w-full bg-black py-4 overflow-hidden mt-12">
            <div className="animate-marquee whitespace-nowrap">
              {Array(3).fill(null).map((_, i) => (
                <span key={i} className="text-white text-2xl font-extrabold mx-8">About Project　／　Design starts with communication.</span>
              ))}
            </div>
          </div>
          {/* 跑馬燈二 - 白底黑字 */}
          <div className="w-full bg-white py-4 overflow-hidden">
            <div className="animate-marquee-reverse whitespace-nowrap">
              {Array(3).fill(null).map((_, i) => (
                <span key={i} className="text-black text-2xl font-extrabold mx-8">About Project　／　Design starts with communication.</span>
              ))}
            </div>
          </div>
        </main>
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
      `}</style>
    </div>
  );
}
