'use client';
import React from 'react';

export default function SimpleRotationTest() {
  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-6">簡單旋轉測試</h2>
      
      {/* 測試1：直接使用 style 屬性 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試1：直接使用 style 屬性</h3>
        <div className="flex justify-center gap-8">
          <div 
            style={{ 
              transform: 'rotate(20deg)',
              backgroundColor: 'lightblue',
              padding: '20px',
              border: '2px solid black',
              width: '200px',
              height: '100px'
            }}
          >
            旋轉20度
          </div>
          <div 
            style={{ 
              transform: 'rotate(-30deg)',
              backgroundColor: 'lightgreen',
              padding: '20px',
              border: '2px solid black',
              width: '200px',
              height: '100px'
            }}
          >
            旋轉-30度
          </div>
        </div>
      </div>

      {/* 測試2：使用 CSS 類別 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試2：使用 CSS 類別</h3>
        <div className="flex justify-center gap-8">
          <div className="rotate-12 bg-red-200 p-5 border-2 border-black w-48 h-24">
            旋轉12度
          </div>
          <div className="-rotate-12 bg-yellow-200 p-5 border-2 border-black w-48 h-24">
            旋轉-12度
          </div>
        </div>
      </div>

      {/* 測試3：使用內聯樣式 + 絕對定位 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試3：絕對定位 + 內聯樣式</h3>
        <div className="relative h-40 bg-gray-100">
          <div 
            style={{ 
              position: 'absolute',
              left: '50px',
              top: '20px',
              transform: 'rotate(25deg)',
              backgroundColor: 'lightcoral',
              padding: '15px',
              border: '2px solid black',
              width: '150px',
              height: '80px'
            }}
          >
            絕對定位旋轉25度
          </div>
          <div 
            style={{ 
              position: 'absolute',
              left: '250px',
              top: '20px',
              transform: 'rotate(-25deg)',
              backgroundColor: 'lightcyan',
              padding: '15px',
              border: '2px solid black',
              width: '150px',
              height: '80px'
            }}
          >
            絕對定位旋轉-25度
          </div>
        </div>
      </div>

      {/* 測試4：模擬 Windows98MultiWindow 的結構 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">測試4：模擬 Windows98MultiWindow 結構</h3>
        <div className="relative" style={{ height: '200px' }}>
          <div 
            className="absolute"
            style={{ 
              transform: 'rotate(20deg)',
              left: '0px',
              top: '20px',
              transformOrigin: 'center center'
            }}
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg" style={{ width: '200px' }}>
              視窗1.exe
            </div>
            <div className="bg-gray-300 border-4 border-gray-400 p-4 rounded-b-lg" style={{ width: '200px' }}>
              <div className="text-center">
                <h3 className="font-bold text-black">測試視窗1</h3>
                <p className="text-sm">旋轉20度</p>
              </div>
            </div>
          </div>
          
          <div 
            className="absolute"
            style={{ 
              transform: 'rotate(-30deg)',
              left: '250px',
              top: '20px',
              transformOrigin: 'center center'
            }}
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg" style={{ width: '200px' }}>
              視窗2.exe
            </div>
            <div className="bg-gray-300 border-4 border-gray-400 p-4 rounded-b-lg" style={{ width: '200px' }}>
              <div className="text-center">
                <h3 className="font-bold text-black">測試視窗2</h3>
                <p className="text-sm">旋轉-30度</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
