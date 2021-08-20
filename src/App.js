import { useRef } from "react";
import { useKeyDown } from "./hooks/useKeyDown";
import { useFallBack } from "./hooks/useFallBack";
import Logo from "./assets/Apex.png";
import "./App.css";

function App() {
  const video = useRef(null);

  useFallBack(video);

  // Listen for "SPACE" key
  useKeyDown("Space", () => {
    const videoElement = video.current;

    if (!videoElement.ended) {
      let isPlaying =
        videoElement.currentTime > 0 &&
        !videoElement.paused &&
        !videoElement.ended &&
        videoElement.readyState > videoElement.HAVE_CURRENT_DATA;

      if (!isPlaying) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    } else {
      videoElement.load();
    }
  });

  // Listen for "RIGHT ARROW" key
  useKeyDown("ArrowRight", () => {
    const videoElement = video.current;
    videoElement.currentTime += 5;
    if (videoElement.currentTime > videoElement.duration) {
      videoElement.load();
      videoElement.pause();
    }
  });

  // Listen for "LEFT ARROW" key
  useKeyDown("ArrowLeft", () => {
    const videoElement = video.current;
    videoElement.currentTime -= 5;
    if (videoElement.currentTime < 0) {
      videoElement.load();
      videoElement.pause();
    }
  });

  // Listen for "UP ARROW" key
  useKeyDown("ArrowUp", () => {
    const videoElement = video.current;
    if (videoElement.volume !== 1) {
      videoElement.volume += 0.1;
    }
  });

  // Listen for "DOWN ARROW" key
  useKeyDown("ArrowDown", () => {
    const videoElement = video.current;
    if (videoElement.volume !== 0) {
      videoElement.volume -= 0.1;
    }
  });

  return (
    <div className="App">
      <img src={Logo} alt="logo" width="20%" />
      <video className="video" width="650" controls autoPlay ref={video}>
        <source
          src="https://video-stream-back.herokuapp.com/stream/Apex"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default App;
