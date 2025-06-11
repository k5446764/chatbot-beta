// src/components/OnlineLectureInfo.jsx
import React from 'react';
import { FaLaptop, FaBookOpen, FaCheckCircle, FaMobileAlt, FaQuestionCircle } from 'react-icons/fa';
import { LinkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// 애니메이션 설정 (기존 유지)
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function OnlineLectureInfo() {
  return (
    <div className="bg-gradient-to-br from-gray to-gray-50 border border-gray-200 rounded-xl shadow-md p-6 space-y-8">
      <motion.div
        className="flex items-center space-x-3"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <FaLaptop className="text-blue-500 text-xl" />
        <h2 className="text-xl font-semibold text-gray-900">사이버 강의 안내</h2>
      </motion.div>

      <motion.div
        className="text-gray-700 space-y-3"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0.1 }}
      >
        <p className="text-sm">
          호원대학교 사이버 강의실에서는 온라인 강의 수강, 학습자료 열람, 과제 제출, 쪽지시험 응시 등
          다양한 학습 활동을 수행할 수 있습니다.
        </p>
        <a
          href="https://edu.howon.ac.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm px-4 py-2 rounded-md transition-all duration-150 ease-out hover:shadow-lg hover:scale-105 transform" // 버튼 인터랙션 강화
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          사이버 강의실 바로가기
        </a>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.span whileHover={{ scale: 1.2, rotate: -5 }} className="inline-block"> {/* 아이콘 인터랙션 */}
            <FaBookOpen className="text-green-500" />
          </motion.span>
          <h3 className="font-semibold text-lg text-gray-900">수강 방법</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          <li>로그인 후 <strong className="font-semibold text-blue-600">‘강의실 선택’</strong> 클릭</li>
          <li>본인 수강 강의를 선택하면 <strong className="font-semibold text-blue-600">‘학습목차’</strong>로 이동</li>
          <li>학습목차에서 강의 시청, 출석 체크, 과제 확인 등을 수행</li>
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.span whileHover={{ scale: 1.2, rotate: -5 }} className="inline-block"> {/* 아이콘 인터랙션 */}
            <FaCheckCircle className="text-yellow-500" />
          </motion.span>
          <h3 className="font-semibold text-lg text-gray-900">출석 인정 기준</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          <li><strong className="font-semibold text-green-600">100%</strong> 영상 시청 완료 시 출석 처리</li>
          <li>중간에 영상을 끄거나, 배속 시청은 출석 불인정 가능</li>
          <li>출석 인정 기간 내 반드시 시청해야 함</li>
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.span whileHover={{ scale: 1.2, rotate: -5 }} className="inline-block"> {/* 아이콘 인터랙션 */}
            <FaMobileAlt className="text-purple-500" />
          </motion.span>
          <h3 className="font-semibold text-lg text-gray-900">모바일에서도 가능해요!</h3>
        </div>
        <p className="text-gray-700 text-sm">
          스마트폰 또는 태블릿으로 <strong className="font-semibold text-blue-600">크롬 브라우저</strong>를 이용하면 모바일에서도 사이버 강의 수강이 가능합니다.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.span whileHover={{ scale: 1.2, rotate: -5 }} className="inline-block"> {/* 아이콘 인터랙션 */}
            <FaQuestionCircle className="text-red-500" />
          </motion.span>
          <h3 className="font-semibold text-lg text-gray-900">자주 묻는 질문</h3>
        </div>
        <ul className="space-y-1 text-gray-700 text-sm"> {/* list-disc list-inside 제거하고 li 내부에서 처리 */}
          {[
            {
              q: "영상이 재생되지 않아요.",
              a: "브라우저를 크롬으로 변경하거나, 팝업 차단을 해제해주세요."
            },
            {
              q: "출석 체크가 안 돼요.",
              a: "학습목차에서 <strong class=\"font-semibold text-blue-600\">100% 시청 여부</strong>를 다시 확인해주세요."
            },
            {
              q: "오류가 반복돼요.",
              a: "교수학습지원센터(☎ 063-450-7095) 또는 강의 담당 교수님께 문의해주세요."
            }
          ].map((faq, index) => (
            <li key={index} className="p-2.5 hover:bg-indigo-100  rounded-md transition-colors duration-150 group">
              <p className="font-semibold text-blue-700  group-hover:text-blue-800 ">
                <span className="font-bold mr-1.5">Q.</span>{faq.q}
              </p>
              <p className="mt-1 text-gray-700  pl-5 group-hover:text-gray-800 "
                 dangerouslySetInnerHTML={{ __html: `<span class="font-semibold text-green-700  mr-1.5">A.</span>${faq.a}` }}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}