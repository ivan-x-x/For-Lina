"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { getDayOfYear, format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { LANGUAGES, splitGraphemes } from "@/lib/languages";
import { useIsClient } from "@/lib/hooks";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.5, ease: EASE_OUT } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const fadeUpGroup: Variants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { delayChildren: 0.4, staggerChildren: 0.08 } },
};

export default function Hero() {
  const isClient = useIsClient();
  const now = isClient ? new Date() : null;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-80px" });
  const show = Boolean(now) && inView;

  const dayIndex = now ? getDayOfYear(now) % 30 : 0;
  const greeting = LANGUAGES[dayIndex];
  const letters = useMemo(() => splitGraphemes(greeting.greeting), [greeting.greeting]);
  const dateLabel = now ? format(now, "yyyy年M月d日 EEEE", { locale: zhCN }) : "";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-[60px] text-center md:py-[100px]"
    >
      <div className="flex flex-col items-center">
        <h1
          className="font-display text-[2.25rem] font-normal leading-[1.1] tracking-[-0.02em] text-cream md:text-hero"
          aria-label={greeting.greeting}
        >
          {now &&
            letters.map((char, i) => (
              <motion.span
                key={`${dayIndex}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, x: -30, scale: 0.5 }}
                animate={
                  show
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: -30, scale: 0.5 }
                }
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.05 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
        </h1>

        <motion.p
          className="mt-4 font-body text-xs text-muted md:text-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: letters.length * 0.05 + 0.2 }}
        >
          {`（${greeting.pronunciation} · ${greeting.language}的早安）`}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={fadeUpGroup}
        >
          <motion.p
            className="text-center font-body text-[13px] text-muted md:text-[15px]"
            variants={fadeUp}
          >
            {dateLabel}
          </motion.p>
          <motion.div className="h-px w-[60px] bg-gold" variants={fadeUp} />
          <motion.p
            className="text-center font-body text-[13px] tracking-[0.2em] text-gold-dim md:text-[10px]"
            variants={fadeUp}
          >
            每天早上七点，名言更新
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
