"use client";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const MorphingSocialButton = ({ 
  icon: Icon, 
  label, 
  previewColor, 
  href,
  id 
}: { 
  icon: any, 
  label: string, 
  previewColor: string, 
  href: string,
  id: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout 
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative z-50 h-12.5" 
      onMouseLeave={() => setIsOpen(false)}
      style={{
        width: isOpen ? 240 : 160, 
      }}
    >
      <motion.div
        layoutId={`container-${id}`}
        className={`relative overflow-hidden bg-[#1a1a1a] border border-white/20 shadow-2xl ${isOpen ? 'rounded-xl' : 'rounded-full'}`}
        style={{
          width: isOpen ? 240 : 160, 
          height: isOpen ? 200 : 50, 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full w-full"
            >
              <div className={`h-24 w-full ${previewColor} relative flex items-center justify-center shrink-0`}>
                <div className="absolute inset-0 bg-black/20" />
                <Icon className="relative z-10 h-10 w-10 text-white/50" />
              </div>

              <div className="p-4 flex flex-col justify-between grow">
                <div>
                  <div className="mb-1 text-sm font-semibold text-white">{label} Profile</div>
                  <div className="text-[10px] leading-snug text-gray-400">
                    Click below to view full profile.
                  </div>
                </div>
                
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-xs font-bold text-black transition-transform hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  Access Now <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md hover:bg-white/10"
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="font-medium text-white">{label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => text.split("").map((letter, index) => index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <motion.div className={className} onMouseEnter={scramble} style={{ cursor: "text" }}>{displayText}</motion.div>;
};

const WavingBrazilFlag = () => (
  <motion.div className="h-16 w-24 shadow-2xl" style={{ transformOrigin: "left center" }} animate={{ skewY: [0, 3, -3, 0], filter: ["brightness(1)", "brightness(1.15)", "brightness(0.9)", "brightness(1)"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" className="h-full w-full object-cover rounded-md">
      <rect width="720" height="504" fill="#009c3b" />
      <path fill="#ffdf00" d="M360,67.2l309.6,184.8L360,436.8L50.4,252L360,67.2z" />
      <circle cx="360" cy="252" r="126" fill="#002776" />
      <path fill="#fff" d="M246.6,268.8 A147,147 0 0,1 487.8,210 A126,126 0 0,0 246.6,268.8z" />
      <circle cx="360" cy="280" r="3" fill="#fff" />
      <circle cx="340" cy="230" r="3" fill="#fff" />
      <circle cx="400" cy="240" r="3" fill="#fff" />
    </svg>
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20 blur-[1px]" />
  </motion.div>
);

const InfiniteMarquee = () => {
  const [isHovered, setIsHovered] = useState(false);
  const MarqueeContent = () => (
    <div className="flex items-center gap-16 pr-16">
      <span className="text-[18vw] leading-none tracking-tighter font-bold">OTAVIO EMANOEL</span>
      <span className="text-[8vw]">★</span>
      <span className="text-[18vw] leading-none tracking-tighter font-bold">OTAVIO EMANOEL</span>
      <span className="text-[8vw]">★</span>
    </div>
  );
  return (
    <div className="pointer-events-auto relative flex overflow-hidden select-none pb-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#8f9294] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#8f9294] to-transparent z-10" />
      <motion.div className="flex shrink-0" initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: isHovered ? 60 : 25, repeat: Infinity, ease: "linear" }}>
        <div className={`flex items-center transition-all duration-500 ${isHovered ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "text-transparent"}`} style={{ WebkitTextStroke: isHovered ? "0px" : "1px rgba(255,255,255,0.4)" }}><MarqueeContent /></div>
      </motion.div>
      <motion.div className="flex shrink-0" initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: isHovered ? 60 : 25, repeat: Infinity, ease: "linear" }}>
        <div className={`flex items-center transition-all duration-500 ${isHovered ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "text-transparent"}`} style={{ WebkitTextStroke: isHovered ? "0px" : "1px rgba(255,255,255,0.4)" }}><MarqueeContent /></div>
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseXMotion = useMotionValue(0);
  const mouseXVelocity = useSpring(mouseXMotion, { stiffness: 500, damping: 30 });   
  const flagTilt = useTransform(mouseXVelocity, [-1000, 1000], [45, -45]);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const lastRippleTime = useRef(0);
  const prevMouseX = useRef(0);

  const textRef = useRef<HTMLDivElement>(null);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const springTextX = useSpring(textX, { stiffness: 200, damping: 15 });
  const springTextY = useSpring(textY, { stiffness: 200, damping: 15 });

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    const velocity = (e.clientX - prevMouseX.current) * 5; 
    mouseXMotion.set(velocity);
    prevMouseX.current = e.clientX;
    
    const now = Date.now();
    if (now - lastRippleTime.current > 40) {
      const newRipple = { x, y, id: now };
      setRipples((prev) => [...prev.slice(-6), newRipple]);
      lastRippleTime.current = now;
    }
  };

  const handleBadgeMouseLeave = () => {
    setIsHovered(false);
    setRipples([]);
    mouseXMotion.set(0);
  };

  const handleBadgeMouseEnter = () => setIsHovered(true);
  const handleBadgeClick = () => {};

  const handleTextMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    textX.set((e.clientX - centerX) / 5);
    textY.set((e.clientY - centerY) / 5);
  };

  const handleTextMouseLeave = () => {
    textX.set(0);
    textY.set(0);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294]">
      <motion.div className="pointer-events-none absolute left-6 top-6 text-sm text-white/80" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 9.6 }}>© Otavio Emanoel de Lima</motion.div>
      <motion.nav className="absolute right-8 top-6 flex gap-8 text-sm text-white/80 z-50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 9.6 }}>
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </motion.nav>

      <motion.div className="absolute left-0 top-75 pl-2 z-30" style={{ perspective: 1000 }} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 9.4 }}>
        <motion.div className="group relative flex cursor-pointer items-center gap-4 px-5 py-3.5" style={{ transformStyle: "preserve-3d" }} onMouseMove={handleBadgeMouseMove} onMouseEnter={handleBadgeMouseEnter} onMouseLeave={handleBadgeMouseLeave} whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}>
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none" style={{ background: "rgba(255, 255, 255, 0.1)", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)" }}>
            <motion.div className="absolute -inset-px opacity-0" animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 60%)`, mixBlendMode: "overlay" }} />
            <AnimatePresence>{ripples.map((ripple) => (<motion.div key={ripple.id} initial={{ opacity: 0.5, scale: 0, x: ripple.x, y: ripple.y }} animate={{ opacity: 0, scale: 3.5 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute rounded-full border border-white/40 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ width: 20, height: 20, top: -10, left: -10 }} />))}</AnimatePresence>
          </div>
          <AnimatePresence>{isHovered && (<motion.div className="pointer-events-none absolute z-60" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, x: mousePos.x - 40, y: mousePos.y - 40 }} exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }} style={{ rotate: flagTilt, filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.5))" }} transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.8 }}><WavingBrazilFlag /></motion.div>)}</AnimatePresence>
          <div className="relative z-10 leading-tight text-white/90 ml-1"><div className="text-xs font-light tracking-wide opacity-80 mix-blend-plus-lighter">Located in</div><div className="text-sm font-semibold drop-shadow-md">Brazil</div></div>
          <motion.div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ml-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)" }} whileHover={{ rotate: 360 }} transition={{ duration: 0.8, ease: "circOut" }}><Image src="/globe.svg" alt="Globe" width={22} height={22} className="relative z-10 opacity-80" /><div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent rounded-full" /></motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0 -top-8 flex items-start justify-center pt-8" initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 9.2, ease: [0.22, 1, 0.36, 1] }}>
        <div className="relative w-full max-w-5xl"><div className="relative mx-auto" style={{ height: "100vh" }}><Image src="/me.png" alt="Foto" fill priority sizes="100vw" className="object-contain" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }} /></div></div>
      </motion.div>

      <motion.div ref={textRef} className="absolute right-12 top-32 text-right text-white md:right-24 z-30 cursor-default" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 9.4 }} onMouseMove={handleTextMouseMove} onMouseLeave={handleTextMouseLeave} style={{ x: springTextX, y: springTextY }}>
        <motion.div className="mb-6 flex justify-end" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <motion.div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm" whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}><span className="text-4xl text-white/80">↘</span></motion.div>
        </motion.div>

        <div className="space-y-2 flex flex-col items-end">
           <div className="text-5xl font-light leading-tight"><ScrambleText text="Freelance" className="hover:text-emerald-300 transition-colors duration-300" /></div>
           <div className="text-5xl font-light leading-tight"><ScrambleText text="Fullstack Developer" className="font-medium" /></div>
           <motion.div className="mt-4 h-0.5 bg-white/30" style={{ width: "20%" }} whileHover={{ width: "100%", backgroundColor: "#fff" }} transition={{ duration: 0.4 }} />
           
           <div className="mt-8 flex gap-4 items-start justify-end h-55">
              <MorphingSocialButton 
                id="github"
                label="GitHub" 
                icon={GithubIcon} 
                href="https://github.com/Otavio-Emanoel" 
                previewColor="bg-gray-800"
              />
              <MorphingSocialButton 
                id="linkedin"
                label="LinkedIn" 
                icon={LinkedinIcon} 
                href="https://www.linkedin.com/in/otavioelima/" 
                previewColor="bg-blue-700"
              />
           </div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-0 left-0 right-0 z-20" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 9.8 }}>
         <InfiniteMarquee />
      </motion.div>
    </section>
  );
}