import React, { useState } from 'react';
import {
  FaPhoneAlt, FaClock, FaUniversity, FaExternalLinkAlt,
  FaChevronDown, FaChevronUp, FaBuilding, FaGlobe, FaLaptopCode,
  FaPaintBrush, FaMusic, FaMicrophone, FaHeartbeat, FaUserMd, FaFirstAid, FaTooth,
  FaChild, FaUtensils, FaFutbol, FaBriefcase, FaUsers, FaAtom, FaCar, FaWrench,
  FaGem, FaSeedling, FaFilm, FaHandsHelping, FaHospitalUser, FaPlaneDeparture, FaRulerCombined, FaBolt, FaBookReader
} from 'react-icons/fa';
import { PhoneIcon as PhoneHeroIcon, LinkIcon as LinkHeroIcon, BuildingOffice2Icon as CollegeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const departmentData = [
  { college: "예술대학", englishName: "Performance Media", koreanName: "공연미디어학부", url: "https://perform.howon.kr/", phone: "063-450-7910", icon: FaPaintBrush },
  { college: "예술대학", englishName: "Apply Music", koreanName: "실용음악학부", url: "https://humusic.howon.kr/", phone: "063-450-7930", icon: FaMusic },
  { college: "예술대학", englishName: "K-POP", koreanName: "K-POP학과", url: "https://kpop.howon.kr/", phone: "063-450-7950", icon: FaMicrophone },
  { college: "보건대학", englishName: "Nursing Science", koreanName: "간호학과", url: "https://nursing.howon.kr/", phone: "063-450-7760", icon: FaHeartbeat },
  { college: "보건대학", englishName: "Physical Therapy", koreanName: "물리치료학과", url: "https://physio.howon.kr/", phone: "063-450-7790", icon: FaUserMd },
  { college: "보건대학", englishName: "Emergency Medical Service", koreanName: "응급구조학과", url: "https://huemt.howon.kr/", phone: "063-450-7490", icon: FaFirstAid },
  { college: "보건대학", englishName: "Dental Hygiene", koreanName: "치위생학과", url: "https://hudh.howon.kr/", phone: "063-450-7770", icon: FaTooth },
  { college: "인문사회대학", englishName: "Early Childhood Education", koreanName: "유아교육과", url: "https://childhood.howon.kr/", phone: "063-450-7430", icon: FaChild },
  { college: "인문사회대학", englishName: "Hotel Foodservice Dining Cookery", koreanName: "호텔외식조리학과", url: "https://culinary.howon.kr/", phone: "063-450-7260", icon: FaUtensils },
  { college: "인문사회대학", englishName: "Child Welfare", koreanName: "아동복지학과(편입,야)", url: "https://childwelfare.howon.kr/", phone: "063-450-7370", icon: FaHandsHelping },
  { college: "인문사회대학", englishName: "Sports & Guard", koreanName: "스포츠무도학과", url: "https://sportsguard.howon.kr/", phone: "063-450-7620", icon: FaFutbol },
  { college: "인문사회대학", englishName: "Business Administration", koreanName: "경영학과", url: "https://business.howon.kr/", phone: "063-450-7310", icon: FaBriefcase },
  { college: "글로컬융합대학", englishName: "Glocal Interdisciplinary Studies", koreanName: "글로컬 자유전공학부", url: "http://", phone: "063-450-", icon: FaGlobe },
  { college: "글로컬융합대학", englishName: "Computer Science", koreanName: "컴퓨터학과", url: "https://itsw.howon.kr/", phone: "063-450-7470", icon: FaLaptopCode },
  { college: "글로컬융합대학", englishName: "Automotive Engineering", koreanName: "자동차기계공학과", url: "https://www.howon-car.or.kr", phone: "063-450-7210", icon: FaCar },
  { college: "K-미래인재대학", englishName: "K-Beauty Materials", koreanName: "K-뷰티소재학과", url: "https://kbid.howon.kr/", phone: "063-450-7163", icon: FaGem },
  { college: "K-미래인재대학", englishName: "K-Food Startup", koreanName: "K-푸드창업학과", url: "https://kfood.howon.kr/", phone: "063-450-7163", icon: FaSeedling },
  { college: "K-미래인재대학", englishName: "K-Contents Production", koreanName: "K-콘텐츠제작학과", url: "https://kcontents.howon.kr/", phone: "063-450-7163", icon: FaFilm },
  { college: "K-미래인재대학", englishName: "Social Welfare Counseling", koreanName: "사회복지상담학과", url: "https://kwelfare.howon.kr/", phone: "063-450-7410", icon: FaUsers },
  { college: "K-미래인재대학", englishName: "Health & Healthcare", koreanName: "보건헬스케어학과", url: "https://huotr.howon.kr", phone: "063-450-7480", icon: FaHospitalUser },
  { college: "K-미래인재대학", englishName: "Global Tourism", koreanName: "글로벌관광학과", url: "https://hutour.howon.kr", phone: "063-450-7580", icon: FaPlaneDeparture },
  { college: "K-미래인재대학", englishName: "Architecture & Interior Design", koreanName: "건축인테리어학과", url: "https://architect.howon.kr/", phone: "063-450-7240", icon: FaRulerCombined },
  { college: "K-미래인재대학", englishName: "Electrical Engineering & Fire Safety", koreanName: "전기소방안전학과", url: "https://fusion.howon.kr", phone: "063-450-7280", icon: FaBolt },
  { college: "창의인재대학", englishName: "Liberal Arts", koreanName: "교양과", url: "https://liberal.howon.kr", phone: "063-450-7460", icon: FaBookReader },
];

const groupDepartmentsByCollege = (data) => {
  return data.reduce((acc, dept) => {
    const college = dept.college || "기타";
    if (!acc[college]) {
      acc[college] = [];
    }
    acc[college].push(dept);
    return acc;
  }, {});
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const departmentListVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { opacity: 0 }
};

const departmentItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function ContactInfo() {
  const [showDepartments, setShowDepartments] = useState(false);
  // expandedColleges 상태 및 toggleCollege 함수는 제거됨

  const departmentsByCollege = groupDepartmentsByCollege(departmentData);
  const collegeOrder = ["예술대학", "보건대학", "인문사회대학", "글로컬융합대학", "K-미래인재대학", "창의인재대학"];
  
  const sortedColleges = collegeOrder.filter(college => departmentsByCollege[college]);
  Object.keys(departmentsByCollege).forEach(college => {
    if (!sortedColleges.includes(college)) {
      sortedColleges.push(college);
    }
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-3 mb-2">
            <InformationCircleIcon className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">호원대학교 교내 연락처 안내</h2>
        </div>
        <p className="text-gray-600 text-sm">
          문의사항이 있으시면 대표번호로 연락주시거나, 아래 학교조직 버튼을 통해 부서별 연락처를 확인하실 수 있습니다. 😊
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          variants={cardVariants} initial="initial" animate="animate"
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-1.5">
            <FaPhoneAlt className="text-blue-600 mr-2" />
            <p className="font-semibold text-lg text-blue-800">대표번호</p>
          </div>
          <p className="text-2xl font-bold text-blue-700 tracking-wider">063-450-7114</p>
        </motion.div>
        <motion.div
          variants={cardVariants} initial="initial" animate="animate" transition={{delay: 0.1}}
          className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-1.5">
            <FaClock className="text-green-600 mr-2" />
            <p className="font-semibold text-lg text-green-800">업무시간</p>
          </div>
          <p className="text-gray-700">
            평일(월-금): 09:00 ~ 18:00
          </p>
          <p className="text-xs text-gray-500">* 점심시간: 12:00 ~ 13:00</p>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <motion.a
          href="tel:0634507114"
          className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PhoneHeroIcon className="h-5 w-5 mr-2" /> 대표번호 전화연결
        </motion.a>
        <motion.button
          onClick={() => setShowDepartments(!showDepartments)}
          className="w-full sm:w-auto flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={showDepartments} // 접근성 속성 추가
        >
          {showDepartments ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
          학교조직 {showDepartments ? '숨기기' : '보기'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showDepartments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-6 space-y-8" // 단과대학 간 간격 증가
          >
            {sortedColleges.map((collegeName) => (
              <motion.section // 각 단과대학 섹션에 애니메이션 적용 (필요하다면)
                key={collegeName}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center pb-3 mb-4 border-b border-gray-200"> {/* 단과대학 제목 */}
                  <CollegeIcon className="h-7 w-7 text-indigo-600 mr-3 flex-shrink-0" />
                  <h3 className="text-2xl font-semibold text-indigo-700">{collegeName}</h3>
                </div>
                <motion.ul
                  className="space-y-4" // 학과 아이템 간 간격
                  variants={departmentListVariants} // 자식 요소들에 대한 stagger 애니메이션
                  initial="initial"
                  animate="animate"
                >
                  {departmentsByCollege[collegeName].map((dept, deptIndex) => (
                    <motion.li
                      key={dept.koreanName}
                      className="p-4 bg-slate-50 hover:bg-indigo-50 rounded-lg shadow-sm border border-slate-200 transition-all duration-150 ease-out hover:shadow-md"
                      variants={departmentItemVariants}
                      // custom prop은 departmentListVariants의 staggerChildren에 의해 자동으로 인덱싱됨
                    >
                      <div className="flex items-center mb-1.5">
                        {dept.icon && <dept.icon className="h-5 w-5 text-indigo-500 mr-2.5 flex-shrink-0" />}
                        <h4 className="text-lg font-semibold text-gray-800">{dept.koreanName}</h4>
                      </div>
                      {dept.englishName && <p className="text-sm text-gray-500 ml-[28px] -mt-1 mb-2">{dept.englishName}</p>}
                      
                      <div className="ml-[28px] space-y-2 text-sm">
                        {dept.phone && dept.phone !== "063-450-" && (
                          <a href={`tel:${dept.phone.replace(/-/g, '')}`} className="flex items-center text-blue-600 hover:text-blue-800 hover:underline group">
                            <PhoneHeroIcon className="h-4 w-4 mr-2 text-blue-500 group-hover:text-blue-700 flex-shrink-0" />
                            <span className="font-medium">{dept.phone}</span>
                          </a>
                        )}
                        {dept.url && dept.url !== "http://" && (
                          <a href={dept.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:text-green-800 hover:underline group">
                            <LinkHeroIcon className="h-4 w-4 mr-2 text-green-500 group-hover:text-green-700 flex-shrink-0" />
                            <span className="font-medium">홈페이지 바로가기</span>
                          </a>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}