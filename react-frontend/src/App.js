import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [headings, setHeadings] = useState([]);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getHeadings?url=${url}`
      );
      setHeadings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const inputStyle = {
    width: "80%",
    padding: "15px 20px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "2px solid #ddd",
    boxSizing: "border-box",
    transition: "border 0.3s",
  };

  const buttonStyle = {
    padding: "15px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginLeft: "5px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div className="App" style={{ textAlign: "justify", padding: "20px" }}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
      />
      <button
        style={buttonStyle}
        onClick={fetchHeadings}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Get Data !
      </button>
      <ul style={listStyle}>
        {headings.map((heading, index) => (
          <li key={index} style={listItemStyle}>
            {heading}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
