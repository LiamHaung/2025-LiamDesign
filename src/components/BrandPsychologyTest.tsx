"use client";
import React, { useState, useEffect, useRef } from "react";
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
      { title: "故事性", description: "設計是否能把故事說清楚、講得動人。" },
      { title: "情感連結", description: "品牌要讓人感受到「溫度」與「意義」。" },
      { title: "世界觀呈現", description: "希望品牌有自己的角色、場景與敘事方式。" }
    ],
    assistance: {
      description: "透過插畫、敘事主視覺與品牌架構，幫你把品牌故事整理成一個完整的世界觀，讓每一個設計都能說話。",
      services: "品牌故事整理｜插畫主視覺｜敘事延伸設計"
    },
    ctaButtons: [
      { icon: "", text: "分享圖片", action: "share" },
      { icon: "", text: "查看作品", action: "portfolio" },
      { icon: "", text: "一起討論", action: "contact" }
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
      { title: "視覺一致性", description: "整體視覺要保持專業且一致。" },
      { title: "細節與專業感", description: "每個細節都要到位，展現專業質感。" },
      { title: "整體質感", description: "品牌在任何場景都保持專業。" }
    ],
    assistance: {
      description: "建立一套完整又精緻的視覺識別系統：Logo、字體、色票、排版規範，讓你的品牌在任何場景都保持專業。",
      services: "品牌識別設計｜視覺系統建立｜質感提升"
    },
    ctaButtons: [
      { icon: "", text: "分享圖片", action: "share" },
      { icon: "", text: "查看作品", action: "portfolio" },
      { icon: "", text: "一起討論", action: "contact" }
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
      { title: "方向與目的性", description: "設計一定要有用、有意義。" },
      { title: "整體規劃", description: "視覺、內容、應用要能一致前進。" },
      { title: "清楚溝通", description: "希望品牌讓人一眼就懂。" }
    ],
    assistance: {
      description: "協助你整理品牌方向、建立優先順序，把品牌從想法導向「可執行的設計」。",
      services: "品牌定位規劃｜設計陪跑｜跨平台整合視覺"
    },
    ctaButtons: [
      { icon: "", text: "分享圖片", action: "share" },
      { icon: "", text: "查看作品", action: "portfolio" },
      { icon: "", text: "一起討論", action: "contact" }
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
      { title: "在地感與文化性", description: "設計要看起來像你。" },
      { title: "手感與溫度", description: "插畫、線條、質地都很重要。" },
      { title: "人與人的連結", description: "希望品牌讓人覺得親近、舒服。" }
    ],
    assistance: {
      description: "以插畫、在地故事、視覺延伸，幫你把品牌生活感與真誠放大成視覺特色。",
      services: "在地文化設計｜手繪式主視覺｜店內物料延伸"
    },
    ctaButtons: [
      { icon: "", text: "分享圖片", action: "share" },
      { icon: "", text: "查看作品", action: "portfolio" },
      { icon: "", text: "一起討論", action: "contact" }
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
      { title: "先建立基本形象", description: "不用複雜，但要讓人看得懂。" },
      { title: "風格探索", description: "想找出最代表你的那一種感覺。" },
      { title: "輕量又好用", description: "可以先使用，再慢慢升級。" }
    ],
    assistance: {
      description: "從 Logo、色票到 IG 首版視覺，幫你建立一個輕量但完整的品牌開場畫面。",
      services: "品牌起步包｜基礎 Logo｜風格探索視覺"
    },
    ctaButtons: [
      { icon: "", text: "分享圖片", action: "share" },
      { icon: "", text: "查看作品", action: "portfolio" },
      { icon: "", text: "一起討論", action: "contact" }
    ],
    color: "#D4A574",
    bgGradient: "linear-gradient(135deg, #fff8e8 0%, #f5e6d3 50%, #e8d5c0 100%)"
  }
};

