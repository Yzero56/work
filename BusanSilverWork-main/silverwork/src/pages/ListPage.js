import React from "react";
import { Link } from "react-router-dom";
import Map from "../components/Map";

function ListPage() {
  return (
    <div style={containerStyle}>
      <Link to="/resume">
        <button style={searchButtonStyle}>🔍 검색하기</button>
      </Link>
      <Map />
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
};

const searchButtonStyle = {
  padding: "15px 40px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#ff6b6b",
  border: "none",
  borderRadius: "50px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  marginBottom: "20px",
};

searchButtonStyle["&:hover"] = {
  backgroundColor: "#ff5252",
  transform: "translateY(-3px)",
};

export default ListPage;
