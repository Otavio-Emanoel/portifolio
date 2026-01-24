"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// --- Ícones (Idênticos ao Desktop) ---
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

// --- Componente: Texto que Embaralha (Auto-Play) ---
const ScrambleTextMobile = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      // Só começa a embaralhar depois do delay inicial visual
      if (iteration === 0 && Date.now() % 100 !== 0) return; 

      setDisplayText((prev) => 
        text.split("").map((letter, index) => 
          index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 40);
    
    // Timeout para iniciar a animação
    const startTimeout = setTimeout(() => {
        // Force re-render/start logic if needed, but interval handles it
    }, delay);

    return () => {
        clearInterval(interval);
        clearTimeout(startTimeout);
    };
  }, [text, delay]);

  return <div className={className}>{displayText}</div>;
};

// --- Componente: Marquee Infinito Seguro ---
const InfiniteMarqueeMobile = () => {
  return (
    <div className="relative flex overflow-hidden select-none w-full max-w-[100vw]">
      {/* Degradê nas pontas para suavizar */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-[#8f9294] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-[#8f9294] to-transparent z-10" />
      
      {/* Container Duplo para Loop Perfeito */}
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-[15vh] font-bold text-white/10 mx-4 tracking-tighter">OTAVIO EMANOEL</span>
        <span className="text-[6vh] text-white/10 mx-4">★</span>
        <span className="text-[15vh] font-bold text-white/10 mx-4 tracking-tighter">OTAVIO EMANOEL</span>
        <span className="text-[6vh] text-white/10 mx-4">★</span>
      </div>
      <div className="flex animate-marquee whitespace-nowrap absolute top-0 left-0" aria-hidden="true">
        <span className="text-[15vh] font-bold text-white/10 mx-4 tracking-tighter">OTAVIO EMANOEL</span>
        <span className="text-[6vh] text-white/10 mx-4">★</span>
        <span className="text-[15vh] font-bold text-white/10 mx-4 tracking-tighter">OTAVIO EMANOEL</span>
        <span className="text-[6vh] text-white/10 mx-4">★</span>
      </div>
    </div>
  );
};

// --- Botão Social Mobile (Tátil) ---
const MobileSocialButton = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <motion.div 
      whileTap={{ scale: 0.95, backgroundColor: "rgba(255,255,255,0.2)" }}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-full shadow-lg active:border-white/30 transition-colors"
    >
      <Icon className="w-5 h-5 text-white" />
      <span className="text-sm font-medium text-white">{label}</span>
    </motion.div>
  </a>
);

export default function HeroMobile() {
  return (
    // max-w-[100vw] e overflow-x-hidden são CRUCIAIS aqui
    <section className="relative w-full h-screen max-w-[100vw] overflow-x-hidden overflow-y-hidden bg-[#8f9294] flex flex-col justify-between">
      
      {/* 1. Header (Topo) */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }}
          className="text-xs font-medium text-white/70"
        >
          © Otavio Emanoel
        </motion.div>
        
        {/* Badge "Located in Brazil" */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 pl-3 pr-1 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-xl"
        >
          <div className="flex flex-col items-end leading-none mr-1">
            <span className="text-[9px] text-white/60 uppercase tracking-wider">Located in</span>
            <span className="text-[11px] font-bold text-white">Brazil</span>
          </div>
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10">
             {/* Globo girando suavemente */}
             <Image 
                src="/globe.svg" 
                alt="Globe" 
                width={16} 
                height={16} 
                className="opacity-90 animate-[spin_10s_linear_infinite]" 
             />
          </div>
        </motion.div>
      </div>

      {/* 2. Conteúdo Principal (Texto e Botões) */}
      {/* Z-index alto para ficar acima da foto se necessário */}
      <div className="relative z-30 px-6 pt-32 w-full flex flex-col items-end text-right">
        
        {/* Seta Animada */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.8, type: "spring" }}
          className="mb-6 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
        >
          <motion.span 
            animate={{ y: [0, 5, 0], x: [0, 5, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="text-2xl text-white"
          >
            ↘
          </motion.span>
        </motion.div>

        {/* Textos Scramble */}
        <div className="flex flex-col items-end gap-1 mb-8">
          <div className="text-4xl font-light text-white/90 leading-none">
            <ScrambleTextMobile text="Freelance" delay={100} />
          </div>
          <div className="text-4xl font-bold text-white leading-none tracking-tight">
            <ScrambleTextMobile text="Fullstack Dev" delay={500} />
          </div>
        </div>

        {/* Linha Divisória Animada */}
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "80px" }} 
          transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
          className="h-0.5 bg-white/40 mb-8 rounded-full"
        />

        {/* Botões Sociais */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex gap-3"
        >
          <MobileSocialButton icon={GithubIcon} label="GitHub" href="https://github.com/Otavio-Emanoel" />
          <MobileSocialButton icon={LinkedinIcon} label="LinkedIn" href="https://www.linkedin.com/in/otavioelima/" />
        </motion.div>
      </div>

      {/* 3. Imagem (Fundo) */}
      {/* Ajustada para não estourar largura */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 w-full h-[65vh] flex items-end justify-center pointer-events-none"
      >
        <div className="relative w-full h-full max-w-125">
          <Image
            src="/me.png"
            alt="Otavio Emanoel"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          />
        </div>
      </motion.div>

      {/* 4. Marquee (Rodapé) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-20 w-full pb-6"
      >
        <InfiniteMarqueeMobile />
      </motion.div>

    </section>
  );
}