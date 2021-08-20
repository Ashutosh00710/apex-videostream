import { useRef, useEffect } from "react";

/**
 * @param {string} key - The key to listen for.
 * @param {function} callback - The callback to execute when the key is pressed.
 * @returns {void}
 * @example
 * useKeyDown('Space', () => {
 *   console.log('The "Space" key was pressed.');
 * });
 */
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
