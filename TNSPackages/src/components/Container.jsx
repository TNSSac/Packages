import React from "react";
import { isSilkBrowser } from "../utils/utilityFunctions";

const Container = ({ children }) => {
  const isSilk = isSilkBrowser();

  const screenOrientation = window.screen.orientation.type;
  const isLandscape =
    screenOrientation.includes("landscape") ||
    window.innerWidth > window.innerHeight;

  const imgWrapClass = isLandscape ? "rotated-wrap" : "";

  if (isSilk) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={imgWrapClass}>{children}</div>;
};

export default Container;
