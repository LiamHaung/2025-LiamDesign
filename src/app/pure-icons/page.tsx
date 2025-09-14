'use client';
import React from 'react';
import IconSlotMachine from '../../components/IconSlotMachine';

export default function PureIconsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* 純粹的三個圖標老虎機動畫 */}
      <IconSlotMachine
        icons={['🔥', '⚙️', '🧠']}
      />
    </div>
  );
}
