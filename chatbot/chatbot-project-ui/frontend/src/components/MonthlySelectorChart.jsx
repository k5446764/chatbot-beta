import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
function MonthlySelectorChart() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios
      .get(`${API_URL}/stats/category-by-month?year=${year}&month=${month}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("데이터 가져오기 오류:", err));
  }, [year, month]);

  const yearOptions = [2024, 2025, 2026]; // 연도 범위 필요시 조정
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12

  return (
    <div style={{ width: "100%", height: 500, marginTop: "2rem" }}>
      <h3>📅 선택 월별 챗봇 이용 통계</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>연도:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </select>

        <label style={{ margin: "0 0.5rem" }}>월:</label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {monthOptions.map((m) => (
            <option key={m} value={m}>{m}월</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlySelectorChart;
