"use client";
import React, { useState } from "react";
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

// 职业结果数据（保持原有数据结构）
const careerResults: Record<string, {
  title: string;
  titleEn: string;
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
}> = {
  story: {
    title: "故事魔法師",
    titleEn: "Story Wizard",
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
    }
  },
  visual: {
    title: "視覺工匠",
    titleEn: "Visual Crafter",
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
    }
  },
  navigator: {
    title: "冒險舵手",
    titleEn: "Navigator",
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
    }
  },
  woodland: {
    title: "森林職人",
    titleEn: "Woodland Artisan",
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
    }
  },
  explorer: {
    title: "創意探險家",
    titleEn: "Idea Explorer",
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
    }
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

  // Intro Page - 超简单版本
  if (currentStep === 'intro') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: isMobile ? '30px 20px' : '50px 40px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: '#ddd',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>

          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            品牌心理測驗
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', color: '#666' }}>
            通過 6 題測驗，找出品牌的前進方向！
          </p>

          <button
            onClick={handleStart}
            style={{
              padding: '15px 40px',
              background: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            開始測驗
          </button>
        </div>
      </div>
    );
  }

  // Loading Page
  if (currentStep === 'loading') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>✨</div>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
            正在解析你的品牌魔法職業…
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
            稍等一下，讓魔法書翻一翻頁。
          </p>
          <div style={{
            width: '100%',
            height: '6px',
            background: '#eee',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              background: '#000',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>
    );
  }

  // Result Page - 简化版
  if (currentStep === 'result' && resultType) {
    const resultData = careerResults[resultType];
    
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: isMobile ? '30px 20px' : '50px 40px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: '#ddd',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>

          <h2 style={{ fontSize: '28px', marginBottom: '10px', color: resultData.bgColor }}>
            {resultData.title}
          </h2>
          <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#666' }}>
            {resultData.titleEn}
          </h3>

          <div style={{
            width: '100%',
            height: '200px',
            background: resultData.imageBgColor,
            borderRadius: '15px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={`/career-${resultType}.png`}
              alt={resultData.title}
              width={200}
              height={200}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px', color: '#333' }}>
            {resultData.intro.subtitle}
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', color: '#666' }}>
            {resultData.intro.description}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>你在意的重點：</h4>
            {resultData.focusPoints.map((point, i) => (
              <div key={i} style={{
                padding: '8px 15px',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#666'
              }}>
                {point.title}
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '15px 40px',
              background: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            關閉
          </button>
        </div>
      </div>
    );
  }

  // Question Page
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ.id] !== undefined;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: isMobile ? '30px 20px' : '40px 30px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#ddd',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>品牌魔法測驗</span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Question {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: '#eee',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#000',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        <h2 style={{ fontSize: '20px', marginBottom: '20px', lineHeight: '1.4', color: '#333' }}>
          {currentQ.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {currentQ.options.map((option) => {
            const isSelected = answers[currentQ.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id, option.type as CareerType)}
                style={{
                  padding: '15px',
                  background: isSelected ? '#000' : 'white',
                  color: isSelected ? 'white' : '#333',
                  border: isSelected ? 'none' : '2px solid #ddd',
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            style={{
              padding: '12px 24px',
              background: currentQuestion === 0 ? '#eee' : 'white',
              color: currentQuestion === 0 ? '#999' : '#333',
              border: '2px solid #ddd',
              borderRadius: '50px',
              fontSize: '14px',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
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
              padding: '12px 24px',
              background: hasAnswer ? '#000' : '#eee',
              color: hasAnswer ? 'white' : '#999',
              border: 'none',
              borderRadius: '50px',
              fontSize: '14px',
              cursor: hasAnswer ? 'pointer' : 'not-allowed',
              opacity: hasAnswer ? 1 : 0.5
            }}
          >
            {currentQuestion === questions.length - 1 ? '查看結果 →' : '下一題 →'}
          </button>
        </div>
      </div>
    </div>
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
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0' : 'clamp(20px, 3vw, 30px)',
          alignItems: isMobile ? 'center' : 'center',
          width: '100%',
          justifyContent: isMobile ? 'center' : 'center',
          paddingTop: isMobile ? '0' : 'clamp(8px, 1.5vw, 12px)',
          paddingBottom: isMobile ? '0' : 'clamp(8px, 1.5vw, 12px)',
          minHeight: isMobile ? 'auto' : 'clamp(280px, 38vw, 420px)'
        }}>
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
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.1rem, 3vw, 1.4rem)' : 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '900',
              color: '#fffff3',
              marginBottom: isMobile ? 'clamp(12px, 2vw, 16px)' : 'clamp(12px, 2vw, 16px)',
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

            <div style={{
              background: 'rgba(255, 255, 243, 0.05)',
              borderRadius: isMobile ? '8px' : '12px',
              padding: isMobile ? 'clamp(12px, 2vw, 16px)' : 'clamp(12px, 1.8vw, 18px)',
              border: '1px solid rgba(255, 255, 243, 0.1)',
              marginBottom: isMobile ? 'clamp(16px, 3vw, 24px)' : '0'
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
          </div>

          {isMobile && (
            <div style={{ width: '100%', textAlign: 'center' }}>
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
                  width: '100%'
                }}
              >
                開始測驗
              </button>
            </div>
          )}

          {!isMobile && (
            <div style={{ flex: '0 0 35%', width: '35%', textAlign: 'center' }}>
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
                  cursor: 'pointer'
                }}
              >
                開始測驗 ｜ Start
              </button>
            </div>
          )}
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
