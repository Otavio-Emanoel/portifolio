"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitCommit, 
  GitBranch, 
  GitMerge, 
  Calendar, 
  Hash, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Rocket, 
  Smartphone, 
  Globe, 
  Server, 
  Database,
  Code2
} from "lucide-react";
import { useState } from "react";

// --- DADOS DA TRAJETÓRIA ---
const timelineData = [
  // 2024
  {
    id: "init-etec",
    date: "Feb 2024",
    title: "Initial Commit: Etec Journey",
    description: "Started Systems Development technical course at Etec Peruíbe.",
    type: "init",
    branch: "main",
    icon: <GitCommit size={18} />,
    color: "text-gray-400",
    bg: "bg-gray-400",
    border: "border-gray-400",
  },
  {
    id: "feat-js",
    date: "Feb 24, 2024",
    title: "feat: Hello World (JS)",
    description: "First lines of code in JavaScript. Learning logic and DOM.",
    type: "feat",
    branch: "feature",
    icon: <Code2 size={18} />,
    color: "text-yellow-400",
    bg: "bg-yellow-400",
    border: "border-yellow-400",
  },
  {
    id: "feat-calc",
    date: "Apr 24, 2024",
    title: "build: First Calculator",
    description: "HTML, CSS & JS project. Understanding frontend basics.",
    type: "feat",
    branch: "feature",
    icon: <Code2 size={18} />,
    color: "text-orange-400",
    bg: "bg-orange-400",
    border: "border-orange-400",
  },
  {
    id: "feat-java",
    date: "Jun 22, 2024",
    title: "feat: Java & OOP",
    description: "First contact with strongly typed languages and Object Oriented Programming.",
    type: "feat",
    branch: "feature",
    icon: <Server size={18} />,
    color: "text-red-400",
    bg: "bg-red-400",
    border: "border-red-400",
  },
  {
    id: "chore-linux",
    date: "Aug 15, 2024",
    title: "chore: Linux first touch (Ubuntu)",
    description: "Left Windows to understand the OS behind the servers.",
    type: "chore",
    branch: "main",
    icon: <GitMerge size={18} />,
    color: "text-orange-500",
    bg: "bg-orange-500",
    border: "border-orange-500",
  },
  {
    id: "feat-backend",
    date: "Sep 2024",
    title: "feat: Backend Awakening",
    description: "Created GitHub account. Learned Node.js, Express, TypeScript & React in one sprint.",
    type: "merge",
    branch: "main",
    icon: <Server size={18} />,
    color: "text-green-500",
    bg: "bg-green-500",
    border: "border-green-500",
  },
  {
    id: "deploy-madness",
    date: "Oct 16, 2024",
    title: "deploy: Madness Combat Site",
    description: "First deployment. Static site about the Madness Combat series.",
    type: "deploy",
    branch: "feature",
    icon: <Globe size={18} />,
    color: "text-gray-300",
    bg: "bg-gray-500",
    border: "border-gray-500",
    link: "https://otavio-emanoel.github.io/MadnessCombat_Project/"
  },
  {
    id: "feat-inventory",
    date: "Nov 22, 2024",
    title: "feat: Inventory System",
    description: "Java + MySQL project for stock management.",
    type: "feat",
    branch: "feature",
    icon: <Database size={18} />,
    color: "text-red-500",
    bg: "bg-red-500",
    border: "border-red-500",
    link: "https://github.com/Otavio-Emanoel/Java_Project"
  },
  
  // 2025
  {
    id: "feat-devnexus",
    date: "Jan 05, 2025",
    title: "feat: DevNexus",
    description: "LinkedIn-like platform for devs. Built with EJS & MongoDB.",
    type: "feat",
    branch: "feature",
    icon: <Globe size={18} />,
    color: "text-green-400",
    bg: "bg-green-400",
    border: "border-green-400",
  },
  {
    id: "chore-fedora",
    date: "Feb 26, 2025",
    title: "sys: Fedora + GNOME",
    description: "Switched distro to Fedora. Deepening system knowledge.",
    type: "chore",
    branch: "main",
    icon: <GitMerge size={18} />,
    color: "text-blue-400",
    bg: "bg-blue-400",
    border: "border-blue-400",
  },
  {
    id: "feat-evom",
    date: "Mar 01, 2025",
    title: "feat: EVOM Mobile",
    description: "First mobile app attempt using Monaca.",
    type: "feat",
    branch: "feature",
    icon: <Smartphone size={18} />,
    color: "text-purple-400",
    bg: "bg-purple-400",
    border: "border-purple-400",
    link: "https://github.com/Otavio-Emanoel/EVOM"
  },
  {
    id: "win-hackathon",
    date: "Apr 30, 2025",
    title: "release: Scriptum (Winner) 🏆",
    description: "Won Etec Hackathon with a MediaPipe Hands accessibility project.",
    type: "release",
    branch: "main",
    icon: <Trophy size={18} />,
    color: "text-yellow-400",
    bg: "bg-yellow-400",
    border: "border-yellow-400",
    link: "https://scriptum-hackaton.github.io/Scriptum-Library"
  },
  {
    id: "job-beyond",
    date: "May 16, 2025",
    title: "new job: Beyond Systems 🚀",
    description: "Joined the startup as a Developer. Squad management & Freelancing.",
    type: "job",
    branch: "main",
    icon: <Rocket size={18} />,
    color: "text-indigo-400",
    bg: "bg-indigo-400",
    border: "border-indigo-400",
  },
  {
    id: "feat-beauty",
    date: "May 23, 2025",
    title: "feat: BeautyHub SaaS",
    description: "Salon scheduling system (Next.js + Firebase + Node TS).",
    type: "feat",
    branch: "feature",
    icon: <Globe size={18} />,
    color: "text-pink-400",
    bg: "bg-pink-400",
    border: "border-pink-400",
  },
  {
    id: "feat-golocal",
    date: "Jun 22, 2025",
    title: "feat: GoLocal App",
    description: "Tourism app for Peruíbe built with React Native.",
    type: "feat",
    branch: "feature",
    icon: <Smartphone size={18} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400",
    border: "border-cyan-400",
  },
  {
    id: "feat-flutter-start",
    date: "Jul 05, 2025",
    title: "feat: Flutter Init",
    description: "Started studying Flutter/Dart ecosystem.",
    type: "feat",
    branch: "feature",
    icon: <Smartphone size={18} />,
    color: "text-blue-400",
    bg: "bg-blue-400",
    border: "border-blue-400",
  },
  {
    id: "feat-labcontrol",
    date: "Aug 19, 2025",
    title: "feat: LabControl",
    description: "Lab management for Etec (React Native + MySQL).",
    type: "feat",
    branch: "feature",
    icon: <Smartphone size={18} />,
    color: "text-sky-500",
    bg: "bg-sky-500",
    border: "border-sky-500",
  },
  {
    id: "feat-copilot",
    date: "Oct 26, 2025",
    title: "feat: Minecraft Clone",
    description: "Java dev assisted by GitHub Copilot AI.",
    type: "feat",
    branch: "feature",
    icon: <Code2 size={18} />,
    color: "text-green-500",
    bg: "bg-green-500",
    border: "border-green-500",
  },
  {
    id: "feat-cmo",
    date: "Nov 04, 2025",
    title: "feat: Consulta Medicos Online",
    description: "Telemedicine Freelance. Next.js, Tailwind, Node TS, Asaas API, Rapidoc.",
    type: "feat",
    branch: "feature",
    icon: <Globe size={18} />,
    color: "text-teal-400",
    bg: "bg-teal-400",
    border: "border-teal-400",
    link: "https://consulta-medicos-online.vercel.app/"
  },
  {
    id: "chore-arch",
    date: "Dec 22, 2025",
    title: "sys: Arch Linux + Hyprland",
    description: "Advanced setup. Migrated notebook to Arch Linux.",
    type: "chore",
    branch: "main",
    icon: <GitMerge size={18} />,
    color: "text-cyan-300",
    bg: "bg-cyan-300",
    border: "border-cyan-300",
  },
  {
    id: "init-nanoseller",
    date: "Dec 30, 2025",
    title: "init: NanoSeller",
    description: "White-label E-commerce SaaS. Java Backend, Flutter Frontend.",
    type: "init",
    branch: "feature",
    icon: <Rocket size={18} />,
    color: "text-violet-400",
    bg: "bg-violet-400",
    border: "border-violet-400",
    link: "https://github.com/Otavio-Emanoel/nanoseller"
  },
  // 2026
  {
    id: "feat-go",
    date: "Jan 12, 2026",
    title: "feat: Go Lang",
    description: "First contact with Go. Building a simple TODO API.",
    type: "feat",
    branch: "feature",
    icon: <Server size={18} />,
    color: "text-cyan-500",
    bg: "bg-cyan-500",
    border: "border-cyan-500",
    link: "https://github.com/Otavio-Emanoel/todo-golang"
  },
  {
    id: "feat-rifadeck",
    date: "Jan 18, 2026",
    title: "feat: Rifa Deck",
    description: "Mobile raffle management app (Flutter). Batch sales & audit.",
    type: "feat",
    branch: "feature",
    icon: <Smartphone size={18} />,
    color: "text-blue-500",
    bg: "bg-blue-500",
    border: "border-blue-500",
    link: "https://github.com/Otavio-Emanoel/rifa_deck"
  },
];

