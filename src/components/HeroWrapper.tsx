"use client";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";

export default function HeroWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 768);

    // Listen for resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avoid hydration mismatch
  if (isMobile === null) {
    return null;
  }

  return isMobile ? <HeroMobile /> : <Hero />;
}
