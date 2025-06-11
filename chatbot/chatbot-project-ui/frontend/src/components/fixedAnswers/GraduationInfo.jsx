import React, { useState } from 'react';
import { FaBook, FaExclamationTriangle, FaChevronDown, FaChevronUp, FaLink, FaListOl, FaTable, FaSyncAlt, FaUsers, FaHandsHelping as FaSocialService } from 'react-icons/fa';
import { AcademicCapIcon, ListBulletIcon, TableCellsIcon, ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // InformationCircleIcon 추가
import { motion, AnimatePresence } from 'framer-motion';

// Helper function for section variants
const sectionAnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
};

// Collapsible Section Component (이전과 동일)
const CollapsibleSection = ({ title, icon: IconComponent, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-indigo-600 flex-shrink-0" />}
          <span className="font-semibold text-lg text-left text-gray-800">{title}</span>
        </div>
        {isOpen ? <FaChevronUp className="text-gray-500 flex-shrink-0" /> : <FaChevronDown className="text-gray-500 flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } },
              collapsed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] } }
            }}
            className="p-4 md:p-6 border-t border-gray-200"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 교과목 이수 원칙 내용
const CoursePrinciplesContent = () => (
  <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-4">
    <h4 className="font-semibold text-gray-800">가. 졸업이수 학점</h4>
    <p>졸업이수 학점은 보건대학 소속 학과와 유아교육과는 130학점, 그 외 학부(과)는 120학점 이상으로 하되, 학칙 제52조에 의한 학점 단위로 이수하여야 하며, 다음 각 호와 같이 이수한다.</p>
    <ol className="list-decimal list-outside pl-5 space-y-2">
      <li>
        교양 학점은 보건대학 소속 학과와 유아교육과는 30학점, 그 외 학부(과)는 33학점 이상 이수하되, 호원교양 영역에서 4학점(인성함양 영역 2학점 포함 하되, 야간, 복수전공 이수자 및 위탁(계약학과)은 제외), 기초교양 영역에서 6학점(의사소통영역 3학점 포함), 핵심 교양영역에서 6학점(2개 영역 이상)을 이수해야 한다. 단, 총 이수학점은 48학점을 초과할 수 없다.
      </li>
      <li>
        교육과정편성및운영규정 제7조 1항의 융합전공, 연계전공, 자기설계연계전공, 복수전공 이수자, 위탁교육 및 계약학과는 교양 30학점 이상 이수, 간호학과 교직이수 학생은 교양 24학점 이상 이수
      </li>
      <li>
        성인학습자 및 외국인 유학생(다문화가정 당사자 및 배우자 포함)은 별도의 교육과정에서 교양 30학점 이상 이수
      </li>
      <li>
        성인학습 운영학과의 전공, 교양 이수학점에 대한 사항은 따로 정한다.
      </li>
    </ol>

    <h4 className="font-semibold text-gray-800">나. 복학, 전과 또는 재입학 학생</h4>
    <p>소속 학부(과)에서 제공하는 해당 학년도 전공교육과정의 전공필수 교과학점을 12학점 이상 이수하여야 한다. 다만, 학부(과)가 폐지되어 다른 학부의 3학년, 4학년 과정에 복학 및 재입학자에 대한 이수학점 기준은 따로 정한다.</p>

    <h4 className="font-semibold text-gray-800">다. 편입학 학생</h4>
    <p>소속 학부(과)에서 제공하는 전공교육과정의 해당 학년 전공필수 교과학점을 포함하여 전공 교과학점을 36학점 이상 이수하여야 한다. 단, 4학년 과정에 편입학자는 해당 학과의 전공교육과정에서 졸업에 필요한 잔여 학점을 이수하여야 한다.</p>

    <h4 className="font-semibold text-gray-800">라. 교직이수 대상자</h4>
    <p>전공과정에서 50학점 이상 이수하되, 별도로 교직과정을 22학점 이상 이수하도록 한다. 이 경우 교직과목은 최소전공이수학점에 포함하지 아니한다.</p>

    <h4 className="font-semibold text-gray-800">마. 교과목 이수 순서</h4>
    <p>교양교과목은 저학년에서, 전공교과목은 고학년에서 이수함을 원칙으로 하되, 동일 교과목의 이수는 이를 인정하지 아니할 수 있다.</p>

    <h4 className="font-semibold text-gray-800">바. 사전평가제(학습경험)</h4>
    <p>교과목의 사전평가제(학습경험)을 통해서 일정수준 자격이 인정 될 경우 「학습경험인정제운영」규정에 따라 학점을 취득할 수 있다.</p>

    <h4 className="font-semibold text-gray-800">사. 사회봉사학점 취득</h4>
    <p>「사회봉사교과목운영」지침에 따른다.</p>
  </div>
);

