import React from 'react';
import mascotImg from '../../assets/mascot.png';
import './IconBalloon.css';

export default function IconBalloon({ text }) {
  const defaultText = [
    '안녕하세요!',
    '호원대학교 챗봇 미소입니다🐂',
    '대학 및 대학원 학사 정보, IT서비스, 대학생활원, 장학금 등에 대해 안내해드릴게요!😉'
  ];

  const lines = text ? text.split('\n') : defaultText;

  return (
    <div className="icon_balloon_container">
      <img src={mascotImg} alt="마스코트" className="mascot_image" />
      <div className="text_speech_bubble">
        {lines.map((line, idx) => (
          <p key={idx} style={{ margin: 0, padding: 0 }}>{line}</p>
        ))}
      </div>
    </div>
  );
}
