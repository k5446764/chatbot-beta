import React from 'react';

function LoadingBalloon({ uiTexts }) {
  return (
    // 🔵 fade-in 애니메이션: 컴포넌트 전체가 부드럽게 나타남
    <div className="flex items-center mb-2 animate-fade-in">
      {/* 🔵 bounce 애니메이션: 파란 점이 위아래로 튐 */}
      <span className="w-2.5 h-2.5 bg-blue-300 rounded-full mr-2 animate-bounce"></span>

      {/* 🔵 텍스트는 작고 회색, 기울임체 */}
      <span className="text-sm text-gray-500 italic">
        {uiTexts?.loading || "로딩 중..."}
      </span>
    </div>
  );
}

export default LoadingBalloon;
