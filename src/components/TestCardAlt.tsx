"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type TestCardAltProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  href?: string;
  tag?: string;
  className?: string;
  style?: React.CSSProperties;
  onReadMore?: () => void;
};

export default function TestCardAlt({ title, subtitle, imageSrc, href, tag, className, style, onReadMore }: TestCardAltProps) {
  const body = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl border border-black/10 bg-[#0f1a46] text-white ${className ?? ""}`}
      style={style}
    >
      <div className="absolute inset-0">
        <Image src={imageSrc} alt={title} fill sizes="(min-width:1024px) 50vw, 100vw" style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors" />
      </div>

      <div className="relative flex flex-col justify-center h-full min-h-[200px] md:min-h-[250px]">
        <div className="p-5 md:p-6 text-center">
          {tag && (
            <span className="inline-block text-xs font-bold tracking-wide text-[#FFFFF3] bg-[#003EC3] px-2 py-1 rounded mb-3">{tag}</span>
          )}
          <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-zpix), monospace' }}>{title}</h3>
          {subtitle && <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-2xl mx-auto mb-4">{subtitle}</p>}
          <div className="mt-4">
            <button
              onClick={onReadMore}
              className="inline-block px-4 py-2 font-bold text-sm transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
                border: '1px solid #808080',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#404040',
                borderBottomColor: '#404040',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040',
                color: '#000000',
                textShadow: '1px 1px 0px #ffffff',
                cursor: 'pointer',
                fontFamily: 'var(--font-zpix), monospace'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = 'inset -1px -1px 0px #ffffff, inset 1px 1px 0px #404040';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #404040';
              }}
            >
              閱讀更多
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {body}
      </a>
    );
  }
  return body;
} 