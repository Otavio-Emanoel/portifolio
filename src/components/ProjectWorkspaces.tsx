"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Github,
    ExternalLink,
    Terminal,
    Cpu,
    Wifi,
    Battery,
    Clock,
    Search,
    Monitor,
    Play,
    Loader2,
    Maximize,
    X
} from "lucide-react";
import {
    siFlutter,
    siNodedotjs,
    siReact,
    siSpring,
    siDart,
    siFirebase,
    siNextdotjs,
    siPostgresql,
    siExpo,
    siMysql
} from "simple-icons";

const CCXTIcon = {
    title: "CCXT",
    slug: "ccxt",
    url: "https://avatars.githubusercontent.com/u/31901609?s=200&v=4",
}
const ASAASAPIIcon = {
    title: "Asaas API",
    slug: "asaas",
    url: "https://www.asaas.com/assets/logo/asaas-white-9550c17869d72a570a577c70c6c6789b.svg",
}
const RAPIDOCIcon = {
    title: "Rapidoc",
    slug: "rapidoc",
    url: "https://play-lh.googleusercontent.com/-JcZsjwFDaqPyKqbdOhzhtUAPfGEfzrrYhzV36Hs_jDpfvmW-Nlx8c4vY6XW8kNL06jLCEDWlXSnXrXHbO4h=w240-h480-rw",
}

