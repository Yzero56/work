import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResultsPage() {
  const { state } = useLocation();
  const { formData } = state || {};

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        "/api/send-email",
        { formData }
      );
      alert("이메일 전송 완료: " + response.data);
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>신청 결과</h2>
      {formData ? (
        <div>
          <p>이름: {formData.name}</p>
          <p>주민번호: {formData.idNumber}</p>
          <p>연령: {formData.age}</p>
          <p>휴대폰: {formData.phone}</p>
          <p>최종학력: {formData.educationLevel}</p>
          <p>국민기초생활수급여부: {formData.welfareStatus}</p>
          <p>주소: {formData.address}</p>
          <p>PC 활용 능력: {formData.pcSkills}</p>
          <p>운전 여부: {formData.drivingAbility}</p>
          <p>기대 임금: {formData.expectedSalary}</p>
          <button
            onClick={handleSendEmail}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
            }}>
            전송하기
          </button>{" "}
        </div>
      ) : (
        <p>데이터를 로드하는 중입니다...</p>
      )}
    </div>
  );
}

export default ResultsPage;
