// src/components/Welcome/WelcomeSection2.jsx
import React from 'react';
import IconBalloon from './IconBalloon';
import CardMenu from './CardMenu';

export default function WelcomeSection2({ onSelect }) {
  return (
   <div className="flex flex-col items-start w-full px-4 md:px-1">
      {/* 왼쪽 컬럼: 마스코트 및 환영 메시지 (IconBalloon) */}
      <div className="md:w-1/3 flex-shrink-0 flex justify-center md:justify-start">
        <IconBalloon
          text={
            '질문을 기다리고 있습니다! 😊\n' +
            '어떻게 질문해야할지 모르겠다면, 아래 버튼을 눌러서 간단하게 정보를 살펴볼 수도 있어요 😉'
          }
        />
      </div>

      {/* 오른쪽 컬럼: 자주 찾는 질문 카드 메뉴 (CardMenu) */}
     <div className="w-full">
        <CardMenu onSelect={onSelect} />
      </div>
    </div>
  );
}