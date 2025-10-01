'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
      position: { top: '20%', left: '30%' },
      size: { width: '22%', height: '22%' },
      color: '#003EC3',
      icon: '👤',
      description: '了解 Liam 的個人故事'
    },
    {
      id: 'design',
      name: 'Design 設計服務',
      href: '#design',
      position: { top: '40%', left: '20%' },
      size: { width: '22%', height: '22%' },
      color: '#3aaf3a',
      icon: '🎨',
      description: '平面設計與視覺創作'
    },
    {
      id: 'illustration',
      name: 'Illustration 插畫服務',
      href: '#illustration',
      position: { top: '50%', left: '40%' },
      size: { width: '22%', height: '22%' },
      color: '#ff6b35',
      icon: '🖼️',
      description: '手繪插畫與數位創作'
    },
    {
      id: 'portfolio',
      name: 'All Works 全部作品',
      href: '#portfolio',
      position: { top: '25%', left: '55%' },
      size: { width: '22%', height: '22%' },
      color: '#8b5cf6',
      icon: '🎯',
      description: '查看完整作品集展示'
    },
    {
      id: 'contact',
      name: 'Contact 聯絡區塊',
      href: '#contact',
      position: { top: '55%', left: '65%' },
      size: { width: '22%', height: '22%' },
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
    <div className={`w-full max-w-[1440px] mx-auto ${className}`}>
      {/* 桌面版地圖容器 */}
      <div className="hidden md:block relative w-full rounded-2xl p-8">
        {/* 地圖標題 */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            一起展開一段設計旅程｜Let's Start a Design Journey
          </h2>
          {/* 標籤元件 */}
          <div className="flex justify-center">
            <div 
              className="px-4 py-2 rounded-lg font-bold text-sm"
              style={{ 
                backgroundColor: '#003EC3', 
                color: '#FFFFF3',
                fontFamily: 'var(--font-zpix), monospace'
              }}
            >
              #LittleByLittle  #KeepGoing
            </div>
          </div>
        </div>

        {/* 地圖背景區域 */}
        <div className="relative w-full aspect-[2.08/1] rounded-xl overflow-hidden">
          {/* 地圖底圖 */}
          <img 
            src="/liam-nav-map.png" 
            alt="Liam Design Studio 導航地圖" 
            className="w-full h-full object-cover"
          />

          {/* 版位標註區域 - 用於設計參考 */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden">
            {/* Intro 自我介紹區塊標註 */}
            <div 
              className="absolute border-2 border-blue-500 bg-blue-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '20%',
                left: '30%',
                width: '22%',
                height: '22%'
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
                top: '40%',
                left: '20%',
                width: '22%',
                height: '22%'
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
                top: '50%',
                left: '40%',
                width: '22%',
                height: '22%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <div className="text-xs font-bold text-orange-800">Illustration</div>
                <div className="text-xs text-orange-600">插畫服務</div>
              </div>
            </div>

            {/* All Works 全部作品區塊標註 */}
            <div 
              className="absolute border-2 border-purple-500 bg-purple-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '25%',
                left: '55%',
                width: '22%',
                height: '22%'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-xs font-bold text-purple-800">All Works</div>
                <div className="text-xs text-purple-600">全部作品</div>
              </div>
            </div>

            {/* Contact 聯絡區塊標註 */}
            <div 
              className="absolute border-2 border-red-500 bg-red-100/30 rounded-lg flex items-center justify-center"
              style={{
                top: '55%',
                left: '65%',
                width: '22%',
                height: '22%'
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
              className="absolute cursor-pointer group transition-all duration-300 rounded-lg border-2 border-transparent hover:border-white/70 z-10"
              style={{
                top: area.position.top,
                left: area.position.left,
                width: area.size.width,
                height: area.size.height,
                backgroundColor: hoveredArea === area.id ? '#FFFFF3' : 'transparent'
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
              <div className="w-full h-full flex flex-col items-center justify-center p-1">
                {/* 圖標 */}
                <div 
                  className="text-3xl mb-1 transition-transform duration-300 group-hover:scale-105"
                >
                  {area.icon}
                </div>
                
                {/* 區域名稱 */}
                <div className="text-center px-1">
                  <h3 
                    className="font-bold text-xl leading-tight transition-colors duration-300"
                    style={{ 
                      color: hoveredArea === area.id ? '#003EC3' : '#FFFFFF',
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
                  borderColor: '#003EC3',
                  opacity: hoveredArea === area.id ? 1 : 0
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

      </div>

      {/* 手機版表格式導航 */}
      <div className="md:hidden">
        {/* 標題 */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            一起展開一段設計旅程｜Let's Start a Design Journey
          </h2>
          {/* 標籤元件 */}
          <div className="flex justify-center">
            <div 
              className="px-3 py-1 rounded-lg font-bold text-xs"
              style={{ 
                backgroundColor: '#003EC3', 
                color: '#FFFFF3',
                fontFamily: 'var(--font-zpix), monospace'
              }}
            >
              #LittleByLittle  #KeepGoing
            </div>
          </div>
        </div>

        {/* 表格式導航列表 */}
        <div className="space-y-3">
          {mapAreas.map((area, index) => (
            <motion.div
              key={area.id}
              className="group border-2 border-gray-400 bg-[#FFFFF3] hover:bg-[#003EC3] hover:text-[#FFFFF3] transition-all duration-200 rounded"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleAreaClick(area.href);
                }}
                className="block p-4 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* 圖標 */}
                  <div className="text-3xl">
                    {area.icon}
                  </div>
                  
                  {/* 服務資訊 */}
                  <div className="flex-1">
                    <div className="group-hover:text-[#FFFFF3] text-[#353535] font-bold text-xl" style={{ fontWeight: 800 }}>
                      {area.name}
                    </div>
                    <div className="group-hover:text-[#FFFFF3] text-[#353535] text-base mt-1">
                      {area.description}
                    </div>
                  </div>
                  
                  {/* 箭頭圖標 */}
                  <div className="text-xl group-hover:text-[#FFFFF3] text-[#353535]">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部說明 */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            💡 點擊上方項目快速跳轉到對應的服務區塊
          </p>
        </div>
      </div>
    </div>
  );
}
