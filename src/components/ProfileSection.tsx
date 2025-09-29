import React from 'react';

const keywords = ['插畫', '設計', '印刷', '品牌'];
const services = ['案例分析', '服務流程', '價目表'];

export default function ProfileSection() {
  return (
    <aside className="h-screen flex flex-col justify-between w-full max-w-[480px] min-w-[320px] p-8 bg-black rounded-[40px] shadow-lg border-2 border-black">
      {/* 上半部：頭貼與標題/關鍵詞 */}
      <div>
        <div className="flex flex-row w-full gap-4 items-center mb-6">
          {/* 頭貼 50% */}
          <div className="w-1/2 flex justify-center">
            <div className="w-96 h-96 rounded-[96px] bg-[#003EC3] flex items-center justify-center overflow-hidden border-2 border-black">
              <img src="/profilecard.png" alt="頭貼" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* 標題與關鍵詞 50% */}
          <div className="w-1/2 flex flex-col items-start justify-center gap-2">
            <span className="font-extrabold text-2xl text-white mb-2">Liam graphic designer</span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 w-full">
              {keywords.map((k) => (
                <span key={k} className="text-lg font-bold tracking-widest text-white text-left">{k}</span>
              ))}
            </div>
          </div>
        </div>
        {/* 介紹文字 */}
        <div className="text-base text-white font-medium leading-relaxed text-center mb-6">
          這裡是自我介紹文字，請替換為真實內容。這裡是自我介紹文字，請替換為真實內容。這裡是自我介紹文字，請替換為真實內容。
        </div>
      </div>
      {/* 下半部：服務項目區塊 */}
      <div className="rounded-[32px] bg-black p-8 flex flex-col gap-8 items-center mt-8 border-2 border-black">
        {services.map(s => (
          <span key={s} className="font-extrabold text-white text-2xl tracking-widest text-center">{s}</span>
        ))}
      </div>
    </aside>
  );
} 