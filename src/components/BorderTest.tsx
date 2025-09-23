'use client';
import React from 'react';

export default function BorderTest() {
  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-6">邊框測試</h2>
      
      {/* 測試1：基本邊框 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試1：基本邊框</h3>
        <div className="flex">
          <div className="flex-1 bg-red-200 p-4 border-r-4 border-black">
            左側區域
          </div>
          <div className="flex-1 bg-blue-200 p-4">
            右側區域
          </div>
        </div>
      </div>

      {/* 測試2：更粗的邊框 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試2：更粗的邊框</h3>
        <div className="flex">
          <div className="flex-1 bg-red-200 p-4 border-r-8 border-black">
            左側區域
          </div>
          <div className="flex-1 bg-blue-200 p-4">
            右側區域
          </div>
        </div>
      </div>

      {/* 測試3：使用 style 屬性 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試3：使用 style 屬性</h3>
        <div className="flex">
          <div 
            className="flex-1 bg-red-200 p-4"
            style={{ borderRight: '8px solid black' }}
          >
            左側區域
          </div>
          <div className="flex-1 bg-blue-200 p-4">
            右側區域
          </div>
        </div>
      </div>

      {/* 測試4：模擬 ProfileCard 結構 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試4：模擬 ProfileCard 結構</h3>
        <div className="bg-white border-2 border-black rounded-lg w-96 h-64">
          <div className="flex h-full">
            <div className="flex-1 bg-red-200 p-4 border-r-8 border-black">
              <div className="text-center">左側角色區域</div>
            </div>
            <div className="flex-1 bg-blue-200 p-4">
              <div className="text-center">右側文字區域</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
