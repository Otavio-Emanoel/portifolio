"use client";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// --- Componente da Bandeira (Maior e com animação interna de vento) ---
const WavingBrazilFlag = () => (
  <motion.div
    // AUMENTEI O TAMANHO AQUI (h-16 w-24) 👇
    className="h-16 w-24 shadow-2xl"
    style={{ transformOrigin: "left center" }} // A bandeira "segura" pelo lado esquerdo
    animate={{
      skewY: [0, 3, -3, 0], // Deformação do tecido
      filter: ["brightness(1)", "brightness(1.15)", "brightness(0.9)", "brightness(1)"], // Luz nas dobras
    }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" className="h-full w-full object-cover rounded-md">
      <rect width="720" height="504" fill="#009c3b" />
      <path fill="#ffdf00" d="M360,67.2l309.6,184.8L360,436.8L50.4,252L360,67.2z" />
      <circle cx="360" cy="252" r="126" fill="#002776" />
      <path fill="#fff" d="M246.6,268.8 A147,147 0 0,1 487.8,210 A126,126 0 0,0 246.6,268.8z" />
      <circle cx="360" cy="280" r="3" fill="#fff" />
      <circle cx="340" cy="230" r="3" fill="#fff" />
      <circle cx="400" cy="240" r="3" fill="#fff" />
    </svg>
    {/* Haste da bandeira sutil (opcional, dá realismo) */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20 blur-[1px]" />
  </motion.div>
);

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Variáveis para a física da bandeira (Drag/Inércia)
  const mouseXMotion = useMotionValue(0);
  const mouseXVelocity = useSpring(mouseXMotion, { stiffness: 500, damping: 30 }); // Suaviza o movimento
  
  // Transforma a velocidade do mouse em rotação da bandeira
  // Se mover rápido pra direita, inclina pra esquerda (efeito de vento contrário)
  const flagTilt = useTransform(mouseXVelocity, [-1000, 1000], [45, -45]);

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const lastRippleTime = useRef(0);
  const prevMouseX = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });

    // Calcula a "velocidade" baseada na diferença da posição X
    const velocity = (e.clientX - prevMouseX.current) * 5; // Multiplicador para sensibilidade
    mouseXMotion.set(velocity);
    prevMouseX.current = e.clientX;

    // Lógica das ondas (Ripples)
    const now = Date.now();
    if (now - lastRippleTime.current > 40) {
      const newRipple = { x, y, id: now };
      setRipples((prev) => [...prev.slice(-6), newRipple]);
      lastRippleTime.current = now;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRipples([]);
    mouseXMotion.set(0); // Zera a inércia da bandeira
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#8f9294]">
      {/* Top markers */}
      <div className="pointer-events-none absolute left-6 top-6 text-sm text-white/80">© Otavio Emanoel de Lima</div>
      <nav className="absolute right-8 top-6 flex gap-8 text-sm text-white/80 z-50">
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </nav>

      {/* --- BADGE PRINCIPAL --- */}
      <div className="absolute left-0 top-75 pl-2 z-30" style={{ perspective: 1000 }}>
        <motion.div
          className="group relative flex cursor-pointer items-center gap-4 px-5 py-3.5"
          // NOTA: Removi o overflow-hidden DAQUI para a bandeira poder sair
          // E removi o background daqui também, ele vai para o container interno
          style={{ transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* CONTAINER "VIDRO" INTERNO 
            Aqui fica o overflow-hidden para cortar a água e o brilho, 
            mas não cortar a bandeira que está fora dele.
          */}
          <div 
            className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
            style={{
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
            }}
          >
             {/* CAMADA DE LUZ (Spotlight) */}
            <motion.div
                className="absolute -inset-px opacity-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 60%)`,
                mixBlendMode: "overlay",
                }}
            />

            {/* CAMADA DE ONDAS (Ripples) */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                <motion.div
                    key={ripple.id}
                    initial={{ opacity: 0.5, scale: 0, x: ripple.x, y: ripple.y }}
                    animate={{ opacity: 0, scale: 3.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute rounded-full border border-white/40 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    style={{
                    width: 20,
                    height: 20,
                    top: -10,
                    left: -10,
                    }}
                />
                ))}
            </AnimatePresence>
            
            {/* Noise Texture e Brilho Geral */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>


          {/* --- BANDEIRA (FORA DO CONTAINER DE VIDRO) --- */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="pointer-events-none absolute z-60" 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: mousePos.x - 40, // Centralizando a bandeira maior
                  y: mousePos.y - 40 
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                // Aqui aplicamos a física de "tilt" baseada no movimento
                style={{ 
                    rotate: flagTilt, 
                    filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.5))" // Sombra fora do vidro
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20,
                    // Mass deixa o movimento da bandeira um pouco mais "pesado"
                    mass: 0.8 
                }}
              >
                <WavingBrazilFlag />
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONTEÚDO DE TEXTO (Mantido igual) */}
          <div className="relative z-10 leading-tight text-white/90 ml-1">
            <div className="text-xs font-light tracking-wide opacity-80 mix-blend-plus-lighter">Located in</div>
            <div className="text-sm font-semibold drop-shadow-md">Brazil</div>
          </div>

          <motion.div
            className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ml-3"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)"
            }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <Image src="/globe.svg" alt="Globe" width={22} height={22} className="relative z-10 opacity-80" />
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* FOTO E RESTO DO SITE */}
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
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute right-12 top-32 text-right text-white md:right-24 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="mb-4 text-6xl font-light inline-block"
          animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ↘
        </motion.div>
        <div className="text-5xl font-light leading-tight">
          <div>Freelance</div>
          <div>Backend Developer</div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden opacity-30 mix-blend-overlay">
        <motion.div
          className="whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <span className="inline-block px-8 text-[22vw] leading-none tracking-tight text-white/50 font-bold">Otavio Emanoel </span>
          <span className="inline-block px-8 text-[22vw] leading-none tracking-tight text-white/50 font-bold">Otavio Emanoel </span>
        </motion.div>
      </div>
    </section>
  );
}