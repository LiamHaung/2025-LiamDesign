"use client";
import React, { useState, useEffect } from "react";
import PsychologyTestCard from "@/components/BrandPsychologyTest";

export default function PsychologyTestCardTest() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7ebc3 0%, #fffff3 50%, #fffff3 100%)',
      padding: 'clamp(40px, 8vw, 80px)',
      fontFamily: 'var(--font-google-sans-flex), sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '900',
          color: '#353535',
          marginBottom: 'clamp(30px, 4vw, 50px)',
          textAlign: 'center'
        }}>
          心理測驗 Card 測試頁面
        </h1>
        
        <div style={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto'
        }}>
          <PsychologyTestCard isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}


