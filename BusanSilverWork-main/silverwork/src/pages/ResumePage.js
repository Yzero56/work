import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// 아이콘 이미지 파일 import
import officeIcon from "../icons/사무경영.png";
import financeIcon from "../icons/금융.png";
import educationIcon from "../icons/교육연구사회복지.png";
import healthcareIcon from "../icons/보건의료.png";
import mediaIcon from "../icons/출판.png";
import transportIcon from "../icons/운송.png";
import salesIcon from "../icons/서비스.png";
import cleaningIcon from "../icons/경비미화.png";
import foodIcon from "../icons/결혼음식.png";
import constructionIcon from "../icons/기술.png";
import otherIcon from "../icons/기타.png";

function ResumePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    age: "",
    phone: "",
    educationLevel: "",
    welfareStatus: "",
    address: "",
    pcSkills: "",
    drivingAbility: "",
    preferredJobs: ["", "", ""],
    expectedSalary: "",
    employmentType: "",
  });
  const [selectedJobCategories, setSelectedJobCategories] = useState([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const jobCategories = [
    { name: "사무,경영", icon: officeIcon },
    { name: "금융,보험,홍보", icon: financeIcon },
    { name: "교육,연구,사회복지", icon: educationIcon },
    { name: "보건, 의료", icon: healthcareIcon },
    { name: "문화,방송,출판", icon: mediaIcon },
    { name: "운전,운송", icon: transportIcon },
    { name: "영업, 판매, 서비스", icon: salesIcon },
    { name: "경비, 환경, 미화", icon: cleaningIcon },
    { name: "결혼, 음식", icon: foodIcon },
    { name: "기계, 생산, 건축", icon: constructionIcon },
    { name: "기타", icon: otherIcon },
  ];

  const pcSkillsOptions = [
    "활용능력없음",
    "문서작성",
    "표계산",
    "인터넷",
    "프레젠테이션",
    "홈페이지제작",
    "기타",
  ];

  const drivingOptions = ["불가능", "가능 (수동)", "가능 (오토)"];

  const salaryOptions = [
    "50~60만원",
    "70~90만원",
    "100~120만원",
    "120~150만원",
    "150만원 이상",
  ];

  const employmentOptions = ["상용직", "일용직", "상관없음"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferredJobChange = (index, value) => {
    const newPreferredJobs = [...formData.preferredJobs];
    newPreferredJobs[index] = value;
    setFormData({ ...formData, preferredJobs: newPreferredJobs });
  };

  const handleCheckboxChange = (setFunction, selectedOptions, option) => {
    if (selectedOptions.includes(option)) {
      setFunction(selectedOptions.filter((item) => item !== option));
    } else {
      setFunction([...selectedOptions, option]);
    }
  };

  const handleSubmit = async () => {
    setStatusMessage("결과를 불러오는 중입니다...");

    try {
      await axios.post("/api/results", {
        ...formData,
        selectedJobCategories,
        selectedEmploymentTypes,
      });
      navigate("/results", { state: { formData } });

      setStatusMessage("신청내역을 확인해주세요");
    } catch (error) {
      setStatusMessage("오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>구직신청</h2>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>이름</label>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>주민번호</label>
        <input
          type="text"
          name="idNumber"
          placeholder="주민번호를 입력하세요"
          value={formData.idNumber}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>연령</label>
        <input
          type="number"
          name="age"
          placeholder="나이를 입력하세요"
          value={formData.age}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div style={optionGroupStyle}>
        <label style={labelStyle}>휴대폰</label>
        <input
          type="tel"
          name="phone"
          placeholder="휴대폰 번호를 입력하세요"
          value={formData.phone}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>최종학력</label>
        <input
          type="text"
          name="educationLevel"
          placeholder="최종학력을 입력하세요"
          value={formData.educationLevel}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>국민기초생활수급여부</label>
        <div style={welfareStatusContainerStyle}>
          <label style={welfareOptionStyle}>
            <input
              type="checkbox"
              name="welfareStatus"
              value="유"
              style={inputCheckboxStyle}
              checked={formData.welfareStatus === "유"}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  welfareStatus: prevData.welfareStatus === "유" ? "" : "유",
                }))
              }
            />
            <span style={labelTextStyle}>유</span>
          </label>
          <label style={welfareOptionStyle}>
            <input
              type="checkbox"
              name="welfareStatus"
              value="무"
              style={inputCheckboxStyle}
              checked={formData.welfareStatus === "무"}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  welfareStatus: prevData.welfareStatus === "무" ? "" : "무",
                }))
              }
            />
            <span style={labelTextStyle}>무</span>
          </label>
        </div>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>주소</label>
        <input
          type="text"
          name="address"
          placeholder="주소를 입력하세요"
          value={formData.address}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      {/* 업직종 선택 */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>업직종</label>
        <div style={iconButtonContainerStyle}>
          {jobCategories.map((category, index) => (
            <button
              key={index}
              onClick={() =>
                handleCheckboxChange(
                  setSelectedJobCategories,
                  selectedJobCategories,
                  category.name
                )
              }
              style={{
                ...iconButtonStyle,
                backgroundColor: selectedJobCategories.includes(category.name)
                  ? "#4CAF50"
                  : "#f1f1f1",
                color: selectedJobCategories.includes(category.name)
                  ? "white"
                  : "#333",
              }}>
              <img src={category.icon} alt={category.name} style={iconStyle} />
              {category.name}
            </button>
          ))}
        </div>
      </div>
      {/* 고용형태 선택 */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>고용형태</label>
        <div style={buttonContainerStyle}>
          {employmentOptions.map((type, index) => (
            <button
              key={index}
              onClick={() =>
                handleCheckboxChange(
                  setSelectedEmploymentTypes,
                  selectedEmploymentTypes,
                  type
                )
              }
              style={{
                ...employmentButtonStyle,
                backgroundColor: selectedEmploymentTypes.includes(type)
                  ? "#4CAF50"
                  : "#e0e0e0",
                color: selectedEmploymentTypes.includes(type)
                  ? "white"
                  : "#333",
              }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* PC Skill Options */}
      <div style={optionGroupStyle}>
        <label style={labelStyle}>PC 활용 능력</label>
        <div style={buttonContainerStyle}>
          {pcSkillsOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setFormData({ ...formData, pcSkills: option })}
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.pcSkills === option ? "#4CAF50" : "#e0e0e0",
                color: formData.pcSkills === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>운전 여부</label>
        <div style={buttonContainerStyle}>
          {drivingOptions.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                setFormData({ ...formData, drivingAbility: option })
              }
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.drivingAbility === option ? "#4CAF50" : "#e0e0e0",
                color: formData.drivingAbility === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={optionGroupStyle}>
        <label style={labelStyle}>기대 임금</label>
        <div style={buttonContainerStyle}>
          {salaryOptions.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                setFormData({ ...formData, expectedSalary: option })
              }
              style={{
                ...employmentButtonStyle,
                backgroundColor:
                  formData.expectedSalary === option ? "#4CAF50" : "#e0e0e0",
                color: formData.expectedSalary === option ? "white" : "#333",
              }}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 신청하기 버튼 */}
      <button onClick={handleSubmit} style={viewResultsButtonStyle}>
        신청하기
      </button>
      {/* 상태 메시지 */}
      {statusMessage && <p style={statusMessageStyle}>{statusMessage}</p>}
    </div>
  );
}

//style
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  maxWidth: "90%",
  margin: "20px auto",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
  textAlign: "center",
};

const optionGroupStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
};

