#!/bin/bash
# FastAPI 서버 실행 (리눅스/WSL/macOS)

echo "Starting FastAPI server on http://0.0.0.0:8000 ..."
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 
