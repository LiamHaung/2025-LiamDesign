'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AboutLiamTagProps {
  className?: string;
  animated?: boolean;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  text?: string;
}

export default function AboutLiamTag({ 
  className = '', 
  animated = true,
  backgroundColor = '#003EC3',
  textColor = '#FFFFF3',
  fontSize = 'clamp(16px, 3vw, 32px)',
  text = '#設計 #品牌 #視覺 #陪你一起長大'
}: AboutLiamTagProps) {
  const tagContent = (
    <div 
      style={{
        textAlign: 'left', // 改為左對齊
        fontFamily: 'var(--font-zpix), monospace',
        maxWidth: '100%',
        padding: '0',
        width: '100%',
        boxSizing: 'border-box'
      }}
      className={className}
    >
      <div style={{
        fontSize: `calc(${fontSize} * 0.8)`, // 縮小80%
        fontWeight: 'bold',
        color: textColor,
        backgroundColor: backgroundColor,
        display: 'inline-block',
        padding: '6px 12px', // 稍微調整內距
        borderRadius: '6px',
        letterSpacing: '1px',
        lineHeight: '1.4',
        wordBreak: 'break-word',
        whiteSpace: 'normal'
      }}>
        {text}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {tagContent}
      </motion.div>
    );
  }

  return tagContent;
}
