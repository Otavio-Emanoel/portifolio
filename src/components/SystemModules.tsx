"use client";
import { motion } from "framer-motion";
import { 
  siGo, 
  siMysql, 
  siFirebase, 
  siMongodb, 
  siFlutter, 
  siNodedotjs, 
  siDocker, 
  siGit, 
  siLinux, 
  siArchlinux, 
  siFedora, 
  siKalilinux, 
  siUbuntu,
  siReact,
  siTypescript,
  siPython,
  siExpress,
  siDotnet,
  siPostgresql,
  siTailwindcss,
  siHtml5
} from "simple-icons";
import { 
  Activity, 
  Terminal, 
  Cpu,
  Globe,
  Smartphone,
  Server,
  Database,
  Zap,
  Code2,
  Monitor
} from "lucide-react";

// --- Ícones SVG Customizados e Helpers ---

// Renderizador genérico para Simple Icons
const BrandIcon = ({ icon, className = "", size = 24 }: { icon: { path: string; hex: string }, className?: string, size?: number }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={`fill-current ${className}`}
    style={{ color: `#${icon.hex}` }} // Usa a cor oficial da marca
  >
    <path d={icon.path} />
  </svg>
);

// Componentes de Ícones Específicos
const ReactLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siReact} className={className} size={size} />;
const NodeLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siNodedotjs} className={className} size={size} />;
const GoLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siGo} className={className} size={size} />;
const HtmlLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siHtml5} className={className} size={size} />;
const FirebaseLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siFirebase} className={className} size={size} />;
const MySqlLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siMysql} className={className} size={size} />;
const FlutterLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siFlutter} className={className} size={size} />;
const MongoDbLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siMongodb} className={className} size={size} />;
const DockerLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siDocker} className={className} size={size} />;
const GitLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siGit} className={className} size={size} />;
const LinuxLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siLinux} className={className} size={size} />;
const ArchLinuxLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siArchlinux} className={className} size={size} />;
const FedoraLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siFedora} className={className} size={size} />;
const KaliLinuxLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siKalilinux} className={className} size={size} />;
const UbuntuLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siUbuntu} className={className} size={size} />;
const TypeScriptLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siTypescript} className={className} size={size} />;
const PythonLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siPython} className={className} size={size} />;
const ExpressLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siExpress} className={className} size={size} />;
const DotnetLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siDotnet} className={className} size={size} />;
const PostgresLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siPostgresql} className={className} size={size} />;
const TailwindLogo = ({ className, size }: { className?: string, size?: number }) => <BrandIcon icon={siTailwindcss} className={className} size={size} />;


// --- COMPONENTES DE UI ---

const TechBadge = ({ 
  icon: Icon, 
  name, 
  type = "svg",
  desc
}: { 
  icon: any, 
  name: string, 
  type?: "svg" | "lucide",
  desc?: string
}) => (
  <motion.div 
    whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-all cursor-default group backdrop-blur-md relative overflow-hidden"
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
    
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
      {type === "lucide" ? <Icon size={22} className="text-gray-300 group-hover:text-white transition-colors" /> : <Icon size={24} />}
    </div>
    
    <div className="flex flex-col">
      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-0.5 group-hover:text-gray-400 transition-colors">
        {desc || "Tool"}
      </span>
      <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
  </motion.div>
);

