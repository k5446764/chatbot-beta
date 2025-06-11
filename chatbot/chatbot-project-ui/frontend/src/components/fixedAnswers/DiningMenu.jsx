// src/components/DiningMenu.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaExternalLinkAlt } from 'react-icons/fa';
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// 애니메이션 Variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function DiningMenu() {
  const [diningUrl, setDiningUrl] = useState('');
  const [showIframeFallback, setShowIframeFallback] = useState(false);

  useEffect(() => {
    const today = new Date(); // 현재 날짜 사용
    // 현재 시뮬레이션된 날짜가 2025년 6월 5일이므로, 해당 날짜로 설정됩니다.
    // 실제 사용 시에는 new Date()가 실제 현재 날짜를 반환합니다.
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}${month}${day}`;

    // URL의 date00 파라미터를 현재 날짜로 설정합니다.
    // count00=2는 주간 식단에서 현재일을 포함한 2일치를 의미하는 것으로 보입니다.
    // #selSiteCategory1 은 '학생식당'을 기본 선택하는 것으로 추정됩니다.
    const url = `https://www.howon.ac.kr/web/_community/?code=weekfood&seq_div=howon&date00=${currentDate}&count00=2#selSiteCategory1`;
    setDiningUrl(url);

    // X-Frame-Options로 인해 iframe 로드 실패를 직접 감지하기는 어렵습니다.
    // 여기서는 타이머를 사용하여 일정 시간 후 대체 메시지를 표시할지 결정합니다.
    // 이는 완벽한 해결책은 아니며, 사용자에게 안내를 제공하는 데 중점을 둡니다.
    const timer = setTimeout(() => {
      setShowIframeFallback(true); // iframe이 매우 느리거나 차단된 경우를 위한 휴리스틱
    }, 1); // 7초 후 대체 UI 로직 활성화 (시간은 조절 가능)

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-5 md:p-6 lg:p-8 max-w-4xl space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        variants={itemVariants}
        className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6 text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-3 flex items-center justify-center md:justify-start">
          <FaUtensils className="mr-3 text-amber-500 " />
          오늘의 식단 안내
        </h2>
        <p className="text-gray-700  mb-5 text-sm md:text-base">
          호원대학교 오늘의 식단 정보를 실시간으로 확인해 보세요. 아래 식단표가 표시되지 않으면 버튼을 통해 직접 확인할 수 있습니다.
        </p>
        <a
          href={diningUrl || '#'} // diningUrl이 준비되기 전에는 '#'으로 설정
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-semibold text-amber-500 transition-colors duration-300 bg-amber-100 hover:bg-amber-600   shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
        >
          <FaExternalLinkAlt className="mr-2" />
          식단 홈페이지 바로가기
        </a>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <InformationCircleIcon className="h-6 w-6 mr-2 text-blue-600 " />
          실시간 식단 정보
        </h3>
        {diningUrl ? (
          <div className="bg-white  rounded-xl shadow-xl border border-gray-200  overflow-hidden aspect-[4/3] md:aspect-[16/9]">
            {/* 참고: sandbox 속성은 iframe의 보안을 강화하지만, 일부 기능(예: 스크립트 실행, 폼 제출)을 제한할 수 있습니다.
              만약 iframe 내용이 제대로 표시되지 않는다면 sandbox 속성을 제거하거나 값을 조정해 보세요.
              (예: "allow-scripts allow-same-origin")
              여기서는 대상 사이트가 단순 정보 표시이므로 기본값으로 두거나 더 제한적으로 설정할 수 있습니다.
            */}
            <iframe
              src={diningUrl}
              title="오늘의 식단 (호원대학교)"
              className="w-full h-full border-0"
              onError={() => setShowIframeFallback(true)} // X-Frame-Options는 이 onError로 감지 안될 수 있음
              // sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" // 필요 시 주석 해제 및 조정
            />
          </div>
        ) : (
          <div className="p-4 bg-gray-100  rounded-md text-gray-600  text-center">
            식단 정보 URL을 생성 중입니다...
          </div>
        )}
        {/* X-Frame-Options 등으로 인해 iframe 내용이 보이지 않을 경우를 대비한 안내 메시지.
          showIframeFallback은 완벽한 감지 로직은 아니지만, 사용자에게 안내를 제공합니다.
        */}
        {showIframeFallback && (
            <div className="mt-4 p-4 bg-yellow-50  border border-yellow-300  rounded-md text-yellow-700  text-sm flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2.5 mt-0.5 flex-shrink-0" />
                <div>
                    실시간 식단 정보를 불러오는 데 시간이 오래 걸리거나 표시되지 않을 수 있습니다.
                    이는 학교 웹사이트의 보안 설정 때문일 수 있습니다. <br/>
                    이 경우, 상단의 '식단 홈페이지 바로가기' 버튼을 이용해 주세요.
                </div>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
}