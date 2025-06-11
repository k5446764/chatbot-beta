// MainCardMenu.jsx (기존 코드를 수정)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';


const CARD_ITEMS = [
  { label: "사이버 강의", emoji: "📑", value: "사이버 강의 알려줘" },
  { label: "학과정보", emoji: "💬", value: "학과정보 알려줘" },
  { label: "교내연락처", emoji: "📞", value: "교내연락처 알려줘" },
  { label: "졸업", emoji: "🎓", value: "졸업 안내" },
  { label: "장학", emoji: "🌿", value: "장학제도 알려줘" },
  { label: "등록금", emoji: "💰", value: "등록금 안내" },
  { label: "학사일정", emoji: "📅", value: "학사일정 알려줘" },
  { label: "증명서", emoji: "📄", value: "증명서 발급" },
  { label: "도서관", emoji: "📚", value: "도서관 정보 알려줘" },
  { label: "기숙사", emoji: "🏠", value: "기숙사 정보" },
  { label: "HOPE", emoji: "🧭", value: "HOPE 정보" },
  { label: "식단", emoji: "🍽️", value: "식단 알려줘" },
  { label: "캠퍼스맵", emoji: "🗺️", value: "캠퍼스맵" },
  { label: "찾아오시는길", emoji: "🌏️", value: "찾아오시는길" },
  { label: "셔틀버스", emoji: "🚌", value: "셔틀버스" },
  { label: "관련 홈페이지", emoji: "🌐", value: "관련 홈페이지" },
];

const PAGE_SIZE = 8; // 모바일에서의 페이지 크기

function MainCardMenu({ onSelect }) {
  // 2. sm 브레이크포인트(640px)를 기준으로 모바일 여부 판별
  const isMobile = useMediaQuery('(max-width: 639px)');

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // 모바일일 때만 페이지네이션이 의미가 있음
  const totalPages = isMobile ? Math.ceil(CARD_ITEMS.length / PAGE_SIZE) : 1;

  const handleDragEnd = (e, info) => {
    // 모바일이 아닐 경우 드래그 기능 무시
    if (!isMobile) return;

    if (info.offset.x < -100 && currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    } else if (info.offset.x > 100 && currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // 3. 모바일일 경우에만 데이터를 잘라서 사용, 데스크탑은 전체 데이터 사용
  const pageData = isMobile
    ? CARD_ITEMS.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
    : CARD_ITEMS;

  const CardItem = ({ item }) => (
    <button
      onClick={() => onSelect(item.value)}
      className="flex flex-col items-center justify-center w-full min-h-[50px] bg-gray-50 border border-gray-300 rounded-lg transition duration-200 hover:bg-gray-300 text-sm sm:text-base"
    >
      <div className="text-xl mb-1">{item.emoji}</div>
      <div className="truncate text-center text-[10px] sm:text-xs">{item.label}</div>
    </button>
  );

  return (
    <div className="flex w-full items-start gap-2">
      <div className="flex-grow min-w-0">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3 } }}
          exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
          className="overflow-hidden"
        >
          {/* 4. isMobile 값에 따라 다른 뷰를 렌더링 */}
          {isMobile ? (
            // === 모바일 뷰 (페이지네이션 O) ===
            <>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className="grid grid-cols-4 gap-2" // 모바일은 항상 4열
                >
                  {pageData.map((item, idx) => (
                    <CardItem key={idx} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-1">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentPage ? 1 : -1);
                        setCurrentPage(idx);
                      }}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-transform ${
                        currentPage === idx ? 'bg-red-500 scale-125' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // === 데스크탑 뷰 (페이지네이션 X) ===
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {pageData.map((item, idx) => (
                <CardItem key={idx} item={item} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MainCardMenu;