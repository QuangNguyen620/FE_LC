import { useRef, useEffect } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let isSubscribed = false;
    let id = setInterval(async () => {
      // console.log("invoke interval: " + isSubscribed);
      if (isSubscribed) {
        return;
      }
      isSubscribed = true;

      await savedCallback.current();
      isSubscribed = false;
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
