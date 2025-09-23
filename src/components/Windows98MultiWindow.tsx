'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface WindowData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  rotation: number;
}

interface Windows98MultiWindowProps {
  windows: WindowData[];
  className?: string;
}

export default function Windows98MultiWindow({ windows, className = '' }: Windows98MultiWindowProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* 桌面版：多個視窗並排 */}
      <div className="hidden lg:block lg:overflow-visible">
        <div className="relative" style={{ height: '400px' }}>
          {windows.map((window, index) => (
            <motion.div
              key={window.id}
              className="absolute"
              style={{ 
                transform: `rotate(${window.rotation}deg)`,
                left: `${index * 280}px`,
                top: '50px',
                transformOrigin: 'center center'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
            {/* 視窗標題欄 */}
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between mb-0" style={{ width: '300px' }}>
              <span className="font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                {window.title}.exe
              </span>
            </div>
            
            {/* 視窗內容 */}
            <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg" style={{ width: '300px' }}>
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                  {window.subtitle}
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  {window.description}
                </p>
                {window.imageUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={window.imageUrl} 
                      alt={window.subtitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 手機版：垂直堆疊 */}
      <div className="lg:hidden">
        <div className="relative" style={{ height: '600px' }}>
          {windows.map((window, index) => (
            <motion.div
              key={window.id}
              className="absolute"
              style={{ 
                transform: `rotate(${window.rotation}deg)`,
                left: '50%',
                top: `${index * 120}px`,
                transformOrigin: 'center center',
                marginLeft: '-140px',
                width: '280px'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
            {/* 視窗標題欄 */}
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between mb-0">
              <span className="font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                {window.title}.exe
              </span>
            </div>
            
            {/* 視窗內容 */}
            <div className="bg-gray-300 border-4 border-gray-400 p-6 rounded-b-lg">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
                  {window.subtitle}
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  {window.description}
                </p>
                {window.imageUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={window.imageUrl} 
                      alt={window.subtitle}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
