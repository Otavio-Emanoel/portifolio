"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294]">
      {/* Top markers */}
      <div className="pointer-events-none absolute left-6 top-6 text-sm text-white/80">© Otavio Emanoel de Lima</div>
      <nav className="absolute right-8 top-6 flex gap-8 text-sm text-white/80">
        <a href="#work" className="hover:text-white">Work</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>

      {/* Left badge */}
      <div className="pointer-events-none absolute left-0 top-75 pl-2">
        <div className="flex items-center gap-4 rounded-3xl bg-black/30 px-4 py-3 text-white backdrop-blur-sm shadow-xl">
          <div className="leading-tight">
            <div className="text-xs opacity-80">Located in</div>
            <div className="text-sm">Brazil</div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Image src="/globe.svg" alt="Globe" width={22} height={22} />
          </div>
        </div>
      </div>

      {/* Main hero - centralizado */}
      <div className="absolute inset-0 -top-8 flex items-start justify-center pt-8">
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
