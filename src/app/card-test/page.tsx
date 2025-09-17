"use client";
import React from "react";
import TestCard from "@/components/TestCard";
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
  ];

  return (
    <div style={{ background: "#FFFFF3", minHeight: "100svh" }}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <TestCard key={i} title={c.title} subtitle={c.subtitle} imageSrc={c.imageSrc} tags={c.tags} />
          ))}
        </div>
      </div>
    </div>
  );
} 