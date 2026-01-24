"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroMobileProps {
  onDone?: () => void;
}

const text = "Hello! I'm Otavio";
const subtext = "Fullstack Developer";

export default function IntroMobile({ onDone }: IntroMobileProps) {
  const controls = useAnimationControls();
  const [displayedText, setDisplayedText] = useState("");
  const [displayedSubtext, setDisplayedSubtext] = useState("");
  const [isMainTypingDone, setIsMainTypingDone] = useState(false);
  const [isSubtypingDone, setIsSubtypingDone] = useState(false);

  // Main text typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
      }
      if (index > text.length) {
        clearInterval(interval);
        setIsMainTypingDone(true);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Subtext typing effect (starts after main text)
  useEffect(() => {
    if (isMainTypingDone) {
      let index = 0;
      const delay = setTimeout(() => {
        const interval = setInterval(() => {
          index++;
          if (index <= subtext.length) {
            setDisplayedSubtext(subtext.substring(0, index));
          }
          if (index > subtext.length) {
            clearInterval(interval);
            setIsSubtypingDone(true);
          }
        }, 50);

        return () => clearInterval(interval);
      }, 300);

      return () => clearTimeout(delay);
    }
  }, [isMainTypingDone]);

  // Animation trigger after typing is done
  useEffect(() => {
    if (isSubtypingDone) {
      const timeout = setTimeout(() => {
        const run = async () => {
          await controls.start("wipe");
          onDone?.();
        };
        run();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [isSubtypingDone, controls, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19] text-zinc-50 overflow-hidden p-4 h-dvh"
      initial={{ borderRadius: "0px" }}
      variants={{
        wipe: {
          borderRadius: ["0px", "200px"],
          scale: [1, 0.95],
          y: [-100, -800],
          opacity: [1, 1, 0],
          filter: ["blur(0px)", "blur(6px)"],
          transition: { 
            duration: 1, 
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1],
          },
        },
      }}
      animate={controls}
    >
      <div className="flex flex-col items-center justify-center gap-4 px-6 max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center w-full"
        >
          {/* Main typing text */}
          <div className="text-2xl sm:text-3xl font-bold font-mono leading-tight tracking-tight text-white mb-2 h-12 flex items-center justify-center">
            <span>{displayedText}</span>
            {!isMainTypingDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="ml-1.5 inline-block w-1.5 h-8 sm:h-9 bg-white"
              />
            )}
          </div>

          {/* Subtext appears after main text */}
          {isMainTypingDone && (
            <div className="text-base sm:text-lg font-mono leading-tight text-blue-400 h-8 flex items-center justify-center">
              <span>{displayedSubtext}</span>
              {!isSubtypingDone && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="ml-1 inline-block w-1 h-6 sm:h-7 bg-blue-400"
                />
              )}
            </div>
          )}

          {/* Loading indicator */}
          {isSubtypingDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <span className="text-xs text-zinc-400">Loading</span>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex gap-1"
              >
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Background decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
