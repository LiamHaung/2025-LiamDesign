"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestCard from "./TestCard";

export type CardCarouselProps = {
  cards: Array<{
    title: string;
    subtitle?: string;
    imageSrc: string;
    tags?: string[];
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
};

export default function CardCarousel({
  cards,
  autoPlay = true,
  autoPlayInterval = 3000,
  showControls = false,
  showIndicators = true,
  className = ""
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 自動播放邏輯
  useEffect(() => {
    if (isPlaying && cards.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, cards.length, autoPlayInterval]);

  // 手動控制
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (cards.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* 輪播容器 */}
      <div className="overflow-hidden rounded-xl">
        <div className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {cards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <TestCard
                title={card.title}
                subtitle={card.subtitle}
                imageSrc={card.imageSrc}
                tags={card.tags}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 控制按鈕 */}
      {showControls && cards.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label="Previous card"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label="Next card"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 播放/暫停按鈕 */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </>
      )}

      {/* 指示器 */}
      {showIndicators && cards.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-[#003EC3] w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
