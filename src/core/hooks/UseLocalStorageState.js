import { useState, useEffect } from 'react';

export const UseLocalStorageState = (initialState, key = false) => {
  const [state, setState] = useState(initialState);
  const [initFlag, setInitFlag] = useState(false);
  useEffect(() => {
    try {
      if (key) {
        const localState = JSON.parse(localStorage.getItem(key)) || {};
        if (localState) {
          setState({ ...localState, ...initialState });
        }
        setInitFlag(true);
      }
    } catch (error) {
      console.error(error);
      setInitFlag(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (initFlag) {
      localStorage.setItem(key, state);
    }
  }, [state]);

  return [state, setState];
};
