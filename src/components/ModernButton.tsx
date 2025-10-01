'use client';
import React from 'react';
import { motion } from 'framer-motion';

export interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  style,
  type = 'button',
}) => {
  // 基礎樣式
  const baseStyles = {
    fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    outline: 'none',
    ...(fullWidth && { width: '100%' }),
  };

  // 尺寸樣式
  const sizeStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: '12px',
      minHeight: '32px',
    },
    md: {
      padding: '12px 24px',
      fontSize: '14px',
      minHeight: '40px',
    },
    lg: {
      padding: '16px 32px',
      fontSize: '16px',
      minHeight: '48px',
    },
    xl: {
      padding: '20px 40px',
      fontSize: '18px',
      minHeight: '56px',
    },
  };

  // 變體樣式
  const variantStyles = {
    primary: {
      backgroundColor: '#003EC3',
      color: '#FFFFFF',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#002A8A',
        boxShadow: 'none',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: '#001F6B',
        transform: 'translateY(0)',
      },
    },
    secondary: {
      backgroundColor: '#ff8c00',
      color: '#FFFFFF',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#e67e00',
        boxShadow: 'none',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: '#cc6b00',
        transform: 'translateY(0)',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#003EC3',
      border: '2px solid #003EC3',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#003EC3',
        color: '#FFFFFF',
        boxShadow: 'none',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: '#002A8A',
        transform: 'translateY(0)',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#003EC3',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 62, 195, 0.1)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: 'rgba(0, 62, 195, 0.2)',
        transform: 'translateY(0)',
      },
    },
    danger: {
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#B91C1C',
        boxShadow: 'none',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        backgroundColor: '#991B1B',
        transform: 'translateY(0)',
      },
    },
  };

  // 禁用狀態樣式
  const disabledStyles = {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  };

  // 載入狀態樣式
  const loadingStyles = {
    cursor: 'not-allowed',
  };

  // 合併樣式
  const buttonStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(disabled && disabledStyles),
    ...(loading && loadingStyles),
    ...style,
  };

  // 懸停效果處理
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const button = e.currentTarget;
    button.style.transform = 'translateY(-1px)';
    if (variant === 'outline') {
      button.style.backgroundColor = '#003EC3';
      button.style.color = '#FFFFFF';
    } else if (variant === 'ghost') {
      button.style.backgroundColor = 'rgba(0, 62, 195, 0.1)';
    } else if (variant === 'secondary') {
      button.style.backgroundColor = '#e67e00';
    } else {
      button.style.backgroundColor = variantStyles[variant]['&:hover'].backgroundColor;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
    if (variant === 'outline') {
      button.style.backgroundColor = 'transparent';
      button.style.color = '#003EC3';
    } else if (variant === 'ghost') {
      button.style.backgroundColor = 'transparent';
    } else {
      button.style.backgroundColor = variantStyles[variant].backgroundColor;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
  };

  return (
    <motion.button
      type={type}
      className={className}
      style={buttonStyles as React.CSSProperties}
      onClick={disabled || loading ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {loading && (
        <motion.div
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </motion.button>
  );
};

export default ModernButton;
