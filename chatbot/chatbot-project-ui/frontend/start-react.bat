@echo off
cd /d %~dp0
cd frontend
call conda activate react
npm start
