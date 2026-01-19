"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const initialLines = [
	{ text: "> neofetch --user otavio", color: "text-emerald-400", type: "command" },
	{ text: "loading system info...", color: "text-gray-500", type: "output" },
	{ text: "----------------------", color: "text-gray-600", type: "output" },
	{ label: "OS:", text: "Fedora + Arch Linux", color: "text-white" },
	{ label: "Host:", text: "Etec de Peruíbe", color: "text-white" },
	{ label: "Role:", text: "Full-Stack Developer", color: "text-white" },
	{ label: "Uptime:", text: "17 years", color: "text-white" },
	{ label: "Goal:", text: "Be a great developer", color: "text-yellow-300" },
	{ label: "Stack:", text: "TypeScript, Java, Dart, Python, C#, Go", color: "text-blue-400" },
	{ text: "", type: "break" },
	{ text: "> cat about_me.txt", color: "text-emerald-400", type: "command" },
	{ text: "Passionate about creating scalable systems and fluid interfaces.", color: "text-gray-300", type: "output" },
	{ text: "Currently focused on software architecture and mobile development.", color: "text-gray-300", type: "output" },
	{ text: "Always seeking the next logical challenge.", color: "text-gray-300", type: "output" },
	{ text: "", type: "break" },
];

interface FileItem {
	name: string;
	isFolder: boolean;
	color: string;
}

interface Directory {
	[key: string]: FileItem[];
}

const directories: Directory = {
	"~": [
		{ name: "projects", isFolder: true, color: "text-blue-400" },
		{ name: "about_me.txt", isFolder: false, color: "text-gray-300" },
		{ name: "resume.pdf", isFolder: false, color: "text-gray-300" },
	],
	"~/projects": [
		{ name: "portfolio", isFolder: true, color: "text-blue-400" },
		{ name: "chat-app", isFolder: true, color: "text-blue-400" },
		{ name: "ecommerce-api", isFolder: true, color: "text-blue-400" },
		{ name: "mobile-app", isFolder: true, color: "text-blue-400" },
	],
	"~/projects/portfolio": [
		{ name: "README.md", isFolder: false, color: "text-gray-300" },
		{ name: "package.json", isFolder: false, color: "text-gray-300" },
		{ name: "src", isFolder: true, color: "text-blue-400" },
	],
	"~/projects/chat-app": [
		{ name: "README.md", isFolder: false, color: "text-gray-300" },
		{ name: "package.json", isFolder: false, color: "text-gray-300" },
		{ name: "server.js", isFolder: false, color: "text-gray-300" },
	],
	"~/projects/ecommerce-api": [
		{ name: "README.md", isFolder: false, color: "text-gray-300" },
		{ name: "main.go", isFolder: false, color: "text-gray-300" },
		{ name: "routes", isFolder: true, color: "text-blue-400" },
	],
	"~/projects/mobile-app": [
		{ name: "README.md", isFolder: false, color: "text-gray-300" },
		{ name: "pubspec.yaml", isFolder: false, color: "text-gray-300" },
		{ name: "lib", isFolder: true, color: "text-blue-400" },
	],
};

