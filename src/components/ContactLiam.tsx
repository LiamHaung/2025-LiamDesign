'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactMethod {
  name: string;
  nameEn: string;
  value: string;
  icon: string;
  link?: string;
}

interface ContactLiamProps {
  onClose?: () => void;
}

const contactMethods: ContactMethod[] = [
  { 
    name: 'Email', 
    nameEn: 'Email', 
    value: 'liam@example.com', 
    icon: '📧',
    link: 'mailto:liam@example.com'
  },
  { 
    name: 'LINE', 
    nameEn: 'LINE', 
    value: '@liamdesign', 
    icon: '💬',
    link: 'https://line.me/ti/p/~liamdesign'
  },
  { 
    name: 'Instagram', 
    nameEn: 'Instagram', 
    value: '@3r.liam_', 
    icon: '📷',
    link: 'https://www.instagram.com/3r.liam_/'
  }
];

export default function ContactLiam({ onClose }: ContactLiamProps) {
  const [isEnglish, setIsEnglish] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Windows 98 風格視窗 */}
      <div className="bg-gray-300 border-2 border-gray-400 shadow-lg">
        {/* 標題列 */}
        <div className="bg-blue-600 text-white px-2 py-1 flex items-center justify-between border-b border-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-600"></div>
            </div>
            <span className="text-sm font-bold">
              {isEnglish ? 'Contact Liam' : '聯繫 Liam'}
            </span>
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
        <div className="bg-[#FFFFF3] p-4">
          {/* 標題和語言切換 */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#353535]">
              {isEnglish ? 'Get in Touch' : '聯絡方式'}
            </h3>
            
            {/* 語言切換按鈕 */}
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEnglish(false)}
                className={`px-2 py-1 text-xs font-semibold border-2 transition-all duration-200 ${
                  !isEnglish 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-[#FFFFF3] text-[#353535] border-gray-400 hover:bg-gray-200'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setIsEnglish(true)}
                className={`px-2 py-1 text-xs font-semibold border-2 transition-all duration-200 ${
                  isEnglish 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-[#FFFFF3] text-[#353535] border-gray-400 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* 聯絡方式列表 */}
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="group border-2 border-gray-400 bg-[#FFFFF3] hover:bg-blue-600 hover:text-[#FFFFF3] transition-all duration-200 rounded"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={method.link}
                  target={method.link?.startsWith('http') ? '_blank' : undefined}
                  rel={method.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-4"
                >
                  <div className="flex items-center space-x-4">
                    {/* 圖標 */}
                    <div className="text-2xl">
                      {method.icon}
                    </div>
                    
                    {/* 聯絡方式資訊 */}
                    <div className="flex-1">
                      <div className="group-hover:text-[#FFFFF3] text-[#353535] font-bold text-lg" style={{ fontWeight: 800 }}>
                        {isEnglish ? method.nameEn : method.name}
                      </div>
                      <div className="group-hover:text-[#FFFFF3] text-[#353535] text-sm mt-1">
                        {method.value}
                      </div>
                    </div>
                    
                    {/* 箭頭圖標 */}
                    <div className="text-lg group-hover:text-[#FFFFF3] text-[#353535]">
                      →
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* 底部說明 */}
          <div className="mt-6 pt-4 border-t-2 border-gray-400">
            <p className="text-sm text-[#353535] text-center">
              {isEnglish 
                ? 'Click on any contact method to get in touch with Liam!'
                : '點擊任一聯絡方式即可與 Liam 取得聯繫！'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
