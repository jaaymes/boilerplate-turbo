"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/shared/infra/hooks/use-theme";
import { Button } from "@package/ui/components/button";

export function ModeToggle() {
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={toggleDarkMode}>
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
