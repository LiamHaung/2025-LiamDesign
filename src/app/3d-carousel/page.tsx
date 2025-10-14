'use client';

import React from 'react';
import Carousel3D from '@/components/Carousel3D';

// 範例資料
const carouselItems = [
  {
    id: 1,
    title: '作品集專案 01',
    description: '這是一個創新的UI/UX設計專案，展示了現代化的使用者介面設計理念。',
    image: '/project-cover-01.jpg',
    tags: ['UI/UX', '設計', '前端'],
    galleryImages: [
      { id: 1, src: '/project-01-01.jpg', alt: '專案截圖 1' },
      { id: 2, src: '/project-01-02.png', alt: '專案截圖 2' },
    ],
    galleryDescription: '這個專案展示了完整的設計流程，從概念到最終實現。'
  },
  {
    id: 2,
    title: '作品集專案 02',
    description: '一個具有創意視覺效果的網頁設計專案，融合了動畫和互動元素。',
    image: '/project-cover-02.jpg',
    tags: ['動畫', '互動', '創意'],
    galleryImages: [
      { id: 1, src: '/project-02-01.png', alt: '專案截圖 1' },
    ],
    galleryDescription: '這個專案專注於創造令人印象深刻的視覺體驗。'
  },
  {
    id: 3,
    title: '作品集專案 03',
    description: '一個展示多媒體內容的專案，結合了圖片、影片和互動元素。',
    image: '/project-cover-03.jpg',
    tags: ['多媒體', '互動', '展示'],
    galleryImages: [
      { id: 1, src: '/project-03-01.jpg', alt: '專案截圖 1' },
      { id: 2, src: '/project-03-02.jpg', alt: '專案截圖 2' },
      { id: 3, src: '/project-03-03.jpg', alt: '專案截圖 3' },
      { id: 4, src: '/project-03-04.jpg', alt: '專案截圖 4' },
    ],
    galleryDescription: '這個專案展示了豐富的多媒體內容和創新的展示方式。'
  },
  {
    id: 4,
    title: '作品集專案 04',
    description: '一個專注於使用者體驗的設計專案，強調直觀性和易用性。',
    image: '/project-cover-04.jpg',
    tags: ['UX', '易用性', '設計'],
    galleryImages: [
      { id: 1, src: '/project-04-01.png', alt: '專案截圖 1' },
    ],
    galleryDescription: '這個專案專注於創造最佳的使用者體驗。'
  },
  {
    id: 5,
    title: '創意設計專案',
    description: '一個充滿創意的設計專案，展示了獨特的視覺風格和創新的設計理念。',
    image: '/project-cover-05.jpg',
    tags: ['創意', '視覺', '創新'],
    galleryImages: [
      { id: 1, src: '/project-cover-05.jpg', alt: '專案封面' },
      { id: 2, src: '/hero-02.png', alt: '專案截圖 1' },
      { id: 3, src: '/hero-2.png', alt: '專案截圖 2' },
    ],
    galleryDescription: '這個專案展示了創新的設計思維和獨特的視覺表達。'
  }
];

export default function Carousel3DPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 頁面標題 */}
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-4xl font-bold text-white mb-2 font-mono">
          3D 輪播展示
        </h1>
        <p className="text-gray-300 text-lg font-mono">
          使用滑鼠滾輪或拖拽來瀏覽作品集
        </p>
      </div>

      {/* 操作說明 */}
      <div className="absolute top-8 right-8 z-20 text-right">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 className="text-white font-mono text-lg mb-2">操作說明</h3>
          <ul className="text-gray-300 text-sm font-mono space-y-1">
            <li>• 滑鼠滾輪：切換項目</li>
            <li>• 拖拽：手動控制</li>
            <li>• 點擊卡片：查看詳細內容</li>
          </ul>
        </div>
      </div>

      {/* 3D 輪播元件 */}
      <Carousel3D items={carouselItems} />

      {/* 底部導航 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <p className="text-white font-mono text-sm">
            共 {carouselItems.length} 個專案 • 點擊卡片查看詳細內容
          </p>
        </div>
      </div>
    </div>
  );
}
