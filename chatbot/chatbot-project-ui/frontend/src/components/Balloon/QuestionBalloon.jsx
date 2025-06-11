import React from 'react';

function QuestionBalloon({ data, favorite, time }) {
  return (
    // 🔵 전체 말풍선 묶음: 오른쪽 정렬 + 우측 여백 + fade-in 애니메이션
    <div className="flex flex-col items-end mb-2 pr-3 animate-fade-in">
      {/* 🔵 말풍선 박스: 파란 배경 + 흰 글씨 + 둥근 테두리 */}
     <div className="bg-green-600 text-white p-3 sm:px-4 sm:py-2.5 rounded-2xl rounded-br-none text-sm sm:text-base leading-relaxed max-w-[75%] sm:max-w-[70%] break-words whitespace-pre-wrap shadow">
        <p className="m-0">{data}</p>
      </div>

      {/* 🔵 시간 표시 */}
      {time && (
        <div className="text-[12px] text-gray-500 mt-1 pr-1 text-right">
          {time}
        </div>
      )}

      {/* 🔵 즐겨찾기 마크 (별 표시) */}
      {favorite && (
        <div className="ml-2 text-yellow-400">★</div>
      )}
    </div>
  );
}

export default QuestionBalloon;
