// src/fixedAnswers/ScholarshipInfo.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBullhorn, FaUniversity } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/24/outline'; // Heroicons 사용 예시

// 애니메이션 Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardHoverEffect = {
  scale: 1.05,
  translateY: -5, // 살짝 위로 올라가는 효과
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Tailwind shadow-lg와 유사
};

const scholarshipItems = [
  {
    icon: <FaGraduationCap />,
    title: '학부 장학안내',
    description: '학부생을 위한 교내외 장학금 정보를 확인하세요.',
    link: 'https://www.howon.ac.kr/web/_guide/index.html?sm=scholarship',
    buttonText: '바로가기 →',
    bgColor: 'bg-blue-500 ',
    hoverBgColor: 'hover:bg-blue-600 ',
    iconColor: 'text-blue-500 ',
  },
  {
    icon: <FaBullhorn />,
    title: '장학금 공지사항',
    description: '최신 장학금 관련 공지 및 중요 사항을 안내합니다.',
    link: 'https://www.howon.ac.kr/web/_guide/index.html?sm=scholarshipboard',
    buttonText: '공지 확인 →',
    bgColor: 'bg-green-500 ',
    hoverBgColor: 'hover:bg-green-600 ',
    iconColor: 'text-green-500 ',
  },
  {
    icon: <FaUniversity />,
    title: '국가장학금',
    description: '한국장학재단에서 운영하는 국가장학금 정보를 확인하세요.',
    link: 'https://www.kosaf.go.kr',
    buttonText: '바로가기 →',
    bgColor: 'bg-indigo-500 ',
    hoverBgColor: 'hover:bg-indigo-600 ',
    iconColor: 'text-indigo-500 ',
  },
];

export default function ScholarshipInfo() {
  return (
    <motion.div
       className="p-4 md:p-6 lg:p-8 max-w-5xl space-y-8 md:space-y-12 text-gray-800 "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 제목 섹션 */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 ">
          <FaGraduationCap className="inline-block mr-3 mb-1 text-blue-600 " />
          장학금 안내
        </h1>
        <p className="text-base sm:text-lg text-gray-600 ">
          다양한 장학금 정보를 확인하고 여러분의 꿈을 지원받으세요!
        </p>
      </motion.div>

      {/* 장학금 카드 그리드 */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants} // 부모에서 staggerChildren이 적용되므로, 여기선 기본 variants만 사용해도 됨
      >
        {scholarshipItems.map((item) => (
          <motion.div
            key={item.title}
            className="bg-white  rounded-xl shadow-lg overflow-hidden border border-gray-200  flex flex-col"
            variants={itemVariants}
            whileHover={cardHoverEffect}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <div className={`p-6 flex flex-col items-center text-center flex-grow`}>
              <span className={`text-5xl mb-4 ${item.iconColor}`}>
                {item.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900  mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600  mb-6 flex-grow">
                {item.description}
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={`mt-auto inline-block text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition-colors duration-300 ${item.bgColor} ${item.hoverBgColor} focus:outline-none focus:ring-2 focus:ring-opacity-75`}
              >
                {item.buttonText}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 추가 정보 섹션 */}
      <motion.div
        variants={itemVariants}
        className="mt-8 md:mt-12 p-4 sm:p-6 bg-gray-100  rounded-lg border border-gray-200 "
      >
        <div className="flex items-start">
          <InformationCircleIcon className="h-8 w-8 text-blue-500  mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-gray-900  mb-1">
              더 자세한 정보가 필요하신가요?
            </h4>
            <p className="text-sm text-gray-700 ">
              인트라넷의 <strong className="font-medium">전자게시판 → 교내게시판</strong>에서 "장학"으로 검색하시거나,
              학교 <strong className="font-medium">학생지원팀</strong>에 문의하시면 친절하게 안내받으실 수 있습니다. 😊
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}