const SectionHeader = ({ title, subtitle, icon: Icon, color }: { title: string, subtitle: string, icon: any, color: string }) => (
  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-white/5 ${color} border border-white/5 shadow-sm`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        <p className="text-xs text-gray-400 font-mono">{subtitle}</p>
      </div>
    </div>
    <div className="flex gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
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
            <span>SYSTEM_ARCHITECTURE_V3.1</span>
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

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. FRONTEND & MOBILE (Visual) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group shadow-lg shadow-black/20"
          >
            <SectionHeader 
              title="Interface Layer" 
              subtitle="Frontend Web & Mobile"
              icon={Smartphone}
              color="text-blue-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={ReactLogo} name="Next.js" desc="Web Framework" />
                <TechBadge icon={HtmlLogo} name="HTML" desc="Markup" />
              <TechBadge icon={FlutterLogo} name="Flutter" desc="Cross-Platform" />
              <TechBadge icon={ReactLogo} name="React Native" desc="Mobile App" />
              <TechBadge icon={TailwindLogo} name="Tailwind CSS" desc="Styling" />
            </div>
          </motion.div>

          {/* 2. BACKEND & API (Lógica) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group shadow-lg shadow-black/20"
          >
            <SectionHeader 
              title="System Core" 
              subtitle="Backend, Logic & Microservices"
              icon={Cpu}
              color="text-emerald-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={NodeLogo} name="Node.js" desc="Runtime" />
              <TechBadge icon={TypeScriptLogo} name="TypeScript" desc="Type Safety" />
              <TechBadge icon={Server} name="Java Spring" desc="Enterprise" type="lucide" />
              <TechBadge icon={Zap} name="Fastify" desc="Fast API" type="lucide" />
            </div>
            
            {/* Other Technologies Section */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Code2 size={14} /> Polyglot
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <motion.div whileHover={{ y: -3 }} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" title="Go">
                  <GoLogo size={20} />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" title="Python">
                  <PythonLogo size={20} />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" title=".NET">
                  <DotnetLogo size={20} />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" title="Express">
                  <ExpressLogo size={20} />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 3. DATA & CLOUD (Persistência) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group shadow-lg shadow-black/20"
          >
            <SectionHeader 
              title="Data Persistence" 
              subtitle="Databases & Cloud Infra"
              icon={Database}
              color="text-yellow-400"
            />
            <div className="grid grid-cols-1 gap-3">
              <TechBadge icon={MySqlLogo} name="MySQL" desc="Relational DB" />
              <TechBadge icon={PostgresLogo} name="PostgreSQL" desc="Advanced SQL" />
              <TechBadge icon={MongoDbLogo} name="MongoDB" desc="NoSQL Document" />
              <TechBadge icon={FirebaseLogo} name="Firebase" desc="Realtime & Auth" />
            </div>
          </motion.div>

          {/* 4. ENVIRONMENT & TOOLS (OS) - Full Width on Mobile/Tablet */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-all group flex flex-col md:flex-row gap-8 items-start shadow-lg shadow-black/20"
          >
            {/* Description Column */}
            <div className="w-full md:w-1/3 space-y-4">
                <SectionHeader 
                  title="Dev Environment" 
                  subtitle="OS & DevOps Tools"
                  icon={Terminal}
                  color="text-purple-400"
                />
                <div className="text-sm text-gray-400 leading-relaxed p-4 rounded-xl bg-black/20 border border-white/5">
                    <p className="mb-2">My workspace is optimized for <strong>performance</strong> and <strong>control</strong>.</p>
                    <p>Primary OS: <strong className="text-blue-400">Fedora</strong> with <strong className="text-white">GNOME</strong>.</p>
                    <p className="mt-2 text-xs text-gray-500">I also manage servers and experiment with different distros for specific use cases.</p>
                </div>
            </div>
            
            {/* Interactive Grid Column */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Linux Ecosystem (Interactive) */}
              <div className="relative group/linux h-full">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center justify-center p-6 h-full rounded-xl bg-gradient-to-br from-gray-800/30 to-black/30 border border-white/10 group-hover/linux:border-blue-500/30 group-hover/linux:bg-blue-500/5 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center mb-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <LinuxLogo size={64} />
                    </motion.div>
                  </div>
                  <span className="text-sm font-bold text-gray-200 relative z-10">Linux Ecosystem</span>
                  <span className="text-xs text-gray-500 relative z-10 mt-1">Multi-Distro User</span>
                  
                  {/* Hover Popup for Distros */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileHover={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/linux:opacity-100 transition-opacity z-20 p-4"
                  >
                    <div className="grid grid-cols-2 gap-3 w-full h-full">
                      {[
                        { Icon: FedoraLogo, name: "Fedora" },
                        { Icon: ArchLinuxLogo, name: "Arch" },
                        { Icon: UbuntuLogo, name: "Ubuntu" },
                        { Icon: KaliLinuxLogo, name: "Kali" }
                      ].map((distro) => (
                        <div key={distro.name} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10">
                          <distro.Icon size={24} />
                          <span className="text-[10px] mt-1 text-gray-300">{distro.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Card 2: DevOps Tools Grid */}
              <div className="grid grid-cols-2 gap-3 h-full">
                {[
                  { name: "Docker", icon: DockerLogo, desc: "Containers" },
                  { name: "Git", icon: GitLogo, desc: "VCS" },
                  { name: "VSCode", icon: Monitor, desc: "Editor", type: "lucide" }, // VSCode generic icon for now or use siVisualstudiocode if available
                  { name: "Neovim", icon: Terminal, desc: "Vim", type: "lucide" },
                ].map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/20 border border-white/5 transition-all cursor-default"
                  >
                    {tool.type === "lucide" ? <tool.icon size={24} className="text-gray-300 mb-2" /> : <tool.icon size={24} className="mb-2" />}
                    <span className="text-xs font-bold text-gray-300">{tool.name}</span>
                    <span className="text-[10px] text-gray-500">{tool.desc}</span>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}