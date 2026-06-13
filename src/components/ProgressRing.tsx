"use client";

import { motion } from "framer-motion";

const SIZE = 200;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ percentage }: { percentage: number }) {
  const offset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div className="relative h-40 w-40 md:h-[200px] md:w-[200px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full -rotate-90 drop-shadow-[0_0_12px_#D6B85F33]"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-elevated"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          className="stroke-gold"
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-body text-counter text-cream">{Math.round(percentage)}%</span>
        <span className="font-body text-label text-muted">已完成</span>
      </div>
    </div>
  );
}
