'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PricingItem {
  service: string;
  serviceEn: string;
  price: string;
  priceEn?: string;
}

interface PricingTableProps {
  onClose?: () => void;
}

const pricingData: PricingItem[] = [
  { service: '似顏繪製作', serviceEn: 'Custom Portrait Illustration', price: '2000' },
  { service: '菜單設計 印製另計', serviceEn: 'Menu Design / Menu Layout Design', price: '2000/頁' },
  { service: '酷卡設計', serviceEn: 'Promotional Card Design / Postcard Design', price: '3000' },
  { service: '情侶服設計', serviceEn: 'Couple T-shirt Design / Couple Apparel Design', price: '3000-6000' },
  { service: 'DM設計', serviceEn: 'Flyer Design / Leaflet Design', price: '4000' },
  { service: '吉祥物設計', serviceEn: 'Mascot Design', price: '6000-10000' },
  { service: '海報設計', serviceEn: 'Poster Design', price: '8000' },
  { service: '名片設計含印製費', serviceEn: 'Business Card Design & Printing', price: '10000' },
  { service: 'Logo設計', serviceEn: 'Logo Design', price: '12000' },
  { service: '商標設計CIS', serviceEn: 'Corporate Identity Design (CIS) / Brand Identity System Design', price: '45000' },
  { service: '社群代管', serviceEn: 'Social Media Management', price: '加賴私訊報價', priceEn: 'Get your quote via email' },
  { service: '團體服設計含製作', serviceEn: 'Custom Team Uniform Design & Production', price: '加賴私訊報價', priceEn: 'Get your quote via email' },
  { service: '印刷諮詢', serviceEn: 'Print Consultation', price: '免費諮詢', priceEn: 'Free' }
];

export default function PricingTable({ onClose }: PricingTableProps) {
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
            <span className="text-sm font-bold">價目表 - Pricing Table</span>
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
          {/* 價目表 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#353535]">
                {isEnglish ? 'Services & Pricing' : '服務項目與價格'}
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
            
            {/* 備註 */}
            <div className="mb-4 text-sm text-[#353535] font-medium">
              ＄：新台幣
            </div>
            
            {/* 桌面版：橫排表格 */}
            <div className="hidden md:block">
              <div className="border-2 border-gray-400">
                {/* 表頭 */}
                <div className="bg-gray-200 border-b-2 border-gray-400 flex">
                  <div className="flex-1 p-3 font-bold text-[#353535] border-r-2 border-gray-400">
                    {isEnglish ? 'Service' : '服務項目'}
                  </div>
                  <div className="flex-1 p-3 font-bold text-[#353535]">
                    {isEnglish ? 'Price' : '價格'}
                  </div>
                </div>
                
                {/* 表格內容 */}
                <div className="divide-y divide-gray-300">
                  {pricingData.map((item, index) => (
                    <motion.div
                      key={index}
                      className="group flex hover:bg-blue-600 hover:text-[#FFFFF3] transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex-1 p-3 border-r-2 border-gray-300 group-hover:text-[#FFFFF3] text-[#353535]" style={{ fontWeight: 800 }}>
                        {isEnglish ? item.serviceEn : item.service}
                      </div>
                      <div className="flex-1 p-3 font-semibold group-hover:text-[#FFFFF3] text-[#353535]">
                        {isEnglish && item.priceEn ? item.priceEn : item.price}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 手機版：直排卡片 */}
            <div className="md:hidden space-y-3">
              {pricingData.map((item, index) => (
                <motion.div
                  key={index}
                  className="group border-2 border-gray-400 bg-[#FFFFF3] hover:bg-blue-600 hover:text-[#FFFFF3] transition-all duration-200 rounded"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="p-4">
                    <div className="group-hover:text-[#FFFFF3] text-[#353535] mb-2" style={{ fontWeight: 800 }}>
                      {isEnglish ? item.serviceEn : item.service}
                    </div>
                    <div className="text-lg font-bold group-hover:text-[#FFFFF3] text-[#353535]">
                      {isEnglish && item.priceEn ? item.priceEn : item.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 合約說明 */}
          <div className="border-t-2 border-gray-400 pt-4">
            <h4 className="text-lg font-bold mb-3 text-[#353535]">
              {isEnglish ? 'Contract Information' : '合約說明'}
            </h4>
            
            {/* 桌面版：橫排 */}
            <div className="hidden md:flex space-x-8">
              <div className="flex-1">
                <p className="text-sm text-[#353535] leading-relaxed">
                  {isEnglish 
                    ? 'Every project starts with a signed agreement— protecting both sides and keeping the design process smooth. It\'s not a limit, it\'s a promise of peace of mind.'
                    : '每個專案開始前，我們會先簽好合約，保障雙方的心力，也讓設計更順暢。合約不是限制，而是安心的約定。'
                  }
                </p>
              </div>
            </div>

            {/* 手機版：直排 */}
            <div className="md:hidden space-y-4">
              <div>
                <p className="text-sm text-[#353535] leading-relaxed">
                  {isEnglish 
                    ? 'Every project starts with a signed agreement— protecting both sides and keeping the design process smooth. It\'s not a limit, it\'s a promise of peace of mind.'
                    : '每個專案開始前，我們會先簽好合約，保障雙方的心力，也讓設計更順暢。合約不是限制，而是安心的約定。'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
