'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProfileIntroWindowProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ProfileIntroWindow({ 
  isOpen, 
  onClose, 
  className = ''
}: ProfileIntroWindowProps) {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 個人資料輪播內容（移除圖片和顏色，只保留文字內容）
  const profileData = [
    {
      id: 1,
      name: "Liam Huang",
      title: "平面設計師",
      skills: "插畫、印刷、設計、品牌",
      motto: "今天可以休息就不要留給明天",
      description: "我是 Liam，喜歡把想法變成會呼吸的設計。放輕鬆、慢慢逛，或許下一個專案就從這裡開始。"
    },
    {
      id: 2,
      name: "Liam Huang", 
      title: "插畫創作者",
      skills: "手繪、數位、故事、在地",
      motto: "每一筆一劃都承載著記憶與情感",
      description: "用線條與色彩訴說故事，讓插畫成為連接人與人之間的橋樑。"
    },
    {
      id: 3,
      name: "Liam Huang",
      title: "品牌夥伴", 
      skills: "策略、創意、陪伴、成長",
      motto: "每個品牌都有獨特的故事",
      description: "從概念到執行，全程參與品牌旅程，用創意讓每個故事都能發光發熱。"
    },
    {
      id: 4,
      name: "Liam Huang",
      title: "在地創作者",
      skills: "文化、傳承、連結、溫度", 
      motto: "越在地，越國際",
      description: "深耕宜蘭在地文化，用設計連結傳統與現代，創造有溫度的作品。"
    }
  ];

  // 固定頭像
  const fixedImage = "/hero＿滾動視差-02.png";
  // 固定品牌藍色
  const brandColor = "#003EC3";

  // 自動輪播（改為每 5 秒）
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profileData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, profileData.length]);

  // 載入動畫
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentData = profileData[currentProfile];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={onClose}
          />
          
          {/* Windows 98 視窗 */}
          <motion.div
            className={`win98-window relative ${className}`}
            style={{
              width: '900px',
              maxWidth: '95vw',
              maxHeight: '90vh',
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
              overflow: 'hidden',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Windows 98 標題列（固定品牌藍色） */}
            <div className="win98-titlebar" style={{
              background: `linear-gradient(90deg, ${brandColor} 0%, ${brandColor}dd 100%)`,
              color: 'white',
              padding: '4px 6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 'clamp(14px, 4vw, 20px)',
              fontWeight: 'bold'
            }}>
              <div className="flex items-center space-x-2">
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  border: '1px inset #c0c0c0'
                }}></div>
                <span>Profile - {currentData.title}</span>
              </div>
              
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-red-500 hover:border-red-600 transition-colors duration-200"
                title="關閉視窗"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
            
            {/* Windows 98 內容區域 */}
            <div style={{
              background: '#FFFFF3',
              color: '#353535',
              padding: 'clamp(16px, 4vw, 24px)',
              fontSize: 'clamp(12px, 2.5vw, 16px)',
              lineHeight: '1.4',
              border: '2px inset #c0c0c0',
              margin: '2px',
              overflow: 'auto',
              maxHeight: 'calc(90vh - 120px)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* 載入畫面 */}
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-[#353535] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p style={{ fontFamily: 'var(--font-press-start-2p), monospace', color: '#353535' }}>Loading Profile...</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* 左側：固定頭像區域（無動畫） */}
                  <div className="flex-shrink-0 flex justify-center lg:justify-start">
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 shadow-lg"
                           style={{ 
                             borderColor: brandColor,
                             clipPath: 'circle(50% at 50% 50%)'
                           }}>
                        <Image
                          src={fixedImage}
                          alt={currentData.name}
                          fill
                          className="object-cover"
                          style={{ 
                            objectPosition: 'center',
                            objectFit: 'cover'
                          }}
                          priority={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 右側：文字內容 */}
                  <div className="flex-1 space-y-4">
                    {/* 姓名和標題 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`name-${currentProfile}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: brandColor }}>
                          {currentData.name}
                        </h2>
                        <div className="w-full h-1 mb-3" style={{ backgroundColor: brandColor }}></div>
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">
                          {currentData.title}
                        </h3>
                      </motion.div>
                    </AnimatePresence>

                    {/* 技能標籤 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`skills-${currentProfile}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="mb-3">
                          <p className="text-sm text-gray-500 mb-2">Skills / 技能</p>
                          <p className="text-base lg:text-lg">{currentData.skills}</p>
                        </div>
                        <div className="w-full h-0.5 bg-gray-400 mb-3"></div>
                      </motion.div>
                    </AnimatePresence>

                    {/* 座右銘 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`motto-${currentProfile}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="mb-3">
                          <p className="text-sm text-gray-500 mb-2">Motto / 座右銘</p>
                          <p className="text-base lg:text-lg font-semibold" style={{ color: brandColor }}>
                            &ldquo;{currentData.motto}&rdquo;
                          </p>
                        </div>
                        <div className="w-full h-0.5 bg-gray-400 mb-3"></div>
                      </motion.div>
                    </AnimatePresence>

                    {/* 自我介紹 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`description-${currentProfile}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <div>
                          <p className="text-sm text-gray-500 mb-2">About / 關於我</p>
                          <p className="text-sm lg:text-base leading-relaxed">
                            {currentData.description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* 底部導航指示器（數字版本） */}
              {!isLoading && (
                <motion.div
                  className="flex justify-center space-x-3 mt-6 pt-4 border-t border-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {profileData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProfile(index)}
                      className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center font-bold text-sm ${
                        index === currentProfile 
                          ? 'scale-110' 
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: index === currentProfile ? brandColor : '#e5e5e5',
                        color: index === currentProfile ? '#FFFFF3' : '#353535'
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </motion.div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
