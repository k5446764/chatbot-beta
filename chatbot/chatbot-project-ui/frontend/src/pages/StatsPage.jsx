import React, { useState } from "react";
import MonthlyCategoryChart from "../components/MonthlyCategoryChart";
import QuarterlyCategoryChart from "../components/QuarterlyCategoryChart";
import HalfYearCategoryChart from "../components/HalfYearCategoryChart";
import YearlyCategoryChart from "../components/YearlyCategoryChart";
import MonthlySelectorChart from "../components/MonthlySelectorChart";

function StatsPage() {
  const [period, setPeriod] = useState("1");

  const renderChart = () => {
    switch (period) {
      case "1":
        return <MonthlyCategoryChart />;
      case "3":
        return <QuarterlyCategoryChart />;
      case "6":
        return <HalfYearCategoryChart />;
      case "12":
        return <YearlyCategoryChart />;
      default:
        return <MonthlyCategoryChart />;
    }
  };

  return (
    <div className="stats_page_wrap p-6">
      <h2 className="text-xl font-bold mb-4">📊 챗봇 질문 통계</h2>
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setPeriod("1")}
          className={`px-4 py-2 rounded ${period === "1" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          1개월
        </button>
        <button
          onClick={() => setPeriod("3")}
          className={`px-4 py-2 rounded ${period === "3" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          3개월
        </button>
        <button
          onClick={() => setPeriod("6")}
          className={`px-4 py-2 rounded ${period === "6" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          6개월
        </button>
        <button
          onClick={() => setPeriod("12")}
          className={`px-4 py-2 rounded ${period === "12" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          1년
        </button>
      </div>
      {renderChart()}

      <hr className="my-8" />
      <h2 className="text-lg font-semibold mb-2">📅 원하는 월별 통계 보기</h2>
      <MonthlySelectorChart />
    </div>
  );
}

export default StatsPage;