const labelStyle = {
  fontSize: "25px",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  fontSize: "25px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const iconButtonContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", // Slightly larger minimum width for better legibility
  gap: "16px", // Increase gap for clearer spacing between items
  alignItems: "center", // Center align buttons vertically in their grid cells
  justifyContent: "center", // Center the grid within its container
  padding: "16px", // Add padding around the grid to create space from surrounding content
  width: "100%", // Make the grid responsive to its container's width
  boxSizing: "border-box", // Ensure padding doesn't affect overall width
};

const welfareStatusContainerStyle = {
  display: "flex",
  gap: "20px", // Clear space between the "유" and "무" options
  fontSize: "30px", // Slightly increase font size for readability
  alignItems: "center", // Align items in the center for a balanced layout
  marginTop: "10px",
};

const welfareOptionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px", // Space between checkbox and label text
  cursor: "pointer", // Pointer cursor for clickable elements
};

const inputCheckboxStyle = {
  width: "20px", // Increase size for easier clicking
  height: "20px",
};

const labelTextStyle = {
  fontSize: "25px",
  color: "#333", // Dark color for high contrast and readability
  fontWeight: "bold",
};

const iconButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
  flexDirection: "column",
  width: "100px",
  height: "100px",
  transition: "background-color 0.2s",
};

const iconStyle = {
  width: "32px",
  height: "32px",
  marginBottom: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
};

const employmentButtonStyle = {
  padding: "12px 24px",
  fontSize: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const viewResultsButtonStyle = {
  marginTop: "20px",
  padding: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
  maxWidth: "300px",
};

const statusMessageStyle = {
  marginTop: "15px",
  fontSize: "18px",
  color: "#333",
  textAlign: "center",
};

// Media Queries for Responsive Design
const responsiveStyles = `
@media (max-width: 768px) {
  .container {
    padding: 15px;
    font-size: 1rem;
  }
  .title {
    font-size: 24px;
  }
  .label {
    font-size: 18px;
  }
  .input {
    font-size: 16px;
  }
  .iconButton {
    width: 80px;
    height: 80px;
  }
  .employmentButton {
    font-size: 16px;
    padding: 10px 15px;
  }
  .viewResultsButton {
    font-size: 18px;
  }
}
`;

export default ResumePage;
