/**
 * Both dates are absolute instants (UTC), so every viewer sees the same
 * countdown regardless of their browser's timezone. The challenge starts 24
 * hours after this file was last updated and runs for exactly 30 days.
 */
export const CHALLENGE_START = new Date(Date.UTC(2026, 5, 14, 22, 25, 0));
export const CHALLENGE_END = new Date(CHALLENGE_START.getTime() + 30 * 24 * 60 * 60 * 1000);

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
