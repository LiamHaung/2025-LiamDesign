'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  className?: string;
  aspectRatio?: '4:3' | '16:9';
  animated?: boolean;
}

export default function ProfileCard({ 
  className = '', 
  aspectRatio = '4:3',
  animated = true 
}: ProfileCardProps) {
  const aspectRatioClass = aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-[16/9]';
  
  const cardContent = (
    <div className={`bg-white border-2 border-black rounded-lg overflow-hidden ${aspectRatioClass} ${className}`}>
      {/* 主要內容區域 */}
      <div className="flex h-full">
        {/* 左側：角色區域 */}
        <div className="flex-1 flex flex-col justify-end relative">
          {/* 角色圖片 */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img 
              src="/chactor.gif" 
              alt="Liam Character"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* 藍色姓名條 */}
          <div 
            className="px-4 py-3 text-center"
            style={{ backgroundColor: '#003EC3' }}
          >
            <span 
              className="text-white font-bold text-lg"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              Liam Huang
            </span>
          </div>
        </div>

        {/* 右側：文字內容區域 */}
        <div className="flex-1 p-6 flex flex-col justify-center space-y-4">
          {/* 職業標題 */}
          <div className="border-b border-black pb-2">
            <h2 
              className="text-xl font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              平面設計師
            </h2>
          </div>

          {/* 技能標籤 */}
          <div className="border-b border-black pb-2">
            <p 
              className="text-lg text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              插畫、印刷、設計、品牌
            </p>
          </div>

          {/* 座右銘 */}
          <div className="border-b border-black pb-2">
            <p 
              className="text-base text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              今天可以休息就不要留給明天
            </p>
          </div>

          {/* 自我介紹 */}
          <div className="pt-2">
            <p 
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              我是 <span className="font-bold">Liam</span>，喜歡把想法
              <br />
              變成會呼吸的設計。放輕鬆、
              <br />
              慢慢逛，或許下一個專案就
              <br />
              從這裡開始。
            </p>
          </div>
        </div>
      </div>

      {/* 底部 Hashtag */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <div className="flex justify-center space-x-4">
          <span 
            className="text-white text-sm font-bold"
            style={{ fontFamily: 'var(--font-zpix), monospace' }}
          >
            #Own the Day
          </span>
          <span 
            className="text-white text-sm font-bold"
            style={{ fontFamily: 'var(--font-zpix), monospace' }}
          >
            #Go Live Today
          </span>
        </div>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.8)',
          transition: { duration: 0.2 }
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div 
      className="relative hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-shadow duration-200"
    >
      {cardContent}
    </div>
  );
}
