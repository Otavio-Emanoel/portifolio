"use client";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import HeroWrapper from "../components/HeroWrapper";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Failsafe: só esconde a intro se por algum motivo o onDone não disparar.
    // Precisa ser maior que o tempo de digitação + tempo de espera + animação de saída.
    if (!showIntro) return;
    const t = setTimeout(() => setShowIntro(false), 20000);
    return () => clearTimeout(t);
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-zinc-200 font-sans dark:bg-zinc-900">
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <HeroWrapper />
    </div>
  );
}
