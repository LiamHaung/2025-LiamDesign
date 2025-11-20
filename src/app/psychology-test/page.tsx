"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// 职业结果数据已移至 result/page.tsx
// 以下代码已不再使用，但保留以防需要
const _unusedCareerResults = {
  story: {
    title: "故事魔法師",
    titleEn: "Story Wizard",
    subtitle: "你是一個很有故事的人，或是一個有很多想講的品牌。",
    description: "你的魔力在於「讓人想聽」，只差有人幫你把這些故事好好整理、畫出來。",
    designFocus: [
      "設計能不能「說得清楚」品牌理念",
      "插畫或主視覺有沒有故事感",
      "每一個元素是不是都有意義",
      "整體是不是能讓人一眼記住你"
    ],
    analysis: "你的品牌故事力已經很高，但視覺一致性與色彩辨識度還有空間。現在適合做的是：把故事整理成一個世界觀，並用插畫、排版、主視覺把它固定下來。",
    services: [
      { title: "插畫式品牌主視覺", description: "用插畫說你的品牌故事" },
      { title: "品牌故事整理 + Key Visual", description: "整理故事並視覺化" },
      { title: "菜單 / DM / 包裝敘事設計", description: "以故事為核心的設計" }
    ],
    ctaText: "想把這些故事變成真正的設計嗎？我們可以從「品牌故事＋主視覺」開始，我會陪你一起整理。",
    color: "#8B6F47",
    bgGradient: "linear-gradient(135deg, #f7ebc3 0%, #e8d5a3 50%, #d4c19a 100%)"
  },
  visual: {
    title: "視覺工匠",
    titleEn: "Visual Crafter",
    subtitle: "你對美感有堅持，希望品牌看起來專業、精緻、有質感。",
    description: "你的魔力在於「讓人一眼就覺得好」，你重視細節，也相信好的視覺能為品牌加分。",
    designFocus: [
      "視覺整體性的精緻度",
      "色彩與字體的專業搭配",
      "Logo 與識別系統的一致性",
      "每個細節都要到位"
    ],
    analysis: "你的品牌已經有明確方向，現在最需要的是完整的視覺識別系統。從 Logo 到色彩、字體、應用規範，建立一套專業且一致的視覺語言。",
    services: [
      { title: "品牌識別設計", description: "完整的 Logo + 視覺規範" },
      { title: "視覺系統建立", description: "色彩、字體、應用指南" },
      { title: "精緻化設計", description: "提升現有視覺的質感" }
    ],
    ctaText: "想建立一套專業的視覺識別系統嗎？我們可以從「品牌識別設計」開始，讓你的品牌看起來更專業。",
    color: "#4A6FA5",
    bgGradient: "linear-gradient(135deg, #e8f0f8 0%, #d4e3f0 50%, #c4d4e8 100%)"
  },
  navigator: {
    title: "冒險舵手",
    titleEn: "Navigator",
    subtitle: "你知道品牌的方向，但需要有人幫你規劃最適合的呈現方式。",
    description: "你的魔力在於「讓人清楚理解」，你重視邏輯與規劃，希望每個設計都有明確的目的。",
    designFocus: [
      "要怎麼讓客人清楚理解我",
      "品牌用途與定位的明確性",
      "資訊架構與視覺層次",
      "每個設計都要有功能性"
    ],
    analysis: "你的品牌方向已經很清晰，現在需要的是系統化的設計規劃。從品牌定位到視覺呈現，建立一套讓顧客能清楚理解的設計系統。",
    services: [
      { title: "品牌策略規劃", description: "明確品牌定位與方向" },
      { title: "資訊架構設計", description: "讓訊息更清楚易懂" },
      { title: "系統化設計", description: "建立可擴展的設計系統" }
    ],
    ctaText: "想讓品牌方向更清晰、設計更有系統嗎？我們可以從「品牌策略規劃」開始，一起找到最適合的呈現方式。",
    color: "#6B8E6B",
    bgGradient: "linear-gradient(135deg, #e8f5e8 0%, #d4e8d4 50%, #c4d8c4 100%)"
  },
  woodland: {
    title: "森林職人",
    titleEn: "Woodland Artisan",
    subtitle: "你重視在地情感、人味與文化連結，希望品牌能代表地方特色。",
    description: "你的魔力在於「讓人感受到溫度」，你相信品牌不只是視覺，更是情感與文化的連結。",
    designFocus: [
      "在地特色或品牌精神的溫度",
      "文化元素的融入與轉化",
      "人味與真實感的呈現",
      "能代表地方情感的設計"
    ],
    analysis: "你的品牌已經有很強的文化底蘊與在地情感，現在需要的是把這些特色轉化成視覺語言。用設計說出你的在地故事，讓品牌更有溫度。",
    services: [
      { title: "在地品牌設計", description: "融入地方特色的品牌識別" },
      { title: "文化元素視覺化", description: "把文化轉化成設計" },
      { title: "溫度感設計", description: "有情感、有故事的設計" }
    ],
    ctaText: "想把在地情感轉化成視覺設計嗎？我們可以從「在地品牌設計」開始，用設計說出你的在地故事。",
    color: "#8B6F47",
    bgGradient: "linear-gradient(135deg, #f7ebc3 0%, #e8d5a3 50%, #d4c19a 100%)"
  },
  explorer: {
    title: "創意探險家",
    titleEn: "Idea Explorer",
    subtitle: "你正要起步，需要有人陪你摸索品牌雛形，找到屬於你的方向。",
    description: "你的魔力在於「讓人覺得新鮮有趣」，你充滿創意，也願意嘗試各種可能性。",
    designFocus: [
      "把品牌的雛形先建立起來",
      "基礎視覺識別",
      "找到品牌的個性與方向",
      "從零開始的陪伴式設計"
    ],
    analysis: "你的品牌還在起步階段，現在最需要的是建立基礎的視覺識別，找到品牌的個性與方向。從 Logo 到基礎應用，一步步建立品牌的雛形。",
    services: [
      { title: "品牌雛形建立", description: "從零開始的品牌設計" },
      { title: "基礎視覺識別", description: "Logo + 基礎應用" },
      { title: "陪伴式設計", description: "陪你一起摸索品牌方向" }
    ],
    ctaText: "想從零開始建立品牌嗎？我們可以從「品牌雛形建立」開始，陪你一起找到屬於你的品牌方向。",
    color: "#D4A574",
    bgGradient: "linear-gradient(135deg, #fff8e8 0%, #f5e6d3 50%, #e8d5c0 100%)"
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = _unusedCareerResults;

export default function PsychologyTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'intro' | 'question' | 'loading'>('intro');
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleStart = () => {
    setCurrentStep('question');
    setCurrentQuestion(0);
  };

  const handleAnswer = (questionId: number, optionId: string, type: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    // 计算分数
    const newScores = { ...scores };
    if (type in newScores) {
      newScores[type as CareerType] = (newScores[type as CareerType] || 0) + 1;
    }
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
        const topCareer = Object.entries(scores).find(([, score]) => score === maxScore)?.[0];
        // 跳转到结果页
        setTimeout(() => {
          router.push(`/psychology-test/result?type=${topCareer || 'story'}`);
        }, 500);
      }
    }, 100);
  };

  // Intro Page
  if (currentStep === 'intro') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        padding: 'clamp(40px, 8vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          background: 'rgba(255, 255, 243, 0.3)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '50%',
          border: '2px solid rgba(139, 111, 71, 0.2)',
          zIndex: 1
        }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2
        }}>
          {/* Hero 区域 - 桌面版左右布局 */}
          <div style={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 'clamp(40px, 6vw, 60px)',
            gap: 'clamp(30px, 5vw, 60px)'
          }}>
            {/* 左侧：标题与文字 */}
            <div style={{
              flex: isDesktop ? '0 0 55%' : '1',
              width: isDesktop ? '55%' : '100%'
            }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '900',
                color: '#353535',
                marginBottom: 'clamp(20px, 3vw, 30px)',
                lineHeight: '1.2',
                fontFamily: 'var(--font-google-sans-flex), sans-serif'
              }}>
                你是品牌世界裡的哪種魔法職業？
              </h1>
              <p style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: '500',
                color: '#555',
                marginBottom: 'clamp(16px, 2vw, 24px)',
                lineHeight: '1.6'
              }}>
                用 6 題小問題，看看你的品牌現在適合走哪種設計路線。
              </p>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: '400',
                color: '#8B6F47',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                沒有標準答案，只有適合你的下一步。
              </p>
            </div>

            {/* 右侧：预留插画区 */}
            <div style={{
              flex: isDesktop ? '0 0 40%' : '1',
              width: isDesktop ? '40%' : '100%',
              height: 'clamp(300px, 40vw, 500px)',
              background: 'rgba(255, 255, 243, 0.4)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '20px',
              border: '2px solid rgba(139, 111, 71, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                opacity: 0.3
              }}>
                ✨
              </div>
            </div>
          </div>

          {/* 测验说明 */}
          <div style={{
            width: '100%',
            maxWidth: '800px',
            background: 'rgba(255, 255, 243, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '20px',
            padding: 'clamp(30px, 4vw, 50px)',
            marginBottom: 'clamp(30px, 4vw, 50px)',
            border: '2px solid rgba(139, 111, 71, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(20px, 4vw, 40px)',
              flexWrap: 'wrap'
            }}>
              <div style={{
                textAlign: 'center',
                flex: '1',
                minWidth: '150px'
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  marginBottom: '10px'
                }}>📝</div>
                <div style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                  fontWeight: '600',
                  color: '#353535'
                }}>6 題問答</div>
              </div>
              <div style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#8B6F47'
              }}>→</div>
              <div style={{
                textAlign: 'center',
                flex: '1',
                minWidth: '150px'
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  marginBottom: '10px'
                }}>✨</div>
                <div style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                  fontWeight: '600',
                  color: '#353535'
                }}>1 個結果</div>
              </div>
              <div style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#8B6F47'
              }}>→</div>
              <div style={{
                textAlign: 'center',
                flex: '1',
                minWidth: '150px'
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  marginBottom: '10px'
                }}>🎯</div>
                <div style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                  fontWeight: '600',
                  color: '#353535'
                }}>推薦設計方向</div>
              </div>
            </div>
          </div>

          {/* CTA 按钮 */}
          <button
            onClick={handleStart}
            style={{
              padding: 'clamp(18px, 3vw, 24px) clamp(40px, 6vw, 60px)',
              background: 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: '700',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(139, 111, 71, 0.4)',
              marginBottom: 'clamp(16px, 2vw, 24px)'
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
          <p style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: '#8B6F47',
            margin: 0,
            fontStyle: 'italic'
          }}>
            大約只需要 2 分鐘，慢慢來也沒關係。
          </p>
        </div>
      </div>
    );
  }

  // Loading Page
  if (currentStep === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif',
        padding: 'clamp(40px, 8vw, 80px)'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <div style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            marginBottom: 'clamp(30px, 5vw, 50px)',
            animation: 'rotate 3s linear infinite'
          }}>
            ✨
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            color: '#353535',
            marginBottom: 'clamp(16px, 2vw, 24px)'
          }}>
            正在解析你的品牌魔法職業…
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
            color: '#8B6F47',
            marginBottom: 'clamp(40px, 6vw, 60px)',
            fontStyle: 'italic'
          }}>
            稍等一下，讓魔法書翻一翻頁。
          </p>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(139, 111, 71, 0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px'
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

        <style jsx>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Question Page
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ.id] !== undefined;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
      padding: 'clamp(40px, 8vw, 80px)',
      fontFamily: 'var(--font-google-sans-flex), sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* 进度条 */}
        <div style={{
          marginBottom: 'clamp(30px, 4vw, 50px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            <span style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: '600',
              color: '#8B6F47'
            }}>
              品牌魔法測驗
            </span>
            <span style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
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
          borderRadius: '20px',
          padding: 'clamp(30px, 4vw, 50px)',
          border: '2px solid rgba(139, 111, 71, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          marginBottom: 'clamp(30px, 4vw, 40px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: '700',
            color: '#353535',
            marginBottom: 'clamp(30px, 4vw, 40px)',
            lineHeight: '1.4'
          }}>
            {currentQ.question}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(16px, 2vw, 20px)'
          }}>
            {currentQ.options.map((option, index) => {
              const isSelected = answers[currentQ.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.id, option.type)}
                  style={{
                    width: '100%',
                    padding: 'clamp(20px, 3vw, 24px)',
                    background: isSelected
                      ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isSelected
                      ? 'none'
                      : '2px solid rgba(139, 111, 71, 0.3)',
                    borderRadius: '15px',
                    color: isSelected ? 'white' : '#353535',
                    fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                    fontWeight: '500',
                    fontFamily: 'var(--font-google-sans-flex), sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    boxShadow: isSelected
                      ? '0 8px 25px rgba(139, 111, 71, 0.4)'
                      : '0 2px 10px rgba(0, 0, 0, 0.1)',
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
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
          gap: 'clamp(16px, 2vw, 24px)'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            style={{
              padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 4vw, 40px)',
              background: currentQuestion === 0
                ? 'rgba(139, 111, 71, 0.2)'
                : 'rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(139, 111, 71, 0.3)',
              borderRadius: '50px',
              color: currentQuestion === 0 ? 'rgba(139, 111, 71, 0.5)' : '#8B6F47',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '600',
              fontFamily: 'var(--font-google-sans-flex), sans-serif',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              opacity: currentQuestion === 0 ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.background = 'rgba(139, 111, 71, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentQuestion !== 0) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              }
            }}
          >
            ← 上一題
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            style={{
              padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 4vw, 40px)',
              background: hasAnswer
                ? 'linear-gradient(135deg, #8B6F47 0%, #6B5B3D 100%)'
                : 'rgba(139, 111, 71, 0.2)',
              border: 'none',
              borderRadius: '50px',
              color: hasAnswer ? 'white' : 'rgba(139, 111, 71, 0.5)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