// 다전공 내용
const MultiMajorContent = () => (
  <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-4">
    <h4 className="font-semibold text-gray-800">가. 복수전공</h4>
    <ol className="list-decimal list-outside pl-5 space-y-2">
        <li>학부 내 복수전공 : 소속 학부(과)의 타 전공 교육과정에서 지정하는 전공필수 9학점을 포함하여 24학점 이상 이수</li>
        <li>타 학부(과) 복수전공 : 타 학부(과)에서 지정하는 전공필수 9학점을 포함하여 36학점 이상 이수하면 복수전공을 인정한다.</li>
    </ol>
    <h4 className="font-semibold text-gray-800">나. 융합전공</h4>
    <p>참여학부(과) 전공별 15학점 이상, 융합신설과목 15학점 이상 편성하고 36학점 이상 이수하면 복수전공을 인정한다.</p>
    <h4 className="font-semibold text-gray-800">다. 연계전공 (자기설계연계전공 포함)</h4>
    <p>참여학부(과) 전공별 15학점에서 21학점 이상 편성하고 36학점이상 이수하면 복수전공을 인정한다.</p>
    <h4 className="font-semibold text-gray-800">라. 소단위 전공 과정</h4>
    <p>학부(과) 및 전공의 미래 수요를 반영하고 융복합 사고능력 함양을 위한 실무형 집중 교육과정으로 교육과정 특성과 편성 및 이수학점에 따라 대학트랙, 마이크로디그리, 나노디그리로 구분하여 이수를 인정한다.</p>
    <h4 className="font-semibold text-gray-800">마. 기타</h4>
    <p>다전공 이수로 인정되지 못한 교과목의 이수는 자유선택교과목을 이수한 것으로 본다.</p>
  </div>
);

// 사회봉사학점 내용
const SocialServiceCreditContent = () => (
  <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-4">
    <p>사회봉사 교과목은 당해 학기(계절학기 포함) 중에 이수하여야 하며, 최소 봉사활동 시간은 이론교육 2시간(인성교육 1시간, 오리엔테이션 교육 1시간)과 사회봉사활동 40시간으로 한다. 단, 당해 학기 졸업 예정자는 당해 학기 중 이수하여야 한다.</p>
    <ol className="list-decimal list-outside pl-5 space-y-2">
      <li>봉사활동 기관의 선정은 자원봉사기본법의 범주를 벗어나지 않는 비영리단체(복지기관)을 원칙으로 하며, 학생들이 선택한 기관에서 1365자원봉사포털, VMS, 대한적십자사 혈액관리본부에서 봉사활동 증명서와 헌혈증명서 발급이 가능한 기관으로 한다.</li>
      <li>사회봉사 교과목 : 보건의료봉사, 지역사회봉사, 재능기부봉사, 농어촌봉사</li>
      <li>
        <p className="font-semibold text-gray-800">성적평가 방법:</p>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full text-xs border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300">평가 내용</th>
                <th className="p-2 border border-gray-300">내용</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-2 border border-gray-300 font-medium">평가방법</td>
                <td className="p-2 border border-gray-300">- 사회봉사 교과목 평가는 「출석」, 「봉사활동 일지」, 「자원봉사확인서」를 근거로 담당교수가 평가</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">평가배점</td>
                <td className="p-2 border border-gray-300">
                  - 이론교육 : 20점(필수)<br />
                  - 출석 : 20점(중간점검)<br />
                  - 사회봉사시간(40시간 필수, 자원봉사활동 확인서 기준) : 40점 (수강신청 사회봉사영역에 기본 20시간을 포함하여 총 40시간 봉사활동) / 또는 선택영역 봉사활동시간 40시간만으로도 인정<br />
                  - 봉사활동 일지(사회봉사활동 수기, 봉사일지 성실작성) : 20점
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">평가기준</td>
                <td className="p-2 border border-gray-300">- P(pass) / F(fail) (졸업학점에는 포함하고 평균평점계산에는 산입하지 않음)</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">봉사활동 증빙</td>
                <td className="p-2 border border-gray-300">
                  - 자원봉사확인서(1365자원봉사포털, VMS, 대한적십자사 혈액관리본부에서 발급하는 증명서) 출력 후 봉사활동 일지에 부착<br />
                  - 단, 증빙이 어려운 기관의 경우 봉사기관장 확인증을 받을 것
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
    </ol>
  </div>
);


