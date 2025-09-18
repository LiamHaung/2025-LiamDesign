"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type TestCardProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  className?: string;
  style?: React.CSSProperties;
};

export default function TestCard({ title, subtitle, imageSrc, href, tags, className, style }: TestCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-xl overflow-hidden border border-[#FFFFF3] bg-white/80 backdrop-blur-sm transition-all duration-300 ${className ?? ""}`}
      style={style}
    >
      <div className="relative w-full pt-[62%] bg-[#f6f7fb]">
        <Image src={imageSrc} alt={title} fill priority={false} sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 pointer-events-none group-hover:ring-2 group-hover:ring-[#003EC3] group-hover:ring-offset-2 group-hover:ring-offset-[#FFFFF3] transition-all" />
      </div>
      <div className="p-4">
        <div className="text-sm text-[#003EC3] font-bold tracking-wide mb-1">{tags?.join(" · ")}</div>
        <h3 className="text-xl font-bold text-black" style={{ fontFamily: 'var(--font-zpix), monospace' }}>{title}</h3>
        {subtitle && <p className="text-gray-600 mt-2 text-sm leading-relaxed">{subtitle}</p>}
        <div className="mt-4">
          <span className="inline-block bg-white text-[#003EC3] border border-[#003EC3] px-4 py-2 rounded-md font-bold text-sm group-hover:bg-[#3aaf3a] group-hover:text-[#FFFFF3] group-hover:border-[#3aaf3a] transition-colors">閱讀更多</span>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
} 