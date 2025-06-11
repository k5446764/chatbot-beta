// src/components/CampusMap.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaExternalLinkAlt } from 'react-icons/fa'; // React Icons 사용
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';


// 애니메이션 Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 자식 요소들이 순차적으로 나타나도록
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

export default function CampusMap() {
  const campusMapUrl = "https://www.howon.ac.kr/web/_univ/index.html?sm=cyber";
  const [showIframeFallback, setShowIframeFallback] = useState(false);

  useEffect(() => {
    // X-Frame-Options로 인해 iframe 로드 실패를 직접 감지하기는 어렵습니다.
    // 타이머를 사용하여 일정 시간 후 대체 메시지를 표시할지 결정 (완벽한 방법은 아님).
    const timer = setTimeout(() => {
      setShowIframeFallback(true);
    }, 0); // 7초 후 대체 UI 로직 활성화 (시간은 조절 가능)

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 max-w-4xl space-y-8" // iframe을 위해 max-width를 늘림
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 기존 안내 카드 */}
      <motion.div
        className="p-6 md:p-8 bg-white  rounded-xl shadow-xl border border-gray-200  text-center"
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col items-center">
          <FaMapMarkedAlt className="text-5xl md:text-6xl text-green-600  mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-3">
            캠퍼스맵 안내
          </h2>
          <p className="text-sm md:text-base text-gray-700  mb-6 px-4">
            호원대학교의 캠퍼스맵을 확인하고 싶으시면 아래 버튼을 클릭하거나,
            아래에 표시되는 캠퍼스맵을 참고하세요.
          </p>
          <a
            href={campusMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-base font-semibold text-green-500 transition-colors duration-300 bg-green-100 hover:bg-green-700  shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            <FaExternalLinkAlt className="mr-2.5 h-4 w-4" />
            캠퍼스맵 바로가기
          </a>
        </div>
      </motion.div>

      {/* iframe으로 캠퍼스맵 표시 시도 */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <InformationCircleIcon className="h-6 w-6 mr-2 text-blue-600 " />
          실시간 캠퍼스맵 보기 (학교 홈페이지)
        </h3>
        <div className="bg-white  rounded-xl shadow-xl border border-gray-200  overflow-hidden aspect-[16/10]"> {/* 가로가 긴 비율로 조정 */}
          <iframe
            src={campusMapUrl}
            title="호원대학교 캠퍼스맵"
            className="w-full h-full border-0"
            onError={() => setShowIframeFallback(true)} // X-Frame-Options는 이 onError로 감지 안될 수 있음
          />
        </div>
        {showIframeFallback && (
            <div className="mt-4 p-4 bg-yellow-50  border border-yellow-300  rounded-md text-yellow-700  text-sm flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2.5 mt-0.5 flex-shrink-0" />
                <div>
                    캠퍼스맵을 불러오는 데 시간이 오래 걸리거나 표시되지 않을 수 있습니다.
                    이는 학교 웹사이트의 보안 설정 때문일 수 있습니다. <br/>
                    이 경우, 상단의 '캠퍼스맵 바로가기' 버튼을 이용해 주세요.
                </div>
            </div>
        )}
         <p className="mt-3 text-xs text-gray-500 ">
          참고: 학교 홈페이지의 캠퍼스맵은 보안 설정에 따라 현재 페이지 내에서 정상적으로 표시되지 않을 수 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
}