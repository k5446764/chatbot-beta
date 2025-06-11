// src/components/CertificateInfo.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaGlobe,
  FaUniversity,
  FaListUl,
  FaEnvelopeOpenText,
  FaInfoCircle,
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

// 카드 데이터 (스타일 일관성을 위해)
const certificateSections = [
  {
    id: "online",
    title: "인터넷 증명 발급",
    icon: <FaGlobe className="mr-2.5 text-blue-500 " />,
    bgColor: "bg-blue-50 ",
    borderColor: "border-blue-200 ",
    textColor: "text-blue-900 ",
    linkColor: "text-blue-600 hover:text-blue-700  ",
    listItems: [
      "학교 홈페이지 로그인",
      "전자증명 또는 출력증명 선택",
      "증명서 종류 및 매수 입력 후 결제",
      "전자증명: 30일간 무제한 열람/출력",
      "출력증명: 최초 1회만 출력 가능",
    ],
    link: { href: "https://unc.doculink.co.kr/index/activeX.do", text: "인터넷 증명발급 바로가기" },
  },
  {
    id: "inperson",
    title: "제증명 발급 (방문)",
    icon: <FaUniversity className="mr-2.5 text-green-500 " />,
    bgColor: "bg-green-50 ",
    borderColor: "border-green-200 ",
    textColor: "text-green-900 ",
    linkColor: "text-green-600 hover:text-green-700  ",
    listItems: [
      "장소: 대학본부 6동 2층 교무처",
      "시간: 월~금 09:00~18:00 (점심시간 12:00~13:00 제외)",
      "본인 신분증 지참 필수",
      "대리인 방문 시: 위임장 및 대리인 신분증 지참",
    ],
  },
  {
    id: "types",
    title: "증명서 종류",
    icon: <FaListUl className="mr-2.5 text-purple-500 " />,
    bgColor: "bg-purple-50 ",
    borderColor: "border-purple-200 ",
    textColor: "text-purple-900 ",
    linkColor: "text-purple-600 hover:text-purple-700  ",
    listItems: [
      "국문/영문: 재학, 휴학, 성적, 졸업(예정), 수료(예정), 제적 등",
      "교육비 납입증명서, 학적부 사본",
      "교원자격취득(예정) 확인서 등",
      "영문 증명서: 인트라넷 영문 이름 등록 확인",
    ],
    link: { href: "https://www.howon.ac.kr/web/_guide/index.html?sm=certificate", text: "증명서 상세 목록 보기" },
  },
  {
    id: "mail",
    title: "우편 서비스 (유료)",
    icon: <FaEnvelopeOpenText className="mr-2.5 text-yellow-500 " />,
    bgColor: "bg-yellow-50 ",
    borderColor: "border-yellow-200 ",
    textColor: "text-yellow-900 ",
    linkColor: "text-yellow-600 hover:text-yellow-700  ",
    listItems: [
      "계좌: 농협 949-01-119321 (예금주: 호원대학교)",
      "입금 확인 후 2~3일 내 발송 (빠른등기)",
      "신청자명과 입금자명 일치 필수",
      "우편요금은 발급 수수료와 별도",
    ],
    link: { href: "https://www.howon.ac.kr/web/_guide/index.html?sm=certificate", text: "우편 서비스 상세 안내" },
  },
];

const CertificateInfo = () => (
  <motion.div
    className="p-4 md:p-6 lg:p-8 max-w-6xl  space-y-8 md:space-y-10"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* 페이지 제목 */}
    <motion.div variants={itemVariants} className="text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900  mb-3 flex items-center justify-center md:justify-start">
        <FaCertificate className="mr-3 text-indigo-600 " />
        증명발급 안내
      </h1>
      <p className="text-gray-600 ">
        각종 증명서 발급 방법을 안내해 드립니다. 아래 내용을 참고해 주세요.
      </p>
    </motion.div>

    {/* 중요 안내사항 */}
    <motion.div
      variants={itemVariants}
      className="p-4 rounded-lg bg-red-50  text-red-700  border border-red-200  flex items-start shadow"
    >
      <FaExclamationTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
      <p className="text-sm font-medium">
        <strong>유의사항:</strong> 도서 미반납 또는 도서 연체료 미납 시 증명서 발급이 불가합니다. 발급 전 반드시 확인해 주시기 바랍니다.
      </p>
    </motion.div>

    {/* 정보 카드 그리드 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {certificateSections.map((section) => (
        <motion.div
          key={section.id}
          variants={itemVariants}
          whileHover={cardHoverEffect}
          className={`rounded-xl shadow-lg p-6 border flex flex-col ${section.bgColor} ${section.borderColor}`}
        >
          <h3 className={`text-xl font-semibold mb-4 flex items-center ${section.textColor}`}>
            {section.icon}
            {section.title}
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700  flex-grow mb-4">
            {section.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {section.link && (
            <a
              href={section.link.href}
              target="_blank"
              rel="noreferrer"
              className={`mt-auto inline-flex items-center text-sm font-medium py-2 px-3 rounded-md hover:underline focus:outline-none focus:ring-2 focus:ring-opacity-75 ${section.linkColor} focus:ring-current`}
            >
              {section.link.text}
              <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" />
            </a>
          )}
        </motion.div>
      ))}

      {/* 기타 안내 (그리드 전체 너비) */}
      <motion.div
        variants={itemVariants}
        whileHover={cardHoverEffect}
        className="md:col-span-2 bg-gray-50  rounded-xl shadow-lg p-6 border border-gray-200 "
      >
        <h3 className="text-xl font-semibold text-gray-900  mb-4 flex items-center">
          <FaInfoCircle className="mr-2.5 text-gray-500 " />
          기타 안내
        </h3>
        <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700 ">
          <li>교육비 납입 증명서: 연말정산 소득공제용으로 사용 가능합니다.</li>
          <li>입학성적확인원 발급 문의: 입학과 (교내 전화번호 확인 필요)</li>
          <li>기타 문의: 교무처 또는 해당 부서</li>
        </ul>
      </motion.div>
    </div>
  </motion.div>
);

export default CertificateInfo;