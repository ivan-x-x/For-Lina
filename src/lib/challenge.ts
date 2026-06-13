export const CHALLENGE_START = new Date(2025, 5, 13, 0, 0, 0);
export const CHALLENGE_END = new Date(2025, 6, 13, 7, 0, 0);

/** Percentage through the challenge, clamped to [0, 100]. */
export function getProgressPercentage(now: Date): number {
  const total = CHALLENGE_END.getTime() - CHALLENGE_START.getTime();
  const elapsed = now.getTime() - CHALLENGE_START.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Time remaining until the challenge ends, floored at zero. */
export function getCountdown(now: Date): Countdown {
  const remainingMs = Math.max(0, CHALLENGE_END.getTime() - now.getTime());
  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
