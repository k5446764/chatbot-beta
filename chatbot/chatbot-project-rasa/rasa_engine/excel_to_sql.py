import pandas as pd

# 설정
excel_file = 'training_data.xlsx'  # 엑셀 파일명
output_sql_file = 'training_data.sql'  # 출력할 sql 파일명
table_name = 'training_data'  # 테이블명
columns = ['intent', 'question', 'answer']  # 엑셀 컬럼명

# 엑셀 읽기
df = pd.read_excel(excel_file)

# 필요한 컬럼만 사용
df = df[columns]

# 결측치(NaN) 빈 문자열로 처리
df = df.fillna('')

# 빈 행 제거 (intent, question, answer 모두 빈 경우 삭제)
df = df[~(df[columns].apply(lambda row: all(cell.strip() == '' for cell in row), axis=1))]

# INSERT 쿼리 생성
insert_lines = []
for _, row in df.iterrows():
    values = []
    for col in columns:
        value = row[col].replace("'", "''")  # 작은 따옴표 escape
        values.append(f"'{value}'")
    
    line = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', '.join(values)});"
    insert_lines.append(line)

# SQL 파일로 저장
with open(output_sql_file, "w", encoding="utf-8") as f:
    f.write("\n".join(insert_lines))

print(f"✅ 변환 완료! SQL 파일: {output_sql_file} (빈 행 제외)")
