"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";

// 测验题目数据
const questions = [
  {
    id: 1,
    question: "當你的品牌踏上冒險旅程，它最先帶著什麼法杖？",
    options: [
      { id: 'a', text: "「故事法杖」——我最想讓大家記住我的理念與故事。", type: 'story' },
      { id: 'b', text: "「視覺法杖」——我想讓我的品牌看起來專業、美觀、有質感。", type: 'visual' },
      { id: 'c', text: "「指南針法杖」——我知道方向，但想找到最適合的呈現方式。", type: 'navigator' },
      { id: 'd', text: "「村落之心法杖」——我重視在地情感、人味與文化連結。", type: 'woodland' },
      { id: 'e', text: "「萌芽法杖」——我正要起步，需要有人陪我摸索品牌雛形。", type: 'explorer' }
    ]
  },
  {
    id: 2,
    question: "如果你的品牌是一座魔法小屋，它會長在哪裡？",
    options: [
      { id: 'a', text: "童話森林深處，有故事感的樹洞裡。", type: 'story' },
      { id: 'b', text: "懸浮在天空的設計工坊，充滿亮光與工具。", type: 'visual' },
      { id: 'c', text: "冒險之路的路口，有地圖、有路牌、有旅人。", type: 'navigator' },
      { id: 'd', text: "村莊旁的草地上，剛搭建好的第一座小屋。", type: 'woodland' },
      { id: 'e', text: "初學者練習場，充滿實驗與嘗試的空間。", type: 'explorer' }
    ]
  },
  {
    id: 3,
    question: "如果要替品牌施放一個魔法，你會優先強化什麼？",
    options: [
      { id: 'a', text: "故事與理念的呈現方式", type: 'story' },
      { id: 'b', text: "視覺整體性的精緻度", type: 'visual' },
      { id: 'c', text: "要怎麼讓客人清楚理解我", type: 'navigator' },
      { id: 'd', text: "在地特色或品牌精神的溫度", type: 'woodland' },
      { id: 'e', text: "把品牌的雛形先建立起來", type: 'explorer' }
    ]
  },
  {
    id: 4,
    question: "在旅途中，顧客會因為你的「哪種魔力」而靠近？",
    options: [
      { id: 'a', text: "你講故事的方式很吸引人", type: 'story' },
      { id: 'b', text: "你的視覺乾淨、漂亮、看了就很舒服", type: 'visual' },
      { id: 'c', text: "你很懂整理、歸納、讓人覺得安心", type: 'navigator' },
      { id: 'd', text: "你很真誠，也有在地情感與特色", type: 'woodland' },
      { id: 'e', text: "你很新鮮、很有創意感", type: 'explorer' }
    ]
  },
  {
    id: 5,
    question: "如果你的品牌變成一個魔法角色，他最像什麼？",
    options: [
      { id: 'a', text: "擅長寫故事的魔法學者", type: 'story' },
      { id: 'b', text: "認真雕刻每一道細節的視覺匠人", type: 'visual' },
      { id: 'c', text: "手拿羅盤，負責規劃下一步方向的冒險領隊", type: 'navigator' },
      { id: 'd', text: "背著竹籮，採集在地靈感的森林旅人", type: 'woodland' },
      { id: 'e', text: "拿著初學者魔杖但眼神亮晶晶的新手法師", type: 'explorer' }
    ]
  },
  {
    id: 6,
    question: "三年後，你最希望品牌成為什麼模樣？",
    options: [
      { id: 'a', text: "有故事、有世界觀、有角色設定的品牌", type: 'story' },
      { id: 'b', text: "視覺完整、專業、有一致性的品牌", type: 'visual' },
      { id: 'c', text: "方向清晰、品牌用途規劃明確的品牌", type: 'navigator' },
      { id: 'd', text: "代表地方文化與情感的品牌", type: 'woodland' },
      { id: 'e', text: "有雛形、有基礎視覺、正在成長的品牌", type: 'explorer' }
    ]
  }
];

// 职业类型定义
type CareerType = 'story' | 'visual' | 'navigator' | 'woodland' | 'explorer';