export default function TerminalSection() {
	const ref = useRef(null);
	const terminalBoxRef = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const isTerminalInView = useInView(terminalBoxRef, { once: true, margin: "-50px" });
	const [visibleLines, setVisibleLines] = useState<number>(0);
	const [lines, setLines] = useState(initialLines);
	const [input, setInput] = useState('');
	const [output, setOutput] = useState<(string | FileItem)[]>([]);
	const [currentDir, setCurrentDir] = useState('~');
	const [isNyanCat, setIsNyanCat] = useState(false);
	const [isTerminalOpen, setIsTerminalOpen] = useState(true);
	const terminalRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isTerminalInView && isTerminalOpen && visibleLines < lines.length) {
			const timeout = setTimeout(() => {
				setVisibleLines((prev) => prev + 1);
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [isTerminalInView, isTerminalOpen, visibleLines, lines.length]);

	
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [output]);

	
	useEffect(() => {
		if (!isNyanCat) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === 'c') {
				e.preventDefault();
				setIsNyanCat(false);
				setOutput(prev => [...prev, '']);
				
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isNyanCat]);

	const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		
		if (e.ctrlKey && e.key === 'd') {
			e.preventDefault();
			setIsTerminalOpen(false);
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			processCommand(input);
			setInput('');
		} else if (e.key === 'Tab') {
			e.preventDefault();
			
			const trimmedInput = input.trim();
			const parts = trimmedInput.split(' ');
			
			
			if (parts.length === 1) {
				const matches = getAutocompletes(parts[0]);
				if (matches.length === 1) {
					setInput(matches[0]);
				} else if (matches.length > 1) {
					
					const matchesForDisplay: FileItem[] = matches.map(name => {
						const file = getFilesInDir(currentDir).find(f => f.name === name);
						return file || { name, isFolder: false, color: 'text-gray-300' };
					});
					setOutput(prev => [...prev, ...matchesForDisplay]);
				}
			} else if (parts.length === 2) {
				
				const cmd = parts[0];
				const partial = parts[1];
				const matches = getAutocompletes(partial);
				
				if (matches.length === 1) {
					setInput(`${cmd} ${matches[0]}`);
				} else if (matches.length > 1) {
					const matchesForDisplay: FileItem[] = matches.map(name => {
						const file = getFilesInDir(currentDir).find(f => f.name === name);
						return file || { name, isFolder: false, color: 'text-gray-300' };
					});
					setOutput(prev => [...prev, ...matchesForDisplay]);
				}
			}
		}
	};

	const getFilesInDir = (dir: string) => {
		return directories[dir] || [];
	};

	const fileExists = (filename: string, dir: string = currentDir): boolean => {
		const files = getFilesInDir(dir);
		return files.some(file => file.name === filename);
	};

	const dirExists = (dirname: string): boolean => {
		if (dirname === '..') return true;
		const filesInCurrentDir = getFilesInDir(currentDir);
		return filesInCurrentDir.some(file => file.isFolder && file.name === dirname);
	};

	const getFullPath = (dirname: string): string => {
		if (dirname === '..') {
			
			const parts = currentDir.split('/');
			parts.pop();
			return parts.length === 0 ? '~' : parts.join('/');
		}
		
		return currentDir === '~' ? `~/${dirname}` : `${currentDir}/${dirname}`;
	};

	const getAutocompletes = (prefix: string): string[] => {
		const files = getFilesInDir(currentDir);
		return files
			.filter(file => file.name.startsWith(prefix))
			.map(file => file.name);
	};

	const processCommand = (command: string) => {
		if (!command.trim()) return;

		
		setOutput(prev => [...prev, `$ ${command}`]);

		const trimmedCommand = command.trim();
		const parts = trimmedCommand.split(' ');
		const cmd = parts[0];
		const args = parts.slice(1).join(' ');

		if (cmd === 'ls') {
			const filesInDir = getFilesInDir(currentDir);
			setOutput(prev => [...prev, ...filesInDir]);
		} else if (cmd === 'cd') {
			if (!args) {
				setOutput(prev => [...prev, `cd: missing directory operand`]);
			} else if (dirExists(args)) {
				const newPath = getFullPath(args);
				setCurrentDir(newPath);
				setOutput(prev => [...prev, '']);
			} else {
				setOutput(prev => [...prev, `cd: ${args}: No such file or directory`]);
			}
		} else if (cmd === 'cat') {
			if (!args) {
				setOutput(prev => [...prev, `cat: missing file operand`]);
			} else if (args === 'about_me.txt') {
				setOutput(prev => [...prev, 
					'Passionate about creating scalable systems and fluid interfaces.',
					'Currently focused on software architecture and mobile development.',
					'Always seeking the next logical challenge.'
				]);
			} else if (fileExists(args, currentDir)) {
				setOutput(prev => [...prev, `cat: cannot open file '${args}': Permission denied`]);
			} else {
				setOutput(prev => [...prev, `cat: ${args}: No such file or directory`]);
			}
		} else if (cmd === 'neofetch') {
			
			let username = 'otavio';
			const userFlagIndex = parts.indexOf('--user');
			if (userFlagIndex !== -1 && parts[userFlagIndex + 1]) {
				username = parts[userFlagIndex + 1];
			}
			
			setOutput(prev => [...prev,
				'loading system info...',
				'----------------------',
			]);
			
			
			setTimeout(() => {
				setOutput(prev => [
					...prev,
					{ label: 'OS:', text: 'Fedora + Arch Linux', color: 'text-white' } as any,
					{ label: 'Host:', text: 'Etec de Peruíbe', color: 'text-white' } as any,
					{ label: 'Role:', text: 'Full-Stack Developer', color: 'text-white' } as any,
					{ label: 'Uptime:', text: '17 years', color: 'text-white' } as any,
					{ label: 'Goal:', text: 'Be a great developer', color: 'text-yellow-300' } as any,
					{ label: 'Stack:', text: 'TypeScript, Java, Dart, Python, C#, Go', color: 'text-blue-400' } as any,
					''
				]);
			}, 300);
		} else if (cmd === 'nyancat') {
			setOutput(prev => [...prev, `$ nyancat`, '']);
			setIsNyanCat(true);
		} else if (cmd === 'exit') {
			setIsTerminalOpen(false);
		} else {
			setOutput(prev => [...prev, `command not found: ${cmd}`]);
		}
	};

	
	const reopenTerminal = () => {
		setIsTerminalOpen(true);
		setVisibleLines(0);
		setOutput([]);
		setCurrentDir('~');
		setIsNyanCat(false);
		
		setTimeout(() => inputRef.current?.focus(), 100);
	};

	
	const NyanCatAnimation = () => (
		<div className="w-full h-full relative bg-black">
			{/* GIF do Nyancat - ocupando toda a área */}
			<motion.img
				src="/nyancat.gif"
				alt="Nyancat"
				className="w-full h-full object-cover"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			/>

			{/* Text */}
			<motion.div
				className="text-emerald-400 text-sm font-mono absolute bottom-4 left-1/2 transform -translate-x-1/2"
				animate={{
					opacity: [0.5, 1],
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
				}}
			>
				Press Ctrl+C to exit nyancat
			</motion.div>
		</div>
	);

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
				ref={terminalBoxRef}
				initial={{ opacity: 0, y: 50, scale: 0.95 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="flex-1 w-full max-w-lg"
			>
				<AnimatePresence mode="wait">
					{isTerminalOpen ? (
						<motion.div
							key="terminal"
							initial={{ scale: 0.8, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.8, opacity: 0, y: -20 }}
							transition={{ 
								type: "spring",
								stiffness: 300,
								damping: 25
							}}
							className="w-full rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl shadow-emerald-900/10"
						>
							<div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
								<button 
									onClick={() => setIsTerminalOpen(false)}
									className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
									aria-label="Close terminal"
								/>
								<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
								<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
								<div className="ml-auto text-xs text-gray-500 font-mono">otavio@fedoralinux:~</div>
							</div>
						<div 
							ref={terminalRef}
							className="p-6 font-mono text-sm md:text-base h-100 overflow-y-auto custom-scrollbar bg-[#0c0c0c]"
							tabIndex={0}
						>
							{isNyanCat ? (
								<NyanCatAnimation />
							) : (
								<>
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
									<div className="mt-4">
										{output.map((item, index) => {
											
									if (typeof item === 'string') {
										return (
											<motion.div 
												key={index}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												className={`${item.startsWith('command not found') || item.includes('No such file or directory') || item.startsWith('cat:') || item.startsWith('cd:') ? 'text-red-400' : item === '' ? 'mb-2' : 'text-gray-300'}`}
											>
												{item && item}
											</motion.div>
										);
									}
									
									
									if ('isFolder' in item) {
										const fileItem = item as FileItem;
										return (
											<motion.div 
												key={index}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												className={fileItem.color}
											>
												{fileItem.isFolder ? `📁 ${fileItem.name}` : `📄 ${fileItem.name}`}
											</motion.div>
										);
									}
									
									
									if ('label' in item) {
										const labelItem = item as { label: string; text: string; color: string };
										return (
											<motion.div 
												key={index}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												className="flex gap-3"
											>
												<span className="text-emerald-400 font-bold min-w-20">{labelItem.label}</span>
												<span className={labelItem.color}>{labelItem.text}</span>
											</motion.div>
										);
									}

									return null;
								})}
							</div>
							{!isNyanCat && (
								<div className="flex gap-2 mt-2">
									<span className="text-pink-500 font-bold">➜</span>
									<span className="text-blue-400 font-bold">{currentDir}</span>
									<input 
										ref={inputRef}
										type="text"
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleInput}
										className="flex-1 bg-transparent outline-none text-gray-300 caret-emerald-400"
										placeholder="Type a command (Tab for autocomplete)..."
										autoFocus
									/>
								</div>
							)}
								</>
							)}
						</div>
					</motion.div>
				) : (
					<motion.button
						key="icon"
						onClick={reopenTerminal}
						className="w-24 h-24 rounded-2xl bg-[#0c0c0c] border border-white/10 shadow-2xl shadow-emerald-900/10 flex flex-col items-center justify-center gap-2 hover:border-emerald-500/30 transition-all cursor-pointer group"
						initial={{ scale: 0, rotate: -180, opacity: 0 }}
						animate={{ scale: 1, rotate: 0, opacity: 1 }}
						exit={{ scale: 0, rotate: 180, opacity: 0 }}
						transition={{ 
							type: "spring",
							stiffness: 260,
							damping: 20,
							duration: 0.6
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 text-emerald-400"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="4 17 10 11 4 5"></polyline>
								<line x1="12" y1="19" x2="20" y2="19"></line>
							</svg>
						</div>
						<span className="text-emerald-400 font-mono text-xs">Terminal</span>
					</motion.button>
				)}
				</AnimatePresence>
			</motion.div>

		</div>
		</section>
	);
}
