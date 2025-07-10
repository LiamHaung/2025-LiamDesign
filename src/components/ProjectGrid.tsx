import React from 'react';

const illustrations = [
  '/illustration_1.png',
  '/illustration_2.png',
  '/illustration_3.png',
  '/illustration_4.png',
  '/illustration_5.png',
  '/illustration_6.png',
];

const sizeMap = {
  large: { width: 380, height: 260 },
  medium: { width: 320, height: 220 },
  small: { width: 260, height: 180 },
};

const projects = [
  { id: 1, title: '插畫作品', tag: '插畫', color: 'bg-yellow-400' },
  { id: 2, title: '設計專案', tag: '設計', color: 'bg-cyan-400' },
  { id: 3, title: '品牌案例', tag: '品牌', color: 'bg-pink-300' },
  { id: 4, title: '剪輯作品', tag: '剪輯', color: 'bg-green-400' },
  { id: 5, title: '印刷品', tag: '印刷', color: 'bg-orange-300' },
  { id: 6, title: '包裝設計', tag: '設計', color: 'bg-cyan-400' },
  { id: 7, title: '角色設計', tag: '插畫', color: 'bg-yellow-400' },
  { id: 8, title: 'LOGO設計', tag: '品牌', color: 'bg-pink-300' },
  { id: 9, title: '動畫剪輯', tag: '剪輯', color: 'bg-green-400' },
];

function getRandomIllustration(idx: number) {
  return illustrations[idx % illustrations.length];
}

const sizeOrder = ['large', 'medium', 'small'];

export default function ProjectGrid() {
  return (
    <div className="h-screen p-8">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="flex flex-wrap gap-6 w-full">
          {projects.map((proj, i) => {
            const size = sizeOrder[i % sizeOrder.length] as 'large' | 'medium' | 'small';
            const { width, height } = sizeMap[size];
            return (
              <div
                key={proj.id}
                className="rounded-[32px] border-2 border-black flex flex-col justify-end items-start relative overflow-hidden group transition-transform duration-300 hover:scale-105"
                style={{ width, height }}
              >
                {/* 背景圖 */}
                <img
                  src={getRandomIllustration(i)}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* 標題（右上角） */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="font-extrabold text-lg text-gray-900 drop-shadow-lg bg-white/80 px-3 py-1 rounded-md">
                    {proj.title}
                  </span>
                </div>
                {/* 標籤 */}
                <div className={`absolute bottom-6 left-6 px-8 py-2 rounded-full font-bold text-lg text-black ${proj.color} shadow-md transition-all duration-300 group-hover:scale-110 z-10`}>{proj.tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 