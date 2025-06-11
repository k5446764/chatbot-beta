import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const [error, setError] = useState('');  // 에러 메시지
  const navigate = useNavigate();

  // 로그인 처리
  const handleLogin = async () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);  // 로딩 시작
    setError('');  // 이전 에러 메시지 초기화

    try {
      const response = await axios.post(`${API_URL}/token`, new URLSearchParams({
        username,
        password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // JWT 토큰을 localStorage에 저장
      localStorage.setItem('token', response.data.access_token);

      // 로그인 후 관리자 페이지로 이동
      navigate('/admin');
    } catch (error) {
      console.error('Login failed', error);
      setError('아이디 또는 비밀번호가 잘못되었습니다.');  // 에러 메시지 표시
    } finally {
      setLoading(false);  // 로딩 종료
    }
  };

  return (
    <div>
      <h2>로그인</h2>

      {/* 에러 메시지 표시 */}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디"
        disabled={loading}  // 로딩 중에는 입력 비활성화
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        disabled={loading}  // 로딩 중에는 입력 비활성화
      />
      
      {/* 로그인 버튼 */}
      <button onClick={handleLogin} disabled={loading || !username || !password}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </div>
  );
};

export default LoginPage;
