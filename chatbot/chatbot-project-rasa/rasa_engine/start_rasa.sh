#!/bin/bash
# Rasa 서버 실행 스크립트 (API 모드, 모든 CORS 허용)

echo "🚀 Rasa 서버 실행 중 (http://localhost:5005)"
pip install -r  requirements.txt
rasa run --enable-api --cors "*" 
