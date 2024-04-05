"use client";

import { useState, useEffect } from "react";

const getIsMobile = () => {
  try {
    if (window) return window?.innerWidth <= 768;
    return null;
  } catch (error) {}
};

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  console.log("GETISMOBILE", isMobile, getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
