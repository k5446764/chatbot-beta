// src/components/LibraryInfo.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookReader, FaLink, FaListAlt, FaPlusSquare, FaUsers, FaBook, FaChair, FaPhoneAlt,
  FaClock, FaTasks, FaMapMarkerAlt, FaLayerGroup, FaChevronDown, FaChevronUp, FaInfoCircle, FaBuilding
} from 'react-icons/fa';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};

const accordionContentVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
  expanded: {
    opacity: 1,
    height: 'auto',
    marginTop: '1rem', // Tailwind's mt-4
    marginBottom: '1rem', // Tailwind's mb-4
    transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
  },
};


// 아코디언 섹션 컴포넌트
const AccordionSection = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = icon;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white  rounded-xl shadow-lg border border-gray-200  overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
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
            className="px-5 md:px-6 pb-5 text-sm text-gray-700  space-y-4"
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 테이블 스타일링을 위한 간단한 컴포넌트
const StyledTable = ({ headers, data, caption }) => (
  <div className="overflow-x-auto">
    {caption && <p className="text-xs text-gray-500  mb-1">{caption}</p>}
    <table className="min-w-full divide-y divide-gray-200  border border-gray-200 ">
      <thead className="bg-gray-50 ">
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col" className="px-4 py-2.5 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white  divide-y divide-gray-200 ">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-2.5 whitespace-nowrap text-xs">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TextSection = ({ title, content }) => (
  <div>
    <h4 className="font-semibold text-gray-800  mb-1">{title}</h4>
    <div className="prose prose-sm  max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);


export default function LibraryInfo() {
  // 데이터 정의
  const staffStatusData = {
    caption: "교수직은 도서관장 (2025. 3. 1. 기준)",
    headers: ["구분", "교수", "사서직", "행정직", "조교", "합계"],
    data: [["인원", "1", "5", "1", "0", "7"]],
  };

  const collectionStatusData = {
    caption: "단행본에 학위논문 포함 (2025. 3. 1. 기준)",
    headers: ["구분", "단행본(책)", "연속간행물(종)", "e-Book(책)", "비도서(점)"],
    data: [
      ["국내서", "414,901", "118", "67,175", "17,149"],
      ["국외서", "94,288", "2", "27,673", "-"],
      ["합계", "509,189", "120", "94,848", "17,149"],
    ],
  };

  const subjectCollectionData = {
    caption: "전자책, 학위논문 제외 (2025. 3. 1. 기준)",
    headers: ["구분", "총류", "철학", "종교", "사회과학", "순수과학", "기술과학", "예술", "언어", "문학", "역사", "합계"],
    data: [["권수", "32,315", "19,324", "8,827", "95,787", "16,380", "70,137", "29,347", "19,123", "97,270", "20,296", "408,806"]],
  };

  const seatStatusData = {
    caption: "PC열람석 포함 (2025. 3. 1. 기준)",
    headers: ["구분", "자료열람실", "전자정보실", "제1열람실", "제2열람실", "제3열람실", "제4열람실", "기타", "합계"],
    data: [["열람석", "258", "234", "276", "60", "54", "54", "76", "1,012"]],
  };

  const contactData = {
    caption: "(2025. 3. 1. 기준)",
    headers: ["직위 및 구분", "성명", "담당 업무", "전화번호"],
    data: [
      ["도서관장", "김성필", "도서관 업무 총괄", "450-7101"],
      ["팀장", "신권섭", "업무총괄 및 기획, 예산", "450-7105"],
      ["팀원(부장)", "이상익", "전자자료, 비도서, 수서 및 구입", "450-7108"],
      ["팀원(과장)", "조남희", "자료정리 및 목록, 수서", "450-7103"],
      ["팀원", "라유진", "열람, 문화행사, 전산", "450-7106"],
      ["팀원", "황민정", "열람, 행정, 대출∙반납", "450-7107"],
      ["팀원", "김유란", "장서관리, 홍보 및 회의 관리", "450-7102"],
      ["FAX", "", "문서 전송", "450-7104"],
      ["전산실", "", "도서관 보안 및 서버", "450-7101"],
    ],
  };

  const openingHoursData = {
    headers: ["구분", "위치", "이용시간 (평일 - 학기 중)", "이용시간 (평일 - 방학 중)", "비고"],
    data: [
      ["논문자료실", "1층", "09:00 ~ 17:30", "09:00 ~ 14:30", "폐가제 운영"],
      ["서양자료실", "2층", "09:00 ~ 17:30", "09:00 ~ 14:30", "폐가제 운영"],
      ["자료열람실", "3,4층", "09:00 ~ 17:45", "09:00 ~ 14:45", ""],
      ["서양참고자료실", "4층", "09:00 ~ 17:45", "09:00 ~ 14:45", ""],
      ["교재자료실", "4층", "09:00 ~ 17:45", "09:00 ~ 14:45", ""],
      ["전자정보실", "6층", "09:00 ~ 17:45", "09:00 ~ 14:45", ""],
      ["세미나실/스터디실", "6층", "09:00 ~ 17:45", "09:00 ~ 14:45", "문의 후 이용"],
      ["제 1열람실", "5층", "06:30 ~ 00:30", "06:30 ~ 00:30", "학기 중 탄력 운영"],
      ["제 2,3,4열람실", "5층", "06:30 ~ 00:30", "06:30 ~ 00:30", ""],
    ],
    footer: [
      "자료열람실/전자정보실 휴관일 : 토요일, 일요일 및 국정공휴일, 그 외 별도로 정한 휴관일",
      "이용시간은 대학의 근무지침에 의해 변경될 수 있음"
    ]
  };

  const loanConditionsData = {
    headers: ["신분", "책수", "기간", "대출 연장", "연장 기간"],
    data: [
      ["재학생", "5책", "14일", "1회", "7일"],
      ["교직원", "20책", "60일", "1회", "60일"],
      ["강사, 조교", "10책", "20일", "1회", "20일"],
      ["특별열람증 발급자", "5책", "14일", "없음", "-"],
    ],
  };

  const floorGuideImages = [
    { floor: "1층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor1.gif", alt: "도서관 1층 안내도" },
    { floor: "2층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor2.gif", alt: "도서관 2층 안내도" },
    { floor: "3층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor3.gif", alt: "도서관 3층 안내도" },
    { floor: "4층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor4.gif", alt: "도서관 4층 안내도" },
    { floor: "5층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor5.gif", alt: "도서관 5층 안내도" },
    { floor: "6층", src: "https://indang.howon.ac.kr/image/ko/local/guide/floor6.gif", alt: "도서관 6층 안내도" },
  ];

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 max-w-6xl space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 기본 도서관 정보 및 주요 링크 */}
      <motion.div
        variants={itemVariants}
        className="bg-white  rounded-xl shadow-xl border border-gray-200  p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-3 flex items-center">
          <FaBookReader className="mr-3 text-blue-600 " />
          호원대학교 도서관 (인당도서관)
        </h2>
        <p className="text-gray-600  mb-4">
          도서 대출, 연체 확인, 전자자료 이용 등 다양한 서비스를 도서관 홈페이지에서 확인하세요.
        </p>
        <a
          href="https://indang.howon.ac.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700   hover:underline block mb-4"
        >
         
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="https://indang.howon.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-3 bg-blue-100 hover:bg-blue-600   text-blue-600 rounded-lg shadow-md transition-all duration-300"
          >
            <FaLink className="mr-2" /> 홈페이지
          </a>
          <a
            href="https://indang.howon.ac.kr/myloan/list"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-3 bg-green-100 hover:bg-green-600   text-green-600 rounded-lg shadow-md transition-all duration-300"
          >
            <FaListAlt className="mr-2" /> 대출조회/연장
          </a>
          <a
            href="https://indang.howon.ac.kr/purchaserequest/write"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-3 bg-purple-100 hover:bg-purple-600   text-purple-600 rounded-lg shadow-md transition-all duration-300"
          >
            <FaPlusSquare className="mr-2" /> 희망자료 신청
          </a>
        </div>
      </motion.div>

      {/* 아코디언 섹션들 */}
      <AccordionSection title="도서관 소개" icon={FaInfoCircle}>
        <h4 className="font-semibold text-gray-800  mb-1 mt-0">직원현황</h4>
        <StyledTable headers={staffStatusData.headers} data={staffStatusData.data} caption={staffStatusData.caption}/>
        <h4 className="font-semibold text-gray-800  mb-1 mt-3">장서현황</h4>
        <StyledTable headers={collectionStatusData.headers} data={collectionStatusData.data} caption={collectionStatusData.caption}/>
        <h4 className="font-semibold text-gray-800  mb-1 mt-3">주제별 자료 현황</h4>
        <StyledTable headers={subjectCollectionData.headers} data={subjectCollectionData.data} caption={subjectCollectionData.caption}/>
        <h4 className="font-semibold text-gray-800  mb-1 mt-3">열람석 현황</h4>
        <StyledTable headers={seatStatusData.headers} data={seatStatusData.data} caption={seatStatusData.caption}/>
        <h4 className="font-semibold text-gray-800  mb-1 mt-3">조직 연락처</h4>
        <StyledTable headers={contactData.headers} data={contactData.data} caption={contactData.caption}/>
      </AccordionSection>

      <AccordionSection title="이용 안내" icon={FaTasks}>
        <h4 className="font-semibold text-gray-800  mb-1 mt-0">열람시간</h4>
        <StyledTable headers={openingHoursData.headers} data={openingHoursData.data} />
        {openingHoursData.footer.map((line, index) => <p key={index} className="text-xs text-gray-500  mt-1">{line}</p>)}

        <h4 className="font-semibold text-gray-800  mb-1 mt-3">대출 조건</h4>
        <StyledTable headers={loanConditionsData.headers} data={loanConditionsData.data} />

        <TextSection title="대출" content="도서를 대출하고자 할 경우에는 원하는 자료를 도서관 홈페이지에서 검색합니다.<br/>도서명과 청구기호를 확인한 뒤, 해당 서가로 이동하여 도서를 확인합니다.<br/>대출하고자 하는 도서와 학생증(모바일 학생증 가능)을 3층 대출실 안내데스크에 제시합니다." />
        <TextSection title="반납" content="대출한 도서는 반납기한까지 3층 대출실 안내데스크에 제출합니다 (학생증 불필요).<br/>모니터에서 본인의 반납처리사항을 꼭 확인해야 합니다.<br/>이용자의 신분 변동(제적, 휴학, 졸업 등)시에는 대출도서를 즉시 반납해야 합니다." />
        <TextSection title="대출기한 연장" content="도서관 홈페이지 로그인 후 &lt;대출도서 조회/연장&gt; 메뉴에서 이용자가 직접 처리합니다.<br/>도서 연장은 해당도서의 반납예정일 1주일 전부터 1회에 한하여 가능합니다.<br/>반납예정일을 경과한 연체도서인 경우에는 대출기한 연장이 불가합니다." />
        <TextSection title="연체" content="대출도서를 반납예정일 이내에 반납하지 않으면 시스템에서 연체자로 자동 설정됩니다.<br/>연체도서 반납 시, 반납일로부터 ‘연체일수 X 연체도서수’의 기간만큼 도서대출이 중지됩니다.<br/>연체도서를 반납하지 않을 경우, 소속학과로 통보되고 각종 증명발급 및 학적변동이 불가할 수 있습니다." />
        <TextSection title="변상" content="대출한 도서를 분실하였을 경우에는 동일한 신판도서를 구입하여 변상하는 것을 원칙으로 합니다.<br/>해당 도서는 도서관 홈페이지에서 로그인 확인 또는 대출실로 직접 문의합니다.<br/>동일도서로 변상이 어려울 경우 정가의 2배 금액으로 현금 변상할 수 있습니다.<br/>(기타 특별한 경우, 담당자와 상담 후 도서관에서 지정한 도서로 변상 가능)" />
      </AccordionSection>

      <AccordionSection title="실별 안내" icon={FaMapMarkerAlt}>
        <TextSection title="1층: 논문자료실" content="폐가제 운영 (3층 자료열람실 내 대출실에서 자료열람 신청서 작성 후 이용)<br/>소장 자료: 학위논문, 정부간행물 등" />
        <TextSection title="2층: 서양자료실" content="폐가제 운영 (3층 자료열람실 내 대출실에서 자료열람 신청서 작성 후 이용)<br/>소장 자료: 대출이 가능한 외국 단행본자료" />
        <TextSection title="3층 & 4층: 자료열람실" content="개가제 운영 (3층과 4층은 내부계단으로 연결)<br/>도서 열람 및 대출, 컴퓨터, 스캐너, 복사기, 프린터 이용 가능 (단, 국내·외 참고자료는 대출 불가, 자료실 내 열람만 가능)<br/>자료 복사/프린트 시 신용카드(체크카드) 사용<br/>소장자료 (3층): 총류(000), 사회과학(300), 순수과학(400), 기술과학(500), 신착자료, 베스트셀러, 권장도서<br/>소장자료 (4층): 철학(100), 종교(200), 예술(600), 언어(700), 문학(800), 역사(900), 무협, 수험, 참고도서, 교재자료" />
        <TextSection title="5층: 자유열람실" content="자료 비치 없는 독서실 형태의 자율 학습 공간 (제1~4열람실)<br/>열람좌석 독점 금지, 이석 시 개인물품 정리 필수<br/>방학 등 특정 시기 이용 변경 또는 제한 가능" />
        <TextSection title="6층: 전자정보실" content="개가제 운영<br/>인터넷 검색, 영화 감상, 위성방송(SKY Blue HD) 시청 등 정보화매체 활용<br/>비도서자료는 실내 열람만 가능 (사무실 통해 이용)<br/>연속간행물(신문, 잡지), 만화자료 실내 열람 가능<br/>세미나실(영화관람 5인 이상), 스터디실(3인 이상) 이용 문의: 전자정보실(063-450-7108)<br/>소장자료: 연속간행물, 만화자료, Video Tape, DVD, Cassette Tape 등" />
      </AccordionSection>

      <AccordionSection title="층별 안내도" icon={FaLayerGroup}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {floorGuideImages.map((img) => (
            <div key={img.floor} className="rounded-md overflow-hidden border border-gray-200  shadow-sm">
              <img src={img.src} alt={img.alt} className="w-full h-auto object-contain" />
              <p className="text-center text-xs font-medium p-1.5 bg-gray-50  text-gray-700 ">{img.floor}</p>
            </div>
          ))}
        </div>
      </AccordionSection>

    </motion.div>
  );
}