'use client';
import React, { useEffect, useRef } from 'react';

interface ScrollColorStagesProps {
  colors?: string[]; // stage colors from top to bottom
  threshold?: number; // intersection threshold
  sectionHeight?: string; // e.g. '100vh'
  transitionMs?: number; // body bg transition ms
  labels?: string[]; // optional big headings per stage
}

const ScrollColorStages: React.FC<ScrollColorStagesProps> = ({
  colors = ['#0a0a0a', '#003EC3', '#59abc3', '#FFFFF3'],
  threshold = 0.5,
  sectionHeight = '100vh',
  transitionMs = 600,
  labels
}) => {
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // enable smooth background-color transition on body
    const prevTransition = document.body.style.transition;
    if (!prevTransition) {
      document.body.style.transition = `background-color ${transitionMs}ms ease`;
    }

    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, index) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
              document.body.style.backgroundColor = colors[index] || colors[0];
            }
          });
        },
        { threshold }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => {
      observers.forEach((io) => io.disconnect());
      // do not reset body bg to preserve user's last stage
    };
  }, [colors, threshold, transitionMs]);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {colors.map((color, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          style={{
            height: sectionHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // stage itself可加輔助背景塊以對比，但真正有效果的是 body 背景
            background: 'transparent',
          }}
        >
          <div style={{
            color: '#000',
            background: 'rgba(255,255,255,0.7)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '14px'
          }}>
            {labels && labels[i] ? (
              <span style={{
                fontSize: 'clamp(28px, 10vw, 96px)',
                fontWeight: 900,
                letterSpacing: '0.02em',
                color: '#000',
                background: 'transparent'
              }}>{labels[i]}</span>
            ) : (
              <>Stage {i + 1} · {color}</>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollColorStages; 