"use client";

import { useEffect, useState } from "react";
import { MetricData, fetchMarketMetrics } from "../lib/api";

export function useMarketMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        setIsLoading(true);
        const data = await fetchMarketMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMetrics();

    // Refresh every 5 minutes
    const intervalId = setInterval(loadMetrics, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { metrics, isLoading, error };
}
