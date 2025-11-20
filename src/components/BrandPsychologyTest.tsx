"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// 心理测验 Modal 组件
const PsychologyTestModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: CareerType) => void;
  isMobile: boolean;
}> = ({ isOpen, onClose, onComplete, isMobile }) => {
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

  useEffect(() => {
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
      // 隱藏 scroll 指示器
      document.body.classList.add('modal-open');
    } else {
      // 顯示 scroll 指示器
      document.body.classList.remove('modal-open');
    }
    // 清理函數
    return () => {
      document.body.classList.remove('modal-open');
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
          onComplete(topCareer || 'story');
          onClose();
        }, 500);
      }
    }, 100);
  };

  if (!isOpen) return null;

  // Intro Page
  if (currentStep === 'intro') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'var(--font-google-sans-flex), sans-serif'
      }}
      onClick={onClose}
      >
        <div style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
          borderRadius: '20px',
          padding: 'clamp(30px, 5vw, 50px)',
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
  }

  // Loading Page
  if (currentStep === 'loading') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-google-sans-flex), sans-serif'
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
  }

  // Question Page
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQ.id] !== undefined;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
      fontFamily: 'var(--font-google-sans-flex), sans-serif'
    }}
    onClick={onClose}
    >
      <div style={{
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
        borderRadius: '20px',
        padding: 'clamp(30px, 4vw, 50px)',
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
};

// 心理测验 Card 入口组件
const PsychologyTestCard: React.FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleComplete = (result: CareerType) => {
    // 跳转到结果页，传递结果参数
    router.push(`/psychology-test/result?type=${result}`);
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
        onComplete={handleComplete}
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

