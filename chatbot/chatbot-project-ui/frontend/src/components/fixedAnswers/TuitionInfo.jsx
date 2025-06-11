// src/components/TuitionInfo.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaUsers,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaQuestionCircle,
  FaPhoneAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
      type: "spring",
      stiffness: 100,
    },
  },
};

const cardHoverEffect = {
  scale: 1.03,
  translateY: -5,
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)", // Tailwind shadow-xl
};

const TuitionInfo = () => (
  <motion.div
    className="p-4 md:p-6 lg:p-8 max-w-6xl space-y-8 md:space-y-10"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* 최상단 안내 및 문의처 */}
    <motion.div
      variants={itemVariants}
      className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-2 flex items-center">
            <FaUniversity className="mr-3 text-blue-600 " />
            등록 안내
          </h2>
          <p className="text-gray-600  mb-4 sm:mb-0">
            등록금 납부 및 관련 절차에 대해 안내해 드립니다. <br className="hidden sm:block" />
            인트라넷에서 상세 내용을 꼭 확인해주세요! 😊
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 text-left sm:text-right flex-shrink-0">
          <p className="text-sm font-semibold text-gray-700  mb-1">
            [문의처] 재정팀
          </p>
          <a
            href="tel:0634507055"
            className="flex items-center justify-start sm:justify-end text-lg font-medium text-blue-600 hover:text-blue-700   transition-colors"
          >
            <FaPhoneAlt className="mr-2" />
            063-450-7055
          </a>
        </div>
      </div>
    </motion.div>

    {/* 정보 카드 그리드 */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {/* 1. 등록대상 */}
      <motion.div
        variants={itemVariants}
        whileHover={cardHoverEffect}
        className="bg-white  rounded-xl shadow-lg p-6 border border-gray-200  flex flex-col"
      >
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <FaUsers className="mr-2 text-green-500 " />
          등록대상
        </h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700  mb-4">
          <li>재학생</li>
          <li>복학생</li>
          <li>재입학생</li>
          <li>초과학기자</li>
        </ul>
        <div className="mt-auto pt-3 border-t border-gray-200 ">
          <p className="text-xs text-red-600  font-medium flex items-center">
            <FaExclamationTriangle className="mr-1.5" />
            등록기간 내 미등록 시 제적 처리됨
          </p>
        </div>
      </motion.div>

      {/* 2. 등록기간 */}
      <motion.div
        variants={itemVariants}
        whileHover={cardHoverEffect}
        className="bg-white  rounded-xl shadow-lg p-6 border border-gray-200  flex flex-col"
      >
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <FaCalendarAlt className="mr-2 text-purple-500 " />
          등록기간
        </h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700  mb-4">
          <li>1학기: 통상 2월 말 ~ 3월 초</li>
          <li>2학기: 통상 8월 말 ~ 9월 초</li>
        </ul>
        <p className="text-xs text-gray-500  mb-4">
            (정확한 기간은 학기별 공지사항 확인)
        </p>
        <a
          href="https://www.howon.ac.kr/web/_guide/index.html?sm=return"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full group text-sm font-medium text-purple-600  bg-purple-50  hover:bg-purple-100  border border-purple-200  rounded-lg py-2.5 px-4 text-center transition-all duration-300 flex items-center justify-center"
        >
          등록금 반환 안내
          <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4 opacity-70 group-hover:opacity-100" />
        </a>
      </motion.div>

      {/* 3. 등록금 확인 방법 */}
      <motion.div
        variants={itemVariants}
        whileHover={cardHoverEffect}
        className="bg-white  rounded-xl shadow-lg p-6 border border-gray-200  flex flex-col"
      >
        <h3 className="text-xl font-semibold text-gray-900  mb-4 flex items-center">
          <FaFileInvoiceDollar className="mr-2 text-yellow-500 " />
          등록금 확인/납부
        </h3>
        <div className="space-y-3">
          {[
            { text: "등록금 고지서 출력", href: "https://intra.howon.ac.kr/Login/fee_login_form.html" },
            { text: "등록금 납부 확인서", href: "https://intra.howon.ac.kr/nyx9/t_2/index_Payment1.html" },
            { text: "등록금 납입 증명서", href: "https://intra.howon.ac.kr/nyx9/t_2/index_Payment.html" },
          ].map((link) => (
            <a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group text-sm font-medium text-yellow-700  bg-yellow-50  hover:bg-yellow-100  border border-yellow-200  rounded-lg py-2.5 px-4 text-center transition-all duration-300 flex items-center justify-center"
            >
              {link.text}
              <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4 opacity-70 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* 4. Q&A (col-span-full) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-3 bg-white  rounded-xl shadow-lg p-6 border border-gray-200 "
      >
        <h3 className="text-xl font-semibold text-gray-900  mb-3 flex items-center">
          <FaQuestionCircle className="mr-2 text-teal-500 " />
          자주 묻는 질문 (Q&A)
        </h3>
        <div>
          <p className="font-medium text-gray-800 ">
            Q. 수업연한과 등록금은 어떤 관계가 있나요?
          </p>
          <p className="mt-1 text-sm text-gray-600 ">
            A. 수업연한은 졸업을 위한 최소 등록 기간을 의미합니다. 이 기간 내에는 실제 수강하는 학점 수나 졸업요건 충족 여부와 관계없이 정규 등록금이 발생합니다. 자세한 내용은 학칙 또는 재정팀 문의를 통해 확인 가능합니다.
          </p>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default TuitionInfo;