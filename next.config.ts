import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 圖片格式
    formats: ['image/avif', 'image/webp'],
    // 設備尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 遠程圖片模式
    remotePatterns: [],
    // 重要：對於 logo 文件，建議使用普通 <img> 標籤而非 Next.js Image 組件
    // 這樣可以完全避免 Next.js 的圖片優化處理
  },
  // 確保靜態文件服務
  compress: true,
};

export default nextConfig;
