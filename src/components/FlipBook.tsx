"use client";
import React from "react";
import HTMLFlipBook from "react-pageflip";

interface FlipBookImage {
  src: string;
  width: number;
  height: number;
}

interface FlipBookProps {
  images: FlipBookImage[];
}

const MAX_WIDTH = 1134;
const MAX_HEIGHT = 1134;

const FlipBook: React.FC<FlipBookProps> = ({ images }) => {
  return (
    <div className="mx-auto bg-transparent overflow-hidden" style={{ width: MAX_WIDTH, height: MAX_HEIGHT }}>
      <HTMLFlipBook
        width={MAX_WIDTH}
        height={MAX_HEIGHT}
        minWidth={320}
        maxWidth={1800}
        minHeight={320}
        maxHeight={2400}
        size="fixed"
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        style={{ background: 'transparent', boxShadow: 'none', width: MAX_WIDTH, height: MAX_HEIGHT, overflow: 'hidden' }}
        startPage={0}
        drawShadow={true}
        flippingTime={600}
        useMouseEvents={true}
        clickEventForward={true}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        className="overflow-hidden"
      >
        {images.map((img, idx) => (
          <div key={idx} style={{ width: MAX_WIDTH, height: MAX_HEIGHT, overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={img.src} alt={`page-${idx + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', margin: 'auto' }} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBook; 