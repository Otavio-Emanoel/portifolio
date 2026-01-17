"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface IntroProps {
  onDone?: () => void;
}

export default function Intro({ onDone }: IntroProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    const run = async () => {
      await controls.start("enter");
      await controls.start("progress");
      await controls.start("wipe");
      onDone?.();
    };
    run();
  }, [controls, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 text-zinc-50"
      variants={{
        enter: { opacity: [0, 1], transition: { duration: 0.3 } },
        progress: { opacity: 1 },
        wipe: { y: [0, -40, -1000], opacity: [1, 1, 0], transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
      }}
      animate={controls}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 1], opacity: [0, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full bg-zinc-800/70 px-6 py-3 text-lg tracking-wide"
        >
          Bem-vindo
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="h-1 rounded-full bg-linear-to-r from-zinc-500 via-zinc-200 to-white"
        />
        <p className="text-sm text-zinc-400">Carregando portfólio...</p>
      </div>
    </motion.div>
  );
}
