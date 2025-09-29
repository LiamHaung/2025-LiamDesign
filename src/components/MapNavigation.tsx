'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MapNavigationProps {
  className?: string;
}

export default function MapNavigation({ className = '' }: MapNavigationProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  // 地圖區域配置
  const mapAreas = [
    {
      id: 'intro',
      name: 'Intro 自我介紹',
      href: '#intro',
      position: { top: '15%', left: '20%' },
      size: { width: '25%', height: '20%' },
      color: '#003EC3',
      icon: '👤',
      description: '了解 Liam 的個人故事'
    },
    {
      id: 'design',
      name: 'Design 設計服務',
      href: '#design',
      position: { top: '35%', left: '10%' },
      size: { width: '25%', height: '20%' },
      color: '#3aaf3a',
      icon: '🎨',
      description: '平面設計與視覺創作'
    },
    {
      id: 'illustration',
      name: 'Illustration 插畫服務',
      href: '#illustration',
      position: { top: '55%', left: '30%' },
      size: { width: '25%', height: '20%' },
      color: '#ff6b35',
      icon: '🖼️',
      description: '手繪插畫與數位創作'
    },
    {
      id: 'brand',
      name: 'Brand 品牌服務',
      href: '#brand',
      position: { top: '25%', left: '60%' },
      size: { width: '25%', height: '20%' },
      color: '#8b5cf6',
      icon: '🏷️',
      description: '品牌識別與策略規劃'
    },
    {
      id: 'contact',
      name: 'Contact 聯絡區塊',
      href: '#contact',
      position: { top: '55%', left: '70%' },
      size: { width: '25%', height: '20%' },
      color: '#e74c3c',
      icon: '📞',
      description: '聯繫方式與合作洽談'
    }
  ];

  const handleAreaClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* 桌面版地圖容器 */}
      <div className="hidden md:block relative w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        {/* 地圖標題 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            🗺️ Liam Design Studio 導航地圖
          </h2>
          <p className="text-gray-600">點擊下方區域探索不同服務</p>
        </div>

        {/* 地圖背景區域 */}
        <div className="relative w-full h-96 bg-gradient-to-br from-[#FFFFF3] to-[#f0f8ff] rounded-xl border-2 border-gray-300 overflow-hidden">
          {/* 背景裝飾元素 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300 rounded-full"></div>
            <div className="absolute top-12 right-8 w-6 h-6 bg-green-300 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-10 h-10 bg-orange-300 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-7 h-7 bg-purple-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* 版位標註區域 - 用於設計參考 */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden">
            {/* Intro 自我介紹區塊標註 */}
            <div 
              className="absolute border-2 border-blue-500 bg-blue-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '15%',
                left: '20%',
                width: '25%',
                height: '20%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👤</div>
                <div className="text-xs font-bold text-blue-800">Intro</div>
                <div className="text-xs text-blue-600">自我介紹</div>
              </div>
            </div>

            {/* Design 設計服務區塊標註 */}
            <div 
              className="absolute border-2 border-green-500 bg-green-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '35%',
                left: '10%',
                width: '25%',
                height: '20%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-xs font-bold text-green-800">Design</div>
                <div className="text-xs text-green-600">設計服務</div>
              </div>
            </div>

            {/* Illustration 插畫服務區塊標註 */}
            <div 
              className="absolute border-2 border-orange-500 bg-orange-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '55%',
                left: '30%',
                width: '25%',
                height: '20%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <div className="text-xs font-bold text-orange-800">Illustration</div>
                <div className="text-xs text-orange-600">插畫服務</div>
              </div>
            </div>

            {/* Brand 品牌服務區塊標註 */}
            <div 
              className="absolute border-2 border-purple-500 bg-purple-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '25%',
                left: '60%',
                width: '25%',
                height: '20%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🏷️</div>
                <div className="text-xs font-bold text-purple-800">Brand</div>
                <div className="text-xs text-purple-600">品牌服務</div>
              </div>
            </div>

            {/* Contact 聯絡區塊標註 */}
            <div 
              className="absolute border-2 border-red-500 bg-red-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '55%',
                left: '70%',
                width: '25%',
                height: '20%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">📞</div>
                <div className="text-xs font-bold text-red-800">Contact</div>
                <div className="text-xs text-red-600">聯絡區塊</div>
              </div>
            </div>

            {/* 座標標記 */}
            <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
              座標參考
            </div>
          </div>

          {/* 可點擊區域 */}
          {mapAreas.map((area, index) => (
            <div
              key={`${area.id}-${index}`}
              className="absolute cursor-pointer group transition-all duration-300 rounded-lg border-2 border-transparent hover:border-white/50 z-10"
              style={{
                top: area.position.top,
                left: area.position.left,
                width: area.size.width,
                height: area.size.height,
                backgroundColor: hoveredArea === area.id ? `${area.color}20` : 'transparent'
              }}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('點擊區域:', area.id, 'href:', area.href);
                handleAreaClick(area.href);
              }}
            >
              {/* 區域內容 */}
              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                {/* 圖標 */}
                <div 
                  className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: hoveredArea === area.id ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none' }}
                >
                  {area.icon}
                </div>
                
                {/* 區域名稱 */}
                <div className="text-center">
                  <h3 
                    className="font-bold text-sm mb-1 transition-colors duration-300"
                    style={{ 
                      color: hoveredArea === area.id ? area.color : '#353535',
                      fontFamily: 'var(--font-zpix), monospace'
                    }}
                  >
                    {area.name}
                  </h3>
                  
                </div>
              </div>

              {/* 邊框高亮效果 */}
              <div
                className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                style={{ 
                  borderColor: area.color,
                  opacity: hoveredArea === area.id ? 0.6 : 0
                }}
              />
            </div>
          ))}

        </div>

        {/* 底部說明 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            💡 點擊上方區域快速跳轉到對應的服務區塊
          </p>
        </div>

        {/* 版位座標說明 - 用於設計地圖 PNG */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="font-bold text-lg mb-3 text-gray-800" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            📐 版位座標參考（用於設計地圖 PNG）
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="font-semibold">👤 Intro 自我介紹：</span>
                <span className="text-gray-600">top: 15%, left: 20%, 25% × 20%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="font-semibold">🎨 Design 設計服務：</span>
                <span className="text-gray-600">top: 35%, left: 10%, 25% × 20%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="font-semibold">🖼️ Illustration 插畫：</span>
                <span className="text-gray-600">top: 55%, left: 30%, 25% × 20%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="font-semibold">🏷️ Brand 品牌服務：</span>
                <span className="text-gray-600">top: 25%, left: 60%, 25% × 20%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="font-semibold">📞 Contact 聯絡：</span>
                <span className="text-gray-600">top: 55%, left: 70%, 25% × 20%</span>
              </div>
              <div className="text-gray-500 text-xs mt-2">
                💡 地圖尺寸建議：800px × 384px (2.08:1 比例)
                <br />
                📐 實際容器尺寸：地圖區域為 100% 寬度，高度 384px (24rem)
                <br />
                🎨 建議設計尺寸：1200px × 576px (高解析度) 或 800px × 384px (標準)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 手機版卡片式導航 */}
      <div className="md:hidden space-y-4">
        {/* 標題 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            🗺️ 服務導航
          </h2>
          <p className="text-sm text-gray-600">點擊下方卡片探索不同服務</p>
        </div>

        {/* 卡片網格 */}
        <div className="grid grid-cols-1 gap-4">
          {mapAreas.map((area) => (
            <motion.a
              key={area.id}
              href={area.href}
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick(area.href);
              }}
              className="block p-4 rounded-xl border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                {/* 圖標 */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${area.color}20` }}
                >
                  {area.icon}
                </div>
                
                {/* 內容 */}
                <div className="flex-1">
                  <h3 
                    className="font-bold text-lg mb-1"
                    style={{ 
                      color: area.color,
                      fontFamily: 'var(--font-zpix), monospace'
                    }}
                  >
                    {area.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {area.description}
                  </p>
                </div>
                
                {/* 箭頭 */}
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 底部說明 */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            💡 點擊上方卡片快速跳轉到對應的服務區塊
          </p>
        </div>
      </div>
    </div>
  );
}
