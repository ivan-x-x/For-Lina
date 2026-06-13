"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Countdown } from "@/lib/challenge";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const UNITS: { key: keyof Countdown; label: string }[] = [
  { key: "days", label: "天" },
  { key: "hours", label: "小时" },
  { key: "minutes", label: "分钟" },
  { key: "seconds", label: "秒" },
];

function FlipNumber({ value }: { value: number }) {
  const display = String(value).padStart(2, "0");

  return (
    <span className="relative inline-block h-[1.2em] w-[2ch] text-center font-body text-[2.25rem] font-light tabular-nums text-cream [perspective:300px] md:text-countdown">
      <AnimatePresence initial={false}>
        <motion.span
          key={display}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function CountdownTimer({ countdown }: { countdown: Countdown }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:items-center md:justify-center md:gap-5">
      {UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-center gap-5 md:contents">
          {i > 0 && (
            <span className="hidden font-body text-countdown font-light text-gold md:block">
              ·
            </span>
          )}
          <div className="flex flex-col items-center">
            <FlipNumber value={countdown[unit.key]} />
            <span className="mt-3 font-body text-[10px] tracking-[0.15em] text-muted">
              {unit.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
