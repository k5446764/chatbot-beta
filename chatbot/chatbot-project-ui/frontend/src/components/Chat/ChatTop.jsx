import React from 'react';
import myIcon from '../../assets/logo_basic001.png';
import mascotIcon from '../../assets/mascot.png';


function ChatTop({ className }) {
  return (
    <header className={`flex items-center justify-center bg-[#fafafa] text-[#21556e] px-4 sm:px-5 py-[15px] sticky top-0 z-[1000] h-[60px] ${className || ''}`}>
      {/* 호원대 로고 */}
      <img src={myIcon} alt="호원대 로고" className="w-[120px] sm:w-[140px] h-auto mr-2" />
      
      {/* 제목 텍스트 */}
      <h1 className="font-bold text-[20px] sm:text-[22px] leading-none text-[#1e774b]">
        챗봇 미소
      </h1>
      <img src={mascotIcon} alt="마스코트" className="w-[40px] sm:w-[50px] h-auto ml-1" />
    </header>
  );
}

export default ChatTop;