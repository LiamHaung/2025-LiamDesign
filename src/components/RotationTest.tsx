'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function RotationTest() {
  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-6">旋轉效果測試</h2>
      
      {/* 測試1：單個視窗旋轉 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試1：單個視窗旋轉</h3>
        <div className="flex justify-center">
          <motion.div
            className="relative"
            style={{ transform: 'rotate(20deg)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg mb-0" style={{ width: '300px' }}>
              <span className="font-bold">Test.exe</span>
            </div>
            <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '300px' }}>
              <div className="text-center">
                <h3 className="text-xl font-bold text-black">單個視窗</h3>
                <p className="text-black text-sm">旋轉20度</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 測試2：並排視窗旋轉 - 問題版本 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試2：並排視窗旋轉（問題版本）</h3>
        <div className="flex justify-center gap-8">
          {[20, -30, 30, -20].map((rotation, index) => (
            <motion.div
              key={index}
              className="relative"
              style={{ transform: `rotate(${rotation}deg)` }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg mb-0" style={{ width: '300px' }}>
                <span className="font-bold">Test{index + 1}.exe</span>
              </div>
              <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '300px' }}>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-black">視窗 {index + 1}</h3>
                  <p className="text-black text-sm">旋轉{rotation}度</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 測試3：並排視窗旋轉 - 修正版本 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試3：並排視窗旋轉（修正版本）</h3>
        <div className="flex justify-center gap-8 overflow-visible">
          {[20, -30, 30, -20].map((rotation, index) => (
            <motion.div
              key={index}
              className="relative"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg mb-0" style={{ width: '250px' }}>
                <span className="font-bold">Test{index + 1}.exe</span>
              </div>
              <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '250px' }}>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black">視窗 {index + 1}</h3>
                  <p className="text-black text-sm">旋轉{rotation}度</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 測試4：絕對定位版本 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試4：絕對定位版本</h3>
        <div className="relative h-96">
          {[20, -30, 30, -20].map((rotation, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                left: `${index * 280}px`,
                top: '50px'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg mb-0" style={{ width: '250px' }}>
                <span className="font-bold">Test{index + 1}.exe</span>
              </div>
              <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '250px' }}>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black">視窗 {index + 1}</h3>
                  <p className="text-black text-sm">旋轉{rotation}度</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
