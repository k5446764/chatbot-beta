#!/bin/bash
# React 프로젝트 프론트엔드 실행 스크립트 (리눅스/macOS용)
# 패키지 설치 + 개발 서버 실행

set -e  # 에러 발생 시 즉시 종료

echo "📦 npm install (기본 패키지 설치 중)..."
npm install

echo "📦 추가 패키지 설치 중..."

# TailwindCSS 관련
npm install -D tailwindcss postcss autoprefixer

# Routing, Chart
npm install react-router-dom recharts

# Icon
npm install react-icons @heroicons/react

# Animation
npm install framer-motion react-spring react-transition-group

# Material UI
npm install @mui/material @emotion/react @emotion/styled

# Ant Design
npm install antd

# Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Styled Components
npm install styled-components

# Swipe Gesture
npm install react-swipeable

npm install styled-components

npm install react-icons

npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install -g serve


echo "🚀 개발 서버 실행 중..."
npm start

