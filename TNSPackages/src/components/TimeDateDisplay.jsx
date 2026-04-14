import React, { useEffect, useState } from "react";
import { isSilkBrowser } from "../utils/utilityFunctions";
import font from "../assets/fonts/Lavishly_Yours/LavishlyYours-Regular.ttf";
import qrCode from "../assets/qr-code.jpg";

const TimeDateDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // const isSilk = true;
  const isSilk = isSilkBrowser();

  const containerStyle = isSilk
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vw",
        width: "100vh",
        backgroundColor: "#5C4B8A",
        color: "#FFFFFF",
        transform: "rotate(-90deg)",
      }
    : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#5C4B8A",
        color: "#FFFFFF",
      };

  return (
    <div style={containerStyle}>
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
          justifyContent: "center",
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
        src={qrCode}
        alt="QR Code"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default TimeDateDisplay;
