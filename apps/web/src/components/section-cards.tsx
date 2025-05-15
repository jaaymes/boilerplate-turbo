"use client";

import { useMarketMetrics } from "../hooks/use-market-metrics";
import { MetricCard } from "./metric-card";

export function SectionCards() {
  const { metrics, isLoading, error } = useMarketMetrics();

  // Display loading state
  if (isLoading && metrics.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[180px] rounded-lg bg-card bg-gradient-to-t from-primary/5 to-card animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Display error state (fallback data should be shown instead)
  if (error && metrics.length === 0) {
    return (
      <div className="p-4 text-center text-destructive">
        Failed to load metrics data. Please try again later.
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          changePercentage={metric.changePercentage}
          description={metric.description}
          subtitle={metric.subtitle}
        />
      ))}
    </div>
  );
}
