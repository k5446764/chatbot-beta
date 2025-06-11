// src/components/Chat/ChatBottom.js
import React, { useState } from 'react';

function ChatBottom({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex p-2 sm:p-3 border-t border-gray-300 bg-white sticky bottom-0 z-10">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-[#2f6e8d] transition-colors duration-300"
        placeholder="메시지를 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {/* ▼ 수정된 부분: 버튼 패딩을 반응형으로 미세 조정 */}
      <button
        className="ml-2 px-3 sm:px-4 py-2 bg-[#2f6e8d] text-white rounded-full text-sm hover:bg-[#1f4e6d] transition-colors duration-200"
        onClick={handleSend}
      >
        전송
      </button>
    </div>
  );
}

export default ChatBottom;