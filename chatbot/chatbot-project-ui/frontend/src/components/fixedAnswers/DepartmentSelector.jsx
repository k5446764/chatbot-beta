import React, { useState } from 'react';
import departmentDetails from './DepartmentDetails';
import {
    FaTheaterMasks, FaMusic, FaMicrophoneAlt, FaBriefcaseMedical, FaHandHoldingHeart,
    FaLaptopCode, FaPalette, FaUtensils, FaChild, FaDumbbell, FaBuilding,
    FaBolt, FaBook,
} from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// 각 학과별 아이콘 매핑
const departmentIcons = {
    'K-POP학과': <FaMicrophoneAlt />,
    '공연미디어학부': <FaTheaterMasks />,
    '실용음악학부': <FaMusic />,
    '간호학과': <FaBriefcaseMedical />,
    '물리치료학과': <FaHandHoldingHeart />,
    '응급구조학과': <FaBriefcaseMedical />,
    '치위생학과': <FaBriefcaseMedical />,
    '유아교육과': <FaChild />,
    '호텔외식조리학과': <FaUtensils />,
    '아동복지학과': <FaHandHoldingHeart />,
    '스포츠무도학과': <FaDumbbell />,
    '경영학과': <FaBuilding />,
    '컴퓨터학과': <FaLaptopCode />,
    'K-뷰티소재학과': <FaPalette />,
    'K-푸드창업학과': <FaUtensils />,
    'K-콘텐츠제작학과': <FaPalette />,
    '사회복지상담학과': <FaHandHoldingHeart />,
    '보건헬스케어학과': <FaBriefcaseMedical />,
    '글로컬관광학과': <MdSchool />,
    '건축인테리어학과': <FaBuilding />,
    '전기소방안전학과': <FaBolt />,
    '교양과': <FaBook />,
};

function DepartmentButton({ departmentName, onSelect }) {
    return (
        <motion.button
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => onSelect(departmentName)}
            className={`
                flex flex-col items-center justify-center p-4 rounded-lg shadow-md
                transition-all duration-300
                bg-white  hover:bg-gray-100 
            `}
        >
            <span className="text-4xl text-blue-500  mb-2">
                {departmentIcons[departmentName] || <MdSchool />}
            </span>
            <span className="font-semibold text-gray-800  text-center text-sm">
                {departmentName}
            </span>
        </motion.button>
    );
}

export default function DepartmentSelector() {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showSelectBox, setShowSelectBox] = useState(false);
    const departmentNames = Object.keys(departmentDetails);

    const handleDepartmentClick = (name) => {
        setSelectedDepartment(name);
        setShowSelectBox(false); 
    };

    const handleBack = () => {
  setSelectedDepartment(null);
  setShowSelectBox(false); // ✅ 여기서만 닫히게
};

    const toggleSelectBox = () => {
    setShowSelectBox((prev) => {
        const next = !prev;
        if (next && selectedDepartment) {
            setSelectedDepartment(null);  // ✅ 학과 상세화면을 닫고 셀렉트박스만 보이게
        }
        return next;
    });
};


    const handleSelectChange = (event) => {
        const departmentName = event.target.value;
        setSelectedDepartment(departmentName === "" ? null : departmentName);
    };

    return (
        <div className="space-y-6 p-4 md:p-1 max-w-4xl mx-10"> {/* 부모 패딩은 사용자 설정 유지 */}
            {/* 헤더 수정: 돋보기 아이콘이 없을 때 오른쪽 불필요한 공간 제거 */}
            <div className="flex items-center sticky top-0 bg-white  py-3 z-10 border-b  mb-4">
                {(selectedDepartment || showSelectBox) && (
                    <button 
                        onClick={handleBack} 
                        className="p-2 rounded-full hover:bg-gray-100  transition-colors mr-2 md:mr-3"
                        aria-label="뒤로 가기"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-700 " />
                    </button>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800  flex-grow">
                    {selectedDepartment ? `${selectedDepartment}` : "학과 선택"}
                </h2>
                {/* 돋보기 아이콘: (select 박스가 보이거나 || 학과가 선택되었을 때)만 표시 */}
                {/* 즉, 학과 버튼 목록만 보일 때는 숨겨짐 */}
                {(showSelectBox || selectedDepartment) && (
                    <button 
                        onClick={toggleSelectBox} 
                        className="p-2 rounded-full hover:bg-gray-100  transition-colors ml-2 md:ml-3"
                        aria-label="학과 검색 또는 선택창 토글"
                    >
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-700 " />
                    </button>
                )}
                {/* 이전에 돋보기 아이콘 숨김 시 우측 공간 확보용으로 넣었던 div는 
                  flex-grow를 사용하는 현재 구조에서는 불필요하므로 제거했습니다.
                  타이틀이 flex-grow이므로, 우측에 아무것도 없으면 자동으로 전체 너비를 사용하며 왼쪽 정렬됩니다.
                */}
            </div>

            {/* 셀렉트 박스 (돋보기 클릭 시 & 학과 미선택 시 표시) */}
            <AnimatePresence mode="wait">
                {showSelectBox && !selectedDepartment && (
                    <motion.div
                        key="selectbox"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 overflow-hidden"
                    >
                        <select
                            aria-label="학과 선택 드롭다운"
                            className="block w-full py-2.5 px-3 border border-gray-300  bg-white  text-gray-900  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleSelectChange}
                            value={selectedDepartment || ""}
                        >
                            <option value="">-- 학과를 선택하세요 --</option>
                            {departmentNames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 학과 버튼 리스트 (선택되지 않았을 때 & 셀렉트 박스가 보이지 않을 때) */}
            {!selectedDepartment && !showSelectBox && (
                <motion.div
                    key="department-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: showSelectBox ? 0.2 : 0 }} // selectBox가 닫히는 애니메이션 후 등장하도록 조정
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                >
                    {departmentNames.map((name) => (
                        <DepartmentButton
                            key={name}
                            departmentName={name}
                            onSelect={handleDepartmentClick}
                        />
                    ))}
                </motion.div>
            )}

            {/* 선택된 학과 상세 정보 */}
            <AnimatePresence mode="wait">
                {selectedDepartment && (
                    <motion.div
                        key={selectedDepartment}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 p-4 sm:p-6 bg-white  rounded-xl shadow-xl border border-gray-200 "
                    >
                        <div className="flex items-center mb-4 pb-3 border-b ">
                            <span className="text-3xl sm:text-4xl mr-3 sm:mr-4 text-indigo-500 ">
                                {departmentIcons[selectedDepartment]}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 ">{selectedDepartment}</h3>
                        </div>
                        
                        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700  ">
                            {departmentDetails[selectedDepartment]}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}