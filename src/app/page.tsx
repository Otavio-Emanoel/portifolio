"use client";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import IntroMobile from "../components/IntroMobile";
import HeroWrapper from "../components/HeroWrapper";
import TerminalSection from "../components/TerminalSection";
import GitTimeline from "../components/GitTimeline";
import SystemModules from "../components/SystemModules";
import ProjectWorkspaces from "@/components/ProjectWorkspaces";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!showIntro) return;
    const t = setTimeout(() => setShowIntro(false), 20000);
    return () => clearTimeout(t);
  }, [showIntro]);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  return (
    <div className="min-h-screen bg-zinc-200 font-sans dark:bg-zinc-900">
      {showIntro && (isMobile ? <IntroMobile onDone={() => setShowIntro(false)} /> : <Intro onDone={() => setShowIntro(false)} />)}
      <HeroWrapper />
      <TerminalSection />
      <GitTimeline />
      <SystemModules />
      <ProjectWorkspaces />
    </div>
  );
}