// 超简单的Modal组件
const PsychologyTestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
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

  // 背景锁定功能 - 使用安全的方法
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (isOpen) {
      // 记录当前滚动位置
      const scrollY = window.scrollY;
      // 锁定背景并隐藏滚动条
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      // 隐藏滚动条（兼容不同浏览器）
      document.documentElement.style.overflow = 'hidden';
      // 保存滚动位置以便恢复
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // 恢复背景滚动
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    }

    // 清理函数
    return () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => {
    setCurrentStep('question');
    setCurrentQuestion(0);
  };

  const handleAnswer = (questionId: number, optionId: string, type: CareerType) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    const newScores = { ...scores };
    newScores[type] = (newScores[type] || 0) + 1;
    setScores(newScores);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const maxScore = Math.max(...Object.values(scores));
        const topCareer = Object.entries(scores).find(([, score]) => score === maxScore)?.[0] as CareerType;
        setTimeout(() => {
          setResultType(topCareer || 'story');
          setCurrentStep('result');
        }, 500);
      }
    }, 100);
  };

  // 分享功能
  const handleShare = async () => {
    if (!shareImageRef.current) return;

    try {
      // 动态导入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareImageRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          // 检测是否为移动设备
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobileDevice && navigator.share && navigator.canShare?.({ files: [new File([blob], 'brand-result.png', { type: 'image/png' })] })) {
            // 移动端使用分享功能
            const file = new File([blob], 'brand-result.png', { type: 'image/png' });
            navigator.share({ files: [file], title: '我的品牌測驗結果' });
          } else {
            // 桌面端或不支持分享的设备直接下载
            const url = canvas.toDataURL();
            const link = document.createElement('a');
            link.download = 'brand-result.png';
            link.href = url;
            link.click();
          }
        }
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  // CTA 按钮处理
  const handleCTAClick = (action: string) => {
    if (action === 'share') {
      handleShare();
    } else if (action === 'portfolio') {
      onClose();
      // 延迟跳转确保模态框关闭动画完成
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          // 使用相对锚点，跳转到当前页面的 projects 区块
          window.location.hash = 'projects';
        }
      }, 300);
    } else if (action === 'contact') {
      onClose();
      // 延迟跳转确保模态框关闭动画完成
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          // 使用相对锚点，跳转到当前页面的 contact 区块
          window.location.hash = 'contact';
        }
      }, 300);
    }
  };

  // Intro Page - 添加原设计样式
  if (currentStep === 'intro') {
    return (
      <>
        <style jsx global>{`
          @keyframes highlight {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }
          
          /* 隐藏滚动条 */
          .modal-overlay::-webkit-scrollbar {
            display: none;
          }
          
          .modal-overlay {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div 
          style={{
        position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            // 隐藏滚动条
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
      }}
      className="modal-overlay"
      >
          <div 
            style={{
              maxWidth: isMobile ? '100%' : '900px',
          width: '100%',
              maxHeight: isMobile ? '85vh' : '90vh',
          overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
              borderRadius: isMobile ? '16px' : '20px',
              padding: isMobile ? '24px' : 'clamp(30px, 5vw, 50px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
              onClick={onClose}
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
                zIndex: 10
            }}
          >
            ×
          </button>

            {/* 内容区域 */}
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
                在魔法森林裡，<span style={{
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
                <span style={{
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
                通過 <span style={{
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
            >
              開始測驗 ｜ Start
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Loading Page - 添加原设计样式
  if (currentStep === 'loading') {
    return (
      <>
        <style jsx global>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          /* 隐藏滚动条 */
          .modal-overlay::-webkit-scrollbar {
            display: none;
          }
          
          .modal-overlay {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      <div 
        className="modal-overlay"
        style={{
        position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
      }}
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
              onClick={onClose}
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
                zIndex: 10
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
        </div>
      </>
    );
  }

  // Result Page - 添加原设计样式
  if (currentStep === 'result' && resultType) {
    const resultData = careerResults[resultType];
    
    return (
      <div 
        className="modal-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '40px',
          fontFamily: 'var(--font-google-sans-flex), sans-serif',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div style={{
          maxWidth: isMobile ? '100%' : '900px',
          width: '100%',
          maxHeight: isMobile ? '85vh' : '90vh',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
          borderRadius: isMobile ? '16px' : '20px',
          padding: isMobile ? '24px' : 'clamp(30px, 4vw, 50px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
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
              zIndex: 10
            }}
          >
            ×
          </button>

          {/* 结果标题和角色图片 */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3vw, 32px)' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '900',
              color: resultData.bgColor,
              marginBottom: 'clamp(8px, 1vw, 12px)',
              fontFamily: 'var(--font-google-sans-flex), sans-serif'
            }}>
              {resultData.title}
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              color: '#8B6F47',
              fontWeight: '600',
              marginBottom: 'clamp(24px, 3vw, 32px)'
            }}>
              {resultData.titleEn}
            </p>

            <div style={{
              width: '100%',
              height: 'clamp(400px, 60vw, 600px)',
              background: resultData.imageBgColor,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              marginBottom: 'clamp(24px, 3vw, 32px)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* 职业角色图片 */}
              <Image
                src={`/career-${resultType}.png`}
                alt={resultData.title}
                width={500}
                height={500}
                style={{ 
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '140%',
                  maxHeight: '140%',
                  objectFit: 'contain',
                  transform: 'scale(1.4)',
                  position: 'relative',
                  zIndex: 2
                }}
              />
              {/* 随机装饰元素 */}
              {(() => {
                // 根据职业类型生成一个稳定的随机数 (0-2)
                const seed = resultType.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const randomIndex = seed % 3;
                const decorations = [
                  { src: '/sun-big.png', alt: 'Sun', size: 120 },
                  { src: '/cloud-1.png', alt: 'Cloud', size: 140 },
                  { src: '/star-big.png', alt: 'Star', size: 100 }
                ];
                const decoration = decorations[randomIndex];
                
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={decoration.src}
                    alt={decoration.alt}
                    style={{
                      position: 'absolute',
                      width: `${decoration.size}px`,
                      height: `${decoration.size}px`,
                      objectFit: 'contain',
                      opacity: 0.7,
                      zIndex: 1,
                      // 根据装饰类型决定位置
                      ...(randomIndex === 0 ? { top: '20px', right: '20px' } : 
                         randomIndex === 1 ? { bottom: '30px', left: '30px' } : 
                         { top: '30px', left: '20px' })
                    }}
                  />
                );
              })()}
            </div>
          </div>

          {/* 结果介绍 */}
          <div style={{
            background: 'rgba(255, 255, 243, 0.6)',
            borderRadius: '15px',
            padding: 'clamp(20px, 3vw, 30px)',
            border: '2px solid rgba(139, 111, 71, 0.2)',
            marginBottom: 'clamp(20px, 2.5vw, 24px)'
          }}>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              fontWeight: '700',
              color: '#353535',
              marginBottom: 'clamp(12px, 1.5vw, 16px)',
              lineHeight: '1.5'
            }}>
              {resultData.intro.subtitle}
            </p>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)',
              color: '#555',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {resultData.intro.description}
            </p>
          </div>

          {/* 关注重点 */}
          <div style={{ marginBottom: 'clamp(20px, 2.5vw, 24px)' }}>
            <h3 style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              fontWeight: '700',
              color: '#353535',
              marginBottom: 'clamp(12px, 1.5vw, 16px)'
            }}>
              你在意的重點：
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(10px, 1.2vw, 12px)'
            }}>
              {resultData.focusPoints.map((point, i) => (
                <div key={i} style={{
                  padding: 'clamp(12px, 2vw, 16px)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  border: '2px solid rgba(139, 111, 71, 0.2)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{
                    fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)',
                    fontWeight: '700',
                    color: resultData.bgColor,
                    marginBottom: '4px'
                  }}>
                    {point.title}
                  </h4>
                  <p style={{
                    fontSize: 'clamp(0.85rem, 1.7vw, 1rem)',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 我可以帮你 */}
          <div style={{
            background: 'rgba(255, 255, 243, 0.6)',
            borderRadius: '15px',
            padding: 'clamp(20px, 3vw, 30px)',
            border: '2px solid rgba(139, 111, 71, 0.2)',
            marginBottom: 'clamp(20px, 2.5vw, 24px)'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              fontWeight: '700',
              color: '#353535',
              marginBottom: 'clamp(12px, 1.5vw, 16px)'
            }}>
              我可以幫你：
            </h3>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)',
              color: '#555',
              lineHeight: '1.6',
              marginBottom: 'clamp(12px, 1.5vw, 16px)',
              fontWeight: '500'
            }}>
              {resultData.assistance.description}
            </p>
            <p style={{
              fontSize: 'clamp(0.85rem, 1.7vw, 1rem)',
              color: resultData.bgColor,
              fontWeight: '700'
            }}>
              {resultData.assistance.services}
            </p>
          </div>

          {/* CTA 按钮 */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 'clamp(12px, 1.5vw, 16px)',
            justifyContent: 'center'
          }}>
            {resultData.ctaButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleCTAClick(button.action)}
                style={{
                  padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
                  background: button.action === 'share'
                    ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                    : 'rgba(255, 255, 255, 0.9)',
                  border: button.action === 'share' ? 'none' : '2px solid rgba(139, 111, 71, 0.3)',
                  borderRadius: '50px',
                  color: button.action === 'share' ? 'white' : '#8B6F47',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                  fontWeight: '700',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: button.action === 'share'
                    ? '0 8px 25px rgba(139, 111, 71, 0.4)'
                    : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  flex: isMobile ? '1' : 'auto'
                }}
              >
                {button.text}
              </button>
            ))}
          </div>

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
                    objectFit: 'contain'
                  }}
                  crossOrigin="anonymous"
                />
              </div>
              <h1 style={{
                fontSize: '48.3px',
                fontWeight: '900',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                lineHeight: '1.2',
                margin: 0,
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
                  alignItems: 'center'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/star-big.png" alt="Star" style={{ width: '150px', height: '150px', objectFit: 'contain', opacity: 0.8 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cloud-1.png" alt="Cloud" style={{ width: '200px', height: 'auto', objectFit: 'contain', opacity: 0.7 }} />
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
                  alignItems: 'center'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/sun-big.png" alt="Sun" style={{ width: '175px', height: '175px', objectFit: 'contain', opacity: 0.8 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cloud-2.png" alt="Cloud" style={{ width: '200px', height: 'auto', objectFit: 'contain', opacity: 0.7 }} />
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
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '20px',
                fontWeight: '500',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                lineHeight: '1.6',
                margin: '0 0 12px 0'
              }}>
                {resultData.intro.subtitle}
              </p>
              <p style={{
                fontSize: '20px',
                fontWeight: '500',
                color: resultType === 'navigator' ? '#FFFFFF' : '#353535',
                lineHeight: '1.6',
                margin: 0
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
              marginBottom: '0px'
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
                gap: '7.2px'
              }}>
                <div style={{
                  fontSize: '31.104px',
                  fontWeight: '700',
                  color: resultType === 'navigator' ? '#FFFFF3' : '#353535',
                  letterSpacing: '0.864px',
                  lineHeight: '1',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  opacity: 0.8
                }}>
                  Own the Day.
                </div>
                <div style={{
                  fontSize: '24.192px',
                  fontWeight: '500',
                  color: resultType === 'navigator' ? '#FFFFF3' : '#353535',
                  lineHeight: '1.3',
                  fontFamily: 'var(--font-google-sans-flex), sans-serif',
                  opacity: 0.8
                }}>
                  一起書寫你我的品牌故事
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
        </div>
      </div>
    );
  }

  // Question Page - 添加原设计样式
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ.id] !== undefined;

  return (
    <>
      <style jsx global>{`
        /* 隐藏滚动条 */
        .modal-overlay::-webkit-scrollbar {
          display: none;
        }
        
        .modal-overlay {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div 
        className="modal-overlay"
        style={{
        position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    }}
    >
      <div style={{
        maxWidth: isMobile ? '100%' : '900px',
        width: '100%',
        maxHeight: isMobile ? '85vh' : '90vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '24px' : 'clamp(30px, 4vw, 50px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
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
            zIndex: 10
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
                當你的品牌踏上冒險旅程，<span style={{
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
                如果你的品牌是一座魔法小屋，<span style={{
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
                如果要替品牌施放一個魔法，<span style={{
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
                在旅途中，<span style={{
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
                如果你的品牌變成<span style={{
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
                三年後，你最<span style={{
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
              flex: 1,
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 3vw, 32px)',
              background: hasAnswer
                ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                : 'rgba(139, 111, 71, 0.2)',
              border: 'none',
              borderRadius: '50px',
              color: hasAnswer ? 'white' : 'rgba(139, 111, 71, 0.5)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: '700',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: hasAnswer ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              opacity: hasAnswer ? 1 : 0.5,
              boxShadow: hasAnswer ? '0 8px 25px rgba(139, 111, 71, 0.4)' : 'none'
            }}
          >
            {currentQuestion === questions.length - 1 ? '查看結果 →' : '下一題 →'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

// Card 入口组件
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
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          textAlign: 'center',
          padding: isMobile ? 'clamp(20px, 4vw, 30px)' : 'clamp(30px, 5vw, 50px)',
          gap: 'clamp(20px, 3vw, 30px)'
        }}>
          {/* 1. 在品牌世界裡，你屬於哪個魔法角色呢？ */}
          <h3 style={{
            fontSize: isMobile ? 'clamp(1.1rem, 3vw, 1.4rem)' : 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '900',
            color: '#fffff3',
            margin: 0,
            fontFamily: 'var(--font-google-sans-flex), sans-serif',
            lineHeight: '1.3'
          }}>
            在品牌世界裡，你屬於<br />
            <span style={{
              background: 'linear-gradient(135deg, #fffff3 0%, #e9a52f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>哪個魔法角色呢？</span>
          </h3>

          {/* 2. 用6個小問題快速掌握品牌合適的設計路線！ */}
          <div style={{
            background: 'rgba(255, 255, 243, 0.05)',
            borderRadius: '12px',
            padding: 'clamp(12px, 2vw, 16px)',
            border: '1px solid rgba(255, 255, 243, 0.1)',
            maxWidth: '600px',
            width: '100%'
          }}>
            <p style={{
              fontSize: isMobile ? 'clamp(0.85rem, 2vw, 1rem)' : 'clamp(1rem, 2vw, 1.3rem)',
              color: '#e0e0e0',
              lineHeight: '1.6',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              fontWeight: '500',
              margin: 0
            }}>
              用<span style={{ color: '#e9a52f', fontWeight: '700', fontSize: '1.1em' }}>6個小問題</span>快速掌握品牌合適的設計路線！
            </p>
          </div>

          {/* 3. 圖片 */}
          <div style={{
            width: '100%',
            position: 'relative',
            height: isMobile ? 'clamp(180px, 35vw, 250px)' : 'clamp(200px, 25vw, 300px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/test-visual.png"
              alt="Character"
              style={{
                objectFit: 'contain',
                padding: 'clamp(8px, 2vw, 12px)',
                transform: 'scale(2.0)',
                transformOrigin: 'center center',
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}
            />
          </div>

          {/* 4. 開始測驗按鈕 */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: isMobile ? 'clamp(12px, 2.5vw, 16px) clamp(28px, 6vw, 40px)' : 'clamp(14px, 2.5vw, 18px) clamp(24px, 4vw, 32px)',
              background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: isMobile ? 'clamp(0.85rem, 2vw, 1rem)' : 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: '700',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(139, 111, 71, 0.5)',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'clamp(140px, 35vw, 200px)' : 'auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10
            }}
          >
            {isMobile ? '開始測驗' : '開始測驗 ｜ Start'}
          </button>
        </div>
      </div>

      <PsychologyTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMobile={isMobile}
      />
    </>
  );
};

export default PsychologyTestCard;
