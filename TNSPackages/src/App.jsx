import "./App.css";
import TimeDateDisplay from "./components/TimeDateDisplay";
import { useEffect, useState } from "react";
import Container from "./components/Container";
import PosterDisplay from "./components/PosterDisplay";
import { usePosterImages } from "./hooks/usePosterImages";

function App() {
  const [showTimeDate, setShowTimeDate] = useState(true);

  const { packageFiles, current, nextPoster } = usePosterImages();

  useEffect(() => {
    const interval = setInterval(() => {
      if (showTimeDate) {
        nextPoster();
      }
      setShowTimeDate((prev) => !prev);
    }, 10000); // Rotate every 10 seconds
    return () => clearInterval(interval);
  }, [packageFiles.length, showTimeDate, nextPoster]);

  return (
    <Container>
      {!showTimeDate && (
        <PosterDisplay packageFiles={packageFiles} current={current} />
      )}
      {showTimeDate && <TimeDateDisplay />}
    </Container>
  );
}

export default App;
