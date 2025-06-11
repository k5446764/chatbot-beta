from fastapi import FastAPI, Request, HTTPException, Depends, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from main.database import DatabaseManager, Intent, ChatLog, TrainingData, db_manager
from main.chatbot import ChatbotManager
from sqlalchemy import func
from fastapi import Query
from sqlalchemy.orm import Session
from main.train_rasa import generate_nlu, generate_domain, generate_rules, rasa_train,restart_rasa_server  # train_rasa.py 모듈 임포트
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from main.auth import create_access_token, verify_password, fake_users_db 
from pydantic import BaseModel
from fastapi import BackgroundTasks
from datetime import datetime, timedelta




USE_DB = True

app = FastAPI(
    title="FastAPI main.py",
    description="Main",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if USE_DB:
    db_manager = DatabaseManager()
chatbot_manager = ChatbotManager()

# 훈련 데이터 요청 모델
class TrainingDataRequest(BaseModel):
    intent: str
    question: str
    answer: str


@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_msg = data.get("message", "")

    if not user_msg:
        raise HTTPException(status_code=400, detail="메시지 값이 필요합니다.")

    # Rasa NLU 분석
    nlu_result = await chatbot_manager.call_rasa_nlu(user_msg)
    rasa_response = await chatbot_manager.call_rasa_core("user", user_msg)

    outputs = []
    full_response_text = ""
    for msg in rasa_response:
        if "text" in msg:
            outputs.append({"type": "text", "content": msg["text"]})
            full_response_text += msg["text"] + " "

    log_id = None
    fallback = False
    recommendations = []

    # Fallback 처리: 의도 파악 실패 시
    if nlu_result.get("intent", {}).get("name") == "nlu_fallback":
        fallback = True

        # 트렌드 기반 의도 추천: 최근 24시간 동안 자주 묻힌 의도 추출
        if USE_DB:
            db = next(db_manager.get_db())

            # 최근 24시간 동안 자주 묻힌 의도를 추출
            time_threshold = datetime.now() - timedelta(hours=24)
            results = (
                db.query(db_manager.ChatLog.intent, func.count(db_manager.ChatLog.intent).label("count"))
                .filter(db_manager.ChatLog.created_at >= time_threshold)  # 최근 24시간 동안의 데이터
                .filter(db_manager.ChatLog.intent != "nlu_fallback")  # nlu_fallback 제외
                .filter(db_manager.ChatLog.intent != "nono")  # nono 제외
                .group_by(db_manager.ChatLog.intent)
                .order_by(func.random())  # 랜덤으로 정렬
                .limit(3)  # 랜덤하게 3개 의도
                .all()
            )

            # 상위 3개 의도 리스트
            top_intents = [r.intent for r in results]

            # 해당 intent에 대한 question을 training_data 테이블에서 랜덤으로 조회
            for intent in top_intents:
                # 각 의도에 대해 랜덤하게 question 하나만 가져오기
                training_data_result = (
                    db.query(db_manager.TrainingData.question)
                    .filter(db_manager.TrainingData.intent == intent)
                    .order_by(func.random())  # 랜덤으로 정렬
                    .first()  # 첫 번째 (랜덤한) 질문만 가져오기
                )

                if training_data_result:
                    recommendations.append(training_data_result.question)

            db.close()

        # 기본 fallback 응답 추가
        if not outputs:
            outputs.append({
                "type": "text",
                "content": "죄송해요, 잘 이해하지 못했어요. 이런 질문도 할 수 있어요!"
            })

    # 로그 기록
    if USE_DB:
        db = next(db_manager.get_db())
        log = db_manager.create_log(
            db,
            question=user_msg,
            answer=full_response_text.strip(),
            intent=nlu_result.get("intent", {}).get("name", "nlu_fallback"),
            category=None,  # 필요에 따라 카테고리도 추가 가능
            confidence=nlu_result.get("intent", {}).get("confidence", None)
        )
        log_id = log.id
        db.close()

    return {
        "outputs": outputs,
        "log_id": log_id,
        "fallback": fallback,
        "recommendations": recommendations  # 추천된 질문 반환
    }


@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}





# ✅ 훈련 데이터 조회 API
@app.get("/training-data")
def get_training_data(db: Session = Depends(db_manager.get_db)):
    try:
        data = db_manager.get_training_data(db)
        return [
            {
                "id": item.id,
                "intent": item.intent,
                "question": item.question,
                "answer": item.answer
            }
            for item in data
        ]
    except Exception as e:
        print(f"[ERROR] /training-data GET: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve data: {str(e)}")

