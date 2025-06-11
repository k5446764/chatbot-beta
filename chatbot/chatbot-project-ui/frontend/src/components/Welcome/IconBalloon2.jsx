// src/components/Welcome/IconBalloon2.jsx
import React from 'react';
import icon3 from '../../assets/icon3.png';
import mascotImg from '../../assets/mascot.png';
import './IconBalloon.css';

/**
 * props:
 *  - text: 말풍선에 표시할 문자열 (문자열이 없으면 기본 3줄 메시지 사용)
 */
export default function IconBalloon2({ text }) {
  // 기본 말풍선 메시지(3줄짜리 배열). text prop이 없을 때 사용됩니다.
  const defaultText = [
    '궁금한 점은 전부 해결되었나요?',
    '질문을 기다리고 있습니다! 😊',
    '어떻게 질문해야할지 모르겠다면, 아래 버튼을 눌러서 간단하게 정보를 살펴볼 수도 있어요 😉'
  ];

  // text prop이 있으면 한 줄짜리 배열로, 없으면 defaultText 선택
  const lines = text ? [text] : defaultText;

  return (
    <div className="welcome_wrap">
      {/* 아이콘 버튼 영역 (필요하다면 아이콘3 등을 넣으세요) */}
      <div className="icon_button_wrap">
        {/* 예: <img src={icon3} alt="아이콘" /> */}
      </div>

      {/* 말풍선 + 마스코트 */}
      <div className="welcome_bubble">
        <img src={mascotImg} alt="마스코트" className="mascot_img" />
        <div className="welcome_header">
          {lines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
