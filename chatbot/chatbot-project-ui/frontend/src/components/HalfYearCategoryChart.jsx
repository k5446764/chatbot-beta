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
function MonthlyCategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/stats/category?period=6`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("데이터 가져오기 오류:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>최근 6개월 챗봇 이용 통계</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyCategoryChart;

