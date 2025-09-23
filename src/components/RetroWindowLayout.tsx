'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function RetroWindowLayout() {
  return (
    <div className="w-full p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-zpix), monospace', color: '#003EC3' }}>
        復古視窗風格示意圖
      </h2>

      {/* 主要內容區域 */}
      <div className="max-w-6xl mx-auto">
        
        {/* 標題視窗 */}
        <motion.div
          className="relative mb-8"
          style={{ transform: 'rotate(-2deg)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '500px' }}>
            <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              Welcome.exe
            </span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-300 border-4 border-gray-400 p-8 rounded-b-lg" style={{ width: '500px' }}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                復古視窗設計系統
              </h3>
              <p className="text-black text-lg">
                將現代設計與復古美學完美結合
              </p>
            </div>
          </div>
        </motion.div>

        {/* 圖片展示視窗 */}
        <motion.div
          className="relative mb-8"
          style={{ transform: 'rotate(3deg)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '600px' }}>
            <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              Image Viewer.exe
            </span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '600px' }}>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                主要視覺元素
              </h3>
              <div className="bg-white border-2 border-gray-400 p-4 rounded">
                <img 
                  src="/hero-02.png" 
                  alt="Hero Image"
                  className="w-full h-64 object-cover rounded"
                />
                <p className="text-black text-sm mt-2">hero-02.png - 主要視覺元素</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 功能按鈕視窗 */}
        <motion.div
          className="relative mb-8"
          style={{ transform: 'rotate(-1deg)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '450px' }}>
            <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              Control Panel.exe
            </span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '450px' }}>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                控制面板
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold px-4 py-2 rounded text-sm">
                  開始
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold px-4 py-2 rounded text-sm">
                  設定
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold px-4 py-2 rounded text-sm">
                  說明
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold px-4 py-2 rounded text-sm">
                  關於
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 資訊視窗 */}
        <motion.div
          className="relative mb-8"
          style={{ transform: 'rotate(2deg)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '550px' }}>
            <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              Information.exe
            </span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '550px' }}>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                設計特色
              </h3>
              <div className="text-left space-y-2">
                <p className="text-black text-sm">• Windows 98 復古風格</p>
                <p className="text-black text-sm">• 歪斜視窗排列</p>
                <p className="text-black text-sm">• 像素化字體</p>
                <p className="text-black text-sm">• 經典配色方案</p>
                <p className="text-black text-sm">• 立體邊框效果</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 底部裝飾 */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gray-300 border-4 border-gray-400 p-4 rounded-lg">
            <p className="text-black font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              復古視窗設計系統 - 完美融合現代與經典
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
