// src/components/HopeCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLightbulb, FaWpforms, FaUsersCog, FaSitemap, FaGraduationCap,
  FaCalendarCheck, FaInfoCircle, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// 애니메이션 Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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

const accordionContentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' },
  expanded: {
    opacity: 1,
    height: 'auto',
    marginTop: '1rem', // Tailwind's mt-4
    marginBottom: '1rem', // Tailwind's mb-4
    transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
  },
};

// 아코디언 섹션 컴포넌트
const AccordionSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const IconComponent = icon;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white  rounded-xl shadow-lg border border-gray-200  overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none hover:bg-gray-50  transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-gray-900  flex items-center">
          <IconComponent className="mr-3 text-indigo-600  text-2xl flex-shrink-0" />
          {title}
        </h3>
        {isOpen ? (
          <FaChevronUp className="h-5 w-5 text-gray-500  flex-shrink-0" />
        ) : (
          <FaChevronDown className="h-5 w-5 text-gray-500  flex-shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionContentVariants}
            className="px-5 md:px-6 pb-6 text-sm text-gray-700  space-y-4"
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 테이블 스타일링을 위한 컴포넌트
const StyledTable = ({ headers, data, caption }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200  shadow-sm">
    {caption && <p className="text-xs text-gray-500  p-2 bg-gray-50 ">{caption}</p>}
    <table className="min-w-full divide-y divide-gray-200 ">
      <thead className="bg-gray-100 ">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white  divide-y divide-gray-200 ">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50  transition-colors">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-3 whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


const HopeCard = () => {
  const areaCriteriaData = {
    headers: ["영역", "1영역", "2영역", "3영역", "4영역", "5영역", "6영역"],
    data: [["역량명", "공동체의식", "의사소통", "자기개발관리", "창의적사고", "자원정보활용", "문제해결"]],
  };

  const scholarshipCriteriaData = {
    headers: ["구분", "기준"],
    data: [
      ["백인백색 HOPE 장학금", "3학년 이상 & 누적 포인트 150점 이상"],
      ["HOWON 인증 장학금", "120학점 이상 & 누적 포인트 상위 10%"],
    ],
  };

  const reviewScheduleData = {
    headers: ["대상", "신청학기", "신청기간", "심의일정", "지급시기"],
    data: [
      ["3학년 이상", "1학기", "3월 1일 ~ 6월 중", "2학기", "2학기 종강 전"],
      ["3학년 이상", "2학기", "9월 1일 ~ 12월 중", "1학기", "1학기 종강 전"],
    ],
  };


  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 max-w-4xl  space-y-6 md:space-y-8 bg-gray-50  rounded-2xl shadow-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-extrabold text-center text-indigo-600  flex items-center justify-center"
      >
        <FaLightbulb className="mr-3" />
        백인백색 HOPE 프로그램 안내
      </motion.h2>

      <AccordionSection title="신청방법" icon={FaWpforms} defaultOpen={true}>
        <ol className="list-decimal list-inside space-y-2.5 pl-1">
          <li>DREAM HOPE 커리어시스템 (<a href="https://career.howon.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ">career.howon.ac.kr</a>) 로그인</li>
          <li>백인백색 HOPE 포인트 신청 메뉴에서 '포인트 신청' 클릭</li>
          <li>신청서식 다운로드 및 작성 (인트라넷 공지사항 예시 첨부파일 참고)</li>
          <li>활동 영역 선택 후 신청서 및 증빙파일 첨부</li>
        </ol>
        <div className="mt-6">
          <a
            href="https://career.howon.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-100 hover:bg-blue-700   text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
            상세 신청페이지 바로가기
          </a>
        </div>
      </AccordionSection>

      <AccordionSection title="백인백색 구성" icon={FaUsersCog}>
        <div className="space-y-3">
            <p><strong className="font-semibold text-gray-800 ">• 선발대상:</strong> 학부 재학생</p>
            <p><strong className="font-semibold text-gray-800 ">• 선발횟수:</strong> 학기별 1회 (연 2회)</p>
            <div>
                <p className="font-semibold text-gray-800 ">• 선발기준:</p>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                    <li><strong className="font-medium">HOPE 장학금:</strong> 3학년 이상 & 누적 포인트 150점 이상</li>
                    <li><strong className="font-medium">HOWON 인증장학금:</strong> 120학점 이상 이수 & 누적 포인트 상위 10%</li>
                </ul>
            </div>
        </div>
      </AccordionSection>

      <AccordionSection title="영역별 기준" icon={FaSitemap}>
        <StyledTable headers={areaCriteriaData.headers} data={areaCriteriaData.data} />
      </AccordionSection>

      <AccordionSection title="장학금 지급 기준" icon={FaGraduationCap}>
        <StyledTable headers={scholarshipCriteriaData.headers} data={scholarshipCriteriaData.data} />
      </AccordionSection>

      <AccordionSection title="심의 일정" icon={FaCalendarCheck}>
        <StyledTable headers={reviewScheduleData.headers} data={reviewScheduleData.data} />
      </AccordionSection>

      <AccordionSection title="기타 사항" icon={FaInfoCircle}>
        <ul className="list-disc list-inside space-y-1.5 pl-1">
          <li>백인백색 HOPE 프로그램은 120학점 이상 이수 후 신청 가능합니다.</li>
          <li>휴학 기간 중의 활동은 복학 후 증빙자료를 제출할 경우 심의를 통해 인정될 수 있습니다.</li>
          <li>기타 명시되지 않은 사항은 관련 위원회의 결정에 따릅니다.</li>
        </ul>
      </AccordionSection>
    </motion.div>
  );
};

export default HopeCard;