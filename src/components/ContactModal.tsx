'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactLiam from './ContactLiam';
import PricingTable from './PricingTable';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'contact' | 'pricing' | null;
}

export default function ContactModal({ isOpen, onClose, type }: ContactModalProps) {
  // 鎖定背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !type) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ backgroundColor: '#003EC3', zIndex: 9999 }} // 純品牌藍，無透明度
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* 彈出視窗內容 */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {type === 'contact' && <ContactLiam onClose={onClose} />}
              {type === 'pricing' && <PricingTable onClose={onClose} />}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
