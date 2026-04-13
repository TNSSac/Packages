import React from "react";
import { isSilkBrowser } from "../utils/utilityFunctions";

const PosterDisplay = ({ packageFiles, current }) => {
  const imgSrc = packageFiles.length ? packageFiles[current].url : "";
  const screenOrientation = window.screen.orientation.type;
  const isLandscape =
    screenOrientation.includes("landscape") ||
    window.innerWidth > window.innerHeight;
  const imgClassName = isLandscape ? "rotated" : "";
  const styling = !isLandscape ? { width: "100vw", height: "auto" } : {};

  const isSilk = isSilkBrowser();

  if (isSilk) {
    return (
      <>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={packageFiles[current]?.name ?? "poster"}
            style={{
              transform: "rotate(-90deg)",
              maxWidth: "100vh",
              maxHeight: "100vw",
              objectFit: "contain",
            }}
          />
        ) : (
          <div className="no-posters">No posters found</div>
        )}
      </>
    );
  }

  return (
    <>
      <img
        className={imgClassName}
        src={imgSrc}
        alt={packageFiles[current]?.name ?? "poster"}
        style={styling}
      />
    </>
  );
};

export default PosterDisplay;