# ✅ 훈련 데이터 추가 API
@app.post("/training-data")
def add_training_data(data: TrainingDataRequest, db: Session = Depends(db_manager.get_db)):
    try:
        db_manager.add_training_data(db, data.intent, data.question, data.answer)
        return {"message": "Data added successfully"}
    except Exception as e:
        print(f"[ERROR] /training-data POST: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add data: {str(e)}")

# ✅ 훈련 데이터 수정 API
@app.put("/training-data/{data_id}")
def update_training_data(data_id: int, data: TrainingDataRequest, db: Session = Depends(db_manager.get_db)):
    try:
        updated = db_manager.update_training_data(db, data_id, data.intent, data.question, data.answer)
        if not updated:
            raise HTTPException(status_code=404, detail="Data not found")
        return {"message": "Data updated successfully"}
    except Exception as e:
        print(f"[ERROR] /training-data PUT: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update data: {str(e)}")

# ✅ 훈련 데이터 삭제 API
@app.delete("/training-data/{data_id}")
def delete_training_data(data_id: int, db: Session = Depends(db_manager.get_db)):
    try:
        deleted = db_manager.delete_training_data(db, data_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Data not found")
        return {"message": "Data deleted successfully"}
    except Exception as e:
        print(f"[ERROR] /training-data DELETE: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete data: {str(e)}")

# CRUD 라우터 구성
if USE_DB:
    router = APIRouter()

    @router.post("/feedback")
    async def submit_feedback(request: Request):
        data = await request.json()
        chat_log_id = data.get("chat_log_id")
        score = data.get("score")
        feedback_text = data.get("feedback_text", "")

        if not all([chat_log_id, score]):
            raise HTTPException(status_code=400, detail="user_id, chat_log_id, score는 필수입니다.")

        db = next(db_manager.get_db())
        feedback = db_manager.create_feedback(db, chat_log_id, score, feedback_text)
        db.close()

        return {
            "id": feedback.id,
            "message": "피드백이 성공적으로 저장되었습니다."
        }

    @router.get("/feedback")
    def list_feedbacks():
        db = next(db_manager.get_db())
        feedbacks = db_manager.get_feedbacks(db)
        db.close()

        return [
            {
                "id": fb.id,
                "user_id": fb.user_id,
                "chat_log_id": fb.chat_log_id,
                "score": fb.score,
                "feedback_text": fb.feedback_text,
                "created_at": fb.created_at
            }
            for fb in feedbacks
        ]

    @router.post("/logs")
    async def create_log(request: Request):
        data = await request.json()
        question = data.get("question", "")
        answer = data.get("answer", "")
        intent = data.get("intent", None)
        category = data.get("category", None)
        db = next(db_manager.get_db())
        log = db_manager.create_log(db, question, answer, intent, category, confidence)
        db.close()
        return { "id": log.id, "message": "저장 완료" }

    @router.get("/logs")
    def get_logs():
        db = next(db_manager.get_db())
        logs = db_manager.get_logs(db)
        db.close()
        return [
            {
                "id": log.id,
                "question": log.question,
                "answer": log.answer,
                "intent": log.intent,
                "category": log.category,
                "confidence": log.confidence,
                "created_at": log.created_at
            }
            for log in logs
        ]

    @router.get("/logs/{id}")
    def get_log(id: int):
        db = next(db_manager.get_db())
        log = db_manager.get_log(db, id)
        db.close()
        if not log:
            raise HTTPException(status_code=404, detail="해당 로그를 찾을 수 없습니다.")
        return {
            "id": log.id,
            "question": log.question,
            "answer": log.answer,
            "intent": log.intent,
            "category": log.category,
            "created_at": log.created_at
        }

    @router.put("/logs/{id}")
    async def update_log(id: int, request: Request):
        data = await request.json()
        db = next(db_manager.get_db())
        updated = db_manager.update_log(db, id, data.get("question", ""), data.get("answer", ""))
        db.close()
        if not updated:
            raise HTTPException(status_code=404, detail="수정할 로그를 찾을 수 없습니다.")
        return {
            "id": updated.id,
            "question": updated.question,
            "answer": updated.answer,
            "created_at": updated.created_at
        }

    @router.delete("/logs/{id}")
    def delete_log(id: int):
        db = next(db_manager.get_db())
        deleted = db_manager.delete_log(db, id)
        db.close()
        if not deleted:
            raise HTTPException(status_code=404, detail="삭제할 로그를 찾을 수 없습니다.")
        return { "detail": f"로그 {id}번 삭제 완료" }

    @router.get("/stats/category-by-month")
    def get_category_stats_by_month(
        year: int = Query(..., ge=2000, le=2100, description="조회 연도"),
        month: int = Query(..., ge=1, le=12, description="조회 월"),
        db: Session = Depends(db_manager.get_db)
    ):
        from datetime import datetime

        start_date = datetime(year, month, 1)

        if month == 12:
            end_date = datetime(year + 1, 1, 1)
        else:
            end_date = datetime(year, month + 1, 1)

        results = (
            db.query(
                func.date_format(db_manager.ChatLog.created_at, "%Y-%m").label("month"),
                db_manager.ChatLog.category,
                func.count().label("count")
            )
            .filter(db_manager.ChatLog.created_at >= start_date)
            .filter(db_manager.ChatLog.created_at < end_date)
            .group_by("month", db_manager.ChatLog.category)
            .order_by("month", db_manager.ChatLog.category)
            .all()
        )

        return [
            {"month": month, "category": category, "count": count}
            for month, category, count in results
        ]

    @router.get("/stats/category")
    def get_category_stats(period: int = 1):  # 1: 1개월, 3: 3개월, 6: 6개월, 12: 1년
        db = next(db_manager.get_db())
        stats = db_manager.get_category_stats_by_period(db, period)
        db.close()
        return [
            {
                "month": stat.month,
                "category": stat.category,
                "count": stat.count
            }
            for stat in stats
        ]
    # 카테고리별 총 건수 조회 API
    @router.get("/stats/categories")
    def get_category_counts(db: Session = Depends(db_manager.get_db)):
        results = (
            db.query(
                db_manager.ChatLog.category,
                func.count().label("count")
            )
            .filter(db_manager.ChatLog.category != None)
            .group_by(db_manager.ChatLog.category)
            .all()
        )
        return {category: count for category, count in results}
    # 전체 intent 목록 및 건수 조회 API
    @router.get("/stats/intents")
    def get_all_intents_with_counts(db: Session = Depends(db_manager.get_db)):
        try :
            results = (
                db.query(
                    Intent.intent,
                    Intent.description,
                    Intent.category,
                    func.count(ChatLog.id).label("count")
                )
                .join(ChatLog, ChatLog.intent == Intent.intent)
                .group_by(Intent.intent, Intent.description, Intent.category)
                .all()
            )

            return [
                {
                    "intent": r.intent,
                    "description": r.description,
                    "category": r.category,
                    "count": r.count
                }
                for r in results
            ]
        except Exception as e:
            print(f"[ERROR] /stats/intents: {e}")
            raise HTTPException(status_code=500, detail="의도 전체 조회 실패")

    # 선택된 카테고리 하위 intent 조회 API
    @router.get("/stats/intent-by-category")
    def get_intents_by_category(category: str, db: Session = Depends(db_manager.get_db)):
        try:
            results = (
                db.query(
                    Intent.intent,
                    Intent.description.label("description"),
                    func.count(ChatLog.id).label("count")
                )
                .join(ChatLog, ChatLog.intent == Intent.intent)
                .filter(Intent.category == category)
                .group_by(Intent.intent, Intent.description)
                .all()
            )

            return [
                {
                    "intent": r.intent,
                    "description": r.description,
                    "count": r.count
                }
                for r in results
            ]
        except Exception as e:
            print(f"[ERROR] /stats/intent-by-category: {e}")
            raise HTTPException(status_code=500, detail="카테고리별 intent 조회 실패")


    # 훈련 후 Rasa 서버 재시작 API
    @router.post("/retrain")
    def retrain(background_tasks: BackgroundTasks):
        try:
            def run_training():
                generate_nlu()
                generate_domain()
                generate_rules()
                rasa_train()
                restart_rasa_server()
                print("[retrain] 모델 훈련 및 서버 재시작 완료")

            # ✅ 백그라운드 task로 retrain 등록
            background_tasks.add_task(run_training)

            # ✅ 프론트에는 "바로" 응답 반환
            return {"message": "모델 훈련을 백그라운드에서 시작했습니다"}

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"훈련 및 서버 재시작 실패: {str(e)}")

app.include_router(router)

@app.get("/")
def root():
    return { "message": "FastAPI 서버 실행 중입니다." }
