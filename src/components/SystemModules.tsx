"use client";
import { motion } from "framer-motion";
import { siGo, siMysql, siFirebase, siMongodb, siFlutter, siNodedotjs } from "simple-icons";
import { 
  Activity, 
  Terminal, 
  Cpu,
  Layers,
  Globe,
  Smartphone,
  Server,
  Database,
  Cloud,
  Zap,
  Code2
} from "lucide-react";



const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-blue-400">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

// Simple Icons brand renderer
const BrandIcon = ({ icon, size = 22 }: { icon: { path: string; hex: string }, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width={size} height={size} fill={`#${icon.hex}`}>
    <path d={icon.path} />
  </svg>
);

const NodeLogo = () => <BrandIcon icon={siNodedotjs} />;
const GoLogo = () => <BrandIcon icon={siGo} />;
// (removed duplicate FirebaseLogo)
// (removed duplicate MySqlLogo)
// (removed duplicate FlutterLogo)
const MongoDbLogo = () => <BrandIcon icon={siMongodb} />;

const GoLogoOld = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-8 fill-cyan-400">
    <path d="M2.11 10.96c-.6.2-1.12.33-1.6.35.06-.65.23-1.18.52-1.6.3-.42.75-.76 1.35-1 2.2-1 5.3-1 6.55.93.36.56.57 1.25.64 2-.5-.3-1.06-.52-1.66-.62-.6-.1-1.22-.1-1.83.03-.58.12-1.13.37-1.6.72-.25.18-.46.42-.62.7-.16.27-.26.58-.28.9 0 1.06.75 1.7 1.63 1.94.88.24 1.83.1 2.62-.35.8-.45 1.37-1.18 1.6-2.06.05-.2.08-.4.1-.62.72.13 1.45.2 2.18.23l.13-.02c.04.6.02 1.2-.07 1.8-.18 1.13-.7 2.17-1.5 2.98-.8.8-1.8 1.38-2.9 1.66-1.1.28-2.27.27-3.37-.02-1.1-.3-2.12-.88-2.9-1.67-.77-.8-1.3-1.8-1.5-2.9-.2-1.1 0-2.26.54-3.23.53-.97 1.36-1.74 2.36-2.2 1-.46 2.12-.6 3.22-.4.55.1 1.08.3 1.57.58.5.3.94.67 1.3 1.1.72-.93 1.26-1.98 1.6-3.1.16-.5.26-1 .3-1.52.42 0 .85.04 1.27.1.33.06.66.16.97.28.32.12.62.27.9.45.3.17.56.37.82.6.25.2.48.45.68.7.2.27.38.56.54.86.16.3.3.6.4.94.1.32.17.65.23 1 .05.33.08.67.08 1 0 .66-.1 1.32-.3 1.96-.2.63-.5 1.23-.9 1.77-.4.53-.9 1-1.47 1.38-.56.4-1.2.7-1.85.93-.66.23-1.35.37-2.05.42-.7.05-1.4.02-2.1-.1-.7-.1-1.38-.3-2.03-.58-.65-.27-1.26-.64-1.8-1.1-.55-.45-1.03-1-1.4-1.63-.38-.6-.66-1.3-.82-2l-.02-.12c-.1-.53-.13-1.08-.08-1.62.05-.54.18-1.07.4-1.56.2-.5.5-.95.85-1.35.35-.4.76-.74 1.2-1.03.46-.3.96-.53 1.48-.7.52-.16 1.06-.25 1.6-.26.54 0 1.08.07 1.6.2.53.14 1.04.36 1.5.65.48.3.9.66 1.27 1.1.37.42.68.9 1 1.4.26.52.46 1.07.58 1.64.12.57.17 1.15.14 1.73-.03.58-.13 1.15-.3 1.7-.17.54-.42 1.05-.73 1.52-.3.47-.68.9-1.1 1.26-.43.37-.9.68-1.42.92-.5.24-1.05.4-1.6.5-.56.1-1.13.1-1.7-.02-.55-.1-1.1-.3-1.6-.6-.5-.3-.95-.7-1.33-1.16-.38-.46-.7-.98-.9-1.54-.23-.55-.36-1.15-.4-1.75-.03-.6.04-1.2.2-1.77.15-.57.4-1.1.72-1.6.33-.5.73-.93 1.2-1.3 1.42-1.12 3.4-1.35 5.06-.6 1.67.76 2.8 2.37 2.92 4.18.06.9-.1 1.8-.47 2.62-.36.83-.9 1.56-1.58 2.14-.67.57-1.46 1-2.3 1.24-.85.25-1.74.3-2.6.14-.87-.16-1.7-.5-2.43-1-.73-.5-1.36-1.15-1.8-1.9-.45-.76-.72-1.6-.8-2.48-.07-.88.05-1.77.36-2.6.3-.82.78-1.56 1.4-2.17.6-.6 1.34-1.1 2.15-1.4.82-.32 1.7-.44 2.58-.36.88.08 1.73.36 2.5.8.78.45 1.45 1.05 1.97 1.78.53.72.9 1.54 1.1 2.4.18.87.18 1.77 0 2.65-.18.87-.54 1.7-1.05 2.4-.5.72-1.17 1.32-1.93 1.77-.76.45-1.6.73-2.47.82-.87.1-1.75 0-2.6-.26-.84-.25-1.62-.67-2.28-1.23-.66-.56-1.2-1.26-1.57-2.05-.37-.8-.56-1.66-.56-2.54 0-.88.2-1.74.56-2.54.37-.8.9-1.5 1.57-2.06.66-.56 1.44-1 2.28-1.24.85-.26 1.73-.35 2.6-.26.87.1 1.7.37 2.47.82.76.45 1.43 1.05 1.93 1.77.5.7.87 1.53 1.05 2.4.18.88.18 1.78 0 2.65-.18.86-.55 1.68-1.08 2.4-.52.73-1.2 1.33-1.97 1.78-.77.44-1.62.72-2.5.8-.88.08-1.76-.04-2.58-.36-.8-.3-1.55-.8-2.15-1.4-.62-.6-1.1-1.35-1.4-2.17-.3-1.26-.22-2.6.23-3.8l.22-.05z" stroke="none"/>
  </svg>
);

