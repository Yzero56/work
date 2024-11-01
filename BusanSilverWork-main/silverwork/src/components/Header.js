import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerStyle}>
      <Link to="/">
        <h1>노인 일자리 정보</h1>
      </Link>
      <nav>
        <ul style={navStyle}>
          <li>
            <Link to="/">List</Link>
          </li>
          <li>
            <Link to="/resume">resume</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f2dfd3",
  color: "#333",
};

const navStyle = {
  listStyle: "none",
  display: "flex",
  gap: "15px",
};

export default Header;