// --- DADOS ---
const projects = [
    {
        id: 1,
        name: "Consulta Médicos Online",
        category: "Web",
        description: "Telemedicine with scheduling and payments via Asaas API.",
        stack: [
            { name: "Next.js", icon: siNextdotjs, color: "text-white" },
            { name: "Node.js", icon: siNodedotjs, color: "text-green-500" },
            { name: "React", icon: siReact, color: "text-blue-400" },
            { name: "Asaas API", icon: ASAASAPIIcon, color: "text-yellow-500" },
            { name: "Rapidoc ", icon: RAPIDOCIcon, color: "text-blue-400" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/ConsultaMedicosOnline", demo: "https://consulta-medicos-online.vercel.app/" },
        cmd: "npm run start"
    },
    {
        id: 2,
        name: "BeautyHub",
        category: "SaaS",
        description: "Scheduling platform for beauty salons with an administrative panel.",
        stack: [
            { name: "Next.js", icon: siNextdotjs, color: "text-white" },
            { name: "Node.js", icon: siNodedotjs, color: "text-green-500" },
            { name: "React", icon: siReact, color: "text-blue-400" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/BeautyHub", demo: "https://beauty-hub-omega.vercel.app/" },
        cmd: "npm run start"
    },
    {
        id: 3,
        name: "CCXT-Test",
        category: "Web",
        description: "Trading simulation platform using the CCXT library.",
        stack: [
            { name: "Next.js", icon: siNextdotjs, color: "text-white" },
            { name: "CCXT API", icon: CCXTIcon, color: "text-green-500" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/ccxt-test", demo: "https://ccxt-test.vercel.app/" },
        cmd: "npm run start"
    },
    {
        id: 4,
        name: "LabControl",
        category: "Mobile",
        description: "Informatic laboratory management with scheduling for Etec de Peruíbe.",
        stack: [
            { name: "React Native", icon: siReact, color: "text-blue-400" },
            { name: "Expo", icon: siExpo, color: "text-white" },
            { name: "Node.js", icon: siNodedotjs, color: "text-green-500" },
            {name: "MySQL", icon: siMysql, color: "text-blue-600" },
        ],
        links: { github: "https://github.com/Otavio-Emanoel/LabControl", demo: null },
        cmd: "npx expo start & npm run dev"
    },
    {
        id: 5,
        name: "NanoSeller",
        category: "SaaS",
        description: "White-label Multi-tenant e-commerce with robust financial management.",
        stack: [
            { name: "Java", icon: siSpring, color: "text-green-500" },
            { name: "PostgreSQL", icon: siPostgresql, color: "text-blue-400" },
            { name: "Flutter", icon: siFlutter, color: "text-blue-400" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/nanoseller", demo: null },
        cmd: "java -jar server.jar"
    },
    {
        id: 6,
        name: "GoLocal",
        category: "App",
        description: "Tourist guide for Peruíbe with geolocation and events.",
        stack: [
            { name: "React Native", icon: siReact, color: "text-blue-400" },
            { name: "Expo", icon: siExpo, color: "text-white" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/GoLocal", demo: null },
        cmd: "npx expo start"
    },
    {
        id: 7,
        name: "Rifa Deck",
        category: "Mobile",
        description: "Management of raffles and sweepstakes. Support for batch sales and auditing.",
        stack: [
            { name: "Flutter", icon: siFlutter, color: "text-blue-400" },
            { name: "Dart", icon: siDart, color: "text-blue-300" },
            { name: "Firebase", icon: siFirebase, color: "text-yellow-500" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel/rifa_deck", demo: null },
        cmd: "./deploy_mobile.sh"
    },
    {
        id: 8,
        name: "GitHub Profile",
        category: "Repository",
        description: "All my open-source projects and contributions on GitHub.",
        stack: [
            { name: "GitHub", icon: { path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }, color: "text-white" }
        ],
        links: { github: "https://github.com/Otavio-Emanoel", demo: "https://github.com/Otavio-Emanoel" },
        cmd: "open github",
        isFullscreen: true
    }
    
];

// Helper Icon
const BrandIcon = ({ icon, className }: { icon: any, className?: string }) => {
  // Se o ícone tem uma URL (como CCXTIcon), renderiza como imagem
  if (icon.url) {
    return (
      <img 
        src={icon.url} 
        alt={icon.title} 
        className={`${className} w-3 h-3 rounded-full object-cover`}
      />
    );
  }
  
  // Caso contrário, renderiza como SVG (simple-icons)
  return (
    <svg viewBox="0 0 24 24" className={`w-3 h-3 fill-current ${className}`}>
      <path d={icon.path} />
    </svg>
  );
};

export default function ProjectMonitor() {
    const [activeTab, setActiveTab] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [githubUser, setGithubUser] = useState<any>(null);
    const [githubRepos, setGithubRepos] = useState<any[]>([]);
    
    // Inicializar refs e scroll
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 30%"]
    });

    const monitorOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const monitorY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
    const monitorScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
    const monitorRotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, -10]);

    // Reseta o preview quando troca de projeto
    useEffect(() => {
        setShowPreview(false);
        setIsLoadingPreview(false);
    }, [activeTab]);

    const handleOpenPreview = () => {
        setIsLoadingPreview(true);
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    const activeProject = projects.find(p => p.id === activeTab) || projects[0];
    const isFullscreenMode = activeProject.isFullscreen;

    // Fetch GitHub user data
    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Usar a API route do Next.js em vez de chamar GitHub diretamente
                const response = await fetch("/api/github");
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    console.error("GitHub API Error:", data.message);
                    setGithubUser(null);
                    setGithubRepos([]);
                    return;
                }

                setGithubUser(data.user);
                setGithubRepos(data.repos);
            } catch (error) {
                console.error("Erro ao buscar dados do GitHub:", error);
                setGithubUser(null);
                setGithubRepos([]);
            }
        };

        fetchGitHubData();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen bg-[#0B0F19] py-24 px-4 flex flex-col items-center justify-center font-mono relative overflow-hidden">

            {/* Background Decorativo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="mb-12 text-center z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-3">
                    <Monitor size={12} />
                    <span>~/workstation/display_01</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">My Workstation</h2>
                <p className="text-gray-400 text-sm">Project Manager</p>
            </div>

            {/* --- O MONITOR --- */}
            <motion.div
                style={{
                    opacity: monitorOpacity,
                    y: monitorY,
                    scale: monitorScale,
                    rotateX: monitorRotate
                }}
                className="relative max-w-6xl w-full perspective-1000 group"
            >

                {/* Moldura */}
                <div className="relative bg-[#111] rounded-t-2xl rounded-b-lg border-[12px] border-[#1a1a1a] shadow-[0_0_50px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] z-20">

                    {/* Tela (Display) */}
                    <div className="relative bg-[#050505] aspect-[16/10] md:aspect-video w-full rounded-sm overflow-hidden flex flex-col">

                        {/* Wallpaper + Overlay */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                        {/* UI do Sistema */}
                        <div className="relative z-10 flex flex-col h-full p-4 gap-4">

                            {/* Top Bar (Waybar Style) */}
                            <div className="flex items-center justify-between bg-[#000]/60 backdrop-blur-md border border-white/5 rounded-lg px-4 py-2 text-xs text-gray-300">
                                <div className="flex items-center gap-4">
                                    <div className="flex bg-white/5 rounded-md p-1 gap-1">
                                        {projects.map(p => (
                                            <button
                                                key={p.id}
                                                onClick={() => setActiveTab(p.id)}
                                                className={`w-6 h-6 rounded flex items-center justify-center transition-all ${activeTab === p.id ? 'bg-blue-600 text-white font-bold shadow-lg' : 'hover:bg-white/10 text-gray-500'}`}
                                            >
                                                {p.id}
                                            </button>
                                        ))}
                                    </div>
                                    
                                </div>
                                <div className="hidden sm:flex items-center gap-4">
                                    <div className="flex items-center gap-2"><Cpu size={12} className="text-emerald-400" /> 12%</div>
                                    <div className="flex items-center gap-2"><Wifi size={12} className="text-blue-400" /> ETH0</div>
                                    <div className="flex items-center gap-2 font-bold text-white"><Clock size={12} /> 23:42</div>
                                </div>
                            </div>

                            {/* Área de Trabalho (Grid Dinâmico) */}
                            {isFullscreenMode ? (
                                // --- MODO FULLSCREEN (GitHub) ---
                                <div className="flex-1 w-full flex flex-col overflow-hidden gap-4">
                                    {githubUser ? (
                                        <>
                                            {/* GitHub Profile Header */}
                                            <div className="bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] border border-white/10 rounded-xl p-6 flex items-center justify-between overflow-hidden relative">
                                                {/* Background pattern */}
                                                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%22 y=%2250%22 font-size=%2280%22 fill=%22%23fff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22></text></svg>')]" />
                                                
                                                <div className="flex items-center gap-6 relative z-10">
                                                    {/* Profile Avatar */}
                                                    <div className="relative">
                                                        <img 
                                                            src={githubUser.avatar_url} 
                                                            alt={githubUser.login}
                                                            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                                                        />
                                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#161b22]" />
                                                    </div>

                                                    {/* User Info */}
                                                    <div className="flex-1">
                                                        <h2 className="text-3xl font-bold text-white mb-1">{githubUser.name || githubUser.login}</h2>
                                                        <p className="text-gray-400 text-sm mb-3">@{githubUser.login}</p>
                                                        <p className="text-gray-300 text-sm max-w-xl mb-4">{githubUser.bio}</p>
                                                        
                                                        {/* Stats */}
                                                        <div className="flex gap-6 flex-wrap">
                                                            <div className="flex flex-col">
                                                                <span className="text-2xl font-bold text-white">{githubUser.followers}</span>
                                                                <span className="text-xs text-gray-400">Followers</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-2xl font-bold text-white">{githubUser.following}</span>
                                                                <span className="text-xs text-gray-400">Following</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-2xl font-bold text-white">{githubUser.public_repos}</span>
                                                                <span className="text-xs text-gray-400">Repos</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <a 
                                                    href={githubUser.html_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg flex items-center gap-2 relative z-10"
                                                >
                                                    <ExternalLink size={16} /> Visit GitHub
                                                </a>
                                            </div>

                                            {/* GitHub Stats & Languages */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* GitHub Stats */}
                                                <div className="bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 overflow-hidden">
                                                    <img 
                                                        src="https://github-readme-stats-theta-ten-57.vercel.app/api?username=Otavio-Emanoel&theme=dark&hide_border=true&include_all_commits=true&count_private=true"
                                                        alt="Github Stats"
                                                        className="w-full h-auto rounded-lg"
                                                    />
                                                </div>

                                                {/* Top Languages */}
                                                <div className="bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 overflow-hidden">
                                                    <img 
                                                        src="https://github-readme-stats-theta-ten-57.vercel.app/api/top-langs/?username=Otavio-Emanoel&theme=dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact"
                                                        alt="Top Langs"
                                                        className="w-full h-auto rounded-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* Repositories Grid */}
                                            {githubRepos && githubRepos.length > 0 ? (
                                                <div className="flex-1 overflow-y-auto pr-3">
                                                    <div className="mb-6">
                                                        <h3 className="text-2xl font-bold text-white mb-1">Top Repositories</h3>
                                                        <p className="text-gray-400 text-xs">Ordenados por última atualização (sem forks)</p>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                                        {githubRepos.map((repo: any, index: number) => (
                                                            <motion.a 
                                                                key={repo.id}
                                                                href={repo.html_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                whileHover={{ scale: 1.02, y: -4 }}
                                                                className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-white/10 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/30 transition-all group overflow-hidden relative"
                                                            >
                                                                {/* Background gradient effect */}
                                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                                                                
                                                                {/* Rank number */}
                                                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                                                                    <span className="text-xs font-bold text-blue-400">#{index + 1}</span>
                                                                </div>

                                                                <div className="flex items-start justify-between mb-3">
                                                                    <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex-1 pr-4">{repo.name}</h4>
                                                                </div>
                                                                
                                                                <p className="text-gray-400 text-xs mb-4 line-clamp-2 h-8 leading-relaxed">{repo.description || "Sem descrição"}</p>
                                                                
                                                                {/* Stats */}
                                                                <div className="space-y-3">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {repo.language && (
                                                                            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                                                                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                                                {repo.language}
                                                                            </span>
                                                                        )}
                                                                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                                                                            ⭐ {repo.stargazers_count}
                                                                        </span>
                                                                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                                                                            🔀 {repo.forks_count}
                                                                        </span>
                                                                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-gray-300 border border-white/10">
                                                                            📅 {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2 size={40} className="text-blue-500 animate-spin mx-auto mb-3" />
                                        <p className="text-gray-400">Carregando repositórios...</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="animate-spin mb-4">
                                    <Loader2 size={40} className="text-blue-500" />
                                </div>
                                <p className="text-gray-400">Carregando dados do GitHub...</p>
                            </div>
                        </div>
                    )}
                                </div>
                            ) : (
                                // --- MODO NORMAL (COM PREVIEW LATERAL) ---
                                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden relative">

                                    {/* 1. JANELA DE INFO (Terminal) */}
                                    {/* Layout Shift: Se preview estiver aberto, ocupa 5 colunas. Se não, ocupa 8 e fica centralizado. */}
                                    <motion.div
                                        layout
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                        className={`
                            flex flex-col h-full
                            ${showPreview ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'}
                          `}
                                    >
                                        <div className="bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col shadow-2xl overflow-hidden h-full">
                                            {/* Barra da Janela */}
                                            <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                                    <Terminal size={12} className="text-emerald-500" />
                                                    <span className="text-white font-bold">nvim</span>
                                                    README.md
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                                </div>
                                            </div>

                                            {/* Conteúdo do Terminal */}
                                            <div className="p-6 font-mono text-sm flex-1 flex flex-col relative">
                                                {/* Linhas de fundo decorativas */}
                                                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                                    <BrandIcon icon={activeProject.stack[0].icon} className="w-32 h-32" />
                                                </div>

                                                <div className="space-y-4 relative z-10">
                                                    <div>
                                                        <div className="text-gray-500 text-xs mb-1">Project Name</div>
                                                        <h3 className="text-2xl font-bold text-white">{activeProject.name}</h3>
                                                    </div>

                                                    <div>
                                                        <div className="text-gray-500 text-xs mb-1">Description</div>
                                                        <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                                                            {activeProject.description}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="text-gray-500 text-xs mb-2">Tech Stack</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {activeProject.stack.map(t => (
                                                                <span key={t.name} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-gray-300">
                                                                    <BrandIcon icon={t.icon} className={t.color} /> {t.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                                                    {activeProject.links.github && (
                                                        <a href={activeProject.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white transition-colors">
                                                            <Github size={14} /> Source Code
                                                        </a>
                                                    )}

                                                    {/* Botão de Visualizar Preview (Só se tiver demo e não estiver aberto) */}
                                                    {activeProject.links.demo && !showPreview && (
                                                        <button
                                                            onClick={handleOpenPreview}
                                                            className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-xs text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                                                        >
                                                            <Play size={14} /> Visualize App
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* 2. JANELA DE PREVIEW (Browser) - Só aparece quando showPreview é true */}
                                    <AnimatePresence>
                                        {showPreview && (
                                            <motion.div
                                                key="browser-window"
                                                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                                className="lg:col-span-7 h-full min-h-[300px] flex flex-col"
                                            >
                                                <div className="flex-1 bg-[#1e1e24] rounded-xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col">

                                                    {/* Barra de Endereço (Fake Browser) */}
                                                    <div className="bg-[#2a2a35] h-9 flex items-center px-3 gap-3 border-b border-white/5 shrink-0 justify-between">
                                                        <div className="flex gap-3 items-center flex-1 min-w-0">
                                                            <div className="flex gap-1.5 group">
                                                                {/* BOTÃO DE FECHAR (Vermelho) - Agora funcional */}
                                                                <button
                                                                    onClick={handleClosePreview}
                                                                    className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer flex items-center justify-center transition-colors"
                                                                >
                                                                    <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
                                                                </button>
                                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                                            </div>

                                                            {/* Barra de URL */}
                                                            <div className="flex-1 bg-[#111] h-6 rounded flex items-center px-3 text-[10px] text-gray-400 font-mono truncate relative">
                                                                <span className="text-emerald-500 mr-1">🔒</span>
                                                                {activeProject.links.demo ? activeProject.links.demo.replace("https://", "") : "localhost"}
                                                            </div>
                                                        </div>

                                                        {/* Botão Expandir */}
                                                        {activeProject.links.demo && (
                                                            <a
                                                                href={activeProject.links.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center gap-1 transition-colors text-[10px]"
                                                                title="Open in new tab"
                                                            >
                                                                <Maximize size={10} /> <span className="hidden sm:inline">New Tab</span>
                                                            </a>
                                                        )}
                                                    </div>

                                                    {/* CONTEÚDO DO IFRAME */}
                                                    <div className="flex-1 relative bg-black w-full h-full">
                                                        {/* Spinner de Loading enquanto carrega */}
                                                        {isLoadingPreview && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] z-10">
                                                                <div className="flex flex-col items-center gap-3">
                                                                    <Loader2 size={32} className="text-emerald-500 animate-spin" />
                                                                    <span className="text-xs text-emerald-500 font-mono">CONNECTING...</span>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {activeProject.links.demo ? (
                                                            <iframe
                                                                src={activeProject.links.demo}
                                                                className="w-full h-full border-0"
                                                                title="Live Preview"
                                                                onLoad={() => setIsLoadingPreview(false)}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                                                No preview URL available
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            )}
                        </div>

                        {/* EFEITOS CRT/GLARE */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
                        </div>

                    </div>

                    {/* Queixo do Monitor */}
                    <div className="h-10 bg-[#151515] flex items-center justify-center border-t border-white/5 relative z-20">
                        <div className="flex items-center gap-2 opacity-40">
                            <div className="w-1 h-1 rounded-full bg-white/50" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">HyprLinux</span>
                            <div className="w-1 h-1 rounded-full bg-white/50" />
                        </div>
                        <div className="absolute right-6 bottom-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] animate-pulse" />
                    </div>

                </div>

                {/* Base do Monitor */}
                <div className="relative z-10 mx-auto w-40 h-16 bg-gradient-to-b from-[#111] to-[#0a0a0a] border-x border-[#222]" style={{ clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)" }}></div>
                <div className="relative z-10 mx-auto w-80 h-3 bg-[#151515] rounded-full border-t border-white/10 shadow-2xl" />
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/10 blur-[60px] pointer-events-none" />

            </motion.div>
        </section>
    );
}