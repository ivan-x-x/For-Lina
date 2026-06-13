"use client";

import { motion, type Variants } from "framer-motion";
import { useNow } from "@/lib/hooks";
import { getCountdown, getProgressPercentage } from "@/lib/challenge";
import ProgressRing from "./ProgressRing";
import CountdownTimer from "./CountdownTimer";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.5, ease: EASE_OUT } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const fadeUpGroup: Variants = {
  hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ProgressDashboard() {
  const now = useNow();
  const percentage = now ? getProgressPercentage(now) : 0;
  const countdown = now ? getCountdown(now) : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section className="px-6 py-[60px] md:py-[100px]">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center gap-16 md:grid md:grid-cols-3 md:items-center md:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-80px" }}
        variants={fadeUpGroup}
      >
        <div className="hidden md:block" />
        <motion.div variants={fadeUp} className="flex justify-center">
          <ProgressRing percentage={percentage} />
        </motion.div>
        <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
          <CountdownTimer countdown={countdown} />
        </motion.div>
      </motion.div>
    </section>
  );
}
