"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroOverlay() {
  return (
    <section style={{
      position: 'relative',
      height: 'clamp(70vh, 88vh, 100vh)',
      background: '#0B48C6',
      overflow: 'hidden'
    }}>
      {/* 右上大圖 */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: 'min(60vw, 900px)', height: 'min(70vh, 720px)' }}>
        <Image src="/hero-maps.png" alt="Hero Map" fill priority style={{ objectFit: 'cover', objectPosition: 'right top' }} />
      </div>

      {/* 讀性遮罩（左側更深，避免文字壓圖時不易讀） */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.0) 70%)' }} />

      {/* 文案區塊（靠左） */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '0 clamp(24px, 6vw, 120px)' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: '#FFFFF3',
              fontFamily: 'var(--font-zpix), monospace',
              fontSize: 'clamp(40px, 9vw, 120px)',
              lineHeight: 1.05,
              letterSpacing: '.02em',
              margin: 0,
              WebkitTextStroke: '1px rgba(255,255,255,0.25)'
            }}
          >
            Own the Day. 掌握今天！
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: '#FFFFF3',
              fontSize: 'clamp(16px, 2.2vw, 24px)',
              lineHeight: 1.4,
              marginTop: 'clamp(12px, 1.8vw, 24px)'
            }}
          >
            Design your moment before it passes.<br/>
            在它溜走之前，設計屬於你的時刻
          </motion.p>
        </div>
      </div>
    </section>
  );
} 