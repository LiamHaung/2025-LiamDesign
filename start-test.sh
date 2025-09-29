#!/bin/bash

# Liam Design Studio - 測試網站啟動腳本
# Test Site Startup Script

echo "🚀 啟動 Liam Design Studio 測試網站..."
echo "Starting Liam Design Studio Test Site..."

# 檢查 Node.js 是否安裝
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝，請先安裝 Node.js"
    echo "❌ Node.js not installed, please install Node.js first"
    exit 1
fi

# 檢查 npm 是否安裝
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安裝，請先安裝 npm"
    echo "❌ npm not installed, please install npm first"
    exit 1
fi

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 請在專案根目錄執行此腳本"
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# 安裝依賴（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安裝依賴套件..."
    echo "📦 Installing dependencies..."
    npm install
fi

# 顯示可用頁面
echo ""
echo "🌐 可用的測試頁面："
echo "🌐 Available test pages:"
echo ""
echo "   🏠 主網站: http://localhost:3000"
echo "   🧪 測試網站: http://localhost:3000/test-site"
echo "   🧩 元件測試: http://localhost:3000/component-test"
echo "   🎴 卡片測試: http://localhost:3000/card-test"
echo "   🌊 視差測試: http://localhost:3000/parallax-test"
echo "   📜 垂直滾動: http://localhost:3000/vertical-demo"
echo "   🚢 波浪船隻: http://localhost:3000/wave-boat-test"
echo ""

# 啟動開發服務器
echo "🚀 啟動開發服務器..."
echo "🚀 Starting development server..."
echo ""

# 使用 Next.js 開發模式啟動
npm run dev
