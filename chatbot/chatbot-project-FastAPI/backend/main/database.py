# SQLAlchemy 및 날짜 관련 라이브러리 불러오기
from sqlalchemy import create_engine, Column, Integer, Text, DateTime, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
from dotenv import load_dotenv
import os

# .env 파일 로딩
load_dotenv()

# 환경변수에서 DB 접속 정보 읽기
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# 데이터베이스 관련 기능을 관리하는 클래스
class DatabaseManager:
    def __init__(self):
        # 데이터베이스 접속 URL 설정 (MySQL + pymysql 사용)
        self.SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        self.engine = create_engine(self.SQLALCHEMY_DATABASE_URL, echo=True)

        # 세션 생성기 정의
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

        # 모델 클래스 베이스 정의
        self.Base = declarative_base()

        # 테이블 정의
        self.define_models()

        # 실제 데이터베이스에 테이블 생성
        self.Base.metadata.create_all(bind=self.engine)

    # 데이터베이스 테이블 모델 정의
    def define_models(self):
        # 대화 로그 테이블
        class ChatLog(self.Base):
            __tablename__ = "chat_logs"
            id = Column(Integer, primary_key=True, index=True)
            question = Column(Text, nullable=False)
            answer = Column(Text, nullable=False)
            intent = Column(Text, nullable=True)
            category = Column(Text, nullable=True)
            confidence = Column(Float, nullable=True)
            created_at = Column(DateTime, default=datetime.utcnow)

        # 인텐트-카테고리 매핑 테이블
        class IntentCategory(self.Base):
            __tablename__ = "intents"
            intent = Column(String(100), primary_key=True)
            category = Column(Text, nullable=False)
            description = Column(Text, nullable=True)

        # 피드백 테이블
        class Feedback(self.Base):
            __tablename__ = "feedback"
            id = Column(Integer, primary_key=True, index=True)
            chat_log_id = Column(Integer, nullable=True)  # 외래키는 명시적으로 설정하지 않음
            score = Column(Integer, nullable=False)
            feedback_text = Column(Text, nullable=True)
            created_at = Column(DateTime, default=datetime.utcnow)

        # 훈련 데이터 테이블
        class TrainingData(self.Base):
            __tablename__ = "training_data"
            id = Column(Integer, primary_key=True, index=True)
            intent = Column(String(100), nullable=False)
            question = Column(Text, nullable=False)
            answer = Column(Text, nullable=False)

        # 클래스 속성에 모델 할당
        self.ChatLog = ChatLog
        self.IntentCategory = IntentCategory
        self.Feedback = Feedback
        self.TrainingData = TrainingData

    # DB 세션 생성기 (FastAPI에서 의존성 주입에 사용)
    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    # 대화 로그 생성
    def create_log(self, db: Session, question: str, answer: str, intent: str = None, category: str = None, confidence: float = None):
        # 새로운 대화 데이터가 들어왔을 때 intent가 NULL로 나오는 것 방지
        if not category and intent:
            category_obj = db.query(self.IntentCategory).filter(self.IntentCategory.intent == intent).first()
            if category_obj:
                category = category_obj.category

        log = self.ChatLog(
            question=question,
            answer=answer,
            intent=intent,
            category=category,
            confidence=confidence
        )
        db.add(log)
        db.commit()
        db.refresh(log)
        return log

    # 훈련 데이터 추가
    def add_training_data(self, db: Session, intent: str, question: str, answer: str):
        training_data = self.TrainingData(intent=intent, question=question, answer=answer)
        db.add(training_data)
        db.commit()
        db.refresh(training_data)
        return training_data

    # 훈련 데이터 조회
    def get_training_data(self, db: Session):
        return db.query(self.TrainingData).all()

    # 훈련 데이터 수정
    def update_training_data(self, db: Session, data_id: int, intent: str, question: str, answer: str):
        training_data = db.query(self.TrainingData).filter(self.TrainingData.id == data_id).first()
        if training_data:
            training_data.intent = intent
            training_data.question = question
            training_data.answer = answer
            db.commit()
            db.refresh(training_data)
        return training_data

    # 훈련 데이터 삭제
    def delete_training_data(self, db: Session, data_id: int):
        training_data = db.query(self.TrainingData).filter(self.TrainingData.id == data_id).first()
        if training_data:
            db.delete(training_data)
            db.commit()
        return training_data

    # 전체 로그 조회
    def get_logs(self, db: Session):
        return db.query(self.ChatLog).all()

    # 특정 로그 조회
    def get_log(self, db: Session, log_id: int):
        return db.query(self.ChatLog).filter(self.ChatLog.id == log_id).first()

    # 로그 수정
    def update_log(self, db: Session, log_id: int, question: str, answer: str):
        log = db.query(self.ChatLog).filter(self.ChatLog.id == log_id).first()
        if log:
            log.question = question
            log.answer = answer
            db.commit()
            db.refresh(log)
        return log

    # 로그 삭제
    def delete_log(self, db: Session, log_id: int):
        log = db.query(self.ChatLog).filter(self.ChatLog.id == log_id).first()
        if log:
            db.delete(log)
            db.commit()
        return log

    # 인텐트에 해당하는 카테고리 정보 조회
    def get_category_by_intent(self, db: Session, intent: str):
        return db.query(self.IntentCategory).filter(self.IntentCategory.intent == intent).first()

    # 월별 카테고리 통계 조회
    def get_monthly_category_stats(self, db: Session):
        from sqlalchemy import func

        results = (
            db.query(
                func.date_format(self.ChatLog.created_at, "%Y-%m").label("month"),
                self.ChatLog.category,
                func.count().label("count")
            )
            .filter(self.ChatLog.created_at != None)
            .group_by("month", self.ChatLog.category)
            .order_by("month", self.ChatLog.category)
            .all()
        )
        return results

    # 최근 n개월 간 카테고리 통계 조회
    def get_category_stats_by_period(self, db: Session, months: int):
        from sqlalchemy import func
        from datetime import datetime, timedelta

        now = datetime.utcnow()
        start_date = now - timedelta(days=30 * months)

        results = (
            db.query(
                func.date_format(self.ChatLog.created_at, "%Y-%m").label("month"),
                self.ChatLog.category,
                func.count().label("count")
            )
            .filter(self.ChatLog.created_at >= start_date)
            .group_by("month", self.ChatLog.category)
            .order_by("month", self.ChatLog.category)
            .all()
        )
        return results

    # 피드백 생성
    def create_feedback(self, db: Session, chat_log_id: int, score: int, feedback_text: str = None):
        feedback = self.Feedback(
            chat_log_id=chat_log_id,
            score=score,
            feedback_text=feedback_text
        )
        db.add(feedback)
        db.commit()
        db.refresh(feedback)
        return feedback

    # 전체 피드백 조회
    def get_feedbacks(self, db: Session):
        return db.query(self.Feedback).all()


db_manager = DatabaseManager()

Intent = db_manager.IntentCategory
ChatLog = db_manager.ChatLog
TrainingData = db_manager.TrainingData
