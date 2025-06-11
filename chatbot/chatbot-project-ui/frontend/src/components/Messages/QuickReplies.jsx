// src/components/Messages/QuickReplies.jsx

import React from 'react';
// import './QuickReplies.css'; // <-- 이 줄 삭제

function QuickReplies({ quickReplies, onSend }) { // props 이름 수정: quickReplies -> onSend
  return (
    // ▼ 수정: Tailwind CSS로 전체 재작성. flex-wrap으로 자동 줄바꿈
    <div className="flex flex-wrap justify-start gap-2 mt-2 animate-fade-in">
      {quickReplies.map((reply, idx) => (
        <button
          key={idx}
          // quickReplies의 데이터 구조에 맞게 onClick 핸들러 수정
          onClick={() => onSend(reply.value || reply.message)} 
          // ▼ 수정: Tailwind CSS로 버튼 스타일링
          className="bg-white border border-blue-500 text-blue-500 px-3 py-1.5 rounded-full text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}

export default QuickReplies;