export default function GitTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  
  // Mostra os primeiros 6 itens por padrão (até entrar no mundo Dev de vdd)
  const ITEMS_TO_SHOW = 6;
  const visibleItems = expanded ? timelineData : timelineData.slice(0, ITEMS_TO_SHOW);

  return (
    <section className="relative min-h-screen bg-[#0d1117] py-24 px-4 font-mono overflow-hidden">
      
      {/* Background Grid Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Cabeçalho */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-[#161b22] w-fit px-3 py-1 rounded-md border border-gray-800">
          <span className="text-emerald-500 font-bold">otavio@dev:~/history</span>
          <span className="text-gray-400">$</span>
          <span className="text-gray-300">git log --graph --oneline</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Commit <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">History</span>
        </h2>
        <p className="text-gray-400">
          A timeline of my code, projects, and deployments.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pb-20">
        <div className="relative">
          
          {/* LINHA PRINCIPAL (Main Branch) 
             Esta linha agora vai até o final da lista visível
          */}
          <div className="absolute top-0 bottom-0 left-[24px] w-0.5 bg-[#30363d]" />

          {/* LISTA DE COMMITS */}
          <div className="space-y-8"> 
            <AnimatePresence>
              {visibleItems.map((item, index) => {
                const isMain = item.branch === "main";
                // Ajuste de margem para separar visualmente as branches
                const marginLeft = isMain ? "ml-0" : "ml-16"; 

                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative flex items-start ${marginLeft}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    
                    {/* CONECTOR DA FEATURE BRANCH (Curva SVG individual) */}
                    {!isMain && (
                      <svg className="absolute left-[24px] top-[24px] w-12 h-12 -z-10 pointer-events-none -translate-y-1/2">
                        <path 
                          d="M 0 24 C 20 24, 25 24, 48 24" // Curva suave saindo da main
                          fill="none" 
                          stroke="#30363d" 
                          strokeWidth="2" 
                          strokeDasharray="4 4" // Pontilhado para estilo
                        />
                      </svg>
                    )}

                    {/* O NÓ (DOT/ICON) */}
                    {/* Se for main, fica na linha (left-3). Se feature, fica deslocado. */}
                    <div className={`
                      absolute z-20 flex items-center justify-center
                      ${isMain ? 'left-[12px]' : '-left-[20px]'} // Ajuste fino da posição horizontal
                      mt-1
                    `}>
                      <div 
                        className={`
                          w-7 h-7 rounded-full border-4 border-[#0d1117] flex items-center justify-center
                          ${item.bg} text-black shadow-lg
                        `}
                      >
                         {/* Ícone reduzido dentro da bolinha */}
                         <div className="scale-75">
                            {item.icon}
                         </div>
                      </div>
                    </div>

                    {/* CARD DE CONTEÚDO */}
                    <div className={`ml-14 w-full`}>
                      {/* Metadados Compactos */}
                      <div className="flex items-center gap-3 mb-1.5 text-xs text-gray-500 font-mono">
                        <span className="text-emerald-500/80">
                          {item.id.substring(0, 7)}
                        </span>
                        <span>{item.date}</span>
                      </div>

                      {/* Card Interativo */}
                      <motion.div 
                        className={`
                          group relative p-4 rounded-lg border bg-[#161b22] transition-all duration-300
                          ${hoveredIndex === index ? `border-opacity-100 ${item.border}` : "border-gray-800"}
                        `}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className={`text-base font-bold mb-1 ${item.color}`}>
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {item.description}
                            </p>
                            
                            {item.link && (
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-gray-500 hover:text-white transition-colors border border-gray-700 px-2 py-1 rounded hover:bg-gray-800"
                              >
                                View Project ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* BOTÃO READ MORE / SHOW LESS */}
          <div className="relative mt-8 ml-8">
            {/* Linha pontilhada conectando ao botão */}
            <div className="absolute -top-8 left-[24px] -ml-8 h-8 w-0.5 border-l-2 border-dashed border-gray-700" />
            
            <button
              onClick={() => setExpanded(!expanded)}
              className="
                group flex items-center gap-2 px-6 py-3 
                bg-[#161b22] border border-gray-700 rounded-full 
                text-gray-300 hover:text-white hover:border-emerald-500 hover:bg-[#0d1117]
                transition-all duration-300 z-30 relative
              "
            >
              {expanded ? (
                <>
                  <ChevronUp size={10} /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Load Full History ({timelineData.length - ITEMS_TO_SHOW} more)
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}