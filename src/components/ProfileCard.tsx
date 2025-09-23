'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  className?: string;
  animated?: boolean;
}

export default function ProfileCard({ 
  className = '', 
  animated = true 
}: ProfileCardProps) {
  const cardContent = (
    <div className={`bg-white border-2 border-black rounded-lg overflow-hidden ${className}`}>
      {/* 主要內容區域 - 信用卡橫幅比例 */}
      <div className="flex h-32">
        {/* 左側：角色區域 */}
        <div className="w-32 flex flex-col justify-center relative border-r-4 border-black">
          {/* 角色圖片 */}
          <div className="flex-1 flex items-center justify-center p-2">
            <img 
              src="/chactor.gif" 
              alt="Liam Character"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* 藍色姓名條 */}
          <div 
            className="px-2 py-1 text-center"
            style={{ backgroundColor: '#003EC3' }}
          >
            <span 
              className="text-white font-bold text-xs"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              Liam Huang
            </span>
          </div>
        </div>

        {/* 右側：文字內容區域 */}
        <div className="flex-1 p-4 flex flex-col justify-center space-y-1">
          {/* 職業標題 */}
          <div className="border-b border-black pb-1">
            <h2 
              className="text-lg font-bold text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              平面設計師
            </h2>
          </div>

          {/* 技能標籤 */}
          <div className="border-b border-black pb-1">
            <p 
              className="text-sm text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              插畫、印刷、設計、品牌
            </p>
          </div>

          {/* 座右銘 */}
          <div className="border-b border-black pb-1">
            <p 
              className="text-xs text-black"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              今天可以休息就不要留給明天
            </p>
          </div>

          {/* 自我介紹 */}
          <div className="pt-1">
            <p 
              className="text-xs text-black leading-tight"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              我是 <span className="font-bold">Liam</span>，喜歡把想法變成會呼吸的設計。
            </p>
          </div>
        </div>
      </div>

      {/* 底部 Slogan 區域 */}
      <div className="bg-black text-center py-2">
        <span 
          className="text-white text-xs font-bold"
          style={{ fontFamily: 'var(--font-zpix), monospace' }}
        >
          #Own the Day #Go Live Today
        </span>
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
