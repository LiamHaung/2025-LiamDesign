'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TestSitePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const testPages = [
    {
      id: 'component-test',
      title: '元件測試區',
      subtitle: 'Component Test Area',
      description: '測試所有 React 元件，包含動畫效果、響應式設計、互動功能等',
      icon: '🧩',
      color: '#003EC3',
      features: [
        '靜態格子紋路元件',
        '動畫格子紋路元件',
        '電子時鐘元件',
        'Intro 版位測試',
        '旋轉效果測試',
        '復古視窗布局',
        'ProfileCard 測試',
        '輪播式個人資料卡片',
        'IntroCard 元件',
        'AboutLiamTag 標籤',
        'ImageCarouselCard 輪播',
        'Brand 品牌服務區塊',
        '跑馬燈元件',
        '價目表元件',
        '聯繫 Liam 元件',
        '介紹視窗元件',
        '個人介紹視窗',
        '地圖導航元件',
        '作品介紹視窗'
      ],
      path: '/component-test'
    },
    {
      id: 'card-test',
      title: '卡片測試區',
      subtitle: 'Card Test Area',
      description: '測試各種卡片樣式和布局，包含輪播功能、響應式設計等',
      icon: '🎴',
      color: '#3aaf3a',
      features: [
        '輪播版本 (方案 A)',
        '網格版本 (原始)',
        'Version B 深色覆蓋',
        '水平版卡片',
        '插畫分割輪播',
        '響應式布局測試',
        '動畫效果測試',
        '互動功能測試'
      ],
      path: '/card-test'
    },
    {
      id: 'parallax-test',
      title: '視差效果測試',
      subtitle: 'Parallax Test Area',
      description: '測試視差滾動效果和動畫，包含背景動畫、元素動畫等',
      icon: '🌊',
      color: '#FF6B35',
      features: [
        '視差滾動效果',
        '背景動畫',
        '元素動畫',
        '滾動觸發動畫',
        '響應式視差',
        '性能優化測試'
      ],
      path: '/parallax-test'
    },
    {
      id: 'vertical-demo',
      title: '垂直滾動測試',
      subtitle: 'Vertical Scroll Demo',
      description: '測試垂直滾動布局和分段式內容展示',
      icon: '📜',
      color: '#9B59B6',
      features: [
        '垂直滾動布局',
        '分段式內容',
        '滾動指示器',
        '錨點導航',
        '滾動動畫',
        '內容分段展示'
      ],
      path: '/vertical-demo'
    },
    {
      id: 'wave-boat-test',
      title: '波浪船隻測試',
      subtitle: 'Wave Boat Test',
      description: '測試波浪動畫和船隻動畫效果',
      icon: '🚢',
      color: '#3498DB',
      features: [
        '波浪動畫效果',
        '船隻動畫',
        '水面效果',
        '動畫同步',
        '響應式動畫',
        '性能測試'
      ],
      path: '/wave-boat-test'
    },
    {
      id: 'waterfall-portfolio',
      title: '瀑布流作品牆',
      subtitle: 'Waterfall Portfolio',
      description: '測試瀑布流作品展示與詳細介紹彈窗功能',
      icon: '🖼️',
      color: '#E74C3C',
      features: [
        '瀑布流布局',
        '作品卡片展示',
        '分類篩選功能',
        '詳細介紹彈窗',
        '響應式設計',
        '互動動畫效果'
      ],
      path: '/waterfall-portfolio'
    }
  ];

  const stats = [
    { label: '測試頁面', value: '6', icon: '📄' },
    { label: '測試元件', value: '50+', icon: '🧩' },
    { label: '動畫效果', value: '30+', icon: '✨' },
    { label: '響應式斷點', value: '4', icon: '📱' }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #FFFFF3 0%, #F8F9FA 100%)',
      minHeight: '100vh',
      fontFamily: 'var(--font-zpix), monospace'
    }}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Liam Design Studio</h1>
                <p className="text-sm text-gray-600">測試網站 Test Site</p>
              </div>
            </div>
            <Link 
              href="/"
              className="bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 hover:border-gray-500 active:bg-gray-500 active:border-gray-600 px-4 py-2 font-bold transition-all duration-150 shadow-md"
              style={{ 
                fontFamily: 'var(--font-zpix), monospace',
                color: '#000000',
                textShadow: '1px 1px 0px #ffffff'
              }}
            >
              🏠 返回主站
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            測試網站
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Liam Design Studio - 元件與功能測試平台
          </motion.p>
          <motion.div
            className="text-lg text-gray-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Test Site - Component & Feature Testing Platform
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Pages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            測試區域
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testPages.map((page, index) => (
              <motion.div
                key={page.id}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCard(page.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Card Header */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ backgroundColor: page.color }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{page.icon}</div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">{page.subtitle}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{page.description}</p>
                  
                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: hoveredCard === page.id ? 1 : 0,
                      opacity: hoveredCard === page.id ? 0.1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-3">測試功能：</h4>
                  <div className="space-y-2">
                    {page.features.slice(0, 6).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {page.features.length > 6 && (
                      <div className="text-sm text-gray-500 mt-2">
                        + {page.features.length - 6} 更多功能...
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <Link
                    href={page.path}
                    className="block w-full bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 hover:border-gray-500 active:bg-gray-500 active:border-gray-600 text-center py-3 font-bold transition-all duration-150 shadow-md"
                    style={{ 
                      fontFamily: 'var(--font-zpix), monospace',
                      color: '#000000',
                      textShadow: '1px 1px 0px #ffffff'
                    }}
                  >
                    🚀 進入測試
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            快速存取
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testPages.map((page, index) => (
              <motion.div
                key={`quick-${page.id}`}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{page.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{page.title}</h3>
                  <Link
                    href={page.path}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm"
                  >
                    前往測試
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Liam Design Studio</h3>
            <p className="text-gray-400">測試網站 Test Site</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>© 2025 Liam Design Studio. All rights reserved.</p>
            <p className="mt-2">Built with Next.js, React, Framer Motion & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
