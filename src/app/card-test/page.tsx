"use client";
import React, { useState } from "react";
import Link from "next/link";
import TestCard from "@/components/TestCard";
import TestCardAlt from "@/components/TestCardAlt";
import CardCarousel from "@/components/CardCarousel";
import IllustrationSplitCarousel from "@/components/IllustrationSplitCarousel";
import { motion } from "framer-motion";

export default function CardTestPage() {
  const [activeView, setActiveView] = useState('carousel');
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(3000);

  const cards = [
    {
      title: "角色插畫風格探索",
      subtitle: "以線條與塊面塑造活潑節奏，搭配品牌藍強化識別。",
      imageSrc: "/illustration_1.png",
      tags: ["Illustration", "Concept"],
    },
    {
      title: "品牌應用小物",
      subtitle: "把識別延伸到小物件，建立一致且有趣味的接觸點。",
      imageSrc: "/illustration_2.png",
      tags: ["Brand", "Application"],
    },
    {
      title: "數位海報動態版",
      subtitle: "把靜態視覺加上微動畫，提升吸睛與互動感。",
      imageSrc: "/illustration_3.png",
      tags: ["Motion", "Poster"],
    },
    {
      title: "UI/UX 設計系統",
      subtitle: "建立完整的設計語言，確保產品體驗的一致性。",
      imageSrc: "/illustration_4.png",
      tags: ["UI/UX", "System"],
    },
    {
      title: "品牌視覺識別",
      subtitle: "從 Logo 到色彩系統，打造獨特的品牌形象。",
      imageSrc: "/illustration_5.png",
      tags: ["Brand", "Identity"],
    },
  ];

  return (
    <div style={{ background: "#FFFFF3", minHeight: "100svh" }}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Card Test
            </motion.h1>
            <Link 
              href="/test-site"
              className="bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 hover:border-gray-500 active:bg-gray-500 active:border-gray-600 px-4 py-2 font-bold transition-all duration-150 shadow-md"
              style={{ 
                fontFamily: 'var(--font-zpix), monospace',
                color: '#000000',
                textShadow: '1px 1px 0px #ffffff'
              }}
            >
              🏠 返回測試網站
            </Link>
          </div>
          
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              控制面板
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* View Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">顯示模式</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveView('carousel')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all duration-150 ${
                      activeView === 'carousel'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                  >
                    🎠 輪播
                  </button>
                  <button
                    onClick={() => setActiveView('grid')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all duration-150 ${
                      activeView === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                  >
                    📐 網格
                  </button>
                  <button
                    onClick={() => setActiveView('alt')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all duration-150 ${
                      activeView === 'alt'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    style={{ fontFamily: 'var(--font-zpix), monospace' }}
                  >
                    🎴 替代版
                  </button>
                </div>
              </div>
              
              {/* Auto Play Control */}
              <div>
                <label className="block text-sm font-medium mb-2">自動播放</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">啟用自動播放</span>
                </div>
              </div>
              
              {/* Interval Control */}
              <div>
                <label className="block text-sm font-medium mb-2">播放間隔 (毫秒)</label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={autoPlayInterval}
                  onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">{autoPlayInterval}ms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <IllustrationSplitCarousel />
        </div>

        {/* Dynamic Content Based on View */}
        {activeView === 'carousel' && (
          <div className="mb-16">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-black mb-6"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Carousel Version (方案 A)
            </motion.h2>
            <CardCarousel 
              cards={cards} 
              autoPlay={autoPlay}
              autoPlayInterval={autoPlayInterval}
              showControls={true}
              showIndicators={true}
              className="h-96"
            />
          </div>
        )}

        {activeView === 'grid' && (
          <div className="mb-16">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-black mb-6"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Grid Version (原始)
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((c, i) => (
                <TestCard key={i} title={c.title} subtitle={c.subtitle} imageSrc={c.imageSrc} tags={c.tags} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'alt' && (
          <div className="mb-16">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-black mb-6"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Version B (替代版本)
            </motion.h2>
            <div className="space-y-6">
              <TestCardAlt title="深色覆蓋・品牌主視覺" subtitle="以深色罩層保持文字可讀性，背景仍保留影像質感，適合大圖敘事。" imageSrc="/illustration_4.png" tag="#Brand" />
              <TestCardAlt title="插畫場景・水平版卡片" subtitle="水平排版讓資訊更緊湊，適合長文引導與外部連結。" imageSrc="/illustration_5.png" tag="#Illustration" />
              <TestCardAlt title="角色插畫風格探索" subtitle="以線條與塊面塑造活潑節奏，搭配品牌藍強化識別。" imageSrc="/illustration_1.png" tag="#Illustration" />
              <TestCardAlt title="品牌應用小物" subtitle="把識別延伸到小物件，建立一致且有趣味的接觸點。" imageSrc="/illustration_2.png" tag="#Brand" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
