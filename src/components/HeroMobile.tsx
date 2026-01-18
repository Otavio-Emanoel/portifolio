"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroMobile() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294] flex flex-col items-center justify-between py-8">
      {/* Top markers */}
      <div className="w-full flex items-center justify-between px-4 text-xs text-white/80">
        <div>© Otavio Emanoel de Lima</div>
      </div>

      {/* Image centered */}
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <div className="relative w-full max-w-sm">
          <div className="relative" style={{ height: "50vh", minHeight: "300px" }}>
            <Image
              src="/me.png"
              alt="Foto"
              fill
              priority
              sizes="90vw"
              className="object-contain"
              style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.35))" }}
            />
          </div>
        </div>
      </div>

      {/* Text section */}
      <motion.div 
        className="text-center text-white px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div 
          className="mb-3 text-3xl font-light"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ↘
        </motion.div>
        <div className="text-2xl font-light leading-tight mb-4">
          <div>Freelance</div>
          <div>Backend Developer</div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-3 py-2 text-white backdrop-blur-sm shadow-xl w-fit mx-auto">
          <div className="leading-tight">
            <div className="text-[10px] opacity-80">Located in</div>
            <div className="text-xs">Brazil</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Image src="/globe.svg" alt="Globe" width={16} height={16} />
          </div>
        </div>
      </motion.div>

      {/* Name marquee at bottom */}
      <div className="pointer-events-none w-full select-none overflow-hidden mt-auto">
        <motion.div
          className="whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="inline-block px-4 text-[14vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
          <span className="inline-block px-4 text-[14vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
          <span className="inline-block px-4 text-[14vw] leading-none tracking-tight text-white/90">Otavio Emanoel </span>
        </motion.div>
      </div>
    </section>
  );
}
