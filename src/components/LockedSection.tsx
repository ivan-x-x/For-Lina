"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useIsClient } from "@/lib/hooks";
import { CHALLENGE_END, getProgressPercentage } from "@/lib/challenge";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const PARTICLE_COUNT = 12;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

function ClosedLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function OpenLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 11V8a4.5 4.5 0 0 1 8-2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function ParticleBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        return { x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, delay: i * 0.02 };
      }),
    [],
  );

  return (
    <div className="relative h-12 w-12">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}

export default function LockedSection() {
  const isClient = useIsClient();
  const now = isClient ? new Date() : null;

  const isUnlocked = now ? now.getTime() >= CHALLENGE_END.getTime() : false;
  const percentage = now ? getProgressPercentage(now) : 0;

  const [stage, setStage] = useState<"lock" | "burst" | "content">("lock");

  const handleViewportEnter = () => {
    if (!isUnlocked) return;
    window.setTimeout(() => setStage("burst"), 700);
    window.setTimeout(() => setStage("content"), 1300);
  };

  return (
    <section className="px-6 py-[60px] md:py-[100px]">
      <motion.div
        className="mx-auto max-w-[600px]"
        initial="hidden"
        whileInView="visible"
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        {isUnlocked ? (
          <div className="relative overflow-hidden rounded-2xl border border-[#1A3A1A] bg-[#0A140A] px-5 py-10 md:px-10 md:py-20">
            <AnimatePresence mode="wait">
              {stage === "lock" && (
                <motion.div
                  key="lock"
                  className="flex justify-center"
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <ClosedLockIcon className="h-12 w-12 text-gold-dim" />
                </motion.div>
              )}
              {stage === "burst" && (
                <motion.div
                  key="burst"
                  className="flex justify-center"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ParticleBurst />
                </motion.div>
              )}
              {stage === "content" && (
                <motion.div
                  key="content"
                  className="flex flex-col items-center gap-6 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                >
                  <OpenLockIcon className="h-12 w-12 text-gold" />
                  <h3 className="font-display text-[1.75rem] text-cream md:text-[2.625rem]">
                    你做到了，Lina。🎉
                  </h3>
                  <p className="font-body text-[15px] text-muted">
                    这是我们所有人送给你的——每一个一直为你加油的人。
                  </p>
                  {/* TODO: Replace VIDEO_ID_HERE with the actual YouTube video ID on second update */}
                  <div className="flex aspect-video w-full max-w-[640px] items-center justify-center rounded-xl border border-gold bg-base px-6">
                    {/* TODO: Replace this placeholder with <iframe src="https://www.youtube.com/embed/VIDEO_ID_HERE" ... /> on second update */}
                    <p className="text-center font-display text-[1.375rem] italic text-muted">
                      三十天后，这里将会解锁
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-[#2A1A1A] bg-[#0F0A0A] px-5 py-10 md:px-10 md:py-20">
            <motion.div
              className="flex justify-center"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ClosedLockIcon className="h-12 w-12 text-gold-dim" />
            </motion.div>
            <p className="mt-6 text-center font-display text-[1.75rem] italic text-muted">
              有一份特别的礼物在等着你...
            </p>
            <p className="mt-3 text-center font-body text-sm text-gold-dim">
              加油，Lina。你快到了。💛
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-elevated">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
