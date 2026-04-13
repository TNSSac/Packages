import React, { useEffect, useState } from "react";
import font from "../assets/fonts/Lavishly_Yours/LavishlyYours-Regular.ttf";

const TimeDateDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#5C4B8A",
        color: "#FFFFFF",
      }}
    >
      <style>
        {`
                    @font-face {
                        font-family: 'Lavishly Yours';
                        src: url(${font}) format('truetype');
                    }
                `}
      </style>
      <h1
        style={{
          fontFamily: "Lavishly Yours, cursive",
          fontWeight: "bold",
          fontSize: "4rem",
          padding: "20px 20px",
          borderRadius: "10px",
        }}
      >
        Tracy Nail Spa
      </h1>
      <h2
        style={{
          fontFamily: "Lavishly Yours, cursive",
          fontSize: "3.5rem",
          marginBottom: "0",
        }}
      >
        {time.toLocaleDateString("en-US", { weekday: "long" })}
      </h2>
      <h3 style={{ fontSize: "2rem", marginBottom: "5px " }}>
        {time.toLocaleDateString("en-US")}
      </h3>
      <h1
        style={{
          fontSize: "2.5rem",
          marginTop: "5px",
        }}
      >
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "Lavishly Yours, cursive",
            fontSize: "2.7rem",
          }}
        >
          Scan to view our menu
        </span>
      </div>
      <img
        src="./path/to/qr-code.png"
        alt="QR Code"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default TimeDateDisplay;
