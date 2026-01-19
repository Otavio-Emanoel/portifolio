"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const initialLines = [
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
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [visibleLines, setVisibleLines] = useState<number>(0);
	const [lines, setLines] = useState(initialLines);
	const [input, setInput] = useState('');
	const [output, setOutput] = useState<(string | FileItem)[]>([]);
	const [currentDir, setCurrentDir] = useState('~');
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isInView && visibleLines < lines.length) {
			const timeout = setTimeout(() => {
				setVisibleLines((prev) => prev + 1);
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [isInView, visibleLines, lines.length]);

	// Auto-scroll quando há novo output
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [output]);

	const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			processCommand(input);
			setInput('');
		} else if (e.key === 'Tab') {
			e.preventDefault();
			
			const trimmedInput = input.trim();
			const parts = trimmedInput.split(' ');
			
			// Se tem só um comando, autocomplete nomes de arquivos/pastas
			if (parts.length === 1) {
				const matches = getAutocompletes(parts[0]);
				if (matches.length === 1) {
					setInput(matches[0]);
				} else if (matches.length > 1) {
					// Mostrar matches
					const matchesForDisplay: FileItem[] = matches.map(name => {
						const file = getFilesInDir(currentDir).find(f => f.name === name);
						return file || { name, isFolder: false, color: 'text-gray-300' };
					});
					setOutput(prev => [...prev, ...matchesForDisplay]);
				}
			} else if (parts.length === 2) {
				// Para comandos como 'cat' ou 'cd'
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
			// Volta um diretório
			const parts = currentDir.split('/');
			parts.pop();
			return parts.length === 0 ? '~' : parts.join('/');
		}
		// Caminho relativo - concatena com o diretório atual
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

		// Adiciona o comando ao output
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
		} else if (cmd === 'nyancat') {
			setOutput(prev => [...prev, 'Nyan Nyan Nyan! 🐱']);
		} else {
			setOutput(prev => [...prev, `command not found: ${cmd}`]);
		}
	};

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

						<div 
							ref={terminalRef}
							className="p-6 font-mono text-sm md:text-base h-100 overflow-y-auto custom-scrollbar"
							tabIndex={0}
						>
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
									// Se for um string (comando ou mensagem)
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
									
									// Se for um objeto FileItem (arquivo ou pasta)
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
								})}
							</div>
							<div className="flex gap-2 mt-2">
								<span className="text-pink-500 font-bold">➜</span>
								<span className="text-blue-400 font-bold">{currentDir}</span>
								<input 
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={handleInput}
									className="flex-1 bg-transparent outline-none text-gray-300 caret-emerald-400"
								placeholder="Type a command (Tab for autocomplete)..."
									autoFocus
								/>
							</div>
						</div>
					</div>
				</motion.div>

			</div>
		</section>
	);
}