// 职业结果数据
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
    services: string;
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
    bgColor: "#ffa008",
    imageBgColor: "#dd902e",
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
    bgColor: "#38b1e3",
    imageBgColor: "#2597c0",
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
    bgColor: "#003EC3",
    imageBgColor: "#0028A3",
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
    color: "#003EC3",
    bgGradient: "linear-gradient(135deg, #e8f0f8 0%, #c4d4e8 50%, #003EC3 100%)"
  },
  woodland: {
    title: "森林職人",
    titleEn: "Woodland Artisan",
    emoji: "🌟",
    bgColor: "#2f6022",
    imageBgColor: "#b5bf3b",
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
    bgColor: "#4bb45a",
    imageBgColor: "#3a9e46",
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

// 心理测验 Modal 组件
const PsychologyTestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (result: CareerType) => void;
  isMobile: boolean;
}> = ({ isOpen, onClose, isMobile }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'question' | 'loading' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<CareerType, number>>({
    story: 0,
    visual: 0,
    navigator: 0,
    woodland: 0,
    explorer: 0
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [resultType, setResultType] = useState<CareerType | null>(null);
  const shareImageRef = useRef<HTMLDivElement>(null);
  
  // 使用 Portal 渲染到 body，确保在最上层（仅在客户端）
  // 必须在所有条件返回之前调用，遵守 React Hooks 规则
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    if (isOpen) {
      // 重置状态
      setCurrentStep('intro');
      setCurrentQuestion(0);
      setAnswers({});
      setScores({
        story: 0,
        visual: 0,
        navigator: 0,
        woodland: 0,
        explorer: 0
      });
      setLoadingProgress(0);
      setResultType(null);
      // 锁定背景滚动
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      // 降低背景元素的 z-index，确保弹出窗口在最上层
      // 使用 setTimeout 确保 DOM 已完全渲染
      setTimeout(() => {
        // 降低船只和海浪的 z-index
        const backgroundElements = document.querySelectorAll('.boat-container, .boat-with-waves, .star-parallax, [class*="wave"], [class*="boat"]');
        backgroundElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style.zIndex === '' || !htmlEl.dataset.originalZIndex) {
            const computedZIndex = window.getComputedStyle(htmlEl).zIndex;
            if (computedZIndex && computedZIndex !== 'auto') {
              htmlEl.dataset.originalZIndex = computedZIndex;
            }
          }
          htmlEl.style.zIndex = '-1';
          htmlEl.style.pointerEvents = 'none';
          htmlEl.style.opacity = '0';
        });
        
        // 降低整个 hero 区域的 z-index
        const heroContainer = document.querySelector('.hero-test-container, [class*="hero"]');
        if (heroContainer) {
          const htmlEl = heroContainer as HTMLElement;
          if (!htmlEl.dataset.originalZIndex) {
            const computedZIndex = window.getComputedStyle(htmlEl).zIndex;
            if (computedZIndex && computedZIndex !== 'auto') {
              htmlEl.dataset.originalZIndex = computedZIndex;
            }
          }
          htmlEl.style.zIndex = '-1';
        }
        
        // 降低3D轮播卡片的 z-index（查找projects-section内的所有元素）
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
          const allElements = projectsSection.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedZIndex = window.getComputedStyle(htmlEl).zIndex;
            if (computedZIndex && computedZIndex !== 'auto' && parseInt(computedZIndex) > 0) {
              if (!htmlEl.dataset.originalZIndex) {
                htmlEl.dataset.originalZIndex = computedZIndex;
              }
              htmlEl.style.zIndex = '-1';
              htmlEl.style.pointerEvents = 'none';
            }
          });
          // 也处理projects-section本身
          const sectionZIndex = window.getComputedStyle(projectsSection).zIndex;
          if (sectionZIndex && sectionZIndex !== 'auto' && parseInt(sectionZIndex) > 0) {
            if (!projectsSection.dataset.originalZIndex) {
              projectsSection.dataset.originalZIndex = sectionZIndex;
            }
            projectsSection.style.zIndex = '-1';
          }
        }
      }, 0);
    } else {
      // 恢复背景滚动
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      // 恢复背景元素的 z-index
      const backgroundElements = document.querySelectorAll('.boat-container, .boat-with-waves, .star-parallax, [class*="wave"], [class*="boat"]');
      backgroundElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.originalZIndex) {
          htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
          delete htmlEl.dataset.originalZIndex;
        } else {
          htmlEl.style.zIndex = '';
        }
        htmlEl.style.pointerEvents = '';
        htmlEl.style.opacity = '';
      });
      
      // 恢复 hero 区域的 z-index
      const heroContainer = document.querySelector('.hero-test-container, [class*="hero"]');
      if (heroContainer) {
        const htmlEl = heroContainer as HTMLElement;
        if (htmlEl.dataset.originalZIndex) {
          htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
          delete htmlEl.dataset.originalZIndex;
        } else {
          htmlEl.style.zIndex = '';
        }
      }
      
      // 恢复3D轮播卡片的 z-index
      const projectsSection2 = document.getElementById('projects-section');
      if (projectsSection2) {
        const allElements2 = projectsSection2.querySelectorAll('*');
        allElements2.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.dataset.originalZIndex) {
            htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
            delete htmlEl.dataset.originalZIndex;
            htmlEl.style.pointerEvents = '';
          }
        });
        // 恢复projects-section本身
        if (projectsSection2.dataset.originalZIndex) {
          projectsSection2.style.zIndex = projectsSection2.dataset.originalZIndex;
          delete projectsSection2.dataset.originalZIndex;
        }
      }
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    // 清理函數
    return () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      // 恢复背景元素的 z-index
      const backgroundElements = document.querySelectorAll('.boat-container, .boat-with-waves, .star-parallax, [class*="wave"], [class*="boat"]');
      backgroundElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.originalZIndex) {
          htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
          delete htmlEl.dataset.originalZIndex;
        } else {
          htmlEl.style.zIndex = '';
        }
        htmlEl.style.pointerEvents = '';
        htmlEl.style.opacity = '';
      });
      
      // 恢复 hero 区域的 z-index
      const heroContainer = document.querySelector('.hero-test-container, [class*="hero"]');
      if (heroContainer) {
        const htmlEl = heroContainer as HTMLElement;
        if (htmlEl.dataset.originalZIndex) {
          htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
          delete htmlEl.dataset.originalZIndex;
        } else {
          htmlEl.style.zIndex = '';
        }
      }
      
      // 恢复3D轮播卡片的 z-index
      const projectsSection3 = document.getElementById('projects-section');
      if (projectsSection3) {
        const allElements3 = projectsSection3.querySelectorAll('*');
        allElements3.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.dataset.originalZIndex) {
            htmlEl.style.zIndex = htmlEl.dataset.originalZIndex;
            delete htmlEl.dataset.originalZIndex;
            htmlEl.style.pointerEvents = '';
          }
        });
        // 恢复projects-section本身
        if (projectsSection3.dataset.originalZIndex) {
          projectsSection3.style.zIndex = projectsSection3.dataset.originalZIndex;
          delete projectsSection3.dataset.originalZIndex;
        }
      }
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  const handleStart = () => {
    setCurrentStep('question');
    setCurrentQuestion(0);
  };

  const handleAnswer = (questionId: number, optionId: string, type: CareerType) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    // 计算分数
    const newScores = { ...scores };
    newScores[type] = (newScores[type] || 0) + 1;
    setScores(newScores);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 最后一题，进入loading
      setCurrentStep('loading');
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    // 模拟loading动画
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // 找到最高分的职业类型
        const maxScore = Math.max(...Object.values(scores));
        const topCareer = Object.entries(scores).find(([, score]) => score === maxScore)?.[0] as CareerType;
        setTimeout(() => {
          setResultType(topCareer || 'story');
          setCurrentStep('result');
        }, 500);
      }
    }, 100);
  };

  const handleShare = async () => {
    if (typeof window === 'undefined' || !resultType || !shareImageRef.current) return;
    
    const resultData = careerResults[resultType];
    if (!resultData) return;
    
    try {
      // 动态导入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // 等待所有图片加载
      const imgs = shareImageRef.current.querySelectorAll('img');
      await Promise.all(Array.from(imgs).map((img) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null);
            setTimeout(() => resolve(null), 5000);
          }
        });
      }));
      
      // 生成图片
      const canvas = await html2canvas(shareImageRef.current, {
        backgroundColor: resultType === 'woodland' ? '#d1db3c' : (resultData.bgColor || '#fefef3'),
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 10000,
        removeContainer: false
      });
      
      // 转换为blob并下载
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
    } catch (error) {
      console.error('生成圖片失敗:', error);
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        const text = `我剛測出自己是【${resultData.title} ${resultData.titleEn}】，原來我的品牌是這樣的角色。你也可以試試看～`;
        navigator.clipboard.writeText(text);
        alert('已複製到剪貼簿！');
      }
    }
  };

  const handleCTA = (action: string) => {
    switch (action) {
      case 'share':
        handleShare();
        break;
      case 'portfolio':
        onClose();
        router.push('/hero-simple-test#projects-section');
        break;
      case 'contact':
        onClose();
        router.push('/hero-simple-test#contact-section');
        break;
      case 'process':
        onClose();
        router.push('/hero-simple-test#services-section');
        break;
      case 'start':
        onClose();
        router.push('/hero-simple-test#contact-section');
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  // Intro Page
  if (currentStep === 'intro') {
    const content = (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        ...(isMobile ? {} : {
        backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }),
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      onClick={onClose}
      >
        <div style={{
          maxWidth: isMobile ? '100%' : '900px',
          width: '100%',
          maxHeight: isMobile ? '85vh' : '90vh',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'scroll',
          touchAction: 'pan-y',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
          borderRadius: isMobile ? '16px' : '20px',
          padding: isMobile ? '24px' : 'clamp(30px, 5vw, 50px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1000000
        }}
        onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#555',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            ×
          </button>

          {/* 新内容区域 */}
          <div style={{
            textAlign: 'center',
            padding: 'clamp(40px, 6vw, 60px) clamp(20px, 4vw, 40px)'
          }}>
            <p style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              fontWeight: '500',
              color: '#353535',
              lineHeight: '1.8',
              marginBottom: 'clamp(24px, 4vw, 32px)',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              在魔法森林裡，<span className="highlight-text" style={{
                color: '#8B6F47',
                fontWeight: '700',
                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '-100% 0',
                backgroundRepeat: 'no-repeat',
                animation: 'highlight 1.5s ease-in-out 0.5s forwards',
                padding: '2px 4px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>你的想法化成一道微光，</span><br />
              <span className="highlight-text" style={{
                color: '#8B6F47',
                fontWeight: '700',
                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '-100% 0',
                backgroundRepeat: 'no-repeat',
                animation: 'highlight 1.5s ease-in-out 1.2s forwards',
                padding: '2px 4px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>帶著你走向命定的品牌職業——</span><br />
              也許是魔法師、匠人、旅人，<br />
              或剛起步的探險者。
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: '600',
              color: '#8B6F47',
              marginBottom: 'clamp(32px, 5vw, 48px)',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              通過 <span className="highlight-text" style={{
                fontWeight: '700',
                fontSize: '1.1em',
                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '-100% 0',
                backgroundRepeat: 'no-repeat',
                animation: 'highlight 1.5s ease-in-out 2s forwards',
                padding: '2px 4px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>6 題測驗</span>，找出品牌的前進方向！
            </p>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontWeight: '700',
              color: '#353535',
              marginBottom: 'clamp(32px, 5vw, 48px)',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              出發吧！
            </p>

            {/* CTA 按钮 */}
            <button
              onClick={handleStart}
              style={{
                padding: 'clamp(16px, 2.5vw, 20px) clamp(32px, 5vw, 48px)',
                background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                fontWeight: '700',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(139, 111, 71, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(139, 111, 71, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 111, 71, 0.4)';
              }}
            >
              開始測驗 ｜ Start
            </button>
          </div>
        </div>
      </div>
    );
    
    // 确保在客户端使用 Portal
    return isClient ? createPortal(content, document.body) : null;
  }

  // Loading Page
  if (currentStep === 'loading') {
    const content = (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        ...(isMobile ? {} : {
        backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }),
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      onClick={onClose}
      >
        <div style={{
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#555',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            ×
          </button>
          <div style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            marginBottom: 'clamp(24px, 3vw, 32px)',
            animation: 'rotate 3s linear infinite'
          }}>
            ✨
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: '700',
            color: '#353535',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            正在解析你的品牌魔法職業…
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#8B6F47',
            marginBottom: 'clamp(30px, 4vw, 40px)',
            fontStyle: 'italic'
          }}>
            稍等一下，讓魔法書翻一翻頁。
          </p>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(139, 111, 71, 0.2)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8B6F47 0%, #D4A574 100%)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <style jsx global>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes highlight {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }
        `}</style>
      </div>
    );
    
    // 确保在客户端使用 Portal
    return isClient ? createPortal(content, document.body) : null;
  }

  // Result Page
  if (currentStep === 'result' && resultType) {
    const resultData = careerResults[resultType];
    if (!resultData) return null;

    const content = (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        ...(isMobile ? {} : {
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }),
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      onClick={onClose}
      >
      <div style={{
        maxWidth: isMobile ? '100%' : '900px',
        width: '100%',
        maxHeight: isMobile ? '85vh' : '90vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        willChange: 'scroll',
        touchAction: 'pan-y',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '24px' : 'clamp(30px, 4vw, 50px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1000000
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#555',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          ×
        </button>

        {/* 隐藏的分享图片容器 */}
          <div
            ref={shareImageRef}
            style={{
              position: 'absolute',
              left: '-9999px',
              top: '-9999px',
              width: '900px',
              height: '1350px',
              background: resultType === 'woodland' ? '#d1db3c' : resultData.bgColor,
              padding: '30px',
              color: '#353535',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '30px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden'
            }}
          >
            {/* Logo */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginBottom: '0px',
              marginTop: '60px'
            }}>
              <div style={{
                width: '183.6px',
                height: '96px',
                flexShrink: 0,
                marginBottom: '4px',
                marginTop: '0px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  src={resultType === 'navigator' ? "/cursor-08.png" : "/cursor-07.png"}
                  alt="Liam Design Studio"
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
                />
              </div>
              <h1 style={{
                fontSize: '48.3px',
                fontWeight: '900',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                backgroundColor: 'transparent',
                lineHeight: '1.2',
                margin: 0,
                padding: 0,
                fontFamily: 'var(--font-google-sans-flex), sans-serif'
              }}>
                {resultData.title} {resultData.titleEn}
              </h1>
            </div>

            {/* 图片区域 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40px',
              marginBottom: '24px',
              width: '100%'
            }}>
              <div style={{
                width: '100%',
                height: '640px',
                background: resultData.imageBgColor,
                borderRadius: '20px',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 左側裝飾元素 */}
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  {/* 星星 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/star-big.png"
                    alt="Star"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'contain',
                      opacity: 0.8,
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  />
                  {/* 雲朵 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cloud-1.png"
                    alt="Cloud"
                    style={{
                      width: '200px',
                      height: 'auto',
                      objectFit: 'contain',
                      opacity: 0.7,
                      animation: 'float 4s ease-in-out infinite 0.5s'
                    }}
                  />
                </div>

                {/* 右側裝飾元素 */}
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  {/* 太陽 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/sun-big.png"
                    alt="Sun"
                    style={{
                      width: '175px',
                      height: '175px',
                      objectFit: 'contain',
                      opacity: 0.8,
                      animation: 'float 3.5s ease-in-out infinite 0.3s'
                    }}
                  />
                  {/* 雲朵 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cloud-2.png"
                    alt="Cloud"
                    style={{
                      width: '200px',
                      height: 'auto',
                      objectFit: 'contain',
                      opacity: 0.7,
                      animation: 'float 4.5s ease-in-out infinite 0.8s'
                    }}
                  />
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/career-${resultType}.png`}
                  alt="Character"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    position: 'relative',
                    zIndex: 2
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* 描述文字 */}
            <div style={{
              textAlign: 'center',
              marginTop: '0px',
              marginBottom: '20px',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              <p style={{
                fontSize: '20px',
                fontWeight: '500',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                lineHeight: '1.6',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-google-sans-flex), sans-serif'
              }}>
                {resultData.intro.subtitle}
              </p>
              <p style={{
                fontSize: '20px',
                fontWeight: '500',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'var(--font-google-sans-flex), sans-serif'
              }}>
                {resultData.intro.description}
              </p>
            </div>

            {/* 三个重点 */}
            <div style={{
              textAlign: 'center',
              fontSize: '26.4px',
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
              marginTop: 'auto'
            }}>
              <div style={{
                background: 'transparent',
                padding: '8px 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: '7.2px'
              }}>
                <div style={{
                  fontSize: '31.104px',
                  fontWeight: '700',
                  color: resultType === 'navigator' ? '#FFFFF3' : '#353535',
                  letterSpacing: '0.864px',
                  lineHeight: '1',
                  textAlign: 'left',
                  margin: 0,
                  padding: 0,
                  display: 'block',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  opacity: 0.8
                }}>
                  {'Own the Day.'.trim()}
                </div>
                <div style={{
                  fontSize: '24.192px',
                  fontWeight: '500',
                  color: resultType === 'navigator' ? '#FFFFF3' : '#353535',
                  lineHeight: '1.3',
                  textAlign: 'left',
                  margin: 0,
                  padding: 0,
                  display: 'block',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  opacity: 0.8
                }}>
                  {'一起書寫你我的品牌故事'.trim()}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6.48px'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=108x108&data=${encodeURIComponent('https://2025-liam-design.vercel.app/psychology-test')}`}
                  alt="QR Code"
                  style={{
                    width: '108px',
                    height: '108px',
                    background: 'white',
                    padding: '6.48px',
                    borderRadius: '8.64px'
                  }}
                  crossOrigin="anonymous"
                />
                <div style={{
                  fontSize: '12.96px',
                  fontWeight: '600',
                  color: '#353535',
                  textAlign: 'center'
                }}>
                  掃描立即測
                </div>
              </div>
            </div>
          </div>

          {/* 结果内容 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 32px)'
          }}>
            {/* 标题 */}
            <div style={{
              textAlign: 'center',
              marginBottom: 'clamp(16px, 2vw, 24px)'
            }}>
              <h1 style={{
                fontSize: isMobile ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '900',
                color: resultData.bgColor,
                marginBottom: 'clamp(16px, 2vw, 24px)',
                lineHeight: '1.2'
              }}>
                {resultData.intro.title.split('：').map((part, index) => {
                  if (index === 0) {
                    return <span key={index}>{part}：</span>;
                  } else {
                    // 职业名称部分（去掉最后的感叹号）
                    const parts = part.split('！');
                    return (
                      <span key={index}>
                        <span className="highlight-text" style={{
                          color: resultData.bgColor,
                          fontWeight: '900',
                          background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          backgroundPosition: '-100% 0',
                          backgroundRepeat: 'no-repeat',
                          animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          display: 'inline-block'
                        }}>
                          {parts[0]}
                        </span>
                        {parts[1] ? '！' : ''}
                      </span>
                    );
                  }
                })}
              </h1>
              <p style={{
                fontSize: isMobile ? 'clamp(0.8rem, 2vw, 1.04rem)' : 'clamp(0.96rem, 2vw, 1.2rem)',
                fontWeight: '500',
                color: '#353535',
                lineHeight: '1.8',
                marginBottom: 'clamp(12px, 1.5vw, 16px)'
              }}>
                {resultData.intro.subtitle}
              </p>
              <p style={{
                fontSize: isMobile ? 'clamp(0.8rem, 2vw, 1.04rem)' : 'clamp(0.96rem, 2vw, 1.2rem)',
                fontWeight: '500',
                color: '#353535',
                lineHeight: '1.8'
              }}>
                {resultData.intro.description}
              </p>
            </div>

            {/* 图片 */}
            <div style={{
              width: '100%',
              minHeight: isMobile ? '250px' : 'clamp(300px, 35vw, 400px)',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              background: resultData.imageBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              {/* 左側裝飾元素 */}
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                {/* 星星 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/star-big.png"
                  alt="Star"
                  style={{
                    width: isMobile ? '40px' : '60px',
                    height: isMobile ? '40px' : '60px',
                    objectFit: 'contain',
                    opacity: 0.8,
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
                {/* 雲朵 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cloud-1.png"
                  alt="Cloud"
                  style={{
                    width: isMobile ? '60px' : '80px',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: 0.7,
                    animation: 'float 4s ease-in-out infinite 0.5s'
                  }}
                />
              </div>

              {/* 右側裝飾元素 */}
              <div style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                pointerEvents: 'none'
              }}>
                {/* 太陽 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sun-big.png"
                  alt="Sun"
                  style={{
                    width: isMobile ? '50px' : '70px',
                    height: isMobile ? '50px' : '70px',
                    objectFit: 'contain',
                    opacity: 0.8,
                    animation: 'float 3.5s ease-in-out infinite 0.3s'
                  }}
                />
                {/* 雲朵 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cloud-2.png"
                  alt="Cloud"
                  style={{
                    width: isMobile ? '60px' : '80px',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: 0.7,
                    animation: 'float 4.5s ease-in-out infinite 0.8s'
                  }}
                />
              </div>

              <Image
                src={`/career-${resultType}.png`}
                alt="Character"
                width={3541}
                height={2203}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2
                }}
              />
            </div>

            {/* 你在意的 3 大要點 */}
            <div style={{
              background: 'rgba(255, 255, 243, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '15px',
              padding: 'clamp(24px, 3vw, 32px)',
              border: `2px solid ${resultData.color}40`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: isMobile ? 'clamp(1.2rem, 3vw, 1.6rem)' : 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 'clamp(16px, 2vw, 24px)',
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
                    color: resultData.bgColor,
                    fontWeight: '600',
                    border: `1px solid ${resultData.bgColor}30`
                  }}>
                    {point.title}
                  </span>
                ))}
              </div>
            </div>

            {/* 我們可以提供的協助 */}
            <div style={{
              background: 'rgba(255, 255, 243, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '15px',
              padding: 'clamp(24px, 3vw, 32px)',
              border: `2px solid ${resultData.color}40`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: isMobile ? 'clamp(1.2rem, 3vw, 1.6rem)' : 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 'clamp(16px, 2vw, 24px)',
                textAlign: 'center'
              }}>
                我們可以提供的協助
              </h3>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#353535',
                lineHeight: '1.8',
                marginBottom: 'clamp(16px, 2vw, 24px)',
                textAlign: 'center'
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
                    color: resultData.bgColor,
                    fontWeight: '600',
                    border: `1px solid ${resultData.bgColor}30`
                  }}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA 按钮区 */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '16px' : '20px',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 'clamp(16px, 2vw, 24px)'
            }}>
              {resultData.ctaButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleCTA(button.action)}
                  style={{
                    padding: isMobile ? 'clamp(14px, 2.5vw, 18px) clamp(24px, 4vw, 36px)' : 'clamp(16px, 2.5vw, 20px) clamp(32px, 5vw, 48px)',
                    background: 'transparent',
                    border: '1px solid #353535',
                    borderRadius: '50px',
                    color: '#353535',
                    fontSize: isMobile ? 'clamp(0.95rem, 2vw, 1.1rem)' : 'clamp(1rem, 2vw, 1.3rem)',
                    fontWeight: '700',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto',
                    minWidth: isMobile ? 'auto' : '200px'
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

        {/* CSS 動畫 */}
        <style jsx global>{`
          @keyframes highlight {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}</style>
      </div>
    );
    
    // 确保在客户端使用 Portal
    return isClient ? createPortal(content, document.body) : null;
  }

  // Question Page
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ.id] !== undefined;

  const content = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
        width: '100vw',
        height: '100vh',
      background: 'rgba(0, 0, 0, 0.85)',
        ...(isMobile ? {} : {
      backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }),
      zIndex: 2147483647,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
    }}
    onClick={onClose}
    >
      <div style={{
        maxWidth: isMobile ? '100%' : '900px',
        width: '100%',
        maxHeight: isMobile ? '85vh' : '90vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        willChange: 'scroll',
        touchAction: 'pan-y',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '24px' : 'clamp(30px, 4vw, 50px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1000000
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#555',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          ×
        </button>

        {/* 进度条 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(10px, 1.2vw, 12px)'
          }}>
            <span style={{
              fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
              fontWeight: '600',
              color: '#8B6F47'
            }}>
              品牌魔法測驗
            </span>
            <span style={{
              fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
              fontWeight: '600',
              color: '#8B6F47'
            }}>
              Question {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(139, 111, 71, 0.2)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8B6F47 0%, #D4A574 100%)',
              borderRadius: '10px',
              transition: 'width 0.5s ease-out',
              boxShadow: '0 0 20px rgba(139, 111, 71, 0.3)'
            }} />
          </div>
        </div>

        {/* 题目卡片 */}
        <div style={{
          background: 'rgba(255, 255, 243, 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '15px',
          padding: 'clamp(24px, 3vw, 40px)',
          border: '2px solid rgba(139, 111, 71, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          marginBottom: 'clamp(24px, 3vw, 32px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: '700',
            color: '#353535',
            marginBottom: 'clamp(24px, 3vw, 32px)',
            lineHeight: '1.4'
          }}>
            {currentQ.id === 1 && (
              <>
                當你的品牌踏上冒險旅程，<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>它最先帶著什麼法杖？</span>
              </>
            )}
            {currentQ.id === 2 && (
              <>
                如果你的品牌是一座魔法小屋，<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>它會長在哪裡？</span>
              </>
            )}
            {currentQ.id === 3 && (
              <>
                如果要替品牌施放一個魔法，<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>你會優先強化什麼？</span>
              </>
            )}
            {currentQ.id === 4 && (
              <>
                在旅途中，<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>顧客會因為你的「哪種魔力」而靠近？</span>
              </>
            )}
            {currentQ.id === 5 && (
              <>
                如果你的品牌變成<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>一個魔法角色，他最像什麼？</span>
              </>
            )}
            {currentQ.id === 6 && (
              <>
                三年後，你最<span className="highlight-text" style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(233, 165, 47, 0.4) 50%, rgba(233, 165, 47, 0.4) 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: '-100% 0',
                  backgroundRepeat: 'no-repeat',
                  animation: 'highlight 1.5s ease-in-out 0.3s forwards',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>希望品牌成為什麼模樣？</span>
              </>
            )}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.5vw, 16px)'
          }}>
            {currentQ.options.map((option) => {
              const isSelected = answers[currentQ.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.id, option.type as CareerType)}
                  style={{
                    width: '100%',
                    padding: 'clamp(16px, 2.5vw, 20px)',
                    background: isSelected
                      ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isSelected
                      ? 'none'
                      : '2px solid rgba(139, 111, 71, 0.3)',
                    borderRadius: '12px',
                    color: isSelected ? 'white' : '#353535',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: '500',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    boxShadow: isSelected
                      ? '0 8px 25px rgba(139, 111, 71, 0.4)'
                      : '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(139, 111, 71, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(139, 111, 71, 0.5)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.borderColor = 'rgba(139, 111, 71, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* 操作按钮 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'clamp(12px, 1.5vw, 16px)'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
              background: currentQuestion === 0
                ? 'rgba(139, 111, 71, 0.2)'
                : 'rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(139, 111, 71, 0.3)',
              borderRadius: '50px',
              color: currentQuestion === 0 ? 'rgba(139, 111, 71, 0.5)' : '#8B6F47',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: '600',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: currentQuestion === 0 ? 0.5 : 1
            }}
          >
            ← 上一題
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
              background: hasAnswer
                ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                : 'rgba(139, 111, 71, 0.2)',
              border: 'none',
              borderRadius: '50px',
              color: hasAnswer ? 'white' : 'rgba(139, 111, 71, 0.5)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: '600',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: hasAnswer ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: hasAnswer ? '0 8px 25px rgba(139, 111, 71, 0.4)' : 'none',
              opacity: hasAnswer ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (hasAnswer) {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(139, 111, 71, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (hasAnswer) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 111, 71, 0.4)';
              }
            }}
          >
            {currentQuestion === questions.length - 1 ? '查看結果 →' : '下一題 →'}
          </button>
        </div>
      </div>
    </div>
  );
  
  // 确保在客户端使用 Portal
  return isClient ? createPortal(content, document.body) : null;
};

// 心理测验 Card 入口组件
const PsychologyTestCard: React.FC<{
  isMobile: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = ({ isMobile, isOpen: externalIsOpen, onOpenChange }) => {
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  const isModalOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsModalOpen;
  const setIsModalOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsModalOpen(open);
    }
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          borderRadius: '20px',
          padding: isMobile ? 'clamp(16px, 3vw, 24px)' : 'clamp(8px, 1.5vw, 12px) clamp(30px, 4vw, 50px)',
          border: '2px solid rgba(139, 111, 71, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }}
      >
        {/* 行星轨道系统 - 在 card 内部，缩小尺寸以适应 card */}
        {[
          { top: '10%', left: '5%', opacity: 0.4, centerColor: '#003EC3' },
          { top: '20%', right: '5%', opacity: 0.4, centerColor: '#e9a52f' },
          { bottom: '15%', left: '15%', opacity: 0.4, centerColor: '#fffff3' }
        ].map((group, groupIndex) => (
          <div
            key={`orbit-group-${groupIndex}`}
            style={{
              position: 'absolute',
              ...group,
              width: '400px',
              height: '400px',
              transform: 'translate(-50%, -50%)',
              opacity: group.opacity,
              zIndex: 1
            }}
          >
            {/* 外轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              border: '1px solid rgba(0, 62, 195, 0.3)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 20s linear infinite'
            }} />
            
            {/* 外轨道圆点 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 20s linear infinite'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '4px',
                height: '4px',
                background: '#003EC3',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 5px rgba(0, 62, 195, 0.8)'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '0',
                width: '3px',
                height: '3px',
                background: '#4A90E2',
                borderRadius: '50%',
                transform: 'translateY(-50%)',
                boxShadow: '0 0 4px rgba(74, 144, 226, 0.6)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                width: '3px',
                height: '3px',
                background: '#7BB3F0',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 4px rgba(123, 179, 240, 0.6)'
              }} />
            </div>

            {/* 中轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '250px',
              height: '250px',
              border: '1px solid rgba(233, 165, 47, 0.3)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 15s linear infinite reverse'
            }} />
            
            {/* 中轨道圆点 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '250px',
              height: '250px',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 15s linear infinite reverse'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '3px',
                height: '3px',
                background: '#e9a52f',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 4px rgba(233, 165, 47, 0.8)'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '0',
                width: '2.5px',
                height: '2.5px',
                background: '#F5B041',
                borderRadius: '50%',
                transform: 'translateY(-50%)',
                boxShadow: '0 0 3px rgba(245, 176, 65, 0.6)'
              }} />
            </div>

            {/* 内轨道 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '150px',
              height: '150px',
              border: '1px solid rgba(255, 255, 243, 0.3)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 10s linear infinite'
            }} />
            
            {/* 内轨道圆点 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '150px',
              height: '150px',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 10s linear infinite'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '2.5px',
                height: '2.5px',
                background: '#fffff3',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 3px rgba(255, 255, 243, 0.8)'
              }} />
            </div>

            {/* 中心点 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '6px',
              height: '6px',
              background: group.centerColor,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 10px ${group.centerColor}80`
            }} />
          </div>
        ))}

        {/* 主要内容区域 - 横式布局 */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0' : 'clamp(20px, 3vw, 30px)',
          alignItems: isMobile ? 'center' : 'center',
          width: '100%',
          justifyContent: isMobile ? 'center' : 'center',
          paddingTop: isMobile ? '0' : 'clamp(8px, 1.5vw, 12px)',
          paddingBottom: isMobile ? '0' : 'clamp(8px, 1.5vw, 12px)',
          minHeight: isMobile ? 'auto' : 'clamp(280px, 38vw, 420px)'
        }}>
          {/* 左侧：文字内容 */}
          <div style={{
            flex: isMobile ? '1' : '0 0 65%',
            width: isMobile ? '100%' : '65%',
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            {/* 装饰性标签 */}
            {!isMobile && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px)',
                background: 'rgba(139, 111, 71, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                marginBottom: 'clamp(8px, 1.5vw, 12px)',
                border: '1px solid rgba(139, 111, 71, 0.3)',
                width: 'fit-content' // 寬度只對齊內容，不過長
              }}>
                <span style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  color: '#e9a52f',
                  fontWeight: '600',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  letterSpacing: '0.1em'
                }}>✨</span>
                <span style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  color: '#fffff3',
                  fontWeight: '600',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  letterSpacing: '0.1em'
                }}>品牌心理測驗</span>
              </div>
            )}

            {/* 主标题 */}
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.1rem, 3vw, 1.4rem)' : 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '900',
              color: '#fffff3',
              marginBottom: isMobile ? 'clamp(12px, 2vw, 16px)' : 'clamp(12px, 2vw, 16px)',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              lineHeight: '1.3',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(255, 255, 243, 0.2)',
              position: 'relative',
              paddingLeft: isMobile ? '0' : 'clamp(16px, 2vw, 24px)'
            }}>
              {/* 左侧装饰线 - 仅网页版显示 */}
              {!isMobile && (
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'linear-gradient(to bottom, #e9a52f, #8B6F47)',
                  borderRadius: '2px',
                  boxShadow: '0 0 10px rgba(233, 165, 47, 0.5)'
                }} />
              )}
              在品牌世界裡，你屬於<br />
              <span style={{
                background: 'linear-gradient(135deg, #fffff3 0%, #e9a52f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>哪個魔法角色呢？</span>
            </h3>

            {/* 副标题区域 */}
            <div style={{
              background: 'rgba(255, 255, 243, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: isMobile ? '8px' : '12px',
              padding: isMobile ? 'clamp(12px, 2vw, 16px)' : 'clamp(12px, 1.8vw, 18px)',
              border: '1px solid rgba(255, 255, 243, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: isMobile ? 'clamp(16px, 3vw, 24px)' : '0'
            }}>
              {/* 背景装饰 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(233, 165, 47, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              
              <p style={{
                fontSize: isMobile ? 'clamp(0.85rem, 2vw, 1rem)' : 'clamp(1rem, 2vw, 1.3rem)',
                color: '#e0e0e0',
                lineHeight: '1.6',
                fontFamily: 'var(--font-google-sans-flex), sans-serif',
                fontWeight: '500',
                position: 'relative',
                zIndex: 1,
                margin: 0
              }}>
                用<span style={{
                  color: '#e9a52f',
                  fontWeight: '700',
                  fontSize: '1.1em'
                }}>6個小問題</span>快速掌握品牌合適的設計路線！
              </p>
            </div>
          </div>

          {/* 右侧：图片区域 */}
          {!isMobile && (
            <div style={{
              flex: '0 0 35%',
              width: '35%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}>
              {/* 图片区域 - 放大150% */}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'relative',
                  width: 'clamp(200px, 30vw, 350px)',
                  height: 'clamp(200px, 30vw, 350px)'
                }}>
                  <Image
                    src="/cha-1.png"
                    alt="Character"
                    fill
                    style={{
                      objectFit: 'contain',
                      padding: 'clamp(10px, 2vw, 20px)',
                      transform: 'scale(1.5)',
                      transformOrigin: 'center center'
                    }}
                  />
                </div>

                {/* 按钮区域 - 绝对定位在图片底部 */}
                <div style={{
                  position: 'absolute',
                  bottom: 'clamp(-20px, -3vw, -10px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3
                }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      padding: 'clamp(14px, 2.5vw, 18px) clamp(24px, 4vw, 32px)',
                      background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                      fontWeight: '700',
                      fontFamily: 'var(--font-google-sans-flex), sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(139, 111, 71, 0.5)',
                      whiteSpace: 'nowrap',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 111, 71, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 111, 71, 0.5)';
                    }}
                  >
                    開始測驗 ｜ Start
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 手机版：图片和按钮 */}
          {isMobile && (
            <div style={{
              width: '100%',
              position: 'relative',
              height: 'clamp(180px, 35vw, 250px)',
              zIndex: 2
            }}>
              {/* 图片区域 - 放大150% */}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src="/cha-1.png"
                  alt="Character"
                  fill
                  style={{
                    objectFit: 'contain',
                    padding: 'clamp(8px, 2vw, 12px)',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center'
                  }}
                />
              </div>

              {/* 按钮区域 - 绝对定位（手机版） */}
              <div style={{
                position: 'absolute',
                bottom: 'clamp(8px, 2vw, 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                minWidth: 'clamp(140px, 35vw, 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    padding: 'clamp(12px, 2.5vw, 16px) clamp(28px, 6vw, 40px)',
                    background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    fontWeight: '700',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(139, 111, 71, 0.5)',
                    width: '100%',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 111, 71, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 111, 71, 0.5)';
                  }}
                >
                  開始測驗
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 心理测验 Modal */}
      <PsychologyTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMobile={isMobile}
      />

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default PsychologyTestCard;

