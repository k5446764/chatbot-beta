// src/components/Balloon/SimpleText.jsx

import React from 'react';
import botIcon from '../../assets/mascot.png'; // 봇 아이콘 추가

function SimpleText({ text, time }) {
  return (
    // ▼ 수정: 아이콘, 말풍선, 시간을 나란히 배치하기 위해 flex 구조 변경
    <div className="flex items-end gap-2 animate-fade-in">
      {/* 봇 아이콘 */}
      <img src={botIcon} alt="봇 아이콘" className="w-8 h-8 rounded-full flex-shrink-0" />

      {/* 말풍선 박스 */}
      {/* ▼ 수정: 배경색 변경 및 반응형 패딩/텍스트 크기 적용 */}
      <div className="bg-white text-gray-800 p-3 sm:px-4 sm:py-2.5 rounded-2xl rounded-bl-none text-sm sm:text-base leading-relaxed max-w-[75%] sm:max-w-[70%] break-words whitespace-pre-wrap border border-gray-200 shadow-sm">
        {/* dangerouslySetInnerHTML을 사용하면 HTML 태그를 텍스트에 직접 사용할 수 있습니다. */}
        <p className="m-0" dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      {/* 시간 표시 */}
      {time && (
        <div className="text-[11px] sm:text-xs text-gray-500 flex-shrink-0 pb-1">{time}</div>
      )}
    </div>
  );
}

export default SimpleText;