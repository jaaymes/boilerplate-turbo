import { useEffect, useState } from "react";

export type ColorTheme = {
  name: string;
  primary: string;
  className: string;
};

export type BorderRadius = "0" | "0.3" | "0.5" | "0.75" | "1.0";

// Predefined color themes using OKLCH values
export const colorThemes: ColorTheme[] = [
  {
    name: "Default",
    primary: "oklch(0.216 0.006 56.043)",
    className: "theme-default",
  },
  {
    name: "Red",
    primary: "oklch(0.577 0.245 27.325)",
    className: "theme-red",
  },
  {
    name: "Rose",
    primary: "oklch(0.645 0.246 16.439)",
    className: "theme-rose",
  },
  {
    name: "Orange",
    primary: "oklch(0.769 0.188 70.08)",
    className: "theme-orange",
  },
  {
    name: "Green",
    primary: "oklch(0.696 0.17 162.48)",
    className: "theme-green",
  },
  {
    name: "Blue",
    primary: "oklch(0.6 0.118 184.704)",
    className: "theme-blue",
  },
  {
    name: "Yellow",
    primary: "oklch(0.828 0.189 84.429)",
    className: "theme-yellow",
  },
  {
    name: "Violet",
    primary: "oklch(0.488 0.243 264.376)",
    className: "theme-violet",
  },
];

export const borderRadiusOptions: BorderRadius[] = [
  "0",
  "0.3",
  "0.5",
  "0.75",
  "1.0",
];

export function useTheme() {
  const [theme, setTheme] = useState<string>("Default");
  const [radius, setRadius] = useState<BorderRadius>("0.5");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem("theme-color");
    const savedRadius = localStorage.getItem(
      "theme-radius"
    ) as BorderRadius | null;

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }

    if (savedRadius) {
      setRadius(savedRadius);
      applyRadius(savedRadius);
    }
  }, []);

  const applyTheme = (themeName: string) => {
    const selectedTheme = colorThemes.find((t) => t.name === themeName);
    if (!selectedTheme) return;

    // Remove all theme classes
    document.documentElement.classList.remove(
      ...colorThemes.map((t) => t.className)
    );

    // Add the selected theme class
    document.documentElement.classList.add(selectedTheme.className);

    // Save to localStorage
    localStorage.setItem("theme-color", themeName);
  };

  const applyRadius = (value: BorderRadius) => {
    const root = document.documentElement;
    root.style.setProperty("--radius", `${value}rem`);
    localStorage.setItem("theme-radius", value);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme-mode", "light");
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    applyTheme(value);
  };

  const handleRadiusChange = (value: BorderRadius) => {
    setRadius(value);
    applyRadius(value);
  };

  return {
    theme,
    radius,
    isDarkMode,
    isMounted,
    handleThemeChange,
    handleRadiusChange,
    toggleDarkMode,
  };
}
