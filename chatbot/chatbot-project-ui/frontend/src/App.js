// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// === 사용자용 컴포넌트 import ===
import ChatTop from './components/Chat/ChatTop';
import ChatBottom from './components/Chat/ChatBottom';
import ChatMessageList from './components/Chat/ChatMessageList';
import IconBalloon from './components/Welcome/IconBalloon';
import CardMenu from './components/Welcome/CardMenu';
import { sendMessageToAPI } from './services/message';
import sendSound from './assets/sound/send.mp3';
import Feedback from './components/Messages/Feedback';


// === “학과정보 알려줘” 전용 컴포넌트 import ===
import DepartmentSelector from './components/fixedAnswers/DepartmentSelector';

// === 고정 답변 카드 컴포넌트 import ===
import {
  ContactInfo, LibraryInfo, GraduationInfo, LocationInfo, CampusMap, DiningMenu,
  ScholarshipInfo, AcademicSchedule, CertificateInfo, TuitionInfo, OnlineLectureInfo,
  HopeCard, ShuttleBusCard, DormInfo, RelatedSites
} from './components/fixedAnswers';

// ▼ 1. 수정된 부분: DodgeGame 컴포넌트 import 추가
import DodgeGame from './components/fixedAnswers/dodgefor'; 
import Eastereggs from './components/fixedAnswers/Eastereggs'; 

// === 관리자 페이지 & 로그인 페이지 import ===
import LoginPage from './components/Login/LoginPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import TrainingDataPage from './components/Admin/pages/TrainingDataPage';
import StatisticsPage from './components/Admin/pages/StatisticsPage';
import FeedbackPage from './components/Admin/pages/FeedbackPage';

