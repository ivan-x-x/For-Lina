import { useEffect, useReducer, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True once hydrated on the client, so date-dependent content avoids SSR/client mismatches. */
export function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/** The current time, ticking every `intervalMs`. Returns null until hydrated on the client. */
export function useNow(intervalMs = 1000): Date | null {
  const isClient = useIsClient();
  const [, tick] = useReducer((c: number) => c + 1, 0);

  useEffect(() => {
    if (!isClient) return;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [isClient, intervalMs]);

  return isClient ? new Date() : null;
}
