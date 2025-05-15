"use client";

import { Toaster } from "@package/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey="theme-mode"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Toaster richColors position="top-right" />
      {children}
    </NextThemesProvider>
  );
}
