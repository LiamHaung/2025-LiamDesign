"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import html2canvas from "html2canvas";

// 职业结果数据 - 更新后的结构
const careerResults: Record<string, {
  title: string;
  titleEn: string;
  emoji: string;
  bgColor: string;
  imageBgColor: string;
  intro: {
    title: string;
    subtitle: string;
    description: string;
  };
  focusPoints: Array<{
    title: string;
    description: string;
  }>;
  assistance: {
    description: string;
    services: string; // 用 | 分隔的服务标签
  };
  ctaButtons: Array<{
    icon: string;
    text: string;
    action: string;
  }>;
  color: string;
  bgGradient: string;
}> = {
  story: {
    title: "故事魔法師",
    titleEn: "Story Wizard",
    emoji: "🌟",
    bgColor: "#ffa008", // 更新背景色
    imageBgColor: "#dd902e", // 圖片背景色
    intro: {
      title: "你的職業是：故事魔法師 Story Wizard！",
      subtitle: "你擅長說故事，也重視品牌背後的理念與情感。",
      description: "你的品牌有靈魂、有內容，只需要更好的方式把故事「呈現給世界」。"
    },
    focusPoints: [
      {
        title: "故事性",
        description: "設計是否能把故事說清楚、講得動人。"
      },
      {
        title: "情感連結",
        description: "品牌要讓人感受到「溫度」與「意義」。"
      },
      {
        title: "世界觀呈現",
        description: "希望品牌有自己的角色、場景與敘事方式。"
      }
    ],
    assistance: {
      description: "透過插畫、敘事主視覺與品牌架構，幫你把品牌故事整理成一個完整的世界觀，讓每一個設計都能說話。",
      services: "品牌故事整理｜插畫主視覺｜敘事延伸設計"
    },
    ctaButtons: [
      { icon: "🔆", text: "分享圖片", action: "share" },
      { icon: "🔗", text: "查看作品", action: "portfolio" },
      { icon: "💬", text: "聯絡設計師", action: "contact" }
    ],
    color: "#8B6F47",
    bgGradient: "linear-gradient(135deg, #f7ebc3 0%, #e8d5a3 50%, #d4c19a 100%)"
  },
  visual: {
    title: "視覺工匠",
    titleEn: "Visual Crafter",
    emoji: "🌟",
    bgColor: "#38b1e3", // 更新背景色
    imageBgColor: "#2597c0", // 圖片背景色
    intro: {
      title: "你的職業是：視覺工匠 Visual Crafter！",
      subtitle: "你對美感敏銳，希望品牌呈現乾淨、有質感、專業一致。",
      description: "你相信「好的視覺，是品牌最直接的力量」。"
    },
    focusPoints: [
      {
        title: "視覺一致性",
        description: "整體視覺要保持專業且一致。"
      },
      {
        title: "細節與專業感",
        description: "每個細節都要到位，展現專業質感。"
      },
      {
        title: "整體質感",
        description: "品牌在任何場景都保持專業。"
      }
    ],
    assistance: {
      description: "建立一套完整又精緻的視覺識別系統：Logo、字體、色票、排版規範，讓你的品牌在任何場景都保持專業。",
      services: "品牌識別設計｜視覺系統建立｜質感提升"
    },
    ctaButtons: [
      { icon: "🔆", text: "分享圖片", action: "share" },
      { icon: "🔗", text: "查看作品", action: "portfolio" },
      { icon: "💬", text: "聯絡設計師", action: "contact" }
    ],
    color: "#4A6FA5",
    bgGradient: "linear-gradient(135deg, #e8f0f8 0%, #d4e3f0 50%, #c4d4e8 100%)"
  },
  navigator: {
    title: "冒險舵手",
    titleEn: "Navigator",
    emoji: "🌟",
    bgColor: "#c08bee", // 更新背景色
    imageBgColor: "#8c46d4", // 圖片背景色
    intro: {
      title: "你的職業是：冒險舵手 Navigator！",
      subtitle: "你知道品牌想往哪裡走，也有想法只是缺一個能陪你一起規劃的夥伴。",
      description: "你需要的是清晰的方向與能真正落地的設計。"
    },
    focusPoints: [
      {
        title: "方向與目的性",
        description: "設計一定要有用、有意義。"
      },
      {
        title: "整體規劃",
        description: "視覺、內容、應用要能一致前進。"
      },
      {
        title: "清楚溝通",
        description: "希望品牌讓人一眼就懂。"
      }
    ],
    assistance: {
      description: "協助你整理品牌方向、建立優先順序，把品牌從想法導向「可執行的設計」。",
      services: "品牌定位規劃｜設計陪跑｜跨平台整合視覺"
    },
    ctaButtons: [
      { icon: "🔆", text: "分享圖片", action: "share" },
      { icon: "🧭", text: "查看流程", action: "process" },
      { icon: "💬", text: "一起討論", action: "contact" }
    ],
    color: "#6B8E6B",
    bgGradient: "linear-gradient(135deg, #e8f5e8 0%, #d4e8d4 50%, #c4d8c4 100%)"
  },
  woodland: {
    title: "森林職人",
    titleEn: "Woodland Artisan",
    emoji: "🌟",
    bgColor: "#d1db3c", // 更新背景色
    imageBgColor: "#b5bf3b", // 圖片背景色
    intro: {
      title: "你的職業是：森林職人 Woodland Artisan！",
      subtitle: "你重視在地、真誠與生活感。",
      description: "品牌中最動人的部分，就是「你本來的樣子」。"
    },
    focusPoints: [
      {
        title: "在地感與文化性",
        description: "設計要看起來像你。"
      },
      {
        title: "手感與溫度",
        description: "插畫、線條、質地都很重要。"
      },
      {
        title: "人與人的連結",
        description: "希望品牌讓人覺得親近、舒服。"
      }
    ],
    assistance: {
      description: "以插畫、在地故事、視覺延伸，幫你把品牌生活感與真誠放大成視覺特色。",
      services: "在地文化設計｜手繪式主視覺｜店內物料延伸"
    },
    ctaButtons: [
      { icon: "🔆", text: "分享圖片", action: "share" },
      { icon: "🏡", text: "看更多案例", action: "portfolio" },
      { icon: "💬", text: "聯絡設計師", action: "contact" }
    ],
    color: "#8B6F47",
    bgGradient: "linear-gradient(135deg, #f7ebc3 0%, #e8d5a3 50%, #d4c19a 100%)"
  },
  explorer: {
    title: "創意探險家",
    titleEn: "Idea Explorer",
    emoji: "🌟",
    bgColor: "#4bb45a", // 更新背景色
    imageBgColor: "#3a9e46", // 圖片背景色
    intro: {
      title: "你的職業是：創意探險家 Idea Explorer！",
      subtitle: "你正處在品牌的萌芽期，什麼都新鮮、什麼都想試。",
      description: "你需要的是：一個能讓你「開始」的簡單雛形。"
    },
    focusPoints: [
      {
        title: "先建立基本形象",
        description: "不用複雜，但要讓人看得懂。"
      },
      {
        title: "風格探索",
        description: "想找出最代表你的那一種感覺。"
      },
      {
        title: "輕量又好用",
        description: "可以先使用，再慢慢升級。"
      }
    ],
    assistance: {
      description: "從 Logo、色票到 IG 首版視覺，幫你建立一個輕量但完整的品牌開場畫面。",
      services: "品牌起步包｜基礎 Logo｜風格探索視覺"
    },
    ctaButtons: [
      { icon: "🔆", text: "分享圖片", action: "share" },
      { icon: "🌱", text: "開始你的品牌", action: "start" },
      { icon: "💬", text: "聯絡設計師", action: "contact" }
    ],
    color: "#D4A574",
    bgGradient: "linear-gradient(135deg, #fff8e8 0%, #f5e6d3 50%, #e8d5c0 100%)"
  }
};

function PsychologyTestResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resultType, setResultType] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shareImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const type = searchParams.get('type');
      if (type && careerResults[type]) {
        setResultType(type);
      } else {
        router.push('/psychology-test');
      }
    } catch (error) {
      console.error('Error parsing result type:', error);
      router.push('/psychology-test');
    }
  }, [searchParams, router]);

  const handleShare = async () => {
    if (!resultType || !shareImageRef.current) return;
    
    const resultData = careerResults[resultType];
    if (!resultData) return;
    
    try {
      // 等待所有图片加载（特別是 logo）
      const imgs = shareImageRef.current.querySelectorAll('img');
      await Promise.all(Array.from(imgs).map((img) => {
        return new Promise((resolve) => {
          // 確保 logo 圖片完全載入且使用原始品質
          if (img.src.includes('cursor-07') || img.src.includes('logo')) {
            // 對於 logo，強制重新載入以確保使用原始圖片
            const originalSrc = img.src;
            img.src = '';
            img.src = originalSrc;
          }
          
          if (img.complete && img.naturalWidth > 0) {
            resolve(null);
          } else {
            img.onload = () => {
              // 確保圖片已完全載入
              if (img.naturalWidth > 0) {
                resolve(null);
              } else {
                setTimeout(() => resolve(null), 1000);
              }
            };
            img.onerror = () => resolve(null); // 即使失败也继续
            // 设置超时
            setTimeout(() => resolve(null), 5000);
          }
        });
      }));
      
      // 生成图片 - 使用高解析度確保 logo 不被壓縮
      const canvas = await html2canvas(shareImageRef.current, {
        backgroundColor: resultData.bgColor || '#fefef3',
        scale: 3, // 提高解析度（從 2 提高到 3），確保 logo 清晰
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 10000, // 增加超時時間
        removeContainer: false,
        // 確保 logo 不變形 - 使用原始比例 (635:332)
        onclone: (clonedDoc) => {
          const clonedImgs = clonedDoc.querySelectorAll('img');
          clonedImgs.forEach((img) => {
            if (img.src.includes('cursor-07') || img.classList.contains('logo-image')) {
              // 使用原始比例：635:332，放大 120%，高度 96px 時寬度為 183.6px
              img.style.width = '183.6px';
              img.style.height = '96px';
              img.style.maxWidth = '183.6px';
              img.style.maxHeight = '96px';
              img.style.minWidth = '183.6px';
              img.style.minHeight = '96px';
              img.style.objectFit = 'contain';
              img.style.display = 'block';
              img.style.margin = '0';
              img.style.padding = '0';
              img.style.boxSizing = 'border-box';
              
              // 容器也使用相同比例（放大 120%）
              const container = img.parentElement;
              if (container) {
                container.style.width = '183.6px';
                container.style.height = '96px';
                container.style.flexShrink = '0';
                container.style.marginBottom = '20px';
                container.style.position = 'relative';
                container.style.display = 'flex';
                container.style.alignItems = 'center';
                container.style.justifyContent = 'flex-start';
              }
            }
          });
          
          // 確保大標文字在 html2canvas 中正確渲染（深灰色）
          const clonedH1 = clonedDoc.querySelector('h1');
          if (clonedH1) {
            // 確保深灰色樣式正確應用
            clonedH1.style.color = '#353535';
            clonedH1.style.backgroundColor = 'transparent';
            clonedH1.style.border = 'none';
            clonedH1.style.padding = '0';
            // 移除任何漸層相關樣式
            clonedH1.style.background = 'none';
            clonedH1.style.webkitBackgroundClip = 'none';
            clonedH1.style.webkitTextFillColor = '';
            clonedH1.style.backgroundClip = 'none';
          }
        }
      });
      
      // 转换为blob并下载 - 使用最高品質，並添加圓角
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 創建一個新的 canvas 用於添加圓角
        const roundedCanvas = document.createElement('canvas');
        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;
        const roundedCtx = roundedCanvas.getContext('2d');
        
        if (roundedCtx) {
          // 設置圓角路徑
          const radius = 30 * 3; // 30px * scale(3) = 90px
          roundedCtx.beginPath();
          roundedCtx.moveTo(radius, 0);
          roundedCtx.lineTo(canvas.width - radius, 0);
          roundedCtx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
          roundedCtx.lineTo(canvas.width, canvas.height - radius);
          roundedCtx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
          roundedCtx.lineTo(radius, canvas.height);
          roundedCtx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
          roundedCtx.lineTo(0, radius);
          roundedCtx.quadraticCurveTo(0, 0, radius, 0);
          roundedCtx.closePath();
          roundedCtx.clip();
          
          // 繪製原始圖片
          roundedCtx.drawImage(canvas, 0, 0);
          
          // 使用圓角 canvas 生成 blob
          roundedCanvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `品牌心理測驗-${resultData.title}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              alert('圖片已下載！');
            }
          }, 'image/png', 1.0);
        } else {
          // 如果無法創建圓角，使用原始 canvas
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `品牌心理測驗-${resultData.title}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              alert('圖片已下載！');
            }
          }, 'image/png', 1.0);
        }
      } else {
        // 如果無法獲取 context，使用原始方法
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `品牌心理測驗-${resultData.title}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            alert('圖片已下載！');
          }
        }, 'image/png', 1.0);
      }
    } catch (error) {
      console.error('生成圖片失敗:', error);
      // 如果生成图片失败，回退到复制文字
      const text = `我剛測出自己是【${resultData.title} ${resultData.titleEn}】，原來我的品牌是這樣的角色。你也可以試試看～`;
      navigator.clipboard.writeText(text);
      alert('已複製到剪貼簿！');
    }
  };

  const handleCTA = (action: string) => {
    switch (action) {
      case 'share':
        handleShare();
        break;
      case 'portfolio':
        router.push('/hero-simple-test#portfolio-section');
        break;
      case 'contact':
        router.push('/hero-simple-test#contact-section');
        break;
      case 'process':
        router.push('/hero-simple-test#services-section');
        break;
      case 'start':
        router.push('/hero-simple-test#contact-section');
        break;
      default:
        break;
    }
  };

  if (!resultType || !careerResults[resultType]) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif'
      }}>
        <p>載入中...</p>
      </div>
    );
  }

  const resultData = careerResults[resultType];
  if (!resultData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif'
      }}>
        <p>找不到結果，正在返回...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)', // hero 版面的背景漸層色
      padding: isMobile ? 'clamp(30px, 6vw, 50px) clamp(20px, 4vw, 40px)' : 'clamp(40px, 8vw, 80px) clamp(40px, 6vw, 60px)',
      fontFamily: 'var(--font-google-sans-flex), sans-serif'
    }}>
      {/* 隐藏的分享图片容器 - 卡片式布局 */}
      <div
        ref={shareImageRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '900px',
          height: '1350px', // 2:3 比例（按照图二）
          background: resultData.bgColor,
          padding: '30px',
          color: '#353535',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '30px', // 增加圓角
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* 背景轨道系统 - 原有3個 + 新增2個（縮小70%、縮小30%） */}
        {[
          { top: '5%', left: '8%', opacity: 0.15, centerColor: '#003EC3', scale: 1 },
          { top: '20%', right: '5%', opacity: 0.15, centerColor: '#e9a52f', scale: 1 },
          { bottom: '15%', left: '10%', opacity: 0.15, centerColor: '#fffff3', scale: 1 },
          { top: '60%', right: '15%', opacity: 0.1, centerColor: '#003EC3', scale: 0.7 }, // 縮小70%
          { bottom: '40%', right: '20%', opacity: 0.1, centerColor: '#e9a52f', scale: 0.3 } // 縮小30%
        ].map((group, groupIndex) => (
          <div
            key={`orbit-group-${groupIndex}`}
            style={{
              position: 'absolute',
              ...group,
              width: `${2500 * (group.scale || 1)}px`,
              height: `${2500 * (group.scale || 1)}px`,
              transform: 'translate(-50%, -50%)',
              opacity: group.opacity,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            {/* 外轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${2500 * (group.scale || 1)}px`,
              height: `${2500 * (group.scale || 1)}px`,
              border: '8px solid rgba(0, 62, 195, 0.2)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 30s linear infinite'
            }} />
            
            {/* 中轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${1800 * (group.scale || 1)}px`,
              height: `${1800 * (group.scale || 1)}px`,
              border: '6px solid rgba(0, 62, 195, 0.15)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 25s linear infinite reverse'
            }} />
            
            {/* 内轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${1200 * (group.scale || 1)}px`,
              height: `${1200 * (group.scale || 1)}px`,
              border: '5px solid rgba(0, 62, 195, 0.1)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 20s linear infinite'
            }} />
            
            {/* 中心点 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${30 * (group.scale || 1)}px`,
              height: `${30 * (group.scale || 1)}px`,
              background: group.centerColor,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${30 * (group.scale || 1)}px ${group.centerColor}60`
            }} />
          </div>
        ))}

        {/* 内容区域 - z-index 高于背景 */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '10%' }}>
          {/* 頂部區域：Logo 和標題分開在不同行，置中 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // 置中
            width: '100%',
            marginBottom: '0px' // 移除間距
          }}>
            {/* Logo - 單獨一行，置中，放大 120%，保持原始比例 (635:332)，往上移動 */}
            <div 
              className="logo-container"
              style={{
                width: '183.6px', // 153px * 1.2 = 183.6px，保持原始比例
                height: '96px', // 80px * 1.2 = 96px
                flexShrink: 0,
                marginBottom: '4px', // 最小間距
                marginTop: '-20px', // 往上移動
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' // 置中
              }}
            >
              <img
                src="/cursor-07.png"
                alt="Liam Design Studio"
                className="logo-image"
                style={{
                  width: '183.6px',
                  height: '96px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0',
                  padding: '0',
                  border: 'none',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
              />
            </div>

            {/* 標題 - 單獨一行，在 logo 下方，置中，加入 padding-bottom，白色透明度80%，放大 115% */}
            <div style={{
              textAlign: 'center', // 置中
              width: '100%',
              paddingBottom: '12px', // 加入 padding-bottom
              backgroundColor: 'transparent' // 確保沒有背景色塊
            }}>
              <h1 style={{
                fontSize: '48.3px', // 42px * 1.15 = 48.3px (放大 115%)
                fontWeight: '900',
                color: '#353535', // 深灰色
                backgroundColor: 'transparent', // 確保沒有背景色塊
                lineHeight: '1.2',
                margin: 0,
                padding: 0, // 確保沒有 padding 造成的背景
                fontFamily: 'var(--font-google-sans-flex), sans-serif'
              }}>
                {resultData.title} {resultData.titleEn}
              </h1>
            </div>
          </div>

        {/* 中间：图片区域 - 底圖寬度 100%，带圆角背景框，置中 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16px', // 與大標的距離
          marginBottom: '24px', // 與內文的距離
          width: '100%'
        }}>
          <div style={{
            width: '100%', // 寬度 100% 等同卡片寬度
            height: '640px', // 16 * 40 (13:16 比例)
            background: resultData.imageBgColor, // 直接使用圖片背景色，透明度 100%（完全不透明）
            borderRadius: '20px',
            padding: '12px 20px', // 上下 padding 12px，左右 20px
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative', // 相對定位，用於放置雲朵
            overflow: 'hidden' // 超出部分隱藏
          }}>
            {/* 左側雲朵 */}
            <img
              src="/cloud-2.png"
              alt="Cloud"
              style={{
                position: 'absolute',
                left: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
                maxWidth: '30%',
                maxHeight: '40%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                zIndex: 1,
                pointerEvents: 'none'
              }}
              crossOrigin="anonymous"
            />
            {/* 右側雲朵 */}
            <img
              src="/cloud-3.png"
              alt="Cloud"
              style={{
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
                maxWidth: '30%',
                maxHeight: '40%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                zIndex: 1,
                pointerEvents: 'none'
              }}
              crossOrigin="anonymous"
            />
            <img
              src={resultType === 'story' ? "/test-01.png" : "/cha-1.png"}
              alt="Character"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 2 // 確保角色在雲朵上方
              }}
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* 描述文字 */}
        <div style={{
          textAlign: 'center',
          marginTop: '0px',
          marginBottom: '20px', // 與三個重點的間距
          fontFamily: 'var(--font-google-sans-flex), sans-serif'
        }}>
          <p style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#353535',
            lineHeight: '1.6', // 舒適的行高
            margin: '0 0 12px 0', // 舒適的間距
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            {resultData.intro.subtitle}
          </p>
          <p style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#353535',
            lineHeight: '1.6', // 舒適的行高
            margin: 0,
            fontFamily: 'var(--font-google-sans-flex), sans-serif'
          }}>
            {resultData.intro.description}
          </p>
        </div>

        {/* 三个重点 - 120% 字體大小，黑色 */}
        <div style={{
          textAlign: 'center',
          fontSize: '26.4px', // 22px * 1.2 = 26.4px
          fontWeight: '700',
          color: 'black',
          marginBottom: '0px',
          fontFamily: 'var(--font-google-sans-flex), sans-serif'
        }}>
          {resultData.focusPoints.map((point, index) => (
            <span key={index}>
              {index > 0 && <span style={{ margin: '0 6px', color: 'rgba(0, 0, 0, 0.5)' }}>  |  </span>}
              <span>{point.title}</span>
            </span>
          ))}
        </div>

        {/* 底部：Slogan 左下 + QR Code右下 */}
        <div style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto' // 保持在底部
        }}>
          {/* Slogan 左下 - 移除背景色塊，齊左，放大150%，透明度80%，故事魔法師是黑色，其他是白色 */}
          <div style={{
            background: 'transparent', // 移除背景色
            padding: '8px 0 16px 0', // 移除左右 padding
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // 齊左
            justifyContent: 'flex-start', // 從頂部開始
            textAlign: 'left', // 文字齊左
            gap: '7.2px' // 放大150%後間距也放大 (4.8px * 1.5 = 7.2px)
          }}>
            <div style={{
              fontSize: '31.104px', // 20.736px * 1.5 = 31.104px (放大150%)
              fontWeight: '700',
              color: '#353535', // 深灰色
              letterSpacing: '0.864px', // 放大150%
              lineHeight: '1', // 改為 1，減少 lineHeight 造成的留白
              textAlign: 'left', // 文字齊左
              margin: 0, // 移除預設 margin
              padding: 0, // 移除預設 padding
              display: 'block',
              whiteSpace: 'nowrap', // 防止文字換行造成留白
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              opacity: 0.8 // 透明度 80%
            }}>
              {'Own the Day.'.trim()}
            </div>
            <div style={{
              fontSize: '24.192px', // 16.128px * 1.5 = 24.192px (放大150%)
              fontWeight: '500',
              color: '#353535', // 深灰色
              lineHeight: '1.3',
              textAlign: 'left', // 文字齊左
              margin: 0, // 移除預設 margin
              padding: 0, // 移除預設 padding
              display: 'block',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              opacity: 0.8 // 透明度 80%
            }}>
              {'一起書寫你我的品牌故事'.trim()}
            </div>
          </div>

          {/* QR Code 右下 - 縮小 60% */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6.48px' // 10.8px * 0.6 = 6.48px
          }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=108x108&data=${encodeURIComponent('https://2025-liam-design.vercel.app/psychology-test')}`}
              alt="QR Code"
              style={{
                width: '108px', // 180px * 0.6 = 108px
                height: '108px',
                background: 'white',
                padding: '6.48px', // 10.8px * 0.6 = 6.48px
                borderRadius: '8.64px' // 14.4px * 0.6 = 8.64px
              }}
              crossOrigin="anonymous"
            />
            <div style={{
              fontSize: '12.96px', // 21.6px * 0.6 = 12.96px
              fontWeight: '600',
              color: '#353535',
              textAlign: 'center'
            }}>
              掃描立即測
            </div>
          </div>
        </div>
        </div>

        {/* CSS 动画 */}
        <style jsx>{`
          @keyframes orbit {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* 顶部区域 - 一个栏位：图片 + 标题 + 介绍 */}
        <div style={{
          background: 'rgba(255, 255, 243, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '20px',
          padding: isMobile ? 'clamp(30px, 5vw, 40px)' : 'clamp(40px, 5vw, 60px)',
          border: `2px solid ${resultData.color}40`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          marginBottom: 'clamp(40px, 6vw, 60px)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '30px' : '40px',
          alignItems: 'center'
        }}>
          {/* 左侧：图片 */}
          <div style={{
            flex: isMobile ? '0 0 100%' : '0 0 35%',
            width: isMobile ? '100%' : '35%',
            minHeight: isMobile ? '250px' : 'clamp(300px, 35vw, 400px)',
            position: 'relative',
            borderRadius: '15px',
            overflow: 'hidden'
          }}>
            <Image
              src={resultType === 'story' ? "/test-01.png" : "/cha-1.png"}
              alt="Character"
              fill
              style={{
                objectFit: 'contain'
              }}
            />
          </div>

          {/* 右侧：文字内容 */}
          <div style={{
            flex: isMobile ? '0 0 100%' : '0 0 65%',
            width: isMobile ? '100%' : '65%'
          }}>
            <div style={{
              fontSize: isMobile ? 'clamp(1.2rem, 3vw, 1.6rem)' : 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: '700',
              color: resultData.bgColor, // 使用各個職業的代表色（bgColor）
              marginBottom: 'clamp(16px, 2vw, 24px)',
              lineHeight: '1.3'
            }}>
              {resultData.emoji} {resultData.title} {resultData.titleEn}
            </div>
            <h1 style={{
              fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '900',
              color: resultData.bgColor, // 使用各個職業的代表色（bgColor）
              marginBottom: 'clamp(16px, 2vw, 24px)',
              lineHeight: '1.2'
            }}>
              {resultData.intro.title}
            </h1>
            <p style={{
              fontSize: isMobile ? 'clamp(1rem, 2.5vw, 1.3rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: '500',
              color: '#353535', // 深灰色
              lineHeight: '1.8',
              marginBottom: 'clamp(12px, 1.5vw, 16px)'
            }}>
              {resultData.intro.subtitle}
            </p>
            <p style={{
              fontSize: isMobile ? 'clamp(1rem, 2.5vw, 1.3rem)' : 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: '500',
              color: '#353535', // 深灰色
              lineHeight: '1.8'
            }}>
              {resultData.intro.description}
            </p>
          </div>
        </div>

        {/* 中间区域 - 合併為單一欄位，桌面時左右排列 */}
        <div style={{
          background: 'rgba(255, 255, 243, 0.1)', // 與紅線區域一致
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '20px',
          padding: isMobile ? '30px 20px' : '40px 50px',
          border: `2px solid ${resultData.color}40`, // 與紅線區域一致
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          marginBottom: 'clamp(40px, 6vw, 60px)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '40px' : '40px',
          position: 'relative'
        }}>
          {/* 左側：你在意的 3 大要點 */}
          <div style={{
            flex: isMobile ? '0 0 100%' : '0 0 50%',
            width: isMobile ? '100%' : '50%'
          }}>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)', // 按鈕漸層色
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              你在意的 3 大要點
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {resultData.focusPoints.map((point, index) => (
                <span key={index} style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  borderRadius: '20px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: resultData.bgColor, // 使用代表色
                  fontWeight: '600',
                  border: `1px solid ${resultData.bgColor}30` // 使用代表色
                }}>
                  {point.title}
                </span>
              ))}
            </div>
          </div>

          {/* 分隔線 - 桌面時垂直分隔線，手機時水平分隔線 */}
          {!isMobile ? (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '40px',
              bottom: '40px',
              width: '1px',
              background: `linear-gradient(to bottom, transparent, ${resultData.color}40, transparent)`,
              transform: 'translateX(-50%)'
            }} />
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              right: '40px',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${resultData.color}40, transparent)`,
              transform: 'translateY(-50%)'
            }} />
          )}

          {/* 右側：我們可以提供的協助 */}
          <div style={{
            flex: isMobile ? '0 0 100%' : '0 0 50%',
            width: isMobile ? '100%' : '50%',
            paddingLeft: isMobile ? '0' : '20px', // 增加左側 padding，與邊框保持距離
            paddingRight: isMobile ? '0' : '20px' // 增加右側 padding，與邊框保持距離
          }}>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)', // 按鈕漸層色
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              我們可以提供的協助
            </h3>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: '#353535', // 深灰色
              lineHeight: '1.8',
              marginBottom: '24px',
              textAlign: 'center',
              paddingLeft: isMobile ? '0' : '0', // 保持置中
              paddingRight: isMobile ? '0' : '0' // 保持置中
            }}>
              {resultData.assistance.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {resultData.assistance.services.split('｜').map((service, index) => (
                <span key={index} style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  borderRadius: '20px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: resultData.bgColor, // 使用代表色
                  fontWeight: '600',
                  border: `1px solid ${resultData.bgColor}30` // 使用代表色
                }}>
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA 按钮区 - 三个按钮（黑線黑字風格，桌面時左右排列） */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '20px',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'clamp(40px, 6vw, 60px)'
        }}>
          {resultData.ctaButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleCTA(button.action)}
              style={{
                padding: isMobile ? 'clamp(14px, 2.5vw, 18px) clamp(24px, 4vw, 36px)' : 'clamp(16px, 2.5vw, 20px) clamp(32px, 5vw, 48px)',
                background: 'transparent', // 底色透明
                border: '1px solid #353535', // 黑線
                borderRadius: '50px', // 更圓的圓角
                color: '#353535', // 黑字
                fontSize: isMobile ? 'clamp(0.95rem, 2vw, 1.1rem)' : 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: '700',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '300px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PsychologyTestResult() {
  return (
    <Suspense 
      fallback={
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)'
        }}>
          <p style={{ color: '#FFFFF3' }}>載入中...</p>
        </div>
      }
    >
      <PsychologyTestResultContent />
    </Suspense>
  );
}
