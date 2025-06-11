// src/Admin/pages/TrainingDataPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const TrainingDataPage = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [newData, setNewData] = useState({ intent: '', question: '', answer: '' });
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTraining, setIsTraining] = useState(false);  // ✅ 훈련 중 상태
  const navigate = useNavigate();

  // 훈련 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // 로그인 안 되어 있으면 로그인 페이지로 리디렉션
    } else {
      fetchTrainingData(token);
    }
  }, [navigate]);

  const fetchTrainingData = (token) => {
    axios.get(`${API_URL}/training-data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setTrainingData(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching training data", error);
      setLoading(false);
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말로 이 데이터를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/training-data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // ✅ 삭제 후 새로고침
      fetchTrainingData(token);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleAdd = async () => {
    if (!newData.intent || !newData.question || !newData.answer) {
      alert("모든 필드를 채워야 합니다.");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/training-data`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewData({ intent: '', question: '', answer: '' });
      alert("새 훈련 데이터가 추가되었습니다!");
      fetchTrainingData(token);
    } catch (error) {
      console.error("Error adding data", error);
      alert("데이터 추가에 실패했습니다.");
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/training-data/${editingData.id}`, editingData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingData(null);
      alert("훈련 데이터가 수정되었습니다!");
      fetchTrainingData(token);
    } catch (error) {
      console.error("Error editing data", error);
      alert("데이터 수정에 실패했습니다.");
    }
  };

  const handleTrainModel = async () => {
    const token = localStorage.getItem('token');
    try {
      setIsTraining(true);  // ✅ 훈련 시작 표시
      const response = await axios.post(`${API_URL}/retrain`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      alert('모델 훈련이 시작되었습니다! (약간의 시간이 소요됩니다)');
    } catch (error) {
      console.error('Retrain API error:', error);
      alert('모델 훈련에 실패했습니다!');
    } finally {
      setIsTraining(false);  // ✅ 훈련 끝 표시
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingData) {
      setEditingData({ ...editingData, [name]: value });
    } else {
      setNewData({ ...newData, [name]: value });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>훈련데이터 관리</h2>

      {/* ✅ 모델 훈련 버튼 */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleTrainModel} disabled={isTraining}>
          {isTraining ? '훈련 중...' : '모델 훈련 시작'}
        </button>
      </div>

      {/* 데이터 추가/수정 폼 */}
      <div className="form-container">
        <h3>{editingData ? '훈련 데이터 수정' : '새 훈련 데이터 추가'}</h3>
        <input
          type="text"
          name="intent"
          value={editingData ? editingData.intent : newData.intent}
          onChange={handleChange}
          placeholder="Intent"
        />
        <input
          type="text"
          name="question"
          value={editingData ? editingData.question : newData.question}
          onChange={handleChange}
          placeholder="Question"
        />
        <input
          type="text"
          name="answer"
          value={editingData ? editingData.answer : newData.answer}
          onChange={handleChange}
          placeholder="Answer"
        />
        <button onClick={editingData ? handleEdit : handleAdd}>
          {editingData ? '수정하기' : '추가하기'}
        </button>
        {editingData && (
          <button onClick={() => setEditingData(null)} style={{ marginLeft: '10px' }}>
            수정 취소
          </button>
        )}
      </div>

      {/* 훈련 데이터 테이블 */}
      <div className="table-container" style={{ marginTop: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>Intent</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainingData.map(item => (
              <tr key={item.id}>
                <td>{item.intent}</td>
                <td>{item.question}</td>
                <td>{item.answer}</td>
                <td>
                  <button onClick={() => { setEditingData(item); }}>수정</button>
                  <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingDataPage;
