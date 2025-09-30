'use client';
import React from 'react';
import BrandImageCarouselCard from './BrandImageCarouselCard';

interface BrandServiceSectionProps {
  onReadMore?: () => void;
}

export default function BrandServiceSection({ onReadMore }: BrandServiceSectionProps = {}) {
  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#FFFFF3' }}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        {/* 桌面版：35% 65% 布局 */}
        <div className="hidden md:flex gap-8 items-start">
          {/* 左側：文字內容 (35%) */}
          <div className="flex-1" style={{ flex: '0 0 35%' }}>
            <div className="space-y-6">
              {/* 標籤 */}
              <div className="mb-4">
                <div 
                  className="text-sm font-bold text-[#FFFFF3] bg-[#003EC3] px-3 py-2 rounded-lg inline-block"
                  style={{ fontFamily: 'var(--font-zpix), monospace' }}
                >
                  #品牌 #視覺 #陪你一起長大
                </div>
              </div>

              {/* 大標 */}
              <h2 style={{
                fontSize: 'clamp(24px, 4vw, 48px)',
                fontWeight: 900,
                color: '#353535',
                lineHeight: '1.2',
                fontFamily: 'Noto Sans, sans-serif'
              }}>
                Brand that Speaks｜會說話的品牌
              </h2>

              {/* 內文 - 齊頭段落 */}
              <div style={{
                fontSize: 'clamp(14px, 2vw, 18px)',
                lineHeight: '1.8',
                color: '#555',
                fontFamily: 'Noto Sans, sans-serif'
              }}>
                <p className="mb-4">
                  每個品牌都有獨特的故事等待被訴說。我們不只是設計 Logo，更是打造完整的品牌體驗。
                </p>
                <p className="mb-4">
                  從品牌策略到視覺識別，從網站設計到印刷品，我們幫助你建立與目標客群的情感連結。
                </p>
              <p>
                讓你的品牌不只是被看見，更是被記住。
              </p>
            </div>

            {/* 閱讀更多按鈕 */}
            {onReadMore && (
              <div className="mt-6">
                <button
                  onClick={onReadMore}
                  className="px-8 py-4 font-bold text-lg transition-all duration-150"
                  style={{ 
                    fontFamily: 'var(--font-zpix), monospace',
                    background: 'linear-gradient(135deg, #003EC3 0%, #002A8A 100%)',
                    border: '2px solid #808080',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#404040',
                    borderBottomColor: '#404040',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#ffffff',
                    textShadow: '1px 1px 0px #000000',
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                  }}
                >
                  閱讀更多
                </button>
              </div>
            )}
          </div>
          </div>

          {/* 右側：圖片導覽 (65%) */}
          <div className="flex-1" style={{ flex: '0 0 65%' }}>
            <BrandImageCarouselCard 
              autoPlay={true}
              autoPlayInterval={4000}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 手機版：垂直堆疊 */}
        <div className="md:hidden space-y-8">
          {/* 文字內容 */}
          <div className="space-y-6">
            {/* 標籤 */}
            <div className="mb-4">
              <div 
                className="text-sm font-bold text-[#FFFFF3] bg-[#003EC3] px-3 py-2 rounded-lg inline-block"
                style={{ fontFamily: 'var(--font-zpix), monospace' }}
              >
                #品牌 #視覺 #陪你一起長大
              </div>
            </div>

            {/* 大標 */}
            <h2 style={{
              fontSize: 'clamp(20px, 5vw, 32px)',
              fontWeight: 900,
              color: '#353535',
              lineHeight: '1.2',
              fontFamily: 'Noto Sans, sans-serif'
            }}>
              Brand that Speaks｜會說話的品牌
            </h2>

            {/* 內文 - 齊頭段落 */}
            <div style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              lineHeight: '1.8',
              color: '#555',
              fontFamily: 'Noto Sans, sans-serif'
            }}>
              <p className="mb-4">
                每個品牌都有獨特的故事等待被訴說。我們不只是設計 Logo，更是打造完整的品牌體驗。
              </p>
              <p className="mb-4">
                從品牌策略到視覺識別，從網站設計到印刷品，我們幫助你建立與目標客群的情感連結。
              </p>
              <p>
                讓你的品牌不只是被看見，更是被記住。
              </p>
            </div>

            {/* 閱讀更多按鈕 */}
            {onReadMore && (
              <div className="mt-6">
                <button
                  onClick={onReadMore}
                  className="px-8 py-4 font-bold text-lg transition-all duration-150"
                  style={{ 
                    fontFamily: 'var(--font-zpix), monospace',
                    background: 'linear-gradient(135deg, #003EC3 0%, #002A8A 100%)',
                    border: '2px solid #808080',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#404040',
                    borderBottomColor: '#404040',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#ffffff',
                    textShadow: '1px 1px 0px #000000',
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                  }}
                >
                  閱讀更多
                </button>
              </div>
            )}
          </div>

          {/* 圖片導覽 */}
          <div>
            <BrandImageCarouselCard 
              autoPlay={true}
              autoPlayInterval={4000}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
