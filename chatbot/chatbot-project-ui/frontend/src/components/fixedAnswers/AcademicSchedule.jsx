// src/components/AcademicSchedule.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
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

export default function AcademicSchedule() {
  const scheduleUrl = "https://intra.howon.ac.kr/nyx9/_Multi_Monitoring/_Schedule/iframe_Schedule.html";
  const [iframeError, setIframeError] = useState(false);

  // iframe 로드 상태를 감지하는 것은 완벽하지 않을 수 있으나, 간단한 시도를 해볼 수 있습니다.
  // 실제로는 X-Frame-Options 등으로 인해 브라우저 레벨에서 차단되면 onerror 이벤트가 발생하지 않을 수 있습니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      // 이 방법은 iframe이 실제로 로드되었는지 여부를 정확히 판단하기 어렵습니다.
      // X-Frame-Options 헤더로 인해 브라우저가 렌더링을 차단하는 경우,
      // onerror 이벤트가 iframe 요소에서 발생하지 않을 수 있습니다.
      // 여기서는 대체 텍스트를 보여주기 위한 간단한 플래그로 사용합니다.
      // 실제 프로덕션에서는 이 방식보다 사용자에게 직접 링크를 제공하는 것이 더 안정적일 수 있습니다.
    }, 5000); // 5초 후에도 특별한 성공 이벤트가 없으면 오류로 간주 (매우 단순한 접근)

    // iframe 로드 성공/실패를 감지하는 것은 매우 어렵습니다.
    // 브라우저 보안 정책상 교차 출처 iframe의 내부 상태 접근이 제한적입니다.
    // 이 예제에서는 iframe 자체에 onerror 핸들러를 시도하지만, X-Frame-Options의 경우 작동하지 않을 가능성이 높습니다.

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
        className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-4 flex items-center">
          <FaCalendarAlt className="mr-3 text-indigo-600 " />
          학사일정 안내
        </h2>
        <p className="text-gray-700  mb-2">
          학사일정은 학교 홈페이지 또는 인트라넷을 통해 최신 정보를 확인하실 수 있습니다.
        </p>
        <ul className="text-sm text-gray-600  list-disc list-inside space-y-1 mb-6">
          <li>
            <a
              href="https://www.howon.ac.kr/web/_guide/index.html?sm=schedule"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-700  hover:underline"
            >
              학교 홈페이지 학사일정
            </a>
          </li>
          <li>
            <span className="font-medium">인트라넷 → 학생정보 → 학사일정</span> 메뉴
          </li>
        </ul>
        <a
          href="https://www.howon.ac.kr/web/_guide/index.html?sm=schedule"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors duration-300 bg-indigo-500 hover:bg-indigo-700   shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          <FaExternalLinkAlt className="mr-2" />
          학사일정 홈페이지 바로가기
        </a>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <InformationCircleIcon className="h-6 w-6 mr-2 text-blue-600 " />
          실시간 학사일정 (인트라넷)
        </h3>
        <div className="bg-white  rounded-xl shadow-xl border border-gray-200  overflow-hidden">
          <iframe
            src={scheduleUrl}
            title="학사일정 (인트라넷)"
            className="w-full h-[600px] md:h-[700px] border-0"
            // sandbox 속성은 iframe의 권한을 제한합니다. 필요에 따라 조정할 수 있습니다.
            // "allow-scripts allow-same-origin" 등은 특정 기능 허용 시 사용합니다.
            // 여기서는 기본값으로 두거나, 최소한의 권한만 부여하는 것을 고려할 수 있습니다.
            // sandbox
            onError={() => {
              // 이 onerror는 네트워크 오류 등으로 iframe URL 자체를 가져오지 못할 때 주로 발생합니다.
              // X-Frame-Options로 인한 차단 시에는 여기서 감지되지 않을 수 있습니다.
              setIframeError(true);
            }}
          />
          {/* 실제 iframe 로드 실패(특히 X-Frame-Options)는 JS로 감지하기 매우 어렵습니다.
            아래는 iframe이 비어있거나, 사용자가 내용을 못 볼 경우를 대비한 대체 UI 입니다.
            이 부분은 iframe의 실제 렌더링 상태에 따라 보이지 않을 수 있습니다.
          */}
        </div>
        {iframeError && ( // 이 조건은 실제 X-Frame-Options 차단 시에는 부정확할 수 있습니다.
            <div className="mt-4 p-4 bg-yellow-50 /30 border border-yellow-300  rounded-md text-yellow-700  text-sm flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                인트라넷 학사일정을 불러오는 데 문제가 발생했습니다. 위 홈페이지 링크를 이용해 주세요.
            </div>
        )}
        <p className="mt-3 text-xs text-gray-500 ">
          참고: 인트라넷 학사일정은 학교 네트워크 환경 및 보안 설정에 따라 외부에서 정상적으로 표시되지 않을 수 있습니다. 이 경우, 위 제공된 홈페이지 링크를 이용해 주시기 바랍니다.
        </p>
      </motion.div>
    </motion.div>
  );
}