"use client";
import React from "react";
import TestCard from "@/components/TestCard";
import TestCardAlt from "@/components/TestCardAlt";
import CardCarousel from "@/components/CardCarousel";
import IllustrationSplitCarousel from "@/components/IllustrationSplitCarousel";
import { motion } from "framer-motion";

export default function CardTestPage() {
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
        <div className="mb-12">
          <IllustrationSplitCarousel />
        </div>
        
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-black mb-8"
          style={{ fontFamily: 'var(--font-zpix), monospace' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Card Test
        </motion.h1>

        {/* 輪播版本 */}
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
            autoPlay={true}
            autoPlayInterval={3000}
            showControls={true}
            showIndicators={true}
            className="h-96"
          />
        </div>

        {/* 原始網格版本 */}
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
            {cards.slice(0, 3).map((c, i) => (
              <TestCard key={i} title={c.title} subtitle={c.subtitle} imageSrc={c.imageSrc} tags={c.tags} />
            ))}
          </div>
        </div>

        {/* TestCardAlt 版本 */}
        <div className="mt-16">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-black mb-6"
            style={{ fontFamily: 'var(--font-zpix), monospace' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Version B
          </motion.h2>
          <div className="space-y-6">
            <TestCardAlt title="深色覆蓋・品牌主視覺" subtitle="以深色罩層保持文字可讀性，背景仍保留影像質感，適合大圖敘事。" imageSrc="/illustration_4.png" tag="#Brand" />
            <TestCardAlt title="插畫場景・水平版卡片" subtitle="水平排版讓資訊更緊湊，適合長文引導與外部連結。" imageSrc="/illustration_5.png" tag="#Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}
