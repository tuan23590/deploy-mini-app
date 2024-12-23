import { useLayoutEffect, useState } from "react";

export function useRealHeight(element, defaultValue) {
    const [height, setHeight] = useState(defaultValue ?? 0);
  
    useLayoutEffect(() => {
      if (element.current && typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver((entries) => {
          const [{ contentRect }] = entries;
          setHeight(contentRect.height);
        });
  
        ro.observe(element.current);
  
        return () => {
          ro.disconnect();
        };
      }
  
      return () => {};
    }, [element.current]);
  
    if (typeof ResizeObserver === "undefined") {
      return -1;
    }
  
    return height;
  }