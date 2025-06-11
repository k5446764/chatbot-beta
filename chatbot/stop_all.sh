#!/bin/bash
# 모든 서버 종료 스크립트

# 백엔드 서버 종료 (FastAPI)
echo "백엔드 서버 종료 중..."
pkill -f 'uvicorn'

# Rasa 서버 종료
echo "Rasa 서버 종료 중..."
pkill -f 'rasa'

# 프론트엔드 서버 종료 (React)
echo "프론트엔드 서버 종료 중..."
pkill -f 'node'

echo "모든 서버가 종료되었습니다."

