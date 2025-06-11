// src/components/Messages/Feedback.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaCheckCircle, FaLightbulb } from 'react-icons/fa';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
const API_URL = process.env.REACT_APP_API_URL;

const Feedback = ({ chatLogId, userId, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [hoverScore, setHoverScore] = useState(null); // 별점 호버 상태
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = async () => {
    if (!score) return; // 점수가 선택되지 않았으면 제출 방지
    try {
      await axios.post(`${API_URL}/feedback`, {
        user_id: userId,
        chat_log_id: chatLogId,
        score,
        feedback_text: feedbackText,
      });
      setSubmitted(true);
    } catch (err) {
      alert("피드백 제출에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 제출 후 3초 뒤에 자동으로 사라지게
  useEffect(() => {
    if (submitted && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 w-full max-w-sm mx-16">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thankyou"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <FaCheckCircle className="text-4xl text-green-500 mb-3" />
            <p className="font-semibold text-gray-800">피드백 감사합니다!</p>
            <p className="text-xs text-gray-500 mt-1">더 좋은 답변을 위해 노력하겠습니다.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col"
          >
            <h3 className="font-semibold text-gray-800 text-center mb-3 flex items-center justify-center">
              <FaLightbulb className="mr-2 text-yellow-400" />
              이 답변이 도움이 되었나요?
            </h3>
            
            {/* 별점 시스템 */}
            <div className="flex justify-center items-center space-x-2 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.button
                  key={s}
                  onClick={() => setScore(s)}
                  onMouseEnter={() => setHoverScore(s)}
                  onMouseLeave={() => setHoverScore(null)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-3xl transition-colors duration-200 focus:outline-none"
                  aria-label={`${s}점`}
                >
                  <FaStar
                    className={
                      (hoverScore || score) >= s
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </motion.button>
              ))}
            </div>
            
            {/* 추가 의견 입력란 */}
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="추가 의견을 남겨주시면 챗봇 발전에 큰 도움이 됩니다. (선택 사항)"
              rows={3}
              className="w-full mt-4 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
            
            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={!score}
              className="w-full mt-4 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              제출하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feedback;