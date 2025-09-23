#!/bin/bash
# 開發伺服器啟動腳本

# 切換到專案目錄
cd /Users/huanghuaixian/Desktop/liam-portfolio

# 檢查是否在正確目錄
if [ ! -f "package.json" ]; then
    echo "錯誤：找不到 package.json，請確認目錄正確"
    exit 1
fi

# 使用絕對路徑啟動開發伺服器
echo "正在啟動開發伺服器..."
/usr/local/bin/npm run dev -- --port 3010
