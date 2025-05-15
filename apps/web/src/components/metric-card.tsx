"use client";

import { Badge } from "@package/ui/components/badge";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@package/ui/components/card";

export interface MetricCardProps {
  title: string;
  value: string | number;
  changePercentage: number;
  description: string;
  subtitle: string;
}

export function MetricCard({
  title,
  value,
  changePercentage,
  description,
  subtitle,
}: MetricCardProps) {
  const isPositive = changePercentage >= 0;
  const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon />
            {isPositive ? "+" : ""}
            {changePercentage}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description} <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">{subtitle}</div>
      </CardFooter>
    </Card>
  );
}
