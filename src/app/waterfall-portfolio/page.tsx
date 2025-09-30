'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import ReadMoreModal from '../../components/ReadMoreModal';

// 作品數據類型
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  tags: string[];
  details: {
    client: string;
    duration: string;
    tools: string[];
    description: string;
    challenges: string[];
    results: string[];
  };
}

// 測試作品數據
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "品牌識別設計",
    category: "Branding",
    image: "/illustration_1.png",
    description: "為新創公司打造完整的品牌識別系統，包含 Logo 設計、色彩系統與應用規範。這是一個充滿挑戰性的專案，需要深入了解客戶的品牌理念與目標客群，從零開始建立一套完整的視覺識別系統。我們從品牌定位開始，透過多次的溝通與討論，確立了品牌的核心理念與價值主張。接著進行 Logo 設計，創造出既具有識別性又符合品牌調性的標誌。同時建立了完整的色彩系統，包含主色調、輔助色調以及各種應用情境下的色彩搭配規範。最後制定了詳細的應用規範，確保品牌在各種媒介上都能保持一致的視覺形象。整個專案歷時三個月，最終獲得了客戶的高度認可，品牌認知度提升了 150%。",
    year: "2024",
    tags: ["品牌設計", "Logo", "視覺識別"],
    details: {
      client: "TechStart 新創公司",
      duration: "3 個月",
      tools: ["Figma", "Illustrator", "Photoshop"],
      description: "這是一個為新創科技公司設計的完整品牌識別系統。我們從品牌定位開始，深入了解公司的核心價值與目標客群，設計出符合科技感與創新精神的視覺識別。",
      challenges: [
        "如何在科技感與親和力之間取得平衡",
        "確保品牌在不同媒介上的一致性",
        "創造具有記憶點的視覺元素"
      ],
      results: [
        "品牌認知度提升 150%",
        "獲得業界設計獎項",
        "客戶滿意度達 95%"
      ]
    }
  },
  {
    id: 2,
    title: "餐廳菜單設計",
    category: "Print Design",
    image: "/illustration_2.png",
    description: "為高級餐廳設計的精美菜單，結合食材攝影與優雅排版。這家米其林星級餐廳希望透過菜單設計來提升用餐體驗，讓每一道菜都能在視覺上吸引顧客。我們特別注重食材的視覺呈現，使用高品質的攝影技術捕捉每道菜的色澤與質感。在排版設計上，我們選擇了優雅的字體搭配，確保文字的可讀性同時保持視覺美感。菜單的結構經過精心規劃，從開胃菜到甜點，每一頁都有其獨特的視覺節奏。我們還特別注重紙質選擇與印刷工藝，選用了高質感的紙張，並採用特殊的印刷技術，讓每一頁都成為藝術品。最終的菜單不僅提升了餐廳的整體形象，也讓顧客的用餐體驗更加豐富。",
    year: "2024",
    tags: ["印刷設計", "菜單", "排版"],
    details: {
      client: "米其林餐廳",
      duration: "2 個月",
      tools: ["InDesign", "Photoshop", "Illustrator"],
      description: "為米其林星級餐廳設計的菜單，注重食材的視覺呈現與用餐體驗的營造。我們特別注重紙質選擇與印刷工藝，讓每一頁都成為藝術品。",
      challenges: [
        "如何在有限空間內呈現豐富的菜色資訊",
        "平衡視覺美感與實用性",
        "確保印刷品質與成本控制"
      ],
      results: [
        "菜單點擊率提升 40%",
        "客戶用餐體驗評分提升",
        "獲得印刷設計獎項"
      ]
    }
  },
  {
    id: 3,
    title: "電商網站設計",
    category: "Web Design",
    image: "/illustration_3.png",
    description: "為時尚品牌設計的電商平台，注重使用者體驗與轉換率優化。這個專案需要平衡時尚品牌的視覺美感與電商平台的實用性，創造出既美觀又高效的購物體驗。我們從使用者研究開始，深入了解目標客群的購物習慣與偏好，發現他們重視視覺呈現與購物流程的便利性。在設計過程中，我們特別注重產品的展示方式，使用高品質的產品攝影與 360 度展示功能，讓顧客能夠清楚看到每個細節。購物車與結帳流程經過精心優化，減少不必要的步驟，提高轉換率。同時，我們也注重響應式設計，確保在各種裝置上都能提供良好的使用體驗。整個網站採用現代化的設計語言，結合時尚品牌的調性，創造出獨特的視覺風格。",
    year: "2024",
    tags: ["網頁設計", "電商", "UX/UI"],
    details: {
      client: "時尚品牌電商",
      duration: "4 個月",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為時尚品牌設計的電商平台，從使用者研究開始，深入了解目標客群的購物習慣與偏好，設計出既美觀又實用的購物體驗。",
      challenges: [
        "優化購物流程與轉換率",
        "確保跨裝置的一致性體驗",
        "平衡視覺設計與功能實用性"
      ],
      results: [
        "轉換率提升 60%",
        "平均停留時間增加 45%",
        "客戶滿意度達 98%"
      ]
    }
  },
  {
    id: 4,
    title: "活動文宣設計",
    category: "Event Design",
    image: "/illustration_4.png",
    description: "為音樂節設計的系列文宣，包含海報、傳單與數位素材。這個年度音樂節是城市最重要的文化盛事之一，需要創造出具有強烈視覺衝擊力的設計來吸引年輕族群參與。我們從主視覺設計開始，選擇了充滿活力的色彩搭配與現代化的字體設計，營造出音樂節的熱鬧氛圍。海報設計特別注重在眾多音樂活動中脫穎而出，使用了大膽的構圖與鮮明的色彩對比。傳單設計則更加注重資訊的清晰傳達，確保活動資訊能夠快速被理解。數位素材包括社群媒體的各種尺寸版本，以及網站橫幅等，確保在不同平台上都能保持一致的視覺風格。整個設計過程歷時一個月，最終的系列文宣不僅提升了活動的知名度，也獲得了設計社群的高度評價。",
    year: "2024",
    tags: ["活動設計", "海報", "文宣"],
    details: {
      client: "音樂節主辦方",
      duration: "1 個月",
      tools: ["Photoshop", "Illustrator", "After Effects"],
      description: "為年度音樂節設計的系列文宣，從主視覺到各種應用素材，創造出具有強烈視覺衝擊力的設計風格，吸引年輕族群參與。",
      challenges: [
        "在眾多音樂節中脫穎而出",
        "創造具有話題性的視覺元素",
        "確保各種尺寸的應用效果"
      ],
      results: [
        "活動參與人數增加 80%",
        "社群媒體分享率提升 120%",
        "獲得設計社群好評"
      ]
    }
  },
  {
    id: 5,
    title: "App 介面設計",
    category: "Mobile Design",
    image: "/illustration_5.png",
    description: "為健身 App 設計的介面，注重使用者體驗與動機激發。這個專案需要創造出既美觀又實用的健身應用程式，幫助使用者建立良好的運動習慣。我們從使用者研究開始，深入了解不同健身族群的需求與痛點，發現他們最需要的是簡單易用的介面與即時的激勵反饋。在設計過程中，我們特別注重色彩心理學的應用，選擇了充滿活力的橙色與綠色作為主色調，營造出積極正面的運動氛圍。介面佈局經過精心規劃，確保重要功能能夠快速被找到，同時保持視覺的簡潔性。我們還加入了個人化的元素，讓使用者能夠自訂介面風格與運動目標。整個設計過程歷時三個月，最終的 App 不僅獲得了使用者的高度評價，也幫助提升了使用者的運動頻率與持續性。",
    year: "2024",
    tags: ["App設計", "健身", "UX/UI"],
    details: {
      client: "健身科技公司",
      duration: "3 個月",
      tools: ["Figma", "Principle", "Sketch"],
      description: "為健身 App 設計的完整介面系統，從使用者旅程分析到互動設計，創造出能夠激發使用者持續運動動機的介面體驗。",
      challenges: [
        "如何激發使用者的運動動機",
        "簡化複雜的健身數據呈現",
        "確保介面的直觀性與易用性"
      ],
      results: [
        "使用者留存率提升 70%",
        "App Store 評分達 4.8 星",
        "獲得 UX 設計獎項"
      ]
    }
  },
  {
    id: 6,
    title: "包裝設計",
    category: "Package Design",
    image: "/illustration_6.png",
    description: "為有機食品品牌設計的包裝，強調環保與自然元素。這個專案需要平衡環保理念與商業需求，創造出既美觀又實用的包裝解決方案。我們選擇了可回收的紙質材料作為主要包裝材質，並在設計上融入自然元素，如葉子、果實等圖案，呼應有機食品的天然特性。色彩選擇上使用了大地色系，營造出自然、健康的視覺感受。包裝結構經過精心設計，不僅要保護產品，還要便於運輸與儲存。我們還特別注重包裝的開封體驗，讓消費者能夠輕鬆打開包裝，同時保持包裝的完整性。整個設計過程充分考慮了環保因素，從材料選擇到印刷工藝，都選擇了對環境影響最小的方案。最終的包裝設計不僅獲得了客戶的認可，也獲得了環保設計獎項的肯定。",
    year: "2024",
    tags: ["包裝設計", "有機食品", "環保"],
    details: {
      client: "有機食品品牌",
      duration: "2 個月",
      tools: ["Illustrator", "Photoshop", "Cinema 4D"],
      description: "為有機食品品牌設計的包裝系統，從品牌理念出發，強調環保、自然與健康的價值，設計出既美觀又實用的包裝解決方案。",
      challenges: [
        "如何在包裝上傳達環保理念",
        "確保包裝的實用性與美觀性",
        "控制包裝成本與環保材料的使用"
      ],
      results: [
        "品牌認知度提升 90%",
        "包裝獲獎肯定",
        "客戶銷售額增長 35%"
      ]
    }
  },
  // 添加更多測試作品
  {
    id: 7,
    title: "UI/UX 設計",
    category: "Web Design",
    image: "/illustration_1.png",
    description: "為金融科技公司設計的用戶介面，注重安全性和易用性。這個專案需要平衡金融服務的複雜性與用戶體驗的簡潔性，創造出既安全又易用的金融服務平台。我們從用戶研究開始，深入了解不同年齡層用戶的金融服務需求與使用習慣，發現他們最關心的是資金安全與操作便利性。在設計過程中，我們特別注重資訊架構的規劃，將複雜的金融資訊以清晰易懂的方式呈現。色彩選擇上使用了穩重的藍色系，營造出專業可信的視覺感受。我們還加入了多層次的安全驗證機制，確保用戶的資金安全。整個設計過程歷時五個月，最終的平台不僅獲得了用戶的高度信任，也幫助提升了交易成功率與用戶滿意度。",
    year: "2024",
    tags: ["UI/UX", "金融科技", "安全性"],
    details: {
      client: "金融科技公司",
      duration: "5 個月",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為金融科技公司設計的完整用戶介面系統，從用戶研究到互動設計，創造出既安全又易用的金融服務體驗。",
      challenges: [
        "平衡安全性與易用性",
        "符合金融法規要求",
        "建立用戶信任感"
      ],
      results: [
        "用戶滿意度達 95%",
        "交易成功率提升 40%",
        "獲得 UX 設計獎項"
      ]
    }
  },
  {
    id: 8,
    title: "海報設計",
    category: "Print Design",
    image: "/illustration_2.png",
    description: "為電影節設計的系列海報，融合電影元素與視覺藝術。這個年度國際電影節需要創造出具有強烈視覺衝擊力的海報設計，在眾多電影節中脫穎而出。我們從電影節的主題出發，選擇了充滿戲劇性的視覺元素，如膠片、光影、電影院等圖案，營造出濃厚的電影氛圍。色彩選擇上使用了深沉的黑色與金色搭配，呼應電影的經典美學。海報的構圖經過精心設計，確保在各種尺寸下都能保持視覺的完整性。我們還特別注重文字的排版，選擇了具有電影感的字體，讓整個海報充滿藝術氣息。整個設計過程歷時三個月，最終的系列海報不僅提升了電影節的知名度，也獲得了國際媒體的關注與設計獎項的肯定。",
    year: "2024",
    tags: ["海報設計", "電影節", "視覺藝術"],
    details: {
      client: "國際電影節",
      duration: "3 個月",
      tools: ["Photoshop", "Illustrator", "After Effects"],
      description: "為國際電影節設計的系列海報，從主視覺到各種尺寸的應用，創造出具有強烈視覺衝擊力的設計風格。",
      challenges: [
        "在眾多電影節中脫穎而出",
        "創造具有國際感的視覺元素",
        "確保各種尺寸的應用效果"
      ],
      results: [
        "電影節參與人數增加 60%",
        "國際媒體報導",
        "獲得平面設計獎項"
      ]
    }
  },
  {
    id: 9,
    title: "品牌手冊設計",
    category: "Branding",
    image: "/illustration_3.png",
    description: "為新創公司設計的品牌手冊，建立完整的視覺識別系統。這個專案需要為一家新創科技公司建立完整的品牌識別系統，包括 Logo 設計、色彩系統、字體選擇以及各種應用規範。我們從品牌定位開始，深入了解公司的核心價值與目標客群，確立了品牌的核心理念與視覺調性。Logo 設計特別注重簡潔性與識別性，選擇了現代化的幾何圖形與字體搭配。色彩系統建立了主色調與輔助色調的完整搭配方案，確保在各種應用情境下都能保持一致的視覺風格。字體選擇上使用了具有科技感的無襯線字體，呼應公司的科技屬性。整個品牌手冊包含了詳細的應用規範，確保品牌在各種媒介上都能保持一致的視覺形象。",
    year: "2024",
    tags: ["品牌手冊", "視覺識別", "新創公司"],
    details: {
      client: "新創科技公司",
      duration: "4 個月",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      description: "為新創科技公司設計的完整品牌手冊，包含品牌定位、視覺元素、應用規範等，建立統一的品牌形象。",
      challenges: [
        "建立符合科技感的品牌形象",
        "確保品牌在不同媒介上的一致性",
        "創造具有記憶點的視覺元素"
      ],
      results: [
        "品牌認知度提升 200%",
        "獲得業界認可",
        "客戶滿意度達 98%"
      ]
    }
  },
  {
    id: 10,
    title: "網站重新設計",
    category: "Web Design",
    image: "/illustration_4.png",
    description: "為傳統企業進行網站現代化改造，提升用戶體驗。這個專案需要為一家傳統製造業公司進行全面的網站現代化改造，平衡傳統企業形象與現代設計趨勢。我們從用戶研究開始，深入了解目標客群的使用習慣與需求，發現他們最需要的是清晰的資訊架構與直觀的導航系統。在設計過程中，我們特別注重響應式設計，確保在各種裝置上都能提供良好的使用體驗。視覺設計上選擇了穩重的色彩搭配，呼應傳統企業的專業形象，同時加入了現代化的設計元素，如卡片式佈局、動態效果等。我們還特別注重內容的組織與呈現，將複雜的產品資訊以清晰易懂的方式展示。整個改造過程歷時六個月，最終的網站不僅提升了用戶體驗，也幫助提升了企業的數位形象與業務轉換率。",
    year: "2024",
    tags: ["網站重新設計", "現代化", "用戶體驗"],
    details: {
      client: "傳統製造業",
      duration: "6 個月",
      tools: ["Figma", "WordPress", "CSS/HTML"],
      description: "為傳統製造業進行網站現代化改造，從用戶研究到視覺設計，創造出符合現代標準的企業網站。",
      challenges: [
        "平衡傳統企業形象與現代設計",
        "確保網站的易用性",
        "整合現有的業務流程"
      ],
      results: [
        "網站流量提升 150%",
        "用戶停留時間增加 80%",
        "客戶諮詢量增長 120%"
      ]
    }
  },
  {
    id: 11,
    title: "產品包裝設計",
    category: "Package Design",
    image: "/illustration_5.png",
    description: "為美妝品牌設計的產品包裝，強調奢華與質感。這個專案需要為高端美妝品牌設計具有奢華感的產品包裝，在競爭激烈的美妝市場中脫穎而出。我們從品牌定位出發，深入了解目標客群的消費心理與審美偏好，發現他們最重視的是產品的視覺吸引力與觸感體驗。在設計過程中，我們特別注重材質的選擇，使用了高質感的紙張與特殊的印刷工藝，如燙金、壓紋等，營造出奢華的視覺感受。色彩選擇上使用了優雅的金色與深色系搭配，呼應美妝品牌的精緻調性。包裝結構經過精心設計，不僅要保護產品，還要提供良好的開封體驗。我們還特別注重包裝的細節處理，如邊角的圓潤處理、內部的緩衝設計等，確保產品在運輸過程中不會受損。整個設計過程歷時三個月，最終的包裝設計不僅提升了產品的銷量，也獲得了包裝設計獎項的肯定。",
    year: "2024",
    tags: ["產品包裝", "美妝品牌", "奢華感"],
    details: {
      client: "美妝品牌",
      duration: "3 個月",
      tools: ["Illustrator", "Photoshop", "Cinema 4D"],
      description: "為美妝品牌設計的產品包裝系統，從包裝結構到視覺設計，創造出具有奢華感和質感的包裝解決方案。",
      challenges: [
        "在包裝上傳達奢華感",
        "確保包裝的實用性",
        "控制包裝成本與質感平衡"
      ],
      results: [
        "產品銷量提升 80%",
        "包裝獲獎肯定",
        "品牌形象提升"
      ]
    }
  },
  {
    id: 12,
    title: "活動視覺設計",
    category: "Event Design",
    image: "/illustration_6.png",
    description: "為音樂會設計的系列視覺素材，包含海報、傳單、舞台背景等。",
    year: "2024",
    tags: ["活動設計", "音樂會", "視覺素材"],
    details: {
      client: "音樂會主辦方",
      duration: "2 個月",
      tools: ["Photoshop", "Illustrator", "After Effects"],
      description: "為音樂會設計的系列視覺素材，從主視覺到各種應用，創造出具有音樂感和藝術性的視覺風格。",
      challenges: [
        "在眾多音樂會中脫穎而出",
        "創造具有音樂感的視覺元素",
        "確保各種尺寸的應用效果"
      ],
      results: [
        "音樂會參與人數增加 70%",
        "社群媒體分享率提升 100%",
        "獲得設計社群好評"
      ]
    }
  },
  // 插畫設計分類 (Print Design + Event Design)
  {
    id: 13,
    title: "書籍封面設計",
    category: "Print Design",
    image: "/illustration_1.png",
    description: "為小說設計的封面插畫，融合故事情節與視覺藝術。",
    year: "2024",
    tags: ["書籍設計", "插畫", "封面"],
    details: {
      client: "出版社",
      duration: "3 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為奇幻小說設計的封面插畫，從故事背景到角色設計，創造出具有魔幻色彩的視覺世界。",
      challenges: [
        "在有限空間內傳達故事精髓",
        "平衡藝術性與商業性",
        "確保印刷品質"
      ],
      results: [
        "書籍銷量提升 60%",
        "獲得封面設計獎項",
        "讀者好評如潮"
      ]
    }
  },
  {
    id: 14,
    title: "展覽海報設計",
    category: "Event Design",
    image: "/illustration_2.png",
    description: "為藝術展覽設計的主視覺海報，強調創意與藝術性。",
    year: "2024",
    tags: ["展覽設計", "海報", "藝術"],
    details: {
      client: "美術館",
      duration: "4 週",
      tools: ["Photoshop", "Illustrator", "InDesign"],
      description: "為當代藝術展覽設計的系列海報，從主視覺到各種宣傳素材，創造出具有現代感的視覺風格。",
      challenges: [
        "在眾多展覽中脫穎而出",
        "平衡藝術性與商業性",
        "確保各種尺寸的應用效果"
      ],
      results: [
        "展覽參觀人數增加 80%",
        "國際媒體報導",
        "獲得平面設計獎項"
      ]
    }
  },
  {
    id: 15,
    title: "雜誌插圖設計",
    category: "Print Design",
    image: "/illustration_3.png",
    description: "為時尚雜誌設計的插圖，融合時尚元素與藝術表現。",
    year: "2024",
    tags: ["雜誌設計", "插圖", "時尚"],
    details: {
      client: "時尚雜誌",
      duration: "2 週",
      tools: ["Photoshop", "Illustrator", "Procreate"],
      description: "為時尚雜誌設計的系列插圖，從服裝設計到人物造型，創造出具有時尚感的視覺風格。",
      challenges: [
        "在有限時間內完成高品質作品",
        "平衡時尚感與藝術性",
        "確保印刷品質"
      ],
      results: [
        "雜誌銷量提升 40%",
        "讀者反饋極佳",
        "獲得插圖設計獎項"
      ]
    }
  },
  // 品牌設計分類 (Branding + Package Design)
  {
    id: 16,
    title: "咖啡廳品牌設計",
    category: "Branding",
    image: "/illustration_4.png",
    description: "為精品咖啡廳設計的完整品牌識別系統。",
    year: "2024",
    tags: ["咖啡廳", "品牌設計", "識別系統"],
    details: {
      client: "精品咖啡廳",
      duration: "6 週",
      tools: ["Illustrator", "Photoshop", "InDesign"],
      description: "為精品咖啡廳設計的完整品牌識別系統，從 Logo 設計到空間應用，創造出具有溫馨感的品牌形象。",
      challenges: [
        "在競爭激烈的咖啡市場中脫穎而出",
        "創造具有記憶點的視覺元素",
        "確保品牌在不同媒介上的一致性"
      ],
      results: [
        "品牌認知度提升 150%",
        "客戶滿意度達 98%",
        "獲得品牌設計獎項"
      ]
    }
  },
  {
    id: 17,
    title: "茶葉包裝設計",
    category: "Package Design",
    image: "/illustration_5.png",
    description: "為有機茶葉品牌設計的包裝，強調自然與質感。",
    year: "2024",
    tags: ["茶葉包裝", "有機品牌", "自然"],
    details: {
      client: "有機茶葉品牌",
      duration: "4 週",
      tools: ["Illustrator", "Photoshop", "Cinema 4D"],
      description: "為有機茶葉品牌設計的包裝系統，從包裝結構到視覺設計，創造出具有自然感和質感的包裝解決方案。",
      challenges: [
        "在包裝上傳達自然理念",
        "確保包裝的實用性與美觀性",
        "控制包裝成本與環保材料的使用"
      ],
      results: [
        "產品銷量提升 90%",
        "包裝獲獎肯定",
        "品牌形象提升"
      ]
    }
  },
  {
    id: 18,
    title: "餐廳品牌識別",
    category: "Branding",
    image: "/illustration_6.png",
    description: "為日式餐廳設計的品牌識別系統，融合傳統與現代元素。",
    year: "2024",
    tags: ["餐廳品牌", "日式設計", "識別系統"],
    details: {
      client: "日式餐廳",
      duration: "5 週",
      tools: ["Illustrator", "Photoshop", "InDesign"],
      description: "為日式餐廳設計的完整品牌識別系統，從 Logo 設計到菜單設計，創造出具有日式美感的品牌形象。",
      challenges: [
        "平衡傳統日式元素與現代設計",
        "創造具有文化內涵的視覺元素",
        "確保品牌在不同媒介上的一致性"
      ],
      results: [
        "品牌認知度提升 120%",
        "客戶滿意度達 96%",
        "獲得品牌設計獎項"
      ]
    }
  },
  // 數位設計分類 (Web Design + Mobile Design)
  {
    id: 19,
    title: "電商 App 設計",
    category: "Mobile Design",
    image: "/illustration_1.png",
    description: "為時尚電商設計的 App 介面，注重購物體驗優化。",
    year: "2024",
    tags: ["電商 App", "時尚", "購物體驗"],
    details: {
      client: "時尚電商",
      duration: "8 週",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為時尚電商設計的完整 App 介面系統，從用戶研究到互動設計，創造出既美觀又實用的購物體驗。",
      challenges: [
        "優化購物流程與轉換率",
        "確保跨裝置的一致性體驗",
        "平衡視覺設計與功能實用性"
      ],
      results: [
        "App 下載量提升 200%",
        "用戶留存率提升 80%",
        "獲得 UX 設計獎項"
      ]
    }
  },
  {
    id: 20,
    title: "企業官網設計",
    category: "Web Design",
    image: "/illustration_2.png",
    description: "為科技公司設計的企業官網，強調專業與創新形象。",
    year: "2024",
    tags: ["企業官網", "科技公司", "專業形象"],
    details: {
      client: "科技公司",
      duration: "10 週",
      tools: ["Figma", "WordPress", "CSS/HTML"],
      description: "為科技公司設計的企業官網，從用戶研究到視覺設計，創造出既專業又現代的企業形象。",
      challenges: [
        "在眾多科技公司中脫穎而出",
        "平衡專業感與創新感",
        "確保網站的易用性"
      ],
      results: [
        "網站流量提升 180%",
        "用戶停留時間增加 120%",
        "客戶諮詢量增長 150%"
      ]
    }
  },
  {
    id: 21,
    title: "教育平台設計",
    category: "Web Design",
    image: "/illustration_3.png",
    description: "為線上教育平台設計的網站，注重學習體驗優化。",
    year: "2024",
    tags: ["教育平台", "線上學習", "用戶體驗"],
    details: {
      client: "教育科技公司",
      duration: "12 週",
      tools: ["Figma", "Sketch", "Principle"],
      description: "為線上教育平台設計的完整網站系統，從用戶研究到互動設計，創造出既直觀又有效的學習體驗。",
      challenges: [
        "優化學習流程與用戶體驗",
        "確保跨裝置的一致性體驗",
        "平衡教育性與娛樂性"
      ],
      results: [
        "用戶註冊量提升 250%",
        "學習完成率提升 90%",
        "獲得 UX 設計獎項"
      ]
    }
  },
  {
    id: 22,
    title: "健身 App 介面",
    category: "Mobile Design",
    image: "/illustration_4.png",
    description: "為健身 App 設計的介面，注重動機激發與使用便利性。",
    year: "2024",
    tags: ["健身 App", "健康", "動機激發"],
    details: {
      client: "健身科技公司",
      duration: "6 週",
      tools: ["Figma", "Principle", "Sketch"],
      description: "為健身 App 設計的完整介面系統，從用戶研究到互動設計，創造出能夠激發使用者持續運動動機的介面體驗。",
      challenges: [
        "如何激發使用者的運動動機",
        "簡化複雜的健身數據呈現",
        "確保介面的直觀性與易用性"
      ],
      results: [
        "使用者留存率提升 70%",
        "App Store 評分達 4.8 星",
        "獲得 UX 設計獎項"
      ]
    }
  }
];

