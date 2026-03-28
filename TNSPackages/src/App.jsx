import "./App.css";
import { usePosterImages } from "./hooks/usePosterImages";

function App() {
  const { packageFiles, current } = usePosterImages();

  const imgSrc = packageFiles.length ? packageFiles[current].url : "";

  const screenOrientation = window.screen.orientation.type;
  const isLandscape =
    screenOrientation.includes("landscape") ||
    window.innerWidth > window.innerHeight;

  const imgClassName = isLandscape ? "rotated" : "";
  const imgWrapClass = isLandscape ? "rotated-wrap" : "";
  const styling = !isLandscape ? { width: "100vw", height: "auto" } : {};

  const isSilkBrowser = () => {
    const ua = navigator.userAgent || "";
    return ua.includes("Silk") || ua.includes("AmazonWebAppPlatform");
  };

  if (isSilkBrowser()) {
    console.log("Silk browser detected!");
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
      </div>
    );
  }

  return (
    <>
      {imgSrc ? (
        <div className={imgWrapClass}>
          <img
            className={imgClassName}
            src={imgSrc}
            alt={packageFiles[current]?.name ?? "poster"}
            style={styling}
          />
        </div>
      ) : (
        <div className="no-posters">No posters found</div>
      )}
    </>
  );
}

export default App;
