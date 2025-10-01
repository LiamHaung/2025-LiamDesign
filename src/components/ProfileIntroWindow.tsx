'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProfileIntroWindowProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  embedded?: boolean;
}

export default function ProfileIntroWindow({ 
  isOpen, 
  onClose, 
  className = '',
  embedded = false
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
  const fixedImage = "/profilecard.png";
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

  // 內嵌模式：直接返回內容，不使用 modal
  if (embedded) {
    return (
      <div className={`win98-window relative ${className}`} style={{
        width: '100%',
        maxWidth: '900px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        overflow: 'hidden'
      }}>
        {/* Windows 98 標題列（固定品牌藍色） */}
        <div className="win98-titlebar" style={{
          background: `linear-gradient(90deg, ${brandColor} 0%, ${brandColor}dd 100%)`,
          color: 'white',
          padding: '20px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 'bold',
          borderBottom: '1px solid #808080'
        }}>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white bg-opacity-20 rounded-sm flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <span>Profile Intro - Liam Huang</span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={onClose}
              className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-red-500 hover:border-red-600 transition-colors duration-200"
              title="關閉視窗"
            >
              <span className="text-xs">×</span>
            </button>
          </div>
        </div>

        {/* 內容區域 */}
        <div style={{ 
          backgroundColor: '#003EC3', 
          padding: '20px',
          minHeight: '400px',
          color: '#FFFFF3'
        }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                <p style={{ color: '#FFFFF3', fontSize: '14px' }}>載入中...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* 上方：固定頭像 */}
              <div className="flex justify-center">
                <div 
                  className="w-48 h-48 md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
                  style={{ 
                    border: '4px solid #FFFFFF',
                    backgroundColor: '#003EC3',
                    clipPath: 'circle(50% at 50% 50%)'
                  }}
                >
                  <Image
                    src={fixedImage}
                    alt="Liam 個人頭像"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </div>

              {/* 下方：輪播內容 */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProfile}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFFFF3' }}>
                        {currentData.name}
                      </h2>
                      <div className="w-full h-1 mb-3" style={{ backgroundColor: '#FFFFF3' }}></div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: '#FFFFF3' }}>
                        {currentData.title}
                      </h3>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: '#FFFFF3' }}>技能專長</h4>
                      <p className="text-sm" style={{ color: '#FFFFF3' }}>{currentData.skills}</p>
                    </div>
                    <div className="w-full h-0.5 bg-white mb-3"></div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: '#FFFFF3' }}>座右銘</h4>
                      <p className="text-sm italic" style={{ color: '#FFFFF3' }}>
                        &ldquo;{currentData.motto}&rdquo;
                      </p>
                    </div>
                    <div className="w-full h-0.5 bg-white mb-3"></div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: '#FFFFF3' }}>個人簡介</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#FFFFF3' }}>
                        {currentData.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 底部導航指示器 */}
                <div className="flex justify-center space-x-2 mt-6">
                  {profileData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProfile(index)}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 ${
                        index === currentProfile
                          ? 'text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      style={{
                        backgroundColor: index === currentProfile ? '#FFFFF3' : '#e5e5e5',
                        color: index === currentProfile ? '#003EC3' : '#353535'
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Modal 模式：原有的彈出式視窗
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
              padding: '20px 6px',
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
              background: '#003EC3',
              color: '#FFFFF3',
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
                    <p style={{ fontFamily: 'var(--font-press-start-2p), monospace', color: '#FFFFF3' }}>Loading Profile...</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* 左側：固定頭像區域（僅桌面版顯示） */}
                  <div className="hidden lg:flex flex-shrink-0 justify-center lg:justify-start">
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 shadow-lg"
                           style={{ 
                             borderColor: '#FFFFFF',
                             backgroundColor: brandColor,
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
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#FFFFF3' }}>
                          {currentData.name}
                        </h2>
                        <div className="w-full h-1 mb-3" style={{ backgroundColor: '#FFFFF3' }}></div>
                        <h3 className="text-lg lg:text-xl font-semibold mb-4" style={{ color: '#FFFFF3' }}>
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
                          <p className="text-sm mb-2" style={{ color: '#FFFFF3' }}>Skills / 技能</p>
                          <p className="text-base lg:text-lg" style={{ color: '#FFFFF3' }}>{currentData.skills}</p>
                        </div>
                        <div className="w-full h-0.5 bg-white mb-3"></div>
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
                          <p className="text-sm mb-2" style={{ color: '#FFFFF3' }}>Motto / 座右銘</p>
                          <p className="text-base lg:text-lg font-semibold" style={{ color: '#FFFFF3' }}>
                            &ldquo;{currentData.motto}&rdquo;
                          </p>
                        </div>
                        <div className="w-full h-0.5 bg-white mb-3"></div>
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
                          <p className="text-sm mb-2" style={{ color: '#FFFFF3' }}>About / 關於我</p>
                          <p className="text-sm lg:text-base leading-relaxed" style={{ color: '#FFFFF3' }}>
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
                  className="flex justify-center space-x-3 mt-6 pt-4 border-t border-white"
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
                        backgroundColor: index === currentProfile ? '#FFFFF3' : '#e5e5e5',
                        color: index === currentProfile ? '#003EC3' : '#353535'
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