// 作品卡片組件 - Windows 98 風格 + 視差滾動
const PortfolioCard = ({ 
  item, 
  onClick, 
  index, 
  isFirstRow = false 
}: { 
  item: PortfolioItem; 
  onClick: () => void;
  index: number;
  isFirstRow?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className="bg-gray-200 border-2 border-gray-400 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080'
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ 
        opacity: 0,
        y: -30
      }}
      animate={isInView ? { 
        opacity: 1,
        y: 0
      } : { 
        opacity: 0,
        y: -30
      }}
      transition={{ 
        duration: 0.8,
        delay: isFirstRow ? index * 0.08 : 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* 視窗標題列 */}
      <div 
        className="text-white px-2 py-1 flex items-center justify-between text-xs font-bold"
        style={{ 
          background: Math.random() > 0.5 
            ? 'linear-gradient(90deg, #003EC3 0%, #0056CC 100%)' 
            : '#353535',
          borderBottom: Math.random() > 0.5 ? '1px solid #003EC3' : '1px solid #404040'
        }}
      >
        <span className="flex items-center">
          <span className="w-3 h-3 mr-1">📁</span>
          {item.title}
        </span>
        <div className="flex space-x-1">
          {/* 移除關閉按鈕 */}
        </div>
      </div>
      
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div 
          className="absolute top-2 right-2 text-white px-2 py-1 text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, #808080 0%, #c0c0c0 100%)',
            border: '1px solid #808080',
            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
          }}
        >
          {item.year}
        </div>
      </div>
      
      <div className="p-3 bg-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm text-black">{item.title}</h3>
          <span 
            className="text-xs px-2 py-1 font-bold"
            style={{
              background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
              border: '1px solid #808080',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
              color: '#000000'
            }}
          >
            {item.category}
          </span>
        </div>
        <p className="text-black text-xs mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 font-bold"
              style={{
                background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                border: '1px solid #808080',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                color: '#000000'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// 為每個作品準備多張圖片
const getPortfolioImages = (item: PortfolioItem) => {
  const baseImages = [
    { src: item.image, alt: item.title }
  ];
  
  // 根據作品類型添加額外的圖片
  const additionalImages = {
    1: ['/illustration_2.png', '/illustration_3.png', '/illustration_4.png', '/illustration_5.png'],
    2: ['/illustration_1.png', '/illustration_3.png', '/illustration_4.png', '/illustration_6.png'],
    3: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_5.png'],
    4: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_6.png'],
    5: ['/illustration_1.png', '/illustration_2.png', '/illustration_4.png', '/illustration_6.png'],
    6: ['/illustration_1.png', '/illustration_2.png', '/illustration_3.png', '/illustration_5.png']
  };
  
  const extraImages = additionalImages[item.id as keyof typeof additionalImages] || [];
  
  return [
    ...baseImages,
    ...extraImages.map((src, index) => ({
      src,
      alt: `${item.title} - 相關作品 ${index + 1}`
    }))
  ];
};

// 手機版分類卡片組件 - 視差滾動效果
const MobileCategoryCard = ({ 
  category, 
  items, 
  onItemClick,
  index
}: { 
  category: string; 
  items: PortfolioItem[]; 
  onItemClick: (item: PortfolioItem) => void;
  index: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  
  if (items.length === 0) return null;
  
  const currentItem = items[currentIndex];
  
  return (
    <div ref={ref} className="relative w-full h-96 mb-8">
      {/* 卡片主體 */}
      <motion.div 
        className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden"
        style={{
          border: '2px solid #808080',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#404040',
          borderBottomColor: '#404040'
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        initial={{ 
          opacity: 0,
          y: -100
        }}
        animate={isInView ? { 
          opacity: 1,
          y: 0
        } : { 
          opacity: 0,
          y: -100
        }}
        transition={{ 
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* 視窗標題列 */}
        <div 
          className="text-white px-3 py-2 flex items-center justify-between text-sm font-bold"
          style={{ 
            background: Math.random() > 0.5 
              ? 'linear-gradient(90deg, #003EC3 0%, #0056CC 100%)' 
              : '#353535',
            borderBottom: Math.random() > 0.5 ? '1px solid #003EC3' : '1px solid #404040'
          }}
        >
          <span className="flex items-center">
            <span className="w-4 h-4 mr-2">📁</span>
            {category} 作品集
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">
              {currentIndex + 1} / {items.length}
            </span>
            <div className="flex space-x-1">
              <button 
                onClick={prevItem}
                className="w-5 h-5 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center text-xs"
              >
                ‹
              </button>
              <button 
                onClick={nextItem}
                className="w-5 h-5 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center text-xs"
              >
                ›
              </button>
            </div>
          </div>
        </div>
        
        {/* 作品內容 */}
        <div 
          className="p-4 h-full cursor-pointer"
          onClick={() => onItemClick(currentItem)}
        >
          <div className="relative h-48 mb-4 rounded overflow-hidden">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-black">{currentItem.title}</h3>
              <span 
                className="text-xs px-2 py-1 font-bold"
                style={{
                  background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                  border: '1px solid #808080',
                  boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                  color: '#000000'
                }}
              >
                {currentItem.category}
              </span>
            </div>
            
            <p className="text-xs text-black leading-relaxed line-clamp-3">
              {currentItem.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {currentItem.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                    border: '1px solid #808080',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#000000'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function WaterfallPortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 每頁顯示的作品數量（響應式）
  const itemsPerPage = {
    mobile: 8,    // 手機版每頁8個
    tablet: 12,   // 平板版每頁12個
    desktop: 12   // 桌面版每頁12個
  };

  // 檢測是否為手機版
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 定義簡化的分類
  const categories = ['all', '設計類', '品牌類', '插畫類'];
  
  // 分類映射
  const categoryMapping: { [key: string]: string[] } = {
    '設計類': ['Web Design', 'Mobile Design', 'Print Design', 'Package Design'],
    '品牌類': ['Branding'],
    '插畫類': ['Event Design']
  };
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => categoryMapping[filter]?.includes(item.category));

  // 獲取當前頁面的作品
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage.mobile;
    const endIndex = startIndex + itemsPerPage.mobile;
    return filteredItems.slice(0, endIndex);
  };

  // 計算總頁數
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage.mobile);

  // 載入更多作品
  const loadMoreItems = () => {
    if (currentPage < totalPages && !isLoading) {
      setIsLoading(true);
      // 模擬載入延遲
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  // 重置分頁當篩選改變
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)',
        fontFamily: 'MS Sans Serif, sans-serif'
      }}
    >
      {/* 頁面標題 - Windows 98 風格 */}
      <div 
        className="border-b-2"
        style={{
          background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold text-black"
                style={{ textShadow: '1px 1px 0px #ffffff' }}
              >
                🖼️ 作品牆測試
              </h1>
              <p className="text-black mt-2 text-sm font-bold">
                瀑布流作品展示與詳細介紹
              </p>
            </div>
            <Link 
              href="/test-site"
              className="px-4 py-2 text-sm font-bold transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                border: '2px solid #808080',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#404040',
                borderBottomColor: '#404040',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                color: '#000000',
                textShadow: '1px 1px 0px #ffffff'
              }}
            >
              🏠 返回測試網站
            </Link>
          </div>
        </div>
      </div>

      {/* 篩選器 - Windows 98 風格 */}
      <div 
        className="border-b-2"
        style={{
          background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className="px-4 py-2 text-sm font-bold transition-all duration-150"
                style={{
                  background: filter === category 
                    ? 'linear-gradient(135deg, #000080 0%, #0000ff 100%)'
                    : 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                  border: '2px solid #808080',
                  borderTopColor: '#ffffff',
                  borderLeftColor: '#ffffff',
                  borderRightColor: '#404040',
                  borderBottomColor: '#404040',
                  boxShadow: filter === category
                    ? 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
                    : 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                  color: filter === category ? '#ffffff' : '#000000',
                  textShadow: filter === category ? 'none' : '1px 1px 0px #ffffff'
                }}
              >
                {category === 'all' ? '📁 全部' : `📂 ${category}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 根據螢幕尺寸顯示不同布局 */}
      {isMobile ? (
        // 手機版：重疊卡片布局 - 視差滾動效果
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* 插畫分類 */}
          <MobileCategoryCard
            category="插畫設計"
            items={portfolioItems.filter(item => item.category === 'Print Design' || item.category === 'Event Design')}
            onItemClick={handleCardClick}
            index={0}
          />
          
          {/* 品牌分類 */}
          <MobileCategoryCard
            category="品牌設計"
            items={portfolioItems.filter(item => item.category === 'Branding' || item.category === 'Package Design')}
            onItemClick={handleCardClick}
            index={1}
          />
          
          {/* 設計分類 */}
          <MobileCategoryCard
            category="數位設計"
            items={portfolioItems.filter(item => item.category === 'Web Design' || item.category === 'Mobile Design')}
            onItemClick={handleCardClick}
            index={2}
          />
        </div>
      ) : (
        // 桌面版：瀑布流布局
        <>
          {/* 作品統計資訊 */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div 
              className="text-center p-3"
              style={{
                background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                border: '1px solid #808080',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040'
              }}
            >
              <p className="text-sm font-bold text-black">
                顯示 {getCurrentPageItems().length} / {filteredItems.length} 個作品
                {filter !== 'all' && ` (${filter} 分類)`}
              </p>
            </div>
          </div>

          {/* 瀑布流作品牆 - 視差滾動效果 */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {getCurrentPageItems().map((item, index) => {
                // 計算是否為第一排（前4個作品）
                const isFirstRow = index < 4;
                
                return (
                  <div key={item.id} className="break-inside-avoid">
                    <PortfolioCard 
                      item={item} 
                      onClick={() => handleCardClick(item)}
                      index={index}
                      isFirstRow={isFirstRow}
                    />
                  </div>
                );
              })}
            </div>

            {/* 載入更多按鈕 */}
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreItems}
                  disabled={isLoading}
                  className="px-6 py-3 text-sm font-bold transition-all duration-150 disabled:opacity-50"
                  style={{
                    background: isLoading 
                      ? 'linear-gradient(135deg, #a0a0a0 0%, #808080 100%)'
                      : 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                    border: '2px solid #808080',
                    borderTopColor: '#ffffff',
                    borderLeftColor: '#ffffff',
                    borderRightColor: '#404040',
                    borderBottomColor: '#404040',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#000000',
                    textShadow: '1px 1px 0px #ffffff'
                  }}
                  onMouseDown={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
                    }
                  }}
                  onMouseUp={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
                    }
                  }}
                >
                  {isLoading ? '⏳ 載入中...' : '📂 載入更多作品'}
                </button>
              </div>
            )}

            {/* 已載入全部作品提示 */}
            {currentPage >= totalPages && filteredItems.length > 0 && (
              <div className="flex justify-center mt-8">
                <div 
                  className="px-4 py-2 text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                    border: '1px solid #808080',
                    boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                    color: '#000000'
                  }}
                >
                  ✅ 已載入全部 {filteredItems.length} 個作品
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* 作品詳細彈窗 - 使用 ReadMoreModal */}
      {selectedItem && (
        <ReadMoreModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem.title}
          images={getPortfolioImages(selectedItem)}
          initialIndex={0}
          meta={
            <ul className="space-y-1">
              <li><span className="font-semibold">客戶：</span>{selectedItem.details.client}</li>
              <li><span className="font-semibold">時程：</span>{selectedItem.details.duration}</li>
              <li><span className="font-semibold">年份：</span>{selectedItem.year}</li>
              <li><span className="font-semibold">分類：</span>{selectedItem.category}</li>
              <li><span className="font-semibold">工具：</span>{selectedItem.details.tools.join(', ')}</li>
              <li><span className="font-semibold">標籤：</span>{selectedItem.tags.join(', ')}</li>
            </ul>
          }
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: '#003EC3' }}>專案描述</h4>
              <p className="text-sm leading-relaxed">
                {selectedItem.details.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: '#003EC3' }}>專案挑戰</h4>
              <ul className="text-sm space-y-1">
                {selectedItem.details.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: '#003EC3' }}>專案成果</h4>
              <ul className="text-sm space-y-1">
                {selectedItem.details.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ReadMoreModal>
      )}
    </div>
  );
}
