"use client";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import HeroWrapper from "../components/HeroWrapper";
import TerminalSection from "../components/TerminalSection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) return;
    const t = setTimeout(() => setShowIntro(false), 20000);
    return () => clearTimeout(t);
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-zinc-200 font-sans dark:bg-zinc-900">
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <HeroWrapper />
      <TerminalSection />
    </div>
  );
}
