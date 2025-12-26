import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(0);
  // Start with a local/public fallback so we never render an empty src
  const [packageFiles, setPackageFiles] = useState([]);

  let imgSrc = "";

  async function fetchPostersFromGithub() {
    const url =
      "https://api.github.com/repos/TNSSac/Packages/contents/TNSPackages/Posters?ref=main";
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const items = await res.json(); // array of file objects
    console.log("Fetched items:", items);
    return items
      .filter((i) => i.type === "file" && /\.(png|jpe?g|svg)$/i.test(i.name))
      .map((i) => ({
        url: i.download_url,
        name: i.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
  }

  // Determine image source. Use the URL as-is; GitHub download_url is absolute.
  if (packageFiles.length) {
    imgSrc = packageFiles[current].url;
  }

  // Try fetching a pre-generated manifest from /posters.json first,
  // then fall back to GitHub listing if the manifest is missing or empty.
  useEffect(() => {
    let cancelled = false;

    async function resolvePosters() {
      try {
        const arr = await fetchPostersFromGithub();
        if (!cancelled && Array.isArray(arr) && arr.length) {
          setPackageFiles(arr);
          setCurrent(0);
        }
      } catch (err) {
        // ignore - keep fallback packageFiles
        // eslint-disable-next-line no-console
        console.debug("fetchPostersFromGithub failed:", err?.message ?? err);
      }
    }

    resolvePosters();

    return () => {
      cancelled = true;
    };
  }, []);

  // Cycle images every 15 seconds and loop back to the start
  useEffect(() => {
    if (!packageFiles.length) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % packageFiles.length);
    }, 15000); // 15,000 ms = 15s
    return () => clearInterval(interval);
  }, [packageFiles.length]);

  // reload every 5 minutes:
  useEffect(() => {
    const id = setInterval(() => window.location.reload(), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

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
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={packageFiles[current]?.name ?? "poster"}
          style={styling}
        />
      ) : (
        <div className="no-posters">No posters found</div>
      )}
    </>
  );
}

export default App;
