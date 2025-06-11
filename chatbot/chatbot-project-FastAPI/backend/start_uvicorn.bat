@echo off
REM FastAPI 서버 실행 (윈도우용)
echo Starting FastAPI server...
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
pause