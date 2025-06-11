/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 🔹 모든 React 컴포넌트에서 Tailwind 클래스 사용 가능
  ],
  theme: {
    extend: {
      keyframes: {
        // 🔹 ChatMessageList.jsx, LoadingBalloon.jsx 에서 사용되는 등장 애니메이션 정의
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // 🔹 animate-fade-in: 요소가 위에서 부드럽게 나타나는 효과
        //    ⮕ ChatMessageList.jsx: 채팅 메시지 전체 fade-in
        //    ⮕ LoadingBalloon.jsx: 로딩 풍선 전체 fade-in
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
