import React, { useState } from 'react';
import {
  // 위치 및 연락처 관련 아이콘
  FaMapMarkerAlt, FaPhone, FaFax, FaPhoneAlt,

  // 링크 및 SNS
  FaLink, FaInstagram, FaFacebook, FaYoutube,

  // UI/UX용 화살표
  FaChevronDown, FaChevronUp,

  // 시간 관련
  FaClock,

  // 학과 및 인재상 정보
  FaUsers, FaGraduationCap, FaLaptopCode, FaDesktop, FaUserTie, FaChalkboardTeacher, FaTheaterMasks,

  // 정보/소개/목표 관련
  FaInfoCircle, FaBullseye,

  // 교육 관련
  FaUserGraduate, FaBookOpen, FaCertificate, FaNotesMedical, FaVideo, FaStar
} from 'react-icons/fa';


// PerformingArtsMediaContent 컴포넌트
const PerformingArtsMediaContent = () => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    return (
        <>
            {/* 기본 정보 */}
            <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />위치: 8동 2층</p>
            <p className="flex items-center">
                <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
                전화: <a href="tel:063-450-7910" className="text-blue-600 hover:underline">063-450-7910</a>
            </p>
            <p>
                <a
                    href="https://perform.howon.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                    <FaLink className="mr-2 flex-shrink-0" /> 학부 홈페이지 바로가기
                </a>
            </p>

            {/* YouTube Video Embed */}
            <div className="mx-20 mt-10"> {/* mt-10으로 수정되어 있었음, mx-20은 사용자 코드에 따름 */}
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/kc3GH1M8jB4?si=n9P6I6p8IVfaaySW&start=93"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 학부 소개 문구 */}
            <p className="mt-3 text-gray-700 ">
                호원대학교 공연미디어학부입니다. 🎭🎬 연극, 뮤지컬, 기획연출 등 다양한 전공을 통해 공연 및 미디어 분야의 전문가를 양성합니다.
            </p>

            {/* 추가 정보 (접기/펴기) */}
            <div className="mt-4 pt-4 border-t border-gray-200 ">
                <button
                    onClick={() => setShowExtraInfo(!showExtraInfo)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-purple-600  hover:text-purple-700  focus:outline-none"
                >
                    <span>학과 상세 정보 {showExtraInfo ? '숨기기' : '보기'}</span>
                    {showExtraInfo ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                </button>

                {showExtraInfo && (
                    <div className="mt-3 space-y-4 text-sm text-gray-700 ">
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaChalkboardTeacher className="mr-2 text-purple-500  flex-shrink-0" />
                                연기 전공
                            </h4>
                            <ul className="list-none pl-6 space-y-1">
                                <li className="flex items-center">
                                    <FaInstagram className="mr-2 text-pink-600 flex-shrink-0" />
                                    <a href="https://instagram.com/howon_acting" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">인스타그램 (@howon_acting)</a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-3">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaTheaterMasks className="mr-2 text-purple-500  flex-shrink-0" />
                                뮤지컬 전공
                            </h4>
                            <ul className="list-none pl-6 space-y-1">
                                <li className="flex items-center">
                                    <FaFacebook className="mr-2 text-blue-700 flex-shrink-0" />
                                    <a href="https://www.facebook.com/howonmuaicalofficial" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">페이스북 (howonmuaicalofficial)</a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-3">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaVideo className="mr-2 text-purple-500  flex-shrink-0" />
                                기획연출 전공
                            </h4>
                            <ul className="list-none pl-6 space-y-1">
                                <li className="flex items-center">
                                    <FaInstagram className="mr-2 text-pink-600 flex-shrink-0" />
                                    <a href="https://instagram.com/howon_directing" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">인스타그램 (@howon_directing)</a>
                                </li>
                                <li className="flex items-center">
                                    <FaLink className="mr-2 text-gray-500 flex-shrink-0" />
                                    <a href="https://perform.howon.kr/bbs_shop/read.htm?me_popup=&auto_frame=&cate_sub_idx=0&search_first_subject=&list_mode=photo&board_code=rwdphoto&search_key=&key=&page=&idx=533451" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">관련 웹사이트 게시물</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 ">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaUsers className="mr-2 text-purple-500  flex-shrink-0" />
                                주요 활동
                            </h4>
                            <p className="pl-6">
                                정기 공연, 워크숍, 영화 제작 프로젝트, 졸업 작품 발표회 등 다양한 현장 중심 교육 실시.
                            </p>

                            <h4 className="flex items-center font-semibold text-gray-800  mt-3 mb-1">
                                <FaGraduationCap className="mr-2 text-purple-500  flex-shrink-0" />
                                졸업 후 진로
                            </h4>
                            <p className="pl-6">
                                연극/영화/방송 연출, 배우, 스태프, 공연 기획, 미디어 콘텐츠 제작 등.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const KPopDepartmentContent = () => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    return (
        <>
            {/* 기본 정보 */}
            <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                위치: 1동 1층
            </p>
            <p className="flex items-center">
                <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
                전화: <a href="tel:063-450-7950" className="text-blue-600 hover:underline">063-450-7950</a>
            </p>
            <p>
                <a
                    href="https://kpop.howon.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                    <FaLink className="mr-2 flex-shrink-0" /> 학과 홈페이지 바로가기
                </a>
            </p>

            {/* YouTube 영상 */}
            <div className="mx-20 mt-10">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/yZnkr1ITynY?si=MdqaorRs7BpD0c2M"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 학과 소개 문구 */}
            <p className="mt-3 text-gray-700 ">
                호원대학교 K-POP학과입니다. 🎤 대중예술을 창의적으로 표현하는 아티스트 양성소!<br />
                4년 학제의 특수성을 갖춘 현장형 커리큘럼과 실습 중심 교육을 통해 실력 있는 대중예술 인재를 양성합니다.
            </p>

            {/* 추가 정보 */}
            <div className="mt-4 pt-4 border-t border-gray-200 ">
                <button
                    onClick={() => setShowExtraInfo(!showExtraInfo)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-purple-600  hover:text-purple-700  focus:outline-none"
                >
                    <span>학과 상세 정보 {showExtraInfo ? '숨기기' : '보기'}</span>
                    {showExtraInfo ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                </button>

                {showExtraInfo && (
                    <div className="mt-3 space-y-4 text-sm text-gray-700 ">
                        {/* SNS 링크 추가 */}
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <FaYoutube className="mr-2 text-red-600 flex-shrink-0" />
                                <a href="https://www.youtube.com/@k-pop4438" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                    유튜브 채널 (@k-pop4438)
                                </a>
                            </p>
                            <p className="flex items-center">
                                <FaInstagram className="mr-2 text-pink-600 flex-shrink-0" />
                                <a href="https://instagram.com/howonkpop" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                    인스타그램 (@howonkpop)
                                </a>
                            </p>
                        </div>

                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaBullseye className="mr-2 text-purple-500  flex-shrink-0" />
                                교육 목표
                            </h4>
                            <ul className="list-none pl-6 space-y-1">
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🎯</span>케이팝 음악영역 진출</li>
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🎯</span>음악산업 실무 및 제작 교육</li>
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🎯</span>오디션을 통한 데뷔 및 시장 진출</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaUserGraduate className="mr-2 text-purple-500  flex-shrink-0" />
                                인재상
                            </h4>
                            <ul className="list-none pl-6 space-y-1">
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🌟</span>예술성과 인성을 겸비한 대중아티스트</li>
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🌟</span>대중예술을 창의적으로 표현하는 인재</li>
                                <li className="flex items-start"><span className="mr-2 text-purple-500">🌟</span>산업을 이해하고 융합할 수 있는 실용형 전문가</li>
                            </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 ">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-2">
                                <FaInfoCircle className="mr-2 text-purple-500  flex-shrink-0" />
                                연락처 및 운영시간
                            </h4>
                            <p className="flex items-center mb-1 pl-6">
                                <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                                주소: 전북 군산시 임피면 호원대3길 64 호원대학교 1동(사회과학관)
                            </p>
                            <p className="flex items-center mb-1 pl-6">
                                <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
                                학과사무실 전화: <a href="tel:063-450-7950" className="text-blue-600 hover:underline">063-450-7950</a>
                            </p>
                            <p className="flex items-center mb-1 pl-6">
                                <FaFax className="mr-2 text-gray-500 flex-shrink-0" />
                                팩스: 063-450-7929
                            </p>
                            <p className="flex items-center pl-6">
                                <FaClock className="mr-2 text-gray-500 flex-shrink-0" />
                                학과사무실 운영시간: 월 ~ 금 09:00 ~ 18:00 (방학 중 시간 변동)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const AppliedMusicDepartmentContent = () => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    return (
        <>
            {/* 기본 정보 */}
            <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                위치: 8동 2층
            </p>
            <p className="flex items-center">
                <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
                전화: <a href="tel:063-450-7930" className="text-blue-600 hover:underline">063-450-7930</a>
            </p>
            <p>
                <a
                    href="https://humusic.howon.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                    <FaLink className="mr-2 flex-shrink-0" /> 학과 홈페이지 바로가기
                </a>
            </p>

            {/* YouTube 영상 */}
            <div className="mx-20 mt-10">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/BJhn7fAEHmQ?si=SwDrR1RQzGg8t1rq"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 학과 소개 문구 */}
            <p className="mt-3 text-gray-700 ">
                호원대학교 실용음악학부는 작곡, 보컬, 연주, 뮤직프로덕션, 프로페셔널뮤직 총 5개 전공을 운영하며, 창의력과 감각을 갖춘 실용음악 전문가를 양성합니다.
            </p>

            {/* 추가 정보 */}
            <div className="mt-4 pt-4 border-t border-gray-200 ">
                <button
                    onClick={() => setShowExtraInfo(!showExtraInfo)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-purple-600  hover:text-purple-700  focus:outline-none"
                >
                    <span>학과 상세 정보 {showExtraInfo ? '숨기기' : '보기'}</span>
                    {showExtraInfo ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                </button>

                {showExtraInfo && (
                    <div className="mt-3 space-y-4 text-sm text-gray-700 ">
                        {/* SNS */}
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <FaInstagram className="mr-2 text-pink-600 flex-shrink-0" />
                                <a href="https://www.instagram.com/howon_uni_appliedmusic/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                    인스타그램 (@howon_uni_appliedmusic)
                                </a>
                            </p>
                        </div>

                        {/* 교육목표 */}
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaBullseye className="mr-2 text-purple-500  flex-shrink-0" />
                                교육목표
                            </h4>
                            <p className="pl-6">실무중심 교육을 통해 창의적인 음악 전문가를 배출합니다.</p>
                        </div>

                        {/* 전공별 소개 */}
                        <div className="space-y-4">
                            {[
                                {
                                    title: "작곡 전공",
                                    points: [
                                        "대중적인 트렌드를 선도하는 체계적인 음악교육",
                                        "DAW를 활용한 작편곡 및 믹싱 교육",
                                        "다양한 분야의 작곡가 및 음악감독 양성"
                                    ]
                                },
                                {
                                    title: "보컬 전공",
                                    points: [
                                        "건강한 발성과 음악적 이해를 바탕으로 감동을 전하는 노래",
                                        "음악 전반의 이해를 갖춘 보컬리스트 양성"
                                    ]
                                },
                                {
                                    title: "연주 전공",
                                    points: [
                                        "개성있는 연주자 양성",
                                        "예술성과 대중성의 균형을 갖춘 교육"
                                    ]
                                },
                                {
                                    title: "뮤직프로덕션 전공",
                                    points: [
                                        "프로듀서로서의 제작 능력 향상",
                                        "작곡, 편곡, 미디, 레코딩, 믹싱 등 음악제작 전반 교육"
                                    ]
                                },
                                {
                                    title: "프로페셔널뮤직 전공",
                                    points: [
                                        "개인 맞춤형 실용음악 교육과정 운영",
                                        "현대 트렌드에 맞는 아티스트 양성"
                                    ]
                                }
                            ].map(({ title, points }) => (
                                <div key={title}>
                                    <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                        <FaChalkboardTeacher className="mr-2 text-purple-500  flex-shrink-0" />
                                        {title}
                                    </h4>
                                    <ul className="list-disc pl-8 space-y-1">
                                        {points.map((p, i) => (
                                            <li key={i}>{p}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* 인재상 */}
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaUserGraduate className="mr-2 text-purple-500  flex-shrink-0" />
                                인재상
                            </h4>
                            <p className="pl-6">현대 사회에서 요구하는 자질을 갖춘 실용적인 프로음악인</p>
                        </div>

                        {/* 연락처 */}
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 ">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-2">
                                <FaInfoCircle className="mr-2 text-purple-500  flex-shrink-0" />
                                연락처 및 운영시간
                            </h4>
                            <p className="pl-6">주소: 전북 군산시 임피면 호원대 3길 64 호원대학교 문화예술대학</p>
                            <p className="pl-6">전화번호: 063-450-7930 (행정), 063-450-7940 (행정), 063-450-7948 (실습), 02-2045-5360 (서울)</p>
                            <p className="pl-6">팩스: 063-450-7929</p>
                            <p className="pl-6">운영시간: 평일(월~금) 09:00 ~ 18:00</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
const NursingDepartmentContent = () => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    return (
        <>
            {/* 기본 정보 */}
            <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                위치: 5동 1층
            </p>
            <p className="flex items-center">
                <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
                전화: <a href="tel:063-450-7760" className="text-blue-600 hover:underline">063-450-7760</a>
            </p>
            <p>
                <a
                    href="https://nursing.howon.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                    <FaLink className="mr-2 flex-shrink-0" /> 학과 홈페이지 바로가기
                </a>
            </p>

            {/* YouTube 영상 */}
            <div className="mx-20 mt-10">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/522eF-LrEok?si=zYJBewJGRWnp8SUI"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 학과 개요 */}
            <p className="mt-3 text-gray-700 ">
                호원대학교 간호학과는 다양한 전공 및 교양교과목 이수를 통해 간호전문직 역량과 인문사회학적 소양을 함양하고 있으며,<br />
                서울·경기, 충청·전북지역 상급종합병원 실습 및 취업을 통해 지역 간호인재 양성의 중심 역할을 수행합니다.
            </p>

            {/* 추가 정보 */}
            <div className="mt-4 pt-4 border-t border-gray-200 ">
                <button
                    onClick={() => setShowExtraInfo(!showExtraInfo)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-purple-600  hover:text-purple-700  focus:outline-none"
                >
                    <span>학과 상세 정보 {showExtraInfo ? '숨기기' : '보기'}</span>
                    {showExtraInfo ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                </button>

                {showExtraInfo && (
                    <div className="mt-3 space-y-4 text-sm text-gray-700 ">
                        {/* SNS */}
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <FaInstagram className="mr-2 text-pink-600 flex-shrink-0" />
                                <a href="https://www.instagram.com/howon_nursing_official/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                    인스타그램 (@howon_nursing_official)
                                </a>
                            </p>
                        </div>

                        {/* 교육목적 */}
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaBullseye className="mr-2 text-purple-500  flex-shrink-0" />
                                교육 목적
                            </h4>
                            <p className="pl-6">인간존중을 바탕으로 간호의 질 향상에 기여할 창의적 전문직 간호사 양성</p>
                        </div>

                        {/* 교육목표 */}
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaChalkboardTeacher className="mr-2 text-purple-500  flex-shrink-0" />
                                교육 목표
                            </h4>
                            <ul className="list-disc pl-8 space-y-1">
                                <li>과학적 지식을 응용하여 통합간호능력을 함양한다.</li>
                                <li>보편적 건강수준 향상을 위해 협력능력을 함양한다.</li>
                                <li>간호전문직 표준을 바탕으로 간호수행능력을 함양한다.</li>
                                <li>건강문제 해결을 위한 임상추론역량을 함양한다.</li>
                                <li>전문직 발전을 위한 자기개발역량을 함양한다.</li>
                                <li>최신 보건의료기술을 활용한 건강관리능력을 함양한다.</li>
                            </ul>
                        </div>

                        {/* 인재상 */}
                        <div>
                            <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                                <FaUserGraduate className="mr-2 text-purple-500  flex-shrink-0" />
                                인재상
                            </h4>
                            <p className="pl-6">
                                인성인, 소통인, 실용인, 열정인의 호원인재상을 바탕으로<br />
                                조화·공동체·창의 능력을 갖춘 간호사 양성
                            </p>
                        </div>

                        {/* 연락처 */}
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-300 ">
                            <h4 className="flex items-center font-semibold text-gray-800  mb-2">
                                <FaInfoCircle className="mr-2 text-purple-500  flex-shrink-0" />
                                연락처 및 운영시간
                            </h4>
                            <p className="pl-6">주소: 전북 군산시 임피면 호원대3길 64 호원대학교 간호학과</p>
                            <p className="pl-6">전화번호: 063-450-7760</p>
                            <p className="pl-6">팩스: 063-450-7769</p>
                            <p className="pl-6">운영시간: 평일(월~금) 09:00 ~ 18:00</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
const ComputerDepartmentContent = () => {
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  return (
    <>
      {/* 제목 + 대표 아이콘 */}
      <h2 className="flex items-center text-xl font-bold text-gray-800  mb-4">
        <FaDesktop className="mr-2 text-indigo-600" /> {/* 아이콘 변경 FaLaptopCode -> FaDesktop */}
        컴퓨터학과
      </h2>

      {/* 위치/연락처/링크 등 기본 정보 */}
      <p className="flex items-center">
        <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
        위치: 5동 2층
      </p>
      {/* 
      */}
      <p className="flex items-center">
          <FaPhone className="mr-2 text-green-500 flex-shrink-0" />
          전화: <a href="tel:063-450-7470" className="text-blue-600 hover:underline">063-450-7470</a>
      </p>
      <p>
          <a
              href="https://itsw.howon.kr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
              <FaLink className="mr-2 flex-shrink-0" /> 학과 홈페이지 바로가기
          </a>
      </p>

      {/* YouTube 영상 */}
      <div className="mx-20 mt-10">
          <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/a0GWZ7pKp-4?si=fLCjWsPxkQ2uKWAS"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
          ></iframe>
      </div>

      {/* 학과 개요 */}
      <p className="mt-3 text-gray-700 ">
          21세기 지식정보화사회는 디지털 기술의 급속한 발전과 융복합화 추세에 따라, 고도의 기술력과 이론을 겸비한 인재가 요구됩니다.<br />
          호원대학교 정보기술학과(컴퓨터공학전공)는 컴퓨터 하드웨어와 소프트웨어 분야의 첨단기술 교육 및 연구를 통해 전문 인력 양성을 목표로 합니다.
      </p>

      {/* 추가 정보 */}
      <div className="mt-4 pt-4 border-t border-gray-200 ">
          <button
              onClick={() => setShowExtraInfo(!showExtraInfo)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-purple-600  hover:text-purple-700  focus:outline-none"
          >
              <span>학과 상세 정보 {showExtraInfo ? '숨기기' : '보기'}</span>
              {showExtraInfo ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
          </button>

          {showExtraInfo && (
              <div className="mt-3 space-y-4 text-sm text-gray-700 ">
                  {/* SNS */}
                  <div className="space-y-1">
                      <p className="flex items-center">
                          <FaYoutube className="mr-2 text-red-600 flex-shrink-0" />
                          <a href="https://www.youtube.com/@HowonUniversityCyber" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                              유튜브 채널 (@HowonUniversityCyber)
                          </a>
                      </p>
                  </div>

                  {/* 교육 목표 */}
                  <div>
                      <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                          <FaBullseye className="mr-2 text-purple-500  flex-shrink-0" />
                          교육 목표
                      </h4>
                      <ul className="list-disc pl-8 space-y-1">
                          <li>정보산업분야의 전문성과 실용성을 갖춘 인재 양성</li>
                          <li>국가 산업기술 및 지역사회 발전에 기여할 수 있는 지도자 육성</li>
                          <li>정보화 기획, 분석, 통합 능력 배양</li>
                          <li>현장 적응력과 창의력 교육</li>
                          <li>창업 능력을 포함한 첨단 융합 기술 교육</li>
                      </ul>
                  </div>

                  {/* 주요 과목 */}
                  <div>
                      <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                          <FaChalkboardTeacher className="mr-2 text-purple-500  flex-shrink-0" />
                          주요 교과목
                      </h4>
                      <ul className="list-disc pl-8 space-y-1">
                          <li>임베디드 시스템 특론</li>
                          <li>정보보호 특론</li>
                          <li>IT 융합 특론</li>
                          <li>클라우드 컴퓨팅</li>
                          <li>모바일 컴퓨팅 특론</li>
                      </ul>
                  </div>

                  {/* 산학 협력 설명 */}
                  <div>
                      <h4 className="flex items-center font-semibold text-gray-800  mb-1">
                          <FaUsers className="mr-2 text-purple-500  flex-shrink-0" />
                          산학협력 및 현장중심 교육
                      </h4>
                      <p className="pl-6">
                          산학관 협력을 통해 현장 기술인력 및 연구 자원을 활용하여, 실무 중심의 심화 교육과 연구를 진행합니다.
                      </p>
                  </div>

                  {/* 연락처 */}
                  <div className="mt-4 pt-4 border-t border-dashed border-gray-300 ">
                      <h4 className="flex items-center font-semibold text-gray-800  mb-2">
                          <FaInfoCircle className="mr-2 text-purple-500  flex-shrink-0" />
                          연락처 및 운영시간
                      </h4>
                      <p className="pl-6">주소: 전북 군산시 임피면 호원대3길 64 호원대학교 정보기술학과</p>
                      <p className="pl-6">전화번호: 063-450-7470</p>
                      <p className="pl-6">운영시간: 평일(월~금) 09:00 ~ 18:00</p>
                  </div>
              </div>
          )}
      </div>
    </>
  );
};


const departmentDetails = {
  "K-POP학과": <KPopDepartmentContent />,
  "공연미디어학부": <PerformingArtsMediaContent />,
  "실용음악학부": <AppliedMusicDepartmentContent />,
  "간호학과": <NursingDepartmentContent />,
 // departmentDetails = {
//   ... (다른 학과 정보들) ...

  "물리치료학과": (
    <>
      <p className="text-center text-lg font-semibold text-blue-600  mb-2">
        명실 상부한 대한민국 물리치료분야를 선도하다!
      </p>
      <h3 className="flex items-center justify-center text-xl font-bold text-gray-800  mb-4">
        {/* 아이콘 예시 (또는 🏋️‍♂️, 💪 같은 이모지 사용 가능) */}
        <FaNotesMedical className="mr-2 text-green-500 text-2xl flex-shrink-0" />
        호원대학교 물리치료학과
      </h3>

      {/* 학과소개 */}
      <div className="mb-4">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
          학과소개
        </h4>
        <div className="pl-6 text-sm text-gray-600  space-y-2">
          <p>
            물리치료학은 여러 가지 질병이나 사고 또는 선천적 질환 등으로 인한 신체적 손상을 갖게된 사람들에게 운동치료나 다양한 물리적인 방법들을 이용하여 통증을 경감시키고 손상된 기능을 회복시키거나, 장애를 최소화 할 수 있도록 평가, 치료 교육하는 의학의 한 전문영역으로 환자의 삶의 질을 향상시키고 정상적인 사회생활로의 복귀를 도와주는 학문입니다.
          </p>
          <p>
            2013년에 신설된 호원대학교 물리치료학과는 지성과 인성을 겸비한 전문 물리치료사 양성을 목표로 체계적인 양질의 교육을 통해 명실상부한 대한민국 물리치료분야를 선도하는 전문 인력을 양성하기 위해 최선을 다하고 있습니다.
          </p>
        </div>
      </div>

      {/* 교육목표 */}
      <div className="mb-4">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaBullseye className="mr-2 text-orange-500 flex-shrink-0 h-4 w-4" />
          교육목표
        </h4>
        <ul className="list-disc pl-10 text-sm text-gray-600  space-y-1">
          <li>지식과 인성을 겸비한 색깔 있는 창의적 전문 물리치료사 양성</li>
          <li>산업체가 요구하는 맞춤형 전문 물리치료사 양성</li>
          <li>글로벌 시대에 부응하는 세계화된 전문 물리치료사 양성</li>
        </ul>
      </div>

      {/*
        주신 정보에 "인재상"에 대한 구체적인 내용이 없어서 해당 섹션은 제외했습니다.
        만약 "인재상" 내용이 있다면, 위 "교육목표" 섹션과 유사한 형태로 추가할 수 있습니다.
        예:
        <div className="mb-4">
          <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
            <FaUserGraduate className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" /> // FaUserGraduate 아이콘 예시
            인재상
          </h4>
          <ul className="list-disc pl-10 text-sm text-gray-600  space-y-1">
            <li>인재상 내용 1</li>
            <li>인재상 내용 2</li>
          </ul>
        </div>
      */}

      <div className="border-t border-gray-200  my-4"></div>

      {/* 연락처 및 운영시간 */}
      <div>
        <h4 className="text-md font-semibold text-gray-700  mb-2">연락처 및 운영시간</h4>
        <div className="pl-6 space-y-1 text-sm text-gray-600 ">
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
            <strong>주소:</strong>&nbsp;전북 군산시 임피면 호원대3길 64 호원대학교 물리치료학과(4406호)
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
            <strong>전화번호:</strong>&nbsp;063-450-7790
          </p>
          <p className="flex items-center">
            <FaFax className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
            <strong>팩스:</strong>&nbsp;063-450-7799
          </p>
          <p className="flex items-center">
            <FaClock className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
            <strong>학과사무실 운영시간:</strong>&nbsp;월 ~ 금 09:00 ~ 18:00 (방학 중 시간 변동)
          </p>
        </div>
      </div>
    </>
  ),

  "응급구조학과": (
    <>
      <h3 className="flex items-center text-xl font-bold text-gray-800  mb-3">
        <span className="text-2xl mr-2">🚑</span>
        응급구조학과 (Department of Emergency Medical Technology)
      </h3>


      <div className="border-t border-gray-200  my-4"></div>

      {/* 소개 */}
      <div className="mb-3">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
          소개
        </h4>
        <p className="pl-6 text-sm text-gray-600 ">
          응급의료서비스에 필요한 인성과 지식을 겸비한 1급 응급구조사를 배출하는 학과입니다. 응급환자에 대하여 현장 또는 이송, 의료기관 내에서 응급처치 업무를 수행하며, 사고 및 질병으로부터 환자의 생명을 보호하기 위한 지식과 기술을 바탕으로 인간에 대한 존엄성과 생명에 대한 경외심을 가지고 국가와 지역사회에 필요한 전문응급구조사를 배출합니다.
        </p>
      </div>

      {/* 교육목표 */}
      <div className="mb-3">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaBullseye className="mr-2 text-orange-500 flex-shrink-0 h-4 w-4" />
          교육목표
        </h4>
        <p className="pl-6 text-sm text-gray-600 ">
          사고 및 질병으로부터 환자의 생명을 보호하기 위한 지식과 기술을 바탕으로 인간에 대한 존엄성과 생명에 대한 경외심을 가지고 국가와 지역사회에 필요로 하는 전문응급구조사 배출
        </p>
      </div>

      {/* 인재상 */}
      <div>
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaUserGraduate className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
          인재상
        </h4>
        <ul className="list-disc pl-10 text-sm text-gray-600  space-y-1">
          <li>현장 맞춤형 인재 양성</li>
          <li>특성화 교육프로그램을 통한 전문응급구조사 인력양성</li>
          <li>응급의료시뮬레이션 교육센터의 활성화를 통한 특성화 분야 자립화 추진</li>
        </ul>
        {/* 연락처 */}
      <div className="space-y-1 mb-3">
        <p className="flex items-center text-sm text-gray-700 ">
          <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
          <strong>주소:</strong>&nbsp;군산시 임피면 호원대 3길 64 호원대학교 응급구조학과
        </p>
        <p className="flex items-center text-sm text-gray-700 ">
          <FaPhone className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
          <strong>전화번호:</strong>&nbsp;063-450-7490
        </p>
        <p className="flex items-center text-sm text-gray-700 ">
          <FaFax className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
          <strong>팩스:</strong>&nbsp;063-450-7499
        </p>
      </div>
      </div>
    </>
  ),
   "치위생학과": (
    <>
      <h3 className="flex items-center text-xl font-bold text-gray-800  mb-3">
        <span className="text-2xl mr-2">🦷</span>
        {/* 또는 <FaTooth className="mr-2 text-blue-400 text-2xl flex-shrink-0" /> */}
        치위생학과 (Department of Dental Hygiene)
      </h3>

      {/* 소개 */}
      <div className="mb-3">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
          소개
        </h4>
        <p className="pl-6 text-sm text-gray-600 ">
          '보람있는 인생, 참된 인간상, 자립하는 사람'의 건학이념을 바탕으로 창의, 실용, 인성교육을 통해 이웃과 사회에 공헌할 수 있고 지도자적 역량을 발휘할 수 있는 주체적인 치과위생사를 양성합니다.
        </p>
      </div>

      {/* 교육목표 */}
      <div className="mb-3">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaBullseye className="mr-2 text-orange-500 flex-shrink-0 h-4 w-4" />
          교육목표
        </h4>
        <p className="pl-6 text-sm text-gray-600 ">
          국민의 구강건강증진 및 치위생학과의 발전을 위해 전문적인 지식과 기술을 겸비하고, 창의 및 혁신 역량을 겸비한 차세대 치과위생사 양성
        </p>
      </div>

      <div className="border-t border-gray-200  my-4"></div>

      {/* 연락처 및 운영시간 */}
      <div>
        <h4 className="text-md font-semibold text-gray-700  mb-2">연락처 및 운영시간</h4>
        <div className="pl-6 space-y-1 text-sm text-gray-600 ">
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
            <strong>주소:</strong>&nbsp;전북 군산시 임피면 호원대3길 64 (호원대학교 내)
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
            <strong>사무실:</strong>&nbsp;063-450-7770
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" /> {/* 다른 색상으로 구분 */}
            <strong>실습실:</strong>&nbsp;063-450-7778
          </p>
          <p className="flex items-center">
            <FaFax className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
            <strong>팩스:</strong>&nbsp;063-450-7779
          </p>
          <p className="flex items-center">
            <FaClock className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
            <strong>학과 사무실 운영시간:</strong>&nbsp;평일 오전 9시 ~ 오후 6시
          </p>
        </div>
      </div>
    </>
  ),
 "유아교육과": (
    <>
      <h3 className="flex items-center text-xl font-bold text-gray-800  mb-3">
        <span className="text-2xl mr-2">🧸</span>
        {/* 또는 <FaChild className="mr-2 text-pink-500 text-2xl flex-shrink-0" /> */}
        유아교육과 (Department of Early Childhood Education)
      </h3>

      {/* 연락처 및 홈페이지 */}
      <div className="space-y-1 mb-3">
        <p className="flex items-center text-sm text-gray-700 ">
          <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
          <strong>위치:</strong>&nbsp;3동 5층
        </p>
        <p className="flex items-center text-sm text-gray-700 ">
          <FaPhone className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
          <strong>행정 전화:</strong>&nbsp;
          <a href="tel:063-450-7430" className="text-blue-600 hover:underline">063-450-7430</a>
        </p>
        <p className="flex items-center text-sm text-gray-700 ">
          <FaPhone className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" /> {/* 다른 색상으로 실습 전화 구분 */}
          <strong>실습 전화:</strong>&nbsp;
          <a href="tel:063-450-7437" className="text-blue-600 hover:underline">063-450-7437</a>
        </p>
        <p className="flex items-center text-sm text-gray-700 ">
          <FaFax className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
          <strong>팩스:</strong>&nbsp;063-450-7436
        </p>
        <p className="flex items-center text-sm">
          <FaLink className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
          <a
            href="https://childhood.howon.kr"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            학과 홈페이지 바로가기
          </a>
        </p>
      </div>

      <div className="border-t border-gray-200  my-4"></div>

      {/* 학과개요 */}
      <div>
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaInfoCircle className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
          학과개요
        </h4>
        <p className="pl-6 text-sm text-gray-600  whitespace-pre-line"> {/* whitespace-pre-line으로 줄바꿈 유지 */}
          호원대학교 유아교육과는 영유아교사를 양성하는 것을 목적으로 1988년에 신설되어 전국에 걸쳐 전문성을 갖춘 유아교사와 기관장을 배출하고 있습니다. 또한 내실 있는 전공 수업을 통해 교사로서의 핵심역량을 증진시키고, 부속유치원에서의 특화된 실습을 통해 미래사회에 필요한 자질과 능력을 갖춘 유아교사를 양성하고 있습니다.
        </p>
      </div>
     
    </>
  ),

  "호텔외식조리학과": (
    <>
      <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
        <span className="text-2xl mr-2">🍳</span>
        {/* 또는 <FaUtensils className="mr-2 text-orange-500 text-2xl flex-shrink-0" /> */}
        호텔외식조리학과 (Department of Hotel Culinary Arts)
      </h3>

      {/* 학과개요 */}
      <div className="mb-4">
        <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
          <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
          학과개요
         </h4>
    <p className="pl-6 text-sm text-gray-600 ">
      "창의적 문제해결능력을 갖춘 조리 전문인 양성", "조리이론과 특급호텔 현장 실무중심의 교육"을 통해 외식산업을 선도할 인재를 키웁니다. 현대 외식 트렌드를 반영한 체계적인 교육과정을 제공하여 학생들이 이론과 실무를 겸비하도록 돕습니다.
    </p>
  </div>

  {/* 교육목표 */}
  <div className="mb-6">
    <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
      <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" /> {/* 아이콘 예시 (FaBullseye) */}
      교육목표
    </h4>
    <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
      <li>전문 조리 지식 및 실무 능력 배양</li>
      <li>위생 및 안전 관리 능력 함양</li>
      <li>외식산업 경영 및 관리 능력 기초 확립</li>
      <li>글로벌 외식 트렌드 이해 및 창의적 메뉴 개발 능력 육성</li>
      <li>올바른 직업윤리와 서비스 마인드 함양</li>
    </ul>
  </div>

  {/* 주요 교과목 */}
  <div className="mb-6">
    <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
      <FaBookOpen className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" /> {/* 아이콘 예시 (FaBookOpen) */}
      주요 교과목
    </h4>
    <p className="pl-6 text-sm text-gray-600 ">
      한식조리실습, 양식조리실습, 일식조리실습, 중식조리실습, 제과제빵실습, 외식산업론, 식품학, 조리원리, 주방관리론, 메뉴계획과 개발, 푸드코디네이션, 레스토랑경영론, 식품위생학, 와인과 전통주, 바리스타 실무 등
    </p>
  </div>

  {/* 졸업 후 진로 */}
  <div className="mb-6">
    <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
      <FaUserGraduate className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" /> {/* 아이콘 예시 (FaUserGraduate) */}
      졸업 후 진로
    </h4>
    <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
      <li>특급호텔 및 리조트 조리사 (한식, 양식, 일식, 중식, 제과제빵 등)</li>
      <li>전문 레스토랑 및 외식업체 셰프</li>
      <li>단체급식업체 영양사 및 조리사</li>
      <li>식품 연구 개발원 (메뉴 개발, HMR 등)</li>
      <li>푸드 스타일리스트, 푸드 칼럼니스트</li>
      <li>요리학원 강사 및 교육자</li>
      <li>외식 창업 (레스토랑, 카페, 베이커리 등)</li>
      <li>식음료 관련 컨설턴트</li>
    </ul>
  </div>

  {/* 취득 가능 자격증 */}
  <div className="mb-6">
    <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
      <FaCertificate className="mr-2 text-yellow-500 flex-shrink-0 h-4 w-4" /> {/* 아이콘 예시 (FaCertificate) */}
      취득 가능 자격증
    </h4>
    <p className="pl-6 text-sm text-gray-600 ">
      한식조리기능사, 양식조리기능사, 일식조리기능사, 중식조리기능사, 복어조리기능사, 제과기능사, 제빵기능사, 조주기능사(바텐더), 커피바리스타, 위생사, 식품산업기사 등
    </p>
  </div>

  {/* 학과의 강점 */}
  <div className="mb-4"> {/* 마지막 섹션이므로 mb-4로 조정 가능 */}
    <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
      <FaStar className="mr-2 text-red-500 flex-shrink-0 h-4 w-4" /> {/* 아이콘 예시 (FaStar) */}
      학과의 강점
    </h4>
    <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
      <li>최신식 조리 실습 시설 및 기자재 완비</li>
      <li>특급호텔 및 외식산업체 현장 경험이 풍부한 교수진</li>
      <li>다양한 산학협력 프로그램을 통한 현장실습 및 인턴십 기회 제공</li>
      <li>국제 교류 프로그램 및 해외 연수 기회 모색</li>
      <li>창업 동아리 지원 및 맞춤형 창업 교육 실시</li>
      <li>정기적인 조리 경연대회 참가 및 수상 실적</li>
    </ul>
  </div>
</>
 ),
  "아동복지학과": (
 <>
  {/* 👶 아동복지학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">👶</span>
      아동복지학과 (Department of Child Welfare)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        학과개요
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        아동의 복지를 연구하는 학문으로, 아동에 대한 권익을 옹호하고 복지를 실천하며 복지 분야에서 공헌할 전문인을 양성합니다. 현장의 요구가 반영된 실무 중심의 교육과정 운영으로 사회복지사는 물론, 청소년지도사, 학교사회복지사, 심리상담사 등의 프로그램을 운영합니다.
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>아동의 발달 단계에 대한 전문지식을 습득하고 아동복지 전문가로서의 지식 습득</li>
        <li>정보화·지방화 시대에 대비한 교육환경 변화에 능동적으로 대처할 수 있는 기능 숙련</li>
        <li>복지 현장에서 필요로 하는 자질을 배양하여 전문가로서의 포용적인 복지 실천 전문가 양성</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserTie className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" />
        인재상
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        아동복지시설 및 사회복지 현장에서 복지 실천에 기여할 능동적인 복지 전문가 양성을 목적으로 사회에 필요로 하는 자질을 배양하여 아동복지 전문가로서의 능력을 발휘토록 한다.
      </p>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 군산시 임피면 호원대 3길 64 호원대학교 1동</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7370 (과사무실)</p>
        <p className="flex items-center"><FaFax className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />팩스: 063-450-7349 (과사무실)</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 평일(월~금) 09:00 ~ 18:00</p>
      </div>
    </div>
  </div>
  </>
  ),
  "스포츠무도학과": (
      <>
      {/* 🥋 스포츠무도학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">🥋</span>
      스포츠무도학과 (Department of Sports & Martial Arts)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        소개
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        스포츠 산업분야의 새로운 흐름에 맞춰 학문적 장점을 수용하고 독자적인 학문을 정립하기 위해 과학적이고 체계적인 지식과 실기 능력을 조화롭게 지도하여 상무숭덕의 실력자로 육성합니다. 전문스포츠 종목(야구, 축구, 태권도, 우슈, 펜싱, 씨름)과 생활체육종목(배드민턴, 보디빌딩, 수영), 무도종목(합기도, 무에타이, 킥복싱)을 육성하여 인간의 존엄성과 확고한 국가관, 세계관을 지닌 전문지도자를 양성합니다.
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>현대사회가 요구하는 다양성 및 개별성과 스포츠의 관련성 이해</li>
        <li>사회적 변화와 과학적 교육, 업무능력을 겸비한 요원 및 지도자 양성</li>
        <li>세계 최강의 경기력을 지닌 엘리트 선수 육성</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserTie className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" />
        인재상
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        개개인의 미래에 대한 고찰과 학생 스스로가 자신의 전공 및 취업진로에 대한 목표설정과 도전의식을 고취하여 자기 주도적으로 학습하고 취업진로를 설계하여 미래의 변화에 능동적으로 대처할 수 있는 경쟁력을 지닌 인재양성
      </p>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 전북 군산시 임피면 호원대3길 64, 호원대학교 문화체육관 307호</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7650, 7620</p>
        <p className="flex items-center"><FaFax className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />팩스: 063-450-7629</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 월 ~ 금 09:00 ~ 18:00</p>
      </div>
    </div>
  </div>

          </>
  ),
  "경영학과": (
     <>
          {/* 💼 경영학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">💼</span>
      경영학과 (Department of Business Administration)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        학과개요
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        4차 산업혁명시대에 기업에서 요구되는 전문적인 지식과 실천적인 역량을 배양합니다. 1980년에 개설되어 40여 년 동안 7,000여 졸업동문들이 사회 각계각층에서 선도적인 역할을 하고 있습니다. 글로벌 경영환경 변화에 창의적이고 능동적으로 대처할 수 있는 경영관리 능력을 겸비한 전문 경영관리자를 양성하며, 이론적 지식과 실무능력을 배양하기 위한 다양한 프로그램을 제공합니다.
      </p>
    </div>

     <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserTie className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" />
        학과의 인재상
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>과학적 탐구능력과 실천적 능력을 갖춘 전문가 양성</li>
        <li>인성과 문화적 소양에 기반한 글로벌 소통 능력 배양</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        학과의 교육목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>창의적 사고와 경영의사결정 능력 함양</li>
        <li>강력한 리더십을 갖춘 행동적인 인재양성</li>
        <li>디지털 전문지식 기반 창업역량 배양</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserGraduate className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
        졸업 후 진로
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>대기업 및 중소기업 취업, 창업, 대학원 진학 (대학교수 및 연구자)</li>
      </ul>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 군산시 임피면 호원대 3길 64 호원대학교 1동</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7310</p>
        <p className="flex items-center"><FaFax className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />팩스: 063-450-7349</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 09:00~18:00 (점심: 12:00~13:00)</p>
      </div>
    </div>
  </div>
             </>
  ),
  "컴퓨터학과": <ComputerDepartmentContent />, // 아이콘 변경 적용
  "K-뷰티소재학과": (
      <>
         {/* 💅 K-뷰티소재학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">💅</span>
      K-뷰티소재학과 (Department of K-Beauty Materials)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        소개
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        창의·기술·인성을 겸비한 사회 맞춤형 뷰티 전문가를 양성합니다.
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>K-뷰티 기반의 전문적 지식과 경쟁력을 갖춘 융합형 뷰티 리더 양성</li>
        <li>K-뷰티 기반의 경쟁력을 갖춘 사회 맞춤형 뷰티 전문가 양성</li>
        <li>세부 전공별 전문 지식과 인성·창의력을 갖춘 융합형 뷰티 리더 양성</li>
        <li>산학 밀착형 교육시스템 구축으로 현장 실무형 전문 인재 양성</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaCertificate className="mr-2 text-yellow-500 flex-shrink-0 h-4 w-4" />
        취득 가능 자격증
      </h4>
      <div className="pl-6 text-sm text-gray-600 ">
        <p className="font-medium">졸업과 동시에 미용사 면허증 취득 가능</p>
        <p className="mt-1"><span className="font-medium">국가자격증:</span> 미용사, 피부관리사, 메이크업, 네일아트, 컬러리스트 기사 & 산업기사, 맞춤형 화장품 조제관리사</p>
        <p className="mt-1"><span className="font-medium">민간 자격증:</span> 아로마 테라피스트, 조향 디자이너, 퍼스널컬러 이미지 컨설턴트, 모발 두피 관리사, 헤어컬러리스트, 네일아트, 뷰티컬러코디네이터, 맞춤형 화장품 상담전문가 등</p>
      </div>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserGraduate className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
        졸업 후 진로
      </h4>
      <div className="pl-6 text-sm text-gray-600 ">
        <p className="font-medium">교육 분야:</p>
        <ul className="list-disc list-inside ml-4">
            <li>대학 강사, 대학원 진학, 유학, 관련업체 연구원, 뷰티관련 아카데미 및 각종 문화센터 강사</li>
        </ul>
        <p className="font-medium mt-2">뷰티 전문직:</p>
        <ul className="list-disc list-inside ml-4">
            <li>피부관리사, 퍼스널컬러 컨설턴트, 조향 디자이너, 헤어 디자이너, 두피 관리사, 메이크업 아티스트, 메디컬 스킨케어, 뷰티 컨설턴트, 공방 창업, 미용기기 업체, 화장품 회사, 헤어, 메이크업, 피부, 네일아트 전문샵</li>
        </ul>
      </div>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 전북 군산시 임피면 호원대 3길 64 호원대학교 3동 K-뷰티소재학과</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7678</p>
        <p className="flex items-center"><FaFax className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />팩스: 063-450-7679</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 평일(월~금) 09:00 ~ 18:00</p>
      </div>
    </div>
  </div>
              </>
  ),
  "K-푸드창업학과": (
      <>
           {/* 🍲 K-푸드창업학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">🍲</span>
      K-푸드창업학과 (Department of K-Food Entrepreneurship)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        소개
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        외식산업현장의 요구가 반영된 실무중심 교육과정을 통해 외식업체 취업과 창업에 필요한 조리 기술 및 경영자로서의 전문적 역량을 개발하고, 외식산업체, 창업전문가와 협업을 통한 현장체험 실무형 전문기술을 습득하여 외식산업의 미래지향적 혁신에 적합한 경쟁력 있는 인재를 양성합니다.
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목적/목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>K-푸드창업을 선도할 우수 인재 양성</li>
        <li>로컬푸드 창업역량을 갖춘 실무형 전문인력 양성</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserTie className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" />
        인재상
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        K-푸드산업을 선도하는 지역맞춤형 창업 전문가
      </p>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 전라북도 군산시 임피면 호원대3길 64, 호원대학교 4동</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실: 063-450-7385</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />운영시간: 평일(월~금) 09:00 ~ 18:00</p>
      </div>
    </div>
  </div>
              </>
  ),
  "K-콘텐츠제작학과": (
      <>
          {/* 🎬 K-콘텐츠제작학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">🎬</span>
      융합콘텐츠학과 (가칭) (Department of Convergence Contents (tentative))
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserTie className="mr-2 text-indigo-500 flex-shrink-0 h-4 w-4" />
        인재상
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        미래 콘텐츠 산업을 선도하는 창의적인 현장형 콘텐츠 제작 전문가 양성
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        K-컬쳐 기반의 창의적 융합콘텐츠 제작을 구현하는 지역 산업 전문 인력 양성
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBookOpen className="mr-2 text-green-500 flex-shrink-0 h-4 w-4" />
        전공능력
      </h4>
      <div className="pl-6 text-sm text-gray-600 ">
        <p className="font-medium">문화예술적 창의사고:</p>
        <ul className="list-disc list-inside ml-4">
            <li>K-컬쳐/지역 문화의 스토리텔링, 콘텐츠 분석, 문화콘텐츠 기획</li>
        </ul>
        <p className="font-medium mt-2">실무제작능력:</p>
        <ul className="list-disc list-inside ml-4">
            <li>제작 기획, 제작 설계, 영상 편집, 촬영 편집</li>
        </ul>
        <p className="font-medium mt-2">융복합 직무능력:</p>
        <ul className="list-disc list-inside ml-4">
            <li>신기술 이해, 직무능력 향상, 창업</li>
        </ul>
      </div>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaCertificate className="mr-2 text-yellow-500 flex-shrink-0 h-4 w-4" />
        관련자격증
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        멀티미디어 콘텐츠제작 전문가, 1인 미디어 크리에이터자격증, 1인 미디어 콘텐츠 창작자, 디지털영상편집, 사진 기능사, 영상촬영자격증, 웹디자인기능사, 컴퓨터 그래픽운용기능사, 무인동력비행장치 등
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserGraduate className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
        졸업 후 진로
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        디지털 콘텐츠 기획사, 소셜 미디어콘텐츠기획 및 제작 관련 업종, 융합공연 제작사, 공연기획사, 연예 매니지먼트사, 공연 연출가, 영상 촬영 관련 업종, 영상 편집 관련 회사 및 공공 기관, 1인 미디어커머스창업 등
      </p>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 전북 군산시 임피면 호원대 3길 64 호원대학교</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7550</p>
        {/* 팩스 정보 없음 */}
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 평일(월~금) 09:00 ~ 18:00</p>
      </div>
    </div>
  </div>
             </>
  ),
  "사회복지상담학과": (
      <>
          {/* ❤️ 사회복지상담학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">❤️</span>
      사회복지상담학과 (Department of Social Welfare Counseling)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        학과소개
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        4차 산업혁명시대에 변화하는 사회환경으로 발생하는 사회적문제를 전문적인 개입을 통해 지역사회에 기여하는 디지털 융합 사회복지상담 전문가를 양성합니다. 전문화된 이론과 실무능력을 갖춰 생애주기별 맞춤 복지 창출에 관한 교육과정을 운영합니다. ('사회복지 + 상담 + 평생교육' = '학업 + 자격증 + 취업')
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>인성과 소통 능력을 겸비한 인재 양성교육(인성인, 소통인)</li>
        <li>생애주기별 맞춤 복지 기반 사회복지상담 전문 능력 함양교육(실용인, 열정인)</li>
        <li>지역사회에 기여하는 창의 융합 사회복지상담 전문 인력 양성교육(소통인, 열정인)</li>
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaCertificate className="mr-2 text-yellow-500 flex-shrink-0 h-4 w-4" />
        관련자격증
      </h4>
      <div className="pl-6 text-sm text-gray-600 ">
        <p className="font-medium">취득자격증:</p>
        <ul className="list-disc list-inside ml-4">
            <li>사회복지사 2급, 건강가정사 2급</li>
        </ul>
        <p className="font-medium mt-2">이외 자격부여:</p>
        <ul className="list-disc list-inside ml-4">
            <li>사회복지사 1급, 청소년상담사 3급, 임상심리사 2급, 직업상담사 2급</li>
        </ul>
      </div>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaUserGraduate className="mr-2 text-purple-500 flex-shrink-0 h-4 w-4" />
        졸업 후 진로
      </h4>
      <div className="pl-6 text-sm text-gray-600 ">
        <p className="font-medium">사회복지기관:</p>
        <ul className="list-disc list-inside ml-4">
            <li>장애인, 아동, 노인 시설 및 종합복지관 등</li>
        </ul>
        <p className="font-medium mt-2">상담관련 기관:</p>
        <ul className="list-disc list-inside ml-4">
            <li>교육청 Wee센터, 취업지원센터, 청소년 성문화센터 및 상담복지센터 등</li>
        </ul>
        <p className="font-medium mt-2">평생교육기관:</p>
        <ul className="list-disc list-inside ml-4">
            <li>기초자치단체, 장애인평생교육시설, 시민사회단체부설, 주민자치센터</li>
        </ul>
      </div>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 전라북도 군산시 임피면 호원대 3길 64</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />사무실: 063-450-7560 / 7410</p>
        {/* 팩스 정보 없음 */}
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과 사무실 운영시간: 평일 오전 9시 ~ 오후 6시 (방학기간: 오전 9시 ~ 오후 3시)</p>
      </div>
    </div>
  </div>
              </>
  ),
  "보건헬스케어학과": (
      <>
          <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />위치: 2동 2층</p>
          <p className="flex items-center"><FaPhone className="mr-2 text-green-500 flex-shrink-0" />전화: <a href="tel:063-450-7480" className="text-blue-600 hover:underline">063-450-7480</a></p>
          <p><a href="https://huotr.howon.kr" target="_blank" rel="noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"><FaLink className="mr-2 flex-shrink-0" />홈페이지 바로가기</a></p>
      </>
  ),
  "글로컬관광학과": (
      <>
          <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />위치: 2동 2층</p>
          <p className="flex items-center"><FaPhone className="mr-2 text-green-500 flex-shrink-0" />전화: <a href="tel:063-450-7580" className="text-blue-600 hover:underline">063-450-7580</a></p>
          <p><a href="https://hutour.howon.kr" target="_blank" rel="noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"><FaLink className="mr-2 flex-shrink-0" />홈페이지 바로가기</a></p>
      </>
  ),
  "건축인테리어학과": (
      <>
          {/* 🏛️ 건축인테리어학과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">🏛️</span>
      건축인테리어학과 (Department of Architecture & Interior Design)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        학과개요
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        기술이 사회발전을 선도하는 지식 기반형 산업사회에 대응하고, 예술·과학·기술의 복합성을 갖는 건축학 교육을 반영하며, 글로벌 사고능력 위에 심화된 전문 지식을 교육하여 실무 적응력을 배양하고, 건축기술의 기본 및 전문 소양을 습득한 건축 인재 양성을 목표로 합니다.
      </p>
    </div>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaBullseye className="mr-2 text-blue-500 flex-shrink-0 h-4 w-4" />
        교육목표에 따른 구체적인 실천 항목
      </h4>
      <ul className="pl-6 text-sm text-gray-600  list-disc list-inside space-y-1">
        <li>글로벌 시대에 맞는 창조와 융복합에 따른 전문지식과 기술을 갖춘 건축인 양성</li>
        <li>건축계획에서 현장실무에 이르기까지 전 과정의 습득을 위한 전반적 교육과정</li>
        <li>신입생 충원률 및 재학생 유지율 향상을 위한 학과 경쟁력 확보</li>
        <li>취업 및 창업 등을 위한 맞춤형 교과과정 구성</li>
        <li>특성화 된 건축 전문지식에 IT기술을 융합할 수 있는 건축엔지니어 양성</li>
      </ul>
    </div>

    <div className="mb-4">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-2">
        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0 h-4 w-4" />
        연락처
      </h4>
      <div className="pl-6 text-sm text-gray-600  space-y-1">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />주소: 군산시 임피면 호원대 3길 64 호원대학교 건축인테리어학과</p>
        <p className="flex items-center"><FaPhone className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />전화번호: 063-450-7240</p>
        <p className="flex items-center"><FaFax className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />팩스: 063-450-7248</p>
        <p className="flex items-center"><FaClock className="mr-2 text-gray-400 flex-shrink-0 h-3 w-3" />학과사무실 운영시간: 09:00~18:00</p>
      </div>
    </div>
  </div>
               </>
  ),
  "전기소방안전학과": (
      <>
          <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />위치: 4동 3층</p>
          <p className="flex items-center"><FaPhone className="mr-2 text-green-500 flex-shrink-0" />전화: <a href="tel:063-450-7280" className="text-blue-600 hover:underline">063-450-7280</a></p>
          <p><a href="https://fusion.howon.kr" target="_blank" rel="noreferrer" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline"><FaLink className="mr-2 flex-shrink-0" />홈페이지 바로가기</a></p>
      </>
  ),
  "교양과": (
      <>
           {/* 💡 창의인재대학 교양과 */}
  <div className="mb-12 p-4 border rounded-lg shadow-lg">
    <h3 className="flex items-center text-xl font-bold text-gray-800  mb-4">
      <span className="text-2xl mr-2">💡</span>
      창의인재대학 교양과 (College of Creative Talents, Department of Liberal Arts)
    </h3>

    <div className="mb-6">
      <h4 className="flex items-center text-md font-semibold text-gray-700  mb-1">
        <FaInfoCircle className="mr-2 text-teal-500 flex-shrink-0 h-4 w-4" />
        소개
      </h4>
      <p className="pl-6 text-sm text-gray-600 ">
        교양교육은 인간과 자연, 역사, 예술, 과학에 대한 폭넓은 이해와 깊은 통찰을 바탕으로 지식과 기술, 가치를 실행하는 교육입니다. 다양한 학문의 기반이 되고, 미래 사회 대응을 위한 융복합 학문의 기초가 됩니다. 시대와 사회의 변화로 한 분야의 전문지식 외에 다른 분야와의 융복합이 필요하며, 차별화되고 창의적 지식 창출이 이뤄지고 있습니다. ‘우리말과 글쓰기’, ‘독서와 토론’ 등의 교양기초학문과, ‘재능기부봉사’, ‘희망디딤돌’, ‘취업전략 아카데미’ 등의 교과목 외에도 다양한 교과와 비교과 프로그램을 운영하여 시대와 사회가 요구하는 인재를 양성하고 학생 개인의 꿈을 완성할 수 있도록 지원합니다.
      </p>
    </div>
    {/* 창의인재대학 교양과는 제공된 텍스트에 별도 연락처 정보가 명시되어 있지 않아 생략했습니다. */}
  </div>

                </>
  ),
};

export default departmentDetails;