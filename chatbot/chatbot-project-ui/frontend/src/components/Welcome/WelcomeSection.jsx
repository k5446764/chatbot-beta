import React from 'react';
import IconBalloon from './IconBalloon';
import CardMenu from './CardMenu';

export default function WelcomeSection({ onSelect }) {
  return (
    <div className="flex flex-col items-start w-full px-4 md:px-6 gap-4">
      
      {/* 마스코트 + 말풍선 (스크롤과 함께 이동) */}
      <div className="w-full">
        <IconBalloon />
      </div>

      {/* 카드 메뉴 ((스크롤 시 상단에 고정됨) sticky ) */}
      <div className="w-full sticky top-[64px] z-30 bg-white  rounded-md">
        {/* top-[64px]는 헤더 높이에 따라 조절 */}
        <CardMenu onSelect={onSelect} />
      </div>

    </div>
  );
}
