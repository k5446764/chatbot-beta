const API_URL = process.env.REACT_APP_API_URL;

export const sendMessageToAPI = async (text) => {
  try {
    console.log("📡 API 요청 보냄:", text);

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    console.log("📩 응답 받은 원본 데이터:", data);
    return data;
  } catch (error) {
    console.error("❌ API 통신 에러:", error);
    return {
      outputs: [{ type: 'text', content: '서버 연결에 실패했습니다.' }]
    };
  }
};

