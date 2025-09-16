import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CarouselWindow from '../../components/CarouselWindow';
import TextWindow from '../../components/TextWindow';
import LoginSignupCard from '../../components/LoginSignupCard';
import VerticalWindow from '../../components/VerticalWindow';
import ColorScrollWindow from '../../components/ColorScrollWindow';
import ScrollColorStages from '../../components/ScrollColorStages';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'Components Demo (Preview Only)',
  description: 'Preview-only page for Illustration / Design / Brand windows',
};

export default function VerticalDemoPage() {
  const vercelEnv = process.env.VERCEL_ENV; // 'development' | 'preview' | 'production' | undefined
  const nextPublicEnv = process.env.NEXT_PUBLIC_ENV; // optional project-level flag
  const isDev = process.env.NODE_ENV !== 'production';
  const isPreview = vercelEnv === 'preview' || nextPublicEnv === 'preview';

  if (!(isDev || isPreview)) {
    // Hide this route in production deployments
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: 'min(96vw, 1400px)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: '#003EC3' }}>Components Demo（Preview 專用）</h1>
        <p style={{ marginBottom: '24px', color: '#333' }}>此頁面僅在 Vercel Preview 或本地開發環境顯示（noindex）。</p>

        {/* 滾動分段變色（方法B：IntersectionObserver） */}
        <div style={{ marginBottom: '24px' }}>
          <ScrollColorStages colors={["#FFFFF3", "#353535", "#003EC3"]} sectionHeight="100vh" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', alignItems: 'start' }}>
          {/* IG 版面：VerticalWindow */}
          <div>
            <VerticalWindow width="100%" height="80vh" />
          </div>

          {/* 插畫：CarouselWindow */}
          <div>
            <CarouselWindow
              width="100%"
              height="60vh"
              windowTitle="插畫庫.exe"
              images={['/illustration_1.png','/illustration_2.png','/illustration_3.png','/illustration_4.png','/illustration_5.png','/illustration_6.png']}
              autoPlay
              autoPlayInterval={3000}
            />
          </div>

          {/* 設計：TextWindow */}
          <div>
            <TextWindow
              width="100%"
              height="40vh"
              windowTitle="設計筆記.txt"
              content={`每個品牌都有獨特的故事，我們用設計讓這些故事發光發熱。\n\n• 品牌識別設計\n• 印刷品設計\n• 包裝設計\n• 網站設計`}
            />
          </div>

          {/* 品牌：LoginSignupCard（品牌介紹） */}
          <div>
            <LoginSignupCard
              width="100%"
              height="60vh"
              windowTitle="品牌介紹.exe"
              title="Liam Design Studio — 來自土地的設計夥伴"
              description={`「Liam Design Studio，專注於品牌設計與視覺傳達。\n我們相信，好的設計源於深入的理解與溝通，\n每一個專案都承載著獨特的故事與價值。\n從品牌識別到數位設計，我們用創意打造令人印象深刻的品牌體驗。」`}
              leftImage="/hero.png"
            />
          </div>

          {/* 滾輪變色：ColorScrollWindow */}
          <div>
            <ColorScrollWindow
              width="100%"
              height="40vh"
              windowTitle="色彩面板.exe"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 