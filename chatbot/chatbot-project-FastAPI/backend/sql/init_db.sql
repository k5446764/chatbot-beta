-- init_db.sql

-- 1️⃣ 기존 DB 삭제 (주의: 모든 데이터 삭제됨)
DROP DATABASE IF EXISTS aichat;

-- 2️⃣ 새 DB 생성
CREATE DATABASE aichat
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 3️⃣ 사용할 DB 선택
USE aichat;

-- 4️⃣ 테이블 생성

-- chat_logs 테이블
CREATE TABLE chat_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT,
    answer TEXT,
    intent VARCHAR(100),
    category VARCHAR(100),
    confidence FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- intents 테이블
CREATE TABLE intents (
    intent VARCHAR(100) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    description TEXT
);

-- feedback 테이블
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_log_id INT,
    score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
    feedback_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_log_id) REFERENCES chat_logs(id)
    ON DELETE CASCADE
);

-- training_data 테이블
CREATE TABLE training_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    intent VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 5️⃣ (선택) chatuser 계정 생성 및 권한 부여 (root로 실행 시 가능)
-- 주석 해제 후 사용 가능

CREATE USER IF NOT EXISTS 'chatuser'@'localhost' IDENTIFIED BY 'chatuser123!';
GRANT SELECT, INSERT, UPDATE, DELETE ON aichat.* TO 'chatuser'@'localhost';
FLUSH PRIVILEGES;
