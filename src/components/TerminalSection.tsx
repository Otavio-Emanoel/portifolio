"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const lines = [
  { text: "> neofetch --user otavio", color: "text-emerald-400", type: "command" },
  { text: "loading system info...", color: "text-gray-500", type: "output" },
  { text: "----------------------", color: "text-gray-600", type: "output" },
  { label: "OS:", text: "Fedora + Arch Linux", color: "text-white" },
  { label: "Host:", text: "Etec de Peruíbe", color: "text-white" },
  { label: "Role:", text: "Full-Stack Developer", color: "text-white" },
  { label: "Uptime:", text: "17 years", color: "text-white" },
  { label: "Goal:", text: "Exchange Program 2026 ✈️", color: "text-yellow-300" },
  { label: "Stack:", text: "TypeScript, Java, Dart, Python, C#, Go", color: "text-blue-400" },
  { text: "", type: "break" },
  { text: "> cat about_me.txt", color: "text-emerald-400", type: "command" },
  { text: "Passionate about creating scalable systems and fluid interfaces.", color: "text-gray-300", type: "output" },
  { text: "Currently focused on software architecture and mobile development.", color: "text-gray-300", type: "output" },
  { text: "Always seeking the next logical challenge.", color: "text-gray-300", type: "output" },
  { text: "", type: "break" },
  { text: "> _", color: "text-emerald-400 animate-pulse", type: "cursor" },
];

export default function TerminalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (isInView && visibleLines < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView, visibleLines]);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center bg-[#111] py-20 px-4">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Coding the future, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
              one line at a time.
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            More than write code. From backend in <strong>NodeJS</strong> and <strong>Spring Boot</strong> to interface in <strong>NextJS</strong> and <strong>React Native</strong>, my focus is on performance and user experience.
          </p>
          
          <div className="mt-8 flex gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">3+</span>
              <span className="text-sm text-gray-500">Years of Study</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">15+</span>
              <span className="text-sm text-gray-500">Projects Created</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-lg"
        >
          <div className="w-full rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl shadow-emerald-900/10">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-auto text-xs text-gray-500 font-mono">otavio@fedoralinux:~</div>
            </div>

            <div className="p-6 font-mono text-sm md:text-base h-100 overflow-y-auto custom-scrollbar">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: index < visibleLines ? 1 : 0, 
                    x: index < visibleLines ? 0 : -10 
                  }}
                  className={`mb-2 ${index >= visibleLines ? "hidden" : "block"}`}
                >
                  {line.type === "command" ? (
                    <span className="flex gap-2">
                      <span className="text-pink-500 font-bold">➜</span>
                      <span className="text-blue-400 font-bold">~</span>
                      <span className={line.color}>{line.text}</span>
                    </span>
                  ) : line.type === "cursor" ? (
                     <span className={line.color}>{line.text}</span>
                  ) : line.label ? (
                    <div className="flex gap-3">
                      <span className="text-emerald-400 font-bold min-w-17.5">{line.label}</span>
                      <span className={line.color}>{line.text}</span>
                    </div>
                  ) : (
                    <span className={line.color}>{line.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
