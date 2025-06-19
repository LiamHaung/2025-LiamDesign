'use client';
import React from 'react';
import HorizontalScroll from './HorizontalScroll';

const TimelineBlock = ({ title, description, bgColor }: {
  title: string;
  description: string;
  bgColor: string;
}) => (
  <div className="min-w-[100vw] h-screen flex items-center justify-center px-12" style={{ backgroundColor: bgColor }}>
    <div className="max-w-2xl w-full">
      <div className="bg-white border-2 border-black rounded-xl p-8 shadow-lg">
        <h3 className="text-4xl font-extrabold mb-6">{title}</h3>
        <p className="text-xl leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ProjectTimeline = () => {
  return (
    <HorizontalScroll>
      <div className="flex">
        {/* 第一個區塊：溝通 */}
        <TimelineBlock
          title="溝通"
          description="在這個階段，我們深入了解您的需求和期望。通過詳細的討論和分析，確保我們能夠準確把握您的品牌願景。"
          bgColor="#fae14b"
        />

        {/* 第二個區塊：找出核心 */}
        <TimelineBlock
          title="找出核心"
          description="我們將所有收集到的資訊進行整理和分析，找出品牌的核心價值和獨特之處，為接下來的設計方向奠定基礎。"
          bgColor="#59abc3"
        />

        {/* 第三個區塊：設計過程 */}
        <TimelineBlock
          title="設計過程"
          description="根據前期的分析結果，我們開始進行創意發想和設計製作，每一個細節都經過精心打磨，確保最終成品能夠完美展現品牌精神。"
          bgColor="#3d3735"
        />
      </div>
    </HorizontalScroll>
  );
};

export default ProjectTimeline; 