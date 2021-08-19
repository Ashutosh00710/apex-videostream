import { useRef, useEffect } from "react";

export const useKeyDown = (key, callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key]);
};
