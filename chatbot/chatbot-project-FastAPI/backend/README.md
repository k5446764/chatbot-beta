🔸 1 MySQL 설치 (처음 1회만)

sudo apt update
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql

🔸 2 MySQL root 비밀번호 설정

sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;
EXIT;

🔸 3 .env 파일 작성
DB_USER=chatuser
DB_PASSWORD=chatuser123!
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aichat

🔸 4 DB 스키마 생성 + 사용자 권한 부여 + 초기 데이터 삽입
# 실행 권한 부여 (처음 1회만)
chmod +x init.sh
# 자동화 실행 (root → chatuser 순서 자동)
./init.sh
# root패스워드 입력
# chatuser 패스워드 입력
# chatuser 패스워드 입력

🔸 5 FastAPI 실행
 # 실행 권한 부여 (처음 1회만)
chmod +x start_uvicorn.sh

./start_uvicorn.sh &