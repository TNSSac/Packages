import { useState, useEffect } from "react";

export function usePosterImages() {
  const [packageFiles, setPackageFiles] = useState([]);
  const [current, setCurrent] = useState(0);

  async function fetchPostersFromGithub() {
    const url =
      "https://api.github.com/repos/TNSSac/Packages/contents/TNSPackages/Posters?ref=main";
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const items = await res.json();
    console.log("Fetched items:", items);
    return items
      .filter((i) => i.type === "file" && /\.(png|jpe?g|svg)$/i.test(i.name))
      .map((i) => ({
        url: i.download_url,
        name: i.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
  }

  // Fetch posters on mount
  useEffect(() => {
    let cancelled = false;
    let cachedUrls = [];

    async function resolvePosters() {
      try {
        const arr = await fetchPostersFromGithub();
        if (cancelled || !Array.isArray(arr) || !arr.length) return;

        // Cache all images
        for (const item of arr) {
          try {
            const res = await fetch(item.url);
            if (!res.ok) throw new Error(`Failed to fetch ${item.name}`);
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            item.url = objectUrl;
            cachedUrls.push(objectUrl);
          } catch (err) {
            console.error("Failed to cache image", item.name, err);
            // Keep original URL if caching fails
          }
        }

        if (!cancelled) {
          setPackageFiles(arr);
          setCurrent(0);
        }
      } catch (err) {
        console.debug("fetchPostersFromGithub failed:", err?.message ?? err);
      }
    }

    resolvePosters();

    return () => {
      cancelled = true;
      cachedUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Cycle images every 15 seconds
  useEffect(() => {
    if (!packageFiles.length) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % packageFiles.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [packageFiles.length]);

  return { packageFiles, current };
}
