# Liam Design Studio - 測試網站

## 概述 Overview

這是 Liam Design Studio 的測試網站，用於測試和展示各種 React 元件、動畫效果和互動功能。

This is the test site for Liam Design Studio, used for testing and showcasing various React components, animations, and interactive features.

## 快速開始 Quick Start

### 方法一：使用啟動腳本 Method 1: Using Startup Script

```bash
# 在專案根目錄執行
# Run from project root directory
./start-test.sh
```

### 方法二：手動啟動 Method 2: Manual Startup

```bash
# 安裝依賴
# Install dependencies
npm install

# 啟動開發服務器
# Start development server
npm run dev
```

## 可用頁面 Available Pages

### 🏠 主網站 Main Site
- **URL**: http://localhost:3000
- **描述**: Liam Design Studio 的主要作品集網站
- **Description**: Main portfolio website for Liam Design Studio

### 🧪 測試網站 Test Site
- **URL**: http://localhost:3000/test-site
- **描述**: 測試網站的主入口，包含所有測試頁面的導航
- **Description**: Main entry point for test site with navigation to all test pages

### 🧩 元件測試 Component Test
- **URL**: http://localhost:3000/component-test
- **描述**: 測試所有 React 元件，包含動畫效果、響應式設計、互動功能等
- **Description**: Test all React components including animations, responsive design, and interactive features

#### 測試元件列表 Test Components List:
- 靜態格子紋路元件 (Static Checkerboard Pattern)
- 動畫格子紋路元件 (Animated Checkerboard Pattern)
- 電子時鐘元件 (Digital Clock)
- Intro 版位測試 (Intro Section Test)
- 旋轉效果測試 (Rotation Effect Test)
- 復古視窗布局 (Retro Window Layout)
- ProfileCard 測試 (Profile Card Test)
- 輪播式個人資料卡片 (Profile Card Carousel)
- IntroCard 元件 (Intro Card Component)
- AboutLiamTag 標籤 (About Liam Tag)
- ImageCarouselCard 輪播 (Image Carousel Card)
- Brand 品牌服務區塊 (Brand Service Section)
- 跑馬燈元件 (Marquee Component)
- 價目表元件 (Pricing Table Component)
- 聯繫 Liam 元件 (Contact Liam Component)
- 介紹視窗元件 (Intro Window Component)
- 個人介紹視窗 (Profile Intro Window)
- 地圖導航元件 (Map Navigation Component)
- 作品介紹視窗 (Read More Modal)

### 🎴 卡片測試 Card Test
- **URL**: http://localhost:3000/card-test
- **描述**: 測試各種卡片樣式和布局，包含輪播功能、響應式設計等
- **Description**: Test various card styles and layouts including carousel functionality and responsive design

#### 測試功能 Test Features:
- 輪播版本 (Carousel Version)
- 網格版本 (Grid Version)
- 替代版本 (Alternative Version)
- 插畫分割輪播 (Illustration Split Carousel)
- 響應式布局測試 (Responsive Layout Test)
- 動畫效果測試 (Animation Effect Test)
- 互動功能測試 (Interactive Function Test)

### 🌊 視差效果測試 Parallax Test
- **URL**: http://localhost:3000/parallax-test
- **描述**: 測試視差滾動效果和動畫
- **Description**: Test parallax scrolling effects and animations

### 📜 垂直滾動測試 Vertical Scroll Demo
- **URL**: http://localhost:3000/vertical-demo
- **描述**: 測試垂直滾動布局和分段式內容展示
- **Description**: Test vertical scroll layout and segmented content display

### 🚢 波浪船隻測試 Wave Boat Test
- **URL**: http://localhost:3000/wave-boat-test
- **描述**: 測試波浪動畫和船隻動畫效果
- **Description**: Test wave animations and boat animation effects

## 技術規格 Technical Specifications

### 技術棧 Tech Stack
- **框架**: Next.js 15.3.3
- **UI 庫**: React 19.0.0
- **動畫**: Framer Motion 12.23.0
- **樣式**: Tailwind CSS 4
- **字體**: Zpix, Press Start 2P, Noto Sans TC
- **語言**: TypeScript 5

### 開發工具 Development Tools
- **包管理器**: npm
- **代碼檢查**: ESLint
- **開發服務器**: Next.js Dev Server
- **熱重載**: 支援 Hot Reload

## 功能特色 Features

### 🎨 設計系統 Design System
- Windows 98 復古風格 (Windows 98 Retro Style)
- 響應式設計 (Responsive Design)
- 品牌色彩系統 (Brand Color System)
- 像素風格字體 (Pixel Style Fonts)

### ✨ 動畫效果 Animation Effects
- Framer Motion 動畫 (Framer Motion Animations)
- 視差滾動 (Parallax Scrolling)
- 輪播動畫 (Carousel Animations)
- 懸停效果 (Hover Effects)
- 載入動畫 (Loading Animations)

### 🎮 互動功能 Interactive Features
- 拖拽視窗 (Draggable Windows)
- 模態視窗 (Modal Windows)
- 輪播控制 (Carousel Controls)
- 表單互動 (Form Interactions)
- 導航系統 (Navigation System)

### 📱 響應式設計 Responsive Design
- 桌面版 (Desktop): 1024px+
- 平板版 (Tablet): 768px - 1023px
- 手機版 (Mobile): 320px - 767px
- 自適應字體 (Responsive Typography)
- 彈性布局 (Flexible Layouts)

## 開發指南 Development Guide

### 添加新測試頁面 Adding New Test Pages

1. 在 `src/app/` 目錄下創建新的頁面文件
2. 在 `test-site/page.tsx` 中添加頁面資訊
3. 更新導航和統計數據

### 添加新元件 Adding New Components

1. 在 `src/components/` 目錄下創建元件文件
2. 在 `component-test/page.tsx` 中添加測試
3. 更新元件列表和分類

### 自訂樣式 Customizing Styles

- 使用 Tailwind CSS 類別
- 自訂 CSS 變數在 `globals.css`
- 響應式斷點：`sm:`, `md:`, `lg:`, `xl:`

## 故障排除 Troubleshooting

### 常見問題 Common Issues

1. **端口被佔用 Port Already in Use**
   ```bash
   # 終止佔用端口的進程
   # Kill process using the port
   lsof -ti:3000 | xargs kill -9
   ```

2. **依賴安裝失敗 Dependency Installation Failed**
   ```bash
   # 清除快取並重新安裝
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **熱重載不工作 Hot Reload Not Working**
   ```bash
   # 重啟開發服務器
   # Restart development server
   Ctrl+C
   npm run dev
   ```

## 貢獻指南 Contributing

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權 License

© 2025 Liam Design Studio. All rights reserved.

## 聯絡 Contact

- **Email**: hello@liamdesign.com
- **Website**: https://liamdesign.com
- **GitHub**: https://github.com/liamdesign

---

**享受測試！Happy Testing! 🚀**
