// src/components/fixedAnswers/LocationInfo.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaMapPin, FaRoute, FaPhoneAlt, FaUserGraduate, FaMap } from 'react-icons/fa'; // FaMap 추가 (대체용)
import { SiNaver } from 'react-icons/si'; // Naver 아이콘 (Simple Icons)
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';


// 애니메이션 Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export default function LocationInfo() {
  const directions = [
    {
      id: 'seohaean',
      title: '서해안고속도로 (동군산IC 이용 시)',
      steps: [
        '동군산IC 진출 후 대야교차로에서 "전주·군산·익산" 방면으로 좌회전',
        '대야교차로에서 "익산" 방면으로 우회전',
        '호원대삼거리에서 "황등·호원대학교" 방면으로 비보호 좌회전',
        '호원대3길을 따라 직진하면 캠퍼스 입구 도착',
      ],
    },
    {
      id: 'honam',
      title: '호남고속도로 (익산IC 이용 시)',
      steps: [
        '익산IC 진출 후 송학교차로에서 "익산역·군산·임피" 방면으로 우회전',
        '송학교차로에서 "군산IC" 방면으로 우회전',
        '서수교차로에서 "서수·황등" 방면 우회전 후, "호원대학교" 방면으로 좌회전',
        '호원대3길을 따라 우회전하면 캠퍼스 입구 도착',
      ],
    },
  ];

  return (
    <motion.div
      className="p-6 md:p-8 max-w-3xl bg-white  rounded-2xl shadow-xl border border-gray-200 "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-gray-900  mb-6 md:mb-8 flex items-center justify-center md:justify-start"
      >
        <FaMapMarkedAlt className="mr-3 text-indigo-600 " />
        찾아오시는 길
      </motion.h2>

      {/* 주소 섹션 */}
      <motion.div variants={itemVariants} className="mb-6 md:mb-8 p-5 bg-gray-50  rounded-lg border border-gray-200 ">
        <h3 className="text-lg font-semibold text-gray-800  mb-2 flex items-center">
          <FaMapPin className="mr-2 text-red-500 " />
          주소
        </h3>
        <p className="text-gray-700  text-base">
          전북특별자치도 군산시 임피면 호원대3길 64 (우: 54000)
        </p>
      </motion.div>

      {/* 경로 안내 섹션 */}
      {directions.map((direction) => (
        <motion.div
          key={direction.id}
          variants={itemVariants}
          className="mb-6 md:mb-8 p-5 bg-gray-50  rounded-lg border border-gray-200 "
        >
          <h3 className="text-lg font-semibold text-gray-800  mb-3 flex items-center">
            <FaRoute className="mr-2 text-green-500 " />
            {direction.title}
          </h3>
          <ul className="list-decimal list-inside space-y-1.5 text-sm text-gray-700  pl-1">
            {direction.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </motion.div>
      ))}

      {/* 네이버맵 버튼 */}
      <motion.div variants={itemVariants} className="text-center mt-6 md:mt-8 mb-6 md:mb-8">
        <a
          href="https://map.naver.com/p/search/%ED%98%B8%EC%9B%90%EB%8C%80%ED%95%99%EA%B5%90?c=15.00,0,0,0,dh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-base font-semibold text-white transition-colors duration-300 bg-green-600 hover:bg-green-700   shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          {/* 아래 SiNaver 아이콘을 사용합니다. 만약 SiNaver도 오류가 발생하면 <FaMap /> 등으로 대체하세요. */}
          <SiNaver className="mr-2.5 h-5 w-5" />
          네이버맵으로 길찾기
          <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4 opacity-80"/>
        </a>
      </motion.div>

      {/* 연락처 정보 */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-gray-200  text-sm text-gray-600  space-y-2"
      >
        <h3 className="text-md font-semibold text-gray-800  mb-1">연락처</h3>
        <div className="flex items-center">
          <FaPhoneAlt className="mr-2 text-gray-500  text-xs" />
          <span>대표전화: </span>
          <a href="tel:0634507114" className="ml-1 text-blue-600 hover:underline ">063-450-7114</a>,
          <a href="tel:0634507119" className="ml-1 text-blue-600 hover:underline ">7119</a>
        </div>
        <div className="flex items-center">
          <FaUserGraduate className="mr-2 text-gray-500  text-xs" />
          <span>입학문의: </span>
          <a href="tel:15889779" className="ml-1 text-blue-600 hover:underline  font-medium">1588-9779</a>
        </div>
      </motion.div>
    </motion.div>
  );
}