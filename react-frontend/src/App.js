import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getData?url=${url}&tag=${tag}`
      );
      setData(response.data);
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
  const inputTagStyle = {
    width: "10%",
    padding: "15px 20px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "2px solid #ddd",
    boxSizing: "border-box",
    transition: "border 0.3s",
  };

  const buttonStyle = {
    width: "10%",
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
    <div
      className="App"
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <span>Enter url</span>
      </div>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={inputStyle}
      />
      <div>
        <span>Enter Html Tag</span>
      </div>

      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Enter HTML Tag" // Yeni input HTML tag için
        style={inputTagStyle}
      />
      <button
        style={buttonStyle}
        onClick={fetchData} // Fonksiyon ismi güncellendi
      >
        Get Data !
      </button>
      <ul style={listStyle}>
        {data.map((element, index) => (
          <li key={index} style={listItemStyle}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
