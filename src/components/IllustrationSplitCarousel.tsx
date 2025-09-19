"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type SplitItem = {
  imageSrc: string;
  title: string;
  description: string;
};

const AUTOPLAY_MS = 2000; // 2s per slide
const TICK_MS = 20; // progress update tick

export default function IllustrationSplitCarousel({
  items: propItems,
  className,
  style,
}: {
  items?: SplitItem[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const items: SplitItem[] = useMemo(
    () =>
      propItems ?? [
        {
          imageSrc: "/illustration_1.png",
          title: "角色插畫・風格探索",
          description:
            "以線條與塊面塑造活潑節奏，搭配品牌藍強化識別。每一張都承載著細節與敘事節奏。",
        },
        {
          imageSrc: "/illustration_2.png",
          title: "品牌延伸・應用小物",
          description:
            "把識別延伸到日常小物，建立一致且有趣味的觸點，維持品牌一致性。",
        },
        {
          imageSrc: "/illustration_3.png",
          title: "故事場景・視覺敘事",
          description:
            "以場景化敘事搭配插畫語彙呈現，讓作品更容易與觀者產生情緒連結。",
        },
        {
          imageSrc: "/illustration_4.png",
          title: "動態延伸・數位海報",
          description:
            "將靜態視覺加上微動畫，提升吸睛與互動感，在社群場景中更具穿透力。",
        },
        {
          imageSrc: "/illustration_5.png",
          title: "細節雕琢・筆觸層次",
          description:
            "我們專注於筆觸與質感的層次堆疊，讓插畫既有溫度也有辨識度。",
        },
      ],
    [propItems]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0~1 on current slide
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // progress & autoplay
  useEffect(() => {
    if (isPaused) return; // paused, do not run interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + TICK_MS / AUTOPLAY_MS;
        if (next >= 1) {
          // advance slide
          setCurrentIndex((idx) => (idx + 1) % items.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, items.length]);

  const handleJump = (i: number) => {
    setCurrentIndex(i);
    setProgress(0);
  };

  const onMouseEnter = () => setIsPaused(true);
  const onMouseLeave = () => setIsPaused(false);

  const currentItem = items[currentIndex];

  return (
    <div className={className} style={{ minHeight: '80vh', ...style }}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch h-full">
        {/* Left 65% */}
        <div className="md:basis-[65%] md:flex-1 flex flex-col gap-4">
          {/* 1) Carousel */}
          <div
            className="relative overflow-hidden rounded-xl aspect-[16/10] bg-[#f6f7fb]"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentItem.imageSrc}
                  alt={currentItem.title}
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2) Title + Description (sync to current slide) */}
          <div className="p-2 md:p-0">
            <motion.h2
              key={`t-${currentIndex}`}
              className="text-2xl md:text-4xl font-bold text-[#003EC3] mb-3"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentItem.title}
            </motion.h2>
            <motion.p
              key={`d-${currentIndex}`}
              className="leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              style={{ color: '#003EC3' }}
            >
              {currentItem.description}
            </motion.p>
          </div>

          {/* 3) Segmented progress (click to jump) */}
          <div className="flex items-center gap-2 select-none">
            {items.map((_, i) => {
              const fill = i < currentIndex ? 1 : i === currentIndex ? progress : 0;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => handleJump(i)}
                  className="group relative h-2 md:h-2.5 flex-1 rounded-full bg-black/10 overflow-hidden"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-[#3aaf3a] group-hover:bg-[#FFFFF3] transition-colors"
                    style={{ width: `${Math.min(100, Math.max(0, fill * 100))}%` }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 35% */}
        <div className="md:basis-[35%] md:max-w-[35%]">
          <div className="sticky top-8 p-6 rounded-xl border border-transparent bg-[#003EC3]" style={{ zIndex: 10 }}>
            <h3 className="text-xl md:text-2xl font-bold text-[#FFFFF3] mb-3" style={{ fontFamily: 'var(--font-zpix), monospace' }}>
              插畫文字介紹
            </h3>
            <p className="leading-relaxed mb-5" style={{ color: '#FFFFF3' }}>
              我們透過插畫建立情感連結與敘事節奏，讓作品既有美感也能傳遞故事。想看更多完整案例與製作過程，歡迎延伸閱讀。
            </p>
            <a
              href="#"
              className="inline-block bg-white text-[#003EC3] border border-[#003EC3] px-6 py-3 rounded-md font-bold text-sm hover:bg-[#3aaf3a] hover:text-[#FFFFF3] hover:border-[#3aaf3a] transition-colors"
              style={{ fontFamily: 'var(--font-zpix), monospace' }}
            >
              閱讀更多
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 