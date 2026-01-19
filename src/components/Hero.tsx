"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [badgeHover, setBadgeHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleBadgeMouseEnter = () => {
    setBadgeHover(true);
    console.log("Badge hover ON");
  };

  const handleBadgeMouseLeave = () => {
    setBadgeHover(false);
    console.log("Badge hover OFF");
  };

  const handleBadgeClick = () => {
    console.log("Badge clicked");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294]">
      {/* Top markers */}
      <div className="pointer-events-none absolute left-6 top-6 text-sm text-white/80">© Otavio Emanoel de Lima</div>
      <nav className="absolute right-8 top-6 flex gap-8 text-sm text-white/80">
        <a href="#work" className="hover:text-white">Work</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>

      {/* Left badge (3D Liquid Glass) */}
      <div className="absolute left-0 top-75 pl-2 z-30" style={{ perspective: 1200 }}>
        <motion.div
          className="group relative flex cursor-pointer items-center gap-4 rounded-3xl px-5 py-3.5 text-white"
          style={{ 
            transformStyle: "preserve-3d",
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 2px rgba(255,255,255,0.2)",
          }}
          onMouseMove={handleBadgeMouseMove}
          onMouseEnter={handleBadgeMouseEnter}
          onMouseLeave={handleBadgeMouseLeave}
          onClick={handleBadgeClick}
          whileHover={{ 
            rotateX: -8, 
            rotateY: 12, 
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ 
            scale: 0.95,
            rotateX: 0,
            rotateY: 0,
            transition: { duration: 0.15 }
          }}
        >
          {/* Brazil flag follower */}
          {badgeHover && (
            <motion.div
              className="pointer-events-none absolute z-50 text-5xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x - 28,
                y: mousePos.y - 28,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))" }}
            >
              🇧🇷
            </motion.div>
          )}
          {/* Animated liquid shine */}
          <motion.div 
            className="pointer-events-none absolute -inset-full overflow-hidden rounded-3xl bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%", y: "-100%" }}
            whileHover={{ 
              x: "100%", 
              y: "100%",
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
          />
          
          {/* Glossy top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-linear-to-b from-white/20 via-white/5 to-transparent" />
          
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-px rounded-[1.4rem] ring-1 ring-inset ring-white/30" />

          <div className="relative z-10 leading-tight">
            <div className="text-xs font-light opacity-90">Located in</div>
            <div className="text-sm font-medium">Brazil</div>
          </div>

          <motion.div 
            className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-inner"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image src="/globe.svg" alt="Globe" width={22} height={22} className="relative z-10" />
            {/* inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/40 via-transparent to-transparent" />
          </motion.div>

          {/* Click ripple effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-white/20"
            initial={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Main hero - centralizado */}
      <div className="pointer-events-none absolute inset-0 -top-8 flex items-start justify-center pt-8">
        <div className="relative w-full max-w-5xl">
          <div className="relative mx-auto" style={{ height: "100vh" }}>
            <Image
              src="/me.png"
              alt="Foto"
              fill
              priority
              sizes="100vw"
              className="object-contain"
              style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.35))" }}
            />
          </div>
        </div>
      </div>

      {/* Text + arrow - posicionado absolutamente no canto superior direito */}
      <motion.div 
        className="absolute right-12 top-32 text-right text-white md:right-24"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div 
          className="mb-4 text-6xl font-light"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ↘
        </motion.div>
        <div className="text-5xl font-light leading-tight">
          <div>Freelance</div>
          <div>Backend Developer</div>
        </div>
      </motion.div>

      {/* Big name marquee at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden">
        <motion.div
          className="whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="inline-block px-8 text-[22vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
          <span className="inline-block px-8 text-[22vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
          <span className="inline-block px-8 text-[22vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
        </motion.div>
      </div>
    </section>
  );
}
