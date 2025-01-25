import { useEffect, useState } from "react";

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false); // unmounted by default

  const setMounted = () => setIsMounted(true);
  const setUnMounted = () => setIsMounted(false);

  useEffect(() => {
    setMounted();

    return () => {
      setUnMounted();
    };
  }, []); // run once on mount

  return isMounted; // return function that checks mounted status
}
