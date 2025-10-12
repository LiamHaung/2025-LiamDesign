'use client';

import Link from 'next/link';
import { useState } from 'react';

interface TestPage {
  name: string;
  path: string;
  description: string;
  category: string;
}

const testPages: TestPage[] = [
  // Hero 相關測試
  {
    name: 'Hero Simple Test',
    path: '/hero-simple-test',
    description: '簡化版 Hero 頁面測試',
    category: 'Hero'
  },
  {
    name: 'Hero Test',
    path: '/hero-test',
    description: '基礎 Hero 頁面測試',
    category: 'Hero'
  },
  {
    name: 'Hero Comprehensive Test',
    path: '/hero-comprehensive-test',
    description: '完整版 Hero 頁面測試',
    category: 'Hero'
  },
  
  // 視差效果測試
  {
    name: 'Parallax Test',
    path: '/parallax-test',
    description: '視差效果基礎測試',
    category: 'Parallax'
  },
  {
    name: 'Parallax Fix Test',
    path: '/parallax-fix-test',
    description: '視差效果修復測試',
    category: 'Parallax'
  },
  {
    name: 'Parallax Mobile Fix',
    path: '/parallax-mobile-fix',
    description: '視差效果手機版修復',
    category: 'Parallax'
  },
  {
    name: 'Parallax Comparison',
    path: '/parallax-comparison',
    description: '視差效果對比測試',
    category: 'Parallax'
  },
  
  // 入口頁面測試
  {
    name: 'Cosmic Entrance Test',
    path: '/cosmic-entrance-test',
    description: '宇宙風格入口頁面測試',
    category: 'Entrance'
  },
  {
    name: 'Minimal Cosmic Test',
    path: '/minimal-cosmic-test',
    description: '極簡宇宙風格測試',
    category: 'Entrance'
  },
  {
    name: 'Minimal Entrance Test',
    path: '/minimal-entrance-test',
    description: '極簡入口頁面測試',
    category: 'Entrance'
  },
  
  // 組件測試
  {
    name: 'Component Test',
    path: '/component-test',
    description: '組件功能測試',
    category: 'Components'
  },
  {
    name: 'Card Test',
    path: '/card-test',
    description: '卡片組件測試',
    category: 'Components'
  },
  {
    name: 'Irregular Shapes Test',
    path: '/irregular-shapes-test',
    description: '不規則形狀測試',
    category: 'Components'
  },
  
  // 作品集測試
  {
    name: 'Portfolio',
    path: '/portfolio',
    description: '作品集頁面',
    category: 'Portfolio'
  },
  {
    name: 'Waterfall Portfolio',
    path: '/waterfall-portfolio',
    description: '瀑布流作品集',
    category: 'Portfolio'
  },
  
  // 其他測試
  {
    name: 'Wave Boat Test',
    path: '/wave-boat-test',
    description: '波浪船隻動畫測試',
    category: 'Animation'
  },
  {
    name: 'Vertical Demo',
    path: '/vertical-demo',
    description: '垂直滾動演示',
    category: 'Layout'
  },
  {
    name: 'Test Site',
    path: '/test-site',
    description: '測試網站',
    category: 'General'
  },
  {
    name: 'Test',
    path: '/test',
    description: '基礎測試頁面',
    category: 'General'
  }
];

const categories = ['All', 'Hero', 'Parallax', 'Entrance', 'Components', 'Portfolio', 'Animation', 'Layout', 'General'];

export default function TestIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredPages = selectedCategory === 'All' 
    ? testPages 
    : testPages.filter(page => page.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                ← 返回主頁
              </Link>
              <h1 className="text-2xl font-bold text-white">
                🧪 測試頁面入口
              </h1>
            </div>
            <div className="text-sm text-gray-300">
              共 {testPages.length} 個測試頁面
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Test Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {page.name}
                </h3>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {page.category}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {page.description}
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                前往測試 →
              </div>
            </Link>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              沒有找到 {selectedCategory} 類別的測試頁面
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>測試頁面入口 - 方便開發和測試各種功能</p>
            <p className="mt-2">
              最後更新: {new Date().toLocaleDateString('zh-TW')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
