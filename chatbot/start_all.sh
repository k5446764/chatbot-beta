#!/bin/bash

# 백엔드 서버 실행
cd ~/chatbot/chatbot-project-FastAPI/backend
chmod +x ./start_uvicorn.sh
./start_uvicorn.sh &

# Rasa 서버 실행
cd ~/chatbot/chatbot-project-rasa/rasa_engine
chmod +x ./start_rasa.sh
./start_rasa.sh &

# 프론트엔드 서버 실행
cd ~/chatbot/chatbot-project-ui/frontend
chmod +x ./start_react.sh
./start_react.sh &
