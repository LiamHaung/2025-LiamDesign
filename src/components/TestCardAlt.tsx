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
};

export default function TestCardAlt({ title, subtitle, imageSrc, href, tag, className, style }: TestCardAltProps) {
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

      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0">
        <div className="md:col-span-3 p-5 md:p-6">
          {tag && (
            <span className="inline-block text-xs font-bold tracking-wide text-[#FFFFF3] bg-[#003EC3] px-2 py-1 rounded mb-3">{tag}</span>
          )}
          <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-zpix), monospace' }}>{title}</h3>
          {subtitle && <p className="text-sm md:text-base mt-2 text-white/85 leading-relaxed max-w-prose">{subtitle}</p>}
          <div className="mt-4">
            <span className="inline-block bg-white text-[#003EC3] border border-[#003EC3] px-4 py-2 rounded-md font-bold text-sm group-hover:bg-[#3aaf3a] group-hover:text-[#FFFFF3] group-hover:border-[#3aaf3a] transition-colors">閱讀更多</span>
          </div>
        </div>
        <div className="md:col-span-2 min-h-[180px] md:min-h-[220px]" />
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