"use client";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import HeroWrapper from "../components/HeroWrapper";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Fallback para esconder intro após timeout, caso onDone não dispare
    const t = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-200 font-sans dark:bg-zinc-900">
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <HeroWrapper />
    </div>
  );
}