// 교양 교육과정표 데이터 (예시: 실제 데이터는 매우 방대하므로 구조와 일부만 표현)
// 이 데이터는 실제로는 JavaScript 객체 배열로 파싱하여 동적으로 테이블을 생성해야 합니다.
const LiberalArtsCurriculumTable = () => (
    <div className="prose prose-sm sm:prose-base max-w-none overflow-x-auto">
      <p className="text-xs text-gray-500 mb-2">* 표의 내용이 길어 좌우로 스크롤될 수 있습니다. PC 환경에서 보시기를 권장합니다.</p>
      <table className="min-w-full divide-y divide-gray-300 border border-gray-300 text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr className="divide-x divide-gray-300">
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">이수구분</th>
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">영역</th>
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">교과목</th>
            <th scope="col" className="px-3 py-2.5 text-center font-semibold text-gray-700">학점</th>
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">필수/비고</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* 기초교양 예시 - 실제로는 파싱된 전체 데이터로 반복 렌더링 필요 */}
          <tr className="divide-x divide-gray-300"><td rowSpan="11" className="px-3 py-2 align-top font-medium text-gray-600">기초교양<br/>(기초교육)<br/>(37과목)</td><td rowSpan="6" className="px-3 py-2 align-top">1영역 사고교육<br/>(6과목)</td><td className="px-3 py-2">논리와비판적사고</td><td className="px-3 py-2 text-center">3</td><td rowSpan="11" className="px-3 py-2 align-top">6학점<br/>(3영역<br/>3학점<br/>포함)</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">소프트웨어적사고</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">창의적사고</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">전략적사고와이해</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">데이터사이언스와AI</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">문화로듣는팝뮤직과프로덕션</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300"><td rowSpan="5" className="px-3 py-2 align-top">2영역 정보기술교육<br/>(5과목)</td><td className="px-3 py-2">컴퓨터기초및활용</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">유쾌한코딩</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">소셜네트워크의이해</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">컴퓨터핵심및응용</td><td className="px-3 py-2 text-center">3</td></tr>
          <tr className="divide-x divide-gray-300">                                                                                      <td className="px-3 py-2">프로그래밍입문</td><td className="px-3 py-2 text-center">3</td></tr>
          {/* ... (핵심교양, 자유교양, 호원교양 등 나머지 데이터 행 추가) ... */}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-600">※ 2024학년도 교육과정에서 호원교양 희망디딤돌 교과목 대체교과목 추가: 생활디자인과문화(2021학년도부터 소급적용)</p>
    </div>
  );

// 폐지 교과목 및 대체 교과목 테이블 데이터
const AbolishedCoursesTable = () => (
    <div className="prose prose-sm sm:prose-base max-w-none overflow-x-auto">
      <p className="text-xs text-gray-500 mb-2">* 표의 내용이 길어 좌우로 스크롤될 수 있습니다.</p>
      <table className="min-w-full divide-y divide-gray-300 border border-gray-300 text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr className="divide-x divide-gray-300">
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">폐지 교과목(학점)</th>
            <th scope="col" className="px-3 py-2.5 text-left font-semibold text-gray-700">대체/동일유사 교과목(학점)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">ESG커뮤니케이션과사례분석(3)</td><td className="px-3 py-2">ESG실천과지속가능한인재(3)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">현대인과재테크(3)</td><td className="px-3 py-2">세계화바로알기(3)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">지속가능한K-컬쳐(3)</td><td className="px-3 py-2">대중문화의이해(3)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">지역사회와아트테크(3)</td><td className="px-3 py-2">문화콘텐츠로세상읽기(3)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">인공지능과공존하기(3)</td><td className="px-3 py-2">데이터사이언스와AI(3)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">생명과학과벤처경영(2)</td><td className="px-3 py-2">창업아이템개발(2)</td></tr>
          <tr className="divide-x divide-gray-300"><td className="px-3 py-2">명상수행과마음공부(2)</td><td className="px-3 py-2">나를찾아떠나는문학여행(2)</td></tr>
        </tbody>
      </table>
    </div>
  );


