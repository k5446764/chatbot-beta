// src/components/Balloon/BasicCard.jsx

import React from 'react';

function BasicCard({ title, description, button }) {
  return (
    // ▼ 수정: 전체적인 디자인 개선 및 반응형 너비 설정
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 w-full max-w-sm sm:max-w-md mx-auto animate-fade-in my-2">
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-base sm:text-lg text-gray-900">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mt-1">{description}</p>
      </div>
      {button && (
        <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-200">
          <a
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            // ▼ 수정: 버튼 스타일 및 반응형 텍스트 크기
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            {button.label}
          </a>
        </div>
      )}
    </div>
  );
}

export default BasicCard;