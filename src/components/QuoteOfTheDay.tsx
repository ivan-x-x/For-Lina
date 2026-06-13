"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsClient } from "@/lib/hooks";
import { FINALE_INDEX, QUOTES, getTodaysQuoteIndex, splitIntoWords } from "@/lib/quotes";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function QuoteOfTheDay() {
  const isClient = useIsClient();
  const now = isClient ? new Date() : null;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-80px" });
  const show = Boolean(now) && inView;

  const quoteIndex = now ? getTodaysQuoteIndex(now) : 0;
  const quote = QUOTES[quoteIndex];
  const isFinale = quoteIndex === FINALE_INDEX;
  const words = useMemo(() => splitIntoWords(quote), [quote]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-[60px] md:py-[120px]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at center, #1A1208 0%, #080808 100%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: show ? 1.6 : 0.8, ease: EASE_OUT }}
      />
      <div className="relative mx-auto flex max-w-full flex-col items-center gap-8 text-center md:max-w-[720px]">
        <motion.span
          className="font-body text-[10px] tracking-[0.2em] text-gold-dim"
          initial={{ opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: show ? 0.6 : 0.4, ease: EASE_OUT, delay: show ? 0.2 : 0 }}
        >
          今日名言
        </motion.span>
        <p
          className={`font-display text-[1.625rem] italic md:text-quote ${isFinale ? "text-gold-soft" : "text-cream"}`}
        >
          {now &&
            words.map((word, i) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 24, scale: 0.6, filter: "blur(14px)" }}
                  animate={
                    show
                      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, y: 24, scale: 0.6, filter: "blur(14px)" }
                  }
                  transition={{
                    duration: show ? 0.8 : 0.45,
                    ease: EASE_OUT,
                    delay: (show ? 0.4 : 0) + i * 0.07,
                  }}
                >
                  {word}
                </motion.span>
              ),
            )}
        </p>
      </div>
    </section>
  );
}
