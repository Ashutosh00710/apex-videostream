import { useEffect } from "react";

/**
 * Use this hook to set a fallback for the video stream.
 *
 * @param {any} videoRef - The fallback video stream.
 */
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
