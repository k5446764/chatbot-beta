import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 차트 컴포넌트 import
import MonthlyCategoryChart from '../../MonthlyCategoryChart';
import QuarterlyCategoryChart from '../../QuarterlyCategoryChart';
import HalfYearCategoryChart from '../../HalfYearCategoryChart';
import YearlyCategoryChart from '../../YearlyCategoryChart';
import MonthlySelectorChart from '../../MonthlySelectorChart';
const API_URL = process.env.REACT_APP_API_URL;
const StatisticsPage = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [intentCounts, setIntentCounts] = useState([]); // /api/stats/intents 전체
  const [intentDetails, setIntentDetails] = useState([]); // chart 또는 card 클릭 시 intent 상세
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChart, setSelectedChart] = useState("1m");

  // 카테고리 및 intent 데이터 불러오기
  useEffect(() => {
    axios.get(`${API_URL}/stats/categories`).then(res => {
      setCategoryCounts(res.data);
    });
    axios.get(`${API_URL}/stats/intents`).then(res => {
      setIntentCounts(res.data);
    });
  }, []);

  // 막대 그래프 클릭 처리
  const handleBarClick = (e) => {
    if (e && e.activeLabel) {
      const category = e.activeLabel;
      setSelectedCategory(category);

      // 상세 intent 정보 불러오기
      axios
        .get(`${API_URL}/stats/intent-by-category?category=${category}`)
        .then((res) => setIntentDetails(res.data))
        .catch((err) => {
          console.error("카테고리 intent 조회 실패:", err);
          setIntentDetails([]);
        });
    }
  };

  // 카드 클릭 처리
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = intentCounts.filter(intent => intent.category === category);
    setIntentDetails(filtered);
  };

  // 선택된 차트 컴포넌트 렌더링
  const renderChart = () => {
    switch (selectedChart) {
      case "1m":
        return <MonthlyCategoryChart onBarClick={handleBarClick} />;
      case "3m":
        return <QuarterlyCategoryChart onBarClick={handleBarClick} />;
      case "6m":
        return <HalfYearCategoryChart onBarClick={handleBarClick} />;
      case "12m":
        return <YearlyCategoryChart onBarClick={handleBarClick} />;
      case "select":
        return <MonthlySelectorChart onBarClick={handleBarClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 통계 페이지</h2>

      <div className="mb-6">
        <label className="mr-4">📅 통계 기간 선택: </label>
        <select
          value={selectedChart}
          onChange={(e) => {
            setSelectedChart(e.target.value);
            setSelectedCategory(null);
            setIntentDetails([]);
          }}
        >
          <option value="1m">최근 1개월</option>
          <option value="3m">최근 3개월</option>
          <option value="6m">최근 6개월</option>
          <option value="12m">최근 1년</option>
          <option value="select">특정 월 선택</option>
        </select>
      </div>

      {/* 차트 렌더링 */}
      {renderChart()}

      <h3 className="text-lg font-semibold mt-10 mb-4">카테고리 목록</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <div
            key={category}
            className="bg-blue-100 p-4 rounded cursor-pointer hover:bg-blue-200"
            onClick={() => handleCategoryClick(category)}
          >
            <p className="font-semibold">{category}</p>
            <p>{count}건</p>
          </div>
        ))}
      </div>

      {/* 선택된 카테고리 하위 인텐트 */}
      {selectedCategory && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h4 className="text-md font-bold mb-2">📌 {selectedCategory} 카테고리의 대표 질문</h4>
          {intentDetails.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {intentDetails.map((intent, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50">
                  👉 <strong>{intent.description}</strong> – {intent.count}건
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
