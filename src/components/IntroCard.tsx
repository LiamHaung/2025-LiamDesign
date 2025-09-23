'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'minimal' | 'detailed' | 'retro98';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function IntroCard({
  title,
  subtitle,
  description,
  imageUrl,
  buttonText = "了解更多",
  onButtonClick,
  variant = 'default',
  size = 'medium',
  animated = true,
  className = '',
  style = {}
}: IntroCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg'
  };

  const variantStyles = {
    default: {
      card: 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl',
      title: 'text-2xl font-bold text-gray-800',
      subtitle: 'text-lg text-blue-600 font-medium',
      description: 'text-gray-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    minimal: {
      card: 'bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md',
      title: 'text-xl font-semibold text-gray-700',
      subtitle: 'text-base text-blue-500',
      description: 'text-gray-500 text-sm',
      button: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
    },
    detailed: {
      card: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-xl hover:shadow-2xl',
      title: 'text-3xl font-bold text-gray-800',
      subtitle: 'text-xl text-blue-600 font-semibold',
      description: 'text-gray-700 text-lg',
      button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
    },
    retro98: {
      card: 'bg-gray-300 border-4 border-gray-400 shadow-lg hover:shadow-xl',
      title: 'text-2xl font-bold text-black',
      subtitle: 'text-lg text-blue-800 font-bold',
      description: 'text-black text-base',
      button: 'bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-400 font-bold'
    }
  };

  const currentVariant = variantStyles[variant];

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${sizeClasses[size]} ${currentVariant.card} rounded-xl p-6 transition-all duration-300 ${className}`}
          style={style}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {/* Image Section */}
          {imageUrl && (
            <motion.div 
              className="mb-4"
              variants={itemVariants}
            >
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </motion.div>
          )}

          {/* Content Section */}
          <div className="space-y-4">
            {/* Title */}
            <motion.h2 
              className={currentVariant.title}
              variants={itemVariants}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.h3 
              className={currentVariant.subtitle}
              variants={itemVariants}
            >
              {subtitle}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className={currentVariant.description}
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {/* Button */}
            {buttonText && onButtonClick && (
              <motion.button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentVariant.button}`}
                onClick={onButtonClick}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {buttonText}
              </motion.button>
            )}
          </div>

          {/* Decorative Elements */}
          {variant === 'detailed' && (
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 bg-blue-200 rounded-full opacity-50"
              variants={itemVariants}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Windows 98 Style Decorative Elements */}
          {variant === 'retro98' && (
            <>
              {/* Top-left corner decoration */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-gray-400 border-2 border-gray-500"></div>
              {/* Top-right corner decoration */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-gray-400 border-2 border-gray-500"></div>
              {/* Bottom-left corner decoration */}
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-gray-400 border-2 border-gray-500"></div>
              {/* Bottom-right corner decoration */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-400 border-2 border-gray-500"></div>
              
              {/* Animated pixel pattern */}
              <motion.div
                className="absolute top-6 right-6"
                variants={itemVariants}
                animate={{ 
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${
                        i % 2 === 0 ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
