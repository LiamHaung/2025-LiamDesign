'use client';
import React, { useState } from 'react';

interface ContactFormProps {
  width?: string;
  height?: string;
  windowTitle?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  width = "500px",
  height = "450px",
  windowTitle = "聯絡表單.exe",
  onMinimize,
  onMaximize,
  onClose,
  isMinimized = false,
  isMaximized = false,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    message: '',
    chatType: 'business' // business 或 casual
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 模擬發送郵件 (之後會整合 EmailJS)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('表單資料:', formData);
      
      setSubmitSuccess(true);
      // 3秒後重置表單
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          clientName: '',
          email: '',
          message: '',
          chatType: 'business'
        });
      }, 3000);
      
    } catch {
      setSubmitError('發送失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`contact-form ${className}`}
      style={{
        width,
        height: isMinimized ? 'auto' : height,
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
        fontFamily: 'var(--font-zpix), var(--font-press-start-2p), monospace',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* 標題列 */}
      <div style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'move'
      }}>
        <div className="flex items-center space-x-2">
          <div style={{
            width: '16px',
            height: '16px',
            background: 'white',
            border: '1px inset #c0c0c0'
          }}></div>
          <span>{windowTitle}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2px' }}>
          <button 
            onClick={onMinimize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >_</button>
          <button 
            onClick={onMaximize}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >{isMaximized ? '🗗' : '□'}</button>
          <button 
            onClick={onClose}
            style={{
              width: '16px',
              height: '14px',
              background: '#c0c0c0',
              border: '1px outset #c0c0c0',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              (e.target as HTMLElement).style.border = '1px inset #c0c0c0';
            }}
            onMouseUp={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.border = '1px outset #c0c0c0'}
          >×</button>
        </div>
      </div>

      {/* 表單內容 - 只在非最小化時顯示 */}
      {!isMinimized && (
        <div 
          style={{
            flex: 1,
            padding: '16px',
            background: '#f0f0f0',
            border: '2px inset #c0c0c0',
            margin: '2px',
            overflow: 'auto',
            cursor: 'default'
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {submitSuccess ? (
            // 成功提示
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>✅</div>
              <div style={{ 
                fontSize: '14px', 
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                謝謝您的來信！
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: '#666',
                lineHeight: '1.4'
              }}>
                我們已收到您的訊息，<br/>
                會盡快回覆您。
              </div>
            </div>
          ) : (
            // 表單內容
            <form onSubmit={handleSubmit}>
              {/* 基本資訊 */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  基本資訊
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                                     <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px', color: '#000' }}>
                     姓名 *
                   </label>
                                     <input
                     type="text"
                     name="clientName"
                     value={formData.clientName}
                     onChange={handleInputChange}
                     required
                     style={{
                       width: '100%',
                       padding: '4px',
                       fontSize: '11px',
                       border: '1px inset #c0c0c0',
                       background: 'white',
                       color: '#000',
                       cursor: 'text'
                     }}
                     onMouseDown={(e) => e.stopPropagation()}
                   />
                </div>

                <div style={{ marginBottom: '8px' }}>
                                     <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px', color: '#000' }}>
                     Email *
                   </label>
                                     <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
                     style={{
                       width: '100%',
                       padding: '4px',
                       fontSize: '11px',
                       border: '1px inset #c0c0c0',
                       background: 'white',
                       color: '#000',
                       cursor: 'text'
                     }}
                     onMouseDown={(e) => e.stopPropagation()}
                   />
                </div>

                
              </div>

              {/* 需求類型 */}
              <div style={{ marginBottom: '16px' }}>
                                 <div style={{ 
                   fontSize: '12px', 
                   fontWeight: 'bold', 
                   marginBottom: '8px',
                   color: '#000'
                 }}>
                   聯絡類型
                 </div>
                
                <div style={{ marginBottom: '8px' }}>
                                     <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px', color: '#000' }}>
                     類型
                   </label>
                                     <select
                     name="chatType"
                     value={formData.chatType}
                     onChange={handleInputChange}
                     style={{
                       width: '100%',
                       padding: '4px',
                       fontSize: '11px',
                       border: '1px inset #c0c0c0',
                       background: 'white',
                       color: '#000',
                       cursor: 'pointer'
                     }}
                     onMouseDown={(e) => e.stopPropagation()}
                   >
                    <option value="business">設計案洽談</option>
                    <option value="casual">純聊天交流</option>
                  </select>
                </div>

                                 <div style={{ marginBottom: '16px' }}>
                   <label style={{ fontSize: '10px', display: 'block', marginBottom: '4px', color: '#000' }}>
                     訊息內容 *
                   </label>
                   <textarea
                     name="message"
                     value={formData.message}
                     onChange={handleInputChange}
                     required
                     rows={5}
                     style={{
                       width: '100%',
                       padding: '4px',
                       fontSize: '11px',
                       border: '1px inset #c0c0c0',
                       background: 'white',
                       color: '#000',
                       resize: 'vertical',
                       cursor: 'text'
                     }}
                     placeholder="請告訴我們您的需求或想說的話..."
                     onMouseDown={(e) => e.stopPropagation()}
                   />
                 </div>
              </div>

              {/* 按鈕 */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                justifyContent: 'center' 
              }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '6px 16px',
                    fontSize: '11px',
                    background: isSubmitting ? '#999' : '#c0c0c0',
                    border: '2px outset #c0c0c0',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    fontFamily: 'inherit'
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    if (!isSubmitting) {
                      (e.target as HTMLElement).style.border = '2px inset #c0c0c0';
                    }
                  }}
                  onMouseUp={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
                >
                  {isSubmitting ? '寄送中...' : '📤 送出郵件'}
                </button>
                
                <button
                  type="button"
                                     onClick={() => setFormData({
                     clientName: '',
                     email: '',
                     message: '',
                     chatType: 'business'
                   })}
                  style={{
                    padding: '6px 16px',
                    fontSize: '11px',
                    background: '#c0c0c0',
                    border: '2px outset #c0c0c0',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    (e.target as HTMLElement).style.border = '2px inset #c0c0c0';
                  }}
                  onMouseUp={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.border = '2px outset #c0c0c0'}
                >
                  🗑️ 清除
                </button>
              </div>

              {submitError && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px',
                  background: '#ffcccc',
                  border: '1px solid #ff6666',
                  fontSize: '10px',
                  color: '#cc0000',
                  textAlign: 'center'
                }}>
                  {submitError}
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactForm; 