// ============================================
// GhostFree — Disaster Zone Network Resilience Service
// Offline detection, low-bandwidth mode & client-side ephemeral draft recovery
// Addresses feedback fb-user-009 for unstable 2G/EDGE disaster environments
// Zero-Knowledge Compliance: 0 PII persistence, in-memory state only
// ============================================

export interface NetworkResilienceState {
  isOnline: boolean;
  isLowBandwidth: boolean;
  lastOnlineTimestamp: number;
  offlineSince: number | null;
}

type ResilienceListener = (state: NetworkResilienceState) => void;

class NetworkResilienceService {
  private state: NetworkResilienceState = {
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isLowBandwidth: false,
    lastOnlineTimestamp: Date.now(),
    offlineSince: null,
  };

  private listeners: Set<ResilienceListener> = new Set();
  private ephemeralDraft: { nationalId: string; hasPin: boolean } | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline);
      window.addEventListener("offline", this.handleOffline);

      // Check if user previously toggled low-bandwidth mode
      try {
        const saved = localStorage.getItem("ghostfree_low_bandwidth_mode");
        if (saved === "true") {
          this.state.isLowBandwidth = true;
        }
      } catch {
        // ignore
      }
    }
  }

  private handleOnline = () => {
    this.state.isOnline = true;
    this.state.lastOnlineTimestamp = Date.now();
    this.state.offlineSince = null;
    this.notify();
  };

  private handleOffline = () => {
    this.state.isOnline = false;
    this.state.offlineSince = Date.now();
    this.notify();
  };

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getState(): NetworkResilienceState {
    return { ...this.state };
  }

  public subscribe(listener: ResilienceListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public setLowBandwidthMode(enabled: boolean): void {
    this.state.isLowBandwidth = enabled;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ghostfree_low_bandwidth_mode", String(enabled));
      } catch {
        // ignore
      }
    }
    this.notify();
  }

  /**
   * Ephemeral draft tracking in memory ONLY.
   * Never stores PIN, never persists to disk/localStorage.
   */
  public stageEphemeralDraft(nationalId: string, hasPin: boolean): void {
    this.ephemeralDraft = {
      nationalId,
      hasPin,
    };
  }

  public getEphemeralDraft(): { nationalId: string; hasPin: boolean } | null {
    return this.ephemeralDraft;
  }

  public clearEphemeralDraft(): void {
    this.ephemeralDraft = null;
  }

  /**
   * Manual heartbeat ping to verify active connectivity in disaster zones
   */
  public async testConnectivity(): Promise<boolean> {
    if (typeof window === "undefined") return true;
    try {
      // Fast HEAD request to public test endpoint or fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      this.handleOnline();
      return true;
    } catch {
      // In local dev or simulated offline, if navigator is offline, respect it
      if (!navigator.onLine) {
        this.handleOffline();
        return false;
      }
      return true;
    }
  }

  /**
   * Mock testing helper for unit test suites
   */
  public _simulateStatus(online: boolean): void {
    if (online) {
      this.handleOnline();
    } else {
      this.handleOffline();
    }
  }
}

export const networkResilience = new NetworkResilienceService();