function App() {
  const navigate = useNavigate();

  const [lang, setLang] = useState('ko');
  const [messages, setMessages] = useState({ data: [], isLoading: false });
  const [chatLogId, setChatLogId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCardMenuAction, setIsCardMenuAction] = useState(false);
  const audioRef = useRef(new Audio(sendSound));
  const chatContainerRef = useRef(null);
  
  const scrollToBottom = (behavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: behavior
      });
    }
  };

  useEffect(() => {
    if (!chatContainerRef.current || messages.data.length === 0) return;

    const scrollContainer = chatContainerRef.current;
    const lastMessageObject = messages.data[messages.data.length - 1];

    if (!lastMessageObject) return;

    if (isCardMenuAction) {
      if (lastMessageObject.outputs) {
        requestAnimationFrame(() => {
          if (!chatContainerRef.current) return;
          const userMessageElement = scrollContainer.querySelector('.chat-message-group:nth-last-child(2)');
          if (userMessageElement) {
            const desiredPadding = 200;
            let targetScrollTop = userMessageElement.offsetTop - desiredPadding;
            
            targetScrollTop = Math.max(0, targetScrollTop);
            const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            if (maxScrollTop > 0) {
              targetScrollTop = Math.min(targetScrollTop, maxScrollTop);
            } else {
              targetScrollTop = 0;
            }
            
            scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
          }
          setIsCardMenuAction(false);
        });
      }
    } else {
      scrollToBottom('smooth');
    }
  }, [messages.data]);


  useEffect(() => {
    audioRef.current.volume = 0.2;
  }, []);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString(lang === 'ko' ? 'ko-KR' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleToggleLang = () => setLang(prev => (prev === 'ko' ? 'en' : 'ko'));

  const handleSelect = value => {
    if (value === '통계') {
      navigate('/stats');
    } else {
      setIsCardMenuAction(true);
      handleSendMessage(value);
    }
  };

  const fixedAnswers = {
    '교내연락처 알려줘': [{ type: 'jsx', content: <ContactInfo /> }],
    '도서관 정보 알려줘': [{ type: 'jsx', content: <LibraryInfo /> }],
    '졸업 안내': [{ type: 'jsx', content: <GraduationInfo /> }],
    '찾아오시는길': [{ type: 'jsx', content: <LocationInfo /> }],
    '캠퍼스맵': [{ type: 'jsx', content: <CampusMap /> }],
    '식단 알려줘': [{ type: 'jsx', content: <DiningMenu /> }],
    '장학제도 알려줘': [{ type: 'jsx', content: <ScholarshipInfo /> }],
    '학사일정 알려줘': [{ type: 'jsx', content: <AcademicSchedule /> }],
    '증명서 발급': [{ type: 'jsx', content: <CertificateInfo /> }],
    '등록금 안내': [{ type: 'jsx', content: <TuitionInfo /> }],
    '학과정보 알려줘': [{ type: 'jsx', content: <DepartmentSelector /> }],
    '사이버 강의 알려줘': [{ type: 'jsx', content: <OnlineLectureInfo /> }],
    'HOPE 정보': [{ type: 'jsx', content: <HopeCard /> }],
    '셔틀버스': [{ type: 'jsx', content: <ShuttleBusCard /> }],
    '기숙사 정보': [{ type: 'jsx', content: <DormInfo /> }],
    
    '관련 홈페이지': [{ type: 'jsx', content: <RelatedSites /> }],
    '@admin': [{ type: 'jsx', content: <Eastereggs /> }],
    // ▼ 3. 수정된 부분: 컴포넌트 이름을 대문자로 시작하고, key 추가
    '@@admin': [{ type: 'jsx', content: <DodgeGame key={Date.now()} /> }]
    
  
  };

  const handleSendMessage = async text => {
    if (!text.trim()) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    setMessages(prev => ({
      ...prev,
      data: [...prev.data, { input: text, time: getCurrentTime() }],
      isLoading: true
    }));

    if (fixedAnswers[text]) {
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          data: [
            ...prev.data,
            { outputs: fixedAnswers[text], time: getCurrentTime() }
          ],
          isLoading: false
        }));
      }, 500);
      return;
    }

    try {
      const res = await sendMessageToAPI(text);
      setMessages(prev => ({
        ...prev,
        data: [
          ...prev.data,
          {
            outputs: res.outputs || [
              { type: 'text', content: '❌ 응답이 없습니다.' }
            ],
            time: getCurrentTime()
          }
        ],
        isLoading: false
      }));
      setChatLogId(res.log_id);
      setShowFeedback(Math.random() < 0.2);

      if (res.fallback && res.recommendations.length > 0) {
        const fallbackMessage = {
          outputs: [
            {
              type: 'jsx',
              content: (
                <div className="mt-4 p-3 border border-gray-200 rounded bg-white shadow">
                  <p className="font-semibold mb-2 text-gray-700">🤔 추천 질문:</p>
                  <ul className="space-y-2">
                    {res.recommendations.map((intent, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleSelect(intent)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded transition w-full text-left"
                        >
                          👉 {intent}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          ],
          time: getCurrentTime()
        };
        setMessages(prev => ({ ...prev, data: [...prev.data, fallbackMessage] }));
      }
    } catch (error) {
      console.error('API error:', error);
      setMessages(prev => ({
        ...prev,
        data: [
          ...prev.data,
          {
            outputs: [ { type: 'text', content: '❌ 오류가 발생했습니다.' } ],
            time: getCurrentTime()
          }
        ],
        isLoading: false
      }));
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col h-screen bg-gray-50">
            <ChatTop lang={lang} onToggleLang={handleToggleLang} />
            <div className="w-full sticky top-[60px] z-30 bg-white px-2 sm:px-4 py-2 shadow-md rounded-lg">
              <CardMenu onSelect={handleSelect} />
            </div>
              <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
                <div className="px-2 sm:px-4 md:px-6 pt-4">
                  <IconBalloon />
                </div>
                <ChatMessageList
                  data={messages}
                  uiTexts={{ loading: lang === 'ko' ? '로딩 중...' : 'Loading...' }}
                  favorite={false}
                  onSend={handleSelect}
                />
                {showFeedback && chatLogId && (
                  <div className="p-4">
                    <Feedback chatLogId={chatLogId} userId={1} />
                  </div>
                )}
              </div>
            <ChatBottom onSend={handleSendMessage} />
          </div>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="training-data" element={<TrainingDataPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
      </Route>
    </Routes>
  );
}

export default App;