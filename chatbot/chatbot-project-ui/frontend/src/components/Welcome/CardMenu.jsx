// src/components/Welcome/CardMenu.jsx

import React from 'react';
import MainCardMenu from '../Menu/MainCardMenu';

export default function CardMenu({ onSelect }) {
  return (
    // ▼ 수정된 부분: min-w-[600px] 제거, px 값도 반응형 대응을 위해 제거하거나 조정
    <div className="w-full mx-auto">
      {/* 카드 메뉴 */}
      <MainCardMenu onSelect={onSelect} />
    </div>
  );
}