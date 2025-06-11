import pymysql
import yaml
import subprocess
import os
import time
from dotenv import load_dotenv

def get_db():
    """MySQL 데이터베이스 연결"""
    load_dotenv()  # .env 파일 로드

    return pymysql.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        db=os.getenv('DB_NAME'),
        charset='utf8mb4'
    )

def generate_nlu():
    """데이터베이스에서 데이터를 조회하여 nlu.yml 파일 생성"""
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT intent, question FROM training_data")
    rows = cur.fetchall()
    nlu_data = {}

    # intent별 질문 묶기
    for intent, question in rows:
        if intent not in nlu_data:
            nlu_data[intent] = []
        nlu_data[intent].append(question)

    nlu_yaml = {'version': '3.1', 'nlu': []}
    for intent, examples in nlu_data.items():
        nlu_yaml['nlu'].append({
            'intent': intent,
            'examples': "\n".join([f"- {ex}" for ex in examples])
        })

    # Rasa 프로젝트 경로로 저장 (수정된 경로)
    rasa_nlu_path = os.path.join(os.path.expanduser("~"), 'chatbot','chatbot-project-rasa', 'rasa_engine', 'data', 'nlu.yml')
    os.makedirs(os.path.dirname(rasa_nlu_path), exist_ok=True)  # 디렉토리가 없으면 생성

    with open(rasa_nlu_path, 'w', encoding='utf-8') as f:
        yaml.dump(nlu_yaml, f, allow_unicode=True)

    conn.close()
    print(f"nlu.yml 파일 생성 완료: {rasa_nlu_path}")

def generate_domain():
    """domain.yml 파일 생성"""
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT DISTINCT intent FROM training_data")
    intents = [row[0] for row in cur.fetchall()]

    cur.execute("SELECT DISTINCT intent, answer FROM training_data WHERE answer IS NOT NULL")
    responses = {}
    for intent, answer in cur.fetchall():
        if intent not in responses:
            responses[intent] = []
        responses[intent].append({'text': answer})

    domain_yaml = {
        'version': '3.1',
        'intents': intents,
        'responses': {f'utter_{intent}': response for intent, response in responses.items()}
    }

    # Rasa 프로젝트 경로로 저장 (수정된 경로)
    rasa_domain_path = os.path.join(os.path.expanduser("~"), 'chatbot','chatbot-project-rasa', 'rasa_engine', 'domain.yml')
    os.makedirs(os.path.dirname(rasa_domain_path), exist_ok=True)  # 디렉토리가 없으면 생성

    with open(rasa_domain_path, 'w', encoding='utf-8') as f:
        yaml.dump(domain_yaml, f, allow_unicode=True)

    conn.close()
    print(f"domain.yml 파일 생성 완료: {rasa_domain_path}")

def generate_rules():
    """rules.yml 파일 생성"""
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT DISTINCT intent FROM training_data")
    intents = [row[0] for row in cur.fetchall()]

    rules_yaml = {'version': '3.1', 'rules': []}
    for intent in intents:
        rules_yaml['rules'].append({
            'rule': f'Rule for {intent}',
            'steps': [
                {'intent': intent},
                {'action': f'utter_{intent}'}
            ]
        })

    # Rasa 프로젝트 경로로 저장 (수정된 경로)
    rasa_rules_path = os.path.join(os.path.expanduser("~"), 'chatbot','chatbot-project-rasa', 'rasa_engine', 'data', 'rules.yml')
    os.makedirs(os.path.dirname(rasa_rules_path), exist_ok=True)  # 디렉토리가 없으면 생성

    with open(rasa_rules_path, 'w', encoding='utf-8') as f:
        yaml.dump(rules_yaml, f, allow_unicode=True)

    conn.close()
    print(f"rules.yml 파일 생성 완료: {rasa_rules_path}")

# rasa 훈련 함수
def rasa_train():
    # Rasa 프로젝트 경로로 이동하여 훈련 실행
    rasa_project_dir = os.path.join(os.path.expanduser("~"), 'chatbot','chatbot-project-rasa', 'rasa_engine')
    
    try:
        result = subprocess.run(
            ["rasa", "train"],
            capture_output=True,
            text=True,
            check=True,
            cwd=rasa_project_dir  # Rasa 프로젝트 디렉토리에서 실행
        )
        print("Training complete")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Training failed: {e.stderr}")


def restart_rasa_server():
    """Rasa 서버를 종료하고 다시 시작하는 함수"""
    # Rasa 프로젝트 디렉토리
    rasa_project_dir = os.path.join(os.path.expanduser("~"), 'chatbot','chatbot-project-rasa', 'rasa_engine')
    
    try:
        # Rasa 서버 종료
        print("Stopping Rasa server...")
        stop_process = subprocess.run(
            ["pkill", "-f", "rasa run"], capture_output=True, text=True
        )
        
        if stop_process.returncode == 0:
            print("Rasa server stopped successfully.")
        else:
            print("Failed to stop Rasa server. Proceeding to restart...")

        # 잠시 대기 (완전 종료 대기)
        time.sleep(2)
        
        # 새로운 Rasa 서버 시작
        print("Starting Rasa server...")
        start_process = subprocess.Popen(
            ["rasa", "run", "--enable-api", "--cors", "*"],
            cwd=rasa_project_dir,  # Rasa 프로젝트 디렉토리에서 실행
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        print("Rasa server started.")
        # 서버 로그를 콘솔에 출력
        for line in start_process.stdout:
            print(line.decode("utf-8").strip())
        
    except Exception as e:
        print(f"Error restarting Rasa server: {str(e)}")



