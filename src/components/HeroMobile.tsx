"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroMobile() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#8f9294]">
      {/* Navbar top */}
      <div className="absolute top-0 left-0 right-0 z-40 w-full flex items-center justify-between px-4 py-4 text-xs text-white/80">
        <div>© Otavio Emanoel</div>
      </div>

      {/* Left badge */}
      <div className="absolute left-0 top-20 z-30 pl-2">
        <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-black/30 px-2.5 sm:px-3 py-1.5 sm:py-2 text-white backdrop-blur-sm shadow-xl">
          <div className="leading-tight">
            <div className="text-[9px] sm:text-[10px] opacity-80">Located in</div>
            <div className="text-[11px] sm:text-xs">Brazil</div>
          </div>
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 shrink-0">
            <Image src="/globe.svg" alt="Globe" width={14} height={14} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      {/* Text section - right corner */}
      <motion.div 
        className="absolute top-1/4 right-4 sm:right-6 text-right text-white z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div 
          className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-light"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ↘
        </motion.div>
        <div className="text-xl sm:text-2xl font-light leading-tight">
          <div>Freelance</div>
          <div>Backend Developer</div>
        </div>
      </motion.div>

      {/* Large image at bottom - extended to edges */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full" style={{ height: "75vh" }}>
        <Image
          src="/me.png"
          alt="Foto"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom"
          style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Name marquee at bottom - overlaid on image */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none select-none overflow-hidden h-24 sm:h-28 flex items-end">
        <motion.div
          className="whitespace-nowrap w-full"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="inline-block px-3 sm:px-4 text-[16vw] sm:text-[18vw] leading-none tracking-tight text-white/90 font-light">Otavio Emanoel </span>
          <span className="inline-block px-3 sm:px-4 text-[16vw] sm:text-[18vw] leading-none tracking-tight text-white/90 font-light">Otavio Emanoel </span>
          <span className="inline-block px-3 sm:px-4 text-[16vw] sm:text-[18vw] leading-none tracking-tight text-white/90 font-light">Otavio Emanoel </span>
        </motion.div>
      </div>
    </section>
  );
}
