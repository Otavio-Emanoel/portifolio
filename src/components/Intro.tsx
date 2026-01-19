"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroProps {
  onDone?: () => void;
}

const text = "Hello! My name is Otavio and I am a fullstack developer";

export default function Intro({ onDone }: IntroProps) {
  const controls = useAnimationControls();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
      }
      if (index > text.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTypingDone) {
      const timeout = setTimeout(() => {
        const run = async () => {
          await controls.start("wipe");
          onDone?.();
        };
        run();
      }, 5500);
      return () => clearTimeout(timeout);
    }
  }, [isTypingDone, controls, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a] text-zinc-50 overflow-hidden p-4"
      initial={{ borderRadius: "0px" }}
      variants={{
        wipe: {
          borderRadius: ["0px", "400px"],
          scale: [1, 0.92],
          y: [-200, -1200],
          opacity: [1, 1, 0],
          filter: ["blur(0px)", "blur(8px)"],
          transition: { 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1],
          },
        },
      }}
      animate={controls}
    >
      <div className="flex flex-col items-center gap-6 px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Typing text with code font */}
          <div className="text-lg sm:text-xl font-mono leading-relaxed tracking-tight text-zinc-100 h-24 flex items-center justify-center">
            <span>{displayedText}</span>
            {!isTypingDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block w-2 h-6 sm:h-8 bg-zinc-100"
              />
            )}
          </div>

          {/* Loading text appears after typing */}
          {isTypingDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm text-zinc-400"
            >
              Loading...
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