const FirebaseLogo = () => <BrandIcon icon={siFirebase} />;

const MySqlLogo = () => <BrandIcon icon={siMysql} />;

const FlutterLogo = () => <BrandIcon icon={siFlutter} />;

// --- COMPONENTES AUXILIARES ---

const TechBadge = ({ icon: Icon, name, color, type }: { icon: any, name: string, color: string, type?: "svg" | "lucide" }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-default group backdrop-blur-md">
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/30 shadow-inner">
      {type === "lucide" ? <Icon size={22} className={color} /> : <Icon />}
    </div>
    <div>
      <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-0.5">
        {name.split(" ")[0]}
      </div>
      <div className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
        {name}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, icon: Icon, color }: { title: string, subtitle: string, icon: any, color: string }) => (
  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        <p className="text-xs text-gray-400 font-mono">{subtitle}</p>
      </div>
    </div>
    <div className="flex gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
    </div>
  </div>
);

export default function SystemModules() {
  return (
    <section className="relative min-h-screen py-24 px-4 font-mono overflow-hidden flex items-center justify-center bg-[#0B0F19]">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0B0F19] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />

      <div className="max-w-7xl w-full z-10 relative">
        
        {/* Título Principal */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-blue-400 text-xs mb-3 bg-blue-500/10 w-fit px-3 py-1 rounded-full border border-blue-500/20 mx-auto md:mx-0"
          >
            <Activity size={14} />
            <span>SYSTEM_ARCHITECTURE_V3</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white text-center md:text-left"
          >
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Stack</span> & Tools
          </motion.h2>
        </div>

        {/* BENTO GRID (Explicitamente Separado) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. FRONTEND & MOBILE (Visual) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group"
          >
            <SectionHeader 
              title="Interface Layer" 
              subtitle="Frontend Web & Mobile"
              icon={Smartphone}
              color="text-blue-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={ReactLogo} name="React / Next.js" color="" type="svg" />
              <TechBadge icon={FlutterLogo} name="Flutter" color="" type="svg" />
              <TechBadge icon={ReactLogo} name="React Native" color="" type="svg" />
              <TechBadge icon={Code2} name="Tailwind CSS" color="text-cyan-400" type="lucide" />
            </div>
          </motion.div>

          {/* 2. BACKEND & API (Lógica) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group"
          >
            <SectionHeader 
              title="System Core" 
              subtitle="Backend, Logic & Microservices"
              icon={Cpu}
              color="text-emerald-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={NodeLogo} name="Node.js" color="" type="svg" />
              <TechBadge icon={GoLogo} name="Go Lang" color="" type="svg" />
              <TechBadge icon={Server} name="Java Spring" color="text-red-400" type="lucide" />
              <TechBadge icon={Zap} name="Fastify" color="text-white" type="lucide" />
            </div>
          </motion.div>

          {/* 3. DATA & CLOUD (Persistência) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group"
          >
            <SectionHeader 
              title="Data Persistence" 
              subtitle="Databases & Cloud Infra"
              icon={Database}
              color="text-yellow-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={MySqlLogo} name="MySQL" color="" type="svg" />
              <TechBadge icon={FirebaseLogo} name="Firebase" color="" type="svg" />
              <TechBadge icon={Database} name="PostgreSQL" color="text-blue-500" type="lucide" />
              <TechBadge icon={MongoDbLogo} name="MongoDB" color="" type="svg" />
            </div>
          </motion.div>

          {/* 4. ENVIRONMENT & TOOLS (OS) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-full md:w-1/3">
                <SectionHeader 
                title="Dev Environment" 
                subtitle="OS & DevOps Tools"
                icon={Terminal}
                color="text-purple-400"
                />
                <div className="text-sm text-gray-400 leading-relaxed mb-4">
                    My workspace is optimized for performance and control. 
                    Running <strong>Arch Linux</strong> with <strong>Hyprland</strong> for maximum productivity.
                </div>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors">
                  <span className="text-3xl mb-2">🐧</span>
                  <span className="text-xs font-bold text-gray-300">Arch Linux</span>
               </div>
               <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors">
                  <span className="text-3xl mb-2">🐳</span>
                  <span className="text-xs font-bold text-gray-300">Docker</span>
               </div>
               <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors">
                  <span className="text-3xl mb-2">🐈</span>
                  <span className="text-xs font-bold text-gray-300">Git</span>
               </div>
               <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors">
                  <span className="text-3xl mb-2">🚀</span>
                  <span className="text-xs font-bold text-gray-300">Neovim</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}