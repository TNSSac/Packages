const CACHE_KEY = "posterList";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchPostersFromGithub() {
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

export function getCachedPosters() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (24 hours)
    if (now - timestamp < CACHE_TTL) {
      console.log("Using cached posters");
      return data;
    }

    // Cache expired
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (err) {
    console.debug("Cache read failed:", err?.message);
    return null;
  }
}

export function setCachedPosters(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch (err) {
    console.debug("Cache write failed:", err?.message);
  }
}
