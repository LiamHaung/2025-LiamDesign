import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import VerticalWindow from '../../components/VerticalWindow';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'VerticalWindow Demo (Preview Only)',
  description: 'Preview-only page for VerticalWindow component',
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
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFF3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: 'min(96vw, 1200px)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: '#003EC3' }}>VerticalWindow Demo（Preview 專用）</h1>
        <p style={{ marginBottom: '24px', color: '#333' }}>此頁面僅在 Vercel Preview 或本地開發環境顯示（noindex）。</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: '320px', maxWidth: '480px' }}>
            <VerticalWindow width="100%" height="80vh" />
          </div>
        </div>
      </div>
    </div>
  );
} 