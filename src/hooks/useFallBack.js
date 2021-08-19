import { useEffect } from "react";

export const useFallBack = (videoRef) => {
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const time = localStorage.getItem("currentTime");
      if (time) {
        videoElement.currentTime = time;
      }
    }
  }, [videoRef]);

  useEffect(() => {
    function onReloadStoreTime() {
      localStorage.setItem("currentTime", videoRef.current.currentTime);
    }

    window.addEventListener("beforeunload", onReloadStoreTime);

    return () => {
      window.removeEventListener("beforeunload", onReloadStoreTime);
    };
  }, [videoRef]);
};
