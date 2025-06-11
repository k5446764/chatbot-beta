// src/components/DormInfo.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome, FaMapMarkedAlt, FaPhoneAlt, FaEnvelope, FaSignInAlt, FaSignOutAlt,
  FaClipboardList, FaRegBuilding, FaChevronDown, FaChevronUp, FaUsersCog, FaCalendarCheck, FaExclamationTriangle
} from 'react-icons/fa';
import { ArrowTopRightOnSquareIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

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

const accordionContentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: 'hidden' },
  expanded: {
    opacity: 1,
    height: 'auto',
    marginTop: '1rem',
    marginBottom: '1rem',
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
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-gray-900  flex items-center">
          <IconComponent className="mr-3 text-indigo-600  text-2xl" />
          {title}
        </h3>
        {isOpen ? (
          <FaChevronUp className="h-5 w-5 text-gray-500 " />
        ) : (
          <FaChevronDown className="h-5 w-5 text-gray-500 " />
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
            className="px-5 md:px-6 pb-5 text-sm text-gray-700  space-y-4 prose prose-sm  max-w-none"
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const DormInfo = () => {
  // 입사 안내 데이터
  const admissionInfo = {
    eligibility: `
      <p>① 생활관의 입사자격은 본 대학교의 신입생 및 재학생을 원칙으로 한다.</p>
      <p>② 다음 각 호에 해당하는 학생은 생활관에 입사할 수 없다.</p>
      <ul class="list-decimal list-inside ml-4">
        <li>학칙에 의한 유기정학 이상의 징계처분 중인 자</li>
        <li>생활관에서 내규위반 퇴사처분을 받은 자</li>
        <li>법정 전염병 질환에 감염된 자</li>
        <li>휴학자 또는 해당학기 등록을 필하지 않은 자</li>
        <li>기타 관장이 부적당하다고 인정하는 자</li>
      </ul>
    `,
    period: "<p>관생의 입사기간은 본 대학교 개학기간에 따르되, 관장은 필요에 따라 개관기간을 조정할 수 있다.</p>",
    applicationMethod: `
      <p>신입생은 원서접수 시 생활관 입사희망 란에 표시하거나 생활관으로 전화를 하는 방법으로 신청합니다.</p>
      <p>재학생은 학기 중 수강신청기간에 인터넷을 통해서 신청합니다.</p>
      <p>복학생은 복학신청기간에 생활관을 방문해서 신청합니다.</p>
      <p><strong>TEL:</strong> 
        <a href="tel:0634507151" class="text-blue-600 hover:underline ">063-450-7151</a> ~ 
        <a href="tel:0634507153" class="text-blue-600 hover:underline ">7153</a>
      </p>
    `,
    applicationPeriod: `
      <p>수강신청기간과 동일합니다.</p>
      <p class="font-semibold mt-2">학기 중 신청기간</p>
      <ul class="list-disc list-inside ml-4">
        <li>1학기: 인터넷으로 2학기 수강신청을 하고, 수강신청서의 학생생활관 입사여부란에 Click.</li>
        <li>2학기: 인터넷으로 다음해 1학기 수강신청을 하고, 수강신청서의 학생생활관 입사여부란에 Click.</li>
      </ul>
      <p class="font-semibold mt-2">방학 중 신청기간</p>
      <ul class="list-disc list-inside ml-4">
        <li>하계: 2학기 수강신청기간</li>
        <li>동계: 1학기 수강신청기간</li>
      </ul>
      <p class="text-xs text-red-500  mt-1">※ 신청기간은 변경될 수 있음.</p>
    `,
    openingPeriod: `
      <p class="font-semibold">학기 중 개관기간</p>
      <ul class="list-disc list-inside ml-4">
        <li>개강 전일 ~ 기말고사 종료 다음날 오전까지</li>
      </ul>
      <p class="font-semibold mt-2">방학 중 개관기간</p>
      <ul class="list-disc list-inside ml-4">
        <li>기말고사 다음날 오후 ~ 개강전일</li>
      </ul>
      <p class="text-xs text-red-500  mt-1">※ 개관기간은 변경될 수 있음.</p>
    `,
  };

  // 퇴사 안내 데이터
  const departureInfo = {
    types: "<p>자진퇴사와 내규위반퇴사가 있습니다. 아래의 퇴사 신청과 절차를 거쳐 퇴사할 수 있으며, 생활기간에 따른 차등 금액을 환불받을 수 있습니다. (단, 내규위반퇴사 시는 환불되지 않습니다.)</p>",
    procedure: `
      <p class="font-semibold">퇴사절차</p>
      <ol class="list-decimal list-inside ml-4">
        <li>각 생활관에서 퇴사원서(퇴사서) 작성</li>
        <li>관생증 및 열쇠, 침대포 반납</li>
        <li>퇴사서를 생활관 사무실에 제출</li>
        <li>환불금액은 통장에 자동이체 (약 15일 소요)</li>
      </ol>
    `,
    refundPolicy: {
      title: "환불기준 (납입 생활관비 기준)",
      criteria: [
        { period: "입사 후 4주 이내", rate: "75% 환불" },
        { period: "입사 후 8주 이내", rate: "50% 환불" },
        { period: "입사 후 12주 이내", rate: "25% 환불" },
        { period: "입사 후 12주 이후", rate: "환불 없음" },
      ],
      note: "내규위반퇴사 시는 환불되지 않습니다.",
    }
  };

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 max-w-6xl space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 생활관 소개 카드 (입사 신청 버튼 포함) */}
      <motion.div
        variants={itemVariants}
        className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-2 flex items-center">
          <FaHome className="mr-3 text-blue-600 " />
          호원대학교 생활관 소개
        </h2>
        <p className="text-sm leading-relaxed text-gray-700  mb-6">
          호원대학교 생활관은 학생들에게 면학과 휴식을 위한 최적의 숙소와 다양한 편의시설을 제공하고 있습니다.
          생활관 입사를 희망하시는 분은 아래 버튼을 통해 신청하실 수 있습니다.
        </p>
        <a
          href="https://intra.howon.ac.kr/nyx9/t_2/index_Dormitory.html?aux=aux9&v=95f76503be033c9d977ac95a32d5ba0c286c1b7ad7617b45fb243fe9d42abbaa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-100 hover:bg-blue-600   text-blue-600 rounded-lg shadow-md transition-all duration-300 text-center font-medium"
        >
          <PencilSquareIcon className="h-5 w-5 mr-2" />
          생활관 입사 신청 바로가기
        </a>
      </motion.div>

      {/* 입사 안내 아코디언 */}
      <AccordionSection title="입사 상세 안내" icon={FaSignInAlt} defaultOpen={true}>
        <h4 className="font-semibold text-lg mt-0">1. 입사자격</h4>
        <div dangerouslySetInnerHTML={{ __html: admissionInfo.eligibility }} />
        <h4 className="font-semibold text-lg mt-3">2. 입사기간</h4>
        <div dangerouslySetInnerHTML={{ __html: admissionInfo.period }} />
        <h4 className="font-semibold text-lg mt-3">3. 신청방법</h4>
        <div dangerouslySetInnerHTML={{ __html: admissionInfo.applicationMethod }} />
        <h4 className="font-semibold text-lg mt-3">4. 신청기간</h4>
        <div dangerouslySetInnerHTML={{ __html: admissionInfo.applicationPeriod }} />
        <h4 className="font-semibold text-lg mt-3">5. 개관기간</h4>
        <div dangerouslySetInnerHTML={{ __html: admissionInfo.openingPeriod }} />
      </AccordionSection>

      {/* 퇴사 안내 아코디언 */}
      <AccordionSection title="퇴사/환불 상세 안내" icon={FaSignOutAlt}>
        <div dangerouslySetInnerHTML={{ __html: departureInfo.types }} />
        <h4 className="font-semibold text-lg mt-3">1. 퇴사절차</h4>
        <div dangerouslySetInnerHTML={{ __html: departureInfo.procedure }} />
        <h4 className="font-semibold text-lg mt-3">{departureInfo.refundPolicy.title}</h4>
        <ul className="list-none p-0 m-0">
          {departureInfo.refundPolicy.criteria.map(item => (
            <li key={item.period} className="flex justify-between py-1 border-b border-gray-200  last:border-b-0">
              <span>{item.period}:</span>
              <span className="font-medium">{item.rate}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-red-500  mt-2 flex items-center">
          <FaExclamationTriangle className="mr-1" /> {departureInfo.refundPolicy.note}
        </p>
      </AccordionSection>

     {/* 관련 링크 버튼들 */}
<motion.div variants={itemVariants}>
  <h2 className="text-xl font-bold text-gray-900  mb-4 text-center md:text-left">
    기타 생활관 정보
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <a
      href="https://house.howon.ac.kr/board/board_1.php?topmenu=6&onmenu=1"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-4 bg-blue-100 hover:bg-blue-200   text-blue-800  rounded-lg shadow-sm transition-all duration-300 text-center"
    >
      <FaUsersCog className="text-3xl mb-2" />
      <span className="font-medium text-sm">민원 신청</span>
    </a>

    <a
      href="https://house.howon.ac.kr/service/service_4.php?topmenu=2&onmenu=4"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-4 bg-green-100 hover:bg-green-200   text-green-800  rounded-lg shadow-sm transition-all duration-300 text-center"
    >
      <FaCalendarCheck className="text-3xl mb-2" />
      <span className="font-medium text-sm">생활수칙 안내</span>
    </a>

    <a
      href="https://house.howon.ac.kr/info/info_4.php?topmenu=1&onmenu=4"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-4 bg-purple-100 hover:bg-purple-200   text-purple-800  rounded-lg shadow-sm transition-all duration-300 text-center"
    >
      <FaRegBuilding className="text-3xl mb-2" />
      <span className="font-medium text-sm">시설 현황</span>
    </a>
  </div>
</motion.div>


      {/* 위치 및 연락처 카드 (맨 밑으로 이동) */}
      <motion.div
        variants={itemVariants}
        className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6 md:p-8 mt-8" // mt-8 추가하여 위 섹션과 간격 확보
      >
        <h2 className="text-xl font-bold text-gray-900  mb-2 flex items-center">
          <FaMapMarkedAlt className="mr-2 text-green-600 " />
          생활관 위치 및 연락처
        </h2>
        <p className="text-sm text-gray-700 ">전북특별자치도 군산시 임피면 호원대3길 64 (우: 54000)</p>
        <a href="tel:0634507114" className="text-sm text-blue-600 hover:underline  flex items-center my-1">
          <FaPhoneAlt className="mr-1.5 text-xs" /> 063-450-7114 (대표)
        </a>
        <a href="https://house.howon.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline  flex items-center">
          <FaEnvelope className="mr-1.5 text-xs" /> 생활관 홈페이지 (문의)
        </a>
      </motion.div>
    </motion.div>
  );
};

export default DormInfo;