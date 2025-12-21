import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(0);

  const packageFiles = [
    {
      // public/ files are served from the site root in Vite
      url: "/ClassicCarePackage.jpeg",
      name: "Classic Care Package",
    },
    {
      url: "/ThyWithPuppy.jpeg",
      name: "Thy With Puppy",
    },
  ];

  // Cycle images every 15 seconds and loop back to the start
  useEffect(() => {
    if (!packageFiles.length) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % packageFiles.length);
    }, 15000); // 15,000 ms = 15s
    return () => clearInterval(interval);
  }, [packageFiles.length]);

  // const [count, setCount] = useState(0);
  const screenOrientation = window.screen.orientation.type;
  let styling = {};
  if (screenOrientation.includes("landscape")) {
    styling = { width: "auto", height: "100vh" };
  } else {
    styling = { width: "100vw", height: "auto" };
  }

  return (
    <>
      <img
        src={`public/${packageFiles[current].url}`}
        alt={packageFiles[current].name}
        style={styling}
      />
    </>
  );
}

export default App;
