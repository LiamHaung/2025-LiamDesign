"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxTestPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // 背景圖片視差效果
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // 標題動畫 - 20% 開始，從下往上滑入
  const titleY = useTransform(scrollYProgress, [0.2, 0.3], ['200px', '0px']);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  
  // 內文動畫 - 40% 開始，從下往上滑入
  const contentY = useTransform(scrollYProgress, [0.4, 0.5], ['200px', '0px']);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  
  // 圖片動畫 - 60% 開始，從下往上滑入
  const imageY = useTransform(scrollYProgress, [0.6, 0.7], ['200px', '0px']);
  const imageOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  return (
    <div ref={containerRef} style={{ background: "#FFFFF3", minHeight: "300vh" }}>
      {/* 背景圖片視差層 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: "url(/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(${backgroundY})`,
          zIndex: -1,
        }}
      />
      
      {/* 內容區域 */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* 標題 */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-8"
          style={{ 
            fontFamily: 'var(--font-zpix), monospace',
            transform: `translateY(${titleY})`,
            opacity: titleOpacity,
          }}
        >
          #Parallax Test
        </motion.h1>
        
        {/* 內文 */}
        <motion.div
          className="mb-16"
          style={{
            transform: `translateY(${contentY})`,
            opacity: contentOpacity,
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#003EC3] mb-6" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
            滾動視差效果測試
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            這是一個滾動視差效果的測試頁面。當你往下滾動時，背景圖片會以不同的速度移動，創造出深度感。
            標題、內文和圖片會依序出現，形成流暢的視覺體驗。
          </p>
        </motion.div>
        
        {/* 圖片 */}
        <motion.div
          className="mb-16"
          style={{
            transform: `translateY(${imageY})`,
            opacity: imageOpacity,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img 
                src="/illustration_1.png" 
                alt="Illustration 1" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[#003EC3] mb-2" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                角色插畫・風格探索
              </h3>
              <p className="text-gray-600">
                以線條與塊面塑造活潑節奏，搭配品牌藍強化識別。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img 
                src="/illustration_2.png" 
                alt="Illustration 2" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[#003EC3] mb-2" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                品牌延伸・應用小物
              </h3>
              <p className="text-gray-600">
                把識別延伸到日常小物，建立一致且有趣味的觸點。
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* 更多內容來測試滾動 */}
        <div className="space-y-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              滾動視差效果說明
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>• <strong>背景圖片</strong>：使用 <code>background-attachment: fixed</code> 效果，創造視差感</p>
              <p>• <strong>標題動畫</strong>：滾動到 30% 時從下方滑入</p>
              <p>• <strong>內文動畫</strong>：滾動到 50% 時從下方滑入</p>
              <p>• <strong>圖片動畫</strong>：滾動到 70% 時從下方滑入</p>
            </div>
          </div>
          
          <div className="bg-[#003EC3] text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              技術實現
            </h3>
            <div className="space-y-4">
              <p>• 使用 Framer Motion 的 <code>useScroll</code> 和 <code>useTransform</code> hooks</p>
              <p>• 透過 <code>scrollYProgress</code> 監聽滾動進度</p>
              <p>• 使用 <code>transform</code> 而非 <code>position</code> 確保性能</p>
              <p>• 支援響應式設計和不同螢幕尺寸</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              測試說明
            </h3>
            <p className="text-gray-700">
              請慢慢往下滾動，觀察背景圖片和內容的動畫效果。
              背景圖片會以較慢的速度移動，而內容會依序從下方滑入。
              這個效果可以應用到主頁面的任何區塊中。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
