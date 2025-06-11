// src/components/fixedAnswers/RelatedSites.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaChalkboardTeacher, FaSuitcase, FaGlobe, FaBookReader } from 'react-icons/fa';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
// 로고 이미지 import
import howonLogo from '../../assets/logo_basic001.png';

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
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// 사이트 정보 배열
const SITES = [
  {
    title: "호원대학교 대표 홈페이지",
    description: "학교의 모든 소식과 정보를 한눈에 볼 수 있는 공식 홈페이지입니다.",
    url: "https://www.howon.ac.kr/web/main.html",
    icon: howonLogo, // 이미지 경로 사용
    color: "text-blue-500",
    isImage: true, // 이미지임을 표시
  },
  {
    title: "인트라넷",
    description: "학적, 성적, 수강신청 등 주요 학사 정보 시스템에 접속합니다.",
    url: "https://intra.howon.ac.kr/",
    icon: FaSignInAlt,
    color: "text-green-500",
    isImage: false,
  },
  {
    title: "교수학습개발원 (CTL)",
    description: "다양한 학습 프로그램과 지원을 통해 여러분의 학습 역량을 키워나갑니다.",
    url: "https://ctl.howon.ac.kr/",
    icon: FaChalkboardTeacher,
    color: "text-purple-500",
    isImage: false,
  },
  {
    title: "Dream Hope 커리어 시스템",
    description: "진로 탐색, 취업 정보, 경력 개발 등 여러분의 미래를 설계하는 공간입니다.",
    url: "https://career.howon.ac.kr/",
    icon: FaSuitcase,
    color: "text-orange-500",
    isImage: false,
  },
  {
    title: "인당도서관",
    description: "도서 검색, 대출/연장, 전자자료 등 다양한 학술 정보를 제공합니다.",
    url: "https://indang.howon.ac.kr/",
    icon: FaBookReader,
    color: "text-teal-500",
    isImage: false,
  },
];


const RelatedSites = () => {
  return (
    <motion.div
      className="p-4 md:p-6 max-w-4xl  space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-gray-900 text-center flex items-center justify-center"
      >
        <FaGlobe className="mr-3 text-indigo-600" />
        관련 홈페이지 안내
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITES.map((site) => (
          <motion.a
            key={site.title}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group block bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex flex-col h-full">
              <div className={`mb-4 flex justify-center items-center ${site.color}`}>
                {site.isImage ? (
                  <img src={site.icon} alt={site.title} className="h-6 " />
                ) : (
                  <div className="text-4xl">
                    <site.icon />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{site.title}</h3>
              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {site.description}
              </p>
              <div className="mt-4 text-sm font-semibold text-indigo-600 group-hover:underline flex items-center">
                바로가기
                <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedSites;