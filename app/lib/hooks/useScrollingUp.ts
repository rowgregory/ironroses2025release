import { useEffect, useRef, useState } from "react";

export function useScrollingUp() {
  const [scrollingUp, setScrollingUp] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollingUp(currentY < lastY.current && currentY > 100);
      lastY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollingUp;
}