export default function GraduationInfo() {
  return (
    <motion.div
      className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl space-y-8 border border-gray-200"
      initial="initial"
      animate="animate"
      variants={sectionAnimationVariants}
    >
      <header className="text-center">
        <motion.h1 /* ... (이전과 동일) ... */ >호원대학교 졸업요건 안내</motion.h1>
        <motion.p /* ... (이전과 동일) ... */ >(2025학년도 이후 교육과정 적용학생)</motion.p>
      </header>

      {/* 일반 원칙 및 주요 학점 요건 (상세 내용 추가) */}
      <motion.section variants={sectionAnimationVariants} className="p-4 sm:p-6 bg-white rounded-lg shadow border border-gray-100">
        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">
          <AcademicCapIcon className="h-7 w-7 mr-3 text-indigo-500 flex-shrink-0" /> 졸업 기본 원칙 및 학점
        </h2>
        <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-3">
          <p className="text-base font-medium text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            <FaExclamationTriangle className="inline h-5 w-5 mr-2 mb-0.5" /> 모든 학생은 신․편입 입학 당시의 교육과정을 적용함을 원칙으로 합니다.
          </p>
          <h4 className="font-semibold text-gray-800 !mt-5">학생 소속 및 전공이수</h4>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>2025학년도 입학생은 입학한 모집단위 학부(과)에 소속하며, 전공별로 소속을 구분 하지 않습니다.</li>
            <li>4학년 1학기에 제1전공 및 다전공 인정신청서를 제출하면 이수과목과 학점을 심사하여 전공을 부여합니다.</li>
          </ul>
          <h4 className="font-semibold text-gray-800">단일전공 및 복수전공 이수학점</h4>
            <ul className="list-disc list-outside pl-5 space-y-1">
                <li><strong>단일전공자:</strong> 최소전공이수학점은 전공필수 12학점을 포함하여 60학점 이상 이수하여야 합니다.</li>
                <li><strong>복수전공자 (주전공):</strong> 최소전공이수학점은 전공필수 12학점을 포함하여 36학점 이상 이수하여야 합니다. (단, 기초교과군, 핵심교과군, 심화교과군에서 각각 3학점 이상 반드시 필수로 이수하여야 하며, 전공필수 12학점을 초과하여 이수한 학점은 전공선택 이수학점으로 인정)</li>
            </ul>
            {/* 교양/교직이수 등은 "교과목 이수원칙"에서 상세히 다룸 */}
        </div>
      </motion.section>

      <CollapsibleSection title="교과목 이수 원칙 (상세)" icon={ListBulletIcon} defaultOpen={true}> {/* 기본으로 열려있도록 defaultOpen 추가 */}
        <CoursePrinciplesContent />
      </CollapsibleSection>
      
      <CollapsibleSection title="다전공 (복수/융합/연계전공 등) 안내" icon={FaUsers}>
        <MultiMajorContent />
      </CollapsibleSection>

      <CollapsibleSection title="사회봉사학점 안내" icon={FaSocialService}>
        <SocialServiceCreditContent />
      </CollapsibleSection>

      <CollapsibleSection title="교양 교육과정표 보기" icon={TableCellsIcon}>
        <LiberalArtsCurriculumTable />
      </CollapsibleSection>

      <CollapsibleSection title="폐지 교과목 및 대체 교과목 안내" icon={ArrowPathIcon}>
        <AbolishedCoursesTable />
      </CollapsibleSection>
      
      <motion.section variants={sectionAnimationVariants} className="p-4 sm:p-6 bg-white rounded-lg shadow border border-gray-100">
        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-purple-700 mb-4 pb-2 border-b border-purple-100">
            <InformationCircleIcon className="h-7 w-7 mr-3 text-purple-500 flex-shrink-0" /> 교육과정 특징 및 기타 유의사항
        </h2>
        <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-3">
            <h4 className="font-semibold text-gray-800">특징</h4>
            <p>신입학생에게 적용되는 교육과정은 교과목 이수원칙에서 명시한 바와 같이 졸업을 위한 교양교과와 전공교과의 최소 이수학점만을 규정하고 있으므로 학생들은 총 졸업학점 중 졸업을 위해 필요한 최소한의 이수학점 이외에는 본인이 자유롭게 교과목을 선택할 수 있으며, 본인의 희망에 의해 다전공 취득이 가능합니다.</p>
            
            <h4 className="font-semibold text-gray-800 !mt-5">이수 구분 용어</h4>
            <ul className="list-disc list-outside pl-5 space-y-1">
                <li><strong>교양:</strong> 호교(호원교양), 기교(기초교양), 핵교(핵심교양), 자교(자유교양)</li>
                <li><strong>전공:</strong> 전필(전공필수), 전선(전공선택)</li>
            </ul>
        </div>
      </motion.section>

      <motion.div variants={sectionAnimationVariants} className="mt-8 text-center">
        <a
          href="https://www.howon.ac.kr/web/_guide/index.html?sm=curriculum"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow hover:shadow-md transition-all duration-150 ease-out transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLink className="mr-2" /> 이전 교육과정 상세보기
        </a>
      </motion.div>
    </motion.div>
  );
}